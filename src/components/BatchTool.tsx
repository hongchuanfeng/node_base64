'use client';

import { useState, useCallback, useRef } from 'react';
import { useToast, ToastContainer } from '@/components/Toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Upload, FileText, Copy, Download, Trash2, Plus, FolderDown } from 'lucide-react';
import { fileToBase64, encodeBase64, decodeBase64 } from '@/lib/base64';
import JSZip from 'jszip';

interface BatchItem {
  id: string;
  name: string;
  type: 'text' | 'file';
  input: string;
  output: string;
  status: 'pending' | 'success' | 'error';
  error?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

export default function BatchTool() {
  const { t } = useLanguage();
  const [items, setItems] = useState<BatchItem[]>([]);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const { toasts, showToast } = useToast();

  const handleAddText = useCallback(() => {
    const input = textInputRef.current?.value.trim();
    if (!input) {
      showToast(t.batch.addContentFirst, 'error');
      return;
    }

    const newItem: BatchItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: input.substring(0, 30) + (input.length > 30 ? '...' : ''),
      type: 'text',
      input,
      output: '',
      status: 'pending'
    };

    setItems(prev => [...prev, newItem]);
    if (textInputRef.current) textInputRef.current.value = '';
    showToast(t.batch.textAdded, 'success');
  }, [showToast, t]);

  const handleAddFiles = useCallback(async (files: FileList) => {
    for (const file of Array.from(files)) {
      try {
        const base64 = await fileToBase64(file);
        const newItem: BatchItem = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: 'file',
          input: base64,
          output: '',
          status: 'pending'
        };
        setItems(prev => [...prev, newItem]);
      } catch {
        showToast(`${t.batch.fileReadFailed}: ${file.name}`, 'error');
      }
    }
    showToast(`${t.batch.fileAdded}: ${files.length}`, 'success');
  }, [showToast, t]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleAddFiles(e.dataTransfer.files);
    }
  }, [handleAddFiles]);

  const handleProcessAll = useCallback(async () => {
    if (items.length === 0) {
      showToast(t.batch.addContentFirst, 'error');
      return;
    }

    setIsProcessing(true);

    const updatedItems = await Promise.all(
      items.map(async (item) => {
        try {
          let output: string;
          if (mode === 'encode') {
            output = item.type === 'text' 
              ? encodeBase64(item.input) 
              : item.input;
          } else {
            output = decodeBase64(item.input);
          }
          return { ...item, output, status: 'success' as const };
        } catch (error) {
          return { 
            ...item, 
            status: 'error' as const,
            error: error instanceof Error ? error.message : t.batch.failed
          };
        }
      })
    );

    setItems(updatedItems);
    setIsProcessing(false);
    
    const successCount = updatedItems.filter(i => i.status === 'success').length;
    const errorCount = updatedItems.filter(i => i.status === 'error').length;
    showToast(`${t.batch.processComplete} ${successCount}，${errorCount}`, errorCount > 0 ? 'info' : 'success');
  }, [items, mode, showToast, t]);

  const handleCopyAll = useCallback(async () => {
    const outputs = items
      .filter(item => item.status === 'success' && item.output)
      .map(item => item.output)
      .join('\n');

    if (!outputs) {
      showToast(t.batch.noContentToCopy, 'error');
      return;
    }

    try {
      await navigator.clipboard.writeText(outputs);
      showToast(t.batch.copiedAllResults, 'success');
    } catch {
      showToast(t.selfDestruct?.copyFailed || 'Copy failed', 'error');
    }
  }, [items, showToast, t]);

  const handleDownloadZip = useCallback(async () => {
    const successItems = items.filter(item => item.status === 'success' && item.type === 'file');
    
    if (successItems.length === 0) {
      showToast(t.batch.noFileToDownload, 'error');
      return;
    }

    try {
      const zip = new JSZip();
      
      for (const item of successItems) {
        const base64Data = item.output || item.input;
        const dataUrlMatch = base64Data.match(/^data:([^;]+);base64,(.+)$/);
        
        if (dataUrlMatch) {
          const mimeType = dataUrlMatch[1];
          const base64 = dataUrlMatch[2];
          const binary = atob(base64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          zip.file(item.name, bytes);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `base64-export-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showToast(t.batch.zipDownloading, 'success');
    } catch {
      showToast(t.batch.packagingFailed, 'error');
    }
  }, [items, showToast, t]);

  const handleRemoveItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleClearAll = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.batch.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.batch.subtitle}
        </p>
      </div>

      {/* Mode Toggle & Actions */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setMode('encode')}
            >
              {t.batch.encode}
            </button>
            <button
              className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setMode('decode')}
            >
              {t.batch.decode}
            </button>
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-primary"
              onClick={handleProcessAll}
              disabled={isProcessing || items.length === 0}
            >
              {isProcessing ? t.batch.processing : t.batch.batchProcess}
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleCopyAll}
              disabled={items.length === 0}
            >
              <Copy size={16} />
              {t.batch.copyAll}
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleDownloadZip}
            >
              <FolderDown size={16} />
              {t.batch.zipExport}
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleClearAll}
              disabled={items.length === 0}
            >
              <Trash2 size={16} />
              {t.batch.clear}
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Add Content Area */}
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>{t.batch.addContent}</h3>
          
          {/* Text Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="input-label">{t.batch.textInput}</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <textarea
                ref={textInputRef}
                placeholder={t.batch.inputTextPlaceholder}
                className="input-field"
                style={{ flex: 1, minHeight: '100px' }}
              />
              <button className="btn btn-primary" onClick={handleAddText}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* File Drop Zone */}
          <div
            className={`drop-zone ${isDragging ? 'active' : ''}`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="drop-zone-icon">
              <Upload size={48} />
            </div>
            <p className="drop-zone-text">
              {isDragging ? t.batch.releaseToUpload : t.batch.fileDropZone}
            </p>
            <p className="drop-zone-hint">{t.batch.multipleFiles}</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={(e) => e.target.files && handleAddFiles(e.target.files)}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Queue List */}
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>
            {t.batch.processingQueue} ({items.length})
          </h3>
          
          {items.length === 0 ? (
            <div style={{ 
              padding: '2rem', 
              textAlign: 'center', 
              color: 'var(--text-tertiary)',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px'
            }}>
              {t.batch.queueEmpty}
            </div>
          ) : (
            <div style={{ 
              maxHeight: '400px', 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: '8px'
                  }}
                >
                  <FileText size={20} style={{ color: 'var(--text-tertiary)' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ 
                      fontWeight: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.name}
                    </p>
                    {item.type === 'text' && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                        {t.batch.text} | {item.input.length} {t.batch.chars}
                      </p>
                    )}
                  </div>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    backgroundColor: item.status === 'success' 
                      ? 'var(--success-color)' 
                      : item.status === 'error' 
                        ? 'var(--error-color)' 
                        : 'var(--text-tertiary)',
                    color: 'white'
                  }}>
                    {item.status === 'success' ? t.batch.done : item.status === 'error' ? t.batch.failed : t.batch.pending}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-tertiary)',
                      cursor: 'pointer',
                      padding: '0.25rem'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {items.some(i => i.status === 'success') && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>{t.batch.processingResult}</h3>
          <div style={{ 
            maxHeight: '300px', 
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.85rem'
          }}>
            {items.filter(i => i.status === 'success').map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <strong>{item.name}</strong>
                  <span style={{ color: 'var(--text-tertiary)' }}>
                    {item.output.length} {t.batch.chars}
                  </span>
                </div>
                <div className="result-area" style={{ maxHeight: '100px' }}>
                  {item.output}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}

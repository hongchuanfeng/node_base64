'use client';

import { useState, useCallback, useRef } from 'react';
import { fileToBase64, base64ToBlob } from '@/lib/base64';
import { useToast, ToastContainer } from '@/components/Toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Upload, FileImage, Copy, Download, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface FileInfo {
  name: string;
  size: number;
  type: string;
  base64: string;
  preview?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

export default function FileBase64Tool() {
  const { t } = useLanguage();
  const [file, setFile] = useState<FileInfo | null>(null);
  const [base64Output, setBase64Output] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toasts, showToast } = useToast();

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    if (!selectedFile) return;

    try {
      const base64 = await fileToBase64(selectedFile);
      const isImage = selectedFile.type.startsWith('image/');
      
      setFile({
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        base64,
        preview: isImage ? base64 : undefined
      });
      setBase64Output(base64);
      showToast(`${t.tools.fileBase64.fileLoaded} ${selectedFile.name}`, 'success');
    } catch (error) {
      showToast(t.tools.fileBase64.fileReadFailed, 'error');
    }
  }, [showToast, t]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!base64Output) {
      showToast(t.errors.noOutputToCopy, 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(base64Output);
      showToast(t.common.copiedToClipboard, 'success');
    } catch {
      showToast(t.common.copyFailed, 'error');
    }
  }, [base64Output, showToast, t]);

  const handleDownload = useCallback(() => {
    if (!file) return;
    
    const blob = base64ToBlob(file.base64, file.type);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(t.common.download, 'success');
  }, [file, showToast, t]);

  const handleReset = useCallback(() => {
    setFile(null);
    setBase64Output('');
  }, []);

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.tools.fileBase64.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.tools.fileBase64.description}
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('encode')}
          >
            {t.common.fileToBase64}
          </button>
          <button
            className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('decode')}
          >
            {t.common.base64ToFile}
          </button>
        </div>
      </div>

      {mode === 'encode' ? (
        /* Encode Mode */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* File Input Area */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>{t.tools.fileBase64.selectFile}</h3>
            <div
              className={`drop-zone ${isDragging ? 'active' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="drop-zone-icon">
                {isDragging ? <FileImage size={48} /> : <Upload size={48} />}
              </div>
              <p className="drop-zone-text">
                {isDragging ? t.tools.fileBase64.dragDropActive : t.tools.fileBase64.dragDrop}
              </p>
              <p className="drop-zone-hint">{t.tools.fileBase64.description}</p>
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => handleFileSelect(e.target.files?.[0] as File)}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* File Info */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>{t.tools.fileBase64.fileName}</h3>
            {file ? (
              <div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  {file.preview && (
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--bg-tertiary)'
                    }}>
                      <Image
                        src={file.preview}
                        alt={file.name}
                        width={100}
                        height={100}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>{file.name}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {t.tools.fileBase64.fileType}: {file.type || t.tools.fileBase64.unknown}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {t.tools.fileBase64.fileSize}: {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button className="btn btn-secondary" onClick={handleReset}>
                  <Trash2 size={16} />
                  {t.tools.fileBase64.removeFile}
                </button>
              </div>
            ) : (
              <p style={{ color: 'var(--text-tertiary)' }}>{t.tools.fileBase64.selectFileHint}</p>
            )}
          </div>
        </div>
      ) : (
        /* Decode Mode */
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>{t.tools.fileBase64.pasteBase64}</h3>
          <textarea
            value={base64Output}
            onChange={(e) => setBase64Output(e.target.value)}
            placeholder={t.tools.textBase64.placeholder.decode}
            className="input-field"
            style={{ minHeight: '200px', fontFamily: 'monospace' }}
          />
        </div>
      )}

      {/* Output Area */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: 600 }}>{t.tools.fileBase64.conversionResult}</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" onClick={handleCopy}>
              <Copy size={16} />
              {t.common.copy}
            </button>
            {mode === 'decode' && file && (
              <button className="btn btn-primary" onClick={handleDownload}>
                <Download size={16} />
                {t.tools.fileBase64.downloadFile}
              </button>
            )}
          </div>
        </div>
        
        {base64Output && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>
                {t.tools.fileBase64.base64Length}: {base64Output.replace(/^data:[^;]+;base64,/, '').length}
              </span>
              {mode === 'encode' && file && (
                <span style={{ color: 'var(--text-secondary)' }}>
                  {t.tools.fileBase64.compressionRatio}: {Math.round((1 - base64Output.replace(/^data:[^;]+;base64,/, '').length / file.size) * 100)}%
                </span>
              )}
            </div>
            <div className="result-area" style={{ maxHeight: '200px' }}>
              {base64Output}
            </div>
          </div>
        )}
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

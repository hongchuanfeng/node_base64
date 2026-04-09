'use client';

import { useState, useCallback, useRef } from 'react';
import { useToast, ToastContainer } from '@/components/Toast';
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
      showToast('请输入文本内容', 'error');
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
    showToast('已添加文本', 'success');
  }, [showToast]);

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
        showToast(`文件 ${file.name} 读取失败`, 'error');
      }
    }
    showToast(`已添加 ${files.length} 个文件`, 'success');
  }, [showToast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleAddFiles(e.dataTransfer.files);
    }
  }, [handleAddFiles]);

  const handleProcessAll = useCallback(async () => {
    if (items.length === 0) {
      showToast('请先添加要处理的内容', 'error');
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
              : item.input; // 文件已经是Base64
          } else {
            output = decodeBase64(item.input);
          }
          return { ...item, output, status: 'success' as const };
        } catch (error) {
          return { 
            ...item, 
            status: 'error' as const,
            error: error instanceof Error ? error.message : '处理失败'
          };
        }
      })
    );

    setItems(updatedItems);
    setIsProcessing(false);
    
    const successCount = updatedItems.filter(i => i.status === 'success').length;
    const errorCount = updatedItems.filter(i => i.status === 'error').length;
    showToast(`处理完成��成功 ${successCount}，失败 ${errorCount}`, errorCount > 0 ? 'info' : 'success');
  }, [items, mode, showToast]);

  const handleCopyAll = useCallback(async () => {
    const outputs = items
      .filter(item => item.status === 'success' && item.output)
      .map(item => item.output)
      .join('\n');

    if (!outputs) {
      showToast('没有可复制的内容', 'error');
      return;
    }

    try {
      await navigator.clipboard.writeText(outputs);
      showToast('已复制所有结果', 'success');
    } catch {
      showToast('复制失败', 'error');
    }
  }, [items, showToast]);

  const handleDownloadZip = useCallback(async () => {
    const successItems = items.filter(item => item.status === 'success' && item.type === 'file');
    
    if (successItems.length === 0) {
      showToast('没有可下载的文件', 'error');
      return;
    }

    try {
      const zip = new JSZip();
      
      for (const item of successItems) {
        // 从Base64提取实际数据
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
      
      showToast('ZIP文件下载中...', 'success');
    } catch {
      showToast('打包失败', 'error');
    }
  }, [items, showToast]);

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
          批量处理
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          批量文件/文本与Base64互转，支持ZIP打包导出，提供命令行风格的批量操作界面。
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
              编码
            </button>
            <button
              className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setMode('decode')}
            >
              解码
            </button>
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-primary"
              onClick={handleProcessAll}
              disabled={isProcessing || items.length === 0}
            >
              {isProcessing ? '处理中...' : '批量处理'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleCopyAll}
              disabled={items.length === 0}
            >
              <Copy size={16} />
              复制全部
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleDownloadZip}
            >
              <FolderDown size={16} />
              ZIP导出
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleClearAll}
              disabled={items.length === 0}
            >
              <Trash2 size={16} />
              清空
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Add Content Area */}
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>添加内容</h3>
          
          {/* Text Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="input-label">文本输入</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <textarea
                ref={textInputRef}
                placeholder="输入文本内容..."
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
              {isDragging ? '放开以上传文件' : '拖拽文件到此处，或点击选择'}
            </p>
            <p className="drop-zone-hint">支持多个文件</p>
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
            处理队列 ({items.length})
          </h3>
          
          {items.length === 0 ? (
            <div style={{ 
              padding: '2rem', 
              textAlign: 'center', 
              color: 'var(--text-tertiary)',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px'
            }}>
              队列为空，请添加要处理的内容
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
                        文本 | {item.input.length} 字符
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
                    {item.status === 'success' ? '完成' : item.status === 'error' ? '失败' : '待处理'}
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
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>处理结果</h3>
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
                    {item.output.length} 字符
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

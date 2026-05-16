'use client';

import { useState, useRef, useCallback } from 'react';
import { encodeBase64, decodeBase64 } from '@/lib/base64';
import { Upload, File, X, Check, ArrowDown, ArrowUp, Zap } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/Toast';
import { useLanguage } from '@/hooks/useLanguage';

export default function LargeFileProcessor() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [results, setResults] = useState<{ [key: string]: { base64?: string; decoded?: string; error?: string } }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [encoding, setEncoding] = useState<'utf-8' | 'gbk'>('utf-8');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toasts, showToast } = useToast();

  const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB max

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        showToast(`${t.largeFile.fileTooLarge}: ${file.name}`, 'error');
        return false;
      }
      return true;
    });
    
    setFiles(prev => [...prev, ...validFiles]);
    validFiles.forEach(file => {
      setProgress(prev => ({ ...prev, [file.name]: 0 }));
      setResults(prev => ({ ...prev, [file.name]: {} }));
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [showToast, t]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        showToast(`${t.largeFile.fileTooLarge}: ${file.name}`, 'error');
        return false;
      }
      return true;
    });
    
    setFiles(prev => [...prev, ...validFiles]);
    validFiles.forEach(file => {
      setProgress(prev => ({ ...prev, [file.name]: 0 }));
      setResults(prev => ({ ...prev, [file.name]: {} }));
    });
  }, [showToast, t]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
    setProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
    setResults(prev => {
      const newResults = { ...prev };
      delete newResults[fileName];
      return newResults;
    });
  };

  const processFileChunk = async (
    file: File, 
    onProgress: (progress: number) => void
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      let offset = 0;
      let result = '';

      const readNextChunk = () => {
        const chunk = file.slice(offset, offset + CHUNK_SIZE);
        reader.readAsText(chunk);
      };

        reader.onload = (e) => {
        const chunk = e.target?.result as string;
        if (chunk) {
          result += chunk;
          offset += chunk.length;
          const currentProgress = Math.min((offset / file.size) * 100, 100);
          onProgress(currentProgress);

          if (offset < file.size) {
            setTimeout(readNextChunk, 0);
          } else {
            try {
              const encoded = encodeBase64(result, encoding);
              resolve(encoded);
            } catch (err) {
              reject(err);
            }
          }
        }
      };

      reader.onerror = () => reject(reader.error);
      readNextChunk();
    });
  };

  const processAsBase64 = async (
    base64: string,
    onProgress: (progress: number) => void
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const cleaned = base64.replace(/\s/g, '');
        const chunkSize = 10000;
        let offset = 0;
        let decoded = '';

        const decodeChunk = () => {
          const chunk = cleaned.slice(offset, offset + chunkSize);
          try {
            const partial = decodeBase64(chunk, encoding);
            decoded += partial;
          } catch {
            decoded += chunk;
          }
          
          offset += chunkSize;
          const currentProgress = Math.min((offset / cleaned.length) * 100, 100);
          onProgress(currentProgress);

          if (offset < cleaned.length) {
            setTimeout(decodeChunk, 0);
          } else {
            resolve(decoded);
          }
        };

        decodeChunk();
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      showToast(t.largeFile.selectFileFirst, 'error');
      return;
    }

    setIsProcessing(true);

    for (const file of files) {
      try {
        setProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        const result = await processFileChunk(file, (p) => {
          setProgress(prev => ({ ...prev, [file.name]: p }));
        });

        setResults(prev => ({
          ...prev,
          [file.name]: { base64: result }
        }));
        
        showToast(`${t.largeFile.fileEncoded}: ${file.name}`, 'success');
      } catch (err) {
        setResults(prev => ({
          ...prev,
          [file.name]: { error: t.largeFile.fileProcessingFailed }
        }));
        showToast(`${t.largeFile.fileProcessingFailed}: ${file.name}`, 'error');
      }
    }

    setIsProcessing(false);
  };

  const handleProcessBase64 = async () => {
    const allBase64 = Object.values(results)
      .filter(r => r.base64)
      .map(r => r.base64)
      .join('\n');

    if (!allBase64) {
      showToast(t.largeFile.noBase64ToDecode, 'error');
      return;
    }

    setIsProcessing(true);

    try {
      const decoded = await processAsBase64(allBase64, (p) => {
        setProgress(prev => ({ ...prev, ['decoding']: p }));
      });

      setResults(prev => ({
        ...prev,
        ['decoded-result']: { decoded }
      }));

      showToast(t.largeFile.decodeComplete, 'success');
    } catch (err) {
      showToast(t.largeFile.decodeFailed, 'error');
    }

    setIsProcessing(false);
  };

  const handleDownload = (fileName: string) => {
    const result = results[fileName];
    if (!result) return;

    const content = result.base64 || result.decoded || '';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.endsWith('_base64.txt') ? fileName : `${fileName}_base64.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t.selfDestruct?.fileDownloaded || 'File downloaded', 'success');
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(t.selfDestruct?.copiedToClipboard || 'Copied to clipboard', 'success');
    } catch {
      showToast(t.selfDestruct?.copyFailed || 'Copy failed', 'error');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const totalProgress = files.length > 0 
    ? Object.values(progress).reduce((a, b) => a + b, 0) / files.length 
    : 0;

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.largeFile.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.largeFile.subtitle}
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '4px' }}>
            <button
              onClick={() => setMode('encode')}
              className={mode === 'encode' ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              <ArrowUp size={16} />
              {t.largeFile.encodeFile}
            </button>
            <button
              onClick={() => setMode('decode')}
              className={mode === 'decode' ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              <ArrowDown size={16} />
              {t.largeFile.decodeBase64}
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t.largeFile.charset}：</span>
            <select
              value={encoding}
              onChange={(e) => setEncoding(e.target.value as 'utf-8' | 'gbk')}
              className="input-field"
              style={{ width: 'auto', padding: '0.5rem 1rem' }}
            >
              <option value="utf-8">UTF-8</option>
              <option value="gbk">GBK</option>
            </select>
          </div>
        </div>
      </div>

      {/* File Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        style={{
          padding: '3rem 2rem',
          border: '2px dashed var(--border-color)',
          borderRadius: '12px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: 'var(--bg-secondary)',
          transition: 'all 0.2s',
          marginBottom: '1.5rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-color)';
          e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <Upload size={48} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.largeFile.dragOrClick}
        </h3>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
          {t.largeFile.fileSizeLimit}
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {t.largeFile.selectedFiles} ({files.length})
            </h3>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setFiles([]);
                setProgress({});
                setResults({});
              }}
            >
              {t.largeFile.clearAll}
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {files.map((file) => {
              const fileProgress = progress[file.name] || 0;
              const fileResult = results[file.name];
              
              return (
                <div key={file.name} style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <File size={20} color="var(--accent-color)" />
                      <div>
                        <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{file.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                          {formatFileSize(file.size)}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {fileResult?.base64 && (
                        <button 
                          className="btn btn-secondary"
                          onClick={() => handleDownload(file.name)}
                          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                        >
                          {t.selfDestruct?.download || 'Download'}
                        </button>
                      )}
                      <button 
                        className="btn btn-secondary"
                        onClick={() => removeFile(file.name)}
                        style={{ padding: '0.4rem' }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div style={{
                    height: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${fileProgress}%`,
                      backgroundColor: fileProgress === 100 ? 'var(--success-color)' : 'var(--accent-color)',
                      borderRadius: '4px',
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                    {fileProgress === 100 ? (
                      <span style={{ color: 'var(--success-color)' }}>
                        <Check size={12} style={{ marginRight: '0.25rem' }} />
                        {t.largeFile.complete}
                      </span>
                    ) : fileProgress > 0 ? (
                      `${fileProgress.toFixed(0)}%`
                    ) : (
                      t.largeFile.waiting
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Overall Progress */}
      {isProcessing && (
        <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <Zap size={32} color="var(--accent-color)" style={{ marginBottom: '1rem', animation: 'pulse 1s infinite' }} />
          <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            {t.largeFile.processing} {mode === 'encode' ? t.largeFile.processingEncode : t.largeFile.processingDecode}...
          </h3>
          <div style={{
            height: '12px',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '6px',
            overflow: 'hidden',
            marginBottom: '0.5rem'
          }}>
            <div style={{
              height: '100%',
              width: `${totalProgress}%`,
              backgroundColor: 'var(--accent-color)',
              borderRadius: '6px',
              transition: 'width 0.3s'
            }} />
          </div>
          <p style={{ color: 'var(--text-secondary)' }}>{totalProgress.toFixed(0)}%</p>
        </div>
      )}

      {/* Process Button */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button
          className="btn btn-primary"
          onClick={handleProcess}
          disabled={files.length === 0 || isProcessing}
          style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
        >
          {isProcessing ? t.largeFile.processing : `${t.largeFile.fileProcessing} ${mode === 'encode' ? t.largeFile.processingEncode : t.largeFile.processingDecode}`}
        </button>
      </div>

      {/* Decoded Result */}
      {results['decoded-result']?.decoded && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.largeFile.result}</h3>
            <button 
              className="btn btn-secondary"
              onClick={() => handleCopy(results['decoded-result']?.decoded || '')}
            >
              {t.largeFile.copyResult}
            </button>
          </div>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            maxHeight: '300px',
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            wordBreak: 'break-all',
            whiteSpace: 'pre-wrap',
            color: 'var(--text-primary)'
          }}>
            {results['decoded-result'].decoded}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="card">
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>{t.largeFile.usageInstructions}</h3>
        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: 2 }}>
          {t.largeFile.usageTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

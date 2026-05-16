'use client';

import { useState, useCallback, useEffect } from 'react';
import { encodeBase64, decodeBase64 } from '@/lib/base64';
import { useHistory } from '@/hooks/useHistory';
import { useToast, ToastContainer } from '@/components/Toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Copy, RotateCcw, ArrowUpDown, History, Trash2 } from 'lucide-react';

const encodings = [
  { value: 'utf-8', label: 'UTF-8' },
  { value: 'gbk', label: 'GBK' },
  { value: 'gb2312', label: 'GB2312' },
  { value: 'big5', label: 'BIG5' },
  { value: 'shift-jis', label: 'Shift-JIS' },
];

export default function TextBase64Tool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [encoding, setEncoding] = useState('utf-8');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [showHistory, setShowHistory] = useState(false);
  const { history, addHistory, clearHistory, deleteHistoryItem } = useHistory();
  const { toasts, showToast } = useToast();

  const handleEncode = useCallback(() => {
    if (!input.trim()) {
      showToast(t.errors.inputEmpty, 'error');
      return;
    }
    try {
      const result = encodeBase64(input, encoding);
      setOutput(result);
      addHistory({ type: 'encode', input, output: result, encoding });
      showToast(t.common.success, 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : t.errors.encodingFailed, 'error');
    }
  }, [input, encoding, addHistory, showToast, t]);

  const handleDecode = useCallback(() => {
    if (!input.trim()) {
      showToast(t.errors.base64InputEmpty, 'error');
      return;
    }
    try {
      const result = decodeBase64(input, encoding);
      setOutput(result);
      addHistory({ type: 'decode', input, output: result, encoding });
      showToast(t.common.success, 'success');
    } catch (error) {
      showToast(t.errors.invalidBase64, 'error');
    }
  }, [input, encoding, addHistory, showToast, t]);

  const handleCopy = useCallback(async () => {
    if (!output) {
      showToast(t.errors.noOutputToCopy, 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      showToast(t.common.copiedToClipboard, 'success');
    } catch {
      showToast(t.common.copyFailed, 'error');
    }
  }, [output, showToast, t]);

  const handleSwap = useCallback(() => {
    setInput(output);
    setOutput(input);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  }, [input, output, mode]);

  const handleReset = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      if (mode === 'encode') {
        handleEncode();
      } else {
        handleDecode();
      }
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      handleCopy();
    }
  }, [mode, handleEncode, handleDecode, handleCopy]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleHistorySelect = (item: typeof history[0]) => {
    setInput(item.input);
    setOutput(item.output);
    setEncoding(item.encoding);
    setMode(item.type);
    setShowHistory(false);
  };

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.tools.textBase64.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>{t.tools.textBase64.description}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'stretch' }}>
        {/* Input Panel */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>{t.common.input}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" onClick={handleReset} title={t.common.clear}>
                <RotateCcw size={16} />
              </button>
              <button className="btn btn-secondary" onClick={() => setShowHistory(!showHistory)} title={t.common.history}>
                <History size={16} />
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? t.tools.textBase64.placeholder.encode : t.tools.textBase64.placeholder.decode}
            className="input-field"
            style={{ minHeight: '200px', fontFamily: 'monospace' }}
          />
        </div>

        {/* Center Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={handleSwap} title={t.common.swap}>
            <ArrowUpDown size={20} />
          </button>
          <button className="btn btn-primary" onClick={mode === 'encode' ? handleEncode : handleDecode}>
            {mode === 'encode' ? `${t.common.encode} →` : `← ${t.common.decode}`}
          </button>
        </div>

        {/* Output Panel */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>{t.common.output}</span>
            <button className="btn btn-secondary copy-btn" onClick={handleCopy} title={t.common.copy}>
              <Copy size={16} />
              {t.common.copy}
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.tools.textBase64.placeholder.output}
            className="input-field"
            style={{ minHeight: '200px', fontFamily: 'monospace', backgroundColor: 'var(--bg-tertiary)' }}
          />
        </div>
      </div>

      {/* Settings */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
          <div className="input-wrapper" style={{ minWidth: '150px' }}>
            <label className="input-label">{t.common.encodingFormat}</label>
            <select
              value={encoding}
              onChange={(e) => setEncoding(e.target.value)}
              className="input-field"
              style={{ padding: '0.5rem 1rem' }}
            >
              {encodings.map((enc) => (
                <option key={enc.value} value={enc.value}>{enc.label}</option>
              ))}
            </select>
          </div>

          <div className="input-wrapper">
            <label className="input-label">{t.common.operationMode}</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMode('encode')}
              >
                {t.common.encode}
              </button>
              <button
                className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMode('decode')}
              >
                {t.common.decode}
              </button>
            </div>
          </div>

          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', display: 'flex', gap: '0.5rem' }}>
            <span className="shortcut-hint">Ctrl+Enter</span> {t.common.convert}
            <span className="shortcut-hint">Ctrl+Shift+C</span> {t.common.copy}
          </div>
        </div>
      </div>

      {/* History Panel */}
      {showHistory && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600 }}>{t.common.history}</h3>
            <button className="btn btn-secondary" onClick={clearHistory}>
              <Trash2 size={16} />
              {t.common.clear}
            </button>
          </div>
          {history.length === 0 ? (
            <p style={{ color: 'var(--text-tertiary)' }}>{t.common.noHistory}</p>
          ) : (
            <div className="history-list">
              {history.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleHistorySelect(item)}
                >
                  <div>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: item.type === 'encode' ? 'var(--accent-color)' : 'var(--success-color)',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      marginRight: '0.5rem'
                    }}>
                      {item.type === 'encode' ? t.common.encode : t.common.decode}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {item.input.substring(0, 30)}{item.input.length > 30 ? '...' : ''}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistoryItem(item.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-tertiary)',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}

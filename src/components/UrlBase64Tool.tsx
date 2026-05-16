'use client';

import { useState, useCallback } from 'react';
import { encodeUrlSafeBase64, decodeUrlSafeBase64 } from '@/lib/base64';
import { useToast, ToastContainer } from '@/components/Toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Copy, RotateCcw, ArrowRightLeft, Info } from 'lucide-react';

export default function UrlBase64Tool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const { toasts, showToast } = useToast();

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      showToast(t.errors.enterContent, 'error');
      return;
    }

    setError('');

    try {
      if (mode === 'encode') {
        const result = encodeUrlSafeBase64(input);
        setOutput(result);
        showToast(t.common.success, 'success');
      } else {
        const result = decodeUrlSafeBase64(input);
        setOutput(result);
        showToast(t.common.success, 'success');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.decodingFailed);
      showToast(t.tools.urlBase64.conversionFailed, 'error');
    }
  }, [input, mode, showToast, t]);

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
    setError('');
  }, []);

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.tools.urlBase64.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.tools.urlBase64.description}
        </p>
      </div>

      {/* Info Card */}
      <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'rgba(59, 130, 246, 0.05)' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <Info size={24} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{t.tools.urlBase64.whenUseUrlSafe}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {t.tools.urlBase64.urlSafeExplanation}
            </p>
            <div style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
              <div style={{ marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>{t.tools.urlBase64.standardBase64}: </span>
                <code>SGVsbG8gV29ybGQ+Iw==</code>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>{t.tools.urlBase64.urlSafe}: </span>
                <code>SGVsbG8gV29ybGQ-Iw</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'stretch' }}>
        {/* Input */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>{t.common.input}</span>
            <button className="btn btn-secondary" onClick={handleReset}>
              <RotateCcw size={16} />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? t.tools.urlBase64.placeholder.encode : t.tools.urlBase64.placeholder.decode}
            className="input-field"
            style={{ minHeight: '200px', fontFamily: 'monospace' }}
          />
        </div>

        {/* Center Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={handleSwap}>
            <ArrowRightLeft size={20} />
          </button>
          <button className="btn btn-primary" onClick={handleConvert}>
            {mode === 'encode' ? t.common.standardToUrl : t.common.urlToStandard}
          </button>
        </div>

        {/* Output */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>{t.common.output}</span>
            <button className="btn btn-secondary copy-btn" onClick={handleCopy}>
              <Copy size={16} />
              {t.common.copy}
            </button>
          </div>
          <textarea
            value={output || error}
            readOnly
            placeholder={t.common.placeholder}
            className="input-field"
            style={{
              minHeight: '200px',
              fontFamily: 'monospace',
              backgroundColor: 'var(--bg-tertiary)',
              color: error ? 'var(--error-color)' : 'var(--text-primary)'
            }}
          />
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('encode')}
          >
            {t.common.standardToUrl}
          </button>
          <button
            className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('decode')}
          >
            {t.common.urlToStandard}
          </button>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

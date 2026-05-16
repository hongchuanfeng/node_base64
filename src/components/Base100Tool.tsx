'use client';

import { useState, useCallback } from 'react';
import { useToast, ToastContainer } from '@/components/Toast';
import { Copy, RotateCcw, ArrowRightLeft, BookOpen, Info, Code } from 'lucide-react';
import { encodeBase100 } from '@/lib/other-bases';
import { useLanguage } from '@/hooks/useLanguage';

export default function Base100Tool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const { toasts, showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'intro' | 'principle' | 'example'>('intro');

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      showToast(t.errors.inputEmpty, 'error');
      return;
    }

    setError('');

    try {
      if (mode === 'encode') {
        const result = encodeBase100(input);
        setOutput(result);
        showToast(t.common.success, 'success');
      } else {
        throw new Error(t.baseEncoding.base100?.notImplemented || 'Base100 decoding not implemented');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.baseEncoding.decodingFailed);
      showToast(t.baseEncoding.encodingFailed, 'error');
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
    setError('');
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
          {t.baseEncoding.title100}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.baseEncoding.subtitle100}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'stretch' }}>
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
            placeholder={mode === 'encode' ? t.baseEncoding.inputPlaceholder : t.baseEncoding.inputBase64Placeholder}
            className="input-field"
            style={{ minHeight: '200px', fontFamily: 'monospace' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={handleSwap}>
            <ArrowRightLeft size={20} />
          </button>
          <button className="btn btn-primary" onClick={handleConvert}>
            {mode === 'encode' ? t.baseEncoding.encode : t.baseEncoding.decode}
          </button>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>{t.baseEncoding.result}</span>
            <button className="btn btn-secondary copy-btn" onClick={handleCopy}>
              <Copy size={16} />
              {t.baseEncoding.copy}
            </button>
          </div>
          <div
            style={{
              minHeight: '200px',
              padding: '1rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '2rem',
              wordBreak: 'break-all',
              color: error ? 'var(--error-color)' : 'var(--text-primary)'
            }}
          >
            {output || error || (t.tools.smartBase64?.placeholder?.output || 'Result will appear here...')}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('encode')}
          >
            {t.common.input} → Base100
          </button>
          <button
            className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('decode')}
            disabled
          >
            Base100 → {t.common.output}
          </button>
        </div>
      </div>

      {/* 功能说明与原理 */}
      <div style={{ marginTop: '2rem' }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.5rem'
        }}>
          <button
            className={`info-tab ${activeTab === 'intro' ? 'active' : ''}`}
            onClick={() => setActiveTab('intro')}
          >
            <Info size={16} />
            {t.learn?.principles?.title || '功能说明'}
          </button>
          <button
            className={`info-tab ${activeTab === 'principle' ? 'active' : ''}`}
            onClick={() => setActiveTab('principle')}
          >
            <BookOpen size={16} />
            {t.baseEncoding?.encodingPrinciple || '编码原理'}
          </button>
          <button
            className={`info-tab ${activeTab === 'example' ? 'active' : ''}`}
            onClick={() => setActiveTab('example')}
          >
            <Code size={16} />
            {t.baseEncoding?.usageExample || '使用示例'}
          </button>
        </div>

        {activeTab === 'intro' && (
          <div className="card info-content">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {t.learn?.principles?.title || '功能说明'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
              {t.baseEncoding.base100?.introDesc || 'Base100 is a fun Emoji encoding method using emoji to represent data.'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t.baseEncoding?.charset || '字符集'}</h4>
                <p style={{ color: 'var(--accent-color)', fontSize: '1.5rem' }}>👨‍🦰👩‍🦰👨‍🦱👩‍🦱👨‍🦲👩‍🦲👨‍🦳👩‍🦳...</p>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>100 emoji combinations</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t.baseEncoding?.efficiency || '编码效率'}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.baseEncoding.base100?.efficiencyDesc || 'Each byte encodes to 2 emojis, ~200% expansion rate'}</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t.baseEncoding?.useCases || '用途'}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.baseEncoding.base100?.useCasesDesc || 'Entertainment, social sharing, creative coding'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'principle' && (
          <div className="card info-content">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {t.baseEncoding?.encodingPrinciple || '编码原理'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
              {t.baseEncoding.base100?.principleDesc || 'Base100 uses skin tone and hair style combinations to create 100 unique emojis.'}
            </p>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Mapping Rules</h4>
              <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.8 }}>
                <div>0-7: <span style={{ color: 'var(--accent-color)' }}>👨‍🦰👩‍🦰👨‍🦱👩‍🦱👨‍🦲👩‍🦲👨‍🦳👩‍🦳</span></div>
                <div>8-15: <span style={{ color: 'var(--accent-color)' }}>👨‍👦👩‍👦👨‍👧👩‍👧👨‍👦‍👦👩‍👦‍👦</span></div>
                <div>16-23: <span style={{ color: 'var(--accent-color)' }}>👨‍👧‍👦👩‍👧‍👦👨‍👦‍👧👩‍👦‍👧</span></div>
                <div style={{ color: 'var(--text-tertiary)' }}>... and so on, 100 combinations total</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {t.baseEncoding.base100?.encodingProcess || 'Encoding process: convert text to bytes, map each byte value to emoji pair.'}
            </p>
          </div>
        )}

        {activeTab === 'example' && (
          <div className="card info-content">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {t.baseEncoding?.usageExample || '使用示例'}
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', backgroundColor: 'var(--accent-color)', color: 'white', borderRadius: '4px', fontSize: '0.75rem' }}>{t.baseEncoding.encode}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{t.common.input}：<code style={{ color: 'var(--accent-color)' }}>Hi</code></p>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.5rem', wordBreak: 'break-all' }}>
                  👩‍👦👨‍👦👩‍👦👨‍👦
                </p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', backgroundColor: '#f59e0b', color: 'white', borderRadius: '4px', fontSize: '0.75rem' }}>{t.baseEncoding.base100?.funUsage || 'Fun Usage'}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{t.baseEncoding.base100?.funUsageDesc || 'Encode messages into emojis that look like garbled text'}</p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{t.baseEncoding.base100?.socialSharing || 'Share encoded messages on platforms that do not support encoding'}</p>
                <p style={{ color: 'var(--text-secondary)' }}>{t.baseEncoding.base100?.creativeExpression || 'Write secret messages with emojis'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .info-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .info-tab:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .info-tab.active {
          background-color: var(--accent-color);
          color: white;
        }
        .info-content {
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

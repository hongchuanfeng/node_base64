'use client';

import { useState, useCallback } from 'react';
import { useToast, ToastContainer } from '@/components/Toast';
import { Copy, RotateCcw, ArrowRightLeft, BookOpen, Info, Code } from 'lucide-react';
import { encodeBase16, decodeBase16 } from '@/lib/other-bases';
import { useLanguage } from '@/hooks/useLanguage';

export default function Base16Tool() {
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
        const result = encodeBase16(input);
        setOutput(result);
        showToast(t.common.success, 'success');
      } else {
        const result = decodeBase16(input);
        setOutput(result);
        showToast(t.common.success, 'success');
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
          {t.baseEncoding.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.baseEncoding.subtitle}
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
          <textarea
            value={output || error}
            readOnly
            placeholder={t.tools.smartBase64?.placeholder?.output || 'Result will appear here...'}
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

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('encode')}
          >
            {t.common.input} → Base16
          </button>
          <button
            className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('decode')}
          >
            Base16 → {t.common.output}
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
              {t.baseEncoding?.introDesc || 'Base16 (Hex) encoding uses 0-9 and A-F, 16 characters to represent data.'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t.baseEncoding?.charset || '字符集'}</h4>
                <code style={{ color: 'var(--accent-color)', fontFamily: 'monospace' }}>0123456789ABCDEF</code>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t.baseEncoding?.efficiency || '编码效率'}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.baseEncoding?.efficiencyDesc || 'Each byte encodes to 2 chars, 200% expansion rate'}</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t.baseEncoding?.useCases || '应用场景'}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.baseEncoding?.useCasesDesc || 'Debug output, memory addresses, network protocols'}</p>
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
              {t.baseEncoding?.principleDesc || 'Base16 encoding: every 4 bits corresponds to one hex character.'}
            </p>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{t.baseEncoding?.conversionTable || '转换对照表'}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                <div>0000 = 0</div>
                <div>0001 = 1</div>
                <div>0010 = 2</div>
                <div>0011 = 3</div>
                <div>0100 = 4</div>
                <div>0101 = 5</div>
                <div>0110 = 6</div>
                <div>0111 = 7</div>
                <div>1000 = 8</div>
                <div>1001 = 9</div>
                <div>1010 = A</div>
                <div>1011 = B</div>
                <div>1100 = C</div>
                <div>1101 = D</div>
                <div>1110 = E</div>
                <div>1111 = F</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {t.baseEncoding?.exampleDesc || 'Example: "A" → ASCII 65 (01000001) → "41"'}
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
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{t.common.input}：<code style={{ color: 'var(--accent-color)' }}>Hello</code></p>
                <p style={{ color: 'var(--text-primary)' }}>{t.baseEncoding.result}：<code style={{ color: 'var(--accent-color)' }}>48656C6C6F</code></p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', backgroundColor: '#10b981', color: 'white', borderRadius: '4px', fontSize: '0.75rem' }}>{t.baseEncoding.decode}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{t.common.input}：<code style={{ color: 'var(--accent-color)' }}>48656C6C6F</code></p>
                <p style={{ color: 'var(--text-primary)' }}>{t.baseEncoding.result}：<code style={{ color: 'var(--accent-color)' }}>Hello</code></p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', backgroundColor: '#f59e0b', color: 'white', borderRadius: '4px', fontSize: '0.75rem' }}>{t.baseEncoding?.commonScenarios || '常见场景'}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Memory: <code style={{ color: 'var(--accent-color)' }}>0x7fff5fbff8a0</code></p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>MAC: <code style={{ color: 'var(--accent-color)' }}>00:1A:2B:3C:4D:5E</code></p>
                <p style={{ color: 'var(--text-secondary)' }}>IPv6: <code style={{ color: 'var(--accent-color)' }}>2001:0db8:85a3</code></p>
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

'use client';

import { useState, useCallback } from 'react';
import { useToast, ToastContainer } from '@/components/Toast';
import { Copy, RotateCcw, ArrowRightLeft, BookOpen, Info, Code } from 'lucide-react';
import { encodeBase58, decodeBase58 } from '@/lib/other-bases';
import { useLanguage } from '@/hooks/useLanguage';

export default function Base58Tool() {
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
        const result = encodeBase58(input);
        setOutput(result);
        showToast(t.common.success, 'success');
      } else {
        const result = decodeBase58(input);
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
          {t.baseEncoding.title58}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.baseEncoding.subtitle58}
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
            文本 → Base58
          </button>
          <button
            className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('decode')}
          >
            Base58 → 文本
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
            功能说明
          </button>
          <button
            className={`info-tab ${activeTab === 'principle' ? 'active' : ''}`}
            onClick={() => setActiveTab('principle')}
          >
            <BookOpen size={16} />
            编码原理
          </button>
          <button
            className={`info-tab ${activeTab === 'example' ? 'active' : ''}`}
            onClick={() => setActiveTab('example')}
          >
            <Code size={16} />
            使用示例
          </button>
        </div>

        {activeTab === 'intro' && (
          <div className="card info-content">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              功能说明
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
              Base58 是一种专门为人类可读性设计的编码方式，移除了容易混淆的字符（0、O、I、l）。它使用 1-9、A-K、M-N、P-Z、a-k、m-z 共58个字符。
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>字符集</h4>
                <code style={{ color: 'var(--accent-color)', fontFamily: 'monospace', fontSize: '0.8rem' }}>123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz</code>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>编码效率</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>编码效率约为 58^1/256 ≈ 0.73，效率高于Base16和Base32</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>应用场景</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>比特币地址、以太坊地址、IPFS CID、RIPEMD哈希</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'principle' && (
          <div className="card info-content">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              编码原理
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
              Base58 使用与十进制转换类似的方法，将数字从 Base256 转换为 Base58。与 Base64 不同，它没有 padding（填充字符）。
            </p>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>移除的字符</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <code style={{ color: 'var(--error-color)' }}>0</code>
                  <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.25rem' }}>零</span>
                </div>
                <div>
                  <code style={{ color: 'var(--error-color)' }}>O</code>
                  <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.25rem' }}>大写O</span>
                </div>
                <div>
                  <code style={{ color: 'var(--error-color)' }}>I</code>
                  <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.25rem' }}>大写I</span>
                </div>
                <div>
                  <code style={{ color: 'var(--error-color)' }}>l</code>
                  <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.25rem' }}>小写L</span>
                </div>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              编码过程：<br />
              1. 将输入视为大整数<br />
              2. 反复除以58，收集余数<br />
              3. 将余数映射为对应字符<br />
              4. 逆序输出结果
            </p>
          </div>
        )}

        {activeTab === 'example' && (
          <div className="card info-content">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              使用示例
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', backgroundColor: 'var(--accent-color)', color: 'white', borderRadius: '4px', fontSize: '0.75rem' }}>编码</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>输入：<code style={{ color: 'var(--accent-color)' }}>Hello</code></p>
                <p style={{ color: 'var(--text-primary)' }}>输出：<code style={{ color: 'var(--accent-color)' }}>8RagWHcG9P88zRMt</code></p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', backgroundColor: '#f59e0b', color: 'white', borderRadius: '4px', fontSize: '0.75rem' }}>常见场景</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>比特币地址：<code style={{ color: 'var(--accent-color)' }}>1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2</code></p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>短链接ID：<code style={{ color: 'var(--accent-color)' }}>Xk9H2m4n</code></p>
                <p style={{ color: 'var(--text-secondary)' }}>IPFS CID：<code style={{ color: 'var(--accent-color)' }}>QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX</code></p>
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

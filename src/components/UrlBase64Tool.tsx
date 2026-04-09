'use client';

import { useState, useCallback } from 'react';
import { encodeUrlSafeBase64, decodeUrlSafeBase64, isValidBase64 } from '@/lib/base64';
import { useToast, ToastContainer } from '@/components/Toast';
import { Copy, RotateCcw, ArrowRightLeft, Info } from 'lucide-react';

export default function UrlBase64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const { toasts, showToast } = useToast();

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      showToast('请输入要转换的内容', 'error');
      return;
    }

    setError('');

    try {
      if (mode === 'encode') {
        const result = encodeUrlSafeBase64(input);
        setOutput(result);
        showToast('编码成功', 'success');
      } else {
        const result = decodeUrlSafeBase64(input);
        setOutput(result);
        showToast('解码成功', 'success');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '转换失败');
      showToast('转换失败', 'error');
    }
  }, [input, mode, showToast]);

  const handleCopy = useCallback(async () => {
    if (!output) {
      showToast('没有内容可复制', 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      showToast('已复制到剪贴板', 'success');
    } catch {
      showToast('复制失败', 'error');
    }
  }, [output, showToast]);

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
          URL安全Base64编码
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          标准Base64与URL-safe Base64互相转换。说明何时需要使用URL安全编码（如在URL参数中）。
        </p>
      </div>

      {/* Info Card */}
      <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'rgba(59, 130, 246, 0.05)' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <Info size={24} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
          <div>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>何时使用URL安全编码？</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              标准Base64编码包含 <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>+</code> 和 
              <code style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>/</code> 字符，
              这些字符在URL中具有特殊含义，可能导致解析问题。URL-safe Base64将 <code>+</code> 替换为 <code>-</code>，
              <code>/</code> 替换为 <code>_</code>，并移除末尾的填充字符 <code>=</code>。
            </p>
            <div style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
              <div style={{ marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>标准Base64: </span>
                <code>SGVsbG8gV29ybGQ+Iw==</code>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>URL-safe: </span>
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
            <span style={{ fontWeight: 500 }}>输入</span>
            <button className="btn btn-secondary" onClick={handleReset}>
              <RotateCcw size={16} />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '输入要编码的普通文本...' : '输入标准或URL-safe Base64字符串...'}
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
            {mode === 'encode' ? '标准 → URL' : 'URL → 标准'}
          </button>
        </div>

        {/* Output */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>输出</span>
            <button className="btn btn-secondary copy-btn" onClick={handleCopy}>
              <Copy size={16} />
              复制
            </button>
          </div>
          <textarea
            value={output || error}
            readOnly
            placeholder="转换结果..."
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
            标准Base64 → URL-safe
          </button>
          <button
            className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('decode')}
          >
            URL-safe → 标准Base64
          </button>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, RefreshCw, Info, Hash } from 'lucide-react';

const BASE91_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+-./:<=>?@[]^_`{|}~';

function base91Encode(data: Uint8Array): string {
  let result = '';
  let b = 0;
  let n = 0;

  for (let i = 0; i < data.length; i++) {
    b |= data[i] << n;
    n += 8;

    if (n > 13) {
      let v = b & 8191;
      if (v > 88) {
        b >>= 13;
        n -= 13;
      } else {
        let v2 = b & 16383;
        if (v2 > 8184) {
          b >>= 14;
          n -= 14;
          result += BASE91_CHARS[v2 & 127];
          result += BASE91_CHARS[v2 >> 7];
        } else {
          b >>= 13;
          n -= 13;
          result += BASE91_CHARS[v];
        }
      }
      v = b & 8191;
      if (v > 88) {
        b >>= 13;
        n -= 13;
      } else {
        let v2 = b & 16383;
        if (v2 > 8184) {
          b >>= 14;
          n -= 14;
          result += BASE91_CHARS[v2 & 127];
          result += BASE91_CHARS[v2 >> 7];
        } else {
          b >>= 13;
          n -= 13;
          result += BASE91_CHARS[v];
        }
      }
    }
  }

  if (n > 0) {
    result += BASE91_CHARS[b % 91];
    if (n > 7 || b > 90) {
      result += BASE91_CHARS[Math.floor(b / 91) % 91];
    }
  }

  return result;
}

function base91Decode(str: string): Uint8Array {
  const result: number[] = [];
  let b = 0;
  let n = 0;
  let v = -1;

  for (let i = 0; i < str.length; i++) {
    const idx = BASE91_CHARS.indexOf(str[i]);
    if (idx === -1) continue;

    if (v === -1) {
      v = idx;
    } else {
      b += v + idx * 91;
      n += (v < 88 ? 13 : 14);

      while (n > 7) {
        n -= 8;
        result.push(b & 255);
        b >>= 8;
      }

      v = -1;
    }
  }

  if (v !== -1) {
    result.push((b + v * 91) & 255);
  }

  return new Uint8Array(result);
}

function textToBytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function bytesToText(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

export default function Base91Page() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleEncode = () => {
    setError('');
    try {
      const bytes = textToBytes(input);
      const encoded = base91Encode(bytes);
      setOutput(encoded);
    } catch (e) {
      setError('编码失败');
    }
  };

  const handleDecode = () => {
    setError('');
    try {
      const bytes = base91Decode(input);
      const decoded = bytesToText(bytes);
      setOutput(decoded);
    } catch (e) {
      setError('解码失败，请确保输入是有效的Base91编码');
    }
  };

  const handleConvert = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleSwap = () => {
    setInput(output);
    setOutput('');
    setError('');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1rem' }}>
          <ArrowLeft size={16} />
          返回首页
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Hash size={36} style={{ color: 'var(--accent-color)' }} />
          Base91 编码/解码
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Base91是一种高效的二进制到文本编码，相比Base64能减少约7%的输出大小。
        </p>
      </div>

      {/* Info Card */}
      <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-tertiary)' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <Info size={16} style={{ color: 'var(--accent-color)', marginRight: '0.5rem' }} />
            <strong>效率更高</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', marginBottom: 0, fontSize: '0.9rem' }}>
              比Base64节省约7%空间
            </p>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <Info size={16} style={{ color: 'var(--accent-color)', marginRight: '0.5rem' }} />
            <strong>91个字符</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', marginBottom: 0, fontSize: '0.9rem' }}>
              包含可打印ASCII范围
            </p>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <Info size={16} style={{ color: 'var(--accent-color)', marginRight: '0.5rem' }} />
            <strong>广泛应用</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', marginBottom: 0, fontSize: '0.9rem' }}>
              Git bundle、某些邮件协议
            </p>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <button
          className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => { setMode('encode'); setError(''); }}
        >
          编码
        </button>
        <button
          className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => { setMode('decode'); setError(''); }}
        >
          解码
        </button>
      </div>

      {/* Input Area */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          输入 {mode === 'encode' ? '（文本）' : '（Base91编码）'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入Base91编码...'}
          style={{
            width: '100%',
            minHeight: '150px',
            padding: '1rem',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            fontSize: '0.9rem',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={handleConvert}>
          {mode === 'encode' ? '编码' : '解码'}
        </button>
        <button className="btn btn-secondary" onClick={handleSwap}>
          <RefreshCw size={16} style={{ marginRight: '0.25rem' }} />
          交换
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          清空
        </button>
      </div>

      {/* Output Area */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          输出 {mode === 'encode' ? '（Base91编码）' : '（解码文本）'}
        </label>
        <div style={{ position: 'relative' }}>
          <textarea
            value={output}
            readOnly
            placeholder="结果将在此显示..."
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '1rem',
              paddingRight: '3rem',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              fontSize: '0.9rem',
              resize: 'vertical'
            }}
          />
          <button
            onClick={handleCopy}
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              padding: '0.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          color: '#ef4444',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      {/* Comparison */}
      <div className="card" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          编码效率对比
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-tertiary)' }}>64</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Base64 字符集</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>91</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Base91 字符集</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success-color)' }}>~7%</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>节省空间</div>
          </div>
        </div>
      </div>

    </div>
  );
}

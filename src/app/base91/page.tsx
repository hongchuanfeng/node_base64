'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, RefreshCw, Info, Hash } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

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
  const { t } = useLanguage();
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
      setError(t.base91.encodingFailed);
    }
  };

  const handleDecode = () => {
    setError('');
    try {
      const bytes = base91Decode(input);
      const decoded = bytesToText(bytes);
      setOutput(decoded);
    } catch (e) {
      setError(t.base91.invalidBase91);
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
          {t.base91.backToHome}
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Hash size={36} style={{ color: 'var(--accent-color)' }} />
          {t.base91.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          {t.base91.subtitle}
        </p>
      </div>

      {/* Info Card */}
      <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-tertiary)' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <Info size={16} style={{ color: 'var(--accent-color)', marginRight: '0.5rem' }} />
            <strong>{t.base91.moreEfficient}</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', marginBottom: 0, fontSize: '0.9rem' }}>
              {t.base91.moreEfficientDesc}
            </p>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <Info size={16} style={{ color: 'var(--accent-color)', marginRight: '0.5rem' }} />
            <strong>{t.base91.chars91}</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', marginBottom: 0, fontSize: '0.9rem' }}>
              {t.base91.chars91Desc}
            </p>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <Info size={16} style={{ color: 'var(--accent-color)', marginRight: '0.5rem' }} />
            <strong>{t.base91.wideApplications}</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', marginBottom: 0, fontSize: '0.9rem' }}>
              {t.base91.wideApplicationsDesc}
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
          {t.base91.encode}
        </button>
        <button
          className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => { setMode('decode'); setError(''); }}
        >
          {t.base91.decode}
        </button>
      </div>

      {/* Input Area */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          {t.base91.input} {mode === 'encode' ? t.base91.inputLabelEncode : t.base91.inputLabelDecode}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? t.base91.inputPlaceholderEncode : t.base91.inputPlaceholderDecode}
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
          {mode === 'encode' ? t.base91.encode : t.base91.decode}
        </button>
        <button className="btn btn-secondary" onClick={handleSwap}>
          <RefreshCw size={16} style={{ marginRight: '0.25rem' }} />
          {t.base91.swap}
        </button>
        <button className="btn btn-secondary" onClick={handleClear}>
          {t.base91.clear}
        </button>
      </div>

      {/* Output Area */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          {t.base91.output} {mode === 'encode' ? t.base91.outputLabelEncode : t.base91.outputLabelDecode}
        </label>
        <div style={{ position: 'relative' }}>
          <textarea
            value={output}
            readOnly
            placeholder={t.base91.resultPlaceholder}
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
          {t.base91.efficiencyComparison}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-tertiary)' }}>64</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{t.base91.base64Charset}</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>91</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{t.base91.base91Charset}</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success-color)' }}>~7%</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{t.base91.spaceSaved}</div>
          </div>
        </div>
      </div>

    </div>
  );
}

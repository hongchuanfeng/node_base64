'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Shield, Key, AlertTriangle, Clock, FileJson } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface JWTPart {
  header: string;
  payload: string;
  signature: string;
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

function parseJWT(token: string): JWTPart | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return {
      header: parts[0],
      payload: parts[1],
      signature: parts[2]
    };
  } catch {
    return null;
  }
}

function formatJson(str: string): string {
  try {
    return JSON.stringify(JSON.parse(str), null, 2);
  } catch {
    return str;
  }
}

function formatTimestamp(epoch: number, locale: string = 'zh-CN'): string {
  if (epoch > 10000000000) {
    epoch = epoch / 1000;
  }
  const date = new Date(epoch * 1000);
  return date.toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US');
}

function isExpired(exp: number): boolean {
  if (!exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return exp < now;
}

function getTimeUntilExpiry(exp: number, isZh: boolean): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = exp - now;
  if (diff < 0) return isZh ? '已过期' : 'Expired';
  if (diff < 60) return `${diff}${isZh ? '秒后过期' : ' seconds expires'}`;
  if (diff < 3600) return `${Math.floor(diff / 60)}${isZh ? '分钟后过期' : ' minutes expires'}`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}${isZh ? '小时后过期' : ' hours expires'}`;
  return `${Math.floor(diff / 86400)}${isZh ? '天后过期' : ' days expires'}`;
}

export default function JWTPage() {
  const { t, language } = useLanguage();
  const [input, setInput] = useState('');
  const [parsed, setParsed] = useState<JWTPart | null>(null);
  const [headerJson, setHeaderJson] = useState('');
  const [payloadJson, setPayloadJson] = useState('');
  const [error, setError] = useState('');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [signatureStatus, setSignatureStatus] = useState<'none' | 'valid' | 'invalid' | 'unknown'>('none');

  useEffect(() => {
    if (input.trim()) {
      parseJWTInput();
    } else {
      setParsed(null);
      setHeaderJson('');
      setPayloadJson('');
      setError('');
    }
  }, [input]);

  const parseJWTInput = () => {
    setError('');
    const result = parseJWT(input.trim());

    if (!result) {
      setError(t.jwt.invalidJwtFormat);
      setParsed(null);
      setHeaderJson('');
      setPayloadJson('');
      setSignatureStatus('none');
      return;
    }

    setParsed(result);
    setHeaderJson(formatJson(base64UrlDecode(result.header)));
    setPayloadJson(formatJson(base64UrlDecode(result.payload)));
    setSignatureStatus('unknown');
  };

  const handleCopy = async (text: string, section: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleClear = () => {
    setInput('');
    setParsed(null);
    setHeaderJson('');
    setPayloadJson('');
    setError('');
  };

  const payload = parsed ? JSON.parse(base64UrlDecode(parsed.payload)) : null;
  const isExpiredToken = payload?.exp ? isExpired(payload.exp) : false;

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1rem' }}>
          <ArrowLeft size={16} />
          {t.jwt.backToHome}
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Key size={36} style={{ color: 'var(--accent-color)' }} />
          {t.jwt.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          {t.jwt.subtitle}
        </p>
      </div>

      {/* JWT Structure Info */}
      <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-tertiary)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileJson size={18} style={{ color: 'var(--accent-color)' }} />
          {t.jwt.jwtStructure}
        </h3>
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: '1rem',
          borderRadius: '8px',
          fontFamily: 'Monaco, Menlo, monospace',
          fontSize: '0.85rem',
          overflow: 'auto'
        }}>
          <div style={{ color: 'var(--text-secondary)' }}>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>▲ {t.jwt.header}</div>
          <div style={{ marginTop: '0.5rem', color: 'var(--accent-color)' }}>eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>▲ {t.jwt.payload}</div>
          <div style={{ marginTop: '0.5rem', color: 'var(--success-color)' }}>SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>▲ {t.jwt.signature}</div>
        </div>
      </div>

      {/* Input Area */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          {t.jwt.inputJwt}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.jwt.jwtPlaceholder}
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '1rem',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontFamily: 'Monaco, Menlo, monospace',
            fontSize: '0.9rem',
            resize: 'vertical'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button
            className="btn btn-secondary"
            onClick={handleClear}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          >
            {t.jwt.clear}
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
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertTriangle size={18} />
          {error}
        </div>
      )}

      {/* Parsed Results */}
      {parsed && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {/* Token Status */}
          <div className="card" style={{
            backgroundColor: isExpiredToken ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
            border: `1px solid ${isExpiredToken ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Shield size={24} style={{ color: isExpiredToken ? '#ef4444' : '#22c55e' }} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {isExpiredToken ? t.jwt.tokenExpired : t.jwt.tokenValid}
                  </div>
                  {payload?.exp && (
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {t.jwt.expiryTime}: {formatTimestamp(payload.exp, language)} ({getTimeUntilExpiry(payload.exp, language === 'zh')})
                    </div>
                  )}
                </div>
              </div>
              {payload?.iat && (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Clock size={14} style={{ marginRight: '0.25rem' }} />
                  {t.jwt.issuedTime}: {formatTimestamp(payload.iat, language)}
                </div>
              )}
            </div>
          </div>

          {/* Header */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                {t.jwt.header}
              </h3>
              <button
                onClick={() => handleCopy(headerJson, 'header')}
                className="btn btn-secondary"
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
              >
                {copiedSection === 'header' ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <pre style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              overflow: 'auto',
              margin: 0,
              border: '1px solid var(--border-color)'
            }}>
              {headerJson}
            </pre>
          </div>

          {/* Payload */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                {t.jwt.payload}
              </h3>
              <button
                onClick={() => handleCopy(payloadJson, 'payload')}
                className="btn btn-secondary"
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
              >
                {copiedSection === 'payload' ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <pre style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              overflow: 'auto',
              margin: 0,
              border: '1px solid var(--border-color)'
            }}>
              {payloadJson}
            </pre>
          </div>

          {/* Signature */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                {t.jwt.signature}
              </h3>
              <button
                onClick={() => handleCopy(parsed?.signature || '', 'signature')}
                className="btn btn-secondary"
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
              >
                {copiedSection === 'signature' ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <div style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              wordBreak: 'break-all',
              border: '1px solid var(--border-color)'
            }}>
              {parsed?.signature}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.5rem', marginBottom: 0 }}>
              {t.jwt.noteSignatureVerify}
            </p>
          </div>
        </div>
      )}

      {/* Footer Info */}
      {!parsed && !error && (
        <div className="card" style={{ backgroundColor: 'var(--bg-tertiary)', textAlign: 'center', padding: '2rem' }}>
          <Key size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '1rem' }} />
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            {t.jwt.pasteToParse}
          </p>
        </div>
      )}

    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { decodeBase64 } from '@/lib/base64';
import { Copy, Search, Trash2, Download, ArrowRight, Check } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/Toast';
import { useLanguage } from '@/hooks/useLanguage';

interface ExtractedItem {
  id: number;
  fullMatch: string;
  base64Content: string;
  decoded?: string;
  isValid: boolean;
  preview?: string;
}

export default function RegexExtractTool() {
  const { t, language } = useLanguage();
  const [input, setInput] = useState('');
  const [customPattern, setCustomPattern] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [results, setResults] = useState<ExtractedItem[]>([]);
  const [showDecoded, setShowDecoded] = useState<number[]>([]);
  const { toasts, showToast } = useToast();

  const commonPatterns = language === 'zh' ? [
    { name: t.regexExtract.dataUriImage, pattern: 'data:image/[^;]+;base64,([^"]+)', desc: t.regexExtract.dataUriImageDesc },
    { name: t.regexExtract.jwtPattern, pattern: '(eyJ[A-Za-z0-9_-]+\\.eyJ[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]*)', desc: t.regexExtract.jwtPatternDesc },
    { name: t.regexExtract.emailAttachment, pattern: 'Content-Transfer-Encoding:\\s*base64\\s*\\n([A-Za-z0-9+/=\\r\\n]+)', desc: t.regexExtract.emailAttachmentDesc },
    { name: t.regexExtract.pdfFile, pattern: 'data:application/pdf;base64,([^"]+)', desc: t.regexExtract.pdfFileDesc },
    { name: t.regexExtract.jsonField, pattern: '"([A-Za-z0-9+/]{20,}={0,2})"', desc: t.regexExtract.jsonFieldDesc },
    { name: t.regexExtract.xmlCdata, pattern: '<!\\[CDATA\\[([A-Za-z0-9+/]+={0,2})\\]\\]>', desc: t.regexExtract.xmlCdataDesc },
  ] : [
    { name: t.regexExtract.dataUriImage, pattern: 'data:image/[^;]+;base64,([^"]+)', desc: t.regexExtract.dataUriImageDesc },
    { name: t.regexExtract.jwtPattern, pattern: '(eyJ[A-Za-z0-9_-]+\\.eyJ[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]*)', desc: t.regexExtract.jwtPatternDesc },
    { name: t.regexExtract.emailAttachment, pattern: 'Content-Transfer-Encoding:\\s*base64\\s*\\n([A-Za-z0-9+/=\\r\\n]+)', desc: t.regexExtract.emailAttachmentDesc },
    { name: t.regexExtract.pdfFile, pattern: 'data:application/pdf;base64,([^"]+)', desc: t.regexExtract.pdfFileDesc },
    { name: t.regexExtract.jsonField, pattern: '"([A-Za-z0-9+/]{20,}={0,2})"', desc: t.regexExtract.jsonFieldDesc },
    { name: t.regexExtract.xmlCdata, pattern: '<!\\[CDATA\\[([A-Za-z0-9+/]+={0,2})\\]\\]>', desc: t.regexExtract.xmlCdataDesc },
  ];

  const extractAll = (pattern: string) => {
    if (!input.trim() || !pattern.trim()) {
      showToast(t.regexExtract.enterTextAndRegex, 'error');
      return;
    }

    try {
      const regex = new RegExp(pattern, 'gi');
      const matches: ExtractedItem[] = [];
      let id = 1;
      let match;

      while ((match = regex.exec(input)) !== null) {
        const base64Content = match[1] || match[0];
        const cleaned = base64Content.replace(/[\s\r\n]/g, '');
        
        let isValid = false;
        let decoded: string | undefined;
        let preview: string | undefined;

        try {
          decoded = decodeBase64(cleaned, 'utf-8');
          isValid = true;
          preview = decoded.substring(0, 100) + (decoded.length > 100 ? '...' : '');
        } catch {
          isValid = false;
        }

        matches.push({
          id: id++,
          fullMatch: match[0],
          base64Content: cleaned,
          decoded,
          isValid,
          preview
        });

        if (id > 100) break;
      }

      if (matches.length === 0) {
        showToast(t.regexExtract.noMatchFound, 'info');
      } else {
        setResults(matches);
        showToast(`${t.regexExtract.found} ${matches.length} ${t.regexExtract.matches}`, 'success');
      }
    } catch (e) {
      showToast(t.regexExtract.regexSyntaxError, 'error');
    }
  };

  const handlePatternSelect = (pattern: string) => {
    setSelectedPattern(pattern);
    setCustomPattern(pattern);
  };

  const handleExtract = () => {
    const pattern = customPattern || selectedPattern;
    if (pattern) {
      extractAll(pattern);
    }
  };

  const toggleDecode = (id: number) => {
    setShowDecoded(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(t.common.copiedToClipboard, 'success');
    } catch {
      showToast(t.common.copyFailed, 'error');
    }
  };

  const handleDownload = () => {
    const content = results.map((item, idx) => 
      `[${idx + 1}]\nOriginal: ${item.fullMatch}\nBase64: ${item.base64Content}\nDecoded: ${item.decoded || '(invalid)'}\nValid: ${item.isValid ? 'Yes' : 'No'}\n${'─'.repeat(50)}`
    ).join('\n\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extracted-base64-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t.regexExtract.downloaded, 'success');
  };

  const handleClear = () => {
    setInput('');
    setResults([]);
    setCustomPattern('');
    setSelectedPattern(null);
    setShowDecoded([]);
  };

  const handleCopyAllBase64 = () => {
    const all = results.map(r => r.base64Content).join('\n\n');
    handleCopy(all);
  };

  const handleCopyAllDecoded = () => {
    const all = results.filter(r => r.isValid).map(r => r.decoded).join('\n\n');
    handleCopy(all);
  };

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.regexExtract.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.regexExtract.subtitle}
        </p>
      </div>

      {/* Quick Patterns */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.regexExtract.commonPatterns}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {commonPatterns.map((p, idx) => (
            <div 
              key={idx}
              onClick={() => handlePatternSelect(p.pattern)}
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: selectedPattern === p.pattern ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                color: selectedPattern === p.pattern ? 'white' : 'var(--text-primary)',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s'
              }}
            >
              <div>
                <span style={{ fontWeight: 600 }}>{p.name}</span>
                <span style={{ marginLeft: '0.75rem', fontSize: '0.8rem', opacity: 0.7 }}>
                  {p.desc}
                </span>
              </div>
              {selectedPattern === p.pattern && <Check size={16} />}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Pattern */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.regexExtract.customRegex}
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={customPattern}
            onChange={(e) => {
              setCustomPattern(e.target.value);
              setSelectedPattern(null);
            }}
            placeholder={t.regexExtract.regexPlaceholder}
            className="input-field"
            style={{ flex: 1, fontFamily: 'monospace' }}
          />
          <button className="btn btn-primary" onClick={handleExtract}>
            <Search size={16} />
            {t.regexExtract.extract}
          </button>
        </div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
          {t.regexExtract.regexHint}
        </div>
      </div>

      {/* Input Area */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            {t.regexExtract.inputText}
          </h3>
          <button className="btn btn-secondary" onClick={handleClear}>
            <Trash2 size={14} />
            {t.common.clear}
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.regexExtract.inputPlaceholder}
          className="input-field"
          style={{ minHeight: '200px', fontFamily: 'monospace', fontSize: '0.9rem' }}
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
          {t.regexExtract.charCount}: {input.length} | {t.regexExtract.byteCount}: {new Blob([input]).size}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <>
          <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-tertiary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {t.regexExtract.found} {results.length} {t.regexExtract.matches}
                </span>
                <span style={{ color: 'var(--success-color)', fontSize: '0.9rem' }}>
                  ✓ {results.filter(r => r.isValid).length} {t.regexExtract.valid}
                </span>
                <span style={{ color: 'var(--error-color)', fontSize: '0.9rem' }}>
                  ✗ {results.filter(r => !r.isValid).length} {t.regexExtract.invalid}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={handleCopyAllBase64}>
                  <Copy size={14} />
                  {t.regexExtract.copyAllBase64}
                </button>
                <button className="btn btn-secondary" onClick={handleCopyAllDecoded}>
                  <Copy size={14} />
                  {t.regexExtract.copyAllDecoded}
                </button>
                <button className="btn btn-secondary" onClick={handleDownload}>
                  <Download size={14} />
                  {t.regexExtract.download}
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {results.map((item) => (
              <div key={item.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem',
                      backgroundColor: item.isValid ? 'var(--success-color)' : 'var(--error-color)',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      #{item.id}
                    </span>
                    <span style={{ 
                      padding: '0.25rem 0.5rem',
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)'
                    }}>
                      {item.base64Content.length} chars
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => toggleDecode(item.id)}
                      style={{ padding: '0.4rem' }}
                    >
                      {showDecoded.includes(item.id) ? <ArrowRight size={14} /> : <Search size={14} />}
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleCopy(item.base64Content)}
                      style={{ padding: '0.4rem' }}
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>{t.regexExtract.originalMatch}:</div>
                  <div style={{ 
                    padding: '0.5rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    wordBreak: 'break-all',
                    maxHeight: '80px',
                    overflow: 'auto',
                    color: 'var(--text-secondary)'
                  }}>
                    {item.fullMatch.length > 200 ? item.fullMatch.substring(0, 200) + '...' : item.fullMatch}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>{t.regexExtract.base64Content}:</div>
                  <div style={{ 
                    padding: '0.5rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    wordBreak: 'break-all',
                    color: 'var(--accent-color)'
                  }}>
                    {item.base64Content.length > 100 ? item.base64Content.substring(0, 100) + '...' : item.base64Content}
                  </div>
                </div>

                {showDecoded.includes(item.id) && item.decoded && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>{t.regexExtract.decodedResult}:</div>
                    <div style={{ 
                      padding: '0.5rem',
                      backgroundColor: item.isValid ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      wordBreak: 'break-all',
                      whiteSpace: 'pre-wrap',
                      color: 'var(--text-primary)'
                    }}>
                      {item.decoded}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Tips */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.regexExtract.tips}
        </h3>
        <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <div>💡 {t.regexExtract.tipHtml}</div>
          <div>💡 {t.regexExtract.tipJson}</div>
          <div>💡 {t.regexExtract.tipJwt}</div>
          <div>💡 {t.regexExtract.tipCustom}</div>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

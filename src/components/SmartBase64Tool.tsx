'use client';

import { useState, useCallback } from 'react';
import { encodeBase64, decodeBase64 } from '@/lib/base64';
import { Copy, Info, Zap, FileCode } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/Toast';
import { useLanguage } from '@/hooks/useLanguage';
import PrivacyIndicator from './PrivacyIndicator';

export default function SmartBase64Tool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [lineBreak, setLineBreak] = useState('none');
  const [customLineLength, setCustomLineLength] = useState(64);
  const [strictMode, setStrictMode] = useState<'strict' | 'lax'>('lax');
  const [urlSafe, setUrlSafe] = useState(false);
  const [showSnippet, setShowSnippet] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python' | 'java'>('javascript');
  const [smartDetection, setSmartDetection] = useState<{
    type: string;
    suggestion: string;
    confidence: number;
  } | null>(null);
  const { toasts, showToast } = useToast();

  const processLineBreak = useCallback((str: string) => {
    switch (lineBreak) {
      case 'mime':
        return str.match(/.{1,76}/g)?.join('\n') || str;
      case 'custom':
        return str.match(new RegExp(`.{1,${customLineLength}}`, 'g'))?.join('\n') || str;
      default:
        return str;
    }
  }, [lineBreak, customLineLength]);

  const cleanInput = useCallback((str: string) => {
    if (strictMode === 'lax') {
      return str.replace(/[\s\r\n]/g, '');
    }
    return str;
  }, [strictMode]);

  const convertToUrlSafe = useCallback((str: string) => {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }, []);

  const convertFromUrlSafe = useCallback((str: string) => {
    let result = str.replace(/-/g, '+').replace(/_/g, '/');
    const padding = result.length % 4;
    if (padding) {
      result += '='.repeat(4 - padding);
    }
    return result;
  }, []);

  const detectContent = useCallback((base64Str: string) => {
    try {
      const cleaned = cleanInput(base64Str);
      const decoded = atob(cleaned);
      const bytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
      }

      if (bytes[0] === 0xFF && bytes[1] === 0xD8) {
        return { type: t.tools.smartBase64.imageJpeg, suggestion: t.tools.smartBase64.detectedJpeg, confidence: 95 };
      }
      if (bytes[0] === 0x89 && bytes[1] === 0x50) {
        return { type: t.tools.smartBase64.imagePng, suggestion: t.tools.smartBase64.detectedPng, confidence: 95 };
      }
      if (bytes[0] === 0x47 && bytes[1] === 0x49) {
        return { type: t.tools.smartBase64.imageGif, suggestion: t.tools.smartBase64.detectedGif, confidence: 95 };
      }

      if (decoded.startsWith('{') || decoded.startsWith('[')) {
        try {
          JSON.parse(decoded);
          return { type: 'JSON', suggestion: t.tools.smartBase64.detectedJson, confidence: 90 };
        } catch {}
      }

      if (decoded.startsWith('<!DOCTYPE') || decoded.startsWith('<html')) {
        return { type: 'HTML', suggestion: t.tools.smartBase64.detectedHtml, confidence: 85 };
      }

      if (decoded.match(/^[\x20-\x7E\s]+$/)) {
        return { type: t.tools.smartBase64.plainText, suggestion: t.tools.smartBase64.detectedPlainText, confidence: 75 };
      }

      return { type: t.tools.smartBase64.binaryData, suggestion: t.tools.smartBase64.detectedBinary, confidence: 60 };
    } catch {
      return { type: t.tools.smartBase64.unknown, suggestion: t.tools.smartBase64.cannotDetect, confidence: 30 };
    }
  }, [cleanInput, t]);

  const handleEncode = useCallback(() => {
    if (!input.trim()) {
      showToast(t.errors.inputEmpty, 'error');
      return;
    }
    try {
      let result = encodeBase64(input, 'utf-8');
      result = processLineBreak(result);
      if (urlSafe) {
        result = convertToUrlSafe(result);
      }
      setOutput(result);
      showToast(t.common.success, 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : t.errors.encodingFailed, 'error');
    }
  }, [input, processLineBreak, urlSafe, convertToUrlSafe, showToast, t]);

  const handleDecode = useCallback(() => {
    if (!input.trim()) {
      showToast(t.errors.base64InputEmpty, 'error');
      return;
    }
    try {
      let cleaned = cleanInput(input);
      if (urlSafe) {
        cleaned = convertFromUrlSafe(cleaned);
      }
      const result = decodeBase64(cleaned, 'utf-8');
      setOutput(result);
      setSmartDetection(detectContent(input));
      showToast(t.common.success, 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : t.errors.decodingFailed, 'error');
    }
  }, [input, cleanInput, urlSafe, convertFromUrlSafe, detectContent, showToast, t]);

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

  const handleExtractFromRegex = useCallback(() => {
    const patterns = [
      /data:image\/[^;]+;base64,([^"]+)/,
      /base64[,:]\s*([A-Za-z0-9+/=]{20,})/i,
    ];
    
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) {
        setInput(match[1]);
        showToast(t.tools.smartBase64.base64Extracted, 'success');
        return;
      }
    }
    showToast(t.tools.smartBase64.noBase64Found, 'error');
  }, [input, showToast, t]);

  const codeSnippets = {
    javascript: (code: string, m: string) => `// ${m === 'encode' ? t.common.encode : t.common.decode} Base64\nconst base64 = ${m === 'encode' ? `"${code.substring(0, 50)}${code.length > 50 ? '...' : ''}"` : `atob("${code.substring(0, 50)}${code.length > 50 ? '...' : ''}")`};\nconsole.log(base64);`,
    python: (code: string, m: string) => `import base64\n\n# ${m === 'encode' ? t.common.encode : t.common.decode} Base64\nbase64_str = ${m === 'encode' ? `base64.b64encode("${code.substring(0, 50)}${code.length > 50 ? '...' : ''}".encode()).decode()` : `base64.b64decode("${code.substring(0, 50)}${code.length > 50 ? '...' : ''}").decode()`}`,
    java: (code: string, m: string) => `import java.util.Base64;\n\npublic class Base64Example {\n    public static void main(String[] args) {\n        String input = "${code.substring(0, 50)}${code.length > 50 ? '...' : ''}";\n        ${m === 'encode' 
          ? `String encoded = Base64.getEncoder().encodeToString(input.getBytes());` 
          : `String decoded = new String(Base64.getDecoder().decode(input));`};
        System.out.println(${m === 'encode' ? 'encoded' : 'decoded'});
    }\n}`,
  };

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.tools.smartBase64.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>{t.tools.smartBase64.description}</p>
        <div style={{ marginTop: '1rem' }}>
          <PrivacyIndicator />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'stretch' }}>
        {/* Input Panel */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>{t.common.input}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={handleExtractFromRegex}
                title={t.tools.smartBase64.extractFromText}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
              >
                <FileCode size={14} />
                {t.tools.smartBase64.extractBase64}
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? t.tools.smartBase64.placeholder.encode : t.tools.smartBase64.placeholder.decode}
            className="input-field"
            style={{ minHeight: '200px', fontFamily: 'monospace' }}
          />
        </div>

        {/* Center Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
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
          <button 
            className="btn btn-primary" 
            onClick={mode === 'encode' ? handleEncode : handleDecode}
          >
            {mode === 'encode' ? `${t.common.encode} →` : `← ${t.common.decode}`}
          </button>
        </div>

        {/* Output Panel */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>{t.common.output}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary copy-btn" 
                onClick={() => setShowSnippet(!showSnippet)}
                title={t.tools.smartBase64.codeSnippet}
                style={{ fontSize: '0.8rem' }}
              >
                <Zap size={14} />
                {t.common.code}
              </button>
              <button className="btn btn-secondary copy-btn" onClick={handleCopy} title={t.common.copy}>
                <Copy size={16} />
                {t.common.copy}
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.tools.smartBase64.placeholder.output}
            className="input-field"
            style={{ minHeight: '200px', fontFamily: 'monospace', backgroundColor: 'var(--bg-tertiary)' }}
          />
        </div>
      </div>

      {/* Smart Detection Result */}
      {smartDetection && mode === 'decode' && (
        <div className="card" style={{ marginTop: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'var(--accent-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Info size={20} color="var(--accent-color)" />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {t.tools.smartBase64.smartDetection}：{smartDetection.type}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginLeft: '0.5rem' }}>
                  {t.tools.smartBase64.confidence} {smartDetection.confidence}%
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                {smartDetection.suggestion}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Code Snippet Generator */}
      {showSnippet && output && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600 }}>{t.tools.smartBase64.codeSnippet}</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['javascript', 'python', 'java'] as const).map((lang) => (
                <button
                  key={lang}
                  className={`btn ${selectedLanguage === lang ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelectedLanguage(lang)}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
                >
                  {lang === 'javascript' ? 'JS' : lang === 'python' ? 'Python' : 'Java'}
                </button>
              ))}
            </div>
          </div>
          <pre style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontFamily: 'monospace',
            overflow: 'auto'
          }}>
            {codeSnippets[selectedLanguage](output, mode)}
          </pre>
          <button 
            className="btn btn-primary" 
            style={{ marginTop: '1rem' }}
            onClick={() => {
              navigator.clipboard.writeText(codeSnippets[selectedLanguage](output, mode));
              showToast(t.common.copiedCode, 'success');
            }}
          >
            <Copy size={16} />
            {t.common.copy}
          </button>
        </div>
      )}

      {/* Settings */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Line Break Control */}
          <div className="input-wrapper">
            <label className="input-label">{t.tools.smartBase64.lineBreakControl}</label>
            <select
              value={lineBreak}
              onChange={(e) => setLineBreak(e.target.value)}
              className="input-field"
              style={{ padding: '0.5rem 1rem' }}
            >
              <option value="none">{t.tools.smartBase64.lineBreakNone}</option>
              <option value="mime">{t.tools.smartBase64.lineBreakMime}</option>
              <option value="custom">{t.tools.smartBase64.lineBreakCustom}</option>
            </select>
            {lineBreak === 'custom' && (
              <input
                type="number"
                value={customLineLength}
                onChange={(e) => setCustomLineLength(Number(e.target.value))}
                min={10}
                max={200}
                className="input-field"
                style={{ marginTop: '0.5rem', padding: '0.4rem 0.75rem', width: '100px' }}
              />
            )}
          </div>

          {/* Strict Mode */}
          <div className="input-wrapper">
            <label className="input-label">{t.tools.smartBase64.parseMode}</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className={`btn ${strictMode === 'strict' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setStrictMode('strict')}
                style={{ fontSize: '0.85rem' }}
              >
                {t.tools.smartBase64.strictMode}
              </button>
              <button
                className={`btn ${strictMode === 'lax' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setStrictMode('lax')}
                style={{ fontSize: '0.85rem' }}
              >
                {t.tools.smartBase64.laxMode}
              </button>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
              {strictMode === 'strict' ? t.tools.smartBase64.strictModeHint : t.tools.smartBase64.laxModeHint}
            </div>
          </div>

          {/* URL Safe */}
          <div className="input-wrapper">
            <label className="input-label">{t.tools.smartBase64.urlSafeConversion}</label>
            <button
              className={`btn ${urlSafe ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setUrlSafe(!urlSafe)}
            >
              {urlSafe ? t.common.enabled : t.common.disabled}
            </button>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
              {t.tools.smartBase64.urlSafeHint}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

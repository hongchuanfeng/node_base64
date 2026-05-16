'use client';

import { useState, useCallback } from 'react';
import { isValidBase64, detectBase64ContentType, analyzeBase64Structure, estimateBase64FileSize } from '@/lib/base64';
import { useToast, ToastContainer } from '@/components/Toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Search, FileText, Image, File, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

export default function AnalyzeTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<{
    isValid: boolean;
    contentType: ReturnType<typeof detectBase64ContentType>;
    structure: ReturnType<typeof analyzeBase64Structure>;
    size: ReturnType<typeof estimateBase64FileSize>;
  } | null>(null);
  const { toasts, showToast } = useToast();

  const handleAnalyze = useCallback(() => {
    if (!input.trim()) {
      showToast(t.errors.base64InputEmpty, 'error');
      return;
    }

    try {
      const isValid = isValidBase64(input);
      const contentType = detectBase64ContentType(input);
      const structure = analyzeBase64Structure(input);
      const size = estimateBase64FileSize(input);

      setAnalysis({ isValid, contentType, structure, size });
      showToast(t.common.success, 'success');
    } catch (error) {
      showToast(t.errors.decodingFailed, 'error');
    }
  }, [input, showToast, t]);

  const handleReset = useCallback(() => {
    setInput('');
    setAnalysis(null);
  }, []);

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.tools.analyze.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.tools.analyze.description}
        </p>
      </div>

      {/* Input Area */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: 600 }}>{t.tools.imageBase64.inputBase64}</h3>
          <button className="btn btn-secondary" onClick={handleReset}>{t.common.clear}</button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.tools.analyze.placeholder}
          className="input-field"
          style={{ minHeight: '150px', fontFamily: 'monospace' }}
        />
        <button
          className="btn btn-primary"
          onClick={handleAnalyze}
          style={{ marginTop: '1rem', width: '100%' }}
        >
          <Search size={16} />
          {t.tools.analyze.analyze}
        </button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {/* Validation Status */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {analysis.isValid ? (
                <>
                  <CheckCircle size={20} style={{ color: 'var(--success-color)' }} />
                  {t.tools.analyze.analyze}
                </>
              ) : (
                <>
                  <XCircle size={20} style={{ color: 'var(--error-color)' }} />
                  {t.tools.analyze.analyze}
                </>
              )}
            </h3>
            <div style={{
              padding: '1rem',
              backgroundColor: analysis.isValid ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: analysis.isValid ? 'var(--success-color)' : 'var(--error-color)'
              }}>
                {analysis.isValid ? 'Valid Base64' : 'Invalid Base64'}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {analysis.isValid 
                  ? 'Input string conforms to Base64 encoding specification'
                  : 'Input string does not conform to Base64 encoding specification'}
              </p>
            </div>
          </div>

          {/* Content Type */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {analysis.contentType.type === 'image' ? (
                <Image size={20} style={{ color: 'var(--accent-color)' }} />
              ) : analysis.contentType.type === 'pdf' ? (
                <File size={20} style={{ color: 'var(--accent-color)' }} />
              ) : analysis.contentType.type === 'text' ? (
                <FileText size={20} style={{ color: 'var(--accent-color)' }} />
              ) : (
                <AlertTriangle size={20} style={{ color: 'var(--warning-color)' }} />
              )}
              {t.tools.analyze.contentType}
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>{t.tools.analyze.contentType}</span>
                <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{analysis.contentType.type}</span>
              </div>
              {analysis.contentType.mimeType && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>MIME Type</span>
                  <span style={{ fontWeight: 500 }}>{analysis.contentType.mimeType}</span>
                </div>
              )}
              {analysis.contentType.info && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Details</span>
                  <span style={{ fontWeight: 500 }}>{analysis.contentType.info}</span>
                </div>
              )}
            </div>
          </div>

          {/* Structure Analysis */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={20} style={{ color: 'var(--accent-color)' }} />
              Structure Analysis
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>{t.tools.fileBase64.base64Length}</span>
                <span style={{ fontWeight: 500 }}>{analysis.structure.length} chars</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Padding</span>
                <span style={{ fontWeight: 500 }}>{analysis.structure.paddingChars} (=)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Entropy</span>
                <span style={{ fontWeight: 500 }}>{analysis.structure.entropy} bits</span>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Character Distribution</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--accent-color)', fontWeight: 600 }}>{analysis.structure.charSet.uppercase}</div>
                    <div style={{ color: 'var(--text-tertiary)' }}>Upper</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--success-color)', fontWeight: 600 }}>{analysis.structure.charSet.lowercase}</div>
                    <div style={{ color: 'var(--text-tertiary)' }}>Lower</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--warning-color)', fontWeight: 600 }}>{analysis.structure.charSet.digits}</div>
                    <div style={{ color: 'var(--text-tertiary)' }}>Digit</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{analysis.structure.charSet.symbols}</div>
                    <div style={{ color: 'var(--text-tertiary)' }}>Symbol</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Size Analysis */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <File size={20} style={{ color: 'var(--accent-color)' }} />
              Size Analysis
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Base64 Size</span>
                <span style={{ fontWeight: 500 }}>{analysis.size.encodedSize} bytes</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Decoded Size</span>
                <span style={{ fontWeight: 500 }}>{analysis.size.decodedSize} bytes</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Overhead</span>
                <span style={{ fontWeight: 500 }}>{analysis.size.compressionRatio}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}

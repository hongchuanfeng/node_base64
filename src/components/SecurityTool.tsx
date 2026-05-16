'use client';

import { useState, useCallback } from 'react';
import { detectHiddenContent, encryptAES, decryptAES, HiddenContentDetection } from '@/lib/crypto';
import { useToast, ToastContainer } from '@/components/Toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Shield, Lock, Eye, AlertTriangle, Key, Unlock } from 'lucide-react';

export default function SecurityTool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [detectionResult, setDetectionResult] = useState<HiddenContentDetection | null>(null);
  const [encryptPassword, setEncryptPassword] = useState('');
  const [encryptInput, setEncryptInput] = useState('');
  const [encryptOutput, setEncryptOutput] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [activeTab, setActiveTab] = useState<'detect' | 'encrypt'>('detect');
  const { toasts, showToast } = useToast();

  const handleDetect = useCallback(() => {
    if (!input.trim()) {
      showToast(t.errors.base64InputEmpty, 'error');
      return;
    }

    try {
      const result = detectHiddenContent(input);
      setDetectionResult(result);
      showToast(t.common.success, 'success');
    } catch {
      showToast(t.common.error, 'error');
    }
  }, [input, showToast, t]);

  const handleEncrypt = useCallback(async () => {
    if (!encryptInput.trim()) {
      showToast(t.errors.inputEmpty, 'error');
      return;
    }
    if (!encryptPassword.trim()) {
      showToast('Please enter password', 'error');
      return;
    }

    setIsEncrypting(true);
    try {
      const encrypted = await encryptAES(encryptInput, encryptPassword);
      setEncryptOutput(encrypted);
      showToast(t.common.success, 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : t.errors.encodingFailed, 'error');
    } finally {
      setIsEncrypting(false);
    }
  }, [encryptInput, encryptPassword, showToast, t]);

  const handleDecrypt = useCallback(async () => {
    if (!encryptInput.trim()) {
      showToast(t.errors.base64InputEmpty, 'error');
      return;
    }
    if (!encryptPassword.trim()) {
      showToast('Please enter password', 'error');
      return;
    }

    setIsEncrypting(true);
    try {
      const decrypted = await decryptAES(encryptInput, encryptPassword);
      setEncryptOutput(decrypted);
      showToast(t.common.success, 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : t.errors.decodingFailed, 'error');
    } finally {
      setIsEncrypting(false);
    }
  }, [encryptInput, encryptPassword, showToast, t]);

  const handleCopy = useCallback(async () => {
    if (!encryptOutput) return;
    try {
      await navigator.clipboard.writeText(encryptOutput);
      showToast(t.common.copiedToClipboard, 'success');
    } catch {
      showToast(t.common.copyFailed, 'error');
    }
  }, [encryptOutput, showToast, t]);

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.tools.security.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.tools.security.description}
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'detect' ? 'active' : ''}`}
          onClick={() => setActiveTab('detect')}
        >
          <Shield size={16} style={{ marginRight: '0.5rem' }} />
          {t.tools.security.title}
        </button>
        <button
          className={`tab ${activeTab === 'encrypt' ? 'active' : ''}`}
          onClick={() => setActiveTab('encrypt')}
        >
          <Lock size={16} style={{ marginRight: '0.5rem' }} />
          AES + Base64
        </button>
      </div>

      {activeTab === 'detect' ? (
        /* Hidden Content Detection */
        <div>
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>{t.tools.imageBase64.inputBase64}</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.tools.security.placeholder}
              className="input-field"
              style={{ minHeight: '150px', fontFamily: 'monospace' }}
            />
            <button
              className="btn btn-primary"
              onClick={handleDetect}
              style={{ marginTop: '1rem', width: '100%' }}
            >
              <Eye size={16} />
              {t.tools.security.detect}
            </button>
          </div>

          {detectionResult && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              {/* Overall Status */}
              <div className="card">
                <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {detectionResult.hasHiddenContent ? (
                    <>
                      <AlertTriangle size={20} style={{ color: 'var(--error-color)' }} />
                      Security Warning
                    </>
                  ) : (
                    <>
                      <Shield size={20} style={{ color: 'var(--success-color)' }} />
                      {t.tools.security.detectionResult}
                    </>
                  )}
                </h3>
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: detectionResult.hasHiddenContent 
                    ? 'rgba(239, 68, 68, 0.1)' 
                    : 'rgba(34, 197, 94, 0.1)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: detectionResult.hasHiddenContent ? 'var(--error-color)' : 'var(--success-color)'
                  }}>
                    {detectionResult.hasHiddenContent ? 'Suspicious Content Detected' : 'No Anomalies Detected'}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    {detectionResult.recommendation}
                  </p>
                </div>
              </div>

              {/* Suspicious Patterns */}
              <div className="card">
                <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={20} style={{ color: 'var(--warning-color)' }} />
                  Suspicious Pattern Detection
                </h3>
                {detectionResult.suspiciousPatterns.length === 0 ? (
                  <p style={{ color: 'var(--success-color)', textAlign: 'center', padding: '1rem' }}>
                    No suspicious patterns found
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {detectionResult.suspiciousPatterns.map((pattern, index) => (
                      <div key={index} style={{
                        padding: '0.75rem',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '8px',
                        color: 'var(--error-color)',
                        fontSize: '0.9rem'
                      }}>
                        {pattern}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Entropy Analysis */}
              <div className="card">
                <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Data Entropy Analysis</h3>
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
                    {detectionResult.entropyScore}
                  </p>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                    bits/char
                  </p>
                  <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {detectionResult.entropyScore < 4 && 'Low entropy - Data may be repetitive patterns'}
                    {detectionResult.entropyScore >= 4 && detectionResult.entropyScore < 6 && 'Medium entropy - Data is close to random'}
                    {detectionResult.entropyScore >= 6 && detectionResult.entropyScore < 7 && 'High entropy - Data is close to fully random'}
                    {detectionResult.entropyScore >= 7 && 'Very high entropy - Data may be strongly encrypted'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* AES Encryption */
        <div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Encryption/Decryption Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-wrapper">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  value={encryptPassword}
                  onChange={(e) => setEncryptPassword(e.target.value)}
                  placeholder="Enter encryption/decryption password..."
                  className="input-field"
                />
              </div>
              <div className="input-wrapper">
                <label className="input-label">Input Text or Base64</label>
                <textarea
                  value={encryptInput}
                  onChange={(e) => setEncryptInput(e.target.value)}
                  placeholder={t.errors.inputEmpty}
                  className="input-field"
                  style={{ minHeight: '150px', fontFamily: 'monospace' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                className="btn btn-primary"
                onClick={handleEncrypt}
                disabled={isEncrypting}
              >
                <Lock size={16} />
                {t.common.encode}
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleDecrypt}
                disabled={isEncrypting}
              >
                <Unlock size={16} />
                {t.common.decode}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 600 }}>{t.common.output}</h3>
              <button
                className="btn btn-secondary"
                onClick={handleCopy}
                disabled={!encryptOutput}
              >
                {t.common.copy}
              </button>
            </div>
            <div className="result-area" style={{ minHeight: '150px' }}>
              {encryptOutput || t.tools.textBase64.placeholder.output}
            </div>
          </div>

          {/* Info */}
          <div className="card" style={{ marginTop: '1.5rem', backgroundColor: 'rgba(59, 130, 246, 0.05)' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Key size={20} style={{ color: 'var(--accent-color)' }} />
              About AES Encryption
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              AES (Advanced Encryption Standard) is a symmetric encryption algorithm. This tool uses AES-GCM mode with 256-bit key for encryption.
              The encrypted result will be automatically converted to Base64 format for easy storage and transmission.
              Please keep your password safe, it cannot be recovered if lost.
            </p>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}

'use client';

import { useState, useCallback } from 'react';
import { detectHiddenContent, encryptAES, decryptAES, HiddenContentDetection } from '@/lib/crypto';
import { useToast, ToastContainer } from '@/components/Toast';
import { Shield, Lock, Eye, AlertTriangle, Key, Unlock } from 'lucide-react';

export default function SecurityTool() {
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
      showToast('请输入要检测的Base64字符串', 'error');
      return;
    }

    try {
      const result = detectHiddenContent(input);
      setDetectionResult(result);
      showToast('检测完成', 'success');
    } catch {
      showToast('检测失败', 'error');
    }
  }, [input, showToast]);

  const handleEncrypt = useCallback(async () => {
    if (!encryptInput.trim()) {
      showToast('请输入要加密的文本', 'error');
      return;
    }
    if (!encryptPassword.trim()) {
      showToast('请输入密码', 'error');
      return;
    }

    setIsEncrypting(true);
    try {
      const encrypted = await encryptAES(encryptInput, encryptPassword);
      setEncryptOutput(encrypted);
      showToast('加密成功', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : '加密失败', 'error');
    } finally {
      setIsEncrypting(false);
    }
  }, [encryptInput, encryptPassword, showToast]);

  const handleDecrypt = useCallback(async () => {
    if (!encryptInput.trim()) {
      showToast('请输入要解密的Base64字符串', 'error');
      return;
    }
    if (!encryptPassword.trim()) {
      showToast('请输入密码', 'error');
      return;
    }

    setIsEncrypting(true);
    try {
      const decrypted = await decryptAES(encryptInput, encryptPassword);
      setEncryptOutput(decrypted);
      showToast('解密成功', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : '解密失败，请检查密码是否正确', 'error');
    } finally {
      setIsEncrypting(false);
    }
  }, [encryptInput, encryptPassword, showToast]);

  const handleCopy = useCallback(async () => {
    if (!encryptOutput) return;
    try {
      await navigator.clipboard.writeText(encryptOutput);
      showToast('已复制到剪贴板', 'success');
    } catch {
      showToast('复制失败', 'error');
    }
  }, [encryptOutput, showToast]);

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          安全相关工具
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Base64隐藏信息检测、AES加密+Base64组合编码功能，保护您的数据安全。
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'detect' ? 'active' : ''}`}
          onClick={() => setActiveTab('detect')}
        >
          <Shield size={16} style={{ marginRight: '0.5rem' }} />
          隐藏信息检测
        </button>
        <button
          className={`tab ${activeTab === 'encrypt' ? 'active' : ''}`}
          onClick={() => setActiveTab('encrypt')}
        >
          <Lock size={16} style={{ marginRight: '0.5rem' }} />
          AES加密+Base64
        </button>
      </div>

      {activeTab === 'detect' ? (
        /* Hidden Content Detection */
        <div>
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>输入Base64字符串</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="在此粘贴Base64字符串进行安全检测..."
              className="input-field"
              style={{ minHeight: '150px', fontFamily: 'monospace' }}
            />
            <button
              className="btn btn-primary"
              onClick={handleDetect}
              style={{ marginTop: '1rem', width: '100%' }}
            >
              <Eye size={16} />
              开始检测
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
                      安全警示
                    </>
                  ) : (
                    <>
                      <Shield size={20} style={{ color: 'var(--success-color)' }} />
                      检测结果
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
                    {detectionResult.hasHiddenContent ? '检测到可疑内容' : '未检测到异常'}
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
                  可疑模式检测
                </h3>
                {detectionResult.suspiciousPatterns.length === 0 ? (
                  <p style={{ color: 'var(--success-color)', textAlign: 'center', padding: '1rem' }}>
                    未发现可疑模式
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
                <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>数据熵值分析</h3>
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
                    bits/字符
                  </p>
                  <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {detectionResult.entropyScore < 4 && '低熵值 - 数据可能是重复模式'}
                    {detectionResult.entropyScore >= 4 && detectionResult.entropyScore < 6 && '中等熵值 - 数据接近随机'}
                    {detectionResult.entropyScore >= 6 && detectionResult.entropyScore < 7 && '较高熵值 - 数据接近完全随机'}
                    {detectionResult.entropyScore >= 7 && '高熵值 - 数据可能经过强加密'}
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
            <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>加密/解密设置</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-wrapper">
                <label className="input-label">密码</label>
                <input
                  type="password"
                  value={encryptPassword}
                  onChange={(e) => setEncryptPassword(e.target.value)}
                  placeholder="输入加密/解密密码..."
                  className="input-field"
                />
              </div>
              <div className="input-wrapper">
                <label className="input-label">输入文本或Base64</label>
                <textarea
                  value={encryptInput}
                  onChange={(e) => setEncryptInput(e.target.value)}
                  placeholder="输入要加密/解密的文本..."
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
                加密
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleDecrypt}
                disabled={isEncrypting}
              >
                <Unlock size={16} />
                解密
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontWeight: 600 }}>输出结果</h3>
              <button
                className="btn btn-secondary"
                onClick={handleCopy}
                disabled={!encryptOutput}
              >
                复制
              </button>
            </div>
            <div className="result-area" style={{ minHeight: '150px' }}>
              {encryptOutput || '输出结果将显示在这里...'}
            </div>
          </div>

          {/* Info */}
          <div className="card" style={{ marginTop: '1.5rem', backgroundColor: 'rgba(59, 130, 246, 0.05)' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Key size={20} style={{ color: 'var(--accent-color)' }} />
              关于AES加密
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              AES（高级加密标准）是一种对称加密算法，本工具使用256位密钥的AES-GCM模式进行加密。
              加密后的结果将自动转换为Base64格式，方便存储和传输。
              请妥善保管您的密码，丢失将无法恢复数据。
            </p>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}

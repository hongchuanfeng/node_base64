'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { encodeBase64, decodeBase64 } from '@/lib/base64';
import { Trash2, Eye, EyeOff, Clock, Shield, AlertTriangle, Copy, Download, Lock } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/Toast';

const TIMEOUT_OPTIONS = [
  { label: '10秒', value: 10 },
  { label: '30秒', value: 30 },
  { label: '1分钟', value: 60 },
  { label: '5分钟', value: 300 },
  { label: '10分钟', value: 600 },
  { label: '30分钟', value: 1800 },
];

export default function SelfDestructTool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selfDestruct, setSelfDestruct] = useState(true);
  const [timeout, setTimeout] = useState(300);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [copyCount, setCopyCount] = useState(0);
  const { toasts, showToast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setTimeLeft(null);
    setIsActive(false);
    setCopyCount(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    showToast('所有数据已自动清除', 'success');
  }, [showToast]);

  const startTimer = useCallback(() => {
    if (!selfDestruct || timeLeft !== null) return;
    
    setTimeLeft(timeout);
    setIsActive(true);
    
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearAll();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, [selfDestruct, timeout, timeLeft, clearAll]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimeLeft(null);
    setIsActive(false);
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      if (isActive && timeLeft !== null) {
        setTimeLeft(timeout);
      }
    };

    if (isActive) {
      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keydown', handleActivity);
      window.addEventListener('click', handleActivity);
      window.addEventListener('scroll', handleActivity);
    }

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [isActive, timeout, timeLeft]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (input || output) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [input, output]);

  const handleProcess = () => {
    if (!input.trim()) {
      showToast('请输入内容', 'error');
      return;
    }

    try {
      let result: string;
      if (mode === 'encode') {
        result = encodeBase64(input, 'utf-8');
      } else {
        result = decodeBase64(input.replace(/\s/g, ''), 'utf-8');
      }
      setOutput(result);
      startTimer();
    } catch (e) {
      showToast(mode === 'encode' ? '编码失败' : '解码失败：无效的 Base64', 'error');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopyCount(prev => prev + 1);
      showToast('已复制到剪贴板', 'success');
      if (selfDestruct) {
        setTimeLeft(prev => Math.max(1, (prev || timeout) - 5));
      }
    } catch {
      showToast('复制失败', 'error');
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `base64-result-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('文件已下载', 'success');
    if (selfDestruct) {
      setTimeLeft(prev => Math.max(1, (prev || timeout) - 10));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={28} color="var(--accent-color)" />
          自毁模式
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          处理完成后自动清除数据，防止敏感信息泄露。离开页面、复制或下载都会缩短倒计时
        </p>
      </div>

      {/* Security Notice */}
      <div className="card" style={{ 
        marginBottom: '1.5rem', 
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <AlertTriangle size={24} color="#ef4444" />
          <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>安全提醒</h3>
        </div>
        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: 2, fontSize: '0.9rem' }}>
          <li>所有处理在浏览器本地完成，数据不会上传到服务器</li>
          <li>启用自毁后，页面刷新、关闭或超时都会自动清除数据</li>
          <li>复制或下载操作会额外缩短倒计时</li>
          <li>如有需要，可在倒计时结束前手动清除数据</li>
        </ul>
      </div>

      {/* Timer Status */}
      {isActive && timeLeft !== null && (
        <div className="card" style={{ 
          marginBottom: '1.5rem', 
          backgroundColor: timeLeft < 30 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.1)',
          border: `1px solid ${timeLeft < 30 ? 'var(--error-color)' : 'var(--success-color)'}`,
          textAlign: 'center',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
            <div>
              <Clock size={32} color={timeLeft < 30 ? '#ef4444' : '#22c55e'} />
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: timeLeft < 30 ? '#ef4444' : '#22c55e' }}>
                {formatTime(timeLeft)}
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>后自动清除所有数据</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={stopTimer}
                disabled={copyCount > 0}
              >
                <EyeOff size={14} />
                暂停
              </button>
              <button 
                className="btn btn-primary" 
                onClick={clearAll}
              >
                <Trash2 size={14} />
                立即清除
              </button>
            </div>
          </div>
          {copyCount > 0 && (
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
              已复制 {copyCount} 次，每次复制缩短 5 秒
            </p>
          )}
        </div>
      )}

      {/* Options */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selfDestruct}
                onChange={(e) => setSelfDestruct(e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              <Shield size={18} color={selfDestruct ? '#22c55e' : 'var(--text-tertiary)'} />
              <span style={{ fontWeight: 500 }}>启用自毁模式</span>
            </label>
          </div>
          
          {selfDestruct && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>自动清除时间：</span>
              <select
                value={timeout}
                onChange={(e) => setTimeout(Number(e.target.value))}
                className="input-field"
                style={{ width: 'auto', padding: '0.5rem 1rem' }}
              >
                {TIMEOUT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '4px' }}>
          <button
            onClick={() => { setMode('encode'); setOutput(''); }}
            className={mode === 'encode' ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ flex: 1 }}
          >
            编码 (Encode)
          </button>
          <button
            onClick={() => { setMode('decode'); setOutput(''); }}
            className={mode === 'decode' ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ flex: 1 }}
          >
            解码 (Decode)
          </button>
        </div>
      </div>

      {/* Input & Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              输入 {mode === 'encode' ? '原文' : 'Base64'}
            </h3>
            {input && (
              <button 
                className="btn btn-secondary" 
                onClick={() => setInput('')}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
              >
                <Trash2 size={12} />
                清空
              </button>
            )}
          </div>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '输入要加密的敏感内容...' : '输入 Base64 字符串...'}
            className="input-field"
            style={{ minHeight: '200px' }}
          />
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              输出 {mode === 'encode' ? 'Base64' : '原文'}
            </h3>
            {output && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={handleCopy}
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                >
                  <Copy size={12} />
                  复制
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={handleDownload}
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                >
                  <Download size={12} />
                  下载
                </button>
              </div>
            )}
          </div>
          <div style={{
            minHeight: '200px',
            padding: '1rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            color: output ? 'var(--accent-color)' : 'var(--text-tertiary)'
          }}>
            {output || '处理结果将在此显示...'}
          </div>
        </div>
      </div>

      {/* Process Button */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button
          className="btn btn-primary"
          onClick={handleProcess}
          style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
          disabled={!input.trim()}
        >
          <Lock size={18} />
          {mode === 'encode' ? '编码并加密' : '解码并加密'}
        </button>
      </div>

      {/* Security Features */}
      <div className="card">
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          自毁模式特性
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Lock size={18} color="#22c55e" />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>本地处理</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              数据全程在浏览器本地处理，不经过任何服务器
            </p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Clock size={18} color="#3b82f6" />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>智能倒计时</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              复制、下载或页面失焦会重置或缩短倒计时
            </p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Trash2 size={18} color="#ef4444" />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>彻底清除</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              倒计时结束自动清除内存和显示内容
            </p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <AlertTriangle size={18} color="#f59e0b" />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>防意外关闭</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              关闭页面时会弹出确认提示，防止误操作
            </p>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
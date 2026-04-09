'use client';

import { useState, useEffect } from 'react';
import { Shield, Wifi, WifiOff } from 'lucide-react';

export default function PrivacyIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineTest, setShowOfflineTest] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.75rem',
      padding: '0.5rem 1rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '8px',
      border: '1px solid var(--border-color)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        position: 'relative'
      }}>
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: isOnline ? '#22c55e' : '#ef4444',
          boxShadow: `0 0 8px ${isOnline ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
          animation: isOnline ? 'pulse 2s infinite' : 'none'
        }} />
        {isOnline ? <Wifi size={16} color="#22c55e" /> : <WifiOff size={16} color="#ef4444" />}
      </div>
      
      <div style={{ fontSize: '0.85rem' }}>
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
          100% 本地处理
        </span>
        <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.5rem' }}>
          所有转换在浏览器内完成，文件永不上传
        </span>
      </div>

      <button
        onClick={() => setShowOfflineTest(!showOfflineTest)}
        style={{
          marginLeft: '0.5rem',
          padding: '0.25rem 0.75rem',
          fontSize: '0.75rem',
          backgroundColor: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '4px',
          color: 'var(--text-secondary)',
          cursor: 'pointer'
        }}
        title="测试离线功能"
      >
        <Shield size={12} style={{ marginRight: '0.25rem' }} />
        离线测���
      </button>

      {showOfflineTest && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '0.5rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          minWidth: '250px'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            点击下方按钮断开网络，验证工具仍可正常工作
          </p>
          <button
            onClick={() => {
              if (isOnline) {
                window.dispatchEvent(new Event('offline'));
              } else {
                window.dispatchEvent(new Event('online'));
              }
            }}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              backgroundColor: isOnline ? 'var(--error-color)' : 'var(--success-color)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {isOnline ? '断开网络' : '恢复网络'}
          </button>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>
            提示：断开后刷新页面，工具仍可正常运行
          </p>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
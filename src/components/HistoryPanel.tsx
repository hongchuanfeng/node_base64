'use client';

import { useHistory } from '@/hooks/useHistory';
import { Clock, Trash2, X, Copy, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - timestamp;

  if (diff < 60000) return '刚刚';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`;
  return date.toLocaleDateString('zh-CN');
}

function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function HistoryPanel({ isOpen, onClose }: HistoryPanelProps) {
  const { history, deleteHistoryItem, clearHistory } = useHistory();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '400px',
      maxWidth: '100vw',
      backgroundColor: 'var(--bg-primary)',
      borderLeft: '1px solid var(--border-color)',
      boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
      zIndex: 1001,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={20} style={{ color: 'var(--accent-color)' }} />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>
            转换历史
          </h2>
          <span style={{
            padding: '0.15rem 0.5rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '10px',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)'
          }}>
            {history.length}
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
        {history.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: 'var(--text-tertiary)'
          }}>
            <Clock size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>暂无历史记录</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
              转换内容后将自动保存
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {history.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      padding: '0.15rem 0.4rem',
                      backgroundColor: item.type === 'encode' ? 'var(--accent-color)' : 'var(--success-color)',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 500
                    }}>
                      {item.type === 'encode' ? '编码' : '解码'}
                    </span>
                    <span style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-tertiary)'
                    }}>
                      {item.type}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)'
                  }}>
                    {formatTime(item.timestamp)}
                  </span>
                </div>

                <div style={{ marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '0.2rem' }}>
                    输入
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'Monaco, monospace',
                    backgroundColor: 'var(--bg-tertiary)',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '4px',
                    wordBreak: 'break-all',
                    maxHeight: '60px',
                    overflow: 'hidden'
                  }}>
                    {truncate(item.input, 100)}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '0.25rem 0'
                }}>
                  <ArrowRight size={14} style={{ color: 'var(--text-tertiary)' }} />
                </div>

                <div style={{ marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '0.2rem' }}>
                    输出
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'Monaco, monospace',
                    backgroundColor: 'var(--bg-tertiary)',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '4px',
                    wordBreak: 'break-all',
                    maxHeight: '60px',
                    overflow: 'hidden'
                  }}>
                    {truncate(item.output, 100)}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '0.5rem',
                  marginTop: '0.5rem',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <button
                    onClick={() => handleCopy(item.output, item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.3rem 0.5rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      borderRadius: '4px'
                    }}
                  >
                    {copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}
                    复制
                  </button>
                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.3rem 0.5rem',
                      color: '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      borderRadius: '4px'
                    }}
                  >
                    <Trash2 size={12} />
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {history.length > 0 && (
        <div style={{
          padding: '1rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <button
            onClick={clearHistory}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#ef4444',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            清空全部历史
          </button>
        </div>
      )}
    </div>
  );
}
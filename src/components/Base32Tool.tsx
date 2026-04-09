'use client';

import { useState, useCallback } from 'react';
import { useToast, ToastContainer } from '@/components/Toast';
import { Copy, RotateCcw, ArrowRightLeft, BookOpen, Info, Code } from 'lucide-react';
import { encodeBase32, decodeBase32 } from '@/lib/other-bases';

export default function Base32Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const { toasts, showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'intro' | 'principle' | 'example'>('intro');

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      showToast('请输入要转换的内容', 'error');
      return;
    }

    setError('');

    try {
      if (mode === 'encode') {
        const result = encodeBase32(input);
        setOutput(result);
        showToast('编码成功', 'success');
      } else {
        const result = decodeBase32(input);
        setOutput(result);
        showToast('解码成功', 'success');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '转换失败');
      showToast('转换失败', 'error');
    }
  }, [input, mode, showToast]);

  const handleCopy = useCallback(async () => {
    if (!output) {
      showToast('没有内容可复制', 'error');
      return;
    }
    try {
      await navigator.clipboard.writeText(output);
      showToast('已复制到剪贴板', 'success');
    } catch {
      showToast('复制失败', 'error');
    }
  }, [output, showToast]);

  const handleSwap = useCallback(() => {
    setInput(output);
    setOutput(input);
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setError('');
  }, [input, output, mode]);

  const handleReset = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Base32 编码解码
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Base32编码使用 A-Z（26个）和 2-7（8个）共32个字符表示数据，常用于编码电子邮件附件。
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'stretch' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>输入</span>
            <button className="btn btn-secondary" onClick={handleReset}>
              <RotateCcw size={16} />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入Base32字符串...'}
            className="input-field"
            style={{ minHeight: '200px', fontFamily: 'monospace' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={handleSwap}>
            <ArrowRightLeft size={20} />
          </button>
          <button className="btn btn-primary" onClick={handleConvert}>
            {mode === 'encode' ? '编码' : '解码'}
          </button>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>输出</span>
            <button className="btn btn-secondary copy-btn" onClick={handleCopy}>
              <Copy size={16} />
              复制
            </button>
          </div>
          <textarea
            value={output || error}
            readOnly
            placeholder="转换结果..."
            className="input-field"
            style={{
              minHeight: '200px',
              fontFamily: 'monospace',
              backgroundColor: 'var(--bg-tertiary)',
              color: error ? 'var(--error-color)' : 'var(--text-primary)'
            }}
          />
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('encode')}
          >
            文本 → Base32
          </button>
          <button
            className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setMode('decode')}
          >
            Base32 → 文本
          </button>
        </div>
      </div>

      {/* 功能说明与原理 */}
      <div style={{ marginTop: '2rem' }}>
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.5rem'
        }}>
          <button
            className={`info-tab ${activeTab === 'intro' ? 'active' : ''}`}
            onClick={() => setActiveTab('intro')}
          >
            <Info size={16} />
            功能说明
          </button>
          <button
            className={`info-tab ${activeTab === 'principle' ? 'active' : ''}`}
            onClick={() => setActiveTab('principle')}
          >
            <BookOpen size={16} />
            编码原理
          </button>
          <button
            className={`info-tab ${activeTab === 'example' ? 'active' : ''}`}
            onClick={() => setActiveTab('example')}
          >
            <Code size={16} />
            使用示例
          </button>
        </div>

        {activeTab === 'intro' && (
          <div className="card info-content">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              功能说明
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
              Base32 是一种将二进制数据转换为可打印字符的编码方式。它使用 A-Z（26个）和 2-7（8个）共32个字符来表示数据。
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>字符集</h4>
                <code style={{ color: 'var(--accent-color)', fontFamily: 'monospace' }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ234567</code>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>编码效率</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>每5个字节编码为8个字符，编码后数据膨胀率为160%</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>应用场景</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>电子邮件附件编码（MIME）、Google Authenticator密钥编码、Git对象标识符</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'principle' && (
          <div className="card info-content">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              编码原理
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
              Base32 将二进制数据每5位为一组进行编码，因为 2^5 = 32，所以每组可以表示32个不同的值。
            </p>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>字符对照表</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                <div>0 = A</div><div>1 = B</div><div>2 = C</div><div>3 = D</div>
                <div>4 = E</div><div>5 = F</div><div>6 = G</div><div>7 = H</div>
                <div>8 = I</div><div>9 = J</div><div>10 = K</div><div>11 = L</div>
                <div>12 = M</div><div>13 = N</div><div>14 = O</div><div>15 = P</div>
                <div>16 = Q</div><div>17 = R</div><div>18 = S</div><div>19 = T</div>
                <div>20 = U</div><div>21 = V</div><div>22 = 2</div><div>23 = 3</div>
                <div>24 = 4</div><div>25 = 5</div><div>26 = 6</div><div>27 = 7</div>
                <div>28 = 8</div><div>29 = 9</div><div>30 = A</div><div>31 = B</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              例如：字符 <code style={{ color: 'var(--accent-color)' }}>F</code>（ASCII 70，二进制 <code style={{ color: 'var(--accent-color)' }}>01000110</code>），每5位分组：<code style={{ color: 'var(--accent-color)' }}>01000</code>=8=I, <code style={{ color: 'var(--accent-color)' }}>110</code> 补零后为 <code style={{ color: 'var(--accent-color)' }}>11000</code>=24=Y，所以编码为 <code style={{ color: 'var(--accent-color)' }}>IY</code>。每5个字节会填充到8个字符。
            </p>
          </div>
        )}

        {activeTab === 'example' && (
          <div className="card info-content">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              使用示例
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', backgroundColor: 'var(--accent-color)', color: 'white', borderRadius: '4px', fontSize: '0.75rem' }}>编码</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>输入：<code style={{ color: 'var(--accent-color)' }}>f</code></p>
                <p style={{ color: 'var(--text-primary)' }}>输出：<code style={{ color: 'var(--accent-color)' }}>IY======</code></p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', backgroundColor: 'var(--accent-color)', color: 'white', borderRadius: '4px', fontSize: '0.75rem' }}>编码</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>输入：<code style={{ color: 'var(--accent-color)' }}>fo</code></p>
                <p style={{ color: 'var(--text-primary)' }}>输出：<code style={{ color: 'var(--accent-color)' }}>IZBY</code></p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ padding: '0.2rem 0.5rem', backgroundColor: '#f59e0b', color: 'white', borderRadius: '4px', fontSize: '0.75rem' }}>常见场景</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>TOTP密钥：<code style={{ color: 'var(--accent-color)' }}>JBSWY3DPEHPK3PXP</code></p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Git对象：<code style={{ color: 'var(--accent-color)' }}>4n586d7e8b3c2a9f</code></p>
                <p style={{ color: 'var(--text-secondary)' }}>邮件附件：<code style={{ color: 'var(--accent-color)' }}>KFBBVr2lEhk=</code></p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .info-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .info-tab:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .info-tab.active {
          background-color: var(--accent-color);
          color: white;
        }
        .info-content {
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

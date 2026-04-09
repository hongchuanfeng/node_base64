'use client';

import { useState, useMemo, useCallback } from 'react';
import { decodeBase64 } from '@/lib/base64';
import { Copy, ArrowLeftRight, Eye, EyeOff, Download, Trash2 } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/Toast';

export default function Base64DiffTool() {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [showDiff, setShowDiff] = useState(false);
  const [decodeBeforeDiff, setDecodeBeforeDiff] = useState(true);
  const { toasts, showToast } = useToast();

  const computeDiff = useMemo(() => {
    if (!inputA && !inputB) return null;

    const strA = decodeBeforeDiff ? (() => {
      try { return decodeBase64(inputA.replace(/\s/g, ''), 'utf-8'); } 
      catch { return inputA; }
    })() : inputA;
    
    const strB = decodeBeforeDiff ? (() => {
      try { return decodeBase64(inputB.replace(/\s/g, ''), 'utf-8'); }
      catch { return inputB; }
    })() : inputB;

    const lenA = strA.length;
    const lenB = strB.length;
    const maxLen = Math.max(lenA, lenB);
    
    const diffChars: { index: number; charA: string; charB: string; type: 'same' | 'diff' | 'onlyA' | 'onlyB' }[] = [];
    let sameCount = 0;
    let diffCount = 0;

    for (let i = 0; i < maxLen; i++) {
      const charA = i < lenA ? strA[i] : '';
      const charB = i < lenB ? strB[i] : '';
      
      if (i < lenA && i < lenB) {
        if (charA === charB) {
          diffChars.push({ index: i, charA, charB, type: 'same' });
          sameCount++;
        } else {
          diffChars.push({ index: i, charA, charB, type: 'diff' });
          diffCount++;
        }
      } else if (i >= lenA) {
        diffChars.push({ index: i, charA, charB, type: 'onlyB' });
        diffCount++;
      } else {
        diffChars.push({ index: i, charA, charB, type: 'onlyA' });
        diffCount++;
      }
    }

    const similarity = maxLen > 0 ? ((sameCount / maxLen) * 100).toFixed(1) : '0.0';
    
    return { diffChars, sameCount, diffCount, maxLen, similarity, strA, strB };
  }, [inputA, inputB, decodeBeforeDiff]);

  const handleSwap = () => {
    setInputA(inputB);
    setInputB(inputA);
  };

  const handleClear = () => {
    setInputA('');
    setInputB('');
    setShowDiff(false);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('已复制到剪贴板', 'success');
    } catch {
      showToast('复制失败', 'error');
    }
  };

  const handleDownload = () => {
    if (!computeDiff) return;
    const content = `Base64 Diff 对比报告
${'='.repeat(50)}
左侧内容: ${inputA.substring(0, 50)}${inputA.length > 50 ? '...' : ''}
右侧内容: ${inputB.substring(0, 50)}${inputB.length > 50 ? '...' : ''}

对比模式: ${decodeBeforeDiff ? '解码后对比' : '原始Base64对比'}

统计信息:
- 相似度: ${computeDiff.similarity}%
- 相同字符: ${computeDiff.sameCount}
- 差异字符: ${computeDiff.diffCount}
- 总长度: ${computeDiff.maxLen}

${'='.repeat(50)}
详细对比:
${computeDiff.diffChars.map(d => {
  if (d.type === 'same') return `  ${d.index.toString().padStart(4)}: "${d.charA}" === "${d.charB}"`;
  if (d.type === 'diff') return `* ${d.index.toString().padStart(4)}: "${d.charA}" !== "${d.charB}"`;
  if (d.type === 'onlyA') return `- ${d.index.toString().padStart(4)}: "${d.charA}" [仅A]`;
  return `+ ${d.index.toString().padStart(4)}: "${d.charB}" [仅B]`;
}).join('\n')}
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `base64-diff-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('报告已下载', 'success');
  };

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Base64 Diff 对比
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          同时对比两个 Base64 字符串，高亮显示差异，快速排查编码配置问题
        </p>
      </div>

      {/* Statistics */}
      {computeDiff && (
        <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-tertiary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
                  {computeDiff.similarity}%
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>相似度</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  {computeDiff.sameCount}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>相同</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--error-color)' }}>
                  {computeDiff.diffCount}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>差异</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
                  {computeDiff.maxLen}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>总长度</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" onClick={handleDownload} title="下载报告">
                <Download size={16} /> 报告
              </button>
              <button className="btn btn-secondary" onClick={handleClear} title="清空">
                <Trash2 size={16} /> 清空
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Options */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={decodeBeforeDiff}
              onChange={(e) => setDecodeBeforeDiff(e.target.checked)}
              style={{ width: '18px', height: '18px' }}
            />
            <span style={{ fontWeight: 500 }}>解码后对比</span>
          </label>
          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            勾选：对比解码后的内容 | 取消：对比原始 Base64 字符串
          </span>
        </div>
      </div>

      {/* Input Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'stretch' }}>
        {/* Left Input */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>Base64 A</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => handleCopy(inputA)}
                title="复制"
                style={{ padding: '0.4rem' }}
              >
                <Copy size={14} />
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setInputA('')}
                title="清空"
                style={{ padding: '0.4rem' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <textarea
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
            placeholder="粘贴第一个 Base64 字符串..."
            className="input-field"
            style={{ minHeight: '250px', fontFamily: 'monospace', fontSize: '0.9rem' }}
          />
          <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
            长度: {inputA.length} 字符
          </div>
        </div>

        {/* Center Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={handleSwap} title="交换AB">
            <ArrowLeftRight size={18} />
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowDiff(!showDiff)}
            disabled={!inputA && !inputB}
          >
            {showDiff ? <EyeOff size={16} /> : <Eye size={16} />}
            {showDiff ? '隐藏' : '对比'}
          </button>
        </div>

        {/* Right Input */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>Base64 B</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => handleCopy(inputB)}
                title="复制"
                style={{ padding: '0.4rem' }}
              >
                <Copy size={14} />
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setInputB('')}
                title="清空"
                style={{ padding: '0.4rem' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <textarea
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            placeholder="粘贴第二个 Base64 字符串..."
            className="input-field"
            style={{ minHeight: '250px', fontFamily: 'monospace', fontSize: '0.9rem' }}
          />
          <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
            长度: {inputB.length} 字符
          </div>
        </div>
      </div>

      {/* Diff View */}
      {showDiff && computeDiff && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            字符级差异对比
          </h3>
          
          {/* Legend */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--success-color)', borderRadius: '3px' }} />
              <span>相同</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--error-color)', borderRadius: '3px' }} />
              <span>差异</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#3b82f6', borderRadius: '3px' }} />
              <span>仅A</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#f59e0b', borderRadius: '3px' }} />
              <span>仅B</span>
            </div>
          </div>

          {/* Column Headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>
            <div style={{ color: 'var(--text-tertiary)' }}>位置</div>
            <div>A</div>
            <div>B</div>
          </div>

          {/* Diff Rows */}
          <div style={{ maxHeight: '400px', overflow: 'auto' }}>
            {computeDiff.diffChars.map((item, idx) => (
              <div 
                key={idx}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '80px 1fr 1fr', 
                  gap: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: item.type === 'same' ? 'transparent' : 
                    item.type === 'diff' ? 'rgba(239, 68, 68, 0.1)' :
                    item.type === 'onlyA' ? 'rgba(59, 130, 246, 0.1)' : 
                    'rgba(245, 158, 11, 0.1)',
                  borderRadius: '4px',
                  marginBottom: '2px',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem'
                }}
              >
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>#{item.index}</div>
                <div style={{ 
                  color: item.type === 'onlyB' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                  textDecoration: item.type === 'onlyB' ? 'line-through' : 'none'
                }}>
                  {item.type === 'onlyB' ? '-' : (item.charA === ' ' ? <span style={{ color: 'var(--text-tertiary)' }}>␣</span> : item.charA)}
                </div>
                <div style={{ 
                  color: item.type === 'onlyA' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                  textDecoration: item.type === 'onlyA' ? 'line-through' : 'none'
                }}>
                  {item.type === 'onlyA' ? '-' : (item.charB === ' ' ? <span style={{ color: 'var(--text-tertiary)' }}>␣</span> : item.charB)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Issues */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          常见差异原因排查
        </h3>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>🔤 字符集差异</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>UTF-8 vs GBK vs Latin-1，相同内容编码结果完全不同</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>📏 换行符差异</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>CRLF(\r\n) vs LF(\n)，MIME格式每76字符换行vs无换行</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>🔒 Padding 差异</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>有无 = 或 == 填充符，虽然解码结果相同但字符串不同</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>🔄 URL-safe 差异</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>+ / = vs - _ ，标准 Base64 与 URL-safe Base64 互转</div>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
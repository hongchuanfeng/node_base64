'use client';

import { useState, useMemo } from 'react';
import { decodeBase64 } from '@/lib/base64';
import { Copy, Search, Trash2, Download, Plus, ArrowRight, Check } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/Toast';

interface ExtractedItem {
  id: number;
  fullMatch: string;
  base64Content: string;
  decoded?: string;
  isValid: boolean;
  preview?: string;
}

const commonPatterns = [
  { name: 'Data URI (图片)', pattern: 'data:image/[^;]+;base64,([^"]+)', desc: '匹配 HTML/CSS 中的 Base64 图片' },
  { name: '通用 Base64', pattern: '(eyJ[A-Za-z0-9_-]+\\.eyJ[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]*)', desc: '匹配 JWT Token' },
  { name: '附件/邮件', pattern: 'Content-Transfer-Encoding:\\s*base64\\s*\\n([A-Za-z0-9+/=\\r\\n]+)', desc: '匹配邮件附件' },
  { name: 'PDF 文件', pattern: 'data:application/pdf;base64,([^"]+)', desc: '匹配 PDF Data URI' },
  { name: 'JSON 字段', pattern: '"([A-Za-z0-9+/]{20,}={0,2})"', desc: '匹配 JSON 中的 Base64 字符串' },
  { name: 'XML/CDATA', pattern: '<!\\[CDATA\\[([A-Za-z0-9+/]+={0,2})\\]\\]>', desc: '匹配 XML CDATA 块' },
];

export default function RegexExtractTool() {
  const [input, setInput] = useState('');
  const [customPattern, setCustomPattern] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [results, setResults] = useState<ExtractedItem[]>([]);
  const [showDecoded, setShowDecoded] = useState<number[]>([]);
  const { toasts, showToast } = useToast();

  const extractAll = (pattern: string) => {
    if (!input.trim() || !pattern.trim()) {
      showToast('请输入文本和正则表达式', 'error');
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
        showToast('未找到匹配的 Base64 内容', 'info');
      } else {
        setResults(matches);
        showToast(`找到 ${matches.length} 个匹配`, 'success');
      }
    } catch (e) {
      showToast('正则表达式语法错误', 'error');
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
      showToast('已复制到剪贴板', 'success');
    } catch {
      showToast('复制失败', 'error');
    }
  };

  const handleDownload = () => {
    const content = results.map((item, idx) => 
      `【匹配 ${idx + 1}】\n原始: ${item.fullMatch}\nBase64: ${item.base64Content}\n解码: ${item.decoded || '(无效)'}\n有效: ${item.isValid ? '是' : '否'}\n${'─'.repeat(50)}`
    ).join('\n\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `extracted-base64-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('已下载提取结果', 'success');
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
          正则提取 Base64
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          从混合文本中用正则表达式提取 Base64 字符串，支持常见格式自动识别
        </p>
      </div>

      {/* Quick Patterns */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          常用模式（点击即可使用）
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
          自定义正则表达式
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={customPattern}
            onChange={(e) => {
              setCustomPattern(e.target.value);
              setSelectedPattern(null);
            }}
            placeholder="输入正则表达式，捕获组()中的内容将作为提取结果..."
            className="input-field"
            style={{ flex: 1, fontFamily: 'monospace' }}
          />
          <button className="btn btn-primary" onClick={handleExtract}>
            <Search size={16} />
            提取
          </button>
        </div>
        <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
          提示：使用捕获组 () 指定要提取的 Base64 部分，如 data:image/png;base64,([^"]+) 会提取逗号后的内容
        </div>
      </div>

      {/* Input Area */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            待处理文本
          </h3>
          <button className="btn btn-secondary" onClick={handleClear}>
            <Trash2 size={14} />
            清空
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="粘贴包含 Base64 的混合文本，如 HTML、CSS、JSON、邮件源码等..."
          className="input-field"
          style={{ minHeight: '200px', fontFamily: 'monospace', fontSize: '0.9rem' }}
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
          字符数: {input.length} | 字节数: {new Blob([input]).size}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <>
          <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-tertiary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  找到 {results.length} 个匹配
                </span>
                <span style={{ color: 'var(--success-color)', fontSize: '0.9rem' }}>
                  ✓ {results.filter(r => r.isValid).length} 个有效
                </span>
                <span style={{ color: 'var(--error-color)', fontSize: '0.9rem' }}>
                  ✗ {results.filter(r => !r.isValid).length} 个无效
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={handleCopyAllBase64}>
                  <Copy size={14} />
                  复制全部 Base64
                </button>
                <button className="btn btn-secondary" onClick={handleCopyAllDecoded}>
                  <Copy size={14} />
                  复制全部解码
                </button>
                <button className="btn btn-secondary" onClick={handleDownload}>
                  <Download size={14} />
                  下载
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
                      {item.base64Content.length} 字符
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
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>原始匹配：</div>
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
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>Base64 内容：</div>
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
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.25rem' }}>解码结果：</div>
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
          使用技巧
        </h3>
        <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <div>💡 <strong>HTML 图片：</strong>直接粘贴包含 Base64 图片的 HTML 代码，工具会自动提取所有图片</div>
          <div>💡 <strong>JSON 数据：</strong>粘贴 API 响应，提取其中的 Base64 编码字段</div>
          <div>💡 <strong>JWT Token：</strong>使用 JWT 模式直接提取并解码 Token 内容</div>
          <div>💡 <strong>自定义模式：</strong>使用捕获组 () 精确指定要提取的部分</div>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
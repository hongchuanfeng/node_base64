'use client';

import { useState, useMemo } from 'react';
import { decodeBase64, encodeBase64 } from '@/lib/base64';
import { 
  FileJson, Image, FileCode, FileArchive, FileText, AlertCircle, 
  CheckCircle, HelpCircle, ArrowRight, Copy, Eye, EyeOff 
} from 'lucide-react';
import { useToast, ToastContainer } from '@/components/Toast';

interface DetectionResult {
  type: 'json' | 'image' | 'html' | 'xml' | 'text' | 'zip' | 'binary' | 'unknown';
  confidence: number;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  decoded: string;
  preview?: string;
  metadata?: Record<string, string>;
}

const typeConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  json: { icon: <FileJson size={20} />, color: '#22c55e', label: 'JSON 数据' },
  image: { icon: <Image size={20} />, color: '#3b82f6', label: '图片' },
  html: { icon: <FileCode size={20} />, color: '#f97316', label: 'HTML' },
  xml: { icon: <FileCode size={20} />, color: '#8b5cf6', label: 'XML' },
  text: { icon: <FileText size={20} />, color: '#6b7280', label: '纯文本' },
  zip: { icon: <FileArchive size={20} />, color: '#f59e0b', label: '压缩包' },
  binary: { icon: <FileArchive size={20} />, color: '#ef4444', label: '二进制' },
  unknown: { icon: <HelpCircle size={20} />, color: '#9ca3af', label: '未知格式' },
};

export default function SmartDetector() {
  const [input, setInput] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const { toasts, showToast } = useToast();

  const detection = useMemo((): DetectionResult | null => {
    if (!input.trim()) return null;

    const cleaned = input.replace(/\s/g, '');
    
    let decoded: string;
    try {
      decoded = decodeBase64(cleaned, 'utf-8');
    } catch {
      return null;
    }

    // Detect type
    let type: DetectionResult['type'] = 'unknown';
    let confidence = 0;

    // Image detection
    if (/^(data:image|FFD8FF|89504E47|25504446)/.test(cleaned)) {
      type = 'image';
      confidence = 95;
    }

    // JSON detection
    if (!type || type === 'unknown') {
      try {
        JSON.parse(decoded);
        if (decoded.trim().startsWith('{') || decoded.trim().startsWith('[')) {
          type = 'json';
          confidence = 90;
        }
      } catch {}
    }

    // HTML detection
    if (!type || type === 'unknown') {
      if (/<(html|head|body|div|span|p|a|script|style)/i.test(decoded)) {
        type = 'html';
        confidence = 85;
      }
    }

    // XML detection
    if (!type || type === 'unknown') {
      if (/<[a-z][\s\S]*>/i.test(decoded) && !type) {
        type = 'xml';
        confidence = 75;
      }
    }

    // ZIP detection
    if (!type || type === 'unknown') {
      if (cleaned.startsWith('UEsD') || /PK\x03\x04/.test(cleaned)) {
        type = 'zip';
        confidence = 80;
      }
    }

    // Text (readable characters)
    if (!type || type === 'unknown') {
      const readableRatio = decoded.split('').filter(c => c.charCodeAt(0) < 128 || /[\u4e00-\u9fa5]/.test(c)).length / decoded.length;
      if (readableRatio > 0.8) {
        type = 'text';
        confidence = 70;
      } else {
        type = 'binary';
        confidence = 60;
      }
    }

    const config = typeConfig[type];
    const preview = decoded.length > 200 ? decoded.substring(0, 200) + '...' : decoded;

    // Extract metadata
    const metadata: Record<string, string> = {};
    metadata['原始长度'] = cleaned.length + ' 字符';
    metadata['解码长度'] = decoded.length + ' 字符';
    metadata['字符集'] = 'UTF-8';

    if (type === 'json') {
      try {
        const obj = JSON.parse(decoded);
        metadata['JSON 键数'] = Object.keys(obj).length.toString();
        if (Array.isArray(obj)) {
          metadata['JSON 类型'] = '数组';
          metadata['数组长度'] = obj.length.toString();
        } else {
          metadata['JSON 类型'] = '对象';
        }
      } catch {}
    }

    if (type === 'image') {
      if (cleaned.startsWith('iVBOR')) metadata['图片格式'] = 'PNG';
      else if (cleaned.startsWith('/9j/')) metadata['图片格式'] = 'JPEG';
      else if (cleaned.startsWith('AAAB')) metadata['图片格式'] = 'SVG';
      
      if (decoded.includes('PNG')) metadata['PNG 标志'] = '是';
      if (decoded.includes('<svg')) metadata['SVG'] = '是';
    }

    const description = {
      json: '这是有效的 JSON 格式数据，可以直接解析使用',
      image: '这是 Base64 编码的图片数据，可以直接在 HTML 中使用（带 data:image/... 前缀）或保存为图片文件',
      html: '这是 HTML 代码，可能是网页片段或富文本内容',
      xml: '这是 XML 格式数据，常用于配置文件或数据传输',
      text: '这是普通文本内容，可能包含中文、英文或其他字符',
      zip: '这是压缩包文件（如 ZIP），解码后是二进制数据',
      binary: '这是二进制或特殊编码数据，直接查看可能显示为乱码',
      unknown: '无法确定具体格式，建议手动查看解码结果',
    }[type];

    return {
      type,
      confidence,
      label: config.label,
      icon: config.icon,
      color: config.color,
      description,
      decoded,
      preview,
      metadata,
    };
  }, [input]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('已复制到剪贴板', 'success');
    } catch {
      showToast('复制失败', 'error');
    }
  };

  const handleUseAsDataUri = () => {
    if (detection?.type === 'image') {
      const format = detection.metadata?.['图片格式']?.toLowerCase() || 'png';
      const dataUri = `data:image/${format};base64,${input.replace(/\s/g, '')}`;
      handleCopy(dataUri);
    }
  };

  const handleFormatJson = () => {
    if (detection?.type === 'json') {
      try {
        const formatted = JSON.stringify(JSON.parse(detection.decoded), null, 2);
        handleCopy(formatted);
      } catch {
        showToast('格式化失败', 'error');
      }
    }
  };

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          智能内容识别
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          自动识别 Base64 内容的类型（图片、JSON、HTML 等），提供处理建议和预览
        </p>
      </div>

      {/* Input */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          输入 Base64 字符串
        </h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="粘贴 Base64 字符串，工具将自动识别内容类型..."
          className="input-field"
          style={{ minHeight: '180px', fontFamily: 'monospace', fontSize: '0.9rem' }}
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
          {input ? `${input.replace(/\s/g, '').length} 字符` : '等待输入...'}
        </div>
      </div>

      {/* Detection Result */}
      {detection && (
        <>
          <div className="card" style={{ marginBottom: '1.5rem', borderLeft: `4px solid ${detection.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: detection.color }}>{detection.icon}</div>
                <div>
                  <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1.2rem' }}>
                    {detection.label}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    识别置信度：{detection.confidence}%
                  </p>
                </div>
              </div>
              <div style={{
                padding: '0.5rem 1rem',
                backgroundColor: detection.color,
                color: 'white',
                borderRadius: '8px',
                fontWeight: 600
              }}>
                {detection.confidence}% 置信
              </div>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {detection.description}
            </p>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => handleCopy(detection.decoded)}
              >
                <Copy size={14} />
                复制解码结果
              </button>
              {detection.type === 'json' && (
                <button className="btn btn-primary" onClick={handleFormatJson}>
                  格式化 JSON
                </button>
              )}
              {detection.type === 'image' && (
                <button className="btn btn-primary" onClick={handleUseAsDataUri}>
                  转换为 Data URI
                </button>
              )}
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? <EyeOff size={14} /> : <Eye size={14} />}
                {showDetails ? '隐藏详情' : '显示详情'}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              解码预览
            </h3>
            
            {detection.type === 'image' && (
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <img 
                  src={`data:image/png;base64,${input.replace(/\s/g, '')}`}
                  alt="解码预览"
                  style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              fontFamily: detection.type === 'json' ? 'inherit' : 'monospace',
              fontSize: detection.type === 'json' ? '0.9rem' : '0.85rem',
              whiteSpace: detection.type === 'json' ? 'pre-wrap' : 'pre',
              overflow: 'auto',
              maxHeight: '400px',
              color: 'var(--text-primary)',
              wordBreak: 'break-all'
            }}>
              {detection.type === 'json' ? (
                <pre style={{ margin: 0 }}>{(() => {
                  try {
                    return JSON.stringify(JSON.parse(detection.decoded), null, 2);
                  } catch {
                    return detection.decoded;
                  }
                })()}</pre>
              ) : detection.decoded}
            </div>
          </div>

          {/* Metadata */}
          {showDetails && detection.metadata && (
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                元数据信息
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {Object.entries(detection.metadata).map(([key, value]) => (
                  <div key={key} style={{
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: '8px'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{key}</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              建议操作
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {detection.type === 'json' && (
                <>
                  <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FileJson size={20} color="#22c55e" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>JSON 解析</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>内容是标准 JSON，可用于 API 请求体</div>
                    </div>
                    <ArrowRight size={16} color="var(--text-tertiary)" />
                  </div>
                </>
              )}
              {detection.type === 'image' && (
                <>
                  <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Image size={20} color="#3b82f6" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>作为图片使用</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>可转为 Data URI 用于 HTML img 标签或 CSS background-image</div>
                    </div>
                    <ArrowRight size={16} color="var(--text-tertiary)" />
                  </div>
                  <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FileCode size={20} color="#f97316" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>保存为图片文件</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>解码后保存为 .png 或 .jpg 文件</div>
                    </div>
                    <ArrowRight size={16} color="var(--text-tertiary)" />
                  </div>
                </>
              )}
              {detection.type === 'html' && (
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileCode size={20} color="#f97316" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>HTML 预览</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>可嵌入 iframe 或通过 JavaScript 渲染</div>
                  </div>
                  <ArrowRight size={16} color="var(--text-tertiary)" />
                </div>
              )}
              {detection.type === 'text' && (
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileText size={20} color="#6b7280" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>直接使用</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>纯文本可直接用于显示、搜索或存储</div>
                  </div>
                  <ArrowRight size={16} color="var(--text-tertiary)" />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* No Detection */}
      {!detection && input && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <AlertCircle size={48} color="var(--error-color)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            无法解码
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            输入的不是有效的 Base64 字符串，请检查后重试
          </p>
        </div>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}
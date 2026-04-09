'use client';

import { useState, useCallback } from 'react';
import { useToast, ToastContainer } from '@/components/Toast';
import { Copy, Download, Image as ImageIcon, Info } from 'lucide-react';
import Image from 'next/image';

interface ImageInfo {
  width: number;
  height: number;
  size: string;
  type: string;
}

export default function ImageBase64Tool() {
  const [input, setInput] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [error, setError] = useState('');
  const { toasts, showToast } = useToast();

  const handlePreview = useCallback(() => {
    if (!input.trim()) {
      showToast('请输入Base64图片字符串', 'error');
      return;
    }

    setError('');
    setImageInfo(null);

    try {
      // 检测是否为完整的 Data URL
      let base64Data = input.trim();
      if (!base64Data.startsWith('data:')) {
        // 尝试自动检测图片类型
        if (base64Data.startsWith('iVBOR')) {
          base64Data = 'data:image/png;base64,' + base64Data;
        } else if (base64Data.startsWith('/9j/') || base64Data.startsWith('iVBOR')) {
          base64Data = 'data:image/jpeg;base64,' + base64Data;
        } else if (base64Data.startsWith('R0lGO')) {
          base64Data = 'data:image/gif;base64,' + base64Data;
        } else if (base64Data.startsWith('UklGR')) {
          base64Data = 'data:image/webp;base64,' + base64Data;
        } else {
          base64Data = 'data:image/png;base64,' + base64Data;
        }
      }

      setImageSrc(base64Data);
      showToast('图片解析成功', 'success');
    } catch {
      setError('无法解析Base64图片，请检查输入是否正确');
      showToast('图片解析失败', 'error');
    }
  }, [input, showToast]);

  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageInfo({
      width: img.naturalWidth,
      height: img.naturalHeight,
      size: formatSize(base64DataSize()),
      type: detectImageType()
    });
  }, []);

  const base64DataSize = () => {
    const cleaned = input.replace(/^data:[^;]+;base64,/, '').length;
    return cleaned;
  };

  const detectImageType = () => {
    if (input.startsWith('data:image/png')) return 'PNG';
    if (input.startsWith('data:image/jpeg') || input.startsWith('data:image/jpg')) return 'JPEG';
    if (input.startsWith('data:image/gif')) return 'GIF';
    if (input.startsWith('data:image/webp')) return 'WebP';
    return '未知';
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleCopyImage = useCallback(async () => {
    try {
      const blob = await fetch(imageSrc).then(r => r.blob());
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      showToast('图片已复制到剪贴板', 'success');
    } catch {
      showToast('复制失败，请尝试右键保存图片', 'error');
    }
  }, [imageSrc, showToast]);

  const handleDownload = useCallback(() => {
    const a = document.createElement('a');
    a.href = imageSrc;
    a.download = `base64-image-${Date.now()}.${detectImageType().toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('图片下载中...', 'success');
  }, [imageSrc, showToast]);

  const handleReset = useCallback(() => {
    setInput('');
    setImageSrc('');
    setImageInfo(null);
    setError('');
  }, []);

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          图片Base64预览
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          输入Base64图片字符串，实时渲染图片。支持复制图片、下载图片、显示格式信息。
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Input Area */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600 }}>输入Base64</h3>
            <button className="btn btn-secondary" onClick={handleReset}>清空</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="在此粘贴Base64图片字符串（支持 data:image/...;base64, 格式或纯Base64字符串）..."
            className="input-field"
            style={{ minHeight: '300px', fontFamily: 'monospace', fontSize: '0.85rem' }}
          />
          <button
            className="btn btn-primary"
            onClick={handlePreview}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <ImageIcon size={16} />
            预览图片
          </button>
        </div>

        {/* Preview Area */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600 }}>图片预览</h3>
            {imageSrc && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={handleCopyImage}>
                  <Copy size={16} />
                  复制
                </button>
                <button className="btn btn-secondary" onClick={handleDownload}>
                  <Download size={16} />
                  下载
                </button>
              </div>
            )}
          </div>

          <div style={{
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            padding: '2rem'
          }}>
            {error ? (
              <p style={{ color: 'var(--error-color)', textAlign: 'center' }}>{error}</p>
            ) : imageSrc ? (
              <Image
                src={imageSrc}
                alt="Base64 Preview"
                width={400}
                height={300}
                style={{
                  maxWidth: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
                onLoad={handleImageLoad}
              />
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>
                <ImageIcon size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p>预览区域</p>
              </div>
            )}
          </div>

          {/* Image Info */}
          {imageInfo && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px'
            }}>
              <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Info size={16} />
                图片信息
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>格式: </span>
                  <span>{imageInfo.type}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>尺寸: </span>
                  <span>{imageInfo.width} × {imageInfo.height}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>大小: </span>
                  <span>{imageInfo.size}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Base64长度: </span>
                  <span>{base64DataSize()} 字符</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

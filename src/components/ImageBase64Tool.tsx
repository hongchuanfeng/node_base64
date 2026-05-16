'use client';

import { useState, useCallback } from 'react';
import { useToast, ToastContainer } from '@/components/Toast';
import { useLanguage } from '@/hooks/useLanguage';
import { Copy, Download, Image as ImageIcon, Info } from 'lucide-react';
import Image from 'next/image';

interface ImageInfo {
  width: number;
  height: number;
  size: string;
  type: string;
}

export default function ImageBase64Tool() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [error, setError] = useState('');
  const { toasts, showToast } = useToast();

  const handlePreview = useCallback(() => {
    if (!input.trim()) {
      showToast(t.errors.base64InputEmpty, 'error');
      return;
    }

    setError('');
    setImageInfo(null);

    try {
      let base64Data = input.trim();
      if (!base64Data.startsWith('data:')) {
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
      showToast(t.tools.imageBase64.imageParsedSuccess, 'success');
    } catch {
      setError(t.tools.imageBase64.cannotParseImage);
      showToast(t.tools.imageBase64.imageParsedFailed, 'error');
    }
  }, [input, showToast, t]);

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
    return t.tools.fileBase64.unknown;
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
      showToast(t.tools.imageBase64.copiedToClipboard, 'success');
    } catch {
      showToast(t.tools.imageBase64.copyFailedHint, 'error');
    }
  }, [imageSrc, showToast, t]);

  const handleDownload = useCallback(() => {
    const a = document.createElement('a');
    a.href = imageSrc;
    a.download = `base64-image-${Date.now()}.${detectImageType().toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(t.tools.imageBase64.downloading, 'success');
  }, [imageSrc, showToast, t]);

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
          {t.tools.imageBase64.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.tools.imageBase64.description}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {/* Input Area */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600 }}>{t.tools.imageBase64.inputBase64}</h3>
            <button className="btn btn-secondary" onClick={handleReset}>{t.common.clear}</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.tools.imageBase64.placeholder}
            className="input-field"
            style={{ minHeight: '300px', fontFamily: 'monospace', fontSize: '0.85rem' }}
          />
          <button
            className="btn btn-primary"
            onClick={handlePreview}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            <ImageIcon size={16} />
            {t.tools.imageBase64.previewImage}
          </button>
        </div>

        {/* Preview Area */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600 }}>{t.tools.imageBase64.preview}</h3>
            {imageSrc && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={handleCopyImage}>
                  <Copy size={16} />
                  {t.common.copy}
                </button>
                <button className="btn btn-secondary" onClick={handleDownload}>
                  <Download size={16} />
                  {t.common.download}
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
                <p>{t.tools.imageBase64.previewArea}</p>
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
                {t.tools.imageBase64.imageInfo}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>{t.tools.imageBase64.format}: </span>
                  <span>{imageInfo.type}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>{t.tools.imageBase64.dimensions}: </span>
                  <span>{imageInfo.width} × {imageInfo.height}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>{t.tools.imageBase64.size}: </span>
                  <span>{imageInfo.size}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>{t.tools.fileBase64.base64Length}: </span>
                  <span>{base64DataSize()}</span>
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

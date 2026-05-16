'use client';

import { useState, useMemo } from 'react';
import { decodeBase64, encodeBase64 } from '@/lib/base64';
import { useLanguage } from '@/hooks/useLanguage';
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

export default function SmartDetector() {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const { toasts, showToast } = useToast();

  const typeConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    json: { icon: <FileJson size={20} />, color: '#22c55e', label: 'JSON' },
    image: { icon: <Image size={20} />, color: '#3b82f6', label: 'Image' },
    html: { icon: <FileCode size={20} />, color: '#f97316', label: 'HTML' },
    xml: { icon: <FileCode size={20} />, color: '#8b5cf6', label: 'XML' },
    text: { icon: <FileText size={20} />, color: '#6b7280', label: 'Text' },
    zip: { icon: <FileArchive size={20} />, color: '#f59e0b', label: 'ZIP' },
    binary: { icon: <FileArchive size={20} />, color: '#ef4444', label: 'Binary' },
    unknown: { icon: <HelpCircle size={20} />, color: '#9ca3af', label: 'Unknown' },
  };

  const detection = useMemo((): DetectionResult | null => {
    if (!input.trim()) return null;

    const cleaned = input.replace(/\s/g, '');
    
    let decoded: string;
    try {
      decoded = decodeBase64(cleaned, 'utf-8');
    } catch {
      return null;
    }

    let type: DetectionResult['type'] = 'unknown';
    let confidence = 0;

    if (/^(data:image|FFD8FF|89504E47|25504446)/.test(cleaned)) {
      type = 'image';
      confidence = 95;
    }

    if (!type || type === 'unknown') {
      try {
        JSON.parse(decoded);
        if (decoded.trim().startsWith('{') || decoded.trim().startsWith('[')) {
          type = 'json';
          confidence = 90;
        }
      } catch {}
    }

    if (!type || type === 'unknown') {
      if (/<(html|head|body|div|span|p|a|script|style)/i.test(decoded)) {
        type = 'html';
        confidence = 85;
      }
    }

    if (!type || type === 'unknown') {
      if (/<[a-z][\s\S]*>/i.test(decoded) && !type) {
        type = 'xml';
        confidence = 75;
      }
    }

    if (!type || type === 'unknown') {
      if (cleaned.startsWith('UEsD') || /PK\x03\x04/.test(cleaned)) {
        type = 'zip';
        confidence = 80;
      }
    }

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

    const metadata: Record<string, string> = {};
    metadata['Original Length'] = cleaned.length + ' chars';
    metadata['Decoded Length'] = decoded.length + ' chars';
    metadata['Charset'] = 'UTF-8';

    if (type === 'json') {
      try {
        const obj = JSON.parse(decoded);
        metadata['JSON Keys'] = Object.keys(obj).length.toString();
        if (Array.isArray(obj)) {
          metadata['JSON Type'] = 'Array';
          metadata['Array Length'] = obj.length.toString();
        } else {
          metadata['JSON Type'] = 'Object';
        }
      } catch {}
    }

    if (type === 'image') {
      if (cleaned.startsWith('iVBOR')) metadata['Image Format'] = 'PNG';
      else if (cleaned.startsWith('/9j/')) metadata['Image Format'] = 'JPEG';
      else if (cleaned.startsWith('AAAB')) metadata['Image Format'] = 'SVG';
      
      if (decoded.includes('PNG')) metadata['PNG Signature'] = 'Yes';
      if (decoded.includes('<svg')) metadata['SVG'] = 'Yes';
    }

    const description = {
      json: 'This is valid JSON format data, can be directly parsed and used',
      image: 'This is Base64 encoded image data, can be used directly in HTML (with data:image/... prefix) or saved as image file',
      html: 'This is HTML code, possibly web page fragment or rich text content',
      xml: 'This is XML format data, commonly used in configuration files or data transmission',
      text: 'This is plain text content, may contain Chinese, English or other characters',
      zip: 'This is compressed package file (such as ZIP), decoded to binary data',
      binary: 'This is binary or special encoded data, may display as garbled text when viewed directly',
      unknown: 'Unable to determine specific format, recommend manually checking the decoded result',
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
      showToast(t.common.copiedToClipboard, 'success');
    } catch {
      showToast(t.common.copyFailed, 'error');
    }
  };

  const handleUseAsDataUri = () => {
    if (detection?.type === 'image') {
      const format = detection.metadata?.['Image Format']?.toLowerCase() || 'png';
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
        showToast(t.common.error, 'error');
      }
    }
  };

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.features.smartDetect.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.features.smartDetect.desc}
        </p>
      </div>

      {/* Input */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.tools.imageBase64.inputBase64}
        </h3>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.tools.analyze.placeholder}
          className="input-field"
          style={{ minHeight: '180px', fontFamily: 'monospace', fontSize: '0.9rem' }}
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
          {input ? `${input.replace(/\s/g, '').length} chars` : 'Waiting for input...'}
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
                    {t.tools.smartBase64.confidence}: {detection.confidence}%
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
                {detection.confidence}% {t.tools.smartBase64.confidence}
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
                {t.common.copy} {t.common.result}
              </button>
              {detection.type === 'json' && (
                <button className="btn btn-primary" onClick={handleFormatJson}>
                  Format JSON
                </button>
              )}
              {detection.type === 'image' && (
                <button className="btn btn-primary" onClick={handleUseAsDataUri}>
                  Convert to Data URI
                </button>
              )}
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? <EyeOff size={14} /> : <Eye size={14} />}
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              {t.common.result}
            </h3>
            
            {detection.type === 'image' && (
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <img 
                  src={`data:image/png;base64,${input.replace(/\s/g, '')}`}
                  alt="Preview"
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
                Metadata
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
              Suggestions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {detection.type === 'json' && (
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileJson size={20} color="#22c55e" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>JSON Parse</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Content is standard JSON, can be used for API request body</div>
                  </div>
                  <ArrowRight size={16} color="var(--text-tertiary)" />
                </div>
              )}
              {detection.type === 'image' && (
                <>
                  <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Image size={20} color="#3b82f6" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Use as Image</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Can be converted to Data URI for HTML img tag or CSS background-image</div>
                    </div>
                    <ArrowRight size={16} color="var(--text-tertiary)" />
                  </div>
                  <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FileCode size={20} color="#f97316" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Save as Image</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Decode and save as .png or .jpg file</div>
                    </div>
                    <ArrowRight size={16} color="var(--text-tertiary)" />
                  </div>
                </>
              )}
              {detection.type === 'html' && (
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileCode size={20} color="#f97316" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>HTML Preview</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Can be embedded in iframe or rendered via JavaScript</div>
                  </div>
                  <ArrowRight size={16} color="var(--text-tertiary)" />
                </div>
              )}
              {detection.type === 'text' && (
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileText size={20} color="#6b7280" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Direct Use</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Plain text can be used directly for display, search or storage</div>
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
            Unable to Decode
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Input is not a valid Base64 string, please check and try again
          </p>
        </div>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}

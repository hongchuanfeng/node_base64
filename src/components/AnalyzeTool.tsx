'use client';

import { useState, useCallback } from 'react';
import { isValidBase64, detectBase64ContentType, analyzeBase64Structure, estimateBase64FileSize } from '@/lib/base64';
import { useToast, ToastContainer } from '@/components/Toast';
import { Search, FileText, Image, File, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

export default function AnalyzeTool() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<{
    isValid: boolean;
    contentType: ReturnType<typeof detectBase64ContentType>;
    structure: ReturnType<typeof analyzeBase64Structure>;
    size: ReturnType<typeof estimateBase64FileSize>;
  } | null>(null);
  const { toasts, showToast } = useToast();

  const handleAnalyze = useCallback(() => {
    if (!input.trim()) {
      showToast('请输入要分析的Base64字符串', 'error');
      return;
    }

    try {
      const isValid = isValidBase64(input);
      const contentType = detectBase64ContentType(input);
      const structure = analyzeBase64Structure(input);
      const size = estimateBase64FileSize(input);

      setAnalysis({ isValid, contentType, structure, size });
      showToast('分析完成', 'success');
    } catch (error) {
      showToast('分析失败，请检查输入', 'error');
    }
  }, [input, showToast]);

  const handleReset = useCallback(() => {
    setInput('');
    setAnalysis(null);
  }, []);

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Base64解码分析
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          自动识别编码类型，判断输入是否为有效Base64，分析解码后的内容格式和结构信息。
        </p>
      </div>

      {/* Input Area */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: 600 }}>输入Base64字符串</h3>
          <button className="btn btn-secondary" onClick={handleReset}>清空</button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此粘贴Base64字符串进行分析..."
          className="input-field"
          style={{ minHeight: '150px', fontFamily: 'monospace' }}
        />
        <button
          className="btn btn-primary"
          onClick={handleAnalyze}
          style={{ marginTop: '1rem', width: '100%' }}
        >
          <Search size={16} />
          开始分析
        </button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {/* Validation Status */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {analysis.isValid ? (
                <>
                  <CheckCircle size={20} style={{ color: 'var(--success-color)' }} />
                  有效性检查
                </>
              ) : (
                <>
                  <XCircle size={20} style={{ color: 'var(--error-color)' }} />
                  有效性检查
                </>
              )}
            </h3>
            <div style={{
              padding: '1rem',
              backgroundColor: analysis.isValid ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: analysis.isValid ? 'var(--success-color)' : 'var(--error-color)'
              }}>
                {analysis.isValid ? '有效的 Base64' : '无效的 Base64'}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {analysis.isValid 
                  ? '输入字符串符合 Base64 编码规范'
                  : '输入字符串不符合 Base64 编码规范'}
              </p>
            </div>
          </div>

          {/* Content Type */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {analysis.contentType.type === 'image' ? (
                <Image size={20} style={{ color: 'var(--accent-color)' }} />
              ) : analysis.contentType.type === 'pdf' ? (
                <File size={20} style={{ color: 'var(--accent-color)' }} />
              ) : analysis.contentType.type === 'text' ? (
                <FileText size={20} style={{ color: 'var(--accent-color)' }} />
              ) : (
                <AlertTriangle size={20} style={{ color: 'var(--warning-color)' }} />
              )}
              内容类型识别
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>检测类型</span>
                <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{analysis.contentType.type}</span>
              </div>
              {analysis.contentType.mimeType && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>MIME类型</span>
                  <span style={{ fontWeight: 500 }}>{analysis.contentType.mimeType}</span>
                </div>
              )}
              {analysis.contentType.info && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>详细信息</span>
                  <span style={{ fontWeight: 500 }}>{analysis.contentType.info}</span>
                </div>
              )}
            </div>
          </div>

          {/* Structure Analysis */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={20} style={{ color: 'var(--accent-color)' }} />
              结构分析
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Base64长度</span>
                <span style={{ fontWeight: 500 }}>{analysis.structure.length} 字符</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>填充字符</span>
                <span style={{ fontWeight: 500 }}>{analysis.structure.paddingChars} 个 (=)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>字符熵值</span>
                <span style={{ fontWeight: 500 }}>{analysis.structure.entropy} bits</span>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>字符集分布</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--accent-color)', fontWeight: 600 }}>{analysis.structure.charSet.uppercase}</div>
                    <div style={{ color: 'var(--text-tertiary)' }}>大写</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--success-color)', fontWeight: 600 }}>{analysis.structure.charSet.lowercase}</div>
                    <div style={{ color: 'var(--text-tertiary)' }}>小写</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--warning-color)', fontWeight: 600 }}>{analysis.structure.charSet.digits}</div>
                    <div style={{ color: 'var(--text-tertiary)' }}>数字</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{analysis.structure.charSet.symbols}</div>
                    <div style={{ color: 'var(--text-tertiary)' }}>符号</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Size Analysis */}
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <File size={20} style={{ color: 'var(--accent-color)' }} />
              大小分析
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Base64大小</span>
                <span style={{ fontWeight: 500 }}>{analysis.size.encodedSize} 字节</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>解码后大小</span>
                <span style={{ fontWeight: 500 }}>{analysis.size.decodedSize} 字节</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>编码开销</span>
                <span style={{ fontWeight: 500 }}>{analysis.size.compressionRatio}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}

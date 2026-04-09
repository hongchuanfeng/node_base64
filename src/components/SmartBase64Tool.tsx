'use client';

import { useState, useCallback } from 'react';
import { encodeBase64, decodeBase64 } from '@/lib/base64';
import { Copy, Info, Zap, FileCode } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/Toast';
import PrivacyIndicator from './PrivacyIndicator';

const lineBreakOptions = [
  { value: 'none', label: '无换行' },
  { value: 'mime', label: 'MIME (每76字符)' },
  { value: 'custom', label: '自定义' },
];

const strictModeOptions = [
  { value: 'strict', label: '严格模式' },
  { value: 'lax', label: '宽松模式' },
];

const codeSnippets = {
  javascript: (code: string, mode: string) => `// ${mode === 'encode' ? '编码' : '解码'} Base64\nconst base64 = ${mode === 'encode' ? `"${code.substring(0, 50)}${code.length > 50 ? '...' : ''}"` : `atob("${code.substring(0, 50)}${code.length > 50 ? '...' : ''}")`};\nconsole.log(base64);`,
  python: (code: string, mode: string) => `import base64\n\n# ${mode === 'encode' ? '编码' : '解码'} Base64\nbase64_str = ${mode === 'encode' ? `base64.b64encode("${code.substring(0, 50)}${code.length > 50 ? '...' : ''}".encode()).decode()` : `base64.b64decode("${code.substring(0, 50)}${code.length > 50 ? '...' : ''}").decode()`}`,
  java: (code: string, mode: string) => `import java.util.Base64;\n\npublic class Base64Example {\n    public static void main(String[] args) {\n        String input = "${code.substring(0, 50)}${code.length > 50 ? '...' : ''}";\n        ${mode === 'encode' 
          ? `String encoded = Base64.getEncoder().encodeToString(input.getBytes());` 
          : `String decoded = new String(Base64.getDecoder().decode(input));`};\n        System.out.println(${mode === 'encode' ? 'encoded' : 'decoded'});\n    }\n}`,
};

interface SmartBase64ToolProps {
  title?: string;
  description?: string;
}

export default function SmartBase64Tool({ 
  title = '智能 Base64 工具', 
  description = '支持换行控制、URL-safe转换、智能识别' 
}: SmartBase64ToolProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [lineBreak, setLineBreak] = useState('none');
  const [customLineLength, setCustomLineLength] = useState(64);
  const [strictMode, setStrictMode] = useState<'strict' | 'lax'>('lax');
  const [urlSafe, setUrlSafe] = useState(false);
  const [showSnippet, setShowSnippet] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python' | 'java'>('javascript');
  const [smartDetection, setSmartDetection] = useState<{
    type: string;
    suggestion: string;
    confidence: number;
  } | null>(null);
  const { toasts, showToast } = useToast();

  const processLineBreak = useCallback((str: string) => {
    switch (lineBreak) {
      case 'mime':
        return str.match(/.{1,76}/g)?.join('\n') || str;
      case 'custom':
        return str.match(new RegExp(`.{1,${customLineLength}}`, 'g'))?.join('\n') || str;
      default:
        return str;
    }
  }, [lineBreak, customLineLength]);

  const cleanInput = useCallback((str: string) => {
    if (strictMode === 'lax') {
      return str.replace(/[\s\r\n]/g, '');
    }
    return str;
  }, [strictMode]);

  const convertToUrlSafe = useCallback((str: string) => {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }, []);

  const convertFromUrlSafe = useCallback((str: string) => {
    let result = str.replace(/-/g, '+').replace(/_/g, '/');
    const padding = result.length % 4;
    if (padding) {
      result += '='.repeat(4 - padding);
    }
    return result;
  }, []);

  const detectContent = useCallback((base64Str: string) => {
    try {
      const cleaned = cleanInput(base64Str);
      const decoded = atob(cleaned);
      const bytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
      }

      if (bytes[0] === 0xFF && bytes[1] === 0xD8) {
        return { type: '图片 (JPEG)', suggestion: '检测到JPEG图片格式', confidence: 95 };
      }
      if (bytes[0] === 0x89 && bytes[1] === 0x50) {
        return { type: '图片 (PNG)', suggestion: '检测到PNG图片格式', confidence: 95 };
      }
      if (bytes[0] === 0x47 && bytes[1] === 0x49) {
        return { type: '图片 (GIF)', suggestion: '检测到GIF图片格式', confidence: 95 };
      }

      if (decoded.startsWith('{') || decoded.startsWith('[')) {
        try {
          JSON.parse(decoded);
          return { type: 'JSON', suggestion: '检测到JSON数据', confidence: 90 };
        } catch {}
      }

      if (decoded.startsWith('<!DOCTYPE') || decoded.startsWith('<html')) {
        return { type: 'HTML', suggestion: '检测到HTML文档', confidence: 85 };
      }

      if (decoded.match(/^[\x20-\x7E\s]+$/)) {
        return { type: '纯文本', suggestion: '检测为纯文本内容', confidence: 75 };
      }

      return { type: '二进制数据', suggestion: '检测为二进制数据，可保存为文件', confidence: 60 };
    } catch {
      return { type: '未知', suggestion: '无法识别内容类型', confidence: 30 };
    }
  }, [cleanInput]);

  const handleEncode = useCallback(() => {
    if (!input.trim()) {
      showToast('请输入要编码的文本', 'error');
      return;
    }
    try {
      let result = encodeBase64(input, 'utf-8');
      result = processLineBreak(result);
      if (urlSafe) {
        result = convertToUrlSafe(result);
      }
      setOutput(result);
      showToast('编码成功', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : '编码失败', 'error');
    }
  }, [input, processLineBreak, urlSafe, convertToUrlSafe, showToast]);

  const handleDecode = useCallback(() => {
    if (!input.trim()) {
      showToast('请输入要解码的Base64字符串', 'error');
      return;
    }
    try {
      let cleaned = cleanInput(input);
      if (urlSafe) {
        cleaned = convertFromUrlSafe(cleaned);
      }
      const result = decodeBase64(cleaned, 'utf-8');
      setOutput(result);
      setSmartDetection(detectContent(input));
      showToast('解码成功', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : '解码失败', 'error');
    }
  }, [input, cleanInput, urlSafe, convertFromUrlSafe, detectContent, showToast]);

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

  const handleExtractFromRegex = useCallback(() => {
    const patterns = [
      /data:image\/[^;]+;base64,([^"]+)/,
      /base64[,:]\s*([A-Za-z0-9+/=]{20,})/i,
    ];
    
    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) {
        setInput(match[1]);
        showToast('已提取Base64内容', 'success');
        return;
      }
    }
    showToast('未找到匹配的Base64内容', 'error');
  }, [input, showToast]);

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
        <div style={{ marginTop: '1rem' }}>
          <PrivacyIndicator />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'stretch' }}>
        {/* Input Panel */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>输入</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={handleExtractFromRegex}
                title="从文本中提取Base64"
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
              >
                <FileCode size={14} />
                提取Base64
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入Base64字符串...'}
            className="input-field"
            style={{ minHeight: '200px', fontFamily: 'monospace' }}
          />
        </div>

        {/* Center Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setMode('encode')}
            >
              编码
            </button>
            <button
              className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setMode('decode')}
            >
              解码
            </button>
          </div>
          <button 
            className="btn btn-primary" 
            onClick={mode === 'encode' ? handleEncode : handleDecode}
          >
            {mode === 'encode' ? '编码 →' : '← 解码'}
          </button>
        </div>

        {/* Output Panel */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 500 }}>输出</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                className="btn btn-secondary copy-btn" 
                onClick={() => setShowSnippet(!showSnippet)}
                title="生成代码片段"
                style={{ fontSize: '0.8rem' }}
              >
                <Zap size={14} />
                代码
              </button>
              <button className="btn btn-secondary copy-btn" onClick={handleCopy} title="复制">
                <Copy size={16} />
                复制
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="转换结果将显示在这里..."
            className="input-field"
            style={{ minHeight: '200px', fontFamily: 'monospace', backgroundColor: 'var(--bg-tertiary)' }}
          />
        </div>
      </div>

      {/* Smart Detection Result */}
      {smartDetection && mode === 'decode' && (
        <div className="card" style={{ marginTop: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'var(--accent-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Info size={20} color="var(--accent-color)" />
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                智能识别结果：{smartDetection.type}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginLeft: '0.5rem' }}>
                  可信度 {smartDetection.confidence}%
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                {smartDetection.suggestion}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Code Snippet Generator */}
      {showSnippet && output && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600 }}>代码片段生成</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['javascript', 'python', 'java'] as const).map((lang) => (
                <button
                  key={lang}
                  className={`btn ${selectedLanguage === lang ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelectedLanguage(lang)}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
                >
                  {lang === 'javascript' ? 'JS' : lang === 'python' ? 'Python' : 'Java'}
                </button>
              ))}
            </div>
          </div>
          <pre style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontFamily: 'monospace',
            overflow: 'auto'
          }}>
            {codeSnippets[selectedLanguage](output, mode)}
          </pre>
          <button 
            className="btn btn-primary" 
            style={{ marginTop: '1rem' }}
            onClick={() => {
              navigator.clipboard.writeText(codeSnippets[selectedLanguage](output, mode));
              showToast('已复制代码片段', 'success');
            }}
          >
            <Copy size={16} />
            复制代码
          </button>
        </div>
      )}

      {/* Settings */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Line Break Control */}
          <div className="input-wrapper">
            <label className="input-label">换行控制</label>
            <select
              value={lineBreak}
              onChange={(e) => setLineBreak(e.target.value)}
              className="input-field"
              style={{ padding: '0.5rem 1rem' }}
            >
              {lineBreakOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {lineBreak === 'custom' && (
              <input
                type="number"
                value={customLineLength}
                onChange={(e) => setCustomLineLength(Number(e.target.value))}
                min={10}
                max={200}
                className="input-field"
                style={{ marginTop: '0.5rem', padding: '0.4rem 0.75rem', width: '100px' }}
              />
            )}
          </div>

          {/* Strict Mode */}
          <div className="input-wrapper">
            <label className="input-label">解析模式</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {strictModeOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`btn ${strictMode === opt.value ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setStrictMode(opt.value as 'strict' | 'lax')}
                  style={{ fontSize: '0.85rem' }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
              {strictMode === 'strict' ? '仅标准字符集' : '自动过滤空白和换行'}
            </div>
          </div>

          {/* URL Safe */}
          <div className="input-wrapper">
            <label className="input-label">URL-safe 转换</label>
            <button
              className={`btn ${urlSafe ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setUrlSafe(!urlSafe)}
            >
              {urlSafe ? '已启用' : '未启用'}
            </button>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
              自动转换 +/- 和 = 符号
            </div>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
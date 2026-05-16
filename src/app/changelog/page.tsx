import Link from 'next/link';
import type { Metadata } from 'next';
import { Clock, Zap, GitBranch } from 'lucide-react';
import { getTranslation } from '@/i18n';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  return {
    title: `${t.changelog.title} - ChuanDaoAI`,
    description: t.changelog.subtitle,
  };
}

const changelog = [
  {
    version: 'v2.8.0',
    date: '2026-05-15',
    type: 'major',
    title: 'New Large File Processing and CLI Tools',
    titleZh: '新增大文件处理和CLI工具',
    changes: [
      { type: 'feature', text: 'Support files over 50MB with chunked encoding to prevent browser crashes', textZh: '支持50MB以上文件处理，分块编码避免浏览器崩溃' },
      { type: 'feature', text: 'New command-line tool supporting offline usage', textZh: '新增命令行工具，支持离线使用' },
      { type: 'feature', text: 'New browser extension supporting right-click menu quick conversion', textZh: '新增浏览器扩展，支持右键菜单快速转换' },
      { type: 'feature', text: 'JWT parser supports displaying header, payload and signature', textZh: 'JWT解析器支持显示头部、载荷和签名' },
      { type: 'feature', text: 'Base91 encoding support (optimized encoding for Bitcoin addresses)', textZh: 'Base91编码支持（比特币地址优化编码）' },
    ],
  },
  {
    version: 'v2.7.0',
    date: '2026-04-20',
    type: 'feature',
    title: 'Advanced Features Enhancement',
    titleZh: '高级功能增强',
    changes: [
      { type: 'feature', text: 'New Base64 Diff comparison tool with highlighted differences', textZh: '新增Base64 Diff对比工具，高亮显示差异' },
      { type: 'feature', text: 'Regex expression to extract Base64, supporting batch extraction', textZh: '正则表达式提取Base64，支持批量提取' },
      { type: 'feature', text: 'Code snippet generator supporting 10 programming languages', textZh: '代码片段生成器，支持10种编程语言' },
      { type: 'feature', text: 'Smart detection of content types (image/JSON/HTML, etc.)', textZh: '智能识别内容类型（图片/JSON/HTML等）' },
      { type: 'feature', text: 'Self-destruct mode, auto-clearing data after processing', textZh: '自毁模式，处理后自动清除数据' },
    ],
  },
  {
    version: 'v2.6.0',
    date: '2026-03-10',
    type: 'feature',
    title: 'Batch Processing Capability Improvement',
    titleZh: '批量处理能力提升',
    changes: [
      { type: 'feature', text: 'Batch file processing supports ZIP export', textZh: '批量文件处理支持ZIP打包导出' },
      { type: 'feature', text: 'History saves last 50 conversions', textZh: '历史记录保存最近50次转换' },
      { type: 'feature', text: 'Support for custom keyboard shortcuts', textZh: '支持快捷键自定义设置' },
      { type: 'improvement', text: 'Optimized memory usage for large file processing', textZh: '优化大文件处理的内存占用' },
      { type: 'bugfix', text: 'Fixed special character encoding issues', textZh: '修复特殊字符编码问题' },
    ],
  },
  {
    version: 'v2.5.0',
    date: '2026-02-01',
    type: 'feature',
    title: 'Base100 and More Encoding Support',
    titleZh: 'Base100和更多编码支持',
    changes: [
      { type: 'feature', text: 'New Base100 Emoji encoding support', textZh: '新增Base100 Emoji编码支持' },
      { type: 'feature', text: 'New Base85 Adobe encoding support', textZh: '新增Base85 Adobe编码支持' },
      { type: 'feature', text: 'Smart Base64 tool with line break control', textZh: '智能Base64工具，支持换行控制' },
      { type: 'feature', text: 'Decode analysis tool with automatic encoding type detection', textZh: '解码分析工具，自动识别编码类型' },
      { type: 'improvement', text: 'UI optimization with more modern design', textZh: '界面UI优化，更现代的设计' },
    ],
  },
  {
    version: 'v2.4.0',
    date: '2025-12-15',
    type: 'improvement',
    title: 'Performance Optimization and PWA Support',
    titleZh: '性能优化和PWA支持',
    changes: [
      { type: 'feature', text: 'PWA offline support, installable to desktop', textZh: 'PWA离线支持，可安装到桌面' },
      { type: 'feature', text: 'Service Worker caching for faster revisits', textZh: 'Service Worker缓存，加速再次访问' },
      { type: 'improvement', text: 'Conversion performance improved by 30%', textZh: '转换性能提升30%' },
      { type: 'improvement', text: 'Dark mode optimization to reduce eye strain', textZh: '暗色模式优化，减少眼睛疲劳' },
      { type: 'bugfix', text: 'Fixed Safari browser compatibility issues', textZh: '修复Safari浏览器兼容性问题' },
    ],
  },
  {
    version: 'v2.3.0',
    date: '2025-11-01',
    type: 'feature',
    title: 'API Services and Developer Tools',
    titleZh: 'API服务和开发者工具',
    changes: [
      { type: 'feature', text: 'Open RESTful API for developers', textZh: '开放RESTful API供开发者使用' },
      { type: 'feature', text: 'Provide Python, Node.js, Go SDKs', textZh: '提供Python、Node.js、Go SDK' },
      { type: 'feature', text: 'One-click code snippet copying', textZh: '代码片段一键复制' },
      { type: 'feature', text: 'New security detection tool', textZh: '新增安全检测工具' },
      { type: 'bugfix', text: 'Fixed GBK encoding support issues', textZh: '修复GBK编码支持问题' },
    ],
  },
  {
    version: 'v2.2.0',
    date: '2025-09-20',
    type: 'feature',
    title: 'File Processing Enhancement',
    titleZh: '文件处理增强',
    changes: [
      { type: 'feature', text: 'Support PDF file Base64 conversion', textZh: '支持PDF文件Base64转换' },
      { type: 'feature', text: 'Image preview supports zoom and pan', textZh: '图片预览支持缩放和平移' },
      { type: 'feature', text: 'Optimized drag-and-drop upload, supporting multiple files', textZh: '拖拽上传优化，支持多文件' },
      { type: 'improvement', text: 'Improved file size display', textZh: '文件大小显示优化' },
      { type: 'bugfix', text: 'Fixed laggy preview issue for large images', textZh: '修复大图片预览卡顿问题' },
    ],
  },
  {
    version: 'v2.1.0',
    date: '2025-08-01',
    type: 'improvement',
    title: 'User Experience Optimization',
    titleZh: '用户体验优化',
    changes: [
      { type: 'feature', text: 'Conversion history feature', textZh: '转换历史记录功能' },
      { type: 'feature', text: 'Dark/light theme toggle', textZh: '深色/浅色主题切换' },
      { type: 'feature', text: 'Mobile responsive optimization', textZh: '移动端响应式优化' },
      { type: 'improvement', text: 'Improved button and interaction feedback', textZh: '按钮和交互反馈优化' },
      { type: 'bugfix', text: 'Fixed iOS Safari input box issues', textZh: '修复iOS Safari输入框问题' },
    ],
  },
  {
    version: 'v2.0.0',
    date: '2025-06-15',
    type: 'major',
    title: 'Complete Redesign with Next.js',
    titleZh: '全新改版，Next.js重构',
    changes: [
      { type: 'feature', text: 'Completely rewritten based on Next.js 14', textZh: '基于Next.js 14完全重写' },
      { type: 'feature', text: 'TypeScript type-safe refactoring', textZh: 'TypeScript类型安全重构' },
      { type: 'feature', text: 'New encoding formats (Base16/32/58/62)', textZh: '新增多种编码格式（Base16/32/58/62）' },
      { type: 'feature', text: 'URL-safe Base64 dedicated tool', textZh: 'URL-safe Base64专用工具' },
      { type: 'feature', text: 'Learning center: Base64 principles and interview questions', textZh: '学习中心：Base64原理和面试题' },
    ],
  },
  {
    version: 'v1.0.0',
    date: '2020-01-01',
    type: 'major',
    title: 'Initial Release',
    titleZh: '初次发布',
    changes: [
      { type: 'feature', text: 'Basic text Base64 encoding/decoding', textZh: '基础文本Base64编解码' },
      { type: 'feature', text: 'Image Base64 conversion', textZh: '图片Base64转换' },
      { type: 'feature', text: 'URL-safe Base64 support', textZh: 'URL-safe Base64支持' },
      { type: 'feature', text: 'Pure frontend implementation with privacy protection', textZh: '纯前端实现，隐私保护' },
    ],
  },
];

const getChangeTypeStyle = (type: string, t: ReturnType<typeof getTranslation>) => {
  switch (type) {
    case 'feature':
      return { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', label: t.changelog.feature };
    case 'improvement':
      return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', label: t.changelog.improvement };
    case 'bugfix':
      return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', label: t.changelog.bugfix };
    case 'major':
      return { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', label: t.changelog.major };
    default:
      return { color: '#64748b', bg: 'rgba(100, 116, 139, 0.1)', label: t.changelog.other };
  }
};

const getVersionTypeStyle = (type: string) => {
  switch (type) {
    case 'major':
      return { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' };
    case 'feature':
      return { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)' };
    case 'improvement':
      return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' };
    default:
      return { color: '#64748b', bg: 'rgba(100, 116, 139, 0.15)' };
  }
};

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isZh = locale === 'zh';

  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.changelog.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {t.changelog.subtitle}
        </p>
      </div>

      {/* Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1rem', 
        marginBottom: '3rem' 
      }}>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>2.8.0</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{t.changelog.latestVersion}</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>50+</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{t.changelog.newFeatures}</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-color)' }}>6年+</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{t.changelog.continuousOperation}</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ec4899' }}>100万+</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{t.changelog.servingUsers}</div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Timeline Line */}
        <div style={{ 
          position: 'absolute', 
          left: '20px', 
          top: 0, 
          bottom: 0, 
          width: '2px', 
          backgroundColor: 'var(--border-color)' 
        }} />

        <div style={{ paddingLeft: '50px' }}>
          {changelog.map((release, index) => {
            const typeStyle = getVersionTypeStyle(release.type);
            return (
              <div key={index} style={{ 
                position: 'relative', 
                marginBottom: index === changelog.length - 1 ? 0 : '2rem' 
              }}>
                {/* Timeline Dot */}
                <div style={{ 
                  position: 'absolute', 
                  left: '-38px', 
                  top: '1.5rem',
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%',
                  backgroundColor: typeStyle.color,
                  border: '3px solid var(--bg-primary)'
                }} />

                <div className="card" style={{ 
                  borderLeft: `3px solid ${typeStyle.color}`,
                  marginBottom: 0
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <h2 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 600, 
                      color: 'var(--text-primary)',
                      margin: 0
                    }}>
                      {isZh ? release.titleZh : release.title}
                    </h2>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      backgroundColor: typeStyle.bg,
                      color: typeStyle.color,
                      fontSize: '0.8rem',
                      fontWeight: 500
                    }}>
                      {release.version}
                    </span>
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.3rem',
                      color: 'var(--text-tertiary)',
                      fontSize: '0.9rem'
                    }}>
                      <Clock size={14} />
                      {release.date}
                    </span>
                  </div>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                    {release.changes.map((change, i) => {
                      const changeStyle = getChangeTypeStyle(change.type, t);
                      return (
                        <li key={i} style={{ 
                          marginBottom: '0.5rem', 
                          color: 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem'
                        }}>
                          <span style={{ 
                            padding: '0.1rem 0.4rem', 
                            borderRadius: '4px', 
                            backgroundColor: changeStyle.bg,
                            color: changeStyle.color,
                            fontSize: '0.7rem',
                            fontWeight: 500,
                            flexShrink: 0
                          }}>
                            {changeStyle.label}
                          </span>
                          <span>{isZh ? change.textZh : change.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subscribe */}
      <div className="card" style={{ 
        marginTop: '3rem', 
        textAlign: 'center',
        backgroundColor: 'rgba(59, 130, 246, 0.1)'
      }}>
        <GitBranch size={32} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.changelog.subscribe}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
          {t.changelog.subscribeDesc}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="mailto:support@base64.club?subject=Subscribe to Updates" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            <Zap size={18} />
            {t.changelog.subscribeNow}
          </a>
          <Link href="/contact" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            {t.changelog.contactUs}
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import type { Metadata } from 'next';
import { Clock, Zap, Shield, Code, FileText, ArrowRight, GitBranch } from 'lucide-react';

export const metadata: Metadata = {
  title: '更新日志 - 传道AI',
  description: '传道AI Base64工具的最新更新和版本历史。查看新功能、改进和Bug修复记录。',
};

const changelog = [
  {
    version: 'v2.8.0',
    date: '2026-05-15',
    type: 'major',
    title: '新增大文件处理和CLI工具',
    changes: [
      { type: 'feature', text: '支持50MB以上文件处理，分块编码避免浏览器崩溃' },
      { type: 'feature', text: '新增命令行工具，支持离线使用' },
      { type: 'feature', text: '新增浏览器扩展，支持右键菜单快速转换' },
      { type: 'feature', text: 'JWT解析器支持显示头部、载荷和签名' },
      { type: 'feature', text: 'Base91编码支持（比特币地址优化编码）' },
    ],
  },
  {
    version: 'v2.7.0',
    date: '2026-04-20',
    type: 'feature',
    title: '高级功能增强',
    changes: [
      { type: 'feature', text: '新增Base64 Diff对比工具，高亮显示差异' },
      { type: 'feature', text: '正则表达式提取Base64，支持批量提取' },
      { type: 'feature', text: '代码片段生成器，支持10种编程语言' },
      { type: 'feature', text: '智能识别内容类型（图片/JSON/HTML等）' },
      { type: 'feature', text: '自毁模式，处理后自动清除数据' },
    ],
  },
  {
    version: 'v2.6.0',
    date: '2026-03-10',
    type: 'feature',
    title: '批量处理能力提升',
    changes: [
      { type: 'feature', text: '批量文件处理支持ZIP打包导出' },
      { type: 'feature', text: '历史记录保存最近50次转换' },
      { type: 'feature', text: '支持快捷键自定义设置' },
      { type: 'improvement', text: '优化大文件处理的内存占用' },
      { type: 'bugfix', text: '修复特殊字符编码问题' },
    ],
  },
  {
    version: 'v2.5.0',
    date: '2026-02-01',
    type: 'feature',
    title: 'Base100和更多编码支持',
    changes: [
      { type: 'feature', text: '新增Base100 Emoji编码支持' },
      { type: 'feature', text: '新增Base85 Adobe编码支持' },
      { type: 'feature', text: '智能Base64工具，支持换行控制' },
      { type: 'feature', text: '解码分析工具，自动识别编码类型' },
      { type: 'improvement', text: '界面UI优化，更现代的设计' },
    ],
  },
  {
    version: 'v2.4.0',
    date: '2025-12-15',
    type: 'improvement',
    title: '性能优化和PWA支持',
    changes: [
      { type: 'feature', text: 'PWA离线支持，可安装到桌面' },
      { type: 'feature', text: 'Service Worker缓存，加速再次访问' },
      { type: 'improvement', text: '转换性能提升30%' },
      { type: 'improvement', text: '暗色模式优化，减少眼睛疲劳' },
      { type: 'bugfix', text: '修复Safari浏览器兼容性问题' },
    ],
  },
  {
    version: 'v2.3.0',
    date: '2025-11-01',
    type: 'feature',
    title: 'API服务和开发者工具',
    changes: [
      { type: 'feature', text: '开放RESTful API供开发者使用' },
      { type: 'feature', text: '提供Python、Node.js、Go SDK' },
      { type: 'feature', text: '代码片段一键复制' },
      { type: 'feature', text: '新增安全检测工具' },
      { type: 'bugfix', text: '修复GBK编码支持问题' },
    ],
  },
  {
    version: 'v2.2.0',
    date: '2025-09-20',
    type: 'feature',
    title: '文件处理增强',
    changes: [
      { type: 'feature', text: '支持PDF文件Base64转换' },
      { type: 'feature', text: '图片预览支持缩放和平移' },
      { type: 'feature', text: '拖拽上传优化，支持多文件' },
      { type: 'improvement', text: '文件大小显示优化' },
      { type: 'bugfix', text: '修复大图片预览卡顿问题' },
    ],
  },
  {
    version: 'v2.1.0',
    date: '2025-08-01',
    type: 'improvement',
    title: '用户体验优化',
    changes: [
      { type: 'feature', text: '转换历史记录功能' },
      { type: 'feature', text: '深色/浅色主题切换' },
      { type: 'feature', text: '移动端响应式优化' },
      { type: 'improvement', text: '按钮和交互反馈优化' },
      { type: 'bugfix', text: '修复iOS Safari输入框问题' },
    ],
  },
  {
    version: 'v2.0.0',
    date: '2025-06-15',
    type: 'major',
    title: '全新改版，Next.js重构',
    changes: [
      { type: 'feature', text: '基于Next.js 14完全重写' },
      { type: 'feature', text: 'TypeScript类型安全重构' },
      { type: 'feature', text: '新增多种编码格式（Base16/32/58/62）' },
      { type: 'feature', text: 'URL-safe Base64专用工具' },
      { type: 'feature', text: '学习中心：Base64原理和面试题' },
    ],
  },
  {
    version: 'v1.0.0',
    date: '2020-01-01',
    type: 'major',
    title: '初次发布',
    changes: [
      { type: 'feature', text: '基础文本Base64编解码' },
      { type: 'feature', text: '图片Base64转换' },
      { type: 'feature', text: 'URL-safe Base64支持' },
      { type: 'feature', text: '纯前端实现，隐私保护' },
    ],
  },
];

const getChangeTypeStyle = (type: string) => {
  switch (type) {
    case 'feature':
      return { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', label: '新功能' };
    case 'improvement':
      return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', label: '优化' };
    case 'bugfix':
      return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', label: '修复' };
    case 'major':
      return { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', label: '重大更新' };
    default:
      return { color: '#64748b', bg: 'rgba(100, 116, 139, 0.1)', label: '其他' };
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

export default function ChangelogPage() {
  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          更新日志
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          了解传道AI的最新更新。我们持续改进产品，为您提供更好的使用体验。
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
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>最新版本</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>50+</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>新增功能</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-color)' }}>6年+</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>持续运营</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ec4899' }}>100万+</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>服务用户</div>
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
                      {release.title}
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
                      const changeStyle = getChangeTypeStyle(change.type);
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
                          <span>{change.text}</span>
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
          订阅更新通知
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
          关注我们的社交媒体或订阅邮件通知，第一时间获取新功能发布信息。
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="mailto:support@base64.club?subject=订阅更新通知" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            <Zap size={18} />
            订阅通知
          </a>
          <Link href="/contact" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            联系我们
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

const footerLinks = [
  { href: '/about', label: '关于我们' },
  { href: '/contact', label: '联系我们' },
  { href: '/privacy', label: '隐私政策' },
  { href: '/terms', label: '服务条款' },
  { href: '/disclaimer', label: '免责声明' },
  { href: '/copyright', label: '版权声明' },
];

const advancedFooterLinks = [
  { href: '/diff', label: 'Diff对比', isNew: true },
  { href: '/regex-extract', label: '正则提取', isNew: true },
  { href: '/code-snippet', label: '代码生成', isNew: true },
  { href: '/smart-detect', label: '智能识别', isNew: true },
  { href: '/self-destruct', label: '自毁模式', isNew: true },
  { href: '/large-file', label: '大文件处理', isNew: true },
  { href: '/smart-base64', label: '智能Base64' },
  { href: '/analyze', label: '解码分析' },
  { href: '/security', label: '安全检测' },
  { href: '/batch', label: '批量处理' },
];

const friendLinks = [
  { name: '免费图片处理', url: 'https://mosaic.chdaoai.com/' },
  { name: 'IceBreakGame', url: 'https://www.icebreakgame.com/' },
  { name: '视频去水印', url: 'https://www.removewatermarker.com/' },
  { name: 'PDF转换工具', url: 'https://pdf.chdaoai.com/' },
  { name: '在线生成二维码', url: 'https://qrcode.chdaoai.com/' },
  { name: 'NBA趣事', url: 'https://www.zorezoro.com/' },
  { name: '视频转文字', url: 'https://video2txt.zorezoro.com/' },
  { name: '图片去水印', url: 'https://www.chdaoai.com/' },
  { name: '传道AI工具', url: 'https://www.openai2025.com/' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* 底部链接 */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {footerLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="footer-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* 版权信息 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <p style={{
            color: 'var(--text-tertiary)',
            fontSize: '0.85rem',
            marginBottom: '0.5rem'
          }}>
            © 2025 传道AI · 版权所有
          </p>
          <p style={{
            color: 'var(--text-tertiary)',
            fontSize: '0.85rem',
            marginBottom: '0.5rem'
          }}>
            工业和信息化部 粤ICP备18041392号-7
          </p>
          <p style={{
            color: 'var(--text-tertiary)',
            fontSize: '0.85rem'
          }}>
            邮箱：support@base64.club | 地址：深圳市龙华区龙华大道130栋
          </p>
        </div>

        {/* 友情链接 */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '2rem'
        }}>
          <h3 style={{
            fontSize: '1rem',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            友情链接
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '0.75rem'
          }}>
            {friendLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          margin-top: 4rem;
          padding: 3rem 1rem;
        }
        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: var(--accent-color) !important;
        }
        .advanced-footer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: 6px;
        }
        .advanced-footer-link:hover {
          background-color: var(--bg-secondary);
        }
        .new-tag {
          padding: 0.1rem 0.3rem;
          background-color: var(--accent-color);
          color: white;
          border-radius: 3px;
          font-size: 0.6rem;
          font-weight: 600;
        }
      `}</style>
    </footer>
  );
}
'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const friendLinks = [
  { name: '免费图片处理', nameEn: 'Free Image Processing', url: 'https://mosaic.chdaoai.com/' },
  { name: 'IceBreakGame', nameEn: 'IceBreakGame', url: 'https://www.icebreakgame.com/' },
  { name: '视频去水印', nameEn: 'Video Watermark Removal', url: 'https://www.removewatermarker.com/' },
  { name: 'PDF转换工具', nameEn: 'PDF Converter', url: 'https://pdf.chdaoai.com/' },
  { name: '在线生成二维码', nameEn: 'Online QR Code Generator', url: 'https://qrcode.chdaoai.com/' },
  { name: 'NBA趣事', nameEn: 'NBA Fun Facts', url: 'https://www.zorezoro.com/' },
  { name: '视频转文字', nameEn: 'Video to Text', url: 'https://video2txt.zorezoro.com/' },
  { name: '图片去水印', nameEn: 'Image Watermark Removal', url: 'https://www.chdaoai.com/' },
  { name: '传道AI工具', nameEn: 'ChuanDaoAI Tools', url: 'https://www.openai2025.com/' },
  { name: '中国功夫网', nameEn: 'Chinese Kung Fu', url: 'https://gf.zorezoro.com/' },
  { name: '中国菜系大全', nameEn: 'Chinese Cuisine Guide', url: 'https://food.zorezoro.com/' },
  { name: '中国24史', nameEn: 'Chinese History', url: 'https://china.zorezoro.com/' },
];

export function Footer() {
  const { t, language } = useLanguage();

  const footerLinks = [
    { href: '/about', label: t.footer.aboutUs },
    { href: '/contact', label: t.footer.contactUs },
    { href: '/privacy', label: t.footer.privacyPolicy },
    { href: '/terms', label: t.footer.termsOfService },
    { href: '/disclaimer', label: t.footer.disclaimer },
    { href: '/copyright', label: t.footer.copyright },
  ];

  const advancedFooterLinks = [
    { href: '/diff', label: t.nav.diff, isNew: true },
    { href: '/regex-extract', label: t.nav.regexExtract, isNew: true },
    { href: '/code-snippet', label: t.nav.codeSnippet, isNew: true },
    { href: '/smart-detect', label: t.nav.smartDetect, isNew: true },
    { href: '/self-destruct', label: t.nav.selfDestruct, isNew: true },
    { href: '/large-file', label: t.nav.largeFile, isNew: true },
    { href: '/smart-base64', label: t.nav.smartBase64 },
    { href: '/analyze', label: t.nav.analyze },
    { href: '/security', label: t.nav.security },
    { href: '/batch', label: t.nav.batch },
  ];

  return (
    <footer className="footer">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Footer Links */}
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

        {/* Copyright Info */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <p style={{
            color: 'var(--text-tertiary)',
            fontSize: '0.85rem',
            marginBottom: '0.5rem'
          }}>
            {t.footer.copyrightText}
          </p>
          <p style={{
            color: 'var(--text-tertiary)',
            fontSize: '0.85rem',
            marginBottom: '0.5rem'
          }}>
            {t.footer.icp}
          </p>
          <p style={{
            color: 'var(--text-tertiary)',
            fontSize: '0.85rem'
          }}>
            {t.footer.email}: support@base64.club | {t.footer.address}: 深圳市龙华区龙华大道130栋
          </p>
        </div>

        {/* Friend Links */}
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
            {t.footer.friendLinks}
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
                {language === 'zh' ? link.name : link.nameEn}
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

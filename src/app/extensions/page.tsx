import Link from 'next/link';
import type { Metadata } from 'next';
import { Chrome, Globe, Download, Star, ArrowRight, Shield, Zap, Monitor } from 'lucide-react';
import { getTranslation } from '@/i18n';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  return {
    title: `${t.extensions.title} - ChuanDaoAI`,
    description: t.extensions.subtitle,
  };
}

const browsers = [
  {
    id: 'chrome',
    name: 'Chrome',
    icon: <Chrome size={32} />,
    color: '#4285f4',
    users: '1.2亿+',
    usersEn: '120M+',
    status: 'recommended',
    features: ['右键菜单转换', '快捷键支持', '弹出窗口', '离线使用'],
    featuresEn: ['Right-click menu conversion', 'Keyboard shortcuts', 'Popup window', 'Offline support'],
    downloadUrl: '#',
    version: '2.8.0',
  },
  {
    id: 'edge',
    name: 'Edge',
    icon: <Monitor size={32} />,
    color: '#0078d4',
    users: '6000万+',
    usersEn: '60M+',
    status: 'available',
    features: ['右键菜单转换', '快捷键支持', '弹出窗口', '同步收藏夹'],
    featuresEn: ['Right-click menu conversion', 'Keyboard shortcuts', 'Popup window', 'Sync favorites'],
    downloadUrl: '#',
    version: '2.8.0',
  },
  {
    id: 'firefox',
    name: 'Firefox',
    icon: <Globe size={32} />,
    color: '#ff7139',
    users: '3000万+',
    usersEn: '30M+',
    status: 'available',
    features: ['右键菜单转换', '快捷键支持', '弹出窗口', '隐私保护'],
    featuresEn: ['Right-click menu conversion', 'Keyboard shortcuts', 'Popup window', 'Privacy protection'],
    downloadUrl: '#',
    version: '2.7.5',
  },
  {
    id: 'opera',
    name: 'Opera',
    icon: <Globe size={32} />,
    color: '#ff1b6d',
    users: '1000万+',
    usersEn: '10M+',
    status: 'available',
    features: ['右键菜单转换', '快捷键支持', '弹出窗口'],
    featuresEn: ['Right-click menu conversion', 'Keyboard shortcuts', 'Popup window'],
    downloadUrl: '#',
    version: '2.7.0',
  },
];

const features = [
  {
    icon: <Shield size={24} />,
    titleKey: 'privacyFirst' as const,
    descKey: 'privacyFirstDesc' as const,
  },
  {
    icon: <Zap size={24} />,
    titleKey: 'oneClickConvert' as const,
    descKey: 'oneClickConvertDesc' as const,
  },
  {
    icon: <Download size={24} />,
    titleKey: 'offlineAvailable' as const,
    descKey: 'offlineAvailableDesc' as const,
  },
  {
    icon: <Star size={24} />,
    titleKey: 'rating' as const,
    descKey: 'ratingDesc' as const,
  },
];

const screenshots = [
  { titleKey: 'contextMenu' as const, descKey: 'contextMenuDesc' as const },
  { titleKey: 'popup' as const, descKey: 'popupDesc' as const },
  { titleKey: 'shortcuts' as const, descKey: 'shortcutsDesc' as const },
];

const installSteps = [
  { stepKey: 'downloadExtension2' as const, descKey: 'extension2Desc' as const },
  { stepKey: 'openExtensionsPage' as const, descKey: 'openExtensionsPageDesc' as const },
  { stepKey: 'enableDevMode' as const, descKey: 'enableDevModeDesc' as const },
  { stepKey: 'dragToInstall' as const, descKey: 'dragToInstallDesc' as const },
];

const shortcuts = [
  { keys: 'Ctrl + Shift + E', descKey: 'encodeSelected' as const },
  { keys: 'Ctrl + Shift + D', descKey: 'decodeSelected' as const },
  { keys: 'Ctrl + Shift + U', descKey: 'urlSafeEncode' as const },
  { keys: 'Ctrl + Shift + X', descKey: 'openPanel' as const },
];

export default async function ExtensionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isZh = locale === 'zh';

  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.extensions.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {t.extensions.subtitle}
        </p>
      </div>

      {/* Features */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem', 
        marginBottom: '3rem' 
      }}>
        {features.map((feature, index) => (
          <div key={index} className="card" style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '1rem',
            marginBottom: 0
          }}>
            <div style={{ 
              padding: '0.75rem', 
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '8px',
              color: 'var(--accent-color)'
            }}>
              {feature.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {t.extensions[feature.titleKey]}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {t.extensions[feature.descKey]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Browser Cards */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
        {t.extensions.downloadExtension}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {browsers.map((browser) => (
          <div 
            key={browser.id} 
            className="card" 
            style={{ 
              textAlign: 'center',
              border: browser.status === 'recommended' ? `2px solid ${browser.color}` : undefined,
              position: 'relative'
            }}
          >
            {browser.status === 'recommended' && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: browser.color,
                color: 'white',
                padding: '0.25rem 1rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 600
              }}>
                {t.extensions.recommended}
              </div>
            )}
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%',
              backgroundColor: `${browser.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0.5rem auto 1rem',
              color: browser.color
            }}>
              {browser.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {browser.name}
            </h3>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {isZh ? browser.users : browser.usersEn} {t.extensions.users}
            </p>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.5rem', 
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              {(isZh ? browser.features : browser.featuresEn).map((feature, i) => (
                <span key={i} style={{ 
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)'
                }}>
                  {feature}
                </span>
              ))}
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                {t.extensions.version} {browser.version}
              </span>
            </div>
            <a 
              href={browser.downloadUrl} 
              className="btn btn-primary"
              style={{ 
                textDecoration: 'none',
                backgroundColor: browser.color
              }}
            >
              <Download size={18} />
              {t.extensions.install}
            </a>
          </div>
        ))}
      </div>

      {/* Screenshots */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Monitor size={24} style={{ color: 'var(--accent-color)' }} />
          {t.extensions.preview}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {screenshots.map((screenshot, index) => (
            <div 
              key={index} 
              style={{ 
                backgroundColor: 'var(--bg-tertiary)', 
                borderRadius: '8px',
                padding: '1.5rem',
                textAlign: 'center'
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '8px',
                backgroundColor: 'var(--bg-primary)',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'var(--accent-color)'
              }}>
                {index === 0 ? '🖱️' : index === 1 ? '🪟' : '⌨️'}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {t.extensions[screenshot.titleKey]}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                {t.extensions[screenshot.descKey]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Installation Guide */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          {t.extensions.installationGuide}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {installSteps.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              gap: '1rem',
              alignItems: 'flex-start'
            }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%',
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                flexShrink: 0
              }}>
                {index + 1}
              </div>
              <div>
                <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  {t.extensions[item.stepKey]}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {t.extensions[item.descKey]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          {t.extensions.keyboardShortcuts}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {shortcuts.map((shortcut, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '8px'
            }}>
              <kbd style={{ 
                padding: '0.25rem 0.5rem',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '4px',
                fontSize: '0.85rem',
                fontFamily: 'monospace',
                color: 'var(--accent-color)'
              }}>
                {shortcut.keys}
              </kbd>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {t.extensions[shortcut.descKey]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            <Chrome size={18} />
            {t.extensions.downloadChrome}
          </a>
          <Link href="/cli" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            {t.extensions.viewCLI}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

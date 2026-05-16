'use client';

import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';
import { Sun, Moon, Menu, X, ChevronDown, Zap, Globe } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const handleLanguageSwitch = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
  };

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/text-base64', label: t.nav.textBase64 },
    { href: '/file-base64', label: t.nav.fileBase64 },
    { href: '/image-base64', label: t.nav.imageBase64 },
    { href: '/url-base64', label: t.nav.urlBase64 },
    { href: '/learn', label: t.nav.learn },
    { href: '/developers', label: t.nav.developers },
  ];

  const advancedNavItems = [
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
    { href: '/jwt', label: t.nav.jwt, isNew: true },
    { href: '/base91', label: t.nav.base91, isNew: true },
    { href: '/faq', label: t.nav.faq },
    { href: '/use-cases', label: t.nav.useCases },
    { href: '/changelog', label: t.nav.changelog },
    { href: '/compare', label: t.nav.compare },
    { href: '/extensions', label: t.nav.extensions },
    { href: '/cli', label: t.nav.cli },
    { href: '/testimonials', label: t.nav.testimonials },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="header-logo">
          <span style={{ fontSize: '2rem' }}>🔐</span>
          <span className="header-title">{language === 'zh' ? '传道AI' : 'ChuanDaoAI'}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav header-nav">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}

          {/* Advanced Features Dropdown */}
          <div className="advanced-menu-wrapper">
            <button
              className="nav-link advanced-menu-btn"
              onClick={() => setAdvancedOpen(!advancedOpen)}
              onMouseEnter={() => setAdvancedOpen(true)}
            >
              <Zap size={16} />
              {t.nav.advancedFeatures}
              <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: advancedOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>
            <div
              className="advanced-dropdown"
              onMouseLeave={() => setAdvancedOpen(false)}
              style={{ display: advancedOpen ? 'block' : 'none' }}
            >
              {advancedNavItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="advanced-dropdown-item"
                  onClick={() => setAdvancedOpen(false)}
                >
                  <span>{item.label}</span>
                  {item.isNew && <span className="new-tag">{t.common.newTag}</span>}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={t.theme.toggleTheme}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={handleLanguageSwitch}
            className="language-toggle"
            aria-label={t.language.switchLanguage}
            title={t.language.switchLanguage}
          >
            <Globe size={18} />
            <span className="language-text">{language === 'zh' ? 'EN' : '中'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label={t.nav.menu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="mobile-nav">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Advanced Features - Mobile */}
          <div className="mobile-nav-section-title">
            <Zap size={16} />
            {t.nav.advancedFeatures}
          </div>
          {advancedNavItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
              style={{ paddingLeft: '1.5rem' }}
            >
              {item.label}
              {item.isNew && <span className="new-tag" style={{ marginLeft: '0.5rem' }}>{t.common.newTag}</span>}
            </Link>
          ))}
        </nav>
      )}

      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background-color: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .header-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--text-primary);
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--accent-color) !important;
        }
        .advanced-menu-wrapper {
          position: relative;
        }
        .advanced-menu-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }
        .advanced-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 0.5rem;
          min-width: 180px;
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 0.5rem;
          z-index: 100;
        }
        .advanced-dropdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.75rem;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.2s;
          font-size: 0.9rem;
        }
        .advanced-dropdown-item:hover {
          background-color: var(--bg-tertiary);
          color: var(--accent-color);
        }
        .new-tag {
          padding: 0.15rem 0.4rem;
          background-color: var(--accent-color);
          color: white;
          border-radius: 4px;
          font-size: 0.6rem;
          font-weight: 600;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .theme-toggle {
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          border-radius: 8px;
          transition: background-color 0.2s;
        }
        .theme-toggle:hover {
          background-color: var(--bg-tertiary);
        }
        .language-toggle {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: none;
          border: 1px solid var(--border-color);
          padding: 0.4rem 0.75rem;
          cursor: pointer;
          color: var(--text-secondary);
          border-radius: 8px;
          transition: all 0.2s;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .language-toggle:hover {
          background-color: var(--bg-tertiary);
          color: var(--accent-color);
          border-color: var(--accent-color);
        }
        .language-text {
          min-width: 24px;
        }
        .language-toggle {
          background: none;
          border: 1px solid var(--border-color);
          padding: 0.4rem 0.6rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--text-primary);
          border-radius: 6px;
          transition: all 0.2s;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .language-toggle:hover {
          background-color: var(--bg-tertiary);
          border-color: var(--accent-color);
          color: var(--accent-color);
        }
        .language-text {
          min-width: 24px;
        }
        .mobile-menu-btn {
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          display: none;
          color: var(--text-primary);
        }
        .mobile-nav {
          display: none;
          flex-direction: column;
          padding: 1rem;
          border-top: 1px solid var(--border-color);
          background-color: var(--bg-primary);
        }
        .mobile-nav-link {
          padding: 0.75rem 0;
          color: var(--text-secondary);
          text-decoration: none;
          border-bottom: 1px solid var(--border-color);
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .mobile-nav {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

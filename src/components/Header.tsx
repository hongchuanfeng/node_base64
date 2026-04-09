'use client';

import { useTheme } from '@/hooks/useTheme';
import Link from 'next/link';
import { Sun, Moon, Menu, X, ChevronDown, Zap } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/text-base64', label: '文本Base64' },
  { href: '/file-base64', label: '文件Base64' },
  { href: '/image-base64', label: '图片预览' },
  { href: '/url-base64', label: 'URL安全编码' },
  { href: '/learn', label: '学习Base64' },
  { href: '/api', label: 'API服务' },
];

const advancedNavItems = [
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
  { href: '/jwt', label: 'JWT解析器', isNew: true },
  { href: '/base91', label: 'Base91编码', isNew: true },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="header-logo">
          <span style={{ fontSize: '2rem' }}>🔐</span>
          <span className="header-title">传道AI</span>
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

          {/* 进阶功能下拉菜单 */}
          <div className="advanced-menu-wrapper">
            <button
              className="nav-link advanced-menu-btn"
              onClick={() => setAdvancedOpen(!advancedOpen)}
              onMouseEnter={() => setAdvancedOpen(true)}
            >
              <Zap size={16} />
              进阶功能
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
                  {item.isNew && <span className="new-tag">NEW</span>}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="切换主题"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="菜单"
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

          {/* 进阶功能 - 移动端 */}
          <div className="mobile-nav-section-title">
            <Zap size={16} />
            进阶功能
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
              {item.isNew && <span className="new-tag" style={{ marginLeft: '0.5rem' }}>NEW</span>}
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
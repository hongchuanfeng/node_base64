'use client';

import Link from 'next/link';
import { Shield, FileText, Image, Globe, Code, Zap, BookOpen, Terminal, GitCompare, Regex, Wand2, Timer, FileBox, Package, Cpu, Search, Lock, Wand, Eye, Trash2, HardDrive, Copy, Layers, Key, HelpCircle, Map, FileCode, Coffee, Star, ChevronRight, Grid3x3, Book, TerminalSquare } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Feature item type
interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  color?: string;
  isNew?: boolean;
}

export default function HomePage() {
  const { t } = useLanguage();

  // 核心功能
  const mainFeatures: FeatureItem[] = [
    {
      icon: <FileText size={32} />,
      title: t.features.textBase64.title,
      desc: t.features.textBase64.desc,
      href: '/text-base64',
      color: '#3b82f6'
    },
    {
      icon: <FileText size={32} />,
      title: t.features.fileBase64.title,
      desc: t.features.fileBase64.desc,
      href: '/file-base64',
      color: '#8b5cf6'
    },
    {
      icon: <Image size={32} />,
      title: t.features.imageBase64.title,
      desc: t.features.imageBase64.desc,
      href: '/image-base64',
      color: '#ec4899'
    },
    {
      icon: <Globe size={32} />,
      title: t.features.urlBase64.title,
      desc: t.features.urlBase64.desc,
      href: '/url-base64',
      color: '#10b981'
    },
  ];

  // 衍生编码工具
  const extendedFeatures: FeatureItem[] = [
    { icon: <Code size={20} />, title: 'Base16', desc: '十六进制编码', href: '/base16' },
    { icon: <Code size={20} />, title: 'Base32', desc: 'RFC 4648标准', href: '/base32' },
    { icon: <Code size={20} />, title: 'Base58', desc: '比特币地址编码', href: '/base58' },
    { icon: <Code size={20} />, title: 'Base62', desc: 'URL友好编码', href: '/base62' },
    { icon: <Code size={20} />, title: 'Base85', desc: 'Adobe变体编码', href: '/base85' },
    { icon: <Code size={20} />, title: 'Base100', desc: '完整Emoji编码', href: '/base100' },
  ];

  // 进阶功能 - 批量与集成
  const advancedBatchFeatures: FeatureItem[] = [
    {
      icon: <Terminal size={24} />,
      title: t.features.batch.title,
      desc: t.features.batch.desc,
      href: '/batch',
      isNew: true
    },
    {
      icon: <Cpu size={24} />,
      title: t.features.api.title,
      desc: t.features.api.desc,
      href: '/api',
      isNew: true
    },
    {
      icon: <Copy size={24} />,
      title: t.features.codeSnippet.title,
      desc: t.features.codeSnippet.desc,
      href: '/code-snippet',
      isNew: true
    },
  ];

  // 进阶功能 - 智能分析
  const advancedAnalysisFeatures: FeatureItem[] = [
    {
      icon: <Wand2 size={24} />,
      title: t.features.smartBase64.title,
      desc: t.features.smartBase64.desc,
      href: '/smart-base64',
      isNew: true
    },
    {
      icon: <Search size={24} />,
      title: t.features.analyze.title,
      desc: t.features.analyze.desc,
      href: '/analyze',
      isNew: true
    },
    {
      icon: <Wand size={24} />,
      title: t.features.smartDetect.title,
      desc: t.features.smartDetect.desc,
      href: '/smart-detect',
      isNew: true
    },
    {
      icon: <Regex size={24} />,
      title: t.features.regexExtract.title,
      desc: t.features.regexExtract.desc,
      href: '/regex-extract',
      isNew: true
    },
  ];

  // 进阶功能 - 安全工具
  const advancedSecurityFeatures: FeatureItem[] = [
    {
      icon: <Shield size={24} />,
      title: t.features.security.title,
      desc: t.features.security.desc,
      href: '/security',
      isNew: true
    },
    {
      icon: <Lock size={24} />,
      title: t.features.selfDestruct.title,
      desc: t.features.selfDestruct.desc,
      href: '/self-destruct',
      isNew: true
    },
    {
      icon: <GitCompare size={24} />,
      title: t.features.diff.title,
      desc: t.features.diff.desc,
      href: '/diff',
      isNew: true
    },
  ];

  // 进阶功能 - 文件处理
  const advancedFileFeatures: FeatureItem[] = [
    {
      icon: <HardDrive size={24} />,
      title: t.features.largeFile.title,
      desc: t.features.largeFile.desc,
      href: '/large-file',
      isNew: true
    },
  ];

  // 开发者与工具
  const developerTools: FeatureItem[] = [
    {
      icon: <Key size={24} />,
      title: t.features.jwt.title,
      desc: t.features.jwt.desc,
      href: '/jwt',
      isNew: true
    },
    {
      icon: <FileCode size={24} />,
      title: t.features.base91.title,
      desc: t.features.base91.desc,
      href: '/base91',
      isNew: true
    },
  ];

  // 学习与资源
  const learningResources: FeatureItem[] = [
    {
      icon: <Map size={24} />,
      title: t.features.useCases.title,
      desc: t.features.useCases.desc,
      href: '/use-cases'
    },
    {
      icon: <Grid3x3 size={24} />,
      title: t.features.compare.title,
      desc: t.features.compare.desc,
      href: '/compare'
    },
    {
      icon: <Book size={24} />,
      title: t.home.learnBase64,
      desc: 'Base64原理、面试题、在线演示',
      href: '/learn'
    },
  ];

  // 产品与服务
  const productServices: FeatureItem[] = [
    {
      icon: <Coffee size={24} />,
      title: t.features.cli.title,
      desc: t.features.cli.desc,
      href: '/cli'
    },
    {
      icon: <TerminalSquare size={24} />,
      title: t.features.extensions.title,
      desc: t.features.extensions.desc,
      href: '/extensions'
    },
    {
      icon: <Star size={24} />,
      title: t.features.testimonials.title,
      desc: t.features.testimonials.desc,
      href: '/testimonials'
    },
  ];

  // 更多信息
  const moreInfo: FeatureItem[] = [
    {
      icon: <HelpCircle size={24} />,
      title: t.features.faq.title,
      desc: t.features.faq.desc,
      href: '/faq'
    },
    {
      icon: <BookOpen size={24} />,
      title: t.features.changelog.title,
      desc: t.features.changelog.desc,
      href: '/changelog'
    },
  ];

  // 全部进阶功能
  const allAdvancedFeatures = [
    ...advancedBatchFeatures,
    ...advancedAnalysisFeatures,
    ...advancedSecurityFeatures,
    ...advancedFileFeatures,
  ];

  // 新功能快捷入口
  const newFeaturesQuickAccess = allAdvancedFeatures.filter(f => f.isNew);

  const FeatureCard = ({ feature, size = 'normal' }: { feature: FeatureItem, size?: 'normal' | 'small' | 'large' }) => {
    const isLarge = size === 'large';
    const isSmall = size === 'small';
    
    return (
      <Link
        href={feature.href}
        style={{ textDecoration: 'none' }}
      >
        <div className="feature-card" style={{
          padding: isLarge ? '1.5rem' : isSmall ? '0.75rem 1rem' : '1rem',
          display: 'flex',
          flexDirection: isSmall ? 'row' : 'column',
          alignItems: isSmall ? 'center' : 'flex-start',
          gap: isSmall ? '0.75rem' : undefined,
        }}>
          {isSmall && (
            <div style={{ color: 'var(--accent-color)', flexShrink: 0 }}>
              {feature.icon}
            </div>
          )}
          {!isSmall && (
            <div style={{ color: feature.color || 'var(--accent-color)', marginBottom: isLarge ? '1rem' : '0.75rem' }}>
              {feature.icon}
            </div>
          )}
          <div style={{ flex: 1, width: isSmall ? '100%' : undefined }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <h3 className="feature-card-title" style={{ fontSize: isSmall ? '0.95rem' : isLarge ? '1.1rem' : '1rem', margin: 0 }}>
                {feature.title}
              </h3>
              {feature.isNew && (
                <span style={{
                  padding: '0.15rem 0.4rem',
                  backgroundColor: 'var(--accent-color)',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '0.6rem',
                  fontWeight: 600
                }}>
                  NEW
                </span>
              )}
            </div>
            <p className="feature-card-desc" style={{ fontSize: isSmall ? '0.75rem' : isLarge ? '0.9rem' : '0.8rem', margin: 0 }}>
              {feature.desc}
            </p>
          </div>
        </div>
      </Link>
    );
  };

  const AdvancedFeatureCard = ({ feature, compact = false }: { feature: FeatureItem, compact?: boolean }) => (
    <Link
      href={feature.href}
      style={{ textDecoration: 'none' }}
    >
      <div style={{
        display: 'flex',
        alignItems: compact ? 'center' : 'flex-start',
        gap: '0.75rem',
        padding: compact ? '0.6rem 0.75rem' : '0.75rem 1rem',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: '8px',
        transition: 'all 0.2s',
        border: '1px solid transparent',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-color)';
        e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}>
        <div style={{ color: 'var(--accent-color)', flexShrink: 0 }}>
          {feature.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: compact ? '0.1rem' : '0.2rem' }}>
            <span style={{
              fontWeight: 500,
              color: 'var(--text-primary)',
              fontSize: compact ? '0.85rem' : '0.9rem'
            }}>
              {feature.title}
            </span>
            {feature.isNew && (
              <span style={{
                padding: '0.1rem 0.3rem',
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                borderRadius: '3px',
                fontSize: '0.55rem',
                fontWeight: 600
              }}>
                NEW
              </span>
            )}
          </div>
          {!compact && (
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {feature.desc}
            </p>
          )}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="tool-container">
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '3rem 0 2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          marginBottom: '1rem'
        }}>
          🔐 {t.home.title}
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          {t.home.subtitle}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            {t.common.startUsing}
          </Link>
          <Link href="/learn" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            {t.home.learnBase64}
          </Link>
        </div>
      </section>

      {/* 新功能快捷入口 */}
      <section style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Zap size={18} />
            {t.home.newFeatures}
          </h3>
          <Link href="#advanced-tools" style={{
            fontSize: '0.85rem',
            color: 'var(--accent-color)',
            textDecoration: 'none'
          }}>
            {t.common.viewAll} →
          </Link>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0.75rem'
        }}>
          {newFeaturesQuickAccess.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1rem',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '8px',
                transition: 'all 0.2s',
                cursor: 'pointer',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-color)';
                e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
              }}>
                <div style={{ color: 'var(--accent-color)' }}>
                  {feature.icon}
                </div>
                <span style={{
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap'
                }}>
                  {feature.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 核心功能 */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '1.25rem',
          textAlign: 'center'
        }}>
          {t.home.coreFeatures}
        </h2>
        <div className="feature-grid">
          {mainFeatures.map((feature) => (
            <FeatureCard key={feature.href} feature={feature} size="large" />
          ))}
        </div>
      </section>

      {/* 衍生编码工具 */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '1.25rem',
          textAlign: 'center'
        }}>
          {t.home.extendedEncoding}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '0.75rem'
        }}>
          {extendedFeatures.map((feature) => (
            <FeatureCard key={feature.href} feature={feature} size="small" />
          ))}
        </div>
      </section>

      {/* 进阶功能 - 完整展示 */}
      <section id="advanced-tools" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '1.25rem',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <Zap size={22} color="var(--accent-color)" />
          {t.home.advancedFeatures}
        </h2>
        
        {/* 批量与集成 */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Terminal size={18} color="var(--accent-color)" />
            批量与编程集成
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {advancedBatchFeatures.map((feature) => (
              <AdvancedFeatureCard key={feature.href} feature={feature} />
            ))}
          </div>
        </div>

        {/* 智能分析 */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Search size={18} color="var(--accent-color)" />
            智能分析与识别
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {advancedAnalysisFeatures.map((feature) => (
              <AdvancedFeatureCard key={feature.href} feature={feature} />
            ))}
          </div>
        </div>

        {/* 安全工具 */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Shield size={18} color="var(--accent-color)" />
            安全与隐私保护
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {advancedSecurityFeatures.map((feature) => (
              <AdvancedFeatureCard key={feature.href} feature={feature} />
            ))}
          </div>
        </div>

        {/* 文件处理 */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <HardDrive size={18} color="var(--accent-color)" />
            文件处理
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {advancedFileFeatures.map((feature) => (
              <AdvancedFeatureCard key={feature.href} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* 开发者与工具 */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '1.25rem',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <Code size={22} color="var(--accent-color)" />
          {t.home.developerTools}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {developerTools.map((feature) => (
            <AdvancedFeatureCard key={feature.href} feature={feature} />
          ))}
        </div>
      </section>

      {/* 学习与资源 */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '1.25rem',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <BookOpen size={22} color="var(--accent-color)" />
          {t.home.learningResources}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {learningResources.map((feature) => (
            <AdvancedFeatureCard key={feature.href} feature={feature} />
          ))}
        </div>
      </section>

      {/* 产品与服务 */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '1.25rem',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <Package size={22} color="var(--accent-color)" />
          {t.home.productServices}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {productServices.map((feature) => (
            <AdvancedFeatureCard key={feature.href} feature={feature} />
          ))}
        </div>
      </section>

      {/* 更多信息 */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '1.25rem',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <HelpCircle size={22} color="var(--accent-color)" />
          {t.home.moreInfo}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {moreInfo.map((feature) => (
            <AdvancedFeatureCard key={feature.href} feature={feature} />
          ))}
        </div>
      </section>

      {/* 学习板块 */}
      <section style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2.5rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          <BookOpen size={48} style={{ color: 'var(--accent-color)' }} />
        </div>
        <h2 style={{
          fontSize: '1.4rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '1rem'
        }}>
          {t.home.understandBase64}
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: '1.5rem',
          maxWidth: '600px',
          margin: '0 auto 1.5rem'
        }}>
          {t.home.base64Description}
        </p>
        <Link href="/learn" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          {t.home.startLearning}
        </Link>
      </section>

      {/* 功能特性 */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem'
      }}>
        <div className="card">
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem'
          }}>
            🌙 {t.home.darkMode}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {t.home.darkModeDesc}
          </p>
        </div>
        <div className="card">
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem'
          }}>
            🔒 {t.home.privacy}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {t.home.privacyDesc}
          </p>
        </div>
        <div className="card">
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem'
          }}>
            ⚡ {t.home.efficient}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {t.home.efficientDesc}
          </p>
        </div>
        <div className="card">
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem'
          }}>
            📱 {t.home.responsive}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {t.home.responsiveDesc}
          </p>
        </div>
      </section>
    </div>
  );
}

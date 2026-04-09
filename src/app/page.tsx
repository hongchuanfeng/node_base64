'use client';

import Link from 'next/link';
import { Shield, FileText, Image, Globe, Code, Zap, BookOpen, Terminal, GitCompare, Regex, Wand2, Timer, FileBox } from 'lucide-react';

const mainFeatures = [
  {
    icon: <FileText size={32} />,
    title: '文本Base64',
    desc: '文本与Base64双向转换，支持UTF-8、GBK等多种编码',
    href: '/text-base64',
    color: '#3b82f6'
  },
  {
    icon: <FileText size={32} />,
    title: '文件Base64',
    desc: '图片、PDF等文件转为Base64字符串，支持预览',
    href: '/file-base64',
    color: '#8b5cf6'
  },
  {
    icon: <Image size={32} />,
    title: '图片预览',
    desc: '输入Base64图片字符串，实时渲染图片',
    href: '/image-base64',
    color: '#ec4899'
  },
  {
    icon: <Globe size={32} />,
    title: 'URL安全编码',
    desc: '标准Base64与URL-safe Base64互转',
    href: '/url-base64',
    color: '#10b981'
  },
];

const extendedFeatures = [
  { icon: <Code size={20} />, title: 'Base16', desc: '十六进制编码', href: '/base16' },
  { icon: <Code size={20} />, title: 'Base32', desc: '32字符编码', href: '/base32' },
  { icon: <Code size={20} />, title: 'Base58', desc: '比特币风格', href: '/base58' },
  { icon: <Code size={20} />, title: 'Base62', desc: '62字符编码', href: '/base62' },
  { icon: <Code size={20} />, title: 'Base85', desc: '高效编码', href: '/base85' },
  { icon: <Code size={20} />, title: 'Base100', desc: 'Emoji编码', href: '/base100' },
];

const advancedFeatures = [
  {
    icon: <Terminal size={24} />,
    title: '批量处理',
    desc: '批量文件/文本与Base64互转，支持ZIP打包导出',
    href: '/batch'
  },
  {
    icon: <Code size={24} />,
    title: '编程集成',
    desc: '提供RESTful API和代码片段生成',
    href: '/api'
  },
  {
    icon: <Zap size={24} />,
    title: '智能Base64',
    desc: '换行控制、URL-safe、智能识别、代码生成',
    href: '/smart-base64'
  },
  {
    icon: <Zap size={24} />,
    title: '解码分析',
    desc: '自动识别编码类型，分析内容格式',
    href: '/analyze'
  },
  {
    icon: <Shield size={24} />,
    title: '安全检测',
    desc: 'Base64隐藏信息检测，加密+Base64组合',
    href: '/security'
  },
  {
    icon: <GitCompare size={24} />,
    title: 'Diff对比',
    desc: '对比两个Base64字符串，高亮差异字符',
    href: '/diff',
    isNew: true
  },
  {
    icon: <Regex size={24} />,
    title: '正则提取',
    desc: '从HTML/JSON中用正则提取Base64字符串',
    href: '/regex-extract',
    isNew: true
  },
  {
    icon: <Code size={24} />,
    title: '代码生成',
    desc: '一键生成10种语言的Base64代码片段',
    href: '/code-snippet',
    isNew: true
  },
  {
    icon: <Wand2 size={24} />,
    title: '智能识别',
    desc: '自动识别Base64内容类型（图片/JSON/HTML等）',
    href: '/smart-detect',
    isNew: true
  },
  {
    icon: <Shield size={24} />,
    title: '自毁模式',
    desc: '处理后自动清除数据，保护敏感信息',
    href: '/self-destruct',
    isNew: true
  },
  {
    icon: <FileBox size={24} />,
    title: '大文件处理',
    desc: '支持50MB以上文件，带进度条显示',
    href: '/large-file',
    isNew: true
  },
];

export default function HomePage() {
  const quickAdvancedLinks = advancedFeatures.filter(f => f.isNew).map(f => ({
    ...f,
    icon: f.icon
  }));

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
          🔐 免费在线Base64工具
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          安全、快速、免费的Base64编码解码工具，支持文本、文件、图片等多种格式转换，所有转换在浏览器完成，保护您的隐私。
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            开始使用
          </Link>
          <Link href="/learn" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            学习Base64
          </Link>
        </div>
      </section>

      {/* Top Quick Access - New Features */}
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
            新增功能
          </h3>
          <Link href="#advanced-tools" style={{
            fontSize: '0.85rem',
            color: 'var(--accent-color)',
            textDecoration: 'none'
          }}>
            查看全部 →
          </Link>
        </div>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          scrollbarWidth: 'thin'
        }}>
          {quickAdvancedLinks.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              style={{ textDecoration: 'none', flexShrink: 0 }}
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

      {/* Main Features */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          核心功能
        </h2>
        <div className="feature-grid">
          {mainFeatures.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              style={{ textDecoration: 'none' }}
            >
              <div className="feature-card">
                <div style={{ color: feature.color, marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-desc">{feature.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Extended Features */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          衍生编码工具
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1rem'
        }}>
          {extendedFeatures.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              style={{ textDecoration: 'none' }}
            >
              <div className="feature-card" style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem'
              }}>
                <div style={{ color: 'var(--accent-color)' }}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="feature-card-title" style={{ fontSize: '1rem' }}>{feature.title}</h3>
                  <p className="feature-card-desc" style={{ fontSize: '0.8rem' }}>{feature.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Advanced Features */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          进阶功能
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {advancedFeatures.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              style={{ textDecoration: 'none' }}
            >
              <div className="feature-card">
                <div style={{ color: 'var(--accent-color)', marginBottom: '0.75rem' }}>
                  {feature.icon}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 className="feature-card-title">{feature.title}</h3>
                  {feature.isNew && (
                    <span style={{
                      padding: '0.15rem 0.4rem',
                      backgroundColor: 'var(--accent-color)',
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      fontWeight: 600
                    }}>
                      NEW
                    </span>
                  )}
                </div>
                <p className="feature-card-desc">{feature.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Learning Section */}
      <section style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          <BookOpen size={48} style={{ color: 'var(--accent-color)' }} />
        </div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '1rem'
        }}>
          了解Base64
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: '1.5rem',
          maxWidth: '600px',
          margin: '0 auto 1.5rem'
        }}>
          Base64是一种基于64个可打印字符来表示二进制数据的方法。了解Base64的原理、应用场景和最佳实践。
        </p>
        <Link href="/learn" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          开始学习
        </Link>
      </section>

      {/* Features List */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        <div className="card">
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            🌙 暗色模式
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            开发者友好的暗色主题，长时间使用也不累眼。自动跟随系统主题设置。
          </p>
        </div>
        <div className="card">
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            🔒 隐私保护
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            纯前端实现，所有转换在浏览器本地完成，数据不会上传到任何服务器。
          </p>
        </div>
        <div className="card">
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            ⚡ 高效快捷
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            支持快捷键操作（Ctrl+Enter转换、Ctrl+Shift+C复制结果），历史记录保存最近10次转换。
          </p>
        </div>
        <div className="card">
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            📱 响应式设计
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            完美支持PC端和移动端，兼容各种主流浏览器，随时随地使用。
          </p>
        </div>
      </section>

      {/* Bottom Quick Access - Advanced Tools */}
      <section id="advanced-tools" style={{
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <Zap size={20} color="var(--accent-color)" />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--text-primary)'
          }}>
            进阶功能
          </h3>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)'
          }}>
            高级工具集
          </span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {advancedFeatures.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '8px',
                transition: 'all 0.2s',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-color)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{ color: 'var(--accent-color)', flexShrink: 0 }}>
                  {feature.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.15rem'
                  }}>
                    <span style={{
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem'
                    }}>
                      {feature.title}
                    </span>
                    {feature.isNew && (
                      <span style={{
                        padding: '0.1rem 0.3rem',
                        backgroundColor: 'var(--accent-color)',
                        color: 'white',
                        borderRadius: '3px',
                        fontSize: '0.6rem',
                        fontWeight: 600
                      }}>
                        NEW
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    margin: 0
                  }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
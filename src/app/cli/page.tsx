'use client';

import Link from 'next/link';
import { Terminal, Download, Package, Copy, Check, ArrowRight, Code, Zap, Globe } from 'lucide-react';
import { useState } from 'react';

const platforms = [
  {
    id: 'windows',
    name: 'Windows',
    icon: '🪟',
    color: '#0078d4',
    architectures: [
      { arch: 'x64', label: '64位', downloadUrl: '#', size: '12MB' },
      { arch: 'x86', label: '32位', downloadUrl: '#', size: '11MB' },
      { arch: 'arm64', label: 'ARM64', downloadUrl: '#', size: '13MB' },
    ],
    installCommand: 'b64tool --install',
    portableCommand: 'b64tool.exe encode "Hello World"',
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: '🍎',
    color: '#000000',
    architectures: [
      { arch: 'x64', label: 'Intel', downloadUrl: '#', size: '10MB' },
      { arch: 'arm64', label: 'Apple Silicon', downloadUrl: '#', size: '9MB' },
    ],
    installCommand: 'brew install base64club/tap/b64tool',
    portableCommand: './b64tool encode "Hello World"',
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: '🐧',
    color: '#e95420',
    architectures: [
      { arch: 'x64', label: 'AMD64', downloadUrl: '#', size: '8MB' },
      { arch: 'arm64', label: 'ARM64', downloadUrl: '#', size: '8MB' },
      { arch: 'armv7', label: 'ARMv7', downloadUrl: '#', size: '7MB' },
    ],
    installCommand: 'curl -fsSL https://b64.club/install.sh | sh',
    portableCommand: './b64tool encode "Hello World"',
  },
];

const features = [
  { cmd: 'b64 encode "text"', desc: 'Base64编码' },
  { cmd: 'b64 decode "SGVsbG8="', desc: 'Base64解码' },
  { cmd: 'b64 encode -f file.png', desc: '文件编码' },
  { cmd: 'b64 decode -o output.png', desc: '文件解码' },
  { cmd: 'b64 encode --url "text"', desc: 'URL-safe编码' },
  { cmd: 'b64 batch -d *.txt', desc: '批量处理' },
  { cmd: 'b64 analyze "base64..."', desc: '智能分析' },
  { cmd: 'b64 diff file1.b64 file2.b64', desc: '差异对比' },
];

const shellCompletions = [
  { shell: 'Bash', install: 'b64tool --completion bash > /etc/bash_completion.d/b64tool' },
  { shell: 'Zsh', install: 'b64tool --completion zsh > ~/.zfunc/_b64tool' },
  { shell: 'PowerShell', install: 'b64tool --completion powershell >> $PROFILE' },
  { shell: 'Fish', install: 'b64tool --completion fish > ~/.config/fish/completions/b64tool.fish' },
];

export default function CLIPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          命令行工具
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          离线使用Base64工具，无需打开浏览器。支持Windows、macOS、Linux。
        </p>
      </div>

      {/* Quick Preview */}
      <div className="card" style={{ marginBottom: '2rem', backgroundColor: '#1e1e1e' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27ca40' }} />
          </div>
          <span style={{ color: '#888', fontSize: '0.85rem' }}>Terminal</span>
        </div>
        <pre style={{ 
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          fontSize: '0.9rem',
          lineHeight: 1.8,
          margin: 0
        }}>
          <span style={{ color: '#6a9955' }}># Base64编码</span>
{`$ b64 encode "Hello World"
SGVsbG8gV29ybGQh`}
          
          <span style={{ color: '#6a9955' }}># Base64解码</span>
{`$ b64 decode "SGVsbG8gV29ybGQh"
Hello World`}
          
          <span style={{ color: '#6a9955' }}># 文件编码</span>
{`$ b64 encode -f logo.png -o logo.b64`}
          
          <span style={{ color: '#6a9955' }}># URL-safe编码</span>
{`$ b64 encode --url "https://example.com?q=1+2"
aHR0cHM6Ly9leGFtcGxlLmNvbT9xPTErMg==`}
        </pre>
      </div>

      {/* Features */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem', 
        marginBottom: '3rem' 
      }}>
        {[
          { icon: <Zap size={20} />, title: '极速处理', desc: '纯Go编写，性能出色' },
          { icon: <Download size={20} />, title: '单文件分发', desc: '无需安装，下载即用' },
          { icon: <Globe size={20} />, title: '跨平台支持', desc: 'Win/Mac/Linux全覆盖' },
          { icon: <Code size={20} />, title: '代码补全', desc: '支持主流Shell自动补全' },
        ].map((feature, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '8px'
          }}>
            <div style={{ color: 'var(--accent-color)' }}>{feature.icon}</div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{feature.title}</div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{feature.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Download Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
        下载安装
      </h2>
      <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
        {platforms.map((platform) => (
          <div key={platform.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ 
              padding: '1.25rem', 
              backgroundColor: platform.color,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{platform.icon}</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>{platform.name}</h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>选择版本：</h4>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {platform.architectures.map((arch, i) => (
                    <a 
                      key={i}
                      href={arch.downloadUrl}
                      style={{ 
                        padding: '0.75rem 1.25rem',
                        backgroundColor: 'var(--bg-tertiary)',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.25rem',
                        border: '1px solid var(--border-color)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{arch.label}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{arch.arch}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-color)' }}>{arch.size}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>安装命令：</h4>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px'
                }}>
                  <code style={{ 
                    flex: 1, 
                    fontFamily: 'Monaco, Menlo, monospace',
                    color: 'var(--accent-color)',
                    fontSize: '0.9rem'
                  }}>
                    {platform.installCommand}
                  </code>
                  <button
                    onClick={() => handleCopy(platform.installCommand, `install-${platform.id}`)}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: 'var(--bg-primary)',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {copied === `install-${platform.id}` ? (
                      <Check size={16} style={{ color: 'var(--success-color)' }} />
                    ) : (
                      <Copy size={16} style={{ color: 'var(--text-tertiary)' }} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>使用示例：</h4>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px'
                }}>
                  <code style={{ 
                    flex: 1, 
                    fontFamily: 'Monaco, Menlo, monospace',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem'
                  }}>
                    {platform.portableCommand}
                  </code>
                  <button
                    onClick={() => handleCopy(platform.portableCommand, `use-${platform.id}`)}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: 'var(--bg-primary)',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {copied === `use-${platform.id}` ? (
                      <Check size={16} style={{ color: 'var(--success-color)' }} />
                    ) : (
                      <Copy size={16} style={{ color: 'var(--text-tertiary)' }} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Commands Reference */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={24} style={{ color: 'var(--accent-color)' }} />
          命令参考
        </h2>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '8px'
              }}
            >
              <code style={{ 
                flex: 1,
                fontFamily: 'Monaco, Menlo, monospace',
                color: 'var(--accent-color)',
                fontSize: '0.9rem'
              }}>
                {feature.cmd}
              </code>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {feature.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Shell Completions */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Package size={24} style={{ color: 'var(--accent-color)' }} />
          Shell自动补全
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          安装Shell补全脚本，获得命令自动补全功能。
        </p>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {shellCompletions.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '8px',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ 
                width: '100px',
                fontWeight: 600, 
                color: 'var(--text-primary)',
                fontSize: '0.95rem'
              }}>
                {item.shell}
              </span>
              <code style={{ 
                flex: 1,
                fontFamily: 'Monaco, Menlo, monospace',
                color: 'var(--accent-color)',
                fontSize: '0.85rem'
              }}>
                {item.install}
              </code>
              <button
                onClick={() => handleCopy(item.install, `shell-${index}`)}
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'var(--bg-primary)',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {copied === `shell-${index}` ? (
                  <Check size={16} style={{ color: 'var(--success-color)' }} />
                ) : (
                  <Copy size={16} style={{ color: 'var(--text-tertiary)' }} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Docker */}
      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Docker支持
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          也可以通过Docker使用，无需安装：
        </p>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-primary)',
          padding: '0.75rem 1rem',
          borderRadius: '8px'
        }}>
          <code style={{ 
            flex: 1, 
            fontFamily: 'Monaco, Menlo, monospace',
            color: 'var(--accent-color)',
            fontSize: '0.9rem'
          }}>
            docker run --rm base64club/cli encode "Hello World"
          </code>
          <button
            onClick={() => handleCopy('docker run --rm base64club/cli encode "Hello World"', 'docker')}
            style={{
              padding: '0.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {copied === 'docker' ? (
              <Check size={16} style={{ color: 'var(--success-color)' }} />
            ) : (
              <Copy size={16} style={{ color: 'var(--text-tertiary)' }} />
            )}
          </button>
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            <Download size={18} />
            下载CLI工具
          </a>
          <Link href="/developers" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            查看开发者文档
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import type { Metadata } from 'next';
import { Chrome, Globe, Download, Star, ArrowRight, Shield, Zap, Monitor } from 'lucide-react';

export const metadata: Metadata = {
  title: '浏览器扩展 - 传道AI',
  description: '下载传道AI浏览器扩展，支持Chrome、Firefox、Edge等主流浏览器。右键菜单快速Base64转换。',
};

const browsers = [
  {
    id: 'chrome',
    name: 'Chrome',
    icon: <Chrome size={32} />,
    color: '#4285f4',
    users: '1.2亿+',
    status: 'recommended',
    features: ['右键菜单转换', '快捷键支持', '弹出窗口', '离线使用'],
    downloadUrl: '#',
    version: '2.8.0',
  },
  {
    id: 'edge',
    name: 'Edge',
    icon: <Monitor size={32} />,
    color: '#0078d4',
    users: '6000万+',
    status: 'available',
    features: ['右键菜单转换', '快捷键支持', '弹出窗口', '同步收藏夹'],
    downloadUrl: '#',
    version: '2.8.0',
  },
  {
    id: 'firefox',
    name: 'Firefox',
    icon: <Globe size={32} />,
    color: '#ff7139',
    users: '3000万+',
    status: 'available',
    features: ['右键菜单转换', '快捷键支持', '弹出窗口', '隐私保护'],
    downloadUrl: '#',
    version: '2.7.5',
  },
  {
    id: 'opera',
    name: 'Opera',
    icon: <Globe size={32} />,
    color: '#ff1b6d',
    users: '1000万+',
    status: 'available',
    features: ['右键菜单转换', '快捷键支持', '弹出窗口'],
    downloadUrl: '#',
    version: '2.7.0',
  },
];

const features = [
  {
    icon: <Shield size={24} />,
    title: '隐私优先',
    desc: '所有转换在本地完成，不上传任何数据，保护您的隐私安全',
  },
  {
    icon: <Zap size={24} />,
    title: '一键转换',
    desc: '选中文字右键即可转换，支持编码解码双向操作',
  },
  {
    icon: <Download size={24} />,
    title: '离线可用',
    desc: '安装后完全离线工作，无需网络连接',
  },
  {
    icon: <Star size={24} />,
    title: '评分4.8',
    desc: '超过10万用户好评，持续更新维护',
  },
];

const screenshots = [
  { title: '右键菜单', desc: '选中文字后右键即可看到转换选项' },
  { title: '弹出窗口', desc: '点击扩展图标打开功能面板' },
  { title: '快捷键', desc: '支持Ctrl+Shift+E编码，Ctrl+Shift+D解码' },
];

export default function ExtensionsPage() {
  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          浏览器扩展
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          在浏览器中直接使用Base64工具，无需打开网页，选中文字右键即可转换。
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
                {feature.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Browser Cards */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
        下载扩展
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
                推荐
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
              {browser.users}用户
            </p>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.5rem', 
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              {browser.features.map((feature, i) => (
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
                版本 {browser.version}
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
              下载安装
            </a>
          </div>
        ))}
      </div>

      {/* Screenshots */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Monitor size={24} style={{ color: 'var(--accent-color)' }} />
          功能预览
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
                margin: '0 auto  1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'var(--accent-color)'
              }}>
                {index === 0 ? '🖱️' : index === 1 ? '🪟' : '⌨️'}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {screenshot.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                {screenshot.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Installation Guide */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          安装指南
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { step: '1', title: '下载扩展', desc: '点击上方下载按钮，获取Chrome扩展包(.crx)' },
            { step: '2', title: '打开扩展页面', desc: '在Chrome地址栏输入 chrome://extensions/ 并回车' },
            { step: '3', title: '开启开发者模式', desc: '页面右上角开启"开发者模式"' },
            { step: '4', title: '拖拽安装', desc: '将下载的.crx文件拖拽到扩展页面即可安装' },
          ].map((item, index) => (
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
                {item.step}
              </div>
              <div>
                <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          快捷键
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { keys: 'Ctrl + Shift + E', desc: 'Base64编码选中文字' },
            { keys: 'Ctrl + Shift + D', desc: 'Base64解码选中文字' },
            { keys: 'Ctrl + Shift + U', desc: 'URL-safe编码' },
            { keys: 'Ctrl + Shift + X', desc: '打开扩展面板' },
          ].map((shortcut, index) => (
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
                {shortcut.desc}
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
            下载Chrome扩展
          </a>
          <Link href="/cli" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            查看命令行工具
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

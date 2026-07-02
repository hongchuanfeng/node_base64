import Link from 'next/link';
import type { Metadata } from 'next';
import { Cookie, Settings, Shield, Eye, AlertCircle, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie政策 - 传道AI',
  description: '了解传道AI如何使用Cookie，以及如何管理和禁用Cookie。',
};

export default function CookiePolicyPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        Cookie政策
      </h1>
      <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>
        更新日期：2025年1月1日
      </p>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Cookie className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          概述
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          本Cookie政策解释了什么是Cookie，我们如何使用Cookie，以及您如何可以管理您的Cookie偏好。
          传道AI是一个纯前端工具网站，我们使用的Cookie非常有限，主要用于提升用户体验。
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          什么是Cookie？
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            Cookie是您访问网站时存储在您设备上的小型文本文件。它们被广泛用于使网站更高效运行，并为企业提供有用的信息。
          </p>
          <p>
            Cookie不会获取您计算机或手机上的任何个人信息，它们只是以匿名形式存储数据，帮助网站记住您的偏好设置。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          我们使用的Cookie类型
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={18} style={{ color: 'var(--success-color)' }} />
              必要Cookie
            </h3>
            <p style={{ marginBottom: '0.5rem' }}>
              这些Cookie对于网站的基本功能是必需的，没有它们网站无法正常工作。
            </p>
            <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>theme_preference</strong> - 存储您的主题偏好（亮/暗模式）</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>language_setting</strong> - 存储您的语言偏好</p>
              <p>保留时间：永久</p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={18} style={{ color: 'var(--accent-color)' }} />
              分析Cookie（可选）
            </h3>
            <p style={{ marginBottom: '0.5rem' }}>
              这些Cookie帮助我们了解访问者如何与我们的网站互动。
            </p>
            <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>_ga, _gid</strong> - Google Analytics 使用的匿名分析Cookie</p>
              <p style={{ marginBottom: '0.5rem' }}>用途：了解页面访问量、用户行为趋势</p>
              <p>保留时间：2年（_ga）/ 24小时（_gid）</p>
            </div>
          </div>

          <div>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} style={{ color: 'var(--warning-color)' }} />
              我们不使用的Cookie
            </h3>
            <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>广告追踪Cookie</li>
                <li style={{ marginBottom: '0.5rem' }}>第三方营销Cookie</li>
                <li style={{ marginBottom: '0.5rem' }}>跨站点追踪Cookie</li>
                <li>个性化广告Cookie</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          如何管理Cookie
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            您有以下选项来管理Cookie偏好：
          </p>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>浏览器设置</h3>
              <p style={{ fontSize: '0.9rem' }}>
                大多数浏览器允许您通过设置阻止Cookie或删除已存在的Cookie。
              </p>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>退出Google Analytics</h3>
              <p style={{ fontSize: '0.9rem' }}>
                您可以安装 <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>Google Analytics Opt-out Browser Add-on</a> 来阻止Google Analytics收集数据。
              </p>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>清除本地数据</h3>
              <p style={{ fontSize: '0.9rem' }}>
                您可以随时在浏览器设置中清除所有Cookie和本地存储数据。
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', border: '1px solid var(--warning-color)' }}>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              注意：禁用必要Cookie可能会影响网站的某些功能正常工作。
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          第三方Cookie
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            以下第三方服务可能会在我们的网站上设置Cookie：
          </p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Google Analytics</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                我们使用Google Analytics来了解网站的整体访问情况。所有数据都是匿名化的，不包含任何个人信息。
              </p>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>
                查看Google隐私政策 →
              </a>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Cloudflare</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                我们使用Cloudflare作为CDN和安全服务。Cloudflare可能会设置必要的安全Cookie。
              </p>
              <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>
                查看Cloudflare隐私政策 →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Cookie政策更新
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p>
            我们可能会不时更新本Cookie政策。任何更新都会在本页面公布。我们建议您定期查看此页面以了解最新信息。
          </p>
        </div>
      </div>

      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          联系我们
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '0.5rem' }}>
            如果您对本Cookie政策有任何问题，请联系我们：
          </p>
          <p>
            <strong>邮箱：</strong> <a href="mailto:privacy@base64.club" style={{ color: 'var(--accent-color)' }}>privacy@base64.club</a>
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/privacy" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          查看隐私政策
        </Link>
        <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          立即体验工具
        </Link>
      </div>
    </div>
  );
}

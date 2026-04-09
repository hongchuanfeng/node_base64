import Link from 'next/link';
import type { Metadata } from 'next';
import { Shield, Eye, Cookie, Lock, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: '隐私政策 - 传道AI',
  description: '传道AI隐私政策，详细说明我们如何收集、使用和保护用户数据。',
};

export default function PrivacyPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        隐私政策
      </h1>
      <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>
        更新日期：2025年1月1日
      </p>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          概述
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          传道AI非常重视您的隐私。我们是一个<strong>纯前端工具网站</strong>，这意味着您在我们网站上输入的所有数据都在您的浏览器本地进行处理，
          <strong style={{ color: 'var(--accent-color)' }}>不会上传到我们的任何服务器</strong>。
          我们不会收集、存储、分享或出售您的任何个人数据或转换内容。
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Eye className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          1. 我们收集什么信息？
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>我们不收集：</strong>
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>您在工具中输入或粘贴的任何文本、文件或数据</li>
            <li>您的IP地址（我们使用CDN服务，无法获取真实IP）</li>
            <li>您的地理位置信息</li>
            <li>您的浏览器指纹或设备信息</li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>
            <strong>我们可能收集（无法识别个人身份）：</strong>
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>网站访问量统计（使用匿名化的Google Analytics）</li>
            <li>页面加载时间和性能指标</li>
            <li>用户使用的浏览器类型（用于优化兼容性）</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lock className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          2. 本地存储的使用
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            为了改善用户体验，我们可能会在您的浏览器中存储以下信息（使用localStorage）：
          </p>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>数据类型</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>用途</th>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>保留时间</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.5rem' }}>主题偏好</td>
                  <td style={{ padding: '0.5rem' }}>记住您的亮/暗模式选择</td>
                  <td style={{ padding: '0.5rem' }}>永久</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem' }}>历史记录</td>
                  <td style={{ padding: '0.5rem' }}>最近10条转换记录</td>
                  <td style={{ padding: '0.5rem' }}>7天</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem' }}>工具设置</td>
                  <td style={{ padding: '0.5rem' }}>记住您的工具偏好</td>
                  <td style={{ padding: '0.5rem' }}>永久</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '1rem' }}>
            这些数据<strong>仅存储在您的设备上</strong>，我们无法访问这些数据。您可以随时在浏览器设置中清除这些数据。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Cookie className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          3. Cookie和追踪
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            我们使用极少的Cookie来确保网站的正常运行：
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>功能Cookie：</strong> 用于记住您的主题偏好等设置</li>
            <li><strong>分析Cookie：</strong> Google Analytics匿名统计（仅用于了解整体流量趋势）</li>
          </ul>
          <p>
            我们<strong style={{ color: 'var(--accent-color)' }}>不使用</strong>任何广告追踪Cookie，也不与其他公司共享您的任何数据。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          4. 第三方服务
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            我们可能使用以下第三方服务，它们有自己的隐私政策：
          </p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Google Analytics</h3>
              <p style={{ fontSize: '0.9rem' }}>用于分析网站流量和用户行为。所有数据都是匿名化的。</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Cloudflare</h3>
              <p style={{ fontSize: '0.9rem' }}>用于CDN加速和安全防护。可能处理的技术信息请参阅Cloudflare隐私政策。</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Vercel</h3>
              <p style={{ fontSize: '0.9rem' }}>用于网站托管。作为静态网站托管平台，Vercel不会处理您的任何用户数据。</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          5. 数据安全
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            由于我们不收集或存储任何用户数据，因此不存在数据泄露的风险。
          </p>
          <p style={{ marginBottom: '1rem' }}>
            但我们仍然采取了以下安全措施：
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>全站使用HTTPS加密传输</li>
            <li>使用Cloudflare提供DDoS防护</li>
            <li>定期更新依赖库以修复安全漏洞</li>
            <li>代码遵循安全最佳实践</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          6. 您的权利
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>由于我们不收集您的个人数据，您无需行使以下权利。但如果您有以下需求，我们也会尽力帮助：</p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>访问权：</strong> 您可以查看我们收集的任何数据</li>
            <li><strong>删除权：</strong> 您可以要求我们删除任何相关数据</li>
            <li><strong>拒绝权：</strong> 您可以拒绝任何数据收集（可能影响某些功能）</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Mail className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          7. 联系我们
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            如果您对本隐私政策有任何疑问或担忧，请随时联系我们：
          </p>
          <p>
            <strong>邮箱：</strong> <a href="mailto:privacy@base64.club" style={{ color: 'var(--accent-color)' }}>privacy@base64.club</a>
          </p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
            我们承诺在48小时内回复您的邮件。
          </p>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          8. 政策更新
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p>
            我们可能会不时更新本隐私政策。任何重大变更都将在此页面公布，并更新顶部的"更新日期"。
            我们建议您定期查看此页面以了解最新政策。
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/terms" className="btn btn-secondary" style={{ marginRight: '1rem' }}>
          查看服务条款
        </Link>
        <Link href="/" className="btn btn-primary">
          立即体验工具
        </Link>
      </div>
    </div>
  );
}
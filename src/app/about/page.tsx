import Link from 'next/link';
import type { Metadata } from 'next';
import { Users, Shield, Zap, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: '关于我们 - 传道AI',
  description: '了解传道AI团队，我们是专注于在线工具开发的团队，致力于为用户提供安全、高效的Base64工具。',
};

const features = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: '隐私优先',
    desc: '所有转换操作在浏览器本地完成，数据不会上传到任何服务器',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: '高效快速',
    desc: '纯前端实现，无需等待，即时转换结果',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: '用户体验',
    desc: '简洁直观的界面设计，支持多种编码格式和批量处理',
  },
];

export default function AboutPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem', textAlign: 'center' }}>
        关于我们
      </h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
        传道AI是一个专注于在线工具开发的团队，致力于为用户提供免费、高效、安全的编码解码工具。
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              {feature.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          我们的故事
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 2 }}>
          <p style={{ marginBottom: '1rem' }}>
            传道AI成立于2020年，最初只是一个简单的Base64在线编码工具。我们注意到市面上的类似工具往往存在各种问题：要么界面复杂难用，要么存在隐私安全隐患（数据上传服务器），要么功能单一无法满足进阶需求。
          </p>
          <p style={{ marginBottom: '1rem' }}>
            因此，我们决定开发一个真正以用户为中心的编码工具。我们的核心理念是：<strong style={{ color: 'var(--text-primary)' }}>用户的数据应该留在用户的设备上</strong>。
          </p>
          <p>
            经过多年的迭代优化，传道AI已从单一的Base64工具发展成为支持16/32/58/64/85/100等多种编码格式的综合性工具平台，同时提供了批量处理、文件转换、安全检测等进阶功能。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          我们的产品
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Base64工具</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>文本、图片、文件、URL等多种格式的Base64编码解码</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>多格式编码</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>支持Base16、Base32、Base58、Base85、Base100等编码格式</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>批量处理</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>支持批量编码解码，提高工作效率</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>API服务</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>提供RESTful API，方便开发者集成</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          技术架构
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 2 }}>
          <p style={{ marginBottom: '1rem' }}>
            传道AI采用现代化的前端技术栈构建：
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Next.js</strong> - React框架，支持SSR/SSG，提供优秀的SEO和性能</li>
            <li><strong>TypeScript</strong> - 类型安全，减少运行时错误</li>
            <li><strong>Tailwind CSS</strong> - 原子化CSS，快速构建响应式界面</li>
            <li><strong>纯前端算法</strong> - 所有编码解码逻辑在浏览器端执行</li>
          </ul>
          <p>
            我们不使用任何后端服务来处理用户数据，确保<strong style={{ color: 'var(--accent-color)' }}>真正的隐私保护</strong>。
          </p>
        </div>
      </div>

      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Heart className="w-6 h-6" style={{ color: 'var(--error-color)' }} />
          我们的价值观
        </h2>
        <div style={{ display: 'grid', gap: '1rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontWeight: 600, color: 'var(--accent-color)' }}>1. 隐私至上</span>
            <span>用户数据永远留在用户设备上，我们不收集、不存储、不传输任何用户数据</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontWeight: 600, color: 'var(--accent-color)' }}>2. 开放透明</span>
            <span>所有工具的算法都是公开的，用户可以完全了解数据是如何被处理的</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontWeight: 600, color: 'var(--accent-color)' }}>3. 持续改进</span>
            <span>我们不断收集用户反馈，持续优化工具功能和用户体验</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <span style={{ fontWeight: 600, color: 'var(--accent-color)' }}>4. 免费优先</span>
            <span>基础功能永远免费，我们相信好的工具应该让每个人都能使用</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          联系我们
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 2 }}>
          <p style={{ marginBottom: '1rem' }}>
            我们非常重视用户的反馈和建议。无论您是有功能建议、发现bug，还是只是想表达感谢，都欢迎联系我们：
          </p>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>电子邮件：</strong> <a href="mailto:support@base64.club" style={{ color: 'var(--accent-color)' }}>support@base64.club</a>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>商务合作：</strong> <a href="mailto:business@base64.club" style={{ color: 'var(--accent-color)' }}>business@base64.club</a>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>官方网站：</strong> <a href="https://www.base64.club" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>https://www.base64.club</a>
            </p>
            <p>
              <strong>地址：</strong> 深圳市龙华区龙华大道130栋
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          立即体验工具
        </Link>
      </div>
    </div>
  );
}
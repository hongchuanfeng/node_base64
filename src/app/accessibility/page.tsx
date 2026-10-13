import Link from 'next/link';
import type { Metadata } from 'next';
import { Accessibility, Monitor, Keyboard, Smartphone, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '无障碍声明 - 传道AI',
  description: '传道AI致力于确保网站的无障碍访问，让所有用户都能方便地使用我们的在线工具。',
};

export default function AccessibilityPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem', textAlign: 'center' }}>
        <Accessibility className="w-8 h-8" style={{ display: 'inline', marginRight: '0.5rem', color: 'var(--accent-color)' }} />
        无障碍声明
      </h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
        传道AI致力于确保网站的无障碍访问，让所有用户都能方便地使用我们的在线工具。
      </p>

      {/* Commitment Statement */}
      <div className="card" style={{ marginBottom: '2rem', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={24} style={{ color: 'var(--success-color)' }} />
          我们的承诺
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          我们致力于为所有用户提供可访问的网站体验，包括但不限于使用屏幕阅读器、键盘导航和其他辅助技术的用户。
          我们不断努力改进网站的无障碍功能，确保每个人都能平等地访问和使用我们的工具。
        </p>
      </div>

      {/* Accessibility Features */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          无障碍功能
        </h2>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Keyboard size={24} style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '0.25rem' }} />
            <div>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>键盘导航</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                所有功能都可以通过键盘操作访问，包括Tab键导航、Enter键确认、Escape键取消等标准快捷键支持。
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Monitor size={24} style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '0.25rem' }} />
            <div>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>屏幕阅读器兼容</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                我们使用语义化的HTML标签和ARIA属性，确保屏幕阅读器能够正确识别和朗读页面内容。
                所有按钮、输入框和功能性元素都有明确的标签和描述。
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Smartphone size={24} style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '0.25rem' }} />
            <div>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>响应式设计</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                网站采用响应式设计，可以在各种设备上良好运行，包括桌面电脑、平板电脑和智能手机。
                触摸操作和手势支持使移动用户也能方便使用。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Contrast */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          颜色对比度
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
          我们确保网站的主要文字和背景颜色对比度符合WCAG 2.1 AA标准，主要内容区域的对比度至少达到4.5:1。
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>普通文字</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>对比度 ≥ 4.5:1</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>大号文字</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>对比度 ≥ 3:1</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>UI组件</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>对比度 ≥ 3:1</div>
          </div>
        </div>
      </div>

      {/* Dark Mode */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          暗色模式
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
          网站提供暗色模式选项，适合对光线敏感的用户或需要在低光环境下使用的用户。
          暗色模式同样遵循无障碍设计标准，确保良好的可读性。
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          您可以在页面顶部的导航栏中找到主题切换按钮，随时在亮色和暗色模式之间切换。
        </p>
      </div>

      {/* Known Limitations */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          已知限制
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
          我们正在持续改进网站的无障碍功能。以下是当前已知的限制：
        </p>
        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: 1.8 }}>
          <li style={{ marginBottom: '0.5rem' }}>某些第三方嵌入内容（如视频播放器）可能需要额外的辅助技术支持</li>
          <li style={{ marginBottom: '0.5rem' }}>文件上传功能在某些移动设备上可能需要触控手势操作</li>
          <li style={{ marginBottom: '0.5rem' }}>实时预览功能（如图片预览）对于完全依赖屏幕阅读器的用户可能有限制</li>
        </ul>
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
          我们正在努力解决这些问题，并将在未来的更新中持续改进。
        </p>
      </div>

      {/* Feedback */}
      <div className="card" style={{ marginBottom: '2rem', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          反馈与建议
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
          如果您在使用我们的网站时遇到任何无障碍问题，或者有改进建议，我们非常欢迎您提出反馈。
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          请通过以下方式联系我们：<br />
          邮箱：<a href="mailto:support@base64.club" style={{ color: 'var(--accent-color)' }}>support@base64.club</a>
        </p>
      </div>

      {/* Standards */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          遵循的标准
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
          我们的网站设计和开发遵循以下无障碍标准和指南：
        </p>
        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: 1.8 }}>
          <li style={{ marginBottom: '0.5rem' }}>Web Content Accessibility Guidelines (WCAG) 2.1 - AA级别</li>
          <li style={{ marginBottom: '0.5rem' }}>Section 508 美国康复法案第508条（适用于政府网站）</li>
          <li style={{ marginBottom: '0.5rem' }}>EN 301 549 欧洲无障碍要求</li>
          <li>HTML5语义化标记和ARIA无障碍标准</li>
        </ul>
      </div>

      {/* Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          开始使用工具
        </Link>
        <Link href="/privacy" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          查看隐私政策
        </Link>
        <Link href="/contact" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          联系我们
        </Link>
      </div>
    </div>
  );
}

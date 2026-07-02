import Link from 'next/link';
import type { Metadata } from 'next';
import { Accessibility, Monitor, Smartphone, Volume2, Eye, Keyboard, CheckCircle, AlertCircle, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: '无障碍声明 - 传道AI',
  description: '传道AI致力于为所有用户提供无障碍访问体验，包括视障用户、听力障碍用户等。',
};

export default function AccessibilityPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        无障碍声明
      </h1>
      <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>
        更新日期：2025年1月1日
      </p>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Accessibility className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          我们的承诺
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          传道AI致力于确保我们的网站对所有用户都是可访问的，包括使用辅助技术的用户。
          我们不断努力改进网站的易用性和可访问性，以确保每个人都能平等地使用我们的服务。
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle className="w-6 h-6" style={{ color: 'var(--success-color)' }} />
          已实施的无障碍功能
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <Monitor size={24} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>响应式设计</h3>
                <p style={{ fontSize: '0.9rem' }}>我们的网站完全响应式，支持从手机到桌面电脑的各种屏幕尺寸。</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <Eye size={24} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>语义化HTML</h3>
                <p style={{ fontSize: '0.9rem' }}>使用正确的HTML语义标签，使屏幕阅读器能够正确理解页面结构。</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <Keyboard size={24} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>键盘可访问</h3>
                <p style={{ fontSize: '0.9rem' }}>所有功能都可以通过键盘操作访问，包括Tab键导航和Enter键确认。</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <Volume2 size={24} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>ARIA标签</h3>
                <p style={{ fontSize: '0.9rem' }}>使用ARIA属性增强动态内容和自定义组件的可访问性。</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <Smartphone size={24} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>触摸友好</h3>
                <p style={{ fontSize: '0.9rem' }}>按钮和可点击元素有足够的点击区域（至少44x44像素），适合触摸操作。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Wrench className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          辅助功能兼容性
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            我们的网站旨在与以下辅助技术兼容：
          </p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>屏幕阅读器</h3>
              <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.25rem' }}>NVDA (Windows)</li>
                <li style={{ marginBottom: '0.25rem' }}>JAWS (Windows)</li>
                <li style={{ marginBottom: '0.25rem' }}>VoiceOver (macOS / iOS)</li>
                <li>TalkBack (Android)</li>
              </ul>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>屏幕放大软件</h3>
              <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.25rem' }}>ZoomText</li>
                <li style={{ marginBottom: '0.25rem' }}>MAGic</li>
                <li>浏览器缩放功能</li>
              </ul>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>语音识别软件</h3>
              <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.25rem' }}>Dragon NaturallySpeaking</li>
                <li>Windows语音识别</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          颜色对比度
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            我们确保网站上的文本与背景之间有足够的颜色对比度：
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>普通文本：至少 4.5:1 的对比度</li>
            <li style={{ marginBottom: '0.5rem' }}>大文本（18pt以上或14pt粗体）：至少 3:1 的对比度</li>
            <li style={{ marginBottom: '0.5rem' }}>UI组件和图形对象：至少 3:1 的对比度</li>
            <li>焦点指示器：明显的可见焦点状态</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          可调整性
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            用户可以自行调整以下设置以获得更好的体验：
          </p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>字体大小</h3>
              <p style={{ fontSize: '0.9rem' }}>使用浏览器的缩放功能（Ctrl+/Ctrl-）或设置自定义字体大小。</p>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>主题切换</h3>
              <p style={{ fontSize: '0.9rem' }}>支持亮色和暗色模式，可根据个人偏好和视力需求选择。</p>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>动画控制</h3>
              <p style={{ fontSize: '0.9rem' }}>支持减少动画偏好设置，遵循 prefers-reduced-motion 媒体查询。</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle className="w-6 h-6" style={{ color: 'var(--warning-color)' }} />
          已知限制
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            我们正在努力解决以下已知的可访问性限制：
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>某些第三方组件可能尚未完全优化可访问性</li>
            <li style={{ marginBottom: '0.5rem' }}>一些老旧的浏览器版本可能不支持最新的可访问性功能</li>
            <li>实时预览功能可能对视障用户的操作造成一定挑战</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            我们正在持续改进这些问题，并会在未来版本中逐步解决。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          反馈与联系方式
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            我们非常重视您的反馈。如果您在使用我们的网站时遇到任何可访问性问题，
            或者需要以其他格式获取信息，请通过以下方式联系我们：
          </p>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '8px' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>邮箱：</strong> <a href="mailto:accessibility@base64.club" style={{ color: 'var(--accent-color)' }}>accessibility@base64.club</a>
            </p>
            <p>
              <strong>建议：</strong> 请在邮件中描述您遇到的问题，以及您使用的辅助技术类型。
              我们承诺在3个工作日内回复您的反馈。
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          持续改进
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p>
            可访问性是我们网站开发过程的重要组成部分。我们定期进行可访问性审计，
            并根据用户反馈和技术进步持续改进我们的网站。如果您愿意帮助我们测试新的可访问性功能，
            请联系我们。
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/about" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          关于我们
        </Link>
        <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          立即体验工具
        </Link>
      </div>
    </div>
  );
}

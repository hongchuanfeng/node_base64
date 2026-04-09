import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageCircle, Github, Globe, Clock, Headphones, Bug, Lightbulb, Heart, Users, Shield, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: '联系我们 - 传道AI',
  description: '联系传道AI团队，获取帮助或反馈问题。',
};

const contactMethods = [
  {
    icon: <Mail size={24} />,
    title: '电子邮件',
    desc: '发送邮件至 support@base64.club',
    value: 'support@base64.club',
    color: '#3b82f6',
    response: '1-2个工作日内回复'
  },
  {
    icon: <MessageCircle size={24} />,
    title: '微信客服',
    desc: '添加微信号：base64club',
    value: 'base64club',
    color: '#22c55e',
    response: '工作日 9:00-18:00'
  },
  {
    icon: <Github size={24} />,
    title: 'GitHub Issues',
    desc: '在 GitHub 提交问题或建议',
    value: 'github.com/base64club/issues',
    color: '#8b5cf6',
    response: '社区互助，回答更快'
  },
  {
    icon: <Globe size={24} />,
    title: '官方网站',
    desc: '访问我们的官方网站',
    value: 'www.base64.club',
    color: '#f59e0b',
    response: '了解更多产品和服务'
  },
];

const feedbackTypes = [
  {
    icon: <Bug size={20} />,
    title: '问题反馈',
    desc: '报告工具使用中遇到的错误或异常',
    color: '#ef4444'
  },
  {
    icon: <Lightbulb size={20} />,
    title: '功能建议',
    desc: '提出新功能想法或改进建议',
    color: '#f59e0b'
  },
  {
    icon: <Zap size={20} />,
    title: '性能问题',
    desc: '反馈加载慢或卡顿等问题',
    color: '#3b82f6'
  },
  {
    icon: <Shield size={20} />,
    title: '安全问题',
    desc: '报告安全漏洞或隐私担忧',
    color: '#22c55e'
  },
];

const faqList = [
  {
    q: '工具完全免费吗？',
    a: '是的，我们的Base64工具完全免费使用，无需注册或付费。'
  },
  {
    q: '我的数据会被保存吗？',
    a: '不会。所有转换操作都在您的浏览器本地完成，我们不会收集、存储或传输您的任何数据。'
  },
  {
    q: '支持哪些编码格式？',
    a: '支持UTF-8、GBK、GB2312、BIG5、Shift-JIS等多种字符编码。'
  },
  {
    q: '可以批量处理文件吗？',
    a: '可以，请使用我们的批量处理工具，支持同时处理多个文件。'
  },
  {
    q: '生成的链接是永久有效的吗？',
    a: '临时分享链接在24小时后自动失效，敏感数据链接在首次查看后失效。'
  },
  {
    q: '如何获取API接口？',
    a: '访问 /api 页面获取RESTful API文档和代码示例。'
  },
];

const teamMembers = [
  {
    role: '创始人 & CEO',
    name: '张三',
    intro: '15年前端开发经验，专注工具类产品设计'
  },
  {
    role: '技术负责人',
    name: '李四',
    intro: '全栈工程师，擅长性能优化和安全防护'
  },
  {
    role: '产品经理',
    name: '王五',
    intro: '深耕工具类应用，为用户提供最佳体验'
  },
  {
    role: 'UI设计师',
    name: '赵六',
    intro: '追求极简美学，让工具既美观又好用'
  },
];

export default function ContactPage() {
  return (
    <div className="tool-container">
      {/* Hero Section */}
      <div className="card" style={{ textAlign: 'center', marginBottom: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          联系我们
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          我们重视每一��用户的反馈，无论您遇到问题、有建议，还是想与我们合作，都可以通过以下方式联系我们。
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>50万+</span>
            <span style={{ display: 'block', fontSize: '0.85rem', opacity: 0.8 }}>月活跃用户</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>99.9%</span>
            <span style={{ display: 'block', fontSize: '0.85rem', opacity: 0.8 }}>服务可用性</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>&lt;100ms</span>
            <span style={{ display: 'block', fontSize: '0.85rem', opacity: 0.8 }}>平均响应时间</span>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          多种联系方式，总有一种适合您
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {contactMethods.map((method, index) => (
            <div key={index} style={{
              padding: '1.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '12px',
              borderLeft: `4px solid ${method.color}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ color: method.color }}>{method.icon}</div>
                <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{method.title}</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{method.desc}</p>
              <p style={{ fontWeight: 600, color: 'var(--accent-color)', marginBottom: '0.5rem' }}>{method.value}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{method.response}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Types */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          反馈类型说明
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {feedbackTypes.map((type, index) => (
            <div key={index} style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ color: type.color, marginBottom: '0.75rem' }}>{type.icon}</div>
              <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{type.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>{type.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Working Hours */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={24} color="var(--accent-color)" />
          工作时间与响应承诺
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>24小时</div>
            <div style={{ color: 'var(--text-secondary)' }}>紧急安全问题响应</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>1-2天</div>
            <div style={{ color: 'var(--text-secondary)' }}>一般问题回复</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>7x24</div>
            <div style={{ color: 'var(--text-secondary)' }}>工具在线服务</div>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', border: '1px solid var(--success-color)' }}>
          <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
            🎯 我们的承诺：对于用户反馈的问题，我们会尽快处理并在产品更新中体现。感谢您帮助我们做得更好！
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          常见问题解答
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqList.map((item, index) => (
            <details key={index} style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <summary style={{ fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>
                Q: {item.q}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', paddingLeft: '1rem' }}>
                A: {item.a}
              </p>
            </details>
          ))}
        </div>
        <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
          更多问题请查看 <Link href="/learn" style={{ color: 'var(--accent-color)' }}>学习中心</Link> 或 <Link href="/about" style={{ color: 'var(--accent-color)' }}>关于我们</Link>
        </p>
      </div>

      {/* Team Section */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={24} color="var(--accent-color)" />
          核心团队
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {teamMembers.map((member, index) => (
            <div key={index} style={{
              padding: '1.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-color)',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                {member.name[0]}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>{member.role}</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{member.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>{member.intro}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          关注我们
        </h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://github.com/base64club" target="_blank" rel="noopener noreferrer" style={{
            padding: '1rem 2rem',
            backgroundColor: '#24292e',
            color: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Github size={20} /> GitHub
          </a>
          <a href="https://twitter.com/base64club" target="_blank" rel="noopener noreferrer" style={{
            padding: '1rem 2rem',
            backgroundColor: '#1da1f2',
            color: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            𝕏 Twitter
          </a>
          <a href="https://youtube.com/@base64club" target="_blank" rel="noopener noreferrer" style={{
            padding: '1rem 2rem',
            backgroundColor: '#ff0000',
            color: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ▶ YouTube
          </a>
        </div>
      </div>

      {/* Join Us */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <Heart size={32} style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          加入我们
        </h2>
        <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>
          如果您对工具类产品充满热情，欢迎加入我们的团队。我们正在招聘前端工程师、后端工程师、产品经理等职位。
        </p>
        <a href="mailto:career@base64.club" style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          backgroundColor: 'white',
          color: '#f5576c',
          borderRadius: '8px',
          fontWeight: 600
        }}>
          投递简历：career@base64.club
        </a>
      </div>
    </div>
  );
}
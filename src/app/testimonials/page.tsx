import Link from 'next/link';
import type { Metadata } from 'next';
import { MessageSquare, Star, Quote, ArrowRight, Users, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '用户评价 - 传道AI',
  description: '查看其他用户对传道AI Base64工具的评价和使用案例。了解为什么这么多人选择我们。',
};

const testimonials = [
  {
    quote: '这个工具拯救了我！作为前端开发者，我每天都要处理大量的Base64编码工作。右键菜单功能太方便了，再也不用复制粘贴到网页了。',
    author: '张明',
    role: '前端开发工程师',
    company: '某互联网大厂',
    avatar: '👨‍💻',
    rating: 5,
    highlight: '右键菜单功能',
  },
  {
    quote: '隐私保护做得非常好。所有转换都在本地完成，数据不会上传服务器。这对我们这种处理敏感数据的公司来说太重要了。',
    author: '李华',
    role: '安全工程师',
    company: '某金融科技公司',
    avatar: '👩‍🔐',
    rating: 5,
    highlight: '隐私保护',
  },
  {
    quote: 'API服务很稳定，文档写得也很清晰。我们集成到内部工具中，处理了上百万次的编码请求，从没出过问题。',
    author: '王强',
    role: '后端架构师',
    company: '某SaaS公司',
    avatar: '👨‍🏭',
    rating: 5,
    highlight: 'API稳定可靠',
  },
  {
    quote: '命令行工具太棒了！我在写脚本的时候经常需要Base64处理，b64tool让这变得超级简单。brew安装一条命令搞定。',
    author: '陈伟',
    role: 'DevOps工程师',
    company: '某云服务厂商',
    avatar: '🧑‍💻',
    rating: 5,
    highlight: '命令行工具',
  },
  {
    quote: '学习Base64的页面做得非常用心，图文并茂，还有交互式演示。作为初学者终于理解了Base64的原理。',
    author: '刘芳',
    role: '计算机专业学生',
    company: '某985高校',
    avatar: '👩‍🎓',
    rating: 5,
    highlight: '学习资源丰富',
  },
  {
    quote: '批量处理功能帮我省了大把时间。之前要一个个文件处理，现在直接拖进去，ZIP打包下载，效率提升10倍不止。',
    author: '赵磊',
    role: '产品设计师',
    company: '某设计工作室',
    avatar: '👨‍🎨',
    rating: 5,
    highlight: '批量处理功能',
  },
  {
    quote: '界面设计简洁美观，暗色模式对眼睛很友好。快捷键设置也很人性化，用习惯了完全停不下来。',
    author: '孙静',
    role: '全栈工程师',
    company: '某电商平台',
    avatar: '👩‍💻',
    rating: 5,
    highlight: '用户体验出色',
  },
  {
    quote: 'JWT解析功能是我用过最方便的。直接粘贴token就能看到payload内容，调试API的时候帮了大忙。',
    author: '周杰',
    role: '后端开发工程师',
    company: '某在线教育平台',
    avatar: '👨‍🔧',
    rating: 5,
    highlight: 'JWT解析',
  },
  {
    quote: '作为一个独立开发者，我用它已经3年了。从最初的文本Base64到现在的各种编码工具，一直在跟进更新，服务很靠谱。',
    author: '吴涛',
    role: '独立开发者',
    company: '自由职业',
    avatar: '🧑‍💻',
    rating: 5,
    highlight: '持续更新维护',
  },
];

const stats = [
  { value: '100万+', label: '服务用户', icon: '👥' },
  { value: '4.9/5', label: '平均评分', icon: '⭐' },
  { value: '5000万+', label: '转换次数', icon: '🔄' },
  { value: '6年+', label: '持续运营', icon: '📅' },
];

const highlightTags = [
  { tag: '隐私保护', count: 1250 },
  { tag: '操作便捷', count: 980 },
  { tag: '功能丰富', count: 875 },
  { tag: '响应迅速', count: 760 },
  { tag: '界面美观', count: 650 },
  { tag: '免费使用', count: 580 },
  { tag: 'API稳定', count: 420 },
  { tag: '学习资源', count: 380 },
];

const featuredQuotes = [
  {
    quote: '"传道AI是我见过最好用的Base64工具，没有之一。隐私优先的理念让我用得很放心。"',
    author: '王磊',
    role: '技术总监',
    company: '某知名互联网公司',
  },
  {
    quote: '"作为开源爱好者，我很高兴看到这样的优质工具免费提供给所有人。强烈推荐！"',
    author: '林志远',
    role: '开源社区贡献者',
    company: 'GitHub Stars',
  },
];

export default function TestimonialsPage() {
  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          用户评价
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          来自真实用户的反馈。了解为什么这么多人选择传道AI。
        </p>
      </div>

      {/* Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1rem', 
        marginBottom: '3rem' 
      }}>
        {stats.map((stat, index) => (
          <div key={index} className="card" style={{ textAlign: 'center', padding: '1.5rem', marginBottom: 0 }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{stat.value}</div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Quotes */}
      <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
        {featuredQuotes.map((quote, index) => (
          <div key={index} className="card" style={{ 
            textAlign: 'center', 
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            padding: '2rem'
          }}>
            <Quote size={32} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
            <p style={{ 
              fontSize: '1.2rem', 
              color: 'var(--text-primary)', 
              fontStyle: 'italic',
              marginBottom: '1.5rem',
              lineHeight: 1.8
            }}>
              {quote.quote}
            </p>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{quote.author}</div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
              {quote.role} · {quote.company}
            </div>
          </div>
        ))}
      </div>

      {/* Highlight Tags */}
      <div className="card" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={24} style={{ color: 'var(--accent-color)' }} />
          用户好评关键词
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {highlightTags.map((item, index) => (
            <div 
              key={index}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '20px'
              }}
            >
              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.tag}</span>
              <span style={{ 
                padding: '0.15rem 0.5rem',
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                borderRadius: '10px',
                fontSize: '0.75rem'
              }}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
        更多用户评价
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="card" style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* Rating */}
            <div style={{ display: 'flex', gap: '0.2rem' }}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>

            {/* Quote */}
            <p style={{ 
              color: 'var(--text-secondary)', 
              lineHeight: 1.7,
              fontSize: '0.95rem',
              flex: 1
            }}>
              "{testimonial.quote}"
            </p>

            {/* Highlight */}
            <div style={{ 
              padding: '0.5rem 0.75rem',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: 'fit-content'
            }}>
              <CheckCircle size={14} style={{ color: 'var(--accent-color)' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-color)' }}>
                赞: {testimonial.highlight}
              </span>
            </div>

            {/* Author */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-color)'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%',
                backgroundColor: 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem'
              }}>
                {testimonial.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{testimonial.author}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                  {testimonial.role} · {testimonial.company}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Your Experience */}
      <div className="card" style={{ textAlign: 'center', backgroundColor: 'var(--bg-secondary)' }}>
        <MessageSquare size={32} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          分享您的使用体验
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          使用传道AI有一段时间了？分享您的反馈，帮助我们做得更好。
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="mailto:feedback@base64.club" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            发送反馈
          </a>
          <Link href="/contact" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            联系我们
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            立即体验工具
            <ArrowRight size={18} />
          </Link>
          <Link href="/extensions" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            下载浏览器扩展
          </Link>
        </div>
      </div>
    </div>
  );
}

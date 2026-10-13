import Link from 'next/link';
import type { Metadata } from 'next';
import { MessageSquare, Star, Quote, ArrowRight } from 'lucide-react';
import { getTranslation } from '@/i18n';
import { TestimonialItem } from '@/types/testimonial';
import { featuredQuotes } from '@/data/featuredQuotes';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  return {
    title: `${t.testimonials.title} - ChuanDaoAI`,
    description: t.testimonials.subtitle,
  };
}

type TestimonialArray = TestimonialItem[];

const testimonials = ([
  {
    quote: 'The interface is clean and intuitive. The dark mode is very developer-friendly, and keyboard shortcuts make batch operations much faster. Highly recommended for anyone who works with Base64 encoding regularly.',
    quoteZh: '界面设计简洁直观。暗色模式对开发者非常友好，快捷键让批量操作效率大增。强烈推荐给经常需要处理Base64编码的朋友。',
    author: 'Wei Zhang',
    authorEn: 'Wei Zhang',
    role: 'Senior Software Engineer',
    roleZh: '高级软件工程师',
    company: 'Independent Developer',
    companyEn: 'Independent Developer',
    avatar: '👨‍💻',
    rating: 5,
    highlight: '界面简洁直观',
    highlightEn: 'Clean interface',
  },
  {
    quote: 'What impresses me most is the privacy-first approach. All encoding/decoding happens locally in the browser, which is essential for handling sensitive data. No data ever leaves my device.',
    quoteZh: '最让我印象深刻的是隐私优先的设计理念。所有编解码操作都在浏览器本地完成，处理敏感数据时非常安心。我的数据永远不会离开我的设备。',
    author: 'Sarah Chen',
    authorEn: 'Sarah Chen',
    role: 'Security Consultant',
    roleZh: '安全顾问',
    company: 'Independent Security Researcher',
    companyEn: 'Independent Security Researcher',
    avatar: '👩‍🔐',
    rating: 5,
    highlight: '隐私保护设计',
    highlightEn: 'Privacy-first design',
  },
  {
    quote: 'The documentation is clear and comprehensive. I was able to integrate the API into our workflow within an hour. Great service for developers who need reliable encoding tools.',
    quoteZh: 'API文档清晰全面，一个小时内就完成了工作流集成。对于需要可靠编码工具的开发者来说，这是很棒的服务。',
    author: 'Michael Liu',
    authorEn: 'Michael Liu',
    role: 'Backend Developer',
    roleZh: '后端开发工程师',
    company: 'Tech Startup',
    companyEn: 'Tech Startup',
    avatar: '👨‍🏭',
    rating: 5,
    highlight: 'API文档完善',
    highlightEn: 'Well-documented API',
  },
  {
    quote: 'The CLI tool is fantastic for scripting. Being able to pipe data through base64 commands in my terminal workflow has become indispensable. Clean, fast, and reliable.',
    quoteZh: '命令行工具太适合写脚本了。能够在终端工作流中通过base64命令传输数据已经成为我工作中不可或缺的一部分。简洁、快速、可靠。',
    author: 'Alex Wang',
    authorEn: 'Alex Wang',
    role: 'DevOps Engineer',
    roleZh: 'DevOps工程师',
    company: 'Linux Systems Administrator',
    companyEn: 'Linux Systems Administrator',
    avatar: '🧑‍💻',
    rating: 5,
    highlight: '命令行工具实用',
    highlightEn: 'Useful CLI tool',
  },
  {
    quote: 'The learning section is excellent for understanding Base64 fundamentals. The interactive demos made complex concepts easy to grasp. Perfect resource for beginners learning about encoding.',
    quoteZh: '学习板块对理解Base64基础知识非常有帮助。交互式演示让复杂的概念变得容易理解。对初学者来说是很好的学习资源。',
    author: 'Emily Zhao',
    authorEn: 'Emily Zhao',
    role: 'Computer Science Student',
    roleZh: '计算机专业学生',
    company: 'University Student',
    companyEn: 'University Student',
    avatar: '👩‍🎓',
    rating: 5,
    highlight: '学习资源优质',
    highlightEn: 'Quality learning resources',
  },
  {
    quote: 'Batch processing saved me hours of work. Previously had to process files one by one, now just drag and drop multiple files and download as ZIP. Efficiency improvement is remarkable.',
    quoteZh: '批量处理功能帮我省了好几个小时的工作。之前要一个个文件处理，现在直接拖拽多个文件然后ZIP打包下载。效率提升非常明显。',
    author: 'David Kim',
    authorEn: 'David Kim',
    role: 'Product Manager',
    roleZh: '产品经理',
    company: 'E-commerce Platform',
    companyEn: 'E-commerce Platform',
    avatar: '👨‍🎨',
    rating: 5,
    highlight: '批量处理高效',
    highlightEn: 'Efficient batch processing',
  },
  {
    quote: 'Clean UI with thoughtful design choices. Dark mode is easy on the eyes during long coding sessions. Keyboard shortcuts are well thought out and boost productivity significantly.',
    quoteZh: '界面设计简洁美观，考虑周到。暗色模式在长时间编码时对眼睛很友好。快捷键设计考虑周全，显著提升工作效率。',
    author: 'Jessica Sun',
    authorEn: 'Jessica Sun',
    role: 'Full-stack Developer',
    roleZh: '全栈开发工程师',
    company: 'Remote Developer',
    companyEn: 'Remote Developer',
    avatar: '👩‍💻',
    rating: 5,
    highlight: '用户体验出色',
    highlightEn: 'Excellent UX',
  },
  {
    quote: 'The JWT parsing feature is incredibly useful for debugging. Just paste the token and see the payload instantly. This has become my go-to tool for API debugging work.',
    quoteZh: 'JWT解析功能对调试工作非常有用。直接粘贴token就能立即看到payload内容。这已经成为我API调试工作的首选工具。',
    author: 'Ryan Zhou',
    authorEn: 'Ryan Zhou',
    role: 'Backend Developer',
    roleZh: '后端开发工程师',
    company: 'SaaS Company',
    companyEn: 'SaaS Company',
    avatar: '👨‍🔧',
    rating: 5,
    highlight: 'JWT解析便捷',
    highlightEn: 'Convenient JWT parsing',
  },
  {
    quote: 'Been using this tool for over two years now. Consistent updates and reliable service. The team clearly cares about user feedback and continuously improves the product.',
    quoteZh: '使用这个工具已经两年多了。更新稳定，服务可靠。团队明显重视用户反馈，持续改进产品。',
    author: 'Tom Wu',
    authorEn: 'Tom Wu',
    role: 'Freelance Developer',
    roleZh: '自由开发者',
    company: 'Freelance',
    companyEn: 'Freelance',
    avatar: '🧑‍💻',
    rating: 5,
    highlight: '持续稳定更新',
    highlightEn: 'Consistent updates',
  },
] as TestimonialItem[]);

const stats = [
  { value: '100万+', valueEn: '1M+', labelKey: 'servingUsers' as const, icon: '👥' },
  { value: '4.9/5', valueEn: '4.9/5', labelKey: 'avgRating' as const, icon: '⭐' },
  { value: '5000万+', valueEn: '50M+', labelKey: 'conversions' as const, icon: '🔄' },
  { value: '6年+', valueEn: '6+ years', labelKey: 'continuousOps' as const, icon: '📅' },
];

const highlightTags = [
  { tag: '隐私保护', tagEn: 'Privacy protection', count: 1250 },
  { tag: '操作便捷', tagEn: 'Easy to use', count: 980 },
  { tag: '功能丰富', tagEn: 'Feature-rich', count: 875 },
  { tag: '响应迅速', tagEn: 'Fast response', count: 760 },
  { tag: '界面美观', tagEn: 'Beautiful UI', count: 650 },
  { tag: '免费使用', tagEn: 'Free to use', count: 580 },
  { tag: 'API稳定', tagEn: 'Stable API', count: 420 },
  { tag: '学习资源', tagEn: 'Learning resources', count: 380 },
];

export default async function TestimonialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isZh = locale === 'zh';

  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.testimonials.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {t.testimonials.subtitle}
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
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{isZh ? stat.value : stat.valueEn}</div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>{t.testimonials[stat.labelKey]}</div>
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
              {isZh ? quote.quoteZh : quote.quote}
            </p>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{isZh ? quote.author : quote.authorEn}</div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
              {isZh ? quote.role : (quote as unknown as { roleEn: string }).roleEn} · {isZh ? quote.company : (quote as unknown as { companyEn: string }).companyEn}
            </div>
          </div>
        ))}
      </div>

      {/* Highlight Tags */}
      <div className="card" style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={24} style={{ color: 'var(--accent-color)' }} />
          {t.testimonials.highlightKeywords}
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
              <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{isZh ? item.tag : item.tagEn}</span>
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
        {t.testimonials.moreReviews}
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
              "{isZh ? testimonial.quoteZh : testimonial.quote}"
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
              <Star size={14} style={{ color: 'var(--accent-color)' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-color)' }}>
                {t.testimonials.praise}: {isZh ? testimonial.highlight : testimonial.highlightEn}
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
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{isZh ? testimonial.author : testimonial.authorEn}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                  {isZh ? testimonial.role : (testimonial as unknown as { roleEn: string }).roleEn} · {isZh ? testimonial.company : (testimonial as unknown as { companyEn: string }).companyEn}
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
          {t.testimonials.shareExperience}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          {t.testimonials.shareExperienceDesc}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="mailto:feedback@base64.club" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            {t.testimonials.sendFeedback}
          </a>
          <Link href="/contact" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            {t.testimonials.contactUs}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            {t.testimonials.tryNow}
            <ArrowRight size={18} />
          </Link>
          <Link href="/extensions" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            {t.testimonials.downloadExtension}
          </Link>
        </div>
      </div>
    </div>
  );
}

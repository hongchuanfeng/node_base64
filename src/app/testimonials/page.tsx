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
    quote: 'This tool saved me! As a frontend developer, I process a lot of Base64 encoding every day. The right-click menu feature is so convenient, no more copy-pasting to websites.',
    quoteZh: '这个工具拯救了我！作为前端开发者，我每天都要处理大量的Base64编码工作。右键菜单功能太方便了，再也不用复制粘贴到网页了。',
    author: '张明',
    authorEn: 'Zhang Ming',
    role: 'Frontend Developer',
    roleZh: '前端开发工程师',
    company: '某互联网大厂',
    companyEn: 'A major tech company',
    avatar: '👨‍💻',
    rating: 5,
    highlight: '右键菜单功能',
    highlightEn: 'Right-click menu',
  },
  {
    quote: 'Excellent privacy protection. All conversions are done locally, no data is uploaded to servers. This is very important for companies like us handling sensitive data.',
    quoteZh: '隐私保护做得非常好。所有转换都在本地完成，数据不会上传服务器。这对我们这种处理敏感数据的公司来说太重要了。',
    author: '李华',
    authorEn: 'Li Hua',
    role: 'Security Engineer',
    roleZh: '安全工程师',
    company: '某金融科技公司',
    companyEn: 'A fintech company',
    avatar: '👩‍🔐',
    rating: 5,
    highlight: '隐私保护',
    highlightEn: 'Privacy protection',
  },
  {
    quote: 'The API service is very stable and the documentation is clear. We integrated it into internal tools and processed millions of encoding requests without any issues.',
    quoteZh: 'API服务很稳定，文档写得也很清晰。我们集成到内部工具中，处理了上百万次的编码请求，从没出过问题。',
    author: '王强',
    authorEn: 'Wang Qiang',
    role: 'Backend Architect',
    roleZh: '后端架构师',
    company: '某SaaS公司',
    companyEn: 'A SaaS company',
    avatar: '👨‍🏭',
    rating: 5,
    highlight: 'API稳定可靠',
    highlightEn: 'Stable API',
  },
  {
    quote: 'The command-line tool is amazing! I often need Base64 processing when writing scripts, and b64tool makes it super easy. One brew install command and it\'s done.',
    quoteZh: '命令行工具太棒了！我在写脚本的时候经常需要Base64处理，b64tool让这变得超级简单。brew安装一条命令搞定。',
    author: '陈伟',
    authorEn: 'Chen Wei',
    role: 'DevOps Engineer',
    roleZh: 'DevOps工程师',
    company: '某云服务厂商',
    companyEn: 'A cloud service provider',
    avatar: '🧑‍💻',
    rating: 5,
    highlight: '命令行工具',
    highlightEn: 'CLI tool',
  },
  {
    quote: 'The Base64 learning page is very well done, with illustrations and interactive demos. As a beginner, I finally understand how Base64 works.',
    quoteZh: '学习Base64的页面做得非常用心，图文并茂，还有交互式演示。作为初学者终于理解了Base64的原理。',
    author: '刘芳',
    authorEn: 'Liu Fang',
    role: 'CS Student',
    roleZh: '计算机专业学生',
    company: '某985高校',
    companyEn: 'A top university',
    avatar: '👩‍🎓',
    rating: 5,
    highlight: '学习资源丰富',
    highlightEn: 'Learning resources',
  },
  {
    quote: 'The batch processing feature saved me a lot of time. Previously had to process files one by one, now just drag and drop, ZIP download, efficiency increased 10x or more.',
    quoteZh: '批量处理功能帮我省了大把时间。之前要一个个文件处理，现在直接拖进去，ZIP打包下载，效率提升10倍不止。',
    author: '赵磊',
    authorEn: 'Zhao Lei',
    role: 'Product Designer',
    roleZh: '产品设计师',
    company: '某设计工作室',
    companyEn: 'A design studio',
    avatar: '👨‍🎨',
    rating: 5,
    highlight: '批量处理功能',
    highlightEn: 'Batch processing',
  },
  {
    quote: 'The interface is clean and beautiful, dark mode is easy on the eyes. Keyboard shortcuts are well-designed, once you get used to it you can\'t stop.',
    quoteZh: '界面设计简洁美观，暗色模式对眼睛很友好。快捷键设置也很人性化，用习惯了完全停不下来。',
    author: '孙静',
    authorEn: 'Sun Jing',
    role: 'Full-stack Engineer',
    roleZh: '全栈工程师',
    company: '某电商平台',
    companyEn: 'An e-commerce platform',
    avatar: '👩‍💻',
    rating: 5,
    highlight: '用户体验出色',
    highlightEn: 'Great UX',
  },
  {
    quote: 'The JWT parsing feature is the most convenient I\'ve used. Just paste the token to see the payload content, it helped me a lot when debugging APIs.',
    quoteZh: 'JWT解析功能是我用过最方便的。直接粘贴token就能看到payload内容，调试API的时候帮了大忙。',
    author: '周杰',
    authorEn: 'Zhou Jie',
    role: 'Backend Developer',
    roleZh: '后端开发工程师',
    company: '某在线教育平台',
    companyEn: 'An online education platform',
    avatar: '👨‍🔧',
    rating: 5,
    highlight: 'JWT解析',
    highlightEn: 'JWT parsing',
  },
  {
    quote: 'As an independent developer, I\'ve been using it for 3 years. From the original text Base64 to various encoding tools, always following updates, very reliable service.',
    quoteZh: '作为一个独立开发者，我用它已经3年了。从最初的文本Base64到现在的各种编码工具，一直在跟进更新，服务很靠谱。',
    author: '吴涛',
    authorEn: 'Wu Tao',
    role: 'Independent Developer',
    roleZh: '独立开发者',
    company: '自由职业',
    companyEn: 'Freelance',
    avatar: '🧑‍💻',
    rating: 5,
    highlight: '持续更新维护',
    highlightEn: 'Continuous updates',
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

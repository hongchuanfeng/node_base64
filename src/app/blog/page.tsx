import Link from 'next/link';
import { Newspaper, Calendar, ArrowRight, Tag } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Base64编码原理详解：从原理到实践',
    excerpt: '深入了解Base64编码的工作原理，为什么它被广泛使用，以及在实际开发中如何正确应用。',
    date: '2025-01-15',
    category: '技术教程',
    href: '/learn/principles',
    featured: true
  },
  {
    id: 2,
    title: 'URL编码 vs Base64：何时使用哪种编码方式',
    excerpt: 'URL编码和Base64编码各有优劣，本文详细介绍它们的区别和适用场景，帮助你选择正确的编码方式。',
    date: '2025-01-10',
    category: '技术比较',
    href: '/learn/comparison',
    featured: true
  },
  {
    id: 3,
    title: '前端开发者的Base64使用技巧',
    excerpt: '分享在实际项目中高效使用Base64的技巧，包括性能优化、缓存策略和最佳实践。',
    date: '2025-01-05',
    category: '最佳实践',
    href: '/learn/scenarios',
    featured: false
  },
  {
    id: 4,
    title: 'Base64在前端性能优化中的应用',
    excerpt: '探讨如何利用Base64编码优化网页加载性能，减少HTTP请求，提升用户体验。',
    date: '2024-12-28',
    category: '性能优化',
    href: '/learn/scenarios',
    featured: false
  },
  {
    id: 5,
    title: '常见的Base64编码错误及解决方案',
    excerpt: '汇总开发者在使用Base64时最常遇到的错误，以及如何避免和解决这些问题。',
    date: '2024-12-20',
    category: '问题解决',
    href: '/faq',
    featured: false
  },
  {
    id: 6,
    title: 'Base64与数据安全：你需要知道的事实',
    excerpt: '澄清关于Base64的安全误区，解释为什么Base64不是加密，以及如何正确保护你的数据。',
    date: '2024-12-15',
    category: '安全知识',
    href: '/security',
    featured: false
  },
];

const categories = [
  { name: '技术教程', count: 12 },
  { name: '最佳实践', count: 8 },
  { name: '技术比较', count: 5 },
  { name: '性能优化', count: 4 },
  { name: '问题解决', count: 6 },
  { name: '安全知识', count: 3 },
];

export default function BlogPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem', textAlign: 'center' }}>
        <Newspaper className="w-8 h-8" style={{ display: 'inline', marginRight: '0.5rem', color: 'var(--accent-color)' }} />
        博客与新闻
      </h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
        探索Base64编码的技术深度，了解最新行业动态，获取实用开发技巧。
      </p>

      {/* Featured Articles */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '4px', height: '24px', backgroundColor: 'var(--accent-color)', borderRadius: '2px' }} />
          精选文章
        </h2>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {articles.filter(a => a.featured).map((article) => (
            <div key={article.id} className="card" style={{ 
              padding: '2rem', 
              borderLeft: '4px solid var(--accent-color)',
              backgroundColor: 'var(--bg-secondary)'
            }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      backgroundColor: 'var(--accent-color)', 
                      color: 'white', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {article.category}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                      <Calendar size={14} />
                      {article.date}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    {article.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                    {article.excerpt}
                  </p>
                  <Link href={article.href} className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    阅读全文
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Tag className="w-5 h-5" style={{ color: 'var(--accent-color)' }} />
          文章分类
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {categories.map((cat, index) => (
            <div 
              key={index} 
              className="category-tag"
            >
              <span style={{ fontWeight: 500 }}>{cat.name}</span>
              <span style={{ 
                padding: '0.15rem 0.5rem', 
                backgroundColor: 'var(--bg-primary)', 
                borderRadius: '12px',
                fontSize: '0.75rem'
              }}>
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* All Articles */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '4px', height: '24px', backgroundColor: 'var(--accent-color)', borderRadius: '2px' }} />
          最新文章
        </h2>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {articles.map((article) => (
            <div key={article.id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  backgroundColor: 'var(--bg-tertiary)', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-color)',
                  flexShrink: 0
                }}>
                  <Newspaper size={24} />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ 
                      padding: '0.15rem 0.5rem', 
                      backgroundColor: 'var(--bg-tertiary)', 
                      color: 'var(--text-secondary)', 
                      borderRadius: '4px', 
                      fontSize: '0.7rem'
                    }}>
                      {article.category}
                    </span>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} />
                      {article.date}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {article.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    {article.excerpt}
                  </p>
                  <Link href={article.href} style={{ 
                    color: 'var(--accent-color)', 
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    textDecoration: 'none'
                  }}>
                    阅读全文
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="card" style={{ marginTop: '3rem', textAlign: 'center', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          订阅更新
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          订阅我们的邮件列表，获取最新的技术文章、工具更新和使用技巧。
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input 
            type="email" 
            placeholder="输入您的邮箱地址"
            style={{ 
              flex: 1, 
              minWidth: '200px',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          />
          <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
            订阅
          </button>
        </div>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: '1rem' }}>
          我们尊重您的隐私，不会向第三方分享您的邮箱地址。
        </p>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/learn" className="btn btn-secondary" style={{ textDecoration: 'none', marginRight: '1rem' }}>
          学习中心
        </Link>
        <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          开始使用
        </Link>
      </div>

      <style>{`
        .category-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: var(--bg-tertiary);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--text-primary);
        }
        .category-tag:hover {
          background-color: var(--accent-color);
          color: white;
        }
        .category-tag:hover span:last-child {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

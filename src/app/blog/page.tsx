import Link from 'next/link';
import { Newspaper, Calendar, ArrowRight, Tag } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: '深入理解Base64编码原理：从ASCII到二进制',
    excerpt: 'Base64是一种广泛使用的编码方式，本文将深入讲解其工作原理，包括字符集选择、分组转换、填充机制等核心概念，帮助开发者彻底理解Base64的底层实现。',
    date: '2026-01-15',
    category: '技术教程',
    href: '/learn/principles',
    featured: true
  },
  {
    id: 2,
    title: 'Web开发中Base64的最佳实践与性能优化',
    excerpt: '在Web开发中合理使用Base64可以提升性能，但使用不当也会适得其反。本文介绍Data URI内嵌图片的适用场景、文件大小阈值、以及现代浏览器的处理机制。',
    date: '2026-01-10',
    category: '最佳实践',
    href: '/learn/scenarios',
    featured: true
  },
  {
    id: 3,
    title: 'JWT Token中的Base64编码：安全须知',
    excerpt: 'JWT（JSON Web Token）已成为现代Web应用认证的事实标准，其Payload部分使用Base64编码。本文详解JWT结构、Base64编码的安全性以及常见的安全陷阱。',
    date: '2026-01-05',
    category: '安全知识',
    href: '/security',
    featured: false
  },
  {
    id: 4,
    title: 'Base64 vs Base58 vs Hex：何时选择哪种编码',
    excerpt: '不同的编码方式适用于不同的场景。本文对比Base64、Base58和Hex的特点，分析各自的优劣势，帮助开发者在实际项目中做出正确的技术选型。',
    date: '2025-12-28',
    category: '技术比较',
    href: '/compare',
    featured: false
  },
  {
    id: 5,
    title: '前端性能优化：如何正确使用Base64内嵌资源',
    excerpt: 'Base64内嵌资源可以减少HTTP请求，但也会增加HTML/CSS体积和解析时间。本文提供实用的决策框架和性能测试方法，帮助你做出最优选择。',
    date: '2025-12-20',
    category: '性能优化',
    href: '/learn/scenarios',
    featured: false
  },
  {
    id: 6,
    title: 'Base64不是加密：数据安全的基本认知',
    excerpt: '很多开发者误以为Base64可以保护数据安全，这是一个危险的认识误区。本文澄清Base64的本质，介绍真正适合数据保护的加密方法，包括AES、RSA等。',
    date: '2025-12-15',
    category: '安全知识',
    href: '/security',
    featured: false
  },
  {
    id: 7,
    title: 'Node.js中Base64编码的完整指南',
    excerpt: 'Node.js提供了强大的Buffer API来处理Base64编码。本文涵盖基础用法、文件处理、流式操作以及常见的性能陷阱和优化技巧。',
    date: '2025-12-10',
    category: '开发指南',
    href: '/api',
    featured: false
  },
  {
    id: 8,
    title: 'Python Base64编码：标准库与性能对比',
    excerpt: 'Python的base64模块支持多种Base64变体。本文对比不同实现方式的性能差异，介绍base64url、base32等特殊编码，并提供生产环境的最佳实践。',
    date: '2025-12-05',
    category: '开发指南',
    href: '/api',
    featured: false
  },
  {
    id: 9,
    title: '邮件系统中的Base64：MIME协议详解',
    excerpt: 'Base64最初就是为了解决邮件传输二进制附件的问题而设计的。本文回顾MIME协议的历史，解释为什么要用Base64，以及现代邮件系统的编码实践。',
    date: '2025-11-28',
    category: '技术历史',
    href: '/learn/history',
    featured: false
  },
  {
    id: 10,
    title: 'API设计中的Base64使用规范',
    excerpt: '在RESTful API设计中合理使用Base64可以简化接口设计，但也带来体积增加和处理的复杂性。本文提供API Base64使用的设计规范和最佳实践。',
    date: '2025-11-20',
    category: '最佳实践',
    href: '/api',
    featured: false
  },
  {
    id: 11,
    title: 'Base64面试题汇总与详细解答',
    excerpt: 'Base64是面试中的常见考点。本文汇总高频面试题，从编码原理到实际应用，从手写实现到性能优化，全面覆盖Base64相关知识点。',
    date: '2025-11-15',
    category: '面试题库',
    href: '/learn/interview',
    featured: false
  },
  {
    id: 12,
    title: 'Data URI vs CDN：图片加载策略对比',
    excerpt: '小图片用Data URI内嵌，大图片用CDN加速，如何判断临界点？本文通过实际测试数据，分析两种方案的优劣和适用场景。',
    date: '2025-11-10',
    category: '性能优化',
    href: '/learn/scenarios',
    featured: false
  },
];

const categories = [
  { name: '技术教程', count: 4, href: '/learn/principles' },
  { name: '最佳实践', count: 3, href: '/api' },
  { name: '安全知识', count: 2, href: '/security' },
  { name: '性能优化', count: 2, href: '/learn/scenarios' },
  { name: '开发指南', count: 2, href: '/api' },
  { name: '技术比较', count: 1, href: '/compare' },
  { name: '技术历史', count: 1, href: '/learn/history' },
  { name: '面试题库', count: 1, href: '/learn/interview' },
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

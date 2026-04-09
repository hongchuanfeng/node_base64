import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, Lightbulb, Code, FileText, GraduationCap, Layers, ArrowRight, Clock, History, Terminal, Database, Globe, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: '学习Base64 - 传道AI',
  description: '了解Base64的原理、应用场景和最佳实践。Base64原理、常见场景、对比分析、面试题整理。',
};

const chapters = [
  {
    icon: <BookOpen size={24} />,
    title: 'Base64原理',
    desc: '图解Base64编码原理，为什么用64个字符，填充机制详解',
    href: '/learn/principles'
  },
  {
    icon: <Lightbulb size={24} />,
    title: '常见场景',
    desc: '图片嵌入HTML/CSS、Data URL、JWT的Payload部分、邮件附件编码',
    href: '/learn/scenarios'
  },
  {
    icon: <Layers size={24} />,
    title: '对比分析',
    desc: 'Base64 vs Base32 vs Base58（比特币地址）vs Hex',
    href: '/learn/comparison'
  },
  {
    icon: <GraduationCap size={24} />,
    title: '面试题整理',
    desc: '常见Base64相关面试题与解答',
    href: '/learn/interview'
  },
  {
    icon: <Code size={24} />,
    title: 'JavaScript演示',
    desc: '交互式演示编码过程，每一步转换可视化',
    href: '/learn/demo'
  },
  {
    icon: <History size={24} />,
    title: '发展历程',
    desc: 'Base64的起源、MIME标准制定、互联网时代的重要应用',
    href: '/learn/history'
  },
];

export default function LearnPage() {
  return (
    <div className="tool-container">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          学习Base64
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Base64是一种基于64个可打印字符来表示二进制数据的方法。了解Base64的原理、应用场景和最佳实践。
        </p>
      </div>

      {/* Chapter Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {chapters.map((chapter) => (
          <Link key={chapter.href} href={chapter.href} style={{ textDecoration: 'none' }}>
            <div className="feature-card">
              <div style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>
                {chapter.icon}
              </div>
              <h3 className="feature-card-title">{chapter.title}</h3>
              <p className="feature-card-desc">{chapter.desc}</p>
              <div style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--accent-color)'
              }}>
                开始学习 <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Base64 Table */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={24} style={{ color: 'var(--accent-color)' }} />
          Base64编码对照表
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>索引</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>字符</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>二进制</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>索引</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>字符</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>二进制</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 32 }, (_, i) => (
                <tr key={i}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>{i}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace' }}>{'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(i)}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace' }}>{i.toString(2).padStart(6, '0')}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>{i + 32}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace' }}>{'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(i + 32)}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace' }}>{(i + 32).toString(2).padStart(6, '0')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
          <p><strong>说明：</strong> Base64使用 A-Z（26个）、a-z（26个）、0-9（10个）、+（1个）、/（1个）共64个字符。</p>
          <p style={{ marginTop: '0.5rem' }}>索引0-25对应A-Z，26-51对应a-z，52-61对应0-9，62对应+，63对应/。</p>
        </div>
      </div>

      {/* Quick Example */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          快速示例
        </h2>
        <div style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '8px',
          padding: '1.5rem',
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          fontSize: '0.9rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>输入: </span>
            <span style={{ color: 'var(--accent-color)' }}>Man</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>ASCII: </span>
            <span>77 (M), 97 (a), 110 (n)</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>二进制: </span>
            <span>01001101 01100001 01101110</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>分组: </span>
            <span>010011 010110 000101 101110</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>十进制: </span>
            <span>19, 22, 5, 46</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-tertiary)' }}>Base64: </span>
            <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>TWFu</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          前往工具
        </Link>
        <Link href="/learn/demo" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          交互演示
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { BookOpen, Lightbulb, Code, FileText, GraduationCap, Layers, ArrowRight, History } from 'lucide-react';

export default function LearnPage() {
  const { t } = useLanguage();

  const chapters = [
    {
      icon: <BookOpen size={24} />,
      title: t.learn.principles.title,
      desc: t.learn.principles.desc,
      href: '/learn/principles'
    },
    {
      icon: <Lightbulb size={24} />,
      title: t.learn.scenarios.title,
      desc: t.learn.scenarios.desc,
      href: '/learn/scenarios'
    },
    {
      icon: <Layers size={24} />,
      title: t.learn.comparison.title,
      desc: t.learn.comparison.desc,
      href: '/learn/comparison'
    },
    {
      icon: <GraduationCap size={24} />,
      title: t.learn.interview.title,
      desc: t.learn.interview.desc,
      href: '/learn/interview'
    },
    {
      icon: <Code size={24} />,
      title: t.learn.demo.title,
      desc: t.learn.demo.desc,
      href: '/learn/demo'
    },
    {
      icon: <History size={24} />,
      title: t.learn.history.title,
      desc: t.learn.history.desc,
      href: '/learn/history'
    },
  ];

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.learn.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {t.learn.subtitle}
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
                {t.home.startLearning} <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Base64 Table */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={24} style={{ color: 'var(--accent-color)' }} />
          {t.learn.encodingTable}
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>{t.learn.index}</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>{t.learn.character}</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>{t.learn.binary}</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>{t.learn.index}</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>{t.learn.character}</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>{t.learn.binary}</th>
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
          <p><strong>{t.learn.character}:</strong> {t.learn.tableNote}</p>
          <p style={{ marginTop: '0.5rem' }}>{t.learn.tableNote2}</p>
        </div>
      </div>

      {/* Quick Example */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          {t.learn.quickExample}
        </h2>
        <div style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '8px',
          padding: '1.5rem',
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          fontSize: '0.9rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>{t.learn.input}: </span>
            <span style={{ color: 'var(--accent-color)' }}>Man</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>{t.learn.ascii}: </span>
            <span>77 (M), 97 (a), 110 (n)</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>{t.learn.binaryValue}: </span>
            <span>01001101 01100001 01101110</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>{t.learn.groups}: </span>
            <span>010011 010110 000101 101110</span>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>{t.learn.decimal}: </span>
            <span>19, 22, 5, 46</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-tertiary)' }}>{t.learn.base64Result}: </span>
            <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>TWFu</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          {t.learn.goToTools}
        </Link>
        <Link href="/learn/demo" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          {t.learn.interactiveDemo}
        </Link>
      </div>
    </div>
  );
}

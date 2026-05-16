'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowLeft, Clock, Terminal, Database, Globe, Shield, Mail, Key, Cloud } from 'lucide-react';

export default function HistoryPage() {
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const timeline = [
    {
      year: '1986',
      title: t.learn.mimeStandard,
      icon: <Mail size={20} />,
      description: t.learn.mimeStandardDesc,
      details: [t.learn.mimeDetails1, t.learn.mimeDetails2, t.learn.mimeDetails3]
    },
    {
      year: '1992',
      title: t.learn.base64Normalized,
      icon: <Database size={20} />,
      description: t.learn.base64NormalizedDesc,
      details: [t.learn.normalizedDetails1, t.learn.normalizedDetails2, t.learn.normalizedDetails3]
    },
    {
      year: '1996',
      title: t.learn.webFrontend,
      icon: <Globe size={20} />,
      description: t.learn.webFrontendDesc,
      details: [t.learn.webDetails1, t.learn.webDetails2, t.learn.webDetails3]
    },
    {
      year: '2004',
      title: t.learn.jwtEra,
      icon: <Key size={20} />,
      description: t.learn.jwtEraDesc,
      details: [t.learn.jwtDetails1, t.learn.jwtDetails2, t.learn.jwtDetails3]
    },
    {
      year: '2010',
      title: t.learn.apiMicroservices,
      icon: <Cloud size={20} />,
      description: t.learn.apiMicroservicesDesc,
      details: [t.learn.apiDetails1, t.learn.apiDetails2, t.learn.apiDetails3]
    },
    {
      year: '2015',
      title: t.learn.modernSecurity,
      icon: <Shield size={20} />,
      description: t.learn.modernSecurityDesc,
      details: [t.learn.securityDetails1, t.learn.securityDetails2, t.learn.securityDetails3]
    }
  ];

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1rem' }}>
          <ArrowLeft size={16} />
          {t.learn.backToLearn}
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Clock size={36} style={{ color: 'var(--accent-color)' }} />
          {t.learn.historyTitle}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          {t.learn.historyIntro}
        </p>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        {/* Vertical Line */}
        <div style={{
          position: 'absolute',
          left: '7px',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: 'var(--border-color)'
        }} />

        {timeline.map((item, index) => (
          <div
            key={item.year}
            style={{
              position: 'relative',
              marginBottom: '2rem',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedYear(selectedYear === item.year ? null : item.year)}
          >
            {/* Timeline Dot */}
            <div style={{
              position: 'absolute',
              left: '-2rem',
              top: '0.5rem',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: selectedYear === item.year ? 'var(--accent-color)' : 'var(--bg-tertiary)',
              border: `2px solid ${selectedYear === item.year ? 'var(--accent-color)' : 'var(--border-color)'}`,
              transition: 'all 0.2s'
            }} />

            {/* Content */}
            <div
              className="card"
              style={{
                padding: '1.5rem',
                transition: 'all 0.2s',
                borderLeft: selectedYear === item.year ? '3px solid var(--accent-color)' : '3px solid transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: 'var(--accent-color)',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {item.year}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
                  {item.icon}
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: selectedYear === item.year ? '1rem' : 0 }}>
                {item.description}
              </p>

              {selectedYear === item.year && (
                <div style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    {t.learn.keyPoints}
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                    {item.details.map((detail, i) => (
                      <li key={i} style={{ marginBottom: '0.5rem' }}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="card" style={{ marginTop: '2rem', backgroundColor: 'var(--bg-tertiary)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={20} style={{ color: 'var(--accent-color)' }} />
          {t.learn.historySummary}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>~40年</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.learn.techHistory}</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>10+</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.learn.applications}</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>全球</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.learn.internetInfra}</div>
          </div>
        </div>
        <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.learn.historyConclusion}
        </p>
      </div>

      {/* Related Links */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/learn/principles" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          {t.learn.learnPrinciples}
        </Link>
        <Link href="/learn/scenarios" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          {t.learn.viewScenarios}
        </Link>
        <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          {t.learn.useTools}
        </Link>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

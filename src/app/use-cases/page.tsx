import Link from 'next/link';
import type { Metadata } from 'next';
import { Lightbulb, Code, Image, Mail, Smartphone, Database, Globe, Shield, Zap, FileText, ArrowRight } from 'lucide-react';
import { getTranslation } from '@/i18n';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  return {
    title: `${t.useCases.title} - ChuanDaoAI`,
    description: t.useCases.subtitle,
  };
}

const scenarios = [
  {
    icon: <Globe size={28} />,
    titleKey: 'webDev' as const,
    descKey: 'webDevDesc' as const,
    detailsKey: 'webDevDetails' as const,
    color: '#3b82f6',
    example: {
      input: 'Original image file',
      output: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    },
  },
  {
    icon: <Code size={28} />,
    titleKey: 'api数据传输' as const,
    descKey: 'apiDesc' as const,
    detailsKey: 'apiDetails' as const,
    color: '#8b5cf6',
    example: {
      input: '{"avatar": "user avatar binary"}',
      output: '{"avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."}',
    },
  },
  {
    icon: <Mail size={28} />,
    titleKey: 'emailEncoding' as const,
    descKey: 'emailEncodingDesc' as const,
    detailsKey: 'emailDetails' as const,
    color: '#10b981',
    example: {
      input: 'Attachment file (e.g., PDF, image)',
      output: 'Content-Type: image/png; name="photo.png"\nContent-Transfer-Encoding: base64\n\niVBORw0KGgo...',
    },
  },
  {
    icon: <Smartphone size={28} />,
    titleKey: 'miniProgram' as const,
    descKey: 'miniProgramDesc' as const,
    detailsKey: 'miniProgramDetails' as const,
    color: '#ec4899',
    example: {
      input: 'wx.cloud.uploadFile() gets fileID',
      output: 'Cloud storage returns Base64 image data',
    },
  },
  {
    icon: <Database size={28} />,
    titleKey: 'configFiles' as const,
    descKey: 'configFilesDesc' as const,
    detailsKey: 'configFilesDetails' as const,
    color: '#f59e0b',
    example: {
      input: 'logo image path or URL',
      output: '"logo": "data:image/svg+xml;base64,PHN2Zy..."',
    },
  },
  {
    icon: <Shield size={28} />,
    titleKey: 'dataSecurity' as const,
    descKey: 'dataSecurityDesc' as const,
    detailsKey: 'dataSecurityDetails' as const,
    color: '#ef4444',
    example: {
      input: 'eyJzdWIiOiIxMjM0NTY3ODkwIn0= (JWT Payload)',
      output: '{"sub":"1234567890"}',
    },
  },
];

const practicalCases = [
  {
    titleKey: 'githubAvatar' as const,
    descKey: 'githubAvatarDesc' as const,
    code: 'https://avatars.githubusercontent.com/u/1234567',
  },
  {
    titleKey: 'jwtToken' as const,
    descKey: 'jwtTokenDesc' as const,
    code: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
  },
  {
    titleKey: 'dataUrlImage' as const,
    descKey: 'dataUrlImageDesc' as const,
    code: '<img src="data:image/png;base64,iVBORw0KGgo..." />',
  },
  {
    titleKey: 'wechatCloud' as const,
    descKey: 'wechatCloudDesc' as const,
    code: 'const buffer = wx.arrayBufferToBase64(arrayBuffer)',
  },
];

export default async function UseCasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslation(locale);

  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.useCases.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {t.useCases.subtitle}
        </p>
      </div>

      {/* Scenario Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {scenarios.map((scenario, index) => (
          <div key={index} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: scenario.color,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{ color: 'white' }}>{scenario.icon}</div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>
                  {t.useCases[scenario.titleKey]}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>
                  {t.useCases[scenario.descKey]}
                </p>
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                {t.useCases[scenario.detailsKey].map((detail: string, i: number) => (
                  <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>{detail}</li>
                ))}
              </ul>
              <div style={{ 
                backgroundColor: 'var(--bg-tertiary)', 
                borderRadius: '8px', 
                padding: '1rem',
                fontSize: '0.8rem'
              }}>
                <div style={{ color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>{t.useCases.example}:</div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-color)' }}>{t.useCases.input}: </span>{scenario.example.input}
                </div>
                <div style={{ color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
                  <span style={{ color: 'var(--success-color)' }}>{t.useCases.output}: </span>{scenario.example.output.substring(0, 50)}...
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Practical Cases */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lightbulb size={24} style={{ color: 'var(--accent-color)' }} />
          {t.useCases.practicalCases}
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {practicalCases.map((item, index) => (
            <div key={index} style={{ 
              backgroundColor: 'var(--bg-tertiary)', 
              borderRadius: '8px', 
              padding: '1.25rem'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {t.useCases[item.titleKey]}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                {t.useCases[item.descKey]}
              </p>
              <code style={{ 
                display: 'block',
                backgroundColor: 'var(--bg-primary)', 
                padding: '0.75rem', 
                borderRadius: '6px',
                fontSize: '0.85rem',
                color: 'var(--accent-color)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {item.code}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* When to Use */}
      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          {t.useCases.whenUseBase64}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <Zap size={20} style={{ color: 'var(--success-color)', marginTop: '0.2rem' }} />
            <div>
              <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{t.useCases.suitableFor}</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                <li>{t.useCases.smallFiles}</li>
                <li>{t.useCases.embedInCode}</li>
                <li>{t.useCases.reduceRequests}</li>
                <li>{t.useCases.crossSystem}</li>
              </ul>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <Shield size={20} style={{ color: 'var(--error-color)', marginTop: '0.2rem' }} />
            <div>
              <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{t.useCases.notSuitableFor}</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                <li>{t.useCases.largeFiles}</li>
                <li>{t.useCases.needEncryption}</li>
                <li>{t.useCases.frequentAccess}</li>
                <li>{t.useCases.performanceSensitive}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            {t.useCases.tryNow}
            <ArrowRight size={18} />
          </Link>
          <Link href="/faq" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            {t.useCases.viewFAQ}
          </Link>
        </div>
      </div>
    </div>
  );
}

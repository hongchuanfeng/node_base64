'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ScenariosPage() {
  const { t } = useLanguage();

  return (
    <div className="tool-container">
      <Link href="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> {t.learn.backToLearn}
      </Link>

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        {t.learn.scenarios.title}
      </h1>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.imageEmbedding}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          {t.learn.imageEmbeddingDesc}
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', wordBreak: 'break-all' }}>
          {`<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==">`}
        </div>
        <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', fontSize: '0.85rem' }}>
          <strong>{t.learn.suitableScenarios}:</strong> {t.learn.smallIcons}、{t.learn.reduceRequests}、{t.learn.offlineDoc}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.jwtToken}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          {t.learn.jwtDesc}
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
          <div style={{ color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ← {t.learn.header}</div>
          <div style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ ← {t.learn.payload}</div>
          <div style={{ color: 'var(--text-tertiary)' }}>SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c ← {t.learn.signature}</div>
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <strong>{t.learn.decodedResult}:</strong>
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '8px', marginTop: '0.5rem' }}>
            {`{"sub":"1234567890","name":"John"}`}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.emailAttachment}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.learn.emailDesc}
        </p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.api数据传输}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          {t.learn.apiDesc}
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
          {`// Example Request
POST /api/upload
Content-Type: application/json

{"file_data": "base64 encoded content..."}`}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.urlVariant}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.learn.urlVariantDesc}
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem', marginTop: '0.5rem' }}>
          <div><strong>{t.learn.standardBase64}:</strong> <code>+</code> + <code>/</code></div>
          <div><strong>{t.learn.urlSafe}:</strong> <code>-</code> + <code>_</code></div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.notes}</h2>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.5rem' }}>
          <li>{t.learn.note1}</li>
          <li>{t.learn.note2}</li>
          <li>{t.learn.note3}</li>
          <li>{t.learn.note4}</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/learn/principles" className="btn btn-secondary">
          <ArrowLeft size={16} /> {t.learn.previous}
        </Link>
        <Link href="/learn/comparison" className="btn btn-primary">
          {t.learn.next}：{t.learn.comparison.title} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

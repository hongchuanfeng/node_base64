'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ComparisonPage() {
  const { t } = useLanguage();

  return (
    <div className="tool-container">
      <Link href="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> {t.learn.backToLearn}
      </Link>

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        {t.learn.comparison.title}
      </h1>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.comparisonTable}</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>{t.learn.encoding}</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>{t.learn.charset}</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>{t.learn.expansionRate}</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>{t.learn.features}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600' }}>{t.learn.hex}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace' }}>{t.learn.hexCharset}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>2x</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>{t.learn.hexFeature}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600' }}>{t.learn.base32Name}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace' }}>{t.learn.base32Charset}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>1.6x</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>{t.learn.base32Feature}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600' }}>{t.learn.base64Name}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace' }}>{t.learn.base64CharsetFull}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>1.33x</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>{t.learn.base64Feature}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600' }}>{t.learn.base58Name}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace' }}>{t.learn.base58CharsetFull}</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>~1.38x</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>{t.learn.base58Feature}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.hexTitle}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          {t.learn.hexDesc}
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem' }}>
          <div><strong>{t.learn.hexExample}:</strong> "Hi" → 0x48 0x69 → <code>4869</code></div>
          <div style={{ marginTop: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            {t.learn.hexFeature2}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.base32Title}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          {t.learn.base32Desc}
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem' }}>
          <div><strong>{t.learn.base32Example}:</strong> "Hi" → <code>JBSWY3DP</code></div>
          <div style={{ marginTop: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            {t.learn.base32Feature2}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.base58Title}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          {t.learn.base58Desc}
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem' }}>
          <div><strong>{t.learn.base58CharsetLabel}:</strong> <code>123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz</code></div>
          <div style={{ marginTop: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            {t.learn.base58Application}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.recommendation}</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <strong>{t.learn.rec1}:</strong> {t.learn.hexUse}
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <strong>{t.learn.rec2}:</strong> {t.learn.base64Use}
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <strong>{t.learn.rec3}:</strong> {t.learn.base58Use}
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <strong>{t.learn.rec4}:</strong> {t.learn.base64urlUse}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/learn/scenarios" className="btn btn-secondary">
          <ArrowLeft size={16} /> {t.learn.previous}
        </Link>
        <Link href="/learn/interview" className="btn btn-primary">
          {t.learn.next}：{t.learn.interview.title} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

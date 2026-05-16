'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PrinciplesPage() {
  const { t } = useLanguage();

  return (
    <div className="tool-container">
      <Link href="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> {t.learn.backToLearn}
      </Link>

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        {t.learn.principles.title}
      </h1>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.whatIsBase64}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.learn.base64Description}
        </p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.base64Charset}</h2>
        <div style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '8px',
          padding: '1rem',
          fontFamily: 'monospace',
          fontSize: '1.1rem',
          marginBottom: '1rem'
        }}>
          <span style={{ color: '#e74c3c' }}>A-Z</span> (26) + <span style={{ color: '#3498db' }}>a-z</span> (26) + <span style={{ color: '#2ecc71' }}>0-9</span> (10) + <span style={{ color: '#f39c12' }}>+</span> (1) + <span style={{ color: '#9b59b6' }}>/</span> (1) = <strong>64</strong>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          <div>{t.learn.index} 0-25: A-Z</div>
          <div>{t.learn.index} 26-51: a-z</div>
          <div>{t.learn.index} 52-61: 0-9</div>
          <div>{t.learn.index} 62: +</div>
          <div>{t.learn.index} 63: /</div>
          <div style={{ marginTop: '0.5rem', color: 'var(--text-tertiary)' }}>{t.learn.index} 64 ({t.learn.padding}): =</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.encodingProcess}</h2>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1.5rem' }}>
          <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            {t.learn.exampleString}
          </p>
          <ol style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.5rem' }}>
            <li><strong>{t.learn.convertToAscii}:</strong> M=77, a=97, n=110</li>
            <li><strong>{t.learn.convertToBinary}:</strong> 01001101 01100001 01101110</li>
            <li><strong>{t.learn.groupBySixBits}:</strong> 010011 010110 000101 101110</li>
            <li><strong>{t.learn.convertToDecimal}:</strong> 19, 22, 5, 46</li>
            <li><strong>{t.learn.lookupTable}:</strong> T, W, F, u</li>
          </ol>
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <strong>{t.learn.result}:</strong> <span style={{ color: 'var(--accent-color)', fontFamily: 'monospace' }}>TWFu</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.paddingMechanism}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          {t.learn.paddingDescription}
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>{t.learn.exampleOneChar}:</strong> "a" → 8 bits → 4 groups → <code>YQ==</code>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>2 = at end</div>
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>{t.learn.exampleTwoChars}:</strong> "ab" → 16 bits → 4 groups → <code>YWI=</code>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>1 = at end</div>
          </div>
          <div>
            <strong>{t.learn.exampleThreeChars}:</strong> "abc" → 24 bits → 4 groups → <code>YWJj</code>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>No padding</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.why64}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.learn.why64Description}
        </p>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/learn" className="btn btn-secondary">
          <ArrowLeft size={16} /> {t.learn.previous}
        </Link>
        <Link href="/learn/scenarios" className="btn btn-primary">
          {t.learn.next}：{t.learn.scenarios.title} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

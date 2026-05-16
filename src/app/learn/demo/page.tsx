'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';

const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export default function DemoPage() {
  const { t } = useLanguage();
  const [input, setInput] = useState('Man');
  const [steps, setSteps] = useState<{
    ascii: string[];
    binary: string;
    groups: string[];
    indices: number[];
    result: string;
  } | null>(null);

  const handleConvert = useCallback(() => {
    if (!input) return;
    
    const ascii = input.split('').map(c => c.charCodeAt(0).toString());
    const binary = input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('');
    const groups: string[] = [];
    const indices: number[] = [];
    
    for (let i = 0; i < binary.length; i += 6) {
      const group = binary.slice(i, i + 6).padEnd(6, '0');
      groups.push(group);
      indices.push(parseInt(group, 2));
    }
    
    const result = indices.map(idx => BASE64_CHARS[idx]).join('') + 
      (input.length % 3 === 1 ? '==' : input.length % 3 === 2 ? '=' : '');
    
    setSteps({ ascii, binary, groups, indices, result });
  }, [input]);

  const handleReset = useCallback(() => {
    setInput('Man');
    setSteps(null);
  }, []);

  return (
    <div className="tool-container">
      <Link href="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> {t.learn.backToLearn}
      </Link>

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        {t.learn.demoTitle}
      </h1>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.inputString}</h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-field"
            placeholder={t.learn.placeholder}
            style={{ flex: 1, minWidth: '200px' }}
          />
          <button className="btn btn-primary" onClick={handleConvert}>
            <Play size={16} /> {t.learn.convert}
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            <RotateCcw size={16} /> {t.learn.reset}
          </button>
        </div>
      </div>

      {steps && (
        <>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.step1Ascii}</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {input.split('').map((char, i) => (
                <div key={i} style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '1rem 1.5rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{char}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{steps.ascii[i]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.step2Binary}</h2>
            <div style={{
              backgroundColor: 'var(--bg-tertiary)',
              padding: '1rem',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '1.1rem',
              wordBreak: 'break-all'
            }}>
              {input.split('').map((char, i) => (
                <span key={i}>
                  <span style={{ color: 'var(--text-secondary)' }}>{char}: </span>
                  {char.charCodeAt(0).toString(2).padStart(8, '0')}
                  {' '}
                </span>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.step3Groups}</h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {steps.groups.map((group, i) => (
                <div key={i} style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '1rem'
                }}>
                  {group}
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.step4Convert}</h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {steps.groups.map((group, i) => (
                <div key={i} style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
                    {group} = {steps.indices[i]}
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--accent-color)', marginTop: '0.25rem' }}>
                    {BASE64_CHARS[steps.indices[i]]}
                  </div>
                </div>
              ))}
              {input.length % 3 !== 0 && (
                <span style={{ color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
                  {'='.repeat(input.length % 3 === 1 ? 2 : 1)}
                </span>
              )}
            </div>
          </div>

          <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.demoResult}</h2>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              color: 'var(--accent-color)'
            }}>
              {steps.result}
            </div>
          </div>
        </>
      )}

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/learn/interview" className="btn btn-secondary">
          <ArrowLeft size={16} /> {t.learn.previous}
        </Link>
        <Link href="/text-base64" className="btn btn-primary">
          {t.learn.goToTools}
        </Link>
      </div>
    </div>
  );
}

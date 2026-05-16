'use client';

import Link from 'next/link';
import { HelpCircle, ChevronDown, MessageCircle, Search, BookOpen, Shield, Zap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export default function FAQPage() {
  const { t } = useLanguage();

  const faqCategories = [
    {
      category: t.faq.categories.basic,
      icon: <BookOpen size={20} />,
      questions: [
        {
          q: t.faq.questions.whatIsBase64,
          a: t.faq.questions.whatIsBase64Answer,
        },
        {
          q: t.faq.questions.isBase64Encryption,
          a: t.faq.questions.isBase64EncryptionAnswer,
        },
        {
          q: t.faq.questions.whyDataGrows,
          a: t.faq.questions.whyDataGrowsAnswer,
        },
        {
          q: t.faq.questions.whenUseBase64,
          a: t.faq.questions.whenUseBase64Answer,
        },
      ],
    },
    {
      category: t.faq.categories.technical,
      icon: <Zap size={20} />,
      questions: [
        {
          q: t.faq.questions.standardVsUrlSafe,
          a: t.faq.questions.standardVsUrlSafeAnswer,
        },
        {
          q: t.faq.questions.whyPaddingEquals,
          a: t.faq.questions.whyPaddingEqualsAnswer,
        },
        {
          q: t.faq.questions.maxFileSize,
          a: t.faq.questions.maxFileSizeAnswer,
        },
        {
          q: t.faq.questions.chineseEncoding,
          a: t.faq.questions.chineseEncodingAnswer,
        },
      ],
    },
    {
      category: t.faq.categories.privacy,
      icon: <Shield size={20} />,
      questions: [
        {
          q: t.faq.questions.dataUploaded,
          a: t.faq.questions.dataUploadedAnswer,
        },
        {
          q: t.faq.questions.base64ForPassword,
          a: t.faq.questions.base64ForPasswordAnswer,
        },
        {
          q: t.faq.questions.detectMalicious,
          a: t.faq.questions.detectMaliciousAnswer,
        },
      ],
    },
    {
      category: t.faq.categories.usage,
      icon: <HelpCircle size={20} />,
      questions: [
        {
          q: t.faq.questions.useInProgramming,
          a: t.faq.questions.useInProgrammingAnswer,
        },
        {
          q: t.faq.questions.base64VsHex,
          a: t.faq.questions.base64VsHexAnswer,
        },
        {
          q: t.faq.questions.batchProcessing,
          a: t.faq.questions.batchProcessingAnswer,
        },
        {
          q: t.faq.questions.differentResults,
          a: t.faq.questions.differentResultsAnswer,
        },
      ],
    },
  ];

  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.faq.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          {t.faq.subtitle}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            <MessageCircle size={18} />
            {t.faq.contactUs}
          </Link>
          <Link href="/learn" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            <BookOpen size={18} />
            {t.faq.learnBase64}
          </Link>
        </div>
      </div>

      {/* Quick Search Hint */}
      <div className="card" style={{ marginBottom: '2rem', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Search size={24} style={{ color: 'var(--accent-color)' }} />
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              {t.faq.searchHint}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {t.faq.searchTip}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      {faqCategories.map((category, catIndex) => (
        <div key={catIndex} className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--accent-color)' }}>{category.icon}</span>
            {category.category}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {category.questions.map((item, qIndex) => (
              <details key={qIndex} style={{ 
                backgroundColor: 'var(--bg-tertiary)', 
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <summary style={{ 
                  padding: '1rem', 
                  cursor: 'pointer', 
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  listStyle: 'none'
                }}>
                  <ChevronDown size={18} style={{ color: 'var(--accent-color)', transition: 'transform 0.2s' }} className="faq-chevron" />
                  <span>Q: {item.q}</span>
                </summary>
                <div style={{ 
                  padding: '1rem', 
                  paddingTop: '0.5rem',
                  color: 'var(--text-secondary)', 
                  lineHeight: 1.8,
                  borderTop: '1px solid var(--border-color)'
                }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}

      {/* Still Have Questions */}
      <div className="card" style={{ textAlign: 'center', backgroundColor: 'var(--bg-secondary)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          {t.faq.stillHaveQuestions}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          {t.faq.noAnswerContact}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="mailto:support@base64.club" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            {t.faq.sendEmail}
          </a>
          <Link href="/developers" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            {t.faq.developerDocs}
          </Link>
        </div>
      </div>

      <style>{`
        details summary::-webkit-details-marker {
          display: none;
        }
        details[open] summary .faq-chevron {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}

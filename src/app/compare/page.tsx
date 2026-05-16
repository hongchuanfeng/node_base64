import Link from 'next/link';
import type { Metadata } from 'next';
import { GitCompare, ArrowRight, Database, Shield, Zap, Globe, Hash, Code } from 'lucide-react';
import { getTranslation } from '@/i18n';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  return {
    title: `${t.compare.title} - ChuanDaoAI`,
    description: t.compare.subtitle,
  };
}

const encodings = [
  {
    id: 'base64',
    charset: 'A-Z(26) + a-z(26) + 0-9(10) + +(1) + /(1) = 64字符',
    charsetEn: 'A-Z(26) + a-z(26) + 0-9(10) + +(1) + /(1) = 64 chars',
    bitsPerChar: 6,
    efficiency: '~133%',
    humanReadable: 3,
    urlSafe: false,
    useCases: ['MIME邮件', 'JSON数据', 'Data URL', 'JWT'],
    useCasesEn: ['MIME email', 'JSON data', 'Data URL', 'JWT'],
    pros: ['较高的编码效率', '广泛支持', '可打印字符'],
    prosEn: ['High encoding efficiency', 'Wide support', 'Printable characters'],
    cons: ['字符集包含+/', 'URL中需转义', '不是完全人类可读'],
    consEn: ['Charset contains +/', 'Needs escaping in URLs', 'Not fully human readable'],
    color: '#3b82f6',
  },
  {
    id: 'base32',
    charset: 'A-Z(26) + 2-7(6) = 32字符',
    charsetEn: 'A-Z(26) + 2-7(6) = 32 chars',
    bitsPerChar: 5,
    efficiency: '~160%',
    humanReadable: 4,
    urlSafe: true,
    useCases: ['DNSSEC', 'Apache Commons Codec', 'OTP密钥'],
    useCasesEn: ['DNSSEC', 'Apache Commons Codec', 'OTP keys'],
    pros: ['完全人类可读', '区分大小写', '不含特殊字符'],
    prosEn: ['Fully human readable', 'Case-sensitive', 'No special characters'],
    cons: ['效率较低', '编码结果较长', '不常用'],
    consEn: ['Lower efficiency', 'Longer output', 'Rarely used'],
    color: '#8b5cf6',
  },
  {
    id: 'base58',
    charset: 'A-Z(25) + a-z(26) + 0-9(10) - 0/O/I/l/(5) = 58字符',
    charsetEn: 'A-Z(25) + a-z(26) + 0-9(10) - 0/O/I/l/(5) = 58 chars',
    bitsPerChar: 5.858,
    efficiency: '~137%',
    humanReadable: 4,
    urlSafe: true,
    useCases: ['比特币地址', 'IPFS CID', 'Flickr短URL'],
    useCasesEn: ['Bitcoin addresses', 'IPFS CID', 'Flickr short URLs'],
    pros: ['易于阅读', '避免混淆字符', '区块链常用'],
    prosEn: ['Easy to read', 'Avoids confusing characters', 'Common in blockchain'],
    cons: ['非标准字符集', '计算稍复杂', '效率一般'],
    consEn: ['Non-standard charset', 'Slightly complex calculation', 'Average efficiency'],
    color: '#f59e0b',
  },
  {
    id: 'base16',
    charset: '0-9(10) + A-F(6) = 16字符',
    charsetEn: '0-9(10) + A-F(6) = 16 chars',
    bitsPerChar: 4,
    efficiency: '200%',
    humanReadable: 5,
    urlSafe: true,
    useCases: ['调试输出', '内存地址', '颜色值', 'MAC地址'],
    useCasesEn: ['Debug output', 'Memory addresses', 'Color values', 'MAC addresses'],
    pros: ['极其简单', '广泛使用', '完全可打印'],
    prosEn: ['Extremely simple', 'Widely used', 'Fully printable'],
    cons: ['效率最低', '占用空间大', '数据膨胀明显'],
    consEn: ['Lowest efficiency', 'Takes up large space', 'Significant data expansion'],
    color: '#22c55e',
  },
  {
    id: 'base85',
    charset: 'ASCII 33-117 (剔除单双引号和反斜杠)',
    charsetEn: 'ASCII 33-117 (excluding quotes and backslash)',
    bitsPerChar: 6.9,
    efficiency: '~115%',
    humanReadable: 2,
    urlSafe: false,
    useCases: ['Adobe PDF', 'Git二进制 diff', '火焰图'],
    useCasesEn: ['Adobe PDF', 'Git binary diff', 'Flame graphs'],
    pros: ['效率最高', '压缩效果好', 'PDF标准'],
    prosEn: ['Highest efficiency', 'Good compression', 'PDF standard'],
    cons: ['字符集复杂', '显示乱码', '兼容性差'],
    consEn: ['Complex charset', 'Messy display', 'Poor compatibility'],
    color: '#ec4899',
  },
  {
    id: 'base36',
    charset: '0-9(10) + A-Z(26) = 36字符',
    charsetEn: '0-9(10) + A-Z(26) = 36 chars',
    bitsPerChar: 5.17,
    efficiency: '~154%',
    humanReadable: 4,
    urlSafe: true,
    useCases: ['短链接', '临时ID', '邀请码'],
    useCasesEn: ['Short URLs', 'Temporary IDs', 'Invitation codes'],
    pros: ['人类可读', '纯数字+字母', 'URL友好'],
    prosEn: ['Human readable', 'Pure digits + letters', 'URL friendly'],
    cons: ['效率一般', '非标准', '需要自定义实现'],
    consEn: ['Average efficiency', 'Non-standard', 'Needs custom implementation'],
    color: '#06b6d4',
  },
];

const comparisonTable = [
  { feature: '字符集大小', featureEn: 'Charset Size', values: ['64', '32', '58', '16', '85', '36'] },
  { feature: '每字符位数', featureEn: 'Bits per Char', values: ['6', '5', '~5.86', '4', '~6.9', '~5.17'] },
  { feature: '编码效率', featureEn: 'Encoding Efficiency', values: ['133%', '160%', '137%', '200%', '115%', '154%'] },
  { feature: '人类可读', featureEn: 'Human Readable', values: ['★★★', '★★★★', '★★★★', '★★★★★', '★★', '★★★★'] },
  { feature: 'URL安全', featureEn: 'URL Safe', values: ['❌', '✓', '✓', '✓', '❌', '✓'] },
  { feature: '广泛支持', featureEn: 'Wide Support', values: ['★★★★★', '★★★', '★★', '★★★★★', '★', '★'] },
  { feature: '典型应用', featureEn: 'Typical App', values: ['JSON/API', 'OTP', '比特币', '调试', 'PDF', '短链接'] },
  { feature: 'Typical App', featureEn: 'Typical App', values: ['JSON/API', 'OTP', 'Bitcoin', 'Debug', 'PDF', 'Short URL'] },
];

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isZh = locale === 'zh';

  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.compare.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {t.compare.subtitle}
        </p>
      </div>

      {/* Comparison Table */}
      <div className="card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GitCompare size={24} style={{ color: 'var(--accent-color)' }} />
          {t.compare.comparisonTable}
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '600px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {t.compare.feature}
              </th>
              {encodings.map((enc) => (
                <th key={enc.id} style={{ 
                  padding: '0.75rem', 
                  textAlign: 'center', 
                  borderBottom: '2px solid var(--border-color)',
                  color: enc.color
                }}>
                  {isZh ? enc.id.replace('base', 'Base') : enc.id.replace('base', 'Base')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonTable.filter(row => isZh ? row.feature !== 'Typical App' : row.feature !== '典型应用').map((row, index) => (
              <tr key={index}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {isZh ? row.feature : row.featureEn}
                </td>
                {row.values.map((val, i) => (
                  <td key={i} style={{ 
                    padding: '0.75rem', 
                    textAlign: 'center', 
                    borderBottom: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)'
                  }}>
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Encoding Cards */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
        {t.compare.details}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {encodings.map((enc) => (
          <div key={enc.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ 
              padding: '1.25rem', 
              backgroundColor: enc.color,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <Hash size={24} style={{ color: 'white' }} />
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>
                  {isZh ? enc.id.replace('base', 'Base') : enc.id.replace('base', 'Base')}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>
                  {isZh ? enc.charset : enc.charsetEn}
                </p>
              </div>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{t.compare.efficiency}</span>
                  <span style={{ color: enc.color, fontWeight: 600 }}>{enc.efficiency}</span>
                </div>
                <div style={{ 
                  height: '6px', 
                  backgroundColor: 'var(--bg-tertiary)', 
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${100 / parseFloat(enc.efficiency) * 100}%`,
                    height: '100%',
                    backgroundColor: enc.color,
                    borderRadius: '3px'
                  }} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  {t.compare.useCases}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {(isZh ? enc.useCases : enc.useCasesEn).map((uc, i) => (
                    <span key={i} style={{ 
                      padding: '0.25rem 0.5rem',
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)'
                    }}>
                      {uc}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: 500, color: 'var(--success-color)', marginBottom: '0.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Zap size={14} /> {t.compare.pros}
                </div>
                <ul style={{ paddingLeft: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {(isZh ? enc.pros : enc.prosEn).map((pro, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{pro}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ fontWeight: 500, color: 'var(--error-color)', marginBottom: '0.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Shield size={14} /> {t.compare.cons}
                </div>
                <ul style={{ paddingLeft: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {(isZh ? enc.cons : enc.consEn).map((con, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Example Comparison */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Code size={24} style={{ color: 'var(--accent-color)' }} />
          {t.compare.exampleComparison}
        </h2>
        <div style={{ 
          backgroundColor: 'var(--bg-tertiary)', 
          borderRadius: '8px', 
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>{t.compare.originalData}:</div>
          <code style={{ 
            display: 'block',
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
          }}>
            "Hello World! 你好世界！"
          </code>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.5rem' }}>
            (24 {t.compare.bytes} / 192 {t.compare.bits})
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {[
            { name: 'Base64', value: 'SGVsbG8gV29ybGQhIOS4i+S4iO+8iA==', color: '#3b82f6' },
            { name: 'Base32', value: 'JBSWY3DPEBLW64TMMQQQ====', color: '#8b5cf6' },
            { name: 'Base16', value: '48656C6C6F20576F726C6421E4BDA0E4B88DE4B896E794B5', color: '#22c55e' },
            { name: 'Base58', value: 'Cn1eH7Xy5q4U9K3mN8pQ2rS', color: '#f59e0b' },
          ].map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px'
            }}>
              <span style={{ 
                width: '80px',
                fontWeight: 600,
                color: item.color
              }}>
                {item.name}
              </span>
              <code style={{ 
                flex: 1,
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                wordBreak: 'break-all'
              }}>
                {item.value}
              </code>
              <span style={{ 
                padding: '0.25rem 0.5rem',
                backgroundColor: item.color,
                color: 'white',
                borderRadius: '4px',
                fontSize: '0.75rem'
              }}>
                {item.value.length}{t.compare.chars}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* When to Use What */}
      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          {t.compare.whenToUse}
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {[
            { enc: 'Base64', when: t.compare.whenBase64, color: '#3b82f6' },
            { enc: 'Base32', when: t.compare.whenBase32, color: '#8b5cf6' },
            { enc: 'Base58', when: t.compare.whenBase58, color: '#f59e0b' },
            { enc: 'Hex', when: t.compare.whenHex, color: '#22c55e' },
            { enc: 'Base85', when: t.compare.whenBase85, color: '#ec4899' },
          ].map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              gap: '1rem', 
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '8px'
            }}>
              <span style={{ 
                padding: '0.5rem 1rem',
                backgroundColor: item.color,
                color: 'white',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                {item.enc}
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>{item.when}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            {t.compare.tryBase64}
            <ArrowRight size={18} />
          </Link>
          <Link href="/learn/comparison" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            {t.compare.viewComparison}
          </Link>
        </div>
      </div>
    </div>
  );
}

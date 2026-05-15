import Link from 'next/link';
import type { Metadata } from 'next';
import { GitCompare, ArrowRight, Database, Shield, Zap, Globe, Hash, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: '编码对比 - 传道AI',
  description: 'Base64与Base32、Base58、Hex等编码格式的详细对比。了解各编码格式的特点、优劣势和使用场景。',
};

const encodings = [
  {
    id: 'base64',
    name: 'Base64',
    charset: 'A-Z(26) + a-z(26) + 0-9(10) + +(1) + /(1) = 64字符',
    bitsPerChar: 6,
    efficiency: '~133%',
    humanReadable: 3,
    urlSafe: false,
    useCases: ['MIME邮件', 'JSON数据', 'Data URL', 'JWT'],
    pros: ['较高的编码效率', '广泛支持', '可打印字符'],
    cons: ['字符集包含+/', 'URL中需转义', '不是完全人类可读'],
    color: '#3b82f6',
  },
  {
    id: 'base32',
    name: 'Base32',
    charset: 'A-Z(26) + 2-7(6) = 32字符',
    bitsPerChar: 5,
    efficiency: '~160%',
    humanReadable: 4,
    urlSafe: true,
    useCases: ['DNSSEC', 'Apache Commons Codec', 'OTP密钥'],
    pros: ['完全人类可读', '区分大小写', '不含特殊字符'],
    cons: ['效率较低', '编码结果较长', '不常用'],
    color: '#8b5cf6',
  },
  {
    id: 'base58',
    name: 'Base58',
    charset: 'A-Z(25) + a-z(26) + 0-9(10) - 0/O/I/l/(5) = 58字符',
    bitsPerChar: 5.858,
    efficiency: '~137%',
    humanReadable: 4,
    urlSafe: true,
    useCases: ['比特币地址', 'IPFS CID', 'Flickr短URL'],
    pros: ['易于阅读', '避免混淆字符', '区块链常用'],
    cons: ['非标准字符集', '计算稍复杂', '效率一般'],
    color: '#f59e0b',
  },
  {
    id: 'base16',
    name: 'Base16 (Hex)',
    charset: '0-9(10) + A-F(6) = 16字符',
    bitsPerChar: 4,
    efficiency: '200%',
    humanReadable: 5,
    urlSafe: true,
    useCases: ['调试输出', '内存地址', '颜色值', 'MAC地址'],
    pros: ['极其简单', '广泛使用', '完全可打印'],
    cons: ['效率最低', '占用空间大', '数据膨胀明显'],
    color: '#22c55e',
  },
  {
    id: 'base85',
    name: 'Base85 (ASCII85)',
    charset: 'ASCII 33-117 (剔除单双引号和反斜杠)',
    bitsPerChar: 6.9,
    efficiency: '~115%',
    humanReadable: 2,
    urlSafe: false,
    useCases: ['Adobe PDF', 'Git二进制 diff', '火焰图'],
    pros: ['效率最高', '压缩效果好', 'PDF标准'],
    cons: ['字符集复杂', '显示乱码', '兼容性差'],
    color: '#ec4899',
  },
  {
    id: 'base36',
    name: 'Base36',
    charset: '0-9(10) + A-Z(26) = 36字符',
    bitsPerChar: 5.17,
    efficiency: '~154%',
    humanReadable: 4,
    urlSafe: true,
    useCases: ['短链接', '临时ID', '邀请码'],
    pros: ['人类可读', '纯数字+字母', 'URL友好'],
    cons: ['效率一般', '非标准', '需要自定义实现'],
    color: '#06b6d4',
  },
];

const comparisonTable = [
  { feature: '字符集大小', values: ['64', '32', '58', '16', '85', '36'] },
  { feature: '每字符位数', values: ['6', '5', '~5.86', '4', '~6.9', '~5.17'] },
  { feature: '编码效率', values: ['133%', '160%', '137%', '200%', '115%', '154%'] },
  { feature: '人类可读', values: ['★★★', '★★★★', '★★★★', '★★★★★', '★★', '★★★★'] },
  { feature: 'URL安全', values: ['❌', '✓', '✓', '✓', '❌', '✓'] },
  { feature: '广泛支持', values: ['★★★★★', '★★★', '★★', '★★★★★', '★', '★'] },
  { feature: '典型应用', values: ['JSON/API', 'OTP', '比特币', '调试', 'PDF', '短链接'] },
];

export default function ComparePage() {
  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          编码格式对比
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          了解Base64与其他编码格式的区别，选择最适合您的编码方式。
        </p>
      </div>

      {/* Comparison Table */}
      <div className="card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GitCompare size={24} style={{ color: 'var(--accent-color)' }} />
          编码格式对比表
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '600px' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)' }}>特性</th>
              {encodings.map((enc) => (
                <th key={enc.id} style={{ 
                  padding: '0.75rem', 
                  textAlign: 'center', 
                  borderBottom: '2px solid var(--border-color)',
                  color: enc.color
                }}>
                  {enc.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonTable.map((row, index) => (
              <tr key={index}>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {row.feature}
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
        各编码格式详解
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
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>{enc.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>
                  {enc.charset}
                </p>
              </div>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>编码效率</span>
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
                  使用场景
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {enc.useCases.map((uc, i) => (
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
                  <Zap size={14} /> 优点
                </div>
                <ul style={{ paddingLeft: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {enc.pros.map((pro, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{pro}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ fontWeight: 500, color: 'var(--error-color)', marginBottom: '0.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Shield size={14} /> 缺点
                </div>
                <ul style={{ paddingLeft: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {enc.cons.map((con, i) => (
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
          编码示例对比
        </h2>
        <div style={{ 
          backgroundColor: 'var(--bg-tertiary)', 
          borderRadius: '8px', 
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>原始数据：</div>
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
            (共24字节 / 192位)
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
                {item.value.length}字符
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* When to Use What */}
      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          什么时候用什么编码？
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {[
            { enc: 'Base64', when: 'Web开发、API传输、Data URL内嵌图片', color: '#3b82f6' },
            { enc: 'Base32', when: 'OTP密钥、DNS记录、区分大小写的场景', color: '#8b5cf6' },
            { enc: 'Base58', when: '加密货币地址、短ID、区块链应用', color: '#f59e0b' },
            { enc: 'Hex', when: '调试、配置文件、内存地址展示', color: '#22c55e' },
            { enc: 'Base85', when: 'PDF文件、二进制diff、追求最高压缩率', color: '#ec4899' },
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
            体验Base64工具
            <ArrowRight size={18} />
          </Link>
          <Link href="/learn/comparison" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            查看详细对比
          </Link>
        </div>
      </div>
    </div>
  );
}

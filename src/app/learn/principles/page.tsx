import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Base64原理 - 传道AI',
  description: '深入理解Base64编码原理，为什么使用64个字符，填充机制详解。',
};

export default function PrinciplesPage() {
  return (
    <div className="tool-container">
      <Link href="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> 返回学习中心
      </Link>

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        Base64原理
      </h1>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>什么是Base64？</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Base64是一种基于64个可打印字符来表示二进制数据的编码方式。它最初用于在电子邮件中传输二进制数据，
          后来广泛应用于Web开发中的数据URI、API数据传输等场景。
        </p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Base64字符集</h2>
        <div style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '8px',
          padding: '1rem',
          fontFamily: 'monospace',
          fontSize: '1.1rem',
          marginBottom: '1rem'
        }}>
          <span style={{ color: '#e74c3c' }}>A-Z</span> (26) + <span style={{ color: '#3498db' }}>a-z</span> (26) + <span style={{ color: '#2ecc71' }}>0-9</span> (10) + <span style={{ color: '#f39c12' }}>+</span> (1) + <span style={{ color: '#9b59b6' }}>/</span> (1) = <strong>64个字符</strong>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          <div>索引 0-25: A-Z</div>
          <div>索引 26-51: a-z</div>
          <div>索引 52-61: 0-9</div>
          <div>索引 62: +</div>
          <div>索引 63: /</div>
          <div style={{ marginTop: '0.5rem', color: 'var(--text-tertiary)' }}>索引 64 (padding): =</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>编码过程</h2>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1.5rem' }}>
          <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            以字符串 <strong>"Man"</strong> 为例：
          </p>
          <ol style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.5rem' }}>
            <li><strong>转换为ASCII:</strong> M=77, a=97, n=110</li>
            <li><strong>转为二进制:</strong> 01001101 01100001 01101110</li>
            <li><strong>每6位分组:</strong> 010011 010110 000101 101110</li>
            <li><strong>转为十进制:</strong> 19, 22, 5, 46</li>
            <li><strong>查表转换:</strong> T, W, F, u</li>
          </ol>
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <strong>结果:</strong> <span style={{ color: 'var(--accent-color)', fontFamily: 'monospace' }}>TWFu</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>填充机制</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          当要编码的字节数不是3的倍数时，需要进行填充：
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>示例 "a":</strong> 只有一个字符，24位 → 分成4组 → 结果 "YQ=="
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>末尾补两个 =</div>
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>示例 "ab":</strong> 两个字符，16位 → 分成4组但只有3组有效 → 结果 "YWI="
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>末尾补一个 =</div>
          </div>
          <div>
            <strong>示例 "abc":</strong> 三个字符，24位 → 刚好分成4组 → 结果 "YWJj"
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>不需要填充</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>为什么是64？</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          选择64个字符是因为2的6次方等于64，每6个二进制位可以表示一个Base64字符。
          而每3个字节(24位)刚好可以转换成4个Base64字符，转换效率较高。
          同时这64个字符都是不可逆的、安全传输的字符，适合在不同系统间传输。
        </p>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/learn" className="btn btn-secondary">
          <ArrowLeft size={16} /> 返回
        </Link>
        <Link href="/learn/scenarios" className="btn btn-primary">
          下一课：常见场景 <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Base64常见场景 - 传道AI',
  description: '了解Base64在实际开发中的常见应用场景：图片嵌入、Data URL、JWT、邮件附件等。',
};

export default function ScenariosPage() {
  return (
    <div className="tool-container">
      <Link href="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> 返回学习中心
      </Link>

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        Base64常见场景
      </h1>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>1. 图片嵌入HTML/CSS (Data URI)</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          将小图片转换为Base64直接嵌入HTML或CSS，减少HTTP请求：
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', wordBreak: 'break-all' }}>
          {`<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==">`}
        </div>
        <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', fontSize: '0.85rem' }}>
          <strong>适用场景:</strong> 小图标(小于4KB)、减少请求次数、离线HTML文档
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>2. JWT Token</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          JSON Web Token (JWT) 的Payload部分通常使用Base64编码：
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
          <div style={{ color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ← Header</div>
          <div style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ifQ ← Payload</div>
          <div style={{ color: 'var(--text-tertiary)' }}>SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c ← Signature</div>
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <strong>解码结果:</strong>
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '8px', marginTop: '0.5rem' }}>
            {`{"sub":"1234567890","name":"John"}`}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>3. 邮件附件编码 (MIME)</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          电子邮件的SMTP协议早期只能传输7位ASCII字符，Base64用于编码二进制附件（如图片、文档）。
          这也是Base64最初被设计的主要原因之一。
        </p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>4. API数据传输</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          某些API需要传输二进制数据或特殊字符：
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
          {`// 请求示例
POST /api/upload
Content-Type: application/json

{"file_data": "base64编码的文件内容..."}`}
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>5. URL Base64变体</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          标准Base64中的 <code>+</code> 和 <code>/</code> 在URL中需要转义，因此产生了URL-safe Base64：
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem', marginTop: '0.5rem' }}>
          <div><strong>标准Base64:</strong> <code>+</code> 和 <code>/</code></div>
          <div><strong>URL-safe:</strong> <code>-</code> (减号) 和 <code>_</code> (下划线)</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>使用注意事项</h2>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.5rem' }}>
          <li>Base64编码后体积增加约33%</li>
          <li>不适合用于大文件（建议用二进制协议）</li>
          <li>不是加密方式，仅是编码</li>
          <li>URL中使用时需使用URL-safe变体</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/learn/principles" className="btn btn-secondary">
          <ArrowLeft size={16} /> 上一课
        </Link>
        <Link href="/learn/comparison" className="btn btn-primary">
          下一课：对比分析 <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
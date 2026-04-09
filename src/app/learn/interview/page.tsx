import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Base64面试题 - 传道AI',
  description: '收集整理常见的Base64相关面试题与详细解答，助你面试成功。',
};

const questions = [
  {
    q: '什么是Base64？为什么需要Base64编码？',
    a: 'Base64是一种基于64个可打印字符来表示二进制数据的编码方式。需要它主要是因为：1) 早期网络协议（如SMTP）只能传输ASCII文本；2) 某些系统需要安全传输二进制数据；3) 某些API需要将二进制数据转为文本格式传输。',
  },
  {
    q: 'Base64的编码原理是什么？',
    a: '1) 将每3个字节（24位）为一组；2) 将24位拆分为4个6位的组；3) 每个6位组对应0-63的索引；4) 根据索引查找Base64字符表获取对应字符。如果最后一组不足3字节，用=填充。',
  },
  {
    q: 'Base64编码后体积会增加多少？',
    a: 'Base64编码后体积约为原二进制数据的4/3倍，即增加约33%。原因：3字节=24位=4个Base64字符，每个字符8位，所以从24位变成32位。',
  },
  {
    q: '什么时候会使用填充（padding）字符"="？',
    a: '当要编码的字节数不能被3整除时：1) 剩余1字节时，编码为2个字符后加2个"="；2) 剩余2字节时，编码为3个字符后加1个"="。完整的3字节不需要填充。',
  },
  {
    q: 'Base64和Base64URL有什么区别？',
    a: 'Base64使用字符：+, /；Base64URL使用：-, _。这是因为+和/在URL中需要URL编码，且/可能造成路径歧义。Base64URL还会移除末尾的=。',
  },
  {
    q: 'Base64是加密吗？为什么？',
    a: 'Base64不是加密，是编码。编码是公开可逆的转换，任何人都可以解码。真正的加密需要密钥，且不应该能从密文推断出明文。Base64编码只是改变了数据的表现形式，没有安全性。',
  },
  {
    q: 'Base64适合用于大文件吗？为什么？',
    a: '不适合。原因：1) 体积增加33%；2) 编解码计算开销；3) 编码后的文本不适合分块传输。对于大文件，建议使用二进制格式或分片传输。Base64适合小数据，如API Token、小图片等。',
  },
  {
    q: '如何判断一个字符串是否是有效的Base64？',
    a: '1) 长度必须是4的倍数；2) 只能包含Base64字符集；3) 最多只有2个末尾的=；4) =只能在末尾。也可以尝试解码，看是否能正确还原原始字节数。',
  },
  {
    q: '浏览器中如何进行Base64编解码？',
    a: '使用btoa()进行编码，atob()进行解码。但注意这两个函数只支持Latin1字符。对于Unicode字符，需要先使用TextEncoder/TextDecoder转换。',
  },
  {
    q: 'Base64有哪些常见的应用场景？',
    a: '1) 电子邮件附件编码（MIME）；2) Data URL嵌入图片；3) JWT Token的Payload；4) API传输二进制数据；5) 密钥和令牌的编码；6) 配置文件中的二进制数据。',
  },
];

export default function InterviewPage() {
  return (
    <div className="tool-container">
      <Link href="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> 返回学习中心
      </Link>

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        Base64面试题整理
      </h1>

      <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          以下是常见的Base64相关面试题，涵盖原理、实践和注意事项。建议理解原理而非死记硬背。
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {questions.map((item, index) => (
          <div key={index} className="card">
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--accent-color)', marginRight: '0.5rem' }}>Q{index + 1}.</span>
              {item.q}
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '1.5rem', borderLeft: '3px solid var(--border-color)' }}>
              {item.a}
            </p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>加分项</h2>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.5rem' }}>
          <li>能手写Base64编码过程</li>
          <li>了解不同编程语言的Base64 API</li>
          <li>知道Base64的性能开销和优化方法</li>
          <li>了解Base64变种及其适用场景</li>
          <li>能说出Base64与其他编码（Hex、Base58等）的对比</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/learn/comparison" className="btn btn-secondary">
          <ArrowLeft size={16} /> 上一课
        </Link>
        <Link href="/learn/demo" className="btn btn-primary">
          下一课：JavaScript演示 <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
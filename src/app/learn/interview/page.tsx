'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const questionsZh = [
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

const questionsEn = [
  {
    q: 'What is Base64? Why do we need Base64 encoding?',
    a: 'Base64 is an encoding method that represents binary data using 64 printable characters. We need it mainly because: 1) Early network protocols (like SMTP) could only transmit ASCII text; 2) Some systems need to safely transmit binary data; 3) Some APIs need to convert binary data to text format for transmission.',
  },
  {
    q: 'What is the encoding principle of Base64?',
    a: '1) Group every 3 bytes (24 bits) as one unit; 2) Split 24 bits into 4 groups of 6 bits each; 3) Each 6-bit group corresponds to index 0-63; 4) Look up the Base64 character table to get the corresponding character. If the last group is less than 3 bytes, pad with "=".',
  },
  {
    q: 'How much does Base64 encoding increase the volume?',
    a: 'Base64 encoding increases volume to about 4/3 of the original binary data, approximately 33% larger. Reason: 3 bytes = 24 bits = 4 Base64 characters, each character is 8 bits, so from 24 bits to 32 bits.',
  },
  {
    q: 'When will the padding character "=" be used?',
    a: 'When the number of bytes to encode is not divisible by 3: 1) 1 byte remaining: encode to 2 characters then add 2 "="; 2) 2 bytes remaining: encode to 3 characters then add 1 "=". Complete 3-byte groups do not need padding.',
  },
  {
    q: 'What is the difference between Base64 and Base64URL?',
    a: 'Base64 uses characters: +, /; Base64URL uses: -, _. This is because + and / need URL encoding in URLs, and / may cause path ambiguity. Base64URL also removes trailing "=".',
  },
  {
    q: 'Is Base64 encryption? Why?',
    a: 'Base64 is not encryption, it is encoding. Encoding is a publicly reversible conversion that anyone can decode. Real encryption requires a key and should not allow inference of plaintext from ciphertext. Base64 only changes the representation of data without any security.',
  },
  {
    q: 'Is Base64 suitable for large files? Why?',
    a: 'No. Reasons: 1) 33% size increase; 2) Encoding/decoding computational overhead; 3) Encoded text is not suitable for chunked transmission. For large files, binary format or chunked transmission is recommended. Base64 is suitable for small data like API tokens, small images, etc.',
  },
  {
    q: 'How to determine if a string is valid Base64?',
    a: '1) Length must be a multiple of 4; 2) Can only contain Base64 character set; 3) At most 2 trailing "="; 4) "=" can only be at the end. You can also try to decode and see if it correctly restores the original byte count.',
  },
  {
    q: 'How to perform Base64 encoding/decoding in browsers?',
    a: 'Use btoa() for encoding and atob() for decoding. Note these functions only support Latin1 characters. For Unicode characters, use TextEncoder/TextDecoder first.',
  },
  {
    q: 'What are common application scenarios for Base64?',
    a: '1) Email attachment encoding (MIME); 2) Data URL embedding images; 3) JWT Token Payload; 4) API binary data transmission; 5) Key and token encoding; 6) Binary data in configuration files.',
  },
];

export default function InterviewPage() {
  const { t, language } = useLanguage();
  const questions = language === 'zh' ? questionsZh : questionsEn;

  return (
    <div className="tool-container">
      <Link href="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> {t.learn.backToLearn}
      </Link>

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        {t.learn.interviewTitle}
      </h1>

      <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.learn.interviewIntro}
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
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t.learn.bonusPoints}</h2>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: '1.5rem' }}>
          <li>{t.learn.bonus1}</li>
          <li>{t.learn.bonus2}</li>
          <li>{t.learn.bonus3}</li>
          <li>{t.learn.bonus4}</li>
          <li>{t.learn.bonus5}</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/learn/comparison" className="btn btn-secondary">
          <ArrowLeft size={16} /> {t.learn.previous}
        </Link>
        <Link href="/learn/demo" className="btn btn-primary">
          {t.learn.next}：{t.learn.demo.title} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

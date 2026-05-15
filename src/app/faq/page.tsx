import Link from 'next/link';
import { HelpCircle, ChevronDown, MessageCircle, Search, BookOpen, Shield, Zap } from 'lucide-react';

export default function FAQPage() {
  const faqCategories = [
    {
      category: '基础问题',
      icon: <BookOpen size={20} />,
      questions: [
        {
          q: 'Base64是什么？',
          a: 'Base64是一种基于64个可打印字符来表示二进制数据的方法。它使用A-Z、a-z、0-9、+、/这64个字符来表示数据。Base64常用于在仅支持文本的环境（如JSON、XML、HTML）传输二进制数据，或用于在不安全的通道上安全传输数据。',
        },
        {
          q: 'Base64是加密吗？',
          a: 'Base64不是加密，而是一种编码方式。任何人都可以轻松地将Base64解码还原为原始数据。如果需要保护数据安全，应使用真正的加密算法（如AES、RSA等），而不是Base64。Base64的主要目的是将二进制数据转换为可打印的文本字符。',
        },
        {
          q: '为什么Base64编码后数据变大了？',
          a: 'Base64编码使用64个字符来表示数据，每个字符是6位（2的6次方=64）。而原始数据每字节是8位。所以Base64编码后的数据体积约为原始数据的4/3（约133%）。例如，3个字节（24位）会被编码成4个Base64字符。',
        },
        {
          q: '什么时候应该使用Base64？',
          a: '常见的Base64使用场景包括：1) 在JSON/XML中嵌入图片或其他二进制数据；2) 电子邮件附件编码（MIME标准）；3) 在URL中传输二进制数据（需要URL-safe Base64）；4) 数据签名和证书处理；5) 小程序或移动应用中内嵌资源。',
        },
      ],
    },
    {
      category: '技术问题',
      icon: <Zap size={20} />,
      questions: [
        {
          q: '标准Base64和URL-safe Base64有什么区别？',
          a: '标准Base64使用+和/两个字符，这在URL和Cookie中使用会有问题。URL-safe Base64使用-（短横线）和_（下划线）代替+，/，并且通常不加填充（=）。例如：标准Base64: "data+base64=="，URL-safe: "data-base64"',
        },
        {
          q: 'Base64编码的字符串最后为什么会有=号？',
          a: '=是Base64的填充字符。当原始数据长度不是3的倍数时，会用=来补足。1个字节补1个=，2个字节补2个=。例如："M"编码为"TQ=="，"Ma"编码为"TWE="，"Man"编码为"TWFu"。',
        },
        {
          q: 'Base64能处理多大的文件？',
          a: '理论上Base64可以处理任意大小的数据。但需要注意：1) 浏览器内存限制（大型文件可能导致浏览器卡顿）；2) 编码后的数据会增大约33%；3) 某些系统对数据大小有限制。对于超过50MB的文件，建议使用大文件处理工具，它采用分块处理方式。',
        },
        {
          q: '为什么我的中文无法正确编码？',
          a: '这通常是字符编码问题。Base64本身只处理字节，不理解字符含义。中文字符在不同编码下（如UTF-8、GBK）的字节表示不同。确保编码和解码使用相同的字符编码。我们的工具默认使用UTF-8编码，适合大多数场景。',
        },
      ],
    },
    {
      category: '隐私安全',
      icon: <Shield size={20} />,
      questions: [
        {
          q: '我的数据会上传到服务器吗？',
          a: '不会。所有转换操作都在您的浏览器本地完成，数据不会上传到任何服务器。这是我们网站的核心理念：您的数据只属于您自己。关闭页面或刷新浏览器后，所有数据都会被清除。',
        },
        {
          q: 'Base64适合存储密码吗？',
          a: '绝对不适合。Base64不是加密，任何人都可以轻松解码。如果需要存储密码，应使用专门的密码哈希算法（如bcrypt、Argon2）或加密算法（如AES）。Base64只能混淆数据，不能保护数据安全。',
        },
        {
          q: '如何检测恶意代码隐藏在Base64中？',
          a: '可以使用我们的安全检测工具来检测可能的恶意Base64编码。它会分析Base64字符串中是否包含可疑模式，如：可执行代码片段、恶意URL、编码的脚本等。但请注意，这不能保证100%检测出所有恶意代码。',
        },
      ],
    },
    {
      category: '使用问题',
      icon: <HelpCircle size={20} />,
      questions: [
        {
          q: '如何在编程中使用Base64？',
          a: '所有主流编程语言都内置了Base64支持：JavaScript: btoa()/atob() 或 Buffer；Python: base64模块；Java: Base64.getEncoder()；Go: encoding/base64包；PHP: base64_encode()。我们还提供代码生成工具，可以一键生成多种语言的Base64代码。',
        },
        {
          q: 'Base64和Hex（十六进制）有什么区别？',
          a: 'Hex使用16个字符（0-9、A-F），每个字符表示4位。Base64使用64个字符，每个字符表示6位。同样数据，Base64比Hex更紧凑（体积约为Hex的50%）。但Base64字符集更大，编码/解码稍复杂。Hex的优势是更易读、更易调试。',
        },
        {
          q: '如何批量处理多个Base64转换？',
          a: '可以使用我们的批量处理工具，支持同时处理多个文本或文件，提供批量导入导出功能，支持ZIP打包下载。也可以使用API服务进行程序化批量处理。',
        },
        {
          q: '为什么转换结果和别人的不一样？',
          a: '可能的原因：1) 字符编码不同（UTF-8 vs GBK）；2) 是否使用URL-safe Base64；3) 是否包含填充（=）；4) 换行符处理方式不同（有些实现会在每76个字符后添加换行）。请确认两边的设置一致。',
        },
      ],
    },
  ];

  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          常见问题FAQ
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          关于Base64编码解码的常见问题解答。如果找不到答案，欢迎联系我们。
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            <MessageCircle size={18} />
            联系我们
          </Link>
          <Link href="/learn" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            <BookOpen size={18} />
            学习Base64
          </Link>
        </div>
      </div>

      {/* Quick Search Hint */}
      <div className="card" style={{ marginBottom: '2rem', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Search size={24} style={{ color: 'var(--accent-color)' }} />
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              搜索提示
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              按 <kbd style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>Ctrl</kbd> + <kbd style={{ backgroundColor: 'var(--bg-tertiary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>F</kbd> 搜索页面内容，快速找到相关问题。
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
          还有其他问题？
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          如果FAQ中没有找到您需要的答案，请随时联系我们，我们会尽快回复您。
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="mailto:support@base64.club" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            发送邮件
          </a>
          <Link href="/developers" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            开发者文档
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

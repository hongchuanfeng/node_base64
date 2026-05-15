import Link from 'next/link';
import type { Metadata } from 'next';
import { Lightbulb, Code, Image, Mail, Smartphone, Database, Globe, Shield, Zap, FileText, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '使用场景 - 传道AI',
  description: '了解Base64在不同场景下的应用，包括Web开发、数据传输、邮件编码、小程序开发等。',
};

const scenarios = [
  {
    icon: <Globe size={28} />,
    title: 'Web开发',
    color: '#3b82f6',
    desc: '在前端开发中嵌入图片、字体等资源',
    details: [
      'Data URL：将小图片直接嵌入HTML/CSS，减少HTTP请求',
      'SVG图标：内联SVG代码，配合Base64传输',
      'Base64字体：嵌入自定义字体的Base64数据',
      'Web Workers：传递二进制数据',
    ],
    example: {
      input: '原始图片文件',
      output: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    },
  },
  {
    icon: <Code size={28} />,
    title: 'API数据传输',
    color: '#8b5cf6',
    desc: '在JSON请求中传输二进制数据',
    details: [
      'RESTful API：图片上传返回Base64字符串',
      'WebSocket：实时传输二进制数据',
      'GraphQL：复杂类型的数据传输',
      'Webhook回调：事件通知携带附件',
    ],
    example: {
      input: '{"avatar": "用户头像二进制"}',
      output: '{"avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."}',
    },
  },
  {
    icon: <Mail size={28} />,
    title: '邮件编码',
    color: '#10b981',
    desc: '电子邮件附件的标准编码方式',
    details: [
      'MIME标准：SMTP协议传输二进制附件',
      'HTML邮件：内嵌图片避免被拦截',
      '签名证书：邮件数字签名编码',
      '加密邮件：PGP/MIME邮件内容',
    ],
    example: {
      input: '附件文件（如PDF、图片）',
      output: 'Content-Type: image/png; name="photo.png"\nContent-Transfer-Encoding: base64\n\niVBORw0KGgo...',
    },
  },
  {
    icon: <Smartphone size={28} />,
    title: '小程序开发',
    color: '#ec4899',
    desc: '微信/支付宝小程序的资源内嵌',
    details: [
      '本地资源：无法直接访问外部图片时',
      '云开发：存储图片后返回Base64',
      'Canvas绘图：处理图像二进制数据',
      '分包加载：减少主包体积',
    ],
    example: {
      input: 'wx.cloud.uploadFile() 获取fileID',
      output: '云存储返回Base64图片数据',
    },
  },
  {
    icon: <Database size={28} />,
    title: '配置文件',
    color: '#f59e0b',
    desc: '存储二进制数据到纯文本配置',
    details: [
      'JSON配置：存储小型图片或文件',
      '环境变量：传输敏感数据',
      '数据库：BLOB字段的数据传输',
      '缓存策略：浏览器LocalStorage存储',
    ],
    example: {
      input: 'logo图片路径或URL',
      output: '"logo": "data:image/svg+xml;base64,PHN2Zy..."',
    },
  },
  {
    icon: <Shield size={28} />,
    title: '数据安全',
    color: '#ef4444',
    desc: '简单的数据混淆和传输保护',
    details: [
      'URL参数：隐藏敏感ID或短文本',
      '表单提交：简单的防爬虫措施',
      '日志脱敏：隐藏部分敏感信息',
      'Token编码：JWT Payload部分',
    ],
    example: {
      input: 'eyJzdWIiOiIxMjM0NTY3ODkwIn0= (JWT Payload)',
      output: '{"sub":"1234567890"}',
    },
  },
];

const practicalCases = [
  {
    title: 'GitHub头像API',
    desc: 'GitHub API返回的头像URL可以直接使用，无需Base64转换',
    code: 'https://avatars.githubusercontent.com/u/1234567',
  },
  {
    title: 'JSON Web Token (JWT)',
    desc: 'JWT的第二部分是Payload，通常是Base64编码的JSON',
    code: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
  },
  {
    title: 'Data URL图片',
    desc: '在HTML中直接嵌入Base64图片，减少请求数',
    code: '<img src="data:image/png;base64,iVBORw0KGgo..." />',
  },
  {
    title: '微信小程序云存储',
    desc: '云存储返回的文件需要Base64解码才能使用',
    code: 'const buffer = wx.arrayBufferToBase64(arrayBuffer)',
  },
];

export default function UseCasesPage() {
  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          使用场景
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          了解Base64在不同领域的实际应用，选择最适合您的使用方式。
        </p>
      </div>

      {/* Scenario Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {scenarios.map((scenario, index) => (
          <div key={index} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ 
              padding: '1.5rem', 
              backgroundColor: scenario.color,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{ color: 'white' }}>{scenario.icon}</div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>
                  {scenario.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>
                  {scenario.desc}
                </p>
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                {scenario.details.map((detail, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>{detail}</li>
                ))}
              </ul>
              <div style={{ 
                backgroundColor: 'var(--bg-tertiary)', 
                borderRadius: '8px', 
                padding: '1rem',
                fontSize: '0.8rem'
              }}>
                <div style={{ color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>示例：</div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-color)' }}>输入：</span>{scenario.example.input}
                </div>
                <div style={{ color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
                  <span style={{ color: 'var(--success-color)' }}>输出：</span>{scenario.example.output.substring(0, 50)}...
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Practical Cases */}
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lightbulb size={24} style={{ color: 'var(--accent-color)' }} />
          实际案例
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {practicalCases.map((item, index) => (
            <div key={index} style={{ 
              backgroundColor: 'var(--bg-tertiary)', 
              borderRadius: '8px', 
              padding: '1.25rem'
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                {item.desc}
              </p>
              <code style={{ 
                display: 'block',
                backgroundColor: 'var(--bg-primary)', 
                padding: '0.75rem', 
                borderRadius: '6px',
                fontSize: '0.85rem',
                color: 'var(--accent-color)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {item.code}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* When to Use */}
      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          什么时候用 Base64？
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <Zap size={20} style={{ color: 'var(--success-color)', marginTop: '0.2rem' }} />
            <div>
              <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>适合使用</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                <li>小文件（&lt;50KB）</li>
                <li>需要内嵌到代码中</li>
                <li>减少HTTP请求</li>
                <li>跨系统传输数据</li>
              </ul>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <Shield size={20} style={{ color: 'var(--error-color)', marginTop: '0.2rem' }} />
            <div>
              <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>不适合使用</h4>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                <li>大文件（&gt;1MB）</li>
                <li>需要安全加密</li>
                <li>频繁访问的资源</li>
                <li>对性能敏感的场景</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            立即体验工具
            <ArrowRight size={18} />
          </Link>
          <Link href="/faq" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            查看常见问题
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Terminal, Database, Globe, Shield, Mail, Image, Key, Cloud } from 'lucide-react';

const timeline = [
  {
    year: '1986',
    title: 'MIME标准诞生',
    icon: <Mail size={20} />,
    description: 'RFC 989 和 RFC 1049 首次定义了MIME（多用途互联网邮件扩展）标准，为Base64编码奠定了基础。电子邮件系统需要传输二进制附件（如图片、文档），但当时的邮件协议只支持ASCII文本，Base64因此诞生。',
    details: [
      '解决邮件系统传输二进制文件的问题',
      '定义了Base64编码的字符集和转换规则',
      '成为早期互联网数据传输的基础设施'
    ]
  },
  {
    year: '1992',
    title: 'Base64规范化',
    icon: <Database size={20} />,
    description: 'RFC 1341 正式定义了Base64编码规范，成为MIME标准的一部分。这一版本详细规定了编码算法、填充字符使用、换行规则等细节，为后来的广泛应用铺平了道路。',
    details: [
      '统一了Base64的字符映射表',
      '明确了"="作为填充字符',
      '规定了每76个字符一行的限制（用于邮件传输）'
    ]
  },
  {
    year: '1996',
    title: 'Web前端应用',
    icon: <Globe size={20} />,
    description: '随着互联网的发展，Base64开始被用于Web开发中。最常见的应用是将小图片编码嵌入HTML或CSS，减少HTTP请求次数，提升页面加载速度。data:image/png;base64,...格式成为标准。',
    details: [
      'Data URL技术让图片可直接嵌入HTML',
      '减少小文件的HTTP请求数量',
      'CSS中的Base64背景图支持'
    ]
  },
  {
    year: '2004',
    title: 'JWT令牌时代',
    icon: <Key size={20} />,
    description: 'JSON Web Token (JWT) 规范（RFC 7519）发布，Base64成为其核心组成部分。JWT的Header和Payload部分都是Base64编码的JSON，签名部分则是Base64编码的加密签名。',
    details: [
      'JWT的Payload（负载）使用Base64编码',
      '无状态认证的普及推动了Base64的广泛使用',
      'OAuth 2.0和OpenID Connect也依赖JWT'
    ]
  },
  {
    year: '2010',
    title: 'API与微服务',
    icon: <Cloud size={20} />,
    description: 'RESTful API和微服务架构的兴起，使得Base64成为数据传输的标准格式。跨语言、跨平台的API通信中，Base64是传输二进制数据（如文件、图片、加密密钥）的首选方式。',
    details: [
      'API响应中传输文件数据',
      '微服务间传递二进制消息',
      'GraphQL和gRPC中的二进制支持'
    ]
  },
  {
    year: '2015',
    title: '现代安全应用',
    icon: <Shield size={20} />,
    description: 'Base64在现代安全领域继续发挥重要作用：WebAuthn（Web认证）使用Base64编码凭证数据、HTTPS证书的某些部分使用Base64、以及各种加密库和密钥管理系统的标准格式。',
    details: [
      'WebAuthn无密码认证标准',
      'X.509证书的某些字段',
      'Web Crypto API的二进制数据处理'
    ]
  }
];

export default function HistoryPage() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1rem' }}>
          <ArrowLeft size={16} />
          返回学习中心
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Clock size={36} style={{ color: 'var(--accent-color)' }} />
          Base64发展史
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          从1986年的MIME标准到现代Web安全，Base64已经走过了近40年的历程。了解这项基础技术如何塑造了互联网的数据传输方式。
        </p>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        {/* Vertical Line */}
        <div style={{
          position: 'absolute',
          left: '7px',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: 'var(--border-color)'
        }} />

        {timeline.map((item, index) => (
          <div
            key={item.year}
            style={{
              position: 'relative',
              marginBottom: '2rem',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedYear(selectedYear === item.year ? null : item.year)}
          >
            {/* Timeline Dot */}
            <div style={{
              position: 'absolute',
              left: '-2rem',
              top: '0.5rem',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: selectedYear === item.year ? 'var(--accent-color)' : 'var(--bg-tertiary)',
              border: `2px solid ${selectedYear === item.year ? 'var(--accent-color)' : 'var(--border-color)'}`,
              transition: 'all 0.2s'
            }} />

            {/* Content */}
            <div
              className="card"
              style={{
                padding: '1.5rem',
                transition: 'all 0.2s',
                borderLeft: selectedYear === item.year ? '3px solid var(--accent-color)' : '3px solid transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: 'var(--accent-color)',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {item.year}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
                  {item.icon}
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: selectedYear === item.year ? '1rem' : 0 }}>
                {item.description}
              </p>

              {selectedYear === item.year && (
                <div style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)',
                  animation: 'fadeIn 0.2s ease'
                }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                    关键点
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                    {item.details.map((detail, i) => (
                      <li key={i} style={{ marginBottom: '0.5rem' }}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="card" style={{ marginTop: '2rem', backgroundColor: 'var(--bg-tertiary)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={20} style={{ color: 'var(--accent-color)' }} />
          发展历程总结
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>~40年</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>技术历史</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>10+</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>主流应用场景</div>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)', marginBottom: '0.25rem' }}>全球</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>互联网基础设施</div>
          </div>
        </div>
        <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Base64从最初的邮件附件编码方案，发展成为现代互联网不可或缺的基础技术。
          尽管已有近40年历史，但随着Web应用的复杂化和API经济的兴起，Base64的重要性不减反增。
          它证明了简单、清晰的设计可以经得起时间的考验。
        </p>
      </div>

      {/* Related Links */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/learn/principles" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          了解Base64原理
        </Link>
        <Link href="/learn/scenarios" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          查看应用场景
        </Link>
        <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          使用编码工具
        </Link>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

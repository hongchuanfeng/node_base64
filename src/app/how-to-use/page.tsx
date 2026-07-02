import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, FileText, Image, Globe, ArrowRight, Copy, Download, Upload, Shield, Zap, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '如何使用 - 传道AI使用指南',
  description: '详细了解如何使用传道AI的Base64在线工具，包括文本编码、文件转换、图片处理等操作指南。',
};

export default function HowToUsePage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem', textAlign: 'center' }}>
        如何使用传道AI
      </h1>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
        传道AI是一个免费的在线Base64编码解码工具，支持文本、文件、图片、URL等多种格式。
        本指南将帮助您快速上手所有功能。
      </p>

      {/* 快速开始 */}
      <div className="card" style={{ marginBottom: '2rem', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          快速开始
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <ol style={{ paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>访问 <strong>base64.club</strong> 进入首页</li>
            <li style={{ marginBottom: '0.5rem' }}>选择您需要的工具（文本/文件/图片/URL）</li>
            <li style={{ marginBottom: '0.5rem' }}>输入要转换的内容</li>
            <li>点击转换按钮获取结果</li>
          </ol>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              开始使用 →
            </Link>
          </div>
        </div>
      </div>

      {/* 文本Base64 */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          文本Base64转换
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            文本Base64是最常用的功能，适合对普通文本进行编码和解码。
          </p>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>使用步骤：</h3>
            <ol style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>进入 <Link href="/text-base64" style={{ color: 'var(--accent-color)' }}>文本Base64工具</Link> 页面</li>
              <li style={{ marginBottom: '0.5rem' }}>在左侧文本框输入您要编码的文本</li>
              <li style={{ marginBottom: '0.5rem' }}>选择编码格式（UTF-8 或 GBK）</li>
              <li style={{ marginBottom: '0.5rem' }}>点击"编码"按钮</li>
              <li>右侧将显示编码后的Base64字符串</li>
            </ol>
          </div>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>使用场景：</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>数据传输：安全传输特殊字符</li>
              <li style={{ marginBottom: '0.5rem' }}>数据存储：在不支持中文的系统中存储文本</li>
              <li style={{ marginBottom: '0.5rem' }}>URL参数：处理包含特殊字符的URL</li>
              <li>API开发：处理JSON中的二进制数据</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 文件Base64 */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Upload className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          文件Base64转换
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            支持任意类型文件的Base64转换，包括PDF、Word文档、Excel表格等。
          </p>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>使用步骤：</h3>
            <ol style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>进入 <Link href="/file-base64" style={{ color: 'var(--accent-color)' }}>文件Base64工具</Link> 页面</li>
              <li style={{ marginBottom: '0.5rem' }}>点击上传区域或拖拽文件到上传区</li>
              <li style={{ marginBottom: '0.5rem' }}>等待文件读取完成</li>
              <li style={{ marginBottom: '0.5rem' }}>复制生成的Base64字符串</li>
              <li>（可选）切换到"Base64转文件"模式下载文件</li>
            </ol>
          </div>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>使用场景：</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>邮件附件：将文件嵌入HTML邮件</li>
              <li style={{ marginBottom: '0.5rem' }}>小文件传输：API中传递小型配置文件</li>
              <li style={{ marginBottom: '0.5rem' }}>数据备份：重要配置的文本格式备份</li>
              <li>数据库存储：小型文件的二进制存储</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 图片Base64 */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Image className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          图片Base64转换
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            专门优化的图片转换工具，支持PNG、JPEG、GIF、WebP等格式。
          </p>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>使用步骤：</h3>
            <ol style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>进入 <Link href="/image-base64" style={{ color: 'var(--accent-color)' }}>图片Base64工具</Link> 页面</li>
              <li style={{ marginBottom: '0.5rem' }}>点击"选择图片"按钮或拖拽图片</li>
              <li style={{ marginBottom: '0.5rem' }}>查看实时预览和文件信息</li>
              <li style={{ marginBottom: '0.5rem' }}>点击"转换为Base64"按钮</li>
              <li>复制结果或查看CSS/HTML代码片段</li>
            </ol>
          </div>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>使用场景：</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>网页图片：减少HTTP请求</li>
              <li style={{ marginBottom: '0.5rem' }}>CSS背景图：内联到CSS中</li>
              <li style={{ marginBottom: '0.5rem' }}>小图标：Data URI替代图片文件</li>
              <li>邮件内嵌图：避免外部图片被屏蔽</li>
            </ul>
          </div>
        </div>
      </div>

      {/* URL Base64 */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          URL Base64转换
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            专门用于URL安全的Base64编码，解决URL中的特殊字符问题。
          </p>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>使用步骤：</h3>
            <ol style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>进入 <Link href="/url-base64" style={{ color: 'var(--accent-color)' }}>URL Base64工具</Link> 页面</li>
              <li style={{ marginBottom: '0.5rem' }}>输入普通文本或URL</li>
              <li style={{ marginBottom: '0.5rem' }}>点击"URL安全编码"按钮</li>
              <li>获得URL安全的Base64字符串</li>
            </ol>
          </div>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>与标准Base64的区别：</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>使用 <code style={{ backgroundColor: 'var(--bg-primary)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>-</code> 和 <code style={{ backgroundColor: 'var(--bg-primary)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>_</code> 替代 <code style={{ backgroundColor: 'var(--bg-primary)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>+</code> 和 <code style={{ backgroundColor: 'var(--bg-primary)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>/</code></li>
              <li style={{ marginBottom: '0.5rem' }}>去掉了末尾的 <code style={{ backgroundColor: 'var(--bg-primary)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>=</code> 填充符</li>
              <li>可以直接用在URL参数中</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 高级功能 */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <BookOpen className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          高级功能
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                <Link href="/batch" style={{ color: 'var(--accent-color)' }}>批量处理</Link>
              </h3>
              <p style={{ fontSize: '0.9rem' }}>一次处理多个文本或文件，大幅提高工作效率。</p>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                <Link href="/smart-base64" style={{ color: 'var(--accent-color)' }}>智能转换</Link>
              </h3>
              <p style={{ fontSize: '0.9rem' }}>AI智能识别输入内容类型，自动选择最佳转换方式。</p>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                <Link href="/analyze" style={{ color: 'var(--accent-color)' }}>内容分析</Link>
              </h3>
              <p style={{ fontSize: '0.9rem' }}>分析Base64字符串结构，检测编码格式和内容类型。</p>
            </div>
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                <Link href="/api" style={{ color: 'var(--accent-color)' }}>API服务</Link>
              </h3>
              <p style={{ fontSize: '0.9rem' }}>提供RESTful API，方便开发者集成到自己的应用中。</p>
            </div>
          </div>
        </div>
      </div>

      {/* 安全隐私 */}
      <div className="card" style={{ marginBottom: '2rem', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield className="w-6 h-6" style={{ color: 'var(--success-color)' }} />
          安全与隐私
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            <CheckCircle size={16} style={{ color: 'var(--success-color)', display: 'inline', verticalAlign: 'middle' }} />
            <strong>100%本地处理</strong> - 所有数据都在您的浏览器中处理，不会上传到服务器
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <CheckCircle size={16} style={{ color: 'var(--success-color)', display: 'inline', verticalAlign: 'middle' }} />
            <strong>无数据存储</strong> - 我们不收集、存储或分享您的任何数据
          </p>
          <p>
            <CheckCircle size={16} style={{ color: 'var(--success-color)', display: 'inline', verticalAlign: 'middle' }} />
            <strong>无追踪Cookie</strong> - 仅使用必要的技术Cookie，不进行任何追踪
          </p>
        </div>
      </div>

      {/* 常见问题 */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          常见问题
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Q: Base64编码后的数据会变大吗？</h3>
            <p style={{ fontSize: '0.95rem' }}>A: 是的，Base64编码会使数据体积增加约33%。这是因为每3个字节会被编码成4个字符。</p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Q: 编码和解码是互逆的吗？</h3>
            <p style={{ fontSize: '0.95rem' }}>A: 是的，Base64是纯编码不是加密。编码后的数据可以完全还原为原始数据。</p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Q: 我的数据安全吗？</h3>
            <p style={{ fontSize: '0.95rem' }}>A: 非常安全！所有处理都在本地浏览器完成，我们服务器完全不接触您的数据。</p>
          </div>
          
          <div>
            <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Q: 支持大文件吗？</h3>
            <p style={{ fontSize: '0.95rem' }}>A: 支持。对于超大文件（超过10MB），建议使用我们的 <Link href="/large-file" style={{ color: 'var(--accent-color)' }}>大文件处理</Link> 工具。</p>
          </div>
        </div>
      </div>

      {/* 快捷链接 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/text-base64" className="btn btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          文本Base64
          <ArrowRight size={16} />
        </Link>
        <Link href="/image-base64" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          图片Base64
          <ArrowRight size={16} />
        </Link>
        <Link href="/batch" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          批量处理
          <ArrowRight size={16} />
        </Link>
        <Link href="/faq" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          查看FAQ
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

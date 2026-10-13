import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LanguageProvider } from '@/hooks/useLanguage';

export const metadata: Metadata = {
  title: '传道AI - 免费在线Base64编码解码工具',
  description: '免费的在线Base64编码解码工具，支持文本、文件、图片Base64转换，提供多种字符编码支持（UTF-8、GBK等），无需注册，纯浏览器端处理，保护隐私。',
  keywords: 'Base64, 编码, 解码, 在线工具, 文本转换, 文件转换, 图片Base64, URL编码',
  openGraph: {
    title: '传道AI - 免费在线Base64编码解码工具',
    description: '免费的在线Base64编码解码工具，支持多种编码格式',
    url: 'https://www.base64.club/',
    siteName: '传道AI',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '传道AI Base64在线工具',
  description: '免费的在线Base64编码解码工具，支持文本、文件、图片等多种格式转换，纯浏览器端处理，保护隐私。',
  url: 'https://www.base64.club',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  permissions: 'browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  provider: {
    '@type': 'Organization',
    name: '传道AI',
    url: 'https://www.base64.club',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@base64.club',
      contactType: 'customer support',
    },
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '传道AI',
  url: 'https://www.base64.club',
  logo: 'https://www.base64.club/logo.png',
  description: '传道AI是一个专注于在线工具开发的团队，致力于为用户提供免费、高效、安全的编码解码工具。',
  email: 'support@base64.club',
  sameAs: [
    'https://github.com/base64club',
  ],
};

function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (!theme) {
                theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <ThemeScript />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([jsonLd, organizationJsonLd]),
          }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8NMLH22Y6G" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8NMLH22Y6G');
            `,
          }}
        />
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7274710287377352" crossOrigin="anonymous" />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

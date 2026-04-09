/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['zh-CN'],
    defaultLocale: 'zh-CN'
  }
};

module.exports = withPWA(nextConfig);
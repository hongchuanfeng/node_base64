import UrlBase64Tool from '@/components/UrlBase64Tool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'URL安全Base64编码 - 传道AI',
  description: '标准Base64与URL-safe Base64互转工具，说明何时需要使用URL安全编码。',
};

export default function UrlBase64Page() {
  return <UrlBase64Tool />;
}

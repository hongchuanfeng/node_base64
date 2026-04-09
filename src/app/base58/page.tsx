import Base58Tool from '@/components/Base58Tool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base58编码解码 - 传道AI',
  description: 'Base58编码解码工具，比特币地址风格编码，不含易混淆字符。',
};

export default function Base58Page() {
  return <Base58Tool />;
}

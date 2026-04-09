import Base32Tool from '@/components/Base32Tool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base32编码解码 - 传道AI',
  description: 'Base32编码解码工具，使用A-Z和2-7共32个字符表示数据。',
};

export default function Base32Page() {
  return <Base32Tool />;
}

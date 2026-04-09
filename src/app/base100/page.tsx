import Base100Tool from '@/components/Base100Tool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base100编码解码 - 传道AI',
  description: 'Base100 Emoji编码工具，趣味编码方式，仅用于娱乐演示。',
};

export default function Base100Page() {
  return <Base100Tool />;
}

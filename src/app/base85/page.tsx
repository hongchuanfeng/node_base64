import Base85Tool from '@/components/Base85Tool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base85编码解码 - 传道AI',
  description: 'Base85编码解码工具，高效编码方式，常用于PDF文件。',
};

export default function Base85Page() {
  return <Base85Tool />;
}

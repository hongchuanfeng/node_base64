import Base16Tool from '@/components/Base16Tool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base16编码解码 - 传道AI',
  description: 'Base16（十六进制）编码解码工具，使用0-9和A-F共16个字符表示数据。',
};

export default function Base16Page() {
  return <Base16Tool />;
}

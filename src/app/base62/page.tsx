import Base62Tool from '@/components/Base62Tool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base62编码解码 - 传道AI',
  description: 'Base62编码解码工具，使用0-9、A-Z、a-z共62个字符。',
};

export default function Base62Page() {
  return <Base62Tool />;
}

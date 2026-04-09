import SecurityTool from '@/components/SecurityTool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64安全检测 - 传道AI',
  description: 'Base64隐藏信息检测、AES加密+Base64组合编码，保护数据安全。',
};

export default function SecurityPage() {
  return <SecurityTool />;
}

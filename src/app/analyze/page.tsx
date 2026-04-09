import AnalyzeTool from '@/components/AnalyzeTool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64解码分析 - 传道AI',
  description: '自动识别Base64编码类型，分析内容格式和结构信息。',
};

export default function AnalyzePage() {
  return <AnalyzeTool />;
}
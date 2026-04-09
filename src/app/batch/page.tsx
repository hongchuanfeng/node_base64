import BatchTool from '@/components/BatchTool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '批量Base64处理 - 传道AI',
  description: '批量文件/文本Base64编码解码工具，支持ZIP打包导出。',
};

export default function BatchPage() {
  return <BatchTool />;
}

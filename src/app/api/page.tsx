import ApiTool from '@/components/ApiTool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API服务与代码生成 - 传道AI',
  description: '提供RESTful API服务，根据转换结果自动生成多种编程语言的代码片段。',
};

export default function ApiPage() {
  return <ApiTool />;
}
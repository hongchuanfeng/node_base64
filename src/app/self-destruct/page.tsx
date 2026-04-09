import SelfDestructTool from '@/components/SelfDestructTool';

export const metadata = {
  title: '自毁模式 - Base64工具',
  description: '处理后自动清除数据，保护敏感信息',
};

export default function SelfDestructPage() {
  return <SelfDestructTool />;
}
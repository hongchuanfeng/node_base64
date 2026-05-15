import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '开发者资源 - 传道AI',
  description: 'Base64 API文档、代码示例和SDK下载。为开发者提供完整的集成指南。',
};

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

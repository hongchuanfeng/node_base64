import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '命令行工具 - 传道AI',
  description: '下载Base64命令行工具，支持Windows、macOS、Linux。离线使用，无需打开网页。',
};

export default function CLILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import FileBase64Tool from '@/components/FileBase64Tool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '文件Base64转换 - 传道AI',
  description: '免费的在线文件Base64转换工具，支持图片、PDF等文件转换为Base64字符串，支持预览和大小对比。',
};

export default function FileBase64Page() {
  return <FileBase64Tool />;
}

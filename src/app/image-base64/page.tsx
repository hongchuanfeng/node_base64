import ImageBase64Tool from '@/components/ImageBase64Tool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '图片Base64预览 - 传道AI',
  description: '输入Base64图片字符串，实时渲染图片。支持复制图片、下载图片、显示格式信息。',
};

export default function ImageBase64Page() {
  return <ImageBase64Tool />;
}
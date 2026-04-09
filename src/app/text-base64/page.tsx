import TextBase64Tool from '@/components/TextBase64Tool';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '文本Base64编码解码 - 传道AI',
  description: '免费的在线文本Base64编码解码工具，支持UTF-8、GBK等多种字符编码，实时转换、大文本支持、拖拽上传。',
};

export default function TextBase64Page() {
  return (
    <TextBase64Tool
      title="文本Base64编码解码"
      description="文本与Base64双向转换，支持多种字符编码（UTF-8、GBK等）。实时转换、大文本支持、快捷键操作。"
    />
  );
}

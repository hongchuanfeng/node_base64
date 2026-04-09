import LargeFileProcessor from '@/components/LargeFileProcessor';

export const metadata = {
  title: '大文件处理',
  description: '支持超过10MB的大文件，带进度条显示',
};

export default function LargeFilePage() {
  return <LargeFileProcessor />;
}
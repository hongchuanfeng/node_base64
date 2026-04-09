import Base64DiffTool from '@/components/Base64DiffTool';

export const metadata = {
  title: 'Base64 Diff 对比',
  description: '对比两个Base64字符串，高亮显示差异，快速排查编码配置问题',
};

export default function Base64DiffPage() {
  return <Base64DiffTool />;
}
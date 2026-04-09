import RegexExtractTool from '@/components/RegexExtractTool';

export const metadata = {
  title: '正则提取 Base64',
  description: '从混合文本中用正则表达式提取Base64字符串',
};

export default function RegexExtractPage() {
  return <RegexExtractTool />;
}
import CodeSnippetGenerator from '@/components/CodeSnippetGenerator';

export const metadata = {
  title: '代码片段生成器',
  description: '一键生成多语言Base64编码解码代码片段',
};

export default function CodeSnippetPage() {
  return <CodeSnippetGenerator />;
}
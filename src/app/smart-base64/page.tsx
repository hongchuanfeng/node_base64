import SmartBase64Tool from '@/components/SmartBase64Tool';

export const metadata = {
  title: '智能 Base64 - 进阶功能',
  description: '支持换行控制、URL-safe转换、智能识别、代码生成',
};

export default function SmartBase64Page() {
  return <SmartBase64Tool />;
}
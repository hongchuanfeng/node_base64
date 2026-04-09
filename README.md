# 传道AI - Base64在线工具

免费、安全、快速的在线Base64编码解码工具网站。

## 功能特性

### 核心工具
- **文本Base64** - 文本与Base64双向转换，支持多种编码
- **文件Base64** - 图片、PDF等文件转Base64
- **图片预览** - Base64图片字符串实时预览
- **URL安全编码** - 标准Base64与URL-safe互转

### 衍生编码工具
- Base16（十六进制）
- Base32
- Base58（比特币风格）
- Base62
- Base85
- Base100（Emoji编码）

### 进阶功能
- 批量处理（支持ZIP导出）
- API服务与代码生成
- 解码分析
- 安全检测（AES加密）

### 教育内容
- Base64原理
- 常见场景
- 对比分析
- 面试题整理
- 交互式演示

## 技术栈

- Next.js 14
- React 18
- TypeScript
- CSS Variables (暗色/亮色主题)
- next-pwa (PWA支持)

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 项目结构

```
src/
├── app/              # Next.js App Router 页面
│   ├── text-base64/  # 各功能页面
│   ├── file-base64/
│   ├── learn/
│   └── ...
├── components/       # React 组件
├── hooks/           # 自定义 Hooks
├── lib/             # 工具函数库
└── styles/          # 全局样式
```

## 设计特点

- 🌙 **暗色模式** - 开发者友好的暗色主题
- 🔒 **隐私保护** - 纯前端实现，数据不上传服务器
- ⚡ **快捷键支持** - Ctrl+Enter 转换，Ctrl+Shift+C 复制
- 📱 **响应式设计** - 完美支持PC和移动端
- 💾 **历史记录** - 保存最近10次转换

## SEO

- Sitemap 网站地图
- Robots.txt 协议
- Google Analytics 支持
- Google Search Console 支持

## 版权信息

© 2025 传道AI · 版权所有
工业和信息化部 粤ICP备18041392号-7

## 联系方式

邮箱：support@base64.club
地址：深圳市龙华区龙华大道130栋

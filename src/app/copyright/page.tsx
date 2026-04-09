import type { Metadata } from 'next';
import Link from 'next/link';
import { Copyright, FileText, Shield, AlertTriangle, ExternalLink, Mail, Scale, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: '版权声明 - 传道AI',
  description: '传道AI版权声明，保护网站内容和知识产权。',
};

const copyrightSections = [
  {
    title: '网站内容版权',
    content: `传道AI网站（https://www.base64.club/）上的所有内容，包括但不限于文字、图片、图标、logo、代码片段、界面设计、排版布局、软件架构及其文档，均受中华人民共和国著作权法、中华人民共和国民法典及相关国际版权条约的严格保护。

    未经传道AI书面授权，任何单位和个人不得擅自复制、修改、传播、转载、镜像、盗链或以其他任何方式使用上述内容。`,
    icon: <Copyright size={24} />
  },
  {
    title: '商标与品牌保护',
    content: `以下标识均为传道AI的注册商标，受《中华人民共和国商标法》保护：

    • "传道AI" 及相关图形标识
    • "Base64.club" 及相关域名
    • "智能Base64工具" 产品名称

    未经授权，任何人不得在商业活动中使用上述商标，不得申请与上述商标相同或近似的域名或产品名称。`,
    icon: <Shield size={24} />
  },
  {
    title: '软件使用许可',
    content: `传道AI提供的在线工具供所有用户免费使用，但适用以下条款：

    ✓ 允许：个人学习、研究和日常使用
    ✓ 允许：在遵守本声明的前提下引用或链接到本网站
    ✓ 允许：非商业性质的二次创作和分享（需注明来源）
    ✗ 禁止：将工具核心功能嵌入其他网站或应用
    ✗ 禁止：未经授权的商业使用或转售
    ✗ 禁止：反向工程、反编译或提取网站源代码
    ✗ 禁止：任何损害传道AI品牌形象的行为

    如需商业授权，请联系：business@base64.club`,
    icon: <FileText size={24} />
  },
  {
    title: '用户内容与责任',
    content: `用户通过本网站上传播、提交或输入的所有内容（包括但不限于文本、图片、文件、数据）：

    • 完全属于用户个人行为，我们不会对用户内容主张任何权利
    • 用户需确保拥有该内容的合法使用权，因内容引起的纠纷由用户自行负责
    • 我们有权在法律要求或为保护合法权益的情况下披露用户信息
    • 用户应遵守当地法律法规，不得上传违法、有害或侵权内容

    用户承诺不利用本服务从事以下活动：
    • 违反任何适用的中国或国际法律或法规
    • 侵犯他人知识产权、隐私权或其他合法权益
    • 传输任何含有病毒、木马或其他有害程序的代码
    • 试图干扰、瘫痪或破坏本服务的正常运行`,
    icon: <AlertTriangle size={24} />
  },
  {
    title: '第三方内容与链接',
    content: `关于第三方链接：
    本网站可能包含指向第三方网站的链接，这些链接仅供方便用户参考。第三方网站的内容、服务或产品由第三方负责，我们对其不承担任何责任，也不作任何明示或暗示的保证。

    关于第三方服务：
    本网站可能集成或引用第三方服务（如分析工具、广告服务等），这些服务的隐私政策和数据处理方式可能与本声明不同，请参阅各第三方服务商的隐私政策。

    关于第三方内容侵权：
    如您认为本网站上链接的第三方内容侵犯了您的权益，请及时联系我们，我们将尽快处理。`,
    icon: <ExternalLink size={24} />
  },
  {
    title: '免责声明',
    content: `本声明明确声明以下免责条款：

    1. 服务可用性：本网站尽全力保持服务的持续可用性，但不能保证服务永远不会中断或出现故障。对于因服务中断造成的任何损失，我们不承担责任。

    2. 数据安全：虽然我们承诺不在服务器端存储用户数据，但用户应自行备份重要数据。用户需对通过本服务处理的数据负完全责任。

    3. 转换准确性：我们努力确保Base64编码解码的准确性，但不对因使用本工具造成的任何数据损失或损坏负责。

    4. 外部链接：我们不对通过本网站的外部链接访问的任何第三方内容负责。

    5. 变更权利：我们保留随时修改本声明的权利，修改后的声明将在本页面发布。`,
    icon: <Scale size={24} />
  },
  {
    title: '知识产权执法',
    content: `我们尊重并保护他人的知识产权，同样，我们也坚决维护自身的知识产权。

    如您发现本网站上存在侵犯您权益的内容，请提供以下信息联系我们：
    
    1. 您的详细联系信息（姓名/公司名、电话、邮箱、地址）
    2. 您主张被侵权的版权作品描述及其原件或复印件
    3. 侵权内容在本网站的具体位置（URL）
    4. 您声明该使用未经权利人或代理人授权
    5. 您声明上述信息真实准确的声明

    联系方式：support@base64.club

    我们会在收到完整通知后的7个工作日内处理。对于不符合上述要求的通知，我们可能无法处理。`,
    icon: <Mail size={24} />
  },
  {
    title: '开源组件与许可证',
    content: `传道AI网站使用以下开源组件，感谢这些开源项目的贡献者：

    Framework & Libraries:
    • Next.js - MIT License
    • React - MIT License
    • TypeScript - Apache 2.0
    • Tailwind CSS - MIT License
    • Lucide Icons - ISC License

    Fonts:
    • 系统字体栈 - 各系统自有字体

    本网站不对上述开源组件进行任何修改，所有组件均按其原始许可证使用。如有任何许可证问题，请联系我们。

    如您认为我们的开源组件使用侵犯了您的权益，请联系我们协商解决。`,
    icon: <BookOpen size={24} />
  },
];

export default function CopyrightPage() {
  return (
    <div className="tool-container">
      {/* Hero Section */}
      <div className="card" style={{ 
        textAlign: 'center', 
        marginBottom: '2rem', 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
        color: 'white' 
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          版权声明
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto 1.5rem' }}>
          保护知识产权，尊重创作者劳动成果。让我们共同维护一个健康、合法、有序的网络环境。
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '2rem', 
          flexWrap: 'wrap',
          padding: '1.5rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px'
        }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>2020-2026</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>持续运营</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>粤ICP备</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>18041392号-7</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>法律保护</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>著作权法 & 商标法</div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      {copyrightSections.map((section, index) => (
        <div key={index} className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ color: 'var(--accent-color)' }}>{section.icon}</div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {index + 1}. {section.title}
            </h2>
          </div>
          <div style={{ color: 'var(--text-secondary)', lineHeight: 2, whiteSpace: 'pre-line' }}>
            {section.content}
          </div>
        </div>
      ))}

      {/* Quick Links */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          相关法律文件
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <Link href="/privacy" style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--text-primary)'
          }}>
            <Shield size={20} color="var(--accent-color)" />
            <div>
              <div style={{ fontWeight: 600 }}>隐私政策</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>数据保护说明</div>
            </div>
          </Link>
          <Link href="/terms" style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--text-primary)'
          }}>
            <FileText size={20} color="var(--accent-color)" />
            <div>
              <div style={{ fontWeight: 600 }}>服务条款</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>使用协议</div>
            </div>
          </Link>
          <Link href="/disclaimer" style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--text-primary)'
          }}>
            <AlertTriangle size={20} color="var(--accent-color)" />
            <div>
              <div style={{ fontWeight: 600 }}>免责声明</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>责任范围</div>
            </div>
          </Link>
          <Link href="/contact" style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--text-primary)'
          }}>
            <Mail size={20} color="var(--accent-color)" />
            <div>
              <div style={{ fontWeight: 600 }}>联系我们</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>侵权投诉</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="card" style={{ 
        backgroundColor: 'var(--bg-tertiary)', 
        textAlign: 'center',
        padding: '2rem'
      }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          如对版权声明有任何疑问，请联系我们
        </p>
        <a href="mailto:support@base64.club" style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          backgroundColor: 'var(--accent-color)',
          color: 'white',
          borderRadius: '8px',
          fontWeight: 600
        }}>
          support@base64.club
        </a>
        <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
          © 2020-2026 传道AI | base64.club | 粤ICP备18041392号-7
        </p>
      </div>
    </div>
  );
}
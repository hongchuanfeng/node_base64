import Link from 'next/link';
import type { Metadata } from 'next';
import { Scale, AlertTriangle, FileText, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: '服务条款 - 传道AI',
  description: '传道AI服务条款，使用本服务前请仔细阅读，了解您的权利和义务。',
};

export default function TermsPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        服务条款
      </h1>
      <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>
        更新日期：2025年1月1日
      </p>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          1. 服务说明
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            传道AI（以下简称"我们"）提供免费的在线Base64编码解码工具及相关服务（以下简称"本服务"）。
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>服务内容包括：</strong>
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Base64在线编解码工具</li>
            <li>多种编码格式支持（Base16、32、58、64、85、100等）</li>
            <li>文本、文件、图片Base64转换</li>
            <li>批量处理功能</li>
            <li>API服务（可选）</li>
            <li>相关的学习资源和文档</li>
          </ul>
          <p style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
            <strong>重要提示：</strong> 本服务以"按原样"和"可用"为原则提供。我们不保证服务的连续性、准确性或可靠性，
            保留随时修改、暂停或终止服务的权利，恕不另行通知。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          2. 使用条件
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            在使用本服务之前，您必须：
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>同意并遵守本服务条款</li>
            <li>同意我们的隐私政策</li>
            <li>年满13周岁（或达到您所在司法管辖区的法定年龄）</li>
          </ul>
          <p>
            如果您代表公司或其他组织使用本服务，您声明并保证您有权使该实体受本条款约束。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          3. 使用规范
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>您同意：</strong>
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>仅将本服务用于合法目的</li>
            <li>不利用本服务进行任何违法活动</li>
            <li>不试图破解、反向工程或以任何方式破坏本服务</li>
            <li>不向本服务上传或传输任何恶意代码、病毒或有害内容</li>
            <li>不利用自动化工具大规模访问或使用本服务（未经我们书面许可）</li>
            <li>不对本服务进行压力测试或造成服务器过载</li>
            <li>不绕过我们可能采用的任何访问限制或技术保护措施</li>
            <li>不将本服务用于任何侵犯他人知识产权的活动</li>
          </ul>

          <p style={{ marginBottom: '1rem' }}>
            <strong>您不得：</strong>
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>复制、修改、出售或商业化本服务或相关内容</li>
            <li>创建与本服务竞争的产品或服务</li>
            <li>冒充我们或我们的关联公司</li>
            <li>收集用户信息或进行未经授权的数据抓取</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle className="w-6 h-6" style={{ color: 'var(--error-color)' }} />
          4. 禁止用途
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            明确禁止使用本服务从事以下活动：
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>任何形式的网络攻击、入侵或破坏行为</li>
            <li>传播恶意软件、病毒或任何有害代码</li>
            <li>未经授权访问他人系统或数据</li>
            <li>进行任何欺诈或欺骗活动</li>
            <li>侵犯隐私或进行未经授权的监控</li>
            <li>发送垃圾邮件或进行大规模未经请求的通信</li>
            <li>任何可能造成他人伤害或损失的活动</li>
          </ul>
          <p style={{ marginTop: '1rem', color: 'var(--error-color)' }}>
            违反此条款可能导致您的访问权限被立即终止，并可能面临法律追究。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          5. API服务条款
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            如果您使用我们的API服务（需要单独申请），还须遵守以下规定：
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>遵守API调用频率限制</li>
            <li>妥善保管您的API密钥，不得泄露给第三方</li>
            <li>不得将API用于超出授权范围的应用</li>
            <li>在应用中明确标注使用了我们的服务</li>
            <li>承担因API使用产生的所有责任</li>
          </ul>
          <p>
            API服务可能需要付费或有限制，具体请参阅API文档或联系商务合作。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          6. 知识产权
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>我们的权利：</strong>
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>网站名称、标识、设计和内容受版权保护</li>
            <li>所有工具算法和技术实现是我们的专有财产</li>
            <li>保留本条款未明确授予的所有权利</li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>
            <strong>您的权利：</strong>
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>您保留通过本服务处理的数据的所有权</li>
            <li>您可以使用转换后的结果用于任何合法目的</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          7. 服务变更和终止
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>我们保留以下权利：</strong>
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>随时修改或停止提供本服务（或部分功能）</li>
            <li>随时修改本服务条款，恕不另行通知</li>
            <li>对违反条款的用户拒绝或终止服务</li>
            <li>对滥用服务的行为采取合理措施</li>
          </ul>
          <p>
            对于重大服务变更，我们会尽可能提前通知用户，但保留在紧急情况下立即实施变更的权利。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Scale className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          8. 免责声明
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            在适用法律允许的最大范围内：
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>本服务按"原样"提供，不提供任何明示或暗示的保证</li>
            <li>我们不对服务的准确性、完整性或可靠性做任何保证</li>
            <li>我们不对使用本服务产生的任何直接或间接损失负责</li>
            <li>用户自行承担使用本服务的风险和责任</li>
          </ul>
          <p style={{ marginTop: '1rem', backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
            <strong>特别说明：</strong> 我们是一个编码解码工具网站，不对用户转换的数据内容负责。
            用户应确保其有权处理相关数据，并理解转换结果的法律和技术影响。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          9. 责任限制
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            在任何情况下，我们不对以下损失承担责任：
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>利润损失、收入损失或预期 savings 损失</li>
            <li>数据丢失或损坏</li>
            <li>业务中断或合同损失</li>
            <li>因使用或无法使用服务导致的任何间接、偶然或特殊损害</li>
            <li>即使已被告知可能发生此类损害</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            我们的总责任在任何情况下不超过您向我们支付的金额（如有），或人民币100元，以较高者为准。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          10. 适用法律和争议解决
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            本条款受中华人民共和国法律管辖。因本服务引起的任何争议，双方应首先通过友好协商解决。
            协商不成的，任何一方均可向<strong>深圳市龙华区人民法院</strong>提起诉讼。
          </p>
          <p>
            如果本条款的任何部分被认定为无效或不可执行，该部分应在允许的最大范围内执行，
            其他条款继续保持完全效力。
          </p>
        </div>
      </div>

      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Mail className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          联系我们
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            如果您对本服务条款有任何问题或建议，请联系我们：
          </p>
          <p>
            <strong>邮箱：</strong> <a href="mailto:legal@base64.club" style={{ color: 'var(--accent-color)' }}>legal@base64.club</a>
          </p>
          <p style={{ marginTop: '1rem' }}>
            <strong>商务合作：</strong> <a href="mailto:business@base64.club" style={{ color: 'var(--accent-color)' }}>business@base64.club</a>
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/privacy" className="btn btn-secondary" style={{ marginRight: '1rem' }}>
          查看隐私政策
        </Link>
        <Link href="/" className="btn btn-primary">
          立即体验工具
        </Link>
      </div>
    </div>
  );
}
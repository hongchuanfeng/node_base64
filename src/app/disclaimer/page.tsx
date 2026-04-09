import Link from 'next/link';
import type { Metadata } from 'next';
import { AlertCircle, Shield, Info, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: '免责声明 - 传道AI',
  description: '传道AI免责声明，详细说明使用本服务的风险和责任限制。',
};

export default function DisclaimerPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        免责声明
      </h1>
      <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>
        更新日期：2025年1月1日
      </p>

      <div className="card" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--error-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle className="w-6 h-6" />
          重要提示
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          使用传道AI的任何服务即表示您同意本免责声明的全部内容。
          请在使用前仔细阅读，确保您理解并接受其中的条款。
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          1. 服务按"原样"提供
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            传道AI的所有工具和服务均按"原样"和"可用"的方式提供，不提供任何明示或暗示的保证，包括但不限于：
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>适销性保证</strong> - 不保证本服务适合任何特定目的</li>
            <li><strong>准确性保证</strong> - 不保证转换结果的绝对准确性</li>
            <li><strong>可靠性保证</strong> - 不保证服务的持续可用性</li>
            <li><strong>无侵权保证</strong> - 不保证使用本服务不会侵犯第三方权益</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            我们明确声明不对以下事项承担责任：任何因使用、无法使用或依赖本服务而产生的任何直接或间接损失。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          2. 用户责任
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong>您应对以下事项负完全责任：</strong>
          </p>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>确保您有权处理相关的文本、文件或数据</li>
              <li style={{ marginBottom: '0.5rem' }}>在使用前妥善备份原始数据</li>
              <li style={{ marginBottom: '0.5rem' }}>理解转换结果可能带来的技术、法律或业务影响</li>
              <li style={{ marginBottom: '0.5rem' }}>对转换结果进行必要的验证和测试</li>
              <li>遵守适用的法律法规</li>
            </ul>
          </div>
          <p style={{ color: 'var(--error-color)' }}>
            重要：我们不对用户使用本服务转换的任何数据内容负责。用户需自行承担使用结果的责任。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          3. 数据处理风险
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            使用编码解码工具存在以下固有风险：
          </p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>数据损坏风险</h3>
              <p style={{ fontSize: '0.9rem' }}>不正确的编码解码操作可能导致数据损坏或丢失。请务必在使用前备份原始数据。</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>体积增加</h3>
              <p style={{ fontSize: '0.9rem' }}>Base64编码后体积会增加约33%。对于大文件，请注意存储空间的增加可能导致的问题。</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>编码选择</h3>
              <p style={{ fontSize: '0.9rem' }}>不同的编码格式有不同的特性和限制。请根据实际需求选择合适的编码方式。</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          4. 责任限制
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            在适用法律允许的最大范围内，传道AI及其创始人、员工、合作伙伴和关联公司不对以下情况承担责任：
          </p>
          <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '8px' }}>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>因使用或无法使用本服务而产生的任何直接、间接、偶然或特殊损害</li>
              <li style={{ marginBottom: '0.5rem' }}>任何数据丢失、利润损失或业务中断</li>
              <li style={{ marginBottom: '0.5rem' }}>因用户操作失误、输入错误或软件缺陷导致的数据损坏或丢失</li>
              <li style={{ marginBottom: '0.5rem' }}>因第三方行为、黑客攻击或不可抗力造成的影响</li>
              <li style={{ marginBottom: '0.5rem' }}>因服务中断、维护或升级导致的损失</li>
              <li>任何因依赖本服务的准确性、可靠性或性能而产生的损失</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          5. 安全说明
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            <strong style={{ color: 'var(--accent-color)' }}>重要安全提示：</strong>
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Base64不是加密：</strong> 任何人都可以轻松解码Base64编码的内容。
              <strong style={{ color: 'var(--error-color)' }}>请勿使用Base64来保护敏感数据。</strong>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>密码和密钥：</strong> 切勿将密码、私钥或其他敏感凭证通过未经加密的渠道传输
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>文件安全：</strong> 上传到本服务的文件仅在浏览器本地处理，不会发送到服务器
            </li>
            <li>
              <strong>隐私保护：</strong> 虽然我们是纯前端工具，但在处理高度敏感信息时，请自行评估风险
            </li>
          </ul>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
            <p style={{ margin: 0, color: 'var(--error-color)' }}>
              <strong>警告：</strong> 如果您需要保护数据安全，请使用专业的加密工具和方法，
              而不是Base64编码。Base64只能用于数据格式转换，不能提供任何安全保障。
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          6. 第三方内容和链接
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            本服务可能包含指向第三方网站的链接。这些链接仅供参考，我们不对第三方网站的内容、
            准确性或隐私实践负责。
          </p>
          <p>
            用户访问第三方网站需自行承担风险，并遵守该网站的使用条款和隐私政策。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          7. 服务可用性
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            我们不保证本服务的持续可用性。我们可能因以下原因暂停或终止服务：
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>计划内或紧急维护</li>
            <li>服务器或基础设施问题</li>
            <li>不可抗力因素（如自然灾害、网络攻击等）</li>
            <li>法律或监管要求</li>
            <li>业务决策</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            对于因服务中断造成的任何损失，我们不承担责任。建议用户不要将本服务作为唯一的数据处理方式。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          8. 适用法律
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            本免责声明受中华人民共和国法律管辖。用户使用本服务即表示同意，
            因本免责声明引起的或与其相关的任何争议，应提交至<strong>深圳市龙华区人民法院</strong>管辖。
          </p>
          <p>
            如果本免责声明的任何条款被认定为无效或不可执行，
            该条款应在允许的最大范围内执行，其余条款继续保持完全效力。
          </p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          9. 赔偿
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p>
            用户同意赔偿并使传道AI及其关联公司、员工和合作伙伴免受因以下原因产生的任何索赔、
            损害、损失或费用（包括合理的律师费）：
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
            <li>用户违反本免责声明或服务条款</li>
            <li>用户滥用或不当使用本服务</li>
            <li>用户侵犯任何第三方的权利</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info className="w-6 h-6" style={{ color: 'var(--accent-color)' }} />
          联系我们
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <p style={{ marginBottom: '1rem' }}>
            如果您对本免责声明有任何疑问，请联系我们：
          </p>
          <p>
            <strong>邮箱：</strong> <a href="mailto:legal@base64.club" style={{ color: 'var(--accent-color)' }}>legal@base64.club</a>
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/terms" className="btn btn-secondary" style={{ marginRight: '1rem' }}>
          查看服务条款
        </Link>
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
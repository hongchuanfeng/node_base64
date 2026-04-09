import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Base64对比分析 - 传道AI',
  description: 'Base64 vs Base32 vs Base58 vs Hex，对比不同编码方式的特点和使用场景。',
};

export default function ComparisonPage() {
  return (
    <div className="tool-container">
      <Link href="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> 返回学习中心
      </Link>

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
        对比分析
      </h1>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>编码对比表</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>编码</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>字符集</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>膨胀率</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>特点</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600' }}>Base16 (Hex)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace' }}>0-9, A-F (16)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>2x</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>最简单，人类可读</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600' }}>Base32</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace' }}>A-Z, 2-7 (32)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>1.6x</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>大小写不敏感，邮件友好</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600' }}>Base64</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace' }}>A-Z, a-z, 0-9, +, / (64)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>1.33x</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>最常用，效率高</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontWeight: '600' }}>Base58</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace' }}>A-Z, a-z, 0-9, -, _ (58)</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>~1.38x</td>
                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>无歧义字符，区块链常用</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Base16 (Hex)</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          最简单的编码方式，每4位二进制对应一个十六进制字符。
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem' }}>
          <div><strong>示例:</strong> "Hi" → 0x48 0x69 → <code>4869</code></div>
          <div style={{ marginTop: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            特点：人类可读，常用于调试、颜色值、MAC地址等
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Base32</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          字符集不包含小写字母，避免大小写混淆，常用于DNS、安全令牌。
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem' }}>
          <div><strong>示例:</strong> "Hi" → <code>JBSWY3DP</code></div>
          <div style={{ marginTop: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            特点：大小写不敏感，适合语音传输、系统不区分大小写的场景
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Base58</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          移除了易混淆的字符：0（零）、O（大写O）、I（大写I）、l（小写L）。
          主要用于区块链地址。
        </p>
        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '1rem' }}>
          <div><strong>字符集:</strong> <code>123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz</code></div>
          <div style={{ marginTop: '0.5rem', color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
            应用：比特币地址、以太坊地址、IPFS CID
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>选择建议</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <strong>需要人类读写：</strong> Hex（调试、配置）
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <strong>数据传输/存储：</strong> Base64（最通用）
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <strong>区块链地址：</strong> Base58Check
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <strong>URL安全需求：</strong> Base64URL（替换 +/ 为 -_）
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/learn/scenarios" className="btn btn-secondary">
          <ArrowLeft size={16} /> 上一课
        </Link>
        <Link href="/learn/interview" className="btn btn-primary">
          下一课：面试题整理 <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
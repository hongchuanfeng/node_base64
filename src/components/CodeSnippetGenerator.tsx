'use client';

import { useState } from 'react';
import { encodeBase64, decodeBase64 } from '@/lib/base64';
import { Copy, Code, Check } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/Toast';

const languages = [
  { name: 'JavaScript', icon: 'JS', color: '#f7df1e' },
  { name: 'Python', icon: 'PY', color: '#3776ab' },
  { name: 'Java', icon: 'JV', color: '#007396' },
  { name: 'C#', icon: 'C#', color: '#68217a' },
  { name: 'Go', icon: 'GO', color: '#00add8' },
  { name: 'PHP', icon: 'PHP', color: '#777bb4' },
  { name: 'Ruby', icon: 'RB', color: '#cc342d' },
  { name: 'Swift', icon: 'SW', color: '#fa7343' },
  { name: 'Kotlin', icon: 'KT', color: '#7f52ff' },
  { name: 'Rust', icon: 'RS', color: '#dea584' },
];

const codeTemplates: Record<string, { encode: (str: string) => string; decode: (str: string) => string }> = {
  'JavaScript': {
    encode: (str) => `const text = "${str}";
const encoded = btoa(unescape(encodeURIComponent(text)));
console.log(encoded);`,
    decode: (str) => `const base64 = "${str}";
const decoded = decodeURIComponent(escape(atob(base64)));
console.log(decoded);`,
  },
  'Python': {
    encode: (str) => `import base64

text = "${str}"
encoded = base64.b64encode(text.encode('utf-8')).decode('utf-8')
print(encoded)`,
    decode: (str) => `import base64

base64_str = "${str}"
decoded = base64.b64decode(base64_str).decode('utf-8')
print(decoded)`,
  },
  'Java': {
    encode: (str) => `import java.util.Base64;

public class Base64Example {
    public static void main(String[] args) {
        String text = "${str}";
        String encoded = Base64.getEncoder().encodeToString(text.getBytes());
        System.out.println(encoded);
    }
}`,
    decode: (str) => `import java.util.Base64;

public class Base64Example {
    public static void main(String[] args) {
        String base64 = "${str}";
        byte[] decodedBytes = Base64.getDecoder().decode(base64);
        String decoded = new String(decodedBytes);
        System.out.println(decoded);
    }
}`,
  },
  'C#': {
    encode: (str) => `using System;
using System.Text;

public class Base64Example {
    public static void Main() {
        string text = "${str}";
        string encoded = Convert.ToBase64String(Encoding.UTF8.GetBytes(text));
        Console.WriteLine(encoded);
    }
}`,
    decode: (str) => `using System;
using System.Text;

public class Base64Example {
    public static void Main() {
        string base64 = "${str}";
        byte[] decodedBytes = Convert.FromBase64String(base64);
        string decoded = Encoding.UTF8.GetString(decodedBytes);
        Console.WriteLine(decoded);
    }
}`,
  },
  'Go': {
    encode: (str) => `package main

import (
    "encoding/base64"
    "fmt"
)

func main() {
    text := "${str}"
    encoded := base64.StdEncoding.EncodeToString([]byte(text))
    fmt.Println(encoded)
}`,
    decode: (str) => `package main

import (
    "encoding/base64"
    "fmt"
    "errors"
)

func main() {
    base64Str := "${str}"
    decoded, err := base64.StdEncoding.DecodeString(base64Str)
    if err != nil {
        panic(err)
    }
    fmt.Println(string(decoded))
}`,
  },
  'PHP': {
    encode: (str) => `<?php
$text = "${str}";
$encoded = base64_encode($text);
echo $encoded;`,
    decode: (str) => `<?php
$base64 = "${str}";
$decoded = base64_decode($base64);
echo $decoded;`,
  },
  'Ruby': {
    encode: (str) => `require 'base64'

text = "${str}"
encoded = Base64.strict_encode64(text)
puts encoded`,
    decode: (str) => `require 'base64'

base64_str = "${str}"
decoded = Base64.strict_decode64(base64_str)
puts decoded`,
  },
  'Swift': {
    encode: (str) => `import Foundation

let text = "${str}"
if let data = text.data(using: .utf8) {
    let encoded = data.base64EncodedString()
    print(encoded)
}`,
    decode: (str) => `import Foundation

let base64 = "${str}"
if let data = Data(base64EncodedString: base64) {
    let decoded = String(data: data, encoding: .utf8)
    print(decoded ?? "")
}`,
  },
  'Kotlin': {
    encode: (str) => `import java.util.Base64

fun main() {
    val text = "${str}"
    val encoded = Base64.getEncoder().encodeToString(text.toByteArray())
    println(encoded)
}`,
    decode: (str) => `import java.util.Base64

fun main() {
    val base64 = "${str}"
    val decoded = String(Base64.getDecoder().decode(base64))
    println(decoded)
}`,
  },
  'Rust': {
    encode: (str) => `use base64::{engine::general_purpose::STANDARD, Engine};

fn main() {
    let text = "${str}";
    let encoded = STANDARD.encode(text.as_bytes());
    println!("{}", encoded);
}`,
    decode: (str) => `use base64::{engine::general_purpose::STANDARD, Engine};

fn main() {
    let base64 = "${str}";
    let decoded = STANDARD.decode(base64).unwrap();
    let text = String::from_utf8(decoded).unwrap();
    println!("{}", text);
}`,
  },
};

export default function CodeSnippetGenerator() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [selectedLang, setSelectedLang] = useState('JavaScript');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toasts, showToast } = useToast();

  const getOutput = () => {
    if (!input.trim()) return '';
    try {
      if (mode === 'encode') {
        return encodeBase64(input, 'utf-8');
      } else {
        return decodeBase64(input.replace(/\s/g, ''), 'utf-8');
      }
    } catch {
      return '解码错误：不是有效的 Base64 字符串';
    }
  };

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      showToast('已复制到剪贴板', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast('复制失败', 'error');
    }
  };

  const handleCopyAll = async () => {
    const allCode = languages.map(lang => {
      const template = codeTemplates[lang.name];
      return `// ${lang.name}\n${mode === 'encode' ? template.encode(input) : template.decode(input)}`;
    }).join('\n\n');

    await handleCopy(allCode, 'all');
  };

  const output = getOutput();
  const template = codeTemplates[selectedLang];

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          一键生成代码片段
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          输入文本或 Base64 字符串，自动生成多语言代码示例，点击即可复制
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 500 }}>操作模式：</span>
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '4px' }}>
            <button
              onClick={() => setMode('encode')}
              className={mode === 'encode' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ minWidth: '100px' }}
            >
              编码 (Encode)
            </button>
            <button
              onClick={() => setMode('decode')}
              className={mode === 'decode' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ minWidth: '100px' }}
            >
              解码 (Decode)
            </button>
          </div>
        </div>
      </div>

      {/* Input & Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            输入 {mode === 'encode' ? '原文' : 'Base64'}
          </h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入 Base64 字符串...'}
            className="input-field"
            style={{ minHeight: '150px', fontFamily: 'monospace' }}
          />
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            预览 {mode === 'encode' ? 'Base64 结果' : '解码结果'}
          </h3>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            minHeight: '150px',
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            color: output.startsWith('解码错误') ? 'var(--error-color)' : 'var(--accent-color)'
          }}>
            {output || '预览结果将在此显示...'}
          </div>
        </div>
      </div>

      {/* Language Selection */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>选择编程语言</h3>
          <button className="btn btn-primary" onClick={handleCopyAll}>
            <Copy size={14} />
            复制全部代码
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {languages.map((lang) => (
            <button
              key={lang.name}
              onClick={() => setSelectedLang(lang.name)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: selectedLang === lang.name ? lang.color : 'var(--bg-tertiary)',
                color: selectedLang === lang.name ? 'white' : 'var(--text-primary)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: selectedLang === lang.name ? 600 : 400,
                transition: 'all 0.2s'
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Code Snippets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
        {languages.map((lang) => {
          const code = mode === 'encode' 
            ? codeTemplates[lang.name].encode(input || '示例文本')
            : codeTemplates[lang.name].decode(input || 'SGVsbG8gV29ybGQ=');
          
          return (
            <div key={lang.name} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: lang.color,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.7rem'
                  }}>
                    {lang.icon}
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{lang.name}</span>
                </div>
                <button
                  onClick={() => handleCopy(code, lang.name)}
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                >
                  {copiedId === lang.name ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === lang.name ? '已复制' : '复制'}
                </button>
              </div>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '8px',
                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                fontSize: '0.8rem',
                overflow: 'auto',
                maxHeight: '300px',
                margin: 0,
                color: 'var(--text-secondary)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all'
              }}>
                {code}
              </pre>
            </div>
          );
        })}
      </div>

      {/* Note */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>使用说明</h3>
        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: 2 }}>
          <li>选择编码或解码模式</li>
          <li>输入要处理的文本或 Base64 字符串</li>
          <li>查看所有语言的代码示例，点击任意语言卡片上的复制按钮</li>
          <li>或点击"复制全部代码"一次性复制所有语言</li>
          <li>注意：Rust 代码需要添加 <code style={{ background: 'var(--bg-tertiary)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>base64</code> 依赖</li>
        </ul>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}
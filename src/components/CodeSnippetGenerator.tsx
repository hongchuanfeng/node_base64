'use client';

import { useState } from 'react';
import { encodeBase64, decodeBase64 } from '@/lib/base64';
import { Copy, Check } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/Toast';
import { useLanguage } from '@/hooks/useLanguage';

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
  const { t } = useLanguage();
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
      return t.codeSnippet.decodeError;
    }
  };

  const handleCopy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      showToast(t.common.copiedToClipboard, 'success');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast(t.common.copyFailed, 'error');
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
          {t.codeSnippet.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t.codeSnippet.subtitle}
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 500 }}>{t.codeSnippet.operationMode}:</span>
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', padding: '4px' }}>
            <button
              onClick={() => setMode('encode')}
              className={mode === 'encode' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ minWidth: '100px' }}
            >
              {t.codeSnippet.encode}
            </button>
            <button
              onClick={() => setMode('decode')}
              className={mode === 'decode' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ minWidth: '100px' }}
            >
              {t.codeSnippet.decode}
            </button>
          </div>
        </div>
      </div>

      {/* Input & Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {t.codeSnippet.inputPlaintext} {mode === 'encode' ? t.codeSnippet.inputPlaintext : t.codeSnippet.inputBase64}
          </h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? t.codeSnippet.inputPlaceholderEncode : t.codeSnippet.inputPlaceholderDecode}
            className="input-field"
            style={{ minHeight: '150px', fontFamily: 'monospace' }}
          />
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {t.codeSnippet.preview} {mode === 'encode' ? t.codeSnippet.previewBase64Result : t.codeSnippet.previewDecodeResult}
          </h3>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            minHeight: '150px',
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            color: output.startsWith(t.codeSnippet.decodeError) ? 'var(--error-color)' : 'var(--accent-color)'
          }}>
            {output || t.codeSnippet.previewResultHint}
          </div>
        </div>
      </div>

      {/* Language Selection */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.codeSnippet.selectLanguage}</h3>
          <button className="btn btn-primary" onClick={handleCopyAll}>
            <Copy size={14} />
            {t.codeSnippet.copyAllCode}
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
            ? codeTemplates[lang.name].encode(input || 'Hello World')
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
                  {copiedId === lang.name ? t.codeSnippet.copied : t.codeSnippet.copy}
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
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>{t.codeSnippet.usageInstructions}</h3>
        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: 2 }}>
          <li>{t.codeSnippet.usageStep1}</li>
          <li>{t.codeSnippet.usageStep2}</li>
          <li>{t.codeSnippet.usageStep3}</li>
          <li>{t.codeSnippet.usageStep4}</li>
          <li>{t.codeSnippet.usageStep5}</li>
        </ul>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

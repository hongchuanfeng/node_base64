'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Code, Package, ArrowRight, Copy, Check, Zap, Globe, FileCode } from 'lucide-react';
import { useState } from 'react';

const languages = [
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    codeZh: `// Node.js / 浏览器
const text = 'Hello World';
const encoded = Buffer.from(text).toString('base64');
const decoded = Buffer.from(encoded, 'base64').toString('utf8');

// 浏览器原生
const encoded = btoa('Hello World');
const decoded = atob('SGVsbG8gV29ybGQ=');`,
    codeEn: `// Node.js / Browser
const text = 'Hello World';
const encoded = Buffer.from(text).toString('base64');
const decoded = Buffer.from(encoded, 'base64').toString('utf8');

// Native browser
const encoded = btoa('Hello World');
const decoded = atob('SGVsbG8gV29ybGQ=');`,
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    codeZh: `import base64

text = 'Hello World'
encoded = base64.b64encode(text.encode('utf-8')).decode('utf-8')
decoded = base64.b64decode(encoded).decode('utf-8')

# URL-safe Base64
encoded = base64.urlsafe_b64encode(text.encode('utf-8')).decode('utf-8')`,
    codeEn: `import base64

text = 'Hello World'
encoded = base64.b64encode(text.encode('utf-8')).decode('utf-8')
decoded = base64.b64decode(encoded).decode('utf-8')

# URL-safe Base64
encoded = base64.urlsafe_b64encode(text.encode('utf-8')).decode('utf-8')`,
  },
  {
    id: 'go',
    name: 'Go',
    icon: '🔵',
    codeZh: `package main

import (
    "encoding/base64"
    "fmt"
)

func main() {
    text := "Hello World"
    
    // 编码
    encoded := base64.StdEncoding.EncodeToString([]byte(text))
    
    // 解码
    decoded, _ := base64.StdEncoding.DecodeString(encoded)
    fmt.Println(string(decoded))
    
    // URL-safe Base64
    urlEncoded := base64.URLEncoding.EncodeToString([]byte(text))
}`,
    codeEn: `package main

import (
    "encoding/base64"
    "fmt"
)

func main() {
    text := "Hello World"
    
    // Encode
    encoded := base64.StdEncoding.EncodeToString([]byte(text))
    
    // Decode
    decoded, _ := base64.StdEncoding.DecodeString(encoded)
    fmt.Println(string(decoded))
    
    // URL-safe Base64
    urlEncoded := base64.URLEncoding.EncodeToString([]byte(text))
}`,
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    codeZh: `import java.util.Base64;

public class Base64Example {
    public static void main(String[] args) {
        String text = "Hello World";
        
        // 编码
        String encoded = Base64.getEncoder().encodeToString(text.getBytes());
        
        // 解码
        String decoded = new String(Base64.getDecoder().decode(encoded));
        
        // URL-safe Base64
        String urlEncoded = Base64.getUrlEncoder().encodeToString(text.getBytes());
    }
}`,
    codeEn: `import java.util.Base64;

public class Base64Example {
    public static void main(String[] args) {
        String text = "Hello World";
        
        // Encode
        String encoded = Base64.getEncoder().encodeToString(text.getBytes());
        
        // Decode
        String decoded = new String(Base64.getDecoder().decode(encoded));
        
        // URL-safe Base64
        String urlEncoded = Base64.getUrlEncoder().encodeToString(text.getBytes());
    }
}`,
  },
  {
    id: 'csharp',
    name: 'C#',
    icon: '🟣',
    codeZh: `using System;
using System.Text;
using System.Text.Json;

class Program
{
    static void Main()
    {
        string text = "Hello World";
        
        // 编码
        byte[] bytes = Encoding.UTF8.GetBytes(text);
        string encoded = Convert.ToBase64String(bytes);
        
        // 解码
        byte[] decodedBytes = Convert.FromBase64String(encoded);
        string decoded = Encoding.UTF8.GetString(decodedBytes);
    }
}`,
    codeEn: `using System;
using System.Text;
using System.Text.Json;

class Program
{
    static void Main()
    {
        string text = "Hello World";
        
        // Encode
        byte[] bytes = Encoding.UTF8.GetBytes(text);
        string encoded = Convert.ToBase64String(bytes);
        
        // Decode
        byte[] decodedBytes = Convert.FromBase64String(encoded);
        string decoded = Encoding.UTF8.GetString(decodedBytes);
    }
}`,
  },
  {
    id: 'php',
    name: 'PHP',
    icon: '🐘',
    codeZh: `<?php
$text = 'Hello World';

// 编码
$encoded = base64_encode($text);

// 解码
$decoded = base64_decode($encoded);

// URL-safe Base64
$urlEncoded = str_replace(['+', '/', '='], ['-', '_', ''], $encoded);`,
    codeEn: `<?php
$text = 'Hello World';

// Encode
$encoded = base64_encode($text);

// Decode
$decoded = base64_decode($encoded);

// URL-safe Base64
$urlEncoded = str_replace(['+', '/', '='], ['-', '_', ''], $encoded);`,
  },
  {
    id: 'rust',
    name: 'Rust',
    icon: '🦀',
    codeZh: `use base64::{engine::general_purpose, Engine};

fn main() {
    let text = "Hello World";
    
    // 编码
    let encoded = general_purpose::STANDARD.encode(text.as_bytes());
    
    // 解码
    let decoded = general_purpose::STANDARD.decode(&encoded).unwrap();
    let result = String::from_utf8(decoded).unwrap();
    
    // URL-safe Base64
    let url_encoded = general_purpose::URL_SAFE.encode(text.as_bytes());
}`,
    codeEn: `use base64::{engine::general_purpose, Engine};

fn main() {
    let text = "Hello World";
    
    // Encode
    let encoded = general_purpose::STANDARD.encode(text.as_bytes());
    
    // Decode
    let decoded = general_purpose::STANDARD.decode(&encoded).unwrap();
    let result = String::from_utf8(decoded).unwrap();
    
    // URL-safe Base64
    let url_encoded = general_purpose::URL_SAFE.encode(text.as_bytes());
}`,
  },
  {
    id: 'swift',
    name: 'Swift',
    icon: '🧡',
    codeZh: `import Foundation

let text = "Hello World"
let data = Data(text.utf8)

// 编码
let encoded = data.base64EncodedString()

// 解码
if let decodedData = Data(base64Encoded: encoded) {
    let decoded = String(data: decodedData, encoding: .utf8)
}

// URL-safe Base64
let urlEncoded = data.base64EncodedString(options: .lineLength64Characters, header: false)`,
    codeEn: `import Foundation

let text = "Hello World"
let data = Data(text.utf8)

// Encode
let encoded = data.base64EncodedString()

// Decode
if let decodedData = Data(base64Encoded: encoded) {
    let decoded = String(data: decodedData, encoding: .utf8)
}

// URL-safe Base64
let urlEncoded = data.base64EncodedString(options: .lineLength64Characters, header: false)`,
  },
];

const apiEndpoints = [
  {
    method: 'GET',
    endpoint: '/api/v1/encode',
    params: [
      { name: 'text', type: 'string', required: true },
      { name: 'encoding', type: 'string', required: false },
    ],
  },
  {
    method: 'GET',
    endpoint: '/api/v1/decode',
    params: [
      { name: 'base64', type: 'string', required: true },
      { name: 'encoding', type: 'string', required: false },
    ],
  },
  {
    method: 'POST',
    endpoint: '/api/v1/file/encode',
    params: [
      { name: 'file', type: 'file', required: true },
    ],
  },
  {
    method: 'POST',
    endpoint: '/api/v1/file/decode',
    params: [
      { name: 'base64', type: 'string', required: true },
      { name: 'filename', type: 'string', required: true },
    ],
  },
];

const sdks = [
  { name: 'Node.js SDK', color: '#22c55e', link: 'npm install @base64club/sdk' },
  { name: 'Python SDK', color: '#3b82f6', link: 'pip install base64club-sdk' },
  { name: 'Go SDK', color: '#00ADD8', link: 'go get github.com/base64club/sdk-go' },
  { name: 'Java SDK', color: '#B07219', link: 'Maven: com.base64club:sdk:1.0.0' },
];

export default function DevelopersPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('javascript');
  const [copied, setCopied] = useState<string | null>(null);

  const currentCode = languages.find(l => l.id === activeTab)?.[language === 'zh' ? 'codeZh' : 'codeEn'] || '';

  const handleCopy = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getApiDesc = (endpoint: string) => {
    if (endpoint.includes('encode') && endpoint.includes('file')) return t.developers.encodeFile;
    if (endpoint.includes('decode') && endpoint.includes('file')) return t.developers.decodeFile;
    if (endpoint.includes('encode')) return t.developers.encodeText;
    return t.developers.decodeText;
  };

  const getParamDesc = (name: string) => {
    switch (name) {
      case 'text': return t.developers.paramText;
      case 'encoding': return t.developers.paramEncoding;
      case 'base64': return t.developers.paramBase64;
      case 'file': return t.developers.paramFile;
      case 'filename': return t.developers.paramFilename;
      default: return '';
    }
  };

  const getSdkName = (name: string) => {
    if (name.includes('Node')) return t.developers.nodeSdk;
    if (name.includes('Python')) return t.developers.pythonSdk;
    if (name.includes('Go')) return t.developers.goSdk;
    if (name.includes('Java')) return t.developers.javaSdk;
    return name;
  };

  const getSdkDesc = (name: string) => {
    if (name.includes('Node')) return t.developers.nodeSdkDesc;
    if (name.includes('Python')) return t.developers.pythonSdkDesc;
    if (name.includes('Go')) return t.developers.goSdkDesc;
    if (name.includes('Java')) return t.developers.javaSdkDesc;
    return '';
  };

  return (
    <div className="tool-container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {t.developers.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {t.developers.subtitle}
        </p>
      </div>

      {/* Quick Start */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={24} style={{ color: 'var(--accent-color)' }} />
          {t.developers.quickStart}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ 
            backgroundColor: 'var(--bg-tertiary)', 
            borderRadius: '8px', 
            padding: '1.25rem',
            borderLeft: '3px solid var(--success-color)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--success-color)', fontWeight: 600, marginBottom: '0.5rem' }}>
              {t.developers.step1Title}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {t.developers.step1Desc}
            </p>
          </div>
          <div style={{ 
            backgroundColor: 'var(--bg-tertiary)', 
            borderRadius: '8px', 
            padding: '1.25rem',
            borderLeft: '3px solid var(--accent-color)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 600, marginBottom: '0.5rem' }}>
              {t.developers.step2Title}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {t.developers.step2Desc}
            </p>
          </div>
          <div style={{ 
            backgroundColor: 'var(--bg-tertiary)', 
            borderRadius: '8px', 
            padding: '1.25rem',
            borderLeft: '3px solid #8b5cf6'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#8b5cf6', fontWeight: 600, marginBottom: '0.5rem' }}>
              {t.developers.step3Title}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {t.developers.step3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Code size={24} style={{ color: 'var(--accent-color)' }} />
          {t.developers.codeExamples}
        </h2>
        
        {/* Language Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto', flexWrap: 'wrap' }}>
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveTab(lang.id)}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: activeTab === lang.id ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                color: activeTab === lang.id ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <span>{lang.icon}</span>
              {lang.name}
            </button>
          ))}
        </div>

        {/* Code Block */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => handleCopy(currentCode, activeTab)}
            style={{
              position: 'absolute',
              top: '0.75rem',
              right: '0.75rem',
              padding: '0.5rem 0.75rem',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              zIndex: 10
            }}
          >
            {copied === activeTab ? <Check size={16} style={{ color: 'var(--success-color)' }} /> : <Copy size={16} />}
            {copied === activeTab ? t.developers.copied : t.developers.copy}
          </button>
          <pre style={{ 
            backgroundColor: 'var(--bg-tertiary)', 
            padding: '1.25rem', 
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.85rem',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            lineHeight: 1.6,
            margin: 0
          }}>
            <code style={{ color: 'var(--text-secondary)' }}>
              {currentCode}
            </code>
          </pre>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={24} style={{ color: 'var(--accent-color)' }} />
          {t.developers.apiEndpoints}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {apiEndpoints.map((api, index) => (
            <div key={index} style={{ 
              backgroundColor: 'var(--bg-tertiary)', 
              borderRadius: '8px', 
              padding: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  backgroundColor: api.method === 'GET' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                  color: api.method === 'GET' ? '#3b82f6' : '#22c55e',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {api.method}
                </span>
                <code style={{ 
                  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}>
                  {api.endpoint}
                </code>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                {getApiDesc(api.endpoint)}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {api.params.map((param, i) => (
                  <span key={i} style={{ 
                    padding: '0.25rem 0.5rem', 
                    backgroundColor: 'var(--bg-primary)',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    color: param.required ? 'var(--accent-color)' : 'var(--text-tertiary)'
                  }}>
                    {param.name}: {param.type}
                    {param.required && ' *'}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SDKs */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Package size={24} style={{ color: 'var(--accent-color)' }} />
          {t.developers.sdkDownload}
        </h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {sdks.map((sdk, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              backgroundColor: 'var(--bg-tertiary)', 
              borderRadius: '8px', 
              padding: '1rem 1.25rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{getSdkName(sdk.name)}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{getSdkDesc(sdk.name)}</p>
              </div>
              <code style={{ 
                padding: '0.5rem 0.75rem', 
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '6px',
                fontSize: '0.85rem',
                color: sdk.color
              }}>
                {sdk.link}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Docs Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <Link href="/api" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            cursor: 'pointer',
            marginBottom: 0
          }}>
            <FileCode size={28} style={{ color: 'var(--accent-color)' }} />
            <div>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.developers.fullApiDocs}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.developers.fullApiDocsDesc}</p>
            </div>
            <ArrowRight size={20} style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }} />
          </div>
        </Link>
        <Link href="/code-snippet" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            cursor: 'pointer',
            marginBottom: 0
          }}>
            <Code size={28} style={{ color: 'var(--accent-color)' }} />
            <div>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.developers.onlineCodeGen}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.developers.onlineCodeGenDesc}</p>
            </div>
            <ArrowRight size={20} style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }} />
          </div>
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useState, useCallback } from 'react';
import { Copy, Code, Terminal, FileCode, BookOpen } from 'lucide-react';

const languages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'csharp', name: 'C#' },
  { id: 'go', name: 'Go' },
  { id: 'curl', name: 'curl' },
];

const codeSnippets: Record<string, string> = {
  javascript: "// 使用 fetch API\nconst response = await fetch('https://api.base64.club/encode', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ data: 'Hello World' }),\n});\nconst result = await response.json();\nconsole.log(result);",

  python: "import requests\n\ndata = {'data': 'Hello World'}\nresponse = requests.post('https://api.base64.club/encode', json=data)\nresult = response.json()\nprint(result)",

  java: "HttpClient client = HttpClient.newHttpClient();\nHttpRequest request = HttpRequest.newBuilder()\n    .uri(URI.create(\"https://api.base64.club/encode\"))\n    .POST(HttpRequest.BodyPublishers.ofString(\"{\\\"data\\\":\\\"Hello World\\\"}\"))\n    .build();\nHttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());",

  csharp: "var client = new HttpClient();\nvar content = new { Data = \"Hello World\" };\nvar response = await client.PostAsJsonAsync(\"https://api.base64.club/encode\", content);\nvar result = await response.Content.ReadFromJsonAsync<dynamic>();",

  go: "package main\nimport (\"net/http\"; \"encoding/json\")\n\nfunc main() {\n    payload, _ := json.Marshal(map[string]string{\"data\": \"Hello World\"})\n    resp, _ := http.Post(\"https://api.base64.club/encode\", \"application/json\", bytes.NewBuffer(payload))\n    defer resp.Body.Close()\n}",

  curl: "curl -X POST https://api.base64.club/encode \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"data\": \"Hello World\"}'",
};

export default function ApiTool() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleGenerate = useCallback(() => {
    setGeneratedCode(codeSnippets[selectedLanguage] || '');
  }, [selectedLanguage]);

  const handleCopy = useCallback(async () => {
    if (!generatedCode) return;
    try {
      await navigator.clipboard.writeText(generatedCode);
    } catch {
      // copy failed
    }
  }, [generatedCode]);

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          API服务与代码生成
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          提供RESTful API服务，根据转换结果自动生成多种编程语言的代码片段。
        </p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'rgba(59, 130, 246, 0.05)' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={20} style={{ color: 'var(--accent-color)' }} />
          API端点信息
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>编码端点</p>
            <code style={{ fontSize: '0.9rem', color: 'var(--accent-color)' }}>POST /api/encode</code>
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>解码端点</p>
            <code style={{ fontSize: '0.9rem', color: 'var(--accent-color)' }}>POST /api/decode</code>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code size={20} style={{ color: 'var(--accent-color)' }} />
            生成代码
          </h3>

          <div style={{ marginBottom: '1rem' }}>
            <label className="input-label">选择语言</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  className={`btn ${selectedLanguage === lang.id ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setSelectedLanguage(lang.id)}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleGenerate} style={{ width: '100%' }}>
            <FileCode size={16} />
            生成代码
          </button>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 600 }}>生成的代码</h3>
            <button className="btn btn-secondary" onClick={handleCopy} disabled={!generatedCode}>
              <Copy size={16} />
              复制
            </button>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            padding: '1rem',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            fontSize: '0.85rem',
            whiteSpace: 'pre-wrap',
            overflowX: 'auto',
            minHeight: '200px'
          }}>
            {generatedCode || (
              <span style={{ color: 'var(--text-tertiary)' }}>生成的代码将显示在这里...</span>
            )}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={20} style={{ color: 'var(--accent-color)' }} />
          使用示例
        </h3>

        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px' }}>
          <code style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {`curl -X POST https://api.base64.club/encode -H "Content-Type: application/json" -d '{"data": "Hello World"}'`}
          </code>
        </div>

        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
          <p style={{ color: 'var(--error-color)', fontSize: '0.9rem' }}>
            <strong>注意：</strong> API服务目前仅用于演示。如需生产使用，请联系 support@base64.club
          </p>
        </div>
      </div>
    </div>
  );
}
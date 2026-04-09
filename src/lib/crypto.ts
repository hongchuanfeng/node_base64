// AES 加密/解密（使用 Web Crypto API）
export async function encryptAES(plaintext: string, password: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    // 生成密钥
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );
    
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encoder.encode(plaintext)
    );
    
    // 合并 salt + iv + encrypted data
    const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(encrypted), salt.length + iv.length);
    
    // 转换为 Base64
    let binary = '';
    combined.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  } catch (error) {
    throw new Error(`AES 加密失败: ${error}`);
  }
}

export async function decryptAES(encryptedBase64: string, password: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    // 解码 Base64
    const combined = new Uint8Array(
      atob(encryptedBase64).split('').map(c => c.charCodeAt(0))
    );
    
    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const encrypted = combined.slice(28);
    
    // 重建密钥
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );
    
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encrypted
    );
    
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    throw new Error('AES 解密失败，请检查密码是否正确');
  }
}

// Base64 隐藏信息检测
export interface HiddenContentDetection {
  hasHiddenContent: boolean;
  suspiciousPatterns: string[];
  entropyScore: number;
  recommendation: string;
}

export function detectHiddenContent(base64: string): HiddenContentDetection {
  const patterns = [
    { pattern: /<script|eval\(|document\.write/i, name: '可能包含恶意脚本' },
    { pattern: /javascript:|data:text\/html/i, name: '可能包含 HTML/JS 代码' },
    { pattern: /<iframe|<object|<embed/i, name: '可能包含嵌入内容' },
    { pattern: /\x00|\xff|[\x00-\x08]/gi, name: '包含非打印控制字符' },
    { pattern: /MZ|PK\x03\x04|USBD/i, name: '可能包含可执行文件' },
  ];
  
  const suspiciousPatterns: string[] = [];
  const decoded = atob(base64);
  
  for (const { pattern, name } of patterns) {
    if (pattern.test(base64) || pattern.test(decoded)) {
      suspiciousPatterns.push(name);
    }
  }
  
  // 计算熵值（高熵值可能表示压缩或加密数据）
  const charFreq: Record<string, number> = {};
  for (const char of decoded) {
    charFreq[char] = (charFreq[char] || 0) + 1;
  }
  
  const len = decoded.length || 1;
  let entropy = 0;
  for (const count of Object.values(charFreq)) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }
  
  const normalizedEntropy = Math.round(entropy * 100) / 100;
  
  let recommendation = '未检测到明显异常';
  if (suspiciousPatterns.length > 0) {
    recommendation = '检测到可疑模式，请谨慎使用';
  } else if (normalizedEntropy > 6.5) {
    recommendation = '数据熵值较高，可能经过压缩或加密';
  }
  
  return {
    hasHiddenContent: suspiciousPatterns.length > 0,
    suspiciousPatterns,
    entropyScore: normalizedEntropy,
    recommendation
  };
}

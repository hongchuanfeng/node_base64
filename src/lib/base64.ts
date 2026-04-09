// Base64 核心编码/解码函数
export function encodeBase64(str: string, encoding: string = 'utf-8'): string {
  try {
    // 将字符串转换为指定编码的字节
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    
    // 将字节数组转换为二进制字符串
    let binary = '';
    bytes.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    
    // 使用 btoa 进行 Base64 编码
    return btoa(binary);
  } catch (error) {
    throw new Error(`Base64 编码失败: ${error}`);
  }
}

export function decodeBase64(str: string, encoding: string = 'utf-8'): string {
  try {
    // 清理输入字符串
    const cleaned = str.replace(/[\r\n]/g, '');
    
    // 使用 atob 进行解码
    const binary = atob(cleaned);
    
    // 将二进制字符串转换回字节数组
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    
    // 使用 TextDecoder 解码为字符串
    const decoder = new TextDecoder(encoding);
    return decoder.decode(bytes);
  } catch (error) {
    throw new Error('Base64 解码失败，请确保输入是有效的 Base64 字符串');
  }
}

// GBK 编码支持
export function encodeBase64GBK(str: string): string {
  try {
    // 浏览器不原生支持 GBK，这里使用 UTF-8 编码作为替代方案
    // 如需真正的 GBK 编码，需要引入额外的编码库
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    let binary = '';
    bytes.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  } catch (error) {
    throw new Error(`GBK Base64 编码失败: ${error}`);
  }
}

// 文件转 Base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsDataURL(file);
  });
}

// Base64 转文件
export function base64ToBlob(base64: string, mimeType: string = 'application/octet-stream'): Blob {
  const base64Data = base64.replace(/^data:[^;]+;base64,/, '');
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

// URL Safe Base64
export function encodeUrlSafeBase64(str: string): string {
  return encodeBase64(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function decodeUrlSafeBase64(str: string): string {
  // 还原标准 Base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  // 添加填充
  const padding = base64.length % 4;
  if (padding) {
    base64 += '='.repeat(4 - padding);
  }
  return decodeBase64(base64);
}

// 检测是否为有效 Base64
export function isValidBase64(str: string): boolean {
  try {
    const cleaned = str.replace(/[\r\n]/g, '');
    // 检查字符集
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleaned)) {
      return false;
    }
    // 尝试解码
    atob(cleaned);
    return true;
  } catch {
    return false;
  }
}

// 检测 Base64 内容类型
export function detectBase64ContentType(base64: string): {
  type: 'text' | 'image' | 'pdf' | 'unknown';
  mimeType?: string;
  info?: string;
} {
  try {
    const cleaned = base64.replace(/^data:[^;]+;base64,/, '');
    
    // 尝试解析为 Data URL
    const dataUrlMatch = base64.match(/^data:([^;]+);base64,/);
    if (dataUrlMatch) {
      const mimeType = dataUrlMatch[1];
      if (mimeType.startsWith('image/')) {
        return { type: 'image', mimeType };
      } else if (mimeType === 'application/pdf') {
        return { type: 'pdf', mimeType };
      }
      return { type: 'text', mimeType };
    }
    
    // 尝试解码并检测内容
    const decoded = atob(cleaned);
    
    // 检查是否为可打印ASCII字符为主（可能是文本）
    let printableCount = 0;
    for (let i = 0; i < Math.min(decoded.length, 100); i++) {
      const code = decoded.charCodeAt(i);
      if ((code >= 32 && code <= 126) || code === 9 || code === 10 || code === 13) {
        printableCount++;
      }
    }
    
    if (printableCount / Math.min(decoded.length, 100) > 0.85) {
      return { type: 'text', info: '纯文本内容' };
    }
    
    // 检查 PNG 签名
    if (cleaned.startsWith('iVBOR')) {
      return { type: 'image', mimeType: 'image/png', info: 'PNG 图片' };
    }
    
    // 检查 JPEG 签名
    if (cleaned.startsWith('/9j/') || cleaned.startsWith('iVBOR')) {
      return { type: 'image', mimeType: 'image/jpeg', info: 'JPEG 图片' };
    }
    
    // 检查 GIF 签名
    if (cleaned.startsWith('R0lGO')) {
      return { type: 'image', mimeType: 'image/gif', info: 'GIF 图片' };
    }
    
    return { type: 'unknown', info: '未能识别的内容类型' };
  } catch {
    return { type: 'unknown', info: '无法解析 Base64 内容' };
  }
}

// Base64 结构分析
export function analyzeBase64Structure(base64: string): {
  length: number;
  paddingChars: number;
  charSet: { uppercase: number; lowercase: number; digits: number; symbols: number };
  entropy: number;
} {
  const cleaned = base64.replace(/=/g, '');
  
  const uppercase = (cleaned.match(/[A-Z]/g) || []).length;
  const lowercase = (cleaned.match(/[a-z]/g) || []).length;
  const digits = (cleaned.match(/[0-9]/g) || []).length;
  const symbols = (cleaned.match(/[+\/]/g) || []).length;
  const paddingChars = (base64.match(/=/g) || []).length;
  
  // 计算熵值
  const total = cleaned.length || 1;
  const freqs = [uppercase, lowercase, digits, symbols].map(c => c / total);
  const entropy = -freqs.reduce((sum, p) => sum + (p > 0 ? p * Math.log2(p) : 0), 0);
  
  return {
    length: cleaned.length,
    paddingChars,
    charSet: { uppercase, lowercase, digits, symbols },
    entropy: Math.round(entropy * 100) / 100
  };
}

// 获取 Base64 文件大小估算
export function estimateBase64FileSize(base64: string): {
  encodedSize: number;
  decodedSize: number;
  compressionRatio: number;
} {
  const cleaned = base64.replace(/^data:[^;]+;base64,/, '').replace(/=+$/, '');
  const encodedSize = cleaned.length;
  const decodedSize = Math.floor(encodedSize * 0.75);
  const compressionRatio = Math.round((1 - decodedSize / encodedSize) * 100);
  
  return {
    encodedSize,
    decodedSize,
    compressionRatio
  };
}

// Base16 编码/解码
const BASE16_CHARS = '0123456789ABCDEF';

export function encodeBase16(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let result = '';
  for (const byte of bytes) {
    result += BASE16_CHARS[(byte >> 4) & 0x0F] + BASE16_CHARS[byte & 0x0F];
  }
  return result;
}

export function decodeBase16(str: string): string {
  const cleaned = str.replace(/[\r\n\s]/g, '').toUpperCase();
  if (!/^[0-9A-F]+$/.test(cleaned)) {
    throw new Error('Base16 解码失败：输入包含无效字符');
  }
  if (cleaned.length % 2 !== 0) {
    throw new Error('Base16 解码失败：输入长度必须为偶数');
  }
  
  const bytes = new Uint8Array(cleaned.length / 2);
  for (let i = 0; i < cleaned.length; i += 2) {
    bytes[i / 2] = parseInt(cleaned.substr(i, 2), 16);
  }
  
  return new TextDecoder().decode(bytes);
}

// Base32 编码/解码
const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function encodeBase32(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let result = '';
  let buffer = 0;
  let bitsLeft = 0;
  
  for (const byte of bytes) {
    buffer = (buffer << 8) | byte;
    bitsLeft += 8;
    
    while (bitsLeft >= 5) {
      result += BASE32_CHARS[(buffer >> (bitsLeft - 5)) & 0x1F];
      bitsLeft -= 5;
    }
  }
  
  if (bitsLeft > 0) {
    result += BASE32_CHARS[(buffer << (5 - bitsLeft)) & 0x1F];
  }
  
  // 添加填充
  while (result.length % 8 !== 0) {
    result += '=';
  }
  
  return result;
}

export function decodeBase32(str: string): string {
  const cleaned = str.replace(/[=\s]/g, '').toUpperCase();
  if (!/^[A-Z2-7]+$/.test(cleaned)) {
    throw new Error('Base32 解码失败：输入包含无效字符');
  }
  
  let buffer = 0;
  let bitsLeft = 0;
  const bytes: number[] = [];
  
  for (const char of cleaned) {
    const value = BASE32_CHARS.indexOf(char);
    buffer = (buffer << 5) | value;
    bitsLeft += 5;
    
    if (bitsLeft >= 8) {
      bytes.push((buffer >> (bitsLeft - 8)) & 0xFF);
      bitsLeft -= 8;
    }
  }
  
  return new TextDecoder().decode(new Uint8Array(bytes));
}

// Base58 编码/解码（比特币地址风格）
const BASE58_CHARS = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export function encodeBase58(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  
  // 计算前导零字节数
  let zeros = 0;
  for (const byte of bytes) {
    if (byte === 0) zeros++;
    else break;
  }
  
  // 转换为数字
  let num = BigInt('0x' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''));
  let result = '';
  
  while (num > 0) {
    const div = num / 58n;
    const rem = num % 58n;
    result = BASE58_CHARS[Number(rem)] + result;
    num = div;
  }
  
  // 添加前导1（对应前导零）
  result = '1'.repeat(zeros) + result;
  
  return result;
}

export function decodeBase58(str: string): string {
  const cleaned = str.replace(/[1\s]/g, '');
  if (!/^[2-9A-HJ-NP-Za-km-z]+$/.test(cleaned)) {
    throw new Error('Base58 解码失败：输入包含无效字符');
  }
  
  let num = 0n;
  for (const char of cleaned) {
    const index = BASE58_CHARS.indexOf(char);
    num = num * 58n + BigInt(index);
  }
  
  const hex = num.toString(16);
  const bytes = new Uint8Array(hex.length / 2 + (hex.length % 2));
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  
  // 添加前导零
  let zeros = 0;
  for (const char of str) {
    if (char === '1') zeros++;
    else break;
  }
  
  const result = new Uint8Array(zeros + bytes.length);
  result.set(bytes, zeros);
  
  return new TextDecoder().decode(result);
}

// Base62 编码/解码
const BASE62_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function encodeBase62(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  
  let zeros = 0;
  for (const byte of bytes) {
    if (byte === 0) zeros++;
    else break;
  }
  
  let num = BigInt('0x' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''));
  let result = '';
  
  while (num > 0) {
    const div = num / 62n;
    const rem = num % 62n;
    result = BASE62_CHARS[Number(rem)] + result;
    num = div;
  }
  
  result = '0'.repeat(zeros) + result;
  
  return result;
}

export function decodeBase62(str: string): string {
  const cleaned = str.replace(/[0\s]/g, '');
  if (!/^[1-9A-Za-z]+$/.test(cleaned)) {
    throw new Error('Base62 解码失败：输入包含无效字符');
  }
  
  let num = 0n;
  for (const char of cleaned) {
    const index = BASE62_CHARS.indexOf(char);
    num = num * 62n + BigInt(index);
  }
  
  const hex = num.toString(16);
  const bytes = new Uint8Array(hex.length / 2 + (hex.length % 2));
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  
  return new TextDecoder().decode(bytes);
}

// Base85 编码/解码（ASCII85 风格）
const BASE85_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZYZ!#$%&()*+-/<=>?@^_`{|}~';

export function encodeBase85(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let result = '';
  
  for (let i = 0; i < bytes.length; i += 4) {
    const chunk = bytes.slice(i, i + 4);
    let num = 0;
    
    for (let j = 0; j < chunk.length; j++) {
      num = num * 256 + (chunk[j] || 0);
    }
    
    if (chunk.length < 4) {
      num = num * Math.pow(256, 4 - chunk.length);
    }
    
    const chars: string[] = [];
    for (let j = 0; j < (chunk.length === 4 ? 5 : Math.ceil(chunk.length * 85 / 256)); j++) {
      chars.unshift(BASE85_CHARS[num % 85]);
      num = Math.floor(num / 85);
    }
    
    result += chars.join('');
  }
  
  return result;
}

export function decodeBase85(str: string): string {
  // 简化实现
  throw new Error('Base85 解码暂未实现');
}

// Base100 编码/解码（Emoji 编码，仅用于演示）
const BASE100_EMOJIS = '🐇🧀🍇🌹🎈🎃🐱🐶🦁🐸🎵🎼💎🧿💰🎁🎀🐻🧨🎆🎇🔥💥✨🌈☀️🌙⭐🌟💫🌀🌂☂️⛱🎒🧳🧲🔮💎🎊🎉🎋🍁🍂🏹🎯🧩🧮📏📐🖼️🛍️🎽🧶🧵👑💄💍👒🎩🧢👗👘🎽🩱🩰👠👡🩲👢🧤🧣🎒🎓🧑‍🎓👨‍🎓👩‍🎓📚🏫📖🔖🧲🔑🗝️💰🏦💵💴💸💳💎💍🏆🥇🥈🥉🏅🎖️🎗️🎪🎭🛒🛍️🎁🎀🎏🎐🧧🎊🎉🎈🎆🎇🎄🎋🍭🍬🍫🍩🍪🎂🍰🍦🍨🍧🍓🍊🍋🍒🍑🍎🍏🍐🍊🍋🍌🍉🍇🍓🫐🍈🍒🍑🥝🍅🥑🥒🥬🥦🌶️🫑🍄🌰🥜🍯🧈🥞🧇🍳🥚🥓🥩🍗🍖🦴🌭🍔🍟🍕🫓🥪🥙🧀🌮🌯🫔🥗🥘🫕🥫🍝🍜🍲🍛🍣🍱🍙🍚🍘🍥🥠🥮🍢🧆🥗🍡🍧🍨🍦🍨🍓🍈🍒🍑🍊🍋🍌🍉🍇🍓🫐🍈';

export function encodeBase100(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let result = '';
  
  for (let i = 0; i < bytes.length; i += 2) {
    const chunk = bytes.slice(i, i + 2);
    let num = (chunk[0] || 0) * 256 + (chunk[1] || 0);
    
    const chars: string[] = [];
    for (let j = 0; j < 3; j++) {
      chars.unshift(BASE100_EMOJIS[num % 100]);
      num = Math.floor(num / 100);
    }
    
    result += chars.join('');
  }
  
  return result;
}

export function decodeBase100(str: string): string {
  // 简化实现
  throw new Error('Base100 解码暂未实现');
}

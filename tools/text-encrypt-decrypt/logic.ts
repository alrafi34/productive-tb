import { EncryptionMode, TransformationHistory } from "./types";

// ROT13 transformation (symmetric)
export function rot13(text: string): string {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0);
    const base = code >= 97 ? 97 : 65; // lowercase or uppercase
    return String.fromCharCode(((code - base + 13) % 26) + base);
  });
}

// Base64 encode
export function base64Encode(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (e) {
    return 'Error: Invalid characters for Base64 encoding';
  }
}

// Base64 decode
export function base64Decode(text: string): string {
  try {
    return decodeURIComponent(escape(atob(text)));
  } catch (e) {
    return 'Error: Invalid Base64 string';
  }
}

// URL-safe Base64 encode
export function base64UrlEncode(text: string): string {
  try {
    const base64 = btoa(unescape(encodeURIComponent(text)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    return 'Error: Invalid characters for Base64 encoding';
  }
}

// URL-safe Base64 decode
export function base64UrlDecode(text: string): string {
  try {
    // Add padding if needed
    let base64 = text.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return decodeURIComponent(escape(atob(base64)));
  } catch (e) {
    return 'Error: Invalid URL-safe Base64 string';
  }
}

// Base32 encode (RFC 4648)
export function base32Encode(text: string): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  let result = '';
  
  // Convert text to binary
  for (let i = 0; i < text.length; i++) {
    bits += text.charCodeAt(i).toString(2).padStart(8, '0');
  }
  
  // Pad to multiple of 5
  while (bits.length % 5 !== 0) {
    bits += '0';
  }
  
  // Convert 5-bit chunks to Base32
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.substr(i, 5);
    result += alphabet[parseInt(chunk, 2)];
  }
  
  // Add padding
  while (result.length % 8 !== 0) {
    result += '=';
  }
  
  return result;
}

// Base32 decode (RFC 4648)
export function base32Decode(text: string): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  
  // Remove padding
  text = text.replace(/=+$/, '');
  
  try {
    // Convert Base32 to binary
    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();
      const index = alphabet.indexOf(char);
      if (index === -1) {
        return 'Error: Invalid Base32 string';
      }
      bits += index.toString(2).padStart(5, '0');
    }
    
    // Convert binary to text (8-bit chunks)
    let result = '';
    for (let i = 0; i + 8 <= bits.length; i += 8) {
      const byte = bits.substr(i, 8);
      result += String.fromCharCode(parseInt(byte, 2));
    }
    
    return result;
  } catch (e) {
    return 'Error: Invalid Base32 string';
  }
}

// Binary representation
export function textToBinary(text: string): string {
  return text.split('').map(char => 
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join(' ');
}

// Binary to text
export function binaryToText(binary: string): string {
  try {
    return binary.split(' ').map(byte => 
      String.fromCharCode(parseInt(byte, 2))
    ).join('');
  } catch (e) {
    return 'Error: Invalid binary string';
  }
}

// Main transform function
export function transformText(text: string, mode: EncryptionMode): string {
  if (!text) return '';
  
  switch (mode) {
    case 'rot13':
      return rot13(text);
    case 'base64-encode':
      return base64Encode(text);
    case 'base64-decode':
      return base64Decode(text);
    case 'base64-url':
      // Auto-detect encode or decode based on content
      if (text.match(/^[A-Za-z0-9\-_]+$/)) {
        return base64UrlDecode(text);
      } else {
        return base64UrlEncode(text);
      }
    case 'base32':
      // Auto-detect encode or decode based on content
      if (text.match(/^[A-Z2-7=]+$/)) {
        return base32Decode(text);
      } else {
        return base32Encode(text);
      }
    case 'binary':
      // Auto-detect encode or decode based on content
      if (text.match(/^[01\s]+$/)) {
        return binaryToText(text);
      } else {
        return textToBinary(text);
      }
    default:
      return text;
  }
}

// Debounce function for large text
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Local storage helpers
const HISTORY_KEY = 'text-encrypt-history';
const MAX_HISTORY = 10;

export function saveToHistory(history: TransformationHistory): void {
  if (typeof window === 'undefined') return;
  
  const stored = getHistory();
  stored.unshift(history);
  
  const trimmed = stored.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): TransformationHistory[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

// Export functions
export function exportAsText(text: string, filename: string = 'encrypted-text'): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAsJSON(data: TransformationHistory[], filename: string = 'encryption-history'): void {
  const content = JSON.stringify(data, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Get mode description
export function getModeDescription(mode: EncryptionMode): string {
  const descriptions: Record<EncryptionMode, string> = {
    'rot13': 'ROT13 cipher - shifts letters by 13 positions (symmetric)',
    'base64-encode': 'Base64 encoding - converts text to Base64 format',
    'base64-decode': 'Base64 decoding - converts Base64 back to text',
    'base64-url': 'URL-safe Base64 - uses - and _ instead of + and /',
    'base32': 'Base32 encoding - uses A-Z and 2-7 characters',
    'binary': 'Binary representation - converts text to 0s and 1s'
  };
  
  return descriptions[mode] || '';
}

// Get mode label
export function getModeLabel(mode: EncryptionMode): string {
  const labels: Record<EncryptionMode, string> = {
    'rot13': 'ROT13',
    'base64-encode': 'Base64 Encode',
    'base64-decode': 'Base64 Decode',
    'base64-url': 'Base64 URL-Safe',
    'base32': 'Base32',
    'binary': 'Binary'
  };
  
  return labels[mode] || mode;
}

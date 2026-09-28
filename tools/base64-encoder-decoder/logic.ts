export type Base64Mode = 'encode' | 'decode' | 'auto';

export interface Base64History {
  id: string;
  mode: Base64Mode;
  input: string;
  output: string;
  timestamp: number;
}

// Check if string is valid Base64
/* Standard Base64 from what people paste: line breaks and spaces removed,
   the URL-safe alphabet (- and _) mapped back, and missing = padding added. */
export function normalizeBase64(str: string): string {
  const s = str.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  return s.length % 4 === 0 ? s : s + '='.repeat(4 - (s.length % 4));
}

export function isValidBase64(str: string): boolean {
  const s = normalizeBase64(str);
  if (!s || s.length % 4 === 1 || !/^[A-Za-z0-9+/]*={0,2}$/.test(s)) return false;
  try {
    atob(s);
    return true;
  } catch {
    return false;
  }
}

// UTF-8 aware: btoa alone fails on anything outside Latin-1 (emoji, Chinese, …)
export function encodeToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

function decodeBytes(text: string): Uint8Array | null {
  if (!isValidBase64(text)) return null;
  const binary = atob(normalizeBase64(text));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function decodeFromBase64(text: string): string {
  const bytes = decodeBytes(text);
  if (!bytes) return 'Error: Invalid Base64 string';
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return 'Error: This Base64 decodes to binary data (such as an image or file), not UTF-8 text';
  }
}

/* Auto mode decodes only when the input looks like Base64 on purpose: valid,
   a whole number of 4-character blocks once cleaned, at least 8 characters,
   and decoding to readable UTF-8 text. Otherwise short words such as "test"
   (also valid Base64) would be decoded into garbage. */
export function autoDetectAndTransform(text: string): { result: string; mode: 'encode' | 'decode' } {
  if (!text) return { result: '', mode: 'encode' };
  
  const compact = text.replace(/\s+/g, '');
  const bytes = compact.length >= 8 && /^[A-Za-z0-9+/_-]+={0,2}$/.test(compact) ? decodeBytes(compact) : null;
  if (bytes) {
    try {
      const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      const printable = decoded.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').length;
      if (decoded.length > 0 && printable / decoded.length > 0.95) {
        return { result: decoded, mode: 'decode' };
      }
    } catch {
      // not text: encode instead
    }
  }
  
  return {
    result: encodeToBase64(text),
    mode: 'encode'
  };
}

export function transformBase64(text: string, mode: Base64Mode): { result: string; detectedMode?: 'encode' | 'decode' } {
  if (!text) return { result: '' };
  
  if (mode === 'auto') {
    const { result, mode: detectedMode } = autoDetectAndTransform(text);
    return { result, detectedMode };
  }
  
  if (mode === 'encode') {
    return { result: encodeToBase64(text) };
  }
  
  if (mode === 'decode') {
    return { result: decodeFromBase64(text) };
  }
  
  return { result: '' };
}

// Calculate size difference
export function calculateSizeDifference(original: string, encoded: string): { originalSize: string; encodedSize: string; increase: string } {
  const originalBytes = new Blob([original]).size;
  const encodedBytes = new Blob([encoded]).size;
  const increase = originalBytes > 0 ? ((encodedBytes - originalBytes) / originalBytes * 100).toFixed(1) : '0.0';
  
  return {
    originalSize: `${originalBytes} bytes`,
    encodedSize: `${encodedBytes} bytes`,
    increase: `+${increase}%`
  };
}

// Debounce function
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
const HISTORY_KEY = 'base64-encoder-history';
const MAX_HISTORY = 20;

export function saveToHistory(history: Base64History): void {
  if (typeof window === 'undefined') return;
  
  const stored = getHistory();
  stored.unshift(history);
  
  const trimmed = stored.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): Base64History[] {
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
export function exportAsText(text: string, filename: string = 'base64-output'): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAsJSON(data: Base64History[], filename: string = 'base64-history'): void {
  const content = JSON.stringify(data, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export type Base64Mode = 'encode' | 'decode' | 'auto';

export interface Base64History {
  id: string;
  mode: Base64Mode;
  input: string;
  output: string;
  timestamp: number;
}

// Check if string is valid Base64
export function isValidBase64(str: string): boolean {
  if (!str || str.length === 0) return false;
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}

// Encode text to Base64 (UTF-8 safe)
export function encodeToBase64(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (e) {
    return 'Error: Invalid characters for Base64 encoding';
  }
}

// Decode Base64 to text (UTF-8 safe)
export function decodeFromBase64(text: string): string {
  try {
    return decodeURIComponent(escape(atob(text)));
  } catch (e) {
    return 'Error: Invalid Base64 string';
  }
}

// Auto-detect and transform
export function autoDetectAndTransform(text: string): { result: string; mode: 'encode' | 'decode' } {
  if (!text) return { result: '', mode: 'encode' };
  
  // Check if it looks like Base64
  if (isValidBase64(text)) {
    return {
      result: decodeFromBase64(text),
      mode: 'decode'
    };
  }
  
  // Otherwise encode it
  return {
    result: encodeToBase64(text),
    mode: 'encode'
  };
}

// Transform based on mode
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
  const increase = ((encodedBytes - originalBytes) / originalBytes * 100).toFixed(1);
  
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

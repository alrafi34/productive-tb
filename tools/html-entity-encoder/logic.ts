export type EntityMode = 'encode' | 'decode' | 'auto';
export type EntityType = 'named' | 'decimal' | 'hex';

export interface EntityHistory {
  id: string;
  mode: EntityMode;
  entityType: EntityType;
  input: string;
  output: string;
  timestamp: number;
}

// HTML entity map for named entities
const NAMED_ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

const REVERSE_NAMED_ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'"
};

// Encode to named entities
export function encodeToNamedEntities(text: string): string {
  return text.replace(/[&<>"']/g, (char) => NAMED_ENTITY_MAP[char] || char);
}

// Encode to decimal entities
export function encodeToDecimalEntities(text: string): string {
  return text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

// Encode to hex entities
export function encodeToHexEntities(text: string): string {
  return text.replace(/[&<>"']/g, (char) => `&#x${char.charCodeAt(0).toString(16)};`);
}

// Decode from any entity format
export function decodeFromEntities(text: string): string {
  let result = text;
  
  // Decode named entities
  Object.entries(REVERSE_NAMED_ENTITY_MAP).forEach(([entity, char]) => {
    result = result.split(entity).join(char);
  });
  
  // Decode decimal entities
  result = result.replace(/&#(\d+);/g, (match, code) => {
    try {
      return String.fromCharCode(parseInt(code, 10));
    } catch {
      return match;
    }
  });
  
  // Decode hex entities
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (match, code) => {
    try {
      return String.fromCharCode(parseInt(code, 16));
    } catch {
      return match;
    }
  });
  
  return result;
}

// Check if text contains entities
export function containsEntities(text: string): boolean {
  return /&(?:[a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);/.test(text);
}

// Check if text contains special HTML characters
export function containsSpecialChars(text: string): boolean {
  return /[&<>"']/.test(text);
}

// Auto-detect and transform
export function autoDetectAndTransform(text: string, entityType: EntityType): { result: string; mode: 'encode' | 'decode' } {
  if (!text) return { result: '', mode: 'encode' };
  
  if (containsEntities(text)) {
    return {
      result: decodeFromEntities(text),
      mode: 'decode'
    };
  }
  
  if (containsSpecialChars(text)) {
    let encoded = '';
    if (entityType === 'named') {
      encoded = encodeToNamedEntities(text);
    } else if (entityType === 'decimal') {
      encoded = encodeToDecimalEntities(text);
    } else {
      encoded = encodeToHexEntities(text);
    }
    return {
      result: encoded,
      mode: 'encode'
    };
  }
  
  return { result: text, mode: 'encode' };
}

// Transform based on mode
export function transformEntity(text: string, mode: EntityMode, entityType: EntityType): { result: string; detectedMode?: 'encode' | 'decode' } {
  if (!text) return { result: '' };
  
  if (mode === 'auto') {
    const { result, mode: detectedMode } = autoDetectAndTransform(text, entityType);
    return { result, detectedMode };
  }
  
  if (mode === 'encode') {
    if (entityType === 'named') {
      return { result: encodeToNamedEntities(text) };
    } else if (entityType === 'decimal') {
      return { result: encodeToDecimalEntities(text) };
    } else {
      return { result: encodeToHexEntities(text) };
    }
  }
  
  if (mode === 'decode') {
    return { result: decodeFromEntities(text) };
  }
  
  return { result: '' };
}

// Count entities in text
export function countEntities(text: string): number {
  const matches = text.match(/&(?:[a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);/g);
  return matches ? matches.length : 0;
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
const HISTORY_KEY = 'html-entity-encoder-history';
const MAX_HISTORY = 20;

export function saveToHistory(history: EntityHistory): void {
  if (typeof window === 'undefined') return;
  
  const stored = getHistory();
  stored.unshift(history);
  
  const trimmed = stored.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): EntityHistory[] {
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
export function exportAsText(text: string, filename: string = 'html-entities'): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

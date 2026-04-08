export type Base32Mode = 'encode' | 'decode' | 'auto';
export type Base32Variant = 'rfc4648' | 'crockford';

export interface Base32Options {
  variant: Base32Variant;
  uppercase: boolean;
  padding: boolean;
  grouping: boolean;
}

// RFC 4648 Base32 alphabet
const RFC4648_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
// Crockford Base32 alphabet (excludes I, L, O, U to avoid confusion)
const CROCKFORD_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

// Check if string is valid Base32
export function isValidBase32(str: string, variant: Base32Variant = 'rfc4648'): boolean {
  if (!str || str.length === 0) return false;
  
  const alphabet = variant === 'rfc4648' ? RFC4648_ALPHABET : CROCKFORD_ALPHABET;
  const cleanStr = str.replace(/[=\s]/g, '').toUpperCase();
  
  // Check if all characters are in the alphabet
  for (const char of cleanStr) {
    if (!alphabet.includes(char)) return false;
  }
  
  return true;
}

// Encode text to Base32
export function encodeToBase32(text: string, options: Base32Options): string {
  try {
    const bytes = new TextEncoder().encode(text);
    const alphabet = options.variant === 'rfc4648' ? RFC4648_ALPHABET : CROCKFORD_ALPHABET;
    
    let bits = '';
    let result = '';
    
    // Convert bytes to binary string
    for (const byte of bytes) {
      bits += byte.toString(2).padStart(8, '0');
    }
    
    // Process 5-bit chunks
    for (let i = 0; i < bits.length; i += 5) {
      const chunk = bits.substr(i, 5);
      if (chunk.length < 5) {
        // Pad incomplete chunk
        const paddedChunk = chunk.padEnd(5, '0');
        const index = parseInt(paddedChunk, 2);
        result += alphabet[index];
      } else {
        const index = parseInt(chunk, 2);
        result += alphabet[index];
      }
    }
    
    // Add padding if required (RFC 4648 only)
    if (options.padding && options.variant === 'rfc4648') {
      const paddingLength = (8 - (result.length % 8)) % 8;
      result += '='.repeat(paddingLength);
    }
    
    // Apply case formatting
    if (!options.uppercase) {
      result = result.toLowerCase();
    }
    
    // Apply grouping
    if (options.grouping) {
      result = result.replace(/(.{8})/g, '$1 ').trim();
    }
    
    return result;
  } catch (e) {
    return 'Error: Invalid characters for Base32 encoding';
  }
}

// Decode Base32 to text
export function decodeFromBase32(text: string, variant: Base32Variant = 'rfc4648'): string {
  try {
    const alphabet = variant === 'rfc4648' ? RFC4648_ALPHABET : CROCKFORD_ALPHABET;
    const cleanText = text.replace(/[=\s]/g, '').toUpperCase();
    
    if (!isValidBase32(cleanText, variant)) {
      return 'Error: Invalid Base32 string';
    }
    
    let bits = '';
    
    // Convert Base32 characters to binary
    for (const char of cleanText) {
      const index = alphabet.indexOf(char);
      if (index === -1) {
        return 'Error: Invalid Base32 character';
      }
      bits += index.toString(2).padStart(5, '0');
    }
    
    // Convert binary to bytes
    const bytes = [];
    for (let i = 0; i < bits.length; i += 8) {
      const byte = bits.substr(i, 8);
      if (byte.length === 8) {
        bytes.push(parseInt(byte, 2));
      }
    }
    
    // Decode bytes to text
    const uint8Array = new Uint8Array(bytes);
    return new TextDecoder().decode(uint8Array);
  } catch (e) {
    return 'Error: Invalid Base32 string';
  }
}

// Auto-detect and transform
export function autoDetectAndTransform(text: string, options: Base32Options): { result: string; mode: 'encode' | 'decode' } {
  if (!text) return { result: '', mode: 'encode' };
  
  // Check if it looks like Base32
  if (isValidBase32(text, options.variant)) {
    return {
      result: decodeFromBase32(text, options.variant),
      mode: 'decode'
    };
  }
  
  // Otherwise encode it
  return {
    result: encodeToBase32(text, options),
    mode: 'encode'
  };
}

// Transform based on mode
export function transformBase32(text: string, mode: Base32Mode, options: Base32Options): { result: string; detectedMode?: 'encode' | 'decode' } {
  if (!text) return { result: '' };
  
  if (mode === 'auto') {
    const { result, mode: detectedMode } = autoDetectAndTransform(text, options);
    return { result, detectedMode };
  }
  
  if (mode === 'encode') {
    return { result: encodeToBase32(text, options) };
  }
  
  if (mode === 'decode') {
    return { result: decodeFromBase32(text, options.variant) };
  }
  
  return { result: '' };
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

// Export functions
export function exportAsText(text: string, filename: string = 'base32-output'): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// Format bytes for display
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
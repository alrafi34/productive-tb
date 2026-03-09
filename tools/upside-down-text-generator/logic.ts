import { UpsideDownOptions, FlipMode } from "./types";

export const UPSIDE_DOWN_MAP: Record<string, string> = {
  'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
  'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'ן', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
  'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
  'y': 'ʎ', 'z': 'z',
  'A': '∀', 'B': 'ᙠ', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁', 'H': 'H',
  'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ',
  'Q': 'Ὸ', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X',
  'Y': '⅄', 'Z': 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
  '8': '8', '9': '6',
  '!': '¡', '?': '¿', '.': '˙', ',': '\'', '\'': ',', '"': '„', ';': '؛', '(': ')',
  ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋',
  '_': '‾', '/': '\\', '\\': '/'
};

export const MIRROR_MAP: Record<string, string> = {
  'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'ʇ', 'g': 'ǫ', 'h': 'ʜ',
  'i': 'i', 'j': 'ꞁ', 'k': 'ʞ', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q',
  'q': 'p', 'r': 'ɿ', 's': 's', 't': 't', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
  'y': 'y', 'z': 'z'
};

export function textToUpsideDown(
  text: string,
  options: UpsideDownOptions,
  mode: FlipMode = 'upside-down'
): string {
  if (!text) return '';

  const charMap = mode === 'mirror' ? MIRROR_MAP : UPSIDE_DOWN_MAP;
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (char === '\n' && options.preserveLineBreaks) {
      result += '\n';
    } else if (char === ' ' && options.preserveSpaces) {
      result += ' ';
    } else if (/[.,!?;:'"()\[\]{}]/.test(char) && options.preservePunctuation) {
      result += charMap[char] || char;
    } else {
      result += charMap[char] || char;
    }
  }

  if (mode === 'no-reverse') {
    return result;
  }

  if (options.reverseText) {
    if (options.preserveLineBreaks && text.includes('\n')) {
      return result.split('\n').map(line => line.split('').reverse().join('')).join('\n');
    }
    return result.split('').reverse().join('');
  }

  return result;
}

export function upsideDownToText(text: string): string {
  if (!text) return '';

  const reverseMap: Record<string, string> = {};
  Object.entries(UPSIDE_DOWN_MAP).forEach(([key, value]) => {
    reverseMap[value] = key;
  });

  let result = '';
  const reversed = text.split('').reverse().join('');

  for (const char of reversed) {
    result += reverseMap[char] || char;
  }

  return result;
}

export function getPresetOptions(preset: string): Partial<UpsideDownOptions> & { mode: FlipMode } {
  switch (preset) {
    case 'classic':
      return { reverseText: true, preserveSpaces: true, preservePunctuation: true, mode: 'upside-down' };
    case 'mirrored':
      return { reverseText: true, preserveSpaces: true, preservePunctuation: true, mode: 'mirror' };
    case 'fully-flipped':
      return { reverseText: true, preserveSpaces: false, preservePunctuation: false, mode: 'upside-down' };
    default:
      return { reverseText: true, preserveSpaces: true, preservePunctuation: true, mode: 'upside-down' };
  }
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsFile(text: string, filename: string = 'upside-down-text.txt'): void {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

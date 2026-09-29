import { LeetspeakOptions } from './types';

const LEET_MAP_LIGHT: Record<string, string> = {
  'A': '4', 'E': '3', 'I': '1', 'O': '0', 'S': '5', 'T': '7'
};

const LEET_MAP_STANDARD: Record<string, string> = {
  'A': '4', 'B': '8', 'E': '3', 'G': '6', 'I': '1', 'L': '1',
  'O': '0', 'S': '5', 'T': '7', 'Z': '2'
};

const LEET_MAP_HARDCORE: Record<string, string> = {
  'A': '4', 'B': '8', 'C': '(', 'D': '|)', 'E': '3', 'F': '|=',
  'G': '6', 'H': '#', 'I': '1', 'J': '_|', 'K': '|<', 'L': '1',
  'M': '/\\/\\', 'N': '|\\|', 'O': '0', 'P': '|>', 'Q': '0_',
  'R': '|2', 'S': '5', 'T': '7', 'U': '|_|', 'V': '\\/',
  'W': '\\/\\/', 'X': '><', 'Y': '`/', 'Z': '2'
};

const LEET_MAP_RANDOM: Record<string, string[]> = {
  'A': ['4', '@', '/-\\'], 'E': ['3', '€'], 'I': ['1', '!', '|'],
  'O': ['0', '()'], 'S': ['5', '$'], 'T': ['7', '+']
};

export function textToLeetspeak(text: string, options: LeetspeakOptions): string {
  if (!text) return '';

  let map: Record<string, string> = {};
  
  switch (options.intensity) {
    case 'light':
      map = LEET_MAP_LIGHT;
      break;
    case 'standard':
      map = LEET_MAP_STANDARD;
      break;
    case 'hardcore':
      map = LEET_MAP_HARDCORE;
      break;
  }

  return text.split('').map(char => {
    const upper = char.toUpperCase();
    
    if (options.randomMode && LEET_MAP_RANDOM[upper]) {
      const variants = LEET_MAP_RANDOM[upper];
      return variants[Math.floor(Math.random() * variants.length)];
    }
    
    if (map[upper]) {
      return map[upper];
    }
    
    if (char === ' ' && !options.preserveSpaces) {
      return '';
    }
    
    return char;
  }).join('');
}

const REVERSE_MAP: Record<string, string> = {
  '4': 'a', '8': 'b', '(': 'c', '|)': 'd', '3': 'e', '|=': 'f',
  '6': 'g', '#': 'h', '1': 'i', '_|': 'j', '|<': 'k',
  '/\\/\\': 'm', '|\\|': 'n', '0': 'o', '|>': 'p', '0_': 'q',
  '|2': 'r', '5': 's', '7': 't', '|_|': 'u', '\\/': 'v',
  '\\/\\/': 'w', '><': 'x', '`/': 'y', '2': 'z',
  '@': 'a', '/-\\': 'a', '€': 'e', '!': 'i', '|': 'i', '()': 'o', '$': 's', '+': 't',
};
const REVERSE_KEYS = Object.keys(REVERSE_MAP).sort((a, b) => b.length - a.length);

/* Reads the text once from left to right, always taking the longest leet
   sequence that matches (|_| is u, not i_i), so no replacement is ever
   applied to the output of another. Letters come out lowercase; 1 is read
   as i, although it can also stand for l. */
export function leetspeakToText(leetText: string): string {
  let out = '';
  let i = 0;
  while (i < leetText.length) {
    const key = REVERSE_KEYS.find((k) => leetText.startsWith(k, i));
    if (key) {
      out += REVERSE_MAP[key];
      i += key.length;
    } else {
      out += leetText[i];
      i += 1;
    }
  }
  return out;
}

export function getPresetOptions(preset: string): Partial<LeetspeakOptions> {
  switch (preset) {
    case 'gamer':
      return { intensity: 'standard', randomMode: false, preserveSpaces: true };
    case 'hacker':
      return { intensity: 'hardcore', randomMode: true, preserveSpaces: true };
    case 'meme':
      return { intensity: 'hardcore', randomMode: false, preserveSpaces: false };
    default:
      return {};
  }
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

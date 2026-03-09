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

export function leetspeakToText(leetText: string): string {
  const reverseMap: Record<string, string> = {
    '4': 'A', '8': 'B', '(': 'C', '|)': 'D', '3': 'E', '|=': 'F',
    '6': 'G', '#': 'H', '1': 'I', '_|': 'J', '|<': 'K',
    '/\\/\\': 'M', '|\\|': 'N', '0': 'O', '|>': 'P', '0_': 'Q',
    '|2': 'R', '5': 'S', '7': 'T', '|_|': 'U', '\\/': 'V',
    '\\/\\/': 'W', '><': 'X', '`/': 'Y', '2': 'Z',
    '@': 'A', '€': 'E', '!': 'I', '()': 'O', '$': 'S', '+': 'T'
  };

  let result = leetText;
  
  Object.entries(reverseMap).sort((a, b) => b[0].length - a[0].length).forEach(([leet, normal]) => {
    result = result.replace(new RegExp(leet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), normal);
  });
  
  return result;
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

import { PalindromeOptions, PalindromeResult, BulkPalindromeResult } from './types';

export function cleanText(text: string, options: PalindromeOptions): string {
  let cleaned = text;
  
  if (options.ignoreCase) cleaned = cleaned.toLowerCase();
  if (options.ignoreSpaces) cleaned = cleaned.replace(/\s+/g, '');
  if (options.ignorePunctuation) cleaned = cleaned.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"?]/g, '');
  if (options.ignoreNumbers) cleaned = cleaned.replace(/\d/g, '');
  
  return cleaned;
}

export function reverseText(text: string): string {
  return text.split('').reverse().join('');
}

export function calculateSimilarity(str1: string, str2: string): number {
  if (str1.length === 0 && str2.length === 0) return 100;
  if (str1.length === 0 || str2.length === 0) return 0;
  
  const maxLen = Math.max(str1.length, str2.length);
  let matches = 0;
  
  for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
    if (str1[i] === str2[i]) matches++;
  }
  
  return Math.round((matches / maxLen) * 100);
}

export function getLetterFrequency(text: string): Record<string, number> {
  const freq: Record<string, number> = {};
  
  for (const char of text) {
    if (char.match(/[a-z0-9]/i)) {
      freq[char] = (freq[char] || 0) + 1;
    }
  }
  
  return freq;
}

export function checkPalindrome(text: string, options: PalindromeOptions): PalindromeResult {
  const cleaned = cleanText(text, options);
  const reversed = reverseText(cleaned);
  const isPalindrome = cleaned === reversed;
  const similarity = calculateSimilarity(cleaned, reversed);
  const letterFrequency = getLetterFrequency(cleaned);
  
  return {
    original: text,
    cleaned,
    reversed,
    isPalindrome,
    similarity,
    characterCount: cleaned.length,
    letterFrequency,
  };
}

export function checkBulkPalindromes(texts: string[], options: PalindromeOptions): BulkPalindromeResult[] {
  return texts.map(text => {
    const cleaned = cleanText(text, options);
    const reversed = reverseText(cleaned);
    return {
      text: text.trim(),
      isPalindrome: cleaned === reversed,
    };
  });
}

export function generatePalindromes(): string[] {
  return [
    'racecar',
    'madam',
    'level',
    'civic',
    'radar',
    'noon',
    'kayak',
    'refer',
    'A man a plan a canal Panama',
    'Never odd or even',
    'Was it a rat I saw',
    'Do geese see God',
    'Madam, I\'m Adam',
    'A Santa at NASA',
    'No lemon, no melon',
  ];
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

export function formatResultAsText(result: PalindromeResult): string {
  return `Palindrome Check Result
======================

Original Text: ${result.original}
Cleaned Text: ${result.cleaned}
Reversed Text: ${result.reversed}

Result: ${result.isPalindrome ? '✔ IS A PALINDROME' : '✖ NOT A PALINDROME'}
Similarity: ${result.similarity}%
Character Count: ${result.characterCount}

Letter Frequency:
${Object.entries(result.letterFrequency)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([char, count]) => `${char}: ${count}`)
  .join('\n')}
`;
}

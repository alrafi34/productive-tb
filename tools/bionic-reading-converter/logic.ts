import { BionicOptions, ConversionResult } from './types';

const SMALL_WORDS = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
  'can', 'of', 'at', 'by', 'for', 'with', 'about', 'as', 'into', 'to', 'in', 'on', 'or', 'and',
  'but', 'if', 'so', 'it', 'he', 'she', 'we', 'they', 'i', 'you']);

export function convertToBionicReading(text: string, options: BionicOptions): ConversionResult {
  if (!text.trim()) {
    return {
      html: '',
      plainText: '',
      markdown: '',
      wordCount: 0,
      boldedWords: 0
    };
  }

  /* Words are runs of letters (any alphabet), digits and inner apostrophes,
     so "don't" and "über" stay whole; everything else passes through. */
  const tokens = text.match(/[\p{L}\p{M}\p{N}]+(?:['’][\p{L}\p{M}]+)*|[^\p{L}\p{M}\p{N}]+/gu) ?? [];
  const htmlParts: string[] = [];
  const plainParts: string[] = [];
  const markdownParts: string[] = [];
  let wordCount = 0;
  let boldedWords = 0;

  for (const token of tokens) {
    const isWord = /[\p{L}\p{N}]/u.test(token);
    const skip = () => {
      htmlParts.push(escapeHtml(token));
      plainParts.push(token);
      markdownParts.push(token);
    };
    if (!isWord) { skip(); continue; }

    wordCount++;
    // Numbers are read at a glance; fixation points only help with words
    if (!/\p{L}/u.test(token)) { skip(); continue; }
    if (options.ignoreSmallWords &&
        (token.length <= options.smallWordLength || SMALL_WORDS.has(token.toLowerCase()))) {
      skip();
      continue;
    }

    // The first part of the word, by the chosen share, is bolded (at least one letter)
    const letters = Array.from(token);
    const boldLength = Math.max(1, Math.ceil(letters.length * (options.boldPercentage / 100)));
    const boldPart = letters.slice(0, boldLength).join('');
    const normalPart = letters.slice(boldLength).join('');

    htmlParts.push(`<strong>${escapeHtml(boldPart)}</strong>${escapeHtml(normalPart)}`);
    plainParts.push(token);
    markdownParts.push(`**${boldPart}**${normalPart}`);
    boldedWords++;
  }

  return {
    html: htmlParts.join(''),
    plainText: plainParts.join(''),
    markdown: markdownParts.join(''),
    wordCount,
    boldedWords
  };
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function copyToClipboard(text: string, isHtml: boolean = false): Promise<boolean> {
  try {
    if (isHtml) {
      const blob = new Blob([text], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([clipboardItem]);
    } else {
      await navigator.clipboard.writeText(text);
    }
    return true;
  } catch (err) {
    // Fallback for browsers that don't support ClipboardItem
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (fallbackErr) {
      return false;
    }
  }
}

export function downloadAsFile(content: string, filename: string, type: string = 'text/plain'): void {
  const blob = new Blob([content], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export function exportAsHtml(content: string, fontSize: number, lineHeight: number, 
                             letterSpacing: number, fontFamily: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bionic Reading Text</title>
  <style>
    body {
      font-family: ${fontFamily};
      font-size: ${fontSize}px;
      line-height: ${lineHeight};
      letter-spacing: ${letterSpacing}px;
      background-color: #ffffff;
      color: #1a1a1a;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    strong {
      font-weight: 700;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
}

export function saveToLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

export function loadFromLocalStorage(key: string): any {
  if (typeof window === 'undefined') return null as any;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error('Failed to load from localStorage:', err);
    return null;
  }
}

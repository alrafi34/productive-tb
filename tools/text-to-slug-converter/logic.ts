import { SlugOptions, SlugResult } from './types';

const STOP_WORDS = ['a', 'an', 'the', 'of', 'to', 'in', 'for', 'on', 'at', 'by', 'with', 'from', 'as', 'is', 'was', 'are', 'be', 'and', 'or', 'but'];

export function removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function textToSlug(text: string, options: SlugOptions): string {
  let slug = text;

  if (options.removeAccents) {
    slug = removeAccents(slug);
  }

  if (options.lowercase) {
    slug = slug.toLowerCase();
  }

  slug = slug.replace(/[^\w\s-]/g, '');

  if (!options.preserveNumbers) {
    slug = slug.replace(/\d+/g, '');
  }

  if (options.removeStopWords) {
    const words = slug.split(/\s+/);
    slug = words.filter(word => !STOP_WORDS.includes(word.toLowerCase())).join(' ');
  }

  slug = slug.replace(/\s+/g, options.separator);
  slug = slug.replace(new RegExp(`\\${options.separator}+`, 'g'), options.separator);
  slug = slug.replace(new RegExp(`^\\${options.separator}+|\\${options.separator}+$`, 'g'), '');

  if (options.maxLength > 0 && slug.length > options.maxLength) {
    slug = slug.substring(0, options.maxLength);
    slug = slug.replace(new RegExp(`\\${options.separator}+$`, 'g'), '');
  }

  return slug;
}

export function convertSingle(text: string, options: SlugOptions): SlugResult {
  const slug = textToSlug(text, options);
  return {
    original: text,
    slug,
    length: slug.length,
  };
}

export function convertBulk(texts: string[], options: SlugOptions): SlugResult[] {
  return texts.map(text => convertSingle(text.trim(), options));
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

export function downloadAsCSV(results: SlugResult[], filename: string): void {
  const csv = ['Original,Slug,Length', ...results.map(r => `"${r.original}","${r.slug}",${r.length}`)].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatResultsAsText(results: SlugResult[]): string {
  return results.map(r => r.slug).join('\n');
}

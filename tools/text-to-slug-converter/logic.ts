import { SlugOptions, SlugResult } from './types';

const STOP_WORDS = ['a', 'an', 'the', 'of', 'to', 'in', 'for', 'on', 'at', 'by', 'with', 'from', 'as', 'is', 'was', 'are', 'be', 'and', 'or', 'but'];

/* Letters that Unicode normalisation does not split into a base letter and
   an accent, so they need spelling out (\u00df \u2192 ss, \u00d8 \u2192 O, \u00c6 \u2192 AE). */
const TRANSLITERATE: Record<string, string> = {
  \u00df: 'ss', \u1e9e: 'SS', \u00e6: 'ae', \u00c6: 'AE', \u0153: 'oe', \u0152: 'OE', \u00f8: 'o', \u00d8: 'O', \u0142: 'l', \u0141: 'L',
  \u0111: 'd', \u0110: 'D', \u00f0: 'd', \u00d0: 'D', \u00fe: 'th', \u00de: 'TH', \u0131: 'i',
};

export function removeAccents(text: string): string {
  return text
    .replace(/[\u00df\u1e9e\u00e6\u00c6\u0153\u0152\u00f8\u00d8\u0142\u0141\u0111\u0110\u00f0\u00d0\u00fe\u00de\u0131]/g, (ch) => TRANSLITERATE[ch])
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/* Title \u2192 URL slug:
   1. optionally replace accented letters with plain ones (\u00e9 \u2192 e, \u00df \u2192 ss)
   2. "&" becomes "and"; apostrophes are dropped (don't \u2192 dont)
   3. any other punctuation, spaces, hyphens or underscores split words
   4. words are joined with the separator, optionally without stop words
   5. a length limit cuts at the last whole word that fits */
export function textToSlug(text: string, options: SlugOptions): string {
  let s = text;
  if (options.removeAccents) s = removeAccents(s);
  if (options.lowercase) s = s.toLowerCase();

  s = s.replace(/&/g, ' and ').replace(/['\u2019\u2018`]/g, '');
  // Letters and digits of any script are kept; with accents removed only ASCII remains
  let words = s.split(options.removeAccents ? /[^A-Za-z0-9]+/ : /[^\p{L}\p{M}\p{N}]+/u).filter(Boolean);
  if (!options.preserveNumbers) words = words.map((w) => w.replace(/\p{N}+/gu, '')).filter(Boolean);
  if (options.removeStopWords) {
    const kept = words.filter((w) => !STOP_WORDS.includes(w.toLowerCase()));
    if (kept.length) words = kept; // never strip a title down to nothing
  }

  let slug = words.join(options.separator);
  if (options.maxLength > 0 && slug.length > options.maxLength) {
    const cut = slug.slice(0, options.maxLength + 1);
    const lastSep = cut.lastIndexOf(options.separator);
    slug = lastSep > 0 ? cut.slice(0, lastSep) : slug.slice(0, options.maxLength);
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
  const q = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const csv = ['Original,Slug,Length', ...results.map(r => `${q(r.original)},${q(r.slug)},${r.length}`)].join('\n');
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

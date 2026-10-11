import type { NotepadSettings, SavedNote, SpeechRecognition } from './types';

// ---- Speech recognition ----

export function getRecognitionCtor(): (new () => SpeechRecognition) | null {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

/* Brave and Opera expose the API but their speech service refuses requests */
export function knownBrokenBrowser(): string | null {
  if (typeof navigator === 'undefined') return null;
  if ((navigator as Navigator & { brave?: unknown }).brave) return 'Brave';
  if (/\bOPR\//.test(navigator.userAgent)) return 'Opera';
  return null;
}

export const isAndroid = () => typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

export function errorMessage(code: string, browser: string | null): string | null {
  switch (code) {
    case 'no-speech':
    case 'aborted':
      return null; // silence or a restart; listening simply carries on
    case 'not-allowed':
    case 'service-not-allowed':
      return 'Microphone access is blocked. Click the lock or microphone icon in the address bar, allow the microphone for this site, then press Start again.';
    case 'audio-capture':
      return 'No microphone was found. Connect or enable a microphone and try again.';
    case 'network':
      return browser
        ? `${browser} does not provide speech recognition. Open this page in Chrome, Edge or Safari to dictate.`
        : 'Speech recognition needs an internet connection. Check your connection and press Start again.';
    case 'language-not-supported':
      return 'This language is not available for dictation in your browser. Choose another language.';
    default:
      return `Dictation stopped (${code}). Press Start to try again.`;
  }
}

// ---- Languages ----

export const LANGUAGES: { code: string; name: string }[] = [
  { code: 'en-US', name: 'English (United States)' },
  { code: 'en-GB', name: 'English (United Kingdom)' },
  { code: 'en-CA', name: 'English (Canada)' },
  { code: 'en-AU', name: 'English (Australia)' },
  { code: 'en-IE', name: 'English (Ireland)' },
  { code: 'en-NZ', name: 'English (New Zealand)' },
  { code: 'en-IN', name: 'English (India)' },
  { code: 'es-ES', name: 'Español (España)' },
  { code: 'es-MX', name: 'Español (México)' },
  { code: 'es-US', name: 'Español (Estados Unidos)' },
  { code: 'es-AR', name: 'Español (Argentina)' },
  { code: 'fr-FR', name: 'Français (France)' },
  { code: 'fr-CA', name: 'Français (Canada)' },
  { code: 'fr-BE', name: 'Français (Belgique)' },
  { code: 'fr-CH', name: 'Français (Suisse)' },
  { code: 'de-DE', name: 'Deutsch (Deutschland)' },
  { code: 'de-AT', name: 'Deutsch (Österreich)' },
  { code: 'de-CH', name: 'Deutsch (Schweiz)' },
  { code: 'it-IT', name: 'Italiano' },
  { code: 'pt-PT', name: 'Português (Portugal)' },
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'nl-NL', name: 'Nederlands' },
  { code: 'nl-BE', name: 'Nederlands (België)' },
  { code: 'pl-PL', name: 'Polski' },
  { code: 'sv-SE', name: 'Svenska' },
  { code: 'da-DK', name: 'Dansk' },
  { code: 'nb-NO', name: 'Norsk bokmål' },
  { code: 'fi-FI', name: 'Suomi' },
  { code: 'cs-CZ', name: 'Čeština' },
  { code: 'sk-SK', name: 'Slovenčina' },
  { code: 'hu-HU', name: 'Magyar' },
  { code: 'ro-RO', name: 'Română' },
  { code: 'bg-BG', name: 'Български' },
  { code: 'el-GR', name: 'Ελληνικά' },
  { code: 'hr-HR', name: 'Hrvatski' },
  { code: 'sr-RS', name: 'Српски' },
  { code: 'sl-SI', name: 'Slovenščina' },
  { code: 'lt-LT', name: 'Lietuvių' },
  { code: 'lv-LV', name: 'Latviešu' },
  { code: 'et-EE', name: 'Eesti' },
  { code: 'uk-UA', name: 'Українська' },
  { code: 'ru-RU', name: 'Русский' },
  { code: 'tr-TR', name: 'Türkçe' },
  { code: 'he-IL', name: 'עברית' },
  { code: 'ar-SA', name: 'العربية' },
  { code: 'hi-IN', name: 'हिन्दी' },
  { code: 'ja-JP', name: '日本語' },
  { code: 'ko-KR', name: '한국어' },
  { code: 'zh-CN', name: '中文 (普通话, 中国大陆)' },
  { code: 'zh-TW', name: '中文 (台灣)' },
  { code: 'id-ID', name: 'Bahasa Indonesia' },
  { code: 'vi-VN', name: 'Tiếng Việt' },
];

/* The visitor's browser language if we offer it, else the same language in
   another region, else US English */
export function defaultLanguage(preferred: readonly string[]): string {
  for (const p of preferred) {
    const exact = LANGUAGES.find(l => l.code.toLowerCase() === p.toLowerCase());
    if (exact) return exact.code;
  }
  for (const p of preferred) {
    const base = p.split('-')[0].toLowerCase();
    const same = LANGUAGES.find(l => l.code.split('-')[0] === base);
    if (same) return same.code;
  }
  return 'en-US';
}

// ---- Voice commands ----

const PARA = '\n\n';
const LINE = '\n';

/* Spoken phrase → text, per language. Longer phrases first, so "punto y
   coma" wins over "punto". */
const COMMANDS: Record<string, [string, string][]> = {
  en: [
    ['new paragraph', PARA], ['new line', LINE], ['next line', LINE],
    ['question mark', '?'], ['exclamation mark', '!'], ['exclamation point', '!'],
    ['full stop', '.'], ['period', '.'], ['comma', ','], ['semicolon', ';'], ['colon', ':'],
  ],
  es: [
    ['nuevo párrafo', PARA], ['punto y aparte', '.' + PARA], ['nueva línea', LINE],
    ['signo de interrogación', '?'], ['signo de exclamación', '!'],
    ['punto y coma', ';'], ['dos puntos', ':'], ['punto', '.'], ['coma', ','],
  ],
  fr: [
    ['nouveau paragraphe', PARA], ['nouvelle ligne', LINE], ['à la ligne', LINE],
    ["point d'interrogation", '?'], ["point d'exclamation", '!'],
    ['point-virgule', ';'], ['point virgule', ';'], ['deux points', ':'], ['deux-points', ':'],
    ['virgule', ','], ['point', '.'],
  ],
  de: [
    ['neuer absatz', PARA], ['neue zeile', LINE],
    ['fragezeichen', '?'], ['ausrufezeichen', '!'], ['doppelpunkt', ':'], ['semikolon', ';'],
    ['punkt', '.'], ['komma', ','],
  ],
};

export const commandLanguages = Object.keys(COMMANDS);

export function commandsFor(lang: string): [string, string][] {
  return COMMANDS[lang.split('-')[0]] ?? [];
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function applyCommands(chunk: string, lang: string): string {
  let out = chunk;
  for (const [phrase, value] of commandsFor(lang)) {
    const words = phrase.split(/[\s-]+/).map(w => escapeRe(w).replace(/'/g, "['’]")).join('[\\s-]+');
    // \p{L} instead of \b so accented words (párrafo, línea) match whole
    out = out.replace(new RegExp(`(^|[^\\p{L}])${words}(?![\\p{L}])`, 'giu'), (_, pre) => `${pre}\u0000${value}\u0000`);
  }
  return out
    .replace(/\s*\u0000([^\u0000]*)\u0000\s*/g, (_, v: string) => (v.includes('\n') ? v : `${v} `))
    .replace(/ +$/, ' ');
}

// ---- Inserting dictated text ----

const SENTENCE_END = /(^|[.!?…]\s*|\n\s*)$/;

const capitalise = (s: string) => s.replace(/^(\s*)(\p{Ll})/u, (_, sp, c: string) => sp + c.toLocaleUpperCase());

/* Joins a dictated chunk into the note at `at`, with spacing and sentence
   capitals; returns the new text and where the caret goes */
export function insertChunk(text: string, at: number, rawChunk: string, autoCap: boolean): { text: string; caret: number } {
  const before = text.slice(0, at);
  const after = text.slice(at);
  let chunk = rawChunk.replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n');
  if (!chunk.trim() && !chunk.includes('\n')) return { text, caret: at };

  if (/^[.,!?;:…]/.test(chunk.trimStart())) {
    // Punctuation hugs the previous word
    const trimmedBefore = before.replace(/[ \t]+$/, '');
    chunk = chunk.trimStart();
    const joined = trimmedBefore + chunk;
    return finish(joined, after, autoCap);
  }
  if (chunk.startsWith('\n')) return finish(before.replace(/[ \t]+$/, '') + chunk, after, autoCap);

  chunk = chunk.trimStart();
  if (autoCap && SENTENCE_END.test(before)) chunk = capitalise(chunk);
  const needsSpace = before.length > 0 && !/\s$/.test(before);
  return finish(before + (needsSpace ? ' ' : '') + chunk, after, autoCap);
}

function finish(head: string, after: string, autoCap: boolean): { text: string; caret: number } {
  let h = head;
  if (autoCap) {
    // Capitals after sentence ends and line breaks inside the dictated part
    h = h.replace(/([.!?]\s+|\n)(\p{Ll})/gu, (_, sep: string, c: string) => sep + c.toLocaleUpperCase());
  }
  if (after && /^\S/.test(after) && !/[\s]$/.test(h) && !/^[.,!?;:…]/.test(after)) h += ' ';
  else if (!after && !/\s$/.test(h)) h += ' ';
  return { text: h + after, caret: h.length };
}

// ---- Counting ----

export function countWords(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

export function readingMinutes(text: string): number {
  return Math.max(1, Math.round(countWords(text) / 200));
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  return `${m}:${String(seconds % 60).padStart(2, '0')}`;
}

// ---- Files ----

function fileStamp(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}

function save(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export function downloadText(text: string) {
  save(new Blob([text], { type: 'text/plain;charset=utf-8' }), `voice-notes-${fileStamp()}.txt`);
}

export function downloadMarkdown(text: string) {
  save(new Blob([text], { type: 'text/markdown;charset=utf-8' }), `voice-notes-${fileStamp()}.md`);
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* A Word-compatible document: Word opens HTML saved with the .doc type */
export function downloadWord(text: string) {
  const body = text
    .split(/\n{2,}/)
    .map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('\n');
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>Voice notes</title></head><body style="font-family:Calibri,Arial,sans-serif;font-size:12pt">${body}</body></html>`;
  save(new Blob(['﻿', html], { type: 'application/msword' }), `voice-notes-${fileStamp()}.doc`);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

// ---- Storage on this device ----

const KEYS = { note: 'voice-notepad-current', settings: 'voice-notepad-settings', saved: 'voice-notepad-saved' };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked: the note still works for this visit
  }
}

export function loadNote(): string {
  try {
    return localStorage.getItem(KEYS.note) ?? '';
  } catch {
    return '';
  }
}

export function storeNote(text: string) {
  try {
    localStorage.setItem(KEYS.note, text);
  } catch {
    // Storage full or blocked: the note still works for this visit
  }
}

export function loadSettings(fallbackLanguage: string): NotepadSettings {
  const s = read<Partial<NotepadSettings>>(KEYS.settings, {});
  return {
    language: typeof s.language === 'string' && LANGUAGES.some(l => l.code === s.language) ? s.language : fallbackLanguage,
    autoSave: s.autoSave !== false,
    voiceCommands: s.voiceCommands !== false,
    autoCapitalize: s.autoCapitalize !== false,
  };
}

export const storeSettings = (s: NotepadSettings) => write(KEYS.settings, s);

export function loadSavedNotes(): SavedNote[] {
  const list = read<SavedNote[]>(KEYS.saved, []);
  return Array.isArray(list) ? list.filter(n => n && typeof n.content === 'string') : [];
}

export function storeSavedNotes(list: SavedNote[]) {
  write(KEYS.saved, list.slice(0, 20));
}

export function makeSavedNote(content: string): SavedNote {
  return { id: Math.random().toString(36).slice(2, 11), content, timestamp: Date.now(), wordCount: countWords(content) };
}

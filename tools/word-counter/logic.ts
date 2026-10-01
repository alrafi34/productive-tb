export function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}
// Code points, so an emoji or accented letter counts once, not as two UTF-16 units
export function countCharacters(text: string): number { return Array.from(text).length; }
export function countCharactersNoSpaces(text: string): number { return Array.from(text.replace(/\s/g, "")).length; }
export function countParagraphs(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\n\s*\n+/).length;
}
export function countSentences(text: string): number {
  if (text.trim() === "") return 0;
  return (text.match(/[.!?]+/g) ?? []).length || 1;
}
export function estimateReadingTime(text: string): number {
  return Math.ceil(countWords(text) / 200);
}

/* Rates behind the derived figures. Pages assume a 12 pt font with 1-inch
   margins; real page counts shift with font, headings and spacing. */
export const READING_WPM = 200;
export const SPEAKING_WPM = 130;
export const WORDS_PER_PAGE_SINGLE = 500;
export const WORDS_PER_PAGE_DOUBLE = 250;

// "4 min 37 sec", "45 sec"
export function formatDuration(words: number, wpm: number): string {
  const seconds = Math.round((words / wpm) * 60);
  if (seconds < 60) return `${seconds} sec`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s ? `${m} min ${s} sec` : `${m} min`;
}

export function pages(words: number, perPage: number): string {
  if (words === 0) return "0";
  const p = words / perPage;
  return p < 0.1 ? "< 0.1" : p.toFixed(1).replace(/\.0$/, "");
}

export function averageSentenceLength(text: string): number {
  const sentences = countSentences(text);
  return sentences ? countWords(text) / sentences : 0;
}

export function uniqueWordCount(text: string): number {
  return new Set(tokens(text)).size;
}

// Lower-case words for frequency counts: letters, digits and inner apostrophes or hyphens
function tokens(text: string): string[] {
  return (text.toLowerCase().match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ?? []);
}

const STOP_WORDS = new Set(
  ("a an and are as at be but by for from has have he her his i if in into is it its me my " +
    "no not of on or our she so than that the their them then there these they this to too " +
    "us was we were what when which who will with you your").split(" "),
);

export type WordFrequency = { word: string; count: number; percent: number };

export function topWords(text: string, limit = 10, skipCommon = true): WordFrequency[] {
  const all = tokens(text);
  const counts = new Map<string, number>();
  for (const w of all) {
    if (skipCommon && STOP_WORDS.has(w)) continue;
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word, count]) => ({ word, count, percent: (count / all.length) * 100 }));
}

/* Character limits checked against the text. Published limits as of 2026;
   platforms change them, so the page says so. */
export const LIMITS: { name: string; limit: number; note?: string }[] = [
  { name: "SEO title tag", limit: 60, note: "Google cuts titles by pixel width; about 60 characters fit" },
  { name: "Meta description", limit: 160, note: "Longer descriptions are usually cut in results" },
  { name: "SMS (one segment)", limit: 160, note: "Plain GSM characters; emoji drop a segment to 70" },
  { name: "X post", limit: 280, note: "X counts emoji and CJK characters as 2" },
  { name: "Instagram caption", limit: 2200 },
  { name: "LinkedIn post", limit: 3000 },
];

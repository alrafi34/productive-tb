// ── Keyword Density Calculator Logic ──

export type NGramMode = "single" | "bigram" | "trigram" | "all";
export type SortMode  = "frequency" | "density" | "alpha" | "occurrence";

export interface KeywordEntry {
  word: string;
  count: number;
  density: number;         // 0–100
  densityFormatted: string;
  rank: number;
  firstIndex: number;      // position of first occurrence in token array
}

export interface ContentStats {
  totalWords: number;
  uniqueWords: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMin: number;   // at 238 wpm
  speakingTimeMin: number;  // at 130 wpm
  avgWordLength: number;
  longestWord: string;
}

export interface AnalysisResult {
  stats: ContentStats;
  singles:  KeywordEntry[];
  bigrams:  KeywordEntry[];
  trigrams: KeywordEntry[];
  // Specific keyword search result
  searchResult: KeywordEntry | null;
  // Density warnings
  warnings: string[];
}

// ── Stop Words ───────────────────────────────────────────────────────────────

export const STOP_WORDS = new Set([
  "a","about","above","after","again","against","all","am","an","and","any","are",
  "as","at","be","because","been","before","being","below","between","both","but",
  "by","can","did","do","does","doing","down","during","each","few","for","from",
  "further","get","got","had","has","have","having","he","her","here","hers",
  "herself","him","himself","his","how","i","if","in","into","is","it","its",
  "itself","just","me","more","most","my","myself","no","nor","not","now","of",
  "off","on","once","only","or","other","our","ours","ourselves","out","over",
  "own","same","she","should","so","some","such","than","that","the","their",
  "theirs","them","themselves","then","there","these","they","this","those",
  "through","to","too","under","until","up","us","very","was","we","were","what",
  "when","where","which","while","who","whom","why","will","with","you","your",
  "yours","yourself","yourselves","been","also","would","could","shall","may",
  "might","must","let","said","say","see","like","one","two","three","new","well",
  "back","still","way","even","take","know","get","go","come","think","make",
  "use","want","give","tell","keep","put","seem","old","find","ask","turn","work",
]);

// ── Core Text Processing ──────────────────────────────────────────────────────

export function tokenize(
  text: string,
  opts: { caseSensitive: boolean; includeNumbers: boolean; minLength: number; ignoreStopWords: boolean }
): string[] {
  let t = text;
  if (!opts.caseSensitive) t = t.toLowerCase();
  // Remove punctuation (keep apostrophes inside words briefly)
  t = t.replace(/[^\w\s']/g, " ").replace(/'/g, "");
  const raw = t.split(/\s+/).filter(Boolean);

  return raw.filter((w) => {
    if (!opts.includeNumbers && /^\d+$/.test(w)) return false;
    if (w.length < opts.minLength) return false;
    if (opts.ignoreStopWords && STOP_WORDS.has(w.toLowerCase())) return false;
    return true;
  });
}

function buildFreqMap(tokens: string[]): Map<string, { count: number; firstIndex: number }> {
  const map = new Map<string, { count: number; firstIndex: number }>();
  tokens.forEach((t, i) => {
    if (map.has(t)) {
      map.get(t)!.count++;
    } else {
      map.set(t, { count: 1, firstIndex: i });
    }
  });
  return map;
}

function buildNgramFreqMap(tokens: string[], n: number): Map<string, { count: number; firstIndex: number }> {
  const map = new Map<string, { count: number; firstIndex: number }>();
  for (let i = 0; i <= tokens.length - n; i++) {
    const gram = tokens.slice(i, i + n).join(" ");
    if (map.has(gram)) {
      map.get(gram)!.count++;
    } else {
      map.set(gram, { count: 1, firstIndex: i });
    }
  }
  return map;
}

function mapToEntries(
  map: Map<string, { count: number; firstIndex: number }>,
  totalWords: number,
  sort: SortMode,
  limit = 50
): KeywordEntry[] {
  const entries: KeywordEntry[] = [];
  map.forEach(({ count, firstIndex }, word) => {
    const density = totalWords > 0 ? (count / totalWords) * 100 : 0;
    entries.push({ word, count, density, densityFormatted: density.toFixed(2) + "%", rank: 0, firstIndex });
  });

  entries.sort((a, b) => {
    if (sort === "frequency" || sort === "density") return b.count - a.count;
    if (sort === "alpha")      return a.word.localeCompare(b.word);
    if (sort === "occurrence") return a.firstIndex - b.firstIndex;
    return b.count - a.count;
  });

  return entries.slice(0, limit).map((e, i) => ({ ...e, rank: i + 1 }));
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export function computeStats(text: string): ContentStats {
  const chars            = text.length;
  const charsNoSpaces    = text.replace(/\s/g, "").length;
  const sentences        = (text.match(/[.!?]+/g) ?? []).length || (text.trim() ? 1 : 0);
  const paragraphs       = text.split(/\n\s*\n/).filter((p) => p.trim()).length || (text.trim() ? 1 : 0);

  // raw words (all of them, including stop words, for accurate stats)
  const rawWords = text.replace(/[^\w\s]/g, " ").split(/\s+/).filter(Boolean);
  const totalWords = rawWords.length;

  const readingTimeMin  = totalWords / 238;
  const speakingTimeMin = totalWords / 130;

  const lengths = rawWords.map((w) => w.length);
  const avgWordLength = totalWords > 0 ? lengths.reduce((a, b) => a + b, 0) / totalWords : 0;
  const longestWord = rawWords.reduce((a, b) => (b.length > a.length ? b : a), "");

  return {
    totalWords,
    uniqueWords: new Set(rawWords.map((w) => w.toLowerCase())).size,
    characters: chars,
    charactersNoSpaces: charsNoSpaces,
    sentences,
    paragraphs,
    readingTimeMin,
    speakingTimeMin,
    avgWordLength,
    longestWord,
  };
}

// ── Main Analyzer ─────────────────────────────────────────────────────────────

export interface AnalysisOptions {
  caseSensitive:    boolean;
  includeNumbers:   boolean;
  minLength:        number;
  ignoreStopWords:  boolean;
  ngramMode:        NGramMode;
  sortMode:         SortMode;
  searchKeyword:    string;
}

export function analyzeContent(text: string, opts: AnalysisOptions): AnalysisResult | null {
  if (!text.trim()) return null;

  const stats = computeStats(text);
  const tokens = tokenize(text, opts);
  const totalWords = stats.totalWords;

  const singleMap = buildFreqMap(tokens);
  const bigramMap = buildNgramFreqMap(tokens, 2);
  const trigramMap = buildNgramFreqMap(tokens, 3);

  const singles  = mapToEntries(singleMap,  totalWords, opts.sortMode, 100);
  const bigrams  = mapToEntries(bigramMap,  totalWords, opts.sortMode, 50);
  const trigrams = mapToEntries(trigramMap, totalWords, opts.sortMode, 30);

  // Specific keyword search
  let searchResult: KeywordEntry | null = null;
  if (opts.searchKeyword.trim()) {
    const kw = opts.caseSensitive
      ? opts.searchKeyword.trim()
      : opts.searchKeyword.trim().toLowerCase();
    const kwTokens = kw.split(/\s+/).filter(Boolean);
    if (kwTokens.length === 1) {
      const entry = singles.find((e) => e.word === kwTokens[0]) ?? null;
      searchResult = entry;
    } else if (kwTokens.length === 2) {
      const entry = bigrams.find((e) => e.word === kwTokens.join(" ")) ?? null;
      searchResult = entry;
    } else {
      const entry = trigrams.find((e) => e.word === kwTokens.join(" ")) ?? null;
      searchResult = entry;
    }
    // If not in filtered list, do a raw count
    if (!searchResult) {
      const kwStr = kwTokens.join(" ");
      const rawText = opts.caseSensitive ? text : text.toLowerCase();
      const escaped = kwStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const matches = rawText.match(new RegExp(`\\b${escaped}\\b`, "g")) ?? [];
      if (matches.length > 0) {
        const density = totalWords > 0 ? (matches.length / totalWords) * 100 : 0;
        searchResult = {
          word: opts.caseSensitive ? opts.searchKeyword.trim() : opts.searchKeyword.trim().toLowerCase(),
          count: matches.length,
          density,
          densityFormatted: density.toFixed(2) + "%",
          rank: 0,
          firstIndex: 0,
        };
      }
    }
  }

  // Warnings
  const warnings: string[] = [];
  if (totalWords < 300) warnings.push("Your content is under 300 words. Consider expanding it for better SEO coverage.");
  if (singles[0]?.density > 5) warnings.push(`"${singles[0].word}" has a density of ${singles[0].densityFormatted}, which may appear unnatural. Consider using synonyms.`);
  if (searchResult && searchResult.density > 5) warnings.push(`Your target keyword "${searchResult.word}" has a density of ${searchResult.densityFormatted}, which may look like keyword stuffing.`);

  return { stats, singles, bigrams, trigrams, searchResult, warnings };
}

// ── Export Helpers ────────────────────────────────────────────────────────────

export function entriesToCsv(entries: KeywordEntry[], label = "Keyword"): string {
  const header = `Rank,${label},Count,Density`;
  const rows = entries.map((e) => `${e.rank},"${e.word}",${e.count},${e.densityFormatted}`);
  return [header, ...rows].join("\n");
}

export function buildFullReport(result: AnalysisResult): string {
  const { stats, singles, bigrams } = result;
  return [
    "Keyword Density Analysis Report",
    "================================",
    "",
    `Total Words:    ${stats.totalWords.toLocaleString("en-US")}`,
    `Unique Words:   ${stats.uniqueWords.toLocaleString("en-US")}`,
    `Characters:     ${stats.characters.toLocaleString("en-US")}`,
    `Sentences:      ${stats.sentences.toLocaleString("en-US")}`,
    `Paragraphs:     ${stats.paragraphs.toLocaleString("en-US")}`,
    `Reading Time:   ${formatTime(stats.readingTimeMin)}`,
    "",
    "Top Keywords",
    "------------",
    ...singles.slice(0, 20).map((e) => `${e.rank}. ${e.word} — ${e.count}x (${e.densityFormatted})`),
    "",
    "Top 2-Word Phrases",
    "------------------",
    ...bigrams.slice(0, 10).map((e) => `${e.rank}. ${e.word} — ${e.count}x (${e.densityFormatted})`),
    "",
    "Generated by Productive Toolbox",
  ].join("\n");
}

export function formatTime(minutes: number): string {
  if (minutes < 1) return `< 1 min`;
  const m = Math.floor(minutes);
  const s = Math.round((minutes - m) * 60);
  return s > 0 ? `${m} min ${s} sec` : `${m} min`;
}

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

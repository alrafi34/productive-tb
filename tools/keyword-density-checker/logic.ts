import type { DensityData, AnalysisOptions } from "./types";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he",
  "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "will", "with"
]);

export function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}

export function countUniqueWords(
  text: string,
  options: AnalysisOptions = {}
): Record<string, number> {
  if (!text.trim()) return {};
  
  const { ignoreStopWords = false, caseSensitive = false, minWordLength = 1 } = options;
  const words = text.match(/\b[\w']+\b/g) || [];
  const counts: Record<string, number> = {};
  
  words.forEach(word => {
    let w = caseSensitive ? word : word.toLowerCase();
    if (w.length < minWordLength) return;
    if (ignoreStopWords && STOP_WORDS.has(w.toLowerCase())) return;
    counts[w] = (counts[w] || 0) + 1;
  });
  
  return counts;
}

export function calculateDensity(
  wordCounts: Record<string, number>,
  totalWords: number
): DensityData[] {
  if (totalWords === 0) return [];
  
  return Object.entries(wordCounts).map(([word, count]) => ({
    word,
    count,
    density: (count / totalWords) * 100
  }));
}

export function highlightOverusedWords(
  densityData: DensityData[],
  threshold: number = 5
): string[] {
  return densityData.filter(d => d.density >= threshold).map(d => d.word);
}

export function sortDensityData(
  densityData: DensityData[],
  sortBy: "count" | "density" | "word",
  order: "asc" | "desc"
): DensityData[] {
  const sorted = [...densityData].sort((a, b) => {
    if (sortBy === "word") return a.word.localeCompare(b.word);
    return a[sortBy] - b[sortBy];
  });
  return order === "desc" ? sorted.reverse() : sorted;
}

export function exportToCSV(data: DensityData[]): string {
  const header = "Word or phrase,Count,Density (%)\n";
  const rows = data.map(d => `"${d.word}",${d.count},${d.density.toFixed(2)}`).join("\n");
  return header + rows;
}

export function exportToJSON(data: DensityData[]): string {
  return JSON.stringify(data, null, 2);
}

/* ── Phrases and target keywords ─────────────────────────────────────────── */

const WORD = /[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu;

// Words of each sentence, so a phrase never runs across a full stop
function sentenceTokens(text: string, caseSensitive: boolean): string[][] {
  return text
    .split(/[.!?;:\n]+/)
    .map(s => (s.match(WORD) || []).map(w => (caseSensitive ? w : w.toLowerCase())))
    .filter(s => s.length > 0);
}

/* Two- or three-word phrases and how often each appears. With stop words
   ignored, phrases that start or end with one ("of the", "and then") are
   skipped, so the list shows phrases like "keyword density checker". */
export function countPhrases(
  text: string,
  size: 2 | 3,
  options: AnalysisOptions = {}
): Record<string, number> {
  const { ignoreStopWords = false, caseSensitive = false } = options;
  const counts: Record<string, number> = {};
  for (const words of sentenceTokens(text, caseSensitive)) {
    for (let i = 0; i + size <= words.length; i++) {
      const phrase = words.slice(i, i + size);
      if (ignoreStopWords && (STOP_WORDS.has(phrase[0].toLowerCase()) || STOP_WORDS.has(phrase[size - 1].toLowerCase()))) continue;
      const key = phrase.join(" ");
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  // A phrase that appears once is noise in a density list
  for (const key of Object.keys(counts)) if (counts[key] < 2) delete counts[key];
  return counts;
}

/* How many times a target keyword or phrase appears, matched on whole words
   and never across sentences. */
export function countTarget(text: string, target: string, caseSensitive = false): number {
  const want = (target.match(WORD) || []).map(w => (caseSensitive ? w : w.toLowerCase()));
  if (want.length === 0) return 0;
  let count = 0;
  for (const words of sentenceTokens(text, caseSensitive)) {
    for (let i = 0; i + want.length <= words.length; i++) {
      if (want.every((w, j) => words[i + j] === w)) count++;
    }
  }
  return count;
}

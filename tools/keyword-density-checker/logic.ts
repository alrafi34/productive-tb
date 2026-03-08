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

export function filterTargetKeywords(
  densityData: DensityData[],
  targets: string[]
): DensityData[] {
  if (!targets.length) return densityData;
  const targetSet = new Set(targets.map(t => t.toLowerCase()));
  return densityData.filter(d => targetSet.has(d.word.toLowerCase()));
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
  const header = "Word,Count,Density (%)\n";
  const rows = data.map(d => `"${d.word}",${d.count},${d.density.toFixed(2)}`).join("\n");
  return header + rows;
}

export function exportToJSON(data: DensityData[]): string {
  return JSON.stringify(data, null, 2);
}

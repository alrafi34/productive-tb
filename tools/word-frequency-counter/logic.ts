import type { WordFrequency, AnalysisResult, FilterOptions } from "./types";

const STOP_WORDS = new Set([
  "the", "is", "and", "a", "an", "of", "to", "in", "on", "for", "with", "by",
  "at", "from", "as", "it", "that", "this", "be", "are", "was", "were", "been",
  "have", "has", "had", "do", "does", "did", "will", "would", "could", "should",
  "may", "might", "can", "or", "but", "if", "then", "than", "so", "not", "no",
  "yes", "all", "any", "some", "such", "what", "which", "who", "when", "where",
  "why", "how", "i", "you", "he", "she", "we", "they", "them", "their", "my",
  "your", "his", "her", "its", "our", "me", "him"
]);

export function normalizeText(text: string, caseSensitive: boolean = false): string {
  if (!text) return "";
  let normalized = text.replace(/[^\w\s'-]/g, " ");
  return caseSensitive ? normalized : normalized.toLowerCase();
}

export function tokenizeWords(text: string): string[] {
  if (!text) return [];
  return text.split(/\s+/).filter(word => word.length > 0);
}

export function removeStopWords(words: string[]): string[] {
  return words.filter(word => !STOP_WORDS.has(word.toLowerCase()));
}

export function filterByLength(words: string[], minLength: number): string[] {
  return words.filter(word => word.length >= minLength);
}

export function removeNumbers(words: string[]): string[] {
  return words.filter(word => !/^\d+$/.test(word));
}

export function countWordFrequency(words: string[]): Map<string, number> {
  const frequency = new Map<string, number>();
  words.forEach(word => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });
  return frequency;
}

export function calculatePercentages(
  frequencies: Map<string, number>,
  totalWords: number
): WordFrequency[] {
  const result: WordFrequency[] = [];
  
  frequencies.forEach((count, word) => {
    result.push({
      word,
      count,
      percentage: (count / totalWords) * 100
    });
  });
  
  return result.sort((a, b) => b.count - a.count);
}

export function analyzeText(text: string, options: FilterOptions): AnalysisResult {
  let normalized = normalizeText(text, options.caseSensitive);
  let words = tokenizeWords(normalized);
  
  const totalWords = words.length;
  
  if (options.removeStopWords) {
    words = removeStopWords(words);
  }
  
  if (options.minWordLength > 1) {
    words = filterByLength(words, options.minWordLength);
  }
  
  if (options.ignoreNumbers) {
    words = removeNumbers(words);
  }
  
  const frequencies = countWordFrequency(words);
  const wordFrequencies = calculatePercentages(frequencies, words.length);
  
  const mostFrequent = wordFrequencies[0] || { word: "N/A", count: 0 };
  
  return {
    totalWords,
    uniqueWords: frequencies.size,
    mostFrequentWord: mostFrequent.word,
    highestFrequency: mostFrequent.count,
    words: wordFrequencies
  };
}

export function exportToCSV(words: WordFrequency[]): string {
  const header = "Rank,Word,Count,Percentage\n";
  const rows = words.map((w, i) => 
    `${i + 1},${w.word},${w.count},${w.percentage.toFixed(2)}%`
  ).join("\n");
  return header + rows;
}

export function exportToJSON(result: AnalysisResult): string {
  return JSON.stringify(result, null, 2);
}

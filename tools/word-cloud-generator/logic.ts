const DEFAULT_STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "from",
  "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did",
  "will", "would", "could", "should", "may", "might", "must", "can", "this", "that", "these",
  "those", "i", "you", "he", "she", "it", "we", "they", "what", "which", "who", "when", "where",
  "why", "how", "all", "each", "every", "both", "few", "more", "most", "other", "some", "such",
  "no", "nor", "not", "only", "same", "so", "than", "too", "very", "as", "if", "just", "about",
  "into", "through", "during", "before", "after", "above", "below", "up", "down", "out", "off",
  "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why",
  "how", "all", "am", "as", "being", "been", "be", "because", "between", "both", "but", "by",
  "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further",
  "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him", "himself",
  "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just", "me", "might",
  "more", "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or",
  "other", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "should", "so",
  "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then",
  "there", "these", "they", "this", "those", "through", "to", "too", "under", "until", "up",
  "very", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why",
  "with", "would", "you", "your", "yours", "yourself", "yourselves"
]);

export function calculateWordFrequency(text: string, useStopWords: boolean = true): Map<string, number> {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 0);

  const frequency = new Map<string, number>();

  for (const word of words) {
    if (useStopWords && DEFAULT_STOP_WORDS.has(word)) continue;
    frequency.set(word, (frequency.get(word) || 0) + 1);
  }

  return frequency;
}

export function getTopWords(frequency: Map<string, number>, maxWords: number = 100): Array<[string, number]> {
  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxWords);
}

export function mapFrequencyToFontSize(frequency: number, maxFreq: number, minSize: number = 12, maxSize: number = 48): number {
  return minSize + (frequency / maxFreq) * (maxSize - minSize);
}

export function generateRandomColor(): string {
  const hue = Math.random() * 360;
  const saturation = 70 + Math.random() * 30;
  const lightness = 45 + Math.random() * 20;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function generateMonochromeColor(index: number, total: number): string {
  const lightness = 30 + (index / total) * 50;
  return `hsl(0, 0%, ${lightness}%)`;
}

export function generateGradientColor(index: number, total: number): string {
  const hue = (index / total) * 360;
  return `hsl(${hue}, 70%, 50%)`;
}

export function getColorForWord(index: number, total: number, scheme: "random" | "monochrome" | "gradient"): string {
  switch (scheme) {
    case "monochrome":
      return generateMonochromeColor(index, total);
    case "gradient":
      return generateGradientColor(index, total);
    case "random":
    default:
      return generateRandomColor();
  }
}

export function generateRandomRotation(maxRotation: number = 0): number {
  if (maxRotation === 0) return 0;
  return (Math.random() - 0.5) * 2 * maxRotation;
}

export function exportToJSON(words: Array<[string, number]>): string {
  const data = words.map(([word, freq]) => ({ word, frequency: freq }));
  return JSON.stringify(data, null, 2);
}

export function exportToCSV(words: Array<[string, number]>): string {
  const header = "Word,Frequency\n";
  const rows = words.map(([word, freq]) => `"${word}",${freq}`).join("\n");
  return header + rows;
}

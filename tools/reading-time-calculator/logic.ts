export function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}

export function countCharacters(text: string): number {
  return text.length;
}

export function countCharactersNoSpaces(text: string): number {
  return text.replace(/\s/g, "").length;
}

export function countParagraphs(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\n\s*\n+/).length;
}

export function countSentences(text: string): number {
  if (text.trim() === "") return 0;
  return (text.match(/[.!?]+/g) ?? []).length || 1;
}

export function calculateReadingTime(text: string, wpm: number): number {
  const words = countWords(text);
  return words === 0 ? 0 : Math.ceil(words / wpm);
}

export function calculateSpeakingTime(text: string): number {
  // Average speaking speed is 150 WPM
  return calculateReadingTime(text, 150);
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 0) return "0 min";
  if (minutes < 1) return "< 1 min";
  return `${minutes} min`;
}

export function getReadingDifficulty(wordCount: number): string {
  if (wordCount < 100) return "Very Short";
  if (wordCount < 500) return "Short";
  if (wordCount < 1500) return "Medium";
  if (wordCount < 3000) return "Long";
  return "Very Long";
}

export const READING_SPEEDS = {
  slow: { wpm: 150, label: "Slow Reader" },
  average: { wpm: 200, label: "Average Reader" },
  fast: { wpm: 250, label: "Fast Reader" },
  speed: { wpm: 300, label: "Speed Reader" }
};

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
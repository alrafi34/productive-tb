export function countWords(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}
export function countCharacters(text: string): number { return text.length; }
export function countCharactersNoSpaces(text: string): number { return text.replace(/\s/g, "").length; }
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

export function reverseLetters(text: string): string {
  return text.split('').reverse().join('');
}

export function reverseWords(text: string): string {
  return text.trim().split(/\s+/).reverse().join(' ');
}

export function reverseEachWord(text: string): string {
  return text.split(/\s+/).map(word => word.split('').reverse().join('')).join(' ');
}

export function reverseSentenceOrder(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  return sentences.reverse().join(' ').trim();
}

export function reverseParagraphOrder(text: string): string {
  const paragraphs = text.split(/\n\n+/);
  return paragraphs.reverse().join('\n\n');
}

export function normalizeText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function countCharacters(text: string): number {
  return text.length;
}

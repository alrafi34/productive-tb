import { AnagramOptions, AnagramResult, LetterFrequency, BulkAnagramResult } from './types';

export function cleanText(text: string, options: AnagramOptions): string {
  let cleaned = text;

  if (options.ignoreCase) {
    cleaned = cleaned.toLowerCase();
  }

  if (options.ignoreSpaces) {
    cleaned = cleaned.replace(/\s+/g, '');
  }

  if (options.ignorePunctuation) {
    cleaned = cleaned.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  }

  if (options.ignoreSpecialChars) {
    cleaned = cleaned.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  return cleaned;
}

export function calculateLetterFrequency(text: string): LetterFrequency {
  const frequency: LetterFrequency = {};
  
  for (const char of text) {
    if (char.trim()) {
      frequency[char] = (frequency[char] || 0) + 1;
    }
  }

  return frequency;
}

export function sortString(text: string): string {
  return text.split('').sort().join('');
}

export function calculateSimilarity(textA: string, textB: string): number {
  const setA = new Set(textA.split(''));
  const setB = new Set(textB.split(''));
  
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  
  if (union.size === 0) return 0;
  
  return Math.round((intersection.size / union.size) * 100);
}

export function findMatchingAndMismatched(
  freqA: LetterFrequency,
  freqB: LetterFrequency
): { matching: string[]; mismatched: string[] } {
  const matching: string[] = [];
  const mismatched: string[] = [];
  const allKeys = new Set([...Object.keys(freqA), ...Object.keys(freqB)]);

  allKeys.forEach(key => {
    const countA = freqA[key] || 0;
    const countB = freqB[key] || 0;

    if (countA === countB && countA > 0) {
      matching.push(key);
    } else if (countA !== countB) {
      mismatched.push(key);
    }
  });

  return { matching, mismatched };
}

export function checkAnagram(
  textA: string,
  textB: string,
  options: AnagramOptions
): AnagramResult {
  const cleanedA = cleanText(textA, options);
  const cleanedB = cleanText(textB, options);

  const sortedA = sortString(cleanedA);
  const sortedB = sortString(cleanedB);

  const isAnagram = sortedA === sortedB && sortedA.length > 0;

  const frequencyA = calculateLetterFrequency(cleanedA);
  const frequencyB = calculateLetterFrequency(cleanedB);

  const { matching, mismatched } = findMatchingAndMismatched(frequencyA, frequencyB);

  const similarityPercentage = calculateSimilarity(cleanedA, cleanedB);

  return {
    isAnagram,
    textA,
    textB,
    cleanedA,
    cleanedB,
    sortedA,
    sortedB,
    frequencyA,
    frequencyB,
    matchingLetters: matching,
    mismatchedLetters: mismatched,
    similarityPercentage
  };
}

export function checkBulkAnagrams(
  word: string,
  candidates: string[],
  options: AnagramOptions
): BulkAnagramResult {
  const anagrams: string[] = [];
  const nonAnagrams: string[] = [];

  candidates.forEach(candidate => {
    if (candidate.trim()) {
      const result = checkAnagram(word, candidate, options);
      if (result.isAnagram) {
        anagrams.push(candidate);
      } else {
        nonAnagrams.push(candidate);
      }
    }
  });

  return {
    word,
    anagrams,
    nonAnagrams
  };
}

export function generateAnagrams(word: string, maxResults: number = 10): string[] {
  const results: Set<string> = new Set();
  const chars = word.toLowerCase().split('');

  function permute(arr: string[], start: number = 0) {
    if (results.size >= maxResults) return;

    if (start === arr.length - 1) {
      results.add(arr.join(''));
      return;
    }

    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      permute(arr, start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }

  permute([...chars]);
  return Array.from(results).filter(r => r !== word.toLowerCase()).slice(0, maxResults);
}

// ── Dictionary search ──

/* Frequency level from the SCOWL lists: 10 = among the most common words,
   50 = less common. Used to show everyday words first. */
export type WordEntry = { word: string; level: number };

/* public/data/anagram-words.txt: "## comment", then "#10" followed by one
   line of space-separated words, "#20" and its words, and so on. */
export function parseWordList(text: string): WordEntry[] {
  const out: WordEntry[] = [];
  let level = 0;
  for (const line of text.split('\n')) {
    if (line.startsWith('##') || !line.trim()) continue;
    if (line.startsWith('#')) { level = Number(line.slice(1)) || 0; continue; }
    for (const word of line.split(' ')) if (word) out.push({ word, level });
  }
  return out;
}

function counts(word: string): number[] {
  const c = new Array(26).fill(0);
  for (const ch of word) {
    const i = ch.charCodeAt(0) - 97;
    if (i >= 0 && i < 26) c[i]++;
  }
  return c;
}

/* Can `word` be spelled from the letter counts, using up to `blanks`
   wildcard tiles for missing letters? */
function spellable(word: string, available: number[], blanks: number): boolean {
  const need = counts(word);
  let missing = 0;
  for (let i = 0; i < 26; i++) {
    if (need[i] > available[i]) {
      missing += need[i] - available[i];
      if (missing > blanks) return false;
    }
  }
  return true;
}

export interface WordSearchResult {
  letters: string;
  /* Words that use every letter (true anagrams) */
  exact: string[];
  /* Shorter words that can be made from the letters, longest first */
  byLength: { length: number; words: string[] }[];
  total: number;
}

/* Finds dictionary words made from the given letters. Letters outside a–z
   are ignored; ? or * are blank tiles that can stand for any letter. */
export function findWords(input: string, dictionary: WordEntry[], minLength = 3): WordSearchResult {
  const lower = input.toLowerCase();
  const letters = lower.replace(/[^a-z]/g, '');
  const blanks = (lower.match(/[?*]/g) || []).length;
  const size = letters.length + blanks;
  const available = counts(letters);
  const sorted = [...letters].sort().join('');

  const matches = dictionary.filter(
    (e) => e.word.length >= Math.min(minLength, size) && e.word.length <= size && spellable(e.word, available, blanks)
  );
  // Everyday words first, then alphabetical
  matches.sort((a, b) => a.level - b.level || a.word.localeCompare(b.word));

  const exact = matches
    .filter((e) => e.word.length === size && (blanks > 0 || [...e.word].sort().join('') === sorted))
    .map((e) => e.word)
    .filter((w) => w !== letters);

  const groups = new Map<number, string[]>();
  for (const e of matches) {
    if (e.word.length === size) continue;
    const list = groups.get(e.word.length) ?? [];
    list.push(e.word);
    groups.set(e.word.length, list);
  }
  const byLength = [...groups.entries()].sort((a, b) => b[0] - a[0]).map(([length, words]) => ({ length, words }));
  return { letters, exact, byLength, total: matches.length };
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function formatResultAsText(result: AnagramResult): string {
  let output = '=== ANAGRAM CHECKER RESULT ===\n\n';
  output += `Result: ${result.isAnagram ? '✔ These words ARE anagrams' : '✖ These words are NOT anagrams'}\n\n`;
  output += `Input A: ${result.textA}\n`;
  output += `Input B: ${result.textB}\n\n`;
  output += `Cleaned A: ${result.cleanedA}\n`;
  output += `Cleaned B: ${result.cleanedB}\n\n`;
  output += `Sorted A: ${result.sortedA}\n`;
  output += `Sorted B: ${result.sortedB}\n\n`;
  output += `Similarity: ${result.similarityPercentage}%\n\n`;
  
  output += '--- Letter Frequency A ---\n';
  Object.entries(result.frequencyA).forEach(([char, count]) => {
    output += `${char}: ${count}\n`;
  });
  
  output += '\n--- Letter Frequency B ---\n';
  Object.entries(result.frequencyB).forEach(([char, count]) => {
    output += `${char}: ${count}\n`;
  });

  return output;
}

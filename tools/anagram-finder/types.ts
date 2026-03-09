export interface AnagramOptions {
  ignoreSpaces: boolean;
  ignorePunctuation: boolean;
  ignoreCase: boolean;
  ignoreSpecialChars: boolean;
}

export interface LetterFrequency {
  [key: string]: number;
}

export interface AnagramResult {
  isAnagram: boolean;
  textA: string;
  textB: string;
  cleanedA: string;
  cleanedB: string;
  sortedA: string;
  sortedB: string;
  frequencyA: LetterFrequency;
  frequencyB: LetterFrequency;
  matchingLetters: string[];
  mismatchedLetters: string[];
  similarityPercentage: number;
}

export interface BulkAnagramResult {
  word: string;
  anagrams: string[];
  nonAnagrams: string[];
}

export type CheckMode = 'single' | 'bulk';

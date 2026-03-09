export interface PalindromeOptions {
  ignoreCase: boolean;
  ignoreSpaces: boolean;
  ignorePunctuation: boolean;
  ignoreNumbers: boolean;
}

export interface PalindromeResult {
  original: string;
  cleaned: string;
  reversed: string;
  isPalindrome: boolean;
  similarity: number;
  characterCount: number;
  letterFrequency: Record<string, number>;
}

export interface BulkPalindromeResult {
  text: string;
  isPalindrome: boolean;
}

export type CheckMode = 'single' | 'bulk';

export interface MorseOptions {
  dotSymbol: string;
  dashSymbol: string;
  letterSpacing: string;
  wordSeparator: string;
  ignoreCase: boolean;
  realtimeConvert: boolean;
  playbackSpeed: number; // WPM (words per minute)
}

export type MorseMode = 'text-to-morse' | 'morse-to-text';

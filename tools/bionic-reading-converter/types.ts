export interface BionicOptions {
  boldPercentage: number;
  ignoreSmallWords: boolean;
  smallWordLength: number;
  autoCopyOnConvert: boolean;
  autoConvertOnPaste: boolean;
}

export interface DisplayOptions {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  fontFamily: 'serif' | 'sans-serif' | 'monospace';
}

export interface ConversionResult {
  html: string;
  plainText: string;
  markdown: string;
  wordCount: number;
  boldedWords: number;
}

export interface HistoryState {
  input: string;
  output: ConversionResult;
  options: BionicOptions;
}

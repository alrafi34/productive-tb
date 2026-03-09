export interface SlugOptions {
  removeStopWords: boolean;
  separator: '-' | '_' | '.';
  maxLength: number;
  preserveNumbers: boolean;
  removeAccents: boolean;
  lowercase: boolean;
}

export interface SlugResult {
  original: string;
  slug: string;
  length: number;
}

export type ConversionMode = 'single' | 'bulk';

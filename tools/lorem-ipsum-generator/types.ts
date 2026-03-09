export type GenerationType = 'paragraphs' | 'sentences' | 'words';

export interface GeneratorOptions {
  type: GenerationType;
  count: number;
  startWithLorem: boolean;
  includeHtml: boolean;
  randomMode: 'classic' | 'medium' | 'full';
  customWords: string[];
}

export interface GeneratedResult {
  text: string;
  html: string;
  wordCount: number;
  characterCount: number;
}

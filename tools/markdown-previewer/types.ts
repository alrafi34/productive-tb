export interface PreviewSettings {
  layout: 'split' | 'preview';
  fontSize: number;
}

export interface MarkdownStats {
  characters: number;
  words: number;
  lines: number;
  headings: number;
  links: number;
  images: number;
  codeBlocks: number;
}

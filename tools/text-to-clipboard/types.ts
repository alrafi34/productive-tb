export type CopyFormat = 'plain' | 'html' | 'markdown';

export interface CopySettings {
  format: CopyFormat;
  autoSelect: boolean;
  showLineNumbers: boolean;
}

export interface TextBlock {
  id: string;
  content: string;
  label: string;
}

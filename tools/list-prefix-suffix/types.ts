export interface PrefixSuffixOptions {
  prefix: string;
  suffix: string;
  enableNumbering: boolean;
  numberStart: number;
  numberSeparator: string;
  removeEmptyLines: boolean;
  trimSpaces: boolean;
  realtimeConvert: boolean;
}

export type TemplateType = 'markdown-bullet' | 'numbered-list' | 'checklist' | 'quote' | 'code-comment' | 'csv';

export interface PrefixSuffixOptions {
  prefix: string;
  suffix: string;
  enableNumbering: boolean;
  numberStart: number;
  numberSeparator: string;
  removeEmptyLines: boolean;
  trimSpaces: boolean;
  realtimeConvert: boolean;
  /* Drop a trailing comma or semicolon from the suffix on the last line */
  skipLastSuffix?: boolean;
}

export type TemplateType =
  | 'markdown-bullet'
  | 'numbered-list'
  | 'checklist'
  | 'quote'
  | 'code-comment'
  | 'csv'
  | 'quoted'
  | 'html-li';

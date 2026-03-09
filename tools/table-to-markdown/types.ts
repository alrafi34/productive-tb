export type ColumnAlignment = 'left' | 'center' | 'right';
export type DelimiterType = 'auto' | 'tab' | 'comma' | 'pipe' | 'space';
export type HeaderMode = 'first-row' | 'no-header' | 'custom';

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface ConversionOptions {
  headerMode: HeaderMode;
  customHeaders: string[];
  columnAlignments: ColumnAlignment[];
  prettyFormat: boolean;
  escapeSpecialChars: boolean;
  wrapInBackticks: boolean;
  delimiter: DelimiterType;
}

export interface ConversionResult {
  markdown: string;
  html: string;
  rowCount: number;
  columnCount: number;
}

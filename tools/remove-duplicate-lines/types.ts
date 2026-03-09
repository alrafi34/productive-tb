export type SortOrder = 'none' | 'asc' | 'desc' | 'random';

export interface ProcessingOptions {
  ignoreCase: boolean;
  trimWhitespace: boolean;
  removeEmpty: boolean;
  sortOrder: SortOrder;
  keepOnlyDuplicates: boolean;
}

export interface ProcessingResult {
  cleanedLines: string[];
  totalLines: number;
  duplicatesRemoved: number;
  remainingLines: number;
  emptyLinesRemoved: number;
}

export interface HistoryState {
  input: string;
  output: string;
  options: ProcessingOptions;
}

export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

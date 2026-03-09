export type ComparisonLevel = 'word' | 'line' | 'character';
export type ViewMode = 'side-by-side' | 'inline';

export interface DiffOptions {
  ignoreCase: boolean;
  ignoreWhitespace: boolean;
  comparisonLevel: ComparisonLevel;
}

export interface DiffResult {
  textA: DiffPart[];
  textB: DiffPart[];
  inline: DiffPart[];
  statistics: DiffStatistics;
}

export interface DiffPart {
  type: 'added' | 'removed' | 'unchanged' | 'modified';
  value: string;
  lineNumber?: number;
}

export interface DiffStatistics {
  totalDifferences: number;
  addedLines: number;
  removedLines: number;
  modifiedLines: number;
  similarityPercentage: number;
  totalLinesA: number;
  totalLinesB: number;
}

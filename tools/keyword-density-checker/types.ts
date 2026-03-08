export type DensityData = {
  word: string;
  count: number;
  density: number;
};

export type AnalysisOptions = {
  ignoreStopWords?: boolean;
  caseSensitive?: boolean;
  minWordLength?: number;
  targetKeywords?: string[];
};

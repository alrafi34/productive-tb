export type WordFrequency = {
  word: string;
  count: number;
  percentage: number;
};

export type AnalysisResult = {
  totalWords: number;
  uniqueWords: number;
  mostFrequentWord: string;
  highestFrequency: number;
  words: WordFrequency[];
};

export type FilterOptions = {
  removeStopWords: boolean;
  caseSensitive: boolean;
  minWordLength: number;
  ignoreNumbers: boolean;
};

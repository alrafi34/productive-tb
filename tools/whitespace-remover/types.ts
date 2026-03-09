export interface CleaningOptions {
  removeLeading: boolean;
  removeTrailing: boolean;
  removeMultiple: boolean;
  removeEmptyLines: boolean;
  removeAllSpaces: boolean;
  tabsToSpaces: boolean;
  spacesToTabs: boolean;
  tabSize: number;
  autoCleanOnPaste: boolean;
}

export interface CleaningResult {
  cleanedText: string;
  spacesRemoved: number;
  linesProcessed: number;
  emptyLinesRemoved: number;
  tabsConverted: number;
}

export interface HistoryState {
  input: string;
  output: string;
  options: CleaningOptions;
  result: CleaningResult;
}

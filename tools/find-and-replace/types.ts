export interface FindReplaceOptions {
  matchCase: boolean;
  wholeWords: boolean;
  useRegex: boolean;
}

export interface FindReplaceResult {
  text: string;
  matchesFound: number;
  replacementsMade: number;
  matches: MatchPosition[];
}

export interface MatchPosition {
  start: number;
  end: number;
  text: string;
}

export interface HistoryState {
  text: string;
  findText: string;
  replaceText: string;
  options: FindReplaceOptions;
  result: FindReplaceResult | null;
}

export interface BatchReplaceItem {
  id: string;
  find: string;
  replace: string;
  enabled: boolean;
}

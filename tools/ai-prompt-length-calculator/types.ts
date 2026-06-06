export type ModelId =
  | "generic"
  | "gpt-4"
  | "gpt-4.1"
  | "gpt-4o"
  | "gpt-4o-mini"
  | "o1"
  | "claude-3-opus"
  | "claude-3-sonnet"
  | "claude-sonnet-4"
  | "gemini-1.5-pro"
  | "gemini-2.5-pro"
  | "llama-3-70b"
  | "mistral-large";

export type TokenMode = "fast" | "accurate" | "code" | "multilingual";

export type PromptType = "text" | "code" | "markdown" | "json" | "structured";

export interface ModelInfo {
  id: ModelId;
  name: string;
  provider: string;
  contextWindow: number;       // tokens
  inputPricePer1M: number;     // USD
  outputPricePer1M: number;    // USD
}

export interface AnalysisResult {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  uniqueWords: number;
  estimatedTokens: number;
  readingTimeSeconds: number;
  promptType: PromptType;
  contextUsagePct: number;
  contextStatus: "ok" | "warn" | "danger";
  inputCostUSD: number;
  complexityScore: number;        // 0–100
  complexityLabel: string;
  suggestion: string;
  chunkingSuggested: boolean;
  suggestedChunks: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  snippet: string;        // first 80 chars of prompt
  modelId: ModelId;
  result: AnalysisResult;
}

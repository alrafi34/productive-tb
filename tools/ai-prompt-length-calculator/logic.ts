import type {
  ModelId,
  ModelInfo,
  TokenMode,
  PromptType,
  AnalysisResult,
  HistoryEntry,
} from "./types";

// ── Model registry ────────────────────────────────────────────────────────────
export const MODELS: ModelInfo[] = [
  { id: "generic",        name: "Generic Estimate",    provider: "—",         contextWindow: 128_000,    inputPricePer1M: 1.00,  outputPricePer1M: 3.00 },
  { id: "gpt-4o",         name: "GPT-4o",              provider: "OpenAI",    contextWindow: 128_000,    inputPricePer1M: 2.50,  outputPricePer1M: 10.00 },
  { id: "gpt-4o-mini",    name: "GPT-4o Mini",         provider: "OpenAI",    contextWindow: 128_000,    inputPricePer1M: 0.15,  outputPricePer1M: 0.60 },
  { id: "gpt-4.1",        name: "GPT-4.1",             provider: "OpenAI",    contextWindow: 1_047_576,  inputPricePer1M: 2.00,  outputPricePer1M: 8.00 },
  { id: "gpt-4",          name: "GPT-4",               provider: "OpenAI",    contextWindow: 128_000,    inputPricePer1M: 30.00, outputPricePer1M: 60.00 },
  { id: "o1",             name: "OpenAI o1",            provider: "OpenAI",    contextWindow: 200_000,    inputPricePer1M: 15.00, outputPricePer1M: 60.00 },
  { id: "claude-sonnet-4",name: "Claude Sonnet 4",     provider: "Anthropic", contextWindow: 200_000,    inputPricePer1M: 3.00,  outputPricePer1M: 15.00 },
  { id: "claude-3-opus",  name: "Claude 3 Opus",       provider: "Anthropic", contextWindow: 200_000,    inputPricePer1M: 15.00, outputPricePer1M: 75.00 },
  { id: "claude-3-sonnet",name: "Claude 3 Sonnet",     provider: "Anthropic", contextWindow: 200_000,    inputPricePer1M: 3.00,  outputPricePer1M: 15.00 },
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro",      provider: "Google",    contextWindow: 1_048_576,  inputPricePer1M: 1.25,  outputPricePer1M: 10.00 },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro",      provider: "Google",    contextWindow: 2_097_152,  inputPricePer1M: 1.25,  outputPricePer1M: 5.00 },
  { id: "llama-3-70b",    name: "Llama 3.1 70B",       provider: "Meta",      contextWindow: 128_000,    inputPricePer1M: 0.90,  outputPricePer1M: 0.90 },
  { id: "mistral-large",  name: "Mistral Large",       provider: "Mistral",   contextWindow: 128_000,    inputPricePer1M: 3.00,  outputPricePer1M: 9.00 },
];

export const TOKEN_MODE_LABELS: Record<TokenMode, string> = {
  fast: "Fast Estimate",
  accurate: "Accurate Estimate",
  code: "Code-Heavy Estimate",
  multilingual: "Multilingual Estimate",
};

// ── Token estimation ──────────────────────────────────────────────────────────
/**
 * Heuristic token estimation per mode.
 * Real tokenizers (tiktoken) can't run in browser without WASM bundles,
 * so we use well-calibrated character/word ratios.
 */
export function estimateTokens(text: string, mode: TokenMode): number {
  if (!text) return 0;

  switch (mode) {
    case "fast":
      // ~4 chars per token (standard English BPE average)
      return Math.ceil(text.length / 4);

    case "accurate": {
      // Blend: 75% char-based + 25% word-based for better accuracy
      const charBased = text.length / 4;
      const wordBased = countWords(text) * 1.3;
      return Math.ceil(charBased * 0.75 + wordBased * 0.25);
    }

    case "code": {
      // Code tokenizes at roughly 3–3.5 chars/token (more tokens per char than prose)
      return Math.ceil(text.length / 3.2);
    }

    case "multilingual": {
      // CJK/Arabic/Hebrew characters tokenize roughly 1.5–2 tokens per char
      const nonLatin = (text.match(/[^\u0000-\u007F]/g) ?? []).length;
      const latin = text.length - nonLatin;
      return Math.ceil(latin / 4 + nonLatin / 1.5);
    }
  }
}

// ── Text statistics ───────────────────────────────────────────────────────────
export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function countSentences(text: string): number {
  const matches = text.match(/[^.!?]*[.!?]+/g);
  return matches ? matches.length : 0;
}

export function countParagraphs(text: string): number {
  return text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || (text.trim() ? 1 : 0);
}

export function countLines(text: string): number {
  return text ? text.split("\n").length : 0;
}

export function countUniqueWords(text: string): number {
  if (!text.trim()) return 0;
  const words = text.toLowerCase().match(/\b[a-z']+\b/g) ?? [];
  return new Set(words).size;
}

// ── Prompt type detection ─────────────────────────────────────────────────────
export function detectPromptType(text: string): PromptType {
  const trimmed = text.trim();
  if (!trimmed) return "text";

  // JSON: starts with { or [
  if (/^\s*[{\[]/.test(trimmed)) return "json";

  // Code: has function/class/import/const/etc or code fences
  const codeKeywords = /\b(function|class|import|export|const|let|var|def |public |private |return|void|int |str |#include|SELECT |FROM |WHERE )\b/;
  if (codeKeywords.test(trimmed) || /```/.test(trimmed)) return "code";

  // Markdown: headers, bold, lists
  if (/^#{1,6}\s|^\*{1,2}[^*]|\*\*[^*]+\*\*|^\s*[-*+]\s/m.test(trimmed)) return "markdown";

  // Structured: role-play / system prompt patterns
  if (/^(you are|act as|system:|user:|assistant:|###|<\w+>)/im.test(trimmed)) return "structured";

  return "text";
}

// ── Complexity score (0–100) ──────────────────────────────────────────────────
export function calcComplexity(words: number, sentences: number, uniqueWords: number): number {
  if (words === 0) return 0;
  const uniqueRatio = uniqueWords / words;             // vocabulary richness
  const avgSentLen = sentences > 0 ? words / sentences : words; // avg words per sentence
  // Normalise each dimension to 0–1 and blend
  const richness = Math.min(uniqueRatio * 1.5, 1);     // capped at 1
  const length = Math.min(avgSentLen / 30, 1);          // 30+ words/sentence = max
  const size = Math.min(words / 1000, 1);               // 1000+ words = max
  return Math.round((richness * 40 + length * 30 + size * 30));
}

export function complexityLabel(score: number): string {
  if (score < 20) return "Simple";
  if (score < 40) return "Moderate";
  if (score < 60) return "Complex";
  if (score < 80) return "Very Complex";
  return "Highly Complex";
}

// ── Reading time ──────────────────────────────────────────────────────────────
export function readingTimeSeconds(words: number): number {
  return Math.ceil((words / 200) * 60); // 200 WPM average
}

export function formatReadingTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

// ── Main analysis function ────────────────────────────────────────────────────
export function analyzePrompt(
  text: string,
  modelId: ModelId,
  mode: TokenMode
): AnalysisResult {
  const model = MODELS.find((m) => m.id === modelId) ?? MODELS[0];

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = countWords(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const lines = countLines(text);
  const uniqueWords = countUniqueWords(text);
  const estimatedTokens = estimateTokens(text, mode);
  const readingSecs = readingTimeSeconds(words);
  const promptType = detectPromptType(text);

  const contextUsagePct = model.contextWindow > 0
    ? (estimatedTokens / model.contextWindow) * 100
    : 0;

  let contextStatus: AnalysisResult["contextStatus"] = "ok";
  if (contextUsagePct >= 100) contextStatus = "danger";
  else if (contextUsagePct >= 75) contextStatus = "warn";

  const inputCostUSD = (estimatedTokens / 1_000_000) * model.inputPricePer1M;

  const complexityScore = calcComplexity(words, sentences, uniqueWords);

  // Chunking suggestion: if > 60% context used, suggest splitting
  const chunkingSuggested = contextUsagePct > 60;
  const suggestedChunks = chunkingSuggested ? Math.ceil(estimatedTokens / (model.contextWindow * 0.4)) : 1;

  // Smart suggestion
  let suggestion = "";
  if (!text.trim()) {
    suggestion = "Paste or type a prompt to analyze.";
  } else if (contextStatus === "danger") {
    suggestion = `⚠️ Prompt exceeds ${model.name} context window. Split into ${suggestedChunks} chunks or use a model with a larger context.`;
  } else if (contextStatus === "warn") {
    suggestion = `Your prompt uses ${contextUsagePct.toFixed(1)}% of ${model.name}'s context window. Consider trimming for a safety margin.`;
  } else if (words < 10) {
    suggestion = "Very short prompt. Add more context for better AI output quality.";
  } else if (promptType === "structured") {
    suggestion = "Structured system prompt detected. Token count may be higher than plain text.";
  } else if (promptType === "code") {
    suggestion = "Code-heavy prompt detected. Use Code-Heavy Estimate mode for better accuracy.";
  } else {
    suggestion = "Prompt is well within model context limits.";
  }

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    uniqueWords,
    estimatedTokens,
    readingTimeSeconds: readingSecs,
    promptType,
    contextUsagePct,
    contextStatus,
    inputCostUSD,
    complexityScore,
    complexityLabel: complexityLabel(complexityScore),
    suggestion,
    chunkingSuggested,
    suggestedChunks,
  };
}

// ── Formatting ────────────────────────────────────────────────────────────────
export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US");
}

export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

// ── LocalStorage history ──────────────────────────────────────────────────────
const HISTORY_KEY = "ai-prompt-length-calculator-history";
const MAX_HISTORY = 15;

export function saveHistory(prompt: string, modelId: ModelId, result: AnalysisResult): void {
  if (typeof window === "undefined") return;
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    snippet: prompt.slice(0, 80).replace(/\n/g, " "),
    modelId,
    result,
  };
  const existing = getHistory();
  localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...existing].slice(0, MAX_HISTORY)));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch { return []; }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

// ── Export ────────────────────────────────────────────────────────────────────
export function buildExportText(prompt: string, modelName: string, result: AnalysisResult): string {
  return [
    "AI Prompt Length Calculator – Report",
    "=====================================",
    `Model:              ${modelName}`,
    "",
    "Statistics",
    "----------",
    `Characters:         ${formatNumber(result.characters)}`,
    `Characters (no sp): ${formatNumber(result.charactersNoSpaces)}`,
    `Words:              ${formatNumber(result.words)}`,
    `Sentences:          ${formatNumber(result.sentences)}`,
    `Paragraphs:         ${formatNumber(result.paragraphs)}`,
    `Lines:              ${formatNumber(result.lines)}`,
    `Unique Words:       ${formatNumber(result.uniqueWords)}`,
    `Estimated Tokens:   ${formatNumber(result.estimatedTokens)}`,
    `Reading Time:       ${formatReadingTime(result.readingTimeSeconds)}`,
    `Prompt Type:        ${result.promptType}`,
    "",
    "Context & Cost",
    "--------------",
    `Context Usage:      ${result.contextUsagePct.toFixed(2)}%`,
    `Input Cost (est.):  $${result.inputCostUSD.toFixed(6)}`,
    `Complexity:         ${result.complexityLabel} (${result.complexityScore}/100)`,
    "",
    "Suggestion",
    "----------",
    result.suggestion,
    "",
    "Prompt (first 200 chars)",
    "------------------------",
    prompt.slice(0, 200),
  ].join("\n");
}

export function buildExportJSON(prompt: string, modelId: ModelId, result: AnalysisResult) {
  return JSON.stringify({
    modelId,
    promptSnippet: prompt.slice(0, 200),
    statistics: {
      characters: result.characters,
      words: result.words,
      sentences: result.sentences,
      paragraphs: result.paragraphs,
      lines: result.lines,
      uniqueWords: result.uniqueWords,
      estimatedTokens: result.estimatedTokens,
      readingTimeSeconds: result.readingTimeSeconds,
    },
    analysis: {
      promptType: result.promptType,
      contextUsagePct: result.contextUsagePct,
      contextStatus: result.contextStatus,
      inputCostUSD: result.inputCostUSD,
      complexityScore: result.complexityScore,
      complexityLabel: result.complexityLabel,
      suggestion: result.suggestion,
    },
  }, null, 2);
}

export function downloadFile(content: string, filename: string, type = "text/plain"): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Debounce ──────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ── Example prompts ───────────────────────────────────────────────────────────
export const EXAMPLE_PROMPTS = [
  {
    label: "Short Prompt",
    text: "Write a professional LinkedIn post about remote work trends in 2025.",
  },
  {
    label: "System Prompt",
    text: "You are a senior software architect with 15 years of experience in distributed systems. Your role is to review system designs, identify scalability bottlenecks, security vulnerabilities, and suggest concrete improvements with code examples where relevant. Always structure your response with: 1) Executive Summary, 2) Issues Found, 3) Recommendations, 4) Implementation Notes.",
  },
  {
    label: "RAG Context",
    text: "Based on the following documentation, answer the user's question accurately and concisely. If the answer is not in the documentation, say so explicitly.\n\nDocumentation:\n[CONTEXT_PLACEHOLDER]\n\nUser Question: How do I configure rate limiting for the API gateway?",
  },
  {
    label: "Code Review",
    text: "Review the following TypeScript code for bugs, performance issues, and best practice violations. For each issue, explain the problem and provide a corrected version.\n\n```typescript\nasync function fetchUsers(ids: number[]) {\n  const results = [];\n  for (const id of ids) {\n    const user = await fetch(`/api/users/${id}`);\n    results.push(await user.json());\n  }\n  return results;\n}\n```",
  },
];

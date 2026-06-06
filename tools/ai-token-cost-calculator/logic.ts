import type {
  ModelPreset,
  CalcInputs,
  CalcResult,
  Currency,
  Timeframe,
  HistoryEntry,
} from "./types";

// ── Model presets (prices as of mid-2025) ────────────────────────────────────
export const MODEL_PRESETS: ModelPreset[] = [
  // OpenAI
  { id: "gpt-4.1-mini",   name: "GPT-4.1 Mini",    provider: "OpenAI",     inputPricePer1M: 0.40,   outputPricePer1M: 1.60,   contextWindow: 1_047_576 },
  { id: "gpt-4.1",        name: "GPT-4.1",          provider: "OpenAI",     inputPricePer1M: 2.00,   outputPricePer1M: 8.00,   contextWindow: 1_047_576 },
  { id: "gpt-4o",         name: "GPT-4o",           provider: "OpenAI",     inputPricePer1M: 2.50,   outputPricePer1M: 10.00,  contextWindow: 128_000 },
  { id: "gpt-4o-mini",    name: "GPT-4o Mini",      provider: "OpenAI",     inputPricePer1M: 0.15,   outputPricePer1M: 0.60,   contextWindow: 128_000 },
  { id: "gpt-4-turbo",    name: "GPT-4 Turbo",      provider: "OpenAI",     inputPricePer1M: 10.00,  outputPricePer1M: 30.00,  contextWindow: 128_000 },
  { id: "o1",             name: "OpenAI o1",         provider: "OpenAI",     inputPricePer1M: 15.00,  outputPricePer1M: 60.00,  contextWindow: 200_000 },
  { id: "o1-mini",        name: "OpenAI o1-mini",    provider: "OpenAI",     inputPricePer1M: 3.00,   outputPricePer1M: 12.00,  contextWindow: 128_000 },
  { id: "o3-mini",        name: "OpenAI o3-mini",    provider: "OpenAI",     inputPricePer1M: 1.10,   outputPricePer1M: 4.40,   contextWindow: 200_000 },
  // Anthropic Claude
  { id: "claude-opus-4",     name: "Claude Opus 4",     provider: "Anthropic",  inputPricePer1M: 15.00,  outputPricePer1M: 75.00,  contextWindow: 200_000 },
  { id: "claude-sonnet-4",   name: "Claude Sonnet 4",   provider: "Anthropic",  inputPricePer1M: 3.00,   outputPricePer1M: 15.00,  contextWindow: 200_000 },
  { id: "claude-haiku-3.5",  name: "Claude Haiku 3.5",  provider: "Anthropic",  inputPricePer1M: 0.80,   outputPricePer1M: 4.00,   contextWindow: 200_000 },
  // Google Gemini
  { id: "gemini-2.5-pro",    name: "Gemini 2.5 Pro",    provider: "Google",     inputPricePer1M: 1.25,   outputPricePer1M: 10.00,  contextWindow: 1_048_576 },
  { id: "gemini-2.5-flash",  name: "Gemini 2.5 Flash",  provider: "Google",     inputPricePer1M: 0.30,   outputPricePer1M: 2.50,   contextWindow: 1_048_576 },
  { id: "gemini-1.5-pro",    name: "Gemini 1.5 Pro",    provider: "Google",     inputPricePer1M: 1.25,   outputPricePer1M: 5.00,   contextWindow: 2_097_152 },
  { id: "gemini-1.5-flash",  name: "Gemini 1.5 Flash",  provider: "Google",     inputPricePer1M: 0.075,  outputPricePer1M: 0.30,   contextWindow: 1_048_576 },
  // Meta Llama (via API providers — approximate)
  { id: "llama-3.1-70b",     name: "Llama 3.1 70B",     provider: "Meta/3rd",   inputPricePer1M: 0.90,   outputPricePer1M: 0.90,   contextWindow: 128_000, notes: "Via Groq/Together" },
  { id: "llama-3.1-8b",      name: "Llama 3.1 8B",      provider: "Meta/3rd",   inputPricePer1M: 0.05,   outputPricePer1M: 0.05,   contextWindow: 128_000, notes: "Via Groq/Together" },
  // Mistral
  { id: "mistral-large",     name: "Mistral Large",     provider: "Mistral",    inputPricePer1M: 3.00,   outputPricePer1M: 9.00,   contextWindow: 128_000 },
  { id: "mistral-small",     name: "Mistral Small",     provider: "Mistral",    inputPricePer1M: 0.20,   outputPricePer1M: 0.60,   contextWindow: 128_000 },
  // Custom
  { id: "custom",            name: "Custom Model",       provider: "Custom",     inputPricePer1M: 1.00,   outputPricePer1M: 3.00,   contextWindow: undefined },
];

export const PROVIDERS = [...new Set(MODEL_PRESETS.map((m) => m.provider))];

// ── Currency config ───────────────────────────────────────────────────────────
export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", JPY: "¥", INR: "₹", AUD: "A$", CAD: "C$",
};

// Static fallback rates (USD base). Users can override.
export const DEFAULT_EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1.00, EUR: 0.92, GBP: 0.79, JPY: 149.50, INR: 83.40, AUD: 1.53, CAD: 1.36,
};

export const TIMEFRAME_MULTIPLIERS: Record<Timeframe, number> = {
  daily: 1, weekly: 7, monthly: 30, yearly: 365,
};

// ── Core calculation ──────────────────────────────────────────────────────────
export function calculateCost(inputs: CalcInputs): CalcResult | null {
  const {
    inputTokens, outputTokens, inputPricePer1M, outputPricePer1M,
    requests, currency, exchangeRate,
  } = inputs;

  if (inputTokens < 0 || outputTokens < 0) return null;
  if (inputPricePer1M < 0 || outputPricePer1M < 0) return null;

  const reqs = Math.max(requests, 1);
  const rate = exchangeRate > 0 ? exchangeRate : (DEFAULT_EXCHANGE_RATES[currency] ?? 1);
  const sym = CURRENCY_SYMBOLS[currency] ?? "$";

  // Per-call costs (single set of inputTokens/outputTokens)
  const inputCostUSD = (inputTokens / 1_000_000) * inputPricePer1M;
  const outputCostUSD = (outputTokens / 1_000_000) * outputPricePer1M;
  const costPerRequestUSD = inputCostUSD + outputCostUSD;

  // Scaled by requests
  const totalCostUSD = costPerRequestUSD * reqs;
  const costPer1kRequestsUSD = costPerRequestUSD * 1000;

  // Timeframe projections (always from a daily baseline)
  // "requests" is treated as the number within the selected timeframe
  const dailyCostUSD = totalCostUSD / TIMEFRAME_MULTIPLIERS[inputs.timeframe];
  const weeklyCostUSD = dailyCostUSD * 7;
  const monthlyCostUSD = dailyCostUSD * 30;
  const yearlyCostUSD = dailyCostUSD * 365;

  const convert = (usd: number) => usd * rate;

  return {
    inputCostUSD,
    outputCostUSD,
    totalCostUSD,
    dailyCostUSD,
    weeklyCostUSD,
    monthlyCostUSD,
    yearlyCostUSD,
    costPerRequestUSD,
    costPer1kRequestsUSD,
    totalCost: convert(totalCostUSD),
    monthlyCost: convert(monthlyCostUSD),
    yearlyCost: convert(yearlyCostUSD),
    currencySymbol: sym,
  };
}

// ── Formatting ────────────────────────────────────────────────────────────────
export function formatCurrency(value: number, symbol: string, decimals = 4): string {
  if (!isFinite(value)) return `${symbol}—`;
  if (value === 0) return `${symbol}0.00`;
  if (value < 0.0001) return `${symbol}< 0.0001`;
  if (value >= 1_000_000) return `${symbol}${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${symbol}${(value / 1_000).toFixed(2)}K`;
  return `${symbol}${value.toFixed(decimals)}`;
}

export function formatTokens(n: number): string {
  if (!isFinite(n) || n === 0) return "0";
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("en-US");
}

// Parse user input like "100k", "1.5M", "2B"
export function parseTokenInput(raw: string): number {
  const s = raw.trim().toLowerCase().replace(/,/g, "");
  if (!s) return 0;
  const num = parseFloat(s);
  if (isNaN(num)) return 0;
  if (s.endsWith("b")) return Math.round(num * 1_000_000_000);
  if (s.endsWith("m")) return Math.round(num * 1_000_000);
  if (s.endsWith("k")) return Math.round(num * 1_000);
  return Math.round(num);
}

// ── Validation ────────────────────────────────────────────────────────────────
export function validateInputs(inputs: CalcInputs): string | null {
  if (inputs.inputTokens < 0 || inputs.outputTokens < 0) return "Token values cannot be negative.";
  if (inputs.inputPricePer1M < 0 || inputs.outputPricePer1M < 0) return "Prices cannot be negative.";
  if (inputs.requests < 1) return "Number of requests must be at least 1.";
  return null;
}

// ── Usage templates ───────────────────────────────────────────────────────────
export const USAGE_TEMPLATES = [
  {
    label: "Chatbot (startup)",
    inputTokens: 2_000,
    outputTokens: 500,
    requests: 1_000,
    timeframe: "monthly" as Timeframe,
  },
  {
    label: "RAG App",
    inputTokens: 8_000,
    outputTokens: 1_000,
    requests: 5_000,
    timeframe: "monthly" as Timeframe,
  },
  {
    label: "Code Assistant",
    inputTokens: 4_000,
    outputTokens: 2_000,
    requests: 10_000,
    timeframe: "monthly" as Timeframe,
  },
  {
    label: "Document Summarizer",
    inputTokens: 50_000,
    outputTokens: 2_000,
    requests: 500,
    timeframe: "monthly" as Timeframe,
  },
  {
    label: "Enterprise (high scale)",
    inputTokens: 5_000,
    outputTokens: 1_000,
    requests: 500_000,
    timeframe: "monthly" as Timeframe,
  },
  {
    label: "Quick test",
    inputTokens: 1_000,
    outputTokens: 500,
    requests: 10,
    timeframe: "daily" as Timeframe,
  },
];

// Models used in side-by-side comparison
export const COMPARISON_MODEL_IDS = [
  "gpt-4o-mini",
  "gpt-4.1-mini",
  "claude-haiku-3.5",
  "gemini-2.5-flash",
  "llama-3.1-8b",
  "mistral-small",
];

// ── LocalStorage history ──────────────────────────────────────────────────────
const HISTORY_KEY = "ai-token-cost-calculator-history";
const MAX_HISTORY = 20;

export function saveHistory(modelName: string, inputs: CalcInputs, result: CalcResult): void {
  if (typeof window === "undefined") return;
  const existing: HistoryEntry[] = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    modelName,
    inputs,
    result,
  };
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

// ── Export helpers ────────────────────────────────────────────────────────────
export function buildExportText(modelName: string, inputs: CalcInputs, result: CalcResult): string {
  const s = result.currencySymbol;
  return [
    "AI Token Cost Calculator",
    "========================",
    `Model:              ${modelName}`,
    `Input Tokens:       ${formatTokens(inputs.inputTokens)}`,
    `Output Tokens:      ${formatTokens(inputs.outputTokens)}`,
    `Requests:           ${inputs.requests.toLocaleString()} (${inputs.timeframe})`,
    `Input Price/1M:     $${inputs.inputPricePer1M}`,
    `Output Price/1M:    $${inputs.outputPricePer1M}`,
    "",
    `Input Token Cost:   ${formatCurrency(result.inputCostUSD, "$")}`,
    `Output Token Cost:  ${formatCurrency(result.outputCostUSD, "$")}`,
    `Cost per Request:   ${formatCurrency(result.costPerRequestUSD, "$")}`,
    `Cost per 1K Reqs:   ${formatCurrency(result.costPer1kRequestsUSD, "$")}`,
    "",
    `Total (${inputs.timeframe}):       ${formatCurrency(result.totalCostUSD, "$")}`,
    `Daily:              ${formatCurrency(result.dailyCostUSD, "$")}`,
    `Weekly:             ${formatCurrency(result.weeklyCostUSD, "$")}`,
    `Monthly:            ${formatCurrency(result.monthlyCostUSD, "$")}`,
    `Yearly:             ${formatCurrency(result.yearlyCostUSD, "$")}`,
  ].join("\n");
}

export function buildCSV(modelName: string, inputs: CalcInputs, result: CalcResult): string {
  const header = "Model,Input Tokens,Output Tokens,Requests,Timeframe,Input Price/1M,Output Price/1M,Total Cost,Monthly Cost,Yearly Cost";
  const row = [
    modelName,
    inputs.inputTokens,
    inputs.outputTokens,
    inputs.requests,
    inputs.timeframe,
    inputs.inputPricePer1M,
    inputs.outputPricePer1M,
    result.totalCostUSD.toFixed(6),
    result.monthlyCostUSD.toFixed(6),
    result.yearlyCostUSD.toFixed(6),
  ].join(",");
  return `${header}\n${row}`;
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

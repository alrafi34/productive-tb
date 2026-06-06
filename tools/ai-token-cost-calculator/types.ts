export type Timeframe = "daily" | "weekly" | "monthly" | "yearly";
export type Currency = "USD" | "EUR" | "GBP" | "JPY" | "INR" | "AUD" | "CAD";

export interface ModelPreset {
  id: string;
  name: string;
  provider: string;
  inputPricePer1M: number;   // USD per 1M input tokens
  outputPricePer1M: number;  // USD per 1M output tokens
  contextWindow?: number;    // tokens
  notes?: string;
}

export interface CalcInputs {
  modelId: string;
  inputTokens: number;
  outputTokens: number;
  inputPricePer1M: number;
  outputPricePer1M: number;
  requests: number;
  timeframe: Timeframe;
  currency: Currency;
  exchangeRate: number;
}

export interface CalcResult {
  inputCostUSD: number;
  outputCostUSD: number;
  totalCostUSD: number;
  // per timeframe (already multiplied by requests × timeframe days)
  dailyCostUSD: number;
  weeklyCostUSD: number;
  monthlyCostUSD: number;
  yearlyCostUSD: number;
  costPerRequestUSD: number;
  costPer1kRequestsUSD: number;
  // converted to selected currency
  totalCost: number;
  monthlyCost: number;
  yearlyCost: number;
  currencySymbol: string;
}

export interface ComparisonRow {
  model: ModelPreset;
  result: CalcResult;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  modelName: string;
  inputs: CalcInputs;
  result: CalcResult;
}

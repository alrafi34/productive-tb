export type UnitSystem = "metric" | "imperial";

export type Material =
  | "aluminum"
  | "mild-steel"
  | "carbon-steel"
  | "stainless-steel"
  | "titanium"
  | "brass"
  | "copper"
  | "cast-iron"
  | "plastic"
  | "wood"
  | "custom";

export interface FeedRateInputs {
  unitSystem: UnitSystem;
  material: Material;
  rpm: string;
  flutes: string;
  feedPerTooth: string;
  precision: number;
}

export interface FeedRateResult {
  feedRate: number;
  feedRateAlt: number; // converted unit
  status: FeedStatus;
  safetyMessage: string;
  hint: string;
}

export type FeedStatus = "low" | "optimal" | "high" | "unknown";

export interface MaterialData {
  label: string;
  minChipLoadMetric: number;  // mm/tooth
  maxChipLoadMetric: number;  // mm/tooth
  defaultChipLoadMetric: number;
  note: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FeedRateInputs;
  result: FeedRateResult;
}

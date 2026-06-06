export type UnitSystem = "metric" | "imperial";

export type Material =
  | "mild-steel"
  | "carbon-steel"
  | "stainless-steel"
  | "aluminum"
  | "brass"
  | "copper"
  | "cast-iron"
  | "titanium"
  | "plastic"
  | "custom";

export interface LatheInputs {
  unitSystem: UnitSystem;
  material: Material;
  diameter: string;       // mm or inch
  cuttingSpeed: string;   // m/min or SFM
  precision: number;
}

export interface LatheResult {
  rpm: number;
  rpmMin: number;
  rpmMax: number;
  safetyMessage: string;
  hint: string;
  speedStatus: SpeedStatus;
}

export type SpeedStatus = "low" | "optimal" | "high" | "unknown";

export interface MaterialData {
  label: string;
  metricSpeed: number;   // m/min (recommended default)
  minSpeed: number;      // m/min
  maxSpeed: number;      // m/min
  note: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: LatheInputs;
  result: LatheResult;
}

export type CalcMode = "cutting-speed" | "rpm" | "feed-rate" | "machining-time";
export type UnitSystem = "metric" | "imperial";
export type Material =
  | "mild-steel"
  | "stainless-steel"
  | "aluminum"
  | "brass"
  | "cast-iron"
  | "titanium"
  | "copper"
  | "plastic"
  | "custom";

export interface CuttingInputs {
  mode: CalcMode;
  material: Material;
  unitSystem: UnitSystem;
  diameter: string;       // mm or inch
  rpm: string;            // rev/min
  cuttingSpeed: string;   // m/min or ft/min
  feedPerTooth: string;   // mm/tooth or inch/tooth
  flutes: string;         // number of flutes
  feedRate: string;       // mm/min or inch/min
  length: string;         // mm or inch (for machining time)
  precision: number;
}

export interface CuttingResult {
  cuttingSpeed: number;   // m/min or ft/min
  rpm: number;
  feedRate: number;       // mm/min or inch/min
  machiningTime: number;  // minutes
  // secondary
  cuttingSpeedAlt: number; // converted to other unit
  rpmDisplay: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CuttingInputs;
  result: CuttingResult;
}

export interface MaterialData {
  label: string;
  minSpeed: number;  // m/min
  maxSpeed: number;  // m/min
  note: string;
}

export type BearingType = "ball" | "roller";
export type LoadUnit = "kN" | "N" | "lbf";
export type Reliability = "90" | "95" | "96" | "97" | "98" | "99";
export type Precision = 2 | 4 | 6;

export interface BearingInputs {
  bearingType: BearingType;
  dynamicLoadRating: string;       // C
  equivalentLoad: string;          // P
  loadUnit: LoadUnit;
  rpm: string;
  reliability: Reliability;
  serviceFactor: number;           // 0.5 – 3.0
  hoursPerDay: string;             // for years estimate
  precision: Precision;
}

export interface BearingResult {
  // Core
  lifeRevolutions: number;         // L10 in revolutions
  lifeMillionRevolutions: number;  // L10 in million revolutions
  lifeHours: number;               // operating hours
  lifeYears: number;               // at given hours/day
  // Adjusted
  adjustedRevolutions: number;
  adjustedHours: number;
  adjustedYears: number;
  // Reliability factor applied
  reliabilityFactor: number;
  // Health
  healthLabel: "Excellent Life" | "Moderate Life" | "Short Life" | "High Failure Risk";
  healthColor: "green" | "yellow" | "orange" | "red";
  // Inputs echo in SI
  C_kN: number;
  P_kN: number;
  ratio: number;                   // C/P
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: BearingInputs;
  result: BearingResult;
}

export interface CompareEntry {
  label: string;
  C: string;
  P: string;
  rpm: string;
  bearingType: BearingType;
}

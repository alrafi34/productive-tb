export type WageType = "hourly" | "daily";

export type Currency = "USD" | "EUR" | "GBP" | "INR" | "BDT";

export interface LaborCalculation {
  id: string;
  timestamp: number;
  wageType: WageType;
  wage: number;
  workers: number;
  time: number; // hours or days
  overtimeEnabled: boolean;
  overtimeHours: number;
  overtimeMultiplier: number;
  additionalCost: number;
  currency: Currency;
  
  // Calculated values
  baseCost: number;
  overtimeCost: number;
  totalCost: number;
  costPerWorker: number;
  averageHourlyRate: number; // for comparison
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: LaborCalculation;
}

export interface WagePreset {
  name: string;
  wageType: WageType;
  wage: number;
  description: string;
}

export interface ProjectPreset {
  name: string;
  wageType: WageType;
  wage: number;
  workers: number;
  time: number;
  description: string;
}
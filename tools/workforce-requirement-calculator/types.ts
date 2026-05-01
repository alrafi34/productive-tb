export type ProductivityMode = "daily" | "hourly";

export type UnitType = "units" | "tasks" | "area" | "items" | "custom";

export interface WorkforceCalculation {
  id: string;
  timestamp: number;
  
  // Inputs
  totalWork: number;
  productivity: number;
  productivityMode: ProductivityMode;
  days: number;
  hoursPerDay: number;
  unitType: UnitType;
  customUnit?: string;
  
  // Calculated values
  capacityPerWorker: number;
  requiredWorkers: number;
  requiredWorkersRaw: number; // before rounding
  totalCapacity: number;
  utilizationRate: number; // percentage
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: WorkforceCalculation;
  projectName?: string;
}

export interface WorkforcePreset {
  name: string;
  description: string;
  totalWork: number;
  productivity: number;
  productivityMode: ProductivityMode;
  days: number;
  hoursPerDay: number;
  unitType: UnitType;
  category: string;
}

export interface CalculationBreakdown {
  step1: string;
  step2: string;
  step3: string;
  formula: string;
}
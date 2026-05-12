export type PanelWattage = 250 | 300 | 350 | 400 | 450 | 500;

export interface SolarPanelInputs {
  monthlyUsage: number; // kWh
  sunHours: number; // Average daily sun hours
  panelWattage: PanelWattage;
  systemEfficiency: number; // 0.75 to 0.90 (default 0.80)
  electricityRate?: number; // Cost per kWh (optional)
}

export interface SolarPanelResult {
  dailyUsage: number; // kWh
  systemSizeKW: number;
  systemSizeWatts: number;
  panelsNeeded: number;
  dailyProduction: number; // kWh
  monthlyProduction: number; // kWh
  yearlyProduction: number; // kWh
  offsetPercentage: number;
  roofSpaceRequired: number; // square meters
  co2Savings: number; // kg per year
  monthlySavings?: number;
  yearlySavings?: number;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: SolarPanelInputs;
  result: SolarPanelResult;
}

export interface SolarPreset {
  name: string;
  monthlyUsage: number;
  sunHours: number;
  description: string;
}

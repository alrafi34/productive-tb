export type ACCapacityUnit = 'ton' | 'watt';
export type ACCapacityTon = 0.75 | 1 | 1.5 | 2 | 2.5 | 3;

export interface ACPowerInputs {
  capacityUnit: ACCapacityUnit;
  capacityTon?: ACCapacityTon;
  capacityWatt?: number;
  hoursPerDay: number;
  daysPerMonth: number;
  tariff: number; // Cost per kWh
  efficiency?: number; // EER or SEER rating (optional)
}

export interface ACPowerResult {
  powerWatts: number;
  dailyEnergy: number; // kWh
  monthlyEnergy: number; // kWh
  yearlyEnergy: number; // kWh
  dailyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  current: number; // Amperes (at 230V)
  consumptionLevel: 'low' | 'moderate' | 'high' | 'very-high';
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ACPowerInputs;
  result: ACPowerResult;
}

export interface ACPreset {
  name: string;
  capacityTon: ACCapacityTon;
  typicalHours: number;
  description: string;
}

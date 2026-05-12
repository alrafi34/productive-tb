export type FanType = 'ceiling' | 'table' | 'exhaust' | 'pedestal' | 'tower' | 'industrial' | 'custom';
export type TimeFrame = 'daily' | 'monthly' | 'yearly';

export interface FanConsumptionInputs {
  power: number; // Watts
  hoursPerDay: number;
  daysPerMonth: number;
  tariff: number; // Cost per kWh
  fanType: FanType;
}

export interface FanConsumptionResult {
  dailyEnergy: number; // kWh
  monthlyEnergy: number; // kWh
  yearlyEnergy: number; // kWh
  dailyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  current: number; // Amperes (at 230V)
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FanConsumptionInputs;
  result: FanConsumptionResult;
}

export interface FanPreset {
  name: string;
  type: FanType;
  power: number;
  typicalHours: number;
  description: string;
}

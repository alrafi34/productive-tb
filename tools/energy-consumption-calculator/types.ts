export interface ApplianceInput {
  id: string;
  name: string;
  power: number; // Watts
  hours: number;
  minutes: number;
  quantity: number;
  rate?: number; // Cost per kWh
}

export interface EnergyCalculation {
  appliances: ApplianceInput[];
  totalEnergy: number; // kWh
  totalCost: number;
  dailyEnergy: number;
  monthlyEnergy: number;
  yearlyEnergy: number;
  dailyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  highestConsumer?: ApplianceInput & { energy: number; cost: number };
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: EnergyCalculation;
}

export interface AppliancePreset {
  name: string;
  power: number; // Watts
  category: string;
  typicalHours: number;
}

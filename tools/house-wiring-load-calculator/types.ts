export interface Appliance {
  id: string;
  name: string;
  quantity: number;
  wattage: number;
  total: number;
}

export interface LoadCalculatorInputs {
  appliances: Appliance[];
  voltage: number;
  diversityFactor: number;
}

export interface LoadCalculatorResult {
  totalLoad: number;
  adjustedLoad: number;
  current: number;
  recommendedBreaker: number;
  powerFactor: number;
  apparentPower: number;
  steps: string[];
}

export interface AppliancePreset {
  name: string;
  wattage: number;
  category: string;
}

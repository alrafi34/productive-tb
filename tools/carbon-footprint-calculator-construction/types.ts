export interface MaterialInput {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  emissionFactor: number;
  co2: number;
}

export interface CarbonCalculation {
  materials: MaterialInput[];
  totalCO2: number;
  highestContributor: MaterialInput | null;
  timestamp: number;
}

export interface HistoryEntry {
  id: string;
  calculation: CarbonCalculation;
  timestamp: number;
}

export interface MaterialPreset {
  name: string;
  unit: string;
  emissionFactor: number;
  description: string;
}

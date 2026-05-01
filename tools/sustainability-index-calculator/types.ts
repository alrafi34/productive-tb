export interface SustainabilityInputs {
  energy: number;
  water: number;
  materials: number;
  waste: number;
  indoor: number;
}

export interface SustainabilityWeights {
  energy: number;
  water: number;
  materials: number;
  waste: number;
  indoor: number;
}

export interface SustainabilityResult {
  score: number;
  rating: 'Low Sustainability' | 'Moderate Sustainability' | 'High Sustainability';
  inputs: SustainabilityInputs;
  breakdown: {
    energyContribution: number;
    waterContribution: number;
    materialsContribution: number;
    wasteContribution: number;
    indoorContribution: number;
  };
  weakAreas: string[];
  strongAreas: string[];
  recommendations: string[];
  timestamp: number;
}

export interface Preset {
  name: string;
  description: string;
  category: string;
  values: SustainabilityInputs;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  result: SustainabilityResult;
}

export type Voltage = 110 | 220;
export type LoadType = "residential" | "commercial";
export type ApplianceCategory = "lighting" | "hvac" | "kitchen" | "electronics" | "motors" | "other";

export interface Appliance {
  id: string;
  name: string;
  quantity: number;
  power: number; // in watts
  category: ApplianceCategory;
}

export interface ElectricalCalculation {
  appliances: Appliance[];
  voltage: Voltage;
  loadType: LoadType;
  demandFactor: number;
  powerFactor: number;
  
  // Results
  totalWatts: number;
  totalKW: number;
  demandLoad: number;
  current: number;
  recommendedBreaker: number;
  estimatedCableSize: string;
  
  timestamp?: number;
}

export interface HistoryEntry {
  id: string;
  calculation: ElectricalCalculation;
  timestamp: number;
}

export interface ApplianceTemplate {
  name: string;
  power: number;
  category: ApplianceCategory;
}

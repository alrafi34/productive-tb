export type Unit = "metric" | "imperial";
export type RetentionTime = 1 | 1.5 | 2 | 3;
export type SludgeFactor = 0.2 | 0.3 | 0.5;
export type TankShape = "rectangular" | "cylindrical";

export interface SepticTankInputs {
  numberOfUsers: number;
  waterUsagePerPerson: number;
  retentionTime: RetentionTime;
  sludgeFactor: SludgeFactor;
  unit: Unit;
}

export interface SepticTankCalculation {
  numberOfUsers: number;
  waterUsagePerPerson: number;
  retentionTime: RetentionTime;
  sludgeFactor: SludgeFactor;
  unit: Unit;
  
  // Calculated values
  dailyFlow: number;
  baseVolume: number;
  adjustedVolume: number;
  recommendedTankSize: number;
  volumeInCubicMeters: number;
  volumeInGallons: number;
  
  // Dimensions (for reference)
  suggestedLength?: number;
  suggestedWidth?: number;
  suggestedDepth?: number;
  
  // Metadata
  timestamp: number;
  notes: string[];
}

export interface SepticTankPreset {
  name: string;
  description: string;
  numberOfUsers: number;
  waterUsagePerPerson: number;
  retentionTime: RetentionTime;
  sludgeFactor: SludgeFactor;
  category: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: SepticTankCalculation;
}

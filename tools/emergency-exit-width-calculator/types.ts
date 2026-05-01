export type WidthFactor = 0.2 | 0.3 | 0.15;
export type Unit = "inches" | "feet" | "meters";
export type SafetyLevel = "safe" | "warning" | "critical";

export interface EmergencyExitInputs {
  occupants: number;
  widthFactor: WidthFactor;
  numberOfExits: number;
  unit: Unit;
}

export interface EmergencyExitCalculation {
  occupants: number;
  widthFactor: WidthFactor;
  numberOfExits: number;
  unit: Unit;
  
  // Calculated values
  totalRequiredWidth: number; // in inches
  widthPerExit: number; // in inches
  
  // Conversions
  totalWidthInInches: number;
  totalWidthInFeet: number;
  totalWidthInMeters: number;
  widthPerExitInInches: number;
  widthPerExitInFeet: number;
  widthPerExitInMeters: number;
  
  // Safety assessment
  safetyLevel: SafetyLevel;
  
  // Metadata
  timestamp: number;
  notes: string[];
}

export interface OccupancyPreset {
  name: string;
  description: string;
  occupants: number;
  widthFactor: WidthFactor;
  numberOfExits: number;
  category: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: EmergencyExitCalculation;
}

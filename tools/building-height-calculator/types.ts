export type CalculationMode = "far-based" | "road-width-based" | "custom";
export type Unit = "feet" | "meters";

export interface BuildingHeightInputs {
  plotArea: number;
  far: number;
  floorHeight: number;
  roadWidth: number;
  setback: number;
  calculationMode: CalculationMode;
  unit: Unit;
  roadWidthFactor?: number;
}

export interface BuildingHeightCalculation {
  plotArea: number;
  far: number;
  floorHeight: number;
  roadWidth: number;
  setback: number;
  calculationMode: CalculationMode;
  unit: Unit;
  
  // Calculated values
  totalBuildableArea: number;
  numberOfFloors: number;
  buildingHeight: number;
  heightByRoadWidth?: number;
  applicableHeight: number;
  
  // Metadata
  timestamp: number;
  notes: string[];
}

export interface ScenarioPreset {
  name: string;
  description: string;
  plotArea: number;
  far: number;
  floorHeight: number;
  roadWidth: number;
  setback: number;
  category: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  calculation: BuildingHeightCalculation;
}

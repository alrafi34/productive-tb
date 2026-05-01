export type ColumnType = 'concrete' | 'steel';
export type EndCondition = 'pinned-pinned' | 'fixed-fixed' | 'fixed-free' | 'fixed-pinned';
export type Unit = 'mm' | 'inches';

export interface ColumnCalculation {
  id: string;
  columnType: ColumnType;
  width: number;
  depth: number;
  height: number;
  unit: Unit;
  
  // Concrete properties
  fck?: number; // Concrete strength (MPa)
  steelPercentage?: number; // Steel reinforcement %
  
  // Steel properties
  fy?: number; // Yield strength (MPa)
  area?: number; // Cross-sectional area (mm²)
  
  // Settings
  safetyFactor: number;
  endCondition: EndCondition;
  
  // Results
  loadCapacity: number; // kN
  safeLoad: number; // kN after safety factor
  loadCapacityTons: number;
  safeLoadTons: number;
  slendernessRatio: number;
  slendernessStatus: 'safe' | 'warning' | 'critical';
  effectiveLength: number;
  
  timestamp: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: ColumnCalculation;
}

export interface MaterialPreset {
  name: string;
  description: string;
  fck?: number;
  fy?: number;
}

export interface EndConditionFactor {
  type: EndCondition;
  name: string;
  factor: number;
  description: string;
}

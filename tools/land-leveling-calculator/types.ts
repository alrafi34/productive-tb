export type CalcMode = "simple" | "grid";
export type InputUnit = "ft" | "m";
export type OutputUnit = "ft3" | "m3" | "yd3";

export interface SimpleInputs {
  length: string;
  width: string;
  currentElevation: string;
  targetElevation: string;
  compactionFactor: string;
}

export interface GridInputs {
  gridData: string;       // comma/newline separated elevation values
  cellSize: string;       // size of each grid cell (in selected unit)
  targetElevation: string;
  compactionFactor: string;
}

export interface CalculatorInputs {
  mode: CalcMode;
  unit: InputUnit;
  outputUnit: OutputUnit;
  simple: SimpleInputs;
  grid: GridInputs;
}

export interface GridCell {
  row: number;
  col: number;
  elevation: number;
  diff: number;         // target - elevation
  volume: number;       // cell area * |diff|
  type: "cut" | "fill" | "level";
}

export interface CalculationResult {
  mode: CalcMode;
  unit: InputUnit;
  outputUnit: OutputUnit;

  // Simple mode
  area?: number;           // in input unit²
  heightDiff?: number;     // target - current
  totalVolume?: number;    // in output unit

  // Grid mode
  gridCells?: GridCell[][];
  gridRows?: number;
  gridCols?: number;

  // Shared
  fillVolume: number;      // in output unit
  cutVolume: number;       // in output unit
  netEarthwork: number;    // fill - cut (positive = net fill, negative = net cut)
  compactionFactor: number;
  adjustedFillVolume: number;
  adjustedCutVolume: number;

  // Conversions
  ft3: number;
  m3: number;
  yd3: number;

  steps: string[];
  formula: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}

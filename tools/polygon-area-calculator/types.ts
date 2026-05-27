export type OutputUnit = "sqft" | "sqm" | "acres" | "hectares" | "sqkm" | "sqmi" | "sqyd";

export interface Point {
  x: number;
  y: number;
}

export interface CalculationResult {
  rawArea: number; // area in canvas units²
  scaledArea: number; // area in real-world units (after scale factor)
  areaInUnit: number; // area in selected output unit
  outputUnit: OutputUnit;
  perimeter: number; // in canvas units
  scaledPerimeter: number;
  vertexCount: number;
  sqft: number;
  sqm: number;
  acres: number;
  hectares: number;
  sqkm: number;
  sqmi: number;
  sqyd: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  points: Point[];
  scale: number;
  scaleUnit: string;
  outputUnit: OutputUnit;
  result: CalculationResult;
}

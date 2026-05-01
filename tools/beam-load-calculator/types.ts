export type BeamType = 'simply-supported' | 'cantilever';
export type LoadType = 'point' | 'udl';
export type Unit = 'm' | 'ft';

export interface BeamCalculation {
  id: string;
  beamType: BeamType;
  loadType: LoadType;
  length: number;
  load: number;
  position?: number; // For point load
  unit: Unit;
  
  // Results
  reaction1: number;
  reaction2?: number; // Not used for cantilever
  maxBendingMoment: number;
  totalLoad: number;
  maxShearForce: number;
  
  // Diagram data
  shearForceData: DiagramPoint[];
  bendingMomentData: DiagramPoint[];
  
  timestamp: number;
}

export interface DiagramPoint {
  x: number;
  y: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: BeamCalculation;
}

export interface BeamPreset {
  name: string;
  description: string;
  beamType: BeamType;
  loadType: LoadType;
  length: number;
  load: number;
  position?: number;
}

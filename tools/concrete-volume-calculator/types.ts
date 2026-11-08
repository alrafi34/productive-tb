export type Unit = 'ft' | 'm';
export type ShapeType = 'slab' | 'slab-round' | 'slab-triangle' | 'slab-lshape' | 'column' | 'beam' | 'footing' | 'cylinder';

/* Every slab outline shares one set of fields. Thickness is in inches when the
   unit is feet and in centimeters when it is meters; the rest are in the unit. */
export interface SlabDimensions {
  length: string;
  width: string;
  thickness: string;
  radius: string;
  base: string;
  height: string;
  length2: string;
  width2: string;
}

export interface ColumnDimensions {
  radius: string;
  height: string;
}

export interface BeamDimensions {
  length: string;
  width: string;
  height: string;
}

export interface FootingDimensions {
  length: string;
  width: string;
  depth: string;
}

export interface MixRatio {
  cement: number;
  sand: number;
  aggregate: number;
}

export interface MaterialBreakdown {
  cementBags: number;
  cementWeight: number;
  cementVolume: number;
  sandVolume: number;
  aggregateVolume: number;
}

export interface ConcreteCalculation {
  id: string;
  shape: ShapeType;
  volume: number;
  volumeM3: number;
  quantity: number;
  totalVolume: number;
  unit: Unit;
  dimensions: string;
  materials?: MaterialBreakdown;
  mixRatio?: MixRatio;
}

export interface CalculationHistory {
  id: string;
  timestamp: number;
  calculation: ConcreteCalculation;
}

export interface BatchEntry {
  id: string;
  calculation: ConcreteCalculation;
}

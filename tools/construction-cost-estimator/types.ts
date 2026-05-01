export type MaterialQuality = "low" | "medium" | "high" | "premium";
export type RegionFactor = "low" | "standard" | "high";
export type Currency = "USD" | "EUR" | "GBP" | "INR" | "BDT";

export interface AddOns {
  plumbing: boolean;
  electrical: boolean;
  interiorDesign: boolean;
  landscaping: boolean;
}

export interface ConstructionEstimate {
  // Inputs
  area: number;
  costPerSqFt: number;
  materialQuality: MaterialQuality;
  laborMultiplier: number;
  regionFactor: RegionFactor;
  addOns: AddOns;
  currency: Currency;
  
  // Calculated values
  baseCost: number;
  materialAdjustment: number;
  laborAdjustment: number;
  regionAdjustment: number;
  plumbingCost: number;
  electricalCost: number;
  interiorDesignCost: number;
  landscapingCost: number;
  totalAddOnsCost: number;
  totalCost: number;
  
  // Breakdown
  breakdown: CostBreakdown[];
  
  // Timestamp
  timestamp: number;
}

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface HistoryEntry {
  id: string;
  estimate: ConstructionEstimate;
  timestamp: number;
}

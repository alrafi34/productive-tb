export type EscalationType = "compound" | "simple";
export type Currency = "USD" | "INR" | "BDT" | "EUR" | "GBP";

export interface EscalationCalculation {
  // Inputs
  baseCost: number;
  duration: number;
  escalationRate: number;
  escalationType: EscalationType;
  currency: Currency;
  
  // Calculated values
  futureCost: number;
  totalIncrease: number;
  percentageIncrease: number;
  yearlyBreakdown: YearlyBreakdown[];
  
  // Timestamp
  timestamp: number;
}

export interface YearlyBreakdown {
  year: number;
  cost: number;
  increase: number;
  cumulativeIncrease: number;
}

export interface HistoryEntry {
  id: string;
  calculation: EscalationCalculation;
  timestamp: number;
}

export type Currency = "USD" | "EUR" | "GBP" | "INR" | "CAD" | "AUD";
export type CompoundFrequency = "yearly" | "quarterly" | "monthly";

export interface CalculatorInputs {
  initialValue: string;
  appreciationRate: number;
  years: number;
  additionalAnnualInvestment: string;
  inflationRate: string;
  compoundFrequency: CompoundFrequency;
  currency: Currency;
}

export interface YearlyBreakdown {
  year: number;
  propertyValue: number;
  appreciationGain: number;
  cumulativeGain: number;
  inflationAdjustedValue: number | null;
}

export interface CalculationResult {
  initialValue: number;
  futureValue: number;
  totalGain: number;
  growthPercent: number;
  inflationAdjustedValue: number | null;
  realGainPercent: number | null;
  yearlyBreakdown: YearlyBreakdown[];
  currency: Currency;
  annualizedReturn: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}

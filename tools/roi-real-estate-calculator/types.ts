export type Currency = "USD" | "EUR" | "GBP" | "INR" | "BDT";
export type MortgageTerm = 15 | 20 | 30;
export type InvestmentDuration = 1 | 5 | 10 | 20 | 30;

export interface CalculatorInputs {
  purchasePrice: string;
  downPayment: string;
  closingCosts: string;
  renovationCost: string;
  mortgageRate: string;
  mortgageTerm: MortgageTerm;
  monthlyRent: string;
  otherIncome: string;
  propertyTax: string;
  insurance: string;
  maintenance: string;
  management: string;
  hoa: string;
  vacancyRate: number;
  appreciationRate: string;
  investmentDuration: InvestmentDuration;
  currency: Currency;
}

export interface YearProjection {
  year: number;
  propertyValue: number;
  equity: number;
  cumulativeCashFlow: number;
  totalReturn: number;
  roi: number;
}

export interface CalculationResult {
  // Investment
  totalInvestment: number;
  loanAmount: number;
  // Monthly
  monthlyMortgage: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyCashFlow: number;
  // Annual
  annualCashFlow: number;
  annualRent: number;
  annualExpenses: number;
  // Yields
  cashOnCashROI: number;
  grossYield: number;
  netYield: number;
  // Appreciation
  futureValue: number;
  appreciationGain: number;
  totalReturn: number;
  totalROI: number;
  // Break-even
  breakEvenMonths: number | null;
  // Projections
  projections: YearProjection[];
  // Rating
  rating: "Excellent" | "Strong" | "Average" | "Below Average" | "Poor";
  currency: Currency;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}

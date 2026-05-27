export type Currency = "USD" | "EUR" | "GBP" | "INR" | "BDT";

export interface CalculatorInputs {
  propertyPrice: string;
  monthlyRent: string;
  downPayment: string;
  mortgageRate: string;
  mortgageTerm: string;
  propertyTax: string;
  insurance: string;
  maintenance: string;
  management: string;
  hoa: string;
  vacancyRate: number;   // 0–20
  currency: Currency;
}

export interface CalculationResult {
  propertyPrice: number;
  monthlyRent: number;
  annualRent: number;
  vacancyAdjustedRent: number;
  annualExpenses: number;
  grossYield: number;
  netYield: number;
  vacancyAdjustedGrossYield: number;
  vacancyAdjustedNetYield: number;
  monthlyExpenses: number;
  mortgagePayment: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  annualProfit: number;
  cashOnCashReturn: number;   // based on down payment
  expenseBreakdown: ExpenseItem[];
  rating: "Excellent" | "Strong" | "Average" | "Below Average" | "Poor";
  currency: Currency;
}

export interface ExpenseItem {
  label: string;
  annual: number;
  monthly: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CalculatorInputs;
  result: CalculationResult;
}

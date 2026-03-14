export interface MortgageInputs {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  downPayment: number;
  extraPayment: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalMonths: number;
  principalAmount: number;
}

export interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface ComparisonResult {
  term: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export interface CalculationHistory {
  id: string;
  inputs: MortgageInputs;
  result: MortgageResult;
  timestamp: number;
}

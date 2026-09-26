export interface MortgageInputs {
  /** Home price (the field predates the tax and insurance inputs). */
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  downPayment: number;
  extraPayment: number;
  /** Annual property tax as a % of the home price; varies by place. */
  propertyTaxRate?: number;
  /** Annual homeowners insurance premium. */
  homeInsurance?: number;
  /** Annual PMI as a % of the loan, charged until the balance reaches 80% of the price. */
  pmiRate?: number;
  /** Monthly HOA / service charge. */
  hoa?: number;
}

export interface MortgageResult {
  /** Principal & interest plus any extra payment. */
  monthlyPayment: number;
  /** Scheduled principal & interest alone. */
  principalAndInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  /** PMI in the first month (0 when the down payment is 20% or more). */
  monthlyPmi: number;
  monthlyHoa: number;
  /** Everything due in the first month: P&I, extra, tax, insurance, PMI, HOA. */
  totalMonthly: number;
  /** Months PMI is charged before the balance reaches 80% of the price. */
  pmiMonths: number;
  /** Principal and interest actually paid over the life of the loan. */
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

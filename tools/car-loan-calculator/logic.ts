/* Auto loan maths: what is financed, the monthly payment and the interest. */

export type CarLoanInputs = {
  price: number;
  downPayment: number;
  tradeInValue: number;
  /* Still owed on the trade-in; more than its value is negative equity */
  tradeInOwed: number;
  salesTaxPct: number;
  /* Most US states tax only the price minus the trade-in value */
  taxAfterTradeIn: boolean;
  fees: number;
  /* Roll the sales tax and fees into the loan instead of paying them upfront */
  financeTaxAndFees: boolean;
  aprPct: number;
  months: number;
};

export type YearRow = { year: number; interest: number; principal: number; balance: number };

export type CarLoanResult = {
  salesTax: number;
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalOfPayments: number;
  upfront: number;
  /* Price + tax + fees + interest */
  totalCost: number;
  negativeEquity: number;
  schedule: YearRow[];
};

/* Level monthly payment for a fully amortizing loan. */
export function monthlyPayment(principal: number, aprPct: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = aprPct / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

export function calculateCarLoan(i: CarLoanInputs): CarLoanResult {
  const taxable = i.taxAfterTradeIn ? Math.max(i.price - i.tradeInValue, 0) : i.price;
  const salesTax = (taxable * i.salesTaxPct) / 100;
  const tradeEquity = i.tradeInValue - i.tradeInOwed;
  const extras = salesTax + i.fees;

  const loanAmount = Math.max(i.price - i.downPayment - tradeEquity + (i.financeTaxAndFees ? extras : 0), 0);
  const payment = monthlyPayment(loanAmount, i.aprPct, i.months);
  const totalOfPayments = payment * i.months;
  const totalInterest = Math.max(totalOfPayments - loanAmount, 0);

  // Year-by-year amortization
  const r = i.aprPct / 100 / 12;
  const schedule: YearRow[] = [];
  let balance = loanAmount;
  for (let m = 1; m <= i.months && loanAmount > 0; m++) {
    const interest = balance * r;
    const principal = Math.min(payment - interest, balance);
    balance = Math.max(balance - principal, 0);
    const year = Math.ceil(m / 12);
    if (!schedule[year - 1]) schedule[year - 1] = { year, interest: 0, principal: 0, balance: 0 };
    schedule[year - 1].interest += interest;
    schedule[year - 1].principal += principal;
    schedule[year - 1].balance = balance;
  }

  return {
    salesTax,
    loanAmount,
    monthlyPayment: payment,
    totalInterest,
    totalOfPayments,
    upfront: i.downPayment + (i.financeTaxAndFees ? 0 : extras),
    totalCost: i.price + extras + totalInterest,
    negativeEquity: Math.max(-tradeEquity, 0),
    schedule,
  };
}

export const TERMS = [36, 48, 60, 72, 84];

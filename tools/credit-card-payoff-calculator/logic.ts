/* Credit card payoff: interest is charged monthly at APR ÷ 12 on the balance,
   then the payment is taken off. Card issuers usually charge a daily rate on
   the average daily balance, which gives very slightly different figures. */

export type Payoff = {
  months: number;
  totalInterest: number;
  totalPaid: number;
  /* The payment does not cover the monthly interest, so the balance never falls */
  never: boolean;
  lastPayment: number;
};

const MAX_MONTHS = 1200; // 100 years

export function payoffWithPayment(balance: number, aprPct: number, payment: number): Payoff {
  const r = aprPct / 100 / 12;
  if (balance <= 0) return { months: 0, totalInterest: 0, totalPaid: 0, never: false, lastPayment: 0 };
  if (payment <= balance * r) return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity, never: true, lastPayment: 0 };
  let b = balance;
  let interestSum = 0;
  let months = 0;
  let last = 0;
  while (b > 0.005 && months < MAX_MONTHS) {
    const interest = b * r;
    interestSum += interest;
    b += interest;
    last = Math.min(payment, b);
    b -= last;
    months++;
  }
  return { months, totalInterest: interestSum, totalPaid: balance + interestSum, never: false, lastPayment: last };
}

/* Fixed payment that clears the balance in the given number of months. */
export function paymentForMonths(balance: number, aprPct: number, months: number): number {
  if (balance <= 0 || months <= 0) return 0;
  const r = aprPct / 100 / 12;
  if (r === 0) return balance / months;
  return (balance * r) / (1 - Math.pow(1 + r, -months));
}

/* A common US minimum payment rule: the month's interest plus 1% of the
   balance, but at least a floor amount (often $25–$40), or the whole balance
   when it is smaller. Rules differ by card; check your statement. */
export function payoffMinimumOnly(balance: number, aprPct: number, floor = 25, pctOfBalance = 1): Payoff {
  const r = aprPct / 100 / 12;
  let b = balance;
  let interestSum = 0;
  let months = 0;
  let last = 0;
  while (b > 0.005 && months < MAX_MONTHS) {
    const interest = b * r;
    const minimum = Math.max(interest + (b * pctOfBalance) / 100, floor);
    interestSum += interest;
    b += interest;
    last = Math.min(minimum, b);
    b -= last;
    months++;
  }
  return { months, totalInterest: interestSum, totalPaid: balance + interestSum, never: months >= MAX_MONTHS, lastPayment: last };
}

/* "3 years 4 months" */
export function formatDuration(months: number): string {
  if (!Number.isFinite(months)) return "never";
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} year${y === 1 ? "" : "s"}`);
  if (m || !y) parts.push(`${m} month${m === 1 ? "" : "s"}`);
  return parts.join(" ");
}

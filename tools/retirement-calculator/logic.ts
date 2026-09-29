/* Retirement savings projection, one step per year. Contributions (yours and
   the employer match) are added at the end of each year after that year's
   growth, a slightly conservative simplification of monthly payroll saving. */

/* IRS 401(k) elective deferral limits for 2026 (announced November 2025):
   $24,500, plus a $8,000 catch-up from age 50, or $11,250 at ages 60–63. */
export const US_401K_LIMITS = { year: 2026, base: 24500, catchUp50: 8000, catchUp60to63: 11250 };

export function employeeLimit(age: number): number {
  if (age >= 60 && age <= 63) return US_401K_LIMITS.base + US_401K_LIMITS.catchUp60to63;
  if (age >= 50) return US_401K_LIMITS.base + US_401K_LIMITS.catchUp50;
  return US_401K_LIMITS.base;
}

export type RetirementInputs = {
  currentAge: number;
  retireAge: number;
  currentSavings: number;
  salary: number;
  contributionPct: number;
  /* Employer adds this % of what you contribute… */
  matchRatePct: number;
  /* …on contributions up to this % of salary */
  matchLimitPct: number;
  salaryGrowthPct: number;
  returnPct: number;
  inflationPct: number;
  /* Cap your own contributions at the US 401(k) limit */
  applyUsLimit: boolean;
  withdrawalRatePct: number;
};

export type YearRow = { age: number; salary: number; you: number; employer: number; growth: number; balance: number };

export type RetirementResult = {
  years: number;
  balance: number;
  balanceToday: number;
  totalYou: number;
  totalEmployer: number;
  totalGrowth: number;
  /* First-year income at the withdrawal rate, in today's money */
  annualIncomeToday: number;
  capped: boolean;
  rows: YearRow[];
};

export function projectRetirement(i: RetirementInputs): RetirementResult {
  const years = Math.max(Math.round(i.retireAge - i.currentAge), 0);
  const r = i.returnPct / 100;
  let balance = i.currentSavings;
  let salary = i.salary;
  let totalYou = 0;
  let totalEmployer = 0;
  let totalGrowth = 0;
  let capped = false;
  const rows: YearRow[] = [];

  for (let y = 0; y < years; y++) {
    const age = i.currentAge + y;
    let you = (salary * i.contributionPct) / 100;
    if (i.applyUsLimit && you > employeeLimit(age)) {
      you = employeeLimit(age);
      capped = true;
    }
    const matchedPart = Math.min(you, (salary * i.matchLimitPct) / 100);
    const employer = (matchedPart * i.matchRatePct) / 100;
    const growth = balance * r;
    balance += growth + you + employer;
    totalYou += you;
    totalEmployer += employer;
    totalGrowth += growth;
    rows.push({ age: age + 1, salary, you, employer, growth, balance });
    salary *= 1 + i.salaryGrowthPct / 100;
  }

  const deflator = Math.pow(1 + i.inflationPct / 100, years);
  const balanceToday = balance / deflator;
  return {
    years,
    balance,
    balanceToday,
    totalYou,
    totalEmployer,
    totalGrowth,
    annualIncomeToday: (balanceToday * i.withdrawalRatePct) / 100,
    capped,
    rows,
  };
}

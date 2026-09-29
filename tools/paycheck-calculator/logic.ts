/* Take-home pay estimates. Every amount here is annual; the UI divides by the
   number of pay periods. Tax figures are for the 2026 US tax year and the
   2026/27 UK tax year; both are estimates of withholding, not tax returns. */

export type Bracket = { upTo: number; rate: number };

/* Tax on `income` with marginal brackets (rates as decimals). */
export function progressiveTax(income: number, brackets: Bracket[]): number {
  let tax = 0;
  let lower = 0;
  for (const b of brackets) {
    if (income <= lower) break;
    tax += (Math.min(income, b.upTo) - lower) * b.rate;
    lower = b.upTo;
  }
  return tax;
}

export function marginalRate(income: number, brackets: Bracket[]): number {
  return (brackets.find((b) => income <= b.upTo) ?? brackets[brackets.length - 1]).rate;
}

/* ── United States, tax year 2026 ─────────────────────────────────────────
   Brackets and standard deductions: IRS Rev. Proc. 2025-32. Social Security
   wage base: SSA, $184,500 for 2026. */
export type FilingStatus = "single" | "married" | "head";

export const US_2026 = {
  source: "IRS Rev. Proc. 2025-32 (tax year 2026); Social Security wage base $184,500 (SSA)",
  standardDeduction: { single: 16100, married: 32200, head: 24150 } as Record<FilingStatus, number>,
  brackets: {
    single: [
      { upTo: 12400, rate: 0.1 }, { upTo: 50400, rate: 0.12 }, { upTo: 105700, rate: 0.22 },
      { upTo: 201775, rate: 0.24 }, { upTo: 256225, rate: 0.32 }, { upTo: 640600, rate: 0.35 }, { upTo: Infinity, rate: 0.37 },
    ],
    married: [
      { upTo: 24800, rate: 0.1 }, { upTo: 100800, rate: 0.12 }, { upTo: 211400, rate: 0.22 },
      { upTo: 403550, rate: 0.24 }, { upTo: 512450, rate: 0.32 }, { upTo: 768700, rate: 0.35 }, { upTo: Infinity, rate: 0.37 },
    ],
    head: [
      { upTo: 17700, rate: 0.1 }, { upTo: 67450, rate: 0.12 }, { upTo: 105700, rate: 0.22 },
      { upTo: 201750, rate: 0.24 }, { upTo: 256200, rate: 0.32 }, { upTo: 640600, rate: 0.35 }, { upTo: Infinity, rate: 0.37 },
    ],
  } as Record<FilingStatus, Bracket[]>,
  socialSecurityRate: 0.062,
  socialSecurityWageBase: 184500,
  medicareRate: 0.0145,
  additionalMedicareRate: 0.009,
  additionalMedicareThreshold: { single: 200000, married: 250000, head: 200000 } as Record<FilingStatus, number>,
};

/* States with no income tax on wages */
export const NO_WAGE_TAX_STATES = ["Alaska", "Florida", "Nevada", "New Hampshire", "South Dakota", "Tennessee", "Texas", "Washington", "Wyoming"];

export type Line = { label: string; amount: number };
export type Paycheck = { gross: number; lines: Line[]; net: number; marginal: number };

export type UsInputs = {
  gross: number;
  status: FilingStatus;
  /* Traditional 401(k)/403(b): lowers income tax, not FICA */
  retirementPct: number;
  /* Section 125 health, dental, FSA/HSA through payroll: lowers income tax and FICA */
  preTaxOther: number;
  /* Flat estimate of state and local income tax on taxable wages */
  stateRatePct: number;
};

export function usPaycheck(i: UsInputs): Paycheck {
  const t = US_2026;
  const retirement = (i.gross * i.retirementPct) / 100;
  const ficaWages = Math.max(i.gross - i.preTaxOther, 0);
  const wagesForIncomeTax = Math.max(i.gross - retirement - i.preTaxOther, 0);
  const taxable = Math.max(wagesForIncomeTax - t.standardDeduction[i.status], 0);
  const federal = progressiveTax(taxable, t.brackets[i.status]);
  const socialSecurity = Math.min(ficaWages, t.socialSecurityWageBase) * t.socialSecurityRate;
  const medicare =
    ficaWages * t.medicareRate + Math.max(ficaWages - t.additionalMedicareThreshold[i.status], 0) * t.additionalMedicareRate;
  const state = (wagesForIncomeTax * i.stateRatePct) / 100;
  const lines = [
    { label: "Federal income tax", amount: federal },
    { label: "Social Security (6.2%)", amount: socialSecurity },
    { label: "Medicare (1.45%)", amount: medicare },
    { label: "State & local income tax", amount: state },
    { label: "401(k) / 403(b)", amount: retirement },
    { label: "Pre-tax health & other", amount: i.preTaxOther },
  ];
  return {
    gross: i.gross,
    lines,
    net: i.gross - lines.reduce((s, l) => s + l.amount, 0),
    marginal: marginalRate(taxable, t.brackets[i.status]),
  };
}

/* ── United Kingdom (England, Wales, Northern Ireland), tax year 2026/27 ───
   Personal allowance £12,570, reduced by £1 for every £2 over £100,000;
   basic 20% on the next £37,700, higher 40% to £125,140, additional 45%.
   Employee Class 1 National Insurance: 8% between £12,570 and £50,270, 2% above. */
export const UK_2026 = {
  source: "HMRC rates and thresholds for 2026/27 (England, Wales and Northern Ireland)",
  personalAllowance: 12570,
  taperStart: 100000,
  basicBand: 37700,
  additionalFrom: 125140,
  niPrimaryThreshold: 12570,
  niUpperLimit: 50270,
  niMainRate: 0.08,
  niUpperRate: 0.02,
};

export type UkInputs = {
  gross: number;
  /* Workplace pension under a net pay arrangement: lowers income tax, not NI */
  pensionPct: number;
};

export function ukIncomeTax(taxablePay: number): { tax: number; marginal: number } {
  const u = UK_2026;
  const allowance = Math.max(u.personalAllowance - Math.max(taxablePay - u.taperStart, 0) / 2, 0);
  const brackets: Bracket[] = [
    { upTo: allowance, rate: 0 },
    { upTo: allowance + u.basicBand, rate: 0.2 },
    { upTo: u.additionalFrom, rate: 0.4 },
    { upTo: Infinity, rate: 0.45 },
  ];
  // Between £100,000 and £125,140 the allowance taper makes the effective marginal rate 60%
  const marginal = taxablePay > u.taperStart && taxablePay <= u.additionalFrom ? 0.6 : marginalRate(taxablePay, brackets);
  return { tax: progressiveTax(taxablePay, brackets), marginal };
}

export function ukPaycheck(i: UkInputs): Paycheck {
  const u = UK_2026;
  const pension = (i.gross * i.pensionPct) / 100;
  const { tax, marginal } = ukIncomeTax(Math.max(i.gross - pension, 0));
  const ni =
    Math.max(Math.min(i.gross, u.niUpperLimit) - u.niPrimaryThreshold, 0) * u.niMainRate +
    Math.max(i.gross - u.niUpperLimit, 0) * u.niUpperRate;
  const lines = [
    { label: "Income tax", amount: tax },
    { label: "National Insurance", amount: ni },
    { label: "Workplace pension", amount: pension },
  ];
  return { gross: i.gross, lines, net: i.gross - tax - ni - pension, marginal };
}

/* ── Anywhere else: the visitor's own average rates ─────────────────────── */
export type CustomInputs = { gross: number; incomeTaxPct: number; socialPct: number; pensionPct: number };

export function customPaycheck(i: CustomInputs): Paycheck {
  const pension = (i.gross * i.pensionPct) / 100;
  const tax = ((i.gross - pension) * i.incomeTaxPct) / 100;
  const social = (i.gross * i.socialPct) / 100;
  const lines = [
    { label: "Income tax", amount: tax },
    { label: "Social security contributions", amount: social },
    { label: "Pension", amount: pension },
  ];
  return { gross: i.gross, lines, net: i.gross - tax - social - pension, marginal: i.incomeTaxPct / 100 };
}

export const PERIODS = {
  weekly: { label: "Weekly", perYear: 52 },
  biweekly: { label: "Every 2 weeks", perYear: 26 },
  semimonthly: { label: "Twice a month", perYear: 24 },
  fourweekly: { label: "Every 4 weeks", perYear: 13 },
  monthly: { label: "Monthly", perYear: 12 },
} as const;

export type Period = keyof typeof PERIODS;

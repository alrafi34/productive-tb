import {
  AmortizationRow,
  CalculationResult,
  CalculatorInputs,
  Currency,
  HistoryEntry,
  InterestType,
  PaymentFrequency,
  ScenarioResult,
  YearlySummary,
} from "./types";

// ── Labels ────────────────────────────────────────────────────────────────────

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", INR: "₹", BDT: "৳",
};
export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD ($)", EUR: "EUR (€)", GBP: "GBP (£)", INR: "INR (₹)", BDT: "BDT (৳)",
};
export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "INR", "BDT"];

export const INTEREST_TYPE_LABELS: Record<InterestType, string> = {
  emi:      "EMI / Mortgage Style",
  simple:   "Simple Interest",
  compound: "Compound Interest",
};
export const ALL_INTEREST_TYPES: InterestType[] = ["emi", "simple", "compound"];

export const FREQUENCY_LABELS: Record<PaymentFrequency, string> = {
  monthly:   "Monthly",
  quarterly: "Quarterly",
  yearly:    "Yearly",
};
export const ALL_FREQUENCIES: PaymentFrequency[] = ["monthly", "quarterly", "yearly"];

// Periods per year
const PERIODS_PER_YEAR: Record<PaymentFrequency, number> = {
  monthly: 12, quarterly: 4, yearly: 1,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function payoffDate(periods: number, freq: PaymentFrequency): string {
  const months = freq === "monthly" ? periods : freq === "quarterly" ? periods * 3 : periods * 12;
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function buildYearly(schedule: AmortizationRow[], freq: PaymentFrequency): YearlySummary[] {
  const ppy = PERIODS_PER_YEAR[freq];
  const map = new Map<number, YearlySummary>();
  schedule.forEach((r) => {
    const year = Math.ceil(r.period / ppy);
    if (!map.has(year)) map.set(year, { year, totalPayment: 0, totalPrincipal: 0, totalInterest: 0, endBalance: 0 });
    const s = map.get(year)!;
    s.totalPayment   += r.payment;
    s.totalPrincipal += r.principal;
    s.totalInterest  += r.interest;
    s.endBalance      = r.balance;
  });
  return Array.from(map.values());
}

// ── EMI schedule ──────────────────────────────────────────────────────────────

function buildEMISchedule(
  principal: number,
  annualRate: number,
  totalPeriods: number,
  freq: PaymentFrequency
): AmortizationRow[] {
  const ppy = PERIODS_PER_YEAR[freq];
  const r = annualRate / 100 / ppy;
  const payment = r === 0
    ? principal / totalPeriods
    : principal * r * Math.pow(1 + r, totalPeriods) / (Math.pow(1 + r, totalPeriods) - 1);

  const schedule: AmortizationRow[] = [];
  let balance = principal;

  for (let p = 1; p <= totalPeriods && balance > 0.005; p++) {
    const interestPart  = balance * r;
    const principalPart = Math.min(payment - interestPart, balance);
    balance = Math.max(0, balance - principalPart);
    schedule.push({ period: p, payment: interestPart + principalPart, principal: principalPart, interest: interestPart, balance });
    if (balance < 0.005) break;
  }
  return schedule;
}

// ── Main calculate ────────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const loanAmt = parseFloat(inputs.loanAmount);
  const rate    = parseFloat(inputs.interestRate);
  const dur     = parseFloat(inputs.duration);
  const down    = parseFloat(inputs.downPayment) || 0;

  if (!loanAmt || loanAmt <= 0) return null;
  if (isNaN(rate) || rate < 0) return null;
  if (!dur || dur <= 0) return null;
  if (down >= loanAmt) return null;

  const principal = loanAmt - down;
  const years = inputs.durationUnit === "years" ? dur : dur / 12;
  const ppy   = PERIODS_PER_YEAR[inputs.frequency];
  const totalPeriods = Math.round(years * ppy);
  if (totalPeriods <= 0) return null;

  if (inputs.interestType === "emi") {
    const schedule = buildEMISchedule(principal, rate, totalPeriods, inputs.frequency);
    const totalPayment  = schedule.reduce((s, r) => s + r.payment, 0);
    const totalInterest = totalPayment - principal;
    const periodicPayment = schedule[0]?.payment ?? 0;

    return {
      principal,
      interestType: "emi",
      frequency: inputs.frequency,
      periodicPayment,
      totalPayment,
      totalInterest,
      totalPeriods: schedule.length,
      payoffDate: payoffDate(schedule.length, inputs.frequency),
      schedule,
      yearlySchedule: buildYearly(schedule, inputs.frequency),
      currency: inputs.currency,
    };

  } else if (inputs.interestType === "simple") {
    const totalInterest = principal * (rate / 100) * years;
    const totalPayment  = principal + totalInterest;
    const periodicPayment = totalPayment / totalPeriods;

    // Build simple interest schedule
    const schedule: AmortizationRow[] = [];
    const interestPerPeriod  = totalInterest / totalPeriods;
    const principalPerPeriod = principal / totalPeriods;
    let balance = principal;

    for (let p = 1; p <= totalPeriods; p++) {
      balance = Math.max(0, balance - principalPerPeriod);
      schedule.push({ period: p, payment: periodicPayment, principal: principalPerPeriod, interest: interestPerPeriod, balance });
    }

    return {
      principal,
      interestType: "simple",
      frequency: inputs.frequency,
      periodicPayment,
      totalPayment,
      totalInterest,
      totalPeriods,
      payoffDate: payoffDate(totalPeriods, inputs.frequency),
      schedule,
      yearlySchedule: buildYearly(schedule, inputs.frequency),
      currency: inputs.currency,
    };

  } else {
    // Compound interest
    const n = ppy;
    const finalAmount = principal * Math.pow(1 + rate / 100 / n, n * years);
    const totalInterest = finalAmount - principal;
    const totalPayment  = finalAmount;
    const periodicPayment = finalAmount / totalPeriods;

    const schedule: AmortizationRow[] = [];
    let balance = principal;
    const rPeriod = rate / 100 / n;

    for (let p = 1; p <= totalPeriods; p++) {
      const interestPart  = balance * rPeriod;
      const principalPart = periodicPayment - interestPart;
      balance = Math.max(0, balance - principalPart);
      schedule.push({ period: p, payment: periodicPayment, principal: principalPart, interest: interestPart, balance });
    }

    return {
      principal,
      interestType: "compound",
      frequency: inputs.frequency,
      periodicPayment,
      totalPayment,
      totalInterest,
      totalPeriods,
      payoffDate: payoffDate(totalPeriods, inputs.frequency),
      schedule,
      yearlySchedule: buildYearly(schedule, inputs.frequency),
      currency: inputs.currency,
      finalAmount,
    };
  }
}

// ── Rate comparison ───────────────────────────────────────────────────────────

export function compareRates(
  principal: number,
  rates: number[],
  totalPeriods: number,
  freq: PaymentFrequency
): ScenarioResult[] {
  return rates.map((rate) => {
    const ppy = PERIODS_PER_YEAR[freq];
    const r = rate / 100 / ppy;
    const payment = r === 0
      ? principal / totalPeriods
      : principal * r * Math.pow(1 + r, totalPeriods) / (Math.pow(1 + r, totalPeriods) - 1);
    const totalPayment  = payment * totalPeriods;
    const totalInterest = totalPayment - principal;
    return { rate, periodicPayment: payment, totalInterest, totalPayment };
  });
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function fmt(value: number, currency: Currency, decimals = 0): string {
  return `${CURRENCY_SYMBOLS[currency]}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function fmtNum(value: number, decimals = 2): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// ── LocalStorage ──────────────────────────────────────────────────────────────

const HISTORY_KEY = "loan-interest-calculator-property-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const h = getHistory();
    const slim = { ...result, schedule: [], yearlySchedule: [] };
    h.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result: slim as CalculationResult });
    if (h.length > MAX_HISTORY) h.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  try {
    const s = localStorage.getItem(HISTORY_KEY);
    return s ? JSON.parse(s) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

// ── CSV Export ────────────────────────────────────────────────────────────────

export function exportScheduleCSV(schedule: AmortizationRow[], freq: PaymentFrequency, currency: Currency): void {
  const sym = CURRENCY_SYMBOLS[currency];
  const header = `Period,Payment,Principal,Interest,Balance\n`;
  const rows = schedule.map((r) =>
    `${r.period},${r.payment.toFixed(2)},${r.principal.toFixed(2)},${r.interest.toFixed(2)},${r.balance.toFixed(2)}`
  ).join("\n");
  const blob = new Blob([header + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "property_loan_schedule.csv";
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
  void sym; void freq;
}

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = CURRENCY_SYMBOLS[result.currency];
  const freqLabel = FREQUENCY_LABELS[result.frequency];
  return [
    "Property Loan Interest Calculator – Summary",
    "=".repeat(45),
    "",
    `Loan Amount      : ${sym}${fmtNum(parseFloat(inputs.loanAmount) || 0, 0)}`,
    inputs.downPayment ? `Down Payment     : ${sym}${fmtNum(parseFloat(inputs.downPayment) || 0, 0)}` : "",
    `Principal        : ${sym}${fmtNum(result.principal, 0)}`,
    `Interest Rate    : ${inputs.interestRate}% p.a.`,
    `Duration         : ${inputs.duration} ${inputs.durationUnit}`,
    `Interest Type    : ${INTEREST_TYPE_LABELS[result.interestType]}`,
    `Payment Freq.    : ${freqLabel}`,
    "",
    `${freqLabel} Payment  : ${sym}${fmtNum(result.periodicPayment, 2)}`,
    `Total Interest   : ${sym}${fmtNum(result.totalInterest, 0)}`,
    `Total Payment    : ${sym}${fmtNum(result.totalPayment, 0)}`,
    `Payoff Date      : ${result.payoffDate}`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].filter(Boolean).join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}



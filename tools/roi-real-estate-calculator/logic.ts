import {
  CalculationResult, CalculatorInputs, Currency,
  HistoryEntry, InvestmentDuration, MortgageTerm, YearProjection,
} from "./types";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", INR: "₹", BDT: "৳",
};
export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD ($)", EUR: "EUR (€)", GBP: "GBP (£)", INR: "INR (₹)", BDT: "BDT (৳)",
};
export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "INR", "BDT"];
export const MORTGAGE_TERMS: MortgageTerm[] = [15, 20, 30];
export const INVESTMENT_DURATIONS: InvestmentDuration[] = [1, 5, 10, 20, 30];

function monthlyMortgagePayment(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  if (annualRate === 0) return principal / (years * 12);
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

function getRating(roi: number): CalculationResult["rating"] {
  if (roi >= 12) return "Excellent";
  if (roi >= 8)  return "Strong";
  if (roi >= 5)  return "Average";
  if (roi >= 2)  return "Below Average";
  return "Poor";
}

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const price       = parseFloat(inputs.purchasePrice)   || 0;
  const down        = parseFloat(inputs.downPayment)     || 0;
  const closing     = parseFloat(inputs.closingCosts)    || 0;
  const reno        = parseFloat(inputs.renovationCost)  || 0;
  const mRate       = parseFloat(inputs.mortgageRate)    || 0;
  const rent        = parseFloat(inputs.monthlyRent)     || 0;
  const other       = parseFloat(inputs.otherIncome)     || 0;
  const tax         = parseFloat(inputs.propertyTax)     || 0;
  const ins         = parseFloat(inputs.insurance)       || 0;
  const maint       = parseFloat(inputs.maintenance)     || 0;
  const mgmt        = parseFloat(inputs.management)      || 0;
  const hoa         = parseFloat(inputs.hoa)             || 0;
  const vacancy     = inputs.vacancyRate / 100;
  const appRate     = parseFloat(inputs.appreciationRate) || 0;
  const years       = inputs.investmentDuration;

  if (!price || price <= 0) return null;
  if (!rent  || rent  <= 0) return null;

  const loanAmount       = Math.max(0, price - down);
  const totalInvestment  = down + closing + reno;
  const monthlyMortgage  = monthlyMortgagePayment(loanAmount, mRate, inputs.mortgageTerm);

  const vacancyAdjRent   = rent * (1 - vacancy);
  const monthlyIncome    = vacancyAdjRent + other;
  const monthlyExpenses  = tax + ins + maint + mgmt + hoa;
  const monthlyCashFlow  = monthlyIncome - monthlyExpenses - monthlyMortgage;
  const annualCashFlow   = monthlyCashFlow * 12;
  const annualRent       = rent * 12;
  const annualExpenses   = monthlyExpenses * 12;

  const cashOnCashROI    = totalInvestment > 0 ? (annualCashFlow / totalInvestment) * 100 : 0;
  const grossYield       = (annualRent / price) * 100;
  const netYield         = ((annualRent - annualExpenses) / price) * 100;

  const futureValue      = price * Math.pow(1 + appRate / 100, years);
  const appreciationGain = futureValue - price;
  const totalReturn      = annualCashFlow * years + appreciationGain;
  const totalROI         = totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0;

  const breakEvenMonths  = monthlyCashFlow > 0
    ? Math.ceil(totalInvestment / monthlyCashFlow)
    : null;

  // Year-by-year projections
  const projections: YearProjection[] = [];
  let cumulativeCF = 0;
  for (let y = 1; y <= years; y++) {
    const propVal = price * Math.pow(1 + appRate / 100, y);
    const loanBalance = loanAmount > 0
      ? loanAmount * Math.pow(1 + mRate / 100 / 12, y * 12) -
        monthlyMortgage * (Math.pow(1 + mRate / 100 / 12, y * 12) - 1) / (mRate / 100 / 12)
      : 0;
    const equity = propVal - Math.max(0, loanBalance);
    cumulativeCF += annualCashFlow;
    const totalRet = cumulativeCF + (propVal - price);
    projections.push({
      year: y,
      propertyValue: propVal,
      equity: Math.max(0, equity),
      cumulativeCashFlow: cumulativeCF,
      totalReturn: totalRet,
      roi: totalInvestment > 0 ? (totalRet / totalInvestment) * 100 : 0,
    });
  }

  return {
    totalInvestment, loanAmount,
    monthlyMortgage, monthlyIncome, monthlyExpenses, monthlyCashFlow,
    annualCashFlow, annualRent, annualExpenses,
    cashOnCashROI, grossYield, netYield,
    futureValue, appreciationGain, totalReturn, totalROI,
    breakEvenMonths, projections,
    rating: getRating(cashOnCashROI),
    currency: inputs.currency,
  };
}

export function fmt(value: number, currency: Currency, decimals = 0): string {
  return `${CURRENCY_SYMBOLS[currency]}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  })}`;
}
export function fmtPct(value: number): string {
  return `${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
}
export function fmtCF(value: number, currency: Currency): string {
  const sym = CURRENCY_SYMBOLS[currency];
  return `${value >= 0 ? "+" : "−"}${sym}${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }) as T;
}

const HISTORY_KEY = "roi-real-estate-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const h = getHistory();
    const slim = { ...result, projections: result.projections.slice(0, 5) };
    h.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result: slim as CalculationResult });
    if (h.length > MAX_HISTORY) h.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  } catch { /* ignore */ }
}
export function getHistory(): HistoryEntry[] {
  try { const s = localStorage.getItem(HISTORY_KEY); return s ? JSON.parse(s) : []; } catch { return []; }
}
export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = CURRENCY_SYMBOLS[result.currency];
  return [
    "ROI Real Estate Calculator – Summary",
    "=".repeat(45), "",
    `Purchase Price       : ${sym}${parseFloat(inputs.purchasePrice).toLocaleString("en-US")}`,
    `Total Investment     : ${sym}${result.totalInvestment.toLocaleString("en-US")}`,
    `Loan Amount          : ${sym}${result.loanAmount.toLocaleString("en-US")}`,
    "",
    "── Monthly ──",
    `Monthly Rent         : ${sym}${parseFloat(inputs.monthlyRent).toLocaleString("en-US")}`,
    `Monthly Expenses     : ${sym}${result.monthlyExpenses.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
    result.monthlyMortgage > 0 ? `Monthly Mortgage     : ${sym}${result.monthlyMortgage.toLocaleString("en-US", { maximumFractionDigits: 2 })}` : "",
    `Monthly Cash Flow    : ${fmtCF(result.monthlyCashFlow, result.currency)}`,
    "",
    "── Returns ──",
    `Cash-on-Cash ROI     : ${fmtPct(result.cashOnCashROI)}`,
    `Gross Yield          : ${fmtPct(result.grossYield)}`,
    `Net Yield            : ${fmtPct(result.netYield)}`,
    `Total ROI (${inputs.investmentDuration}yr)    : ${fmtPct(result.totalROI)}`,
    `Future Value         : ${sym}${result.futureValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
    `Rating               : ${result.rating}`,
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

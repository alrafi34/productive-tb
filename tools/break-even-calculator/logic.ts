// ── Break Even Calculator Logic ──

export interface BreakEvenInputs {
  fixedCosts: number;
  variableCostPerUnit: number;
  sellingPricePerUnit: number;
  currentUnitsSold?: number; // optional — enables profit/loss + margin of safety
  targetProfit?: number;      // optional — enables required units for target profit
  currency: string;
}

export interface BreakEvenResult {
  // Core
  contributionMargin: number;          // SP - VC
  contributionMarginRatio: number;     // CM / SP  (0–1)
  breakEvenUnits: number;              // FC / CM
  breakEvenRevenue: number;            // BEU × SP
  // Optional (requires currentUnitsSold)
  currentRevenue: number | null;
  currentTotalCost: number | null;
  profit: number | null;
  marginOfSafetyUnits: number | null;
  marginOfSafetyRevenue: number | null;
  marginOfSafetyPct: number | null;
  // Optional (requires targetProfit)
  unitsForTargetProfit: number | null;
  revenueForTargetProfit: number | null;
  // Meta
  currency: string;
  profitStatus: "profitable" | "break-even" | "loss" | null;
  performanceLevel: "profitable" | "near-break-even" | "loss" | null;
  performanceLabel: string;
  interpretation: string;
  // Formatted strings
  contributionMarginFormatted: string;
  contributionMarginRatioFormatted: string;
  breakEvenUnitsFormatted: string;
  breakEvenRevenueFormatted: string;
  profitFormatted: string | null;
  marginOfSafetyRevenueFormatted: string | null;
  marginOfSafetyPctFormatted: string | null;
  unitsForTargetProfitFormatted: string | null;
  revenueForTargetProfitFormatted: string | null;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  inputs: BreakEvenInputs;
  result: BreakEvenResult;
  timestamp: number;
}

export const CURRENCIES: Record<string, { symbol: string; label: string }> = {
  USD: { symbol: "$",    label: "USD ($)"   },
  EUR: { symbol: "€",    label: "EUR (€)"   },
  GBP: { symbol: "£",    label: "GBP (£)"   },
  CAD: { symbol: "CA$",  label: "CAD (CA$)" },
  AUD: { symbol: "A$",   label: "AUD (A$)"  },
  JPY: { symbol: "¥",    label: "JPY (¥)"   },
  INR: { symbol: "₹",    label: "INR (₹)"   },
  AED: { symbol: "د.إ",  label: "AED (د.إ)" },
  SAR: { symbol: "﷼",   label: "SAR (﷼)"  },
  BRL: { symbol: "R$",   label: "BRL (R$)"  },
  ZAR: { symbol: "R",    label: "ZAR (R)"   },
  SGD: { symbol: "S$",   label: "SGD (S$)"  },
};

// ── Formatting ───────────────────────────────────────────────────────────────

export function formatCurrency(amount: number, currency: string, decimals = 2): string {
  const info = CURRENCIES[currency] ?? CURRENCIES["USD"];
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (amount < 0 ? "-" : "") + info.symbol + formatted;
}

export function formatNum(n: number, decimals = 2): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function parseNum(v: string): number | null {
  const s = v.replace(/,/g, "").trim();
  if (!s || s === ".") return null;
  const n = Number(s);
  return isNaN(n) ? null : n;
}

// ── Interpretation ───────────────────────────────────────────────────────────

function getInterpretation(
  profit: number | null,
  marginOfSafetyPct: number | null,
  breakEvenUnits: number
): { level: BreakEvenResult["performanceLevel"]; label: string; interpretation: string } {
  if (profit === null) {
    return {
      level: null,
      label: "—",
      interpretation: `You need to sell at least ${Math.ceil(breakEvenUnits).toLocaleString("en-US")} units to cover all costs and break even.`,
    };
  }
  if (profit > 0) {
    const mos = marginOfSafetyPct ?? 0;
    return {
      level: "profitable",
      label: "Profitable",
      interpretation: `You are operating above break-even. Profit is positive and you have a ${mos.toFixed(1)}% margin of safety — meaning sales can fall by ${mos.toFixed(1)}% before you reach the break-even point.`,
    };
  }
  if (profit === 0) {
    return {
      level: "near-break-even",
      label: "At Break-Even",
      interpretation: "You are exactly at break-even — all costs are covered and profit is zero. Any additional unit sold will generate profit.",
    };
  }
  return {
    level: "loss",
    label: "Operating at a Loss",
    interpretation: `You are currently selling below the break-even point. You need to sell ${Math.ceil(breakEvenUnits).toLocaleString("en-US")} units to break even. Increase sales, raise prices, or reduce fixed/variable costs to improve profitability.`,
  };
}

// ── Core Calculation ─────────────────────────────────────────────────────────

export function calculateBreakEven(inputs: BreakEvenInputs, decimals = 2): BreakEvenResult | null {
  const { fixedCosts: fc, variableCostPerUnit: vc, sellingPricePerUnit: sp,
          currentUnitsSold: cu, targetProfit: tp, currency } = inputs;

  if (!isFinite(fc) || !isFinite(vc) || !isFinite(sp)) return null;
  if (fc < 0 || vc < 0 || sp <= 0) return null;
  if (sp <= vc) return null; // contribution margin would be ≤ 0

  const cm = sp - vc;                        // contribution margin per unit
  const cmRatio = cm / sp;                   // contribution margin ratio
  const beu = fc / cm;                       // break-even units
  const ber = beu * sp;                      // break-even revenue
  const sym = CURRENCIES[currency]?.symbol ?? "$";

  const steps: string[] = [
    `Contribution Margin = ${sym}${sp} − ${sym}${vc} = ${sym}${cm.toFixed(decimals)}`,
    `CM Ratio = ${sym}${cm.toFixed(decimals)} ÷ ${sym}${sp} = ${(cmRatio * 100).toFixed(decimals)}%`,
    `Break-even Units = ${sym}${fc} ÷ ${sym}${cm.toFixed(decimals)} = ${formatNum(beu, decimals)} units`,
    `Break-even Revenue = ${formatNum(beu, decimals)} × ${sym}${sp} = ${sym}${formatNum(ber, decimals)}`,
  ];

  // Optional: profit / margin of safety
  let currentRevenue: number | null = null;
  let currentTotalCost: number | null = null;
  let profit: number | null = null;
  let mosUnits: number | null = null;
  let mosRevenue: number | null = null;
  let mosPct: number | null = null;

  if (cu !== undefined && cu >= 0) {
    currentRevenue  = cu * sp;
    currentTotalCost = cu * vc + fc;
    profit          = currentRevenue - currentTotalCost;
    mosUnits        = cu - beu;
    mosRevenue      = mosUnits * sp;
    mosPct          = cu > 0 ? (mosUnits / cu) * 100 : null;
    steps.push(`Profit = (${cu} × ${sym}${sp}) − (${cu} × ${sym}${vc}) − ${sym}${fc} = ${sym}${profit.toFixed(decimals)}`);
    if (mosPct !== null)
      steps.push(`Margin of Safety = ${formatNum(mosUnits ?? 0, decimals)} units (${mosPct.toFixed(decimals)}%)`);
  }

  // Optional: units for target profit
  let unitsForTP: number | null = null;
  let revenueForTP: number | null = null;
  if (tp !== undefined && tp >= 0) {
    unitsForTP  = (fc + tp) / cm;
    revenueForTP = unitsForTP * sp;
    steps.push(`Units for ${sym}${tp} profit = (${sym}${fc} + ${sym}${tp}) ÷ ${sym}${cm.toFixed(decimals)} = ${formatNum(unitsForTP, decimals)} units`);
  }

  const { level, label, interpretation } = getInterpretation(profit, mosPct, beu);

  const profitStatus: BreakEvenResult["profitStatus"] =
    profit === null ? null : profit > 0 ? "profitable" : profit === 0 ? "break-even" : "loss";

  return {
    contributionMargin: cm,
    contributionMarginRatio: cmRatio,
    breakEvenUnits: beu,
    breakEvenRevenue: ber,
    currentRevenue,
    currentTotalCost,
    profit,
    marginOfSafetyUnits: mosUnits,
    marginOfSafetyRevenue: mosRevenue,
    marginOfSafetyPct: mosPct,
    unitsForTargetProfit: unitsForTP,
    revenueForTargetProfit: revenueForTP,
    currency,
    profitStatus,
    performanceLevel: level,
    performanceLabel: label,
    interpretation,
    // Formatted
    contributionMarginFormatted:      formatCurrency(cm, currency, decimals),
    contributionMarginRatioFormatted: (cmRatio * 100).toFixed(decimals) + "%",
    breakEvenUnitsFormatted:          formatNum(beu, decimals),
    breakEvenRevenueFormatted:        formatCurrency(ber, currency, decimals),
    profitFormatted:                  profit !== null ? formatCurrency(profit, currency, decimals) : null,
    marginOfSafetyRevenueFormatted:   mosRevenue !== null ? formatCurrency(mosRevenue, currency, decimals) : null,
    marginOfSafetyPctFormatted:       mosPct !== null ? mosPct.toFixed(decimals) + "%" : null,
    unitsForTargetProfitFormatted:    unitsForTP !== null ? formatNum(unitsForTP, decimals) + " units" : null,
    revenueForTargetProfitFormatted:  revenueForTP !== null ? formatCurrency(revenueForTP, currency, decimals) : null,
    steps,
  };
}

// ── Validation ───────────────────────────────────────────────────────────────

export interface ValidationErrors {
  fixedCosts?: string;
  variableCostPerUnit?: string;
  sellingPricePerUnit?: string;
  currentUnitsSold?: string;
  targetProfit?: string;
}

export function validateInputs(f: Record<string, string>): ValidationErrors {
  const errs: ValidationErrors = {};

  const req = (key: keyof ValidationErrors, raw: string, label: string, min = 0) => {
    if (!raw || raw.trim() === "") { errs[key] = `${label} is required.`; return; }
    const n = parseNum(raw);
    if (n === null) { errs[key] = "Enter a valid number."; return; }
    if (n < min)    { errs[key] = `${label} must be ≥ ${min}.`; }
  };

  req("fixedCosts",          f.fixedCosts,          "Fixed Costs",              0);
  req("variableCostPerUnit", f.variableCostPerUnit,  "Variable Cost per Unit",   0);
  req("sellingPricePerUnit", f.sellingPricePerUnit,  "Selling Price per Unit", 0.01);

  if (!errs.sellingPricePerUnit && !errs.variableCostPerUnit) {
    const sp = parseNum(f.sellingPricePerUnit);
    const vc = parseNum(f.variableCostPerUnit);
    if (sp !== null && vc !== null && sp <= vc)
      errs.sellingPricePerUnit = "Selling price must be greater than variable cost.";
  }
  if (f.currentUnitsSold?.trim()) {
    const n = parseNum(f.currentUnitsSold);
    if (n === null || n < 0) errs.currentUnitsSold = "Enter a valid number ≥ 0.";
  }
  if (f.targetProfit?.trim()) {
    const n = parseNum(f.targetProfit);
    if (n === null || n < 0) errs.targetProfit = "Enter a valid number ≥ 0.";
  }
  return errs;
}

// ── LocalStorage ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "break-even-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}
export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Utilities ────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export function buildShareUrl(fields: Record<string, string>, currency: string): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("currency", currency);
  for (const [k, v] of Object.entries(fields)) if (v) url.searchParams.set(k, v);
  return url.toString();
}

export function parseShareParams(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  if (!p.get("fc")) return null;
  const out: Record<string, string> = {};
  for (const k of ["currency", "fc", "vc", "sp", "cu", "tp"])
    if (p.get(k)) out[k] = p.get(k)!;
  return out;
}

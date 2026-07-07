// ── Profit Margin Calculator Logic ──

export type CalcMode = "margin" | "markup" | "sellingPrice" | "costPrice" | "revenue";

export const MODE_LABELS: Record<CalcMode, string> = {
  margin:       "Profit Margin",
  markup:       "Markup",
  sellingPrice: "Find Selling Price",
  costPrice:    "Find Cost Price",
  revenue:      "Revenue & Total Cost",
};

export interface ProfitMarginResult {
  mode: CalcMode;
  profit: number;
  profitFormatted: string;
  margin: number;           // %
  marginFormatted: string;
  markup: number;           // %
  markupFormatted: string;
  sellingPrice: number;
  sellingPriceFormatted: string;
  costPrice: number;
  costPriceFormatted: string;
  revenue: number | null;
  totalCost: number | null;
  currency: string;
  status: "profitable" | "break-even" | "loss";
  statusLabel: string;
  performanceLevel: "excellent" | "good" | "average" | "low" | "loss";
  performanceLabel: string;
  interpretation: string;
  formula: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  mode: CalcMode;
  result: ProfitMarginResult;
  timestamp: number;
}

export const CURRENCIES: Record<string, { symbol: string; label: string }> = {
  USD: { symbol: "$",    label: "USD ($)"   },
  EUR: { symbol: "€",    label: "EUR (€)"   },
  GBP: { symbol: "£",    label: "GBP (£)"   },
  JPY: { symbol: "¥",    label: "JPY (¥)"   },
  AUD: { symbol: "A$",   label: "AUD (A$)"  },
  CAD: { symbol: "CA$",  label: "CAD (CA$)" },
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

export function formatPct(n: number, decimals = 2): string {
  return (n >= 0 ? "" : "") + n.toFixed(decimals) + "%";
}

export function formatNumber(n: number, decimals = 2): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function parseNum(v: string): number | null {
  const s = v.replace(/,/g, "").trim();
  if (!s || s === ".") return null;
  const n = Number(s);
  return isNaN(n) ? null : n;
}

// ── Performance Label ────────────────────────────────────────────────────────

function getPerf(margin: number): {
  level: ProfitMarginResult["performanceLevel"];
  label: string;
  interpretation: string;
} {
  if (margin < 0)
    return {
      level: "loss",
      label: "Operating at a Loss",
      interpretation:
        "Selling price is below cost — every sale loses money. Review your pricing strategy, negotiate lower supplier costs, or reassess the product line.",
    };
  if (margin < 10)
    return {
      level: "low",
      label: "Low Margin",
      interpretation:
        "Thin margins under 10% leave little room for error. Common in high-volume industries like grocery or consumer electronics. Consider raising prices, reducing COGS, or cutting operating costs.",
    };
  if (margin < 20)
    return {
      level: "average",
      label: "Average Margin",
      interpretation:
        "A 10–20% profit margin is typical for most retail and ecommerce businesses. There is room for improvement — consider bundling, upselling, or reducing fulfillment costs.",
    };
  if (margin < 40)
    return {
      level: "good",
      label: "Good Margin",
      interpretation:
        "A 20–40% margin is strong for most product-based businesses. This range is common in software, specialty retail, and branded goods. Focus on scaling to amplify profit.",
    };
  return {
    level: "excellent",
    label: "Excellent Margin",
    interpretation:
      "Margins above 40% are excellent and typical of SaaS, digital products, and luxury goods. Prioritize retention and lifetime value to maximize long-term profitability.",
  };
}

// ── Core Calculation ─────────────────────────────────────────────────────────

export function calculateMargin(
  mode: CalcMode,
  fields: { cost?: number; selling?: number; targetMargin?: number; targetMarkup?: number; revenue?: number; totalCost?: number },
  currency: string,
  decimals: number
): ProfitMarginResult | null {
  const sym = CURRENCIES[currency]?.symbol ?? "$";
  let cost = 0, selling = 0, profit = 0, margin = 0, markup = 0;
  let revenue: number | null = null;
  let totalCost: number | null = null;
  let formula = "";
  const steps: string[] = [];

  if (mode === "margin" || mode === "markup") {
    cost = fields.cost ?? 0;
    selling = fields.selling ?? 0;
    if (cost < 0 || selling < 0) return null;
    if (selling === 0) return null;
    profit = selling - cost;
    margin = (profit / selling) * 100;
    markup = cost > 0 ? (profit / cost) * 100 : 0;
    formula = `Margin = ((${sym}${selling} − ${sym}${cost}) ÷ ${sym}${selling}) × 100`;
    steps.push(`Profit = ${sym}${selling} − ${sym}${cost} = ${sym}${profit.toFixed(decimals)}`);
    steps.push(`Margin = (${sym}${profit.toFixed(decimals)} ÷ ${sym}${selling}) × 100 = ${margin.toFixed(decimals)}%`);
    if (cost > 0) steps.push(`Markup = (${sym}${profit.toFixed(decimals)} ÷ ${sym}${cost}) × 100 = ${markup.toFixed(decimals)}%`);

  } else if (mode === "sellingPrice") {
    cost = fields.cost ?? 0;
    const tm = (fields.targetMargin ?? 0) / 100;
    if (cost < 0 || tm <= 0 || tm >= 1) return null;
    selling = cost / (1 - tm);
    profit = selling - cost;
    margin = (fields.targetMargin ?? 0);
    markup = cost > 0 ? (profit / cost) * 100 : 0;
    formula = `Selling Price = ${sym}${cost} ÷ (1 − ${fields.targetMargin}%)`;
    steps.push(`Selling Price = ${sym}${cost} ÷ (1 − ${fields.targetMargin}%)`);
    steps.push(`= ${sym}${cost} ÷ ${(1 - tm).toFixed(4)} = ${sym}${selling.toFixed(decimals)}`);
    steps.push(`Profit = ${sym}${selling.toFixed(decimals)} − ${sym}${cost} = ${sym}${profit.toFixed(decimals)}`);

  } else if (mode === "costPrice") {
    selling = fields.selling ?? 0;
    const tm = (fields.targetMargin ?? 0) / 100;
    if (selling < 0 || tm < 0 || tm >= 1) return null;
    cost = selling * (1 - tm);
    profit = selling - cost;
    margin = (fields.targetMargin ?? 0);
    markup = cost > 0 ? (profit / cost) * 100 : 0;
    formula = `Cost Price = ${sym}${selling} × (1 − ${fields.targetMargin}%)`;
    steps.push(`Cost Price = ${sym}${selling} × (1 − ${fields.targetMargin}%)`);
    steps.push(`= ${sym}${selling} × ${(1 - tm).toFixed(4)} = ${sym}${cost.toFixed(decimals)}`);
    steps.push(`Profit = ${sym}${selling} − ${sym}${cost.toFixed(decimals)} = ${sym}${profit.toFixed(decimals)}`);

  } else if (mode === "revenue") {
    revenue = fields.revenue ?? 0;
    totalCost = fields.totalCost ?? 0;
    if (revenue <= 0) return null;
    profit = revenue - totalCost;
    margin = (profit / revenue) * 100;
    selling = revenue;
    cost = totalCost;
    markup = cost > 0 ? (profit / cost) * 100 : 0;
    formula = `Margin = ((${sym}${revenue} − ${sym}${totalCost}) ÷ ${sym}${revenue}) × 100`;
    steps.push(`Profit = ${sym}${revenue} − ${sym}${totalCost} = ${sym}${profit.toFixed(decimals)}`);
    steps.push(`Margin = (${sym}${profit.toFixed(decimals)} ÷ ${sym}${revenue}) × 100 = ${margin.toFixed(decimals)}%`);
  }

  if (!isFinite(margin) || !isFinite(profit)) return null;

  const status: ProfitMarginResult["status"] =
    profit > 0 ? "profitable" : profit === 0 ? "break-even" : "loss";
  const statusLabel = profit > 0 ? "Profitable" : profit === 0 ? "Break Even" : "Loss";

  const { level, label: perfLabel, interpretation } = getPerf(margin);

  return {
    mode, profit,
    profitFormatted: formatCurrency(profit, currency, decimals),
    margin, marginFormatted: formatPct(margin, decimals),
    markup, markupFormatted: cost > 0 ? formatPct(markup, decimals) : "N/A",
    sellingPrice: selling, sellingPriceFormatted: formatCurrency(selling, currency, decimals),
    costPrice: cost, costPriceFormatted: formatCurrency(cost, currency, decimals),
    revenue, totalCost, currency,
    status, statusLabel,
    performanceLevel: level, performanceLabel: perfLabel,
    interpretation, formula, steps,
  };
}

// ── Validation ───────────────────────────────────────────────────────────────

export interface ValidationErrors {
  cost?: string;
  selling?: string;
  targetMargin?: string;
  revenue?: string;
  totalCost?: string;
}

export function validateInputs(mode: CalcMode, f: Record<string, string>): ValidationErrors {
  const errs: ValidationErrors = {};
  const req = (key: keyof ValidationErrors, raw: string, label: string, opts: { min?: number; max?: number } = {}) => {
    if (!raw || raw.trim() === "") { errs[key] = `${label} is required.`; return; }
    const n = parseNum(raw);
    if (n === null) { errs[key] = `Enter a valid number.`; return; }
    if (opts.min !== undefined && n < opts.min) errs[key] = `${label} must be ≥ ${opts.min}.`;
    if (opts.max !== undefined && n > opts.max) errs[key] = `${label} must be ≤ ${opts.max}.`;
  };

  if (mode === "margin" || mode === "markup") {
    req("cost", f.cost, "Cost Price", { min: 0 });
    req("selling", f.selling, "Selling Price", { min: 0 });
    if (!errs.selling && !errs.cost) {
      const s = parseNum(f.selling), c = parseNum(f.cost);
      if (s !== null && s === 0) errs.selling = "Selling Price must be greater than zero.";
    }
  }
  if (mode === "sellingPrice") {
    req("cost", f.cost, "Cost Price", { min: 0.01 });
    req("targetMargin", f.targetMargin, "Target Margin", { min: 0.01, max: 99.99 });
  }
  if (mode === "costPrice") {
    req("selling", f.selling, "Selling Price", { min: 0.01 });
    req("targetMargin", f.targetMargin, "Target Margin", { min: 0, max: 99.99 });
  }
  if (mode === "revenue") {
    req("revenue", f.revenue, "Revenue", { min: 0.01 });
    req("totalCost", f.totalCost, "Total Cost", { min: 0 });
  }
  return errs;
}

// ── LocalStorage ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "profit-margin-calculator-history";

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

// ── Utilities ─────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export function buildShareUrl(mode: CalcMode, fields: Record<string, string>, currency: string): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("mode", mode);
  url.searchParams.set("currency", currency);
  for (const [k, v] of Object.entries(fields)) if (v) url.searchParams.set(k, v);
  return url.toString();
}

export function parseShareParams(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  if (!p.get("mode")) return null;
  const out: Record<string, string> = {};
  for (const k of ["mode", "currency", "cost", "selling", "targetMargin", "revenue", "totalCost"])
    if (p.get(k)) out[k] = p.get(k)!;
  return out;
}

// ── Cost Per Click (CPC) Calculator Logic ──

export interface CPCResult {
  cpc: number;
  cpcFormatted: string;
  cost: number;
  clicks: number;
  currency: string;
  formula: string;
  performanceLabel: string;
  performanceLevel: "very-low" | "low" | "average" | "high" | "very-high";
  interpretation: string;
}

export interface HistoryEntry {
  id: string;
  cost: number;
  clicks: number;
  currency: string;
  result: CPCResult;
  timestamp: number;
}

export const CURRENCIES: Record<string, { symbol: string; label: string }> = {
  USD: { symbol: "$",  label: "USD ($)"  },
  EUR: { symbol: "€",  label: "EUR (€)"  },
  GBP: { symbol: "£",  label: "GBP (£)"  },
  CAD: { symbol: "CA$",label: "CAD (CA$)"},
  AUD: { symbol: "A$", label: "AUD (A$)" },
  JPY: { symbol: "¥",  label: "JPY (¥)"  },
  INR: { symbol: "₹",  label: "INR (₹)"  },
  AED: { symbol: "د.إ",label: "AED (د.إ)"},
  SAR: { symbol: "﷼", label: "SAR (﷼)" },
};

export function formatCurrency(amount: number, currency: string): string {
  const info = CURRENCIES[currency] ?? CURRENCIES["USD"];
  return info.symbol + amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
}

export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US");
}

export function parseNumber(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim();
  if (cleaned === "" || cleaned === ".") return null;
  const n = Number(cleaned);
  return isNaN(n) ? null : n;
}

export function calculateCPC(
  cost: number,
  clicks: number,
  currency: string,
  decimalPlaces: number = 2
): CPCResult | null {
  if (!isFinite(cost) || !isFinite(clicks)) return null;
  if (cost < 0) return null;
  if (clicks <= 0) return null;

  const cpc = cost / clicks;
  const sym = CURRENCIES[currency]?.symbol ?? "$";
  const cpcFormatted = sym + cpc.toFixed(decimalPlaces);
  const formula = `${formatCurrency(cost, currency)} ÷ ${formatNumber(clicks)} clicks`;
  const { label, level, interpretation } = getPerformanceLabel(cpc);

  return { cpc, cpcFormatted, cost, clicks, currency, formula, performanceLabel: label, performanceLevel: level, interpretation };
}

export function getPerformanceLabel(cpc: number): {
  label: string;
  level: CPCResult["performanceLevel"];
  interpretation: string;
} {
  if (cpc < 0.20) return { label: "Very Low",  level: "very-low",  interpretation: "Exceptionally low CPC. Likely high-volume, low-competition traffic or very efficient bidding." };
  if (cpc < 0.75) return { label: "Low",        level: "low",       interpretation: "Below-average CPC. Good cost efficiency for most advertising channels." };
  if (cpc < 2.00) return { label: "Average",    level: "average",   interpretation: "Typical CPC range for most digital advertising. Benchmark varies by industry." };
  if (cpc < 5.00) return { label: "High",       level: "high",      interpretation: "Above-average CPC. Common in competitive industries such as finance, legal, or insurance." };
  return           { label: "Very High",  level: "very-high", interpretation: "Premium CPC. Typical in high-value industries. Ensure conversion rate justifies the cost." };
}

export function validateInputs(
  cost: string,
  clicks: string
): { costError: string | null; clicksError: string | null } {
  let costError: string | null = null;
  let clicksError: string | null = null;

  if (cost.trim() === "") {
    costError = "Please enter the total advertising cost.";
  } else {
    const v = parseNumber(cost);
    if (v === null) costError = "Please enter a valid number.";
    else if (v < 0) costError = "Advertising cost cannot be negative.";
  }

  if (clicks.trim() === "") {
    clicksError = "Please enter the total number of clicks.";
  } else {
    const v = parseNumber(clicks);
    if (v === null) clicksError = "Please enter a valid number.";
    else if (v < 0) clicksError = "Clicks cannot be negative.";
    else if (v === 0) clicksError = "Total clicks must be greater than zero.";
  }

  return { costError, clicksError };
}

const STORAGE_KEY = "cpc-calculator-history";

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

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export function buildShareUrl(cost: number, clicks: number, currency: string): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("cost", String(cost));
  url.searchParams.set("clicks", String(clicks));
  url.searchParams.set("currency", currency);
  return url.toString();
}

export function parseShareParams(): { cost: string; clicks: string; currency: string } | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const cost = p.get("cost"); const clicks = p.get("clicks");
  if (cost && clicks) return { cost, clicks, currency: p.get("currency") ?? "USD" };
  return null;
}

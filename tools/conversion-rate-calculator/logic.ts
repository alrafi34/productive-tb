// ── Conversion Rate Calculator Logic ──

export interface ConversionResult {
  rate: number;
  rateFormatted: string;
  visitors: number;
  conversions: number;
  formula: string;
  performanceLabel: string;
  performanceLevel: "exceptional" | "excellent" | "good" | "average" | "low";
  warning?: string;
}

export interface HistoryEntry {
  id: string;
  visitors: number;
  conversions: number;
  result: ConversionResult;
  timestamp: number;
}

export function calculateConversionRate(
  visitors: number,
  conversions: number,
  decimalPlaces: number = 2
): ConversionResult | null {
  if (!isFinite(visitors) || !isFinite(conversions)) return null;
  if (visitors <= 0) return null;
  if (conversions < 0) return null;

  const rate = (conversions / visitors) * 100;
  const rateFormatted = rate.toFixed(decimalPlaces) + "%";
  const formula = `(${formatNumber(conversions)} ÷ ${formatNumber(visitors)}) × 100`;
  const { label, level } = getPerformanceLabel(rate);

  let warning: string | undefined;
  if (conversions > visitors) {
    warning = "Conversions exceed visitors. This can occur when multiple conversions per visitor are tracked.";
  }

  return {
    rate,
    rateFormatted,
    visitors,
    conversions,
    formula,
    performanceLabel: label,
    performanceLevel: level,
    warning,
  };
}

export function getPerformanceLabel(rate: number): {
  label: string;
  level: ConversionResult["performanceLevel"];
} {
  if (rate >= 10) return { label: "Exceptional", level: "exceptional" };
  if (rate >= 5) return { label: "Excellent", level: "excellent" };
  if (rate >= 3) return { label: "Good", level: "good" };
  if (rate >= 1) return { label: "Average", level: "average" };
  return { label: "Low", level: "low" };
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

export function validateInputs(
  visitors: string,
  conversions: string
): { visitorsError: string | null; conversionsError: string | null } {
  let visitorsError: string | null = null;
  let conversionsError: string | null = null;

  if (visitors.trim() === "") {
    visitorsError = "Please enter the visitor count.";
  } else {
    const v = parseNumber(visitors);
    if (v === null) visitorsError = "Please enter a valid number for visitors.";
    else if (v < 0) visitorsError = "Visitors cannot be negative.";
    else if (v === 0) visitorsError = "Visitors must be greater than zero.";
  }

  if (conversions.trim() === "") {
    conversionsError = "Please enter the number of conversions.";
  } else {
    const c = parseNumber(conversions);
    if (c === null) conversionsError = "Please enter a valid number for conversions.";
    else if (c < 0) conversionsError = "Conversions cannot be negative.";
  }

  return { visitorsError, conversionsError };
}

// ── LocalStorage ──
const STORAGE_KEY = "conversion-rate-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: Math.random().toString(36).slice(2),
    timestamp: Date.now(),
  };
  const updated = [newEntry, ...history].slice(0, 20);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

// ── Debounce ──
export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// ── Share URL ──
export function buildShareUrl(visitors: number, conversions: number): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("visitors", String(visitors));
  url.searchParams.set("conversions", String(conversions));
  return url.toString();
}

export function parseShareParams(): { visitors: string; conversions: string } | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const visitors = params.get("visitors");
  const conversions = params.get("conversions");
  if (visitors && conversions) return { visitors, conversions };
  return null;
}

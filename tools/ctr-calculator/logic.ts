// ── CTR Calculator Logic ──

export interface CTRResult {
  ctr: number;
  ctrFormatted: string;
  clicks: number;
  impressions: number;
  formula: string;
  performanceLabel: string;
  performanceLevel: "excellent" | "good" | "average" | "low" | "very-low";
}

export interface HistoryEntry {
  id: string;
  clicks: number;
  impressions: number;
  result: CTRResult;
  timestamp: number;
  label?: string;
}

export function calculateCTR(
  clicks: number,
  impressions: number,
  decimalPlaces: number = 2
): CTRResult | null {
  if (!isFinite(clicks) || !isFinite(impressions)) return null;
  if (impressions <= 0) return null;
  if (clicks < 0) return null;

  const ctr = (clicks / impressions) * 100;
  const ctrFormatted = ctr.toFixed(decimalPlaces) + "%";
  const formula = `(${formatNumber(clicks)} ÷ ${formatNumber(impressions)}) × 100`;

  const { label, level } = getPerformanceLabel(ctr);

  return {
    ctr,
    ctrFormatted,
    clicks,
    impressions,
    formula,
    performanceLabel: label,
    performanceLevel: level,
  };
}

export function getPerformanceLabel(ctr: number): {
  label: string;
  level: CTRResult["performanceLevel"];
} {
  if (ctr >= 5) return { label: "Excellent", level: "excellent" };
  if (ctr >= 3) return { label: "Good", level: "good" };
  if (ctr >= 1.5) return { label: "Average", level: "average" };
  if (ctr >= 0.5) return { label: "Low", level: "low" };
  return { label: "Very Low", level: "very-low" };
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
  clicks: string,
  impressions: string
): { clicksError: string | null; impressionsError: string | null } {
  let clicksError: string | null = null;
  let impressionsError: string | null = null;

  if (clicks.trim() === "") {
    clicksError = "Please enter the number of clicks.";
  } else {
    const c = parseNumber(clicks);
    if (c === null) clicksError = "Please enter a valid number for clicks.";
    else if (c < 0) clicksError = "Clicks cannot be negative.";
  }

  if (impressions.trim() === "") {
    impressionsError = "Please enter the number of impressions.";
  } else {
    const i = parseNumber(impressions);
    if (i === null) impressionsError = "Please enter a valid number for impressions.";
    else if (i < 0) impressionsError = "Impressions cannot be negative.";
    else if (i === 0) impressionsError = "Impressions must be greater than zero.";
  }

  return { clicksError, impressionsError };
}

// ── LocalStorage ──
const STORAGE_KEY = "ctr-calculator-history";

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
export function buildShareUrl(clicks: number, impressions: number): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("clicks", String(clicks));
  url.searchParams.set("impressions", String(impressions));
  return url.toString();
}

export function parseShareParams(): { clicks: string; impressions: string } | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const clicks = params.get("clicks");
  const impressions = params.get("impressions");
  if (clicks && impressions) return { clicks, impressions };
  return null;
}

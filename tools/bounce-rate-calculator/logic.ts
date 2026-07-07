// ── Bounce Rate Calculator Logic ──

export interface BounceRateResult {
  rate: number;
  rateFormatted: string;
  bounces: number;
  totalVisits: number;
  formula: string;
  performanceLabel: string;
  performanceLevel: "excellent" | "good" | "average" | "high";
  interpretation: string;
  warning?: string;
}

export interface HistoryEntry {
  id: string;
  bounces: number;
  totalVisits: number;
  result: BounceRateResult;
  timestamp: number;
}

export function calculateBounceRate(
  bounces: number,
  totalVisits: number,
  decimalPlaces: number = 2
): BounceRateResult | null {
  if (!isFinite(bounces) || !isFinite(totalVisits)) return null;
  if (totalVisits <= 0) return null;
  if (bounces < 0) return null;

  const rate = (bounces / totalVisits) * 100;
  const rateFormatted = rate.toFixed(decimalPlaces) + "%";
  const formula = `(${formatNumber(bounces)} ÷ ${formatNumber(totalVisits)}) × 100`;
  const { label, level, interpretation } = getPerformanceLabel(rate);

  let warning: string | undefined;
  if (bounces > totalVisits) {
    warning = "Single page visits exceed total visits. Please verify your data.";
  }

  return {
    rate,
    rateFormatted,
    bounces,
    totalVisits,
    formula,
    performanceLabel: label,
    performanceLevel: level,
    interpretation,
    warning,
  };
}

export function getPerformanceLabel(rate: number): {
  label: string;
  level: BounceRateResult["performanceLevel"];
  interpretation: string;
} {
  if (rate <= 30)
    return {
      label: "Excellent",
      level: "excellent",
      interpretation: "Most visitors continue to additional pages. Your content is highly engaging.",
    };
  if (rate <= 50)
    return {
      label: "Good",
      level: "good",
      interpretation: "A healthy portion of visitors explore further. There is still room to improve.",
    };
  if (rate <= 70)
    return {
      label: "Average",
      level: "average",
      interpretation: "About average for most websites. Consider improving content relevance and CTAs.",
    };
  return {
    label: "High",
    level: "high",
    interpretation: "Many visitors leave after viewing only one page. Review content quality, page speed, and targeting.",
  };
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
  bounces: string,
  totalVisits: string
): { bouncesError: string | null; totalVisitsError: string | null } {
  let bouncesError: string | null = null;
  let totalVisitsError: string | null = null;

  if (bounces.trim() === "") {
    bouncesError = "Please enter the number of single page visits.";
  } else {
    const b = parseNumber(bounces);
    if (b === null) bouncesError = "Please enter a valid number.";
    else if (b < 0) bouncesError = "Single page visits cannot be negative.";
  }

  if (totalVisits.trim() === "") {
    totalVisitsError = "Please enter the total number of visits.";
  } else {
    const t = parseNumber(totalVisits);
    if (t === null) totalVisitsError = "Please enter a valid number.";
    else if (t < 0) totalVisitsError = "Total visits cannot be negative.";
    else if (t === 0) totalVisitsError = "Total visits must be greater than zero.";
  }

  return { bouncesError, totalVisitsError };
}

// ── LocalStorage ──
const STORAGE_KEY = "bounce-rate-calculator-history";

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
export function buildShareUrl(bounces: number, totalVisits: number): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("bounces", String(bounces));
  url.searchParams.set("totalVisits", String(totalVisits));
  return url.toString();
}

export function parseShareParams(): { bounces: string; totalVisits: string } | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const bounces = params.get("bounces");
  const totalVisits = params.get("totalVisits");
  if (bounces && totalVisits) return { bounces, totalVisits };
  return null;
}

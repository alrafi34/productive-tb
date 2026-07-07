// ── ROI Calculator (Marketing) Logic ──

export interface ROIResult {
  roi: number;
  roiFormatted: string;
  profit: number;
  profitFormatted: string;
  investment: number;
  revenue: number;
  currency: string;
  formula: string;
  status: "profitable" | "break-even" | "loss";
  statusLabel: string;
  performanceLabel: string;
  performanceLevel: "exceptional" | "excellent" | "good" | "average" | "low" | "loss";
  interpretation: string;
}

export interface HistoryEntry {
  id: string;
  investment: number;
  revenue: number;
  currency: string;
  result: ROIResult;
  timestamp: number;
}

export const CURRENCIES: Record<string, { symbol: string; label: string }> = {
  USD: { symbol: "$", label: "USD ($)" },
  EUR: { symbol: "€", label: "EUR (€)" },
  GBP: { symbol: "£", label: "GBP (£)" },
  CAD: { symbol: "CA$", label: "CAD ($)" },
  AUD: { symbol: "A$", label: "AUD ($)" },
  JPY: { symbol: "¥", label: "JPY (¥)" },
  INR: { symbol: "₹", label: "INR (₹)" },
  AED: { symbol: "د.إ", label: "AED (د.إ)" },
  SAR: { symbol: "﷼", label: "SAR (﷼)" },
};

export function formatCurrency(amount: number, currency: string): string {
  const info = CURRENCIES[currency] ?? CURRENCIES["USD"];
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (amount < 0 ? "-" : "") + info.symbol + formatted;
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

export function calculateROI(
  investment: number,
  revenue: number,
  currency: string,
  decimalPlaces: number = 2
): ROIResult | null {
  if (!isFinite(investment) || !isFinite(revenue)) return null;
  if (investment <= 0) return null;
  if (revenue < 0) return null;

  const profit = revenue - investment;
  const roi = (profit / investment) * 100;
  const roiFormatted = (roi >= 0 ? "+" : "") + roi.toFixed(decimalPlaces) + "%";
  const profitFormatted = formatCurrency(profit, currency);
  const formula = `((${formatCurrency(revenue, currency)} − ${formatCurrency(investment, currency)}) ÷ ${formatCurrency(investment, currency)}) × 100`;

  let status: ROIResult["status"];
  let statusLabel: string;
  if (profit > 0) { status = "profitable"; statusLabel = "Profitable"; }
  else if (profit === 0) { status = "break-even"; statusLabel = "Break-Even"; }
  else { status = "loss"; statusLabel = "Loss"; }

  const { label, level, interpretation } = getPerformanceLabel(roi);

  return {
    roi,
    roiFormatted,
    profit,
    profitFormatted,
    investment,
    revenue,
    currency,
    formula,
    status,
    statusLabel,
    performanceLabel: label,
    performanceLevel: level,
    interpretation,
  };
}

export function getPerformanceLabel(roi: number): {
  label: string;
  level: ROIResult["performanceLevel"];
  interpretation: string;
} {
  if (roi >= 200) return {
    label: "Exceptional",
    level: "exceptional",
    interpretation: "Outstanding return. Your investment generated 3x or more its original value.",
  };
  if (roi >= 100) return {
    label: "Excellent",
    level: "excellent",
    interpretation: "Excellent return. Your investment has more than doubled in value.",
  };
  if (roi >= 50) return {
    label: "Good",
    level: "good",
    interpretation: "Strong return. This investment performed well above typical benchmarks.",
  };
  if (roi >= 20) return {
    label: "Average",
    level: "average",
    interpretation: "Solid return. ROI above 20% is considered good across most marketing channels.",
  };
  if (roi > 0) return {
    label: "Low",
    level: "low",
    interpretation: "Positive but low return. Consider optimizing your campaign to improve profitability.",
  };
  if (roi === 0) return {
    label: "Break-Even",
    level: "average",
    interpretation: "You recovered exactly what you invested. No profit or loss.",
  };
  return {
    label: "Loss",
    level: "loss",
    interpretation: "This investment resulted in a net loss. Review your strategy and cost structure.",
  };
}

export function validateInputs(
  investment: string,
  revenue: string
): { investmentError: string | null; revenueError: string | null } {
  let investmentError: string | null = null;
  let revenueError: string | null = null;

  if (investment.trim() === "") {
    investmentError = "Please enter the investment amount.";
  } else {
    const v = parseNumber(investment);
    if (v === null) investmentError = "Please enter a valid number.";
    else if (v < 0) investmentError = "Investment cannot be negative.";
    else if (v === 0) investmentError = "Investment must be greater than zero.";
  }

  if (revenue.trim() === "") {
    revenueError = "Please enter the revenue amount.";
  } else {
    const v = parseNumber(revenue);
    if (v === null) revenueError = "Please enter a valid number.";
    else if (v < 0) revenueError = "Revenue cannot be negative.";
  }

  return { investmentError, revenueError };
}

// ── LocalStorage ──
const STORAGE_KEY = "roi-calculator-marketing-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: Math.random().toString(36).slice(2),
    timestamp: Date.now(),
  };
  const updated = [newEntry, ...history].slice(0, 20);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
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
export function buildShareUrl(investment: number, revenue: number, currency: string): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("investment", String(investment));
  url.searchParams.set("revenue", String(revenue));
  url.searchParams.set("currency", currency);
  return url.toString();
}

export function parseShareParams(): { investment: string; revenue: string; currency: string } | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const investment = p.get("investment");
  const revenue = p.get("revenue");
  const currency = p.get("currency");
  if (investment && revenue) return { investment, revenue, currency: currency ?? "USD" };
  return null;
}

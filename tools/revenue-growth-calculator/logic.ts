// ── Revenue Growth Calculator Logic ──

export interface RevenueGrowthResult {
  growthRate: number;
  growthFormatted: string;
  difference: number;
  differenceFormatted: string;
  previous: number;
  current: number;
  currency: string;
  status: "positive" | "neutral" | "negative";
  statusLabel: string;
  performanceLevel: "excellent" | "strong" | "moderate" | "low" | "decline";
  performanceLabel: string;
  interpretation: string;
  formula: string;
}

export interface HistoryEntry {
  id: string;
  previous: number;
  current: number;
  currency: string;
  result: RevenueGrowthResult;
  timestamp: number;
}

export const CURRENCIES: Record<string, { symbol: string; label: string }> = {
  USD: { symbol: "$",   label: "USD ($)"   },
  EUR: { symbol: "€",   label: "EUR (€)"   },
  GBP: { symbol: "£",   label: "GBP (£)"   },
  JPY: { symbol: "¥",   label: "JPY (¥)"   },
  CAD: { symbol: "CA$", label: "CAD (CA$)" },
  AUD: { symbol: "A$",  label: "AUD (A$)"  },
  INR: { symbol: "₹",   label: "INR (₹)"   },
  AED: { symbol: "د.إ", label: "AED (د.إ)" },
  SAR: { symbol: "﷼",  label: "SAR (﷼)"  },
  BRL: { symbol: "R$",  label: "BRL (R$)"  },
  NGN: { symbol: "₦",   label: "NGN (₦)"   },
  ZAR: { symbol: "R",   label: "ZAR (R)"   },
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

export function formatNumber(n: number, decimals = 0): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function parseNumber(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim();
  if (!cleaned || cleaned === ".") return null;
  const n = Number(cleaned);
  return isNaN(n) ? null : n;
}

// ── Performance Label ────────────────────────────────────────────────────────

function getPerformance(rate: number): {
  level: RevenueGrowthResult["performanceLevel"];
  label: string;
  interpretation: string;
} {
  if (rate >= 50)
    return {
      level: "excellent",
      label: "Excellent Growth",
      interpretation:
        "Exceptional revenue growth. This level of expansion typically signals strong product-market fit, successful campaigns, or entry into new markets. Focus on maintaining operational efficiency as you scale.",
    };
  if (rate >= 20)
    return {
      level: "strong",
      label: "Strong Growth",
      interpretation:
        "Above-average revenue growth. Businesses growing at 20–49% are typically outperforming their industry peers. This is a healthy signal to increase investment in acquisition and retention.",
    };
  if (rate >= 5)
    return {
      level: "moderate",
      label: "Moderate Growth",
      interpretation:
        "Steady, sustainable growth. A 5–19% increase is typical for established businesses. Consider optimizing conversion rates, upselling, and improving customer lifetime value to accelerate growth.",
    };
  if (rate >= 0)
    return {
      level: "low",
      label: "Slow Growth",
      interpretation:
        "Revenue is growing, but slowly. Flat or near-zero growth may indicate market saturation, pricing issues, or reduced demand. Review acquisition channels and churn rate to identify areas for improvement.",
    };
  return {
    level: "decline",
    label: "Revenue Decline",
    interpretation:
      "Revenue has decreased compared to the previous period. Investigate root causes — this could be seasonal, campaign-related, or a structural issue. Prioritize retention, reactivation campaigns, and pricing audits.",
  };
}

// ── Core Calculation ─────────────────────────────────────────────────────────

export function calculateGrowth(
  previous: number,
  current: number,
  currency: string,
  decimalPlaces: number = 2
): RevenueGrowthResult | null {
  if (!isFinite(previous) || !isFinite(current)) return null;
  if (previous < 0 || current < 0) return null;
  if (previous === 0) return null; // division by zero — handled by validator

  const difference = current - previous;
  const growthRate = (difference / previous) * 100;

  const sym = CURRENCIES[currency]?.symbol ?? "$";
  const sign = difference > 0 ? "+" : "";
  const growthSign = growthRate > 0 ? "+" : "";

  const growthFormatted = `${growthSign}${growthRate.toFixed(decimalPlaces)}%`;
  const differenceFormatted = `${sign}${formatCurrency(difference, currency, decimalPlaces)}`;

  const status: RevenueGrowthResult["status"] =
    difference > 0 ? "positive" : difference < 0 ? "negative" : "neutral";
  const statusLabel =
    difference > 0 ? "Revenue Increased" : difference < 0 ? "Revenue Declined" : "No Change";

  const formula = `((${sym}${formatNumber(current)} − ${sym}${formatNumber(previous)}) ÷ ${sym}${formatNumber(previous)}) × 100`;

  const { level, label, interpretation } = getPerformance(growthRate);

  return {
    growthRate,
    growthFormatted,
    difference,
    differenceFormatted,
    previous,
    current,
    currency,
    status,
    statusLabel,
    performanceLevel: level,
    performanceLabel: label,
    interpretation,
    formula,
  };
}

// ── Validation ───────────────────────────────────────────────────────────────

export function validateInputs(
  previous: string,
  current: string
): { previousError: string | null; currentError: string | null } {
  let previousError: string | null = null;
  let currentError: string | null = null;

  if (previous.trim() === "") {
    previousError = "Please enter the previous revenue.";
  } else {
    const v = parseNumber(previous);
    if (v === null) previousError = "Please enter a valid number.";
    else if (v < 0) previousError = "Revenue cannot be negative.";
    else if (v === 0) previousError = "Previous revenue must be greater than zero.";
  }

  if (current.trim() === "") {
    currentError = "Please enter the current revenue.";
  } else {
    const v = parseNumber(current);
    if (v === null) currentError = "Please enter a valid number.";
    else if (v < 0) currentError = "Revenue cannot be negative.";
  }

  return { previousError, currentError };
}

// ── LocalStorage History ─────────────────────────────────────────────────────

const STORAGE_KEY = "revenue-growth-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: Math.random().toString(36).slice(2),
    timestamp: Date.now(),
  };
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([newEntry, ...history].slice(0, 20))
    );
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
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── Utilities ────────────────────────────────────────────────────────────────

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

export function buildShareUrl(previous: number, current: number, currency: string): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("prev", String(previous));
  url.searchParams.set("curr", String(current));
  url.searchParams.set("currency", currency);
  return url.toString();
}

export function parseShareParams(): {
  previous: string;
  current: string;
  currency: string;
} | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const prev = p.get("prev");
  const curr = p.get("curr");
  if (prev && curr)
    return { previous: prev, current: curr, currency: p.get("currency") ?? "USD" };
  return null;
}

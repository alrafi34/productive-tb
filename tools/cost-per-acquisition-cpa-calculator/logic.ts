// ── Cost Per Acquisition (CPA) Calculator Logic ──

export interface CPAResult {
  cpa: number;
  cpaFormatted: string;
  spend: number;
  acquisitions: number;
  currency: string;
  formula: string;
  performanceLabel: string;
  performanceLevel: "excellent" | "good" | "average" | "high" | "very-high";
  interpretation: string;
}

export interface HistoryEntry {
  id: string;
  spend: number;
  acquisitions: number;
  currency: string;
  result: CPAResult;
  timestamp: number;
}

export const CURRENCIES: Record<string, { symbol: string; label: string }> = {
  USD: { symbol: "$",    label: "USD ($)"    },
  EUR: { symbol: "€",    label: "EUR (€)"    },
  GBP: { symbol: "£",    label: "GBP (£)"    },
  CAD: { symbol: "CA$",  label: "CAD (CA$)"  },
  AUD: { symbol: "A$",   label: "AUD (A$)"   },
  INR: { symbol: "₹",    label: "INR (₹)"    },
  JPY: { symbol: "¥",    label: "JPY (¥)"    },
  CNY: { symbol: "CN¥",  label: "CNY (CN¥)"  },
  AED: { symbol: "د.إ",  label: "AED (د.إ)"  },
  SAR: { symbol: "﷼",   label: "SAR (﷼)"   },
};

export function formatCurrency(amount: number, currency: string): string {
  const info = CURRENCIES[currency] ?? CURRENCIES["USD"];
  return (
    info.symbol +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    })
  );
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

export function calculateCPA(
  spend: number,
  acquisitions: number,
  currency: string,
  decimalPlaces: number = 2
): CPAResult | null {
  if (!isFinite(spend) || !isFinite(acquisitions)) return null;
  if (spend < 0) return null;
  if (acquisitions <= 0) return null;

  const cpa = spend / acquisitions;
  const sym = CURRENCIES[currency]?.symbol ?? "$";
  const cpaFormatted = sym + cpa.toFixed(decimalPlaces);
  const formula = `${formatCurrency(spend, currency)} ÷ ${formatNumber(acquisitions)} acquisitions`;
  const { label, level, interpretation } = getPerformanceLabel(cpa);

  return {
    cpa,
    cpaFormatted,
    spend,
    acquisitions,
    currency,
    formula,
    performanceLabel: label,
    performanceLevel: level,
    interpretation,
  };
}

export function getPerformanceLabel(cpa: number): {
  label: string;
  level: CPAResult["performanceLevel"];
  interpretation: string;
} {
  if (cpa < 10)
    return {
      label: "Excellent",
      level: "excellent",
      interpretation:
        "Very low CPA — exceptional acquisition efficiency. Typical of high-converting, low-competition channels or well-optimized funnels.",
    };
  if (cpa < 50)
    return {
      label: "Good",
      level: "good",
      interpretation:
        "Below-average CPA. Good cost efficiency for most digital marketing channels. Well-optimized campaigns typically land here.",
    };
  if (cpa < 150)
    return {
      label: "Average",
      level: "average",
      interpretation:
        "Typical CPA range for most industries. Acceptable if your average order value or LTV justifies the acquisition cost.",
    };
  if (cpa < 500)
    return {
      label: "High",
      level: "high",
      interpretation:
        "Above-average CPA. Common in competitive verticals like SaaS, finance, or insurance. Evaluate against customer lifetime value.",
    };
  return {
    label: "Very High",
    level: "very-high",
    interpretation:
      "Premium CPA. Typical in high-value B2B, legal, or enterprise markets. Only sustainable if LTV is significantly higher than acquisition cost.",
  };
}

export function validateInputs(
  spend: string,
  acquisitions: string
): { spendError: string | null; acquisitionsError: string | null } {
  let spendError: string | null = null;
  let acquisitionsError: string | null = null;

  if (spend.trim() === "") {
    spendError = "Please enter the total marketing cost.";
  } else {
    const v = parseNumber(spend);
    if (v === null) spendError = "Please enter a valid number.";
    else if (v < 0) spendError = "Marketing cost cannot be negative.";
  }

  if (acquisitions.trim() === "") {
    acquisitionsError = "Please enter the total number of acquisitions.";
  } else {
    const v = parseNumber(acquisitions);
    if (v === null) acquisitionsError = "Please enter a valid number.";
    else if (v < 0) acquisitionsError = "Acquisitions cannot be negative.";
    else if (v === 0) acquisitionsError = "Acquisitions must be greater than zero.";
  }

  return { spendError, acquisitionsError };
}

// ── LocalStorage history ──
const STORAGE_KEY = "cpa-calculator-history";

export function saveHistory(
  entry: Omit<HistoryEntry, "id" | "timestamp">
): void {
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
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

// ── Utilities ──
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

export function buildShareUrl(
  spend: number,
  acquisitions: number,
  currency: string
): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("spend", String(spend));
  url.searchParams.set("acquisitions", String(acquisitions));
  url.searchParams.set("currency", currency);
  return url.toString();
}

export function parseShareParams(): {
  spend: string;
  acquisitions: string;
  currency: string;
} | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const spend = p.get("spend");
  const acquisitions = p.get("acquisitions");
  if (spend && acquisitions)
    return {
      spend,
      acquisitions,
      currency: p.get("currency") ?? "USD",
    };
  return null;
}

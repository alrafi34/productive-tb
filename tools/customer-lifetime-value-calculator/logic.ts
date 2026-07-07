// ── Customer Lifetime Value (CLV) Calculator Logic ──

export type CalcMode = "basic" | "margin" | "subscription" | "saas";

export interface CLVInputs {
  mode: CalcMode;
  // Basic / Margin
  aov?: number;          // Average Order Value
  frequency?: number;    // Purchases per year
  lifespan?: number;     // Years (basic/margin) or months (subscription)
  grossMargin?: number;  // 0–100 %
  // Subscription
  monthlyRevenue?: number;
  lifetimeMonths?: number;
  // SaaS
  arpu?: number;         // Average Revenue Per User (monthly)
  churnRate?: number;    // 0–100 %
  // Optional cross-method
  cac?: number;          // Customer Acquisition Cost
  currency: string;
}

export interface CLVResult {
  clv: number;
  clvFormatted: string;
  currency: string;
  mode: CalcMode;
  modeLabel: string;
  formula: string;
  annualValue: number;
  monthlyValue: number;
  netCLV: number | null;       // clv - cac (if cac provided)
  paybackMonths: number | null;// cac / (monthlyValue) if cac provided
  performanceLevel: "excellent" | "good" | "average" | "low" | "very-low";
  performanceLabel: string;
  interpretation: string;
  steps: string[];
}

export interface HistoryEntry {
  id: string;
  inputs: CLVInputs;
  result: CLVResult;
  timestamp: number;
}

export const CURRENCIES: Record<string, { symbol: string; label: string }> = {
  USD: { symbol: "$",    label: "USD ($)"    },
  EUR: { symbol: "€",    label: "EUR (€)"    },
  GBP: { symbol: "£",    label: "GBP (£)"    },
  CAD: { symbol: "CA$",  label: "CAD (CA$)"  },
  AUD: { symbol: "A$",   label: "AUD (A$)"   },
  JPY: { symbol: "¥",    label: "JPY (¥)"    },
  INR: { symbol: "₹",    label: "INR (₹)"    },
  AED: { symbol: "د.إ",  label: "AED (د.إ)"  },
  SAR: { symbol: "﷼",   label: "SAR (﷼)"   },
  BRL: { symbol: "R$",   label: "BRL (R$)"   },
  MXN: { symbol: "MX$",  label: "MXN (MX$)"  },
  ZAR: { symbol: "R",    label: "ZAR (R)"    },
};

export const MODE_LABELS: Record<CalcMode, string> = {
  basic:        "Basic CLV",
  margin:       "Margin-Adjusted CLV",
  subscription: "Subscription CLV",
  saas:         "SaaS / Predictive CLV",
};

// ── Formatting ──────────────────────────────────────────────────────────────

export function formatCurrency(amount: number, currency: string, decimals = 2): string {
  const info = CURRENCIES[currency] ?? CURRENCIES["USD"];
  return (
    info.symbol +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

export function formatNumber(n: number, decimals = 0): string {
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

// ── Performance Labelling ───────────────────────────────────────────────────

function getPerf(clv: number): {
  level: CLVResult["performanceLevel"];
  label: string;
  interpretation: string;
} {
  if (clv >= 5000)
    return {
      level: "excellent",
      label: "Excellent",
      interpretation:
        "Outstanding customer value. Each customer contributes significantly to long-term revenue — strong retention and upsell programs are worth heavy investment.",
    };
  if (clv >= 1000)
    return {
      level: "good",
      label: "Good",
      interpretation:
        "Solid CLV. Typical of healthy subscription businesses or repeat-purchase ecommerce. Focus on extending lifespan and increasing order frequency.",
    };
  if (clv >= 300)
    return {
      level: "average",
      label: "Average",
      interpretation:
        "Mid-range CLV. Common across many consumer categories. Improving gross margin or purchase frequency can move this to the 'Good' tier quickly.",
    };
  if (clv >= 50)
    return {
      level: "low",
      label: "Low",
      interpretation:
        "Below-average CLV. Consider loyalty programs, email re-engagement, and upsell offers to increase purchase frequency and extend customer lifespan.",
    };
  return {
    level: "very-low",
    label: "Very Low",
    interpretation:
      "Very low CLV — likely a single-purchase or very short-lifetime customer. Product-market fit or post-purchase engagement may need improvement.",
  };
}

// ── Core Calculation ────────────────────────────────────────────────────────

export function calculateCLV(inputs: CLVInputs): CLVResult | null {
  const { mode, currency, cac } = inputs;
  const sym = CURRENCIES[currency]?.symbol ?? "$";

  let clv = 0;
  let modeLabel = MODE_LABELS[mode];
  let formula = "";
  let annualValue = 0;
  let monthlyValue = 0;
  const steps: string[] = [];

  if (mode === "basic") {
    const aov = inputs.aov ?? 0;
    const freq = inputs.frequency ?? 0;
    const life = inputs.lifespan ?? 0;
    if (aov <= 0 || freq <= 0 || life <= 0) return null;

    clv = aov * freq * life;
    annualValue = aov * freq;
    monthlyValue = annualValue / 12;
    formula = `${sym}${aov} × ${freq} × ${life}`;
    steps.push(`AOV × Frequency × Lifespan`);
    steps.push(`${sym}${aov.toLocaleString("en-US")} × ${freq} purchases/yr × ${life} yr`);
    steps.push(`= ${formatCurrency(clv, currency)}`);

  } else if (mode === "margin") {
    const aov = inputs.aov ?? 0;
    const freq = inputs.frequency ?? 0;
    const life = inputs.lifespan ?? 0;
    const margin = (inputs.grossMargin ?? 100) / 100;
    if (aov <= 0 || freq <= 0 || life <= 0) return null;

    const grossCLV = aov * freq * life;
    clv = grossCLV * margin;
    annualValue = aov * freq * margin;
    monthlyValue = annualValue / 12;
    formula = `${sym}${aov} × ${freq} × ${life} × ${(margin * 100).toFixed(0)}%`;
    steps.push(`AOV × Frequency × Lifespan × Gross Margin`);
    steps.push(`${sym}${aov.toLocaleString("en-US")} × ${freq} × ${life} yr × ${(margin * 100).toFixed(0)}%`);
    steps.push(`Gross CLV = ${formatCurrency(grossCLV, currency)}`);
    steps.push(`Margin-Adjusted CLV = ${formatCurrency(clv, currency)}`);

  } else if (mode === "subscription") {
    const mr = inputs.monthlyRevenue ?? 0;
    const months = inputs.lifetimeMonths ?? 0;
    const margin = (inputs.grossMargin ?? 100) / 100;
    if (mr <= 0 || months <= 0) return null;

    clv = mr * months * margin;
    monthlyValue = mr * margin;
    annualValue = monthlyValue * 12;
    formula = `${sym}${mr}/mo × ${months} mo × ${(margin * 100).toFixed(0)}%`;
    steps.push(`Monthly Revenue × Lifetime (months) × Gross Margin`);
    steps.push(`${sym}${mr.toLocaleString("en-US")}/mo × ${months} mo × ${(margin * 100).toFixed(0)}%`);
    steps.push(`= ${formatCurrency(clv, currency)}`);

  } else if (mode === "saas") {
    const arpu = inputs.arpu ?? 0;
    const churn = (inputs.churnRate ?? 0) / 100;
    const margin = (inputs.grossMargin ?? 100) / 100;
    if (arpu <= 0 || churn <= 0) return null;

    // CLV = (ARPU × Gross Margin) / Monthly Churn Rate
    clv = (arpu * margin) / churn;
    monthlyValue = arpu * margin;
    annualValue = monthlyValue * 12;
    const avgLifetimeMonths = 1 / churn;
    formula = `(${sym}${arpu} × ${(margin * 100).toFixed(0)}%) ÷ ${(churn * 100).toFixed(2)}%`;
    steps.push(`(ARPU × Gross Margin) ÷ Monthly Churn Rate`);
    steps.push(`(${sym}${arpu.toLocaleString("en-US")} × ${(margin * 100).toFixed(0)}%) ÷ ${(inputs.churnRate ?? 0).toFixed(2)}%`);
    steps.push(`Avg customer lifetime = ${avgLifetimeMonths.toFixed(1)} months`);
    steps.push(`= ${formatCurrency(clv, currency)}`);
  }

  if (clv <= 0 || !isFinite(clv)) return null;

  const netCLV = cac && cac > 0 ? clv - cac : null;
  const paybackMonths =
    cac && cac > 0 && monthlyValue > 0 ? cac / monthlyValue : null;

  const { level, label, interpretation } = getPerf(clv);

  return {
    clv,
    clvFormatted: formatCurrency(clv, currency),
    currency,
    mode,
    modeLabel,
    formula,
    annualValue,
    monthlyValue,
    netCLV,
    paybackMonths,
    performanceLevel: level,
    performanceLabel: label,
    interpretation,
    steps,
  };
}

// ── Validation ───────────────────────────────────────────────────────────────

export interface ValidationErrors {
  aov?: string;
  frequency?: string;
  lifespan?: string;
  grossMargin?: string;
  monthlyRevenue?: string;
  lifetimeMonths?: string;
  arpu?: string;
  churnRate?: string;
}

export function validateInputs(
  mode: CalcMode,
  fields: Record<string, string>
): ValidationErrors {
  const errs: ValidationErrors = {};

  const check = (
    key: keyof ValidationErrors,
    rawVal: string,
    label: string,
    opts: { min?: number; max?: number; required?: boolean }
  ) => {
    const { min = 0, max, required = true } = opts;
    if (!rawVal || rawVal.trim() === "") {
      if (required) errs[key] = `${label} is required.`;
      return;
    }
    const n = parseNum(rawVal);
    if (n === null) { errs[key] = `Enter a valid number.`; return; }
    if (n < min) { errs[key] = `${label} must be ≥ ${min}.`; return; }
    if (max !== undefined && n > max) errs[key] = `${label} must be ≤ ${max}.`;
  };

  if (mode === "basic" || mode === "margin") {
    check("aov", fields.aov, "Average Order Value", { min: 0.01 });
    check("frequency", fields.frequency, "Purchase Frequency", { min: 0.01 });
    check("lifespan", fields.lifespan, "Customer Lifespan", { min: 0.01 });
    if (mode === "margin")
      check("grossMargin", fields.grossMargin, "Gross Margin", { min: 0, max: 100 });
  }

  if (mode === "subscription") {
    check("monthlyRevenue", fields.monthlyRevenue, "Monthly Revenue", { min: 0.01 });
    check("lifetimeMonths", fields.lifetimeMonths, "Lifetime (months)", { min: 1 });
    check("grossMargin", fields.grossMargin, "Gross Margin", { min: 0, max: 100 });
  }

  if (mode === "saas") {
    check("arpu", fields.arpu, "ARPU", { min: 0.01 });
    check("churnRate", fields.churnRate, "Churn Rate", { min: 0.01, max: 100 });
    check("grossMargin", fields.grossMargin, "Gross Margin", { min: 0, max: 100 });
  }

  return errs;
}

// ── LocalStorage History ─────────────────────────────────────────────────────

const STORAGE_KEY = "clv-calculator-history";

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

// ── Utilities ─────────────────────────────────────────────────────────────────

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

export function buildShareUrl(inputs: CLVInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("mode", inputs.mode);
  url.searchParams.set("currency", inputs.currency);
  if (inputs.aov != null)           url.searchParams.set("aov", String(inputs.aov));
  if (inputs.frequency != null)     url.searchParams.set("freq", String(inputs.frequency));
  if (inputs.lifespan != null)      url.searchParams.set("life", String(inputs.lifespan));
  if (inputs.grossMargin != null)   url.searchParams.set("gm", String(inputs.grossMargin));
  if (inputs.monthlyRevenue != null)url.searchParams.set("mr", String(inputs.monthlyRevenue));
  if (inputs.lifetimeMonths != null)url.searchParams.set("lm", String(inputs.lifetimeMonths));
  if (inputs.arpu != null)          url.searchParams.set("arpu", String(inputs.arpu));
  if (inputs.churnRate != null)     url.searchParams.set("churn", String(inputs.churnRate));
  if (inputs.cac != null)           url.searchParams.set("cac", String(inputs.cac));
  return url.toString();
}

export function parseShareParams(): Partial<Record<string, string>> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  if (!p.get("mode")) return null;
  const out: Record<string, string> = {};
  for (const k of ["mode","currency","aov","freq","life","gm","mr","lm","arpu","churn","cac"])
    if (p.get(k)) out[k] = p.get(k)!;
  return out;
}

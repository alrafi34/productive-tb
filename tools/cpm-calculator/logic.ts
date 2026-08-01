// ── CPM Calculator Logic ──

export type Mode = "cpm" | "cost" | "impressions";

export const MODE_META: Record<Mode, { label: string; short: string; hint: string }> = {
  cpm: {
    label: "Calculate CPM",
    short: "CPM",
    hint: "Enter advertising cost and impressions to find your cost per 1,000 impressions.",
  },
  cost: {
    label: "Calculate Advertising Cost",
    short: "Advertising Cost",
    hint: "Enter a target CPM and impressions to find the total advertising cost required.",
  },
  impressions: {
    label: "Calculate Impressions",
    short: "Impressions",
    hint: "Enter advertising cost and a target CPM to find how many impressions you can afford.",
  },
};

export const MODE_ORDER: Mode[] = ["cpm", "cost", "impressions"];

// ── Currencies ─────────────────────────────────────────────────────────────────

export interface CurrencyInfo { symbol: string; label: string }

export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { symbol: "$",   label: "USD ($)"   },
  EUR: { symbol: "€",   label: "EUR (€)"   },
  GBP: { symbol: "£",   label: "GBP (£)"   },
  CAD: { symbol: "C$",  label: "CAD (C$)"  },
  AUD: { symbol: "A$",  label: "AUD (A$)"  },
  JPY: { symbol: "¥",   label: "JPY (¥)"   },
  INR: { symbol: "₹",   label: "INR (₹)"   },
  BDT: { symbol: "৳",   label: "BDT (৳)"   },
  AED: { symbol: "د.إ", label: "AED (د.إ)" },
  SAR: { symbol: "﷼",  label: "SAR (﷼)"  },
  PKR: { symbol: "₨",   label: "PKR (₨)"   },
  CUSTOM: { symbol: "$", label: "Custom Symbol" },
};

export const CURRENCY_ORDER = Object.keys(CURRENCIES) as (keyof typeof CURRENCIES)[];

export function getSymbol(currency: string, customSymbol: string): string {
  if (currency === "CUSTOM") return customSymbol.trim() || "$";
  return CURRENCIES[currency]?.symbol ?? "$";
}

// ── Inputs / Result types ─────────────────────────────────────────────────────

export interface CPMInputs {
  mode: Mode;
  cost: number;
  impressions: number;
  cpm: number;
  currency: string;
  customSymbol: string;
  decimalPlaces: number;
}

export interface CPMResult {
  cost: number;
  impressions: number;
  cpm: number;
  formula: string;
  breakdown: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: CPMInputs;
  result: CPMResult;
}

// ── Main calculation ──────────────────────────────────────────────────────────

export function calculateCPM(inputs: CPMInputs): CPMResult | null {
  const { mode, decimalPlaces } = inputs;
  const round = (n: number) => parseFloat(n.toFixed(decimalPlaces));

  if (mode === "cpm") {
    if (inputs.impressions <= 0) return null;
    const cpm = round((inputs.cost / inputs.impressions) * 1000);
    return {
      cost: inputs.cost, impressions: inputs.impressions, cpm,
      formula: "CPM = (Advertising Cost ÷ Impressions) × 1000",
      breakdown: `(${inputs.cost} ÷ ${inputs.impressions}) × 1000 = ${cpm}`,
    };
  }

  if (mode === "cost") {
    if (inputs.impressions <= 0) return null;
    const cost = round((inputs.cpm * inputs.impressions) / 1000);
    return {
      cost, impressions: inputs.impressions, cpm: inputs.cpm,
      formula: "Advertising Cost = (CPM × Impressions) ÷ 1000",
      breakdown: `(${inputs.cpm} × ${inputs.impressions}) ÷ 1000 = ${cost}`,
    };
  }

  // impressions
  if (inputs.cpm <= 0) return null;
  const impressions = Math.round((inputs.cost * 1000) / inputs.cpm);
  return {
    cost: inputs.cost, impressions, cpm: inputs.cpm,
    formula: "Impressions = (Advertising Cost × 1000) ÷ CPM",
    breakdown: `(${inputs.cost} × 1000) ÷ ${inputs.cpm} = ${impressions}`,
  };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: CPMInputs): ValidationErrors {
  const e: ValidationErrors = {};

  if (inputs.mode === "cpm") {
    if (inputs.cost < 0) e.cost = "Advertising cost cannot be negative.";
    if (inputs.impressions <= 0) e.impressions = "Impressions must be greater than zero.";
  } else if (inputs.mode === "cost") {
    if (inputs.cpm < 0) e.cpm = "CPM cannot be negative.";
    if (inputs.impressions <= 0) e.impressions = "Impressions must be greater than zero.";
  } else {
    if (inputs.cost < 0) e.cost = "Advertising cost cannot be negative.";
    if (inputs.cpm <= 0) e.cpm = "CPM must be greater than zero.";
  }

  return e;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US");
}

export function formatMoney(n: number, currency: string, customSymbol: string, decimalPlaces: number): string {
  const sym = getSymbol(currency, customSymbol);
  return sym + n.toLocaleString("en-US", { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces });
}

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ── Shareable URL (query parameters) ──────────────────────────────────────────

export function buildShareUrl(inputs: CPMInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("mode", inputs.mode);
  url.searchParams.set("cost", String(inputs.cost));
  url.searchParams.set("impressions", String(inputs.impressions));
  url.searchParams.set("cpm", String(inputs.cpm));
  url.searchParams.set("currency", inputs.currency);
  return url.toString();
}

export function parseShareParams(): Partial<CPMInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const mode = p.get("mode");
  if (!mode) return null;
  return {
    mode: (["cpm", "cost", "impressions"].includes(mode) ? mode : "cpm") as Mode,
    cost: parseFloat(p.get("cost") ?? "0") || 0,
    impressions: parseFloat(p.get("impressions") ?? "0") || 0,
    cpm: parseFloat(p.get("cpm") ?? "0") || 0,
    currency: p.get("currency") ?? "USD",
  };
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const STORAGE_KEY = "cpm-calculator-history";

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

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: CPMResult, inputs: CPMInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return [
    "CPM Calculator Report",
    "======================",
    `Generated: ${ts}`,
    `Mode: ${MODE_META[inputs.mode].label}`,
    "",
    `Advertising Cost: ${formatMoney(result.cost, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}`,
    `Impressions: ${formatNumber(result.impressions)}`,
    `CPM: ${formatMoney(result.cpm, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}`,
    "",
    `Formula: ${result.formula}`,
    `Calculation: ${result.breakdown}`,
    "",
    "Generated by CPM Calculator — https://productivetoolbox.com",
  ].join("\n");
}

export function buildJSONReport(result: CPMResult, inputs: CPMInputs): string {
  return JSON.stringify(
    {
      mode: inputs.mode,
      cost: result.cost,
      impressions: result.impressions,
      cpm: result.cpm,
      currency: inputs.currency,
      formula: result.formula,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: CPMResult, inputs: CPMInputs): string {
  const ts = new Date().toLocaleString("en-US");
  return `<!DOCTYPE html><html><head><title>CPM Report</title>
  <style>
    body { font-family: -apple-system, Arial, sans-serif; color: #111827; padding: 40px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    p.meta { color: #6b7280; font-size: 12px; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    td { padding: 8px 4px; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    td:last-child { text-align: right; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-top: 28px; }
    footer { margin-top: 32px; font-size: 11px; color: #9ca3af; }
  </style></head><body>
    <h1>CPM Calculator Report</h1>
    <p class="meta">Generated ${ts} — Mode: ${MODE_META[inputs.mode].label}</p>
    <h2>Results</h2>
    <table>
      <tr><td>Advertising Cost</td><td>${formatMoney(result.cost, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}</td></tr>
      <tr><td>Impressions</td><td>${formatNumber(result.impressions)}</td></tr>
      <tr><td>CPM</td><td><strong>${formatMoney(result.cpm, inputs.currency, inputs.customSymbol, inputs.decimalPlaces)}</strong></td></tr>
    </table>
    <h2>Formula</h2>
    <table>
      <tr><td>Formula</td><td>${result.formula}</td></tr>
      <tr><td>Calculation</td><td>${result.breakdown}</td></tr>
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

// ── Default inputs ────────────────────────────────────────────────────────────

export const DEFAULT_INPUTS: CPMInputs = {
  mode: "cpm",
  cost: 250,
  impressions: 50000,
  cpm: 5,
  currency: "USD",
  customSymbol: "$",
  decimalPlaces: 2,
};

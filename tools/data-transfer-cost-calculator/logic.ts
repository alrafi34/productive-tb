// ── Data Transfer Cost Calculator Logic ──

export type DataUnit = "mb" | "mib" | "gb" | "gib" | "tb" | "tib" | "pb" | "pib";
export type PriceUnit = "gb" | "gib" | "tb" | "tib";
export type BillingPeriod = "onetime" | "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
export type ConversionStandard = "decimal" | "binary";
export type CurrencyKey = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "SGD" | "INR" | "BDT" | "JPY";

export const DATA_UNIT_LABELS: Record<DataUnit, string> = {
  mb: "MB", mib: "MiB", gb: "GB", gib: "GiB", tb: "TB", tib: "TiB", pb: "PB", pib: "PiB",
};
export const DATA_UNIT_ORDER: DataUnit[] = ["mb", "mib", "gb", "gib", "tb", "tib", "pb", "pib"];

export const PRICE_UNIT_LABELS: Record<PriceUnit, string> = {
  gb: "Per GB", gib: "Per GiB", tb: "Per TB", tib: "Per TiB",
};
export const PRICE_UNIT_ORDER: PriceUnit[] = ["gb", "gib", "tb", "tib"];

export const BILLING_META: Record<BillingPeriod, { label: string; perMonth: number; perYear: number }> = {
  onetime: { label: "One-Time", perMonth: 0, perYear: 0 },
  daily: { label: "Daily", perMonth: 30, perYear: 365 },
  weekly: { label: "Weekly", perMonth: 4.345, perYear: 52 },
  monthly: { label: "Monthly", perMonth: 1, perYear: 12 },
  quarterly: { label: "Quarterly", perMonth: 1 / 3, perYear: 4 },
  yearly: { label: "Yearly", perMonth: 1 / 12, perYear: 1 },
};
export const BILLING_ORDER: BillingPeriod[] = ["onetime", "daily", "weekly", "monthly", "quarterly", "yearly"];

export const CURRENCY_SYMBOLS: Record<CurrencyKey, string> = {
  USD: "$", EUR: "€", GBP: "£", CAD: "CA$", AUD: "A$", SGD: "S$", INR: "₹", BDT: "৳", JPY: "¥",
};
export const CURRENCY_ORDER: CurrencyKey[] = ["USD", "EUR", "GBP", "CAD", "AUD", "SGD", "INR", "BDT", "JPY"];

const BINARY_NAMED: Set<DataUnit | PriceUnit> = new Set(["mib", "gib", "tib", "pib"]);

// Exponent (power of the unit's base) relative to Bytes — e.g. gb -> 3 means 1000^3 (decimal) or 1024^3 (binary).
const UNIT_EXPONENT: Record<DataUnit, number> = { mb: 2, mib: 2, gb: 3, gib: 3, tb: 4, tib: 4, pb: 5, pib: 5 };

/**
 * Decimal-named units (MB/GB/TB/PB) are interpreted per the selected Conversion Standard —
 * Binary mode treats them the same as their MiB/GiB/TiB/PiB counterparts (1024-based),
 * matching how "GB" is often used colloquially by cloud providers. Binary-named units
 * (MiB/GiB/TiB/PiB) are always true 1024-based values regardless of the toggle.
 */
export function unitToBytes(unit: DataUnit | PriceUnit, standard: ConversionStandard): number {
  const base = BINARY_NAMED.has(unit) ? 1024 : (standard === "binary" ? 1024 : 1000);
  return Math.pow(base, UNIT_EXPONENT[unit as DataUnit]);
}

export function toBytes(value: number, unit: DataUnit, standard: ConversionStandard): number {
  return value * unitToBytes(unit, standard);
}

export function formatBytes(bytes: number, standard: ConversionStandard, decimals = 2): string {
  if (!isFinite(bytes) || bytes <= 0) return standard === "binary" ? "0 GiB" : "0 GB";
  const base = standard === "binary" ? 1024 : 1000;
  const units = standard === "binary" ? ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"] : ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB"];
  const exp = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(base)));
  const value = bytes / Math.pow(base, exp);
  return `${value.toFixed(exp === 0 ? 0 : decimals)} ${units[exp]}`;
}

// ── Inputs ────────────────────────────────────────────────────────────────────

export interface TransferInputs {
  dataSize: number;
  dataUnit: DataUnit;
  price: number;
  priceUnit: PriceUnit;
  billingPeriod: BillingPeriod;
  transferCount: number;
  currency: CurrencyKey;
  standard: ConversionStandard;
}

export const DEFAULT_INPUTS: TransferInputs = {
  dataSize: 500,
  dataUnit: "gb",
  price: 0.09,
  priceUnit: "gb",
  billingPeriod: "onetime",
  transferCount: 1,
  currency: "USD",
  standard: "decimal",
};

export const PRESETS: { label: string; inputs: Partial<TransferInputs> }[] = [
  { label: "500 GB @ $0.09/GB", inputs: { dataSize: 500, dataUnit: "gb", price: 0.09, priceUnit: "gb", standard: "decimal", billingPeriod: "onetime" } },
  { label: "8 TB @ $0.05/GB (Binary)", inputs: { dataSize: 8, dataUnit: "tb", price: 0.05, priceUnit: "gb", standard: "binary", billingPeriod: "monthly" } },
  { label: "1.5 PB @ $0.02/GB", inputs: { dataSize: 1.5, dataUnit: "pb", price: 0.02, priceUnit: "gb", standard: "decimal", billingPeriod: "monthly" } },
];

// ── Result ────────────────────────────────────────────────────────────────────

export interface TransferResult {
  dataBytes: number;
  normalizedGB: number;
  normalizedPricePerGB: number;
  singleTransferCost: number;
  periodCost: number;
  monthlyCost: number | null;
  yearlyCost: number | null;
  decimalCost: number;
  binaryCost: number;
}

export function calculateTransferCost(inputs: TransferInputs): TransferResult {
  const dataBytes = toBytes(inputs.dataSize, inputs.dataUnit, inputs.standard);
  const priceUnitBytes = unitToBytes(inputs.priceUnit, inputs.standard);
  const normalizedPricePerGB = inputs.price / priceUnitBytes * unitToBytes("gb", inputs.standard);
  const pricePerByte = inputs.price / priceUnitBytes;

  const singleTransferCost = dataBytes * pricePerByte;
  const count = Math.max(1, inputs.transferCount);
  const periodCost = singleTransferCost * count;

  const billing = BILLING_META[inputs.billingPeriod];
  const monthlyCost = inputs.billingPeriod === "onetime" ? null : periodCost * billing.perMonth;
  const yearlyCost = inputs.billingPeriod === "onetime" ? null : periodCost * billing.perYear;

  // Side-by-side decimal vs binary comparison for transparency (always computed regardless of selected standard).
  const decimalBytes = toBytes(inputs.dataSize, inputs.dataUnit, "decimal");
  const decimalPricePerByte = inputs.price / unitToBytes(inputs.priceUnit, "decimal");
  const decimalCost = decimalBytes * decimalPricePerByte * count;

  const binaryBytes = toBytes(inputs.dataSize, inputs.dataUnit, "binary");
  const binaryPricePerByte = inputs.price / unitToBytes(inputs.priceUnit, "binary");
  const binaryCost = binaryBytes * binaryPricePerByte * count;

  return {
    dataBytes,
    normalizedGB: dataBytes / unitToBytes("gb", inputs.standard),
    normalizedPricePerGB,
    singleTransferCost,
    periodCost,
    monthlyCost,
    yearlyCost,
    decimalCost,
    binaryCost,
  };
}

// ── Validation ────────────────────────────────────────────────────────────────

export type ValidationErrors = Record<string, string | null>;

export function validateInputs(inputs: TransferInputs): ValidationErrors {
  const e: ValidationErrors = {};
  if (!inputs.dataSize || inputs.dataSize <= 0) e.dataSize = "Please enter a valid data size.";
  if (inputs.price < 0) e.price = "Price cannot be negative.";
  if (inputs.transferCount !== undefined && inputs.transferCount < 0) e.transferCount = "Transfer count cannot be negative.";
  return e;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, "").trim());
  return isNaN(n) || n < 0 ? 0 : n;
}

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

export function formatMoney(n: number): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── Shareable URL ────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: TransferInputs): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.searchParams.set("size", String(inputs.dataSize));
  url.searchParams.set("unit", inputs.dataUnit);
  url.searchParams.set("price", String(inputs.price));
  url.searchParams.set("priceUnit", inputs.priceUnit);
  url.searchParams.set("billing", inputs.billingPeriod);
  url.searchParams.set("count", String(inputs.transferCount));
  url.searchParams.set("currency", inputs.currency);
  url.searchParams.set("standard", inputs.standard);
  return url.toString();
}

export function parseShareParams(): Partial<TransferInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const size = p.get("size");
  if (!size) return null;
  return {
    dataSize: parseFloat(size) || 0,
    dataUnit: (DATA_UNIT_ORDER.includes(p.get("unit") as DataUnit) ? p.get("unit") : "gb") as DataUnit,
    price: parseFloat(p.get("price") ?? "0") || 0,
    priceUnit: (PRICE_UNIT_ORDER.includes(p.get("priceUnit") as PriceUnit) ? p.get("priceUnit") : "gb") as PriceUnit,
    billingPeriod: (BILLING_ORDER.includes(p.get("billing") as BillingPeriod) ? p.get("billing") : "onetime") as BillingPeriod,
    transferCount: parseFloat(p.get("count") ?? "1") || 1,
    currency: (CURRENCY_ORDER.includes(p.get("currency") as CurrencyKey) ? p.get("currency") : "USD") as CurrencyKey,
    standard: (p.get("standard") === "binary" ? "binary" : "decimal") as ConversionStandard,
  };
}

// ── LocalStorage: last-session inputs ─────────────────────────────────────────

const INPUTS_KEY = "data-transfer-cost-calculator-inputs";

export function saveInputs(inputs: TransferInputs): void {
  try { localStorage.setItem(INPUTS_KEY, JSON.stringify(inputs)); } catch {}
}

export function loadInputs(): TransferInputs | null {
  try {
    const raw = localStorage.getItem(INPUTS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as TransferInputs;
  } catch { return null; }
}

// ── History ────────────────────────────────────────────────────────────────────

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: TransferInputs;
  result: TransferResult;
}

const HISTORY_KEY = "data-transfer-cost-calculator-history";

export function saveHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): void {
  const history = getHistory();
  const newEntry: HistoryEntry = { ...entry, id: Math.random().toString(36).slice(2), timestamp: Date.now() };
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify([newEntry, ...history].slice(0, 20))); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// ── Export helpers ────────────────────────────────────────────────────────────

export function buildTextReport(result: TransferResult, inputs: TransferInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const symbol = CURRENCY_SYMBOLS[inputs.currency];
  return [
    "Data Transfer Cost Calculator Report",
    "=====================================",
    `Generated: ${ts}`,
    "",
    `Transfer Size: ${inputs.dataSize} ${DATA_UNIT_LABELS[inputs.dataUnit]}`,
    `Price: ${symbol}${inputs.price} ${PRICE_UNIT_LABELS[inputs.priceUnit]}`,
    `Billing Period: ${BILLING_META[inputs.billingPeriod].label}`,
    `Conversion Standard: ${inputs.standard === "binary" ? "Binary (1024-based)" : "Decimal (1000-based)"}`,
    "",
    `Estimated Cost: ${symbol}${formatMoney(result.periodCost)}`,
    result.monthlyCost !== null ? `Monthly Cost: ${symbol}${formatMoney(result.monthlyCost)}` : "",
    result.yearlyCost !== null ? `Yearly Cost: ${symbol}${formatMoney(result.yearlyCost)}` : "",
    "",
    "Formula: Total Cost = Normalized Data Size × Normalized Unit Price",
    "",
    "Generated by Data Transfer Cost Calculator — https://productivetoolbox.com",
  ].filter(Boolean).join("\n");
}

export function buildCSVReport(result: TransferResult, inputs: TransferInputs): string {
  const symbol = CURRENCY_SYMBOLS[inputs.currency];
  const rows = [
    ["Field", "Value"],
    ["Data Size", `${inputs.dataSize} ${DATA_UNIT_LABELS[inputs.dataUnit]}`],
    ["Price", `${symbol}${inputs.price} ${PRICE_UNIT_LABELS[inputs.priceUnit]}`],
    ["Currency", inputs.currency],
    ["Billing Period", BILLING_META[inputs.billingPeriod].label],
    ["Estimated Cost", `${symbol}${formatMoney(result.periodCost)}`],
    ["Monthly Cost", result.monthlyCost !== null ? `${symbol}${formatMoney(result.monthlyCost)}` : "N/A"],
    ["Yearly Cost", result.yearlyCost !== null ? `${symbol}${formatMoney(result.yearlyCost)}` : "N/A"],
  ];
  return rows.map((r) => r.join(",")).join("\n");
}

export function buildJSONReport(result: TransferResult, inputs: TransferInputs): string {
  return JSON.stringify(
    {
      dataSize: inputs.dataSize,
      dataUnit: inputs.dataUnit,
      price: inputs.price,
      priceUnit: inputs.priceUnit,
      currency: inputs.currency,
      billingPeriod: inputs.billingPeriod,
      standard: inputs.standard,
      estimatedCost: Math.round(result.periodCost * 100) / 100,
      monthlyCost: result.monthlyCost !== null ? Math.round(result.monthlyCost * 100) / 100 : null,
      yearlyCost: result.yearlyCost !== null ? Math.round(result.yearlyCost * 100) / 100 : null,
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function buildPrintHTML(result: TransferResult, inputs: TransferInputs): string {
  const ts = new Date().toLocaleString("en-US");
  const symbol = CURRENCY_SYMBOLS[inputs.currency];
  return `<!DOCTYPE html><html><head><title>Data Transfer Cost Report</title>
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
    <h1>Data Transfer Cost Calculator Report</h1>
    <p class="meta">Generated ${ts}</p>
    <h2>Inputs</h2>
    <table>
      <tr><td>Transfer Size</td><td>${inputs.dataSize} ${DATA_UNIT_LABELS[inputs.dataUnit]}</td></tr>
      <tr><td>Price</td><td>${symbol}${inputs.price} ${PRICE_UNIT_LABELS[inputs.priceUnit]}</td></tr>
      <tr><td>Billing Period</td><td>${BILLING_META[inputs.billingPeriod].label}</td></tr>
    </table>
    <h2>Result</h2>
    <table>
      <tr><td>Estimated Cost</td><td><strong>${symbol}${formatMoney(result.periodCost)}</strong></td></tr>
      ${result.monthlyCost !== null ? `<tr><td>Monthly Cost</td><td>${symbol}${formatMoney(result.monthlyCost)}</td></tr>` : ""}
      ${result.yearlyCost !== null ? `<tr><td>Yearly Cost</td><td>${symbol}${formatMoney(result.yearlyCost)}</td></tr>` : ""}
    </table>
    <footer>Generated by Productive Toolbox — https://productivetoolbox.com</footer>
  </body></html>`;
}

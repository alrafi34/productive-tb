import { CalculatorInputs, CalculationResult, Currency, HistoryEntry, Thickness, Unit } from "./types";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", EUR: "€", GBP: "£", BDT: "৳", INR: "₹",
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  USD: "USD ($)", EUR: "EUR (€)", GBP: "GBP (£)", BDT: "BDT (৳)", INR: "INR (₹)",
};

export const ALL_CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "BDT", "INR"];

export const THICKNESS_LABELS: Record<Thickness, string> = {
  "4in": "4 inch (Light)",
  "5in": "5 inch",
  "9in": "9 inch (Standard)",
  "12in": "12 inch (Heavy)",
};

export const ALL_THICKNESSES: Thickness[] = ["4in", "5in", "9in", "12in"];

export function validate(value: string, label: string): string | null {
  if (!value || value.trim() === "") return `${label} is required.`;
  const n = parseFloat(value);
  if (isNaN(n) || n <= 0) return `${label} must be greater than zero.`;
  return null;
}

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const perimeter = parseFloat(inputs.perimeter);
  const height = parseFloat(inputs.wallHeight);
  const matRate = parseFloat(inputs.materialCostPerSqft);
  const labRate = parseFloat(inputs.laborCostPerSqft);

  if (!perimeter || !height || !matRate || !labRate) return null;
  if (perimeter <= 0 || height <= 0 || matRate <= 0 || labRate <= 0) return null;

  // Convert to sq ft if meters
  const perimeterFt = inputs.unit === "m" ? perimeter * 3.28084 : perimeter;
  const heightFt = inputs.unit === "m" ? height * 3.28084 : height;

  const wallArea = perimeterFt * heightFt;
  const materialCost = wallArea * matRate;
  const laborCost = wallArea * labRate;
  const plasterCost = parseFloat(inputs.plasterCost) || 0;
  const gateCost = parseFloat(inputs.gateCost) || 0;
  const miscCost = parseFloat(inputs.miscCost) || 0;
  const subtotal = materialCost + laborCost;
  const totalCost = subtotal + plasterCost + gateCost + miscCost;

  return {
    wallArea,
    materialCost,
    laborCost,
    plasterCost,
    gateCost,
    miscCost,
    subtotal,
    totalCost,
    unit: inputs.unit,
    currency: inputs.currency,
  };
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCurrency(value: number, currency: Currency, decimals = 2): string {
  return `${CURRENCY_SYMBOLS[currency]}${formatNumber(value, decimals)}`;
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

const HISTORY_KEY = "wall-boundary-cost-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const h = getHistory();
    h.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    if (h.length > MAX_HISTORY) h.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  try {
    const s = localStorage.getItem(HISTORY_KEY);
    return s ? JSON.parse(s) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const p = inputs.precision;
  const u = inputs.unit;
  return [
    "Wall Boundary Cost Calculator – Estimate",
    "=".repeat(45),
    "",
    `Boundary Length  : ${inputs.perimeter} ${u}`,
    `Wall Height      : ${inputs.wallHeight} ${u}`,
    `Wall Thickness   : ${THICKNESS_LABELS[inputs.thickness]}`,
    `Wall Area        : ${formatNumber(result.wallArea, p)} sq ft`,
    "",
    `Material Cost    : ${sym}${formatNumber(result.materialCost, p)}`,
    `Labor Cost       : ${sym}${formatNumber(result.laborCost, p)}`,
    result.plasterCost > 0 ? `Plaster/Finish   : ${sym}${formatNumber(result.plasterCost, p)}` : "",
    result.gateCost > 0    ? `Gate Cost        : ${sym}${formatNumber(result.gateCost, p)}` : "",
    result.miscCost > 0    ? `Miscellaneous    : ${sym}${formatNumber(result.miscCost, p)}` : "",
    "",
    `Total Estimate   : ${sym}${formatNumber(result.totalCost, p)}`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].filter(Boolean).join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

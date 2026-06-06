import { ConverterInputs, ConverterResult, HistoryEntry } from "./types";

export const SQFT_PER_ACRE = 43560;

export function formatNumber(value: number, decimals: number = 4): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function validateInput(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid square feet value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num < 0) return "Square feet cannot be negative.";
  return null;
}

export function convert(inputs: ConverterInputs): ConverterResult | null {
  if (validateInput(inputs.value)) return null;
  const squareFeet = parseFloat(inputs.value);
  return { acres: squareFeet / SQFT_PER_ACRE, squareFeet };
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

const HISTORY_KEY = "sqft-to-acre-converter-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: ConverterInputs, result: ConverterResult): void {
  try {
    const history = getHistory();
    history.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

export function exportToText(inputs: ConverterInputs, result: ConverterResult): string {
  return [
    "Square Feet to Acre Converter – Result",
    "=".repeat(45),
    "",
    `Input  : ${formatNumber(result.squareFeet, 0)} square feet`,
    `Result : ${formatNumber(result.acres, inputs.precision)} acres`,
    "",
    `Formula: ${formatNumber(result.squareFeet, 0)} ÷ 43,560 = ${formatNumber(result.acres, inputs.precision)} acres`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

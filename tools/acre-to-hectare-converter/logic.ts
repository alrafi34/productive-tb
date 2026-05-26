import { ConverterInputs, ConverterResult, HistoryEntry } from "./types";

export const HECTARES_PER_ACRE = 0.404686;

export function formatNumber(value: number, decimals: number = 4): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function validateInput(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid acre value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num < 0) return "Value must not be negative.";
  return null;
}

export function convert(inputs: ConverterInputs): ConverterResult | null {
  if (validateInput(inputs.value)) return null;
  const acres = parseFloat(inputs.value);
  return { hectares: acres * HECTARES_PER_ACRE, acres };
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

const HISTORY_KEY = "acre-to-hectare-converter-history";
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
    "Acre to Hectare Converter – Result",
    "=".repeat(45),
    "",
    `Input  : ${formatNumber(result.acres, inputs.precision)} acres`,
    `Result : ${formatNumber(result.hectares, inputs.precision)} hectares`,
    "",
    `Formula: ${formatNumber(result.acres, inputs.precision)} × 0.404686 = ${formatNumber(result.hectares, inputs.precision)} hectares`,
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
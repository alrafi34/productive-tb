import { ConverterInputs, ConverterResult, HistoryEntry } from "./types";

export const ACRES_PER_HECTARE = 2.47105;
export const HECTARES_PER_ACRE = 1 / ACRES_PER_HECTARE;

export function formatNumber(value: number, decimals: number = 4): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function validateInput(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid land area.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num < 0) return "Value must not be negative.";
  return null;
}

export function convert(inputs: ConverterInputs): ConverterResult | null {
  if (validateInput(inputs.value)) return null;
  const hectares = parseFloat(inputs.value);
  return { acres: hectares * ACRES_PER_HECTARE, hectares };
}

export function convertReverse(acres: number): number {
  return acres * HECTARES_PER_ACRE;
}

export function getComparison(acres: number): string {
  if (acres < 0.5) return "Smaller than a typical residential lot";
  if (acres < 1) return "About the size of a residential lot";
  if (acres < 2) return "About the size of a standard city block";
  if (acres < 5) return "About the size of 2–4 football fields";
  if (acres < 10) return "About the size of a small farm";
  if (acres < 50) return "About the size of a medium farm";
  if (acres < 100) return "About the size of a large farm";
  return "Large agricultural or commercial land";
}

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

const HISTORY_KEY = "hectare-to-acre-converter-history";
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
    "Hectare to Acre Converter – Result",
    "=".repeat(45),
    "",
    `Input  : ${formatNumber(result.hectares, inputs.precision)} hectares`,
    `Result : ${formatNumber(result.acres, inputs.precision)} acres`,
    "",
    `Formula: ${formatNumber(result.hectares, inputs.precision)} × 2.47105 = ${formatNumber(result.acres, inputs.precision)} acres`,
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

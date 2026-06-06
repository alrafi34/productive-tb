import { ConverterInputs, ConverterResult, HistoryEntry } from "./types";

export const SQFT_PER_ACRE = 43560;

// Format number with commas
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Validate input
export function validateInput(value: string): string | null {
  if (!value || value.trim() === "") return "Please enter a valid acre value.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid numeric value.";
  if (num < 0) return "Value must not be negative.";
  return null;
}

// Convert acres to square feet
export function convert(inputs: ConverterInputs): ConverterResult | null {
  const error = validateInput(inputs.value);
  if (error) return null;
  const acres = parseFloat(inputs.value);
  return {
    squareFeet: acres * SQFT_PER_ACRE,
    acres,
  };
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

// LocalStorage history
const HISTORY_KEY = "acre-to-sqft-converter-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: ConverterInputs, result: ConverterResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

// Export to text
export function exportToText(inputs: ConverterInputs, result: ConverterResult): string {
  return [
    "Acre to Square Feet Converter – Result",
    "=".repeat(45),
    "",
    `Input  : ${formatNumber(result.acres, inputs.precision)} acres`,
    `Result : ${formatNumber(result.squareFeet, inputs.precision)} square feet`,
    "",
    `Formula: ${formatNumber(result.acres, inputs.precision)} × 43,560 = ${formatNumber(result.squareFeet, inputs.precision)} sq ft`,
    "",
    "=".repeat(45),
    `Generated: ${new Date().toLocaleString()}`,
  ].join("\n");
}

// Download file
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

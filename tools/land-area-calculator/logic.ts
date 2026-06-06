import { InputUnit, LandDimensions, LandAreaResult, HistoryEntry } from "./types";

// Conversion factors to feet
const TO_FEET: Record<InputUnit, number> = {
  ft: 1,
  m: 3.28084,
  yd: 3,
};

// Convert a dimension value to feet
function toFeet(value: number, unit: InputUnit): number {
  return value * TO_FEET[unit];
}

// Format number with comma separators
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Validate inputs
export function validateInputs(dimensions: LandDimensions): string | null {
  const length = parseFloat(dimensions.length);
  const width = parseFloat(dimensions.width);

  if (!dimensions.length || !dimensions.width) {
    return "Please enter both length and width.";
  }
  if (isNaN(length) || isNaN(width)) {
    return "Please enter valid numeric dimensions.";
  }
  if (length <= 0 || width <= 0) {
    return "Length and width must be greater than zero.";
  }
  return null;
}

// Calculate land area
export function calculateLandArea(dimensions: LandDimensions): LandAreaResult | null {
  const error = validateInputs(dimensions);
  if (error) return null;

  const length = parseFloat(dimensions.length);
  const width = parseFloat(dimensions.width);

  const lengthFt = toFeet(length, dimensions.unit);
  const widthFt = toFeet(width, dimensions.unit);

  const sqft = lengthFt * widthFt;
  const sqm = sqft * 0.092903;
  const sqyd = sqft * 0.111111;
  const acres = sqft / 43560;

  return {
    sqft,
    sqm,
    sqyd,
    acres,
    length,
    width,
    unit: dimensions.unit,
  };
}

// Get unit display name
export function getUnitName(unit: InputUnit): string {
  switch (unit) {
    case "ft": return "Feet";
    case "m": return "Meters";
    case "yd": return "Yards";
  }
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
const HISTORY_KEY = "land-area-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(dimensions: LandDimensions, result: LandAreaResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      dimensions,
      result,
    };
    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
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
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // ignore
  }
}

// Export to text
export function exportToText(dimensions: LandDimensions, result: LandAreaResult): string {
  const lines = [
    "Land Area Calculator – Calculation Report",
    "=".repeat(50),
    "",
    "INPUT:",
    `  Length : ${dimensions.length} ${getUnitName(dimensions.unit)}`,
    `  Width  : ${dimensions.width} ${getUnitName(dimensions.unit)}`,
    "",
    "RESULTS:",
    `  Square Feet  : ${formatNumber(result.sqft)} sq ft`,
    `  Square Meters: ${formatNumber(result.sqm)} sq m`,
    `  Square Yards : ${formatNumber(result.sqyd)} sq yd`,
    `  Acres        : ${formatNumber(result.acres, 4)} acres`,
    "",
    "FORMULA: Area = Length × Width",
    "",
    "=".repeat(50),
    `Generated: ${new Date().toLocaleString()}`,
  ];
  return lines.join("\n");
}

// Download file helper
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

// Generate share URL (client-side only)
export function generateShareUrl(dimensions: LandDimensions): string {
  const params = new URLSearchParams({
    l: dimensions.length,
    w: dimensions.width,
    u: dimensions.unit,
  });
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

// Parse share URL params
export function parseShareParams(): Partial<LandDimensions> | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const l = params.get("l");
    const w = params.get("w");
    const u = params.get("u") as InputUnit | null;
    if (l && w) {
      return {
        length: l,
        width: w,
        unit: (u && ["ft", "m", "yd"].includes(u)) ? u : "ft",
      };
    }
  } catch {
    // ignore
  }
  return null;
}

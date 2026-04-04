export interface ConversionResult {
  px: number;
  rem: number;
  em: number;
  formatted: {
    rem: string;
    em: string;
  };
}

export interface ConversionHistory {
  px: number;
  base: number;
  timestamp: number;
}

export function parsePixelValue(value: string): number | null {
  const cleaned = value.trim().replace(/px$/i, "").trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

export function convertPxToRem(px: number, base: number): ConversionResult {
  const rem = px / base;
  const em = px / base;
  
  return {
    px,
    rem,
    em,
    formatted: {
      rem: formatValue(rem),
      em: formatValue(em)
    }
  };
}

export function convertRemToPx(rem: number, base: number): number {
  return rem * base;
}

export function formatValue(value: number): string {
  if (value === 0) return "0";
  
  const rounded = Math.round(value * 10000) / 10000;
  const str = rounded.toString();
  
  if (str.includes(".")) {
    return str.replace(/\.?0+$/, "");
  }
  
  return str;
}

export function processBatchInput(input: string, base: number): ConversionResult[] {
  const lines = input.split(/[\n,;]/).filter(line => line.trim());
  
  return lines
    .map(line => {
      const px = parsePixelValue(line);
      return px !== null ? convertPxToRem(px, base) : null;
    })
    .filter((result): result is ConversionResult => result !== null);
}

export function generateCSSOutput(results: ConversionResult[], unit: "rem" | "em"): string {
  return results
    .map(r => {
      const value = unit === "rem" ? r.formatted.rem : r.formatted.em;
      return `${value}${unit}`;
    })
    .join(";\n") + ";";
}

export function getHistoryFromStorage(): ConversionHistory[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem("px-rem-history");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(px: number, base: number): void {
  if (typeof window === "undefined") return;
  
  try {
    const history = getHistoryFromStorage();
    history.unshift({ px, base, timestamp: Date.now() });
    localStorage.setItem("px-rem-history", JSON.stringify(history.slice(0, 20)));
  } catch {
    // Silently fail if storage is unavailable
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem("px-rem-history");
  } catch {
    // Silently fail
  }
}

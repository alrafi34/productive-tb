import {
  CalculatorInputs,
  CalculationResult,
  DistanceUnit,
  HistoryEntry,
  OutputUnit,
} from "./types";

// ── Unit conversion to meters ─────────────────────────────────────────────────

export const TO_METERS: Record<DistanceUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  mi: 1609.344,
};

export const UNIT_LABELS: Record<DistanceUnit, string> = {
  mm: "Millimeter (mm)",
  cm: "Centimeter (cm)",
  m: "Meter (m)",
  km: "Kilometer (km)",
  in: "Inch (in)",
  ft: "Feet (ft)",
  mi: "Mile (mi)",
};

export const UNIT_SHORT: Record<DistanceUnit, string> = {
  mm: "mm",
  cm: "cm",
  m: "m",
  km: "km",
  in: "in",
  ft: "ft",
  mi: "mi",
};

export const OUTPUT_UNIT_LABELS: Record<OutputUnit, string> = {
  auto: "Automatic",
  mm: "Millimeter (mm)",
  cm: "Centimeter (cm)",
  m: "Meter (m)",
  km: "Kilometer (km)",
  in: "Inch (in)",
  ft: "Feet (ft)",
  mi: "Mile (mi)",
};

export const ALL_DISTANCE_UNITS: DistanceUnit[] = ["mm", "cm", "m", "km", "in", "ft", "mi"];
export const ALL_OUTPUT_UNITS: OutputUnit[] = ["auto", "mm", "cm", "m", "km", "in", "ft", "mi"];

// ── Scale parser ──────────────────────────────────────────────────────────────

/**
 * Parses scale inputs like "1:50000", "1/50000", "50000", "1:50,000"
 * Returns the denominator (scale ratio) or null if invalid.
 */
export function parseScale(input: string): number | null {
  if (!input || !input.trim()) return null;

  const cleaned = input.trim().replace(/,/g, "");

  // Formats: "1:50000" or "1/50000"
  const ratioMatch = cleaned.match(/^1\s*[:\/]\s*(\d+(?:\.\d+)?)$/);
  if (ratioMatch) {
    const val = parseFloat(ratioMatch[1]);
    return val > 0 ? val : null;
  }

  // Plain number: "50000"
  const plain = parseFloat(cleaned);
  if (!isNaN(plain) && plain > 0) return plain;

  return null;
}

// ── Auto unit selection ───────────────────────────────────────────────────────

/**
 * Picks the most human-readable unit for a given distance in meters.
 * Prefers metric for metric inputs, imperial for imperial inputs.
 */
export function autoSelectUnit(meters: number, inputUnit: DistanceUnit): DistanceUnit {
  const isImperial = inputUnit === "in" || inputUnit === "ft" || inputUnit === "mi";

  if (isImperial) {
    const feet = meters / TO_METERS.ft;
    if (feet < 1) return "in";
    if (feet < 5280) return "ft";
    return "mi";
  }

  // Metric
  if (meters < 0.01) return "mm";
  if (meters < 1) return "cm";
  if (meters < 1000) return "m";
  return "km";
}

// ── Core calculation ──────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const scale = parseScale(inputs.scaleInput);
  const dist = parseFloat(inputs.distance);

  if (!scale || isNaN(dist) || dist <= 0) return null;

  const inputMeters = dist * TO_METERS[inputs.distanceUnit];

  let outputMeters: number;
  let formulaText: string;

  if (inputs.mode === "mapToReal") {
    // Real = Map × Scale
    outputMeters = inputMeters * scale;
    formulaText = `${formatNum(dist, inputs.precision)} ${UNIT_SHORT[inputs.distanceUnit]} × ${formatScale(scale)} = ${formatMeters(outputMeters, inputs.precision)}`;
  } else {
    // Map = Real ÷ Scale
    outputMeters = inputMeters / scale;
    formulaText = `${formatNum(dist, inputs.precision)} ${UNIT_SHORT[inputs.distanceUnit]} ÷ ${formatScale(scale)} = ${formatMeters(outputMeters, inputs.precision)}`;
  }

  // Determine output unit
  const resolvedOutputUnit: DistanceUnit =
    inputs.outputUnit === "auto"
      ? autoSelectUnit(outputMeters, inputs.distanceUnit)
      : (inputs.outputUnit as DistanceUnit);

  const outputDistance = outputMeters / TO_METERS[resolvedOutputUnit];

  // All unit conversions
  const allUnits = {} as Record<DistanceUnit, number>;
  for (const u of ALL_DISTANCE_UNITS) {
    allUnits[u] = outputMeters / TO_METERS[u];
  }

  return {
    scaleDenominator: scale,
    inputDistance: dist,
    inputUnit: inputs.distanceUnit,
    outputDistance,
    outputUnit: resolvedOutputUnit,
    outputDistanceFormatted: `${formatNum(outputDistance, inputs.precision)} ${UNIT_SHORT[resolvedOutputUnit]}`,
    formulaText,
    allUnits,
  };
}

// ── Formatting helpers ────────────────────────────────────────────────────────

export function formatNum(value: number, precision: number): string {
  if (value === 0) return "0";
  // Smart formatting: avoid excessive trailing zeros for large numbers
  if (value >= 1000000) {
    return value.toLocaleString("en-US", { maximumFractionDigits: precision });
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  });
}

export function formatScale(scale: number): string {
  return `1:${scale.toLocaleString("en-US")}`;
}

function formatMeters(meters: number, precision: number): string {
  if (meters >= 1000) return `${formatNum(meters / 1000, precision)} km`;
  if (meters >= 1) return `${formatNum(meters, precision)} m`;
  if (meters >= 0.01) return `${formatNum(meters * 100, precision)} cm`;
  return `${formatNum(meters * 1000, precision)} mm`;
}

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  } as T;
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const HISTORY_KEY = "map-scale-calculator-history";
const MAX_HISTORY = 20;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs: { ...inputs },
      result: { ...result },
    };
    const updated = [entry, ...history].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
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

// ── Export ────────────────────────────────────────────────────────────────────

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const mode = inputs.mode === "mapToReal" ? "Map → Real Distance" : "Real → Map Distance";
  return [
    "Map Scale Calculator Result",
    "===========================",
    `Mode: ${mode}`,
    `Scale: ${formatScale(result.scaleDenominator)}`,
    `Input: ${formatNum(result.inputDistance, inputs.precision)} ${UNIT_SHORT[result.inputUnit]}`,
    `Result: ${result.outputDistanceFormatted}`,
    "",
    "Formula:",
    result.formulaText,
    "",
    "All Unit Conversions:",
    ...ALL_DISTANCE_UNITS.map(
      (u) => `  ${UNIT_LABELS[u]}: ${formatNum(result.allUnits[u], 4)}`
    ),
    "",
    `Generated: ${new Date().toLocaleString()}`,
  ].join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

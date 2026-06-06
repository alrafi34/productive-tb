import {
  CalcMethod,
  CoolingUnit,
  PowerUnit,
  TempUnit,
  RefrigerationCOPInputs,
  COPResult,
  HistoryEntry,
} from "./types";

// ─── Unit Conversion ────────────────────────────────────────────────────────

export function toWatts(value: number, unit: CoolingUnit | PowerUnit): number {
  switch (unit) {
    case "W":   return value;
    case "kW":  return value * 1000;
    case "HP":  return value * 746;
    case "BTU_hr": return value * 0.29307107;
    case "TR":  return value * 3516.85;
    default:    return value;
  }
}

export function toKelvin(value: number, unit: TempUnit): number {
  switch (unit) {
    case "K": return value;
    case "C": return value + 273.15;
    case "F": return (value - 32) * (5 / 9) + 273.15;
    default:  return value;
  }
}

// ─── Validation ─────────────────────────────────────────────────────────────

export function validatePositive(value: string, label: string): string | null {
  const n = parseFloat(value);
  if (value.trim() === "" || isNaN(n)) return `${label} is required.`;
  if (n <= 0) return `${label} must be greater than zero.`;
  return null;
}

export function validateNotNegative(value: string, label: string): string | null {
  const n = parseFloat(value);
  if (value.trim() === "" || isNaN(n)) return `${label} is required.`;
  if (n < -273.15) return `${label} is below absolute zero.`;
  return null;
}

// ─── Rating ─────────────────────────────────────────────────────────────────

export function getRating(cop: number): "low" | "average" | "high" {
  if (cop < 2) return "low";
  if (cop <= 4) return "average";
  return "high";
}

export const RATING_LABELS = {
  low:     "Low Efficiency",
  average: "Average Efficiency",
  high:    "High Efficiency",
};

export const RATING_DESCRIPTIONS = {
  low:     "COP below 2 — the system uses more energy than it removes as cooling. Review system design.",
  average: "COP between 2 and 4 — acceptable performance for most refrigeration applications.",
  high:    "COP above 4 — excellent efficiency. The system delivers significantly more cooling than energy consumed.",
};

export const RATING_COLORS = {
  low:     "red",
  average: "yellow",
  high:    "green",
};

// ─── Core Calculation ────────────────────────────────────────────────────────

export function calculate(inputs: RefrigerationCOPInputs): COPResult {
  if (inputs.method === "basic") {
    const { basic } = inputs;
    const qW = toWatts(parseFloat(basic.coolingEffect), basic.coolingUnit);
    const wW = toWatts(parseFloat(basic.powerInput), basic.powerUnit);
    const cop = qW / wW;

    const coolingLabel = `${basic.coolingEffect} ${basic.coolingUnit === "BTU_hr" ? "BTU/hr" : basic.coolingUnit}`;
    const powerLabel   = `${basic.powerInput} ${basic.powerUnit}`;

    const steps: string[] = [
      "Formula: COP = Q_cooling / W_input",
      "",
      `Input values:`,
      `  Cooling Effect  = ${coolingLabel}  →  ${fmt(qW, 4)} W`,
      `  Power Input     = ${powerLabel}  →  ${fmt(wW, 4)} W`,
      "",
      `Calculation:`,
      `  COP = ${fmt(qW, 4)} / ${fmt(wW, 4)}`,
      `  COP = ${fmt(cop, 4)}`,
    ];

    return {
      cop,
      method: "basic",
      coolingEffectW: qW,
      powerInputW: wW,
      rating: getRating(cop),
      steps,
      formulaDisplay: `COP = ${fmt(qW, 2)} W / ${fmt(wW, 2)} W = ${fmt(cop, 4)}`,
    };
  }

  // Carnot
  const { carnot } = inputs;
  const tcK = toKelvin(parseFloat(carnot.coldTemp), carnot.coldTempUnit);
  const thK = toKelvin(parseFloat(carnot.hotTemp),  carnot.hotTempUnit);
  const cop = tcK / (thK - tcK);

  const steps: string[] = [
    "Formula: COP_Carnot = T_c / (T_h − T_c)",
    "",
    "Temperatures converted to Kelvin:",
    `  T_cold = ${carnot.coldTemp} °${carnot.coldTempUnit}  →  ${fmt(tcK, 4)} K`,
    `  T_hot  = ${carnot.hotTemp} °${carnot.hotTempUnit}  →  ${fmt(thK, 4)} K`,
    "",
    "Calculation:",
    `  COP = ${fmt(tcK, 4)} / (${fmt(thK, 4)} − ${fmt(tcK, 4)})`,
    `  COP = ${fmt(tcK, 4)} / ${fmt(thK - tcK, 4)}`,
    `  COP = ${fmt(cop, 4)}`,
  ];

  return {
    cop,
    method: "carnot",
    tcK,
    thK,
    rating: getRating(cop),
    steps,
    formulaDisplay: `COP = ${fmt(tcK, 2)} K / (${fmt(thK, 2)} − ${fmt(tcK, 2)}) K = ${fmt(cop, 4)}`,
  };
}

// ─── Formatting ──────────────────────────────────────────────────────────────

export function fmt(value: number, decimals = 2): string {
  if (!isFinite(value)) return "—";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// ─── Debounce ────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// ─── History (LocalStorage) ──────────────────────────────────────────────────

const HISTORY_KEY = "refrigeration-cop-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: RefrigerationCOPInputs, result: COPResult): void {
  try {
    const prev = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    const updated = [entry, ...prev].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // ignore localStorage errors
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* noop */ }
}

// ─── Export ──────────────────────────────────────────────────────────────────

export function exportToText(inputs: RefrigerationCOPInputs, result: COPResult): string {
  const lines: string[] = [
    "Refrigeration COP Calculation",
    "==============================",
    `Date: ${new Date().toLocaleString()}`,
    "",
    `Method: ${result.method === "basic" ? "Basic COP (Cooling Effect / Power Input)" : "Carnot COP (Temperature-Based)"}`,
    "",
  ];

  if (result.method === "basic") {
    lines.push(
      `Cooling Effect : ${inputs.basic.coolingEffect} ${inputs.basic.coolingUnit === "BTU_hr" ? "BTU/hr" : inputs.basic.coolingUnit}  (${fmt(result.coolingEffectW!, 4)} W)`,
      `Power Input    : ${inputs.basic.powerInput} ${inputs.basic.powerUnit}  (${fmt(result.powerInputW!, 4)} W)`,
    );
  } else {
    lines.push(
      `Cold Temperature : ${inputs.carnot.coldTemp} °${inputs.carnot.coldTempUnit}  (${fmt(result.tcK!, 4)} K)`,
      `Hot Temperature  : ${inputs.carnot.hotTemp} °${inputs.carnot.hotTempUnit}  (${fmt(result.thK!, 4)} K)`,
    );
  }

  lines.push(
    "",
    "─────────────────────────────",
    `COP   : ${fmt(result.cop, 4)}`,
    `Rating: ${RATING_LABELS[result.rating]}`,
    "",
    "Calculation Steps:",
    ...result.steps,
    "",
    "Generated by Productive Toolbox – https://www.productivetoolbox.com",
  );

  return lines.join("\n");
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

export const COOLING_UNIT_LABELS: Record<string, string> = {
  W:      "W (Watts)",
  kW:     "kW (Kilowatts)",
  BTU_hr: "BTU/hr",
  TR:     "TR (Ton of Refrigeration)",
};

export const POWER_UNIT_LABELS: Record<string, string> = {
  W:  "W (Watts)",
  kW: "kW (Kilowatts)",
  HP: "HP (Horsepower)",
};

export const TEMP_UNIT_LABELS: Record<string, string> = {
  C: "°C (Celsius)",
  F: "°F (Fahrenheit)",
  K: "K (Kelvin)",
};

import {
  PumpEfficiencyInputs,
  PumpEfficiencyResult,
  FlowRateUnit,
  HistoryEntry,
} from "./types";

// ── Unit conversion to SI ────────────────────────────────────────────────────

/** Convert flow rate to m³/s */
export function toM3s(value: number, unit: FlowRateUnit): number {
  switch (unit) {
    case "m3s":   return value;
    case "m3h":   return value / 3600;
    case "Ls":    return value / 1000;
    case "Lmin":  return value / 60000;
    case "GPM":   return value * 6.30902e-5;
    case "ft3s":  return value * 0.0283168;
    default:      return value;
  }
}

/** Convert head to meters */
export function toMeters(value: number, isImperial: boolean): number {
  return isImperial ? value * 0.3048 : value;
}

/** Convert input power to watts */
export function toWatts(value: number, isImperial: boolean): number {
  return isImperial ? value * 745.7 : value * 1000;
}

// ── Labels ───────────────────────────────────────────────────────────────────

export const FLOW_RATE_LABELS: Record<FlowRateUnit, string> = {
  m3s:  "m³/s",
  m3h:  "m³/h",
  Ls:   "L/s",
  Lmin: "L/min",
  GPM:  "GPM",
  ft3s: "ft³/s",
};

export const METRIC_FLOW_UNITS: FlowRateUnit[] = ["m3s", "m3h", "Ls", "Lmin"];
export const IMPERIAL_FLOW_UNITS: FlowRateUnit[] = ["GPM", "ft3s"];

// ── Fluid presets ────────────────────────────────────────────────────────────

export const FLUID_PRESETS = [
  { label: "Water (20°C)",    density: "998" },
  { label: "Sea Water",       density: "1025" },
  { label: "Oil (Light)",     density: "850" },
  { label: "Oil (Heavy)",     density: "920" },
  { label: "Glycol 50%",      density: "1070" },
];

// ── Pump system presets ──────────────────────────────────────────────────────

export const PUMP_PRESETS = [
  {
    label: "Water Supply",
    flowRate: "250", flowRateUnit: "GPM" as FlowRateUnit,
    head: "100", inputPower: "12",
    density: "998", unitSystem: "imperial" as const,
  },
  {
    label: "Industrial Pump",
    flowRate: "100", flowRateUnit: "m3h" as FlowRateUnit,
    head: "20", inputPower: "8",
    density: "1000", unitSystem: "metric" as const,
  },
  {
    label: "HVAC Chiller",
    flowRate: "50", flowRateUnit: "Ls" as FlowRateUnit,
    head: "35", inputPower: "30",
    density: "998", unitSystem: "metric" as const,
  },
  {
    label: "Irrigation",
    flowRate: "500", flowRateUnit: "GPM" as FlowRateUnit,
    head: "60", inputPower: "20",
    density: "998", unitSystem: "imperial" as const,
  },
];

// ── Validation ───────────────────────────────────────────────────────────────

export function validatePositive(value: string, label: string): string | null {
  const n = parseFloat(value);
  if (value === "" || isNaN(n)) return `${label} is required`;
  if (n <= 0) return `${label} must be greater than 0`;
  return null;
}

// ── Core calculation ─────────────────────────────────────────────────────────

export function calculate(inputs: PumpEfficiencyInputs): PumpEfficiencyResult {
  const isImperial = inputs.unitSystem === "imperial";

  const Q = toM3s(parseFloat(inputs.flowRate), inputs.flowRateUnit);
  const H = toMeters(parseFloat(inputs.head), isImperial);
  const P_in = toWatts(parseFloat(inputs.inputPower), isImperial);
  const rho = parseFloat(inputs.density);
  const g = parseFloat(inputs.gravity);

  const hydraulicPowerW = rho * g * Q * H;
  const efficiency = (hydraulicPowerW / P_in) * 100;

  const flowLabel = FLOW_RATE_LABELS[inputs.flowRateUnit];
  const headLabel = isImperial ? "ft" : "m";
  const powerLabel = isImperial ? "hp" : "kW";

  const formulaSubstituted = `η = (${rho} × ${g} × ${fmt(Q, 6)} × ${fmt(H, 4)}) / ${fmt(P_in, 2)} × 100`;

  const steps: string[] = [
    "Pump Efficiency Calculation",
    "",
    "Given Inputs:",
    `  Flow Rate: ${inputs.flowRate} ${flowLabel}`,
    `  Pump Head: ${inputs.head} ${headLabel}`,
    `  Input Power: ${inputs.inputPower} ${powerLabel}`,
    `  Fluid Density: ${inputs.density} kg/m³`,
    `  Gravity: ${inputs.gravity} m/s²`,
    "",
    "Step 1 — Convert to SI units:",
    `  Q = ${fmt(Q, 6)} m³/s`,
    `  H = ${fmt(H, 4)} m`,
    `  P_in = ${fmt(P_in, 2)} W`,
    "",
    "Step 2 — Hydraulic Power:",
    "  Formula: P_hyd = ρ × g × Q × H",
    `  P_hyd = ${rho} × ${g} × ${fmt(Q, 6)} × ${fmt(H, 4)}`,
    `  P_hyd = ${fmt(hydraulicPowerW, 2)} W  (${fmt(hydraulicPowerW / 1000, 4)} kW)`,
    "",
    "Step 3 — Pump Efficiency:",
    "  Formula: η (%) = (P_hyd / P_in) × 100",
    `  η = (${fmt(hydraulicPowerW, 2)} / ${fmt(P_in, 2)}) × 100`,
    `  η = ${fmt(efficiency, 2)}%`,
  ];

  return {
    efficiency,
    hydraulicPowerW,
    hydraulicPowerKW: hydraulicPowerW / 1000,
    inputPowerW: P_in,
    efficiencyRating: getRating(efficiency),
    formulaSubstituted,
    steps,
  };
}

// ── Rating helpers ───────────────────────────────────────────────────────────

export function getRating(
  efficiency: number
): "excellent" | "good" | "fair" | "poor" {
  if (efficiency >= 80) return "excellent";
  if (efficiency >= 60) return "good";
  if (efficiency >= 40) return "fair";
  return "poor";
}

export const RATING_LABELS: Record<string, string> = {
  excellent: "Excellent Efficiency",
  good:      "Good Efficiency",
  fair:      "Fair Efficiency",
  poor:      "Poor Efficiency",
};

export const RATING_COLORS: Record<string, string> = {
  excellent: "green",
  good:      "blue",
  fair:      "yellow",
  poor:      "red",
};

export const RATING_DESCRIPTIONS: Record<string, string> = {
  excellent: "Above 80% — High-performance pump operating at premium efficiency.",
  good:      "60–80% — Acceptable efficiency for most industrial applications.",
  fair:      "40–60% — Below average; consider maintenance or system optimization.",
  poor:      "Below 40% — Very low efficiency; pump may need replacement or repair.",
};

// ── Formatting ───────────────────────────────────────────────────────────────

export function fmt(value: number, decimals = 2): string {
  return value.toFixed(decimals);
}

// ── Debounce ─────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ── LocalStorage helpers ─────────────────────────────────────────────────────

const HISTORY_KEY = "pump-efficiency-calculator-history";
const MAX_HISTORY = 20;

export function saveToHistory(
  inputs: PumpEfficiencyInputs,
  result: PumpEfficiencyResult
): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.splice(MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    if (typeof window === "undefined") return [];
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

// ── Export ───────────────────────────────────────────────────────────────────

export function exportToText(
  inputs: PumpEfficiencyInputs,
  result: PumpEfficiencyResult
): string {
  const flowLabel = FLOW_RATE_LABELS[inputs.flowRateUnit];
  const isImperial = inputs.unitSystem === "imperial";
  const headLabel = isImperial ? "ft" : "m";
  const powerLabel = isImperial ? "hp" : "kW";

  const lines = [
    "PUMP EFFICIENCY CALCULATOR — REPORT",
    "=".repeat(50),
    "",
    `Date: ${new Date().toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(50),
    `Unit System: ${inputs.unitSystem === "metric" ? "Metric (SI)" : "Imperial (US)"}`,
    `Flow Rate: ${inputs.flowRate} ${flowLabel}`,
    `Pump Head: ${inputs.head} ${headLabel}`,
    `Input Power: ${inputs.inputPower} ${powerLabel}`,
    `Fluid Density: ${inputs.density} kg/m³`,
    `Gravity: ${inputs.gravity} m/s²`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Hydraulic Power: ${fmt(result.hydraulicPowerKW, 4)} kW`,
    `Input Power: ${fmt(result.inputPowerW / 1000, 4)} kW`,
    `Pump Efficiency: ${fmt(result.efficiency, 2)}%`,
    `Efficiency Rating: ${RATING_LABELS[result.efficiencyRating]}`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50),
    ...result.steps,
    "",
    "=".repeat(50),
    "Generated by Pump Efficiency Calculator",
  ];
  return lines.join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

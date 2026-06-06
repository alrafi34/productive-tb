import {
  ThermalEfficiencyInputs,
  ThermalEfficiencyResult,
  HistoryEntry,
  EnergyUnit,
  PowerUnit,
  TempUnit,
} from "./types";

// ── Unit conversion ──────────────────────────────────────────────────────────

const ENERGY_TO_J: Record<EnergyUnit, number> = {
  J: 1,
  kJ: 1000,
  MJ: 1_000_000,
};

const POWER_TO_W: Record<PowerUnit, number> = {
  W: 1,
  kW: 1000,
  MW: 1_000_000,
};

export function celsiusToKelvin(c: number): number {
  return c + 273.15;
}

// ── Validation ───────────────────────────────────────────────────────────────

export function validateBasic(output: string, input: string): string | null {
  const o = parseFloat(output);
  const i = parseFloat(input);
  if (!output || isNaN(o)) return "Useful output is required.";
  if (!input || isNaN(i)) return "Heat input is required.";
  if (o < 0) return "Useful output cannot be negative.";
  if (i <= 0) return "Heat input must be greater than zero.";
  if (o > i) return "Useful output cannot exceed heat input.";
  return null;
}

export function validateCarnot(th: string, tc: string, unit: TempUnit): string | null {
  const thVal = parseFloat(th);
  const tcVal = parseFloat(tc);
  if (!th || isNaN(thVal)) return "Hot reservoir temperature (Th) is required.";
  if (!tc || isNaN(tcVal)) return "Cold reservoir temperature (Tc) is required.";

  const thK = unit === "C" ? celsiusToKelvin(thVal) : thVal;
  const tcK = unit === "C" ? celsiusToKelvin(tcVal) : tcVal;

  if (thK <= 0) return "Hot temperature must be above absolute zero.";
  if (tcK <= 0) return "Cold temperature must be above absolute zero.";
  if (tcK >= thK) return "Cold temperature (Tc) must be lower than hot temperature (Th).";
  return null;
}

export function validateEngine(powerOutput: string, fuelInput: string): string | null {
  const po = parseFloat(powerOutput);
  const fi = parseFloat(fuelInput);
  if (!powerOutput || isNaN(po)) return "Mechanical output power is required.";
  if (!fuelInput || isNaN(fi)) return "Fuel energy input is required.";
  if (po < 0) return "Power output cannot be negative.";
  if (fi <= 0) return "Fuel input must be greater than zero.";
  if (po > fi) return "Power output cannot exceed fuel input.";
  return null;
}

// ── Efficiency rating ────────────────────────────────────────────────────────

export function getEfficiencyRating(
  eff: number
): { rating: ThermalEfficiencyResult["rating"]; ratingLabel: string } {
  if (eff >= 60) return { rating: "excellent", ratingLabel: "Excellent" };
  if (eff >= 40) return { rating: "good", ratingLabel: "Good" };
  if (eff >= 20) return { rating: "fair", ratingLabel: "Fair" };
  return { rating: "poor", ratingLabel: "Poor" };
}

// ── Core calculations ────────────────────────────────────────────────────────

export function calculateBasic(
  output: string,
  input: string,
  unit: string,
  precision: number
): ThermalEfficiencyResult {
  const o = parseFloat(output);
  const i = parseFloat(input);
  const efficiency = (o / i) * 100;
  const rounded = parseFloat(efficiency.toFixed(precision));

  const steps = [
    `Formula: η = (Useful Output ÷ Heat Input) × 100`,
    ``,
    `Given:`,
    `  Useful Output = ${o} ${unit}`,
    `  Heat Input    = ${i} ${unit}`,
    ``,
    `Calculation:`,
    `  η = (${o} ÷ ${i}) × 100`,
    `  η = ${(o / i).toFixed(precision + 2)} × 100`,
    `  η = ${rounded}%`,
  ];

  const { rating, ratingLabel } = getEfficiencyRating(rounded);

  return {
    efficiency: rounded,
    formula: "η = (Useful Output / Heat Input) × 100",
    steps,
    breakdown: `${o} ${unit} ÷ ${i} ${unit} × 100 = ${rounded}%`,
    rating,
    ratingLabel,
  };
}

export function calculateCarnot(
  th: string,
  tc: string,
  unit: TempUnit,
  precision: number
): ThermalEfficiencyResult {
  const thVal = parseFloat(th);
  const tcVal = parseFloat(tc);
  const thK = unit === "C" ? celsiusToKelvin(thVal) : thVal;
  const tcK = unit === "C" ? celsiusToKelvin(tcVal) : tcVal;

  const efficiency = (1 - tcK / thK) * 100;
  const rounded = parseFloat(efficiency.toFixed(precision));

  const unitLabel = unit === "C" ? "°C" : "K";
  const convNote =
    unit === "C"
      ? [
          `  Converting to Kelvin:`,
          `  Th = ${thVal}°C + 273.15 = ${thK.toFixed(2)} K`,
          `  Tc = ${tcVal}°C + 273.15 = ${tcK.toFixed(2)} K`,
          ``,
        ]
      : [];

  const steps = [
    `Formula: η = (1 − Tc / Th) × 100`,
    ``,
    `Given:`,
    `  Hot Reservoir  Th = ${thVal} ${unitLabel}`,
    `  Cold Reservoir Tc = ${tcVal} ${unitLabel}`,
    ``,
    ...convNote,
    `Calculation:`,
    `  η = (1 − ${tcK.toFixed(2)} / ${thK.toFixed(2)}) × 100`,
    `  η = (1 − ${(tcK / thK).toFixed(precision + 2)}) × 100`,
    `  η = ${(1 - tcK / thK).toFixed(precision + 2)} × 100`,
    `  η = ${rounded}%`,
  ];

  const { rating, ratingLabel } = getEfficiencyRating(rounded);

  return {
    efficiency: rounded,
    formula: "η = (1 − Tc / Th) × 100",
    steps,
    breakdown: `1 − (${tcK.toFixed(2)} K / ${thK.toFixed(2)} K) × 100 = ${rounded}%`,
    rating,
    ratingLabel,
  };
}

export function calculateEngine(
  powerOutput: string,
  fuelInput: string,
  unit: PowerUnit,
  precision: number
): ThermalEfficiencyResult {
  const po = parseFloat(powerOutput);
  const fi = parseFloat(fuelInput);
  const efficiency = (po / fi) * 100;
  const rounded = parseFloat(efficiency.toFixed(precision));

  const steps = [
    `Formula: η = (Power Output ÷ Fuel Energy Input) × 100`,
    ``,
    `Given:`,
    `  Mechanical Output = ${po} ${unit}`,
    `  Fuel Energy Input = ${fi} ${unit}`,
    ``,
    `Calculation:`,
    `  η = (${po} ÷ ${fi}) × 100`,
    `  η = ${(po / fi).toFixed(precision + 2)} × 100`,
    `  η = ${rounded}%`,
  ];

  const { rating, ratingLabel } = getEfficiencyRating(rounded);

  return {
    efficiency: rounded,
    formula: "η = (Power Output / Fuel Energy Input) × 100",
    steps,
    breakdown: `${po} ${unit} ÷ ${fi} ${unit} × 100 = ${rounded}%`,
    rating,
    ratingLabel,
  };
}

export function calculate(inputs: ThermalEfficiencyInputs): ThermalEfficiencyResult {
  const { mode, basic, carnot, engine, precision } = inputs;
  if (mode === "basic") {
    return calculateBasic(basic.output, basic.input, basic.unit, precision);
  }
  if (mode === "carnot") {
    return calculateCarnot(carnot.th, carnot.tc, carnot.tempUnit, precision);
  }
  return calculateEngine(engine.powerOutput, engine.fuelInput, engine.unit, precision);
}

// ── Debounce ─────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ── LocalStorage history ─────────────────────────────────────────────────────

const HISTORY_KEY = "thermal-efficiency-history";
const MAX_HISTORY = 20;

export function saveToHistory(
  inputs: ThermalEfficiencyInputs,
  result: ThermalEfficiencyResult
): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    const updated = [entry, ...history].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // ignore
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

// ── Export ───────────────────────────────────────────────────────────────────

export function exportToText(
  inputs: ThermalEfficiencyInputs,
  result: ThermalEfficiencyResult
): string {
  const lines = [
    "THERMAL EFFICIENCY CALCULATION REPORT",
    "======================================",
    `Date: ${new Date().toLocaleString()}`,
    `Mode: ${inputs.mode === "basic" ? "Basic Thermal Efficiency" : inputs.mode === "carnot" ? "Carnot Efficiency" : "Engine Efficiency"}`,
    "",
    "RESULT",
    "------",
    `Thermal Efficiency: ${result.efficiency}%`,
    `Rating: ${result.ratingLabel}`,
    `Formula: ${result.formula}`,
    "",
    "CALCULATION STEPS",
    "-----------------",
    ...result.steps,
    "",
    "Generated by Thermal Efficiency Calculator",
  ];
  return lines.join("\n");
}

export function downloadFile(
  content: string,
  filename: string,
  type = "text/plain"
): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatNum(value: number, precision: number): string {
  return value.toFixed(precision);
}

// ── Presets ──────────────────────────────────────────────────────────────────

export const BASIC_PRESETS = [
  { label: "Steam Turbine", output: "400", input: "1000", unit: "kJ" as const, description: "Typical steam turbine cycle" },
  { label: "Gas Engine", output: "300", input: "800", unit: "kJ" as const, description: "Internal combustion engine" },
  { label: "Diesel Engine", output: "350", input: "900", unit: "kJ" as const, description: "Diesel cycle engine" },
  { label: "Heat Pump", output: "600", input: "1000", unit: "kJ" as const, description: "Heat pump system" },
];

export const CARNOT_PRESETS = [
  { label: "Steam Plant", th: "900", tc: "300", tempUnit: "K" as const, description: "High-temp steam power plant" },
  { label: "Gas Turbine", th: "1200", tc: "400", tempUnit: "K" as const, description: "Gas turbine cycle" },
  { label: "Refrigerator", th: "300", tc: "250", tempUnit: "K" as const, description: "Refrigeration cycle" },
  { label: "Solar Engine", th: "500", tc: "300", tempUnit: "K" as const, description: "Solar thermal engine" },
];

export const ENGINE_PRESETS = [
  { label: "Car Engine", powerOutput: "1200", fuelInput: "3000", unit: "W" as const, description: "Typical gasoline engine" },
  { label: "Diesel Truck", powerOutput: "2500", fuelInput: "5500", unit: "W" as const, description: "Heavy-duty diesel engine" },
  { label: "Power Plant", powerOutput: "500", fuelInput: "1200", unit: "kW" as const, description: "Thermal power plant" },
  { label: "Jet Engine", powerOutput: "800", fuelInput: "2000", unit: "kW" as const, description: "Aircraft jet engine" },
];

// ── Shareable URL ────────────────────────────────────────────────────────────

export function buildShareUrl(inputs: ThermalEfficiencyInputs): string {
  const params = new URLSearchParams();
  params.set("mode", inputs.mode);
  if (inputs.mode === "basic") {
    params.set("output", inputs.basic.output);
    params.set("input", inputs.basic.input);
    params.set("unit", inputs.basic.unit);
  } else if (inputs.mode === "carnot") {
    params.set("th", inputs.carnot.th);
    params.set("tc", inputs.carnot.tc);
    params.set("tempUnit", inputs.carnot.tempUnit);
  } else {
    params.set("powerOutput", inputs.engine.powerOutput);
    params.set("fuelInput", inputs.engine.fuelInput);
    params.set("unit", inputs.engine.unit);
  }
  params.set("precision", String(inputs.precision));
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function parseUrlParams(
  search: string
): Partial<ThermalEfficiencyInputs> | null {
  try {
    const params = new URLSearchParams(search);
    const mode = params.get("mode") as ThermalEfficiencyInputs["mode"] | null;
    if (!mode) return null;
    const precision = parseInt(params.get("precision") || "2") as ThermalEfficiencyInputs["precision"];
    if (mode === "basic") {
      return {
        mode,
        precision,
        basic: {
          output: params.get("output") || "",
          input: params.get("input") || "",
          unit: (params.get("unit") as ThermalEfficiencyInputs["basic"]["unit"]) || "kJ",
        },
      };
    }
    if (mode === "carnot") {
      return {
        mode,
        precision,
        carnot: {
          th: params.get("th") || "",
          tc: params.get("tc") || "",
          tempUnit: (params.get("tempUnit") as ThermalEfficiencyInputs["carnot"]["tempUnit"]) || "K",
        },
      };
    }
    if (mode === "engine") {
      return {
        mode,
        precision,
        engine: {
          powerOutput: params.get("powerOutput") || "",
          fuelInput: params.get("fuelInput") || "",
          unit: (params.get("unit") as ThermalEfficiencyInputs["engine"]["unit"]) || "W",
        },
      };
    }
    return null;
  } catch {
    return null;
  }
}

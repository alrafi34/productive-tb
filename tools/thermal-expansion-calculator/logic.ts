import {
  ThermalExpansionInputs,
  ThermalExpansionResult,
  TempUnit,
  DimUnit,
  HistoryEntry,
  Precision,
} from "./types";

// ── Material database ──────────────────────────────────────────────────────
export const MATERIALS: { label: string; alpha: number }[] = [
  { label: "Steel",              alpha: 12e-6  },
  { label: "Stainless Steel",    alpha: 17e-6  },
  { label: "Aluminum",           alpha: 23e-6  },
  { label: "Copper",             alpha: 17e-6  },
  { label: "Brass",              alpha: 19e-6  },
  { label: "Iron (Cast)",        alpha: 11e-6  },
  { label: "Titanium",           alpha: 8.6e-6 },
  { label: "Lead",               alpha: 29e-6  },
  { label: "Concrete",           alpha: 12e-6  },
  { label: "Glass (Borosilicate)",alpha: 3.3e-6},
  { label: "Glass (Soda-lime)",  alpha: 9e-6   },
  { label: "Plastic (PVC)",      alpha: 52e-6  },
  { label: "Nylon",              alpha: 80e-6  },
  { label: "Wood (Oak)",         alpha: 5e-6   },
  { label: "Granite",            alpha: 8e-6   },
  { label: "Marble",             alpha: 5.5e-6 },
  { label: "Rubber",             alpha: 77e-6  },
  { label: "Invar",              alpha: 1.2e-6 },
  { label: "Custom",             alpha: 0      },
];

export const MATERIAL_NOTES: Record<string, string> = {
  "Steel":               "Used in bridges, rails, and structural frames. Expansion joints are critical in long spans.",
  "Stainless Steel":     "Common in food processing and medical equipment. Higher expansion than carbon steel.",
  "Aluminum":            "Widely used in aerospace and automotive. Expands nearly twice as much as steel.",
  "Copper":              "Used in plumbing and electrical wiring. Expansion loops are required in long pipe runs.",
  "Brass":               "Common in valves and fittings. Similar expansion to copper.",
  "Iron (Cast)":         "Used in engine blocks and pipes. Lower expansion than steel.",
  "Titanium":            "Used in aerospace and medical implants. Very low expansion for a metal.",
  "Lead":                "Used in radiation shielding and batteries. High expansion rate.",
  "Concrete":            "Matched to steel reinforcement to prevent cracking under temperature changes.",
  "Glass (Borosilicate)":"Used in lab equipment and cookware. Very low expansion — resistant to thermal shock.",
  "Glass (Soda-lime)":   "Common window glass. Moderate expansion; can crack under rapid temperature changes.",
  "Plastic (PVC)":       "Used in pipes and fittings. High expansion requires expansion loops in long runs.",
  "Nylon":               "Engineering plastic with very high thermal expansion. Clearances must account for this.",
  "Wood (Oak)":          "Expansion varies with grain direction. Moisture content also affects dimensions.",
  "Granite":             "Used in precision surfaces and countertops. Low, stable expansion.",
  "Marble":              "Decorative stone with low expansion. Suitable for flooring and cladding.",
  "Rubber":              "Very high expansion. Used in seals and gaskets designed to accommodate movement.",
  "Invar":               "Nickel-iron alloy engineered for near-zero expansion. Used in precision instruments.",
  "Custom":              "Enter a custom coefficient of thermal expansion for your specific material.",
};

// ── Unit labels ────────────────────────────────────────────────────────────
export const TEMP_LABELS: Record<TempUnit, string> = {
  C: "Celsius (°C)",
  F: "Fahrenheit (°F)",
  K: "Kelvin (K)",
};

export const DIM_LABELS: Record<DimUnit, string> = {
  m:  "Meters (m)",
  cm: "Centimeters (cm)",
  mm: "Millimeters (mm)",
  ft: "Feet (ft)",
  in: "Inches (in)",
};

export const DIM_SHORT: Record<DimUnit, string> = {
  m: "m", cm: "cm", mm: "mm", ft: "ft", in: "in",
};

export const ALL_DIM_UNITS: DimUnit[] = ["m", "cm", "mm", "ft", "in"];
export const ALL_TEMP_UNITS: TempUnit[] = ["C", "F", "K"];

// ── Conversions ────────────────────────────────────────────────────────────
/** Convert temperature to Celsius */
export function toCelsius(value: number, unit: TempUnit): number {
  if (unit === "C") return value;
  if (unit === "F") return (value - 32) * (5 / 9);
  return value - 273.15; // K
}

/** Convert a length value to meters */
function toMeters(value: number, unit: DimUnit): number {
  switch (unit) {
    case "m":  return value;
    case "cm": return value / 100;
    case "mm": return value / 1000;
    case "ft": return value * 0.3048;
    case "in": return value * 0.0254;
  }
}

/** Convert meters back to target unit */
function fromMeters(value: number, unit: DimUnit): number {
  switch (unit) {
    case "m":  return value;
    case "cm": return value * 100;
    case "mm": return value * 1000;
    case "ft": return value / 0.3048;
    case "in": return value / 0.0254;
  }
}

// ── Core calculation ───────────────────────────────────────────────────────
export function calculate(inputs: ThermalExpansionInputs): ThermalExpansionResult {
  const alpha = parseFloat(inputs.alpha);
  const dim   = parseFloat(inputs.dimension);
  const T1    = toCelsius(parseFloat(inputs.initialTemp), inputs.tempUnit);
  const T2    = toCelsius(parseFloat(inputs.finalTemp),   inputs.tempUnit);
  const deltaT = T2 - T1;

  // Work in meters for linear, m² for area, m³ for volume
  const dimInBase = toMeters(dim, inputs.dimUnit);

  let deltaBase: number;
  let formulaStr: string;
  let breakdownStr: string;

  if (inputs.expansionType === "linear") {
    deltaBase = alpha * dimInBase * deltaT;
    formulaStr = "ΔL = α × L₀ × ΔT";
    breakdownStr = `${alpha.toExponential(3)} × ${dimInBase.toFixed(6)} m × ${deltaT.toFixed(4)} °C`;
  } else if (inputs.expansionType === "area") {
    deltaBase = 2 * alpha * dimInBase * deltaT;
    formulaStr = "ΔA = 2α × A₀ × ΔT";
    breakdownStr = `2 × ${alpha.toExponential(3)} × ${dimInBase.toFixed(6)} m² × ${deltaT.toFixed(4)} °C`;
  } else {
    deltaBase = 3 * alpha * dimInBase * deltaT;
    formulaStr = "ΔV = 3α × V₀ × ΔT";
    breakdownStr = `3 × ${alpha.toExponential(3)} × ${dimInBase.toFixed(6)} m³ × ${deltaT.toFixed(4)} °C`;
  }

  const delta    = fromMeters(deltaBase, inputs.dimUnit);
  const finalDim = dim + delta;
  const percentChange = dimInBase !== 0 ? (deltaBase / dimInBase) * 100 : 0;

  const result: ThermalExpansionResult = {
    deltaT,
    delta,
    finalDim,
    percentChange,
    formula: formulaStr,
    breakdown: breakdownStr,
  };

  // Compare mode
  if (inputs.compareMode && inputs.alpha2) {
    const alpha2 = parseFloat(inputs.alpha2);
    let deltaBase2: number;
    if (inputs.expansionType === "linear") {
      deltaBase2 = alpha2 * dimInBase * deltaT;
    } else if (inputs.expansionType === "area") {
      deltaBase2 = 2 * alpha2 * dimInBase * deltaT;
    } else {
      deltaBase2 = 3 * alpha2 * dimInBase * deltaT;
    }
    result.delta2        = fromMeters(deltaBase2, inputs.dimUnit);
    result.finalDim2     = dim + result.delta2;
    result.percentChange2 = dimInBase !== 0 ? (deltaBase2 / dimInBase) * 100 : 0;
  }

  return result;
}

// ── Validation ─────────────────────────────────────────────────────────────
export function validatePositive(val: string, label: string): string | null {
  const n = parseFloat(val);
  if (!val || val.trim() === "") return `${label} is required.`;
  if (isNaN(n)) return `${label} must be a valid number.`;
  if (n <= 0) return `${label} must be greater than 0.`;
  return null;
}

export function validateAlpha(val: string): string | null {
  const n = parseFloat(val);
  if (!val || val.trim() === "") return "Coefficient (α) is required.";
  if (isNaN(n)) return "Coefficient must be a valid number.";
  if (n <= 0) return "Coefficient must be greater than 0.";
  return null;
}

export function validateTemp(val: string, label: string): string | null {
  if (!val || val.trim() === "") return `${label} is required.`;
  if (isNaN(parseFloat(val))) return `${label} must be a valid number.`;
  return null;
}

// ── Formatting ─────────────────────────────────────────────────────────────
export function formatNum(n: number, precision: Precision): string {
  if (!isFinite(n)) return "—";
  // Use scientific notation for very small or very large numbers
  if (Math.abs(n) > 0 && Math.abs(n) < 0.0001) {
    return n.toExponential(precision);
  }
  return n.toFixed(precision);
}

export function formatAlpha(alpha: number): string {
  return alpha.toExponential(2);
}

// ── Debounce ───────────────────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  } as T;
}

// ── LocalStorage history ───────────────────────────────────────────────────
const HISTORY_KEY = "thermal-expansion-history";
const MAX_HISTORY = 20;

export function saveToHistory(inputs: ThermalExpansionInputs, result: ThermalExpansionResult): void {
  try {
    const existing = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs: { ...inputs },
      result: { ...result },
    };
    const updated = [entry, ...existing].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable
  }
}

export function getHistory(): HistoryEntry[] {
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

// ── Export ─────────────────────────────────────────────────────────────────
export function exportToText(inputs: ThermalExpansionInputs, result: ThermalExpansionResult): string {
  const mat = inputs.material === "Custom" ? `Custom (α = ${inputs.alpha})` : inputs.material;
  const typeLabel = inputs.expansionType === "linear" ? "Linear" : inputs.expansionType === "area" ? "Area" : "Volume";
  const dimLabel  = inputs.expansionType === "linear" ? "Length" : inputs.expansionType === "area" ? "Area" : "Volume";
  const unit = DIM_SHORT[inputs.dimUnit];
  return [
    "Thermal Expansion Report",
    "========================",
    `Material:          ${mat}`,
    `Expansion Type:    ${typeLabel}`,
    `Coefficient (α):   ${parseFloat(inputs.alpha).toExponential(3)} per °C`,
    `Initial ${dimLabel}:   ${inputs.dimension} ${unit}`,
    `Initial Temp:      ${inputs.initialTemp} °${inputs.tempUnit}`,
    `Final Temp:        ${inputs.finalTemp} °${inputs.tempUnit}`,
    `Temperature ΔT:    ${result.deltaT.toFixed(4)} °C`,
    "",
    `Formula:           ${result.formula}`,
    `Breakdown:         ${result.breakdown}`,
    "",
    `Expansion (Δ):     ${formatNum(result.delta, 6)} ${unit}`,
    `Final ${dimLabel}:     ${formatNum(result.finalDim, 6)} ${unit}`,
    `% Change:          ${formatNum(result.percentChange, 4)}%`,
    "",
    `Generated by Productive Toolbox – productivetoolbox.com`,
  ].join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

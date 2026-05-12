import {
  CalculationMode,
  CalculationInput,
  CalculationResult,
  HistoryEntry,
  InductanceUnit,
  FrequencyUnit,
  LengthUnit,
  AreaUnit,
} from "./types";

// Constants
const MU_0 = 4 * Math.PI * 1e-7; // Permeability of free space (H/m)
const MU_IRON = 200; // Relative permeability multiplier for iron (approximate)

// Unit conversion maps
const INDUCTANCE_TO_HENRIES: Record<InductanceUnit, number> = {
  H: 1,
  mH: 1e-3,
  µH: 1e-6,
  nH: 1e-9,
};

const FREQUENCY_TO_HZ: Record<FrequencyUnit, number> = {
  Hz: 1,
  kHz: 1e3,
  MHz: 1e6,
};

const LENGTH_TO_METERS: Record<LengthUnit, number> = {
  m: 1,
  cm: 1e-2,
  mm: 1e-3,
};

const AREA_TO_M2: Record<AreaUnit, number> = {
  "m²": 1,
  "cm²": 1e-4,
  "mm²": 1e-6,
};

// Convert to base units
export const toHenries = (value: number, unit: InductanceUnit): number => {
  return value * INDUCTANCE_TO_HENRIES[unit];
};

export const toHz = (value: number, unit: FrequencyUnit): number => {
  return value * FREQUENCY_TO_HZ[unit];
};

export const toMeters = (value: number, unit: LengthUnit): number => {
  return value * LENGTH_TO_METERS[unit];
};

export const toM2 = (value: number, unit: AreaUnit): number => {
  return value * AREA_TO_M2[unit];
};

// Convert from base units
export const fromHenries = (value: number): { unit: string; value: string }[] => {
  return [
    { unit: "H", value: formatNumber(value) },
    { unit: "mH", value: formatNumber(value / 1e-3) },
    { unit: "µH", value: formatNumber(value / 1e-6) },
    { unit: "nH", value: formatNumber(value / 1e-9) },
  ].filter(item => {
    const num = parseFloat(item.value);
    return num >= 0.001 && num < 100000;
  });
};

export const fromOhms = (value: number): { unit: string; value: string }[] => {
  return [
    { unit: "Ω", value: formatNumber(value) },
    { unit: "kΩ", value: formatNumber(value / 1e3) },
    { unit: "MΩ", value: formatNumber(value / 1e6) },
  ].filter(item => {
    const num = parseFloat(item.value);
    return num >= 0.001 && num < 100000;
  });
};

// Format number with appropriate precision
export const formatNumber = (num: number, decimals: number = 6): string => {
  if (num === 0) return "0";
  
  const absNum = Math.abs(num);
  
  // Use scientific notation for very large or very small numbers
  if (absNum < 1e-9 || absNum >= 1e9) {
    return num.toExponential(3);
  }
  
  // Otherwise use fixed decimal
  const str = num.toFixed(decimals);
  // Remove trailing zeros
  return parseFloat(str).toString();
};

// Perform calculations
export const performCalculation = (input: CalculationInput): CalculationResult | null => {
  const { mode } = input;

  try {
    switch (mode) {
      case "inductance-solenoid":
        return calculateInductanceSolenoid(input);
      case "inductance-air-core":
        return calculateInductanceAirCore(input);
      case "reactance":
        return calculateReactance(input);
      default:
        return null;
    }
  } catch (error) {
    return null;
  }
};

// Calculate Inductance (Solenoid): L = (μ × N² × A) / l
const calculateInductanceSolenoid = (input: CalculationInput): CalculationResult => {
  const { turns, length, lengthUnit, area, areaUnit, permeabilityType, customPermeability } = input;
  
  if (!turns || !length || !area || !lengthUnit || !areaUnit || !permeabilityType) {
    throw new Error("Missing required inputs");
  }

  const N = turns;
  const l = toMeters(length, lengthUnit);
  const A = toM2(area, areaUnit);
  
  let mu: number;
  let muLabel: string;
  
  if (permeabilityType === "air") {
    mu = MU_0;
    muLabel = "μ₀ (4π × 10⁻⁷ H/m)";
  } else if (permeabilityType === "iron") {
    mu = MU_0 * MU_IRON;
    muLabel = `μ₀ × ${MU_IRON} (Iron core)`;
  } else {
    mu = customPermeability || MU_0;
    muLabel = `${formatNumber(mu)} H/m`;
  }
  
  const L = (mu * N * N * A) / l;

  const steps = [
    `L = (μ × N² × A) / l`,
    `L = (${muLabel} × ${N}² × ${formatNumber(A)} m²) / ${formatNumber(l)} m`,
    `L = (${formatNumber(mu)} × ${N * N} × ${formatNumber(A)}) / ${formatNumber(l)}`,
    `L = ${formatNumber(L)} H`,
  ];

  return {
    value: L,
    unit: "H",
    formula: "L = (μ × N² × A) / l",
    steps,
    conversions: fromHenries(L),
  };
};

// Calculate Inductance (Air-Core): L ≈ (μ₀ × N² × π × r²) / l
const calculateInductanceAirCore = (input: CalculationInput): CalculationResult => {
  const { turns, radius, radiusUnit, length, lengthUnit } = input;
  
  if (!turns || !radius || !length || !radiusUnit || !lengthUnit) {
    throw new Error("Missing required inputs");
  }

  const N = turns;
  const r = toMeters(radius, radiusUnit);
  const l = toMeters(length, lengthUnit);
  const A = Math.PI * r * r;
  
  const L = (MU_0 * N * N * A) / l;

  const steps = [
    `L = (μ₀ × N² × π × r²) / l`,
    `L = (4π × 10⁻⁷ × ${N}² × π × ${formatNumber(r)}²) / ${formatNumber(l)}`,
    `L = (${formatNumber(MU_0)} × ${N * N} × ${formatNumber(A)}) / ${formatNumber(l)}`,
    `L = ${formatNumber(L)} H`,
  ];

  return {
    value: L,
    unit: "H",
    formula: "L = (μ₀ × N² × π × r²) / l",
    steps,
    conversions: fromHenries(L),
  };
};

// Calculate Inductive Reactance: XL = 2πfL
const calculateReactance = (input: CalculationInput): CalculationResult => {
  const { inductance, inductanceUnit, frequency, frequencyUnit } = input;
  
  if (!inductance || !frequency || !inductanceUnit || !frequencyUnit) {
    throw new Error("Missing required inputs");
  }

  const L = toHenries(inductance, inductanceUnit);
  const f = toHz(frequency, frequencyUnit);
  const XL = 2 * Math.PI * f * L;

  const steps = [
    `XL = 2πfL`,
    `XL = 2 × π × ${formatNumber(f)} Hz × ${formatNumber(L)} H`,
    `XL = ${formatNumber(2 * Math.PI * f)} × ${formatNumber(L)}`,
    `XL = ${formatNumber(XL)} Ω`,
  ];

  return {
    value: XL,
    unit: "Ω",
    formula: "XL = 2πfL",
    steps,
    conversions: fromOhms(XL),
  };
};

// Validation
export const validateInput = (input: CalculationInput): string | null => {
  const { mode, turns, length, area, radius, inductance, frequency } = input;

  switch (mode) {
    case "inductance-solenoid":
      if (!turns || turns <= 0) return "Number of turns must be greater than 0";
      if (!length || length <= 0) return "Length must be greater than 0";
      if (!area || area <= 0) return "Area must be greater than 0";
      break;
    case "inductance-air-core":
      if (!turns || turns <= 0) return "Number of turns must be greater than 0";
      if (!radius || radius <= 0) return "Radius must be greater than 0";
      if (!length || length <= 0) return "Length must be greater than 0";
      break;
    case "reactance":
      if (!inductance || inductance <= 0) return "Inductance must be greater than 0";
      if (!frequency || frequency <= 0) return "Frequency must be greater than 0";
      break;
  }

  return null;
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// History management
const HISTORY_KEY = "inductor-calculator-history";
const MAX_HISTORY = 10;

export const saveToHistory = (
  mode: CalculationMode,
  input: CalculationInput,
  result: CalculationResult
): void => {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    mode,
    input,
    result,
  };
  history.unshift(entry);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getHistory = (): HistoryEntry[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};

// Export functions
export const exportToText = (
  mode: CalculationMode,
  input: CalculationInput,
  result: CalculationResult
): string => {
  let text = "Inductor Calculator Result\n";
  text += "=".repeat(40) + "\n\n";
  text += `Mode: ${getModeLabel(mode)}\n\n`;
  
  text += "Inputs:\n";
  if (input.turns) text += `  Turns (N): ${input.turns}\n`;
  if (input.length) text += `  Length: ${input.length} ${input.lengthUnit}\n`;
  if (input.area) text += `  Area: ${input.area} ${input.areaUnit}\n`;
  if (input.radius) text += `  Radius: ${input.radius} ${input.radiusUnit}\n`;
  if (input.permeabilityType) text += `  Core: ${input.permeabilityType}\n`;
  if (input.inductance) text += `  Inductance: ${input.inductance} ${input.inductanceUnit}\n`;
  if (input.frequency) text += `  Frequency: ${input.frequency} ${input.frequencyUnit}\n`;
  
  text += `\nFormula: ${result.formula}\n\n`;
  
  text += "Steps:\n";
  result.steps.forEach((step, i) => {
    text += `  ${i + 1}. ${step}\n`;
  });
  
  text += `\nResult: ${formatNumber(result.value)} ${result.unit}\n\n`;
  
  if (result.conversions.length > 0) {
    text += "Conversions:\n";
    result.conversions.forEach(conv => {
      text += `  ${conv.value} ${conv.unit}\n`;
    });
  }
  
  return text;
};

export const downloadFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getModeLabel = (mode: CalculationMode): string => {
  const labels: Record<CalculationMode, string> = {
    "inductance-solenoid": "Inductance (Solenoid)",
    "inductance-air-core": "Inductance (Air-Core Coil)",
    "reactance": "Inductive Reactance",
  };
  return labels[mode];
};

// Example presets
export const EXAMPLE_PRESETS: Record<CalculationMode, any> = {
  "inductance-solenoid": {
    turns: 100,
    length: 10,
    lengthUnit: "cm" as LengthUnit,
    area: 1,
    areaUnit: "cm²" as AreaUnit,
    permeabilityType: "air",
  },
  "inductance-air-core": {
    turns: 100,
    radius: 2,
    radiusUnit: "cm" as LengthUnit,
    length: 10,
    lengthUnit: "cm" as LengthUnit,
  },
  "reactance": {
    inductance: 10,
    inductanceUnit: "µH" as InductanceUnit,
    frequency: 1,
    frequencyUnit: "MHz" as FrequencyUnit,
  },
};

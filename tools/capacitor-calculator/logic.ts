import {
  CalculationMode,
  CalculationInput,
  CalculationResult,
  HistoryEntry,
  CapacitanceUnit,
  VoltageUnit,
  ChargeUnit,
  EnergyUnit,
} from "./types";

// Unit conversion maps
const CAPACITANCE_TO_FARADS: Record<CapacitanceUnit, number> = {
  F: 1,
  mF: 1e-3,
  µF: 1e-6,
  nF: 1e-9,
  pF: 1e-12,
};

const VOLTAGE_TO_VOLTS: Record<VoltageUnit, number> = {
  V: 1,
  mV: 1e-3,
  kV: 1e3,
};

const CHARGE_TO_COULOMBS: Record<ChargeUnit, number> = {
  C: 1,
  mC: 1e-3,
  µC: 1e-6,
  nC: 1e-9,
};

const ENERGY_TO_JOULES: Record<EnergyUnit, number> = {
  J: 1,
  mJ: 1e-3,
  µJ: 1e-6,
};

// Convert to base units
export const toFarads = (value: number, unit: CapacitanceUnit): number => {
  return value * CAPACITANCE_TO_FARADS[unit];
};

export const toVolts = (value: number, unit: VoltageUnit): number => {
  return value * VOLTAGE_TO_VOLTS[unit];
};

export const toCoulombs = (value: number, unit: ChargeUnit): number => {
  return value * CHARGE_TO_COULOMBS[unit];
};

export const toJoules = (value: number, unit: EnergyUnit): number => {
  return value * ENERGY_TO_JOULES[unit];
};

// Convert from base units
export const fromFarads = (value: number): { unit: string; value: string }[] => {
  return [
    { unit: "F", value: formatNumber(value) },
    { unit: "mF", value: formatNumber(value / 1e-3) },
    { unit: "µF", value: formatNumber(value / 1e-6) },
    { unit: "nF", value: formatNumber(value / 1e-9) },
    { unit: "pF", value: formatNumber(value / 1e-12) },
  ].filter(item => {
    const num = parseFloat(item.value);
    return num >= 0.001 && num < 10000;
  });
};

export const fromVolts = (value: number): { unit: string; value: string }[] => {
  return [
    { unit: "V", value: formatNumber(value) },
    { unit: "mV", value: formatNumber(value / 1e-3) },
    { unit: "kV", value: formatNumber(value / 1e3) },
  ].filter(item => {
    const num = parseFloat(item.value);
    return num >= 0.001 && num < 10000;
  });
};

export const fromCoulombs = (value: number): { unit: string; value: string }[] => {
  return [
    { unit: "C", value: formatNumber(value) },
    { unit: "mC", value: formatNumber(value / 1e-3) },
    { unit: "µC", value: formatNumber(value / 1e-6) },
    { unit: "nC", value: formatNumber(value / 1e-9) },
  ].filter(item => {
    const num = parseFloat(item.value);
    return num >= 0.001 && num < 10000;
  });
};

export const fromJoules = (value: number): { unit: string; value: string }[] => {
  return [
    { unit: "J", value: formatNumber(value) },
    { unit: "mJ", value: formatNumber(value / 1e-3) },
    { unit: "µJ", value: formatNumber(value / 1e-6) },
  ].filter(item => {
    const num = parseFloat(item.value);
    return num >= 0.001 && num < 10000;
  });
};

// Format number with appropriate precision
export const formatNumber = (num: number, decimals: number = 6): string => {
  if (num === 0) return "0";
  
  const absNum = Math.abs(num);
  
  // Use scientific notation for very large or very small numbers
  if (absNum < 1e-6 || absNum >= 1e6) {
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
      case "charge":
        return calculateCharge(input);
      case "capacitance":
        return calculateCapacitance(input);
      case "voltage":
        return calculateVoltage(input);
      case "energy":
        return calculateEnergy(input);
      default:
        return null;
    }
  } catch (error) {
    return null;
  }
};

// Calculate Charge: Q = C × V
const calculateCharge = (input: CalculationInput): CalculationResult => {
  const { capacitance, capacitanceUnit, voltage, voltageUnit } = input;
  
  if (!capacitance || !voltage || !capacitanceUnit || !voltageUnit) {
    throw new Error("Missing required inputs");
  }

  const C = toFarads(capacitance, capacitanceUnit);
  const V = toVolts(voltage, voltageUnit);
  const Q = C * V;

  const steps = [
    `Q = C × V`,
    `Q = ${formatNumber(C)} F × ${formatNumber(V)} V`,
    `Q = ${formatNumber(Q)} C`,
  ];

  return {
    value: Q,
    unit: "C",
    formula: "Q = C × V",
    steps,
    conversions: fromCoulombs(Q),
  };
};

// Calculate Capacitance: C = Q ÷ V
const calculateCapacitance = (input: CalculationInput): CalculationResult => {
  const { charge, chargeUnit, voltage, voltageUnit } = input;
  
  if (!charge || !voltage || !chargeUnit || !voltageUnit) {
    throw new Error("Missing required inputs");
  }

  if (voltage === 0) {
    throw new Error("Voltage cannot be zero");
  }

  const Q = toCoulombs(charge, chargeUnit);
  const V = toVolts(voltage, voltageUnit);
  const C = Q / V;

  const steps = [
    `C = Q ÷ V`,
    `C = ${formatNumber(Q)} C ÷ ${formatNumber(V)} V`,
    `C = ${formatNumber(C)} F`,
  ];

  return {
    value: C,
    unit: "F",
    formula: "C = Q ÷ V",
    steps,
    conversions: fromFarads(C),
  };
};

// Calculate Voltage: V = Q ÷ C
const calculateVoltage = (input: CalculationInput): CalculationResult => {
  const { charge, chargeUnit, capacitance, capacitanceUnit } = input;
  
  if (!charge || !capacitance || !chargeUnit || !capacitanceUnit) {
    throw new Error("Missing required inputs");
  }

  if (capacitance === 0) {
    throw new Error("Capacitance cannot be zero");
  }

  const Q = toCoulombs(charge, chargeUnit);
  const C = toFarads(capacitance, capacitanceUnit);
  const V = Q / C;

  const steps = [
    `V = Q ÷ C`,
    `V = ${formatNumber(Q)} C ÷ ${formatNumber(C)} F`,
    `V = ${formatNumber(V)} V`,
  ];

  return {
    value: V,
    unit: "V",
    formula: "V = Q ÷ C",
    steps,
    conversions: fromVolts(V),
  };
};

// Calculate Energy: E = ½ × C × V²
const calculateEnergy = (input: CalculationInput): CalculationResult => {
  const { capacitance, capacitanceUnit, voltage, voltageUnit } = input;
  
  if (!capacitance || !voltage || !capacitanceUnit || !voltageUnit) {
    throw new Error("Missing required inputs");
  }

  const C = toFarads(capacitance, capacitanceUnit);
  const V = toVolts(voltage, voltageUnit);
  const E = 0.5 * C * V * V;

  const steps = [
    `E = ½ × C × V²`,
    `E = 0.5 × ${formatNumber(C)} F × (${formatNumber(V)} V)²`,
    `E = 0.5 × ${formatNumber(C)} × ${formatNumber(V * V)}`,
    `E = ${formatNumber(E)} J`,
  ];

  return {
    value: E,
    unit: "J",
    formula: "E = ½ × C × V²",
    steps,
    conversions: fromJoules(E),
  };
};

// Validation
export const validateInput = (input: CalculationInput): string | null => {
  const { mode, capacitance, voltage, charge } = input;

  switch (mode) {
    case "charge":
      if (!capacitance || capacitance <= 0) return "Capacitance must be greater than 0";
      if (!voltage || voltage <= 0) return "Voltage must be greater than 0";
      break;
    case "capacitance":
      if (!charge || charge <= 0) return "Charge must be greater than 0";
      if (!voltage || voltage <= 0) return "Voltage must be greater than 0";
      break;
    case "voltage":
      if (!charge || charge <= 0) return "Charge must be greater than 0";
      if (!capacitance || capacitance <= 0) return "Capacitance must be greater than 0";
      break;
    case "energy":
      if (!capacitance || capacitance <= 0) return "Capacitance must be greater than 0";
      if (!voltage || voltage <= 0) return "Voltage must be greater than 0";
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
const HISTORY_KEY = "capacitor-calculator-history";
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
  let text = "Capacitor Calculator Result\n";
  text += "=".repeat(40) + "\n\n";
  text += `Mode: ${getModeLabel(mode)}\n\n`;
  
  text += "Inputs:\n";
  if (input.capacitance) text += `  Capacitance: ${input.capacitance} ${input.capacitanceUnit}\n`;
  if (input.voltage) text += `  Voltage: ${input.voltage} ${input.voltageUnit}\n`;
  if (input.charge) text += `  Charge: ${input.charge} ${input.chargeUnit}\n`;
  if (input.energy) text += `  Energy: ${input.energy} ${input.energyUnit}\n`;
  
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
    charge: "Calculate Charge (Q)",
    capacitance: "Calculate Capacitance (C)",
    voltage: "Calculate Voltage (V)",
    energy: "Calculate Energy (E)",
  };
  return labels[mode];
};

// Example presets
export const EXAMPLE_PRESETS = {
  charge: { capacitance: 100, capacitanceUnit: "µF" as CapacitanceUnit, voltage: 12, voltageUnit: "V" as VoltageUnit },
  capacitance: { charge: 50, chargeUnit: "µC" as ChargeUnit, voltage: 5, voltageUnit: "V" as VoltageUnit },
  voltage: { charge: 0.002, chargeUnit: "C" as ChargeUnit, capacitance: 200, capacitanceUnit: "µF" as CapacitanceUnit },
  energy: { capacitance: 100, capacitanceUnit: "µF" as CapacitanceUnit, voltage: 12, voltageUnit: "V" as VoltageUnit },
};

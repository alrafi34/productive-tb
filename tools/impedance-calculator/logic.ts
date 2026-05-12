import {
  ResistanceUnit,
  CalculationInput,
  CalculationResult,
  HistoryEntry,
} from "./types";

// Unit conversion map
const RESISTANCE_TO_OHMS: Record<ResistanceUnit, number> = {
  "Ω": 1,
  "kΩ": 1000,
  "MΩ": 1000000,
};

// Convert to base units (Ohms)
export const toOhms = (value: number, unit: ResistanceUnit): number => {
  return value * RESISTANCE_TO_OHMS[unit];
};

// Format number with appropriate precision
export const formatNumber = (num: number, decimals: number = 4): string => {
  if (num === 0) return "0";
  
  const absNum = Math.abs(num);
  
  // Use scientific notation for very large numbers
  if (absNum >= 1e6) {
    return num.toExponential(3);
  }
  
  // Otherwise use fixed decimal
  const str = num.toFixed(decimals);
  // Remove trailing zeros
  return parseFloat(str).toString();
};

// Calculate impedance: Z = √(R² + (XL - XC)²)
export const calculateImpedance = (input: CalculationInput): CalculationResult => {
  const { resistance, resistanceUnit, inductiveReactance, inductiveReactanceUnit, capacitiveReactance, capacitiveReactanceUnit } = input;
  
  // Convert to base units (Ohms)
  const R = toOhms(resistance, resistanceUnit);
  const XL = toOhms(inductiveReactance, inductiveReactanceUnit);
  const XC = toOhms(capacitiveReactance, capacitiveReactanceUnit);
  
  // Calculate net reactance
  const X = XL - XC;
  
  // Calculate impedance: Z = √(R² + X²)
  const Z = Math.sqrt(R * R + X * X);
  
  // Calculate phase angle: θ = arctan(X/R)
  const phaseAngleRad = Math.atan2(X, R);
  const phaseAngle = (phaseAngleRad * 180) / Math.PI;
  
  // Determine circuit type
  let circuitType: "Inductive" | "Capacitive" | "Resistive" | "Resonant";
  if (Math.abs(X) < 0.001) {
    circuitType = "Resonant";
  } else if (X > 0) {
    circuitType = "Inductive";
  } else if (X < 0) {
    circuitType = "Capacitive";
  } else {
    circuitType = "Resistive";
  }
  
  // Generate steps
  const steps = [
    `Given: R = ${formatNumber(R)} Ω, XL = ${formatNumber(XL)} Ω, XC = ${formatNumber(XC)} Ω`,
    ``,
    `Step 1: Calculate net reactance`,
    `X = XL - XC`,
    `X = ${formatNumber(XL)} - ${formatNumber(XC)}`,
    `X = ${formatNumber(X)} Ω`,
    ``,
    `Step 2: Calculate impedance`,
    `Z = √(R² + X²)`,
    `Z = √(${formatNumber(R)}² + ${formatNumber(X)}²)`,
    `Z = √(${formatNumber(R * R)} + ${formatNumber(X * X)})`,
    `Z = √${formatNumber(R * R + X * X)}`,
    `Z = ${formatNumber(Z)} Ω`,
    ``,
    `Step 3: Calculate phase angle`,
    `θ = arctan(X/R)`,
    `θ = arctan(${formatNumber(X)}/${formatNumber(R)})`,
    `θ = ${formatNumber(phaseAngle, 2)}°`,
  ];
  
  return {
    impedance: Z,
    netReactance: X,
    resistance: R,
    inductiveReactance: XL,
    capacitiveReactance: XC,
    phaseAngle,
    circuitType,
    formula: "Z = √(R² + (XL - XC)²)",
    steps,
  };
};

// Validate input
export const validateInput = (input: CalculationInput): string | null => {
  const { resistance, inductiveReactance, capacitiveReactance } = input;
  
  if (resistance < 0) {
    return "Resistance cannot be negative";
  }
  
  if (inductiveReactance < 0) {
    return "Inductive reactance cannot be negative";
  }
  
  if (capacitiveReactance < 0) {
    return "Capacitive reactance cannot be negative";
  }
  
  if (resistance === 0 && inductiveReactance === 0 && capacitiveReactance === 0) {
    return "At least one value must be greater than 0";
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
const HISTORY_KEY = "impedance-calculator-history";
const MAX_HISTORY = 10;

export const saveToHistory = (input: CalculationInput, result: CalculationResult): void => {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `calc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
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
export const exportToText = (input: CalculationInput, result: CalculationResult): string => {
  let text = "Impedance Calculator Result\n";
  text += "=".repeat(40) + "\n\n";
  
  text += "Inputs:\n";
  text += `  Resistance (R): ${input.resistance} ${input.resistanceUnit}\n`;
  text += `  Inductive Reactance (XL): ${input.inductiveReactance} ${input.inductiveReactanceUnit}\n`;
  text += `  Capacitive Reactance (XC): ${input.capacitiveReactance} ${input.capacitiveReactanceUnit}\n\n`;
  
  text += `Formula: ${result.formula}\n\n`;
  
  text += "Calculation Steps:\n";
  result.steps.forEach((step) => {
    text += `${step}\n`;
  });
  
  text += `\nResults:\n`;
  text += `  Impedance (Z): ${formatNumber(result.impedance)} Ω\n`;
  text += `  Net Reactance (X): ${formatNumber(result.netReactance)} Ω\n`;
  text += `  Phase Angle (θ): ${formatNumber(result.phaseAngle, 2)}°\n`;
  text += `  Circuit Type: ${result.circuitType}\n`;
  
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

// Common presets
export const COMMON_PRESETS = [
  { 
    label: "Basic Series RL Circuit", 
    resistance: 10, 
    resistanceUnit: "Ω" as ResistanceUnit, 
    inductiveReactance: 5, 
    inductiveReactanceUnit: "Ω" as ResistanceUnit, 
    capacitiveReactance: 0, 
    capacitiveReactanceUnit: "Ω" as ResistanceUnit 
  },
  { 
    label: "Basic Series RC Circuit", 
    resistance: 8, 
    resistanceUnit: "Ω" as ResistanceUnit, 
    inductiveReactance: 0, 
    inductiveReactanceUnit: "Ω" as ResistanceUnit, 
    capacitiveReactance: 6, 
    capacitiveReactanceUnit: "Ω" as ResistanceUnit 
  },
  { 
    label: "Series RLC Circuit", 
    resistance: 5, 
    resistanceUnit: "Ω" as ResistanceUnit, 
    inductiveReactance: 12, 
    inductiveReactanceUnit: "Ω" as ResistanceUnit, 
    capacitiveReactance: 4, 
    capacitiveReactanceUnit: "Ω" as ResistanceUnit 
  },
  { 
    label: "Resonant Circuit", 
    resistance: 10, 
    resistanceUnit: "Ω" as ResistanceUnit, 
    inductiveReactance: 15, 
    inductiveReactanceUnit: "Ω" as ResistanceUnit, 
    capacitiveReactance: 15, 
    capacitiveReactanceUnit: "Ω" as ResistanceUnit 
  },
  { 
    label: "High Impedance Circuit", 
    resistance: 1, 
    resistanceUnit: "kΩ" as ResistanceUnit, 
    inductiveReactance: 500, 
    inductiveReactanceUnit: "Ω" as ResistanceUnit, 
    capacitiveReactance: 200, 
    capacitiveReactanceUnit: "Ω" as ResistanceUnit 
  },
  { 
    label: "Purely Resistive", 
    resistance: 50, 
    resistanceUnit: "Ω" as ResistanceUnit, 
    inductiveReactance: 0, 
    inductiveReactanceUnit: "Ω" as ResistanceUnit, 
    capacitiveReactance: 0, 
    capacitiveReactanceUnit: "Ω" as ResistanceUnit 
  },
];

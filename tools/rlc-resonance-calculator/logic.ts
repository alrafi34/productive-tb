import {
  ResistanceUnit,
  InductanceUnit,
  CapacitanceUnit,
  FrequencyUnit,
  CalculationInput,
  CalculationResult,
  FrequencyConversion,
  HistoryEntry,
} from "./types";

// Unit conversion functions
export function convertResistanceToOhms(value: number, unit: ResistanceUnit): number {
  switch (unit) {
    case "Ω":
      return value;
    case "kΩ":
      return value * 1e3;
    case "MΩ":
      return value * 1e6;
    default:
      return value;
  }
}

export function convertInductanceToHenries(value: number, unit: InductanceUnit): number {
  switch (unit) {
    case "H":
      return value;
    case "mH":
      return value * 1e-3;
    case "µH":
      return value * 1e-6;
    default:
      return value;
  }
}

export function convertCapacitanceToFarads(value: number, unit: CapacitanceUnit): number {
  switch (unit) {
    case "F":
      return value;
    case "mF":
      return value * 1e-3;
    case "µF":
      return value * 1e-6;
    case "nF":
      return value * 1e-9;
    case "pF":
      return value * 1e-12;
    default:
      return value;
  }
}

export function formatFrequency(hz: number): FrequencyConversion {
  if (hz >= 1e6) {
    return { value: formatNumber(hz / 1e6, 6), unit: "MHz" };
  } else if (hz >= 1e3) {
    return { value: formatNumber(hz / 1e3, 6), unit: "kHz" };
  } else {
    return { value: formatNumber(hz, 6), unit: "Hz" };
  }
}

export function formatNumber(value: number, decimals: number = 4): string {
  if (value === 0) return "0";
  if (!isFinite(value)) return "∞";
  
  // Use scientific notation for very large or very small numbers
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 0.0001 && Math.abs(value) > 0)) {
    return value.toExponential(decimals);
  }
  
  return value.toFixed(decimals).replace(/\.?0+$/, "");
}

// Validation
export function validateInput(input: CalculationInput): string | null {
  if (!input.inductance || input.inductance <= 0) {
    return "Inductance must be greater than 0";
  }
  if (!input.capacitance || input.capacitance <= 0) {
    return "Capacitance must be greater than 0";
  }
  if (!input.resistance || input.resistance < 0) {
    return "Resistance must be greater than or equal to 0";
  }
  return null;
}

// Main calculation function
export function calculateResonance(input: CalculationInput): CalculationResult {
  const resistanceOhms = convertResistanceToOhms(input.resistance, input.resistanceUnit);
  const inductanceHenries = convertInductanceToHenries(input.inductance, input.inductanceUnit);
  const capacitanceFarads = convertCapacitanceToFarads(input.capacitance, input.capacitanceUnit);
  
  // Calculate resonant frequency: f = 1 / (2π √(LC))
  const LC = inductanceHenries * capacitanceFarads;
  const sqrtLC = Math.sqrt(LC);
  const resonantFrequency = 1 / (2 * Math.PI * sqrtLC);
  
  // Format resonant frequency
  const resonantFrequencyFormatted = formatFrequency(resonantFrequency);
  
  // Generate conversions
  const conversions: FrequencyConversion[] = [
    { value: formatNumber(resonantFrequency, 6), unit: "Hz" },
    { value: formatNumber(resonantFrequency / 1e3, 6), unit: "kHz" },
    { value: formatNumber(resonantFrequency / 1e6, 6), unit: "MHz" },
  ];
  
  // Calculate impedance at resonance (for series RLC, Z = R)
  const impedance = resistanceOhms;
  
  // Calculate quality factor: Q = (1/R) × √(L/C)
  const qualityFactor = (1 / resistanceOhms) * Math.sqrt(inductanceHenries / capacitanceFarads);
  
  // Calculate bandwidth: BW = f₀ / Q
  const bandwidth = resonantFrequency / qualityFactor;
  
  // Generate formula and steps
  const formula = "f₀ = 1 / (2π √(LC))";
  const steps = [
    `R = ${input.resistance} ${input.resistanceUnit} = ${formatNumber(resistanceOhms, 2)} Ω`,
    `L = ${input.inductance} ${input.inductanceUnit} = ${formatNumber(inductanceHenries, 6)} H`,
    `C = ${input.capacitance} ${input.capacitanceUnit} = ${formatNumber(capacitanceFarads, 10)} F`,
    `LC = ${formatNumber(inductanceHenries, 6)} × ${formatNumber(capacitanceFarads, 10)} = ${formatNumber(LC, 12)}`,
    `√(LC) = ${formatNumber(sqrtLC, 8)}`,
    `2π√(LC) = ${formatNumber(2 * Math.PI * sqrtLC, 8)}`,
    `f₀ = 1 / ${formatNumber(2 * Math.PI * sqrtLC, 8)} = ${formatNumber(resonantFrequency, 2)} Hz`,
    `f₀ = ${resonantFrequencyFormatted.value} ${resonantFrequencyFormatted.unit}`,
  ];
  
  return {
    resonantFrequency,
    resonantFrequencyFormatted,
    resistanceOhms,
    inductanceHenries,
    capacitanceFarads,
    conversions,
    formula,
    steps,
    impedance,
    qualityFactor,
    bandwidth,
  };
}

// Presets
export const COMMON_PRESETS = [
  {
    label: "Audio Filter (159 Hz)",
    resistance: 10,
    resistanceUnit: "Ω" as ResistanceUnit,
    inductance: 10,
    inductanceUnit: "mH" as InductanceUnit,
    capacitance: 100,
    capacitanceUnit: "µF" as CapacitanceUnit,
  },
  {
    label: "RF Circuit (5 kHz)",
    resistance: 5,
    resistanceUnit: "Ω" as ResistanceUnit,
    inductance: 1,
    inductanceUnit: "mH" as InductanceUnit,
    capacitance: 1,
    capacitanceUnit: "µF" as CapacitanceUnit,
  },
  {
    label: "Power Supply (71 Hz)",
    resistance: 50,
    resistanceUnit: "Ω" as ResistanceUnit,
    inductance: 500,
    inductanceUnit: "mH" as InductanceUnit,
    capacitance: 10,
    capacitanceUnit: "µF" as CapacitanceUnit,
  },
  {
    label: "High Frequency (1.59 MHz)",
    resistance: 50,
    resistanceUnit: "Ω" as ResistanceUnit,
    inductance: 10,
    inductanceUnit: "µH" as InductanceUnit,
    capacitance: 1,
    capacitanceUnit: "nF" as CapacitanceUnit,
  },
  {
    label: "LC Tank (503 kHz)",
    resistance: 10,
    resistanceUnit: "Ω" as ResistanceUnit,
    inductance: 100,
    inductanceUnit: "µH" as InductanceUnit,
    capacitance: 1,
    capacitanceUnit: "nF" as CapacitanceUnit,
  },
  {
    label: "Tuned Circuit (159 kHz)",
    resistance: 100,
    resistanceUnit: "Ω" as ResistanceUnit,
    inductance: 1,
    inductanceUnit: "mH" as InductanceUnit,
    capacitance: 1,
    capacitanceUnit: "nF" as CapacitanceUnit,
  },
];

// History management
const HISTORY_KEY = "rlc-resonance-history";
const MAX_HISTORY = 20;

export function saveToHistory(input: CalculationInput, result: CalculationResult): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    input,
    result,
  };
  
  history.unshift(entry);
  
  if (history.length > MAX_HISTORY) {
    history.splice(MAX_HISTORY);
  }
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

// Export functions
export function exportToText(input: CalculationInput, result: CalculationResult): string {
  const lines = [
    "RLC RESONANCE CALCULATION",
    "=" .repeat(50),
    "",
    "INPUT VALUES:",
    `Resistance: ${input.resistance} ${input.resistanceUnit} (${formatNumber(result.resistanceOhms, 2)} Ω)`,
    `Inductance: ${input.inductance} ${input.inductanceUnit} (${formatNumber(result.inductanceHenries, 6)} H)`,
    `Capacitance: ${input.capacitance} ${input.capacitanceUnit} (${formatNumber(result.capacitanceFarads, 10)} F)`,
    "",
    "FORMULA:",
    result.formula,
    "",
    "CALCULATION STEPS:",
    ...result.steps.map((step, idx) => `${idx + 1}. ${step}`),
    "",
    "RESULT:",
    `Resonant Frequency (f₀) = ${result.resonantFrequencyFormatted.value} ${result.resonantFrequencyFormatted.unit}`,
    "",
    "FREQUENCY CONVERSIONS:",
    ...result.conversions.map(conv => `  ${conv.value} ${conv.unit}`),
    "",
    "CIRCUIT CHARACTERISTICS:",
    `  Impedance at Resonance: ${formatNumber(result.impedance, 2)} Ω`,
    `  Quality Factor (Q): ${formatNumber(result.qualityFactor, 2)}`,
    `  Bandwidth (BW): ${formatNumber(result.bandwidth, 2)} Hz`,
    "",
    "=" .repeat(50),
    `Generated: ${new Date().toLocaleString()}`,
  ];
  
  return lines.join("\n");
}

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

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

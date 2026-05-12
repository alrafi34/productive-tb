import {
  ResistanceUnit,
  CapacitanceUnit,
  TimeUnit,
  CalculationInput,
  CalculationResult,
  TimeConversion,
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

export function formatTime(seconds: number): TimeConversion {
  if (seconds >= 1) {
    return { value: formatNumber(seconds, 6), unit: "s" };
  } else if (seconds >= 1e-3) {
    return { value: formatNumber(seconds * 1e3, 6), unit: "ms" };
  } else if (seconds >= 1e-6) {
    return { value: formatNumber(seconds * 1e6, 6), unit: "µs" };
  } else {
    return { value: formatNumber(seconds * 1e9, 6), unit: "ns" };
  }
}

export function formatNumber(value: number, decimals: number = 4): string {
  if (value === 0) return "0";
  
  // Use scientific notation for very large or very small numbers
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 0.0001 && Math.abs(value) > 0)) {
    return value.toExponential(decimals);
  }
  
  return value.toFixed(decimals).replace(/\.?0+$/, "");
}

// Validation
export function validateInput(input: CalculationInput): string | null {
  if (!input.resistance || input.resistance <= 0) {
    return "Resistance must be greater than 0";
  }
  if (!input.capacitance || input.capacitance <= 0) {
    return "Capacitance must be greater than 0";
  }
  return null;
}

// Main calculation function
export function calculateTimeConstant(input: CalculationInput): CalculationResult {
  const resistanceOhms = convertResistanceToOhms(input.resistance, input.resistanceUnit);
  const capacitanceFarads = convertCapacitanceToFarads(input.capacitance, input.capacitanceUnit);
  
  // Calculate time constant: τ = R × C
  const timeConstant = resistanceOhms * capacitanceFarads;
  
  // Format time constant
  const timeConstantFormatted = formatTime(timeConstant);
  
  // Generate conversions
  const conversions: TimeConversion[] = [
    { value: formatNumber(timeConstant, 6), unit: "s" },
    { value: formatNumber(timeConstant * 1e3, 6), unit: "ms" },
    { value: formatNumber(timeConstant * 1e6, 6), unit: "µs" },
    { value: formatNumber(timeConstant * 1e9, 6), unit: "ns" },
  ];
  
  // Calculate charge/discharge percentages
  const chargePercentages = [
    { percentage: 63.2, timeConstants: "1τ", multiplier: 1 },
    { percentage: 86.5, timeConstants: "2τ", multiplier: 2 },
    { percentage: 95.0, timeConstants: "3τ", multiplier: 3 },
    { percentage: 98.2, timeConstants: "4τ", multiplier: 4 },
    { percentage: 99.3, timeConstants: "5τ", multiplier: 5 },
  ].map(item => {
    const time = timeConstant * item.multiplier;
    return {
      percentage: item.percentage,
      time,
      timeFormatted: formatTime(time),
      timeConstants: item.timeConstants,
    };
  });
  
  // Generate formula and steps
  const formula = "τ = R × C";
  const steps = [
    `R = ${input.resistance} ${input.resistanceUnit} = ${formatNumber(resistanceOhms, 2)} Ω`,
    `C = ${input.capacitance} ${input.capacitanceUnit} = ${formatNumber(capacitanceFarads, 10)} F`,
    `τ = ${formatNumber(resistanceOhms, 2)} × ${formatNumber(capacitanceFarads, 10)}`,
    `τ = ${formatNumber(timeConstant, 6)} seconds`,
    `τ = ${timeConstantFormatted.value} ${timeConstantFormatted.unit}`,
  ];
  
  return {
    timeConstant,
    timeConstantFormatted,
    resistanceOhms,
    capacitanceFarads,
    conversions,
    formula,
    steps,
    chargePercentages,
  };
}

// Presets
export const COMMON_PRESETS = [
  {
    label: "Standard RC Filter",
    resistance: 10,
    resistanceUnit: "kΩ" as ResistanceUnit,
    capacitance: 10,
    capacitanceUnit: "µF" as CapacitanceUnit,
  },
  {
    label: "Fast Response",
    resistance: 1,
    resistanceUnit: "kΩ" as ResistanceUnit,
    capacitance: 1,
    capacitanceUnit: "µF" as CapacitanceUnit,
  },
  {
    label: "Slow Response",
    resistance: 100,
    resistanceUnit: "kΩ" as ResistanceUnit,
    capacitance: 100,
    capacitanceUnit: "µF" as CapacitanceUnit,
  },
  {
    label: "Audio Coupling",
    resistance: 10,
    resistanceUnit: "kΩ" as ResistanceUnit,
    capacitance: 1,
    capacitanceUnit: "µF" as CapacitanceUnit,
  },
  {
    label: "Power Supply Filter",
    resistance: 100,
    resistanceUnit: "Ω" as ResistanceUnit,
    capacitance: 1000,
    capacitanceUnit: "µF" as CapacitanceUnit,
  },
  {
    label: "High Frequency",
    resistance: 1,
    resistanceUnit: "kΩ" as ResistanceUnit,
    capacitance: 100,
    capacitanceUnit: "pF" as CapacitanceUnit,
  },
];

// History management
const HISTORY_KEY = "rc-time-constant-history";
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
    "RC TIME CONSTANT CALCULATION",
    "=" .repeat(50),
    "",
    "INPUT VALUES:",
    `Resistance: ${input.resistance} ${input.resistanceUnit} (${formatNumber(result.resistanceOhms, 2)} Ω)`,
    `Capacitance: ${input.capacitance} ${input.capacitanceUnit} (${formatNumber(result.capacitanceFarads, 10)} F)`,
    "",
    "FORMULA:",
    result.formula,
    "",
    "CALCULATION STEPS:",
    ...result.steps.map((step, idx) => `${idx + 1}. ${step}`),
    "",
    "RESULT:",
    `Time Constant (τ) = ${result.timeConstantFormatted.value} ${result.timeConstantFormatted.unit}`,
    "",
    "TIME CONVERSIONS:",
    ...result.conversions.map(conv => `  ${conv.value} ${conv.unit}`),
    "",
    "CHARGING/DISCHARGING TIMES:",
    ...result.chargePercentages.map(cp => 
      `  ${cp.percentage}% (${cp.timeConstants}): ${cp.timeFormatted.value} ${cp.timeFormatted.unit}`
    ),
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

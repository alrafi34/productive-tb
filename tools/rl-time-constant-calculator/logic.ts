import {
  ResistanceUnit,
  InductanceUnit,
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
  if (!input.inductance || input.inductance <= 0) {
    return "Inductance must be greater than 0";
  }
  if (!input.resistance || input.resistance <= 0) {
    return "Resistance must be greater than 0";
  }
  return null;
}

// Main calculation function
export function calculateTimeConstant(input: CalculationInput): CalculationResult {
  const inductanceHenries = convertInductanceToHenries(input.inductance, input.inductanceUnit);
  const resistanceOhms = convertResistanceToOhms(input.resistance, input.resistanceUnit);
  
  // Calculate time constant: τ = L / R
  const timeConstant = inductanceHenries / resistanceOhms;
  
  // Format time constant
  const timeConstantFormatted = formatTime(timeConstant);
  
  // Generate conversions
  const conversions: TimeConversion[] = [
    { value: formatNumber(timeConstant, 6), unit: "s" },
    { value: formatNumber(timeConstant * 1e3, 6), unit: "ms" },
    { value: formatNumber(timeConstant * 1e6, 6), unit: "µs" },
    { value: formatNumber(timeConstant * 1e9, 6), unit: "ns" },
  ];
  
  // Calculate current rise/decay percentages
  const currentPercentages = [
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
  const formula = "τ = L / R";
  const steps = [
    `L = ${input.inductance} ${input.inductanceUnit} = ${formatNumber(inductanceHenries, 6)} H`,
    `R = ${input.resistance} ${input.resistanceUnit} = ${formatNumber(resistanceOhms, 2)} Ω`,
    `τ = ${formatNumber(inductanceHenries, 6)} / ${formatNumber(resistanceOhms, 2)}`,
    `τ = ${formatNumber(timeConstant, 6)} seconds`,
    `τ = ${timeConstantFormatted.value} ${timeConstantFormatted.unit}`,
  ];
  
  return {
    timeConstant,
    timeConstantFormatted,
    inductanceHenries,
    resistanceOhms,
    conversions,
    formula,
    steps,
    currentPercentages,
  };
}

// Presets
export const COMMON_PRESETS = [
  {
    label: "Standard RL Filter",
    inductance: 10,
    inductanceUnit: "mH" as InductanceUnit,
    resistance: 100,
    resistanceUnit: "Ω" as ResistanceUnit,
  },
  {
    label: "Fast Response",
    inductance: 1,
    inductanceUnit: "mH" as InductanceUnit,
    resistance: 1,
    resistanceUnit: "kΩ" as ResistanceUnit,
  },
  {
    label: "Slow Response",
    inductance: 1,
    inductanceUnit: "H" as InductanceUnit,
    resistance: 10,
    resistanceUnit: "Ω" as ResistanceUnit,
  },
  {
    label: "Power Supply Choke",
    inductance: 100,
    inductanceUnit: "mH" as InductanceUnit,
    resistance: 10,
    resistanceUnit: "Ω" as ResistanceUnit,
  },
  {
    label: "RF Circuit",
    inductance: 100,
    inductanceUnit: "µH" as InductanceUnit,
    resistance: 50,
    resistanceUnit: "Ω" as ResistanceUnit,
  },
  {
    label: "Motor Winding",
    inductance: 500,
    inductanceUnit: "mH" as InductanceUnit,
    resistance: 5,
    resistanceUnit: "Ω" as ResistanceUnit,
  },
];

// History management
const HISTORY_KEY = "rl-time-constant-history";
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
    "RL TIME CONSTANT CALCULATION",
    "=" .repeat(50),
    "",
    "INPUT VALUES:",
    `Inductance: ${input.inductance} ${input.inductanceUnit} (${formatNumber(result.inductanceHenries, 6)} H)`,
    `Resistance: ${input.resistance} ${input.resistanceUnit} (${formatNumber(result.resistanceOhms, 2)} Ω)`,
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
    "CURRENT RISE/DECAY TIMES:",
    ...result.currentPercentages.map(cp => 
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

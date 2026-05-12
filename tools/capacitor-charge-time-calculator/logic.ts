import {
  ResistanceUnit,
  CapacitanceUnit,
  ChargePercentage,
  CalculationInput,
  CalculationResult,
  HistoryEntry,
} from "./types";

const HISTORY_KEY = "capacitor-charge-time-history";
const MAX_HISTORY = 20;

// Unit conversion to base units
export function convertResistanceToOhms(value: number, unit: ResistanceUnit): number {
  switch (unit) {
    case "Ω": return value;
    case "kΩ": return value * 1000;
    case "MΩ": return value * 1000000;
  }
}

export function convertCapacitanceToFarads(value: number, unit: CapacitanceUnit): number {
  switch (unit) {
    case "F": return value;
    case "mF": return value * 1e-3;
    case "µF": return value * 1e-6;
    case "nF": return value * 1e-9;
    case "pF": return value * 1e-12;
  }
}

// Format time in appropriate units
export function formatTime(seconds: number): { value: number; unit: string } {
  if (seconds < 0.001) {
    return { value: seconds * 1e6, unit: "µs" };
  } else if (seconds < 1) {
    return { value: seconds * 1000, unit: "ms" };
  } else if (seconds < 60) {
    return { value: seconds, unit: "s" };
  } else if (seconds < 3600) {
    return { value: seconds / 60, unit: "min" };
  } else {
    return { value: seconds / 3600, unit: "hr" };
  }
}

// Main calculation function
export function calculateChargeTime(input: CalculationInput): CalculationResult {
  const R = convertResistanceToOhms(input.resistance, input.resistanceUnit);
  const C = convertCapacitanceToFarads(input.capacitance, input.capacitanceUnit);
  const percentage = input.targetPercentage / 100;

  // Calculate time constant (τ = R × C)
  const tau = R * C;

  // Calculate time to reach target percentage: t = -RC × ln(1 - percentage)
  const chargeTime = -tau * Math.log(1 - percentage);

  // Full charge time (~5τ for 99.3% charge)
  const fullChargeTime = 5 * tau;

  // Generate formula and steps
  const formula = "t = -RC × ln(1 - p)";
  const steps = [
    `τ (tau) = R × C = ${formatNumber(R)} Ω × ${formatNumber(C)} F = ${formatNumber(tau)} s`,
    `Target charge: ${input.targetPercentage}% = ${percentage}`,
    `t = -τ × ln(1 - ${percentage})`,
    `t = -${formatNumber(tau)} × ln(${formatNumber(1 - percentage)})`,
    `t = -${formatNumber(tau)} × ${formatNumber(Math.log(1 - percentage))}`,
    `t = ${formatNumber(chargeTime)} seconds`,
  ];

  // Generate conversions
  const conversions = [];
  
  // Time constant conversions
  const tauFormatted = formatTime(tau);
  conversions.push({
    unit: `Time Constant (τ)`,
    value: `${formatNumber(tauFormatted.value, 4)} ${tauFormatted.unit}`,
  });

  // Charge time conversions
  const chargeTimeFormatted = formatTime(chargeTime);
  conversions.push({
    unit: `Time to ${input.targetPercentage}%`,
    value: `${formatNumber(chargeTimeFormatted.value, 4)} ${chargeTimeFormatted.unit}`,
  });

  // Full charge time conversions
  const fullChargeFormatted = formatTime(fullChargeTime);
  conversions.push({
    unit: `Full Charge (~99.3%)`,
    value: `${formatNumber(fullChargeFormatted.value, 4)} ${fullChargeFormatted.unit}`,
  });

  return {
    timeConstant: tau,
    chargeTime,
    fullChargeTime,
    targetPercentage: input.targetPercentage,
    resistance: R,
    capacitance: C,
    formula,
    steps,
    conversions,
  };
}

// Validation
export function validateInput(input: CalculationInput): string | null {
  if (input.resistance <= 0) {
    return "Resistance must be greater than 0";
  }
  if (input.capacitance <= 0) {
    return "Capacitance must be greater than 0";
  }
  if (input.voltage !== undefined && input.voltage < 0) {
    return "Voltage cannot be negative";
  }
  return null;
}

// Number formatting
export function formatNumber(num: number, decimals: number = 6): string {
  if (Math.abs(num) < 0.000001) {
    return num.toExponential(2);
  }
  if (Math.abs(num) >= 1000000) {
    return num.toExponential(2);
  }
  
  // Remove trailing zeros
  const formatted = num.toFixed(decimals);
  return formatted.replace(/\.?0+$/, '');
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// History management
export function saveToHistory(input: CalculationInput, result: CalculationResult): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    input,
    result,
  };
  
  history.unshift(entry);
  const trimmed = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

// Export functionality
export function exportToText(input: CalculationInput, result: CalculationResult): string {
  const chargeTimeFormatted = formatTime(result.chargeTime);
  const tauFormatted = formatTime(result.timeConstant);
  const fullChargeFormatted = formatTime(result.fullChargeTime);
  
  return `Capacitor Charge Time Calculation
=====================================

Input Values:
- Resistance: ${input.resistance} ${input.resistanceUnit}
- Capacitance: ${input.capacitance} ${input.capacitanceUnit}
- Target Charge: ${input.targetPercentage}%

Results:
- Time Constant (τ): ${formatNumber(tauFormatted.value, 4)} ${tauFormatted.unit}
- Time to ${input.targetPercentage}%: ${formatNumber(chargeTimeFormatted.value, 4)} ${chargeTimeFormatted.unit}
- Full Charge Time: ${formatNumber(fullChargeFormatted.value, 4)} ${fullChargeFormatted.unit}

Formula: ${result.formula}

Calculation Steps:
${result.steps.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

Generated: ${new Date().toLocaleString()}
`;
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Common RC circuit presets
export const COMMON_PRESETS = [
  {
    label: "555 Timer (Standard)",
    resistance: 10,
    resistanceUnit: "kΩ" as ResistanceUnit,
    capacitance: 10,
    capacitanceUnit: "µF" as CapacitanceUnit,
    targetPercentage: 63 as ChargePercentage,
  },
  {
    label: "Audio Filter",
    resistance: 1,
    resistanceUnit: "kΩ" as ResistanceUnit,
    capacitance: 100,
    capacitanceUnit: "nF" as CapacitanceUnit,
    targetPercentage: 99 as ChargePercentage,
  },
  {
    label: "Power Supply",
    resistance: 100,
    resistanceUnit: "Ω" as ResistanceUnit,
    capacitance: 1000,
    capacitanceUnit: "µF" as CapacitanceUnit,
    targetPercentage: 95 as ChargePercentage,
  },
  {
    label: "Timing Circuit",
    resistance: 1,
    resistanceUnit: "MΩ" as ResistanceUnit,
    capacitance: 1,
    capacitanceUnit: "µF" as CapacitanceUnit,
    targetPercentage: 63 as ChargePercentage,
  },
];

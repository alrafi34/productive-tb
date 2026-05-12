import {
  CircuitBreakerInputs,
  CircuitBreakerResult,
  HistoryEntry,
  Preset,
  PowerUnit,
} from "./types";

const HISTORY_KEY = "circuit-breaker-calculator-history";
const MAX_HISTORY = 20;

// Standard breaker sizes in Amperes
export const STANDARD_BREAKER_SIZES = [
  6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400
];

// Continuous load safety factor (125% or 1.25)
const CONTINUOUS_LOAD_FACTOR = 1.25;

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Format number with specified decimal places
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Convert load to watts
function convertToWatts(load: number, unit: PowerUnit): number {
  return unit === 'kW' ? load * 1000 : load;
}

// Calculate circuit breaker size
export function calculateCircuitBreaker(inputs: CircuitBreakerInputs): CircuitBreakerResult {
  const loadWatts = convertToWatts(inputs.load, inputs.loadUnit);
  
  // Calculate current based on phase type
  let current: number;
  let formula: string;
  
  if (inputs.phaseType === 'single') {
    current = loadWatts / (inputs.voltage * inputs.powerFactor);
    formula = "I = P / (V × PF)";
  } else {
    // Three phase
    current = loadWatts / (Math.sqrt(3) * inputs.voltage * inputs.powerFactor);
    formula = "I = P / (√3 × V × PF)";
  }

  // Apply continuous load adjustment
  const adjustedCurrent = inputs.loadType === 'continuous' 
    ? current * CONTINUOUS_LOAD_FACTOR 
    : current;

  // Find recommended breaker size
  const recommendedBreaker = STANDARD_BREAKER_SIZES.find(size => size >= adjustedCurrent) || 
    STANDARD_BREAKER_SIZES[STANDARD_BREAKER_SIZES.length - 1];

  // Calculate safety margin
  const safetyMargin = ((recommendedBreaker - adjustedCurrent) / recommendedBreaker) * 100;
  const isSafe = safetyMargin >= 0;

  // Generate calculation steps
  const steps = [
    `${inputs.phaseType === 'single' ? 'Single' : 'Three'} Phase Circuit Breaker Calculation`,
    "",
    "Given:",
    `Load: ${inputs.load} ${inputs.loadUnit} = ${formatNumber(loadWatts, 2)} W`,
    `Voltage: ${inputs.voltage} V`,
    `Phase: ${inputs.phaseType === 'single' ? 'Single Phase' : 'Three Phase'}`,
    `Power Factor: ${inputs.powerFactor}`,
    `Load Type: ${inputs.loadType === 'continuous' ? 'Continuous' : 'Non-Continuous'}`,
    "",
    "Step 1: Calculate Current",
    `Formula: ${formula}`,
    inputs.phaseType === 'single' 
      ? `I = ${formatNumber(loadWatts, 2)} / (${inputs.voltage} × ${inputs.powerFactor})`
      : `I = ${formatNumber(loadWatts, 2)} / (√3 × ${inputs.voltage} × ${inputs.powerFactor})`,
    inputs.phaseType === 'single'
      ? `I = ${formatNumber(loadWatts, 2)} / ${formatNumber(inputs.voltage * inputs.powerFactor, 2)}`
      : `I = ${formatNumber(loadWatts, 2)} / ${formatNumber(Math.sqrt(3) * inputs.voltage * inputs.powerFactor, 2)}`,
    `I = ${formatNumber(current, 2)} A`,
    "",
  ];

  if (inputs.loadType === 'continuous') {
    steps.push(
      "Step 2: Apply Continuous Load Factor (125%)",
      `Adjusted Current = ${formatNumber(current, 2)} × 1.25`,
      `Adjusted Current = ${formatNumber(adjustedCurrent, 2)} A`,
      "",
      "Note: Continuous loads require 125% safety margin per NEC guidelines",
      ""
    );
  }

  steps.push(
    `Step ${inputs.loadType === 'continuous' ? '3' : '2'}: Select Standard Breaker Size`,
    `Required: ${formatNumber(adjustedCurrent, 2)} A`,
    `Recommended Breaker: ${recommendedBreaker} A`,
    `Safety Margin: ${formatNumber(safetyMargin, 2)}%`
  );

  // Generate warnings
  const warnings: string[] = [];
  
  if (safetyMargin < 10) {
    warnings.push("Low safety margin. Consider using a larger breaker or reducing the load.");
  }
  
  if (current > 80) {
    warnings.push("High current load. Ensure proper wire gauge and installation.");
  }
  
  if (inputs.powerFactor < 0.8) {
    warnings.push("Low power factor may require power factor correction.");
  }

  if (loadWatts > 10000 && inputs.phaseType === 'single') {
    warnings.push("Consider three-phase system for loads above 10kW.");
  }

  return {
    loadWatts,
    current,
    adjustedCurrent,
    recommendedBreaker,
    safetyMargin,
    isSafe,
    formula,
    steps,
    warnings,
  };
}

// Validation
export function validateInputs(inputs: CircuitBreakerInputs): string | null {
  if (inputs.load <= 0) return "Load must be greater than zero";
  if (isNaN(inputs.load)) return "Load must be a valid number";
  if (inputs.voltage <= 0) return "Voltage must be greater than zero";
  if (inputs.powerFactor <= 0 || inputs.powerFactor > 1) {
    return "Power factor must be between 0 and 1";
  }
  return null;
}

// Presets
export function getPresets(): Preset[] {
  return [
    {
      name: "Home Lighting Circuit",
      description: "Typical residential lighting",
      load: 1200,
      loadUnit: 'W',
      voltage: 230,
      phaseType: 'single',
      loadType: 'continuous',
      powerFactor: 1.0,
    },
    {
      name: "Air Conditioner (1.5 Ton)",
      description: "Residential AC unit",
      load: 2000,
      loadUnit: 'W',
      voltage: 230,
      phaseType: 'single',
      loadType: 'continuous',
      powerFactor: 0.9,
    },
    {
      name: "Electric Water Heater",
      description: "3kW water heater",
      load: 3,
      loadUnit: 'kW',
      voltage: 230,
      phaseType: 'single',
      loadType: 'continuous',
      powerFactor: 1.0,
    },
    {
      name: "Kitchen Appliances",
      description: "Mixed kitchen load",
      load: 4000,
      loadUnit: 'W',
      voltage: 230,
      phaseType: 'single',
      loadType: 'non-continuous',
      powerFactor: 0.95,
    },
    {
      name: "Small Motor (3-Phase)",
      description: "Industrial motor",
      load: 5.5,
      loadUnit: 'kW',
      voltage: 400,
      phaseType: 'three',
      loadType: 'continuous',
      powerFactor: 0.85,
    },
    {
      name: "Office Equipment",
      description: "Computers and printers",
      load: 2500,
      loadUnit: 'W',
      voltage: 230,
      phaseType: 'single',
      loadType: 'continuous',
      powerFactor: 0.9,
    },
  ];
}

// History management
export function saveToHistory(inputs: CircuitBreakerInputs, result: CircuitBreakerResult): void {
  if (typeof window === 'undefined') return;

  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    inputs,
    result,
  };

  const history = getHistory();
  history.unshift(entry);

  if (history.length > MAX_HISTORY) {
    history.splice(MAX_HISTORY);
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
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

// Export functions
export function exportToText(inputs: CircuitBreakerInputs, result: CircuitBreakerResult): string {
  let text = "Circuit Breaker Calculator - Calculation Report\n";
  text += "=".repeat(50) + "\n\n";
  text += `Date: ${new Date().toLocaleString()}\n\n`;

  text += "Input Parameters:\n";
  text += "-".repeat(50) + "\n";
  text += `Load: ${inputs.load} ${inputs.loadUnit} (${formatNumber(result.loadWatts, 2)} W)\n`;
  text += `Voltage: ${inputs.voltage} V\n`;
  text += `Phase Type: ${inputs.phaseType === 'single' ? 'Single Phase' : 'Three Phase'}\n`;
  text += `Load Type: ${inputs.loadType === 'continuous' ? 'Continuous' : 'Non-Continuous'}\n`;
  text += `Power Factor: ${inputs.powerFactor}\n`;

  text += "\nResults:\n";
  text += "-".repeat(50) + "\n";
  text += `Calculated Current: ${formatNumber(result.current, 2)} A\n`;
  text += `Adjusted Current: ${formatNumber(result.adjustedCurrent, 2)} A\n`;
  text += `Recommended Breaker: ${result.recommendedBreaker} A\n`;
  text += `Safety Margin: ${formatNumber(result.safetyMargin, 2)}%\n`;
  text += `Status: ${result.isSafe ? 'Safe' : 'Warning - Check Configuration'}\n`;

  if (result.warnings.length > 0) {
    text += "\nWarnings:\n";
    text += "-".repeat(50) + "\n";
    result.warnings.forEach((warning, index) => {
      text += `${index + 1}. ${warning}\n`;
    });
  }

  text += "\nCalculation Steps:\n";
  text += "-".repeat(50) + "\n";
  text += result.steps.join("\n");

  text += "\n\n" + "=".repeat(50) + "\n";
  text += "Generated by Circuit Breaker Calculator\n";
  text += "Note: Always consult local electrical codes and a licensed electrician.\n";

  return text;
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Get wire gauge recommendation (informational)
export function getWireGaugeRecommendation(current: number): string {
  if (current <= 15) return "14 AWG (1.5 mm²)";
  if (current <= 20) return "12 AWG (2.5 mm²)";
  if (current <= 30) return "10 AWG (4 mm²)";
  if (current <= 40) return "8 AWG (6 mm²)";
  if (current <= 55) return "6 AWG (10 mm²)";
  if (current <= 70) return "4 AWG (16 mm²)";
  if (current <= 95) return "2 AWG (25 mm²)";
  return "Consult electrical code for proper sizing";
}

import {
  RealPowerInputs,
  RealPowerResult,
  Preset,
  HistoryEntry,
} from "./types";

const HISTORY_KEY = "real-power-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate real power in AC circuits
 */
export function calculateRealPower(inputs: RealPowerInputs): RealPowerResult {
  const { voltage, current, powerFactor } = inputs;
  
  // Calculate real power: P = V × I × PF
  const realPower = voltage * current * powerFactor;
  
  // Calculate apparent power: S = V × I
  const apparentPower = voltage * current;
  
  // Calculate reactive power: Q = √(S² - P²)
  const reactivePower = Math.sqrt(Math.pow(apparentPower, 2) - Math.pow(realPower, 2));
  
  // Determine efficiency level
  let efficiency = "";
  if (powerFactor >= 0.95) {
    efficiency = "Excellent (≥0.95) - Highly efficient system";
  } else if (powerFactor >= 0.85) {
    efficiency = "Good (0.85-0.94) - Acceptable efficiency";
  } else if (powerFactor >= 0.7) {
    efficiency = "Fair (0.70-0.84) - Consider improvement";
  } else {
    efficiency = "Poor (<0.70) - Low efficiency, needs correction";
  }
  
  // Generate step-by-step calculation
  const steps = [
    `Step 1: Identify the given values`,
    `Voltage (V) = ${voltage} V`,
    `Current (I) = ${current} A`,
    `Power Factor (PF) = ${powerFactor}`,
    ``,
    `Step 2: Apply the real power formula`,
    `P = V × I × PF`,
    `P = ${voltage} × ${current} × ${powerFactor}`,
    `P = ${realPower.toFixed(4)} W`,
    ``,
    `Step 3: Calculate apparent power`,
    `S = V × I`,
    `S = ${voltage} × ${current}`,
    `S = ${apparentPower.toFixed(4)} VA`,
    ``,
    `Step 4: Calculate reactive power`,
    `Q = √(S² - P²)`,
    `Q = √(${apparentPower.toFixed(2)}² - ${realPower.toFixed(2)}²)`,
    `Q = ${reactivePower.toFixed(4)} VAR`,
  ];
  
  return {
    realPower,
    voltage,
    current,
    powerFactor,
    apparentPower,
    reactivePower,
    efficiency,
    steps,
    formula: "P = V × I × PF",
    timestamp: Date.now(),
  };
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: RealPowerInputs): string | null {
  const { voltage, current, powerFactor } = inputs;
  
  if (isNaN(voltage) || voltage <= 0) {
    return 'Voltage must be greater than 0';
  }
  
  if (isNaN(current) || current <= 0) {
    return 'Current must be greater than 0';
  }
  
  if (isNaN(powerFactor) || powerFactor < 0 || powerFactor > 1) {
    return 'Power factor must be between 0 and 1';
  }
  
  return null;
}

/**
 * Get preset configurations
 */
export function getPresets(): Preset[] {
  return [
    {
      name: 'Residential Load (230V)',
      description: 'Typical home electrical load',
      voltage: 230,
      current: 5,
      powerFactor: 0.8,
    },
    {
      name: 'Industrial Motor (400V)',
      description: 'Three-phase motor load',
      voltage: 400,
      current: 10,
      powerFactor: 0.85,
    },
    {
      name: 'Pure Resistive Load',
      description: 'Heater or incandescent lighting',
      voltage: 120,
      current: 10,
      powerFactor: 1,
    },
    {
      name: 'Fluorescent Lighting',
      description: 'Typical fluorescent lamp load',
      voltage: 230,
      current: 2,
      powerFactor: 0.6,
    },
    {
      name: 'Computer Equipment',
      description: 'Office computer and peripherals',
      voltage: 120,
      current: 3,
      powerFactor: 0.7,
    },
    {
      name: 'Air Conditioner',
      description: 'Residential AC unit',
      voltage: 230,
      current: 8,
      powerFactor: 0.75,
    },
  ];
}

/**
 * Format number with decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// History management
export function saveToHistory(input: RealPowerInputs, result: RealPowerResult): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    input,
    result,
  };
  
  history.unshift(entry);
  const trimmed = history.slice(0, MAX_HISTORY);
  
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load history:', e);
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
}

// Export functions
export function exportToText(input: RealPowerInputs, result: RealPowerResult): string {
  const lines = [
    "REAL POWER CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Voltage (V): ${result.voltage} V`,
    `Current (I): ${result.current} A`,
    `Power Factor (PF): ${result.powerFactor}`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Real Power (P): ${formatNumber(result.realPower, 4)} W`,
    `Apparent Power (S): ${formatNumber(result.apparentPower, 4)} VA`,
    `Reactive Power (Q): ${formatNumber(result.reactivePower, 4)} VAR`,
    "",
    "EFFICIENCY RATING:",
    "-".repeat(50),
    result.efficiency,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50),
  ];
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Real Power Calculator");
  
  return lines.join("\n");
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

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

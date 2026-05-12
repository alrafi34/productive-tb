import {
  ReactivePowerInputs,
  ReactivePowerResult,
  Preset,
  HistoryEntry,
} from "./types";

const HISTORY_KEY = "reactive-power-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate reactive power in AC circuits
 */
export function calculateReactivePower(inputs: ReactivePowerInputs): ReactivePowerResult {
  const { voltage, current, phaseAngle } = inputs;
  
  // Convert angle from degrees to radians
  const phaseAngleRadians = phaseAngle * (Math.PI / 180);
  
  // Calculate reactive power: Q = V × I × sin(θ)
  const reactivePower = voltage * current * Math.sin(phaseAngleRadians);
  
  // Convert to kVAR
  const reactivePowerKVAR = reactivePower / 1000;
  
  // Calculate apparent power: S = V × I
  const apparentPower = voltage * current;
  
  // Calculate real power: P = V × I × cos(θ)
  const realPower = voltage * current * Math.cos(phaseAngleRadians);
  
  // Calculate power factor
  const powerFactor = Math.cos(phaseAngleRadians);
  
  // Determine efficiency level
  let efficiency = "";
  if (phaseAngle === 0) {
    efficiency = "Pure Resistive Load (No reactive power)";
  } else if (phaseAngle <= 15) {
    efficiency = "Excellent (Low reactive power)";
  } else if (phaseAngle <= 30) {
    efficiency = "Good (Moderate reactive power)";
  } else if (phaseAngle <= 45) {
    efficiency = "Fair (Significant reactive power)";
  } else if (phaseAngle <= 60) {
    efficiency = "Poor (High reactive power)";
  } else {
    efficiency = "Very Poor (Predominantly reactive)";
  }
  
  // Generate step-by-step calculation
  const steps = [
    `Step 1: Identify the given values`,
    `Voltage (V) = ${voltage} V`,
    `Current (I) = ${current} A`,
    `Phase Angle (θ) = ${phaseAngle}°`,
    ``,
    `Step 2: Convert angle to radians`,
    `θ (radians) = ${phaseAngle}° × (π / 180)`,
    `θ (radians) = ${phaseAngleRadians.toFixed(6)} rad`,
    ``,
    `Step 3: Apply the reactive power formula`,
    `Q = V × I × sin(θ)`,
    `Q = ${voltage} × ${current} × sin(${phaseAngle}°)`,
    `Q = ${voltage} × ${current} × ${Math.sin(phaseAngleRadians).toFixed(6)}`,
    `Q = ${reactivePower.toFixed(4)} VAR`,
    ``,
    `Step 4: Convert to kVAR (optional)`,
    `Q = ${reactivePower.toFixed(4)} / 1000`,
    `Q = ${reactivePowerKVAR.toFixed(4)} kVAR`,
    ``,
    `Step 5: Calculate additional power components`,
    `Apparent Power (S) = V × I = ${apparentPower.toFixed(4)} VA`,
    `Real Power (P) = V × I × cos(θ) = ${realPower.toFixed(4)} W`,
    `Power Factor = cos(θ) = ${powerFactor.toFixed(4)}`,
  ];
  
  return {
    reactivePower,
    reactivePowerKVAR,
    voltage,
    current,
    phaseAngle,
    phaseAngleRadians,
    apparentPower,
    realPower,
    powerFactor,
    efficiency,
    steps,
    formula: "Q = V × I × sin(θ)",
    timestamp: Date.now(),
  };
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: ReactivePowerInputs): string | null {
  const { voltage, current, phaseAngle } = inputs;
  
  if (isNaN(voltage) || voltage <= 0) {
    return 'Voltage must be greater than 0';
  }
  
  if (isNaN(current) || current <= 0) {
    return 'Current must be greater than 0';
  }
  
  if (isNaN(phaseAngle) || phaseAngle < 0 || phaseAngle > 90) {
    return 'Phase angle must be between 0° and 90°';
  }
  
  return null;
}

/**
 * Get preset configurations
 */
export function getPresets(): Preset[] {
  return [
    {
      name: 'Example 1: Standard Load',
      description: '230V, 10A, 30° phase angle',
      voltage: 230,
      current: 10,
      phaseAngle: 30,
    },
    {
      name: 'Example 2: Industrial Motor',
      description: '400V, 5A, 45° phase angle',
      voltage: 400,
      current: 5,
      phaseAngle: 45,
    },
    {
      name: 'Example 3: Heavy Load',
      description: '220V, 15A, 60° phase angle',
      voltage: 220,
      current: 15,
      phaseAngle: 60,
    },
    {
      name: 'Residential Circuit',
      description: 'Typical home electrical load',
      voltage: 230,
      current: 8,
      phaseAngle: 25,
    },
    {
      name: 'Three-Phase Motor',
      description: 'Industrial motor application',
      voltage: 400,
      current: 12,
      phaseAngle: 35,
    },
    {
      name: 'Low Reactive Load',
      description: 'Minimal phase shift',
      voltage: 120,
      current: 10,
      phaseAngle: 15,
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
export function saveToHistory(input: ReactivePowerInputs, result: ReactivePowerResult): void {
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
export function exportToText(input: ReactivePowerInputs, result: ReactivePowerResult): string {
  const lines = [
    "REACTIVE POWER CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Voltage (V): ${result.voltage} V`,
    `Current (I): ${result.current} A`,
    `Phase Angle (θ): ${result.phaseAngle}°`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Reactive Power (Q): ${formatNumber(result.reactivePower, 4)} VAR`,
    `Reactive Power (Q): ${formatNumber(result.reactivePowerKVAR, 4)} kVAR`,
    `Apparent Power (S): ${formatNumber(result.apparentPower, 4)} VA`,
    `Real Power (P): ${formatNumber(result.realPower, 4)} W`,
    `Power Factor: ${formatNumber(result.powerFactor, 4)}`,
    `Phase Angle (radians): ${formatNumber(result.phaseAngleRadians, 6)} rad`,
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
  lines.push("Generated by Reactive Power Calculator");
  
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

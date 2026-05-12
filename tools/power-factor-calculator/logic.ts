import {
  PowerFactorInputs,
  PowerFactorResult,
  Preset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "power-factor-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate power factor and related values
 */
export function calculatePowerFactor(inputs: PowerFactorInputs): PowerFactorResult {
  const { realPower, apparentPower } = inputs;
  
  // Calculate power factor: PF = P / S
  let powerFactor = realPower / apparentPower;
  
  // Clamp between 0 and 1
  if (powerFactor > 1) powerFactor = 1;
  if (powerFactor < 0) powerFactor = 0;
  
  const powerFactorPercentage = powerFactor * 100;
  
  // Calculate reactive power: Q = √(S² - P²)
  const reactivePower = Math.sqrt(
    Math.pow(apparentPower, 2) - Math.pow(realPower, 2)
  );
  
  // Calculate phase angle: θ = arccos(PF)
  const phaseAngle = Math.acos(powerFactor) * (180 / Math.PI);
  
  // Determine efficiency rating
  let efficiency: "Excellent" | "Good" | "Fair" | "Poor";
  if (powerFactor >= 0.95) {
    efficiency = "Excellent";
  } else if (powerFactor >= 0.85) {
    efficiency = "Good";
  } else if (powerFactor >= 0.7) {
    efficiency = "Fair";
  } else {
    efficiency = "Poor";
  }
  
  // Generate step-by-step calculation
  const steps = [
    `Given Values:`,
    `Real Power (P) = ${formatNumber(realPower, 2)} kW`,
    `Apparent Power (S) = ${formatNumber(apparentPower, 2)} kVA`,
    ``,
    `Step 1: Calculate Power Factor`,
    `Power Factor (PF) = P / S`,
    `PF = ${formatNumber(realPower, 2)} / ${formatNumber(apparentPower, 2)}`,
    `PF = ${formatNumber(powerFactor, 4)}`,
    `PF = ${formatNumber(powerFactorPercentage, 2)}%`,
    ``,
    `Step 2: Calculate Reactive Power`,
    `Reactive Power (Q) = √(S² - P²)`,
    `Q = √(${formatNumber(apparentPower, 2)}² - ${formatNumber(realPower, 2)}²)`,
    `Q = √(${formatNumber(Math.pow(apparentPower, 2), 2)} - ${formatNumber(Math.pow(realPower, 2), 2)})`,
    `Q = √${formatNumber(Math.pow(apparentPower, 2) - Math.pow(realPower, 2), 2)}`,
    `Q = ${formatNumber(reactivePower, 4)} kVAR`,
    ``,
    `Step 3: Calculate Phase Angle`,
    `Phase Angle (θ) = arccos(PF)`,
    `θ = arccos(${formatNumber(powerFactor, 4)})`,
    `θ = ${formatNumber(phaseAngle, 2)}°`,
    ``,
    `Efficiency Rating: ${efficiency}`
  ];
  
  return {
    powerFactor,
    powerFactorPercentage,
    reactivePower,
    phaseAngle,
    efficiency,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: PowerFactorInputs): string | null {
  const { realPower, apparentPower } = inputs;
  
  if (isNaN(realPower) || realPower < 0) {
    return 'Real Power must be greater than or equal to 0';
  }
  
  if (isNaN(apparentPower) || apparentPower <= 0) {
    return 'Apparent Power must be greater than 0';
  }
  
  if (realPower > apparentPower) {
    return 'Real Power cannot exceed Apparent Power';
  }
  
  return null;
}

/**
 * Get preset configurations
 */
export function getPresets(): Preset[] {
  return [
    {
      name: 'Ideal System (PF = 1.0)',
      description: 'Perfect power factor, no reactive power',
      realPower: 10,
      apparentPower: 10
    },
    {
      name: 'Excellent System (PF = 0.95)',
      description: 'High efficiency industrial system',
      realPower: 9.5,
      apparentPower: 10
    },
    {
      name: 'Good System (PF = 0.85)',
      description: 'Typical commercial building',
      realPower: 8.5,
      apparentPower: 10
    },
    {
      name: 'Fair System (PF = 0.80)',
      description: 'Common industrial load',
      realPower: 5,
      apparentPower: 6.25
    },
    {
      name: 'Poor System (PF = 0.60)',
      description: 'Low efficiency, needs correction',
      realPower: 3,
      apparentPower: 5
    },
    {
      name: 'Very Poor System (PF = 0.50)',
      description: 'Heavily inductive load',
      realPower: 5,
      apparentPower: 10
    }
  ];
}

/**
 * Format number with decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

/**
 * Get efficiency color class
 */
export function getEfficiencyColor(powerFactor: number): string {
  if (powerFactor >= 0.9) return 'text-green-600';
  if (powerFactor >= 0.7) return 'text-yellow-600';
  return 'text-red-600';
}

/**
 * Get efficiency background color
 */
export function getEfficiencyBgColor(powerFactor: number): string {
  if (powerFactor >= 0.9) return 'bg-green-50 border-green-200';
  if (powerFactor >= 0.7) return 'bg-yellow-50 border-yellow-200';
  return 'bg-red-50 border-red-200';
}

// History management
export function saveToHistory(inputs: PowerFactorInputs, result: PowerFactorResult): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    inputs,
    result
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
export function exportToText(inputs: PowerFactorInputs, result: PowerFactorResult): string {
  const lines = [
    "POWER FACTOR CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Real Power (P): ${formatNumber(inputs.realPower, 2)} kW`,
    `Apparent Power (S): ${formatNumber(inputs.apparentPower, 2)} kVA`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Power Factor (PF): ${formatNumber(result.powerFactor, 4)}`,
    `Power Factor: ${formatNumber(result.powerFactorPercentage, 2)}%`,
    `Reactive Power (Q): ${formatNumber(result.reactivePower, 4)} kVAR`,
    `Phase Angle (θ): ${formatNumber(result.phaseAngle, 2)}°`,
    `Efficiency Rating: ${result.efficiency}`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50)
  ];
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Power Factor Calculator");
  
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

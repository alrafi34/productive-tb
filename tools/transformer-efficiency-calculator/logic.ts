import {
  CalculationMode,
  TransformerEfficiencyInputs,
  TransformerEfficiencyResult,
  Preset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "transformer-efficiency-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate transformer efficiency
 */
export function calculateTransformerEfficiency(inputs: TransformerEfficiencyInputs): TransformerEfficiencyResult {
  const { mode, inputPower, outputPower, losses, voltage, current, powerFactor } = inputs;
  
  let calculatedInputPower: number;
  let calculatedOutputPower: number;
  let calculatedLosses: number;
  let efficiency: number;
  const steps: string[] = [];
  
  steps.push(`Calculation Mode: ${getModeLabel(mode)}`);
  steps.push(`Given Values:`);
  
  if (mode === 'power') {
    // Mode 1: Input and Output Power provided
    steps.push(`Input Power = ${inputPower} W`);
    steps.push(`Output Power = ${outputPower} W`);
    steps.push(``);
    
    calculatedInputPower = inputPower;
    calculatedOutputPower = outputPower;
    calculatedLosses = inputPower - outputPower;
    
    steps.push(`Step 1: Calculate Losses`);
    steps.push(`Losses = Input Power - Output Power`);
    steps.push(`Losses = ${inputPower} - ${outputPower}`);
    steps.push(`Losses = ${formatNumber(calculatedLosses, 2)} W`);
    steps.push(``);
    
    steps.push(`Step 2: Calculate Efficiency`);
    steps.push(`Efficiency (η) = (Output Power / Input Power) × 100`);
    steps.push(`η = (${outputPower} / ${inputPower}) × 100`);
    
    efficiency = (outputPower / inputPower) * 100;
    steps.push(`η = ${formatNumber(efficiency, 2)}%`);
    
  } else if (mode === 'voltage-current') {
    // Mode 2: Voltage, Current, and Output Power provided
    steps.push(`Voltage = ${voltage} V`);
    steps.push(`Current = ${current} A`);
    steps.push(`Power Factor = ${powerFactor}`);
    steps.push(`Output Power = ${outputPower} W`);
    steps.push(``);
    
    // Calculate input power from V × I × PF
    calculatedInputPower = voltage * current * powerFactor;
    calculatedOutputPower = outputPower;
    calculatedLosses = calculatedInputPower - outputPower;
    
    steps.push(`Step 1: Calculate Input Power`);
    steps.push(`Input Power = Voltage × Current × Power Factor`);
    steps.push(`Input Power = ${voltage} × ${current} × ${powerFactor}`);
    steps.push(`Input Power = ${formatNumber(calculatedInputPower, 2)} W`);
    steps.push(``);
    
    steps.push(`Step 2: Calculate Losses`);
    steps.push(`Losses = Input Power - Output Power`);
    steps.push(`Losses = ${formatNumber(calculatedInputPower, 2)} - ${outputPower}`);
    steps.push(`Losses = ${formatNumber(calculatedLosses, 2)} W`);
    steps.push(``);
    
    steps.push(`Step 3: Calculate Efficiency`);
    steps.push(`Efficiency (η) = (Output Power / Input Power) × 100`);
    steps.push(`η = (${outputPower} / ${formatNumber(calculatedInputPower, 2)}) × 100`);
    
    efficiency = (outputPower / calculatedInputPower) * 100;
    steps.push(`η = ${formatNumber(efficiency, 2)}%`);
    
  } else {
    // Mode 3: Output Power and Losses provided
    steps.push(`Output Power = ${outputPower} W`);
    steps.push(`Losses = ${losses} W`);
    steps.push(``);
    
    calculatedOutputPower = outputPower;
    calculatedLosses = losses;
    calculatedInputPower = outputPower + losses;
    
    steps.push(`Step 1: Calculate Input Power`);
    steps.push(`Input Power = Output Power + Losses`);
    steps.push(`Input Power = ${outputPower} + ${losses}`);
    steps.push(`Input Power = ${formatNumber(calculatedInputPower, 2)} W`);
    steps.push(``);
    
    steps.push(`Step 2: Calculate Efficiency`);
    steps.push(`Efficiency (η) = (Output Power / Input Power) × 100`);
    steps.push(`η = (${outputPower} / ${formatNumber(calculatedInputPower, 2)}) × 100`);
    
    efficiency = (outputPower / calculatedInputPower) * 100;
    steps.push(`η = ${formatNumber(efficiency, 2)}%`);
  }
  
  const efficiencyRating = getEfficiencyRating(efficiency);
  
  return {
    efficiency,
    inputPower: calculatedInputPower,
    outputPower: calculatedOutputPower,
    losses: calculatedLosses,
    efficiencyRating,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Get mode label
 */
function getModeLabel(mode: CalculationMode): string {
  switch (mode) {
    case 'power':
      return 'Input & Output Power';
    case 'voltage-current':
      return 'Voltage & Current';
    case 'output-losses':
      return 'Output Power & Losses';
    default:
      return 'Unknown';
  }
}

/**
 * Get efficiency rating
 */
function getEfficiencyRating(efficiency: number): string {
  if (efficiency >= 98) return 'Excellent';
  if (efficiency >= 95) return 'Very Good';
  if (efficiency >= 90) return 'Good';
  if (efficiency >= 85) return 'Fair';
  if (efficiency >= 80) return 'Poor';
  return 'Very Poor';
}

/**
 * Get efficiency color
 */
export function getEfficiencyColor(efficiency: number): string {
  if (efficiency >= 95) return 'text-green-600';
  if (efficiency >= 90) return 'text-blue-600';
  if (efficiency >= 85) return 'text-yellow-600';
  if (efficiency >= 80) return 'text-orange-600';
  return 'text-red-600';
}

/**
 * Get efficiency background color
 */
export function getEfficiencyBgColor(efficiency: number): string {
  if (efficiency >= 95) return 'bg-green-50 border-green-200';
  if (efficiency >= 90) return 'bg-blue-50 border-blue-200';
  if (efficiency >= 85) return 'bg-yellow-50 border-yellow-200';
  if (efficiency >= 80) return 'bg-orange-50 border-orange-200';
  return 'bg-red-50 border-red-200';
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: TransformerEfficiencyInputs): string | null {
  const { mode, inputPower, outputPower, losses, voltage, current, powerFactor } = inputs;
  
  if (mode === 'power') {
    if (isNaN(inputPower) || inputPower <= 0) {
      return 'Input Power must be greater than 0';
    }
    if (isNaN(outputPower) || outputPower <= 0) {
      return 'Output Power must be greater than 0';
    }
    if (outputPower > inputPower) {
      return 'Output Power cannot exceed Input Power (efficiency > 100%)';
    }
  } else if (mode === 'voltage-current') {
    if (isNaN(voltage) || voltage <= 0) {
      return 'Voltage must be greater than 0';
    }
    if (isNaN(current) || current <= 0) {
      return 'Current must be greater than 0';
    }
    if (isNaN(powerFactor) || powerFactor <= 0 || powerFactor > 1) {
      return 'Power Factor must be between 0 and 1';
    }
    if (isNaN(outputPower) || outputPower <= 0) {
      return 'Output Power must be greater than 0';
    }
    const calculatedInput = voltage * current * powerFactor;
    if (outputPower > calculatedInput) {
      return 'Output Power cannot exceed calculated Input Power';
    }
  } else if (mode === 'output-losses') {
    if (isNaN(outputPower) || outputPower <= 0) {
      return 'Output Power must be greater than 0';
    }
    if (isNaN(losses) || losses < 0) {
      return 'Losses cannot be negative';
    }
  }
  
  return null;
}

/**
 * Get preset configurations
 */
export function getPresets(): Preset[] {
  return [
    {
      name: 'High Efficiency Transformer',
      description: '98% efficiency - Modern design',
      inputPower: 1000,
      outputPower: 980,
      losses: 20
    },
    {
      name: 'Standard Power Transformer',
      description: '95% efficiency - Typical',
      inputPower: 1000,
      outputPower: 950,
      losses: 50
    },
    {
      name: 'Distribution Transformer',
      description: '97% efficiency - Grid use',
      inputPower: 5000,
      outputPower: 4850,
      losses: 150
    },
    {
      name: 'Small Transformer',
      description: '90% efficiency - Low power',
      inputPower: 100,
      outputPower: 90,
      losses: 10
    },
    {
      name: 'Industrial Transformer',
      description: '96% efficiency - Heavy duty',
      inputPower: 10000,
      outputPower: 9600,
      losses: 400
    },
    {
      name: 'Old Transformer',
      description: '85% efficiency - Needs replacement',
      inputPower: 1000,
      outputPower: 850,
      losses: 150
    }
  ];
}

/**
 * Format number with decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// History management
export function saveToHistory(inputs: TransformerEfficiencyInputs, result: TransformerEfficiencyResult): void {
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
export function exportToText(inputs: TransformerEfficiencyInputs, result: TransformerEfficiencyResult): string {
  const lines = [
    "TRANSFORMER EFFICIENCY CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Calculation Mode: ${getModeLabel(inputs.mode)}`,
    `Input Power: ${formatNumber(result.inputPower, 2)} W`,
    `Output Power: ${formatNumber(result.outputPower, 2)} W`,
    `Losses: ${formatNumber(result.losses, 2)} W`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Efficiency: ${formatNumber(result.efficiency, 2)}%`,
    `Rating: ${result.efficiencyRating}`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50)
  ];
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Transformer Efficiency Calculator");
  
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

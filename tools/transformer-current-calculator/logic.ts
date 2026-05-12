import {
  PhaseType,
  TransformerCurrentInputs,
  TransformerCurrentResult,
  Preset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "transformer-current-calculator-history";
const MAX_HISTORY = 10;
const SQRT3 = Math.sqrt(3);

/**
 * Calculate transformer current
 */
export function calculateTransformerCurrent(inputs: TransformerCurrentInputs): TransformerCurrentResult {
  const { power, voltage, phase, powerFactor } = inputs;
  
  let primaryCurrent: number;
  let secondaryCurrent: number;
  let lineCurrent: number | undefined;
  let apparentPower: number;
  const steps: string[] = [];
  
  steps.push(`System Configuration: ${phase === 'single' ? 'Single Phase' : 'Three Phase'}`);
  steps.push(`Given Values:`);
  steps.push(`Power (P) = ${power} W`);
  steps.push(`Voltage (V) = ${voltage} V`);
  steps.push(`Power Factor (PF) = ${powerFactor}`);
  steps.push(``);
  
  if (phase === 'single') {
    // Single Phase Calculation
    // Current = Power / (Voltage × Power Factor)
    primaryCurrent = power / (voltage * powerFactor);
    secondaryCurrent = primaryCurrent;
    apparentPower = power / powerFactor;
    
    steps.push(`Step 1: Calculate Current (Single Phase)`);
    steps.push(`Formula: I = P / (V × PF)`);
    steps.push(`I = ${power} / (${voltage} × ${powerFactor})`);
    steps.push(`I = ${power} / ${formatNumber(voltage * powerFactor, 2)}`);
    steps.push(`I = ${formatNumber(primaryCurrent, 2)} A`);
    steps.push(``);
    
    steps.push(`Step 2: Calculate Apparent Power`);
    steps.push(`S = P / PF`);
    steps.push(`S = ${power} / ${powerFactor}`);
    steps.push(`S = ${formatNumber(apparentPower, 2)} VA`);
    
  } else {
    // Three Phase Calculation
    // Current = Power / (√3 × Voltage × Power Factor)
    primaryCurrent = power / (SQRT3 * voltage * powerFactor);
    secondaryCurrent = primaryCurrent;
    lineCurrent = primaryCurrent;
    apparentPower = power / powerFactor;
    
    steps.push(`Step 1: Calculate Line Current (Three Phase)`);
    steps.push(`Formula: I = P / (√3 × V × PF)`);
    steps.push(`I = ${power} / (${SQRT3.toFixed(4)} × ${voltage} × ${powerFactor})`);
    steps.push(`I = ${power} / ${formatNumber(SQRT3 * voltage * powerFactor, 2)}`);
    steps.push(`I = ${formatNumber(primaryCurrent, 2)} A`);
    steps.push(``);
    
    steps.push(`Step 2: Calculate Apparent Power`);
    steps.push(`S = √3 × V × I`);
    steps.push(`S = ${SQRT3.toFixed(4)} × ${voltage} × ${formatNumber(primaryCurrent, 2)}`);
    steps.push(`S = ${formatNumber(SQRT3 * voltage * primaryCurrent, 2)} VA`);
  }
  
  return {
    primaryCurrent,
    secondaryCurrent,
    lineCurrent,
    phase,
    apparentPower,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: TransformerCurrentInputs): string | null {
  const { power, voltage, powerFactor } = inputs;
  
  if (isNaN(power) || power <= 0) {
    return 'Power must be greater than 0';
  }
  
  if (isNaN(voltage) || voltage <= 0) {
    return 'Voltage must be greater than 0';
  }
  
  if (isNaN(powerFactor) || powerFactor <= 0 || powerFactor > 1) {
    return 'Power Factor must be between 0 and 1';
  }
  
  return null;
}

/**
 * Get preset configurations
 */
export function getPresets(): Preset[] {
  return [
    {
      name: 'Residential Single Phase',
      description: '230V household supply',
      power: 5000,
      voltage: 230,
      phase: 'single',
      powerFactor: 0.9
    },
    {
      name: 'US Residential',
      description: '120V household supply',
      power: 2000,
      voltage: 120,
      phase: 'single',
      powerFactor: 0.9
    },
    {
      name: 'Industrial Three Phase',
      description: '400V industrial supply',
      power: 10000,
      voltage: 400,
      phase: 'three',
      powerFactor: 0.85
    },
    {
      name: 'Commercial Three Phase',
      description: '415V commercial supply',
      power: 15000,
      voltage: 415,
      phase: 'three',
      powerFactor: 0.9
    },
    {
      name: 'Small Motor',
      description: '3-phase motor load',
      power: 7500,
      voltage: 400,
      phase: 'three',
      powerFactor: 0.8
    },
    {
      name: 'Large Industrial Load',
      description: 'Heavy industrial equipment',
      power: 50000,
      voltage: 415,
      phase: 'three',
      powerFactor: 0.85
    }
  ];
}

/**
 * Get typical voltage suggestions
 */
export function getVoltageSuggestions(phase: PhaseType): number[] {
  if (phase === 'single') {
    return [110, 120, 220, 230, 240];
  } else {
    return [380, 400, 415, 440, 480];
  }
}

/**
 * Format number with decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// History management
export function saveToHistory(inputs: TransformerCurrentInputs, result: TransformerCurrentResult): void {
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
export function exportToText(inputs: TransformerCurrentInputs, result: TransformerCurrentResult): string {
  const lines = [
    "TRANSFORMER CURRENT CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Power: ${inputs.power} W`,
    `Voltage: ${inputs.voltage} V`,
    `Phase: ${result.phase === 'single' ? 'Single Phase' : 'Three Phase'}`,
    `Power Factor: ${inputs.powerFactor}`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Primary Current: ${formatNumber(result.primaryCurrent, 2)} A`,
    `Secondary Current: ${formatNumber(result.secondaryCurrent, 2)} A`,
  ];
  
  if (result.lineCurrent) {
    lines.push(`Line Current: ${formatNumber(result.lineCurrent, 2)} A`);
  }
  
  lines.push(`Apparent Power: ${formatNumber(result.apparentPower, 2)} VA`);
  lines.push("");
  lines.push("CALCULATION STEPS:");
  lines.push("-".repeat(50));
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Transformer Current Calculator");
  
  return lines.join("\n");
}

export function exportToJSON(inputs: TransformerCurrentInputs, result: TransformerCurrentResult): string {
  const data = {
    timestamp: new Date(result.timestamp).toISOString(),
    inputs: {
      power: inputs.power,
      voltage: inputs.voltage,
      phase: result.phase,
      powerFactor: inputs.powerFactor
    },
    results: {
      primaryCurrent: formatNumber(result.primaryCurrent, 2),
      secondaryCurrent: formatNumber(result.secondaryCurrent, 2),
      lineCurrent: result.lineCurrent ? formatNumber(result.lineCurrent, 2) : null,
      apparentPower: formatNumber(result.apparentPower, 2)
    }
  };
  
  return JSON.stringify(data, null, 2);
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

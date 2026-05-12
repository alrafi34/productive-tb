import {
  TransformerInputs,
  TransformerResult,
  Preset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "transformer-turns-ratio-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate transformer turns ratio and related values
 */
export function calculateTransformer(inputs: TransformerInputs): TransformerResult {
  const { primaryVoltage, secondaryVoltage, primaryTurns, secondaryTurns } = inputs;
  
  let turnsRatio: number;
  let voltageRatio: number;
  let currentRatio: number;
  let calculatedPrimaryVoltage: number | undefined;
  let calculatedSecondaryVoltage: number | undefined;
  let calculatedPrimaryTurns: number | undefined;
  let calculatedSecondaryTurns: number | undefined;
  const steps: string[] = [];
  
  steps.push(`Given Values:`);
  
  // Case 1: Both voltages provided
  if (primaryVoltage > 0 && secondaryVoltage > 0) {
    steps.push(`Primary Voltage (Vp) = ${primaryVoltage} V`);
    steps.push(`Secondary Voltage (Vs) = ${secondaryVoltage} V`);
    
    voltageRatio = primaryVoltage / secondaryVoltage;
    turnsRatio = voltageRatio;
    currentRatio = 1 / voltageRatio;
    
    steps.push(``);
    steps.push(`Step 1: Calculate Voltage Ratio`);
    steps.push(`Voltage Ratio = Vp / Vs`);
    steps.push(`Voltage Ratio = ${primaryVoltage} / ${secondaryVoltage}`);
    steps.push(`Voltage Ratio = ${formatNumber(voltageRatio, 4)}`);
    
    steps.push(``);
    steps.push(`Step 2: Turns Ratio equals Voltage Ratio`);
    steps.push(`Turns Ratio (Np/Ns) = ${formatNumber(turnsRatio, 4)}`);
    
    steps.push(``);
    steps.push(`Step 3: Calculate Current Ratio`);
    steps.push(`Current Ratio (Ip/Is) = Ns/Np = 1 / Voltage Ratio`);
    steps.push(`Current Ratio = ${formatNumber(currentRatio, 4)}`);
    
    // Calculate turns if provided
    if (primaryTurns > 0) {
      calculatedSecondaryTurns = primaryTurns / turnsRatio;
      steps.push(``);
      steps.push(`Calculated Secondary Turns:`);
      steps.push(`Ns = Np / Turns Ratio`);
      steps.push(`Ns = ${primaryTurns} / ${formatNumber(turnsRatio, 4)}`);
      steps.push(`Ns = ${formatNumber(calculatedSecondaryTurns, 2)} turns`);
    }
    
    if (secondaryTurns > 0) {
      calculatedPrimaryTurns = secondaryTurns * turnsRatio;
      steps.push(``);
      steps.push(`Calculated Primary Turns:`);
      steps.push(`Np = Ns × Turns Ratio`);
      steps.push(`Np = ${secondaryTurns} × ${formatNumber(turnsRatio, 4)}`);
      steps.push(`Np = ${formatNumber(calculatedPrimaryTurns, 2)} turns`);
    }
  }
  // Case 2: Both turns provided
  else if (primaryTurns > 0 && secondaryTurns > 0) {
    steps.push(`Primary Turns (Np) = ${primaryTurns}`);
    steps.push(`Secondary Turns (Ns) = ${secondaryTurns}`);
    
    turnsRatio = primaryTurns / secondaryTurns;
    voltageRatio = turnsRatio;
    currentRatio = 1 / turnsRatio;
    
    steps.push(``);
    steps.push(`Step 1: Calculate Turns Ratio`);
    steps.push(`Turns Ratio = Np / Ns`);
    steps.push(`Turns Ratio = ${primaryTurns} / ${secondaryTurns}`);
    steps.push(`Turns Ratio = ${formatNumber(turnsRatio, 4)}`);
    
    steps.push(``);
    steps.push(`Step 2: Voltage Ratio equals Turns Ratio`);
    steps.push(`Voltage Ratio (Vp/Vs) = ${formatNumber(voltageRatio, 4)}`);
    
    steps.push(``);
    steps.push(`Step 3: Calculate Current Ratio`);
    steps.push(`Current Ratio (Ip/Is) = Ns/Np`);
    steps.push(`Current Ratio = ${formatNumber(currentRatio, 4)}`);
    
    // Calculate voltages if provided
    if (primaryVoltage > 0) {
      calculatedSecondaryVoltage = primaryVoltage / voltageRatio;
      steps.push(``);
      steps.push(`Calculated Secondary Voltage:`);
      steps.push(`Vs = Vp / Voltage Ratio`);
      steps.push(`Vs = ${primaryVoltage} / ${formatNumber(voltageRatio, 4)}`);
      steps.push(`Vs = ${formatNumber(calculatedSecondaryVoltage, 2)} V`);
    }
    
    if (secondaryVoltage > 0) {
      calculatedPrimaryVoltage = secondaryVoltage * voltageRatio;
      steps.push(``);
      steps.push(`Calculated Primary Voltage:`);
      steps.push(`Vp = Vs × Voltage Ratio`);
      steps.push(`Vp = ${secondaryVoltage} × ${formatNumber(voltageRatio, 4)}`);
      steps.push(`Vp = ${formatNumber(calculatedPrimaryVoltage, 2)} V`);
    }
  }
  // Case 3: Mixed - Primary voltage and turns
  else if (primaryVoltage > 0 && primaryTurns > 0 && secondaryTurns > 0) {
    steps.push(`Primary Voltage (Vp) = ${primaryVoltage} V`);
    steps.push(`Primary Turns (Np) = ${primaryTurns}`);
    steps.push(`Secondary Turns (Ns) = ${secondaryTurns}`);
    
    turnsRatio = primaryTurns / secondaryTurns;
    voltageRatio = turnsRatio;
    currentRatio = 1 / turnsRatio;
    calculatedSecondaryVoltage = primaryVoltage / voltageRatio;
    
    steps.push(``);
    steps.push(`Step 1: Calculate Turns Ratio`);
    steps.push(`Turns Ratio = Np / Ns = ${primaryTurns} / ${secondaryTurns}`);
    steps.push(`Turns Ratio = ${formatNumber(turnsRatio, 4)}`);
    
    steps.push(``);
    steps.push(`Step 2: Calculate Secondary Voltage`);
    steps.push(`Vs = Vp / Turns Ratio`);
    steps.push(`Vs = ${primaryVoltage} / ${formatNumber(turnsRatio, 4)}`);
    steps.push(`Vs = ${formatNumber(calculatedSecondaryVoltage, 2)} V`);
    
    steps.push(``);
    steps.push(`Step 3: Current Ratio = ${formatNumber(currentRatio, 4)}`);
  }
  // Case 4: Mixed - Secondary voltage and turns
  else if (secondaryVoltage > 0 && primaryTurns > 0 && secondaryTurns > 0) {
    steps.push(`Secondary Voltage (Vs) = ${secondaryVoltage} V`);
    steps.push(`Primary Turns (Np) = ${primaryTurns}`);
    steps.push(`Secondary Turns (Ns) = ${secondaryTurns}`);
    
    turnsRatio = primaryTurns / secondaryTurns;
    voltageRatio = turnsRatio;
    currentRatio = 1 / turnsRatio;
    calculatedPrimaryVoltage = secondaryVoltage * voltageRatio;
    
    steps.push(``);
    steps.push(`Step 1: Calculate Turns Ratio`);
    steps.push(`Turns Ratio = Np / Ns = ${primaryTurns} / ${secondaryTurns}`);
    steps.push(`Turns Ratio = ${formatNumber(turnsRatio, 4)}`);
    
    steps.push(``);
    steps.push(`Step 2: Calculate Primary Voltage`);
    steps.push(`Vp = Vs × Turns Ratio`);
    steps.push(`Vp = ${secondaryVoltage} × ${formatNumber(turnsRatio, 4)}`);
    steps.push(`Vp = ${formatNumber(calculatedPrimaryVoltage, 2)} V`);
    
    steps.push(``);
    steps.push(`Step 3: Current Ratio = ${formatNumber(currentRatio, 4)}`);
  }
  // Case 5: Primary voltage and secondary turns
  else if (primaryVoltage > 0 && secondaryVoltage > 0 && secondaryTurns > 0) {
    voltageRatio = primaryVoltage / secondaryVoltage;
    turnsRatio = voltageRatio;
    currentRatio = 1 / voltageRatio;
    calculatedPrimaryTurns = secondaryTurns * turnsRatio;
    
    steps.push(`Primary Voltage (Vp) = ${primaryVoltage} V`);
    steps.push(`Secondary Voltage (Vs) = ${secondaryVoltage} V`);
    steps.push(`Secondary Turns (Ns) = ${secondaryTurns}`);
    steps.push(``);
    steps.push(`Turns Ratio = Vp/Vs = ${formatNumber(turnsRatio, 4)}`);
    steps.push(`Calculated Primary Turns = ${formatNumber(calculatedPrimaryTurns, 2)}`);
  }
  else {
    // Default case - insufficient data
    turnsRatio = 1;
    voltageRatio = 1;
    currentRatio = 1;
    steps.push(`Insufficient data for calculation`);
    steps.push(`Please provide at least:`);
    steps.push(`- Both voltages, OR`);
    steps.push(`- Both turns, OR`);
    steps.push(`- One voltage and both turns`);
  }
  
  return {
    turnsRatio,
    turnsRatioDisplay: formatRatio(turnsRatio),
    voltageRatio,
    voltageRatioDisplay: formatRatio(voltageRatio),
    currentRatio,
    currentRatioDisplay: formatRatio(currentRatio),
    calculatedPrimaryVoltage,
    calculatedSecondaryVoltage,
    calculatedPrimaryTurns,
    calculatedSecondaryTurns,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: TransformerInputs): string | null {
  const { primaryVoltage, secondaryVoltage, primaryTurns, secondaryTurns } = inputs;
  
  // Check if we have enough data
  const hasVoltages = primaryVoltage > 0 && secondaryVoltage > 0;
  const hasTurns = primaryTurns > 0 && secondaryTurns > 0;
  const hasMixed = (primaryVoltage > 0 || secondaryVoltage > 0) && (primaryTurns > 0 && secondaryTurns > 0);
  
  if (!hasVoltages && !hasTurns && !hasMixed) {
    return 'Please provide at least two voltages, two turns, or one voltage with both turns';
  }
  
  // Validate individual values
  if (primaryVoltage < 0 || secondaryVoltage < 0) {
    return 'Voltages cannot be negative';
  }
  
  if (primaryTurns < 0 || secondaryTurns < 0) {
    return 'Turns cannot be negative';
  }
  
  return null;
}

/**
 * Format ratio as x:1 or 1:x
 */
function formatRatio(ratio: number): string {
  if (ratio >= 1) {
    return `${formatNumber(ratio, 2)}:1`;
  } else {
    return `1:${formatNumber(1 / ratio, 2)}`;
  }
}

/**
 * Get preset configurations
 */
export function getPresets(): Preset[] {
  return [
    {
      name: 'Step-Down (220V to 110V)',
      description: 'Common household transformer',
      primaryVoltage: 220,
      secondaryVoltage: 110,
      primaryTurns: 1000,
      secondaryTurns: 500
    },
    {
      name: 'Step-Up (110V to 220V)',
      description: 'Voltage doubler',
      primaryVoltage: 110,
      secondaryVoltage: 220,
      primaryTurns: 500,
      secondaryTurns: 1000
    },
    {
      name: 'Isolation (1:1)',
      description: 'Same voltage, electrical isolation',
      primaryVoltage: 230,
      secondaryVoltage: 230,
      primaryTurns: 1000,
      secondaryTurns: 1000
    },
    {
      name: 'Power Supply (230V to 12V)',
      description: 'AC adapter transformer',
      primaryVoltage: 230,
      secondaryVoltage: 12,
      primaryTurns: 1150,
      secondaryTurns: 60
    },
    {
      name: 'Distribution (11kV to 415V)',
      description: 'Industrial distribution',
      primaryVoltage: 11000,
      secondaryVoltage: 415,
      primaryTurns: 11000,
      secondaryTurns: 415
    },
    {
      name: 'Control Circuit (480V to 120V)',
      description: 'US industrial control',
      primaryVoltage: 480,
      secondaryVoltage: 120,
      primaryTurns: 480,
      secondaryTurns: 120
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
export function saveToHistory(inputs: TransformerInputs, result: TransformerResult): void {
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
export function exportToText(inputs: TransformerInputs, result: TransformerResult): string {
  const lines = [
    "TRANSFORMER TURNS RATIO CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Primary Voltage: ${inputs.primaryVoltage || 'N/A'} V`,
    `Secondary Voltage: ${inputs.secondaryVoltage || 'N/A'} V`,
    `Primary Turns: ${inputs.primaryTurns || 'N/A'}`,
    `Secondary Turns: ${inputs.secondaryTurns || 'N/A'}`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Turns Ratio: ${result.turnsRatioDisplay}`,
    `Voltage Ratio: ${result.voltageRatioDisplay}`,
    `Current Ratio: ${result.currentRatioDisplay}`,
  ];
  
  if (result.calculatedPrimaryVoltage) {
    lines.push(`Calculated Primary Voltage: ${formatNumber(result.calculatedPrimaryVoltage, 2)} V`);
  }
  if (result.calculatedSecondaryVoltage) {
    lines.push(`Calculated Secondary Voltage: ${formatNumber(result.calculatedSecondaryVoltage, 2)} V`);
  }
  if (result.calculatedPrimaryTurns) {
    lines.push(`Calculated Primary Turns: ${formatNumber(result.calculatedPrimaryTurns, 2)}`);
  }
  if (result.calculatedSecondaryTurns) {
    lines.push(`Calculated Secondary Turns: ${formatNumber(result.calculatedSecondaryTurns, 2)}`);
  }
  
  lines.push("");
  lines.push("CALCULATION STEPS:");
  lines.push("-".repeat(50));
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Transformer Turns Ratio Calculator");
  
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

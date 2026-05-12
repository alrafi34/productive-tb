import {
  CalculationMode,
  ThreePhasePowerInputs,
  ThreePhasePowerResult,
  Preset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "three-phase-power-calculator-history";
const MAX_HISTORY = 10;
const SQRT3 = Math.sqrt(3);

/**
 * Calculate three-phase power parameters
 */
export function calculateThreePhasePower(inputs: ThreePhasePowerInputs): ThreePhasePowerResult {
  const { mode, voltage, current, powerFactor, frequency, power } = inputs;
  
  let realPower: number;
  let apparentPower: number;
  let reactivePower: number;
  let calculatedCurrent: number;
  let calculatedVoltage: number;
  const steps: string[] = [];
  
  steps.push(`Calculation Mode: ${mode === 'power' ? 'Calculate Power' : mode === 'current' ? 'Calculate Current' : 'Calculate Voltage'}`);
  steps.push(`Given Values:`);
  
  if (mode === 'power') {
    // Calculate power from voltage, current, and power factor
    steps.push(`Line Voltage (V) = ${voltage} V`);
    steps.push(`Line Current (I) = ${current} A`);
    steps.push(`Power Factor (PF) = ${powerFactor}`);
    steps.push(`Frequency (f) = ${frequency} Hz`);
    steps.push(``);
    
    // Calculate apparent power: S = √3 × V × I / 1000
    apparentPower = (SQRT3 * voltage * current) / 1000;
    steps.push(`Step 1: Calculate Apparent Power (S)`);
    steps.push(`S = √3 × V × I / 1000`);
    steps.push(`S = ${SQRT3.toFixed(4)} × ${voltage} × ${current} / 1000`);
    steps.push(`S = ${formatNumber(apparentPower, 4)} kVA`);
    steps.push(``);
    
    // Calculate real power: P = √3 × V × I × PF / 1000
    realPower = (SQRT3 * voltage * current * powerFactor) / 1000;
    steps.push(`Step 2: Calculate Real Power (P)`);
    steps.push(`P = √3 × V × I × PF / 1000`);
    steps.push(`P = ${SQRT3.toFixed(4)} × ${voltage} × ${current} × ${powerFactor} / 1000`);
    steps.push(`P = ${formatNumber(realPower, 4)} kW`);
    steps.push(``);
    
    // Calculate reactive power: Q = √(S² - P²)
    reactivePower = Math.sqrt(Math.max(0, Math.pow(apparentPower, 2) - Math.pow(realPower, 2)));
    steps.push(`Step 3: Calculate Reactive Power (Q)`);
    steps.push(`Q = √(S² - P²)`);
    steps.push(`Q = √(${formatNumber(apparentPower, 4)}² - ${formatNumber(realPower, 4)}²)`);
    steps.push(`Q = √(${formatNumber(Math.pow(apparentPower, 2), 4)} - ${formatNumber(Math.pow(realPower, 2), 4)})`);
    steps.push(`Q = ${formatNumber(reactivePower, 4)} kVAR`);
    
    calculatedCurrent = current;
    calculatedVoltage = voltage;
    
  } else if (mode === 'current') {
    // Calculate current from power, voltage, and power factor
    const powerKW = power || 0;
    steps.push(`Real Power (P) = ${powerKW} kW`);
    steps.push(`Line Voltage (V) = ${voltage} V`);
    steps.push(`Power Factor (PF) = ${powerFactor}`);
    steps.push(`Frequency (f) = ${frequency} Hz`);
    steps.push(``);
    
    // Calculate current: I = P × 1000 / (√3 × V × PF)
    calculatedCurrent = (powerKW * 1000) / (SQRT3 * voltage * powerFactor);
    steps.push(`Step 1: Calculate Line Current (I)`);
    steps.push(`I = P × 1000 / (√3 × V × PF)`);
    steps.push(`I = ${powerKW} × 1000 / (${SQRT3.toFixed(4)} × ${voltage} × ${powerFactor})`);
    steps.push(`I = ${formatNumber(calculatedCurrent, 4)} A`);
    steps.push(``);
    
    realPower = powerKW;
    apparentPower = (SQRT3 * voltage * calculatedCurrent) / 1000;
    reactivePower = Math.sqrt(Math.max(0, Math.pow(apparentPower, 2) - Math.pow(realPower, 2)));
    
    steps.push(`Step 2: Calculate Apparent Power (S)`);
    steps.push(`S = √3 × V × I / 1000`);
    steps.push(`S = ${formatNumber(apparentPower, 4)} kVA`);
    steps.push(``);
    
    steps.push(`Step 3: Calculate Reactive Power (Q)`);
    steps.push(`Q = ${formatNumber(reactivePower, 4)} kVAR`);
    
    calculatedVoltage = voltage;
    
  } else {
    // Calculate voltage from power, current, and power factor
    const powerKW = power || 0;
    steps.push(`Real Power (P) = ${powerKW} kW`);
    steps.push(`Line Current (I) = ${current} A`);
    steps.push(`Power Factor (PF) = ${powerFactor}`);
    steps.push(`Frequency (f) = ${frequency} Hz`);
    steps.push(``);
    
    // Calculate voltage: V = P × 1000 / (√3 × I × PF)
    calculatedVoltage = (powerKW * 1000) / (SQRT3 * current * powerFactor);
    steps.push(`Step 1: Calculate Line Voltage (V)`);
    steps.push(`V = P × 1000 / (√3 × I × PF)`);
    steps.push(`V = ${powerKW} × 1000 / (${SQRT3.toFixed(4)} × ${current} × ${powerFactor})`);
    steps.push(`V = ${formatNumber(calculatedVoltage, 4)} V`);
    steps.push(``);
    
    realPower = powerKW;
    apparentPower = (SQRT3 * calculatedVoltage * current) / 1000;
    reactivePower = Math.sqrt(Math.max(0, Math.pow(apparentPower, 2) - Math.pow(realPower, 2)));
    
    steps.push(`Step 2: Calculate Apparent Power (S)`);
    steps.push(`S = ${formatNumber(apparentPower, 4)} kVA`);
    steps.push(``);
    
    steps.push(`Step 3: Calculate Reactive Power (Q)`);
    steps.push(`Q = ${formatNumber(reactivePower, 4)} kVAR`);
    
    calculatedCurrent = current;
  }
  
  return {
    realPower,
    apparentPower,
    reactivePower,
    current: calculatedCurrent,
    voltage: calculatedVoltage,
    powerFactor,
    frequency,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: ThreePhasePowerInputs): string | null {
  const { mode, voltage, current, powerFactor, frequency, power } = inputs;
  
  if (mode === 'power') {
    if (isNaN(voltage) || voltage <= 0) {
      return 'Voltage must be greater than 0';
    }
    if (isNaN(current) || current <= 0) {
      return 'Current must be greater than 0';
    }
  } else if (mode === 'current') {
    if (isNaN(power!) || power! <= 0) {
      return 'Power must be greater than 0';
    }
    if (isNaN(voltage) || voltage <= 0) {
      return 'Voltage must be greater than 0';
    }
  } else if (mode === 'voltage') {
    if (isNaN(power!) || power! <= 0) {
      return 'Power must be greater than 0';
    }
    if (isNaN(current) || current <= 0) {
      return 'Current must be greater than 0';
    }
  }
  
  if (isNaN(powerFactor) || powerFactor <= 0 || powerFactor > 1) {
    return 'Power Factor must be between 0 and 1';
  }
  
  if (isNaN(frequency) || frequency <= 0) {
    return 'Frequency must be greater than 0';
  }
  
  return null;
}

/**
 * Get preset configurations
 */
export function getPresets(): Preset[] {
  return [
    {
      name: 'Small Industrial Motor',
      description: '415V, 10A, PF 0.8',
      voltage: 415,
      current: 10,
      powerFactor: 0.8,
      frequency: 50
    },
    {
      name: 'Medium Industrial Load',
      description: '400V, 20A, PF 0.85',
      voltage: 400,
      current: 20,
      powerFactor: 0.85,
      frequency: 50
    },
    {
      name: 'Large Industrial System',
      description: '415V, 50A, PF 0.9',
      voltage: 415,
      current: 50,
      powerFactor: 0.9,
      frequency: 50
    },
    {
      name: 'Commercial Building',
      description: '400V, 30A, PF 0.85',
      voltage: 400,
      current: 30,
      powerFactor: 0.85,
      frequency: 50
    },
    {
      name: 'US Industrial (60Hz)',
      description: '480V, 15A, PF 0.85',
      voltage: 480,
      current: 15,
      powerFactor: 0.85,
      frequency: 60
    },
    {
      name: 'Generator Sizing',
      description: '415V, 100A, PF 0.8',
      voltage: 415,
      current: 100,
      powerFactor: 0.8,
      frequency: 50
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
export function saveToHistory(inputs: ThreePhasePowerInputs, result: ThreePhasePowerResult): void {
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
export function exportToText(inputs: ThreePhasePowerInputs, result: ThreePhasePowerResult): string {
  const lines = [
    "THREE PHASE POWER CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Calculation Mode: ${inputs.mode}`,
    `Line Voltage: ${result.voltage} V`,
    `Line Current: ${result.current} A`,
    `Power Factor: ${result.powerFactor}`,
    `Frequency: ${result.frequency} Hz`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Real Power (P): ${formatNumber(result.realPower, 4)} kW`,
    `Apparent Power (S): ${formatNumber(result.apparentPower, 4)} kVA`,
    `Reactive Power (Q): ${formatNumber(result.reactivePower, 4)} kVAR`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50)
  ];
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Three Phase Power Calculator");
  
  return lines.join("\n");
}

export function exportToCSV(inputs: ThreePhasePowerInputs, result: ThreePhasePowerResult): string {
  const lines = [
    "Parameter,Value,Unit",
    `Voltage,${result.voltage},V`,
    `Current,${result.current},A`,
    `Power Factor,${result.powerFactor},-`,
    `Frequency,${result.frequency},Hz`,
    `Real Power,${formatNumber(result.realPower, 4)},kW`,
    `Apparent Power,${formatNumber(result.apparentPower, 4)},kVA`,
    `Reactive Power,${formatNumber(result.reactivePower, 4)},kVAR`
  ];
  
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

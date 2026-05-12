import {
  ResistanceUnit,
  VoltageInputs,
  VoltageResult,
  Preset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "voltage-divider-calculator-history";
const MAX_HISTORY = 10;

/**
 * Convert resistance to ohms
 */
export function convertToOhms(value: number, unit: ResistanceUnit): number {
  switch (unit) {
    case 'ohm':
      return value;
    case 'kohm':
      return value * 1000;
    case 'mohm':
      return value * 1000000;
    default:
      return value;
  }
}

/**
 * Format resistance with unit
 */
export function formatResistance(ohms: number): string {
  if (ohms >= 1000000) {
    return `${(ohms / 1000000).toFixed(2)} MΩ`;
  } else if (ohms >= 1000) {
    return `${(ohms / 1000).toFixed(2)} kΩ`;
  } else {
    return `${ohms.toFixed(2)} Ω`;
  }
}

/**
 * Calculate voltage divider output
 */
export function calculateVoltageDivider(inputs: VoltageInputs): VoltageResult {
  const { vin, r1, r2, r1Unit, r2Unit } = inputs;
  
  // Convert to ohms
  const r1Ohms = convertToOhms(r1, r1Unit);
  const r2Ohms = convertToOhms(r2, r2Unit);
  
  // Calculate output voltage
  const ratio = r2Ohms / (r1Ohms + r2Ohms);
  const vout = vin * ratio;
  
  // Calculate current through the divider
  const current = vin / (r1Ohms + r2Ohms);
  
  // Calculate power dissipation
  const powerR1 = current * current * r1Ohms;
  const powerR2 = current * current * r2Ohms;
  const totalPower = powerR1 + powerR2;
  
  // Generate step-by-step calculation
  const steps = [
    `Step 1: Convert resistances to ohms`,
    `R1 = ${formatResistance(r1Ohms)}`,
    `R2 = ${formatResistance(r2Ohms)}`,
    ``,
    `Step 2: Calculate voltage ratio`,
    `Ratio = R2 / (R1 + R2)`,
    `Ratio = ${r2Ohms} / (${r1Ohms} + ${r2Ohms})`,
    `Ratio = ${r2Ohms} / ${r1Ohms + r2Ohms}`,
    `Ratio = ${ratio.toFixed(6)}`,
    ``,
    `Step 3: Calculate output voltage`,
    `Vout = Vin × Ratio`,
    `Vout = ${vin} × ${ratio.toFixed(6)}`,
    `Vout = ${vout.toFixed(4)} V`
  ];
  
  return {
    vout,
    vin,
    r1Ohms,
    r2Ohms,
    r1Display: formatResistance(r1Ohms),
    r2Display: formatResistance(r2Ohms),
    ratio,
    current,
    powerR1,
    powerR2,
    totalPower,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: VoltageInputs): string | null {
  const { vin, r1, r2 } = inputs;
  
  if (isNaN(vin) || vin <= 0) {
    return 'Input voltage must be greater than 0';
  }
  
  if (isNaN(r1) || r1 <= 0) {
    return 'R1 must be greater than 0';
  }
  
  if (isNaN(r2) || r2 <= 0) {
    return 'R2 must be greater than 0';
  }
  
  return null;
}

/**
 * Get preset configurations
 */
export function getPresets(): Preset[] {
  return [
    {
      name: '5V to 2.5V (50%)',
      description: 'Equal resistors, half voltage',
      vin: 5,
      r1: 1,
      r2: 1,
      r1Unit: 'kohm',
      r2Unit: 'kohm'
    },
    {
      name: '12V to 5V (Arduino)',
      description: 'Common Arduino voltage divider',
      vin: 12,
      r1: 4.7,
      r2: 3.3,
      r1Unit: 'kohm',
      r2Unit: 'kohm'
    },
    {
      name: '9V to 3.3V (ESP32)',
      description: 'ESP32 ADC voltage divider',
      vin: 9,
      r1: 10,
      r2: 5.6,
      r1Unit: 'kohm',
      r2Unit: 'kohm'
    },
    {
      name: '12V to 4V (33%)',
      description: 'One-third voltage reduction',
      vin: 12,
      r1: 2,
      r2: 1,
      r1Unit: 'kohm',
      r2Unit: 'kohm'
    },
    {
      name: '24V to 5V (Logic)',
      description: 'Industrial to logic level',
      vin: 24,
      r1: 19,
      r2: 5,
      r1Unit: 'kohm',
      r2Unit: 'kohm'
    },
    {
      name: '3.3V to 1.65V (50%)',
      description: 'Half of 3.3V logic',
      vin: 3.3,
      r1: 10,
      r2: 10,
      r1Unit: 'kohm',
      r2Unit: 'kohm'
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
 * Get unit label
 */
export function getUnitLabel(unit: ResistanceUnit): string {
  switch (unit) {
    case 'ohm':
      return 'Ω';
    case 'kohm':
      return 'kΩ';
    case 'mohm':
      return 'MΩ';
    default:
      return 'Ω';
  }
}

// History management
export function saveToHistory(result: VoltageResult): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
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
export function exportToText(result: VoltageResult): string {
  const lines = [
    "VOLTAGE DIVIDER CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Input Voltage (Vin): ${result.vin} V`,
    `Resistor R1: ${result.r1Display}`,
    `Resistor R2: ${result.r2Display}`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Output Voltage (Vout): ${formatNumber(result.vout, 4)} V`,
    `Voltage Ratio: ${formatNumber(result.ratio * 100, 2)}%`,
    `Current: ${formatNumber(result.current * 1000, 4)} mA`,
    "",
    "POWER DISSIPATION:",
    "-".repeat(50),
    `Power in R1: ${formatNumber(result.powerR1 * 1000, 4)} mW`,
    `Power in R2: ${formatNumber(result.powerR2 * 1000, 4)} mW`,
    `Total Power: ${formatNumber(result.totalPower * 1000, 4)} mW`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50)
  ];
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Voltage Divider Calculator");
  
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

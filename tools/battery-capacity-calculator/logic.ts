import {
  BatteryType,
  BatteryCapacityInputs,
  BatteryCapacityResult,
  Preset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "battery-capacity-calculator-history";
const MAX_HISTORY = 10;

/**
 * Get default efficiency for battery type
 */
export function getDefaultEfficiency(batteryType: BatteryType): number {
  switch (batteryType) {
    case 'lead-acid':
      return 0.80; // 80%
    case 'lithium-ion':
      return 0.90; // 90%
    case 'lifepo4':
      return 0.95; // 95%
    default:
      return 0.85;
  }
}

/**
 * Calculate battery capacity
 */
export function calculateBatteryCapacity(inputs: BatteryCapacityInputs): BatteryCapacityResult {
  const { power, voltage, runtime, efficiency, batteryType } = inputs;
  
  const steps: string[] = [];
  
  steps.push(`Battery Type: ${getBatteryTypeLabel(batteryType)}`);
  steps.push(`Given Values:`);
  steps.push(`Load Power = ${power} W`);
  steps.push(`Battery Voltage = ${voltage} V`);
  steps.push(`Runtime = ${runtime} hours`);
  steps.push(`System Efficiency = ${formatNumber(efficiency * 100, 0)}%`);
  steps.push(``);
  
  // Calculate energy required in Wh
  const capacityWhActual = power * runtime;
  steps.push(`Step 1: Calculate Energy Required`);
  steps.push(`Energy (Wh) = Power × Time`);
  steps.push(`Energy = ${power} × ${runtime}`);
  steps.push(`Energy = ${formatNumber(capacityWhActual, 2)} Wh`);
  steps.push(``);
  
  // Calculate ideal capacity in Ah
  const capacityAh = capacityWhActual / voltage;
  steps.push(`Step 2: Calculate Ideal Battery Capacity`);
  steps.push(`Capacity (Ah) = Energy / Voltage`);
  steps.push(`Capacity = ${formatNumber(capacityWhActual, 2)} / ${voltage}`);
  steps.push(`Capacity = ${formatNumber(capacityAh, 2)} Ah`);
  steps.push(``);
  
  // Adjust for efficiency
  const capacityAhAdjusted = capacityAh / efficiency;
  steps.push(`Step 3: Adjust for System Efficiency`);
  steps.push(`Adjusted Capacity = Ideal Capacity / Efficiency`);
  steps.push(`Adjusted Capacity = ${formatNumber(capacityAh, 2)} / ${efficiency}`);
  steps.push(`Adjusted Capacity = ${formatNumber(capacityAhAdjusted, 2)} Ah`);
  steps.push(``);
  
  // Calculate current draw
  const current = power / voltage;
  steps.push(`Step 4: Calculate Current Draw`);
  steps.push(`Current (A) = Power / Voltage`);
  steps.push(`Current = ${power} / ${voltage}`);
  steps.push(`Current = ${formatNumber(current, 2)} A`);
  
  return {
    capacityAh,
    capacityWhActual,
    capacityAhAdjusted,
    current,
    batteryType,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Get battery type label
 */
function getBatteryTypeLabel(type: BatteryType): string {
  switch (type) {
    case 'lead-acid':
      return 'Lead Acid';
    case 'lithium-ion':
      return 'Lithium-ion';
    case 'lifepo4':
      return 'LiFePO4';
    default:
      return 'Unknown';
  }
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: BatteryCapacityInputs): string | null {
  const { power, voltage, runtime, efficiency } = inputs;
  
  if (isNaN(power) || power <= 0) {
    return 'Power must be greater than 0';
  }
  
  if (isNaN(voltage) || voltage <= 0) {
    return 'Voltage must be greater than 0';
  }
  
  if (isNaN(runtime) || runtime <= 0) {
    return 'Runtime must be greater than 0';
  }
  
  if (isNaN(efficiency) || efficiency <= 0 || efficiency > 1) {
    return 'Efficiency must be between 0 and 1';
  }
  
  return null;
}

/**
 * Get preset configurations
 */
export function getPresets(): Preset[] {
  return [
    {
      name: 'LED Light Backup',
      description: '12V LED lights for 8 hours',
      power: 60,
      voltage: 12,
      runtime: 8,
      batteryType: 'lead-acid'
    },
    {
      name: 'Router & Modem',
      description: 'Internet backup for 4 hours',
      power: 30,
      voltage: 12,
      runtime: 4,
      batteryType: 'lithium-ion'
    },
    {
      name: 'Small Inverter Load',
      description: '100W load for 5 hours',
      power: 100,
      voltage: 12,
      runtime: 5,
      batteryType: 'lead-acid'
    },
    {
      name: 'Solar System',
      description: '500W load for 10 hours',
      power: 500,
      voltage: 24,
      runtime: 10,
      batteryType: 'lifepo4'
    },
    {
      name: 'RV/Camper',
      description: '200W load for 12 hours',
      power: 200,
      voltage: 12,
      runtime: 12,
      batteryType: 'lithium-ion'
    },
    {
      name: 'Emergency Backup',
      description: '300W load for 6 hours',
      power: 300,
      voltage: 24,
      runtime: 6,
      batteryType: 'lifepo4'
    }
  ];
}

/**
 * Get common voltage values
 */
export function getCommonVoltages(): number[] {
  return [12, 24, 48];
}

/**
 * Format number with decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// History management
export function saveToHistory(inputs: BatteryCapacityInputs, result: BatteryCapacityResult): void {
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
export function exportToText(inputs: BatteryCapacityInputs, result: BatteryCapacityResult): string {
  const lines = [
    "BATTERY CAPACITY CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Load Power: ${inputs.power} W`,
    `Battery Voltage: ${inputs.voltage} V`,
    `Runtime: ${inputs.runtime} hours`,
    `Battery Type: ${getBatteryTypeLabel(result.batteryType)}`,
    `System Efficiency: ${formatNumber(inputs.efficiency * 100, 0)}%`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Required Capacity (Ideal): ${formatNumber(result.capacityAh, 2)} Ah`,
    `Required Capacity (Adjusted): ${formatNumber(result.capacityAhAdjusted, 2)} Ah`,
    `Energy Required: ${formatNumber(result.capacityWhActual, 2)} Wh`,
    `Current Draw: ${formatNumber(result.current, 2)} A`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50)
  ];
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Battery Capacity Calculator");
  
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

import {
  CapacityUnit,
  BatteryChargingInputs,
  BatteryChargingResult,
  ChargingPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "battery-charging-time-calculator-history";
const MAX_HISTORY = 10;

/**
 * Convert capacity to Ah
 */
export function convertToAh(capacity: number, unit: CapacityUnit): number {
  return unit === 'mAh' ? capacity / 1000 : capacity;
}

/**
 * Calculate battery charging time
 */
export function calculateChargingTime(inputs: BatteryChargingInputs): BatteryChargingResult {
  const { capacity, capacityUnit, chargingCurrent, efficiency, startPercentage, endPercentage, voltage } = inputs;
  
  const steps: string[] = [];
  
  // Convert capacity to Ah
  const capacityAh = convertToAh(capacity, capacityUnit);
  
  steps.push(`Given Values:`);
  steps.push(`Battery Capacity = ${capacity} ${capacityUnit} (${formatNumber(capacityAh, 3)} Ah)`);
  steps.push(`Charging Current = ${chargingCurrent} A`);
  steps.push(`Charging Efficiency = ${efficiency}%`);
  steps.push(`Start Level = ${startPercentage}%`);
  steps.push(`End Level = ${endPercentage}%`);
  if (voltage) {
    steps.push(`Battery Voltage = ${voltage} V`);
  }
  steps.push(``);
  
  // Step 1: Calculate effective capacity to charge
  const chargeRange = endPercentage - startPercentage;
  const effectiveCapacityAh = capacityAh * (chargeRange / 100);
  steps.push(`Step 1: Calculate Effective Capacity to Charge`);
  steps.push(`Charge Range = End% - Start%`);
  steps.push(`Charge Range = ${endPercentage}% - ${startPercentage}% = ${chargeRange}%`);
  steps.push(`Effective Capacity = Total Capacity × (Charge Range / 100)`);
  steps.push(`Effective Capacity = ${formatNumber(capacityAh, 3)} × ${chargeRange / 100}`);
  steps.push(`Effective Capacity = ${formatNumber(effectiveCapacityAh, 3)} Ah`);
  steps.push(``);
  
  // Step 2: Calculate ideal charging time
  const idealTimeHours = effectiveCapacityAh / chargingCurrent;
  steps.push(`Step 2: Calculate Ideal Charging Time`);
  steps.push(`Ideal Time (hours) = Effective Capacity / Charging Current`);
  steps.push(`Ideal Time = ${formatNumber(effectiveCapacityAh, 3)} / ${chargingCurrent}`);
  steps.push(`Ideal Time = ${formatNumber(idealTimeHours, 3)} hours`);
  steps.push(``);
  
  // Step 3: Adjust for efficiency
  const chargingTimeHours = idealTimeHours / (efficiency / 100);
  steps.push(`Step 3: Adjust for Charging Efficiency`);
  steps.push(`Actual Time = Ideal Time / (Efficiency / 100)`);
  steps.push(`Actual Time = ${formatNumber(idealTimeHours, 3)} / ${efficiency / 100}`);
  steps.push(`Actual Time = ${formatNumber(chargingTimeHours, 3)} hours`);
  steps.push(``);
  
  // Calculate energy if voltage provided
  let energyWh = 0;
  if (voltage) {
    energyWh = effectiveCapacityAh * voltage;
    steps.push(`Additional Info: Energy Required`);
    steps.push(`Energy (Wh) = Effective Capacity × Voltage`);
    steps.push(`Energy = ${formatNumber(effectiveCapacityAh, 3)} × ${voltage}`);
    steps.push(`Energy = ${formatNumber(energyWh, 2)} Wh`);
  }
  
  // Format time as HH:MM
  const chargingTimeFormatted = formatTimeHHMM(chargingTimeHours);
  
  return {
    chargingTimeHours,
    chargingTimeFormatted,
    effectiveCapacityAh,
    energyWh,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Format time in hours to HH:MM format
 */
export function formatTimeHHMM(hours: number): string {
  const totalMinutes = Math.floor(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: BatteryChargingInputs): string | null {
  const { capacity, chargingCurrent, efficiency, startPercentage, endPercentage } = inputs;
  
  if (isNaN(capacity) || capacity <= 0) {
    return 'Battery capacity must be greater than 0';
  }
  
  if (isNaN(chargingCurrent) || chargingCurrent <= 0) {
    return 'Charging current must be greater than 0';
  }
  
  if (isNaN(efficiency) || efficiency <= 0 || efficiency > 100) {
    return 'Efficiency must be between 0 and 100';
  }
  
  if (isNaN(startPercentage) || startPercentage < 0 || startPercentage > 100) {
    return 'Start percentage must be between 0 and 100';
  }
  
  if (isNaN(endPercentage) || endPercentage < 0 || endPercentage > 100) {
    return 'End percentage must be between 0 and 100';
  }
  
  if (endPercentage <= startPercentage) {
    return 'End percentage must be greater than start percentage';
  }
  
  // Warning for unrealistic values
  const capacityAh = convertToAh(capacity, inputs.capacityUnit);
  if (capacityAh > 10000) {
    return 'Capacity seems unrealistically high (>10000Ah)';
  }
  
  if (chargingCurrent > 1000) {
    return 'Charging current seems unrealistically high (>1000A)';
  }
  
  return null;
}

/**
 * Get charging presets
 */
export function getChargingPresets(): ChargingPreset[] {
  return [
    {
      name: 'Smartphone',
      description: '4000mAh with 2A charger',
      capacity: 4000,
      capacityUnit: 'mAh',
      chargingCurrent: 2,
      efficiency: 85
    },
    {
      name: 'Tablet',
      description: '8000mAh with 2.4A charger',
      capacity: 8000,
      capacityUnit: 'mAh',
      chargingCurrent: 2.4,
      efficiency: 85
    },
    {
      name: 'Power Bank',
      description: '20000mAh with 3A charger',
      capacity: 20000,
      capacityUnit: 'mAh',
      chargingCurrent: 3,
      efficiency: 80
    },
    {
      name: 'Laptop Battery',
      description: '5000mAh with 3A charger',
      capacity: 5000,
      capacityUnit: 'mAh',
      chargingCurrent: 3,
      efficiency: 90
    },
    {
      name: 'Car Battery',
      description: '60Ah with 10A charger',
      capacity: 60,
      capacityUnit: 'Ah',
      chargingCurrent: 10,
      efficiency: 80
    },
    {
      name: 'E-Bike Battery',
      description: '15Ah with 5A charger',
      capacity: 15,
      capacityUnit: 'Ah',
      chargingCurrent: 5,
      efficiency: 85
    }
  ];
}

/**
 * Get common charger currents
 */
export function getCommonCurrents(): number[] {
  return [0.5, 1, 2, 2.4, 3, 5, 10];
}

/**
 * Format number with decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

/**
 * Get charging speed description
 */
export function getChargingSpeedDescription(timeHours: number): string {
  if (timeHours < 1) return 'Very Fast Charging';
  if (timeHours < 2) return 'Fast Charging';
  if (timeHours < 4) return 'Normal Charging';
  if (timeHours < 8) return 'Slow Charging';
  return 'Very Slow Charging';
}

/**
 * Get efficiency recommendation
 */
export function getEfficiencyRecommendation(capacityUnit: CapacityUnit): string {
  if (capacityUnit === 'mAh') {
    return 'Typical phone/tablet chargers: 85-90% efficiency';
  }
  return 'Typical car/battery chargers: 75-85% efficiency';
}

// History management
export function saveToHistory(inputs: BatteryChargingInputs, result: BatteryChargingResult): void {
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
export function exportToText(inputs: BatteryChargingInputs, result: BatteryChargingResult): string {
  const lines = [
    "BATTERY CHARGING TIME CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Battery Capacity: ${inputs.capacity} ${inputs.capacityUnit}`,
    `Charging Current: ${inputs.chargingCurrent} A`,
    `Charging Efficiency: ${inputs.efficiency}%`,
    `Start Level: ${inputs.startPercentage}%`,
    `End Level: ${inputs.endPercentage}%`,
    inputs.voltage ? `Battery Voltage: ${inputs.voltage} V` : '',
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Charging Time: ${formatNumber(result.chargingTimeHours, 2)} hours`,
    `Formatted Time: ${result.chargingTimeFormatted}`,
    `Effective Capacity: ${formatNumber(result.effectiveCapacityAh, 3)} Ah`,
    result.energyWh > 0 ? `Energy Required: ${formatNumber(result.energyWh, 2)} Wh` : '',
    `Charging Speed: ${getChargingSpeedDescription(result.chargingTimeHours)}`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50)
  ].filter(line => line !== '');
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Battery Charging Time Calculator");
  
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

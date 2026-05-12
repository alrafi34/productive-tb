import {
  BatteryBackupInputs,
  BatteryBackupResult,
  BatteryPreset,
  LoadPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "battery-backup-time-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate battery backup time
 */
export function calculateBackupTime(inputs: BatteryBackupInputs): BatteryBackupResult {
  const { voltage, capacity, loadPower, efficiency, depthOfDischarge = 100 } = inputs;
  
  const steps: string[] = [];
  
  steps.push(`Given Values:`);
  steps.push(`Battery Voltage = ${voltage} V`);
  steps.push(`Battery Capacity = ${capacity} Ah`);
  steps.push(`Load Power = ${loadPower} W`);
  steps.push(`System Efficiency = ${efficiency}%`);
  if (depthOfDischarge < 100) {
    steps.push(`Depth of Discharge = ${depthOfDischarge}%`);
  }
  steps.push(``);
  
  // Step 1: Calculate total battery energy
  const energyWh = voltage * capacity;
  steps.push(`Step 1: Calculate Total Battery Energy`);
  steps.push(`Energy (Wh) = Voltage × Capacity`);
  steps.push(`Energy = ${voltage} × ${capacity}`);
  steps.push(`Energy = ${formatNumber(energyWh, 2)} Wh`);
  steps.push(``);
  
  // Step 2: Apply depth of discharge
  let usableEnergy = energyWh;
  if (depthOfDischarge < 100) {
    usableEnergy = energyWh * (depthOfDischarge / 100);
    steps.push(`Step 2: Apply Depth of Discharge`);
    steps.push(`Usable Energy = Total Energy × (DoD / 100)`);
    steps.push(`Usable Energy = ${formatNumber(energyWh, 2)} × ${depthOfDischarge / 100}`);
    steps.push(`Usable Energy = ${formatNumber(usableEnergy, 2)} Wh`);
    steps.push(``);
  }
  
  // Step 3: Apply efficiency
  const effectiveEnergyWh = usableEnergy * (efficiency / 100);
  const stepNum = depthOfDischarge < 100 ? 3 : 2;
  steps.push(`Step ${stepNum}: Apply System Efficiency`);
  steps.push(`Effective Energy = Usable Energy × (Efficiency / 100)`);
  steps.push(`Effective Energy = ${formatNumber(usableEnergy, 2)} × ${efficiency / 100}`);
  steps.push(`Effective Energy = ${formatNumber(effectiveEnergyWh, 2)} Wh`);
  steps.push(``);
  
  // Step 4: Calculate backup time
  const backupTimeHours = effectiveEnergyWh / loadPower;
  const finalStepNum = depthOfDischarge < 100 ? 4 : 3;
  steps.push(`Step ${finalStepNum}: Calculate Backup Time`);
  steps.push(`Backup Time (hours) = Effective Energy / Load Power`);
  steps.push(`Backup Time = ${formatNumber(effectiveEnergyWh, 2)} / ${loadPower}`);
  steps.push(`Backup Time = ${formatNumber(backupTimeHours, 2)} hours`);
  steps.push(``);
  
  // Calculate current draw
  const currentDraw = loadPower / voltage;
  steps.push(`Additional Info: Current Draw`);
  steps.push(`Current (A) = Load Power / Voltage`);
  steps.push(`Current = ${loadPower} / ${voltage}`);
  steps.push(`Current = ${formatNumber(currentDraw, 2)} A`);
  
  // Format time as HH:MM
  const backupTimeFormatted = formatTimeHHMM(backupTimeHours);
  
  return {
    backupTimeHours,
    backupTimeFormatted,
    energyWh,
    effectiveEnergyWh,
    currentDraw,
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
export function validateInputs(inputs: BatteryBackupInputs): string | null {
  const { voltage, capacity, loadPower, efficiency } = inputs;
  
  if (isNaN(voltage) || voltage <= 0) {
    return 'Battery voltage must be greater than 0';
  }
  
  if (isNaN(capacity) || capacity <= 0) {
    return 'Battery capacity must be greater than 0';
  }
  
  if (isNaN(loadPower) || loadPower <= 0) {
    return 'Load power must be greater than 0';
  }
  
  if (isNaN(efficiency) || efficiency <= 0 || efficiency > 100) {
    return 'Efficiency must be between 0 and 100';
  }
  
  // Warning for unrealistic values
  if (voltage > 1000) {
    return 'Voltage seems unrealistically high (>1000V)';
  }
  
  if (capacity > 10000) {
    return 'Capacity seems unrealistically high (>10000Ah)';
  }
  
  if (loadPower > 100000) {
    return 'Load power seems unrealistically high (>100kW)';
  }
  
  return null;
}

/**
 * Get battery presets
 */
export function getBatteryPresets(): BatteryPreset[] {
  return [
    {
      name: 'Small UPS',
      description: '12V 7Ah battery for router/modem',
      voltage: 12,
      capacity: 7,
      loadPower: 30,
      efficiency: 85
    },
    {
      name: 'Home Inverter',
      description: '12V 100Ah for basic home backup',
      voltage: 12,
      capacity: 100,
      loadPower: 150,
      efficiency: 85
    },
    {
      name: 'Solar System',
      description: '24V 200Ah solar battery bank',
      voltage: 24,
      capacity: 200,
      loadPower: 500,
      efficiency: 90
    },
    {
      name: 'RV Battery',
      description: '12V 150Ah for recreational vehicle',
      voltage: 12,
      capacity: 150,
      loadPower: 200,
      efficiency: 88
    },
    {
      name: 'Large Backup',
      description: '48V 200Ah for heavy loads',
      voltage: 48,
      capacity: 200,
      loadPower: 1000,
      efficiency: 92
    },
    {
      name: 'LED Lighting',
      description: '12V 50Ah for LED backup',
      voltage: 12,
      capacity: 50,
      loadPower: 60,
      efficiency: 90
    }
  ];
}

/**
 * Get load presets
 */
export function getLoadPresets(): LoadPreset[] {
  return [
    { name: 'LED Lights', power: 60, description: '10W × 6 bulbs' },
    { name: 'Router + Modem', power: 30, description: 'Internet backup' },
    { name: 'Laptop', power: 65, description: 'Typical laptop charger' },
    { name: 'Fan', power: 75, description: 'Ceiling fan' },
    { name: 'TV', power: 120, description: 'LED TV 40-50"' },
    { name: 'Refrigerator', power: 150, description: 'Small fridge' },
    { name: 'Desktop PC', power: 200, description: 'Computer + monitor' },
    { name: 'Air Conditioner', power: 1500, description: '1.5 ton AC' }
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

/**
 * Get load suggestion based on power
 */
export function getLoadSuggestion(power: number): string | null {
  if (power <= 0) return null;
  
  if (power <= 40) return 'Suitable for: Router, modem, LED lights';
  if (power <= 80) return 'Suitable for: Laptop, small fans, LED lighting';
  if (power <= 150) return 'Suitable for: TV, desktop PC, refrigerator';
  if (power <= 300) return 'Suitable for: Multiple appliances, small inverter';
  if (power <= 1000) return 'Suitable for: Heavy loads, large inverter';
  return 'Suitable for: Very heavy loads, industrial applications';
}

// History management
export function saveToHistory(inputs: BatteryBackupInputs, result: BatteryBackupResult): void {
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
export function exportToText(inputs: BatteryBackupInputs, result: BatteryBackupResult): string {
  const lines = [
    "BATTERY BACKUP TIME CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Battery Voltage: ${inputs.voltage} V`,
    `Battery Capacity: ${inputs.capacity} Ah`,
    `Load Power: ${inputs.loadPower} W`,
    `System Efficiency: ${inputs.efficiency}%`,
    inputs.depthOfDischarge && inputs.depthOfDischarge < 100 
      ? `Depth of Discharge: ${inputs.depthOfDischarge}%` 
      : '',
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Backup Time: ${formatNumber(result.backupTimeHours, 2)} hours`,
    `Formatted Time: ${result.backupTimeFormatted}`,
    `Total Battery Energy: ${formatNumber(result.energyWh, 2)} Wh`,
    `Effective Energy: ${formatNumber(result.effectiveEnergyWh, 2)} Wh`,
    `Current Draw: ${formatNumber(result.currentDraw, 2)} A`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50)
  ].filter(line => line !== '');
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Battery Backup Time Calculator");
  
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

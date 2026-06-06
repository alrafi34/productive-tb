import { SolarBatteryInputs, SolarBatteryResult, BatteryPreset, SystemVoltage, HistoryEntry } from "./types";

// Battery presets for common scenarios
export const BATTERY_PRESETS: BatteryPreset[] = [
  {
    name: "Small Off-Grid Cabin",
    dailyLoad: 2,
    backupDays: 2,
    systemVoltage: 12,
    description: "Basic lighting and small appliances"
  },
  {
    name: "Medium Home Backup",
    dailyLoad: 5,
    backupDays: 2,
    systemVoltage: 24,
    description: "Essential loads during outage"
  },
  {
    name: "Large Home Backup",
    dailyLoad: 10,
    backupDays: 2,
    systemVoltage: 48,
    description: "Full home backup power"
  },
  {
    name: "Off-Grid Home",
    dailyLoad: 8,
    backupDays: 3,
    systemVoltage: 48,
    description: "Complete off-grid system"
  },
  {
    name: "RV/Camper",
    dailyLoad: 3,
    backupDays: 1,
    systemVoltage: 12,
    description: "Mobile solar system"
  }
];

// Standard battery sizes (Ah) for recommendations
const STANDARD_BATTERY_SIZES = [50, 100, 150, 200, 250, 300, 400, 500];

// Calculate solar battery requirements
export function calculateSolarBattery(inputs: SolarBatteryInputs): SolarBatteryResult {
  const { dailyLoad, backupDays, systemVoltage, batteryEfficiency, depthOfDischarge } = inputs;
  
  const steps: string[] = [];
  
  steps.push('Solar Battery Capacity Calculation');
  steps.push('');
  
  // Step 1: Calculate total energy required
  steps.push('Step 1: Calculate Total Energy Required');
  steps.push(`Formula: Total Energy (Wh) = Daily Load (kWh) × 1000 × Backup Days`);
  steps.push(`Total Energy = ${dailyLoad} × 1000 × ${backupDays}`);
  
  const totalEnergyWh = dailyLoad * 1000 * backupDays;
  steps.push(`Total Energy = ${totalEnergyWh.toFixed(0)} Wh`);
  steps.push('');
  
  // Step 2: Adjust for battery efficiency
  steps.push('Step 2: Adjust for Battery Efficiency');
  steps.push(`Formula: Adjusted Energy = Total Energy / Efficiency`);
  steps.push(`Adjusted Energy = ${totalEnergyWh.toFixed(0)} / ${batteryEfficiency}`);
  
  const adjustedEnergyWh = totalEnergyWh / batteryEfficiency;
  steps.push(`Adjusted Energy = ${adjustedEnergyWh.toFixed(0)} Wh`);
  steps.push('');
  
  // Step 3: Adjust for depth of discharge
  steps.push('Step 3: Adjust for Depth of Discharge (DoD)');
  steps.push(`Formula: Usable Energy = Adjusted Energy / DoD`);
  steps.push(`Usable Energy = ${adjustedEnergyWh.toFixed(0)} / ${depthOfDischarge}`);
  
  const usableEnergyWh = adjustedEnergyWh / depthOfDischarge;
  steps.push(`Usable Energy = ${usableEnergyWh.toFixed(0)} Wh`);
  steps.push('');
  
  // Step 4: Convert to Ampere-hours
  steps.push('Step 4: Convert to Battery Capacity (Ah)');
  steps.push(`Formula: Capacity (Ah) = Usable Energy (Wh) / System Voltage (V)`);
  steps.push(`Capacity = ${usableEnergyWh.toFixed(0)} / ${systemVoltage}`);
  
  const batteryCapacityAh = usableEnergyWh / systemVoltage;
  steps.push(`Capacity = ${batteryCapacityAh.toFixed(2)} Ah`);
  steps.push('');
  
  // Step 5: Calculate total stored energy
  const totalStoredEnergykWh = (batteryCapacityAh * systemVoltage) / 1000;
  steps.push('Step 5: Total Stored Energy');
  steps.push(`Total Energy = ${batteryCapacityAh.toFixed(2)} Ah × ${systemVoltage}V / 1000`);
  steps.push(`Total Energy = ${totalStoredEnergykWh.toFixed(2)} kWh`);
  
  // Generate battery bank configuration
  const batteryBankConfig = generateBatteryConfig(batteryCapacityAh, systemVoltage);
  const recommendedBatteries = calculateRecommendedBatteries(batteryCapacityAh);
  
  return {
    totalEnergyWh,
    adjustedEnergyWh,
    usableEnergyWh,
    batteryCapacityAh,
    totalStoredEnergykWh,
    batteryBankConfig,
    recommendedBatteries,
    steps
  };
}

// Generate battery bank configuration suggestions
function generateBatteryConfig(capacityAh: number, voltage: SystemVoltage): string[] {
  const configs: string[] = [];
  
  // Find closest standard battery sizes
  for (const size of STANDARD_BATTERY_SIZES) {
    const numBatteries = Math.ceil(capacityAh / size);
    if (numBatteries <= 8) { // Reasonable number of batteries
      configs.push(`${numBatteries} × ${size}Ah batteries (${voltage}V system)`);
    }
  }
  
  // Add series/parallel configurations for different voltages
  if (voltage === 24) {
    configs.push(`2 × 12V batteries in series, ${Math.ceil(capacityAh / 200)}Ah each`);
  } else if (voltage === 48) {
    configs.push(`4 × 12V batteries in series, ${Math.ceil(capacityAh / 200)}Ah each`);
  }
  
  return configs.slice(0, 5); // Return top 5 configurations
}

// Calculate recommended number of batteries
function calculateRecommendedBatteries(capacityAh: number): number {
  // Use 200Ah as standard battery size
  return Math.ceil(capacityAh / 200);
}

// Validate inputs
export function validateInputs(inputs: SolarBatteryInputs): string | null {
  const { dailyLoad, backupDays, systemVoltage, batteryEfficiency, depthOfDischarge } = inputs;
  
  if (!dailyLoad || dailyLoad <= 0) {
    return "Daily load must be greater than 0 kWh";
  }
  
  if (dailyLoad > 100) {
    return "Daily load exceeds 100 kWh. Please verify or contact for commercial systems.";
  }
  
  if (!backupDays || backupDays <= 0) {
    return "Backup days must be at least 1 day";
  }
  
  if (backupDays > 10) {
    return "Backup days exceeds 10 days. Consider a larger system or generator backup.";
  }
  
  if (!systemVoltage || ![12, 24, 48].includes(systemVoltage)) {
    return "Please select a valid system voltage (12V, 24V, or 48V)";
  }
  
  if (batteryEfficiency < 0.5 || batteryEfficiency > 1) {
    return "Battery efficiency must be between 50% and 100%";
  }
  
  if (depthOfDischarge < 0.3 || depthOfDischarge > 1) {
    return "Depth of discharge must be between 30% and 100%";
  }
  
  return null;
}

// Get recommended system voltage based on load
export function getRecommendedVoltage(dailyLoad: number): SystemVoltage {
  if (dailyLoad < 3) return 12;
  if (dailyLoad < 8) return 24;
  return 48;
}

// Get recommended DoD based on battery type
export function getRecommendedDoD(batteryType: string): number {
  switch (batteryType) {
    case 'lithium': return 0.90;
    case 'agm': return 0.70;
    case 'gel': return 0.70;
    case 'lead-acid': return 0.50;
    default: return 0.80;
  }
}

// Format number with decimals
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// History management
const HISTORY_KEY = 'solar-battery-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: SolarBatteryInputs, result: SolarBatteryResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result
    };
    
    history.unshift(entry);
    
    if (history.length > MAX_HISTORY) {
      history.splice(MAX_HISTORY);
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load history:', error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

// Export to text
export function exportToText(inputs: SolarBatteryInputs, result: SolarBatteryResult): string {
  const lines: string[] = [];
  
  lines.push('SOLAR BATTERY CALCULATOR - SYSTEM REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('SYSTEM REQUIREMENTS:');
  lines.push('-'.repeat(50));
  lines.push(`Daily Load: ${inputs.dailyLoad} kWh`);
  lines.push(`Backup Duration: ${inputs.backupDays} days`);
  lines.push(`System Voltage: ${inputs.systemVoltage}V`);
  lines.push(`Battery Efficiency: ${(inputs.batteryEfficiency * 100).toFixed(0)}%`);
  lines.push(`Depth of Discharge: ${(inputs.depthOfDischarge * 100).toFixed(0)}%`);
  lines.push('');
  lines.push('BATTERY SPECIFICATIONS:');
  lines.push('-'.repeat(50));
  lines.push(`Required Capacity: ${formatNumber(result.batteryCapacityAh, 2)} Ah`);
  lines.push(`Total Stored Energy: ${formatNumber(result.totalStoredEnergykWh, 2)} kWh`);
  lines.push(`Recommended Batteries: ${result.recommendedBatteries} × 200Ah`);
  lines.push('');
  lines.push('BATTERY BANK CONFIGURATIONS:');
  lines.push('-'.repeat(50));
  result.batteryBankConfig.forEach((config, index) => {
    lines.push(`Option ${index + 1}: ${config}`);
  });
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Solar Battery Calculator');
  
  return lines.join('\n');
}

// Export to CSV
export function exportToCSV(inputs: SolarBatteryInputs, result: SolarBatteryResult): string {
  let csv = 'Solar Battery System Report\n\n';
  csv += 'Parameter,Value\n';
  csv += `Daily Load (kWh),${inputs.dailyLoad}\n`;
  csv += `Backup Days,${inputs.backupDays}\n`;
  csv += `System Voltage (V),${inputs.systemVoltage}\n`;
  csv += `Battery Efficiency (%),${(inputs.batteryEfficiency * 100).toFixed(0)}\n`;
  csv += `Depth of Discharge (%),${(inputs.depthOfDischarge * 100).toFixed(0)}\n`;
  csv += '\n';
  csv += 'Results\n';
  csv += `Required Capacity (Ah),${formatNumber(result.batteryCapacityAh, 2)}\n`;
  csv += `Total Stored Energy (kWh),${formatNumber(result.totalStoredEnergykWh, 2)}\n`;
  csv += `Recommended Batteries,${result.recommendedBatteries}\n`;
  
  return csv;
}

// Download file
export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Save last used settings
const SETTINGS_KEY = 'solar-battery-calculator-settings';

export function saveSettings(settings: Partial<SolarBatteryInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<SolarBatteryInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

// Get warning message for DoD
export function getDoDWarning(dod: number): string | null {
  if (dod > 0.80) {
    return "High DoD (>80%) provides more usable capacity but may reduce battery lifespan. Recommended for lithium batteries only.";
  } else if (dod < 0.50) {
    return "Low DoD (<50%) extends battery life but reduces usable capacity. Common for lead-acid batteries.";
  }
  return null;
}

// Get system recommendation
export function getSystemRecommendation(inputs: SolarBatteryInputs, result: SolarBatteryResult): string {
  const recommendedVoltage = getRecommendedVoltage(inputs.dailyLoad);
  
  if (inputs.systemVoltage < recommendedVoltage) {
    return `Consider upgrading to ${recommendedVoltage}V system for better efficiency with ${inputs.dailyLoad} kWh daily load.`;
  } else if (inputs.dailyLoad > 15 && inputs.systemVoltage < 48) {
    return `For loads above 15 kWh/day, a 48V system is highly recommended for optimal efficiency and lower current.`;
  } else if (result.batteryCapacityAh > 1000) {
    return `Large battery bank (${formatNumber(result.batteryCapacityAh, 0)} Ah). Consider parallel battery strings or higher voltage system.`;
  }
  
  return `Your ${inputs.systemVoltage}V system is well-suited for ${inputs.dailyLoad} kWh daily load.`;
}

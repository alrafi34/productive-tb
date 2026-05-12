import { FanConsumptionInputs, FanConsumptionResult, FanPreset, FanType, HistoryEntry } from "./types";

// Fan presets with typical power ratings
export const FAN_PRESETS: FanPreset[] = [
  {
    name: "Ceiling Fan (Standard)",
    type: "ceiling",
    power: 75,
    typicalHours: 8,
    description: "Typical household ceiling fan"
  },
  {
    name: "Ceiling Fan (Energy Saver)",
    type: "ceiling",
    power: 50,
    typicalHours: 8,
    description: "Energy-efficient BLDC ceiling fan"
  },
  {
    name: "Table Fan (Small)",
    type: "table",
    power: 40,
    typicalHours: 6,
    description: "Small desk or table fan"
  },
  {
    name: "Table Fan (Medium)",
    type: "table",
    power: 60,
    typicalHours: 6,
    description: "Medium-sized table fan"
  },
  {
    name: "Pedestal Fan",
    type: "pedestal",
    power: 55,
    typicalHours: 8,
    description: "Standing pedestal fan"
  },
  {
    name: "Tower Fan",
    type: "tower",
    power: 45,
    typicalHours: 10,
    description: "Modern tower fan"
  },
  {
    name: "Exhaust Fan (Bathroom)",
    type: "exhaust",
    power: 30,
    typicalHours: 2,
    description: "Small bathroom exhaust fan"
  },
  {
    name: "Exhaust Fan (Kitchen)",
    type: "exhaust",
    power: 150,
    typicalHours: 3,
    description: "Kitchen chimney exhaust fan"
  },
  {
    name: "Industrial Fan",
    type: "industrial",
    power: 200,
    typicalHours: 12,
    description: "Large industrial/commercial fan"
  }
];

// Calculate fan power consumption
export function calculateFanConsumption(inputs: FanConsumptionInputs): FanConsumptionResult {
  const { power, hoursPerDay, daysPerMonth, tariff } = inputs;
  
  const steps: string[] = [];
  
  steps.push('Fan Power Consumption Calculation');
  steps.push('');
  steps.push('Step 1: Calculate Daily Energy Consumption');
  steps.push(`Formula: Daily Energy (kWh) = (Power × Hours) / 1000`);
  steps.push(`Daily Energy = (${power}W × ${hoursPerDay}h) / 1000`);
  
  // Daily consumption
  const dailyEnergy = (power * hoursPerDay) / 1000;
  steps.push(`Daily Energy = ${dailyEnergy.toFixed(3)} kWh`);
  steps.push('');
  
  steps.push('Step 2: Calculate Monthly Energy Consumption');
  steps.push(`Formula: Monthly Energy = Daily Energy × Days per Month`);
  steps.push(`Monthly Energy = ${dailyEnergy.toFixed(3)} × ${daysPerMonth}`);
  
  // Monthly consumption
  const monthlyEnergy = dailyEnergy * daysPerMonth;
  steps.push(`Monthly Energy = ${monthlyEnergy.toFixed(3)} kWh`);
  steps.push('');
  
  steps.push('Step 3: Calculate Yearly Energy Consumption');
  steps.push(`Formula: Yearly Energy = Daily Energy × 365`);
  steps.push(`Yearly Energy = ${dailyEnergy.toFixed(3)} × 365`);
  
  // Yearly consumption
  const yearlyEnergy = dailyEnergy * 365;
  steps.push(`Yearly Energy = ${yearlyEnergy.toFixed(3)} kWh`);
  steps.push('');
  
  steps.push('Step 4: Calculate Electricity Costs');
  steps.push(`Tariff Rate: ${tariff} per kWh`);
  
  // Calculate costs
  const dailyCost = dailyEnergy * tariff;
  const monthlyCost = monthlyEnergy * tariff;
  const yearlyCost = yearlyEnergy * tariff;
  
  steps.push(`Daily Cost = ${dailyEnergy.toFixed(3)} × ${tariff} = ${dailyCost.toFixed(2)}`);
  steps.push(`Monthly Cost = ${monthlyEnergy.toFixed(3)} × ${tariff} = ${monthlyCost.toFixed(2)}`);
  steps.push(`Yearly Cost = ${yearlyEnergy.toFixed(3)} × ${tariff} = ${yearlyCost.toFixed(2)}`);
  steps.push('');
  
  // Calculate current (assuming 230V)
  const current = power / 230;
  steps.push('Step 5: Calculate Current Draw (at 230V)');
  steps.push(`Formula: Current (A) = Power (W) / Voltage (V)`);
  steps.push(`Current = ${power} / 230 = ${current.toFixed(2)} A`);
  
  return {
    dailyEnergy,
    monthlyEnergy,
    yearlyEnergy,
    dailyCost,
    monthlyCost,
    yearlyCost,
    current,
    steps
  };
}

// Validate inputs
export function validateInputs(inputs: FanConsumptionInputs): string | null {
  const { power, hoursPerDay, daysPerMonth, tariff } = inputs;
  
  if (!power || power <= 0) {
    return "Fan power must be greater than 0 watts";
  }
  
  if (power > 1000) {
    return "Warning: Fan power exceeds 1000W. Please verify the wattage.";
  }
  
  if (!hoursPerDay || hoursPerDay < 0) {
    return "Usage hours must be 0 or greater";
  }
  
  if (hoursPerDay > 24) {
    return "Usage hours cannot exceed 24 hours per day";
  }
  
  if (!daysPerMonth || daysPerMonth <= 0 || daysPerMonth > 31) {
    return "Days per month must be between 1 and 31";
  }
  
  if (!tariff || tariff <= 0) {
    return "Electricity tariff must be greater than 0";
  }
  
  if (isNaN(power) || isNaN(hoursPerDay) || isNaN(daysPerMonth) || isNaN(tariff)) {
    return "Please enter valid numbers";
  }
  
  return null;
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
const HISTORY_KEY = 'fan-power-consumption-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: FanConsumptionInputs, result: FanConsumptionResult): void {
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
export function exportToText(inputs: FanConsumptionInputs, result: FanConsumptionResult): string {
  const lines: string[] = [];
  
  lines.push('FAN POWER CONSUMPTION CALCULATOR - REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('FAN SPECIFICATIONS:');
  lines.push('-'.repeat(50));
  lines.push(`Fan Type: ${inputs.fanType.charAt(0).toUpperCase() + inputs.fanType.slice(1)}`);
  lines.push(`Power Rating: ${inputs.power} W`);
  lines.push(`Usage: ${inputs.hoursPerDay} hours/day`);
  lines.push(`Days per Month: ${inputs.daysPerMonth}`);
  lines.push(`Electricity Tariff: ${inputs.tariff} per kWh`);
  lines.push(`Current Draw: ${formatNumber(result.current, 2)} A (at 230V)`);
  lines.push('');
  lines.push('ENERGY CONSUMPTION:');
  lines.push('-'.repeat(50));
  lines.push(`Daily: ${formatNumber(result.dailyEnergy, 3)} kWh`);
  lines.push(`Monthly: ${formatNumber(result.monthlyEnergy, 2)} kWh`);
  lines.push(`Yearly: ${formatNumber(result.yearlyEnergy, 2)} kWh`);
  lines.push('');
  lines.push('ELECTRICITY COSTS:');
  lines.push('-'.repeat(50));
  lines.push(`Daily Cost: ${formatNumber(result.dailyCost, 2)}`);
  lines.push(`Monthly Cost: ${formatNumber(result.monthlyCost, 2)}`);
  lines.push(`Yearly Cost: ${formatNumber(result.yearlyCost, 2)}`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Fan Power Consumption Calculator');
  
  return lines.join('\n');
}

// Export to CSV
export function exportToCSV(inputs: FanConsumptionInputs, result: FanConsumptionResult): string {
  let csv = 'Fan Power Consumption Report\n\n';
  csv += 'Parameter,Value\n';
  csv += `Fan Type,${inputs.fanType}\n`;
  csv += `Power (W),${inputs.power}\n`;
  csv += `Hours per Day,${inputs.hoursPerDay}\n`;
  csv += `Days per Month,${inputs.daysPerMonth}\n`;
  csv += `Tariff per kWh,${inputs.tariff}\n`;
  csv += `Current Draw (A),${formatNumber(result.current, 2)}\n`;
  csv += '\n';
  csv += 'Energy Consumption\n';
  csv += 'Period,Energy (kWh),Cost\n';
  csv += `Daily,${formatNumber(result.dailyEnergy, 3)},${formatNumber(result.dailyCost, 2)}\n`;
  csv += `Monthly,${formatNumber(result.monthlyEnergy, 2)},${formatNumber(result.monthlyCost, 2)}\n`;
  csv += `Yearly,${formatNumber(result.yearlyEnergy, 2)},${formatNumber(result.yearlyCost, 2)}\n`;
  
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
const SETTINGS_KEY = 'fan-power-consumption-settings';

export function saveSettings(settings: Partial<FanConsumptionInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<FanConsumptionInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

// Get cost comparison
export function getCostComparison(result: FanConsumptionResult) {
  return {
    perHour: result.dailyCost / (result.dailyEnergy > 0 ? (result.dailyEnergy * 1000) / result.dailyEnergy : 1),
    perWeek: result.dailyCost * 7,
    perMonth: result.monthlyCost,
    perYear: result.yearlyCost
  };
}

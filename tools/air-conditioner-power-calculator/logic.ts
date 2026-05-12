import { ACPowerInputs, ACPowerResult, ACPreset, ACCapacityTon, HistoryEntry } from "./types";

// Conversion constant: 1 Ton = 3517 Watts (approximately)
const WATTS_PER_TON = 3517;

// AC presets with typical configurations
export const AC_PRESETS: ACPreset[] = [
  {
    name: "Window AC (0.75 Ton)",
    capacityTon: 0.75,
    typicalHours: 6,
    description: "Small room, single occupant"
  },
  {
    name: "Split AC (1 Ton)",
    capacityTon: 1,
    typicalHours: 8,
    description: "Small to medium bedroom"
  },
  {
    name: "Split AC (1.5 Ton)",
    capacityTon: 1.5,
    typicalHours: 8,
    description: "Medium to large bedroom"
  },
  {
    name: "Split AC (2 Ton)",
    capacityTon: 2,
    typicalHours: 10,
    description: "Large room or living area"
  },
  {
    name: "Central AC (2.5 Ton)",
    capacityTon: 2.5,
    typicalHours: 12,
    description: "Multiple rooms or office"
  },
  {
    name: "Central AC (3 Ton)",
    capacityTon: 3,
    typicalHours: 12,
    description: "Large home or commercial space"
  }
];

// Calculate AC power consumption
export function calculateACPower(inputs: ACPowerInputs): ACPowerResult {
  const { capacityUnit, capacityTon, capacityWatt, hoursPerDay, daysPerMonth, tariff } = inputs;
  
  const steps: string[] = [];
  
  steps.push('Air Conditioner Power Consumption Calculation');
  steps.push('');
  
  // Step 1: Determine power in watts
  let powerWatts: number;
  
  if (capacityUnit === 'ton' && capacityTon) {
    steps.push('Step 1: Convert AC Capacity to Watts');
    steps.push(`Formula: Power (W) = Capacity (Ton) × ${WATTS_PER_TON}`);
    steps.push(`Power = ${capacityTon} × ${WATTS_PER_TON}`);
    powerWatts = capacityTon * WATTS_PER_TON;
    steps.push(`Power = ${powerWatts.toFixed(2)} W`);
  } else {
    steps.push('Step 1: Power Rating');
    powerWatts = capacityWatt || 0;
    steps.push(`Power = ${powerWatts} W`);
  }
  steps.push('');
  
  // Step 2: Calculate daily energy consumption
  steps.push('Step 2: Calculate Daily Energy Consumption');
  steps.push(`Formula: Daily Energy (kWh) = (Power × Hours) / 1000`);
  steps.push(`Daily Energy = (${powerWatts.toFixed(2)} × ${hoursPerDay}) / 1000`);
  
  const dailyEnergy = (powerWatts * hoursPerDay) / 1000;
  steps.push(`Daily Energy = ${dailyEnergy.toFixed(3)} kWh`);
  steps.push('');
  
  // Step 3: Calculate monthly energy consumption
  steps.push('Step 3: Calculate Monthly Energy Consumption');
  steps.push(`Formula: Monthly Energy = Daily Energy × Days per Month`);
  steps.push(`Monthly Energy = ${dailyEnergy.toFixed(3)} × ${daysPerMonth}`);
  
  const monthlyEnergy = dailyEnergy * daysPerMonth;
  steps.push(`Monthly Energy = ${monthlyEnergy.toFixed(2)} kWh`);
  steps.push('');
  
  // Step 4: Calculate yearly energy consumption
  steps.push('Step 4: Calculate Yearly Energy Consumption');
  steps.push(`Formula: Yearly Energy = Daily Energy × 365`);
  steps.push(`Yearly Energy = ${dailyEnergy.toFixed(3)} × 365`);
  
  const yearlyEnergy = dailyEnergy * 365;
  steps.push(`Yearly Energy = ${yearlyEnergy.toFixed(2)} kWh`);
  steps.push('');
  
  // Step 5: Calculate costs
  steps.push('Step 5: Calculate Electricity Costs');
  steps.push(`Tariff Rate: ${tariff} per kWh`);
  
  const dailyCost = dailyEnergy * tariff;
  const monthlyCost = monthlyEnergy * tariff;
  const yearlyCost = yearlyEnergy * tariff;
  
  steps.push(`Daily Cost = ${dailyEnergy.toFixed(3)} × ${tariff} = ${dailyCost.toFixed(2)}`);
  steps.push(`Monthly Cost = ${monthlyEnergy.toFixed(2)} × ${tariff} = ${monthlyCost.toFixed(2)}`);
  steps.push(`Yearly Cost = ${yearlyEnergy.toFixed(2)} × ${tariff} = ${yearlyCost.toFixed(2)}`);
  steps.push('');
  
  // Step 6: Calculate current draw (assuming 230V)
  const current = powerWatts / 230;
  steps.push('Step 6: Calculate Current Draw (at 230V)');
  steps.push(`Formula: Current (A) = Power (W) / Voltage (V)`);
  steps.push(`Current = ${powerWatts.toFixed(2)} / 230 = ${current.toFixed(2)} A`);
  
  // Determine consumption level
  let consumptionLevel: 'low' | 'moderate' | 'high' | 'very-high';
  if (monthlyEnergy < 200) {
    consumptionLevel = 'low';
  } else if (monthlyEnergy < 400) {
    consumptionLevel = 'moderate';
  } else if (monthlyEnergy < 600) {
    consumptionLevel = 'high';
  } else {
    consumptionLevel = 'very-high';
  }
  
  return {
    powerWatts,
    dailyEnergy,
    monthlyEnergy,
    yearlyEnergy,
    dailyCost,
    monthlyCost,
    yearlyCost,
    current,
    consumptionLevel,
    steps
  };
}

// Validate inputs
export function validateInputs(inputs: ACPowerInputs): string | null {
  const { capacityUnit, capacityTon, capacityWatt, hoursPerDay, daysPerMonth, tariff } = inputs;
  
  if (capacityUnit === 'ton') {
    if (!capacityTon || capacityTon <= 0) {
      return "Please select a valid AC capacity in tons";
    }
  } else {
    if (!capacityWatt || capacityWatt <= 0) {
      return "AC power must be greater than 0 watts";
    }
    if (capacityWatt > 10000) {
      return "Warning: AC power exceeds 10,000W. Please verify the wattage.";
    }
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
  
  return null;
}

// Convert tons to watts
export function tonsToWatts(tons: number): number {
  return tons * WATTS_PER_TON;
}

// Convert watts to tons
export function wattsToTons(watts: number): number {
  return watts / WATTS_PER_TON;
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
const HISTORY_KEY = 'ac-power-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: ACPowerInputs, result: ACPowerResult): void {
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
export function exportToText(inputs: ACPowerInputs, result: ACPowerResult): string {
  const lines: string[] = [];
  
  lines.push('AIR CONDITIONER POWER CALCULATOR - REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('AC SPECIFICATIONS:');
  lines.push('-'.repeat(50));
  
  if (inputs.capacityUnit === 'ton') {
    lines.push(`Capacity: ${inputs.capacityTon} Ton`);
  }
  lines.push(`Power Rating: ${formatNumber(result.powerWatts, 2)} W`);
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
  lines.push(`Consumption Level: ${result.consumptionLevel.toUpperCase()}`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Air Conditioner Power Calculator');
  
  return lines.join('\n');
}

// Export to CSV
export function exportToCSV(inputs: ACPowerInputs, result: ACPowerResult): string {
  let csv = 'Air Conditioner Power Consumption Report\n\n';
  csv += 'Parameter,Value\n';
  
  if (inputs.capacityUnit === 'ton') {
    csv += `Capacity (Ton),${inputs.capacityTon}\n`;
  }
  csv += `Power (W),${formatNumber(result.powerWatts, 2)}\n`;
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
const SETTINGS_KEY = 'ac-power-calculator-settings';

export function saveSettings(settings: Partial<ACPowerInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<ACPowerInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

// Get energy saving tips
export function getEnergySavingTip(result: ACPowerResult, inputs: ACPowerInputs): string {
  if (result.consumptionLevel === 'very-high') {
    return `Your AC consumes ${formatNumber(result.monthlyEnergy, 0)} kWh/month. Consider reducing usage by 2 hours/day to save approximately $${formatNumber(result.monthlyCost * (2 / inputs.hoursPerDay), 2)}/month.`;
  } else if (result.consumptionLevel === 'high') {
    return `Setting your AC temperature 1-2°C higher can reduce power consumption by 6-8%, saving $${formatNumber(result.monthlyCost * 0.07, 2)}/month.`;
  } else if (result.consumptionLevel === 'moderate') {
    return `Your AC usage is moderate. Regular filter cleaning can maintain efficiency and prevent increased power consumption.`;
  } else {
    return `Your AC usage is efficient! Using a programmable thermostat can optimize usage further.`;
  }
}

// Get consumption level color
export function getConsumptionLevelColor(level: string): string {
  switch (level) {
    case 'low': return 'text-green-600';
    case 'moderate': return 'text-blue-600';
    case 'high': return 'text-orange-600';
    case 'very-high': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

// Get consumption level background color
export function getConsumptionLevelBgColor(level: string): string {
  switch (level) {
    case 'low': return 'bg-green-50 border-green-200';
    case 'moderate': return 'bg-blue-50 border-blue-200';
    case 'high': return 'bg-orange-50 border-orange-200';
    case 'very-high': return 'bg-red-50 border-red-200';
    default: return 'bg-gray-50 border-gray-200';
  }
}

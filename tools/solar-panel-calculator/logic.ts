import { SolarPanelInputs, SolarPanelResult, SolarPreset, PanelWattage, HistoryEntry } from "./types";

// Constants
const DAYS_PER_MONTH = 30;
const DAYS_PER_YEAR = 365;
const PANEL_AREA_SQM = 2; // Average panel size in square meters
const CO2_PER_KWH = 0.92; // kg CO2 per kWh (average grid electricity)

// Solar presets for common scenarios
export const SOLAR_PRESETS: SolarPreset[] = [
  {
    name: "Small Home",
    monthlyUsage: 300,
    sunHours: 5,
    description: "1-2 bedroom apartment"
  },
  {
    name: "Medium Home",
    monthlyUsage: 600,
    sunHours: 5,
    description: "3-4 bedroom house"
  },
  {
    name: "Large Home",
    monthlyUsage: 1000,
    sunHours: 5,
    description: "Large house with AC"
  },
  {
    name: "Small Business",
    monthlyUsage: 1500,
    sunHours: 5.5,
    description: "Small office or shop"
  },
  {
    name: "Medium Business",
    monthlyUsage: 3000,
    sunHours: 5.5,
    description: "Medium commercial space"
  }
];

// Calculate solar panel requirements
export function calculateSolarPanel(inputs: SolarPanelInputs): SolarPanelResult {
  const { monthlyUsage, sunHours, panelWattage, systemEfficiency, electricityRate } = inputs;
  
  const steps: string[] = [];
  
  steps.push('Solar Panel System Calculation');
  steps.push('');
  
  // Step 1: Calculate daily energy consumption
  steps.push('Step 1: Calculate Daily Energy Consumption');
  steps.push(`Formula: Daily Usage = Monthly Usage / ${DAYS_PER_MONTH}`);
  steps.push(`Daily Usage = ${monthlyUsage} / ${DAYS_PER_MONTH}`);
  
  const dailyUsage = monthlyUsage / DAYS_PER_MONTH;
  steps.push(`Daily Usage = ${dailyUsage.toFixed(2)} kWh`);
  steps.push('');
  
  // Step 2: Calculate required system size
  steps.push('Step 2: Calculate Required System Size');
  steps.push(`Formula: System Size (kW) = Daily Usage / (Sun Hours × Efficiency)`);
  steps.push(`System Size = ${dailyUsage.toFixed(2)} / (${sunHours} × ${systemEfficiency})`);
  
  const systemSizeKW = dailyUsage / (sunHours * systemEfficiency);
  const systemSizeWatts = systemSizeKW * 1000;
  
  steps.push(`System Size = ${systemSizeKW.toFixed(2)} kW`);
  steps.push(`System Size = ${systemSizeWatts.toFixed(0)} W`);
  steps.push('');
  
  // Step 3: Calculate number of panels
  steps.push('Step 3: Calculate Number of Panels');
  steps.push(`Formula: Panels = System Size (W) / Panel Wattage`);
  steps.push(`Panels = ${systemSizeWatts.toFixed(0)} / ${panelWattage}`);
  
  const panelsNeeded = Math.ceil(systemSizeWatts / panelWattage);
  steps.push(`Panels = ${(systemSizeWatts / panelWattage).toFixed(2)}`);
  steps.push(`Rounded up: ${panelsNeeded} panels`);
  steps.push('');
  
  // Step 4: Calculate actual energy production
  steps.push('Step 4: Calculate Energy Production');
  steps.push(`Actual System Size = ${panelsNeeded} × ${panelWattage}W = ${panelsNeeded * panelWattage}W`);
  
  const actualSystemWatts = panelsNeeded * panelWattage;
  const actualSystemKW = actualSystemWatts / 1000;
  
  steps.push(`Formula: Daily Production = System Size (kW) × Sun Hours × Efficiency`);
  steps.push(`Daily Production = ${actualSystemKW.toFixed(2)} × ${sunHours} × ${systemEfficiency}`);
  
  const dailyProduction = actualSystemKW * sunHours * systemEfficiency;
  steps.push(`Daily Production = ${dailyProduction.toFixed(2)} kWh`);
  steps.push('');
  
  const monthlyProduction = dailyProduction * DAYS_PER_MONTH;
  const yearlyProduction = dailyProduction * DAYS_PER_YEAR;
  
  steps.push(`Monthly Production = ${dailyProduction.toFixed(2)} × ${DAYS_PER_MONTH} = ${monthlyProduction.toFixed(2)} kWh`);
  steps.push(`Yearly Production = ${dailyProduction.toFixed(2)} × ${DAYS_PER_YEAR} = ${yearlyProduction.toFixed(2)} kWh`);
  steps.push('');
  
  // Step 5: Calculate offset percentage
  steps.push('Step 5: Calculate Energy Offset');
  const offsetPercentage = (monthlyProduction / monthlyUsage) * 100;
  steps.push(`Offset = (${monthlyProduction.toFixed(2)} / ${monthlyUsage}) × 100`);
  steps.push(`Offset = ${offsetPercentage.toFixed(1)}%`);
  steps.push('');
  
  // Step 6: Calculate roof space
  steps.push('Step 6: Calculate Roof Space Required');
  const roofSpaceRequired = panelsNeeded * PANEL_AREA_SQM;
  steps.push(`Roof Space = ${panelsNeeded} panels × ${PANEL_AREA_SQM} m² per panel`);
  steps.push(`Roof Space = ${roofSpaceRequired} m²`);
  steps.push('');
  
  // Step 7: Calculate CO2 savings
  steps.push('Step 7: Calculate CO2 Savings');
  const co2Savings = yearlyProduction * CO2_PER_KWH;
  steps.push(`CO2 Savings = ${yearlyProduction.toFixed(2)} kWh × ${CO2_PER_KWH} kg/kWh`);
  steps.push(`CO2 Savings = ${co2Savings.toFixed(2)} kg per year`);
  
  // Calculate cost savings if electricity rate provided
  let monthlySavings: number | undefined;
  let yearlySavings: number | undefined;
  
  if (electricityRate && electricityRate > 0) {
    steps.push('');
    steps.push('Step 8: Calculate Cost Savings');
    monthlySavings = monthlyProduction * electricityRate;
    yearlySavings = yearlyProduction * electricityRate;
    steps.push(`Monthly Savings = ${monthlyProduction.toFixed(2)} × ${electricityRate}`);
    steps.push(`Monthly Savings = $${monthlySavings.toFixed(2)}`);
    steps.push(`Yearly Savings = ${yearlyProduction.toFixed(2)} × ${electricityRate}`);
    steps.push(`Yearly Savings = $${yearlySavings.toFixed(2)}`);
  }
  
  return {
    dailyUsage,
    systemSizeKW: actualSystemKW,
    systemSizeWatts: actualSystemWatts,
    panelsNeeded,
    dailyProduction,
    monthlyProduction,
    yearlyProduction,
    offsetPercentage,
    roofSpaceRequired,
    co2Savings,
    monthlySavings,
    yearlySavings,
    steps
  };
}

// Validate inputs
export function validateInputs(inputs: SolarPanelInputs): string | null {
  const { monthlyUsage, sunHours, panelWattage, systemEfficiency } = inputs;
  
  if (!monthlyUsage || monthlyUsage <= 0) {
    return "Monthly usage must be greater than 0 kWh";
  }
  
  if (monthlyUsage > 10000) {
    return "Monthly usage exceeds 10,000 kWh. Please verify or contact for commercial systems.";
  }
  
  if (!sunHours || sunHours < 1) {
    return "Sun hours must be at least 1 hour per day";
  }
  
  if (sunHours > 12) {
    return "Sun hours cannot exceed 12 hours per day";
  }
  
  if (!panelWattage || panelWattage <= 0) {
    return "Please select a valid panel wattage";
  }
  
  if (systemEfficiency < 0.5 || systemEfficiency > 1) {
    return "System efficiency must be between 50% and 100%";
  }
  
  return null;
}

// Get sun hours by region (example data)
export function getSunHoursByRegion(region: string): number {
  const sunHoursMap: Record<string, number> = {
    'arizona': 6.5,
    'california': 5.5,
    'florida': 5.0,
    'texas': 5.5,
    'new-york': 4.0,
    'washington': 3.5,
    'colorado': 5.5,
    'nevada': 6.0,
    'default': 5.0
  };
  
  return sunHoursMap[region.toLowerCase()] || sunHoursMap['default'];
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
const HISTORY_KEY = 'solar-panel-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: SolarPanelInputs, result: SolarPanelResult): void {
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
export function exportToText(inputs: SolarPanelInputs, result: SolarPanelResult): string {
  const lines: string[] = [];
  
  lines.push('SOLAR PANEL CALCULATOR - SYSTEM REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('ENERGY REQUIREMENTS:');
  lines.push('-'.repeat(50));
  lines.push(`Monthly Usage: ${inputs.monthlyUsage} kWh`);
  lines.push(`Daily Usage: ${formatNumber(result.dailyUsage, 2)} kWh`);
  lines.push(`Average Sun Hours: ${inputs.sunHours} hours/day`);
  lines.push('');
  lines.push('SYSTEM SPECIFICATIONS:');
  lines.push('-'.repeat(50));
  lines.push(`System Size: ${formatNumber(result.systemSizeKW, 2)} kW (${result.systemSizeWatts} W)`);
  lines.push(`Panel Wattage: ${inputs.panelWattage}W`);
  lines.push(`Number of Panels: ${result.panelsNeeded}`);
  lines.push(`System Efficiency: ${(inputs.systemEfficiency * 100).toFixed(0)}%`);
  lines.push(`Roof Space Required: ${result.roofSpaceRequired} m²`);
  lines.push('');
  lines.push('ENERGY PRODUCTION:');
  lines.push('-'.repeat(50));
  lines.push(`Daily Production: ${formatNumber(result.dailyProduction, 2)} kWh`);
  lines.push(`Monthly Production: ${formatNumber(result.monthlyProduction, 2)} kWh`);
  lines.push(`Yearly Production: ${formatNumber(result.yearlyProduction, 0)} kWh`);
  lines.push(`Energy Offset: ${formatNumber(result.offsetPercentage, 1)}%`);
  lines.push('');
  lines.push('ENVIRONMENTAL IMPACT:');
  lines.push('-'.repeat(50));
  lines.push(`CO2 Savings: ${formatNumber(result.co2Savings, 0)} kg per year`);
  lines.push(`Equivalent Trees Planted: ${formatNumber(result.co2Savings / 21, 0)} trees`);
  
  if (result.monthlySavings && result.yearlySavings) {
    lines.push('');
    lines.push('COST SAVINGS:');
    lines.push('-'.repeat(50));
    lines.push(`Monthly Savings: $${formatNumber(result.monthlySavings, 2)}`);
    lines.push(`Yearly Savings: $${formatNumber(result.yearlySavings, 2)}`);
  }
  
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Solar Panel Calculator');
  
  return lines.join('\n');
}

// Export to CSV
export function exportToCSV(inputs: SolarPanelInputs, result: SolarPanelResult): string {
  let csv = 'Solar Panel System Report\n\n';
  csv += 'Parameter,Value\n';
  csv += `Monthly Usage (kWh),${inputs.monthlyUsage}\n`;
  csv += `Daily Usage (kWh),${formatNumber(result.dailyUsage, 2)}\n`;
  csv += `Sun Hours per Day,${inputs.sunHours}\n`;
  csv += `System Size (kW),${formatNumber(result.systemSizeKW, 2)}\n`;
  csv += `System Size (W),${result.systemSizeWatts}\n`;
  csv += `Panel Wattage (W),${inputs.panelWattage}\n`;
  csv += `Number of Panels,${result.panelsNeeded}\n`;
  csv += `System Efficiency (%),${(inputs.systemEfficiency * 100).toFixed(0)}\n`;
  csv += `Roof Space (m²),${result.roofSpaceRequired}\n`;
  csv += '\n';
  csv += 'Energy Production\n';
  csv += 'Period,Production (kWh)\n';
  csv += `Daily,${formatNumber(result.dailyProduction, 2)}\n`;
  csv += `Monthly,${formatNumber(result.monthlyProduction, 2)}\n`;
  csv += `Yearly,${formatNumber(result.yearlyProduction, 0)}\n`;
  csv += '\n';
  csv += `Energy Offset (%),${formatNumber(result.offsetPercentage, 1)}\n`;
  csv += `CO2 Savings (kg/year),${formatNumber(result.co2Savings, 0)}\n`;
  
  if (result.monthlySavings && result.yearlySavings) {
    csv += '\n';
    csv += 'Cost Savings\n';
    csv += `Monthly ($),${formatNumber(result.monthlySavings, 2)}\n`;
    csv += `Yearly ($),${formatNumber(result.yearlySavings, 2)}\n`;
  }
  
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
const SETTINGS_KEY = 'solar-panel-calculator-settings';

export function saveSettings(settings: Partial<SolarPanelInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<SolarPanelInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

// Get offset status color
export function getOffsetStatusColor(percentage: number): string {
  if (percentage >= 100) return 'text-green-600';
  if (percentage >= 80) return 'text-blue-600';
  if (percentage >= 50) return 'text-yellow-600';
  return 'text-orange-600';
}

// Get offset status background color
export function getOffsetStatusBgColor(percentage: number): string {
  if (percentage >= 100) return 'bg-green-50 border-green-200';
  if (percentage >= 80) return 'bg-blue-50 border-blue-200';
  if (percentage >= 50) return 'bg-yellow-50 border-yellow-200';
  return 'bg-orange-50 border-orange-200';
}

// Get recommendation message
export function getRecommendation(result: SolarPanelResult): string {
  if (result.offsetPercentage >= 100) {
    return `Excellent! Your system will generate ${formatNumber(result.offsetPercentage, 0)}% of your energy needs. Consider adding battery storage to store excess energy.`;
  } else if (result.offsetPercentage >= 80) {
    return `Good coverage! Your system will offset ${formatNumber(result.offsetPercentage, 0)}% of your energy consumption. You'll still need grid power for ${formatNumber(100 - result.offsetPercentage, 0)}% of your usage.`;
  } else if (result.offsetPercentage >= 50) {
    return `Partial coverage. Your system will offset ${formatNumber(result.offsetPercentage, 0)}% of your energy needs. Consider adding more panels to increase coverage.`;
  } else {
    return `Limited coverage at ${formatNumber(result.offsetPercentage, 0)}%. Consider increasing system size or reducing energy consumption for better results.`;
  }
}

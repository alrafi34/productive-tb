import { SolarInverterInputs, SolarInverterResult, InverterPreset, SystemVoltage, SafetyFactor, HistoryEntry } from "./types";

// Inverter presets for common scenarios
export const INVERTER_PRESETS: InverterPreset[] = [
  {
    name: "Small Home Backup",
    totalLoad: 500,
    systemVoltage: 12,
    description: "Lights, fans, and small appliances"
  },
  {
    name: "Medium Home Backup",
    totalLoad: 1000,
    systemVoltage: 24,
    description: "Essential home loads"
  },
  {
    name: "Large Home Backup",
    totalLoad: 2000,
    systemVoltage: 24,
    description: "Full home backup power"
  },
  {
    name: "Off-Grid System",
    totalLoad: 3000,
    systemVoltage: 48,
    description: "Complete off-grid home"
  },
  {
    name: "RV/Camper",
    totalLoad: 800,
    systemVoltage: 12,
    description: "Mobile power system"
  },
  {
    name: "Small Office",
    totalLoad: 1500,
    systemVoltage: 24,
    description: "Computers and office equipment"
  }
];

// Standard inverter sizes in VA
const STANDARD_INVERTER_SIZES = [300, 500, 600, 800, 1000, 1200, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 7500, 10000];

// Calculate solar inverter requirements
export function calculateSolarInverter(inputs: SolarInverterInputs): SolarInverterResult {
  const { totalLoad, systemVoltage, efficiency, safetyFactor } = inputs;
  
  const steps: string[] = [];
  
  steps.push('Solar Inverter Size Calculation');
  steps.push('');
  
  // Step 1: Apply safety factor
  steps.push('Step 1: Apply Safety Factor');
  steps.push(`Formula: Adjusted Load = Total Load × Safety Factor`);
  steps.push(`Adjusted Load = ${totalLoad} × ${safetyFactor}`);
  
  const adjustedLoad = totalLoad * safetyFactor;
  steps.push(`Adjusted Load = ${adjustedLoad.toFixed(0)} W`);
  steps.push('');
  
  // Step 2: Adjust for efficiency
  steps.push('Step 2: Adjust for Inverter Efficiency');
  steps.push(`Formula: Inverter Size (VA) = Adjusted Load / Efficiency`);
  steps.push(`Inverter Size = ${adjustedLoad.toFixed(0)} / ${efficiency}`);
  
  const inverterSizeVA = adjustedLoad / efficiency;
  steps.push(`Inverter Size = ${inverterSizeVA.toFixed(0)} VA`);
  steps.push('');
  
  // Step 3: Convert to kW
  const inverterSizeKW = inverterSizeVA / 1000;
  steps.push('Step 3: Convert to Kilowatts');
  steps.push(`Power (kW) = VA / 1000`);
  steps.push(`Power = ${inverterSizeVA.toFixed(0)} / 1000`);
  steps.push(`Power = ${inverterSizeKW.toFixed(2)} kW`);
  steps.push('');
  
  // Step 4: Find recommended standard size
  const recommendedStandardSize = findStandardSize(inverterSizeVA);
  steps.push('Step 4: Recommended Standard Inverter Size');
  steps.push(`Closest Standard Size = ${recommendedStandardSize} VA`);
  steps.push('');
  
  // Step 5: Calculate current draw
  const current = totalLoad / systemVoltage;
  steps.push('Step 5: Calculate Current Draw from Battery');
  steps.push(`Current (A) = Total Load / System Voltage`);
  steps.push(`Current = ${totalLoad} / ${systemVoltage}`);
  steps.push(`Current = ${current.toFixed(2)} A`);
  
  // Calculate utilization
  const utilizationPercent = (totalLoad / recommendedStandardSize) * 100;
  
  return {
    adjustedLoad,
    inverterSizeVA,
    inverterSizeKW,
    recommendedStandardSize,
    current,
    utilizationPercent,
    steps
  };
}

// Find closest standard inverter size
function findStandardSize(calculatedVA: number): number {
  for (const size of STANDARD_INVERTER_SIZES) {
    if (size >= calculatedVA) {
      return size;
    }
  }
  return STANDARD_INVERTER_SIZES[STANDARD_INVERTER_SIZES.length - 1];
}

// Validate inputs
export function validateInputs(inputs: SolarInverterInputs): string | null {
  const { totalLoad, systemVoltage, efficiency, safetyFactor } = inputs;
  
  if (!totalLoad || totalLoad <= 0) {
    return "Total load must be greater than 0 watts";
  }
  
  if (totalLoad > 50000) {
    return "Total load exceeds 50 kW. Please contact for commercial inverter sizing.";
  }
  
  if (!systemVoltage || ![12, 24, 48].includes(systemVoltage)) {
    return "Please select a valid system voltage (12V, 24V, or 48V)";
  }
  
  if (efficiency < 0.5 || efficiency > 1) {
    return "Inverter efficiency must be between 50% and 100%";
  }
  
  if (!safetyFactor || ![1.2, 1.5, 2.0].includes(safetyFactor)) {
    return "Please select a valid safety factor";
  }
  
  return null;
}

// Get recommended system voltage based on load
export function getRecommendedVoltage(totalLoad: number): SystemVoltage {
  if (totalLoad < 800) return 12;
  if (totalLoad < 2500) return 24;
  return 48;
}

// Get recommended safety factor based on load type
export function getRecommendedSafetyFactor(hasMotorLoad: boolean): SafetyFactor {
  return hasMotorLoad ? 1.5 : 1.2;
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
const HISTORY_KEY = 'solar-inverter-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: SolarInverterInputs, result: SolarInverterResult): void {
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
export function exportToText(inputs: SolarInverterInputs, result: SolarInverterResult): string {
  const lines: string[] = [];
  
  lines.push('SOLAR INVERTER CALCULATOR - SIZING REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('SYSTEM REQUIREMENTS:');
  lines.push('-'.repeat(50));
  lines.push(`Total Load: ${inputs.totalLoad} W`);
  lines.push(`System Voltage: ${inputs.systemVoltage}V`);
  lines.push(`Inverter Efficiency: ${(inputs.efficiency * 100).toFixed(0)}%`);
  lines.push(`Safety Factor: ${inputs.safetyFactor}x`);
  lines.push('');
  lines.push('INVERTER SPECIFICATIONS:');
  lines.push('-'.repeat(50));
  lines.push(`Calculated Size: ${formatNumber(result.inverterSizeVA, 0)} VA`);
  lines.push(`Power Rating: ${formatNumber(result.inverterSizeKW, 2)} kW`);
  lines.push(`Recommended Standard Size: ${result.recommendedStandardSize} VA`);
  lines.push(`Current Draw: ${formatNumber(result.current, 2)} A`);
  lines.push(`Load Utilization: ${formatNumber(result.utilizationPercent, 1)}%`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Solar Inverter Calculator');
  
  return lines.join('\n');
}

// Export to CSV
export function exportToCSV(inputs: SolarInverterInputs, result: SolarInverterResult): string {
  let csv = 'Solar Inverter Sizing Report\n\n';
  csv += 'Parameter,Value\n';
  csv += `Total Load (W),${inputs.totalLoad}\n`;
  csv += `System Voltage (V),${inputs.systemVoltage}\n`;
  csv += `Inverter Efficiency (%),${(inputs.efficiency * 100).toFixed(0)}\n`;
  csv += `Safety Factor,${inputs.safetyFactor}\n`;
  csv += '\n';
  csv += 'Results\n';
  csv += `Calculated Size (VA),${formatNumber(result.inverterSizeVA, 0)}\n`;
  csv += `Power Rating (kW),${formatNumber(result.inverterSizeKW, 2)}\n`;
  csv += `Recommended Size (VA),${result.recommendedStandardSize}\n`;
  csv += `Current Draw (A),${formatNumber(result.current, 2)}\n`;
  csv += `Load Utilization (%),${formatNumber(result.utilizationPercent, 1)}\n`;
  
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
const SETTINGS_KEY = 'solar-inverter-calculator-settings';

export function saveSettings(settings: Partial<SolarInverterInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<SolarInverterInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

// Get utilization status
export function getUtilizationStatus(utilizationPercent: number): { status: string; color: string; message: string } {
  if (utilizationPercent < 50) {
    return {
      status: 'Oversized',
      color: 'yellow',
      message: 'Inverter is significantly oversized. Consider a smaller unit for better efficiency.'
    };
  } else if (utilizationPercent >= 50 && utilizationPercent <= 80) {
    return {
      status: 'Optimal',
      color: 'green',
      message: 'Inverter size is optimal for your load. Good balance between capacity and efficiency.'
    };
  } else if (utilizationPercent > 80 && utilizationPercent <= 95) {
    return {
      status: 'Near Capacity',
      color: 'orange',
      message: 'Inverter is near maximum capacity. Consider next size up for safety margin.'
    };
  } else {
    return {
      status: 'Overloaded',
      color: 'red',
      message: 'Load exceeds inverter capacity! Select a larger inverter immediately.'
    };
  }
}

// Get system recommendation
export function getSystemRecommendation(inputs: SolarInverterInputs, result: SolarInverterResult): string {
  const recommendedVoltage = getRecommendedVoltage(inputs.totalLoad);
  
  if (inputs.systemVoltage < recommendedVoltage) {
    return `Consider upgrading to ${recommendedVoltage}V system for ${inputs.totalLoad}W load. Higher voltage reduces current and improves efficiency.`;
  } else if (inputs.totalLoad > 3000 && inputs.systemVoltage < 48) {
    return `For loads above 3000W, a 48V system is highly recommended for optimal efficiency and lower current draw.`;
  } else if (result.current > 100) {
    return `High current draw (${formatNumber(result.current, 0)}A). Consider higher voltage system or thicker cables to reduce losses.`;
  } else if (result.utilizationPercent < 40) {
    return `Your inverter is significantly oversized. A ${findStandardSize(inputs.totalLoad * 1.3)} VA inverter would be more efficient.`;
  }
  
  return `Your ${inputs.systemVoltage}V system with ${result.recommendedStandardSize} VA inverter is well-suited for ${inputs.totalLoad}W load.`;
}

// Get efficiency recommendation
export function getEfficiencyRecommendation(efficiency: number): string | null {
  if (efficiency < 0.85) {
    return "Low efficiency (<85%). Consider a pure sine wave inverter for better performance and lower losses.";
  } else if (efficiency > 0.95) {
    return "Excellent efficiency (>95%). Modern pure sine wave inverters typically achieve this level.";
  }
  return null;
}

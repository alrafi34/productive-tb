import { GeneratorInputs, GeneratorResult, Appliance, AppliancePreset, SystemPreset, SafetyMargin, HistoryEntry } from "./types";

// Common appliance presets
export const APPLIANCE_PRESETS: AppliancePreset[] = [
  // Lighting
  { name: "LED Bulb", power: 10, category: "Lighting" },
  { name: "LED Shop Light", power: 40, category: "Lighting" },
  { name: "Halogen Floodlight", power: 150, category: "Lighting" },

  // Heating & Cooling
  { name: "Furnace Blower (1/2 HP)", power: 800, category: "Heating & Cooling" },
  { name: "Window AC (10,000 BTU)", power: 900, category: "Heating & Cooling" },
  { name: "Central AC (3 ton)", power: 3500, category: "Heating & Cooling" },
  { name: "Heat Pump (3 ton)", power: 4000, category: "Heating & Cooling" },
  { name: "Space Heater", power: 1500, category: "Heating & Cooling" },
  { name: "Ceiling Fan", power: 60, category: "Heating & Cooling" },

  // Kitchen
  { name: "Refrigerator", power: 150, category: "Kitchen" },
  { name: "Chest Freezer", power: 100, category: "Kitchen" },
  { name: "Microwave Oven", power: 1200, category: "Kitchen" },
  { name: "Electric Kettle", power: 2000, category: "Kitchen" },
  { name: "Coffee Maker", power: 1000, category: "Kitchen" },
  { name: "Electric Range / Cooktop", power: 3000, category: "Kitchen" },

  // Electronics
  { name: "TV (55\")", power: 150, category: "Electronics" },
  { name: "Desktop Computer", power: 300, category: "Electronics" },
  { name: "Laptop", power: 65, category: "Electronics" },
  { name: "Wi-Fi Router & Modem", power: 20, category: "Electronics" },
  { name: "Phone Charger", power: 10, category: "Electronics" },

  // Appliances & Pumps
  { name: "Washing Machine", power: 500, category: "Appliances" },
  { name: "Clothes Dryer (electric)", power: 5000, category: "Appliances" },
  { name: "Water Heater (electric)", power: 4500, category: "Appliances" },
  { name: "Sump Pump (1/3 HP)", power: 800, category: "Appliances" },
  { name: "Well Pump (1 HP)", power: 1000, category: "Appliances" },
  { name: "Garage Door Opener", power: 550, category: "Appliances" },
  { name: "Vacuum Cleaner", power: 1000, category: "Appliances" },
  { name: "EV Charger (Level 2, 32 A)", power: 7700, category: "Appliances" }
];

// System presets
export const SYSTEM_PRESETS: SystemPreset[] = [
  {
    name: "Essentials",
    description: "Fridge, lights, furnace, sump pump",
    appliances: [
      { name: "LED Bulb", power: 10, quantity: 10 },
      { name: "Refrigerator", power: 150, quantity: 1 },
      { name: "Furnace Blower (1/2 HP)", power: 800, quantity: 1 },
      { name: "Sump Pump (1/3 HP)", power: 800, quantity: 1 },
      { name: "Wi-Fi Router & Modem", power: 20, quantity: 1 },
      { name: "Phone Charger", power: 10, quantity: 3 }
    ]
  },
  {
    name: "Medium Home",
    description: "Essentials plus cooling and kitchen",
    appliances: [
      { name: "LED Bulb", power: 10, quantity: 15 },
      { name: "Refrigerator", power: 150, quantity: 1 },
      { name: "Chest Freezer", power: 100, quantity: 1 },
      { name: "Furnace Blower (1/2 HP)", power: 800, quantity: 1 },
      { name: "Window AC (10,000 BTU)", power: 900, quantity: 1 },
      { name: "Microwave Oven", power: 1200, quantity: 1 },
      { name: "Well Pump (1 HP)", power: 1000, quantity: 1 },
      { name: "TV (55\")", power: 150, quantity: 1 }
    ]
  },
  {
    name: "Whole Home",
    description: "Central AC and major appliances",
    appliances: [
      { name: "LED Bulb", power: 10, quantity: 25 },
      { name: "Refrigerator", power: 150, quantity: 1 },
      { name: "Central AC (3 ton)", power: 3500, quantity: 1 },
      { name: "Microwave Oven", power: 1200, quantity: 1 },
      { name: "Water Heater (electric)", power: 4500, quantity: 1 },
      { name: "Washing Machine", power: 500, quantity: 1 },
      { name: "TV (55\")", power: 150, quantity: 2 },
      { name: "Desktop Computer", power: 300, quantity: 1 }
    ]
  },
  {
    name: "Small Office",
    description: "Office equipment",
    appliances: [
      { name: "LED Bulb", power: 10, quantity: 15 },
      { name: "Desktop Computer", power: 300, quantity: 5 },
      { name: "Laptop", power: 65, quantity: 3 },
      { name: "Printer", power: 300, quantity: 1 },
      { name: "Window AC (10,000 BTU)", power: 900, quantity: 1 },
      { name: "Wi-Fi Router & Modem", power: 20, quantity: 1 }
    ]
  },
  {
    name: "Workshop",
    description: "Tools and equipment",
    appliances: [
      { name: "LED Shop Light", power: 40, quantity: 10 },
      { name: "Power Tools", power: 1500, quantity: 2 },
      { name: "Welder", power: 3000, quantity: 1 },
      { name: "Air Compressor", power: 2000, quantity: 1 }
    ]
  }
];

// Standard generator sizes in kVA
const STANDARD_GENERATOR_SIZES = [1, 2, 3, 3.5, 5, 6.5, 7.5, 10, 12.5, 15, 20, 25, 30, 40, 50, 62.5, 75, 100, 125, 150, 200, 250];

// Calculate generator requirements
export function calculateGenerator(inputs: GeneratorInputs): GeneratorResult {
  const { appliances, safetyMargin, powerFactor } = inputs;
  
  const steps: string[] = [];
  
  steps.push('Generator Size Calculation');
  steps.push('');
  
  // Step 1: Calculate total load
  steps.push('Step 1: Calculate Total Load');
  steps.push('Sum of all appliance power consumption:');
  
  const totalLoad = appliances.reduce((sum, appliance) => {
    const appliancePower = appliance.power * appliance.quantity;
    if (appliance.name && appliance.power > 0 && appliance.quantity > 0) {
      steps.push(`${appliance.name}: ${appliance.power}W × ${appliance.quantity} = ${appliancePower}W`);
    }
    return sum + appliancePower;
  }, 0);
  
  steps.push(`Total Load = ${totalLoad} W`);
  steps.push('');
  
  // Step 2: Apply safety margin
  steps.push('Step 2: Apply Safety Margin');
  steps.push(`Formula: Adjusted Load = Total Load × (1 + Safety Margin)`);
  steps.push(`Adjusted Load = ${totalLoad} × (1 + ${safetyMargin})`);
  
  const adjustedLoad = totalLoad * (1 + safetyMargin);
  steps.push(`Adjusted Load = ${adjustedLoad.toFixed(0)} W`);
  steps.push('');
  
  // Step 3: Convert to kVA
  steps.push('Step 3: Convert to kVA');
  steps.push(`Formula: kVA = Adjusted Load / (1000 × Power Factor)`);
  steps.push(`kVA = ${adjustedLoad.toFixed(0)} / (1000 × ${powerFactor})`);
  
  const requiredKVA = adjustedLoad / (1000 * powerFactor);
  steps.push(`Required kVA = ${requiredKVA.toFixed(2)} kVA`);
  steps.push('');
  
  // Step 4: Find recommended standard size
  const recommendedSize = findStandardSize(requiredKVA);
  steps.push('Step 4: Recommended Standard Generator Size');
  steps.push(`Closest Standard Size = ${recommendedSize} kVA`);
  
  // Generate recommended range
  const recommendedRange = getRecommendedRange(recommendedSize);
  
  return {
    totalLoad,
    adjustedLoad,
    requiredKVA,
    recommendedSize,
    recommendedRange,
    steps
  };
}

// Find closest standard generator size
function findStandardSize(calculatedKVA: number): number {
  for (const size of STANDARD_GENERATOR_SIZES) {
    if (size >= calculatedKVA) {
      return size;
    }
  }
  return STANDARD_GENERATOR_SIZES[STANDARD_GENERATOR_SIZES.length - 1];
}

// Get recommended range
function getRecommendedRange(size: number): string {
  const index = STANDARD_GENERATOR_SIZES.indexOf(size);
  if (index === -1) return `${size} kVA`;
  
  if (index === 0) {
    return `${size} kVA`;
  } else {
    const prevSize = STANDARD_GENERATOR_SIZES[index - 1];
    return `${prevSize}-${size} kVA`;
  }
}

// Validate inputs
export function validateInputs(inputs: GeneratorInputs): string | null {
  const { appliances, powerFactor, safetyMargin } = inputs;
  
  const validAppliances = appliances.filter(a => a.power > 0 && a.quantity > 0);
  
  if (validAppliances.length === 0) {
    return "Please add at least one appliance with valid power and quantity";
  }
  
  if (powerFactor < 0.5 || powerFactor > 1) {
    return "Power factor must be between 0.5 and 1.0";
  }
  
  if (!safetyMargin || ![0.10, 0.20, 0.30, 0.50].includes(safetyMargin)) {
    return "Please select a valid safety margin";
  }
  
  return null;
}

// Create new appliance
export function createAppliance(name: string = '', power: number = 0, quantity: number = 1): Appliance {
  return {
    id: Date.now().toString() + Math.random(),
    name,
    power,
    quantity,
    totalPower: power * quantity
  };
}

// Update appliance total power
export function updateApplianceTotalPower(appliance: Appliance): Appliance {
  return {
    ...appliance,
    totalPower: appliance.power * appliance.quantity
  };
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
const HISTORY_KEY = 'generator-size-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: GeneratorInputs, result: GeneratorResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs: JSON.parse(JSON.stringify(inputs)), // Deep clone
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
export function exportToText(inputs: GeneratorInputs, result: GeneratorResult): string {
  const lines: string[] = [];
  
  lines.push('GENERATOR SIZE CALCULATOR - SIZING REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('APPLIANCE LIST:');
  lines.push('-'.repeat(50));
  
  inputs.appliances.forEach((appliance, index) => {
    if (appliance.power > 0 && appliance.quantity > 0) {
      lines.push(`${index + 1}. ${appliance.name || 'Appliance'}: ${appliance.power}W × ${appliance.quantity} = ${appliance.totalPower}W`);
    }
  });
  
  lines.push('');
  lines.push('SYSTEM PARAMETERS:');
  lines.push('-'.repeat(50));
  lines.push(`Safety Margin: ${(inputs.safetyMargin * 100).toFixed(0)}%`);
  lines.push(`Power Factor: ${inputs.powerFactor}`);
  lines.push(`Phase Type: ${inputs.phaseType === 'single' ? 'Single Phase' : 'Three Phase'}`);
  lines.push('');
  lines.push('GENERATOR SPECIFICATIONS:');
  lines.push('-'.repeat(50));
  lines.push(`Total Load: ${result.totalLoad} W`);
  lines.push(`Adjusted Load: ${formatNumber(result.adjustedLoad, 0)} W`);
  lines.push(`Required Capacity: ${formatNumber(result.requiredKVA, 2)} kVA`);
  lines.push(`Recommended Size: ${result.recommendedSize} kVA`);
  lines.push(`Recommended Range: ${result.recommendedRange}`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Generator Size Calculator');
  
  return lines.join('\n');
}

// Export to CSV
export function exportToCSV(inputs: GeneratorInputs, result: GeneratorResult): string {
  let csv = 'Generator Sizing Report\n\n';
  csv += 'Appliance,Power (W),Quantity,Total (W)\n';
  
  inputs.appliances.forEach(appliance => {
    if (appliance.power > 0 && appliance.quantity > 0) {
      csv += `${appliance.name || 'Appliance'},${appliance.power},${appliance.quantity},${appliance.totalPower}\n`;
    }
  });
  
  csv += '\n';
  csv += 'Parameter,Value\n';
  csv += `Total Load (W),${result.totalLoad}\n`;
  csv += `Safety Margin (%),${(inputs.safetyMargin * 100).toFixed(0)}\n`;
  csv += `Power Factor,${inputs.powerFactor}\n`;
  csv += `Adjusted Load (W),${formatNumber(result.adjustedLoad, 0)}\n`;
  csv += `Required Capacity (kVA),${formatNumber(result.requiredKVA, 2)}\n`;
  csv += `Recommended Size (kVA),${result.recommendedSize}\n`;
  
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
const SETTINGS_KEY = 'generator-size-calculator-settings';

export function saveSettings(settings: Partial<GeneratorInputs>): void {
  try {
    // Don't save appliances, only settings
    const { safetyMargin, powerFactor, phaseType } = settings;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ safetyMargin, powerFactor, phaseType }));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<GeneratorInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

// Get utilization status
export function getUtilizationStatus(totalLoad: number, recommendedSize: number, powerFactor: number): { status: string; color: string; message: string } {
  const maxCapacity = recommendedSize * 1000 * powerFactor;
  const utilizationPercent = (totalLoad / maxCapacity) * 100;
  
  if (utilizationPercent < 40) {
    return {
      status: 'Oversized',
      color: 'yellow',
      message: 'Generator is significantly oversized. Consider a smaller unit for better fuel efficiency.'
    };
  } else if (utilizationPercent >= 40 && utilizationPercent <= 80) {
    return {
      status: 'Optimal',
      color: 'green',
      message: 'Generator size is optimal for your load. Good balance between capacity and efficiency.'
    };
  } else if (utilizationPercent > 80 && utilizationPercent <= 100) {
    return {
      status: 'Near Capacity',
      color: 'orange',
      message: 'Generator is near maximum capacity. Consider next size up for safety margin.'
    };
  } else {
    return {
      status: 'Overloaded',
      color: 'red',
      message: 'Load exceeds generator capacity! Select a larger generator immediately.'
    };
  }
}

// Get system recommendation
export function getSystemRecommendation(inputs: GeneratorInputs, result: GeneratorResult): string {
  const { totalLoad, recommendedSize } = result;
  const { powerFactor } = inputs;
  
  if (totalLoad < 1000) {
    return `For loads under 1 kW, a portable generator (${recommendedSize} kVA) is sufficient. Consider inverter generators for quieter operation.`;
  } else if (totalLoad < 3000) {
    return `For ${(totalLoad / 1000).toFixed(1)} kW load, a ${recommendedSize} kVA generator is recommended. Ensure proper grounding and use a transfer switch.`;
  } else if (totalLoad < 7000) {
    return `For ${(totalLoad / 1000).toFixed(1)} kW load, consider a ${recommendedSize} kVA standby generator with automatic transfer switch for whole-home backup.`;
  } else {
    return `For ${(totalLoad / 1000).toFixed(1)} kW load, a ${recommendedSize} kVA commercial-grade generator is required. Professional installation recommended.`;
  }
}

// Convert kVA to kW
export function kvaToKw(kva: number, powerFactor: number): number {
  return kva * powerFactor;
}

// Convert kW to kVA
export function kwToKva(kw: number, powerFactor: number): number {
  return kw / powerFactor;
}

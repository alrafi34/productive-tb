import { Appliance, LoadCalculatorInputs, LoadCalculatorResult, AppliancePreset } from "./types";

// Standard breaker sizes in Amperes
const STANDARD_BREAKERS = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200];

export function calculateLoad(inputs: LoadCalculatorInputs): LoadCalculatorResult {
  const { appliances, voltage, diversityFactor } = inputs;
  
  const steps: string[] = [];
  
  // Calculate total load
  const totalLoad = appliances.reduce((sum, appliance) => sum + appliance.total, 0);
  
  steps.push('House Wiring Load Calculation');
  steps.push('');
  steps.push('Step 1: Calculate Individual Loads');
  appliances.forEach((appliance, index) => {
    if (appliance.quantity > 0 && appliance.wattage > 0) {
      steps.push(`${appliance.name || `Appliance ${index + 1}`}: ${appliance.quantity} × ${appliance.wattage}W = ${appliance.total}W`);
    }
  });
  steps.push('');
  steps.push('Step 2: Calculate Total Load');
  steps.push(`Total Load = ${totalLoad}W`);
  steps.push('');
  
  // Apply diversity factor
  const adjustedLoad = totalLoad * diversityFactor;
  steps.push('Step 3: Apply Diversity Factor');
  steps.push(`Diversity Factor = ${diversityFactor}`);
  steps.push(`Adjusted Load = ${totalLoad}W × ${diversityFactor} = ${adjustedLoad.toFixed(2)}W`);
  steps.push('');
  
  // Calculate current
  const current = adjustedLoad / voltage;
  steps.push('Step 4: Calculate Current');
  steps.push(`Current (I) = Power / Voltage`);
  steps.push(`I = ${adjustedLoad.toFixed(2)}W / ${voltage}V`);
  steps.push(`I = ${current.toFixed(2)}A`);
  steps.push('');
  
  // Recommend breaker size (1.25× safety factor)
  const requiredBreaker = current * 1.25;
  const recommendedBreaker = STANDARD_BREAKERS.find(b => b >= requiredBreaker) || STANDARD_BREAKERS[STANDARD_BREAKERS.length - 1];
  
  steps.push('Step 5: Recommend Circuit Breaker');
  steps.push(`Required Capacity = ${current.toFixed(2)}A × 1.25 (safety factor) = ${requiredBreaker.toFixed(2)}A`);
  steps.push(`Recommended Breaker = ${recommendedBreaker}A (nearest standard size)`);
  
  // Assume average power factor for residential loads
  const powerFactor = 0.9;
  const apparentPower = adjustedLoad / powerFactor;
  
  return {
    totalLoad,
    adjustedLoad,
    current,
    recommendedBreaker,
    powerFactor,
    apparentPower,
    steps
  };
}

export function validateInputs(inputs: LoadCalculatorInputs): string | null {
  const { appliances, voltage } = inputs;
  
  if (!voltage || voltage <= 0) {
    return "Voltage must be greater than 0";
  }
  
  if (appliances.length === 0) {
    return "Please add at least one appliance";
  }
  
  const hasValidAppliance = appliances.some(a => a.quantity > 0 && a.wattage > 0);
  if (!hasValidAppliance) {
    return "Please add at least one appliance with valid quantity and wattage";
  }
  
  return null;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getAppliancePresets(): AppliancePreset[] {
  return [
    // Lighting
    { name: 'LED Bulb', wattage: 10, category: 'Lighting' },
    { name: 'CFL Bulb', wattage: 15, category: 'Lighting' },
    { name: 'Incandescent Bulb', wattage: 60, category: 'Lighting' },
    { name: 'Tube Light', wattage: 40, category: 'Lighting' },
    
    // Fans & Cooling
    { name: 'Ceiling Fan', wattage: 75, category: 'Fans' },
    { name: 'Table Fan', wattage: 50, category: 'Fans' },
    { name: 'Exhaust Fan', wattage: 30, category: 'Fans' },
    { name: 'Air Conditioner (1 Ton)', wattage: 1200, category: 'Cooling' },
    { name: 'Air Conditioner (1.5 Ton)', wattage: 1800, category: 'Cooling' },
    { name: 'Air Conditioner (2 Ton)', wattage: 2400, category: 'Cooling' },
    
    // Kitchen Appliances
    { name: 'Refrigerator', wattage: 300, category: 'Kitchen' },
    { name: 'Microwave Oven', wattage: 1000, category: 'Kitchen' },
    { name: 'Electric Kettle', wattage: 1500, category: 'Kitchen' },
    { name: 'Toaster', wattage: 800, category: 'Kitchen' },
    { name: 'Mixer Grinder', wattage: 500, category: 'Kitchen' },
    { name: 'Induction Cooktop', wattage: 2000, category: 'Kitchen' },
    { name: 'Electric Oven', wattage: 2000, category: 'Kitchen' },
    { name: 'Dishwasher', wattage: 1800, category: 'Kitchen' },
    
    // Entertainment
    { name: 'LED TV (32")', wattage: 60, category: 'Entertainment' },
    { name: 'LED TV (42")', wattage: 80, category: 'Entertainment' },
    { name: 'LED TV (55")', wattage: 120, category: 'Entertainment' },
    { name: 'Home Theater', wattage: 200, category: 'Entertainment' },
    { name: 'Gaming Console', wattage: 150, category: 'Entertainment' },
    
    // Laundry
    { name: 'Washing Machine', wattage: 500, category: 'Laundry' },
    { name: 'Clothes Dryer', wattage: 3000, category: 'Laundry' },
    { name: 'Iron', wattage: 1000, category: 'Laundry' },
    
    // Heating
    { name: 'Water Heater (Geyser)', wattage: 2000, category: 'Heating' },
    { name: 'Room Heater', wattage: 2000, category: 'Heating' },
    
    // Electronics
    { name: 'Desktop Computer', wattage: 300, category: 'Electronics' },
    { name: 'Laptop', wattage: 65, category: 'Electronics' },
    { name: 'Printer', wattage: 50, category: 'Electronics' },
    { name: 'Router/Modem', wattage: 10, category: 'Electronics' },
    { name: 'Mobile Charger', wattage: 5, category: 'Electronics' },
    
    // Others
    { name: 'Vacuum Cleaner', wattage: 1000, category: 'Others' },
    { name: 'Water Pump', wattage: 750, category: 'Others' },
    { name: 'Aquarium', wattage: 100, category: 'Others' }
  ];
}

export function createEmptyAppliance(): Appliance {
  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name: '',
    quantity: 1,
    wattage: 0,
    total: 0
  };
}

export function calculateApplianceTotal(appliance: Appliance): Appliance {
  return {
    ...appliance,
    total: appliance.quantity * appliance.wattage
  };
}

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
interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: LoadCalculatorInputs;
  result: LoadCalculatorResult;
}

const HISTORY_KEY = 'house-wiring-load-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: LoadCalculatorInputs, result: LoadCalculatorResult): void {
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

export function exportToCSV(appliances: Appliance[]): string {
  const headers = ['Appliance', 'Quantity', 'Wattage (W)', 'Total (W)'];
  const rows = appliances
    .filter(a => a.quantity > 0 && a.wattage > 0)
    .map(a => [a.name || 'Unnamed', a.quantity, a.wattage, a.total]);
  
  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  return csv;
}

export function exportToText(inputs: LoadCalculatorInputs, result: LoadCalculatorResult): string {
  const lines: string[] = [];
  
  lines.push('HOUSE WIRING LOAD CALCULATOR - CALCULATION REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('APPLIANCES:');
  lines.push('-'.repeat(50));
  
  inputs.appliances
    .filter(a => a.quantity > 0 && a.wattage > 0)
    .forEach(appliance => {
      lines.push(`${appliance.name || 'Unnamed'}: ${appliance.quantity} × ${appliance.wattage}W = ${appliance.total}W`);
    });
  
  lines.push('');
  lines.push('PARAMETERS:');
  lines.push('-'.repeat(50));
  lines.push(`Voltage: ${inputs.voltage}V`);
  lines.push(`Diversity Factor: ${inputs.diversityFactor}`);
  lines.push('');
  lines.push('CALCULATION RESULTS:');
  lines.push('-'.repeat(50));
  lines.push(`Total Load: ${formatNumber(result.totalLoad, 2)}W`);
  lines.push(`Adjusted Load: ${formatNumber(result.adjustedLoad, 2)}W`);
  lines.push(`Current: ${formatNumber(result.current, 2)}A`);
  lines.push(`Recommended Breaker: ${result.recommendedBreaker}A`);
  lines.push(`Apparent Power: ${formatNumber(result.apparentPower, 2)}VA`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by House Wiring Load Calculator');
  
  return lines.join('\n');
}

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

// Save/load appliances
const APPLIANCES_KEY = 'house-wiring-load-calculator-appliances';

export function saveAppliances(appliances: Appliance[]): void {
  try {
    localStorage.setItem(APPLIANCES_KEY, JSON.stringify(appliances));
  } catch (error) {
    console.error('Failed to save appliances:', error);
  }
}

export function loadAppliances(): Appliance[] {
  try {
    const stored = localStorage.getItem(APPLIANCES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

export function getPresetConfigurations() {
  return [
    {
      name: 'Small Apartment',
      description: 'Basic lighting and appliances',
      appliances: [
        { name: 'LED Bulb', quantity: 8, wattage: 10 },
        { name: 'Ceiling Fan', quantity: 3, wattage: 75 },
        { name: 'Refrigerator', quantity: 1, wattage: 300 },
        { name: 'LED TV (32")', quantity: 1, wattage: 60 },
        { name: 'Washing Machine', quantity: 1, wattage: 500 }
      ]
    },
    {
      name: 'Medium House',
      description: '3 bedroom house',
      appliances: [
        { name: 'LED Bulb', quantity: 15, wattage: 10 },
        { name: 'Ceiling Fan', quantity: 5, wattage: 75 },
        { name: 'Air Conditioner (1.5 Ton)', quantity: 2, wattage: 1800 },
        { name: 'Refrigerator', quantity: 1, wattage: 300 },
        { name: 'Microwave Oven', quantity: 1, wattage: 1000 },
        { name: 'LED TV (42")', quantity: 2, wattage: 80 },
        { name: 'Washing Machine', quantity: 1, wattage: 500 },
        { name: 'Water Heater (Geyser)', quantity: 1, wattage: 2000 }
      ]
    },
    {
      name: 'Large House',
      description: '4+ bedroom house',
      appliances: [
        { name: 'LED Bulb', quantity: 25, wattage: 10 },
        { name: 'Ceiling Fan', quantity: 8, wattage: 75 },
        { name: 'Air Conditioner (1.5 Ton)', quantity: 3, wattage: 1800 },
        { name: 'Air Conditioner (2 Ton)', quantity: 1, wattage: 2400 },
        { name: 'Refrigerator', quantity: 1, wattage: 300 },
        { name: 'Microwave Oven', quantity: 1, wattage: 1000 },
        { name: 'Induction Cooktop', quantity: 1, wattage: 2000 },
        { name: 'LED TV (55")', quantity: 2, wattage: 120 },
        { name: 'Washing Machine', quantity: 1, wattage: 500 },
        { name: 'Water Heater (Geyser)', quantity: 2, wattage: 2000 },
        { name: 'Water Pump', quantity: 1, wattage: 750 }
      ]
    }
  ];
}

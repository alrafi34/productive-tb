import { Appliance, ElectricalCalculation, HistoryEntry, ApplianceTemplate, Voltage, LoadType, ApplianceCategory } from "./types";

const HISTORY_KEY = "electrical-load-calculator-history";
const MAX_HISTORY = 10;

// Standard breaker sizes (Amps)
const BREAKER_SIZES = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200];

// Calculate total watts from appliances
export function calculateTotalWatts(appliances: Appliance[]): number {
  return appliances.reduce((total, appliance) => {
    return total + (appliance.quantity * appliance.power);
  }, 0);
}

// Convert watts to kilowatts
export function wattsToKW(watts: number): number {
  return watts / 1000;
}

// Apply demand factor
export function applyDemandFactor(totalKW: number, demandFactor: number): number {
  return totalKW * demandFactor;
}

// Calculate current (single phase)
export function calculateCurrent(demandLoad: number, voltage: Voltage, powerFactor: number): number {
  // Current (A) = (Power in Watts) / (Voltage × Power Factor)
  return (demandLoad * 1000) / (voltage * powerFactor);
}

// Recommend breaker size
export function recommendBreaker(current: number): number {
  // Add 25% safety margin
  const requiredBreaker = current * 1.25;
  
  // Find next standard breaker size
  for (const size of BREAKER_SIZES) {
    if (size >= requiredBreaker) {
      return size;
    }
  }
  
  return BREAKER_SIZES[BREAKER_SIZES.length - 1];
}

// Estimate cable size (basic reference)
export function estimateCableSize(current: number): string {
  if (current <= 6) return "1.5 mm²";
  if (current <= 10) return "2.5 mm²";
  if (current <= 16) return "4 mm²";
  if (current <= 20) return "6 mm²";
  if (current <= 25) return "10 mm²";
  if (current <= 32) return "16 mm²";
  if (current <= 40) return "25 mm²";
  if (current <= 50) return "35 mm²";
  if (current <= 63) return "50 mm²";
  if (current <= 80) return "70 mm²";
  if (current <= 100) return "95 mm²";
  return "120 mm² or larger";
}

// Main calculation function
export function performElectricalCalculation(
  appliances: Appliance[],
  voltage: Voltage,
  loadType: LoadType,
  demandFactor: number,
  powerFactor: number
): ElectricalCalculation {
  const totalWatts = calculateTotalWatts(appliances);
  const totalKW = wattsToKW(totalWatts);
  const demandLoad = applyDemandFactor(totalKW, demandFactor);
  const current = calculateCurrent(demandLoad, voltage, powerFactor);
  const recommendedBreaker = recommendBreaker(current);
  const estimatedCableSize = estimateCableSize(current);
  
  return {
    appliances,
    voltage,
    loadType,
    demandFactor,
    powerFactor,
    totalWatts,
    totalKW,
    demandLoad,
    current,
    recommendedBreaker,
    estimatedCableSize,
    timestamp: Date.now()
  };
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Appliance templates
export function getApplianceTemplates(): ApplianceTemplate[] {
  return [
    { name: "LED Light", power: 10, category: "lighting" },
    { name: "CFL Light", power: 15, category: "lighting" },
    { name: "Incandescent Light", power: 60, category: "lighting" },
    { name: "Ceiling Fan", power: 75, category: "motors" },
    { name: "Table Fan", power: 50, category: "motors" },
    { name: "Air Conditioner (1 Ton)", power: 1500, category: "hvac" },
    { name: "Air Conditioner (1.5 Ton)", power: 2000, category: "hvac" },
    { name: "Air Conditioner (2 Ton)", power: 2500, category: "hvac" },
    { name: "Refrigerator", power: 300, category: "kitchen" },
    { name: "Microwave", power: 1000, category: "kitchen" },
    { name: "Electric Oven", power: 2000, category: "kitchen" },
    { name: "Washing Machine", power: 500, category: "kitchen" },
    { name: "Water Heater", power: 2000, category: "kitchen" },
    { name: "TV (LED)", power: 100, category: "electronics" },
    { name: "Computer", power: 300, category: "electronics" },
    { name: "Laptop", power: 65, category: "electronics" },
    { name: "Router", power: 10, category: "electronics" },
    { name: "Water Pump", power: 750, category: "motors" }
  ];
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Create new appliance
export function createAppliance(name: string = "", quantity: number = 1, power: number = 0, category: ApplianceCategory = "other"): Appliance {
  return {
    id: generateId(),
    name,
    quantity,
    power,
    category
  };
}

// History management
export function saveToHistory(calculation: ElectricalCalculation): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    calculation,
    timestamp: Date.now()
  };
  
  history.unshift(entry);
  
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  
  if (typeof window !== "undefined") {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(HISTORY_KEY);
  }
}

// Export functions
export function exportToText(calculation: ElectricalCalculation): string {
  let text = `Electrical Load Calculation Results\n`;
  text += `====================================\n\n`;
  
  text += `Configuration:\n`;
  text += `  Voltage: ${calculation.voltage}V\n`;
  text += `  Load Type: ${calculation.loadType}\n`;
  text += `  Demand Factor: ${formatNumber(calculation.demandFactor * 100, 0)}%\n`;
  text += `  Power Factor: ${formatNumber(calculation.powerFactor, 2)}\n\n`;
  
  text += `Appliances:\n`;
  text += `${'='.repeat(70)}\n`;
  text += `${'Name'.padEnd(25)} ${'Qty'.padEnd(5)} ${'Power'.padEnd(10)} ${'Total'.padEnd(10)} ${'Category'.padEnd(15)}\n`;
  text += `${'-'.repeat(70)}\n`;
  
  calculation.appliances.forEach(appliance => {
    const total = appliance.quantity * appliance.power;
    text += `${appliance.name.padEnd(25)} ${appliance.quantity.toString().padEnd(5)} ${(appliance.power + 'W').padEnd(10)} ${(total + 'W').padEnd(10)} ${appliance.category.padEnd(15)}\n`;
  });
  
  text += `${'-'.repeat(70)}\n\n`;
  
  text += `Results:\n`;
  text += `  Total Connected Load: ${formatNumber(calculation.totalWatts)} W (${formatNumber(calculation.totalKW)} kW)\n`;
  text += `  Demand Load: ${formatNumber(calculation.demandLoad)} kW\n`;
  text += `  Estimated Current: ${formatNumber(calculation.current)} A\n`;
  text += `  Recommended Breaker: ${calculation.recommendedBreaker} A\n`;
  text += `  Estimated Cable Size: ${calculation.estimatedCableSize}\n\n`;
  
  text += `Generated: ${new Date().toLocaleString()}\n`;
  
  return text;
}

export function exportToCSV(calculation: ElectricalCalculation): string {
  let csv = `Appliance,Quantity,Power (W),Total (W),Category\n`;
  
  calculation.appliances.forEach(appliance => {
    const total = appliance.quantity * appliance.power;
    csv += `"${appliance.name}",${appliance.quantity},${appliance.power},${total},"${appliance.category}"\n`;
  });
  
  csv += `\n`;
  csv += `Total Connected Load (W),${calculation.totalWatts}\n`;
  csv += `Total Connected Load (kW),${formatNumber(calculation.totalKW)}\n`;
  csv += `Demand Load (kW),${formatNumber(calculation.demandLoad)}\n`;
  csv += `Current (A),${formatNumber(calculation.current)}\n`;
  csv += `Recommended Breaker (A),${calculation.recommendedBreaker}\n`;
  csv += `Cable Size,${calculation.estimatedCableSize}\n`;
  
  return csv;
}

export function downloadFile(content: string, filename: string, type: string = 'text/plain'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Validation
export function validateAppliance(appliance: Appliance): string | null {
  if (!appliance.name.trim()) {
    return "Appliance name is required";
  }
  
  if (appliance.quantity <= 0) {
    return "Quantity must be greater than 0";
  }
  
  if (appliance.power <= 0) {
    return "Power must be greater than 0";
  }
  
  return null;
}

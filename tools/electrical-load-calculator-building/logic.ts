import { Appliance, ElectricalCalculation, HistoryEntry, ApplianceTemplate, Voltage, LoadType, ApplianceCategory } from "./types";

const HISTORY_KEY = "electrical-load-calculator-history";
const MAX_HISTORY = 10;

// Standard breaker ratings (A): North American (NEC 240.6) and IEC
const BREAKER_SIZES_NA = [15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200];
const BREAKER_SIZES_IEC = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200];

/* 120 V and 240 V (and the old 110 V option) are North American supplies */
export function isNorthAmerican(voltage: Voltage): boolean {
  return voltage === 120 || voltage === 240 || voltage === 110;
}

/* A default supply voltage from the visitor's timezone; always editable */
export function guessVoltage(): Voltage {
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (zone.startsWith("America/")) return 120;
  } catch {
    // fall through
  }
  return 230;
}

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
export function recommendBreaker(current: number, voltage: Voltage): number {
  // 125% of the load, as for continuous loads (NEC 210.20), rounded up to a standard rating
  const requiredBreaker = current * 1.25;
  const sizes = isNorthAmerican(voltage) ? BREAKER_SIZES_NA : BREAKER_SIZES_IEC;
  for (const size of sizes) {
    if (size >= requiredBreaker) {
      return size;
    }
  }
  return sizes[sizes.length - 1];
}

/* Typical copper conductor for a breaker rating: NEC Table 310.16 (60/75 °C)
   and IEC 60364-5-52 (PVC, clipped direct). A reference only: length,
   voltage drop, grouping and installation method change the size. */
export function estimateCableSize(breaker: number): string {
  if (breaker <= 10) return "1.5 mm² (14 AWG)";
  if (breaker <= 16) return "1.5–2.5 mm² (14 AWG)";
  if (breaker <= 20) return "2.5 mm² (12 AWG)";
  if (breaker <= 30) return "4 mm² (10 AWG)";
  if (breaker <= 40) return "6 mm² (8 AWG)";
  if (breaker <= 50) return "10 mm² (8–6 AWG)";
  if (breaker <= 63) return "16 mm² (6–4 AWG)";
  if (breaker <= 80) return "25 mm² (4–3 AWG)";
  if (breaker <= 100) return "35 mm² (3–1 AWG)";
  return "50 mm² (1/0 AWG) or larger";
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
  const recommendedBreaker = recommendBreaker(current, voltage);
  const estimatedCableSize = estimateCableSize(recommendedBreaker);
  
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

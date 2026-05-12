import { ApplianceInput, EnergyCalculation, HistoryEntry, AppliancePreset } from "./types";

// Appliance presets with typical power ratings
export const APPLIANCE_PRESETS: Record<string, AppliancePreset> = {
  "led-bulb": { name: "LED Bulb", power: 10, category: "Lighting", typicalHours: 5 },
  "cfl-bulb": { name: "CFL Bulb", power: 15, category: "Lighting", typicalHours: 5 },
  "incandescent-bulb": { name: "Incandescent Bulb", power: 60, category: "Lighting", typicalHours: 5 },
  "ceiling-fan": { name: "Ceiling Fan", power: 75, category: "Cooling", typicalHours: 8 },
  "table-fan": { name: "Table Fan", power: 50, category: "Cooling", typicalHours: 6 },
  "air-conditioner-1ton": { name: "Air Conditioner (1 Ton)", power: 1200, category: "Cooling", typicalHours: 8 },
  "air-conditioner-1-5ton": { name: "Air Conditioner (1.5 Ton)", power: 1800, category: "Cooling", typicalHours: 8 },
  "air-conditioner-2ton": { name: "Air Conditioner (2 Ton)", power: 2400, category: "Cooling", typicalHours: 8 },
  "refrigerator": { name: "Refrigerator", power: 150, category: "Kitchen", typicalHours: 24 },
  "microwave": { name: "Microwave Oven", power: 1200, category: "Kitchen", typicalHours: 0.5 },
  "electric-kettle": { name: "Electric Kettle", power: 1500, category: "Kitchen", typicalHours: 0.5 },
  "toaster": { name: "Toaster", power: 800, category: "Kitchen", typicalHours: 0.25 },
  "mixer-grinder": { name: "Mixer Grinder", power: 500, category: "Kitchen", typicalHours: 0.5 },
  "induction-cooktop": { name: "Induction Cooktop", power: 2000, category: "Kitchen", typicalHours: 2 },
  "electric-stove": { name: "Electric Stove", power: 2500, category: "Kitchen", typicalHours: 2 },
  "washing-machine": { name: "Washing Machine", power: 500, category: "Appliances", typicalHours: 1 },
  "dishwasher": { name: "Dishwasher", power: 1800, category: "Appliances", typicalHours: 1 },
  "vacuum-cleaner": { name: "Vacuum Cleaner", power: 1000, category: "Appliances", typicalHours: 0.5 },
  "iron": { name: "Electric Iron", power: 1000, category: "Appliances", typicalHours: 1 },
  "hair-dryer": { name: "Hair Dryer", power: 1500, category: "Personal Care", typicalHours: 0.25 },
  "water-heater": { name: "Water Heater (Geyser)", power: 2000, category: "Heating", typicalHours: 1 },
  "room-heater": { name: "Room Heater", power: 1500, category: "Heating", typicalHours: 4 },
  "tv-led-32": { name: "LED TV (32 inch)", power: 50, category: "Entertainment", typicalHours: 5 },
  "tv-led-55": { name: "LED TV (55 inch)", power: 100, category: "Entertainment", typicalHours: 5 },
  "desktop-computer": { name: "Desktop Computer", power: 200, category: "Electronics", typicalHours: 8 },
  "laptop": { name: "Laptop", power: 60, category: "Electronics", typicalHours: 8 },
  "wifi-router": { name: "WiFi Router", power: 10, category: "Electronics", typicalHours: 24 },
  "phone-charger": { name: "Phone Charger", power: 5, category: "Electronics", typicalHours: 2 },
  "printer": { name: "Printer", power: 50, category: "Electronics", typicalHours: 1 },
};

// Generate unique ID
export const generateId = (): string => {
  return `appliance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Create default appliance
export const createDefaultAppliance = (): ApplianceInput => ({
  id: generateId(),
  name: "Appliance",
  power: 100,
  hours: 5,
  minutes: 0,
  quantity: 1,
  rate: 0.12,
});

// Calculate energy for single appliance
export const calculateApplianceEnergy = (appliance: ApplianceInput): number => {
  const totalHours = appliance.hours + appliance.minutes / 60;
  const energy = (appliance.power * totalHours * appliance.quantity) / 1000; // Convert to kWh
  return energy;
};

// Calculate cost for single appliance
export const calculateApplianceCost = (appliance: ApplianceInput, energy: number): number => {
  return appliance.rate ? energy * appliance.rate : 0;
};

// Perform full calculation
export const performCalculation = (appliances: ApplianceInput[]): EnergyCalculation => {
  const activeAppliances = appliances.filter(a => a.power > 0 && (a.hours > 0 || a.minutes > 0));
  
  let totalEnergy = 0;
  let totalCost = 0;
  let highestConsumer: (ApplianceInput & { energy: number; cost: number }) | undefined;
  let maxEnergy = 0;

  const appliancesWithCalc = activeAppliances.map(appliance => {
    const energy = calculateApplianceEnergy(appliance);
    const cost = calculateApplianceCost(appliance, energy);
    
    totalEnergy += energy;
    totalCost += cost;

    if (energy > maxEnergy) {
      maxEnergy = energy;
      highestConsumer = { ...appliance, energy, cost };
    }

    return { ...appliance, energy, cost };
  });

  // Calculate daily, monthly, yearly projections
  const dailyEnergy = totalEnergy;
  const monthlyEnergy = totalEnergy * 30;
  const yearlyEnergy = totalEnergy * 365;

  const dailyCost = totalCost;
  const monthlyCost = totalCost * 30;
  const yearlyCost = totalCost * 365;

  return {
    appliances: appliancesWithCalc,
    totalEnergy,
    totalCost,
    dailyEnergy,
    monthlyEnergy,
    yearlyEnergy,
    dailyCost,
    monthlyCost,
    yearlyCost,
    highestConsumer,
  };
};

// Format number with decimals
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

// Calculate percentage
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// History management
const HISTORY_KEY = "energy-consumption-history";
const MAX_HISTORY = 10;

export const saveToHistory = (calculation: EnergyCalculation): void => {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: generateId(),
    timestamp: Date.now(),
    calculation,
  };
  history.unshift(entry);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getHistory = (): HistoryEntry[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};

// Export functions
export const exportToCSV = (calculation: EnergyCalculation): string => {
  let csv = "Appliance,Power (W),Hours,Minutes,Quantity,Energy (kWh),Cost\n";
  
  calculation.appliances.forEach(appliance => {
    const energy = calculateApplianceEnergy(appliance);
    const cost = calculateApplianceCost(appliance, energy);
    csv += `"${appliance.name}",${appliance.power},${appliance.hours},${appliance.minutes},${appliance.quantity},${formatNumber(energy, 3)},${formatNumber(cost, 2)}\n`;
  });
  
  csv += `\nTotal,,,,,${formatNumber(calculation.totalEnergy, 3)},${formatNumber(calculation.totalCost, 2)}\n`;
  csv += `Daily,,,,,${formatNumber(calculation.dailyEnergy, 3)},${formatNumber(calculation.dailyCost, 2)}\n`;
  csv += `Monthly,,,,,${formatNumber(calculation.monthlyEnergy, 3)},${formatNumber(calculation.monthlyCost, 2)}\n`;
  csv += `Yearly,,,,,${formatNumber(calculation.yearlyEnergy, 3)},${formatNumber(calculation.yearlyCost, 2)}\n`;
  
  return csv;
};

export const exportToText = (calculation: EnergyCalculation): string => {
  let text = "Energy Consumption Report\n";
  text += "=".repeat(50) + "\n\n";
  
  calculation.appliances.forEach(appliance => {
    const energy = calculateApplianceEnergy(appliance);
    const cost = calculateApplianceCost(appliance, energy);
    text += `${appliance.name}\n`;
    text += `  Power: ${appliance.power}W\n`;
    text += `  Usage: ${appliance.hours}h ${appliance.minutes}m\n`;
    text += `  Quantity: ${appliance.quantity}\n`;
    text += `  Energy: ${formatNumber(energy, 3)} kWh\n`;
    text += `  Cost: $${formatNumber(cost, 2)}\n\n`;
  });
  
  text += "=".repeat(50) + "\n";
  text += `Total Energy: ${formatNumber(calculation.totalEnergy, 3)} kWh\n`;
  text += `Total Cost: $${formatNumber(calculation.totalCost, 2)}\n\n`;
  text += `Daily: ${formatNumber(calculation.dailyEnergy, 3)} kWh ($${formatNumber(calculation.dailyCost, 2)})\n`;
  text += `Monthly: ${formatNumber(calculation.monthlyEnergy, 3)} kWh ($${formatNumber(calculation.monthlyCost, 2)})\n`;
  text += `Yearly: ${formatNumber(calculation.yearlyEnergy, 3)} kWh ($${formatNumber(calculation.yearlyCost, 2)})\n`;
  
  return text;
};

export const downloadFile = (content: string, filename: string, type: string = "text/plain"): void => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

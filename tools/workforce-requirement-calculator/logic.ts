import { WorkforceCalculation, ProductivityMode, UnitType, HistoryEntry, WorkforcePreset, CalculationBreakdown } from "./types";

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Validation
export function validateInputs(totalWork: number, productivity: number, days: number, hoursPerDay: number): string | null {
  if (isNaN(totalWork) || totalWork <= 0) {
    return "Total work must be greater than zero";
  }
  if (isNaN(productivity) || productivity <= 0) {
    return "Productivity must be greater than zero";
  }
  if (isNaN(days) || days <= 0) {
    return "Number of days must be greater than zero";
  }
  if (isNaN(hoursPerDay) || hoursPerDay <= 0) {
    return "Hours per day must be greater than zero";
  }
  return null;
}

// Core calculation function
export function calculateWorkforce(
  totalWork: number,
  productivity: number,
  productivityMode: ProductivityMode,
  days: number,
  hoursPerDay: number,
  unitType: UnitType,
  customUnit?: string
): WorkforceCalculation {
  // Calculate capacity per worker
  let capacityPerWorker: number;
  
  if (productivityMode === "daily") {
    capacityPerWorker = productivity * days;
  } else {
    // hourly mode
    capacityPerWorker = productivity * hoursPerDay * days;
  }
  
  // Calculate required workers (raw)
  const requiredWorkersRaw = totalWork / capacityPerWorker;
  
  // Round up to get actual required workers
  const requiredWorkers = Math.ceil(requiredWorkersRaw);
  
  // Calculate total capacity with rounded workers
  const totalCapacity = capacityPerWorker * requiredWorkers;
  
  // Calculate utilization rate
  const utilizationRate = (totalWork / totalCapacity) * 100;

  return {
    id: generateId(),
    timestamp: Date.now(),
    totalWork,
    productivity,
    productivityMode,
    days,
    hoursPerDay,
    unitType,
    customUnit,
    capacityPerWorker,
    requiredWorkers,
    requiredWorkersRaw,
    totalCapacity,
    utilizationRate
  };
}

// Get calculation breakdown
export function getCalculationBreakdown(calculation: WorkforceCalculation): CalculationBreakdown {
  const unit = calculation.customUnit || getUnitLabel(calculation.unitType);
  const timeUnit = calculation.productivityMode === "daily" ? "day" : "hour";
  
  let step1: string;
  let formula: string;
  
  if (calculation.productivityMode === "daily") {
    step1 = `Capacity per Worker = ${formatNumber(calculation.productivity, 2)} ${unit}/${timeUnit} × ${calculation.days} days = ${formatNumber(calculation.capacityPerWorker, 2)} ${unit}`;
    formula = `Workers = Total Work ÷ (Productivity × Days)`;
  } else {
    step1 = `Capacity per Worker = ${formatNumber(calculation.productivity, 2)} ${unit}/${timeUnit} × ${calculation.hoursPerDay} hours/day × ${calculation.days} days = ${formatNumber(calculation.capacityPerWorker, 2)} ${unit}`;
    formula = `Workers = Total Work ÷ (Productivity × Hours/Day × Days)`;
  }
  
  const step2 = `Required Workers (Raw) = ${formatNumber(calculation.totalWork, 2)} ÷ ${formatNumber(calculation.capacityPerWorker, 2)} = ${formatNumber(calculation.requiredWorkersRaw, 4)}`;
  
  const step3 = `Required Workers (Rounded Up) = ${calculation.requiredWorkers} workers`;
  
  return { step1, step2, step3, formula };
}

// Format number
export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

// Get unit label
export function getUnitLabel(unitType: UnitType): string {
  const labels = {
    units: "units",
    tasks: "tasks",
    area: "sq ft",
    items: "items",
    custom: "units"
  };
  return labels[unitType];
}

// Get productivity mode label
export function getProductivityModeLabel(mode: ProductivityMode): string {
  return mode === "daily" ? "Per Day" : "Per Hour";
}

// Get workforce presets
export function getWorkforcePresets(): WorkforcePreset[] {
  return [
    {
      name: "Brick Laying",
      description: "Standard brick laying work",
      totalWork: 1000,
      productivity: 100,
      productivityMode: "daily",
      days: 5,
      hoursPerDay: 8,
      unitType: "units",
      category: "Construction"
    },
    {
      name: "Painting",
      description: "Interior wall painting",
      totalWork: 2000,
      productivity: 200,
      productivityMode: "daily",
      days: 4,
      hoursPerDay: 8,
      unitType: "area",
      category: "Construction"
    },
    {
      name: "Data Entry",
      description: "Office data entry tasks",
      totalWork: 500,
      productivity: 10,
      productivityMode: "hourly",
      days: 2,
      hoursPerDay: 8,
      unitType: "tasks",
      category: "Office"
    },
    {
      name: "Assembly Line",
      description: "Manufacturing assembly",
      totalWork: 1200,
      productivity: 15,
      productivityMode: "hourly",
      days: 3,
      hoursPerDay: 8,
      unitType: "items",
      category: "Manufacturing"
    },
    {
      name: "Excavation",
      description: "Site excavation work",
      totalWork: 500,
      productivity: 50,
      productivityMode: "daily",
      days: 3,
      hoursPerDay: 8,
      unitType: "area",
      category: "Construction"
    },
    {
      name: "Packaging",
      description: "Product packaging",
      totalWork: 2400,
      productivity: 20,
      productivityMode: "hourly",
      days: 5,
      hoursPerDay: 8,
      unitType: "items",
      category: "Manufacturing"
    }
  ];
}

// History management
const STORAGE_KEY = "workforce-requirement-calculator-history";

export function saveToHistory(calculation: WorkforceCalculation, projectName?: string): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: generateId(),
      timestamp: Date.now(),
      calculation,
      projectName
    };
    
    history.unshift(entry);
    
    // Keep only last 20 entries
    const trimmedHistory = history.slice(0, 20);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.warn("Failed to save to history:", error);
  }
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Failed to load history:", error);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear history:", error);
  }
}

// Export functions
export function exportToText(calculation: WorkforceCalculation): string {
  const unit = calculation.customUnit || getUnitLabel(calculation.unitType);
  const breakdown = getCalculationBreakdown(calculation);
  
  const lines = [
    "WORKFORCE REQUIREMENT CALCULATION REPORT",
    "=" + "=".repeat(45),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Calculation ID: ${calculation.id}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(50),
    `Total Work: ${formatNumber(calculation.totalWork, 2)} ${unit}`,
    `Productivity: ${formatNumber(calculation.productivity, 2)} ${unit}/${calculation.productivityMode === "daily" ? "day" : "hour"}`,
    `Working Days: ${calculation.days}`,
    `Hours per Day: ${calculation.hoursPerDay}`,
    "",
    "CALCULATION BREAKDOWN:",
    "-".repeat(50),
    `Formula: ${breakdown.formula}`,
    "",
    `Step 1: ${breakdown.step1}`,
    `Step 2: ${breakdown.step2}`,
    `Step 3: ${breakdown.step3}`,
    "",
    "RESULTS:",
    "=".repeat(50),
    `REQUIRED WORKERS: ${calculation.requiredWorkers}`,
    "",
    "ADDITIONAL METRICS:",
    "-".repeat(50),
    `Capacity per Worker: ${formatNumber(calculation.capacityPerWorker, 2)} ${unit}`,
    `Total Capacity: ${formatNumber(calculation.totalCapacity, 2)} ${unit}`,
    `Utilization Rate: ${formatNumber(calculation.utilizationRate, 2)}%`,
    `Raw Workers Needed: ${formatNumber(calculation.requiredWorkersRaw, 4)}`,
    `Rounding Adjustment: ${calculation.requiredWorkers - calculation.requiredWorkersRaw > 0 ? "Rounded up" : "No rounding needed"}`,
    "",
    "Generated by Workforce Requirement Calculator",
    `Report generated on ${new Date().toLocaleString()}`
  ];

  return lines.join("\n");
}

export function downloadFile(content: string, filename: string, mimeType: string = "text/plain"): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Get workforce intensity indicator
export function getWorkforceIntensity(workers: number): "low" | "medium" | "high" | "very-high" {
  if (workers <= 5) return "low";
  if (workers <= 15) return "medium";
  if (workers <= 30) return "high";
  return "very-high";
}

// Calculate cost estimate (optional feature)
export function estimateLaborCost(workers: number, wagePerWorker: number, days: number): number {
  return workers * wagePerWorker * days;
}
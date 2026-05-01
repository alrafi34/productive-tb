import { LaborCalculation, WageType, Currency, HistoryEntry, WagePreset, ProjectPreset } from "./types";

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Validation
export function validateInputs(wage: number, workers: number, time: number): string | null {
  if (isNaN(wage) || wage <= 0) {
    return "Please enter a valid wage amount";
  }
  if (isNaN(workers) || workers <= 0) {
    return "Please enter a valid number of workers";
  }
  if (isNaN(time) || time <= 0) {
    return "Please enter valid working time";
  }
  return null;
}

// Core calculation function
export function performLaborCalculation(
  wageType: WageType,
  wage: number,
  workers: number,
  time: number,
  overtimeEnabled: boolean,
  overtimeHours: number,
  overtimeMultiplier: number,
  additionalCost: number,
  currency: Currency
): LaborCalculation {
  // Base cost calculation
  const baseCost = wage * time * workers;
  
  // Overtime calculation
  let overtimeCost = 0;
  if (overtimeEnabled && overtimeHours > 0) {
    overtimeCost = overtimeHours * wage * overtimeMultiplier * workers;
  }
  
  // Total cost
  const totalCost = baseCost + overtimeCost + additionalCost;
  
  // Additional metrics
  const costPerWorker = totalCost / workers;
  
  // Convert to hourly rate for comparison
  let averageHourlyRate: number;
  if (wageType === "hourly") {
    const totalHours = time + (overtimeEnabled ? overtimeHours : 0);
    averageHourlyRate = totalHours > 0 ? (baseCost + overtimeCost) / (totalHours * workers) : wage;
  } else {
    // Assume 8 hours per day for daily wage conversion
    const totalHours = (time * 8) + (overtimeEnabled ? overtimeHours : 0);
    averageHourlyRate = totalHours > 0 ? (baseCost + overtimeCost) / (totalHours * workers) : wage / 8;
  }

  return {
    id: generateId(),
    timestamp: Date.now(),
    wageType,
    wage,
    workers,
    time,
    overtimeEnabled,
    overtimeHours: overtimeEnabled ? overtimeHours : 0,
    overtimeMultiplier,
    additionalCost,
    currency,
    baseCost,
    overtimeCost,
    totalCost,
    costPerWorker,
    averageHourlyRate
  };
}

// Currency formatting
export function getCurrencySymbol(currency: Currency): string {
  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    BDT: "৳"
  };
  return symbols[currency];
}

export function formatCurrency(amount: number, currency: Currency): string {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${formatNumber(amount, 2)}`;
}

export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

// Wage type labels
export function getWageTypeLabel(wageType: WageType): string {
  return wageType === "hourly" ? "Hourly Wage" : "Daily Wage";
}

export function getTimeLabel(wageType: WageType): string {
  return wageType === "hourly" ? "Hours" : "Days";
}

// Presets
export function getWagePresets(): WagePreset[] {
  return [
    { name: "Minimum Wage", wageType: "hourly", wage: 7.25, description: "Federal minimum wage" },
    { name: "Construction Worker", wageType: "hourly", wage: 18, description: "Average construction wage" },
    { name: "Skilled Tradesman", wageType: "hourly", wage: 25, description: "Electrician, plumber, etc." },
    { name: "Site Supervisor", wageType: "hourly", wage: 35, description: "Construction supervisor" },
    { name: "General Labor", wageType: "daily", wage: 80, description: "Daily general labor" },
    { name: "Skilled Daily", wageType: "daily", wage: 150, description: "Skilled daily worker" }
  ];
}

export function getProjectPresets(): ProjectPreset[] {
  return [
    {
      name: "Small Renovation",
      wageType: "hourly",
      wage: 20,
      workers: 3,
      time: 40,
      description: "3 workers, 40 hours"
    },
    {
      name: "House Construction",
      wageType: "daily",
      wage: 120,
      workers: 8,
      time: 30,
      description: "8 workers, 30 days"
    },
    {
      name: "Commercial Project",
      wageType: "hourly",
      wage: 25,
      workers: 15,
      time: 160,
      description: "15 workers, 160 hours"
    },
    {
      name: "Weekend Project",
      wageType: "hourly",
      wage: 15,
      workers: 2,
      time: 16,
      description: "2 workers, weekend work"
    },
    {
      name: "Emergency Repair",
      wageType: "hourly",
      wage: 30,
      workers: 4,
      time: 12,
      description: "4 workers, urgent repair"
    },
    {
      name: "Large Infrastructure",
      wageType: "daily",
      wage: 100,
      workers: 25,
      time: 60,
      description: "25 workers, 60 days"
    }
  ];
}

// History management
const STORAGE_KEY = "labor-cost-calculator-history";

export function saveToHistory(calculation: LaborCalculation): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: generateId(),
      timestamp: Date.now(),
      calculation
    };
    
    history.unshift(entry);
    
    // Keep only last 50 entries
    const trimmedHistory = history.slice(0, 50);
    
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
export function exportToText(calculation: LaborCalculation): string {
  const lines = [
    "LABOR COST CALCULATION REPORT",
    "=" + "=".repeat(35),
    "",
    `Date: ${new Date(calculation.timestamp).toLocaleString()}`,
    `Calculation ID: ${calculation.id}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(20),
    `Wage Type: ${getWageTypeLabel(calculation.wageType)}`,
    `Wage Rate: ${formatCurrency(calculation.wage, calculation.currency)} per ${calculation.wageType === "hourly" ? "hour" : "day"}`,
    `Number of Workers: ${calculation.workers}`,
    `Working Time: ${calculation.time} ${getTimeLabel(calculation.wageType).toLowerCase()}`,
    "",
    "OVERTIME DETAILS:",
    "-".repeat(20),
    `Overtime Enabled: ${calculation.overtimeEnabled ? "Yes" : "No"}`,
  ];

  if (calculation.overtimeEnabled) {
    lines.push(
      `Overtime Hours: ${calculation.overtimeHours}`,
      `Overtime Multiplier: ${calculation.overtimeMultiplier}x`,
      `Overtime Cost: ${formatCurrency(calculation.overtimeCost, calculation.currency)}`
    );
  }

  lines.push(
    "",
    "ADDITIONAL COSTS:",
    "-".repeat(20),
    `Additional Expenses: ${formatCurrency(calculation.additionalCost, calculation.currency)}`,
    "",
    "COST BREAKDOWN:",
    "-".repeat(20),
    `Base Labor Cost: ${formatCurrency(calculation.baseCost, calculation.currency)}`,
    `Overtime Cost: ${formatCurrency(calculation.overtimeCost, calculation.currency)}`,
    `Additional Cost: ${formatCurrency(calculation.additionalCost, calculation.currency)}`,
    "",
    "FINAL RESULTS:",
    "=".repeat(20),
    `TOTAL COST: ${formatCurrency(calculation.totalCost, calculation.currency)}`,
    `Cost per Worker: ${formatCurrency(calculation.costPerWorker, calculation.currency)}`,
    `Average Hourly Rate: ${formatCurrency(calculation.averageHourlyRate, calculation.currency)}/hour`,
    "",
    "Generated by Labor Cost Calculator",
    `Report generated on ${new Date().toLocaleString()}`
  );

  return lines.join("\n");
}

export function exportToCSV(calculation: LaborCalculation): string {
  const headers = [
    "Date",
    "Wage Type",
    "Wage Rate",
    "Workers",
    "Time",
    "Overtime Hours",
    "Overtime Multiplier",
    "Base Cost",
    "Overtime Cost",
    "Additional Cost",
    "Total Cost",
    "Cost Per Worker",
    "Avg Hourly Rate",
    "Currency"
  ];

  const data = [
    new Date(calculation.timestamp).toLocaleDateString(),
    calculation.wageType,
    calculation.wage.toString(),
    calculation.workers.toString(),
    calculation.time.toString(),
    calculation.overtimeHours.toString(),
    calculation.overtimeMultiplier.toString(),
    calculation.baseCost.toString(),
    calculation.overtimeCost.toString(),
    calculation.additionalCost.toString(),
    calculation.totalCost.toString(),
    calculation.costPerWorker.toString(),
    calculation.averageHourlyRate.toString(),
    calculation.currency
  ];

  return [headers.join(","), data.join(",")].join("\n");
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

// Cost intensity for visual indicators
export function getCostIntensity(totalCost: number): "low" | "medium" | "high" | "very-high" {
  if (totalCost < 1000) return "low";
  if (totalCost < 5000) return "medium";
  if (totalCost < 20000) return "high";
  return "very-high";
}
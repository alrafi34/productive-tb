import { Resistor, ResistanceUnit, CalculationResult, HistoryEntry } from "./types";

// Unit conversion to Ohms
const UNIT_TO_OHMS: Record<ResistanceUnit, number> = {
  "Ω": 1,
  "kΩ": 1000,
  "MΩ": 1000000,
};

// Convert to Ohms
export const toOhms = (value: number, unit: ResistanceUnit): number => {
  return value * UNIT_TO_OHMS[unit];
};

// Convert from Ohms
export const fromOhms = (value: number, unit: ResistanceUnit): number => {
  return value / UNIT_TO_OHMS[unit];
};

// Format number with appropriate precision
export const formatNumber = (num: number, decimals: number = 3): string => {
  if (num === 0) return "0";
  
  const absNum = Math.abs(num);
  
  // Use scientific notation for very large numbers
  if (absNum >= 1e9) {
    return num.toExponential(2);
  }
  
  // Otherwise use fixed decimal
  const str = num.toFixed(decimals);
  // Remove trailing zeros
  return parseFloat(str).toString();
};

// Generate unique ID
export const generateId = (): string => {
  return `resistor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Create default resistor
export const createDefaultResistor = (): Resistor => ({
  id: generateId(),
  value: 0,
  unit: "Ω",
});

// Calculate total resistance in series
export const calculateSeriesResistance = (resistors: Resistor[]): number => {
  // Filter out resistors with zero or invalid values
  const validResistors = resistors.filter(r => r.value > 0);
  
  if (validResistors.length === 0) return 0;
  
  // Convert all to Ohms and sum
  const totalOhms = validResistors.reduce((sum, resistor) => {
    return sum + toOhms(resistor.value, resistor.unit);
  }, 0);
  
  return totalOhms;
};

// Perform calculation
export const performCalculation = (resistors: Resistor[], outputUnit: ResistanceUnit): CalculationResult => {
  const totalOhms = calculateSeriesResistance(resistors);
  const totalInUnit = fromOhms(totalOhms, outputUnit);
  
  // Generate conversions
  const conversions = [
    { unit: "Ω", value: formatNumber(totalOhms) },
    { unit: "kΩ", value: formatNumber(fromOhms(totalOhms, "kΩ")) },
    { unit: "MΩ", value: formatNumber(fromOhms(totalOhms, "MΩ")) },
  ].filter(item => {
    const num = parseFloat(item.value);
    return num >= 0.001 && num < 1000000;
  });
  
  return {
    totalResistance: totalInUnit,
    unit: outputUnit,
    resistors: resistors.filter(r => r.value > 0),
    conversions,
  };
};

// Parse bulk input (comma or newline separated)
export const parseBulkInput = (input: string, unit: ResistanceUnit): Resistor[] => {
  // Split by comma or newline
  const values = input
    .split(/[,\n]/)
    .map(v => v.trim())
    .filter(v => v.length > 0);
  
  return values.map(value => {
    const numValue = parseFloat(value);
    return {
      id: generateId(),
      value: isNaN(numValue) ? 0 : numValue,
      unit,
    };
  }).filter(r => r.value > 0);
};

// Smart unit selection based on value
export const getSmartUnit = (ohms: number): ResistanceUnit => {
  if (ohms >= 1000000) return "MΩ";
  if (ohms >= 1000) return "kΩ";
  return "Ω";
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
const HISTORY_KEY = "series-resistor-calculator-history";
const MAX_HISTORY = 10;

export const saveToHistory = (result: CalculationResult): void => {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: generateId(),
    timestamp: Date.now(),
    result,
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
export const exportToText = (result: CalculationResult): string => {
  let text = "Series Resistor Calculator Result\n";
  text += "=".repeat(40) + "\n\n";
  
  text += "Resistors:\n";
  result.resistors.forEach((resistor, idx) => {
    text += `  ${idx + 1}. ${formatNumber(resistor.value)} ${resistor.unit}\n`;
  });
  
  text += `\nTotal Resistance: ${formatNumber(result.totalResistance)} ${result.unit}\n\n`;
  
  if (result.conversions.length > 0) {
    text += "Conversions:\n";
    result.conversions.forEach(conv => {
      text += `  ${conv.value} ${conv.unit}\n`;
    });
  }
  
  text += `\nFormula: R_total = R1 + R2 + R3 + ... + Rn\n`;
  
  return text;
};

export const downloadFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Common resistor values (E12 series)
export const COMMON_RESISTOR_VALUES = [
  { value: 10, unit: "Ω" as ResistanceUnit },
  { value: 22, unit: "Ω" as ResistanceUnit },
  { value: 47, unit: "Ω" as ResistanceUnit },
  { value: 100, unit: "Ω" as ResistanceUnit },
  { value: 220, unit: "Ω" as ResistanceUnit },
  { value: 330, unit: "Ω" as ResistanceUnit },
  { value: 470, unit: "Ω" as ResistanceUnit },
  { value: 1, unit: "kΩ" as ResistanceUnit },
  { value: 2.2, unit: "kΩ" as ResistanceUnit },
  { value: 4.7, unit: "kΩ" as ResistanceUnit },
  { value: 10, unit: "kΩ" as ResistanceUnit },
  { value: 22, unit: "kΩ" as ResistanceUnit },
  { value: 47, unit: "kΩ" as ResistanceUnit },
  { value: 100, unit: "kΩ" as ResistanceUnit },
  { value: 220, unit: "kΩ" as ResistanceUnit },
  { value: 470, unit: "kΩ" as ResistanceUnit },
  { value: 1, unit: "MΩ" as ResistanceUnit },
];

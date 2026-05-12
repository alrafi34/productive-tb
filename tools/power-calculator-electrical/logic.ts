import {
  CalculationMode,
  VoltageUnit,
  CurrentUnit,
  PowerUnit,
  PowerCalculation,
  HistoryEntry,
  Preset
} from "./types";

// Unit conversion to base units
export function convertVoltageToVolts(value: number, unit: VoltageUnit): number {
  switch (unit) {
    case "mV": return value / 1000;
    case "kV": return value * 1000;
    default: return value;
  }
}

export function convertCurrentToAmps(value: number, unit: CurrentUnit): number {
  switch (unit) {
    case "mA": return value / 1000;
    default: return value;
  }
}

export function convertPowerToWatts(value: number, unit: PowerUnit): number {
  switch (unit) {
    case "mW": return value / 1000;
    case "kW": return value * 1000;
    default: return value;
  }
}

// Convert from base units
export function convertVoltsToUnit(value: number, unit: VoltageUnit): number {
  switch (unit) {
    case "mV": return value * 1000;
    case "kV": return value / 1000;
    default: return value;
  }
}

export function convertAmpsToUnit(value: number, unit: CurrentUnit): number {
  switch (unit) {
    case "mA": return value * 1000;
    default: return value;
  }
}

export function convertWattsToUnit(value: number, unit: PowerUnit): number {
  switch (unit) {
    case "mW": return value * 1000;
    case "kW": return value / 1000;
    default: return value;
  }
}

// Voltage presets
export function getVoltagePresets(): Preset[] {
  return [
    { name: "USB", voltage: 5, voltageUnit: "V", description: "USB Standard" },
    { name: "12V DC", voltage: 12, voltageUnit: "V", description: "Automotive" },
    { name: "24V DC", voltage: 24, voltageUnit: "V", description: "Industrial" },
    { name: "110V AC", voltage: 110, voltageUnit: "V", description: "US Standard" },
    { name: "220V AC", voltage: 220, voltageUnit: "V", description: "EU Standard" },
    { name: "240V AC", voltage: 240, voltageUnit: "V", description: "UK Standard" }
  ];
}

// Main calculation function
export function calculatePower(
  voltage: number,
  current: number,
  power: number,
  voltageUnit: VoltageUnit,
  currentUnit: CurrentUnit,
  powerUnit: PowerUnit,
  mode: CalculationMode
): PowerCalculation {
  // Convert to base units
  const voltageInVolts = convertVoltageToVolts(voltage, voltageUnit);
  const currentInAmps = convertCurrentToAmps(current, currentUnit);
  const powerInWatts = convertPowerToWatts(power, powerUnit);
  
  let resultVoltage = voltageInVolts;
  let resultCurrent = currentInAmps;
  let resultPower = powerInWatts;
  
  // Calculate based on mode
  switch (mode) {
    case "power":
      // P = V × I
      resultPower = voltageInVolts * currentInAmps;
      break;
    case "voltage":
      // V = P / I
      if (currentInAmps === 0) throw new Error("Current cannot be zero");
      resultVoltage = powerInWatts / currentInAmps;
      break;
    case "current":
      // I = P / V
      if (voltageInVolts === 0) throw new Error("Voltage cannot be zero");
      resultCurrent = powerInWatts / voltageInVolts;
      break;
  }
  
  // Convert back to selected units
  return {
    voltage: convertVoltsToUnit(resultVoltage, voltageUnit),
    current: convertAmpsToUnit(resultCurrent, currentUnit),
    power: convertWattsToUnit(resultPower, powerUnit),
    voltageUnit,
    currentUnit,
    powerUnit,
    mode,
    timestamp: Date.now()
  };
}

// Validation
export function validateInputs(
  voltage: number,
  current: number,
  power: number,
  mode: CalculationMode
): string | null {
  if (mode === "power") {
    if (voltage <= 0) return "Voltage must be greater than zero";
    if (current <= 0) return "Current must be greater than zero";
  } else if (mode === "voltage") {
    if (power <= 0) return "Power must be greater than zero";
    if (current <= 0) return "Current must be greater than zero";
  } else if (mode === "current") {
    if (power <= 0) return "Power must be greater than zero";
    if (voltage <= 0) return "Voltage must be greater than zero";
  }
  
  if (voltage > 1000000) return "Voltage value is too large";
  if (current > 1000000) return "Current value is too large";
  if (power > 1000000000) return "Power value is too large";
  
  return null;
}

// Format numbers
export function formatNumber(value: number, decimals: number = 4): string {
  // Remove trailing zeros
  return parseFloat(value.toFixed(decimals)).toString();
}

// Get unit labels
export function getVoltageUnitLabel(unit: VoltageUnit): string {
  return unit;
}

export function getCurrentUnitLabel(unit: CurrentUnit): string {
  return unit;
}

export function getPowerUnitLabel(unit: PowerUnit): string {
  return unit;
}

export function getModeLabel(mode: CalculationMode): string {
  const labels = {
    power: "Calculate Power (P)",
    voltage: "Calculate Voltage (V)",
    current: "Calculate Current (I)"
  };
  return labels[mode];
}

// History management
const HISTORY_KEY = "power-calculator-electrical-history";
const MAX_HISTORY = 20;

export function saveToHistory(calculation: PowerCalculation): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `calc-${Date.now()}`,
    timestamp: Date.now(),
    calculation
  };
  
  history.unshift(entry);
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

// Export functions
export function exportToText(calculation: PowerCalculation): string {
  let text = "ELECTRICAL POWER CALCULATION\n";
  text += "=".repeat(50) + "\n\n";
  
  if (calculation.mode === "power") {
    text += `Voltage (V): ${formatNumber(calculation.voltage)} ${calculation.voltageUnit}\n`;
    text += `Current (I): ${formatNumber(calculation.current)} ${calculation.currentUnit}\n`;
    text += `Power (P): ${formatNumber(calculation.power)} ${calculation.powerUnit}\n\n`;
    text += `Formula: P = V × I\n`;
    text += `Calculation: ${formatNumber(calculation.power)} ${calculation.powerUnit} = ${formatNumber(calculation.voltage)} ${calculation.voltageUnit} × ${formatNumber(calculation.current)} ${calculation.currentUnit}\n`;
  } else if (calculation.mode === "voltage") {
    text += `Power (P): ${formatNumber(calculation.power)} ${calculation.powerUnit}\n`;
    text += `Current (I): ${formatNumber(calculation.current)} ${calculation.currentUnit}\n`;
    text += `Voltage (V): ${formatNumber(calculation.voltage)} ${calculation.voltageUnit}\n\n`;
    text += `Formula: V = P / I\n`;
    text += `Calculation: ${formatNumber(calculation.voltage)} ${calculation.voltageUnit} = ${formatNumber(calculation.power)} ${calculation.powerUnit} / ${formatNumber(calculation.current)} ${calculation.currentUnit}\n`;
  } else {
    text += `Power (P): ${formatNumber(calculation.power)} ${calculation.powerUnit}\n`;
    text += `Voltage (V): ${formatNumber(calculation.voltage)} ${calculation.voltageUnit}\n`;
    text += `Current (I): ${formatNumber(calculation.current)} ${calculation.currentUnit}\n\n`;
    text += `Formula: I = P / V\n`;
    text += `Calculation: ${formatNumber(calculation.current)} ${calculation.currentUnit} = ${formatNumber(calculation.power)} ${calculation.powerUnit} / ${formatNumber(calculation.voltage)} ${calculation.voltageUnit}\n`;
  }
  
  text += `\nGenerated: ${new Date().toLocaleString()}\n`;
  return text;
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

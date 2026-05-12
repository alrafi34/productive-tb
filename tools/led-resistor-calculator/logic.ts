import {
  LEDColor,
  LEDResistorInputs,
  LEDResistorResult,
  LEDPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "led-resistor-calculator-history";
const MAX_HISTORY = 10;

// Standard resistor values (E24 series)
const E24_SERIES = [
  10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30,
  33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91
];

/**
 * Calculate LED resistor value
 */
export function calculateLEDResistor(inputs: LEDResistorInputs): LEDResistorResult {
  const { supplyVoltage, ledForwardVoltage, ledCurrent, numberOfLEDs } = inputs;
  
  const steps: string[] = [];
  
  steps.push(`Given Values:`);
  steps.push(`Supply Voltage (Vs) = ${supplyVoltage} V`);
  steps.push(`LED Forward Voltage (Vf) = ${ledForwardVoltage} V`);
  steps.push(`LED Current (If) = ${ledCurrent} mA`);
  steps.push(`Number of LEDs in Series = ${numberOfLEDs}`);
  steps.push(``);
  
  // Convert current from mA to A
  const currentA = ledCurrent / 1000;
  steps.push(`Step 1: Convert Current to Amperes`);
  steps.push(`Current (A) = ${ledCurrent} mA / 1000`);
  steps.push(`Current = ${formatNumber(currentA, 4)} A`);
  steps.push(``);
  
  // Calculate total LED voltage drop
  const totalLEDVoltage = ledForwardVoltage * numberOfLEDs;
  steps.push(`Step 2: Calculate Total LED Voltage Drop`);
  steps.push(`Total LED Voltage = Vf × Number of LEDs`);
  steps.push(`Total LED Voltage = ${ledForwardVoltage} × ${numberOfLEDs}`);
  steps.push(`Total LED Voltage = ${formatNumber(totalLEDVoltage, 2)} V`);
  steps.push(``);
  
  // Calculate voltage drop across resistor
  const voltageDrop = supplyVoltage - totalLEDVoltage;
  steps.push(`Step 3: Calculate Voltage Drop Across Resistor`);
  steps.push(`Voltage Drop = Vs - Total LED Voltage`);
  steps.push(`Voltage Drop = ${supplyVoltage} - ${formatNumber(totalLEDVoltage, 2)}`);
  steps.push(`Voltage Drop = ${formatNumber(voltageDrop, 2)} V`);
  steps.push(``);
  
  // Calculate resistance using Ohm's Law
  const resistance = voltageDrop / currentA;
  steps.push(`Step 4: Calculate Resistance (Ohm's Law)`);
  steps.push(`R = V / I`);
  steps.push(`R = ${formatNumber(voltageDrop, 2)} / ${formatNumber(currentA, 4)}`);
  steps.push(`R = ${formatNumber(resistance, 2)} Ω`);
  steps.push(``);
  
  // Find nearest standard resistor value
  const standardResistance = findNearestStandardResistor(resistance);
  steps.push(`Step 5: Find Nearest Standard Resistor Value`);
  steps.push(`Calculated: ${formatNumber(resistance, 2)} Ω`);
  steps.push(`Standard Value: ${standardResistance} Ω (E24 series)`);
  steps.push(``);
  
  // Calculate power dissipation
  const power = currentA * currentA * resistance;
  steps.push(`Step 6: Calculate Power Dissipation`);
  steps.push(`P = I² × R`);
  steps.push(`P = (${formatNumber(currentA, 4)})² × ${formatNumber(resistance, 2)}`);
  steps.push(`P = ${formatNumber(power, 4)} W`);
  steps.push(``);
  
  // Recommend wattage rating
  const recommendedWattage = getRecommendedWattage(power);
  steps.push(`Step 7: Recommended Resistor Wattage`);
  steps.push(`Calculated Power: ${formatNumber(power, 4)} W`);
  steps.push(`Recommended: ${recommendedWattage} W resistor`);
  steps.push(`(Use resistor rated at least 2× calculated power for safety)`);
  
  // Calculate actual current with standard resistor
  const actualCurrent = (voltageDrop / standardResistance) * 1000; // in mA
  
  return {
    resistance,
    standardResistance,
    power,
    recommendedWattage,
    voltageDrop,
    actualCurrent,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Find nearest standard resistor value
 */
export function findNearestStandardResistor(resistance: number): number {
  // Determine the magnitude (power of 10)
  const magnitude = Math.pow(10, Math.floor(Math.log10(resistance)));
  const normalized = resistance / magnitude;
  
  // Find closest value in E24 series
  let closest = E24_SERIES[0];
  let minDiff = Math.abs(normalized - closest);
  
  for (const value of E24_SERIES) {
    const diff = Math.abs(normalized - value);
    if (diff < minDiff) {
      minDiff = diff;
      closest = value;
    }
  }
  
  return closest * magnitude;
}

/**
 * Get recommended wattage rating
 */
export function getRecommendedWattage(power: number): number {
  const safetyFactor = 2; // Use 2x power for safety
  const requiredPower = power * safetyFactor;
  
  const standardWattages = [0.125, 0.25, 0.5, 1, 2, 5, 10];
  
  for (const wattage of standardWattages) {
    if (wattage >= requiredPower) {
      return wattage;
    }
  }
  
  return 10; // Default to 10W if higher
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: LEDResistorInputs): string | null {
  const { supplyVoltage, ledForwardVoltage, ledCurrent, numberOfLEDs } = inputs;
  
  if (isNaN(supplyVoltage) || supplyVoltage <= 0) {
    return 'Supply voltage must be greater than 0';
  }
  
  if (isNaN(ledForwardVoltage) || ledForwardVoltage <= 0) {
    return 'LED forward voltage must be greater than 0';
  }
  
  if (isNaN(ledCurrent) || ledCurrent <= 0) {
    return 'LED current must be greater than 0';
  }
  
  if (isNaN(numberOfLEDs) || numberOfLEDs < 1) {
    return 'Number of LEDs must be at least 1';
  }
  
  // Check if supply voltage is sufficient
  const totalLEDVoltage = ledForwardVoltage * numberOfLEDs;
  if (supplyVoltage <= totalLEDVoltage) {
    return `Supply voltage (${supplyVoltage}V) must be greater than total LED voltage (${formatNumber(totalLEDVoltage, 2)}V)`;
  }
  
  // Warning for unrealistic values
  if (supplyVoltage > 1000) {
    return 'Supply voltage seems unrealistically high (>1000V)';
  }
  
  if (ledCurrent > 1000) {
    return 'LED current seems unrealistically high (>1000mA)';
  }
  
  return null;
}

/**
 * Get LED presets
 */
export function getLEDPresets(): LEDPreset[] {
  return [
    {
      name: 'Red LED',
      color: 'red',
      forwardVoltage: 2.0,
      typicalCurrent: 20,
      description: 'Standard red LED (1.8-2.2V)'
    },
    {
      name: 'Green LED',
      color: 'green',
      forwardVoltage: 2.1,
      typicalCurrent: 20,
      description: 'Standard green LED (2.0-2.2V)'
    },
    {
      name: 'Yellow LED',
      color: 'yellow',
      forwardVoltage: 2.1,
      typicalCurrent: 20,
      description: 'Standard yellow LED (2.0-2.2V)'
    },
    {
      name: 'Blue LED',
      color: 'blue',
      forwardVoltage: 3.2,
      typicalCurrent: 20,
      description: 'Standard blue LED (3.0-3.4V)'
    },
    {
      name: 'White LED',
      color: 'white',
      forwardVoltage: 3.2,
      typicalCurrent: 20,
      description: 'Standard white LED (3.0-3.4V)'
    }
  ];
}

/**
 * Get common supply voltages
 */
export function getCommonVoltages(): number[] {
  return [3.3, 5, 9, 12, 24];
}

/**
 * Format number with decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

/**
 * Format resistance with appropriate unit
 */
export function formatResistance(resistance: number): string {
  if (resistance >= 1000000) {
    return `${formatNumber(resistance / 1000000, 2)} MΩ`;
  } else if (resistance >= 1000) {
    return `${formatNumber(resistance / 1000, 2)} kΩ`;
  }
  return `${formatNumber(resistance, 2)} Ω`;
}

// History management
export function saveToHistory(inputs: LEDResistorInputs, result: LEDResistorResult): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    inputs,
    result
  };
  
  history.unshift(entry);
  const trimmed = history.slice(0, MAX_HISTORY);
  
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to load history:', e);
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
}

// Export functions
export function exportToText(inputs: LEDResistorInputs, result: LEDResistorResult): string {
  const lines = [
    "LED RESISTOR CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Supply Voltage: ${inputs.supplyVoltage} V`,
    `LED Forward Voltage: ${inputs.ledForwardVoltage} V`,
    `LED Current: ${inputs.ledCurrent} mA`,
    `Number of LEDs: ${inputs.numberOfLEDs}`,
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Required Resistance: ${formatNumber(result.resistance, 2)} Ω`,
    `Standard Resistor: ${result.standardResistance} Ω`,
    `Power Dissipation: ${formatNumber(result.power, 4)} W`,
    `Recommended Wattage: ${result.recommendedWattage} W`,
    `Voltage Drop: ${formatNumber(result.voltageDrop, 2)} V`,
    `Actual Current: ${formatNumber(result.actualCurrent, 2)} mA`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50)
  ];
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by LED Resistor Calculator");
  
  return lines.join("\n");
}

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

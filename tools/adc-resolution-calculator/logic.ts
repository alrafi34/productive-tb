import { ADCInputs, ADCResult, HistoryEntry } from "./types";

// Calculate ADC parameters
export function calculateADC(inputs: ADCInputs): ADCResult {
  const { referenceVoltage, bits, inputVoltage } = inputs;
  const steps: string[] = [];
  
  steps.push('ADC RESOLUTION CALCULATION');
  steps.push('');
  steps.push('Given Values:');
  steps.push(`Reference Voltage (Vref): ${referenceVoltage} V`);
  steps.push(`ADC Resolution: ${bits} bits`);
  if (inputVoltage > 0) {
    steps.push(`Input Voltage (Vin): ${inputVoltage} V`);
  }
  steps.push('');
  
  // Step 1: Calculate number of quantization levels
  steps.push('Step 1: Calculate Number of Quantization Levels');
  steps.push(`Formula: Levels = 2^n`);
  steps.push(`Levels = 2^${bits}`);
  
  const levels = Math.pow(2, bits);
  
  steps.push(`Levels = ${levels}`);
  steps.push('');
  
  // Step 2: Calculate step size (resolution)
  steps.push('Step 2: Calculate Step Size (Resolution)');
  steps.push(`Formula: Step Size = Vref / (2^n)`);
  steps.push(`Step Size = ${referenceVoltage} / ${levels}`);
  
  const stepSizeVolts = referenceVoltage / levels;
  const stepSizeMillivolts = stepSizeVolts * 1000;
  
  steps.push(`Step Size = ${formatNumber(stepSizeVolts, 9)} V`);
  steps.push(`Step Size = ${formatNumber(stepSizeMillivolts, 6)} mV`);
  steps.push('');
  
  // Step 3: Calculate maximum voltage
  const maxVoltage = stepSizeVolts * (levels - 1);
  steps.push('Step 3: Calculate Maximum Measurable Voltage');
  steps.push(`Formula: Vmax = Step Size × (Levels - 1)`);
  steps.push(`Vmax = ${formatNumber(stepSizeVolts, 9)} × ${levels - 1}`);
  steps.push(`Vmax = ${formatNumber(maxVoltage, 6)} V`);
  steps.push('');
  
  // Step 4: Calculate digital output value (if input voltage provided)
  let digitalValue: number | null = null;
  
  if (inputVoltage > 0) {
    steps.push('Step 4: Calculate Digital Output Value');
    steps.push(`Formula: Digital Value = floor(Vin / Step Size)`);
    steps.push(`Digital Value = floor(${inputVoltage} / ${formatNumber(stepSizeVolts, 9)})`);
    
    digitalValue = Math.floor(inputVoltage / stepSizeVolts);
    
    // Clamp to valid range
    if (digitalValue < 0) digitalValue = 0;
    if (digitalValue >= levels) digitalValue = levels - 1;
    
    steps.push(`Digital Value = ${digitalValue}`);
    steps.push('');
    steps.push('Note: Digital value is clamped to valid range [0, ' + (levels - 1) + ']');
  }

  return {
    levels,
    stepSizeVolts,
    stepSizeMillivolts,
    digitalValue,
    maxVoltage,
    steps
  };
}

// Validate inputs
export function validateInputs(inputs: ADCInputs): string | null {
  const { referenceVoltage, bits, inputVoltage } = inputs;
  
  if (!referenceVoltage || referenceVoltage <= 0) {
    return "Reference voltage must be greater than 0";
  }
  
  if (!bits || bits <= 0 || !Number.isInteger(bits)) {
    return "ADC resolution must be a positive integer";
  }
  
  if (bits > 32) {
    return "ADC resolution must be 32 bits or less";
  }
  
  if (inputVoltage < 0) {
    return "Input voltage cannot be negative";
  }
  
  return null;
}

// Format number with decimals
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Format number with scientific notation for very small values
export function formatNumberSmart(value: number): string {
  if (value < 0.000001) {
    return value.toExponential(3);
  } else if (value < 0.001) {
    return value.toFixed(9);
  } else if (value < 1) {
    return value.toFixed(6);
  } else {
    return value.toFixed(3);
  }
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

// ADC presets
export function getADCPresets() {
  return [
    {
      name: "8-bit ADC",
      description: "Arduino Uno, basic microcontrollers",
      referenceVoltage: 5,
      bits: 8
    },
    {
      name: "10-bit ADC",
      description: "Arduino, most AVR microcontrollers",
      referenceVoltage: 5,
      bits: 10
    },
    {
      name: "12-bit ADC",
      description: "STM32, ESP32, ARM Cortex",
      referenceVoltage: 3.3,
      bits: 12
    },
    {
      name: "16-bit ADC",
      description: "High-precision data acquisition",
      referenceVoltage: 5,
      bits: 16
    },
    {
      name: "ESP32 ADC",
      description: "ESP32 default configuration",
      referenceVoltage: 3.3,
      bits: 12
    },
    {
      name: "Raspberry Pi Pico",
      description: "RP2040 ADC",
      referenceVoltage: 3.3,
      bits: 12
    }
  ];
}

// History management
const HISTORY_KEY = 'adc-resolution-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: ADCInputs, result: ADCResult): void {
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
export function exportToText(inputs: ADCInputs, result: ADCResult): string {
  const lines: string[] = [];
  
  lines.push('ADC RESOLUTION CALCULATOR - REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('INPUT PARAMETERS:');
  lines.push('-'.repeat(60));
  lines.push(`Reference Voltage (Vref): ${inputs.referenceVoltage} V`);
  lines.push(`ADC Resolution: ${inputs.bits} bits`);
  if (inputs.inputVoltage > 0) {
    lines.push(`Input Voltage (Vin): ${inputs.inputVoltage} V`);
  }
  lines.push('');
  lines.push('CALCULATED RESULTS:');
  lines.push('-'.repeat(60));
  lines.push(`Quantization Levels: ${result.levels}`);
  lines.push(`Step Size: ${formatNumber(result.stepSizeVolts, 9)} V`);
  lines.push(`Step Size: ${formatNumber(result.stepSizeMillivolts, 6)} mV`);
  lines.push(`Maximum Voltage: ${formatNumber(result.maxVoltage, 6)} V`);
  if (result.digitalValue !== null) {
    lines.push(`Digital Output Value: ${result.digitalValue}`);
  }
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(60));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(60));
  lines.push('Generated by ADC Resolution Calculator');
  
  return lines.join('\n');
}

// Export to CSV
export function exportToCSV(inputs: ADCInputs, result: ADCResult): string {
  let csv = 'ADC Resolution Calculation Report\n\n';
  csv += 'Parameter,Value,Unit\n';
  csv += `Reference Voltage,${inputs.referenceVoltage},V\n`;
  csv += `ADC Resolution,${inputs.bits},bits\n`;
  csv += `Quantization Levels,${result.levels},-\n`;
  csv += `Step Size,${formatNumber(result.stepSizeVolts, 9)},V\n`;
  csv += `Step Size,${formatNumber(result.stepSizeMillivolts, 6)},mV\n`;
  csv += `Maximum Voltage,${formatNumber(result.maxVoltage, 6)},V\n`;
  if (inputs.inputVoltage > 0) {
    csv += `Input Voltage,${inputs.inputVoltage},V\n`;
  }
  if (result.digitalValue !== null) {
    csv += `Digital Output Value,${result.digitalValue},-\n`;
  }
  
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
const SETTINGS_KEY = 'adc-resolution-calculator-settings';

export function saveSettings(settings: Partial<ADCInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<ADCInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

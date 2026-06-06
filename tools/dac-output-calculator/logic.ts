import { DACInputs, DACResult, HistoryEntry } from "./types";

// Calculate DAC output voltage
export function calculateDAC(inputs: DACInputs): DACResult {
  const { digitalValue, bits, referenceVoltage, mode } = inputs;
  const steps: string[] = [];
  
  steps.push('DAC OUTPUT CALCULATION');
  steps.push('');
  steps.push('Given Values:');
  steps.push(`Digital Input (D): ${digitalValue}`);
  steps.push(`Resolution: ${bits} bits`);
  steps.push(`Reference Voltage (Vref): ${referenceVoltage} V`);
  steps.push(`DAC Mode: ${mode === 'unipolar' ? 'Unipolar (0 to Vref)' : 'Bipolar (-Vref to +Vref)'}`);
  steps.push('');
  
  // Step 1: Calculate maximum value
  steps.push('Step 1: Calculate Maximum Digital Value');
  steps.push(`Formula: Max Value = 2^n - 1`);
  steps.push(`Max Value = 2^${bits} - 1`);
  
  const maxValue = Math.pow(2, bits) - 1;
  
  steps.push(`Max Value = ${maxValue}`);
  steps.push('');
  
  // Step 2: Calculate step size
  steps.push('Step 2: Calculate Step Size');
  if (mode === 'unipolar') {
    steps.push(`Formula: Step Size = Vref / (2^n - 1)`);
    steps.push(`Step Size = ${referenceVoltage} / ${maxValue}`);
  } else {
    steps.push(`Formula: Step Size = (2 × Vref) / (2^n - 1)`);
    steps.push(`Step Size = (2 × ${referenceVoltage}) / ${maxValue}`);
  }
  
  const stepSize = mode === 'unipolar' 
    ? referenceVoltage / maxValue 
    : (2 * referenceVoltage) / maxValue;
  
  steps.push(`Step Size = ${formatNumber(stepSize, 9)} V`);
  steps.push('');
  
  // Step 3: Calculate output voltage
  steps.push('Step 3: Calculate Output Voltage');
  
  let outputVoltage: number;
  let percentage: number;
  
  if (mode === 'unipolar') {
    steps.push(`Formula: Vout = (D / Max Value) × Vref`);
    steps.push(`Vout = (${digitalValue} / ${maxValue}) × ${referenceVoltage}`);
    
    outputVoltage = (digitalValue / maxValue) * referenceVoltage;
    percentage = (digitalValue / maxValue) * 100;
    
    steps.push(`Vout = ${formatNumber(outputVoltage, 6)} V`);
    steps.push(`Percentage = ${formatNumber(percentage, 2)}% of full scale`);
  } else {
    steps.push(`Formula: Vout = ((D / Max Value) × 2 × Vref) - Vref`);
    steps.push(`Vout = ((${digitalValue} / ${maxValue}) × 2 × ${referenceVoltage}) - ${referenceVoltage}`);
    
    outputVoltage = ((digitalValue / maxValue) * 2 * referenceVoltage) - referenceVoltage;
    percentage = (digitalValue / maxValue) * 100;
    
    steps.push(`Vout = ${formatNumber(outputVoltage, 6)} V`);
    steps.push(`Percentage = ${formatNumber(percentage, 2)}% of range`);
  }
  
  steps.push('');
  steps.push('RESULT:');
  steps.push(`Output Voltage: ${formatNumber(outputVoltage, 6)} V`);
  steps.push(`Digital Value: ${digitalValue} / ${maxValue}`);
  steps.push(`Percentage: ${formatNumber(percentage, 2)}%`);

  return {
    outputVoltage,
    percentage,
    maxValue,
    stepSize,
    steps
  };
}

// Validate inputs
export function validateInputs(inputs: DACInputs): string | null {
  const { digitalValue, bits, referenceVoltage } = inputs;
  
  if (!bits || bits <= 0 || !Number.isInteger(bits)) {
    return "Resolution must be a positive integer";
  }
  
  if (bits > 32) {
    return "Resolution must be 32 bits or less";
  }
  
  if (!referenceVoltage || referenceVoltage <= 0) {
    return "Reference voltage must be greater than 0";
  }
  
  const maxValue = Math.pow(2, bits) - 1;
  
  if (digitalValue < 0) {
    return "Digital value cannot be negative";
  }
  
  if (digitalValue > maxValue) {
    return `Digital value exceeds maximum (${maxValue}) for ${bits}-bit resolution`;
  }
  
  if (!Number.isInteger(digitalValue)) {
    return "Digital value must be an integer";
  }
  
  return null;
}

// Format number with decimals
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
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

// DAC presets
export function getDACPresets() {
  return [
    {
      name: "8-bit DAC (Arduino)",
      description: "Standard Arduino analogWrite()",
      bits: 8,
      referenceVoltage: 5,
      mode: 'unipolar' as const
    },
    {
      name: "10-bit DAC",
      description: "Common microcontroller DAC",
      bits: 10,
      referenceVoltage: 3.3,
      mode: 'unipolar' as const
    },
    {
      name: "12-bit DAC (ESP32)",
      description: "ESP32, STM32 DAC",
      bits: 12,
      referenceVoltage: 3.3,
      mode: 'unipolar' as const
    },
    {
      name: "16-bit DAC",
      description: "High-precision audio DAC",
      bits: 16,
      referenceVoltage: 5,
      mode: 'unipolar' as const
    },
    {
      name: "12-bit Bipolar",
      description: "Bipolar output ±5V",
      bits: 12,
      referenceVoltage: 5,
      mode: 'bipolar' as const
    },
    {
      name: "16-bit Audio",
      description: "Professional audio DAC",
      bits: 16,
      referenceVoltage: 2.5,
      mode: 'unipolar' as const
    }
  ];
}

// History management
const HISTORY_KEY = 'dac-output-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: DACInputs, result: DACResult): void {
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
export function exportToText(inputs: DACInputs, result: DACResult): string {
  const lines: string[] = [];
  
  lines.push('DAC OUTPUT CALCULATOR - REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('INPUT PARAMETERS:');
  lines.push('-'.repeat(60));
  lines.push(`Digital Input Value: ${inputs.digitalValue}`);
  lines.push(`Resolution: ${inputs.bits} bits`);
  lines.push(`Reference Voltage: ${inputs.referenceVoltage} V`);
  lines.push(`DAC Mode: ${inputs.mode === 'unipolar' ? 'Unipolar (0 to Vref)' : 'Bipolar (-Vref to +Vref)'}`);
  lines.push('');
  lines.push('CALCULATED RESULTS:');
  lines.push('-'.repeat(60));
  lines.push(`Output Voltage: ${formatNumber(result.outputVoltage, 6)} V`);
  lines.push(`Percentage: ${formatNumber(result.percentage, 2)}%`);
  lines.push(`Maximum Value: ${result.maxValue}`);
  lines.push(`Step Size: ${formatNumber(result.stepSize, 9)} V`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(60));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(60));
  lines.push('Generated by DAC Output Calculator');
  
  return lines.join('\n');
}

// Export to CSV
export function exportToCSV(inputs: DACInputs, result: DACResult): string {
  let csv = 'DAC Output Calculation Report\n\n';
  csv += 'Parameter,Value,Unit\n';
  csv += `Digital Input,${inputs.digitalValue},-\n`;
  csv += `Resolution,${inputs.bits},bits\n`;
  csv += `Reference Voltage,${inputs.referenceVoltage},V\n`;
  csv += `DAC Mode,${inputs.mode},-\n`;
  csv += `Output Voltage,${formatNumber(result.outputVoltage, 6)},V\n`;
  csv += `Percentage,${formatNumber(result.percentage, 2)},%\n`;
  csv += `Maximum Value,${result.maxValue},-\n`;
  csv += `Step Size,${formatNumber(result.stepSize, 9)},V\n`;
  
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
const SETTINGS_KEY = 'dac-output-calculator-settings';

export function saveSettings(settings: Partial<DACInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<DACInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

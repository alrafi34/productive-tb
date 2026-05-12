import { DecibelInputs, DecibelResult, CalculationMode } from "./types";

export function calculateDecibel(inputs: DecibelInputs): DecibelResult {
  const { mode, value } = inputs;
  let outputValue: number;
  let formula: string;
  const steps: string[] = [];

  switch (mode) {
    case 'power_to_db':
      outputValue = 10 * Math.log10(value);
      formula = 'dB = 10 × log₁₀(P₂/P₁)';
      steps.push('Power Ratio to Decibels');
      steps.push('');
      steps.push(`Given: Power Ratio = ${value}`);
      steps.push('');
      steps.push('Formula: dB = 10 × log₁₀(Ratio)');
      steps.push('');
      steps.push(`Step 1: log₁₀(${value}) = ${Math.log10(value).toFixed(6)}`);
      steps.push(`Step 2: 10 × ${Math.log10(value).toFixed(6)} = ${outputValue.toFixed(4)}`);
      steps.push('');
      steps.push(`Result: ${outputValue.toFixed(4)} dB`);
      break;

    case 'voltage_to_db':
      outputValue = 20 * Math.log10(value);
      formula = 'dB = 20 × log₁₀(V₂/V₁)';
      steps.push('Voltage/Current Ratio to Decibels');
      steps.push('');
      steps.push(`Given: Voltage/Current Ratio = ${value}`);
      steps.push('');
      steps.push('Formula: dB = 20 × log₁₀(Ratio)');
      steps.push('');
      steps.push(`Step 1: log₁₀(${value}) = ${Math.log10(value).toFixed(6)}`);
      steps.push(`Step 2: 20 × ${Math.log10(value).toFixed(6)} = ${outputValue.toFixed(4)}`);
      steps.push('');
      steps.push(`Result: ${outputValue.toFixed(4)} dB`);
      break;

    case 'db_to_power':
      outputValue = Math.pow(10, value / 10);
      formula = 'Power Ratio = 10^(dB/10)';
      steps.push('Decibels to Power Ratio');
      steps.push('');
      steps.push(`Given: dB = ${value}`);
      steps.push('');
      steps.push('Formula: Power Ratio = 10^(dB/10)');
      steps.push('');
      steps.push(`Step 1: ${value} / 10 = ${(value / 10).toFixed(4)}`);
      steps.push(`Step 2: 10^${(value / 10).toFixed(4)} = ${outputValue.toFixed(6)}`);
      steps.push('');
      steps.push(`Result: ${outputValue.toFixed(6)} (Power Ratio)`);
      break;

    case 'db_to_voltage':
      outputValue = Math.pow(10, value / 20);
      formula = 'Voltage Ratio = 10^(dB/20)';
      steps.push('Decibels to Voltage/Current Ratio');
      steps.push('');
      steps.push(`Given: dB = ${value}`);
      steps.push('');
      steps.push('Formula: Voltage Ratio = 10^(dB/20)');
      steps.push('');
      steps.push(`Step 1: ${value} / 20 = ${(value / 20).toFixed(4)}`);
      steps.push(`Step 2: 10^${(value / 20).toFixed(4)} = ${outputValue.toFixed(6)}`);
      steps.push('');
      steps.push(`Result: ${outputValue.toFixed(6)} (Voltage/Current Ratio)`);
      break;
  }

  return {
    mode,
    inputValue: value,
    outputValue,
    formula,
    steps
  };
}

export function validateInputs(inputs: DecibelInputs): string | null {
  const { mode, value } = inputs;

  if (isNaN(value) || !isFinite(value)) {
    return "Please enter a valid number";
  }

  // For ratio to dB conversions, value must be positive
  if ((mode === 'power_to_db' || mode === 'voltage_to_db') && value <= 0) {
    return "Ratio must be greater than 0 for logarithmic calculations";
  }

  return null;
}

export function formatNumber(value: number, decimals: number = 4): string {
  if (Math.abs(value) >= 1000000 || (Math.abs(value) < 0.001 && value !== 0)) {
    return value.toExponential(decimals);
  }
  return value.toFixed(decimals);
}

export function getPresets(mode: CalculationMode) {
  const presets = {
    power_to_db: [
      { name: '2x Power Gain', description: 'Double power', value: 2 },
      { name: '10x Power Gain', description: 'Ten times power', value: 10 },
      { name: '100x Power Gain', description: 'Hundred times power', value: 100 },
      { name: '0.5x Power Loss', description: 'Half power (attenuation)', value: 0.5 },
      { name: '0.1x Power Loss', description: '10% remaining power', value: 0.1 },
      { name: '0.01x Power Loss', description: '1% remaining power', value: 0.01 }
    ],
    voltage_to_db: [
      { name: '2x Voltage Gain', description: 'Double voltage', value: 2 },
      { name: '10x Voltage Gain', description: 'Ten times voltage', value: 10 },
      { name: '100x Voltage Gain', description: 'Hundred times voltage', value: 100 },
      { name: '0.5x Voltage Loss', description: 'Half voltage', value: 0.5 },
      { name: '0.1x Voltage Loss', description: '10% remaining voltage', value: 0.1 },
      { name: '0.01x Voltage Loss', description: '1% remaining voltage', value: 0.01 }
    ],
    db_to_power: [
      { name: '+3 dB', description: 'Approximately 2x power', value: 3 },
      { name: '+10 dB', description: '10x power gain', value: 10 },
      { name: '+20 dB', description: '100x power gain', value: 20 },
      { name: '-3 dB', description: 'Half power point', value: -3 },
      { name: '-10 dB', description: '10% power remaining', value: -10 },
      { name: '-20 dB', description: '1% power remaining', value: -20 }
    ],
    db_to_voltage: [
      { name: '+6 dB', description: 'Approximately 2x voltage', value: 6 },
      { name: '+20 dB', description: '10x voltage gain', value: 20 },
      { name: '+40 dB', description: '100x voltage gain', value: 40 },
      { name: '-6 dB', description: 'Half voltage', value: -6 },
      { name: '-20 dB', description: '10% voltage remaining', value: -20 },
      { name: '-40 dB', description: '1% voltage remaining', value: -40 }
    ]
  };

  return presets[mode] || [];
}

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

// History management
interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: DecibelInputs;
  result: DecibelResult;
}

const HISTORY_KEY = 'decibel-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: DecibelInputs, result: DecibelResult): void {
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
  try {
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

export function exportToText(inputs: DecibelInputs, result: DecibelResult): string {
  const lines: string[] = [];
  
  lines.push('DECIBEL (dB) CALCULATOR - CALCULATION REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('CALCULATION MODE:');
  lines.push(`${getModeLabel(inputs.mode)}`);
  lines.push('');
  lines.push('INPUT:');
  lines.push(`${getInputLabel(inputs.mode)}: ${inputs.value}`);
  lines.push('');
  lines.push('RESULT:');
  lines.push(`${getOutputLabel(inputs.mode)}: ${formatNumber(result.outputValue, 4)}`);
  lines.push('');
  lines.push('FORMULA:');
  lines.push(result.formula);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Decibel (dB) Calculator');
  
  return lines.join('\n');
}

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

function getModeLabel(mode: CalculationMode): string {
  const labels = {
    power_to_db: 'Power Ratio → Decibels',
    voltage_to_db: 'Voltage/Current Ratio → Decibels',
    db_to_power: 'Decibels → Power Ratio',
    db_to_voltage: 'Decibels → Voltage/Current Ratio'
  };
  return labels[mode];
}

function getInputLabel(mode: CalculationMode): string {
  const labels = {
    power_to_db: 'Power Ratio',
    voltage_to_db: 'Voltage/Current Ratio',
    db_to_power: 'Decibels (dB)',
    db_to_voltage: 'Decibels (dB)'
  };
  return labels[mode];
}

function getOutputLabel(mode: CalculationMode): string {
  const labels = {
    power_to_db: 'Decibels (dB)',
    voltage_to_db: 'Decibels (dB)',
    db_to_power: 'Power Ratio',
    db_to_voltage: 'Voltage/Current Ratio'
  };
  return labels[mode];
}

// Save last used mode
const MODE_KEY = 'decibel-calculator-mode';

export function saveMode(mode: CalculationMode): void {
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch (error) {
    console.error('Failed to save mode:', error);
  }
}

export function loadMode(): CalculationMode {
  try {
    const stored = localStorage.getItem(MODE_KEY);
    return (stored as CalculationMode) || 'power_to_db';
  } catch (error) {
    return 'power_to_db';
  }
}

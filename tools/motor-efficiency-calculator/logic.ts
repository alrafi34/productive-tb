import { MotorEfficiencyInputs, MotorEfficiencyResult, HistoryEntry } from "./types";

// Calculate motor efficiency
export function calculateMotorEfficiency(inputs: MotorEfficiencyInputs): MotorEfficiencyResult {
  let { inputPower, outputPower, unit } = inputs;
  
  const steps: string[] = [];
  
  steps.push('Motor Efficiency Calculation');
  steps.push('');
  
  // Convert to watts if needed
  const originalUnit = unit === 'kilowatts' ? 'kW' : 'W';
  if (unit === 'kilowatts') {
    steps.push('Step 1: Convert to Watts');
    steps.push(`Input Power: ${inputPower} kW = ${inputPower * 1000} W`);
    steps.push(`Output Power: ${outputPower} kW = ${outputPower * 1000} W`);
    inputPower = inputPower * 1000;
    outputPower = outputPower * 1000;
    steps.push('');
  } else {
    steps.push('Given Values:');
    steps.push(`Input Power: ${inputPower} W`);
    steps.push(`Output Power: ${outputPower} W`);
    steps.push('');
  }
  
  // Calculate efficiency
  steps.push('Step 2: Calculate Efficiency');
  steps.push('Formula: Efficiency (%) = (Output Power / Input Power) × 100');
  steps.push(`Efficiency = (${outputPower} / ${inputPower}) × 100`);
  
  const efficiency = (outputPower / inputPower) * 100;
  
  steps.push(`Efficiency = ${formatNumber(efficiency, 2)}%`);
  steps.push('');
  
  // Calculate losses
  steps.push('Step 3: Calculate Power Losses');
  steps.push('Formula: Losses = Input Power - Output Power');
  steps.push(`Losses = ${inputPower} - ${outputPower}`);
  
  const losses = inputPower - outputPower;
  
  steps.push(`Losses = ${formatNumber(losses, 2)} W`);
  steps.push('');
  
  // Calculate loss percentage
  const lossesPercentage = (losses / inputPower) * 100;
  steps.push('Step 4: Calculate Loss Percentage');
  steps.push('Formula: Loss % = (Losses / Input Power) × 100');
  steps.push(`Loss % = (${formatNumber(losses, 2)} / ${inputPower}) × 100`);
  steps.push(`Loss % = ${formatNumber(lossesPercentage, 2)}%`);
  
  // Determine efficiency rating
  const efficiencyRating = getEfficiencyRating(efficiency);
  
  return {
    efficiency,
    losses,
    lossesPercentage,
    efficiencyRating,
    steps
  };
}

// Get efficiency rating
export function getEfficiencyRating(efficiency: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (efficiency >= 90) return 'excellent';
  if (efficiency >= 80) return 'good';
  if (efficiency >= 70) return 'fair';
  return 'poor';
}

// Get efficiency color
export function getEfficiencyColor(efficiency: number): string {
  if (efficiency >= 90) return 'green';
  if (efficiency >= 80) return 'blue';
  if (efficiency >= 70) return 'yellow';
  return 'red';
}

// Get efficiency message
export function getEfficiencyMessage(efficiency: number): string {
  if (efficiency >= 95) {
    return "Excellent efficiency! This motor is operating at premium efficiency levels.";
  } else if (efficiency >= 90) {
    return "Very good efficiency. This motor meets high-efficiency standards.";
  } else if (efficiency >= 85) {
    return "Good efficiency. This motor is operating within acceptable efficiency range.";
  } else if (efficiency >= 80) {
    return "Moderate efficiency. Consider maintenance or upgrade for better performance.";
  } else if (efficiency >= 70) {
    return "Fair efficiency. Motor may benefit from maintenance or replacement.";
  } else {
    return "Low efficiency. Motor requires immediate attention, maintenance, or replacement.";
  }
}

// Validate inputs
export function validateInputs(inputs: MotorEfficiencyInputs): string | null {
  const { inputPower, outputPower } = inputs;
  
  if (!inputPower || inputPower <= 0) {
    return "Input power must be greater than 0";
  }
  
  if (outputPower < 0) {
    return "Output power cannot be negative";
  }
  
  if (outputPower > inputPower) {
    return "Output power cannot exceed input power (efficiency cannot be > 100%)";
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

// History management
const HISTORY_KEY = 'motor-efficiency-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: MotorEfficiencyInputs, result: MotorEfficiencyResult): void {
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
export function exportToText(inputs: MotorEfficiencyInputs, result: MotorEfficiencyResult): string {
  const lines: string[] = [];
  
  lines.push('MOTOR EFFICIENCY CALCULATOR - REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('INPUT PARAMETERS:');
  lines.push('-'.repeat(50));
  lines.push(`Input Power: ${inputs.inputPower} ${inputs.unit === 'kilowatts' ? 'kW' : 'W'}`);
  lines.push(`Output Power: ${inputs.outputPower} ${inputs.unit === 'kilowatts' ? 'kW' : 'W'}`);
  lines.push('');
  lines.push('CALCULATED RESULTS:');
  lines.push('-'.repeat(50));
  lines.push(`Efficiency: ${formatNumber(result.efficiency, 2)}%`);
  lines.push(`Power Losses: ${formatNumber(result.losses, 2)} W`);
  lines.push(`Loss Percentage: ${formatNumber(result.lossesPercentage, 2)}%`);
  lines.push(`Efficiency Rating: ${result.efficiencyRating.toUpperCase()}`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Motor Efficiency Calculator');
  
  return lines.join('\n');
}

// Export to CSV
export function exportToCSV(inputs: MotorEfficiencyInputs, result: MotorEfficiencyResult): string {
  let csv = 'Motor Efficiency Calculation Report\n\n';
  csv += 'Parameter,Value\n';
  csv += `Input Power (${inputs.unit === 'kilowatts' ? 'kW' : 'W'}),${inputs.inputPower}\n`;
  csv += `Output Power (${inputs.unit === 'kilowatts' ? 'kW' : 'W'}),${inputs.outputPower}\n`;
  csv += `Efficiency (%),${formatNumber(result.efficiency, 2)}\n`;
  csv += `Power Losses (W),${formatNumber(result.losses, 2)}\n`;
  csv += `Loss Percentage (%),${formatNumber(result.lossesPercentage, 2)}\n`;
  csv += `Efficiency Rating,${result.efficiencyRating}\n`;
  
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
const SETTINGS_KEY = 'motor-efficiency-calculator-settings';

export function saveSettings(settings: Partial<MotorEfficiencyInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<MotorEfficiencyInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

// Convert units
export function wattsToKilowatts(watts: number): number {
  return watts / 1000;
}

export function kilowattsToWatts(kw: number): number {
  return kw * 1000;
}

import { VoltageDropInputs, VoltageDropResult, SystemType, WireMaterial, WireSize } from "./types";

// Resistance values in Ω/km at 20°C for copper
const COPPER_RESISTANCE: Record<WireSize, number> = {
  1.5: 12.1,
  2.5: 7.41,
  4: 4.61,
  6: 3.08,
  10: 1.83,
  16: 1.15,
  25: 0.727,
  35: 0.524,
  50: 0.387,
  70: 0.268,
  95: 0.193,
  120: 0.153
};

// Aluminum resistance is approximately 1.63 times copper
const ALUMINUM_MULTIPLIER = 1.63;

// Temperature coefficient for copper (per °C)
const TEMP_COEFFICIENT = 0.00393;

function getResistance(
  wireSize: WireSize, 
  material: WireMaterial, 
  temperature: number
): number {
  let resistance = COPPER_RESISTANCE[wireSize];
  
  if (material === 'aluminum') {
    resistance *= ALUMINUM_MULTIPLIER;
  }
  
  // Adjust for temperature (reference is 20°C)
  const tempDiff = temperature - 20;
  resistance = resistance * (1 + TEMP_COEFFICIENT * tempDiff);
  
  return resistance / 1000; // Convert from Ω/km to Ω/m
}

export function calculateVoltageDrop(inputs: VoltageDropInputs): VoltageDropResult {
  const { systemType, voltage, current, length, wireSize, material, temperature } = inputs;
  
  const steps: string[] = [];
  let formula: string;
  
  // Get resistance per meter
  const resistancePerMeter = getResistance(wireSize, material, temperature);
  const totalResistance = resistancePerMeter * length;
  
  steps.push('Voltage Drop Calculation');
  steps.push('');
  steps.push('Given Parameters:');
  steps.push(`System Type: ${systemType === 'single' ? 'Single Phase' : systemType === 'three' ? 'Three Phase' : 'DC'}`);
  steps.push(`Supply Voltage: ${voltage} V`);
  steps.push(`Current: ${current} A`);
  steps.push(`Cable Length: ${length} m`);
  steps.push(`Wire Size: ${wireSize} mm²`);
  steps.push(`Material: ${material === 'copper' ? 'Copper' : 'Aluminum'}`);
  steps.push(`Temperature: ${temperature}°C`);
  steps.push('');
  
  // Calculate voltage drop based on system type
  let voltageDrop: number;
  let multiplier: number;
  
  if (systemType === 'three') {
    multiplier = Math.sqrt(3);
    voltageDrop = multiplier * current * totalResistance;
    formula = 'VD = √3 × I × R × L';
    
    steps.push('Step 1: Calculate Resistance');
    steps.push(`Resistance per meter: ${(resistancePerMeter * 1000).toFixed(6)} Ω/km`);
    steps.push(`Total Resistance: ${resistancePerMeter.toFixed(6)} × ${length} = ${totalResistance.toFixed(6)} Ω`);
    steps.push('');
    steps.push('Step 2: Calculate Voltage Drop (Three Phase)');
    steps.push(`Formula: VD = √3 × I × R × L`);
    steps.push(`VD = ${multiplier.toFixed(4)} × ${current} × ${totalResistance.toFixed(6)}`);
    steps.push(`VD = ${voltageDrop.toFixed(4)} V`);
  } else {
    multiplier = 2;
    voltageDrop = multiplier * current * totalResistance;
    formula = systemType === 'dc' ? 'VD = 2 × I × R × L' : 'VD = 2 × I × R × L';
    
    steps.push('Step 1: Calculate Resistance');
    steps.push(`Resistance per meter: ${(resistancePerMeter * 1000).toFixed(6)} Ω/km`);
    steps.push(`Total Resistance: ${resistancePerMeter.toFixed(6)} × ${length} = ${totalResistance.toFixed(6)} Ω`);
    steps.push('');
    steps.push(`Step 2: Calculate Voltage Drop (${systemType === 'dc' ? 'DC' : 'Single Phase'})`);
    steps.push(`Formula: VD = 2 × I × R × L`);
    steps.push(`VD = 2 × ${current} × ${totalResistance.toFixed(6)}`);
    steps.push(`VD = ${voltageDrop.toFixed(4)} V`);
  }
  
  // Calculate percentage and final voltage
  const voltageDropPercentage = (voltageDrop / voltage) * 100;
  const finalVoltage = voltage - voltageDrop;
  
  // Calculate power loss
  const powerLoss = current * voltageDrop;
  
  steps.push('');
  steps.push('Step 3: Calculate Percentage Drop');
  steps.push(`Drop % = (VD / V) × 100`);
  steps.push(`Drop % = (${voltageDrop.toFixed(4)} / ${voltage}) × 100`);
  steps.push(`Drop % = ${voltageDropPercentage.toFixed(4)}%`);
  steps.push('');
  steps.push('Step 4: Calculate Final Voltage');
  steps.push(`Final Voltage = ${voltage} - ${voltageDrop.toFixed(4)}`);
  steps.push(`Final Voltage = ${finalVoltage.toFixed(4)} V`);
  steps.push('');
  steps.push('Step 5: Calculate Power Loss');
  steps.push(`Power Loss = I × VD`);
  steps.push(`Power Loss = ${current} × ${voltageDrop.toFixed(4)}`);
  steps.push(`Power Loss = ${powerLoss.toFixed(4)} W`);
  
  // Determine status
  let status: 'good' | 'acceptable' | 'poor';
  let statusMessage: string;
  let suggestion: string | undefined;
  
  if (voltageDropPercentage < 3) {
    status = 'good';
    statusMessage = 'Excellent - Within recommended limits';
  } else if (voltageDropPercentage < 5) {
    status = 'acceptable';
    statusMessage = 'Acceptable - Consider optimization';
    suggestion = 'Voltage drop is acceptable but could be improved by using a larger wire size for better efficiency.';
  } else {
    status = 'poor';
    statusMessage = 'Too High - Increase wire size';
    suggestion = getSuggestion(inputs, voltageDropPercentage);
  }
  
  return {
    voltageDrop,
    voltageDropPercentage,
    finalVoltage,
    powerLoss,
    resistance: totalResistance,
    status,
    statusMessage,
    suggestion,
    formula,
    steps
  };
}

function getSuggestion(inputs: VoltageDropInputs, currentDrop: number): string {
  const wireSizes: WireSize[] = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
  const currentIndex = wireSizes.indexOf(inputs.wireSize);
  
  if (currentIndex < wireSizes.length - 1) {
    const nextSize = wireSizes[currentIndex + 1];
    return `Voltage drop of ${currentDrop.toFixed(2)}% exceeds recommended limits. Consider using ${nextSize}mm² wire or larger to reduce voltage drop below 3%.`;
  }
  
  return `Voltage drop of ${currentDrop.toFixed(2)}% exceeds recommended limits. Consider reducing cable length, increasing voltage, or using multiple parallel cables.`;
}

export function validateInputs(inputs: VoltageDropInputs): string | null {
  const { voltage, current, length } = inputs;
  
  if (!voltage || voltage <= 0) {
    return "Voltage must be greater than 0";
  }
  
  if (!current || current <= 0) {
    return "Current must be greater than 0";
  }
  
  if (!length || length <= 0) {
    return "Cable length must be greater than 0";
  }
  
  if (isNaN(voltage) || isNaN(current) || isNaN(length)) {
    return "Please enter valid numbers";
  }
  
  return null;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getPresets() {
  return [
    {
      name: 'Home Lighting',
      description: '230V, 10A, 20m, 2.5mm²',
      systemType: 'single' as SystemType,
      voltage: 230,
      current: 10,
      length: 20,
      wireSize: 2.5 as WireSize,
      material: 'copper' as WireMaterial
    },
    {
      name: 'Power Outlet',
      description: '230V, 16A, 25m, 2.5mm²',
      systemType: 'single' as SystemType,
      voltage: 230,
      current: 16,
      length: 25,
      wireSize: 2.5 as WireSize,
      material: 'copper' as WireMaterial
    },
    {
      name: 'Air Conditioner',
      description: '230V, 20A, 30m, 4mm²',
      systemType: 'single' as SystemType,
      voltage: 230,
      current: 20,
      length: 30,
      wireSize: 4 as WireSize,
      material: 'copper' as WireMaterial
    },
    {
      name: 'Three Phase Motor',
      description: '400V, 25A, 50m, 6mm²',
      systemType: 'three' as SystemType,
      voltage: 400,
      current: 25,
      length: 50,
      wireSize: 6 as WireSize,
      material: 'copper' as WireMaterial
    },
    {
      name: 'Solar Panel (12V)',
      description: '12V DC, 20A, 10m, 6mm²',
      systemType: 'dc' as SystemType,
      voltage: 12,
      current: 20,
      length: 10,
      wireSize: 6 as WireSize,
      material: 'copper' as WireMaterial
    },
    {
      name: 'Solar Panel (24V)',
      description: '24V DC, 30A, 15m, 10mm²',
      systemType: 'dc' as SystemType,
      voltage: 24,
      current: 30,
      length: 15,
      wireSize: 10 as WireSize,
      material: 'copper' as WireMaterial
    }
  ];
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
  inputs: VoltageDropInputs;
  result: VoltageDropResult;
}

const HISTORY_KEY = 'voltage-drop-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: VoltageDropInputs, result: VoltageDropResult): void {
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

export function exportToText(inputs: VoltageDropInputs, result: VoltageDropResult): string {
  const lines: string[] = [];
  
  lines.push('VOLTAGE DROP CALCULATOR - CALCULATION REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('INPUT PARAMETERS:');
  lines.push('-'.repeat(50));
  lines.push(`System Type: ${inputs.systemType === 'single' ? 'Single Phase' : inputs.systemType === 'three' ? 'Three Phase' : 'DC'}`);
  lines.push(`Supply Voltage: ${inputs.voltage} V`);
  lines.push(`Current: ${inputs.current} A`);
  lines.push(`Cable Length: ${inputs.length} m`);
  lines.push(`Wire Size: ${inputs.wireSize} mm²`);
  lines.push(`Material: ${inputs.material === 'copper' ? 'Copper' : 'Aluminum'}`);
  lines.push(`Temperature: ${inputs.temperature}°C`);
  lines.push('');
  lines.push('CALCULATION RESULTS:');
  lines.push('-'.repeat(50));
  lines.push(`Voltage Drop: ${formatNumber(result.voltageDrop, 4)} V`);
  lines.push(`Voltage Drop %: ${formatNumber(result.voltageDropPercentage, 2)}%`);
  lines.push(`Final Voltage: ${formatNumber(result.finalVoltage, 2)} V`);
  lines.push(`Power Loss: ${formatNumber(result.powerLoss, 2)} W`);
  lines.push(`Total Resistance: ${formatNumber(result.resistance, 6)} Ω`);
  lines.push(`Status: ${result.statusMessage}`);
  
  if (result.suggestion) {
    lines.push('');
    lines.push('RECOMMENDATION:');
    lines.push('-'.repeat(50));
    lines.push(result.suggestion);
  }
  
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Voltage Drop Calculator');
  
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

export function getWireSizes(): WireSize[] {
  return [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
}

// Save last used settings
const SETTINGS_KEY = 'voltage-drop-calculator-settings';

export function saveSettings(settings: Partial<VoltageDropInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<VoltageDropInputs> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

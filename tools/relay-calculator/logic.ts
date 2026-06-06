import { RelayCalculatorInputs, RelayCalculatorResult, HistoryEntry } from "./types";

// Calculate relay parameters
export function calculateRelay(inputs: RelayCalculatorInputs): RelayCalculatorResult {
  const {
    supplyVoltage,
    coilResistance,
    mcuVoltage,
    transistorGain,
    baseEmitterVoltage,
    loadVoltage,
    loadCurrent,
    relayRatedVoltage,
    relayRatedCurrent
  } = inputs;

  const steps: string[] = [];
  
  steps.push('RELAY CALCULATOR - ANALYSIS');
  steps.push('');
  
  // Step 1: Calculate coil current
  steps.push('Step 1: Calculate Coil Current');
  steps.push(`Formula: I_coil = V_supply / R_coil`);
  steps.push(`I_coil = ${supplyVoltage}V / ${coilResistance}Ω`);
  
  const coilCurrent = (supplyVoltage / coilResistance) * 1000; // Convert to mA
  
  steps.push(`I_coil = ${formatNumber(coilCurrent, 2)} mA`);
  steps.push('');
  
  // Step 2: Calculate coil power
  steps.push('Step 2: Calculate Coil Power Consumption');
  steps.push(`Formula: P = V × I`);
  steps.push(`P = ${supplyVoltage}V × ${formatNumber(coilCurrent / 1000, 4)}A`);
  
  const coilPower = supplyVoltage * (coilCurrent / 1000);
  
  steps.push(`P = ${formatNumber(coilPower, 4)} W`);
  steps.push('');
  
  // Step 3: Check if transistor is needed
  const needsTransistor = mcuVoltage < supplyVoltage || coilCurrent > 20;
  
  steps.push('Step 3: Transistor Driver Analysis');
  if (needsTransistor) {
    steps.push(`MCU voltage (${mcuVoltage}V) < Supply voltage (${supplyVoltage}V) OR`);
    steps.push(`Coil current (${formatNumber(coilCurrent, 2)}mA) > 20mA`);
    steps.push('Result: TRANSISTOR DRIVER REQUIRED');
  } else {
    steps.push(`MCU voltage (${mcuVoltage}V) ≥ Supply voltage (${supplyVoltage}V) AND`);
    steps.push(`Coil current (${formatNumber(coilCurrent, 2)}mA) ≤ 20mA`);
    steps.push('Result: Direct drive possible (but transistor recommended)');
  }
  steps.push('');
  
  // Step 4: Calculate base resistor
  steps.push('Step 4: Calculate Transistor Base Resistor');
  steps.push(`Collector current (Ic) = Coil current = ${formatNumber(coilCurrent / 1000, 4)}A`);
  steps.push(`Base current (Ib) = Ic / hFE × 2 (safety factor)`);
  steps.push(`Ib = ${formatNumber(coilCurrent / 1000, 4)} / ${transistorGain} × 2`);
  
  const baseCurrent = ((coilCurrent / 1000) / transistorGain) * 2 * 1000; // in mA
  
  steps.push(`Ib = ${formatNumber(baseCurrent, 4)} mA`);
  steps.push('');
  steps.push(`Base resistor formula: Rb = (Vcc - Vbe) / Ib`);
  steps.push(`Rb = (${mcuVoltage}V - ${baseEmitterVoltage}V) / ${formatNumber(baseCurrent / 1000, 6)}A`);
  
  const baseResistor = (mcuVoltage - baseEmitterVoltage) / (baseCurrent / 1000);
  
  steps.push(`Rb = ${formatNumber(baseResistor, 2)} Ω`);
  
  const standardBaseResistor = findNearestStandardResistor(baseResistor);
  steps.push(`Standard resistor: ${standardBaseResistor} Ω (E24 series)`);
  steps.push('');
  
  // Step 5: Load safety check
  steps.push('Step 5: Load Safety Check');
  steps.push(`Load voltage: ${loadVoltage}V, Relay rated: ${relayRatedVoltage}V`);
  steps.push(`Load current: ${loadCurrent}A, Relay rated: ${relayRatedCurrent}A`);
  
  const voltageSafe = loadVoltage <= relayRatedVoltage;
  const currentSafe = loadCurrent <= relayRatedCurrent;
  const loadSafe = voltageSafe && currentSafe;
  
  if (voltageSafe) {
    steps.push(`✓ Voltage: SAFE (${loadVoltage}V ≤ ${relayRatedVoltage}V)`);
  } else {
    steps.push(`✗ Voltage: UNSAFE (${loadVoltage}V > ${relayRatedVoltage}V)`);
  }
  
  if (currentSafe) {
    steps.push(`✓ Current: SAFE (${loadCurrent}A ≤ ${relayRatedCurrent}A)`);
  } else {
    steps.push(`✗ Current: UNSAFE (${loadCurrent}A > ${relayRatedCurrent}A)`);
  }
  
  if (loadSafe) {
    steps.push('Overall: RELAY IS SAFE FOR THIS LOAD');
  } else {
    steps.push('Overall: RELAY IS NOT SAFE - USE HIGHER RATED RELAY');
  }

  return {
    coilCurrent,
    coilPower,
    baseResistor,
    standardBaseResistor,
    baseCurrent,
    needsTransistor,
    loadSafe,
    voltageSafe,
    currentSafe,
    steps
  };
}

// Find nearest standard resistor value (E24 series)
export function findNearestStandardResistor(value: number): number {
  const e24Series = [
    1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0,
    3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1
  ];
  
  // Determine the magnitude
  let magnitude = 1;
  let normalizedValue = value;
  
  while (normalizedValue >= 10) {
    normalizedValue /= 10;
    magnitude *= 10;
  }
  
  while (normalizedValue < 1) {
    normalizedValue *= 10;
    magnitude /= 10;
  }
  
  // Find closest value in E24 series
  let closest = e24Series[0];
  let minDiff = Math.abs(normalizedValue - closest);
  
  for (const standardValue of e24Series) {
    const diff = Math.abs(normalizedValue - standardValue);
    if (diff < minDiff) {
      minDiff = diff;
      closest = standardValue;
    }
  }
  
  return Math.round(closest * magnitude);
}

// Validate inputs
export function validateInputs(inputs: RelayCalculatorInputs): string | null {
  const {
    supplyVoltage,
    coilResistance,
    mcuVoltage,
    transistorGain,
    baseEmitterVoltage,
    loadVoltage,
    loadCurrent,
    relayRatedVoltage,
    relayRatedCurrent
  } = inputs;
  
  if (!supplyVoltage || supplyVoltage <= 0) {
    return "Supply voltage must be greater than 0";
  }
  
  if (!coilResistance || coilResistance <= 0) {
    return "Coil resistance must be greater than 0";
  }
  
  if (!mcuVoltage || mcuVoltage <= 0) {
    return "MCU voltage must be greater than 0";
  }
  
  if (!transistorGain || transistorGain <= 0) {
    return "Transistor gain must be greater than 0";
  }
  
  if (baseEmitterVoltage < 0 || baseEmitterVoltage >= mcuVoltage) {
    return "Base-emitter voltage must be between 0 and MCU voltage";
  }
  
  if (loadVoltage < 0) {
    return "Load voltage cannot be negative";
  }
  
  if (loadCurrent < 0) {
    return "Load current cannot be negative";
  }
  
  if (relayRatedVoltage <= 0) {
    return "Relay rated voltage must be greater than 0";
  }
  
  if (relayRatedCurrent <= 0) {
    return "Relay rated current must be greater than 0";
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

// Relay presets
export function getRelayPresets() {
  return [
    {
      name: "5V Relay (Arduino)",
      description: "Standard 5V relay with Arduino",
      supplyVoltage: 5,
      coilResistance: 70,
      mcuVoltage: 5,
      relayRatedVoltage: 250,
      relayRatedCurrent: 10
    },
    {
      name: "12V Relay (Automotive)",
      description: "12V automotive relay",
      supplyVoltage: 12,
      coilResistance: 120,
      mcuVoltage: 5,
      relayRatedVoltage: 30,
      relayRatedCurrent: 30
    },
    {
      name: "24V Relay (Industrial)",
      description: "24V industrial control relay",
      supplyVoltage: 24,
      coilResistance: 400,
      mcuVoltage: 3.3,
      relayRatedVoltage: 250,
      relayRatedCurrent: 16
    },
    {
      name: "3.3V MCU + 5V Relay",
      description: "ESP32/ESP8266 with 5V relay",
      supplyVoltage: 5,
      coilResistance: 70,
      mcuVoltage: 3.3,
      relayRatedVoltage: 250,
      relayRatedCurrent: 10
    },
    {
      name: "High Power Relay",
      description: "Heavy duty 12V relay",
      supplyVoltage: 12,
      coilResistance: 90,
      mcuVoltage: 5,
      relayRatedVoltage: 250,
      relayRatedCurrent: 30
    },
    {
      name: "Low Power Relay",
      description: "Small signal relay",
      supplyVoltage: 5,
      coilResistance: 125,
      mcuVoltage: 5,
      relayRatedVoltage: 125,
      relayRatedCurrent: 1
    }
  ];
}

// History management
const HISTORY_KEY = 'relay-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: RelayCalculatorInputs, result: RelayCalculatorResult): void {
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
export function exportToText(inputs: RelayCalculatorInputs, result: RelayCalculatorResult): string {
  const lines: string[] = [];
  
  lines.push('RELAY CALCULATOR - ANALYSIS REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('COIL PARAMETERS:');
  lines.push('-'.repeat(60));
  lines.push(`Supply Voltage: ${inputs.supplyVoltage} V`);
  lines.push(`Coil Resistance: ${inputs.coilResistance} Ω`);
  lines.push(`Coil Current: ${formatNumber(result.coilCurrent, 2)} mA`);
  lines.push(`Coil Power: ${formatNumber(result.coilPower, 4)} W`);
  lines.push('');
  lines.push('CONTROL CIRCUIT:');
  lines.push('-'.repeat(60));
  lines.push(`MCU Output Voltage: ${inputs.mcuVoltage} V`);
  lines.push(`Transistor Gain (hFE): ${inputs.transistorGain}`);
  lines.push(`Base-Emitter Voltage: ${inputs.baseEmitterVoltage} V`);
  lines.push(`Transistor Required: ${result.needsTransistor ? 'YES' : 'NO (but recommended)'}`);
  lines.push(`Base Resistor (calculated): ${formatNumber(result.baseResistor, 2)} Ω`);
  lines.push(`Base Resistor (standard): ${result.standardBaseResistor} Ω`);
  lines.push(`Base Current: ${formatNumber(result.baseCurrent, 4)} mA`);
  lines.push('');
  lines.push('LOAD PARAMETERS:');
  lines.push('-'.repeat(60));
  lines.push(`Load Voltage: ${inputs.loadVoltage} V`);
  lines.push(`Load Current: ${inputs.loadCurrent} A`);
  lines.push(`Relay Rated Voltage: ${inputs.relayRatedVoltage} V`);
  lines.push(`Relay Rated Current: ${inputs.relayRatedCurrent} A`);
  lines.push('');
  lines.push('SAFETY ANALYSIS:');
  lines.push('-'.repeat(60));
  lines.push(`Voltage Safety: ${result.voltageSafe ? '✓ SAFE' : '✗ UNSAFE'}`);
  lines.push(`Current Safety: ${result.currentSafe ? '✓ SAFE' : '✗ UNSAFE'}`);
  lines.push(`Overall Status: ${result.loadSafe ? '✓ RELAY IS SAFE' : '✗ RELAY NOT SAFE - USE HIGHER RATING'}`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(60));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(60));
  lines.push('Generated by Relay Calculator');
  
  return lines.join('\n');
}

// Export to CSV
export function exportToCSV(inputs: RelayCalculatorInputs, result: RelayCalculatorResult): string {
  let csv = 'Relay Calculator Analysis Report\n\n';
  csv += 'Parameter,Value,Unit\n';
  csv += `Supply Voltage,${inputs.supplyVoltage},V\n`;
  csv += `Coil Resistance,${inputs.coilResistance},Ω\n`;
  csv += `Coil Current,${formatNumber(result.coilCurrent, 2)},mA\n`;
  csv += `Coil Power,${formatNumber(result.coilPower, 4)},W\n`;
  csv += `MCU Voltage,${inputs.mcuVoltage},V\n`;
  csv += `Transistor Gain,${inputs.transistorGain},-\n`;
  csv += `Base-Emitter Voltage,${inputs.baseEmitterVoltage},V\n`;
  csv += `Base Resistor (calculated),${formatNumber(result.baseResistor, 2)},Ω\n`;
  csv += `Base Resistor (standard),${result.standardBaseResistor},Ω\n`;
  csv += `Base Current,${formatNumber(result.baseCurrent, 4)},mA\n`;
  csv += `Load Voltage,${inputs.loadVoltage},V\n`;
  csv += `Load Current,${inputs.loadCurrent},A\n`;
  csv += `Relay Rated Voltage,${inputs.relayRatedVoltage},V\n`;
  csv += `Relay Rated Current,${inputs.relayRatedCurrent},A\n`;
  csv += `Transistor Required,${result.needsTransistor ? 'YES' : 'NO'},-\n`;
  csv += `Voltage Safe,${result.voltageSafe ? 'YES' : 'NO'},-\n`;
  csv += `Current Safe,${result.currentSafe ? 'YES' : 'NO'},-\n`;
  csv += `Overall Safe,${result.loadSafe ? 'YES' : 'NO'},-\n`;
  
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
const SETTINGS_KEY = 'relay-calculator-settings';

export function saveSettings(settings: Partial<RelayCalculatorInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<RelayCalculatorInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

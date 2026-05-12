import {
  RegulationStatus,
  ZenerDiodeInputs,
  ZenerDiodeResult,
  ZenerPreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "zener-diode-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate Zener diode circuit parameters
 */
export function calculateZenerDiode(inputs: ZenerDiodeInputs): ZenerDiodeResult {
  const {
    inputVoltage,
    zenerVoltage,
    seriesResistor,
    loadResistance,
    loadCurrent: loadCurrentMA,
    zenerMinCurrent = 5,
    zenerMaxPower = 0.5
  } = inputs;
  
  const steps: string[] = [];
  const warnings: string[] = [];
  
  steps.push(`Given Values:`);
  steps.push(`Input Voltage (Vin) = ${inputVoltage} V`);
  steps.push(`Zener Voltage (Vz) = ${zenerVoltage} V`);
  steps.push(`Series Resistor (Rs) = ${seriesResistor} Ω`);
  if (loadResistance) {
    steps.push(`Load Resistance (RL) = ${loadResistance} Ω`);
  }
  if (loadCurrentMA) {
    steps.push(`Load Current (IL) = ${loadCurrentMA} mA`);
  }
  steps.push(`Zener Min Current = ${zenerMinCurrent} mA`);
  steps.push(`Zener Max Power = ${zenerMaxPower} W`);
  steps.push(``);
  
  // Step 1: Calculate total current through series resistor
  const voltageDrop = inputVoltage - zenerVoltage;
  const totalCurrentA = voltageDrop / seriesResistor;
  const totalCurrentMA = totalCurrentA * 1000;
  
  steps.push(`Step 1: Calculate Total Current Through Series Resistor`);
  steps.push(`Voltage Drop = Vin - Vz`);
  steps.push(`Voltage Drop = ${inputVoltage} - ${zenerVoltage}`);
  steps.push(`Voltage Drop = ${formatNumber(voltageDrop, 2)} V`);
  steps.push(``);
  steps.push(`Total Current (I_total) = Voltage Drop / Rs`);
  steps.push(`I_total = ${formatNumber(voltageDrop, 2)} / ${seriesResistor}`);
  steps.push(`I_total = ${formatNumber(totalCurrentA, 6)} A`);
  steps.push(`I_total = ${formatNumber(totalCurrentMA, 3)} mA`);
  steps.push(``);
  
  // Step 2: Calculate load current
  let loadCurrentA: number;
  let loadCurrentMACal: number;
  
  if (loadCurrentMA) {
    loadCurrentMACal = loadCurrentMA;
    loadCurrentA = loadCurrentMA / 1000;
    steps.push(`Step 2: Load Current (Given)`);
    steps.push(`Load Current (IL) = ${loadCurrentMA} mA`);
    steps.push(`IL = ${formatNumber(loadCurrentA, 6)} A`);
  } else if (loadResistance) {
    loadCurrentA = zenerVoltage / loadResistance;
    loadCurrentMACal = loadCurrentA * 1000;
    steps.push(`Step 2: Calculate Load Current`);
    steps.push(`Load Current (IL) = Vz / RL`);
    steps.push(`IL = ${zenerVoltage} / ${loadResistance}`);
    steps.push(`IL = ${formatNumber(loadCurrentA, 6)} A`);
    steps.push(`IL = ${formatNumber(loadCurrentMACal, 3)} mA`);
  } else {
    loadCurrentA = 0;
    loadCurrentMACal = 0;
    steps.push(`Step 2: No Load Connected`);
    steps.push(`Load Current (IL) = 0 mA`);
  }
  steps.push(``);
  
  // Step 3: Calculate Zener current
  const zenerCurrentA = totalCurrentA - loadCurrentA;
  const zenerCurrentMA = zenerCurrentA * 1000;
  
  steps.push(`Step 3: Calculate Zener Diode Current`);
  steps.push(`Zener Current (Iz) = I_total - IL`);
  steps.push(`Iz = ${formatNumber(totalCurrentA, 6)} - ${formatNumber(loadCurrentA, 6)}`);
  steps.push(`Iz = ${formatNumber(zenerCurrentA, 6)} A`);
  steps.push(`Iz = ${formatNumber(zenerCurrentMA, 3)} mA`);
  steps.push(``);
  
  // Step 4: Calculate Zener power dissipation
  const zenerPower = zenerVoltage * zenerCurrentA;
  
  steps.push(`Step 4: Calculate Zener Power Dissipation`);
  steps.push(`Zener Power (Pz) = Vz × Iz`);
  steps.push(`Pz = ${zenerVoltage} × ${formatNumber(zenerCurrentA, 6)}`);
  steps.push(`Pz = ${formatNumber(zenerPower, 4)} W`);
  steps.push(``);
  
  // Step 5: Calculate resistor power dissipation
  const resistorPower = voltageDrop * totalCurrentA;
  
  steps.push(`Step 5: Calculate Series Resistor Power Dissipation`);
  steps.push(`Resistor Power (Prs) = Voltage Drop × I_total`);
  steps.push(`Prs = ${formatNumber(voltageDrop, 2)} × ${formatNumber(totalCurrentA, 6)}`);
  steps.push(`Prs = ${formatNumber(resistorPower, 4)} W`);
  steps.push(``);
  
  // Step 6: Determine regulation status
  let regulationStatus: RegulationStatus = 'stable';
  
  steps.push(`Step 6: Check Regulation Status`);
  
  // Check if Zener is in breakdown region
  if (zenerCurrentMA < zenerMinCurrent) {
    regulationStatus = 'unstable';
    warnings.push(`Zener current (${formatNumber(zenerCurrentMA, 2)}mA) is below minimum (${zenerMinCurrent}mA). Regulation may be unstable.`);
    steps.push(`⚠️ Zener current is below minimum required for regulation`);
  } else {
    steps.push(`✓ Zener current is above minimum threshold`);
  }
  
  // Check power dissipation
  if (zenerPower > zenerMaxPower) {
    regulationStatus = 'warning';
    warnings.push(`Zener power (${formatNumber(zenerPower, 3)}W) exceeds maximum rating (${zenerMaxPower}W). Risk of damage!`);
    steps.push(`⚠️ Zener power exceeds maximum rating`);
  } else {
    steps.push(`✓ Zener power is within safe limits`);
  }
  
  // Check if Zener current is negative
  if (zenerCurrentMA < 0) {
    regulationStatus = 'unstable';
    warnings.push(`Negative Zener current indicates load is drawing more current than available. Regulation failed.`);
    steps.push(`⚠️ Negative Zener current - regulation not possible`);
  }
  
  if (regulationStatus === 'stable') {
    steps.push(`✓ Circuit is operating in stable regulation`);
  }
  
  return {
    totalCurrent: totalCurrentMA,
    loadCurrent: loadCurrentMACal,
    zenerCurrent: zenerCurrentMA,
    zenerPower,
    resistorPower,
    outputVoltage: zenerVoltage,
    regulationStatus,
    warnings,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: ZenerDiodeInputs): string | null {
  const { inputVoltage, zenerVoltage, seriesResistor } = inputs;
  
  if (isNaN(inputVoltage) || inputVoltage <= 0) {
    return 'Input voltage must be greater than 0';
  }
  
  if (isNaN(zenerVoltage) || zenerVoltage <= 0) {
    return 'Zener voltage must be greater than 0';
  }
  
  if (isNaN(seriesResistor) || seriesResistor <= 0) {
    return 'Series resistor must be greater than 0';
  }
  
  if (inputVoltage <= zenerVoltage) {
    return `Input voltage (${inputVoltage}V) must be greater than Zener voltage (${zenerVoltage}V)`;
  }
  
  // Warning for unrealistic values
  if (inputVoltage > 1000) {
    return 'Input voltage seems unrealistically high (>1000V)';
  }
  
  return null;
}

/**
 * Get Zener diode presets
 */
export function getZenerPresets(): ZenerPreset[] {
  return [
    {
      name: '5V Regulator',
      description: '12V to 5V regulation for logic circuits',
      inputVoltage: 12,
      zenerVoltage: 5.1,
      seriesResistor: 220,
      loadResistance: 1000
    },
    {
      name: '3.3V Regulator',
      description: '9V to 3.3V for microcontrollers',
      inputVoltage: 9,
      zenerVoltage: 3.3,
      seriesResistor: 330,
      loadResistance: 470
    },
    {
      name: '12V Regulator',
      description: '24V to 12V for automotive',
      inputVoltage: 24,
      zenerVoltage: 12,
      seriesResistor: 470,
      loadResistance: 2200
    },
    {
      name: '6V Regulator',
      description: '15V to 6V general purpose',
      inputVoltage: 15,
      zenerVoltage: 6.2,
      seriesResistor: 390,
      loadResistance: 1500
    }
  ];
}

/**
 * Get common Zener voltages
 */
export function getCommonZenerVoltages(): number[] {
  return [2.4, 3.3, 3.9, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 9.1, 10, 12, 15];
}

/**
 * Get common input voltages
 */
export function getCommonInputVoltages(): number[] {
  return [5, 9, 12, 15, 24];
}

/**
 * Format number with decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

/**
 * Get status color
 */
export function getStatusColor(status: RegulationStatus): string {
  switch (status) {
    case 'stable':
      return 'green';
    case 'warning':
      return 'yellow';
    case 'unstable':
      return 'red';
    default:
      return 'gray';
  }
}

/**
 * Get status label
 */
export function getStatusLabel(status: RegulationStatus): string {
  switch (status) {
    case 'stable':
      return 'Stable Regulation';
    case 'warning':
      return 'Warning - Check Power';
    case 'unstable':
      return 'Unstable - No Regulation';
    default:
      return 'Unknown';
  }
}

// History management
export function saveToHistory(inputs: ZenerDiodeInputs, result: ZenerDiodeResult): void {
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
export function exportToText(inputs: ZenerDiodeInputs, result: ZenerDiodeResult): string {
  const lines = [
    "ZENER DIODE VOLTAGE REGULATOR CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Input Voltage: ${inputs.inputVoltage} V`,
    `Zener Voltage: ${inputs.zenerVoltage} V`,
    `Series Resistor: ${inputs.seriesResistor} Ω`,
    inputs.loadResistance ? `Load Resistance: ${inputs.loadResistance} Ω` : '',
    inputs.loadCurrent ? `Load Current: ${inputs.loadCurrent} mA` : '',
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    `Total Current: ${formatNumber(result.totalCurrent, 3)} mA`,
    `Load Current: ${formatNumber(result.loadCurrent, 3)} mA`,
    `Zener Current: ${formatNumber(result.zenerCurrent, 3)} mA`,
    `Zener Power: ${formatNumber(result.zenerPower, 4)} W`,
    `Resistor Power: ${formatNumber(result.resistorPower, 4)} W`,
    `Output Voltage: ${formatNumber(result.outputVoltage, 2)} V`,
    `Regulation Status: ${getStatusLabel(result.regulationStatus)}`,
    "",
    result.warnings.length > 0 ? "WARNINGS:" : '',
    result.warnings.length > 0 ? "-".repeat(50) : '',
    ...result.warnings,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50)
  ].filter(line => line !== '');
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Zener Diode Calculator");
  
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

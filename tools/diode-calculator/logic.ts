import {
  DiodeType,
  CalculationMode,
  DiodeCalculatorInputs,
  DiodeCalculatorResult,
  DiodePreset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "diode-calculator-history";
const MAX_HISTORY = 10;

// Standard resistor values (E24 series)
const E24_SERIES = [
  10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30,
  33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91
];

/**
 * Get forward voltage for diode type
 */
export function getForwardVoltage(diodeType: DiodeType): number {
  switch (diodeType) {
    case 'silicon':
      return 0.7;
    case 'germanium':
      return 0.3;
    case 'schottky':
      return 0.3;
    case 'led':
      return 2.0;
    default:
      return 0.7;
  }
}

/**
 * Calculate diode circuit parameters
 */
export function calculateDiodeCircuit(inputs: DiodeCalculatorInputs): DiodeCalculatorResult {
  const { mode, supplyVoltage, forwardVoltage, resistance, desiredCurrent } = inputs;
  
  const steps: string[] = [];
  
  steps.push(`Calculation Mode: ${getModeLabel(mode)}`);
  steps.push(`Given Values:`);
  steps.push(`Supply Voltage (Vs) = ${supplyVoltage} V`);
  steps.push(`Diode Forward Voltage (Vf) = ${forwardVoltage} V`);
  
  if (mode === 'current' && resistance) {
    return calculateCurrent(supplyVoltage, forwardVoltage, resistance, steps);
  } else if (mode === 'resistor' && desiredCurrent) {
    return calculateResistor(supplyVoltage, forwardVoltage, desiredCurrent, steps);
  } else if (mode === 'voltage-drop') {
    return calculateVoltageDrop(supplyVoltage, forwardVoltage, steps);
  }
  
  throw new Error('Invalid calculation mode or missing parameters');
}

/**
 * Calculate current through diode
 */
function calculateCurrent(
  supplyVoltage: number,
  forwardVoltage: number,
  resistance: number,
  steps: string[]
): DiodeCalculatorResult {
  steps.push(`Resistor (R) = ${resistance} Ω`);
  steps.push(``);
  
  // Calculate voltage across resistor
  const voltageAcrossResistor = supplyVoltage - forwardVoltage;
  steps.push(`Step 1: Calculate Voltage Across Resistor`);
  steps.push(`Vr = Vs - Vf`);
  steps.push(`Vr = ${supplyVoltage} - ${forwardVoltage}`);
  steps.push(`Vr = ${formatNumber(voltageAcrossResistor, 2)} V`);
  steps.push(``);
  
  // Calculate current using Ohm's Law
  const currentA = voltageAcrossResistor / resistance;
  const currentMA = currentA * 1000;
  steps.push(`Step 2: Calculate Current (Ohm's Law)`);
  steps.push(`I = Vr / R`);
  steps.push(`I = ${formatNumber(voltageAcrossResistor, 2)} / ${resistance}`);
  steps.push(`I = ${formatNumber(currentA, 6)} A`);
  steps.push(`I = ${formatNumber(currentMA, 3)} mA`);
  steps.push(``);
  
  // Calculate power dissipation in resistor
  const power = currentA * currentA * resistance;
  steps.push(`Step 3: Calculate Power Dissipation in Resistor`);
  steps.push(`P = I² × R`);
  steps.push(`P = (${formatNumber(currentA, 6)})² × ${resistance}`);
  steps.push(`P = ${formatNumber(power, 4)} W`);
  
  const recommendedWattage = getRecommendedWattage(power);
  
  return {
    current: currentMA,
    voltageDrop: forwardVoltage,
    voltageAcrossResistor,
    power,
    recommendedWattage,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Calculate required resistor
 */
function calculateResistor(
  supplyVoltage: number,
  forwardVoltage: number,
  desiredCurrentMA: number,
  steps: string[]
): DiodeCalculatorResult {
  steps.push(`Desired Current (I) = ${desiredCurrentMA} mA`);
  steps.push(``);
  
  // Convert current to Amperes
  const currentA = desiredCurrentMA / 1000;
  steps.push(`Step 1: Convert Current to Amperes`);
  steps.push(`I = ${desiredCurrentMA} mA / 1000`);
  steps.push(`I = ${formatNumber(currentA, 6)} A`);
  steps.push(``);
  
  // Calculate voltage across resistor
  const voltageAcrossResistor = supplyVoltage - forwardVoltage;
  steps.push(`Step 2: Calculate Voltage Across Resistor`);
  steps.push(`Vr = Vs - Vf`);
  steps.push(`Vr = ${supplyVoltage} - ${forwardVoltage}`);
  steps.push(`Vr = ${formatNumber(voltageAcrossResistor, 2)} V`);
  steps.push(``);
  
  // Calculate resistance
  const resistance = voltageAcrossResistor / currentA;
  steps.push(`Step 3: Calculate Required Resistance`);
  steps.push(`R = Vr / I`);
  steps.push(`R = ${formatNumber(voltageAcrossResistor, 2)} / ${formatNumber(currentA, 6)}`);
  steps.push(`R = ${formatNumber(resistance, 2)} Ω`);
  steps.push(``);
  
  // Find standard resistor value
  const standardResistance = findNearestStandardResistor(resistance);
  steps.push(`Step 4: Find Nearest Standard Resistor`);
  steps.push(`Calculated: ${formatNumber(resistance, 2)} Ω`);
  steps.push(`Standard Value: ${standardResistance} Ω (E24 series)`);
  steps.push(``);
  
  // Calculate power dissipation
  const power = currentA * currentA * resistance;
  steps.push(`Step 5: Calculate Power Dissipation`);
  steps.push(`P = I² × R`);
  steps.push(`P = (${formatNumber(currentA, 6)})² × ${formatNumber(resistance, 2)}`);
  steps.push(`P = ${formatNumber(power, 4)} W`);
  
  const recommendedWattage = getRecommendedWattage(power);
  
  return {
    resistance,
    standardResistance,
    current: desiredCurrentMA,
    voltageDrop: forwardVoltage,
    voltageAcrossResistor,
    power,
    recommendedWattage,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Calculate voltage drop
 */
function calculateVoltageDrop(
  supplyVoltage: number,
  forwardVoltage: number,
  steps: string[]
): DiodeCalculatorResult {
  steps.push(``);
  
  steps.push(`Step 1: Diode Voltage Drop`);
  steps.push(`The diode forward voltage drop is approximately constant`);
  steps.push(`when the diode is forward-biased and conducting.`);
  steps.push(`Voltage Drop (Vf) = ${forwardVoltage} V`);
  steps.push(``);
  
  const voltageAcrossResistor = supplyVoltage - forwardVoltage;
  steps.push(`Step 2: Remaining Voltage`);
  steps.push(`Voltage available for other components:`);
  steps.push(`Vr = Vs - Vf`);
  steps.push(`Vr = ${supplyVoltage} - ${forwardVoltage}`);
  steps.push(`Vr = ${formatNumber(voltageAcrossResistor, 2)} V`);
  
  return {
    voltageDrop: forwardVoltage,
    voltageAcrossResistor,
    steps,
    timestamp: Date.now()
  };
}

/**
 * Find nearest standard resistor value
 */
export function findNearestStandardResistor(resistance: number): number {
  const magnitude = Math.pow(10, Math.floor(Math.log10(resistance)));
  const normalized = resistance / magnitude;
  
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
  const safetyFactor = 2;
  const requiredPower = power * safetyFactor;
  
  const standardWattages = [0.125, 0.25, 0.5, 1, 2, 5, 10];
  
  for (const wattage of standardWattages) {
    if (wattage >= requiredPower) {
      return wattage;
    }
  }
  
  return 10;
}

/**
 * Get mode label
 */
function getModeLabel(mode: CalculationMode): string {
  switch (mode) {
    case 'current':
      return 'Calculate Current';
    case 'resistor':
      return 'Calculate Resistor';
    case 'voltage-drop':
      return 'Voltage Drop Analysis';
    default:
      return 'Unknown';
  }
}

/**
 * Validate inputs
 */
export function validateInputs(inputs: DiodeCalculatorInputs): string | null {
  const { mode, supplyVoltage, forwardVoltage, resistance, desiredCurrent } = inputs;
  
  if (isNaN(supplyVoltage) || supplyVoltage <= 0) {
    return 'Supply voltage must be greater than 0';
  }
  
  if (isNaN(forwardVoltage) || forwardVoltage < 0) {
    return 'Forward voltage must be 0 or greater';
  }
  
  if (supplyVoltage <= forwardVoltage) {
    return `Supply voltage (${supplyVoltage}V) must be greater than forward voltage (${forwardVoltage}V)`;
  }
  
  if (mode === 'current') {
    if (!resistance || isNaN(resistance) || resistance <= 0) {
      return 'Resistance must be greater than 0';
    }
  }
  
  if (mode === 'resistor') {
    if (!desiredCurrent || isNaN(desiredCurrent) || desiredCurrent <= 0) {
      return 'Desired current must be greater than 0';
    }
  }
  
  // Warning for unrealistic values
  if (supplyVoltage > 1000) {
    return 'Supply voltage seems unrealistically high (>1000V)';
  }
  
  return null;
}

/**
 * Get diode presets
 */
export function getDiodePresets(): DiodePreset[] {
  return [
    {
      name: 'Silicon Diode',
      type: 'silicon',
      forwardVoltage: 0.7,
      description: 'Standard silicon diode (1N4001, 1N4007)'
    },
    {
      name: 'Germanium Diode',
      type: 'germanium',
      forwardVoltage: 0.3,
      description: 'Germanium diode (1N34A)'
    },
    {
      name: 'Schottky Diode',
      type: 'schottky',
      forwardVoltage: 0.3,
      description: 'Low voltage drop (1N5817, 1N5819)'
    },
    {
      name: 'Red LED',
      type: 'led',
      forwardVoltage: 2.0,
      description: 'Standard red LED'
    },
    {
      name: 'Blue/White LED',
      type: 'led',
      forwardVoltage: 3.2,
      description: 'Blue or white LED'
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

// History management
export function saveToHistory(inputs: DiodeCalculatorInputs, result: DiodeCalculatorResult): void {
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
export function exportToText(inputs: DiodeCalculatorInputs, result: DiodeCalculatorResult): string {
  const lines = [
    "DIODE CIRCUIT CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50),
    `Calculation Mode: ${getModeLabel(inputs.mode)}`,
    `Supply Voltage: ${inputs.supplyVoltage} V`,
    `Forward Voltage: ${inputs.forwardVoltage} V`,
    inputs.resistance ? `Resistance: ${inputs.resistance} Ω` : '',
    inputs.desiredCurrent ? `Desired Current: ${inputs.desiredCurrent} mA` : '',
    "",
    "CALCULATED RESULTS:",
    "-".repeat(50),
    result.current ? `Current: ${formatNumber(result.current, 3)} mA` : '',
    result.resistance ? `Required Resistance: ${formatNumber(result.resistance, 2)} Ω` : '',
    result.standardResistance ? `Standard Resistor: ${result.standardResistance} Ω` : '',
    `Voltage Drop (Diode): ${formatNumber(result.voltageDrop, 2)} V`,
    result.voltageAcrossResistor ? `Voltage Across Resistor: ${formatNumber(result.voltageAcrossResistor, 2)} V` : '',
    result.power ? `Power Dissipation: ${formatNumber(result.power, 4)} W` : '',
    result.recommendedWattage ? `Recommended Wattage: ${result.recommendedWattage} W` : '',
    "",
    "CALCULATION STEPS:",
    "-".repeat(50)
  ].filter(line => line !== '');
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Diode Calculator");
  
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

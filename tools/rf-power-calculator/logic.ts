import { RFPowerInputs, RFPowerResult, CalculationMode } from "./types";

// Convert Watts to dBm
export function wattsToDbm(watts: number): number {
  return 10 * Math.log10(watts * 1000);
}

// Convert dBm to Watts
export function dbmToWatts(dbm: number): number {
  return Math.pow(10, dbm / 10) / 1000;
}

// Convert Watts to dBW
export function wattsToDbw(watts: number): number {
  return 10 * Math.log10(watts);
}

// Convert dBW to Watts
export function dbwToWatts(dbw: number): number {
  return Math.pow(10, dbw / 10);
}

// Convert dBm to dBW
export function dbmToDbw(dbm: number): number {
  return dbm - 30;
}

// Convert dBW to dBm
export function dbwToDbm(dbw: number): number {
  return dbw + 30;
}

// Calculate power from voltage and resistance
export function voltageToPower(voltage: number, resistance: number): number {
  return (voltage * voltage) / resistance;
}

// Calculate voltage from power and resistance
export function powerToVoltage(power: number, resistance: number): number {
  return Math.sqrt(power * resistance);
}

// Format number with precision
export function formatNumber(value: number, decimals: number = 6): string {
  if (Math.abs(value) < 0.000001 || Math.abs(value) > 1000000) {
    return value.toExponential(decimals);
  }
  return value.toFixed(decimals);
}

// Debounce function
export function debounce(fn: () => void, delay: number) {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

// Validate inputs
export function validateInputs(inputs: RFPowerInputs): string | null {
  const { mode, watts, dbm, dbw, voltage, resistance } = inputs;

  if (mode === 'watts') {
    if (watts === undefined || watts === null) {
      return "Power in Watts is required";
    }
    if (watts < 0) {
      return "Power cannot be negative";
    }
  } else if (mode === 'dbm') {
    if (dbm === undefined || dbm === null) {
      return "Power in dBm is required";
    }
  } else if (mode === 'dbw') {
    if (dbw === undefined || dbw === null) {
      return "Power in dBW is required";
    }
  } else if (mode === 'voltage') {
    if (voltage === undefined || voltage === null) {
      return "Voltage is required";
    }
    if (voltage < 0) {
      return "Voltage cannot be negative";
    }
    if (resistance === undefined || resistance === null) {
      return "Resistance is required";
    }
    if (resistance <= 0) {
      return "Resistance must be greater than zero";
    }
  }

  return null;
}

// Calculate RF power
export function calculateRFPower(inputs: RFPowerInputs): RFPowerResult {
  const { mode, watts, dbm, dbw, voltage, resistance, precision = 6 } = inputs;

  let powerWatts: number;
  let inputVoltage: number | undefined;
  let inputResistance: number | undefined;

  // Calculate power in Watts based on input mode
  if (mode === 'watts') {
    powerWatts = watts!;
  } else if (mode === 'dbm') {
    powerWatts = dbmToWatts(dbm!);
  } else if (mode === 'dbw') {
    powerWatts = dbwToWatts(dbw!);
  } else {
    // voltage mode
    powerWatts = voltageToPower(voltage!, resistance!);
    inputVoltage = voltage;
    inputResistance = resistance;
  }

  // Calculate all power representations
  const powerDbm = wattsToDbm(powerWatts);
  const powerDbw = wattsToDbw(powerWatts);
  const powerMilliwatts = powerWatts * 1000;

  // Generate calculation steps
  const steps = generateSteps(mode, inputs, powerWatts, powerDbm, powerDbw, precision);

  // Determine formula
  let formula = "";
  switch (mode) {
    case 'watts':
      formula = "dBm = 10 × log₁₀(P × 1000)";
      break;
    case 'dbm':
      formula = "P(W) = 10^(dBm/10) / 1000";
      break;
    case 'dbw':
      formula = "P(W) = 10^(dBW/10)";
      break;
    case 'voltage':
      formula = "P = V² / R";
      break;
  }

  return {
    mode,
    watts: powerWatts,
    dbm: powerDbm,
    dbw: powerDbw,
    milliwatts: powerMilliwatts,
    voltage: inputVoltage,
    resistance: inputResistance,
    formula,
    steps,
  };
}

function generateSteps(
  mode: CalculationMode,
  inputs: RFPowerInputs,
  watts: number,
  dbm: number,
  dbw: number,
  precision: number
): string[] {
  const steps: string[] = [];

  if (mode === 'watts') {
    steps.push(
      "Calculate RF Power from Watts",
      "",
      `Given:`,
      `  Power = ${inputs.watts} W`,
      "",
      `Step 1: Convert to dBm`,
      `  Formula: dBm = 10 × log₁₀(P × 1000)`,
      `  dBm = 10 × log₁₀(${inputs.watts} × 1000)`,
      `  dBm = 10 × log₁₀(${inputs.watts! * 1000})`,
      `  dBm = ${formatNumber(dbm, precision)}`,
      "",
      `Step 2: Convert to dBW`,
      `  Formula: dBW = 10 × log₁₀(P)`,
      `  dBW = 10 × log₁₀(${inputs.watts})`,
      `  dBW = ${formatNumber(dbw, precision)}`,
      "",
      `Step 3: Convert to milliwatts`,
      `  mW = ${inputs.watts} × 1000 = ${formatNumber(watts * 1000, precision)} mW`
    );
  } else if (mode === 'dbm') {
    steps.push(
      "Calculate RF Power from dBm",
      "",
      `Given:`,
      `  Power = ${inputs.dbm} dBm`,
      "",
      `Step 1: Convert to Watts`,
      `  Formula: P(W) = 10^(dBm/10) / 1000`,
      `  P(W) = 10^(${inputs.dbm}/10) / 1000`,
      `  P(W) = 10^(${inputs.dbm! / 10}) / 1000`,
      `  P(W) = ${formatNumber(watts, precision)} W`,
      "",
      `Step 2: Convert to dBW`,
      `  Formula: dBW = dBm - 30`,
      `  dBW = ${inputs.dbm} - 30`,
      `  dBW = ${formatNumber(dbw, precision)}`,
      "",
      `Step 3: Convert to milliwatts`,
      `  mW = ${formatNumber(watts, precision)} × 1000 = ${formatNumber(watts * 1000, precision)} mW`
    );
  } else if (mode === 'dbw') {
    steps.push(
      "Calculate RF Power from dBW",
      "",
      `Given:`,
      `  Power = ${inputs.dbw} dBW`,
      "",
      `Step 1: Convert to Watts`,
      `  Formula: P(W) = 10^(dBW/10)`,
      `  P(W) = 10^(${inputs.dbw}/10)`,
      `  P(W) = 10^(${inputs.dbw! / 10})`,
      `  P(W) = ${formatNumber(watts, precision)} W`,
      "",
      `Step 2: Convert to dBm`,
      `  Formula: dBm = dBW + 30`,
      `  dBm = ${inputs.dbw} + 30`,
      `  dBm = ${formatNumber(dbm, precision)}`,
      "",
      `Step 3: Convert to milliwatts`,
      `  mW = ${formatNumber(watts, precision)} × 1000 = ${formatNumber(watts * 1000, precision)} mW`
    );
  } else {
    steps.push(
      "Calculate RF Power from Voltage and Resistance",
      "",
      `Given:`,
      `  Voltage (V) = ${inputs.voltage} V`,
      `  Resistance (R) = ${inputs.resistance} Ω`,
      "",
      `Step 1: Calculate Power`,
      `  Formula: P = V² / R`,
      `  P = (${inputs.voltage})² / ${inputs.resistance}`,
      `  P = ${inputs.voltage! * inputs.voltage!} / ${inputs.resistance}`,
      `  P = ${formatNumber(watts, precision)} W`,
      "",
      `Step 2: Convert to dBm`,
      `  Formula: dBm = 10 × log₁₀(P × 1000)`,
      `  dBm = 10 × log₁₀(${formatNumber(watts, precision)} × 1000)`,
      `  dBm = ${formatNumber(dbm, precision)}`,
      "",
      `Step 3: Convert to dBW`,
      `  Formula: dBW = 10 × log₁₀(P)`,
      `  dBW = 10 × log₁₀(${formatNumber(watts, precision)})`,
      `  dBW = ${formatNumber(dbw, precision)}`
    );
  }

  return steps;
}

// Get common power presets
export function getPresets(mode: CalculationMode) {
  if (mode === 'watts') {
    return [
      { name: "1 mW", description: "Typical low power", watts: 0.001 },
      { name: "10 mW", description: "Bluetooth", watts: 0.01 },
      { name: "100 mW", description: "WiFi router", watts: 0.1 },
      { name: "1 W", description: "Mobile phone", watts: 1 },
      { name: "10 W", description: "Amateur radio", watts: 10 },
      { name: "100 W", description: "FM transmitter", watts: 100 },
    ];
  } else if (mode === 'dbm') {
    return [
      { name: "0 dBm", description: "1 mW reference", dbm: 0 },
      { name: "10 dBm", description: "10 mW", dbm: 10 },
      { name: "20 dBm", description: "100 mW", dbm: 20 },
      { name: "30 dBm", description: "1 W", dbm: 30 },
      { name: "40 dBm", description: "10 W", dbm: 40 },
      { name: "50 dBm", description: "100 W", dbm: 50 },
    ];
  } else if (mode === 'dbw') {
    return [
      { name: "-30 dBW", description: "1 mW", dbw: -30 },
      { name: "-20 dBW", description: "10 mW", dbw: -20 },
      { name: "-10 dBW", description: "100 mW", dbw: -10 },
      { name: "0 dBW", description: "1 W", dbw: 0 },
      { name: "10 dBW", description: "10 W", dbw: 10 },
      { name: "20 dBW", description: "100 W", dbw: 20 },
    ];
  } else {
    return [
      { name: "5V @ 50Ω", description: "Standard impedance", voltage: 5, resistance: 50 },
      { name: "10V @ 50Ω", description: "Higher voltage", voltage: 10, resistance: 50 },
      { name: "1V @ 75Ω", description: "Cable TV", voltage: 1, resistance: 75 },
      { name: "3.3V @ 50Ω", description: "Logic level", voltage: 3.3, resistance: 50 },
    ];
  }
}

// History management
const HISTORY_KEY = 'rf-power-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: RFPowerInputs;
  result: RFPowerResult;
}

export function saveToHistory(inputs: RFPowerInputs, result: RFPowerResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    if (history.length > MAX_HISTORY) {
      history.pop();
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

// Export to text
export function exportToText(inputs: RFPowerInputs, result: RFPowerResult): string {
  const modeLabels = {
    'watts': 'Watts Input',
    'dbm': 'dBm Input',
    'dbw': 'dBW Input',
    'voltage': 'Voltage & Resistance Input',
  };

  const lines = [
    "RF Power Calculator - Calculation Report",
    "=".repeat(50),
    "",
    `Mode: ${modeLabels[result.mode]}`,
    `Date: ${new Date().toLocaleString()}`,
    "",
    "RESULTS:",
    "-".repeat(50),
    `Power (Watts): ${formatNumber(result.watts, inputs.precision || 6)} W`,
    `Power (dBm): ${formatNumber(result.dbm, inputs.precision || 6)} dBm`,
    `Power (dBW): ${formatNumber(result.dbw, inputs.precision || 6)} dBW`,
    `Power (mW): ${formatNumber(result.milliwatts, inputs.precision || 6)} mW`,
  ];

  if (result.voltage !== undefined && result.resistance !== undefined) {
    lines.push(`Voltage: ${result.voltage} V`);
    lines.push(`Resistance: ${result.resistance} Ω`);
  }

  lines.push(
    `Formula: ${result.formula}`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50),
    ...result.steps,
    "",
    "=".repeat(50),
    "Generated by RF Power Calculator",
  );

  return lines.join("\n");
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

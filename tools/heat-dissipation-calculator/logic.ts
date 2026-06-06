import { HeatInputs, HeatResult, CalculationMode } from "./types";

export function formatNumber(value: number, decimals: number = 2): string {
  if (Math.abs(value) < 0.000001 || Math.abs(value) > 1000000) {
    return value.toExponential(decimals);
  }
  return value.toFixed(decimals);
}

export function debounce(fn: () => void, delay: number) {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

export function validateInputs(inputs: HeatInputs): string | null {
  const { mode, voltage, current, resistance, power } = inputs;

  if (mode === 'voltage-current') {
    if (voltage === undefined || voltage === null || voltage < 0) {
      return "Voltage must be a positive number";
    }
    if (current === undefined || current === null || current < 0) {
      return "Current must be a positive number";
    }
  } else if (mode === 'voltage-resistance') {
    if (voltage === undefined || voltage === null || voltage < 0) {
      return "Voltage must be a positive number";
    }
    if (resistance === undefined || resistance === null || resistance <= 0) {
      return "Resistance must be a positive number";
    }
  } else if (mode === 'current-resistance') {
    if (current === undefined || current === null || current < 0) {
      return "Current must be a positive number";
    }
    if (resistance === undefined || resistance === null || resistance <= 0) {
      return "Resistance must be a positive number";
    }
  } else if (mode === 'power-direct') {
    if (power === undefined || power === null || power < 0) {
      return "Power must be a positive number";
    }
  }

  return null;
}

function getHeatLevel(heatDissipation: number): 'low' | 'medium' | 'high' | 'critical' {
  if (heatDissipation < 10) return 'low';
  if (heatDissipation < 100) return 'medium';
  if (heatDissipation < 500) return 'high';
  return 'critical';
}

function getWarning(heatLevel: 'low' | 'medium' | 'high' | 'critical'): string | undefined {
  switch (heatLevel) {
    case 'critical':
      return '⚠️ CRITICAL: Very high heat generation. Ensure adequate cooling and thermal management.';
    case 'high':
      return '⚠️ HIGH HEAT: Significant heat generation. Consider heat sinks or cooling solutions.';
    case 'medium':
      return 'ℹ️ MEDIUM HEAT: Moderate heat generation. Monitor temperature in enclosed systems.';
    case 'low':
      return 'ℹ️ LOW HEAT: Minimal heat generation. Standard operation conditions.';
    default:
      return undefined;
  }
}

export function calculateHeatDissipation(inputs: HeatInputs): HeatResult {
  const { mode, voltage, current, resistance, power, precision = 2 } = inputs;

  let heatDissipation: number;
  let formula: string;
  let calculatedVoltage = voltage;
  let calculatedCurrent = current;
  let calculatedResistance = resistance;
  let calculatedPower = power;

  if (mode === 'voltage-current') {
    heatDissipation = voltage! * current!;
    formula = "P = V × I";
    calculatedPower = heatDissipation;
  } else if (mode === 'voltage-resistance') {
    heatDissipation = (voltage! * voltage!) / resistance!;
    formula = "P = V² / R";
    calculatedPower = heatDissipation;
    calculatedCurrent = voltage! / resistance!;
  } else if (mode === 'current-resistance') {
    heatDissipation = current! * current! * resistance!;
    formula = "P = I² × R";
    calculatedPower = heatDissipation;
    calculatedVoltage = current! * resistance!;
  } else {
    heatDissipation = power!;
    formula = "P = Power Input";
  }

  const heatLevel = getHeatLevel(heatDissipation);
  const warning = getWarning(heatLevel);
  const steps = generateSteps(inputs, heatDissipation, calculatedVoltage, calculatedCurrent, calculatedResistance, precision);

  return {
    mode,
    heatDissipation,
    voltage: calculatedVoltage,
    current: calculatedCurrent,
    resistance: calculatedResistance,
    power: calculatedPower,
    formula,
    heatLevel,
    warning,
    steps,
  };
}

function generateSteps(
  inputs: HeatInputs,
  heatDissipation: number,
  voltage?: number,
  current?: number,
  resistance?: number,
  precision: number = 2
): string[] {
  const steps: string[] = [];
  const { mode } = inputs;

  steps.push("Heat Dissipation Calculation", "");

  if (mode === 'voltage-current') {
    steps.push(
      "Given:",
      `  Voltage (V) = ${voltage} V`,
      `  Current (I) = ${current} A`,
      "",
      "Step 1: Calculate Heat Dissipation using P = V × I",
      `  Formula: P = V × I`,
      `  P = ${voltage} × ${current}`,
      `  P = ${formatNumber(heatDissipation, precision)} W`,
      ""
    );
  } else if (mode === 'voltage-resistance') {
    steps.push(
      "Given:",
      `  Voltage (V) = ${inputs.voltage} V`,
      `  Resistance (R) = ${inputs.resistance} Ω`,
      "",
      "Step 1: Calculate Heat Dissipation using P = V² / R",
      `  Formula: P = V² / R`,
      `  P = (${inputs.voltage})² / ${inputs.resistance}`,
      `  P = ${inputs.voltage! * inputs.voltage!} / ${inputs.resistance}`,
      `  P = ${formatNumber(heatDissipation, precision)} W`,
      "",
      "Step 2: Calculate Current",
      `  Formula: I = V / R`,
      `  I = ${inputs.voltage} / ${inputs.resistance}`,
      `  I = ${formatNumber(current!, precision)} A`,
      ""
    );
  } else if (mode === 'current-resistance') {
    steps.push(
      "Given:",
      `  Current (I) = ${inputs.current} A`,
      `  Resistance (R) = ${inputs.resistance} Ω`,
      "",
      "Step 1: Calculate Heat Dissipation using P = I² × R",
      `  Formula: P = I² × R`,
      `  P = (${inputs.current})² × ${inputs.resistance}`,
      `  P = ${inputs.current! * inputs.current!} × ${inputs.resistance}`,
      `  P = ${formatNumber(heatDissipation, precision)} W`,
      "",
      "Step 2: Calculate Voltage",
      `  Formula: V = I × R`,
      `  V = ${inputs.current} × ${inputs.resistance}`,
      `  V = ${formatNumber(voltage!, precision)} V`,
      ""
    );
  } else {
    steps.push(
      "Given:",
      `  Power (P) = ${inputs.power} W`,
      "",
      "Heat Dissipation = Power Input",
      `  Heat Dissipation = ${formatNumber(heatDissipation, precision)} W`,
      ""
    );
  }

  return steps.filter(step => step !== "");
}

export function getPresets(mode: CalculationMode) {
  if (mode === 'voltage-current') {
    return [
      { name: "12V DC System", description: "12V, 2A", voltage: 12, current: 2 },
      { name: "24V DC System", description: "24V, 1A", voltage: 24, current: 1 },
      { name: "120V AC Circuit", description: "120V, 1A", voltage: 120, current: 1 },
      { name: "230V AC Circuit", description: "230V, 1A", voltage: 230, current: 1 },
    ];
  } else if (mode === 'voltage-resistance') {
    return [
      { name: "12V Resistor", description: "12V, 10Ω", voltage: 12, resistance: 10 },
      { name: "230V Heater", description: "230V, 100Ω", voltage: 230, resistance: 100 },
      { name: "5V Logic", description: "5V, 1kΩ", voltage: 5, resistance: 1000 },
      { name: "24V Industrial", description: "24V, 50Ω", voltage: 24, resistance: 50 },
    ];
  } else if (mode === 'current-resistance') {
    return [
      { name: "Low Current Wire", description: "1A, 10Ω", current: 1, resistance: 10 },
      { name: "Medium Current", description: "5A, 2Ω", current: 5, resistance: 2 },
      { name: "High Current", description: "10A, 1Ω", current: 10, resistance: 1 },
      { name: "Power Line", description: "50A, 0.1Ω", current: 50, resistance: 0.1 },
    ];
  } else {
    return [
      { name: "LED Light", description: "5W", power: 5 },
      { name: "Incandescent Bulb", description: "60W", power: 60 },
      { name: "Small Motor", description: "500W", power: 500 },
      { name: "Heater Element", description: "1500W", power: 1500 },
    ];
  }
}

const HISTORY_KEY = 'heat-dissipation-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: HeatInputs;
  result: HeatResult;
}

export function saveToHistory(inputs: HeatInputs, result: HeatResult): void {
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

export function exportToText(inputs: HeatInputs, result: HeatResult): string {
  const modeLabels = {
    'voltage-current': 'Voltage & Current (V×I)',
    'voltage-resistance': 'Voltage & Resistance (V²/R)',
    'current-resistance': 'Current & Resistance (I²×R)',
    'power-direct': 'Direct Power Input',
  };

  const lines = [
    "Heat Dissipation Calculator - Calculation Report",
    "=".repeat(60),
    "",
    `Mode: ${modeLabels[result.mode]}`,
    `Date: ${new Date().toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(60),
  ];

  if (result.voltage !== undefined) {
    lines.push(`Voltage: ${result.voltage} V`);
  }
  if (result.current !== undefined) {
    lines.push(`Current: ${result.current} A`);
  }
  if (result.resistance !== undefined) {
    lines.push(`Resistance: ${result.resistance} Ω`);
  }
  if (result.power !== undefined && inputs.mode === 'power-direct') {
    lines.push(`Power: ${result.power} W`);
  }

  lines.push(
    "",
    "RESULTS:",
    "-".repeat(60),
    `Heat Dissipation: ${formatNumber(result.heatDissipation, inputs.precision)} W`,
    `Formula: ${result.formula}`,
    `Heat Level: ${result.heatLevel.toUpperCase()}`
  );

  if (result.warning) {
    lines.push(
      "",
      "WARNING:",
      "-".repeat(60),
      result.warning
    );
  }

  lines.push(
    "",
    "CALCULATION STEPS:",
    "-".repeat(60)
  );

  lines.push(...result.steps);

  lines.push(
    "",
    "=".repeat(60),
    "Generated by Heat Dissipation Calculator"
  );

  return lines.join("\n");
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
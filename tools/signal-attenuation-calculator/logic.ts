import {
  CalculationMode,
  PowerInputs,
  VoltageInputs,
  DistanceInputs,
  AttenuationResult,
  HistoryEntry,
  PowerUnit,
  VoltageUnit,
} from "./types";

const HISTORY_KEY = "signal-attenuation-calculator-history";
const MAX_HISTORY = 20;

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Format number with specified decimal places
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Convert power to watts
function convertToWatts(value: number, unit: PowerUnit): number {
  switch (unit) {
    case 'W':
      return value;
    case 'mW':
      return value / 1000;
    case 'dBm':
      return Math.pow(10, value / 10) / 1000;
    default:
      return value;
  }
}

// Convert voltage to volts
function convertToVolts(value: number, unit: VoltageUnit): number {
  switch (unit) {
    case 'V':
      return value;
    case 'mV':
      return value / 1000;
    default:
      return value;
  }
}

// Calculate power-based attenuation
export function calculatePowerAttenuation(inputs: PowerInputs): AttenuationResult {
  const p1 = convertToWatts(inputs.inputPower, inputs.inputUnit);
  const p2 = convertToWatts(inputs.outputPower, inputs.outputUnit);

  if (p1 <= 0 || p2 <= 0) {
    throw new Error("Power values must be positive");
  }

  const attenuation = 10 * Math.log10(p1 / p2);
  const isGain = attenuation < 0;
  const signalLossPercentage = ((p1 - p2) / p1) * 100;

  const steps = [
    "Power-Based Attenuation Formula:",
    "Attenuation (dB) = 10 × log₁₀(P₁ / P₂)",
    "",
    "Given:",
    `P₁ (Input Power) = ${inputs.inputPower} ${inputs.inputUnit} = ${formatNumber(p1, 6)} W`,
    `P₂ (Output Power) = ${inputs.outputPower} ${inputs.outputUnit} = ${formatNumber(p2, 6)} W`,
    "",
    "Calculation:",
    `Attenuation = 10 × log₁₀(${formatNumber(p1, 6)} / ${formatNumber(p2, 6)})`,
    `Attenuation = 10 × log₁₀(${formatNumber(p1 / p2, 6)})`,
    `Attenuation = 10 × ${formatNumber(Math.log10(p1 / p2), 6)}`,
    `Attenuation = ${formatNumber(attenuation, 4)} dB`,
    "",
    `Signal Loss = ${formatNumber(signalLossPercentage, 2)}%`,
  ];

  return {
    attenuation: Math.abs(attenuation),
    isGain,
    signalLossPercentage,
    formula: "Attenuation (dB) = 10 × log₁₀(P₁ / P₂)",
    steps,
    mode: 'power',
    inputDisplay: `${inputs.inputPower} ${inputs.inputUnit}`,
    outputDisplay: `${inputs.outputPower} ${inputs.outputUnit}`,
  };
}

// Calculate voltage-based attenuation
export function calculateVoltageAttenuation(inputs: VoltageInputs): AttenuationResult {
  const v1 = convertToVolts(inputs.inputVoltage, inputs.inputUnit);
  const v2 = convertToVolts(inputs.outputVoltage, inputs.outputUnit);

  if (v1 <= 0 || v2 <= 0) {
    throw new Error("Voltage values must be positive");
  }

  const attenuation = 20 * Math.log10(v1 / v2);
  const isGain = attenuation < 0;
  const signalLossPercentage = ((v1 - v2) / v1) * 100;

  const steps = [
    "Voltage-Based Attenuation Formula:",
    "Attenuation (dB) = 20 × log₁₀(V₁ / V₂)",
    "",
    "Given:",
    `V₁ (Input Voltage) = ${inputs.inputVoltage} ${inputs.inputUnit} = ${formatNumber(v1, 6)} V`,
    `V₂ (Output Voltage) = ${inputs.outputVoltage} ${inputs.outputUnit} = ${formatNumber(v2, 6)} V`,
    "",
    "Calculation:",
    `Attenuation = 20 × log₁₀(${formatNumber(v1, 6)} / ${formatNumber(v2, 6)})`,
    `Attenuation = 20 × log₁₀(${formatNumber(v1 / v2, 6)})`,
    `Attenuation = 20 × ${formatNumber(Math.log10(v1 / v2), 6)}`,
    `Attenuation = ${formatNumber(attenuation, 4)} dB`,
    "",
    `Signal Loss = ${formatNumber(signalLossPercentage, 2)}%`,
  ];

  return {
    attenuation: Math.abs(attenuation),
    isGain,
    signalLossPercentage,
    formula: "Attenuation (dB) = 20 × log₁₀(V₁ / V₂)",
    steps,
    mode: 'voltage',
    inputDisplay: `${inputs.inputVoltage} ${inputs.inputUnit}`,
    outputDisplay: `${inputs.outputVoltage} ${inputs.outputUnit}`,
  };
}

// Calculate distance-based attenuation
export function calculateDistanceLoss(inputs: DistanceInputs): AttenuationResult {
  if (inputs.lossPerUnit < 0 || inputs.distance < 0) {
    throw new Error("Loss per unit and distance must be positive");
  }

  const totalLoss = inputs.lossPerUnit * inputs.distance;

  const steps = [
    "Distance-Based Attenuation Formula:",
    "Total Loss (dB) = Loss per unit × Distance",
    "",
    "Given:",
    `Loss per unit = ${inputs.lossPerUnit} dB/${inputs.distanceUnit}`,
    `Distance = ${inputs.distance} ${inputs.distanceUnit}`,
    "",
    "Calculation:",
    `Total Loss = ${inputs.lossPerUnit} × ${inputs.distance}`,
    `Total Loss = ${formatNumber(totalLoss, 4)} dB`,
  ];

  return {
    attenuation: totalLoss,
    isGain: false,
    signalLossPercentage: 0,
    formula: "Total Loss (dB) = Loss per unit × Distance",
    steps,
    mode: 'distance',
    inputDisplay: `${inputs.lossPerUnit} dB/${inputs.distanceUnit}`,
    outputDisplay: `${inputs.distance} ${inputs.distanceUnit}`,
  };
}

// Validation functions
export function validatePowerInputs(inputs: PowerInputs): string | null {
  if (inputs.inputPower <= 0) return "Input power must be positive";
  if (inputs.outputPower <= 0) return "Output power must be positive";
  if (isNaN(inputs.inputPower)) return "Input power must be a valid number";
  if (isNaN(inputs.outputPower)) return "Output power must be a valid number";
  return null;
}

export function validateVoltageInputs(inputs: VoltageInputs): string | null {
  if (inputs.inputVoltage <= 0) return "Input voltage must be positive";
  if (inputs.outputVoltage <= 0) return "Output voltage must be positive";
  if (isNaN(inputs.inputVoltage)) return "Input voltage must be a valid number";
  if (isNaN(inputs.outputVoltage)) return "Output voltage must be a valid number";
  return null;
}

export function validateDistanceInputs(inputs: DistanceInputs): string | null {
  if (inputs.lossPerUnit < 0) return "Loss per unit must be positive or zero";
  if (inputs.distance < 0) return "Distance must be positive or zero";
  if (isNaN(inputs.lossPerUnit)) return "Loss per unit must be a valid number";
  if (isNaN(inputs.distance)) return "Distance must be a valid number";
  return null;
}

// Presets
export function getPowerPresets() {
  return [
    {
      name: "3 dB Loss (Half Power)",
      description: "Common reference point",
      inputPower: 100,
      outputPower: 50,
      inputUnit: 'W' as PowerUnit,
      outputUnit: 'W' as PowerUnit,
    },
    {
      name: "6 dB Loss (Quarter Power)",
      description: "Significant attenuation",
      inputPower: 100,
      outputPower: 25,
      inputUnit: 'W' as PowerUnit,
      outputUnit: 'W' as PowerUnit,
    },
    {
      name: "10 dB Loss",
      description: "One-tenth power",
      inputPower: 100,
      outputPower: 10,
      inputUnit: 'W' as PowerUnit,
      outputUnit: 'W' as PowerUnit,
    },
    {
      name: "RF Signal (mW)",
      description: "Typical RF scenario",
      inputPower: 100,
      outputPower: 50,
      inputUnit: 'mW' as PowerUnit,
      outputUnit: 'mW' as PowerUnit,
    },
  ];
}

export function getVoltagePresets() {
  return [
    {
      name: "6 dB Loss (Half Voltage)",
      description: "Common voltage drop",
      inputVoltage: 10,
      outputVoltage: 5,
      inputUnit: 'V' as VoltageUnit,
      outputUnit: 'V' as VoltageUnit,
    },
    {
      name: "12 dB Loss (Quarter Voltage)",
      description: "Significant voltage drop",
      inputVoltage: 10,
      outputVoltage: 2.5,
      inputUnit: 'V' as VoltageUnit,
      outputUnit: 'V' as VoltageUnit,
    },
    {
      name: "20 dB Loss",
      description: "One-tenth voltage",
      inputVoltage: 10,
      outputVoltage: 1,
      inputUnit: 'V' as VoltageUnit,
      outputUnit: 'V' as VoltageUnit,
    },
    {
      name: "Audio Signal (mV)",
      description: "Typical audio scenario",
      inputVoltage: 1000,
      outputVoltage: 500,
      inputUnit: 'mV' as VoltageUnit,
      outputUnit: 'mV' as VoltageUnit,
    },
  ];
}

export function getDistancePresets() {
  return [
    {
      name: "Coaxial Cable (RG-58)",
      description: "0.2 dB/m at 100 MHz",
      lossPerUnit: 0.2,
      distance: 50,
      distanceUnit: 'm' as const,
    },
    {
      name: "Fiber Optic Cable",
      description: "0.2 dB/km typical",
      lossPerUnit: 0.2,
      distance: 10,
      distanceUnit: 'km' as const,
    },
    {
      name: "Cat6 Ethernet Cable",
      description: "~0.05 dB/m at 100 MHz",
      lossPerUnit: 0.05,
      distance: 100,
      distanceUnit: 'm' as const,
    },
    {
      name: "Long Distance Fiber",
      description: "0.3 dB/km",
      lossPerUnit: 0.3,
      distance: 100,
      distanceUnit: 'km' as const,
    },
  ];
}

// History management
export function saveToHistory(
  mode: CalculationMode,
  inputs: PowerInputs | VoltageInputs | DistanceInputs,
  result: AttenuationResult
): void {
  if (typeof window === 'undefined') return;

  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    mode,
    result,
    inputs,
  };

  const history = getHistory();
  history.unshift(entry);

  if (history.length > MAX_HISTORY) {
    history.splice(MAX_HISTORY);
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

// Export functions
export function exportToText(
  mode: CalculationMode,
  inputs: PowerInputs | VoltageInputs | DistanceInputs,
  result: AttenuationResult
): string {
  let text = "Signal Attenuation Calculator - Calculation Report\n";
  text += "=".repeat(50) + "\n\n";
  text += `Calculation Mode: ${mode.charAt(0).toUpperCase() + mode.slice(1)}\n`;
  text += `Date: ${new Date().toLocaleString()}\n\n`;

  text += "Input Parameters:\n";
  text += "-".repeat(50) + "\n";

  if (mode === 'power') {
    const powerInputs = inputs as PowerInputs;
    text += `Input Power: ${powerInputs.inputPower} ${powerInputs.inputUnit}\n`;
    text += `Output Power: ${powerInputs.outputPower} ${powerInputs.outputUnit}\n`;
  } else if (mode === 'voltage') {
    const voltageInputs = inputs as VoltageInputs;
    text += `Input Voltage: ${voltageInputs.inputVoltage} ${voltageInputs.inputUnit}\n`;
    text += `Output Voltage: ${voltageInputs.outputVoltage} ${voltageInputs.outputUnit}\n`;
  } else {
    const distanceInputs = inputs as DistanceInputs;
    text += `Loss per unit: ${distanceInputs.lossPerUnit} dB/${distanceInputs.distanceUnit}\n`;
    text += `Distance: ${distanceInputs.distance} ${distanceInputs.distanceUnit}\n`;
  }

  text += "\nResults:\n";
  text += "-".repeat(50) + "\n";
  text += `${result.isGain ? 'Gain' : 'Attenuation'}: ${formatNumber(result.attenuation, 4)} dB\n`;
  
  if (mode !== 'distance' && result.signalLossPercentage > 0) {
    text += `Signal Loss: ${formatNumber(result.signalLossPercentage, 2)}%\n`;
  }

  text += "\nCalculation Steps:\n";
  text += "-".repeat(50) + "\n";
  text += result.steps.join("\n");

  text += "\n\n" + "=".repeat(50) + "\n";
  text += "Generated by Signal Attenuation Calculator\n";

  return text;
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

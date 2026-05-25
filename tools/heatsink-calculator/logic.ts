import { HeatsinkInputs, HeatsinkResult, CalculationMode } from "./types";

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

export function validateInputs(inputs: HeatsinkInputs): string | null {
  const { mode, powerDissipation, ambientTemp, maxJunctionTemp, thermalResistance } = inputs;

  if (powerDissipation <= 0) {
    return "Power dissipation must be greater than 0";
  }

  if (maxJunctionTemp <= ambientTemp) {
    return "Maximum junction temperature must be higher than ambient temperature";
  }

  if (mode === 'temperature-check') {
    if (thermalResistance === undefined || thermalResistance === null || thermalResistance <= 0) {
      return "Thermal resistance must be greater than 0 for temperature check";
    }
  }

  return null;
}

function getSafetyStatus(junctionTemp: number, maxJunctionTemp: number, margin: number = 10): 'safe' | 'warning' | 'critical' {
  const tempMargin = maxJunctionTemp - junctionTemp;
  
  if (junctionTemp > maxJunctionTemp) return 'critical';
  if (tempMargin < margin) return 'warning';
  return 'safe';
}

function getHeatsinkRecommendation(thermalResistance: number, powerDissipation: number): string {
  if (thermalResistance < 1) {
    return "High-performance heatsink with large surface area required";
  } else if (thermalResistance < 3) {
    return "Medium to large heatsink recommended";
  } else if (thermalResistance < 10) {
    return "Standard heatsink should be sufficient";
  } else {
    return "Small heatsink or natural convection may be adequate";
  }
}

function getCoolingType(powerDissipation: number, thermalResistance: number): 'passive' | 'active' | 'liquid' {
  if (powerDissipation > 100 || thermalResistance < 0.5) {
    return 'liquid';
  } else if (powerDissipation > 50 || thermalResistance < 2) {
    return 'active';
  } else {
    return 'passive';
  }
}

function getWarning(safetyStatus: 'safe' | 'warning' | 'critical', coolingType: 'passive' | 'active' | 'liquid'): string | undefined {
  switch (safetyStatus) {
    case 'critical':
      return '🚨 CRITICAL: Junction temperature exceeds maximum rating. Immediate cooling improvement required!';
    case 'warning':
      return '⚠️ WARNING: Junction temperature is close to maximum. Consider better cooling solution.';
    case 'safe':
      if (coolingType === 'liquid') {
        return 'ℹ️ High power dissipation detected. Liquid cooling recommended for optimal performance.';
      } else if (coolingType === 'active') {
        return 'ℹ️ Active cooling (fan) recommended for this power level.';
      }
      return 'ℹ️ Thermal design is within safe operating limits.';
    default:
      return undefined;
  }
}

export function calculateHeatsink(inputs: HeatsinkInputs): HeatsinkResult {
  const { mode, powerDissipation, ambientTemp, maxJunctionTemp, thermalResistance, precision = 2 } = inputs;

  const temperatureDifference = maxJunctionTemp - ambientTemp;
  let requiredThermalResistance: number | undefined;
  let actualJunctionTemp: number | undefined;
  let safetyStatus: 'safe' | 'warning' | 'critical';

  if (mode === 'thermal-resistance') {
    // Calculate required thermal resistance: θ = ΔT / P
    requiredThermalResistance = temperatureDifference / powerDissipation;
    actualJunctionTemp = maxJunctionTemp; // At the limit
    safetyStatus = 'safe'; // This is the requirement calculation
  } else {
    // Calculate actual junction temperature: Tj = Ta + (P × θ)
    actualJunctionTemp = ambientTemp + (powerDissipation * thermalResistance!);
    safetyStatus = getSafetyStatus(actualJunctionTemp, maxJunctionTemp);
  }

  const effectiveThermalResistance = requiredThermalResistance || thermalResistance!;
  const heatsinkRecommendation = getHeatsinkRecommendation(effectiveThermalResistance, powerDissipation);
  const coolingType = getCoolingType(powerDissipation, effectiveThermalResistance);
  const warning = getWarning(safetyStatus, coolingType);
  const steps = generateSteps(inputs, requiredThermalResistance, actualJunctionTemp, temperatureDifference, precision);

  return {
    mode,
    requiredThermalResistance,
    actualJunctionTemp,
    powerDissipation,
    ambientTemp,
    maxJunctionTemp,
    thermalResistance,
    temperatureDifference,
    safetyStatus,
    heatsinkRecommendation,
    coolingType,
    warning,
    steps,
  };
}

function generateSteps(
  inputs: HeatsinkInputs,
  requiredThermalResistance?: number,
  actualJunctionTemp?: number,
  temperatureDifference?: number,
  precision: number = 2
): string[] {
  const steps: string[] = [];
  const { mode, powerDissipation, ambientTemp, maxJunctionTemp, thermalResistance } = inputs;

  steps.push("Heatsink Thermal Calculation", "");

  if (mode === 'thermal-resistance') {
    steps.push(
      "Given:",
      `  Power Dissipation (P) = ${powerDissipation} W`,
      `  Ambient Temperature (Ta) = ${ambientTemp} °C`,
      `  Maximum Junction Temperature (Tj) = ${maxJunctionTemp} °C`,
      "",
      "Step 1: Calculate Temperature Difference",
      `  ΔT = Tj - Ta`,
      `  ΔT = ${maxJunctionTemp} - ${ambientTemp}`,
      `  ΔT = ${temperatureDifference} °C`,
      "",
      "Step 2: Calculate Required Thermal Resistance",
      `  Formula: θ = ΔT / P`,
      `  θ = ${temperatureDifference} / ${powerDissipation}`,
      `  θ = ${formatNumber(requiredThermalResistance!, precision)} °C/W`,
      ""
    );
  } else {
    steps.push(
      "Given:",
      `  Power Dissipation (P) = ${powerDissipation} W`,
      `  Ambient Temperature (Ta) = ${ambientTemp} °C`,
      `  Heatsink Thermal Resistance (θ) = ${thermalResistance} °C/W`,
      `  Maximum Junction Temperature (Tj) = ${maxJunctionTemp} °C`,
      "",
      "Step 1: Calculate Actual Junction Temperature",
      `  Formula: Tj_actual = Ta + (P × θ)`,
      `  Tj_actual = ${ambientTemp} + (${powerDissipation} × ${thermalResistance})`,
      `  Tj_actual = ${ambientTemp} + ${formatNumber(powerDissipation * thermalResistance!, precision)}`,
      `  Tj_actual = ${formatNumber(actualJunctionTemp!, precision)} °C`,
      "",
      "Step 2: Check Safety Margin",
      `  Temperature Margin = Tj_max - Tj_actual`,
      `  Temperature Margin = ${maxJunctionTemp} - ${formatNumber(actualJunctionTemp!, precision)}`,
      `  Temperature Margin = ${formatNumber(maxJunctionTemp - actualJunctionTemp!, precision)} °C`,
      ""
    );
  }

  return steps.filter(step => step !== "");
}

export function getPresets(mode: CalculationMode) {
  if (mode === 'thermal-resistance') {
    return [
      { name: "CPU Cooling", description: "Typical desktop CPU", powerDissipation: 65, ambientTemp: 25, maxJunctionTemp: 85 },
      { name: "Power MOSFET", description: "High-power switching", powerDissipation: 25, ambientTemp: 30, maxJunctionTemp: 150 },
      { name: "LED Driver", description: "High-power LED", powerDissipation: 10, ambientTemp: 25, maxJunctionTemp: 85 },
      { name: "Voltage Regulator", description: "Linear regulator", powerDissipation: 5, ambientTemp: 25, maxJunctionTemp: 125 },
      { name: "Power Amplifier", description: "Audio amplifier IC", powerDissipation: 15, ambientTemp: 25, maxJunctionTemp: 150 },
      { name: "Server CPU", description: "High-performance server", powerDissipation: 150, ambientTemp: 25, maxJunctionTemp: 85 },
    ];
  } else {
    return [
      { name: "Small Heatsink", description: "Basic aluminum heatsink", powerDissipation: 10, ambientTemp: 25, maxJunctionTemp: 85, thermalResistance: 8 },
      { name: "Medium Heatsink", description: "Standard heatsink with fins", powerDissipation: 25, ambientTemp: 25, maxJunctionTemp: 85, thermalResistance: 3 },
      { name: "Large Heatsink", description: "High-performance heatsink", powerDissipation: 50, ambientTemp: 25, maxJunctionTemp: 85, thermalResistance: 1.5 },
      { name: "CPU Cooler", description: "Tower cooler with fan", powerDissipation: 65, ambientTemp: 25, maxJunctionTemp: 85, thermalResistance: 0.8 },
      { name: "Liquid Cooler", description: "AIO liquid cooling", powerDissipation: 150, ambientTemp: 25, maxJunctionTemp: 85, thermalResistance: 0.3 },
    ];
  }
}

const HISTORY_KEY = 'heatsink-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: HeatsinkInputs;
  result: HeatsinkResult;
}

export function saveToHistory(inputs: HeatsinkInputs, result: HeatsinkResult): void {
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

export function exportToText(inputs: HeatsinkInputs, result: HeatsinkResult): string {
  const modeLabels = {
    'thermal-resistance': 'Thermal Resistance Calculation',
    'temperature-check': 'Temperature Verification',
  };

  const lines = [
    "Heatsink Calculator - Thermal Analysis Report",
    "=".repeat(60),
    "",
    `Mode: ${modeLabels[result.mode]}`,
    `Date: ${new Date().toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(60),
    `Power Dissipation: ${result.powerDissipation} W`,
    `Ambient Temperature: ${result.ambientTemp} °C`,
    `Maximum Junction Temperature: ${result.maxJunctionTemp} °C`,
  ];

  if (result.thermalResistance !== undefined) {
    lines.push(`Heatsink Thermal Resistance: ${result.thermalResistance} °C/W`);
  }

  lines.push(
    "",
    "RESULTS:",
    "-".repeat(60),
  );

  if (result.requiredThermalResistance !== undefined) {
    lines.push(`Required Thermal Resistance: ${formatNumber(result.requiredThermalResistance, inputs.precision)} °C/W`);
  }

  if (result.actualJunctionTemp !== undefined) {
    lines.push(`Actual Junction Temperature: ${formatNumber(result.actualJunctionTemp, inputs.precision)} °C`);
  }

  lines.push(
    `Temperature Difference: ${result.temperatureDifference} °C`,
    `Safety Status: ${result.safetyStatus.toUpperCase()}`,
    `Cooling Type: ${result.coolingType.toUpperCase()}`,
    `Heatsink Recommendation: ${result.heatsinkRecommendation}`
  );

  if (result.warning) {
    lines.push(
      "",
      "ANALYSIS:",
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
    "Generated by Heatsink Calculator"
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
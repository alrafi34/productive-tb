import { VoltageRegulationInputs, VoltageRegulationResult, SystemType, VoltageUnit } from "./types";

// Format number with precision
export function formatNumber(value: number, decimals: number = 2): string {
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
export function validateInputs(inputs: VoltageRegulationInputs): string | null {
  const { noLoadVoltage, fullLoadVoltage } = inputs;

  if (noLoadVoltage === undefined || noLoadVoltage === null || isNaN(noLoadVoltage)) {
    return "No-load voltage is required";
  }

  if (fullLoadVoltage === undefined || fullLoadVoltage === null || isNaN(fullLoadVoltage)) {
    return "Full-load voltage is required";
  }

  if (noLoadVoltage < 0) {
    return "No-load voltage cannot be negative";
  }

  if (fullLoadVoltage <= 0) {
    return "Full-load voltage must be greater than zero";
  }

  if (noLoadVoltage < fullLoadVoltage) {
    return "No-load voltage should typically be higher than full-load voltage";
  }

  return null;
}

// Determine regulation level
function getRegulationLevel(regulation: number): 'excellent' | 'good' | 'moderate' | 'poor' | 'critical' {
  if (regulation < 0) return 'critical';
  if (regulation <= 2) return 'excellent';
  if (regulation <= 5) return 'good';
  if (regulation <= 10) return 'moderate';
  if (regulation <= 20) return 'poor';
  return 'critical';
}

// Get interpretation message
function getInterpretation(level: 'excellent' | 'good' | 'moderate' | 'poor' | 'critical', systemType: SystemType): string {
  const systemName = systemType === 'transformer' ? 'transformer' : 
                    systemType === 'transmission-line' ? 'transmission line' : 'system';

  switch (level) {
    case 'excellent':
      return `Excellent regulation! This ${systemName} maintains very stable voltage under load.`;
    case 'good':
      return `Good regulation. This ${systemName} provides acceptable voltage stability.`;
    case 'moderate':
      return `Moderate regulation. Consider optimization for better voltage stability.`;
    case 'poor':
      return `Poor regulation. Significant voltage drop under load may affect performance.`;
    case 'critical':
      return `Critical regulation issue! This ${systemName} requires immediate attention.`;
  }
}

// Get warning message
function getWarning(level: 'excellent' | 'good' | 'moderate' | 'poor' | 'critical', regulation: number): string | undefined {
  if (regulation < 0) {
    return '⚠️ CRITICAL: Negative regulation indicates full-load voltage is higher than no-load voltage. Check your measurements.';
  }
  if (level === 'critical') {
    return '⚠️ CRITICAL: Very poor voltage regulation. System may not function properly under load.';
  }
  if (level === 'poor') {
    return '⚠️ WARNING: Poor voltage regulation may cause equipment malfunction or reduced efficiency.';
  }
  if (regulation > 15) {
    return 'ℹ️ High voltage regulation may indicate oversized equipment or poor power factor.';
  }
  return undefined;
}

// Calculate voltage regulation
export function calculateVoltageRegulation(inputs: VoltageRegulationInputs): VoltageRegulationResult {
  const { noLoadVoltage, fullLoadVoltage, systemType, voltageUnit, precision } = inputs;

  // Calculate voltage regulation using standard formula
  // Voltage Regulation (%) = ((V_no_load - V_full_load) / V_full_load) × 100
  const regulation = ((noLoadVoltage - fullLoadVoltage) / fullLoadVoltage) * 100;
  const voltageDrop = noLoadVoltage - fullLoadVoltage;

  // Determine regulation level
  const regulationLevel = getRegulationLevel(regulation);

  // Get interpretation and warning
  const interpretation = getInterpretation(regulationLevel, systemType);
  const warning = getWarning(regulationLevel, regulation);

  // Generate calculation steps
  const steps = generateSteps(inputs, regulation, voltageDrop, precision);

  return {
    regulation,
    regulationLevel,
    noLoadVoltage,
    fullLoadVoltage,
    voltageDrop,
    systemType,
    voltageUnit,
    formula: "VR% = ((V_no_load - V_full_load) / V_full_load) × 100",
    interpretation,
    warning,
    steps,
  };
}

function generateSteps(
  inputs: VoltageRegulationInputs,
  regulation: number,
  voltageDrop: number,
  precision: number
): string[] {
  const { noLoadVoltage, fullLoadVoltage, voltageUnit } = inputs;
  const unit = voltageUnit;

  const steps: string[] = [
    "Voltage Regulation Calculation",
    "",
    "Given:",
    `  No-load Voltage (V₀) = ${noLoadVoltage} ${unit}`,
    `  Full-load Voltage (V_FL) = ${fullLoadVoltage} ${unit}`,
    "",
    "Step 1: Calculate Voltage Drop",
    `  Voltage Drop = V₀ - V_FL`,
    `  Voltage Drop = ${noLoadVoltage} - ${fullLoadVoltage}`,
    `  Voltage Drop = ${formatNumber(voltageDrop, precision)} ${unit}`,
    "",
    "Step 2: Calculate Voltage Regulation",
    `  Formula: VR% = ((V₀ - V_FL) / V_FL) × 100`,
    `  VR% = ((${noLoadVoltage} - ${fullLoadVoltage}) / ${fullLoadVoltage}) × 100`,
    `  VR% = (${formatNumber(voltageDrop, precision)} / ${fullLoadVoltage}) × 100`,
    `  VR% = ${formatNumber(voltageDrop / fullLoadVoltage, 4)} × 100`,
    `  VR% = ${formatNumber(regulation, precision)}%`,
    "",
    "Result:",
    `  Voltage Regulation = ${formatNumber(regulation, precision)}%`
  ];

  return steps;
}

// Get common presets
export function getPresets() {
  return [
    {
      name: "Household Transformer",
      description: "Typical residential transformer",
      noLoadVoltage: 240,
      fullLoadVoltage: 220,
      systemType: 'transformer' as SystemType,
      voltageUnit: 'V' as VoltageUnit
    },
    {
      name: "Distribution Transformer",
      description: "11kV to 415V transformer",
      noLoadVoltage: 415,
      fullLoadVoltage: 400,
      systemType: 'transformer' as SystemType,
      voltageUnit: 'V' as VoltageUnit
    },
    {
      name: "Transmission Line",
      description: "High voltage transmission",
      noLoadVoltage: 11.0,
      fullLoadVoltage: 10.5,
      systemType: 'transmission-line' as SystemType,
      voltageUnit: 'kV' as VoltageUnit
    },
    {
      name: "Power Transformer",
      description: "Large power transformer",
      noLoadVoltage: 132,
      fullLoadVoltage: 127,
      systemType: 'transformer' as SystemType,
      voltageUnit: 'kV' as VoltageUnit
    },
    {
      name: "Motor Circuit",
      description: "Motor supply circuit",
      noLoadVoltage: 480,
      fullLoadVoltage: 460,
      systemType: 'general' as SystemType,
      voltageUnit: 'V' as VoltageUnit
    },
    {
      name: "DC Power Supply",
      description: "Regulated DC supply",
      noLoadVoltage: 12.5,
      fullLoadVoltage: 12.0,
      systemType: 'general' as SystemType,
      voltageUnit: 'V' as VoltageUnit
    }
  ];
}

// History management
const HISTORY_KEY = 'voltage-regulation-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: VoltageRegulationInputs;
  result: VoltageRegulationResult;
}

export function saveToHistory(inputs: VoltageRegulationInputs, result: VoltageRegulationResult): void {
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
export function exportToText(inputs: VoltageRegulationInputs, result: VoltageRegulationResult): string {
  const systemTypeLabels = {
    'transformer': 'Transformer',
    'transmission-line': 'Transmission Line',
    'general': 'General System',
  };

  const lines = [
    "Voltage Regulation Calculator - Calculation Report",
    "=".repeat(60),
    "",
    `System Type: ${systemTypeLabels[result.systemType]}`,
    `Date: ${new Date().toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(60),
    `No-load Voltage: ${result.noLoadVoltage} ${result.voltageUnit}`,
    `Full-load Voltage: ${result.fullLoadVoltage} ${result.voltageUnit}`,
    "",
    "RESULTS:",
    "-".repeat(60),
    `Voltage Regulation: ${formatNumber(result.regulation, inputs.precision)} %`,
    `Voltage Drop: ${formatNumber(result.voltageDrop, inputs.precision)} ${result.voltageUnit}`,
    `Regulation Level: ${result.regulationLevel.toUpperCase()}`,
    `Formula: ${result.formula}`,
    "",
    "INTERPRETATION:",
    "-".repeat(60),
    result.interpretation
  ];

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
    "Generated by Voltage Regulation Calculator"
  );

  return lines.join("\n");
}

// Export to CSV
export function exportToCSV(inputs: VoltageRegulationInputs, result: VoltageRegulationResult): string {
  const headers = ["Parameter", "Value", "Unit"];
  const rows = [
    headers.join(","),
    `"System Type","${result.systemType}",""`,
    `"No-load Voltage","${result.noLoadVoltage}","${result.voltageUnit}"`,
    `"Full-load Voltage","${result.fullLoadVoltage}","${result.voltageUnit}"`,
    `"Voltage Drop","${formatNumber(result.voltageDrop, inputs.precision)}","${result.voltageUnit}"`,
    `"Voltage Regulation","${formatNumber(result.regulation, inputs.precision)}","%"`,
    `"Regulation Level","${result.regulationLevel}",""`
  ];

  return rows.join("\n");
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
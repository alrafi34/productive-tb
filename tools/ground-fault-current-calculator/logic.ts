import { FaultCurrentInputs, FaultCurrentResult, CalculationMode } from "./types";

export function formatNumber(value: number, decimals: number = 2): string {
  if (Math.abs(value) < 0.000001 || Math.abs(value) > 1000000) {
    return value.toExponential(decimals);
  }
  return value.toLocaleString('en-US', { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  });
}

export function debounce(fn: () => void, delay: number) {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

export function validateInputs(inputs: FaultCurrentInputs): string | null {
  const { mode, systemVoltage, totalImpedance, sourceImpedance, cableImpedance, transformerImpedance } = inputs;

  if (systemVoltage <= 0) {
    return "System voltage must be greater than 0";
  }

  if (mode === 'basic') {
    if (totalImpedance === undefined || totalImpedance === null || totalImpedance <= 0) {
      return "Total impedance must be greater than 0";
    }
  } else {
    if ((sourceImpedance === undefined || sourceImpedance === null || sourceImpedance < 0) &&
        (cableImpedance === undefined || cableImpedance === null || cableImpedance < 0) &&
        (transformerImpedance === undefined || transformerImpedance === null || transformerImpedance < 0)) {
      return "At least one impedance component must be specified in advanced mode";
    }
  }

  return null;
}

function getFaultLevel(faultCurrent: number): 'low' | 'medium' | 'high' | 'critical' {
  if (faultCurrent < 100) return 'low';
  if (faultCurrent < 1000) return 'medium';
  if (faultCurrent < 10000) return 'high';
  return 'critical';
}

function getSystemType(voltage: number): string {
  if (voltage <= 50) return 'Extra Low Voltage (ELV)';
  if (voltage <= 1000) return 'Low Voltage (LV)';
  if (voltage <= 35000) return 'Medium Voltage (MV)';
  return 'High Voltage (HV)';
}

function getWarning(faultLevel: 'low' | 'medium' | 'high' | 'critical', faultCurrent: number): string | undefined {
  switch (faultLevel) {
    case 'critical':
      return '🚨 CRITICAL: Extremely high fault current detected. Industrial-grade protection and safety measures required!';
    case 'high':
      return '⚠️ HIGH FAULT CURRENT: Ensure adequate protection devices and safety procedures are in place.';
    case 'medium':
      return 'ℹ️ MODERATE FAULT CURRENT: Standard protection devices should be adequate for this fault level.';
    case 'low':
      return 'ℹ️ LOW FAULT CURRENT: Minimal fault current detected. Verify protection device sensitivity.';
    default:
      return undefined;
  }
}

export function calculateFaultCurrent(inputs: FaultCurrentInputs): FaultCurrentResult {
  const { mode, systemVoltage, totalImpedance, sourceImpedance, cableImpedance, transformerImpedance, transformerRating, precision = 2 } = inputs;

  let calculatedTotalImpedance: number;

  if (mode === 'basic') {
    calculatedTotalImpedance = totalImpedance!;
  } else {
    // Advanced mode: sum all impedance components
    calculatedTotalImpedance = 0;
    
    if (sourceImpedance !== undefined && sourceImpedance !== null) {
      calculatedTotalImpedance += sourceImpedance;
    }
    
    if (cableImpedance !== undefined && cableImpedance !== null) {
      calculatedTotalImpedance += cableImpedance;
    }
    
    if (transformerImpedance !== undefined && transformerImpedance !== null && transformerRating !== undefined && transformerRating !== null) {
      // Convert transformer impedance percentage to ohms
      const transformerImpedanceOhms = (transformerImpedance / 100) * (systemVoltage * systemVoltage) / (transformerRating * 1000);
      calculatedTotalImpedance += transformerImpedanceOhms;
    }

    // Ensure minimum impedance to prevent division by zero
    if (calculatedTotalImpedance <= 0) {
      calculatedTotalImpedance = 0.001; // Very small impedance
    }
  }

  // Calculate fault current using Ohm's Law: I = V / Z
  const faultCurrent = systemVoltage / calculatedTotalImpedance;

  const faultLevel = getFaultLevel(faultCurrent);
  const systemType = getSystemType(systemVoltage);
  const warning = getWarning(faultLevel, faultCurrent);
  const steps = generateSteps(inputs, calculatedTotalImpedance, faultCurrent, precision);

  return {
    mode,
    faultCurrent,
    systemVoltage,
    totalImpedance: calculatedTotalImpedance,
    sourceImpedance,
    cableImpedance,
    transformerImpedance,
    faultLevel,
    systemType,
    warning,
    steps,
  };
}

function generateSteps(
  inputs: FaultCurrentInputs,
  totalImpedance: number,
  faultCurrent: number,
  precision: number
): string[] {
  const steps: string[] = [];
  const { mode, systemVoltage, sourceImpedance, cableImpedance, transformerImpedance, transformerRating } = inputs;

  steps.push("Ground Fault Current Calculation", "");

  steps.push(
    "Given:",
    `  System Voltage (V) = ${systemVoltage} V`,
  );

  if (mode === 'basic') {
    steps.push(`  Total Impedance (Z) = ${inputs.totalImpedance} Ω`);
  } else {
    steps.push("  Impedance Components:");
    if (sourceImpedance !== undefined && sourceImpedance !== null) {
      steps.push(`    Source Impedance = ${sourceImpedance} Ω`);
    }
    if (cableImpedance !== undefined && cableImpedance !== null) {
      steps.push(`    Cable Impedance = ${cableImpedance} Ω`);
    }
    if (transformerImpedance !== undefined && transformerImpedance !== null && transformerRating !== undefined) {
      const transformerImpedanceOhms = (transformerImpedance / 100) * (systemVoltage * systemVoltage) / (transformerRating * 1000);
      steps.push(`    Transformer Impedance = ${transformerImpedance}% = ${formatNumber(transformerImpedanceOhms, precision)} Ω`);
    }
  }

  steps.push(
    "",
    mode === 'advanced' ? "Step 1: Calculate Total Impedance" : "Step 1: Apply Ohm's Law",
  );

  if (mode === 'advanced') {
    steps.push(
      `  Z_total = Z_source + Z_cable + Z_transformer`,
      `  Z_total = ${formatNumber(totalImpedance, precision)} Ω`,
      "",
      "Step 2: Calculate Fault Current using Ohm's Law"
    );
  }

  steps.push(
    `  Formula: I_fault = V / Z_total`,
    `  I_fault = ${systemVoltage} / ${formatNumber(totalImpedance, precision)}`,
    `  I_fault = ${formatNumber(faultCurrent, precision)} A`,
    ""
  );

  return steps.filter(step => step !== "");
}

export function getPresets(mode: CalculationMode) {
  if (mode === 'basic') {
    return [
      { name: "Residential 230V", description: "Typical house supply", systemVoltage: 230, totalImpedance: 0.8 },
      { name: "Industrial 415V", description: "3-phase industrial", systemVoltage: 415, totalImpedance: 0.5 },
      { name: "Distribution 11kV", description: "Medium voltage", systemVoltage: 11000, totalImpedance: 10 },
      { name: "Low Impedance System", description: "High fault current", systemVoltage: 400, totalImpedance: 0.1 },
      { name: "High Impedance System", description: "Limited fault current", systemVoltage: 230, totalImpedance: 5 },
      { name: "Motor Circuit", description: "Industrial motor", systemVoltage: 415, totalImpedance: 1.2 },
    ];
  } else {
    return [
      { 
        name: "Residential Circuit", 
        description: "House distribution", 
        systemVoltage: 230, 
        sourceImpedance: 0.3, 
        cableImpedance: 0.5, 
        transformerImpedance: 4,
        transformerRating: 100
      },
      { 
        name: "Industrial Plant", 
        description: "Factory distribution", 
        systemVoltage: 415, 
        sourceImpedance: 0.1, 
        cableImpedance: 0.3, 
        transformerImpedance: 6,
        transformerRating: 1000
      },
      { 
        name: "Commercial Building", 
        description: "Office complex", 
        systemVoltage: 400, 
        sourceImpedance: 0.2, 
        cableImpedance: 0.8, 
        transformerImpedance: 5,
        transformerRating: 500
      },
    ];
  }
}

const HISTORY_KEY = 'ground-fault-current-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FaultCurrentInputs;
  result: FaultCurrentResult;
}

export function saveToHistory(inputs: FaultCurrentInputs, result: FaultCurrentResult): void {
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

export function exportToText(inputs: FaultCurrentInputs, result: FaultCurrentResult): string {
  const modeLabels = {
    'basic': 'Basic Calculation',
    'advanced': 'Advanced Calculation',
  };

  const lines = [
    "Ground Fault Current Calculator - Analysis Report",
    "=".repeat(60),
    "",
    `Mode: ${modeLabels[result.mode]}`,
    `Date: ${new Date().toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(60),
    `System Voltage: ${result.systemVoltage} V`,
    `System Type: ${result.systemType}`,
  ];

  if (result.mode === 'basic') {
    lines.push(`Total Impedance: ${result.totalImpedance} Ω`);
  } else {
    lines.push("Impedance Components:");
    if (result.sourceImpedance !== undefined) {
      lines.push(`  Source Impedance: ${result.sourceImpedance} Ω`);
    }
    if (result.cableImpedance !== undefined) {
      lines.push(`  Cable Impedance: ${result.cableImpedance} Ω`);
    }
    if (result.transformerImpedance !== undefined) {
      lines.push(`  Transformer Impedance: ${result.transformerImpedance}%`);
    }
    lines.push(`Total Calculated Impedance: ${formatNumber(result.totalImpedance, inputs.precision)} Ω`);
  }

  lines.push(
    "",
    "RESULTS:",
    "-".repeat(60),
    `Ground Fault Current: ${formatNumber(result.faultCurrent, inputs.precision)} A`,
    `Fault Level: ${result.faultLevel.toUpperCase()}`,
  );

  if (result.warning) {
    lines.push(
      "",
      "SAFETY ANALYSIS:",
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
    "Generated by Ground Fault Current Calculator"
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
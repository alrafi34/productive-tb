import { OpAmpInputs, OpAmpResult, ResistanceUnit, CircuitType } from "./types";

// Convert resistance to ohms
export function normalizeResistance(value: number, unit: ResistanceUnit): number {
  switch (unit) {
    case 'kohm':
      return value * 1000;
    case 'mohm':
      return value * 1000000;
    default:
      return value;
  }
}

// Get unit label
export function getUnitLabel(unit: ResistanceUnit): string {
  switch (unit) {
    case 'kohm':
      return 'kΩ';
    case 'mohm':
      return 'MΩ';
    default:
      return 'Ω';
  }
}

// Format number with precision
export function formatNumber(value: number, decimals: number = 4): string {
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
export function validateInputs(inputs: OpAmpInputs): string | null {
  const { circuitType, vin, r1, r2, vin1, vin2, rf, ri1, ri2 } = inputs;

  if (circuitType === 'voltage-follower') {
    if (vin === undefined || vin === null) {
      return "Input voltage (Vin) is required";
    }
    return null;
  }

  if (circuitType === 'summing') {
    if (!rf || rf <= 0) {
      return "Feedback resistor (Rf) must be greater than zero";
    }
    if (!ri1 || ri1 <= 0) {
      return "Input resistor 1 (Ri1) must be greater than zero";
    }
    if (vin1 === undefined || vin1 === null) {
      return "At least one input voltage is required";
    }
    return null;
  }

  // For inverting and non-inverting
  if (vin === undefined || vin === null) {
    return "Input voltage (Vin) is required";
  }

  if (!r1 || r1 <= 0) {
    return "R1 must be greater than zero";
  }

  if (!r2 || r2 <= 0) {
    return "R2 must be greater than zero";
  }

  return null;
}

// Calculate Op-Amp parameters
export function calculateOpAmp(inputs: OpAmpInputs): OpAmpResult {
  const { circuitType } = inputs;

  switch (circuitType) {
    case 'inverting':
      return calculateInverting(inputs);
    case 'non-inverting':
      return calculateNonInverting(inputs);
    case 'voltage-follower':
      return calculateVoltageFollower(inputs);
    case 'summing':
      return calculateSumming(inputs);
    default:
      throw new Error("Invalid circuit type");
  }
}

// Inverting Amplifier: Gain = -(R2/R1), Vout = Gain × Vin
function calculateInverting(inputs: OpAmpInputs): OpAmpResult {
  const { vin, r1, r2, r1Unit = 'kohm', r2Unit = 'kohm' } = inputs;

  const r1Ohms = normalizeResistance(r1!, r1Unit);
  const r2Ohms = normalizeResistance(r2!, r2Unit);

  const gain = -(r2Ohms / r1Ohms);
  const vout = gain * vin!;

  const steps = [
    "Inverting Amplifier Configuration",
    "",
    `Given:`,
    `  Vin = ${vin} V`,
    `  R1 = ${r1} ${getUnitLabel(r1Unit)} = ${formatNumber(r1Ohms, 0)} Ω`,
    `  R2 = ${r2} ${getUnitLabel(r2Unit)} = ${formatNumber(r2Ohms, 0)} Ω`,
    "",
    `Step 1: Calculate Gain`,
    `  Gain (Av) = -(R2 / R1)`,
    `  Gain = -(${formatNumber(r2Ohms, 0)} / ${formatNumber(r1Ohms, 0)})`,
    `  Gain = ${formatNumber(gain, 4)}`,
    "",
    `Step 2: Calculate Output Voltage`,
    `  Vout = Gain × Vin`,
    `  Vout = ${formatNumber(gain, 4)} × ${vin}`,
    `  Vout = ${formatNumber(vout, 4)} V`,
  ];

  return {
    gain,
    vout,
    formula: "Gain = -(R2/R1), Vout = Gain × Vin",
    steps,
    circuitType: 'inverting',
    r1Ohms,
    r2Ohms,
  };
}

// Non-Inverting Amplifier: Gain = 1 + (R2/R1), Vout = Gain × Vin
function calculateNonInverting(inputs: OpAmpInputs): OpAmpResult {
  const { vin, r1, r2, r1Unit = 'kohm', r2Unit = 'kohm' } = inputs;

  const r1Ohms = normalizeResistance(r1!, r1Unit);
  const r2Ohms = normalizeResistance(r2!, r2Unit);

  const gain = 1 + (r2Ohms / r1Ohms);
  const vout = gain * vin!;

  const steps = [
    "Non-Inverting Amplifier Configuration",
    "",
    `Given:`,
    `  Vin = ${vin} V`,
    `  R1 = ${r1} ${getUnitLabel(r1Unit)} = ${formatNumber(r1Ohms, 0)} Ω`,
    `  R2 = ${r2} ${getUnitLabel(r2Unit)} = ${formatNumber(r2Ohms, 0)} Ω`,
    "",
    `Step 1: Calculate Gain`,
    `  Gain (Av) = 1 + (R2 / R1)`,
    `  Gain = 1 + (${formatNumber(r2Ohms, 0)} / ${formatNumber(r1Ohms, 0)})`,
    `  Gain = ${formatNumber(gain, 4)}`,
    "",
    `Step 2: Calculate Output Voltage`,
    `  Vout = Gain × Vin`,
    `  Vout = ${formatNumber(gain, 4)} × ${vin}`,
    `  Vout = ${formatNumber(vout, 4)} V`,
  ];

  return {
    gain,
    vout,
    formula: "Gain = 1 + (R2/R1), Vout = Gain × Vin",
    steps,
    circuitType: 'non-inverting',
    r1Ohms,
    r2Ohms,
  };
}

// Voltage Follower: Gain = 1, Vout = Vin
function calculateVoltageFollower(inputs: OpAmpInputs): OpAmpResult {
  const { vin } = inputs;

  const gain = 1;
  const vout = vin!;

  const steps = [
    "Voltage Follower (Buffer) Configuration",
    "",
    `Given:`,
    `  Vin = ${vin} V`,
    "",
    `Voltage Follower Properties:`,
    `  Gain (Av) = 1 (Unity Gain)`,
    `  Vout = Vin`,
    "",
    `Result:`,
    `  Vout = ${formatNumber(vout, 4)} V`,
    "",
    `Note: Voltage follower provides high input impedance`,
    `and low output impedance with no voltage gain.`,
  ];

  return {
    gain,
    vout,
    formula: "Gain = 1, Vout = Vin",
    steps,
    circuitType: 'voltage-follower',
  };
}

// Summing Amplifier: Vout = -Rf × (V1/R1 + V2/R2 + V3/R3 + ...)
function calculateSumming(inputs: OpAmpInputs): OpAmpResult {
  const {
    vin1 = 0,
    vin2 = 0,
    vin3 = 0,
    rf,
    ri1,
    ri2,
    ri3,
    rfUnit = 'kohm',
    ri1Unit = 'kohm',
    ri2Unit = 'kohm',
    ri3Unit = 'kohm',
  } = inputs;

  const rfOhms = normalizeResistance(rf!, rfUnit);
  const ri1Ohms = normalizeResistance(ri1!, ri1Unit);
  const ri2Ohms = ri2 ? normalizeResistance(ri2, ri2Unit) : 0;
  const ri3Ohms = ri3 ? normalizeResistance(ri3, ri3Unit) : 0;

  let sum = vin1 / ri1Ohms;
  let sumStr = `${vin1}/${formatNumber(ri1Ohms, 0)}`;

  if (vin2 && ri2Ohms) {
    sum += vin2 / ri2Ohms;
    sumStr += ` + ${vin2}/${formatNumber(ri2Ohms, 0)}`;
  }

  if (vin3 && ri3Ohms) {
    sum += vin3 / ri3Ohms;
    sumStr += ` + ${vin3}/${formatNumber(ri3Ohms, 0)}`;
  }

  const vout = -rfOhms * sum;
  const gain = -rfOhms / ri1Ohms; // Gain for first input

  const steps = [
    "Summing Amplifier Configuration",
    "",
    `Given:`,
    `  Rf = ${rf} ${getUnitLabel(rfUnit)} = ${formatNumber(rfOhms, 0)} Ω`,
    `  Vin1 = ${vin1} V, Ri1 = ${ri1} ${getUnitLabel(ri1Unit)} = ${formatNumber(ri1Ohms, 0)} Ω`,
  ];

  if (vin2 && ri2Ohms) {
    steps.push(`  Vin2 = ${vin2} V, Ri2 = ${ri2} ${getUnitLabel(ri2Unit)} = ${formatNumber(ri2Ohms, 0)} Ω`);
  }

  if (vin3 && ri3Ohms) {
    steps.push(`  Vin3 = ${vin3} V, Ri3 = ${ri3} ${getUnitLabel(ri3Unit)} = ${formatNumber(ri3Ohms, 0)} Ω`);
  }

  steps.push(
    "",
    `Step 1: Calculate Sum of Weighted Inputs`,
    `  Sum = ${sumStr}`,
    `  Sum = ${formatNumber(sum, 8)} A/Ω`,
    "",
    `Step 2: Calculate Output Voltage`,
    `  Vout = -Rf × Sum`,
    `  Vout = -${formatNumber(rfOhms, 0)} × ${formatNumber(sum, 8)}`,
    `  Vout = ${formatNumber(vout, 4)} V`,
  );

  return {
    gain,
    vout,
    formula: "Vout = -Rf × (V1/R1 + V2/R2 + V3/R3)",
    steps,
    circuitType: 'summing',
    rfOhms,
  };
}

// Get presets based on circuit type
export function getPresets(circuitType: CircuitType) {
  switch (circuitType) {
    case 'inverting':
      return [
        {
          name: "Gain of -10",
          description: "R1=1kΩ, R2=10kΩ, Vin=1V",
          vin: 1,
          r1: 1,
          r2: 10,
          r1Unit: 'kohm' as ResistanceUnit,
          r2Unit: 'kohm' as ResistanceUnit,
        },
        {
          name: "Gain of -5",
          description: "R1=2kΩ, R2=10kΩ, Vin=2V",
          vin: 2,
          r1: 2,
          r2: 10,
          r1Unit: 'kohm' as ResistanceUnit,
          r2Unit: 'kohm' as ResistanceUnit,
        },
        {
          name: "Gain of -100",
          description: "R1=1kΩ, R2=100kΩ, Vin=0.1V",
          vin: 0.1,
          r1: 1,
          r2: 100,
          r1Unit: 'kohm' as ResistanceUnit,
          r2Unit: 'kohm' as ResistanceUnit,
        },
        {
          name: "Unity Gain Inverter",
          description: "R1=10kΩ, R2=10kΩ, Vin=5V",
          vin: 5,
          r1: 10,
          r2: 10,
          r1Unit: 'kohm' as ResistanceUnit,
          r2Unit: 'kohm' as ResistanceUnit,
        },
      ];
    case 'non-inverting':
      return [
        {
          name: "Gain of 10",
          description: "R1=1kΩ, R2=9kΩ, Vin=1V",
          vin: 1,
          r1: 1,
          r2: 9,
          r1Unit: 'kohm' as ResistanceUnit,
          r2Unit: 'kohm' as ResistanceUnit,
        },
        {
          name: "Gain of 11",
          description: "R1=1kΩ, R2=10kΩ, Vin=0.5V",
          vin: 0.5,
          r1: 1,
          r2: 10,
          r1Unit: 'kohm' as ResistanceUnit,
          r2Unit: 'kohm' as ResistanceUnit,
        },
        {
          name: "Gain of 101",
          description: "R1=1kΩ, R2=100kΩ, Vin=0.1V",
          vin: 0.1,
          r1: 1,
          r2: 100,
          r1Unit: 'kohm' as ResistanceUnit,
          r2Unit: 'kohm' as ResistanceUnit,
        },
        {
          name: "Gain of 2",
          description: "R1=10kΩ, R2=10kΩ, Vin=5V",
          vin: 5,
          r1: 10,
          r2: 10,
          r1Unit: 'kohm' as ResistanceUnit,
          r2Unit: 'kohm' as ResistanceUnit,
        },
      ];
    case 'voltage-follower':
      return [
        {
          name: "5V Buffer",
          description: "Unity gain buffer",
          vin: 5,
        },
        {
          name: "3.3V Buffer",
          description: "Unity gain buffer",
          vin: 3.3,
        },
        {
          name: "12V Buffer",
          description: "Unity gain buffer",
          vin: 12,
        },
        {
          name: "1V Buffer",
          description: "Unity gain buffer",
          vin: 1,
        },
      ];
    case 'summing':
      return [
        {
          name: "2-Input Mixer",
          description: "Equal weights",
          vin1: 1,
          vin2: 1,
          rf: 10,
          ri1: 10,
          ri2: 10,
          rfUnit: 'kohm' as ResistanceUnit,
          ri1Unit: 'kohm' as ResistanceUnit,
          ri2Unit: 'kohm' as ResistanceUnit,
        },
        {
          name: "3-Input Mixer",
          description: "Equal weights",
          vin1: 1,
          vin2: 2,
          vin3: 3,
          rf: 10,
          ri1: 10,
          ri2: 10,
          ri3: 10,
          rfUnit: 'kohm' as ResistanceUnit,
          ri1Unit: 'kohm' as ResistanceUnit,
          ri2Unit: 'kohm' as ResistanceUnit,
          ri3Unit: 'kohm' as ResistanceUnit,
        },
        {
          name: "Weighted Sum",
          description: "Different gains",
          vin1: 1,
          vin2: 1,
          rf: 10,
          ri1: 10,
          ri2: 5,
          rfUnit: 'kohm' as ResistanceUnit,
          ri1Unit: 'kohm' as ResistanceUnit,
          ri2Unit: 'kohm' as ResistanceUnit,
        },
      ];
    default:
      return [];
  }
}

// History management
const HISTORY_KEY = 'opamp-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: OpAmpInputs;
  result: OpAmpResult;
}

export function saveToHistory(inputs: OpAmpInputs, result: OpAmpResult): void {
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

// Export to text
export function exportToText(inputs: OpAmpInputs, result: OpAmpResult): string {
  const lines = [
    "Op-Amp Calculator - Calculation Report",
    "=" .repeat(50),
    "",
    `Circuit Type: ${result.circuitType.replace('-', ' ').toUpperCase()}`,
    `Date: ${new Date().toLocaleString()}`,
    "",
    "RESULTS:",
    "-".repeat(50),
    `Gain: ${formatNumber(result.gain, 4)}`,
    `Output Voltage: ${formatNumber(result.vout, 4)} V`,
    `Formula: ${result.formula}`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50),
    ...result.steps,
    "",
    "=" .repeat(50),
    "Generated by Op-Amp Calculator",
  ];
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

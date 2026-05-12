import {
  CalculationMode,
  PhaseAngleInputs,
  PhaseAngleResult,
  Preset,
  HistoryEntry
} from "./types";

const HISTORY_KEY = "phase-angle-calculator-history";
const MAX_HISTORY = 10;

/**
 * Calculate phase angle based on mode
 */
export function calculatePhaseAngle(inputs: PhaseAngleInputs): PhaseAngleResult {
  const { mode } = inputs;
  
  let angleRadians: number;
  let powerFactor: number;
  let formula: string;
  let steps: string[] = [];
  let additionalInfo: Partial<PhaseAngleResult> = {};
  
  if (mode === 'power') {
    const { realPower = 0, apparentPower = 0 } = inputs;
    
    powerFactor = realPower / apparentPower;
    angleRadians = Math.acos(powerFactor);
    formula = 'φ = arccos(P / S)';
    
    steps = [
      'Step 1: Calculate power factor',
      `cos(φ) = P / S`,
      `cos(φ) = ${realPower} / ${apparentPower}`,
      `cos(φ) = ${powerFactor.toFixed(6)}`,
      '',
      'Step 2: Calculate phase angle',
      `φ = arccos(${powerFactor.toFixed(6)})`,
      `φ = ${angleRadians.toFixed(6)} radians`,
      `φ = ${(angleRadians * 180 / Math.PI).toFixed(4)}°`
    ];
    
    additionalInfo = { realPower, apparentPower };
    
  } else if (mode === 'impedance') {
    const { resistance = 0, reactance = 0 } = inputs;
    
    angleRadians = Math.atan(reactance / resistance);
    const impedance = Math.sqrt(resistance * resistance + reactance * reactance);
    powerFactor = Math.cos(angleRadians);
    formula = 'φ = arctan(X / R)';
    
    steps = [
      'Step 1: Calculate phase angle',
      `φ = arctan(X / R)`,
      `φ = arctan(${reactance} / ${resistance})`,
      `φ = arctan(${(reactance / resistance).toFixed(6)})`,
      `φ = ${angleRadians.toFixed(6)} radians`,
      `φ = ${(angleRadians * 180 / Math.PI).toFixed(4)}°`,
      '',
      'Step 2: Calculate impedance',
      `Z = √(R² + X²)`,
      `Z = √(${resistance}² + ${reactance}²)`,
      `Z = ${impedance.toFixed(4)} Ω`,
      '',
      'Step 3: Calculate power factor',
      `cos(φ) = ${powerFactor.toFixed(6)}`
    ];
    
    additionalInfo = { resistance, reactance, impedance };
    
  } else { // powerFactor mode
    const { powerFactor: pf = 0 } = inputs;
    
    powerFactor = pf;
    angleRadians = Math.acos(powerFactor);
    formula = 'φ = arccos(PF)';
    
    steps = [
      'Step 1: Calculate phase angle from power factor',
      `φ = arccos(PF)`,
      `φ = arccos(${powerFactor})`,
      `φ = ${angleRadians.toFixed(6)} radians`,
      `φ = ${(angleRadians * 180 / Math.PI).toFixed(4)}°`
    ];
  }
  
  const angleDegrees = angleRadians * (180 / Math.PI);
  
  return {
    angleDegrees,
    angleRadians,
    powerFactor,
    mode,
    formula,
    steps,
    timestamp: Date.now(),
    ...additionalInfo
  };
}

/**
 * Validate inputs based on mode
 */
export function validateInputs(inputs: PhaseAngleInputs): string | null {
  const { mode } = inputs;
  
  if (mode === 'power') {
    const { realPower = 0, apparentPower = 0 } = inputs;
    
    if (isNaN(realPower) || realPower < 0) {
      return 'Real power must be a positive number';
    }
    
    if (isNaN(apparentPower) || apparentPower <= 0) {
      return 'Apparent power must be greater than 0';
    }
    
    if (realPower > apparentPower) {
      return 'Real power cannot exceed apparent power';
    }
    
  } else if (mode === 'impedance') {
    const { resistance = 0, reactance = 0 } = inputs;
    
    if (isNaN(resistance) || resistance <= 0) {
      return 'Resistance must be greater than 0';
    }
    
    if (isNaN(reactance)) {
      return 'Reactance must be a valid number';
    }
    
  } else if (mode === 'powerFactor') {
    const { powerFactor = 0 } = inputs;
    
    if (isNaN(powerFactor) || powerFactor < 0 || powerFactor > 1) {
      return 'Power factor must be between 0 and 1';
    }
  }
  
  return null;
}

/**
 * Get preset configurations
 */
export function getPresets(): Preset[] {
  return [
    {
      name: 'Unity Power Factor',
      description: 'Purely resistive load (0°)',
      mode: 'powerFactor',
      values: { powerFactor: 1.0 }
    },
    {
      name: 'Typical Inductive Load',
      description: 'Common motor load (0.8 PF)',
      mode: 'powerFactor',
      values: { powerFactor: 0.8 }
    },
    {
      name: 'Poor Power Factor',
      description: 'Needs correction (0.6 PF)',
      mode: 'powerFactor',
      values: { powerFactor: 0.6 }
    },
    {
      name: 'Balanced R-X Circuit',
      description: 'Equal resistance and reactance (45°)',
      mode: 'impedance',
      values: { resistance: 10, reactance: 10 }
    },
    {
      name: 'Mostly Resistive',
      description: 'Low reactance component',
      mode: 'impedance',
      values: { resistance: 100, reactance: 20 }
    },
    {
      name: 'Mostly Reactive',
      description: 'High reactance component',
      mode: 'impedance',
      values: { resistance: 20, reactance: 100 }
    },
    {
      name: 'Industrial Load Example',
      description: '1000W real, 1250VA apparent',
      mode: 'power',
      values: { realPower: 1000, apparentPower: 1250 }
    },
    {
      name: 'Residential Load',
      description: '500W real, 625VA apparent',
      mode: 'power',
      values: { realPower: 500, apparentPower: 625 }
    }
  ];
}

/**
 * Format number with decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

/**
 * Get mode label
 */
export function getModeLabel(mode: CalculationMode): string {
  switch (mode) {
    case 'power':
      return 'Using Power (P & S)';
    case 'impedance':
      return 'Using Resistance & Reactance';
    case 'powerFactor':
      return 'Using Power Factor';
    default:
      return 'Unknown Mode';
  }
}

/**
 * Convert degrees to radians
 */
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 */
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

// History management
export function saveToHistory(input: PhaseAngleInputs, result: PhaseAngleResult): void {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: Date.now(),
    input,
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
export function exportToText(input: PhaseAngleInputs, result: PhaseAngleResult): string {
  const lines = [
    "PHASE ANGLE CALCULATION",
    "=".repeat(50),
    "",
    `Date: ${new Date(result.timestamp).toLocaleString()}`,
    `Mode: ${getModeLabel(result.mode)}`,
    "",
    "INPUT VALUES:",
    "-".repeat(50)
  ];
  
  if (result.mode === 'power') {
    lines.push(`Real Power (P): ${result.realPower} W`);
    lines.push(`Apparent Power (S): ${result.apparentPower} VA`);
  } else if (result.mode === 'impedance') {
    lines.push(`Resistance (R): ${result.resistance} Ω`);
    lines.push(`Reactance (X): ${result.reactance} Ω`);
    lines.push(`Impedance (Z): ${formatNumber(result.impedance!, 4)} Ω`);
  } else {
    lines.push(`Power Factor: ${result.powerFactor}`);
  }
  
  lines.push("");
  lines.push("CALCULATED RESULTS:");
  lines.push("-".repeat(50));
  lines.push(`Phase Angle: ${formatNumber(result.angleDegrees, 4)}°`);
  lines.push(`Phase Angle: ${formatNumber(result.angleRadians, 6)} radians`);
  lines.push(`Power Factor: ${formatNumber(result.powerFactor, 6)}`);
  lines.push("");
  lines.push("FORMULA:");
  lines.push("-".repeat(50));
  lines.push(result.formula);
  lines.push("");
  lines.push("CALCULATION STEPS:");
  lines.push("-".repeat(50));
  
  result.steps.forEach(step => lines.push(step));
  
  lines.push("");
  lines.push("=".repeat(50));
  lines.push("Generated by Phase Angle Calculator");
  
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

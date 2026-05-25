import { 
  ShortCircuitInputs, 
  ShortCircuitResult, 
  SystemType, 
  CalculationMode, 
  FaultLevel, 
  HistoryEntry, 
  Preset 
} from './types';

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Format number with precision
export const formatNumber = (value: number, precision: number = 2): string => {
  if (isNaN(value) || !isFinite(value)) return '0';
  return value.toFixed(precision);
};

// Format current with appropriate unit
export const formatCurrent = (current: number): { value: number; unit: string; display: string } => {
  if (current >= 1000000) {
    return {
      value: current / 1000000,
      unit: 'MA',
      display: `${formatNumber(current / 1000000, 2)} MA`
    };
  } else if (current >= 1000) {
    return {
      value: current / 1000,
      unit: 'kA',
      display: `${formatNumber(current / 1000, 2)} kA`
    };
  } else {
    return {
      value: current,
      unit: 'A',
      display: `${formatNumber(current, 2)} A`
    };
  }
};

// Validate inputs
export const validateInputs = (inputs: ShortCircuitInputs): string | null => {
  if (!inputs.voltage || inputs.voltage <= 0) {
    return 'System voltage must be greater than 0';
  }

  if (!inputs.impedance || inputs.impedance <= 0) {
    return 'System impedance must be greater than 0';
  }

  if (inputs.voltage > 1000000) {
    return 'Voltage should be reasonable (≤ 1MV)';
  }

  if (inputs.impedance > 1000) {
    return 'Impedance should be reasonable (≤ 1000Ω)';
  }

  return null;
};

// Determine fault level based on current
const getFaultLevel = (current: number): { level: FaultLevel; warning?: string } => {
  if (current < 100) {
    return { level: 'low' };
  } else if (current < 1000) {
    return { 
      level: 'moderate',
      warning: 'Moderate fault current - ensure proper circuit protection'
    };
  } else if (current < 10000) {
    return { 
      level: 'high',
      warning: 'High fault current - verify circuit breaker ratings and safety measures'
    };
  } else {
    return { 
      level: 'critical',
      warning: 'CRITICAL fault current level - immediate safety review required'
    };
  }
};

// Main calculation function
export const calculateShortCircuitCurrent = (inputs: ShortCircuitInputs): ShortCircuitResult => {
  let shortCircuitCurrent: number;
  let formula: string;

  if (inputs.systemType === 'three-phase' && inputs.calculationMode === 'advanced') {
    // Three-phase formula: Isc = V / (√3 × Z)
    shortCircuitCurrent = inputs.voltage / (Math.sqrt(3) * inputs.impedance);
    formula = 'Isc = V / (√3 × Z)';
  } else {
    // Basic formula: Isc = V / Z
    shortCircuitCurrent = inputs.voltage / inputs.impedance;
    formula = 'Isc = V / Z';
  }

  const faultInfo = getFaultLevel(shortCircuitCurrent);
  const currentFormat = formatCurrent(shortCircuitCurrent);
  
  // Generate calculation steps
  const steps = generateCalculationSteps(inputs, shortCircuitCurrent);

  return {
    shortCircuitCurrent,
    formattedCurrent: currentFormat.display,
    currentUnit: currentFormat.unit,
    faultLevel: faultInfo.level,
    warning: faultInfo.warning,
    steps,
    formula,
    systemType: inputs.systemType,
    calculationMode: inputs.calculationMode
  };
};

// Generate calculation steps
const generateCalculationSteps = (inputs: ShortCircuitInputs, result: number): string[] => {
  const steps: string[] = [];
  
  steps.push('Short Circuit Current Calculation:');
  steps.push('');
  steps.push(`Given:`);
  steps.push(`System Voltage (V) = ${formatNumber(inputs.voltage, inputs.precision)} V`);
  steps.push(`System Impedance (Z) = ${formatNumber(inputs.impedance, inputs.precision)} Ω`);
  steps.push(`System Type: ${inputs.systemType}`);
  steps.push('');
  
  if (inputs.systemType === 'three-phase' && inputs.calculationMode === 'advanced') {
    steps.push('Formula for Three-Phase System:');
    steps.push('Isc = V / (√3 × Z)');
    steps.push('');
    steps.push('Calculation:');
    steps.push(`Isc = ${formatNumber(inputs.voltage, inputs.precision)} / (√3 × ${formatNumber(inputs.impedance, inputs.precision)})`);
    steps.push(`Isc = ${formatNumber(inputs.voltage, inputs.precision)} / (1.732 × ${formatNumber(inputs.impedance, inputs.precision)})`);
    steps.push(`Isc = ${formatNumber(inputs.voltage, inputs.precision)} / ${formatNumber(Math.sqrt(3) * inputs.impedance, inputs.precision)}`);
    steps.push(`Isc = ${formatNumber(result, inputs.precision)} A`);
  } else {
    steps.push('Formula (Basic):');
    steps.push('Isc = V / Z');
    steps.push('');
    steps.push('Calculation:');
    steps.push(`Isc = ${formatNumber(inputs.voltage, inputs.precision)} / ${formatNumber(inputs.impedance, inputs.precision)}`);
    steps.push(`Isc = ${formatNumber(result, inputs.precision)} A`);
  }
  
  steps.push('');
  const currentFormat = formatCurrent(result);
  if (currentFormat.unit !== 'A') {
    steps.push(`Result: ${currentFormat.display}`);
  }
  
  return steps;
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Presets
export const getPresets = (): Preset[] => [
  {
    name: 'Residential 230V',
    description: 'Typical home electrical system',
    voltage: 230,
    impedance: 0.5,
    systemType: 'single-phase'
  },
  {
    name: 'Industrial 400V',
    description: 'Low voltage industrial system',
    voltage: 400,
    impedance: 0.2,
    systemType: 'three-phase'
  },
  {
    name: 'Distribution 11kV',
    description: 'Medium voltage distribution',
    voltage: 11000,
    impedance: 2.0,
    systemType: 'three-phase'
  },
  {
    name: 'Transmission 33kV',
    description: 'High voltage transmission',
    voltage: 33000,
    impedance: 5.0,
    systemType: 'three-phase'
  },
  {
    name: 'Motor Circuit 415V',
    description: 'Typical motor feeder circuit',
    voltage: 415,
    impedance: 0.15,
    systemType: 'three-phase'
  },
  {
    name: 'Lighting Circuit 230V',
    description: 'Commercial lighting circuit',
    voltage: 230,
    impedance: 0.8,
    systemType: 'single-phase'
  }
];

// History management
const HISTORY_KEY = 'short-circuit-history';
const MAX_HISTORY = 50;

export const getHistory = (): HistoryEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveToHistory = (inputs: ShortCircuitInputs, result: ShortCircuitResult): void => {
  if (typeof window === 'undefined') return;
  
  const entry: HistoryEntry = {
    id: generateId(),
    timestamp: Date.now(),
    inputs,
    result
  };
  
  const history = getHistory();
  history.unshift(entry);
  
  // Keep only the latest entries
  const trimmedHistory = history.slice(0, MAX_HISTORY);
  
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.warn('Failed to save to history:', error);
  }
};

export const clearHistory = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.warn('Failed to clear history:', error);
  }
};

// Export functions
export const exportToText = (inputs: ShortCircuitInputs, result: ShortCircuitResult): string => {
  const lines: string[] = [];
  
  lines.push('SHORT CIRCUIT CURRENT CALCULATION REPORT');
  lines.push('=' .repeat(45));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push(`System Type: ${inputs.systemType}`);
  lines.push(`Calculation Mode: ${inputs.calculationMode}`);
  lines.push('');
  
  lines.push('INPUT PARAMETERS:');
  lines.push(`System Voltage: ${formatNumber(inputs.voltage, inputs.precision)} V`);
  lines.push(`System Impedance: ${formatNumber(inputs.impedance, inputs.precision)} Ω`);
  lines.push('');
  
  lines.push('RESULTS:');
  lines.push(`Short Circuit Current: ${result.formattedCurrent}`);
  lines.push(`Fault Level: ${result.faultLevel.toUpperCase()}`);
  if (result.warning) {
    lines.push(`Warning: ${result.warning}`);
  }
  lines.push('');
  
  lines.push('CALCULATION STEPS:');
  result.steps.forEach(step => lines.push(step));
  
  return lines.join('\n');
};

export const downloadFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
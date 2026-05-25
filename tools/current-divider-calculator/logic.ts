import { 
  CurrentDividerInputs, 
  CurrentDividerResult, 
  ResistorInput, 
  BranchCurrent, 
  ResistanceUnit, 
  HistoryEntry, 
  Preset 
} from './types';

// Resistance unit multipliers
export const RESISTANCE_MULTIPLIERS: Record<ResistanceUnit, number> = {
  'Ω': 1,
  'kΩ': 1000,
  'MΩ': 1000000,
};

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Convert resistance to ohms
export const convertToOhms = (value: number, unit: ResistanceUnit): number => {
  return value * RESISTANCE_MULTIPLIERS[unit];
};

// Format number with precision
export const formatNumber = (value: number, precision: number = 2): string => {
  if (isNaN(value) || !isFinite(value)) return '0';
  return value.toFixed(precision);
};

// Format resistance display
export const formatResistance = (ohms: number): { value: number; unit: ResistanceUnit; display: string } => {
  if (ohms >= 1000000) {
    return {
      value: ohms / 1000000,
      unit: 'MΩ',
      display: `${formatNumber(ohms / 1000000, 2)} MΩ`
    };
  } else if (ohms >= 1000) {
    return {
      value: ohms / 1000,
      unit: 'kΩ',
      display: `${formatNumber(ohms / 1000, 2)} kΩ`
    };
  } else {
    return {
      value: ohms,
      unit: 'Ω',
      display: `${formatNumber(ohms, 2)} Ω`
    };
  }
};

// Validate inputs
export const validateInputs = (inputs: CurrentDividerInputs): string | null => {
  if (!inputs.totalCurrent || inputs.totalCurrent <= 0) {
    return 'Total current must be greater than 0';
  }

  if (inputs.resistors.length < 2) {
    return 'At least 2 resistors are required for current division';
  }

  const validResistors = inputs.resistors.filter(r => r.value > 0);
  if (validResistors.length < 2) {
    return 'At least 2 valid resistor values are required';
  }

  if (inputs.totalCurrent > 1000) {
    return 'Total current should be reasonable (≤ 1000A)';
  }

  return null;
};

// Calculate parallel resistance
const calculateParallelResistance = (resistors: ResistorInput[]): number => {
  const validResistors = resistors.filter(r => r.value > 0);
  if (validResistors.length === 0) return 0;

  const reciprocalSum = validResistors.reduce((sum, resistor) => {
    const ohms = convertToOhms(resistor.value, resistor.unit);
    return sum + (1 / ohms);
  }, 0);

  return 1 / reciprocalSum;
};

// Main calculation function
export const calculateCurrentDivider = (inputs: CurrentDividerInputs): CurrentDividerResult => {
  const validResistors = inputs.resistors.filter(r => r.value > 0);
  
  // Calculate total parallel resistance
  const totalResistance = calculateParallelResistance(validResistors);
  
  // Calculate branch currents using current divider rule
  const branchCurrents: BranchCurrent[] = validResistors.map(resistor => {
    const resistanceOhms = convertToOhms(resistor.value, resistor.unit);
    
    // Current divider formula: Ix = Itotal × (Rtotal / Rx)
    // For parallel circuits: Ix = Itotal × (1/Rx) / Σ(1/Ri)
    const conductance = 1 / resistanceOhms;
    const totalConductance = validResistors.reduce((sum, r) => {
      const ohms = convertToOhms(r.value, r.unit);
      return sum + (1 / ohms);
    }, 0);
    
    const current = inputs.totalCurrent * (conductance / totalConductance);
    const percentage = (current / inputs.totalCurrent) * 100;
    const power = Math.pow(current, 2) * resistanceOhms;
    
    const resistanceDisplay = formatResistance(resistanceOhms);
    
    return {
      resistorId: resistor.id,
      resistance: resistanceOhms,
      resistanceDisplay: resistanceDisplay.display,
      current,
      percentage,
      power
    };
  });

  // Calculate total power
  const totalPower = branchCurrents.reduce((sum, branch) => sum + branch.power, 0);
  
  // Validation
  const currentSum = branchCurrents.reduce((sum, branch) => sum + branch.current, 0);
  const percentageError = Math.abs((currentSum - inputs.totalCurrent) / inputs.totalCurrent) * 100;
  
  // Generate calculation steps
  const steps = generateCalculationSteps(inputs, branchCurrents, totalResistance);
  
  return {
    branchCurrents,
    totalCurrent: inputs.totalCurrent,
    totalResistance,
    totalPower,
    steps,
    formula: 'Ix = Itotal × (1/Rx) / Σ(1/Ri)',
    validation: {
      isValid: percentageError < 0.01, // Less than 0.01% error
      currentSum,
      percentageError
    }
  };
};

// Generate calculation steps
const generateCalculationSteps = (
  inputs: CurrentDividerInputs, 
  branchCurrents: BranchCurrent[], 
  totalResistance: number
): string[] => {
  const steps: string[] = [];
  
  steps.push('Current Divider Calculation Steps:');
  steps.push('');
  steps.push(`Given: Total Current (Itotal) = ${formatNumber(inputs.totalCurrent, inputs.precision)} A`);
  steps.push('');
  
  // List resistors
  steps.push('Resistor Values:');
  inputs.resistors.filter(r => r.value > 0).forEach((resistor, index) => {
    const ohms = convertToOhms(resistor.value, resistor.unit);
    const display = formatResistance(ohms);
    steps.push(`R${index + 1} = ${display.display} = ${formatNumber(ohms, 2)} Ω`);
  });
  steps.push('');
  
  // Calculate conductances
  steps.push('Step 1: Calculate conductances (G = 1/R)');
  inputs.resistors.filter(r => r.value > 0).forEach((resistor, index) => {
    const ohms = convertToOhms(resistor.value, resistor.unit);
    const conductance = 1 / ohms;
    steps.push(`G${index + 1} = 1/${formatNumber(ohms, 2)} = ${formatNumber(conductance, 6)} S`);
  });
  steps.push('');
  
  // Total conductance
  const totalConductance = inputs.resistors.filter(r => r.value > 0).reduce((sum, r) => {
    const ohms = convertToOhms(r.value, r.unit);
    return sum + (1 / ohms);
  }, 0);
  
  steps.push('Step 2: Calculate total conductance');
  steps.push(`Gtotal = ${inputs.resistors.filter(r => r.value > 0).map((_, i) => `G${i + 1}`).join(' + ')}`);
  steps.push(`Gtotal = ${formatNumber(totalConductance, 6)} S`);
  steps.push('');
  
  // Branch currents
  steps.push('Step 3: Calculate branch currents using Ix = Itotal × (Gx / Gtotal)');
  branchCurrents.forEach((branch, index) => {
    const conductance = 1 / branch.resistance;
    steps.push(`I${index + 1} = ${formatNumber(inputs.totalCurrent, inputs.precision)} × (${formatNumber(conductance, 6)} / ${formatNumber(totalConductance, 6)})`);
    steps.push(`I${index + 1} = ${formatNumber(branch.current, inputs.precision)} A (${formatNumber(branch.percentage, 1)}%)`);
  });
  steps.push('');
  
  // Verification
  const currentSum = branchCurrents.reduce((sum, branch) => sum + branch.current, 0);
  steps.push('Step 4: Verification');
  steps.push(`Sum of branch currents = ${branchCurrents.map((_, i) => `I${i + 1}`).join(' + ')}`);
  steps.push(`Sum = ${formatNumber(currentSum, inputs.precision)} A`);
  steps.push(`Original total = ${formatNumber(inputs.totalCurrent, inputs.precision)} A`);
  steps.push(`Error = ${formatNumber(Math.abs(currentSum - inputs.totalCurrent), 6)} A`);
  
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
    name: 'Equal Resistors',
    description: 'Two equal 1kΩ resistors',
    totalCurrent: 10,
    resistors: [
      { value: 1, unit: 'kΩ' },
      { value: 1, unit: 'kΩ' }
    ]
  },
  {
    name: '2:1 Ratio',
    description: '5Ω and 10Ω resistors',
    totalCurrent: 10,
    resistors: [
      { value: 5, unit: 'Ω' },
      { value: 10, unit: 'Ω' }
    ]
  },
  {
    name: 'Three Branch',
    description: 'Three different resistors',
    totalCurrent: 12,
    resistors: [
      { value: 3, unit: 'Ω' },
      { value: 6, unit: 'Ω' },
      { value: 6, unit: 'Ω' }
    ]
  },
  {
    name: 'High Current',
    description: 'Low resistance, high current',
    totalCurrent: 100,
    resistors: [
      { value: 100, unit: 'Ω' },
      { value: 200, unit: 'Ω' },
      { value: 300, unit: 'Ω' }
    ]
  }
];

// History management
const HISTORY_KEY = 'current-divider-history';
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

export const saveToHistory = (inputs: CurrentDividerInputs, result: CurrentDividerResult): void => {
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
export const exportToText = (inputs: CurrentDividerInputs, result: CurrentDividerResult): string => {
  const lines: string[] = [];
  
  lines.push('CURRENT DIVIDER CALCULATION REPORT');
  lines.push('=' .repeat(40));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push(`Total Current: ${formatNumber(inputs.totalCurrent, inputs.precision)} A`);
  lines.push('');
  
  lines.push('RESISTOR VALUES:');
  inputs.resistors.filter(r => r.value > 0).forEach((resistor, index) => {
    const ohms = convertToOhms(resistor.value, resistor.unit);
    const display = formatResistance(ohms);
    lines.push(`R${index + 1}: ${display.display}`);
  });
  lines.push('');
  
  lines.push('BRANCH CURRENTS:');
  result.branchCurrents.forEach((branch, index) => {
    lines.push(`I${index + 1}: ${formatNumber(branch.current, inputs.precision)} A (${formatNumber(branch.percentage, 1)}%)`);
    lines.push(`    Resistance: ${branch.resistanceDisplay}`);
    lines.push(`    Power: ${formatNumber(branch.power, 3)} W`);
  });
  lines.push('');
  
  lines.push('SUMMARY:');
  lines.push(`Total Power: ${formatNumber(result.totalPower, 3)} W`);
  lines.push(`Current Sum: ${formatNumber(result.validation.currentSum, inputs.precision)} A`);
  lines.push(`Validation: ${result.validation.isValid ? 'PASSED' : 'FAILED'}`);
  lines.push('');
  
  lines.push('CALCULATION STEPS:');
  result.steps.forEach(step => lines.push(step));
  
  return lines.join('\n');
};

export const exportToCSV = (inputs: CurrentDividerInputs, result: CurrentDividerResult): string => {
  const lines: string[] = [];
  
  lines.push('Branch,Resistance (Ω),Resistance Display,Current (A),Percentage (%),Power (W)');
  
  result.branchCurrents.forEach((branch, index) => {
    lines.push([
      `R${index + 1}`,
      formatNumber(branch.resistance, 2),
      branch.resistanceDisplay,
      formatNumber(branch.current, inputs.precision),
      formatNumber(branch.percentage, 2),
      formatNumber(branch.power, 4)
    ].join(','));
  });
  
  lines.push('');
  lines.push(`Total Current,${formatNumber(inputs.totalCurrent, inputs.precision)} A`);
  lines.push(`Total Power,${formatNumber(result.totalPower, 4)} W`);
  lines.push(`Validation,${result.validation.isValid ? 'PASSED' : 'FAILED'}`);
  
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
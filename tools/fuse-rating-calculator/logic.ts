import { FuseInputs, FuseResult, InputMode, FuseType } from "./types";

// Standard fuse ratings in Amperes
const STANDARD_FUSE_RATINGS = [
  0.5, 1, 1.5, 2, 3, 5, 6, 10, 13, 15, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200
];

export function calculateFuseRating(inputs: FuseInputs): FuseResult {
  const { mode, power, voltage, current, safetyFactor, fuseType } = inputs;
  
  let calculatedCurrent: number;
  let formula: string;
  const steps: string[] = [];

  // Calculate current based on input mode
  if (mode === 'current') {
    calculatedCurrent = current!;
    formula = 'I (given)';
    steps.push('Direct Current Input Mode');
    steps.push('');
    steps.push(`Given: Current = ${calculatedCurrent} A`);
  } else {
    calculatedCurrent = power! / voltage!;
    formula = 'I = P / V';
    steps.push('Power and Voltage Input Mode');
    steps.push('');
    steps.push(`Given: Power = ${power} W, Voltage = ${voltage} V`);
    steps.push('');
    steps.push('Step 1: Calculate Current');
    steps.push(`Formula: I = P / V`);
    steps.push(`I = ${power} / ${voltage}`);
    steps.push(`I = ${calculatedCurrent.toFixed(4)} A`);
  }

  // Apply safety factor
  const adjustedCurrent = calculatedCurrent * safetyFactor;
  
  steps.push('');
  steps.push('Step 2: Apply Safety Factor');
  steps.push(`Safety Factor = ${safetyFactor}`);
  steps.push(`Adjusted Current = ${calculatedCurrent.toFixed(4)} × ${safetyFactor}`);
  steps.push(`Adjusted Current = ${adjustedCurrent.toFixed(4)} A`);

  // Find recommended fuse rating
  const recommendedFuse = STANDARD_FUSE_RATINGS.find(rating => rating >= adjustedCurrent) || STANDARD_FUSE_RATINGS[STANDARD_FUSE_RATINGS.length - 1];
  
  // Find next higher fuse
  const currentIndex = STANDARD_FUSE_RATINGS.indexOf(recommendedFuse);
  const nextHigherFuse = currentIndex < STANDARD_FUSE_RATINGS.length - 1 
    ? STANDARD_FUSE_RATINGS[currentIndex + 1] 
    : undefined;

  // Calculate safety margin
  const safetyMargin = ((recommendedFuse - adjustedCurrent) / adjustedCurrent) * 100;

  steps.push('');
  steps.push('Step 3: Select Standard Fuse Rating');
  steps.push(`Standard Fuse Ratings: ${STANDARD_FUSE_RATINGS.slice(0, 12).join('A, ')}A...`);
  steps.push(`Nearest higher rating: ${recommendedFuse} A`);
  steps.push('');
  steps.push(`Result: ${recommendedFuse}A ${fuseType === 'fast' ? 'Fast Blow' : 'Slow Blow'} Fuse`);

  // Generate warnings
  let warning: string | undefined;
  if (safetyMargin < 10) {
    warning = 'Low safety margin. Consider using the next higher fuse rating for better protection against nuisance blowing.';
  } else if (safetyMargin > 100) {
    warning = 'Very high safety margin. Fuse may not provide adequate protection. Verify your calculations.';
  }

  return {
    calculatedCurrent,
    adjustedCurrent,
    recommendedFuse,
    nextHigherFuse,
    safetyMargin,
    formula,
    steps,
    warning
  };
}

export function validateInputs(inputs: FuseInputs): string | null {
  const { mode, power, voltage, current } = inputs;

  if (mode === 'power_voltage') {
    if (!power || power <= 0) {
      return "Power must be greater than 0";
    }
    if (!voltage || voltage <= 0) {
      return "Voltage must be greater than 0";
    }
    if (isNaN(power) || isNaN(voltage)) {
      return "Please enter valid numbers for power and voltage";
    }
  } else {
    if (!current || current <= 0) {
      return "Current must be greater than 0";
    }
    if (isNaN(current)) {
      return "Please enter a valid number for current";
    }
  }

  return null;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getPresets() {
  return [
    {
      name: 'LED Bulb (10W)',
      description: '10W LED at 220V',
      mode: 'power_voltage' as InputMode,
      power: 10,
      voltage: 220
    },
    {
      name: 'Incandescent Bulb (60W)',
      description: '60W bulb at 220V',
      mode: 'power_voltage' as InputMode,
      power: 60,
      voltage: 220
    },
    {
      name: 'Microwave (1000W)',
      description: '1kW microwave at 220V',
      mode: 'power_voltage' as InputMode,
      power: 1000,
      voltage: 220
    },
    {
      name: 'Electric Kettle (1500W)',
      description: '1.5kW kettle at 220V',
      mode: 'power_voltage' as InputMode,
      power: 1500,
      voltage: 220
    },
    {
      name: 'Air Conditioner (2000W)',
      description: '2kW AC at 220V',
      mode: 'power_voltage' as InputMode,
      power: 2000,
      voltage: 220
    },
    {
      name: 'Water Heater (3000W)',
      description: '3kW heater at 220V',
      mode: 'power_voltage' as InputMode,
      power: 3000,
      voltage: 220
    },
    {
      name: 'US Outlet (15A)',
      description: '15A at 110V',
      mode: 'current' as InputMode,
      current: 15
    },
    {
      name: 'UK Outlet (13A)',
      description: '13A at 230V',
      mode: 'current' as InputMode,
      current: 13
    }
  ];
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// History management
interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FuseInputs;
  result: FuseResult;
}

const HISTORY_KEY = 'fuse-rating-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: FuseInputs, result: FuseResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result
    };
    
    history.unshift(entry);
    
    if (history.length > MAX_HISTORY) {
      history.splice(MAX_HISTORY);
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

export function exportToText(inputs: FuseInputs, result: FuseResult): string {
  const lines: string[] = [];
  
  lines.push('FUSE RATING CALCULATOR - CALCULATION REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('INPUT PARAMETERS:');
  lines.push('-'.repeat(50));
  
  if (inputs.mode === 'power_voltage') {
    lines.push(`Power: ${inputs.power} W`);
    lines.push(`Voltage: ${inputs.voltage} V`);
  } else {
    lines.push(`Current: ${inputs.current} A`);
  }
  
  lines.push(`Safety Factor: ${inputs.safetyFactor}`);
  lines.push(`Fuse Type: ${inputs.fuseType === 'fast' ? 'Fast Blow' : 'Slow Blow'}`);
  lines.push('');
  lines.push('CALCULATION RESULTS:');
  lines.push('-'.repeat(50));
  lines.push(`Calculated Current: ${formatNumber(result.calculatedCurrent, 4)} A`);
  lines.push(`Adjusted Current: ${formatNumber(result.adjustedCurrent, 4)} A`);
  lines.push(`Recommended Fuse: ${result.recommendedFuse} A`);
  
  if (result.nextHigherFuse) {
    lines.push(`Next Higher Fuse: ${result.nextHigherFuse} A`);
  }
  
  lines.push(`Safety Margin: ${formatNumber(result.safetyMargin, 2)}%`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  
  if (result.warning) {
    lines.push('');
    lines.push('WARNING:');
    lines.push('-'.repeat(50));
    lines.push(result.warning);
  }
  
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Fuse Rating Calculator');
  
  return lines.join('\n');
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

export function getStandardFuseRatings(): number[] {
  return STANDARD_FUSE_RATINGS;
}

// Save last used settings
const SETTINGS_KEY = 'fuse-rating-calculator-settings';

export function saveSettings(settings: Partial<FuseInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<FuseInputs> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

import { MotorPowerInputs, MotorPowerResult, MotorPreset, CalculationMode, HistoryEntry } from "./types";

// Motor presets for common scenarios
export const MOTOR_PRESETS: MotorPreset[] = [
  {
    name: "Small Fan Motor",
    description: "Typical ceiling fan motor",
    mode: 'mechanical',
    values: { torque: 0.5, speed: 1400 }
  },
  {
    name: "Pump Motor (0.5 HP)",
    description: "Small water pump",
    mode: 'horsepower',
    values: { horsepower: 0.5 }
  },
  {
    name: "Industrial Motor (3 HP)",
    description: "Medium industrial application",
    mode: 'horsepower',
    values: { horsepower: 3 }
  },
  {
    name: "Conveyor Motor",
    description: "Belt conveyor system",
    mode: 'mechanical',
    values: { torque: 15, speed: 1000 }
  },
  {
    name: "AC Motor (220V, 5A)",
    description: "Standard AC motor",
    mode: 'electrical',
    values: { voltage: 220, current: 5, efficiency: 0.85 }
  },
  {
    name: "DC Motor (24V, 10A)",
    description: "DC motor application",
    mode: 'electrical',
    values: { voltage: 24, current: 10, efficiency: 0.90 }
  }
];

// Calculate motor power based on mode
export function calculateMotorPower(inputs: MotorPowerInputs): MotorPowerResult {
  const steps: string[] = [];
  let powerWatts = 0;
  
  steps.push('Electric Motor Power Calculation');
  steps.push('');
  
  switch (inputs.mode) {
    case 'mechanical':
      if (inputs.mechanical) {
        powerWatts = calculateMechanicalPower(inputs.mechanical, steps);
      }
      break;
    case 'electrical':
      if (inputs.electrical) {
        powerWatts = calculateElectricalPower(inputs.electrical, steps);
      }
      break;
    case 'horsepower':
      if (inputs.horsepower) {
        powerWatts = calculateFromHorsepower(inputs.horsepower, steps);
      }
      break;
  }
  
  const powerKW = powerWatts / 1000;
  const powerHP = powerWatts / 746;
  
  steps.push('');
  steps.push('Final Results:');
  steps.push(`Power = ${formatNumber(powerWatts, 2)} W`);
  steps.push(`Power = ${formatNumber(powerKW, 3)} kW`);
  steps.push(`Power = ${formatNumber(powerHP, 3)} HP`);
  
  return {
    powerWatts,
    powerKW,
    powerHP,
    steps
  };
}

// Calculate power from torque and speed (mechanical)
function calculateMechanicalPower(inputs: { torque: number; speed: number }, steps: string[]): number {
  const { torque, speed } = inputs;
  
  steps.push('Mode: Mechanical (Torque + Speed)');
  steps.push('');
  steps.push('Formula: P = (2 × π × N × T) / 60');
  steps.push('Where:');
  steps.push('  P = Power (Watts)');
  steps.push('  N = Speed (RPM)');
  steps.push('  T = Torque (Nm)');
  steps.push('  π = 3.14159');
  steps.push('');
  steps.push('Given Values:');
  steps.push(`  Torque (T) = ${torque} Nm`);
  steps.push(`  Speed (N) = ${speed} RPM`);
  steps.push('');
  steps.push('Calculation:');
  steps.push(`P = (2 × π × ${speed} × ${torque}) / 60`);
  steps.push(`P = (2 × 3.14159 × ${speed} × ${torque}) / 60`);
  
  const power = (2 * Math.PI * speed * torque) / 60;
  
  steps.push(`P = ${formatNumber(power, 2)} W`);
  
  return power;
}

// Calculate power from voltage, current, and efficiency (electrical)
function calculateElectricalPower(inputs: { voltage: number; current: number; efficiency: number }, steps: string[]): number {
  let { voltage, current, efficiency } = inputs;
  
  // If efficiency > 1, treat as percentage
  if (efficiency > 1) {
    efficiency = efficiency / 100;
  }
  
  steps.push('Mode: Electrical (Voltage + Current)');
  steps.push('');
  steps.push('Formula: P = V × I × η');
  steps.push('Where:');
  steps.push('  P = Power (Watts)');
  steps.push('  V = Voltage (Volts)');
  steps.push('  I = Current (Amperes)');
  steps.push('  η = Efficiency (0 to 1)');
  steps.push('');
  steps.push('Given Values:');
  steps.push(`  Voltage (V) = ${voltage} V`);
  steps.push(`  Current (I) = ${current} A`);
  steps.push(`  Efficiency (η) = ${efficiency} (${(efficiency * 100).toFixed(0)}%)`);
  steps.push('');
  steps.push('Calculation:');
  steps.push(`P = ${voltage} × ${current} × ${efficiency}`);
  
  const power = voltage * current * efficiency;
  
  steps.push(`P = ${formatNumber(power, 2)} W`);
  
  return power;
}

// Calculate power from horsepower
function calculateFromHorsepower(inputs: { horsepower: number }, steps: string[]): number {
  const { horsepower } = inputs;
  
  steps.push('Mode: Horsepower Conversion');
  steps.push('');
  steps.push('Formula: P (W) = HP × 746');
  steps.push('Where:');
  steps.push('  P = Power (Watts)');
  steps.push('  HP = Horsepower');
  steps.push('  1 HP = 746 Watts');
  steps.push('');
  steps.push('Given Values:');
  steps.push(`  Horsepower = ${horsepower} HP`);
  steps.push('');
  steps.push('Calculation:');
  steps.push(`P = ${horsepower} × 746`);
  
  const power = horsepower * 746;
  
  steps.push(`P = ${formatNumber(power, 2)} W`);
  
  return power;
}

// Validate inputs based on mode
export function validateInputs(inputs: MotorPowerInputs): string | null {
  switch (inputs.mode) {
    case 'mechanical':
      if (!inputs.mechanical) return "Please provide torque and speed values";
      const { torque, speed } = inputs.mechanical;
      if (!torque || torque <= 0) return "Torque must be greater than 0";
      if (!speed || speed <= 0) return "Speed must be greater than 0";
      if (speed > 100000) return "Speed exceeds reasonable limits (max 100,000 RPM)";
      break;
      
    case 'electrical':
      if (!inputs.electrical) return "Please provide voltage, current, and efficiency values";
      const { voltage, current, efficiency } = inputs.electrical;
      if (!voltage || voltage <= 0) return "Voltage must be greater than 0";
      if (!current || current <= 0) return "Current must be greater than 0";
      if (!efficiency || efficiency <= 0) return "Efficiency must be greater than 0";
      if (efficiency > 100) return "Efficiency cannot exceed 100%";
      break;
      
    case 'horsepower':
      if (!inputs.horsepower) return "Please provide horsepower value";
      const { horsepower } = inputs.horsepower;
      if (!horsepower || horsepower <= 0) return "Horsepower must be greater than 0";
      break;
  }
  
  return null;
}

// Format number with decimals
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// Debounce function
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
const HISTORY_KEY = 'electric-motor-power-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: MotorPowerInputs, result: MotorPowerResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs: JSON.parse(JSON.stringify(inputs)),
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
  try {
    if (typeof window === 'undefined') return [];
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
export function exportToText(inputs: MotorPowerInputs, result: MotorPowerResult): string {
  const lines: string[] = [];
  
  lines.push('ELECTRIC MOTOR POWER CALCULATOR - REPORT');
  lines.push('='.repeat(50));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('CALCULATION MODE:');
  lines.push('-'.repeat(50));
  lines.push(`Mode: ${getModeLabel(inputs.mode)}`);
  lines.push('');
  
  lines.push('INPUT PARAMETERS:');
  lines.push('-'.repeat(50));
  
  switch (inputs.mode) {
    case 'mechanical':
      if (inputs.mechanical) {
        lines.push(`Torque: ${inputs.mechanical.torque} Nm`);
        lines.push(`Speed: ${inputs.mechanical.speed} RPM`);
      }
      break;
    case 'electrical':
      if (inputs.electrical) {
        lines.push(`Voltage: ${inputs.electrical.voltage} V`);
        lines.push(`Current: ${inputs.electrical.current} A`);
        lines.push(`Efficiency: ${(inputs.electrical.efficiency * 100).toFixed(0)}%`);
      }
      break;
    case 'horsepower':
      if (inputs.horsepower) {
        lines.push(`Horsepower: ${inputs.horsepower.horsepower} HP`);
      }
      break;
  }
  
  lines.push('');
  lines.push('CALCULATED POWER:');
  lines.push('-'.repeat(50));
  lines.push(`Power: ${formatNumber(result.powerWatts, 2)} W`);
  lines.push(`Power: ${formatNumber(result.powerKW, 3)} kW`);
  lines.push(`Power: ${formatNumber(result.powerHP, 3)} HP`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(50));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(50));
  lines.push('Generated by Electric Motor Power Calculator');
  
  return lines.join('\n');
}

// Export to CSV
export function exportToCSV(inputs: MotorPowerInputs, result: MotorPowerResult): string {
  let csv = 'Electric Motor Power Calculation Report\n\n';
  csv += 'Parameter,Value\n';
  csv += `Mode,${getModeLabel(inputs.mode)}\n`;
  
  switch (inputs.mode) {
    case 'mechanical':
      if (inputs.mechanical) {
        csv += `Torque (Nm),${inputs.mechanical.torque}\n`;
        csv += `Speed (RPM),${inputs.mechanical.speed}\n`;
      }
      break;
    case 'electrical':
      if (inputs.electrical) {
        csv += `Voltage (V),${inputs.electrical.voltage}\n`;
        csv += `Current (A),${inputs.electrical.current}\n`;
        csv += `Efficiency (%),${(inputs.electrical.efficiency * 100).toFixed(0)}\n`;
      }
      break;
    case 'horsepower':
      if (inputs.horsepower) {
        csv += `Horsepower (HP),${inputs.horsepower.horsepower}\n`;
      }
      break;
  }
  
  csv += '\n';
  csv += 'Results\n';
  csv += `Power (W),${formatNumber(result.powerWatts, 2)}\n`;
  csv += `Power (kW),${formatNumber(result.powerKW, 3)}\n`;
  csv += `Power (HP),${formatNumber(result.powerHP, 3)}\n`;
  
  return csv;
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

// Get mode label
function getModeLabel(mode: CalculationMode): string {
  switch (mode) {
    case 'mechanical': return 'Mechanical (Torque + Speed)';
    case 'electrical': return 'Electrical (Voltage + Current)';
    case 'horsepower': return 'Horsepower Conversion';
    default: return 'Unknown';
  }
}

// Save last used settings
const SETTINGS_KEY = 'electric-motor-power-calculator-settings';

export function saveSettings(settings: Partial<MotorPowerInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<MotorPowerInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

// Convert units
export function wattsToKW(watts: number): number {
  return watts / 1000;
}

export function wattsToHP(watts: number): number {
  return watts / 746;
}

export function kwToWatts(kw: number): number {
  return kw * 1000;
}

export function hpToWatts(hp: number): number {
  return hp * 746;
}

export function kwToHP(kw: number): number {
  return (kw * 1000) / 746;
}

export function hpToKW(hp: number): number {
  return (hp * 746) / 1000;
}

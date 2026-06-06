import { PWMInputs, PWMResult, HistoryEntry, TimeUnit, CalculationMode } from "./types";

// Convert time to seconds
export function convertToSeconds(value: number, unit: TimeUnit): number {
  switch (unit) {
    case 'us':
      return value / 1000000;
    case 'ms':
      return value / 1000;
    case 's':
      return value;
  }
}

// Convert seconds to specified unit
export function convertFromSeconds(value: number, unit: TimeUnit): number {
  switch (unit) {
    case 'us':
      return value * 1000000;
    case 'ms':
      return value * 1000;
    case 's':
      return value;
  }
}

// Get unit label
export function getUnitLabel(unit: TimeUnit): string {
  switch (unit) {
    case 'us':
      return 'µs';
    case 'ms':
      return 'ms';
    case 's':
      return 's';
  }
}

// Calculate PWM parameters
export function calculatePWM(inputs: PWMInputs): PWMResult {
  const { mode, onTime, offTime, dutyCycle, frequency, period, unit } = inputs;
  const steps: string[] = [];
  
  steps.push('PWM CALCULATION');
  steps.push('');
  
  let resultOnTime: number;
  let resultOffTime: number;
  let resultPeriod: number;
  let resultFrequency: number;
  let resultDutyCycle: number;
  
  if (mode === 'dutyCycle') {
    // Calculate duty cycle from ON and OFF time
    steps.push('Mode: Calculate Duty Cycle');
    steps.push('');
    steps.push('Given Values:');
    steps.push(`ON Time: ${onTime} ${getUnitLabel(unit)}`);
    steps.push(`OFF Time: ${offTime} ${getUnitLabel(unit)}`);
    steps.push('');
    
    const onTimeSec = convertToSeconds(onTime, unit);
    const offTimeSec = convertToSeconds(offTime, unit);
    
    resultOnTime = onTime;
    resultOffTime = offTime;
    resultPeriod = onTime + offTime;
    const periodSec = onTimeSec + offTimeSec;
    
    steps.push('Step 1: Calculate Period');
    steps.push('Formula: Period = ON Time + OFF Time');
    steps.push(`Period = ${onTime} + ${offTime} = ${resultPeriod} ${getUnitLabel(unit)}`);
    steps.push('');
    
    resultDutyCycle = (onTimeSec / periodSec) * 100;
    
    steps.push('Step 2: Calculate Duty Cycle');
    steps.push('Formula: Duty Cycle (%) = (ON Time / Period) × 100');
    steps.push(`Duty Cycle = (${onTime} / ${resultPeriod}) × 100`);
    steps.push(`Duty Cycle = ${formatNumber(resultDutyCycle, 2)}%`);
    steps.push('');
    
    resultFrequency = 1 / periodSec;
    
    steps.push('Step 3: Calculate Frequency');
    steps.push('Formula: Frequency (Hz) = 1 / Period (s)');
    steps.push(`Frequency = 1 / ${formatNumber(periodSec, 6)}`);
    steps.push(`Frequency = ${formatNumber(resultFrequency, 2)} Hz`);
    
  } else if (mode === 'onOffTime') {
    // Calculate ON/OFF time from duty cycle and frequency/period
    steps.push('Mode: Calculate ON/OFF Time');
    steps.push('');
    steps.push('Given Values:');
    steps.push(`Duty Cycle: ${dutyCycle}%`);
    
    let periodSec: number;
    
    if (frequency > 0) {
      steps.push(`Frequency: ${frequency} Hz`);
      steps.push('');
      
      steps.push('Step 1: Calculate Period');
      steps.push('Formula: Period (s) = 1 / Frequency (Hz)');
      steps.push(`Period = 1 / ${frequency}`);
      periodSec = 1 / frequency;
      steps.push(`Period = ${formatNumber(periodSec, 6)} s`);
      resultPeriod = convertFromSeconds(periodSec, unit);
      steps.push(`Period = ${formatNumber(resultPeriod, 6)} ${getUnitLabel(unit)}`);
    } else {
      steps.push(`Period: ${period} ${getUnitLabel(unit)}`);
      steps.push('');
      periodSec = convertToSeconds(period, unit);
      resultPeriod = period;
    }
    
    steps.push('');
    steps.push('Step 2: Calculate ON Time');
    steps.push('Formula: ON Time = (Duty Cycle / 100) × Period');
    steps.push(`ON Time = (${dutyCycle} / 100) × ${formatNumber(resultPeriod, 6)}`);
    
    const onTimeSec = (dutyCycle / 100) * periodSec;
    resultOnTime = convertFromSeconds(onTimeSec, unit);
    
    steps.push(`ON Time = ${formatNumber(resultOnTime, 6)} ${getUnitLabel(unit)}`);
    steps.push('');
    
    steps.push('Step 3: Calculate OFF Time');
    steps.push('Formula: OFF Time = Period - ON Time');
    steps.push(`OFF Time = ${formatNumber(resultPeriod, 6)} - ${formatNumber(resultOnTime, 6)}`);
    
    resultOffTime = resultPeriod - resultOnTime;
    
    steps.push(`OFF Time = ${formatNumber(resultOffTime, 6)} ${getUnitLabel(unit)}`);
    steps.push('');
    
    resultDutyCycle = dutyCycle;
    resultFrequency = 1 / periodSec;
    
    steps.push('Step 4: Calculate Frequency');
    steps.push(`Frequency = 1 / ${formatNumber(periodSec, 6)}`);
    steps.push(`Frequency = ${formatNumber(resultFrequency, 2)} Hz`);
    
  } else {
    // Calculate frequency/period from ON and OFF time
    steps.push('Mode: Calculate Frequency/Period');
    steps.push('');
    steps.push('Given Values:');
    steps.push(`ON Time: ${onTime} ${getUnitLabel(unit)}`);
    steps.push(`OFF Time: ${offTime} ${getUnitLabel(unit)}`);
    steps.push('');
    
    const onTimeSec = convertToSeconds(onTime, unit);
    const offTimeSec = convertToSeconds(offTime, unit);
    
    resultOnTime = onTime;
    resultOffTime = offTime;
    resultPeriod = onTime + offTime;
    const periodSec = onTimeSec + offTimeSec;
    
    steps.push('Step 1: Calculate Period');
    steps.push('Formula: Period = ON Time + OFF Time');
    steps.push(`Period = ${onTime} + ${offTime} = ${resultPeriod} ${getUnitLabel(unit)}`);
    steps.push(`Period = ${formatNumber(periodSec, 6)} s`);
    steps.push('');
    
    resultFrequency = 1 / periodSec;
    
    steps.push('Step 2: Calculate Frequency');
    steps.push('Formula: Frequency (Hz) = 1 / Period (s)');
    steps.push(`Frequency = 1 / ${formatNumber(periodSec, 6)}`);
    steps.push(`Frequency = ${formatNumber(resultFrequency, 2)} Hz`);
    steps.push('');
    
    resultDutyCycle = (onTimeSec / periodSec) * 100;
    
    steps.push('Step 3: Calculate Duty Cycle');
    steps.push('Formula: Duty Cycle (%) = (ON Time / Period) × 100');
    steps.push(`Duty Cycle = (${onTime} / ${resultPeriod}) × 100`);
    steps.push(`Duty Cycle = ${formatNumber(resultDutyCycle, 2)}%`);
  }

  return {
    dutyCycle: resultDutyCycle,
    onTime: resultOnTime,
    offTime: resultOffTime,
    frequency: resultFrequency,
    period: resultPeriod,
    steps
  };
}

// Validate inputs
export function validateInputs(inputs: PWMInputs): string | null {
  const { mode, onTime, offTime, dutyCycle, frequency, period } = inputs;
  
  if (mode === 'dutyCycle') {
    if (!onTime || onTime <= 0) {
      return "ON time must be greater than 0";
    }
    if (!offTime || offTime <= 0) {
      return "OFF time must be greater than 0";
    }
  } else if (mode === 'onOffTime') {
    if (!dutyCycle || dutyCycle <= 0 || dutyCycle >= 100) {
      return "Duty cycle must be between 0 and 100%";
    }
    if (frequency <= 0 && period <= 0) {
      return "Either frequency or period must be greater than 0";
    }
  } else if (mode === 'frequency') {
    if (!onTime || onTime <= 0) {
      return "ON time must be greater than 0";
    }
    if (!offTime || offTime <= 0) {
      return "OFF time must be greater than 0";
    }
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

// PWM presets
export function getPWMPresets() {
  return [
    {
      name: "25% Duty Cycle",
      description: "1kHz PWM at 25%",
      mode: 'dutyCycle' as CalculationMode,
      onTime: 0.25,
      offTime: 0.75,
      unit: 'ms' as TimeUnit
    },
    {
      name: "50% Duty Cycle",
      description: "1kHz PWM at 50%",
      mode: 'dutyCycle' as CalculationMode,
      onTime: 0.5,
      offTime: 0.5,
      unit: 'ms' as TimeUnit
    },
    {
      name: "75% Duty Cycle",
      description: "1kHz PWM at 75%",
      mode: 'dutyCycle' as CalculationMode,
      onTime: 0.75,
      offTime: 0.25,
      unit: 'ms' as TimeUnit
    },
    {
      name: "Arduino PWM (490Hz)",
      description: "Default Arduino PWM",
      mode: 'dutyCycle' as CalculationMode,
      onTime: 1.02,
      offTime: 1.02,
      unit: 'ms' as TimeUnit
    },
    {
      name: "Servo Control (50Hz)",
      description: "Standard servo PWM",
      mode: 'dutyCycle' as CalculationMode,
      onTime: 1.5,
      offTime: 18.5,
      unit: 'ms' as TimeUnit
    },
    {
      name: "LED Dimming (1kHz)",
      description: "LED brightness control",
      mode: 'onOffTime' as CalculationMode,
      dutyCycle: 30,
      frequency: 1000,
      unit: 'ms' as TimeUnit
    }
  ];
}

// History management
const HISTORY_KEY = 'pwm-duty-cycle-calculator-history';
const MAX_HISTORY = 20;

export function saveToHistory(inputs: PWMInputs, result: PWMResult): void {
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
export function exportToText(inputs: PWMInputs, result: PWMResult): string {
  const lines: string[] = [];
  
  lines.push('PWM DUTY CYCLE CALCULATOR - REPORT');
  lines.push('='.repeat(60));
  lines.push('');
  lines.push(`Date: ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('RESULTS:');
  lines.push('-'.repeat(60));
  lines.push(`Duty Cycle: ${formatNumber(result.dutyCycle, 2)}%`);
  lines.push(`ON Time: ${formatNumber(result.onTime, 6)} ${getUnitLabel(inputs.unit)}`);
  lines.push(`OFF Time: ${formatNumber(result.offTime, 6)} ${getUnitLabel(inputs.unit)}`);
  lines.push(`Period: ${formatNumber(result.period, 6)} ${getUnitLabel(inputs.unit)}`);
  lines.push(`Frequency: ${formatNumber(result.frequency, 2)} Hz`);
  lines.push('');
  lines.push('CALCULATION STEPS:');
  lines.push('-'.repeat(60));
  result.steps.forEach(step => lines.push(step));
  lines.push('');
  lines.push('='.repeat(60));
  lines.push('Generated by PWM Duty Cycle Calculator');
  
  return lines.join('\n');
}

// Export to CSV
export function exportToCSV(inputs: PWMInputs, result: PWMResult): string {
  let csv = 'PWM Duty Cycle Calculation Report\n\n';
  csv += 'Parameter,Value,Unit\n';
  csv += `Duty Cycle,${formatNumber(result.dutyCycle, 2)},%\n`;
  csv += `ON Time,${formatNumber(result.onTime, 6)},${getUnitLabel(inputs.unit)}\n`;
  csv += `OFF Time,${formatNumber(result.offTime, 6)},${getUnitLabel(inputs.unit)}\n`;
  csv += `Period,${formatNumber(result.period, 6)},${getUnitLabel(inputs.unit)}\n`;
  csv += `Frequency,${formatNumber(result.frequency, 2)},Hz\n`;
  
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

// Save last used settings
const SETTINGS_KEY = 'pwm-duty-cycle-calculator-settings';

export function saveSettings(settings: Partial<PWMInputs>): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): Partial<PWMInputs> {
  try {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

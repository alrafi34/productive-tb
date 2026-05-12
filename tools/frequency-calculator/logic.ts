import { FrequencyInputs, FrequencyResult, FrequencyUnit, TimeUnit, CalculationMode } from "./types";

// Convert frequency to Hz
export function normalizeFrequency(value: number, unit: FrequencyUnit): number {
  switch (unit) {
    case 'khz':
      return value * 1000;
    case 'mhz':
      return value * 1000000;
    default:
      return value;
  }
}

// Convert time to seconds
export function normalizeTime(value: number, unit: TimeUnit): number {
  switch (unit) {
    case 'ms':
      return value / 1000;
    case 'us':
      return value / 1000000;
    default:
      return value;
  }
}

// Get unit label
export function getFrequencyUnitLabel(unit: FrequencyUnit): string {
  switch (unit) {
    case 'khz':
      return 'kHz';
    case 'mhz':
      return 'MHz';
    default:
      return 'Hz';
  }
}

export function getTimeUnitLabel(unit: TimeUnit): string {
  switch (unit) {
    case 'ms':
      return 'ms';
    case 'us':
      return 'µs';
    default:
      return 's';
  }
}

// Format number with precision
export function formatNumber(value: number, decimals: number = 6): string {
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
export function validateInputs(inputs: FrequencyInputs): string | null {
  const { mode, frequency, timePeriod } = inputs;

  if (mode === 'period-to-frequency') {
    if (timePeriod === undefined || timePeriod === null) {
      return "Time period is required";
    }
    if (timePeriod <= 0) {
      return "Time period must be greater than zero";
    }
  } else {
    if (frequency === undefined || frequency === null) {
      return "Frequency is required";
    }
    if (frequency <= 0) {
      return "Frequency must be greater than zero";
    }
  }

  return null;
}

// Calculate frequency and time period
export function calculateFrequency(inputs: FrequencyInputs): FrequencyResult {
  const { 
    mode, 
    frequency, 
    frequencyUnit = 'hz', 
    timePeriod, 
    timeUnit = 's',
    precision = 6
  } = inputs;

  if (mode === 'period-to-frequency') {
    return calculateFromTimePeriod(timePeriod!, timeUnit, frequencyUnit, precision);
  } else {
    return calculateFromFrequency(frequency!, frequencyUnit, timeUnit, precision);
  }
}

// Calculate frequency from time period: f = 1/T
function calculateFromTimePeriod(
  timePeriod: number, 
  timeUnit: TimeUnit, 
  frequencyUnit: FrequencyUnit,
  precision: number
): FrequencyResult {
  const timePeriodSeconds = normalizeTime(timePeriod, timeUnit);
  const frequencyHz = 1 / timePeriodSeconds;
  
  // Convert to display unit
  let frequency = frequencyHz;
  if (frequencyUnit === 'khz') {
    frequency = frequencyHz / 1000;
  } else if (frequencyUnit === 'mhz') {
    frequency = frequencyHz / 1000000;
  }

  const steps = [
    "Calculate Frequency from Time Period",
    "",
    `Given:`,
    `  Time Period (T) = ${timePeriod} ${getTimeUnitLabel(timeUnit)}`,
    `  T = ${formatNumber(timePeriodSeconds, precision)} seconds`,
    "",
    `Formula:`,
    `  f = 1 / T`,
    "",
    `Step 1: Apply Formula`,
    `  f = 1 / ${formatNumber(timePeriodSeconds, precision)}`,
    `  f = ${formatNumber(frequencyHz, precision)} Hz`,
    "",
    `Step 2: Convert to Display Unit`,
    `  f = ${formatNumber(frequency, precision)} ${getFrequencyUnitLabel(frequencyUnit)}`,
  ];

  return {
    frequency,
    frequencyHz,
    timePeriod,
    timePeriodSeconds,
    formula: "f = 1 / T",
    steps,
    mode: 'period-to-frequency',
  };
}

// Calculate time period from frequency: T = 1/f
function calculateFromFrequency(
  frequency: number, 
  frequencyUnit: FrequencyUnit, 
  timeUnit: TimeUnit,
  precision: number
): FrequencyResult {
  const frequencyHz = normalizeFrequency(frequency, frequencyUnit);
  const timePeriodSeconds = 1 / frequencyHz;
  
  // Convert to display unit
  let timePeriod = timePeriodSeconds;
  if (timeUnit === 'ms') {
    timePeriod = timePeriodSeconds * 1000;
  } else if (timeUnit === 'us') {
    timePeriod = timePeriodSeconds * 1000000;
  }

  const steps = [
    "Calculate Time Period from Frequency",
    "",
    `Given:`,
    `  Frequency (f) = ${frequency} ${getFrequencyUnitLabel(frequencyUnit)}`,
    `  f = ${formatNumber(frequencyHz, precision)} Hz`,
    "",
    `Formula:`,
    `  T = 1 / f`,
    "",
    `Step 1: Apply Formula`,
    `  T = 1 / ${formatNumber(frequencyHz, precision)}`,
    `  T = ${formatNumber(timePeriodSeconds, precision)} seconds`,
    "",
    `Step 2: Convert to Display Unit`,
    `  T = ${formatNumber(timePeriod, precision)} ${getTimeUnitLabel(timeUnit)}`,
  ];

  return {
    frequency,
    frequencyHz,
    timePeriod,
    timePeriodSeconds,
    formula: "T = 1 / f",
    steps,
    mode: 'frequency-to-period',
  };
}

// Get presets based on mode
export function getPresets(mode: CalculationMode) {
  if (mode === 'period-to-frequency') {
    return [
      {
        name: "50 Hz (AC Power)",
        description: "Standard AC frequency in many countries",
        timePeriod: 0.02,
        timeUnit: 's' as TimeUnit,
      },
      {
        name: "60 Hz (AC Power)",
        description: "Standard AC frequency in North America",
        timePeriod: 0.0167,
        timeUnit: 's' as TimeUnit,
      },
      {
        name: "1 kHz (Audio)",
        description: "Common audio test frequency",
        timePeriod: 1,
        timeUnit: 'ms' as TimeUnit,
      },
      {
        name: "1 MHz (Radio)",
        description: "Medium wave radio frequency",
        timePeriod: 1,
        timeUnit: 'us' as TimeUnit,
      },
    ];
  } else {
    return [
      {
        name: "50 Hz (AC Power)",
        description: "Standard AC frequency in many countries",
        frequency: 50,
        frequencyUnit: 'hz' as FrequencyUnit,
      },
      {
        name: "60 Hz (AC Power)",
        description: "Standard AC frequency in North America",
        frequency: 60,
        frequencyUnit: 'hz' as FrequencyUnit,
      },
      {
        name: "1 kHz (Audio)",
        description: "Common audio test frequency",
        frequency: 1,
        frequencyUnit: 'khz' as FrequencyUnit,
      },
      {
        name: "1 MHz (Radio)",
        description: "Medium wave radio frequency",
        frequency: 1,
        frequencyUnit: 'mhz' as FrequencyUnit,
      },
    ];
  }
}

// History management
const HISTORY_KEY = 'frequency-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FrequencyInputs;
  result: FrequencyResult;
}

export function saveToHistory(inputs: FrequencyInputs, result: FrequencyResult): void {
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
export function exportToText(inputs: FrequencyInputs, result: FrequencyResult): string {
  const lines = [
    "Frequency Calculator - Calculation Report",
    "=".repeat(50),
    "",
    `Mode: ${result.mode === 'period-to-frequency' ? 'Time Period → Frequency' : 'Frequency → Time Period'}`,
    `Date: ${new Date().toLocaleString()}`,
    "",
    "RESULTS:",
    "-".repeat(50),
    `Frequency: ${formatNumber(result.frequency, inputs.precision || 6)} ${getFrequencyUnitLabel(inputs.frequencyUnit || 'hz')}`,
    `Frequency (Hz): ${formatNumber(result.frequencyHz, inputs.precision || 6)} Hz`,
    `Time Period: ${formatNumber(result.timePeriod, inputs.precision || 6)} ${getTimeUnitLabel(inputs.timeUnit || 's')}`,
    `Time Period (s): ${formatNumber(result.timePeriodSeconds, inputs.precision || 6)} s`,
    `Formula: ${result.formula}`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50),
    ...result.steps,
    "",
    "=".repeat(50),
    "Generated by Frequency Calculator",
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

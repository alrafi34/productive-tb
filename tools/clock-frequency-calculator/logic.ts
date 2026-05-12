import { ClockFrequencyInputs, ClockFrequencyResult, FrequencyUnit, TimeUnit, CalculationMode } from "./types";

// Convert frequency to Hz
export function normalizeFrequency(value: number, unit: FrequencyUnit): number {
  switch (unit) {
    case 'khz':
      return value * 1000;
    case 'mhz':
      return value * 1000000;
    case 'ghz':
      return value * 1000000000;
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
    case 'ns':
      return value / 1000000000;
    default:
      return value;
  }
}

// Convert Hz to display unit
export function convertFrequency(hz: number, unit: FrequencyUnit): number {
  switch (unit) {
    case 'khz':
      return hz / 1000;
    case 'mhz':
      return hz / 1000000;
    case 'ghz':
      return hz / 1000000000;
    default:
      return hz;
  }
}

// Convert seconds to display unit
export function convertTime(seconds: number, unit: TimeUnit): number {
  switch (unit) {
    case 'ms':
      return seconds * 1000;
    case 'us':
      return seconds * 1000000;
    case 'ns':
      return seconds * 1000000000;
    default:
      return seconds;
  }
}

// Get unit label
export function getFrequencyUnitLabel(unit: FrequencyUnit): string {
  switch (unit) {
    case 'khz':
      return 'kHz';
    case 'mhz':
      return 'MHz';
    case 'ghz':
      return 'GHz';
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
    case 'ns':
      return 'ns';
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
export function validateInputs(inputs: ClockFrequencyInputs): string | null {
  const { mode, frequency, period, cycles, executionTime } = inputs;

  if (mode === 'period-to-frequency') {
    if (period === undefined || period === null) {
      return "Clock period is required";
    }
    if (period <= 0) {
      return "Clock period must be greater than zero";
    }
  } else if (mode === 'frequency-to-period') {
    if (frequency === undefined || frequency === null) {
      return "Clock frequency is required";
    }
    if (frequency <= 0) {
      return "Clock frequency must be greater than zero";
    }
  } else if (mode === 'cycles-time') {
    if (cycles === undefined || cycles === null) {
      return "Number of cycles is required";
    }
    if (cycles <= 0) {
      return "Number of cycles must be greater than zero";
    }
    if (frequency === undefined || frequency === null) {
      return "Clock frequency is required";
    }
    if (frequency <= 0) {
      return "Clock frequency must be greater than zero";
    }
  } else if (mode === 'time-cycles') {
    if (executionTime === undefined || executionTime === null) {
      return "Execution time is required";
    }
    if (executionTime <= 0) {
      return "Execution time must be greater than zero";
    }
    if (frequency === undefined || frequency === null) {
      return "Clock frequency is required";
    }
    if (frequency <= 0) {
      return "Clock frequency must be greater than zero";
    }
  }

  return null;
}

// Calculate clock frequency and related values
export function calculateClockFrequency(inputs: ClockFrequencyInputs): ClockFrequencyResult {
  const { 
    mode, 
    frequency, 
    frequencyUnit = 'hz', 
    period, 
    periodUnit = 's',
    cycles,
    executionTime,
    executionTimeUnit = 's',
    precision = 6
  } = inputs;

  if (mode === 'period-to-frequency') {
    return calculateFromPeriod(period!, periodUnit, frequencyUnit, precision);
  } else if (mode === 'frequency-to-period') {
    return calculateFromFrequency(frequency!, frequencyUnit, periodUnit, precision);
  } else if (mode === 'cycles-time') {
    return calculateExecutionTime(cycles!, frequency!, frequencyUnit, executionTimeUnit, precision);
  } else {
    return calculateCycles(executionTime!, executionTimeUnit, frequency!, frequencyUnit, precision);
  }
}

// Calculate frequency from period: f = 1/T
function calculateFromPeriod(
  period: number, 
  periodUnit: TimeUnit, 
  frequencyUnit: FrequencyUnit,
  precision: number
): ClockFrequencyResult {
  const periodSeconds = normalizeTime(period, periodUnit);
  const frequencyHz = 1 / periodSeconds;
  const frequency = convertFrequency(frequencyHz, frequencyUnit);

  const steps = [
    "Calculate Clock Frequency from Period",
    "",
    `Given:`,
    `  Clock Period (T) = ${period} ${getTimeUnitLabel(periodUnit)}`,
    `  T = ${formatNumber(periodSeconds, precision)} seconds`,
    "",
    `Formula:`,
    `  f = 1 / T`,
    "",
    `Step 1: Apply Formula`,
    `  f = 1 / ${formatNumber(periodSeconds, precision)}`,
    `  f = ${formatNumber(frequencyHz, precision)} Hz`,
    "",
    `Step 2: Convert to Display Unit`,
    `  f = ${formatNumber(frequency, precision)} ${getFrequencyUnitLabel(frequencyUnit)}`,
  ];

  return {
    mode: 'period-to-frequency',
    frequency,
    frequencyHz,
    period,
    periodSeconds,
    formula: "f = 1 / T",
    steps,
  };
}

// Calculate period from frequency: T = 1/f
function calculateFromFrequency(
  frequency: number, 
  frequencyUnit: FrequencyUnit, 
  periodUnit: TimeUnit,
  precision: number
): ClockFrequencyResult {
  const frequencyHz = normalizeFrequency(frequency, frequencyUnit);
  const periodSeconds = 1 / frequencyHz;
  const period = convertTime(periodSeconds, periodUnit);

  const steps = [
    "Calculate Clock Period from Frequency",
    "",
    `Given:`,
    `  Clock Frequency (f) = ${frequency} ${getFrequencyUnitLabel(frequencyUnit)}`,
    `  f = ${formatNumber(frequencyHz, precision)} Hz`,
    "",
    `Formula:`,
    `  T = 1 / f`,
    "",
    `Step 1: Apply Formula`,
    `  T = 1 / ${formatNumber(frequencyHz, precision)}`,
    `  T = ${formatNumber(periodSeconds, precision)} seconds`,
    "",
    `Step 2: Convert to Display Unit`,
    `  T = ${formatNumber(period, precision)} ${getTimeUnitLabel(periodUnit)}`,
  ];

  return {
    mode: 'frequency-to-period',
    frequency,
    frequencyHz,
    period,
    periodSeconds,
    formula: "T = 1 / f",
    steps,
  };
}

// Calculate execution time from cycles: Time = Cycles / Frequency
function calculateExecutionTime(
  cycles: number,
  frequency: number,
  frequencyUnit: FrequencyUnit,
  executionTimeUnit: TimeUnit,
  precision: number
): ClockFrequencyResult {
  const frequencyHz = normalizeFrequency(frequency, frequencyUnit);
  const executionTimeSeconds = cycles / frequencyHz;
  const executionTime = convertTime(executionTimeSeconds, executionTimeUnit);
  const periodSeconds = 1 / frequencyHz;
  const period = convertTime(periodSeconds, executionTimeUnit);

  const steps = [
    "Calculate Execution Time from Clock Cycles",
    "",
    `Given:`,
    `  Number of Cycles = ${cycles}`,
    `  Clock Frequency (f) = ${frequency} ${getFrequencyUnitLabel(frequencyUnit)}`,
    `  f = ${formatNumber(frequencyHz, precision)} Hz`,
    "",
    `Formula:`,
    `  Time = Cycles / Frequency`,
    "",
    `Step 1: Apply Formula`,
    `  Time = ${cycles} / ${formatNumber(frequencyHz, precision)}`,
    `  Time = ${formatNumber(executionTimeSeconds, precision)} seconds`,
    "",
    `Step 2: Convert to Display Unit`,
    `  Time = ${formatNumber(executionTime, precision)} ${getTimeUnitLabel(executionTimeUnit)}`,
    "",
    `Additional Info:`,
    `  Clock Period = ${formatNumber(periodSeconds, precision)} s`,
    `  Total Time = ${cycles} cycles × ${formatNumber(periodSeconds, precision)} s/cycle`,
  ];

  return {
    mode: 'cycles-time',
    frequency,
    frequencyHz,
    period,
    periodSeconds,
    cycles,
    executionTime,
    executionTimeSeconds,
    formula: "Time = Cycles / Frequency",
    steps,
  };
}

// Calculate cycles from execution time: Cycles = Frequency × Time
function calculateCycles(
  executionTime: number,
  executionTimeUnit: TimeUnit,
  frequency: number,
  frequencyUnit: FrequencyUnit,
  precision: number
): ClockFrequencyResult {
  const frequencyHz = normalizeFrequency(frequency, frequencyUnit);
  const executionTimeSeconds = normalizeTime(executionTime, executionTimeUnit);
  const cycles = Math.round(frequencyHz * executionTimeSeconds);
  const periodSeconds = 1 / frequencyHz;
  const period = convertTime(periodSeconds, executionTimeUnit);

  const steps = [
    "Calculate Clock Cycles from Execution Time",
    "",
    `Given:`,
    `  Execution Time = ${executionTime} ${getTimeUnitLabel(executionTimeUnit)}`,
    `  Time = ${formatNumber(executionTimeSeconds, precision)} seconds`,
    `  Clock Frequency (f) = ${frequency} ${getFrequencyUnitLabel(frequencyUnit)}`,
    `  f = ${formatNumber(frequencyHz, precision)} Hz`,
    "",
    `Formula:`,
    `  Cycles = Frequency × Time`,
    "",
    `Step 1: Apply Formula`,
    `  Cycles = ${formatNumber(frequencyHz, precision)} × ${formatNumber(executionTimeSeconds, precision)}`,
    `  Cycles = ${formatNumber(frequencyHz * executionTimeSeconds, precision)}`,
    "",
    `Step 2: Round to Nearest Integer`,
    `  Cycles = ${cycles}`,
    "",
    `Additional Info:`,
    `  Clock Period = ${formatNumber(periodSeconds, precision)} s`,
    `  Total Time = ${cycles} cycles × ${formatNumber(periodSeconds, precision)} s/cycle`,
  ];

  return {
    mode: 'time-cycles',
    frequency,
    frequencyHz,
    period,
    periodSeconds,
    cycles,
    executionTime,
    executionTimeSeconds,
    formula: "Cycles = Frequency × Time",
    steps,
  };
}

// Get presets based on mode
export function getPresets(mode: CalculationMode) {
  if (mode === 'period-to-frequency') {
    return [
      {
        name: "1 MHz Microcontroller",
        description: "Common 8-bit MCU clock",
        period: 1,
        periodUnit: 'us' as TimeUnit,
      },
      {
        name: "16 MHz Arduino",
        description: "Arduino Uno clock frequency",
        period: 62.5,
        periodUnit: 'ns' as TimeUnit,
      },
      {
        name: "100 MHz FPGA",
        description: "Typical FPGA clock",
        period: 10,
        periodUnit: 'ns' as TimeUnit,
      },
      {
        name: "3 GHz CPU",
        description: "Modern processor clock",
        period: 0.333,
        periodUnit: 'ns' as TimeUnit,
      },
    ];
  } else if (mode === 'frequency-to-period') {
    return [
      {
        name: "1 MHz Microcontroller",
        description: "Common 8-bit MCU clock",
        frequency: 1,
        frequencyUnit: 'mhz' as FrequencyUnit,
      },
      {
        name: "16 MHz Arduino",
        description: "Arduino Uno clock frequency",
        frequency: 16,
        frequencyUnit: 'mhz' as FrequencyUnit,
      },
      {
        name: "100 MHz FPGA",
        description: "Typical FPGA clock",
        frequency: 100,
        frequencyUnit: 'mhz' as FrequencyUnit,
      },
      {
        name: "3 GHz CPU",
        description: "Modern processor clock",
        frequency: 3,
        frequencyUnit: 'ghz' as FrequencyUnit,
      },
    ];
  } else if (mode === 'cycles-time') {
    return [
      {
        name: "1000 cycles @ 1 MHz",
        description: "1ms execution time",
        cycles: 1000,
        frequency: 1,
        frequencyUnit: 'mhz' as FrequencyUnit,
      },
      {
        name: "16000 cycles @ 16 MHz",
        description: "1ms on Arduino",
        cycles: 16000,
        frequency: 16,
        frequencyUnit: 'mhz' as FrequencyUnit,
      },
      {
        name: "100000 cycles @ 100 MHz",
        description: "1ms on FPGA",
        cycles: 100000,
        frequency: 100,
        frequencyUnit: 'mhz' as FrequencyUnit,
      },
      {
        name: "3000000 cycles @ 3 GHz",
        description: "1ms on modern CPU",
        cycles: 3000000,
        frequency: 3,
        frequencyUnit: 'ghz' as FrequencyUnit,
      },
    ];
  } else {
    return [
      {
        name: "1ms @ 1 MHz",
        description: "1000 clock cycles",
        executionTime: 1,
        executionTimeUnit: 'ms' as TimeUnit,
        frequency: 1,
        frequencyUnit: 'mhz' as FrequencyUnit,
      },
      {
        name: "1ms @ 16 MHz",
        description: "16000 cycles on Arduino",
        executionTime: 1,
        executionTimeUnit: 'ms' as TimeUnit,
        frequency: 16,
        frequencyUnit: 'mhz' as FrequencyUnit,
      },
      {
        name: "1µs @ 100 MHz",
        description: "100 cycles on FPGA",
        executionTime: 1,
        executionTimeUnit: 'us' as TimeUnit,
        frequency: 100,
        frequencyUnit: 'mhz' as FrequencyUnit,
      },
      {
        name: "1ns @ 3 GHz",
        description: "3 cycles on modern CPU",
        executionTime: 1,
        executionTimeUnit: 'ns' as TimeUnit,
        frequency: 3,
        frequencyUnit: 'ghz' as FrequencyUnit,
      },
    ];
  }
}

// History management
const HISTORY_KEY = 'clock-frequency-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: ClockFrequencyInputs;
  result: ClockFrequencyResult;
}

export function saveToHistory(inputs: ClockFrequencyInputs, result: ClockFrequencyResult): void {
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
export function exportToText(inputs: ClockFrequencyInputs, result: ClockFrequencyResult): string {
  const modeLabels = {
    'period-to-frequency': 'Clock Period → Frequency',
    'frequency-to-period': 'Frequency → Clock Period',
    'cycles-time': 'Clock Cycles → Execution Time',
    'time-cycles': 'Execution Time → Clock Cycles',
  };

  const lines = [
    "Clock Frequency Calculator - Calculation Report",
    "=".repeat(50),
    "",
    `Mode: ${modeLabels[result.mode]}`,
    `Date: ${new Date().toLocaleString()}`,
    "",
    "RESULTS:",
    "-".repeat(50),
    `Frequency: ${formatNumber(result.frequency, inputs.precision || 6)} ${getFrequencyUnitLabel(inputs.frequencyUnit || 'hz')}`,
    `Frequency (Hz): ${formatNumber(result.frequencyHz, inputs.precision || 6)} Hz`,
    `Clock Period: ${formatNumber(result.period, inputs.precision || 6)} ${getTimeUnitLabel(inputs.periodUnit || 's')}`,
    `Clock Period (s): ${formatNumber(result.periodSeconds, inputs.precision || 6)} s`,
  ];

  if (result.cycles !== undefined) {
    lines.push(`Clock Cycles: ${result.cycles}`);
  }

  if (result.executionTime !== undefined && result.executionTimeSeconds !== undefined) {
    lines.push(`Execution Time: ${formatNumber(result.executionTime, inputs.precision || 6)} ${getTimeUnitLabel(inputs.executionTimeUnit || 's')}`);
    lines.push(`Execution Time (s): ${formatNumber(result.executionTimeSeconds, inputs.precision || 6)} s`);
  }

  lines.push(
    `Formula: ${result.formula}`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50),
    ...result.steps,
    "",
    "=".repeat(50),
    "Generated by Clock Frequency Calculator",
  );

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

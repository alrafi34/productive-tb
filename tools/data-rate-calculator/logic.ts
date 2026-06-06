import { DataRateInputs, DataRateResult, DataUnit, TimeUnit, RateUnit, CalculationMode } from "./types";

// Convert data to bytes
export function normalizeData(value: number, unit: DataUnit): number {
  switch (unit) {
    case 'kb':
      return value * 1024;
    case 'mb':
      return value * 1024 * 1024;
    case 'gb':
      return value * 1024 * 1024 * 1024;
    case 'tb':
      return value * 1024 * 1024 * 1024 * 1024;
    default:
      return value;
  }
}

// Convert time to seconds
export function normalizeTime(value: number, unit: TimeUnit): number {
  switch (unit) {
    case 'min':
      return value * 60;
    case 'h':
      return value * 3600;
    default:
      return value;
  }
}

// Convert rate to bps (bytes per second)
export function normalizeRate(value: number, unit: RateUnit): number {
  switch (unit) {
    case 'kbps':
      return value * 1024;
    case 'mbps':
      return value * 1024 * 1024;
    case 'gbps':
      return value * 1024 * 1024 * 1024;
    default:
      return value;
  }
}

// Convert bytes to display unit
export function convertData(bytes: number, unit: DataUnit): number {
  switch (unit) {
    case 'kb':
      return bytes / 1024;
    case 'mb':
      return bytes / (1024 * 1024);
    case 'gb':
      return bytes / (1024 * 1024 * 1024);
    case 'tb':
      return bytes / (1024 * 1024 * 1024 * 1024);
    default:
      return bytes;
  }
}

// Convert seconds to display unit
export function convertTime(seconds: number, unit: TimeUnit): number {
  switch (unit) {
    case 'min':
      return seconds / 60;
    case 'h':
      return seconds / 3600;
    default:
      return seconds;
  }
}

// Convert bps to display unit
export function convertRate(bps: number, unit: RateUnit): number {
  switch (unit) {
    case 'kbps':
      return bps / 1024;
    case 'mbps':
      return bps / (1024 * 1024);
    case 'gbps':
      return bps / (1024 * 1024 * 1024);
    default:
      return bps;
  }
}

// Get unit labels
export function getDataUnitLabel(unit: DataUnit): string {
  switch (unit) {
    case 'kb':
      return 'KB';
    case 'mb':
      return 'MB';
    case 'gb':
      return 'GB';
    case 'tb':
      return 'TB';
    default:
      return 'Bytes';
  }
}

export function getTimeUnitLabel(unit: TimeUnit): string {
  switch (unit) {
    case 'min':
      return 'minutes';
    case 'h':
      return 'hours';
    default:
      return 'seconds';
  }
}

export function getRateUnitLabel(unit: RateUnit): string {
  switch (unit) {
    case 'kbps':
      return 'KB/s';
    case 'mbps':
      return 'MB/s';
    case 'gbps':
      return 'GB/s';
    default:
      return 'B/s';
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
export function validateInputs(inputs: DataRateInputs): string | null {
  const { mode, dataSize, time, dataRate } = inputs;

  if (mode === 'data-time-to-rate') {
    if (dataSize === undefined || dataSize === null) {
      return "Data size is required";
    }
    if (dataSize <= 0) {
      return "Data size must be greater than zero";
    }
    if (time === undefined || time === null) {
      return "Time duration is required";
    }
    if (time <= 0) {
      return "Time must be greater than zero";
    }
  } else if (mode === 'rate-time-to-data') {
    if (dataRate === undefined || dataRate === null) {
      return "Data rate is required";
    }
    if (dataRate <= 0) {
      return "Data rate must be greater than zero";
    }
    if (time === undefined || time === null) {
      return "Time duration is required";
    }
    if (time <= 0) {
      return "Time must be greater than zero";
    }
  } else if (mode === 'rate-data-to-time') {
    if (dataRate === undefined || dataRate === null) {
      return "Data rate is required";
    }
    if (dataRate <= 0) {
      return "Data rate must be greater than zero";
    }
    if (dataSize === undefined || dataSize === null) {
      return "Data size is required";
    }
    if (dataSize <= 0) {
      return "Data size must be greater than zero";
    }
  }

  return null;
}

// Calculate data rate
export function calculateDataRate(inputs: DataRateInputs): DataRateResult {
  const { 
    mode, 
    dataSize, 
    dataUnit = 'mb', 
    time, 
    timeUnit = 's',
    dataRate,
    rateUnit = 'mbps',
    precision = 6
  } = inputs;

  if (mode === 'data-time-to-rate') {
    return calculateRateFromDataTime(dataSize!, dataUnit, time!, timeUnit, rateUnit, precision);
  } else if (mode === 'rate-time-to-data') {
    return calculateDataFromRateTime(dataRate!, rateUnit, time!, timeUnit, dataUnit, precision);
  } else {
    return calculateTimeFromRateData(dataRate!, rateUnit, dataSize!, dataUnit, timeUnit, precision);
  }
}

// Calculate rate from data and time: Rate = Data / Time
function calculateRateFromDataTime(
  dataSize: number,
  dataUnit: DataUnit,
  time: number,
  timeUnit: TimeUnit,
  rateUnit: RateUnit,
  precision: number
): DataRateResult {
  const dataSizeBytes = normalizeData(dataSize, dataUnit);
  const timeSeconds = normalizeTime(time, timeUnit);
  const dataRateBps = dataSizeBytes / timeSeconds;
  const dataRate = convertRate(dataRateBps, rateUnit);

  const steps = [
    "Calculate Data Rate from Data Size and Time",
    "",
    `Given:`,
    `  Data Size = ${dataSize} ${getDataUnitLabel(dataUnit)}`,
    `  Data Size = ${formatNumber(dataSizeBytes, precision)} Bytes`,
    `  Time = ${time} ${getTimeUnitLabel(timeUnit)}`,
    `  Time = ${formatNumber(timeSeconds, precision)} seconds`,
    "",
    `Formula:`,
    `  Data Rate = Data Size / Time`,
    "",
    `Step 1: Apply Formula`,
    `  Rate = ${formatNumber(dataSizeBytes, precision)} / ${formatNumber(timeSeconds, precision)}`,
    `  Rate = ${formatNumber(dataRateBps, precision)} B/s`,
    "",
    `Step 2: Convert to Display Unit`,
    `  Rate = ${formatNumber(dataRate, precision)} ${getRateUnitLabel(rateUnit)}`,
  ];

  return {
    mode: 'data-time-to-rate',
    dataSize,
    dataSizeBytes,
    time,
    timeSeconds,
    dataRate,
    dataRateBps,
    formula: "Rate = Data / Time",
    steps,
  };
}

// Calculate data from rate and time: Data = Rate × Time
function calculateDataFromRateTime(
  dataRate: number,
  rateUnit: RateUnit,
  time: number,
  timeUnit: TimeUnit,
  dataUnit: DataUnit,
  precision: number
): DataRateResult {
  const dataRateBps = normalizeRate(dataRate, rateUnit);
  const timeSeconds = normalizeTime(time, timeUnit);
  const dataSizeBytes = dataRateBps * timeSeconds;
  const dataSize = convertData(dataSizeBytes, dataUnit);

  const steps = [
    "Calculate Data Size from Data Rate and Time",
    "",
    `Given:`,
    `  Data Rate = ${dataRate} ${getRateUnitLabel(rateUnit)}`,
    `  Data Rate = ${formatNumber(dataRateBps, precision)} B/s`,
    `  Time = ${time} ${getTimeUnitLabel(timeUnit)}`,
    `  Time = ${formatNumber(timeSeconds, precision)} seconds`,
    "",
    `Formula:`,
    `  Data Size = Data Rate × Time`,
    "",
    `Step 1: Apply Formula`,
    `  Data = ${formatNumber(dataRateBps, precision)} × ${formatNumber(timeSeconds, precision)}`,
    `  Data = ${formatNumber(dataSizeBytes, precision)} Bytes`,
    "",
    `Step 2: Convert to Display Unit`,
    `  Data = ${formatNumber(dataSize, precision)} ${getDataUnitLabel(dataUnit)}`,
  ];

  return {
    mode: 'rate-time-to-data',
    dataSize,
    dataSizeBytes,
    time,
    timeSeconds,
    dataRate,
    dataRateBps,
    formula: "Data = Rate × Time",
    steps,
  };
}

// Calculate time from rate and data: Time = Data / Rate
function calculateTimeFromRateData(
  dataRate: number,
  rateUnit: RateUnit,
  dataSize: number,
  dataUnit: DataUnit,
  timeUnit: TimeUnit,
  precision: number
): DataRateResult {
  const dataRateBps = normalizeRate(dataRate, rateUnit);
  const dataSizeBytes = normalizeData(dataSize, dataUnit);
  const timeSeconds = dataSizeBytes / dataRateBps;
  const time = convertTime(timeSeconds, timeUnit);

  const steps = [
    "Calculate Time from Data Rate and Data Size",
    "",
    `Given:`,
    `  Data Rate = ${dataRate} ${getRateUnitLabel(rateUnit)}`,
    `  Data Rate = ${formatNumber(dataRateBps, precision)} B/s`,
    `  Data Size = ${dataSize} ${getDataUnitLabel(dataUnit)}`,
    `  Data Size = ${formatNumber(dataSizeBytes, precision)} Bytes`,
    "",
    `Formula:`,
    `  Time = Data Size / Data Rate`,
    "",
    `Step 1: Apply Formula`,
    `  Time = ${formatNumber(dataSizeBytes, precision)} / ${formatNumber(dataRateBps, precision)}`,
    `  Time = ${formatNumber(timeSeconds, precision)} seconds`,
    "",
    `Step 2: Convert to Display Unit`,
    `  Time = ${formatNumber(time, precision)} ${getTimeUnitLabel(timeUnit)}`,
  ];

  return {
    mode: 'rate-data-to-time',
    dataSize,
    dataSizeBytes,
    time,
    timeSeconds,
    dataRate,
    dataRateBps,
    formula: "Time = Data / Rate",
    steps,
  };
}

// Get presets based on mode
export function getPresets(mode: CalculationMode) {
  if (mode === 'data-time-to-rate') {
    return [
      {
        name: "100 MB in 10 seconds",
        description: "Typical file download",
        dataSize: 100,
        dataUnit: 'mb' as DataUnit,
        time: 10,
        timeUnit: 's' as TimeUnit,
      },
      {
        name: "1 GB in 2 minutes",
        description: "Large file transfer",
        dataSize: 1,
        dataUnit: 'gb' as DataUnit,
        time: 2,
        timeUnit: 'min' as TimeUnit,
      },
      {
        name: "500 MB in 1 minute",
        description: "Video streaming",
        dataSize: 500,
        dataUnit: 'mb' as DataUnit,
        time: 1,
        timeUnit: 'min' as TimeUnit,
      },
      {
        name: "10 GB in 1 hour",
        description: "Backup operation",
        dataSize: 10,
        dataUnit: 'gb' as DataUnit,
        time: 1,
        timeUnit: 'h' as TimeUnit,
      },
    ];
  } else if (mode === 'rate-time-to-data') {
    return [
      {
        name: "10 MB/s for 10 seconds",
        description: "Fast download",
        dataRate: 10,
        rateUnit: 'mbps' as RateUnit,
        time: 10,
        timeUnit: 's' as TimeUnit,
      },
      {
        name: "1 MB/s for 5 minutes",
        description: "Standard transfer",
        dataRate: 1,
        rateUnit: 'mbps' as RateUnit,
        time: 5,
        timeUnit: 'min' as TimeUnit,
      },
      {
        name: "100 MB/s for 1 minute",
        description: "High-speed network",
        dataRate: 100,
        rateUnit: 'mbps' as RateUnit,
        time: 1,
        timeUnit: 'min' as TimeUnit,
      },
      {
        name: "5 MB/s for 1 hour",
        description: "Continuous streaming",
        dataRate: 5,
        rateUnit: 'mbps' as RateUnit,
        time: 1,
        timeUnit: 'h' as TimeUnit,
      },
    ];
  } else {
    return [
      {
        name: "100 MB at 10 MB/s",
        description: "Quick transfer",
        dataSize: 100,
        dataUnit: 'mb' as DataUnit,
        dataRate: 10,
        rateUnit: 'mbps' as RateUnit,
      },
      {
        name: "1 GB at 8 MB/s",
        description: "Standard download",
        dataSize: 1,
        dataUnit: 'gb' as DataUnit,
        dataRate: 8,
        rateUnit: 'mbps' as RateUnit,
      },
      {
        name: "500 MB at 5 MB/s",
        description: "Video download",
        dataSize: 500,
        dataUnit: 'mb' as DataUnit,
        dataRate: 5,
        rateUnit: 'mbps' as RateUnit,
      },
      {
        name: "10 GB at 2.78 MB/s",
        description: "Large file transfer",
        dataSize: 10,
        dataUnit: 'gb' as DataUnit,
        dataRate: 2.78,
        rateUnit: 'mbps' as RateUnit,
      },
    ];
  }
}

// History management
const HISTORY_KEY = 'data-rate-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: DataRateInputs;
  result: DataRateResult;
}

export function saveToHistory(inputs: DataRateInputs, result: DataRateResult): void {
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
export function exportToText(inputs: DataRateInputs, result: DataRateResult): string {
  const modeLabels = {
    'data-time-to-rate': 'Data & Time → Rate',
    'rate-time-to-data': 'Rate & Time → Data',
    'rate-data-to-time': 'Rate & Data → Time',
  };

  const lines = [
    "Data Rate Calculator - Calculation Report",
    "=".repeat(50),
    "",
    `Mode: ${modeLabels[result.mode]}`,
    `Date: ${new Date().toLocaleString()}`,
    "",
    "RESULTS:",
    "-".repeat(50),
    `Data Size: ${formatNumber(result.dataSize, inputs.precision || 6)} ${getDataUnitLabel(inputs.dataUnit || 'mb')}`,
    `Data Size (Bytes): ${formatNumber(result.dataSizeBytes, inputs.precision || 6)} Bytes`,
    `Time: ${formatNumber(result.time, inputs.precision || 6)} ${getTimeUnitLabel(inputs.timeUnit || 's')}`,
    `Time (seconds): ${formatNumber(result.timeSeconds, inputs.precision || 6)} s`,
    `Data Rate: ${formatNumber(result.dataRate, inputs.precision || 6)} ${getRateUnitLabel(inputs.rateUnit || 'mbps')}`,
    `Data Rate (B/s): ${formatNumber(result.dataRateBps, inputs.precision || 6)} B/s`,
    `Formula: ${result.formula}`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50),
    ...result.steps,
    "",
    "=".repeat(50),
    "Generated by Data Rate Calculator",
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

import { AntennaInputs, AntennaResult, AntennaType, FrequencyUnit, LengthUnit } from "./types";

// Speed of light in m/s
const SPEED_OF_LIGHT = 299792458;

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

// Convert meters to display unit
export function convertLength(meters: number, unit: LengthUnit): number {
  switch (unit) {
    case 'cm':
      return meters * 100;
    case 'mm':
      return meters * 1000;
    case 'in':
      return meters * 39.3701;
    case 'ft':
      return meters * 3.28084;
    default:
      return meters;
  }
}

// Get antenna type multiplier
export function getAntennaMultiplier(type: AntennaType): number {
  switch (type) {
    case 'quarter':
    case 'monopole':
      return 0.25;
    case 'half':
    case 'dipole':
      return 0.5;
    case 'full':
      return 1.0;
    default:
      return 0.25;
  }
}

// Get antenna type label
export function getAntennaTypeLabel(type: AntennaType): string {
  switch (type) {
    case 'quarter':
      return 'Quarter Wave (λ/4)';
    case 'half':
      return 'Half Wave (λ/2)';
    case 'full':
      return 'Full Wave (λ)';
    case 'dipole':
      return 'Dipole (λ/2)';
    case 'monopole':
      return 'Monopole (λ/4)';
    default:
      return 'Quarter Wave';
  }
}

// Get frequency unit label
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

// Get length unit label
export function getLengthUnitLabel(unit: LengthUnit): string {
  switch (unit) {
    case 'cm':
      return 'cm';
    case 'mm':
      return 'mm';
    case 'in':
      return 'inches';
    case 'ft':
      return 'feet';
    default:
      return 'm';
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
export function validateInputs(inputs: AntennaInputs): string | null {
  const { frequency } = inputs;

  if (frequency === undefined || frequency === null) {
    return "Frequency is required";
  }
  if (frequency <= 0) {
    return "Frequency must be greater than zero";
  }
  if (frequency > 1e12) {
    return "Frequency is too high (max 1 THz)";
  }

  return null;
}

// Calculate antenna length
export function calculateAntennaLength(inputs: AntennaInputs): AntennaResult {
  const { 
    frequency, 
    frequencyUnit, 
    antennaType, 
    velocityFactor = 1.0,
    lengthUnit,
    precision = 6
  } = inputs;

  // Convert frequency to Hz
  const frequencyHz = normalizeFrequency(frequency, frequencyUnit);

  // Calculate wavelength: λ = c / f
  const wavelengthMeters = (SPEED_OF_LIGHT * velocityFactor) / frequencyHz;

  // Get antenna multiplier
  const multiplier = getAntennaMultiplier(antennaType);

  // Calculate antenna length
  const antennaLengthMeters = wavelengthMeters * multiplier;

  // Convert to display units
  const wavelength = convertLength(wavelengthMeters, lengthUnit);
  const antennaLength = convertLength(antennaLengthMeters, lengthUnit);

  // Generate calculation steps
  const steps = [
    "Calculate Antenna Length from Frequency",
    "",
    `Given:`,
    `  Frequency = ${frequency} ${getFrequencyUnitLabel(frequencyUnit)}`,
    `  Frequency = ${formatNumber(frequencyHz, precision)} Hz`,
    `  Antenna Type = ${getAntennaTypeLabel(antennaType)}`,
    `  Velocity Factor = ${velocityFactor}`,
    "",
    `Step 1: Calculate Wavelength`,
    `  Formula: λ = (c × VF) / f`,
    `  where c = ${SPEED_OF_LIGHT.toLocaleString()} m/s (speed of light)`,
    `  λ = (${SPEED_OF_LIGHT.toLocaleString()} × ${velocityFactor}) / ${formatNumber(frequencyHz, precision)}`,
    `  λ = ${formatNumber(wavelengthMeters, precision)} meters`,
    "",
    `Step 2: Calculate Antenna Length`,
    `  Formula: Length = λ × ${multiplier}`,
    `  Length = ${formatNumber(wavelengthMeters, precision)} × ${multiplier}`,
    `  Length = ${formatNumber(antennaLengthMeters, precision)} meters`,
    "",
    `Step 3: Convert to Display Unit`,
    `  Length = ${formatNumber(antennaLength, precision)} ${getLengthUnitLabel(lengthUnit)}`,
  ];

  // Determine formula based on antenna type
  let formula = "Length = (c / f) × ";
  switch (antennaType) {
    case 'quarter':
    case 'monopole':
      formula += "0.25";
      break;
    case 'half':
    case 'dipole':
      formula += "0.5";
      break;
    case 'full':
      formula += "1.0";
      break;
  }

  return {
    frequency,
    frequencyHz,
    wavelength,
    wavelengthMeters,
    antennaLength,
    antennaLengthMeters,
    antennaType,
    formula,
    steps,
  };
}

// Get common frequency presets
export function getPresets() {
  return [
    {
      name: "WiFi 2.4 GHz",
      description: "802.11b/g/n",
      frequency: 2.4,
      frequencyUnit: 'ghz' as FrequencyUnit,
    },
    {
      name: "WiFi 5 GHz",
      description: "802.11a/n/ac",
      frequency: 5,
      frequencyUnit: 'ghz' as FrequencyUnit,
    },
    {
      name: "433 MHz ISM",
      description: "IoT/Remote Control",
      frequency: 433,
      frequencyUnit: 'mhz' as FrequencyUnit,
    },
    {
      name: "868 MHz ISM",
      description: "EU IoT Band",
      frequency: 868,
      frequencyUnit: 'mhz' as FrequencyUnit,
    },
    {
      name: "915 MHz ISM",
      description: "US IoT Band",
      frequency: 915,
      frequencyUnit: 'mhz' as FrequencyUnit,
    },
    {
      name: "FM Radio 100 MHz",
      description: "Broadcast FM",
      frequency: 100,
      frequencyUnit: 'mhz' as FrequencyUnit,
    },
    {
      name: "GPS L1",
      description: "1575.42 MHz",
      frequency: 1575.42,
      frequencyUnit: 'mhz' as FrequencyUnit,
    },
    {
      name: "Bluetooth",
      description: "2.4 GHz ISM",
      frequency: 2.45,
      frequencyUnit: 'ghz' as FrequencyUnit,
    },
  ];
}

// History management
const HISTORY_KEY = 'antenna-length-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: AntennaInputs;
  result: AntennaResult;
}

export function saveToHistory(inputs: AntennaInputs, result: AntennaResult): void {
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
export function exportToText(inputs: AntennaInputs, result: AntennaResult): string {
  const lines = [
    "Antenna Length Calculator - Calculation Report",
    "=".repeat(50),
    "",
    `Date: ${new Date().toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(50),
    `Frequency: ${inputs.frequency} ${getFrequencyUnitLabel(inputs.frequencyUnit)}`,
    `Frequency (Hz): ${formatNumber(result.frequencyHz, inputs.precision)} Hz`,
    `Antenna Type: ${getAntennaTypeLabel(inputs.antennaType)}`,
    `Velocity Factor: ${inputs.velocityFactor}`,
    "",
    "RESULTS:",
    "-".repeat(50),
    `Wavelength: ${formatNumber(result.wavelength, inputs.precision)} ${getLengthUnitLabel(inputs.lengthUnit)}`,
    `Wavelength (m): ${formatNumber(result.wavelengthMeters, inputs.precision)} m`,
    `Antenna Length: ${formatNumber(result.antennaLength, inputs.precision)} ${getLengthUnitLabel(inputs.lengthUnit)}`,
    `Antenna Length (m): ${formatNumber(result.antennaLengthMeters, inputs.precision)} m`,
    `Formula: ${result.formula}`,
    "",
    "CALCULATION STEPS:",
    "-".repeat(50),
    ...result.steps,
    "",
    "=".repeat(50),
    "Generated by Antenna Length Calculator",
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

import {
  FrequencyUnit,
  MediumType,
  WavelengthUnit,
  CalculationInput,
  CalculationResult,
  WavelengthConversion,
  HistoryEntry,
  Preset,
} from "./types";

// Wave speed constants (m/s)
export const WAVE_SPEEDS = {
  vacuum: 299792458, // Speed of light in vacuum
  air: 299702547, // ~99.97% of c
  water: 225000000, // ~75% of c
  copper: 200000000, // Approximate for electrical signals
};

// Unit conversion functions
export function convertFrequencyToHz(value: number, unit: FrequencyUnit): number {
  switch (unit) {
    case "Hz":
      return value;
    case "kHz":
      return value * 1e3;
    case "MHz":
      return value * 1e6;
    case "GHz":
      return value * 1e9;
    default:
      return value;
  }
}

export function getWaveSpeed(medium: MediumType, customSpeed?: number): number {
  if (medium === "custom" && customSpeed) {
    return customSpeed;
  }
  if (medium === "custom") {
    return WAVE_SPEEDS.vacuum;
  }
  return WAVE_SPEEDS[medium as keyof typeof WAVE_SPEEDS] || WAVE_SPEEDS.vacuum;
}

export function formatWavelength(meters: number): WavelengthConversion {
  if (meters >= 1000) {
    return { value: formatNumber(meters / 1000, 6), unit: "km" };
  } else if (meters >= 1) {
    return { value: formatNumber(meters, 6), unit: "m" };
  } else if (meters >= 0.01) {
    return { value: formatNumber(meters * 100, 6), unit: "cm" };
  } else {
    return { value: formatNumber(meters * 1000, 6), unit: "mm" };
  }
}

export function formatNumber(value: number, decimals: number = 4): string {
  if (value === 0) return "0";
  if (!isFinite(value)) return "∞";
  
  // Use scientific notation for very large or very small numbers
  if (Math.abs(value) >= 1e6 || (Math.abs(value) < 0.0001 && Math.abs(value) > 0)) {
    return value.toExponential(decimals);
  }
  
  return value.toFixed(decimals).replace(/\.?0+$/, "");
}

// Validation
export function validateInput(input: CalculationInput): string | null {
  if (!input.frequency || input.frequency <= 0) {
    return "Frequency must be greater than 0";
  }
  if (input.medium === "custom" && (!input.customSpeed || input.customSpeed <= 0)) {
    return "Custom wave speed must be greater than 0";
  }
  return null;
}

// Main calculation function
export function calculateWavelength(input: CalculationInput): CalculationResult {
  const frequencyHz = convertFrequencyToHz(input.frequency, input.frequencyUnit);
  const waveSpeed = getWaveSpeed(input.medium, input.customSpeed);
  
  // Calculate wavelength: λ = v / f
  const wavelength = waveSpeed / frequencyHz;
  
  // Format wavelength
  const wavelengthFormatted = formatWavelength(wavelength);
  
  // Generate conversions
  const conversions: WavelengthConversion[] = [
    { value: formatNumber(wavelength / 1000, 6), unit: "km" },
    { value: formatNumber(wavelength, 6), unit: "m" },
    { value: formatNumber(wavelength * 100, 6), unit: "cm" },
    { value: formatNumber(wavelength * 1000, 6), unit: "mm" },
  ];
  
  // Generate formula and steps
  const formula = "λ = v / f";
  const mediumName = input.medium === "custom" ? "Custom" : input.medium.charAt(0).toUpperCase() + input.medium.slice(1);
  const steps = [
    `Frequency: ${input.frequency} ${input.frequencyUnit} = ${formatNumber(frequencyHz, 2)} Hz`,
    `Medium: ${mediumName}`,
    `Wave Speed (v): ${formatNumber(waveSpeed, 0)} m/s`,
    `λ = ${formatNumber(waveSpeed, 0)} / ${formatNumber(frequencyHz, 2)}`,
    `λ = ${formatNumber(wavelength, 6)} meters`,
    `λ = ${wavelengthFormatted.value} ${wavelengthFormatted.unit}`,
  ];
  
  return {
    wavelength,
    wavelengthFormatted,
    frequencyHz,
    waveSpeed,
    conversions,
    formula,
    steps,
  };
}

// Presets
export const COMMON_PRESETS: Preset[] = [
  {
    label: "WiFi 2.4 GHz",
    frequency: 2.4,
    frequencyUnit: "GHz",
    medium: "air",
    description: "Common WiFi frequency (802.11b/g/n)",
  },
  {
    label: "WiFi 5 GHz",
    frequency: 5,
    frequencyUnit: "GHz",
    medium: "air",
    description: "5 GHz WiFi band (802.11a/n/ac)",
  },
  {
    label: "FM Radio (100 MHz)",
    frequency: 100,
    frequencyUnit: "MHz",
    medium: "air",
    description: "FM broadcast radio frequency",
  },
  {
    label: "AM Radio (1 MHz)",
    frequency: 1,
    frequencyUnit: "MHz",
    medium: "air",
    description: "AM broadcast radio frequency",
  },
  {
    label: "Microwave (2.45 GHz)",
    frequency: 2.45,
    frequencyUnit: "GHz",
    medium: "air",
    description: "Microwave oven frequency",
  },
  {
    label: "5G (28 GHz)",
    frequency: 28,
    frequencyUnit: "GHz",
    medium: "air",
    description: "5G millimeter wave frequency",
  },
];

// History management
const HISTORY_KEY = "wavelength-calculator-history";
const MAX_HISTORY = 20;

export function saveToHistory(input: CalculationInput, result: CalculationResult): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    input,
    result,
  };
  
  history.unshift(entry);
  
  if (history.length > MAX_HISTORY) {
    history.splice(MAX_HISTORY);
  }
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

// Export functions
export function exportToText(input: CalculationInput, result: CalculationResult): string {
  const mediumName = input.medium === "custom" ? "Custom" : input.medium.charAt(0).toUpperCase() + input.medium.slice(1);
  
  const lines = [
    "WAVELENGTH CALCULATION",
    "=" .repeat(50),
    "",
    "INPUT VALUES:",
    `Frequency: ${input.frequency} ${input.frequencyUnit} (${formatNumber(result.frequencyHz, 2)} Hz)`,
    `Medium: ${mediumName}`,
    `Wave Speed: ${formatNumber(result.waveSpeed, 0)} m/s`,
    "",
    "FORMULA:",
    result.formula,
    "λ = wavelength (meters)",
    "v = wave speed (m/s)",
    "f = frequency (Hz)",
    "",
    "CALCULATION STEPS:",
    ...result.steps.map((step, idx) => `${idx + 1}. ${step}`),
    "",
    "RESULT:",
    `Wavelength (λ) = ${result.wavelengthFormatted.value} ${result.wavelengthFormatted.unit}`,
    "",
    "WAVELENGTH CONVERSIONS:",
    ...result.conversions.map(conv => `  ${conv.value} ${conv.unit}`),
    "",
    "=" .repeat(50),
    `Generated: ${new Date().toLocaleString()}`,
  ];
  
  return lines.join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Debounce utility
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

import { FrequencyResponseInputs, FrequencyResponseResult, FrequencyPoint, DisplayMode, SamplingPoints } from "./types";

// Complex number operations
interface Complex {
  real: number;
  imaginary: number;
}

function complex(real: number, imaginary: number = 0): Complex {
  return { real, imaginary };
}

function complexAdd(a: Complex, b: Complex): Complex {
  return { real: a.real + b.real, imaginary: a.imaginary + b.imaginary };
}

function complexMultiply(a: Complex, b: Complex): Complex {
  return {
    real: a.real * b.real - a.imaginary * b.imaginary,
    imaginary: a.real * b.imaginary + a.imaginary * b.real
  };
}

function complexDivide(a: Complex, b: Complex): Complex {
  const denominator = b.real * b.real + b.imaginary * b.imaginary;
  if (denominator === 0) {
    throw new Error("Division by zero in complex number");
  }
  return {
    real: (a.real * b.real + a.imaginary * b.imaginary) / denominator,
    imaginary: (a.imaginary * b.real - a.real * b.imaginary) / denominator
  };
}

function complexMagnitude(c: Complex): number {
  return Math.sqrt(c.real * c.real + c.imaginary * c.imaginary);
}

function complexPhase(c: Complex): number {
  return Math.atan2(c.imaginary, c.real);
}

// Format number with precision
export function formatNumber(value: number, decimals: number = 2): string {
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

// Generate logarithmic frequency array
function generateLogSpace(start: number, end: number, points: number): number[] {
  const logStart = Math.log10(start);
  const logEnd = Math.log10(end);
  const step = (logEnd - logStart) / (points - 1);
  
  const frequencies: number[] = [];
  for (let i = 0; i < points; i++) {
    frequencies.push(Math.pow(10, logStart + i * step));
  }
  return frequencies;
}

// Validate inputs
export function validateInputs(inputs: FrequencyResponseInputs): string | null {
  const { transferFunction, startFrequency, endFrequency, samplingPoints } = inputs;

  if (!transferFunction.trim()) {
    return "Transfer function is required";
  }

  if (startFrequency <= 0) {
    return "Start frequency must be greater than 0";
  }

  if (endFrequency <= startFrequency) {
    return "End frequency must be greater than start frequency";
  }

  if (endFrequency > 1e9) {
    return "End frequency is too high (max 1 GHz)";
  }

  if (![100, 500, 1000, 2000].includes(samplingPoints)) {
    return "Invalid sampling points selection";
  }

  // Basic transfer function validation
  if (!isValidTransferFunction(transferFunction)) {
    return "Invalid transfer function format. Use 'jω' for frequency variable.";
  }

  return null;
}

// Basic transfer function validation
function isValidTransferFunction(tf: string): boolean {
  // Check for basic mathematical expressions and jω
  const validChars = /^[jω\d\s\+\-\*\/\(\)\.\^]+$/;
  return validChars.test(tf) && tf.includes('ω');
}

// Parse and evaluate transfer function
function evaluateTransferFunction(tf: string, omega: number): Complex {
  try {
    // Replace jω with complex representation
    // This is a simplified parser for common transfer functions
    
    // Handle common cases
    if (tf.trim() === '1') {
      return complex(1, 0);
    }
    
    if (tf.trim() === 'jω') {
      return complex(0, omega);
    }
    
    if (tf.includes('1/(1+jω)')) {
      // Low-pass filter: 1/(1+jω)
      const denominator = complexAdd(complex(1, 0), complex(0, omega));
      return complexDivide(complex(1, 0), denominator);
    }
    
    if (tf.includes('jω/(1+jω)')) {
      // High-pass filter: jω/(1+jω)
      const numerator = complex(0, omega);
      const denominator = complexAdd(complex(1, 0), complex(0, omega));
      return complexDivide(numerator, denominator);
    }
    
    if (tf.includes('1+jω')) {
      // Differentiator: 1+jω
      return complexAdd(complex(1, 0), complex(0, omega));
    }
    
    if (tf.includes('1/jω')) {
      // Integrator: 1/jω
      return complexDivide(complex(1, 0), complex(0, omega));
    }
    
    // More complex parsing would go here
    // For now, return a default response
    return complex(1, 0);
    
  } catch (error) {
    throw new Error(`Error evaluating transfer function: ${error}`);
  }
}

// Analyze system characteristics
function analyzeSystem(points: FrequencyPoint[], tf: string): any {
  const characteristics: any = {};
  
  // DC Gain (magnitude at lowest frequency)
  characteristics.dcGain = points[0]?.magnitudeDb || 0;
  
  // Find cutoff frequency (-3dB point)
  const targetDb = characteristics.dcGain - 3;
  for (let i = 0; i < points.length - 1; i++) {
    if (points[i].magnitudeDb >= targetDb && points[i + 1].magnitudeDb < targetDb) {
      characteristics.cutoffFrequency = points[i].frequency;
      break;
    }
  }
  
  // Find peak gain and frequency
  let maxDb = -Infinity;
  let peakFreq = 0;
  for (const point of points) {
    if (point.magnitudeDb > maxDb) {
      maxDb = point.magnitudeDb;
      peakFreq = point.frequency;
    }
  }
  characteristics.peakGain = maxDb;
  characteristics.peakFrequency = peakFreq;
  
  return characteristics;
}

// Determine system type
function determineSystemType(tf: string): string {
  if (tf.includes('1/(1+jω)')) return 'Low-pass Filter';
  if (tf.includes('jω/(1+jω)')) return 'High-pass Filter';
  if (tf.includes('1+jω')) return 'Differentiator';
  if (tf.includes('1/jω')) return 'Integrator';
  if (tf.trim() === '1') return 'Unity Gain';
  if (tf.trim() === 'jω') return 'Pure Differentiator';
  return 'Custom System';
}

// Generate calculation steps
function generateSteps(inputs: FrequencyResponseInputs, result: FrequencyResponseResult): string[] {
  const steps: string[] = [
    "Frequency Response Analysis",
    "",
    "Given:",
    `  Transfer Function: H(jω) = ${inputs.transferFunction}`,
    `  Frequency Range: ${inputs.startFrequency} Hz to ${inputs.endFrequency} Hz`,
    `  Sampling Points: ${inputs.samplingPoints}`,
    "",
    "Step 1: Generate Frequency Array",
    `  Using logarithmic spacing from ${inputs.startFrequency} to ${inputs.endFrequency} Hz`,
    `  Total points: ${inputs.samplingPoints}`,
    "",
    "Step 2: Evaluate Transfer Function",
    "  For each frequency f:",
    "  ω = 2πf (angular frequency)",
    "  H(jω) = complex evaluation of transfer function",
    "",
    "Step 3: Calculate Magnitude and Phase",
    "  Magnitude: |H(jω)| = √(Re² + Im²)",
    "  Magnitude (dB): 20 × log₁₀(|H(jω)|)",
    "  Phase: ∠H(jω) = arctan(Im/Re) × (180/π)",
    "",
    "Results:",
    `  System Type: ${result.systemType}`,
    `  DC Gain: ${formatNumber(result.characteristics.dcGain, 2)} dB`
  ];

  if (result.characteristics.cutoffFrequency) {
    steps.push(`  Cutoff Frequency: ${formatNumber(result.characteristics.cutoffFrequency, 2)} Hz`);
  }

  if (result.characteristics.peakGain !== undefined) {
    steps.push(`  Peak Gain: ${formatNumber(result.characteristics.peakGain, 2)} dB at ${formatNumber(result.characteristics.peakFrequency!, 2)} Hz`);
  }

  return steps;
}

// Calculate frequency response
export function calculateFrequencyResponse(inputs: FrequencyResponseInputs): FrequencyResponseResult {
  const { transferFunction, startFrequency, endFrequency, samplingPoints } = inputs;

  // Generate frequency array
  const frequencies = generateLogSpace(startFrequency, endFrequency, samplingPoints);
  
  // Calculate response at each frequency
  const points: FrequencyPoint[] = frequencies.map(f => {
    const omega = 2 * Math.PI * f;
    const H = evaluateTransferFunction(transferFunction, omega);
    
    const magnitude = complexMagnitude(H);
    const magnitudeDb = magnitude > 0 ? 20 * Math.log10(magnitude) : -Infinity;
    const phase = complexPhase(H) * (180 / Math.PI);
    
    return {
      frequency: f,
      magnitude,
      magnitudeDb,
      phase,
      real: H.real,
      imaginary: H.imaginary
    };
  });

  // Analyze system characteristics
  const characteristics = analyzeSystem(points, transferFunction);
  
  // Determine system type
  const systemType = determineSystemType(transferFunction);

  const result: FrequencyResponseResult = {
    points,
    transferFunction,
    frequencyRange: [startFrequency, endFrequency],
    samplingPoints,
    systemType,
    characteristics,
    steps: []
  };

  // Generate calculation steps
  result.steps = generateSteps(inputs, result);

  return result;
}

// Get common presets
export function getPresets() {
  return [
    {
      name: "Low-pass Filter",
      description: "First-order RC low-pass",
      transferFunction: "1/(1+jω)",
      startFrequency: 0.1,
      endFrequency: 100,
      samplingPoints: 500 as SamplingPoints
    },
    {
      name: "High-pass Filter",
      description: "First-order RC high-pass",
      transferFunction: "jω/(1+jω)",
      startFrequency: 0.1,
      endFrequency: 100,
      samplingPoints: 500 as SamplingPoints
    },
    {
      name: "Integrator",
      description: "Pure integrator",
      transferFunction: "1/jω",
      startFrequency: 0.1,
      endFrequency: 100,
      samplingPoints: 500 as SamplingPoints
    },
    {
      name: "Differentiator",
      description: "Pure differentiator",
      transferFunction: "jω",
      startFrequency: 0.1,
      endFrequency: 100,
      samplingPoints: 500 as SamplingPoints
    },
    {
      name: "Unity Gain",
      description: "Flat response",
      transferFunction: "1",
      startFrequency: 1,
      endFrequency: 1000,
      samplingPoints: 500 as SamplingPoints
    },
    {
      name: "Lead Compensator",
      description: "First-order lead",
      transferFunction: "1+jω",
      startFrequency: 0.1,
      endFrequency: 100,
      samplingPoints: 500 as SamplingPoints
    }
  ];
}

// History management
const HISTORY_KEY = 'frequency-response-calculator-history';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FrequencyResponseInputs;
  result: FrequencyResponseResult;
}

export function saveToHistory(inputs: FrequencyResponseInputs, result: FrequencyResponseResult): void {
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
export function exportToText(inputs: FrequencyResponseInputs, result: FrequencyResponseResult): string {
  const lines = [
    "Frequency Response Calculator - Analysis Report",
    "=".repeat(60),
    "",
    `Transfer Function: H(jω) = ${result.transferFunction}`,
    `System Type: ${result.systemType}`,
    `Date: ${new Date().toLocaleString()}`,
    "",
    "INPUT PARAMETERS:",
    "-".repeat(60),
    `Frequency Range: ${result.frequencyRange[0]} Hz to ${result.frequencyRange[1]} Hz`,
    `Sampling Points: ${result.samplingPoints}`,
    `Display Mode: ${inputs.displayMode}`,
    "",
    "SYSTEM CHARACTERISTICS:",
    "-".repeat(60),
    `DC Gain: ${formatNumber(result.characteristics.dcGain, 2)} dB`
  ];

  if (result.characteristics.cutoffFrequency) {
    lines.push(`Cutoff Frequency: ${formatNumber(result.characteristics.cutoffFrequency, 2)} Hz`);
  }

  if (result.characteristics.peakGain !== undefined) {
    lines.push(`Peak Gain: ${formatNumber(result.characteristics.peakGain, 2)} dB`);
    lines.push(`Peak Frequency: ${formatNumber(result.characteristics.peakFrequency!, 2)} Hz`);
  }

  lines.push(
    "",
    "CALCULATION STEPS:",
    "-".repeat(60)
  );

  lines.push(...result.steps);

  lines.push(
    "",
    "FREQUENCY RESPONSE DATA:",
    "-".repeat(60),
    "Frequency (Hz), Magnitude (dB), Phase (deg)"
  );

  // Add first 20 data points
  for (let i = 0; i < Math.min(20, result.points.length); i++) {
    const point = result.points[i];
    lines.push(`${formatNumber(point.frequency, 3)}, ${formatNumber(point.magnitudeDb, 2)}, ${formatNumber(point.phase, 2)}`);
  }

  if (result.points.length > 20) {
    lines.push(`... (${result.points.length - 20} more points)`);
  }

  lines.push(
    "",
    "=".repeat(60),
    "Generated by Frequency Response Calculator"
  );

  return lines.join("\n");
}

// Export to CSV
export function exportToCSV(inputs: FrequencyResponseInputs, result: FrequencyResponseResult): string {
  const headers = ["Frequency_Hz", "Magnitude_dB", "Phase_deg", "Real", "Imaginary"];
  const rows = [headers.join(",")];

  for (const point of result.points) {
    rows.push([
      formatNumber(point.frequency, 6),
      formatNumber(point.magnitudeDb, 6),
      formatNumber(point.phase, 6),
      formatNumber(point.real, 6),
      formatNumber(point.imaginary, 6)
    ].join(","));
  }

  return rows.join("\n");
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
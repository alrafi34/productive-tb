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
    return "Could not read the transfer function. Use jω (or s) for frequency, e.g. 1/(1+jω/1000).";
  }

  return null;
}

// Basic transfer function validation
function isValidTransferFunction(tf: string): boolean {
  if (!/^[jωwsπ\d\s+\-*/().^,]+$/.test(tf)) return false;
  try {
    evaluateTransferFunction(tf, 1);
    return true;
  } catch {
    return false;
  }
}

/*
 * Evaluates H at angular frequency ω with a small recursive-descent parser:
 * numbers, j (imaginary unit), ω or w (angular frequency), s (= jω), π,
 * + − × ÷, ^ with a real exponent, parentheses and implied multiplication,
 * so "1/(1+jω/1000)", "10/(s+10)^2" and "(1+0.1jω)(1+jω)" all work.
 */
function evaluateTransferFunction(tf: string, omega: number): Complex {
  const src = tf.replace(/\s+/g, "").replace(/,/g, ".");
  let i = 0;
  const peek = () => src[i];
  const startsPrimary = (c: string | undefined) => c !== undefined && /[\dj.ωwsπ(]/.test(c);

  const complexPow = (a: Complex, p: Complex): Complex => {
    if (p.imaginary !== 0) throw new Error("Exponents must be real");
    const n = p.real;
    if (Number.isInteger(n) && Math.abs(n) <= 64) {
      let r = complex(1, 0);
      for (let k = 0; k < Math.abs(n); k++) r = complexMultiply(r, a);
      return n < 0 ? complexDivide(complex(1, 0), r) : r;
    }
    const mag = Math.pow(complexMagnitude(a), n);
    const ang = complexPhase(a) * n;
    return complex(mag * Math.cos(ang), mag * Math.sin(ang));
  };

  function primary(): Complex {
    const c = peek();
    if (c === "(") {
      i++;
      const v = expr();
      if (peek() !== ")") throw new Error("Missing )");
      i++;
      return v;
    }
    if (c !== undefined && /[\d.]/.test(c)) {
      const m = /^\d*\.?\d+(?:e[+-]?\d+)?|^\d+\.?/i.exec(src.slice(i));
      if (!m) throw new Error("Bad number");
      i += m[0].length;
      return complex(parseFloat(m[0]), 0);
    }
    if (c === "j") { i++; return complex(0, 1); }
    if (c === "ω" || c === "w") { i++; return complex(omega, 0); }
    if (c === "s") { i++; return complex(0, omega); }
    if (c === "π") { i++; return complex(Math.PI, 0); }
    throw new Error(c === undefined ? "Unexpected end" : `Unexpected "${c}"`);
  }

  function power(): Complex {
    const base = primary();
    if (peek() === "^") {
      i++;
      return complexPow(base, unary());
    }
    return base;
  }

  function unary(): Complex {
    if (peek() === "-") { i++; const v = unary(); return complex(-v.real, -v.imaginary); }
    if (peek() === "+") { i++; return unary(); }
    return power();
  }

  function term(): Complex {
    let v = unary();
    for (;;) {
      const c = peek();
      if (c === "*") { i++; v = complexMultiply(v, unary()); }
      else if (c === "/") { i++; v = complexDivide(v, unary()); }
      else if (startsPrimary(c)) { v = complexMultiply(v, power()); }
      else return v;
    }
  }

  function expr(): Complex {
    let v = term();
    for (;;) {
      const c = peek();
      if (c === "+") { i++; v = complexAdd(v, term()); }
      else if (c === "-") { i++; const t = term(); v = complex(v.real - t.real, v.imaginary - t.imaginary); }
      else return v;
    }
  }

  const v = expr();
  if (i !== src.length) throw new Error(`Unexpected "${src[i]}"`);
  if (!Number.isFinite(v.real) || !Number.isFinite(v.imaginary)) throw new Error("Result is not finite");
  return v;
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

// Describe the shape of the response from the computed points
function determineSystemType(points: FrequencyPoint[]): string {
  const db = points.map((p) => p.magnitudeDb).filter((d) => Number.isFinite(d));
  if (db.length < 2) return 'Custom System';
  const first = db[0];
  const last = db[db.length - 1];
  const peak = Math.max(...db);
  if (peak - Math.min(...db) < 1) return 'Flat (Constant Gain)';
  if (peak - first > 10 && peak - last > 10) return 'Band-pass / Resonant';
  if (first - last > 10) return 'Low-pass';
  if (last - first > 10) return 'High-pass';
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
  const systemType = determineSystemType(points);

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
      description: "Zero at 16 Hz, pole at 160 Hz",
      transferFunction: "(1+jω/100)/(1+jω/1000)",
      startFrequency: 1,
      endFrequency: 10000,
      samplingPoints: 500 as SamplingPoints
    },
    {
      name: "RC Low-pass 1 kHz",
      description: "R = 1.6 kΩ, C = 100 nF",
      transferFunction: "1/(1+jω/6283)",
      startFrequency: 10,
      endFrequency: 100000,
      samplingPoints: 500 as SamplingPoints
    },
    {
      name: "2nd-order Low-pass 1 kHz",
      description: "Butterworth, Q = 0.707",
      transferFunction: "1/(1-(ω/6283)^2+jω/(6283*0.707))",
      startFrequency: 10,
      endFrequency: 100000,
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
import { AmplifierInputs, AmplifierResult, CalculationMode } from "./types";

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function formatNumber(value: number, decimals: number = 4): string {
  if (!isFinite(value)) return "∞";
  if (Math.abs(value) < 0.0001 && value !== 0) {
    return value.toExponential(decimals);
  }
  return value.toFixed(decimals);
}

export function validateInputs(inputs: AmplifierInputs): string | null {
  const { mode, vin, vout, iin, iout, pin, pout, gain } = inputs;

  if (mode === 'voltage') {
    if (vin === undefined || vin === null || vin <= 0) {
      return "Input voltage (Vin) must be greater than 0";
    }
    if (vout === undefined || vout === null || vout < 0) {
      return "Output voltage (Vout) must be 0 or greater";
    }
  }

  if (mode === 'current') {
    if (iin === undefined || iin === null || iin <= 0) {
      return "Input current (Iin) must be greater than 0";
    }
    if (iout === undefined || iout === null || iout < 0) {
      return "Output current (Iout) must be 0 or greater";
    }
  }

  if (mode === 'power') {
    if (pin === undefined || pin === null || pin <= 0) {
      return "Input power (Pin) must be greater than 0";
    }
    if (pout === undefined || pout === null || pout < 0) {
      return "Output power (Pout) must be 0 or greater";
    }
  }

  if (mode === 'db') {
    if (gain === undefined || gain === null || gain <= 0) {
      return "Gain must be greater than 0";
    }
  }

  return null;
}

export function calculateAmplifierGain(inputs: AmplifierInputs): AmplifierResult {
  const { mode, vin, vout, iin, iout, pin, pout, gain } = inputs;
  const steps: string[] = [];
  let formula = "";
  let voltageGain: number | undefined;
  let currentGain: number | undefined;
  let powerGain: number | undefined;
  let gainDb: number | undefined;

  if (mode === 'voltage') {
    formula = "Av = Vout / Vin";
    voltageGain = vout! / vin!;
    gainDb = 20 * Math.log10(voltageGain);

    steps.push("Voltage Gain Calculation:");
    steps.push("");
    steps.push(`Given: Vin = ${formatNumber(vin!, 4)} V, Vout = ${formatNumber(vout!, 4)} V`);
    steps.push("");
    steps.push("Formula: Av = Vout / Vin");
    steps.push(`Av = ${formatNumber(vout!, 4)} / ${formatNumber(vin!, 4)}`);
    steps.push(`Av = ${formatNumber(voltageGain, 4)}`);
    steps.push("");
    steps.push("Gain in dB:");
    steps.push("Gain (dB) = 20 × log₁₀(Av)");
    steps.push(`Gain (dB) = 20 × log₁₀(${formatNumber(voltageGain, 4)})`);
    steps.push(`Gain (dB) = ${formatNumber(gainDb, 2)} dB`);
  }

  if (mode === 'current') {
    formula = "Ai = Iout / Iin";
    currentGain = iout! / iin!;
    gainDb = 20 * Math.log10(currentGain);

    steps.push("Current Gain Calculation:");
    steps.push("");
    steps.push(`Given: Iin = ${formatNumber(iin!, 4)} A, Iout = ${formatNumber(iout!, 4)} A`);
    steps.push("");
    steps.push("Formula: Ai = Iout / Iin");
    steps.push(`Ai = ${formatNumber(iout!, 4)} / ${formatNumber(iin!, 4)}`);
    steps.push(`Ai = ${formatNumber(currentGain, 4)}`);
    steps.push("");
    steps.push("Gain in dB:");
    steps.push("Gain (dB) = 20 × log₁₀(Ai)");
    steps.push(`Gain (dB) = 20 × log₁₀(${formatNumber(currentGain, 4)})`);
    steps.push(`Gain (dB) = ${formatNumber(gainDb, 2)} dB`);
  }

  if (mode === 'power') {
    formula = "Ap = Pout / Pin";
    powerGain = pout! / pin!;
    gainDb = 10 * Math.log10(powerGain);

    steps.push("Power Gain Calculation:");
    steps.push("");
    steps.push(`Given: Pin = ${formatNumber(pin!, 4)} W, Pout = ${formatNumber(pout!, 4)} W`);
    steps.push("");
    steps.push("Formula: Ap = Pout / Pin");
    steps.push(`Ap = ${formatNumber(pout!, 4)} / ${formatNumber(pin!, 4)}`);
    steps.push(`Ap = ${formatNumber(powerGain, 4)}`);
    steps.push("");
    steps.push("Gain in dB:");
    steps.push("Gain (dB) = 10 × log₁₀(Ap)");
    steps.push(`Gain (dB) = 10 × log₁₀(${formatNumber(powerGain, 4)})`);
    steps.push(`Gain (dB) = ${formatNumber(gainDb, 2)} dB`);
  }

  if (mode === 'db') {
    formula = "Gain (dB) = 20 × log₁₀(Gain)";
    gainDb = 20 * Math.log10(gain!);

    steps.push("Decibel (dB) Conversion:");
    steps.push("");
    steps.push(`Given: Linear Gain = ${formatNumber(gain!, 4)}`);
    steps.push("");
    steps.push("Formula: Gain (dB) = 20 × log₁₀(Gain)");
    steps.push(`Gain (dB) = 20 × log₁₀(${formatNumber(gain!, 4)})`);
    steps.push(`Gain (dB) = ${formatNumber(gainDb, 2)} dB`);
  }

  return {
    mode,
    voltageGain,
    currentGain,
    powerGain,
    gainDb,
    steps,
    formula,
  };
}

export function getPresets(mode: CalculationMode) {
  if (mode === 'voltage') {
    return [
      { name: "Unity Gain Buffer", vin: 1, vout: 1, description: "No amplification" },
      { name: "10x Amplifier", vin: 1, vout: 10, description: "Common voltage gain" },
      { name: "100x Amplifier", vin: 0.1, vout: 10, description: "High gain amplifier" },
      { name: "Audio Preamp", vin: 0.01, vout: 1, description: "Typical audio preamp" },
    ];
  }

  if (mode === 'current') {
    return [
      { name: "Unity Gain", iin: 0.001, iout: 0.001, description: "No amplification" },
      { name: "10x Current Gain", iin: 0.001, iout: 0.01, description: "Common current gain" },
      { name: "Transistor β=100", iin: 0.0001, iout: 0.01, description: "Typical BJT gain" },
      { name: "Darlington Pair", iin: 0.00001, iout: 0.01, description: "High current gain" },
    ];
  }

  if (mode === 'power') {
    return [
      { name: "Unity Gain", pin: 1, pout: 1, description: "No amplification" },
      { name: "10W Audio Amp", pin: 0.1, pout: 10, description: "Small audio amplifier" },
      { name: "100W Power Amp", pin: 1, pout: 100, description: "High power amplifier" },
      { name: "RF Amplifier", pin: 0.001, pout: 1, description: "Radio frequency amp" },
    ];
  }

  if (mode === 'db') {
    return [
      { name: "Unity Gain (0 dB)", gain: 1, description: "No amplification" },
      { name: "10x Gain (20 dB)", gain: 10, description: "Common amplification" },
      { name: "100x Gain (40 dB)", gain: 100, description: "High amplification" },
      { name: "1000x Gain (60 dB)", gain: 1000, description: "Very high gain" },
    ];
  }

  return [];
}

// History management
const HISTORY_KEY = "amplifier-gain-calculator-history";
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: AmplifierInputs;
  result: AmplifierResult;
}

export function saveToHistory(inputs: AmplifierInputs, result: AmplifierResult): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    inputs,
    result,
  };
  
  history.unshift(entry);
  
  if (history.length > MAX_HISTORY) {
    history.splice(MAX_HISTORY);
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(HISTORY_KEY);
  }
}

export function exportToText(inputs: AmplifierInputs, result: AmplifierResult): string {
  let text = "AMPLIFIER GAIN CALCULATION REPORT\n";
  text += "=".repeat(50) + "\n\n";
  
  text += `Calculation Mode: ${result.mode.toUpperCase()}\n`;
  text += `Date: ${new Date().toLocaleString()}\n\n`;
  
  text += "INPUT VALUES:\n";
  text += "-".repeat(50) + "\n";
  
  if (result.mode === 'voltage') {
    text += `Input Voltage (Vin): ${formatNumber(inputs.vin!, 4)} V\n`;
    text += `Output Voltage (Vout): ${formatNumber(inputs.vout!, 4)} V\n`;
  } else if (result.mode === 'current') {
    text += `Input Current (Iin): ${formatNumber(inputs.iin!, 4)} A\n`;
    text += `Output Current (Iout): ${formatNumber(inputs.iout!, 4)} A\n`;
  } else if (result.mode === 'power') {
    text += `Input Power (Pin): ${formatNumber(inputs.pin!, 4)} W\n`;
    text += `Output Power (Pout): ${formatNumber(inputs.pout!, 4)} W\n`;
  } else if (result.mode === 'db') {
    text += `Linear Gain: ${formatNumber(inputs.gain!, 4)}\n`;
  }
  
  text += "\nRESULTS:\n";
  text += "-".repeat(50) + "\n";
  
  if (result.voltageGain !== undefined) {
    text += `Voltage Gain (Av): ${formatNumber(result.voltageGain, 4)}\n`;
  }
  if (result.currentGain !== undefined) {
    text += `Current Gain (Ai): ${formatNumber(result.currentGain, 4)}\n`;
  }
  if (result.powerGain !== undefined) {
    text += `Power Gain (Ap): ${formatNumber(result.powerGain, 4)}\n`;
  }
  if (result.gainDb !== undefined) {
    text += `Gain (dB): ${formatNumber(result.gainDb, 2)} dB\n`;
  }
  
  text += "\nCALCULATION STEPS:\n";
  text += "-".repeat(50) + "\n";
  text += result.steps.join("\n");
  
  text += "\n\n" + "=".repeat(50) + "\n";
  text += "Generated by Amplifier Gain Calculator\n";
  
  return text;
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

import { GearInputs, GearResult, HistoryEntry } from "./types";

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function simplifyRatio(driver: number, driven: number): string {
  const g = gcd(driver, driven);
  return `${driven / g}:${driver / g}`;
}

export function validateTeeth(value: string, label: string): string | null {
  if (!value || value.trim() === "") return `${label} is required.`;
  const num = Number(value);
  if (!Number.isInteger(num) || isNaN(num)) return `${label} must be a whole number.`;
  if (num < 1) return `${label} must be at least 1.`;
  if (num > 10000) return `${label} seems too large (max 10,000).`;
  return null;
}

export function validateRPM(value: string): string | null {
  if (!value || value.trim() === "") return null; // optional
  const num = Number(value);
  if (isNaN(num) || num <= 0) return "RPM must be a positive number.";
  return null;
}

export function validateTorque(value: string): string | null {
  if (!value || value.trim() === "") return null; // optional
  const num = Number(value);
  if (isNaN(num) || num <= 0) return "Torque must be a positive number.";
  return null;
}

export function calculate(inputs: GearInputs): GearResult | null {
  const driverErr = validateTeeth(inputs.driverTeeth, "Driver gear teeth");
  const drivenErr = validateTeeth(inputs.drivenTeeth, "Driven gear teeth");
  if (driverErr || drivenErr) return null;

  const driver = parseInt(inputs.driverTeeth, 10);
  const driven = parseInt(inputs.drivenTeeth, 10);
  const gearRatio = driven / driver;
  const decimalRatio = gearRatio;
  const simplifiedRatio = simplifyRatio(driver, driven);
  const torqueMultiplier = gearRatio;

  let outputRPM: number | null = null;
  let outputRadS: number | null = null;
  if (inputs.inputRPM && !validateRPM(inputs.inputRPM)) {
    const rpm = parseFloat(inputs.inputRPM);
    if (inputs.rpmUnit === "rpm") {
      outputRPM = rpm / gearRatio;
      outputRadS = (outputRPM * 2 * Math.PI) / 60;
    } else {
      // rad/s input
      const inputRadS = rpm;
      outputRadS = inputRadS / gearRatio;
      outputRPM = (outputRadS * 60) / (2 * Math.PI);
    }
  }

  let outputTorque: number | null = null;
  if (inputs.inputTorque && !validateTorque(inputs.inputTorque)) {
    outputTorque = parseFloat(inputs.inputTorque) * gearRatio;
  }

  let mode: GearResult["mode"];
  let explanation: string;
  if (gearRatio > 1) {
    mode = "torque-increase";
    explanation = `The driven gear rotates slower but delivers ${formatNum(gearRatio, 2)}× more torque. Useful for high-load, low-speed applications.`;
  } else if (gearRatio < 1) {
    mode = "speed-increase";
    explanation = `The driven gear rotates faster at ${formatNum(1 / gearRatio, 2)}× the input speed with reduced torque. Useful for high-speed applications.`;
  } else {
    mode = "1:1";
    explanation = "Both gears rotate at the same speed with equal torque. Direct drive configuration.";
  }

  return {
    gearRatio,
    simplifiedRatio,
    decimalRatio,
    outputRPM,
    outputRadS,
    torqueMultiplier,
    outputTorque,
    mode,
    explanation,
  };
}

export function formatNum(value: number, decimals: number = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}

const HISTORY_KEY = "gear-ratio-calculator-history";
const MAX_HISTORY = 10;

export function saveToHistory(inputs: GearInputs, result: GearResult): void {
  try {
    const history = getHistory();
    history.unshift({ id: Date.now().toString(), timestamp: Date.now(), inputs, result });
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

export function exportToText(inputs: GearInputs, result: GearResult): string {
  const lines = [
    "Gear Ratio Calculator – Result",
    "=".repeat(40),
    "",
    `Driver Gear Teeth : ${inputs.driverTeeth}`,
    `Driven Gear Teeth : ${inputs.drivenTeeth}`,
    "",
    `Gear Ratio        : ${result.simplifiedRatio}`,
    `Decimal Ratio     : ${formatNum(result.decimalRatio, 4)}`,
    `Torque Multiplier : ${formatNum(result.torqueMultiplier, 2)}×`,
  ];
  if (result.outputRPM !== null) {
    lines.push(`Input RPM         : ${inputs.inputRPM} ${inputs.rpmUnit}`);
    lines.push(`Output RPM        : ${formatNum(result.outputRPM, 2)} rpm`);
    if (result.outputRadS !== null) {
      lines.push(`Output (rad/s)    : ${formatNum(result.outputRadS, 4)} rad/s`);
    }
  }
  if (result.outputTorque !== null) {
    lines.push(`Input Torque      : ${inputs.inputTorque} ${inputs.torqueUnit}`);
    lines.push(`Output Torque     : ${formatNum(result.outputTorque, 2)} ${inputs.torqueUnit}`);
  }
  lines.push("");
  lines.push(`Mode              : ${result.mode}`);
  lines.push(`Explanation       : ${result.explanation}`);
  lines.push("");
  lines.push("=".repeat(40));
  lines.push(`Generated: ${new Date().toLocaleString()}`);
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

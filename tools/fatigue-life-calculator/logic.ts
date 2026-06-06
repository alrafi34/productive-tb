import {
  FatigueInputs,
  FatigueResult,
  MaterialData,
  MinerLoad,
  CalculationMethod,
} from "./types";

// ─── Material Database ────────────────────────────────────────────────────────
export const MATERIAL_DATABASE: Record<string, MaterialData> = {
  steel: {
    name: "Steel",
    sigmaF: 900,
    b: -0.12,
    enduranceLimit: 250,
    ultimateStrength: 600,
  },
  aluminum: {
    name: "Aluminum",
    sigmaF: 400,
    b: -0.11,
    enduranceLimit: 140,
    ultimateStrength: 310,
  },
  titanium: {
    name: "Titanium",
    sigmaF: 800,
    b: -0.10,
    enduranceLimit: 350,
    ultimateStrength: 900,
  },
  copper: {
    name: "Copper",
    sigmaF: 300,
    b: -0.10,
    enduranceLimit: 70,
    ultimateStrength: 220,
  },
  custom: {
    name: "Custom",
    sigmaF: 900,
    b: -0.12,
    enduranceLimit: 250,
    ultimateStrength: 600,
  },
};

// ─── Temperature correction factors ──────────────────────────────────────────
export const TEMPERATURE_FACTORS: Record<string, number> = {
  room: 1.0,
  high: 0.85,
  extreme: 0.65,
};

// ─── Unit conversion ──────────────────────────────────────────────────────────
export function toMPa(value: number, unit: string): number {
  return unit === "psi" ? value * 0.00689476 : value;
}

export function fromMPa(value: number, unit: string): number {
  return unit === "psi" ? value / 0.00689476 : value;
}

// ─── Basquin Equation: N = 0.5 * (σa / σ'f)^(1/b) ──────────────────────────
export function basquinLife(
  stressMPa: number,
  sigmaF: number,
  b: number
): number {
  if (stressMPa <= 0 || sigmaF <= 0 || b >= 0) return 0;
  return 0.5 * Math.pow(stressMPa / sigmaF, 1 / b);
}

// ─── S-N Curve interpolation (simplified: uses Basquin under the hood) ───────
export function snCurveLife(
  stressMPa: number,
  material: MaterialData
): number {
  return basquinLife(stressMPa, material.sigmaF, material.b);
}

// ─── Miner's Rule ─────────────────────────────────────────────────────────────
export function minersRule(
  loads: MinerLoad[],
  sigmaF: number,
  b: number
): { damageRatio: number; failurePredicted: boolean } {
  let D = 0;
  for (const load of loads) {
    const N = basquinLife(load.stressAmplitude, sigmaF, b);
    if (N > 0) D += load.cycles / N;
  }
  return { damageRatio: D, failurePredicted: D >= 1 };
}

// ─── Risk classification ──────────────────────────────────────────────────────
export function classifyRisk(
  stressMPa: number,
  enduranceLimit: number,
  safeLimitMPa: number
): FatigueResult["riskLevel"] {
  const ratio = stressMPa / enduranceLimit;
  if (stressMPa <= safeLimitMPa) return "Safe";
  if (ratio < 0.6) return "Low Risk";
  if (ratio < 0.85) return "Moderate";
  if (ratio < 1.0) return "High Risk";
  return "Critical";
}

// ─── S-N Curve data points for chart ─────────────────────────────────────────
export function generateSNCurvePoints(
  sigmaF: number,
  b: number,
  enduranceLimit: number
): { logN: number; stressMPa: number }[] {
  const points: { logN: number; stressMPa: number }[] = [];
  // Generate from N=1e3 to N=1e8
  for (let logN = 3; logN <= 8; logN += 0.2) {
    const N = Math.pow(10, logN);
    // σa = σ'f * (2N)^b
    const stress = sigmaF * Math.pow(2 * N, b);
    if (stress >= enduranceLimit) {
      points.push({ logN, stressMPa: Math.max(stress, enduranceLimit) });
    } else {
      points.push({ logN, stressMPa: enduranceLimit });
    }
  }
  return points;
}

// ─── Format large numbers ──────────────────────────────────────────────────────
export function formatCycles(n: number): string {
  if (!isFinite(n) || n <= 0) return "∞ (infinite life)";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B cycles";
  if (n >= 1e6) return (n / 1e6).toFixed(3) + "M cycles";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K cycles";
  return Math.round(n).toLocaleString() + " cycles";
}

export function formatNumber(n: number, decimals = 2): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

// ─── Validation ───────────────────────────────────────────────────────────────
export function validateInputs(inputs: FatigueInputs): string | null {
  const stressMPa = toMPa(inputs.stressAmplitude, inputs.stressUnit);

  if (inputs.method === "basquin" || inputs.method === "sn-curve") {
    if (!inputs.stressAmplitude || inputs.stressAmplitude <= 0) {
      return "Stress amplitude must be greater than zero.";
    }
    if (inputs.method === "basquin") {
      if (!inputs.fatigueStrengthCoefficient || inputs.fatigueStrengthCoefficient <= 0) {
        return "Fatigue strength coefficient (σ'f) must be greater than zero.";
      }
      if (!inputs.fatigueStrengthExponent || inputs.fatigueStrengthExponent >= 0) {
        return "Fatigue strength exponent (b) must be a negative value (e.g. -0.12).";
      }
    }
    if (stressMPa > 5000) {
      return "Stress amplitude exceeds realistic range (> 5000 MPa). Please verify your input.";
    }
  }

  if (inputs.method === "miners-rule") {
    if (!inputs.minerLoads || inputs.minerLoads.length === 0) {
      return "Add at least one load block for Miner's Rule calculation.";
    }
    for (const load of inputs.minerLoads) {
      if (load.stressAmplitude <= 0) {
        return "All stress amplitudes in load blocks must be greater than zero.";
      }
      if (load.cycles <= 0) {
        return "All cycle counts in load blocks must be greater than zero.";
      }
    }
    if (!inputs.fatigueStrengthCoefficient || inputs.fatigueStrengthCoefficient <= 0) {
      return "Fatigue strength coefficient (σ'f) is required for Miner's Rule.";
    }
    if (!inputs.fatigueStrengthExponent || inputs.fatigueStrengthExponent >= 0) {
      return "Fatigue strength exponent (b) must be negative for Miner's Rule.";
    }
  }

  if (inputs.safetyFactor < 1 || inputs.safetyFactor > 5) {
    return "Safety factor must be between 1.0 and 5.0.";
  }

  return null;
}

// ─── Main calculation ─────────────────────────────────────────────────────────
export function calculateFatigueLife(inputs: FatigueInputs): FatigueResult {
  const mat = MATERIAL_DATABASE[inputs.material] ?? MATERIAL_DATABASE.steel;
  const tempFactor = TEMPERATURE_FACTORS[inputs.temperature] ?? 1.0;

  const stressMPa = toMPa(inputs.stressAmplitude, inputs.stressUnit);
  const sigmaF = inputs.material === "custom" ? inputs.fatigueStrengthCoefficient : mat.sigmaF;
  const b = inputs.material === "custom" ? inputs.fatigueStrengthExponent : mat.b;

  // For Basquin method, use user-supplied σ'f and b directly
  const effSigmaF = inputs.method === "basquin" ? inputs.fatigueStrengthCoefficient : sigmaF;
  const effB = inputs.method === "basquin" ? inputs.fatigueStrengthExponent : b;

  const enduranceLimit = mat.enduranceLimit * tempFactor;
  const safeLimitMPa = enduranceLimit / inputs.safetyFactor;

  const snCurvePoints = generateSNCurvePoints(effSigmaF, effB, enduranceLimit);
  const warnings: string[] = [];
  const steps: string[] = [];

  let estimatedLifeCycles = 0;
  let adjustedLifeCycles = 0;
  let damageRatio: number | undefined;
  let failurePredicted: boolean | undefined;
  let formula = "";
  let userPoint: FatigueResult["userPoint"] = null;

  if (inputs.method === "basquin" || inputs.method === "sn-curve") {
    // N = 0.5 * (σa / σ'f)^(1/b)
    estimatedLifeCycles = basquinLife(stressMPa, effSigmaF, effB);
    adjustedLifeCycles = estimatedLifeCycles / inputs.safetyFactor;

    formula =
      inputs.method === "basquin"
        ? `N = 0.5 × (σa / σ'f)^(1/b) = 0.5 × (${stressMPa.toFixed(1)} / ${effSigmaF})^(1/${effB})`
        : `S-N Curve: σa = σ'f × (2N)^b → N = 0.5 × (σa / σ'f)^(1/b)`;

    steps.push(`Input stress amplitude: ${stressMPa.toFixed(2)} MPa`);
    steps.push(`Fatigue strength coefficient (σ'f): ${effSigmaF} MPa`);
    steps.push(`Fatigue strength exponent (b): ${effB}`);
    steps.push(`Temperature factor: ${tempFactor} (${inputs.temperature})`);
    steps.push(`Endurance limit (adjusted): ${enduranceLimit.toFixed(1)} MPa`);
    steps.push("");
    steps.push(`Step 1: N = 0.5 × (${stressMPa.toFixed(2)} / ${effSigmaF})^(1/${effB})`);
    steps.push(`Step 2: N = 0.5 × ${(stressMPa / effSigmaF).toExponential(4)}^(${(1 / effB).toFixed(4)})`);
    steps.push(`Step 3: Estimated N = ${estimatedLifeCycles.toExponential(3)} cycles`);
    steps.push(`Step 4: Adjusted N (÷ ${inputs.safetyFactor} safety factor) = ${adjustedLifeCycles.toExponential(3)} cycles`);

    if (isFinite(estimatedLifeCycles) && estimatedLifeCycles > 0) {
      userPoint = { logN: Math.log10(estimatedLifeCycles), stressMPa };
    }

    if (stressMPa > enduranceLimit) {
      warnings.push(`Stress (${stressMPa.toFixed(1)} MPa) exceeds the endurance limit (${enduranceLimit.toFixed(1)} MPa). Fatigue failure is expected.`);
    }
    if (stressMPa > mat.ultimateStrength * tempFactor) {
      warnings.push(`Stress exceeds ultimate tensile strength of ${mat.name}. Static failure may occur.`);
    }
    if (adjustedLifeCycles < 1000) {
      warnings.push("Very short estimated life. Consider redesigning the component or reducing stress.");
    }
  }

  if (inputs.method === "miners-rule") {
    const miner = minersRule(inputs.minerLoads, effSigmaF, effB);
    damageRatio = miner.damageRatio;
    failurePredicted = miner.failurePredicted;

    formula = `D = Σ(n / N) = ${inputs.minerLoads
      .map((l) => {
        const N = basquinLife(l.stressAmplitude, effSigmaF, effB);
        return `(${l.cycles} / ${N.toExponential(2)})`;
      })
      .join(" + ")}`;

    steps.push(`Miner's Rule: D = Σ(n_i / N_i)`);
    steps.push(`σ'f = ${effSigmaF} MPa, b = ${effB}`);
    steps.push("");
    let dTotal = 0;
    inputs.minerLoads.forEach((load, i) => {
      const N = basquinLife(load.stressAmplitude, effSigmaF, effB);
      const di = load.cycles / N;
      dTotal += di;
      steps.push(
        `Block ${i + 1}: σ=${load.stressAmplitude} MPa, n=${load.cycles.toLocaleString()}, N=${N.toExponential(3)}, d=${di.toFixed(4)}`
      );
    });
    steps.push("");
    steps.push(`Total damage D = ${dTotal.toFixed(4)}`);
    steps.push(dTotal >= 1 ? "D ≥ 1 → Fatigue failure predicted" : "D < 1 → No failure predicted");

    estimatedLifeCycles = failurePredicted ? 0 : Infinity;
    adjustedLifeCycles = estimatedLifeCycles;

    if (failurePredicted) {
      warnings.push("Cumulative damage D ≥ 1. Fatigue failure is predicted under the given loading spectrum.");
    }
    if (damageRatio > 0.8 && damageRatio < 1) {
      warnings.push(`Damage ratio (${damageRatio.toFixed(3)}) is approaching failure threshold (1.0). Inspect component soon.`);
    }
  }

  const riskLevel = inputs.method === "miners-rule"
    ? (failurePredicted ? "Critical" : damageRatio! > 0.8 ? "High Risk" : damageRatio! > 0.5 ? "Moderate" : "Safe")
    : classifyRisk(stressMPa, enduranceLimit, safeLimitMPa);

  return {
    method: inputs.method,
    estimatedLifeCycles,
    adjustedLifeCycles,
    safetyFactor: inputs.safetyFactor,
    damageRatio,
    failurePredicted,
    riskLevel,
    enduranceLimit,
    exceedsEnduranceLimit: stressMPa > enduranceLimit,
    temperatureFactor: tempFactor,
    formula,
    steps,
    warnings,
    snCurvePoints,
    userPoint,
  };
}

// ─── LocalStorage history ─────────────────────────────────────────────────────
const HISTORY_KEY = "fatigue-life-calculator-history";

export function saveToHistory(
  inputs: FatigueInputs,
  result: FatigueResult
): void {
  try {
    const history = getHistory();
    history.unshift({
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
  } catch {
    // silent
  }
}

export function getHistory() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // silent
  }
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function exportToText(inputs: FatigueInputs, result: FatigueResult): string {
  const mat = MATERIAL_DATABASE[inputs.material];
  const lines: string[] = [
    "FATIGUE LIFE CALCULATOR – REPORT",
    "=".repeat(40),
    `Date: ${new Date().toLocaleString()}`,
    "",
    "INPUTS",
    "-".repeat(30),
    `Calculation Method: ${inputs.method}`,
    `Material: ${mat?.name ?? "Custom"}`,
    `Stress Amplitude: ${inputs.stressAmplitude} ${inputs.stressUnit}`,
    `Safety Factor: ${inputs.safetyFactor}`,
    `Temperature: ${inputs.temperature}`,
    "",
    "RESULTS",
    "-".repeat(30),
    `Estimated Life: ${formatCycles(result.estimatedLifeCycles)}`,
    `Adjusted Life (with SF): ${formatCycles(result.adjustedLifeCycles)}`,
    `Risk Level: ${result.riskLevel}`,
    `Endurance Limit: ${result.enduranceLimit.toFixed(1)} MPa`,
    result.damageRatio !== undefined
      ? `Miner's Damage Ratio: ${result.damageRatio.toFixed(4)}`
      : "",
    "",
    "CALCULATION STEPS",
    "-".repeat(30),
    ...result.steps,
    "",
    result.warnings.length > 0 ? "WARNINGS" : "",
    ...result.warnings.map((w) => `⚠ ${w}`),
  ];
  return lines.filter((l) => l !== undefined).join("\n");
}

export function exportToCSV(inputs: FatigueInputs, result: FatigueResult): string {
  const rows = [
    ["Parameter", "Value"],
    ["Method", inputs.method],
    ["Material", MATERIAL_DATABASE[inputs.material]?.name ?? "Custom"],
    ["Stress Amplitude", `${inputs.stressAmplitude} ${inputs.stressUnit}`],
    ["Safety Factor", inputs.safetyFactor],
    ["Temperature", inputs.temperature],
    ["Estimated Life (cycles)", result.estimatedLifeCycles],
    ["Adjusted Life (cycles)", result.adjustedLifeCycles],
    ["Risk Level", result.riskLevel],
    ["Endurance Limit (MPa)", result.enduranceLimit.toFixed(1)],
    result.damageRatio !== undefined
      ? ["Miner's Damage Ratio", result.damageRatio.toFixed(4)]
      : [],
  ];
  return rows
    .filter((r) => r.length > 0)
    .map((r) => r.join(","))
    .join("\n");
}

export function downloadFile(
  content: string,
  filename: string,
  mimeType = "text/plain"
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Debounce ─────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

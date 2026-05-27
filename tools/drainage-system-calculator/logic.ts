import {
  CalcMode, AreaUnit, PipeMaterial, DrainageInputs, DrainageResult, HistoryEntry, LandPreset,
} from "./types";

// ── Manning's n values ──────────────────────────────────────────────────────
export const MANNING_N: Record<PipeMaterial, number> = {
  pvc:        0.009,
  hdpe:       0.011,
  concrete:   0.013,
  steel:      0.012,
  "cast-iron":0.014,
  clay:       0.015,
};

export const MATERIAL_LABELS: Record<PipeMaterial, string> = {
  pvc:        "PVC (n=0.009)",
  hdpe:       "HDPE (n=0.011)",
  concrete:   "Concrete (n=0.013)",
  steel:      "Steel (n=0.012)",
  "cast-iron":"Cast Iron (n=0.014)",
  clay:       "Clay (n=0.015)",
};

// ── Runoff coefficients ─────────────────────────────────────────────────────
export const SURFACE_COEFFICIENTS: Record<string, { label: string; c: number }> = {
  concrete:    { label: "Concrete / Pavement", c: 0.90 },
  asphalt:     { label: "Asphalt",             c: 0.85 },
  residential: { label: "Residential Area",    c: 0.50 },
  commercial:  { label: "Commercial Area",     c: 0.70 },
  gravel:      { label: "Gravel Surface",      c: 0.35 },
  grass:       { label: "Grass / Lawn",        c: 0.20 },
  "clay-soil": { label: "Clay Soil",           c: 0.40 },
  "sandy-soil":{ label: "Sandy Soil",          c: 0.15 },
  forest:      { label: "Forest / Woodland",   c: 0.10 },
};

// ── Area conversion to m² ───────────────────────────────────────────────────
export function toM2(value: number, unit: AreaUnit): number {
  if (unit === "hectare") return value * 10_000;
  if (unit === "acre")    return value * 4_046.86;
  return value; // m²
}

// ── Rational Method: Q = C × I × A ─────────────────────────────────────────
// I in mm/hr, A in m² → Q in m³/s
// Standard form: Q (m³/s) = C × I(mm/hr) × A(ha) / 360
// We convert A to hectares internally
function rationalMethod(C: number, I: number, areaM2: number): number {
  const areaHa = areaM2 / 10_000;
  return (C * I * areaHa) / 360;
}

// ── Manning's Equation for full circular pipe ───────────────────────────────
// Q = (1/n) × A × R^(2/3) × S^(1/2)
// D in meters, S as fraction (not %)
function manningPipe(D: number, n: number, S: number): { Q: number; V: number } {
  const A = Math.PI * D * D / 4;
  const R = D / 4; // hydraulic radius for full circle
  const Q = (1 / n) * A * Math.pow(R, 2 / 3) * Math.pow(S, 0.5);
  const V = Q / A;
  return { Q, V };
}

// ── Manning's for rectangular open channel ──────────────────────────────────
function manningChannel(W: number, H: number, n: number, S: number): { Q: number; V: number } {
  const A = W * H;
  const P = W + 2 * H;
  const R = A / P;
  const Q = (1 / n) * A * Math.pow(R, 2 / 3) * Math.pow(S, 0.5);
  const V = Q / A;
  return { Q, V };
}

// ── Recommend pipe diameter to carry a given Q ──────────────────────────────
function recommendPipeDiameter(Q: number, n: number, S: number): number {
  // Solve D from Q = (1/n) × (π D²/4) × (D/4)^(2/3) × S^(1/2)
  // Iterate
  const diameters = [100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1200, 1500];
  for (const d of diameters) {
    const { Q: cap } = manningPipe(d / 1000, n, S);
    if (cap >= Q) return d;
  }
  return 1500;
}

// ── Overflow risk ───────────────────────────────────────────────────────────
function overflowRisk(runoff: number, pipeCapacity: number): DrainageResult["overflowRisk"] {
  if (pipeCapacity <= 0) return "low";
  const ratio = runoff / pipeCapacity;
  if (ratio < 0.6)  return "low";
  if (ratio < 0.85) return "moderate";
  if (ratio < 1.0)  return "high";
  return "critical";
}

// ── Main calculation ────────────────────────────────────────────────────────
export function calculate(inputs: DrainageInputs): DrainageResult | null {
  const area    = parseFloat(inputs.area);
  const I       = parseFloat(inputs.rainfallIntensity);
  const C       = inputs.runoffCoefficient;
  const D_mm    = parseFloat(inputs.pipeDiameter);
  const slopePct= parseFloat(inputs.slope);
  const W       = parseFloat(inputs.channelWidth);
  const H       = parseFloat(inputs.channelDepth);
  const n       = MANNING_N[inputs.pipeMaterial];
  const S       = slopePct / 100;

  const areaM2  = isNaN(area) ? 0 : toM2(area, inputs.areaUnit);
  const recommendations: string[] = [];
  const warnings: string[] = [];

  let runoffFlowRate: number | undefined;
  let runoffFlowRateLps: number | undefined;
  let runoffFlowRateCfs: number | undefined;
  let pipeFlowRate: number | undefined;
  let pipeFlowRateLps: number | undefined;
  let pipeVelocity: number | undefined;
  let pipeFillPct: number | undefined;
  let channelFlowRate: number | undefined;
  let channelVelocity: number | undefined;
  let recommendedPipeDiameter: number | undefined;
  let recommendedSlope: number | undefined;
  let risk: DrainageResult["overflowRisk"] = "low";

  // ── Peak Runoff ──
  if (inputs.mode === "runoff" || inputs.mode === "stormwater" || inputs.mode === "drainage-area") {
    if (!isNaN(area) && area > 0 && !isNaN(I) && I > 0) {
      runoffFlowRate    = rationalMethod(C, I, areaM2);
      runoffFlowRateLps = runoffFlowRate * 1000;
      runoffFlowRateCfs = runoffFlowRate * 35.3147;

      if (C > 0.8) recommendations.push("High runoff coefficient detected. Consider permeable surfaces or retention basins.");
      if (I > 100) recommendations.push("Extreme rainfall intensity. Design for 100-year storm event.");
      if (runoffFlowRate > 1) warnings.push("Very high runoff flow. Verify pipe and channel sizing carefully.");

      // Recommend pipe if slope is given
      if (!isNaN(slopePct) && slopePct > 0) {
        recommendedPipeDiameter = recommendPipeDiameter(runoffFlowRate, n, S);
        if (recommendedPipeDiameter >= 600) {
          recommendations.push(`Large pipe required (${recommendedPipeDiameter} mm). Consider multiple smaller pipes or open channel.`);
        }
      }
    }
  }

  // ── Pipe Capacity ──
  if (inputs.mode === "pipe" || inputs.mode === "stormwater") {
    if (!isNaN(D_mm) && D_mm > 0 && !isNaN(slopePct) && slopePct > 0) {
      const D_m = D_mm / 1000;
      const { Q, V } = manningPipe(D_m, n, S);
      pipeFlowRate    = Q;
      pipeFlowRateLps = Q * 1000;
      pipeVelocity    = V;

      if (runoffFlowRate !== undefined) {
        pipeFillPct = Math.min(100, (runoffFlowRate / Q) * 100);
        risk = overflowRisk(runoffFlowRate, Q);
        if (risk === "critical") warnings.push("Pipe capacity exceeded. Increase diameter or slope.");
        if (risk === "high")     warnings.push("Pipe near capacity. Consider upsizing by one standard size.");
      } else {
        pipeFillPct = 100; // full pipe assumed
      }

      if (V < 0.6) recommendations.push("Flow velocity below 0.6 m/s. Increase slope to prevent sediment buildup.");
      if (V > 3.0) warnings.push("Flow velocity above 3.0 m/s. Risk of pipe erosion. Reduce slope or use harder material.");
      if (slopePct < 0.4) recommendations.push("Slope below 0.4%. Minimum recommended slope for self-cleansing is 0.4%.");
    }
  }

  // ── Channel Flow ──
  if (inputs.mode === "channel") {
    if (!isNaN(W) && W > 0 && !isNaN(H) && H > 0 && !isNaN(slopePct) && slopePct > 0) {
      const { Q, V } = manningChannel(W, H, n, S);
      channelFlowRate = Q;
      channelVelocity = V;

      if (runoffFlowRate !== undefined) {
        risk = overflowRisk(runoffFlowRate, Q);
        if (risk === "critical") warnings.push("Channel capacity exceeded. Increase width or depth.");
      }

      if (V < 0.3) recommendations.push("Low channel velocity. Increase slope to prevent sedimentation.");
      if (V > 2.5) warnings.push("High channel velocity may cause erosion. Consider lining or energy dissipation.");
    }
  }

  // ── Drainage Area Design ──
  if (inputs.mode === "drainage-area") {
    if (!isNaN(slopePct) && slopePct > 0 && runoffFlowRate !== undefined) {
      recommendedPipeDiameter = recommendPipeDiameter(runoffFlowRate, n, S);
      recommendedSlope = slopePct < 0.5 ? 0.5 : slopePct;
      if (recommendedSlope !== slopePct) {
        recommendations.push(`Slope increased to ${recommendedSlope}% for minimum self-cleansing velocity.`);
      }
    }
  }

  // General recommendations
  if (recommendations.length === 0 && warnings.length === 0) {
    recommendations.push("Design appears adequate for given parameters.");
  }
  if (inputs.pipeMaterial === "pvc") {
    recommendations.push("PVC pipes offer smooth flow and corrosion resistance — ideal for residential drainage.");
  }

  return {
    mode: inputs.mode,
    runoffFlowRate,
    runoffFlowRateLps,
    runoffFlowRateCfs,
    pipeFlowRate,
    pipeFlowRateLps,
    pipeVelocity,
    pipeFillPct,
    channelFlowRate,
    channelVelocity,
    recommendedPipeDiameter,
    recommendedSlope,
    overflowRisk: risk,
    recommendations,
    warnings,
    manningsN: n,
    areaM2,
    timestamp: Date.now(),
  };
}

// ── Formatting ──────────────────────────────────────────────────────────────
export function fmt(v: number, decimals = 4): string {
  if (isNaN(v) || !isFinite(v)) return "—";
  return v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtFlow(v: number): string {
  if (isNaN(v) || !isFinite(v)) return "—";
  if (v < 0.001) return `${(v * 1_000_000).toFixed(2)} mL/s`;
  if (v < 1)     return `${(v * 1000).toFixed(3)} L/s`;
  return `${v.toFixed(4)} m³/s`;
}

// ── Debounce ────────────────────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  } as T;
}

// ── LocalStorage history ────────────────────────────────────────────────────
const HISTORY_KEY = "drainage_system_calc_history";

export function saveToHistory(inputs: DrainageInputs, result: DrainageResult): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    inputs,
    result,
  };
  history.unshift(entry);
  if (history.length > 20) history.pop();
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch {}
}

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch {}
}

// ── Config save/load ────────────────────────────────────────────────────────
const CONFIG_KEY = "drainage_system_calc_config";

export function saveConfig(inputs: DrainageInputs): void {
  try { localStorage.setItem(CONFIG_KEY, JSON.stringify(inputs)); } catch {}
}

export function loadConfig(): DrainageInputs | null {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

// ── Export ──────────────────────────────────────────────────────────────────
export function exportToText(inputs: DrainageInputs, result: DrainageResult): string {
  const lines: string[] = [
    "DRAINAGE SYSTEM CALCULATOR REPORT",
    "==================================",
    `Date: ${new Date(result.timestamp).toLocaleString("en-US")}`,
    "",
    "INPUTS",
    "------",
    `Calculation Mode: ${inputs.mode}`,
    `Land Area: ${inputs.area} ${inputs.areaUnit} (${result.areaM2.toFixed(2)} m²)`,
    `Rainfall Intensity: ${inputs.rainfallIntensity} mm/hr`,
    `Runoff Coefficient (C): ${inputs.runoffCoefficient}`,
    `Pipe Diameter: ${inputs.pipeDiameter} mm`,
    `Pipe Material: ${inputs.pipeMaterial} (n=${result.manningsN})`,
    `Slope: ${inputs.slope}%`,
    `Drain Length: ${inputs.drainLength} m`,
    "",
    "RESULTS",
    "-------",
  ];

  if (result.runoffFlowRate !== undefined) {
    lines.push(`Peak Runoff Flow Rate: ${result.runoffFlowRate.toFixed(6)} m³/s`);
    lines.push(`  = ${result.runoffFlowRateLps?.toFixed(3)} L/s`);
    lines.push(`  = ${result.runoffFlowRateCfs?.toFixed(3)} ft³/s`);
  }
  if (result.pipeFlowRate !== undefined) {
    lines.push(`Pipe Capacity: ${result.pipeFlowRate.toFixed(6)} m³/s (${result.pipeFlowRateLps?.toFixed(3)} L/s)`);
    lines.push(`Pipe Velocity: ${result.pipeVelocity?.toFixed(3)} m/s`);
    lines.push(`Pipe Fill: ${result.pipeFillPct?.toFixed(1)}%`);
  }
  if (result.recommendedPipeDiameter !== undefined) {
    lines.push(`Recommended Pipe Diameter: ${result.recommendedPipeDiameter} mm`);
  }
  lines.push(`Overflow Risk: ${result.overflowRisk.toUpperCase()}`);
  lines.push("");
  lines.push("RECOMMENDATIONS");
  lines.push("---------------");
  result.recommendations.forEach(r => lines.push(`• ${r}`));
  if (result.warnings.length > 0) {
    lines.push("");
    lines.push("WARNINGS");
    lines.push("--------");
    result.warnings.forEach(w => lines.push(`⚠ ${w}`));
  }
  lines.push("");
  lines.push("Generated by Drainage System Calculator – productiveTB.com");
  return lines.join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Presets ─────────────────────────────────────────────────────────────────
export const LAND_PRESETS: LandPreset[] = [
  {
    label: "Residential Lot",
    description: "Typical suburban residential area",
    inputs: { mode: "runoff", area: "0.5", areaUnit: "hectare", rainfallIntensity: "50", runoffCoefficient: 0.5, pipeMaterial: "pvc", slope: "1.5" },
  },
  {
    label: "Agricultural Field",
    description: "Flat farmland with clay soil",
    inputs: { mode: "runoff", area: "5", areaUnit: "hectare", rainfallIntensity: "40", runoffCoefficient: 0.35, pipeMaterial: "concrete", slope: "0.5" },
  },
  {
    label: "Parking Lot",
    description: "Paved commercial parking area",
    inputs: { mode: "runoff", area: "2000", areaUnit: "m2", rainfallIntensity: "75", runoffCoefficient: 0.9, pipeMaterial: "concrete", slope: "2" },
  },
  {
    label: "Road Drainage",
    description: "Highway stormwater drainage",
    inputs: { mode: "pipe", area: "1", areaUnit: "hectare", rainfallIntensity: "60", runoffCoefficient: 0.85, pipeDiameter: "450", pipeMaterial: "concrete", slope: "1" },
  },
  {
    label: "Garden / Lawn",
    description: "Residential garden with grass",
    inputs: { mode: "runoff", area: "500", areaUnit: "m2", rainfallIntensity: "30", runoffCoefficient: 0.2, pipeMaterial: "pvc", slope: "2" },
  },
  {
    label: "Construction Site",
    description: "Bare soil construction area",
    inputs: { mode: "drainage-area", area: "1", areaUnit: "hectare", rainfallIntensity: "80", runoffCoefficient: 0.7, pipeMaterial: "concrete", slope: "1" },
  },
];

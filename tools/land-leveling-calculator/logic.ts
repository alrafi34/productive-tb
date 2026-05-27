import {
  CalculatorInputs,
  CalculationResult,
  GridCell,
  HistoryEntry,
  InputUnit,
  OutputUnit,
} from "./types";

// ── Unit conversion ───────────────────────────────────────────────────────────

const FT_TO_M = 0.3048;
const M_TO_FT = 1 / FT_TO_M;

/** Convert a volume in m³ to the requested output unit */
export function convertVolumeFromM3(m3: number, unit: OutputUnit): number {
  if (unit === "m3") return m3;
  if (unit === "ft3") return m3 * 35.3147;
  if (unit === "yd3") return m3 * 1.30795;
  return m3;
}

/** Convert a linear value from input unit to meters */
function toMeters(val: number, unit: InputUnit): number {
  return unit === "ft" ? val * FT_TO_M : val;
}

// ── Formatting ────────────────────────────────────────────────────────────────

export function smartFormat(n: number, decimals = 2): string {
  if (!isFinite(n) || isNaN(n)) return "0";
  if (n === 0) return "0";
  if (Math.abs(n) >= 1000000) return (n / 1000000).toFixed(2) + "M";
  if (Math.abs(n) >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
  return n.toFixed(decimals).replace(/\.?0+$/, "") || "0";
}

export const OUTPUT_UNIT_LABELS: Record<OutputUnit, string> = {
  ft3: "Cubic Feet",
  m3:  "Cubic Meters",
  yd3: "Cubic Yards",
};

export const OUTPUT_UNIT_SHORT: Record<OutputUnit, string> = {
  ft3: "ft³",
  m3:  "m³",
  yd3: "yd³",
};

export const ALL_OUTPUT_UNITS: OutputUnit[] = ["ft3", "m3", "yd3"];

export const INPUT_UNIT_LABELS: Record<InputUnit, string> = {
  ft: "Feet",
  m:  "Meters",
};

export const INPUT_UNIT_SHORT: Record<InputUnit, string> = {
  ft: "ft",
  m:  "m",
};

// ── Grid parsing ──────────────────────────────────────────────────────────────

export function parseGridData(raw: string): number[][] | null {
  const rows = raw
    .trim()
    .split(/\n/)
    .map((row) =>
      row
        .split(/[,\t ]+/)
        .map((v) => v.trim())
        .filter((v) => v !== "")
        .map(Number)
    )
    .filter((row) => row.length > 0);

  if (rows.length === 0) return null;

  // Validate all values are numbers
  for (const row of rows) {
    for (const v of row) {
      if (isNaN(v)) return null;
    }
  }

  // Ensure all rows have the same length
  const cols = rows[0].length;
  if (rows.some((r) => r.length !== cols)) return null;

  return rows;
}

// ── Core calculation ──────────────────────────────────────────────────────────

export function calculate(inputs: CalculatorInputs): CalculationResult | null {
  const { mode, unit, outputUnit } = inputs;
  const cf = parseFloat(inputs.mode === "simple" ? inputs.simple.compactionFactor : inputs.grid.compactionFactor) || 1.0;

  if (mode === "simple") {
    const { length, width, currentElevation, targetElevation } = inputs.simple;
    const l = parseFloat(length);
    const w = parseFloat(width);
    const cur = parseFloat(currentElevation);
    const tgt = parseFloat(targetElevation);

    if (!isFinite(l) || !isFinite(w) || !isFinite(cur) || !isFinite(tgt)) return null;
    if (l <= 0 || w <= 0) return null;

    const area = l * w;
    const diff = tgt - cur;
    const rawVolumeInUnit = area * Math.abs(diff);

    // Convert to m³ for canonical storage
    const areaM2 = toMeters(l, unit) * toMeters(w, unit);
    const diffM = toMeters(Math.abs(diff), unit);
    const rawM3 = areaM2 * diffM;

    const fillVolume = diff > 0 ? convertVolumeFromM3(rawM3, outputUnit) : 0;
    const cutVolume  = diff < 0 ? convertVolumeFromM3(rawM3, outputUnit) : 0;
    const netEarthwork = fillVolume - cutVolume;

    const steps: string[] = [
      `Area = ${smartFormat(l)} × ${smartFormat(w)} = ${smartFormat(area)} ${unit}²`,
      `Height Difference = ${smartFormat(tgt)} − ${smartFormat(cur)} = ${smartFormat(diff, 3)} ${unit}`,
      `Raw Volume = ${smartFormat(area)} × ${smartFormat(Math.abs(diff), 3)} = ${smartFormat(rawVolumeInUnit)} ${unit}³`,
      diff > 0
        ? `Fill Required: ${smartFormat(rawVolumeInUnit)} ${unit}³`
        : diff < 0
        ? `Cut Required: ${smartFormat(rawVolumeInUnit)} ${unit}³`
        : "No leveling required — land is already at target elevation",
      cf !== 1.0 ? `Compaction Adjusted (×${cf}): ${smartFormat(rawVolumeInUnit * cf)} ${unit}³` : "",
    ].filter(Boolean);

    const m3 = rawM3;
    const ft3 = convertVolumeFromM3(m3, "ft3");
    const yd3 = convertVolumeFromM3(m3, "yd3");

    return {
      mode,
      unit,
      outputUnit,
      area,
      heightDiff: diff,
      totalVolume: convertVolumeFromM3(rawM3, outputUnit),
      fillVolume,
      cutVolume,
      netEarthwork,
      compactionFactor: cf,
      adjustedFillVolume: fillVolume * cf,
      adjustedCutVolume: cutVolume * cf,
      ft3,
      m3,
      yd3,
      steps,
      formula: `Volume = Length × Width × |Target − Current|`,
    };
  }

  // Grid mode
  const { gridData, cellSize, targetElevation } = inputs.grid;
  const cs = parseFloat(cellSize);
  const tgt = parseFloat(targetElevation);

  if (!isFinite(cs) || cs <= 0 || !isFinite(tgt)) return null;

  const parsed = parseGridData(gridData);
  if (!parsed || parsed.length === 0) return null;

  const cellAreaInUnit = cs * cs;
  const cellAreaM2 = toMeters(cs, unit) * toMeters(cs, unit);

  let totalFillM3 = 0;
  let totalCutM3 = 0;

  const gridCells: GridCell[][] = parsed.map((row, ri) =>
    row.map((elev, ci) => {
      const diff = tgt - elev;
      const volM3 = cellAreaM2 * Math.abs(diff);
      if (diff > 0) totalFillM3 += volM3;
      else if (diff < 0) totalCutM3 += volM3;
      return {
        row: ri,
        col: ci,
        elevation: elev,
        diff,
        volume: cellAreaInUnit * Math.abs(diff),
        type: diff > 0 ? "fill" : diff < 0 ? "cut" : "level",
      } as GridCell;
    })
  );

  const fillVolume = convertVolumeFromM3(totalFillM3, outputUnit);
  const cutVolume  = convertVolumeFromM3(totalCutM3, outputUnit);
  const netEarthwork = fillVolume - cutVolume;

  const totalCells = parsed.length * parsed[0].length;
  const steps: string[] = [
    `Grid: ${parsed.length} rows × ${parsed[0].length} cols = ${totalCells} cells`,
    `Cell Size: ${smartFormat(cs)} ${unit} → Cell Area: ${smartFormat(cellAreaInUnit)} ${unit}²`,
    `Target Elevation: ${smartFormat(tgt)} ${unit}`,
    `Fill Cells: ${gridCells.flat().filter((c) => c.type === "fill").length}`,
    `Cut Cells: ${gridCells.flat().filter((c) => c.type === "cut").length}`,
    `Total Fill Volume: ${smartFormat(fillVolume)} ${OUTPUT_UNIT_SHORT[outputUnit]}`,
    `Total Cut Volume: ${smartFormat(cutVolume)} ${OUTPUT_UNIT_SHORT[outputUnit]}`,
    `Net Earthwork: ${smartFormat(Math.abs(netEarthwork))} ${OUTPUT_UNIT_SHORT[outputUnit]} ${netEarthwork >= 0 ? "(net fill)" : "(net cut)"}`,
  ];

  return {
    mode,
    unit,
    outputUnit,
    gridCells,
    gridRows: parsed.length,
    gridCols: parsed[0].length,
    fillVolume,
    cutVolume,
    netEarthwork,
    compactionFactor: cf,
    adjustedFillVolume: fillVolume * cf,
    adjustedCutVolume: cutVolume * cf,
    ft3: convertVolumeFromM3(totalFillM3 + totalCutM3, "ft3"),
    m3: totalFillM3 + totalCutM3,
    yd3: convertVolumeFromM3(totalFillM3 + totalCutM3, "yd3"),
    steps,
    formula: `Cell Volume = Cell Area × |Target − Cell Elevation|`,
  };
}

// ── Debounce ──────────────────────────────────────────────────────────────────

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  } as T;
}

// ── LocalStorage history ──────────────────────────────────────────────────────

const HISTORY_KEY = "land_leveling_history";
const MAX_HISTORY = 20;

export function saveToHistory(inputs: CalculatorInputs, result: CalculationResult): void {
  try {
    const history = getHistory();
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputs,
      result,
    };
    history.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
  } catch {}
}

export function getHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {}
}

// ── Export ────────────────────────────────────────────────────────────────────

export function exportToText(inputs: CalculatorInputs, result: CalculationResult): string {
  const u = OUTPUT_UNIT_SHORT[result.outputUnit];
  const lines = [
    "Land Leveling Calculator – Report",
    "=".repeat(40),
    `Mode: ${result.mode === "simple" ? "Simple Average" : "Grid-Based"}`,
    `Unit: ${result.unit}`,
    "",
    result.mode === "simple"
      ? [
          `Land Area: ${smartFormat(result.area!)} ${result.unit}²`,
          `Current Elevation: ${inputs.simple.currentElevation} ${result.unit}`,
          `Target Elevation: ${inputs.simple.targetElevation} ${result.unit}`,
          `Height Difference: ${smartFormat(result.heightDiff!)} ${result.unit}`,
        ].join("\n")
      : [
          `Grid: ${result.gridRows} × ${result.gridCols} cells`,
          `Cell Size: ${inputs.grid.cellSize} ${result.unit}`,
          `Target Elevation: ${inputs.grid.targetElevation} ${result.unit}`,
        ].join("\n"),
    "",
    "Results",
    "-".repeat(20),
    `Fill Volume: ${smartFormat(result.fillVolume)} ${u}`,
    `Cut Volume: ${smartFormat(result.cutVolume)} ${u}`,
    `Net Earthwork: ${smartFormat(Math.abs(result.netEarthwork))} ${u} ${result.netEarthwork >= 0 ? "(net fill)" : "(net cut)"}`,
    `Compaction Factor: ×${result.compactionFactor}`,
    `Adjusted Fill: ${smartFormat(result.adjustedFillVolume)} ${u}`,
    `Adjusted Cut: ${smartFormat(result.adjustedCutVolume)} ${u}`,
    "",
    "Conversions",
    "-".repeat(20),
    `ft³: ${smartFormat(result.ft3)}`,
    `m³: ${smartFormat(result.m3)}`,
    `yd³: ${smartFormat(result.yd3)}`,
    "",
    `Generated: ${new Date().toLocaleString()}`,
  ];
  return lines.join("\n");
}

export function downloadFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToCSV(result: CalculationResult): string {
  if (result.mode === "simple") {
    const u = OUTPUT_UNIT_SHORT[result.outputUnit];
    return [
      "Metric,Value,Unit",
      `Area,${smartFormat(result.area!)},${result.unit}²`,
      `Height Difference,${smartFormat(result.heightDiff!)},${result.unit}`,
      `Fill Volume,${smartFormat(result.fillVolume)},${u}`,
      `Cut Volume,${smartFormat(result.cutVolume)},${u}`,
      `Net Earthwork,${smartFormat(Math.abs(result.netEarthwork))},${u}`,
      `Compaction Factor,${result.compactionFactor},x`,
      `Adjusted Fill,${smartFormat(result.adjustedFillVolume)},${u}`,
      `Adjusted Cut,${smartFormat(result.adjustedCutVolume)},${u}`,
    ].join("\n");
  }

  // Grid CSV
  const header = ["Row", "Col", "Elevation", "Diff", "Type", "Volume"].join(",");
  const rows = (result.gridCells || []).flat().map((c) =>
    [c.row + 1, c.col + 1, c.elevation, smartFormat(c.diff, 3), c.type, smartFormat(c.volume)].join(",")
  );
  return [header, ...rows].join("\n");
}

// ── URL share ─────────────────────────────────────────────────────────────────

export function generateShareUrl(inputs: CalculatorInputs): string {
  const params = new URLSearchParams();
  params.set("mode", inputs.mode);
  params.set("unit", inputs.unit);
  params.set("ounit", inputs.outputUnit);
  if (inputs.mode === "simple") {
    params.set("l", inputs.simple.length);
    params.set("w", inputs.simple.width);
    params.set("cur", inputs.simple.currentElevation);
    params.set("tgt", inputs.simple.targetElevation);
    params.set("cf", inputs.simple.compactionFactor);
  } else {
    params.set("cs", inputs.grid.cellSize);
    params.set("tgt", inputs.grid.targetElevation);
    params.set("cf", inputs.grid.compactionFactor);
  }
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function parseShareParams(): Partial<CalculatorInputs> | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  if (!p.has("mode")) return null;
  const mode = p.get("mode") as "simple" | "grid";
  const unit = (p.get("unit") || "ft") as "ft" | "m";
  const outputUnit = (p.get("ounit") || "ft3") as "ft3" | "m3" | "yd3";
  if (mode === "simple") {
    return {
      mode,
      unit,
      outputUnit,
      simple: {
        length: p.get("l") || "",
        width: p.get("w") || "",
        currentElevation: p.get("cur") || "",
        targetElevation: p.get("tgt") || "",
        compactionFactor: p.get("cf") || "1.0",
      },
    };
  }
  return {
    mode,
    unit,
    outputUnit,
    grid: {
      gridData: "",
      cellSize: p.get("cs") || "",
      targetElevation: p.get("tgt") || "",
      compactionFactor: p.get("cf") || "1.0",
    },
  };
}

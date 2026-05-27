"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculatorInputs,
  CalculationResult,
  HistoryEntry,
  InputUnit,
  OutputUnit,
} from "./types";
import {
  calculate,
  smartFormat,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  generateShareUrl,
  parseShareParams,
  OUTPUT_UNIT_LABELS,
  OUTPUT_UNIT_SHORT,
  ALL_OUTPUT_UNITS,
} from "./logic";
import LandLevelingCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: CalculatorInputs = {
  mode: "simple",
  unit: "ft",
  outputUnit: "ft3",
  simple: {
    length: "",
    width: "",
    currentElevation: "",
    targetElevation: "",
    compactionFactor: "1.0",
  },
  grid: {
    gridData: "",
    cellSize: "5",
    targetElevation: "",
    compactionFactor: "1.0",
  },
};

const PRESETS = [
  { label: "100×80 ft, Fill +3 ft",  inputs: { mode: "simple" as const, unit: "ft" as const, simple: { length: "100", width: "80", currentElevation: "2", targetElevation: "5", compactionFactor: "1.0" } } },
  { label: "50×30 m, Cut −2 m",      inputs: { mode: "simple" as const, unit: "m"  as const, simple: { length: "50",  width: "30", currentElevation: "8", targetElevation: "6", compactionFactor: "1.0" } } },
  { label: "200×150 ft, Fill +1 ft", inputs: { mode: "simple" as const, unit: "ft" as const, simple: { length: "200", width: "150", currentElevation: "3", targetElevation: "4", compactionFactor: "1.2" } } },
];

const GRID_EXAMPLE = `2.1, 2.3, 2.5\n2.2, 2.4, 2.8\n2.6, 2.7, 3.0`;

// ── Heatmap cell color ────────────────────────────────────────────────────────
function cellColor(diff: number, maxAbs: number): string {
  if (maxAbs === 0) return "bg-gray-100";
  const intensity = Math.min(1, Math.abs(diff) / maxAbs);
  if (diff > 0) {
    // fill → blue shades
    if (intensity > 0.66) return "bg-blue-500 text-white";
    if (intensity > 0.33) return "bg-blue-300 text-blue-900";
    return "bg-blue-100 text-blue-800";
  }
  if (diff < 0) {
    // cut → orange/red shades
    if (intensity > 0.66) return "bg-orange-500 text-white";
    if (intensity > 0.33) return "bg-orange-300 text-orange-900";
    return "bg-orange-100 text-orange-800";
  }
  return "bg-green-100 text-green-800";
}

export default function LandLevelingCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const initialized = useRef(false);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    if (!initialized.current) {
      initialized.current = true;
      const shared = parseShareParams();
      if (shared) setInputs((p) => ({ ...p, ...shared }));
    }
    firstRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => { setResult(calculate(inputs)); }, 150),
    [inputs]
  );
  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));
  const setSimple = (key: keyof CalculatorInputs["simple"], val: string) =>
    setInputs((p) => ({ ...p, simple: { ...p.simple, [key]: val.replace(/[^0-9.]/g, "") } }));
  const setGrid = (key: keyof CalculatorInputs["grid"], val: string) =>
    setInputs((p) => ({ ...p, grid: { ...p.grid, [key]: key === "gridData" ? val : val.replace(/[^0-9.]/g, "") } }));

  const handleReset = () => { setInputs(DEFAULT_INPUTS); setResult(null); firstRef.current?.focus(); };
  const handlePreset = (p: typeof PRESETS[0]) =>
    setInputs((prev) => ({
      ...prev,
      mode: p.inputs.mode,
      unit: p.inputs.unit,
      simple: { ...prev.simple, ...p.inputs.simple },
    }));

  const handleCopy = () => {
    if (!result) return;
    const u = OUTPUT_UNIT_SHORT[result.outputUnit];
    const text = [
      `Land Leveling Summary`,
      result.mode === "simple"
        ? `Area: ${smartFormat(result.area!)} ${result.unit}² | Diff: ${smartFormat(result.heightDiff!)} ${result.unit}`
        : `Grid: ${result.gridRows}×${result.gridCols} cells`,
      `Fill: ${smartFormat(result.fillVolume)} ${u} | Cut: ${smartFormat(result.cutVolume)} ${u}`,
      `Net: ${smartFormat(Math.abs(result.netEarthwork))} ${u} ${result.netEarthwork >= 0 ? "(net fill)" : "(net cut)"}`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const url = generateShareUrl(inputs);
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleExportTxt = () => {
    if (!result) return;
    downloadFile(exportToText(inputs, result), "land-leveling-report.txt");
  };

  const handleExportCSV = () => {
    if (!result) return;
    downloadFile(exportToCSV(result), "land-leveling-report.csv");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const u = inputs.unit;
  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  // For heatmap
  const allDiffs = result?.gridCells?.flat().map((c) => Math.abs(c.diff)) ?? [];
  const maxAbsDiff = allDiffs.length ? Math.max(...allDiffs) : 0;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⛰️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Land Leveling Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate cut and fill volume to level land. Supports simple average elevation and grid-based methods for construction, farming, and site grading projects.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              {/* Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["simple", "grid"] as const).map((m) => (
                    <button key={m} onClick={() => set("mode", m)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.mode === m ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {m === "simple" ? "📐 Simple" : "🔢 Grid"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["ft", "m"] as InputUnit[]).map((u) => (
                    <button key={u} onClick={() => set("unit", u)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.unit === u ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {u === "ft" ? "Feet" : "Meters"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Unit</label>
                <select value={inputs.outputUnit} onChange={(e) => set("outputUnit", e.target.value as OutputUnit)} className={selectCls}>
                  {ALL_OUTPUT_UNITS.map((u) => (
                    <option key={u} value={u}>{OUTPUT_UNIT_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              {/* Formula hint */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                {inputs.mode === "simple" ? (
                  <>
                    <div className="font-mono">Area = L × W</div>
                    <div className="font-mono">Volume = Area × |Target − Current|</div>
                  </>
                ) : (
                  <>
                    <div className="font-mono">Cell Vol = Cell Area × |Target − Elev|</div>
                    <div className="font-mono">Total = Σ Cell Volumes</div>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  🔄 Reset
                </button>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📜 {showHistory ? "Hide" : "Show"} History
                </button>
                {result && (
                  <>
                    <button onClick={handleExportTxt} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                      📄 Export TXT
                    </button>
                    <button onClick={handleExportCSV} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                      📊 Export CSV
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                {result
                  ? result.fillVolume > 0 && result.cutVolume === 0
                    ? "Fill Required"
                    : result.cutVolume > 0 && result.fillVolume === 0
                    ? "Cut Required"
                    : "Net Earthwork"
                  : "Result"}
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result
                  ? result.fillVolume > 0 && result.cutVolume === 0
                    ? smartFormat(result.fillVolume)
                    : result.cutVolume > 0 && result.fillVolume === 0
                    ? smartFormat(result.cutVolume)
                    : smartFormat(Math.abs(result.netEarthwork))
                  : "—"}
              </div>
              {result && (
                <div className="text-primary-100 text-sm mb-3">{OUTPUT_UNIT_SHORT[result.outputUnit]}</div>
              )}

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Fill Volume:</span>
                    <span className="font-semibold">{smartFormat(result.fillVolume)} {OUTPUT_UNIT_SHORT[result.outputUnit]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cut Volume:</span>
                    <span className="font-semibold">{smartFormat(result.cutVolume)} {OUTPUT_UNIT_SHORT[result.outputUnit]}</span>
                  </div>
                  {result.compactionFactor !== 1.0 && (
                    <>
                      <div className="flex justify-between pt-1 border-t border-white/20 mt-1">
                        <span className="text-primary-100">Adj. Fill (×{result.compactionFactor}):</span>
                        <span className="font-semibold">{smartFormat(result.adjustedFillVolume)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Adj. Cut (×{result.compactionFactor}):</span>
                        <span className="font-semibold">{smartFormat(result.adjustedCutVolume)}</span>
                      </div>
                    </>
                  )}
                  {result.mode === "simple" && result.area !== undefined && (
                    <div className="flex justify-between pt-1 border-t border-white/20 mt-1">
                      <span className="text-primary-100">Area:</span>
                      <span className="font-semibold">{smartFormat(result.area)} {result.unit}²</span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <button onClick={handleCopy} disabled={!result} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed">
                  {copied ? "✓ Copied!" : "📋 Copy Result"}
                </button>
                <button onClick={handleSave} disabled={!result} className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  💾 Save to History
                </button>
                <button onClick={handleShare} disabled={!result} className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {shareCopied ? "✓ Link Copied!" : "🔗 Share Link"}
                </button>
              </div>
            </div>

          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* ── Simple Mode ── */}
            {inputs.mode === "simple" && (
              <>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Land Dimensions</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Length ({u})</label>
                      <input ref={firstRef} type="number" inputMode="decimal"
                        value={inputs.simple.length} onChange={(e) => setSimple("length", e.target.value)}
                        className={inputCls} placeholder="e.g. 100" min="0" step="any" />
                      <p className="text-xs text-gray-500 mt-1">Example: 100 ft</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Width ({u})</label>
                      <input type="number" inputMode="decimal"
                        value={inputs.simple.width} onChange={(e) => setSimple("width", e.target.value)}
                        className={inputCls} placeholder="e.g. 80" min="0" step="any" />
                      <p className="text-xs text-gray-500 mt-1">Example: 80 ft</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Elevation Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Ground Elevation ({u})</label>
                      <input type="number" inputMode="decimal"
                        value={inputs.simple.currentElevation} onChange={(e) => setSimple("currentElevation", e.target.value)}
                        className={inputCls} placeholder="e.g. 2" min="0" step="any" />
                      <p className="text-xs text-gray-500 mt-1">Average existing elevation</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target Level Elevation ({u})</label>
                      <input type="number" inputMode="decimal"
                        value={inputs.simple.targetElevation} onChange={(e) => setSimple("targetElevation", e.target.value)}
                        className={inputCls} placeholder="e.g. 5" min="0" step="any" />
                      <p className="text-xs text-gray-500 mt-1">Desired final elevation</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Soil Compaction Factor (optional)</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.simple.compactionFactor} onChange={(e) => setSimple("compactionFactor", e.target.value)}
                      className={inputCls} placeholder="1.0" min="1" max="2" step="0.05" />
                    <p className="text-xs text-gray-500 mt-1">1.0 = no adjustment · 1.2 = moderate · 1.3 = heavy compaction</p>
                  </div>

                  {/* Inline result */}
                  {result && result.mode === "simple" && (
                    <div className={`p-3 rounded-lg border text-sm ${
                      result.heightDiff === 0
                        ? "bg-green-50 border-green-200 text-green-800"
                        : result.heightDiff! > 0
                        ? "bg-blue-50 border-blue-200 text-blue-800"
                        : "bg-orange-50 border-orange-200 text-orange-800"
                    }`}>
                      {result.heightDiff === 0 ? (
                        <strong>No leveling required — land is already at target elevation.</strong>
                      ) : (
                        <>
                          <strong>Area: {smartFormat(result.area!)} {u}²</strong>
                          {" · "}
                          <strong>Diff: {result.heightDiff! > 0 ? "+" : ""}{smartFormat(result.heightDiff!)} {u}</strong>
                          {" → "}
                          <strong>
                            {result.heightDiff! > 0 ? "Fill" : "Cut"}: {smartFormat(result.heightDiff! > 0 ? result.fillVolume : result.cutVolume)} {OUTPUT_UNIT_SHORT[result.outputUnit]}
                          </strong>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Quick Presets */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Quick Presets</h3>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((p) => (
                      <button key={p.label} onClick={() => handlePreset(p)}
                        className="px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── Grid Mode ── */}
            {inputs.mode === "grid" && (
              <>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Grid Elevation Data</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Elevation Grid (comma-separated rows)</label>
                    <textarea
                      value={inputs.grid.gridData}
                      onChange={(e) => setGrid("gridData", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm resize-y"
                      rows={5}
                      placeholder={GRID_EXAMPLE}
                      aria-label="Grid elevation data"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter one row per line, values separated by commas. Example: 2.1, 2.3, 2.5</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cell Size ({u})</label>
                      <input type="number" inputMode="decimal"
                        value={inputs.grid.cellSize} onChange={(e) => setGrid("cellSize", e.target.value)}
                        className={inputCls} placeholder="e.g. 5" min="0" step="any" />
                      <p className="text-xs text-gray-500 mt-1">Width/height of each grid cell</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target Elevation ({u})</label>
                      <input type="number" inputMode="decimal"
                        value={inputs.grid.targetElevation} onChange={(e) => setGrid("targetElevation", e.target.value)}
                        className={inputCls} placeholder="e.g. 2.7" min="0" step="any" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Soil Compaction Factor (optional)</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.grid.compactionFactor} onChange={(e) => setGrid("compactionFactor", e.target.value)}
                      className={inputCls} placeholder="1.0" min="1" max="2" step="0.05" />
                    <p className="text-xs text-gray-500 mt-1">1.0 = no adjustment · 1.2 = moderate · 1.3 = heavy</p>
                  </div>
                  <button
                    onClick={() => setGrid("gridData", GRID_EXAMPLE)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                    Load Example Grid
                  </button>
                </div>

                {/* Heatmap visualization */}
                {result?.gridCells && result.gridCells.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                      Cut / Fill Heatmap
                    </h3>
                    <div className="overflow-x-auto">
                      <div className="inline-block min-w-full">
                        {result.gridCells.map((row, ri) => (
                          <div key={ri} className="flex gap-1 mb-1">
                            {row.map((cell, ci) => (
                              <div
                                key={ci}
                                className={`flex-shrink-0 w-12 h-10 rounded flex flex-col items-center justify-center text-xs font-mono ${cellColor(cell.diff, maxAbsDiff)}`}
                                title={`Row ${ri + 1}, Col ${ci + 1}: Elev=${cell.elevation}, Diff=${cell.diff > 0 ? "+" : ""}${smartFormat(cell.diff, 2)}`}
                              >
                                <span className="font-semibold text-xs leading-none">{cell.elevation}</span>
                                <span className="text-xs leading-none opacity-75">{cell.diff > 0 ? "+" : ""}{smartFormat(cell.diff, 1)}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded bg-blue-400"></div>
                        <span>Fill required</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded bg-orange-400"></div>
                        <span>Cut required</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded bg-green-200"></div>
                        <span>Level</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── Results Summary (both modes) ── */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Leveling Summary
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    ...(result.mode === "simple" && result.area !== undefined
                      ? [{ label: "Total Area", value: `${smartFormat(result.area)} ${result.unit}²`, highlight: false }]
                      : result.mode === "grid"
                      ? [{ label: "Grid Size", value: `${result.gridRows}×${result.gridCols}`, highlight: false }]
                      : []),
                    ...(result.mode === "simple" && result.heightDiff !== undefined
                      ? [{ label: "Height Diff", value: `${result.heightDiff > 0 ? "+" : ""}${smartFormat(result.heightDiff)} ${result.unit}`, highlight: false }]
                      : []),
                    { label: "Fill Volume",  value: `${smartFormat(result.fillVolume)} ${OUTPUT_UNIT_SHORT[result.outputUnit]}`,  highlight: result.fillVolume > 0 && result.cutVolume === 0 },
                    { label: "Cut Volume",   value: `${smartFormat(result.cutVolume)} ${OUTPUT_UNIT_SHORT[result.outputUnit]}`,   highlight: result.cutVolume > 0 && result.fillVolume === 0 },
                    { label: "Net Earthwork", value: `${smartFormat(Math.abs(result.netEarthwork))} ${OUTPUT_UNIT_SHORT[result.outputUnit]} ${result.netEarthwork >= 0 ? "(fill)" : "(cut)"}`, highlight: true },
                    ...(result.compactionFactor !== 1.0
                      ? [
                          { label: `Adj. Fill (×${result.compactionFactor})`, value: `${smartFormat(result.adjustedFillVolume)} ${OUTPUT_UNIT_SHORT[result.outputUnit]}`, highlight: false },
                          { label: `Adj. Cut (×${result.compactionFactor})`,  value: `${smartFormat(result.adjustedCutVolume)} ${OUTPUT_UNIT_SHORT[result.outputUnit]}`,  highlight: false },
                        ]
                      : []),
                  ].map(({ label, value, highlight }) => (
                    <div key={label} className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold break-all text-sm ${highlight ? "text-primary text-base" : "text-gray-900"}`}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Volume Conversions */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Volume Conversions
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {(["ft3", "m3", "yd3"] as OutputUnit[]).map((unit) => {
                    const val = result[unit as keyof CalculationResult] as number;
                    const isSelected = inputs.outputUnit === unit;
                    return (
                      <div key={unit}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}
                        onClick={() => set("outputUnit", unit)}>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{OUTPUT_UNIT_LABELS[unit]}</div>
                        <div className={`font-bold text-lg break-all ${isSelected ? "text-primary" : "text-gray-900"}`}>{smartFormat(val)}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{OUTPUT_UNIT_SHORT[unit]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step-by-step */}
            {result && result.steps.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Breakdown</h3>
                  <button onClick={() => setShowSteps(!showSteps)} className="text-sm text-primary font-medium hover:underline">
                    {showSteps ? "Hide" : "Show"}
                  </button>
                </div>
                {showSteps ? (
                  <ol className="space-y-2">
                    {result.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">{i + 1}</span>
                        <code className="font-mono text-gray-700 bg-gray-50 px-2 py-0.5 rounded text-xs">{step}</code>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-gray-500">Click Show to see the full calculation steps.</p>
                )}
              </div>
            )}

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Calculation History</h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No calculations saved yet</div>
                  ) : (
                    history.map((entry) => (
                      <div key={entry.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm capitalize">
                            {entry.inputs.mode === "simple"
                              ? `${entry.inputs.simple.length}×${entry.inputs.simple.width} ${entry.inputs.unit}`
                              : `Grid · ${entry.result.gridRows}×${entry.result.gridCols}`}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          Fill: {smartFormat(entry.result.fillVolume)} · Cut: {smartFormat(entry.result.cutVolume)} {OUTPUT_UNIT_SHORT[entry.result.outputUnit]}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <LandLevelingCalculatorSEO />
      <RelatedTools
        currentTool="land-leveling-calculator"
        tools={[
          "earth-filling-calculator",
          "soil-volume-calculator",
          "excavation-cost-calculator",
          "land-area-calculator",
          "cut-and-fill-calculator",
          "land-slope-calculator",
        ]}
      />
    </>
  );
}

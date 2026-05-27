"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculatorInputs,
  CalculationResult,
  CompactionFactor,
  HistoryEntry,
  InputUnit,
  OutputUnit,
  ShapeType,
  SoilType,
} from "./types";
import {
  calculate,
  smartFormat,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  SHAPE_LABELS,
  ALL_SHAPES,
  INPUT_UNIT_LABELS,
  INPUT_UNIT_SHORT,
  ALL_INPUT_UNITS,
  OUTPUT_UNIT_LABELS,
  OUTPUT_UNIT_SHORT,
  ALL_OUTPUT_UNITS,
  COMPACTION_LABELS,
  ALL_COMPACTIONS,
  SOIL_LABELS,
  ALL_SOIL_TYPES,
  TRUCK_CAPACITY_M3,
} from "./logic";
import EarthFillingCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ───────────────────────────────────────────────────────────────────

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  { label: "Road 50×30×2 ft",      inputs: { shape: "rectangle", unit: "ft", length: "50",  width: "30",  depth: "2",   compaction: "heavy"    } },
  { label: "Foundation 100×40 ft", inputs: { shape: "rectangle", unit: "ft", length: "100", width: "40",  depth: "1.5", compaction: "moderate" } },
  { label: "Pond 20×15×3 ft",      inputs: { shape: "rectangle", unit: "ft", length: "20",  width: "15",  depth: "3",   compaction: "loose"    } },
  { label: "Circular Ø30×2 ft",    inputs: { shape: "circular",  unit: "ft", diameter: "30",              depth: "2",   compaction: "moderate" } },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  shape:        "rectangle",
  unit:         "ft",
  outputUnit:   "ft3",
  length:       "",
  width:        "",
  depth:        "",
  diameter:     "",
  customArea:   "",
  compaction:   "moderate",
  soilType:     "mixed",
  truckCapacity: "",
  costPerUnit:  "",
};

export default function EarthFillingCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); firstRef.current?.focus(); }, []);

  const run = useCallback(debounce(() => { setResult(calculate(inputs)); }, 120), [inputs]);
  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));
  const setNum = (key: keyof CalculatorInputs, val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  const handleReset = () => { setInputs(DEFAULT_INPUTS); setResult(null); firstRef.current?.focus(); };
  const handlePreset = (p: (typeof PRESETS)[0]) =>
    setInputs((prev) => ({ ...prev, ...p.inputs }));

  const handleCopy = () => {
    if (!result) return;
    const text = `Earth Fill Estimate\nVolume: ${smartFormat(result.volumeInUnit)} ${OUTPUT_UNIT_SHORT[result.outputUnit]}\n${smartFormat(result.ft3)} ft³ | ${smartFormat(result.m3)} m³ | ${smartFormat(result.yd3)} yd³${result.truckloads ? `\nTruckloads: ${result.truckloads}` : ""}${result.estimatedCost ? `\nEst. Cost: $${smartFormat(result.estimatedCost)}` : ""}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };
  const handleExport = () => {
    if (!result) return;
    downloadFile(exportToText(inputs, result), "earth_fill_estimate.txt");
  };
  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const u = INPUT_UNIT_SHORT[inputs.unit];
  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  // Needs width field?
  const needsWidth = inputs.shape === "rectangle" || inputs.shape === "triangle";
  // Label overrides for triangle
  const lengthLabel = inputs.shape === "triangle" ? `Base (${u})` : inputs.shape === "square" ? `Side (${u})` : `Length (${u})`;
  const widthLabel  = inputs.shape === "triangle" ? `Height (${u})` : `Width (${u})`;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚜</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Earth Filling Calculator</h3>
              <p className="text-sm text-blue-800">
                Estimate fill material volume for construction, land filling, ponds, and foundations. Includes compaction adjustment, truckload estimation, and cost calculation.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              {/* Input unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Unit</label>
                <div className="grid grid-cols-3 gap-2">
                  {ALL_INPUT_UNITS.map((u) => (
                    <button key={u} onClick={() => set("unit", u)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.unit === u ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {u}
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

              {/* Compaction */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Compaction Factor</label>
                <select value={inputs.compaction} onChange={(e) => set("compaction", e.target.value as CompactionFactor)} className={selectCls}>
                  {ALL_COMPACTIONS.map((c) => (
                    <option key={c} value={c}>{COMPACTION_LABELS[c]}</option>
                  ))}
                </select>
              </div>

              {/* Soil type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                <select value={inputs.soilType} onChange={(e) => set("soilType", e.target.value as SoilType)} className={selectCls}>
                  {ALL_SOIL_TYPES.map((s) => (
                    <option key={s} value={s}>{SOIL_LABELS[s]}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Default truck capacity: {TRUCK_CAPACITY_M3[inputs.soilType]} m³
                </p>
              </div>

              {/* Formula hint */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                {inputs.shape === "rectangle" && <div className="font-mono">V = L × W × D × CF</div>}
                {inputs.shape === "square"    && <div className="font-mono">V = S² × D × CF</div>}
                {inputs.shape === "triangle"  && <div className="font-mono">V = 0.5 × B × H × D × CF</div>}
                {inputs.shape === "circular"  && <div className="font-mono">V = π × r² × D × CF</div>}
                {inputs.shape === "custom"    && <div className="font-mono">V = Area × D × CF</div>}
                <div className="text-gray-500">CF = compaction factor</div>
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
                  <button onClick={handleExport} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                    📄 Export TXT
                  </button>
                )}
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Fill Volume Required
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? smartFormat(result.volumeInUnit) : "—"}
              </div>
              {result && <div className="text-primary-100 text-sm mb-3">{OUTPUT_UNIT_SHORT[result.outputUnit]}</div>}

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">ft³:</span>
                    <span className="font-semibold">{smartFormat(result.ft3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">m³:</span>
                    <span className="font-semibold">{smartFormat(result.m3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">yd³:</span>
                    <span className="font-semibold">{smartFormat(result.yd3)}</span>
                  </div>
                  {result.truckloads !== undefined && (
                    <div className="flex justify-between pt-1 border-t border-white/20 mt-1">
                      <span className="text-primary-100">Truckloads:</span>
                      <span className="font-semibold">{result.truckloads} trucks</span>
                    </div>
                  )}
                  {result.estimatedCost !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Est. Cost:</span>
                      <span className="font-semibold">${smartFormat(result.estimatedCost)}</span>
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
              </div>
            </div>

          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Shape selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Fill Shape</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {ALL_SHAPES.map((s) => (
                  <button key={s} onClick={() => set("shape", s)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.shape === s ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    {SHAPE_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Dimensions</h3>

              {/* Rectangle / Square / Triangle */}
              {(inputs.shape === "rectangle" || inputs.shape === "square" || inputs.shape === "triangle") && (
                <div className={`grid gap-4 ${needsWidth ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{lengthLabel}</label>
                    <input ref={firstRef} type="number" inputMode="decimal"
                      value={inputs.length} onChange={(e) => setNum("length", e.target.value)}
                      className={inputCls} placeholder="e.g. 50" min="0" step="any" />
                  </div>
                  {needsWidth && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{widthLabel}</label>
                      <input type="number" inputMode="decimal"
                        value={inputs.width} onChange={(e) => setNum("width", e.target.value)}
                        className={inputCls} placeholder="e.g. 30" min="0" step="any" />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Depth / Fill Height ({u})</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.depth} onChange={(e) => setNum("depth", e.target.value)}
                      className={inputCls} placeholder="e.g. 2" min="0" step="any" />
                  </div>
                </div>
              )}

              {/* Circular */}
              {inputs.shape === "circular" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Diameter ({u})</label>
                    <input ref={firstRef} type="number" inputMode="decimal"
                      value={inputs.diameter} onChange={(e) => setNum("diameter", e.target.value)}
                      className={inputCls} placeholder="e.g. 30" min="0" step="any" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Depth / Fill Height ({u})</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.depth} onChange={(e) => setNum("depth", e.target.value)}
                      className={inputCls} placeholder="e.g. 2" min="0" step="any" />
                  </div>
                </div>
              )}

              {/* Custom */}
              {inputs.shape === "custom" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base Area ({u}²)</label>
                    <input ref={firstRef} type="number" inputMode="decimal"
                      value={inputs.customArea} onChange={(e) => setNum("customArea", e.target.value)}
                      className={inputCls} placeholder="e.g. 2000" min="0" step="any" />
                    <p className="text-xs text-gray-500 mt-1">Enter the cross-sectional area of the fill zone</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Depth / Fill Height ({u})</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.depth} onChange={(e) => setNum("depth", e.target.value)}
                      className={inputCls} placeholder="e.g. 1" min="0" step="any" />
                  </div>
                </div>
              )}

              {/* Inline result */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Raw: {smartFormat(result.rawVolumeM3)} m³</strong>
                  {" → "}
                  <strong>Adjusted (×{result.compactionFactor}): {smartFormat(result.adjustedVolumeM3)} m³</strong>
                </div>
              )}
            </div>

            {/* Optional: Truck + Cost */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Optional Estimates</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Truck Capacity ({OUTPUT_UNIT_SHORT[inputs.outputUnit]})
                  </label>
                  <input type="number" inputMode="decimal"
                    value={inputs.truckCapacity} onChange={(e) => setNum("truckCapacity", e.target.value)}
                    className={inputCls} placeholder={`default by soil type`} min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Leave blank to use soil-type default</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost per {OUTPUT_UNIT_SHORT[inputs.outputUnit]} ($)
                  </label>
                  <input type="number" inputMode="decimal"
                    value={inputs.costPerUnit} onChange={(e) => setNum("costPerUnit", e.target.value)}
                    className={inputCls} placeholder="e.g. 25" min="0" step="any" />
                </div>
              </div>
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

            {/* Volume Conversion Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Volume Conversions</h3>
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
                          <span className="font-semibold text-gray-900 text-sm">
                            {SHAPE_LABELS[entry.inputs.shape]} · {SOIL_LABELS[entry.inputs.soilType]}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {smartFormat(entry.result.m3)} m³ · {smartFormat(entry.result.ft3)} ft³
                          {entry.result.truckloads ? ` · ${entry.result.truckloads} trucks` : ""}
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

      <EarthFillingCalculatorSEO />
      <RelatedTools
        currentTool="earth-filling-calculator"
        tools={[
          "soil-volume-calculator",
          "cut-and-fill-calculator",
          "excavation-cost-calculator",
          "land-area-calculator-square-feet",
        ]}
      />
    </>
  );
}

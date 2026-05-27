"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculatorInputs, CalculationResult, HistoryEntry,
  RainfallUnit, AreaUnit, SurfaceType,
} from "./types";
import {
  calculate, fmtNum, fmtLiters, debounce,
  saveToHistory, getHistory, clearHistory,
  exportToText, downloadFile,
  SURFACE_COEFFICIENTS, SURFACE_LABELS, ALL_SURFACES,
  AREA_UNIT_LABELS, AREA_UNIT_SHORT,
  RAINFALL_UNIT_LABELS, ALL_AREA_UNITS, ALL_RAINFALL_UNITS,
  PRESETS,
} from "./logic";
import RainwaterRunoffCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: CalculatorInputs = {
  rainfall: "50",
  rainfallUnit: "mm",
  area: "100",
  areaUnit: "sqm",
  surfaceType: "grass",
  customCoefficient: "0.5",
};

const HARVEST_STYLES: Record<CalculationResult["harvestPotential"], string> = {
  "High":      "text-green-700 bg-green-50 border-green-200",
  "Moderate":  "text-blue-700 bg-blue-50 border-blue-200",
  "Low":       "text-yellow-700 bg-yellow-50 border-yellow-200",
  "Very Low":  "text-gray-600 bg-gray-50 border-gray-200",
};

export default function RainwaterRunoffCalculatorUI() {
  const [inputs, setInputs]           = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult]           = useState<CalculationResult | null>(null);
  const [copied, setCopied]           = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory]         = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => { setResult(calculate(inputs)); }, 120),
    [inputs]
  );
  useEffect(() => { run(); }, [inputs, run]);

  const set = <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) =>
    setInputs((p) => ({ ...p, [key]: value }));
  const setNum = (key: keyof CalculatorInputs, val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    firstRef.current?.focus();
  };

  const handlePreset = (p: typeof PRESETS[0]) =>
    setInputs((prev) => ({ ...DEFAULT_INPUTS, ...prev, ...p.inputs }));

  const handleCopy = () => {
    if (!result) return;
    const text = [
      "Rainwater Runoff Estimate",
      `Rainfall: ${inputs.rainfall} ${inputs.rainfallUnit}`,
      `Area: ${inputs.area} ${inputs.areaUnit}`,
      `Surface: ${SURFACE_LABELS[inputs.surfaceType]}`,
      `Coefficient: ${result.coefficient}`,
      `Runoff: ${fmtNum(result.runoffLiters, 0)} liters`,
      `= ${fmtNum(result.runoffCubicMeters, 3)} m³`,
      `≈ ${fmtNum(result.runoffBarrels, 1)} barrels`,
      `Harvest Potential: ${result.harvestPotential}`,
    ].join("\n");
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
    downloadFile(exportToText(inputs, result), "rainwater_runoff_report.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  const isCustom = inputs.surfaceType === "custom";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌧️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Rainwater Runoff Calculator</h3>
              <p className="text-sm text-blue-800">
                Estimate the volume of water runoff generated from rainfall over any land surface. Uses the
                Rational Runoff Formula: Runoff (L) = Rainfall (mm) × Area (m²) × Runoff Coefficient.
                Useful for stormwater planning, drainage design, and rainwater harvesting.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Settings
              </h3>

              {/* Surface Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Surface Type</label>
                <select
                  value={inputs.surfaceType}
                  onChange={(e) => set("surfaceType", e.target.value as SurfaceType)}
                  className={selectCls}
                  aria-label="Surface type"
                >
                  {ALL_SURFACES.map((s) => (
                    <option key={s} value={s}>{SURFACE_LABELS[s]}</option>
                  ))}
                </select>
                {!isCustom && (
                  <p className="text-xs text-gray-500 mt-1">
                    Coefficient: <strong>{SURFACE_COEFFICIENTS[inputs.surfaceType]}</strong> — higher = more runoff
                  </p>
                )}
              </div>

              {/* Custom Coefficient */}
              {isCustom && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Runoff Coefficient (0.0 – 1.0)
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.customCoefficient}
                    onChange={(e) => setNum("customCoefficient", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 0.65"
                    min="0"
                    max="1"
                    step="0.01"
                    aria-label="Custom runoff coefficient"
                  />
                  <p className="text-xs text-gray-500 mt-1">0 = no runoff · 1 = all rainfall becomes runoff</p>
                </div>
              )}

              {/* Formula reference */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Runoff (L) = Rain (mm) × Area (m²) × C</div>
                <div className="text-gray-400 mt-1">1 mm on 1 m² = 1 liter of water</div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? "Hide" : "Show"} History
                </button>
                {result && (
                  <button
                    onClick={handleExport}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    📄 Export TXT
                  </button>
                )}
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p
                className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Estimated Runoff
              </p>
              <div className="text-3xl font-bold mb-1 leading-none">
                {result ? fmtLiters(result.runoffLiters) : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cubic Meters:</span>
                    <span className="font-semibold">{fmtNum(result.runoffCubicMeters, 3)} m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">US Gallons:</span>
                    <span className="font-semibold">{fmtNum(result.runoffGallons, 1)} gal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Barrels (~190 L):</span>
                    <span className="font-semibold">≈ {fmtNum(result.runoffBarrels, 1)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-white/20 mt-1">
                    <span className="text-primary-100">Coefficient:</span>
                    <span className="font-semibold">{result.coefficient}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={handleCopy}
                  disabled={!result}
                  className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed"
                >
                  {copied ? "✓ Copied!" : "📋 Copy Result"}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!result}
                  className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💾 Save to History
                </button>
              </div>
            </div>

          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Rainfall & Area
              </h3>

              {/* Rainfall row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rainfall Amount</label>
                  <input
                    ref={firstRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.rainfall}
                    onChange={(e) => setNum("rainfall", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 50"
                    min="0"
                    step="any"
                    aria-label="Rainfall amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rainfall Unit</label>
                  <select
                    value={inputs.rainfallUnit}
                    onChange={(e) => set("rainfallUnit", e.target.value as RainfallUnit)}
                    className={selectCls}
                    aria-label="Rainfall unit"
                  >
                    {ALL_RAINFALL_UNITS.map((u) => (
                      <option key={u} value={u}>{RAINFALL_UNIT_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Area row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Area</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.area}
                    onChange={(e) => setNum("area", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 100"
                    min="0"
                    step="any"
                    aria-label="Land area"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                  <select
                    value={inputs.areaUnit}
                    onChange={(e) => set("areaUnit", e.target.value as AreaUnit)}
                    className={selectCls}
                    aria-label="Area unit"
                  >
                    {ALL_AREA_UNITS.map((u) => (
                      <option key={u} value={u}>{AREA_UNIT_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Converted values hint */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>
                    {fmtNum(result.rainfallMm, 2)} mm × {fmtNum(result.areaSqm, 2)} m² × {result.coefficient}
                    {" = "}
                    {fmtNum(result.runoffLiters, 0)} liters
                  </strong>
                </div>
              )}
            </div>

            {/* Runoff Coefficient Slider */}
            {!isCustom && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Runoff Coefficient Reference
                </h3>
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Sandy Soil (0.20)</span>
                    <span className="font-semibold text-primary">
                      {SURFACE_LABELS[inputs.surfaceType].split("(")[0].trim()} — C = {SURFACE_COEFFICIENTS[inputs.surfaceType]}
                    </span>
                    <span>Roof (0.95)</span>
                  </div>
                  <div className="relative w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-300 rounded-full">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow"
                      style={{ left: `calc(${SURFACE_COEFFICIENTS[inputs.surfaceType] * 100}% - 8px)` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0.0 (No runoff)</span>
                    <span>1.0 (All runoff)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ALL_SURFACES.filter(s => s !== "custom").map((s) => (
                    <button
                      key={s}
                      onClick={() => set("surfaceType", s)}
                      className={`px-2 py-1 rounded text-xs font-medium border transition-colors ${
                        inputs.surfaceType === s
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {SURFACE_LABELS[s].split("(")[0].trim()} ({SURFACE_COEFFICIENTS[s]})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handlePreset(p)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{p.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{p.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Summary */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Runoff Summary
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${HARVEST_STYLES[result.harvestPotential]}`}>
                    {result.harvestPotential} Collection Potential
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Runoff Volume</div>
                    <div className="text-lg font-bold text-primary">{fmtLiters(result.runoffLiters)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Cubic Meters</div>
                    <div className="text-base font-bold text-gray-900">{fmtNum(result.runoffCubicMeters, 3)} m³</div>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">US Gallons</div>
                    <div className="text-base font-bold text-gray-900">{fmtNum(result.runoffGallons, 1)} gal</div>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Barrels</div>
                    <div className="text-base font-bold text-gray-900">≈ {fmtNum(result.runoffBarrels, 1)}</div>
                  </div>
                </div>

                {/* Harvest note */}
                <div className={`p-3 rounded-lg border text-sm mb-4 ${HARVEST_STYLES[result.harvestPotential]}`}>
                  💡 {result.harvestNote}
                </div>

                {/* Calculation breakdown */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                  <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Calculation Breakdown</div>
                  <div className="font-mono">
                    Rainfall: {inputs.rainfall} {inputs.rainfallUnit} → {fmtNum(result.rainfallMm, 2)} mm
                  </div>
                  <div className="font-mono">
                    Area: {inputs.area} {AREA_UNIT_SHORT[inputs.areaUnit]} → {fmtNum(result.areaSqm, 2)} m²
                  </div>
                  <div className="font-mono">
                    Coefficient (C): {result.coefficient}
                  </div>
                  <div className="font-mono font-semibold text-gray-700 mt-1">
                    {fmtNum(result.rainfallMm, 2)} × {fmtNum(result.areaSqm, 2)} × {result.coefficient} = {fmtNum(result.runoffLiters, 0)} L
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {result && result.recommendations.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation History
                  </h3>
                  {history.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No calculations saved yet</div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {entry.inputs.rainfall} {entry.inputs.rainfallUnit} · {entry.inputs.area} {AREA_UNIT_SHORT[entry.inputs.areaUnit]} · {SURFACE_LABELS[entry.inputs.surfaceType].split("(")[0].trim()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString("en-US")}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {fmtLiters(entry.result.runoffLiters)} · {entry.result.harvestPotential} Potential
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

      <RainwaterRunoffCalculatorSEO />
      <RelatedTools
        currentTool="rainwater-runoff-calculator"
        tools={[
          "drainage-system-calculator",
          "rainwater-harvesting-calculator",
          "irrigation-water-calculator",
          "water-tank-capacity-calculator",
          "drainage-flow-calculator",
          "land-area-calculator",
        ]}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { PumpEfficiencyInputs, PumpEfficiencyResult, FlowRateUnit, HistoryEntry } from "./types";
import {
  calculate, validatePositive, debounce, fmt,
  FLOW_RATE_LABELS, METRIC_FLOW_UNITS, IMPERIAL_FLOW_UNITS,
  FLUID_PRESETS, PUMP_PRESETS,
  getRating, RATING_LABELS, RATING_COLORS, RATING_DESCRIPTIONS,
  saveToHistory, getHistory, clearHistory, exportToText, downloadFile,
} from "./logic";
import PumpEfficiencyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: PumpEfficiencyInputs = {
  unitSystem: "imperial",
  flowRate: "250",
  flowRateUnit: "GPM",
  head: "100",
  inputPower: "12",
  density: "998",
  gravity: "9.81",
};

export default function PumpEfficiencyCalculatorUI() {
  const [inputs, setInputs] = useState<PumpEfficiencyInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<PumpEfficiencyResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [showGravity, setShowGravity] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const flowRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    flowRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const fe = validatePositive(inputs.flowRate, "Flow Rate");
      const he = validatePositive(inputs.head, "Pump Head");
      const pe = validatePositive(inputs.inputPower, "Input Power");
      const de = validatePositive(inputs.density, "Fluid Density");
      const ge = validatePositive(inputs.gravity, "Gravity");
      const newErrors = { flowRate: fe, head: he, inputPower: pe, density: de, gravity: ge };
      setErrors(newErrors);
      if (fe || he || pe || de || ge) { setResult(null); return; }
      try { setResult(calculate(inputs)); } catch { setResult(null); }
    }, 120),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const set = (field: keyof PumpEfficiencyInputs, value: string) =>
    setInputs((p) => ({ ...p, [field]: value }));

  const handleUnitSystemChange = (system: "metric" | "imperial") => {
    const defaultFlowUnit: FlowRateUnit = system === "metric" ? "m3h" : "GPM";
    setInputs((p) => ({
      ...p,
      unitSystem: system,
      flowRateUnit: defaultFlowUnit,
      flowRate: system === "metric" ? "100" : "250",
      head: system === "metric" ? "20" : "100",
      inputPower: system === "metric" ? "8" : "12",
    }));
  };

  const handlePreset = (preset: typeof PUMP_PRESETS[0]) => {
    setInputs((p) => ({
      ...p,
      unitSystem: preset.unitSystem,
      flowRate: preset.flowRate,
      flowRateUnit: preset.flowRateUnit,
      head: preset.head,
      inputPower: preset.inputPower,
      density: preset.density,
    }));
  };

  const handleFluidPreset = (density: string) => set("density", density);

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    flowRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `Pump Efficiency: ${fmt(result.efficiency, 2)}% | Hydraulic Power: ${fmt(result.hydraulicPowerKW, 4)} kW | Rating: ${RATING_LABELS[result.efficiencyRating]}`
    );
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
    downloadFile(exportToText(inputs, result), "pump-efficiency-calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") handleReset();
  };

  const isImperial = inputs.unitSystem === "imperial";
  const headLabel = isImperial ? "ft" : "m";
  const powerLabel = isImperial ? "hp" : "kW";
  const flowUnits = isImperial ? IMPERIAL_FLOW_UNITS : METRIC_FLOW_UNITS;
  const ratingColor = result ? RATING_COLORS[result.efficiencyRating] : "gray";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💧</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Pump Efficiency Calculator</h3>
              <p className="text-sm text-blue-800">
                Enter flow rate, pump head, and input power to instantly calculate pump efficiency and hydraulic power. Supports metric and imperial units.
              </p>
            </div>
          </div>
        </div>

        {/* Unit System Selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">Unit System</label>
          <div className="grid grid-cols-2 gap-2 max-w-xs">
            {(["metric", "imperial"] as const).map((sys) => (
              <button
                key={sys}
                onClick={() => handleUnitSystemChange(sys)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                  inputs.unitSystem === sys
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {sys === "metric" ? "Metric (SI)" : "Imperial (US)"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider">
                Pump Efficiency
              </p>
              <div className="text-5xl font-bold mb-1 leading-none">
                {result ? fmt(result.efficiency, 2) : "—"}
              </div>
              <div className="text-xl text-primary-100 mb-4">%</div>

              {result && (
                <>
                  {/* Efficiency bar */}
                  <div className="mb-4">
                    <div className="w-full bg-white/20 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full bg-white transition-all duration-500"
                        style={{ width: `${Math.min(Math.max(result.efficiency, 0), 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Hydraulic Power</span>
                      <span className="font-semibold">{fmt(result.hydraulicPowerKW, 4)} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Input Power</span>
                      <span className="font-semibold">{fmt(result.inputPowerW / 1000, 4)} kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Rating</span>
                      <span className="font-semibold uppercase">{result.efficiencyRating}</span>
                    </div>
                  </div>
                </>
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

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Actions</h3>
              <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ↺ Reset
              </button>
              <button onClick={() => setShowFormula(!showFormula)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📐 {showFormula ? "Hide" : "Show"} Formula
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

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Main Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Pump Parameters</h3>

              {/* Flow Rate */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flow Rate
                    <span className="ml-1 text-xs text-gray-400" title="Volumetric flow rate of the fluid">ⓘ</span>
                  </label>
                  <input
                    ref={flowRef}
                    type="number" inputMode="decimal"
                    value={inputs.flowRate}
                    onChange={(e) => set("flowRate", e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.flowRate ? "border-red-300" : "border-gray-200"}`}
                    placeholder={isImperial ? "250" : "100"}
                    min="0" step="any"
                    aria-label="Flow rate"
                  />
                  {errors.flowRate && <p className="text-xs text-red-600 mt-1">{errors.flowRate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Flow Rate Unit</label>
                  <select
                    value={inputs.flowRateUnit}
                    onChange={(e) => set("flowRateUnit", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {flowUnits.map((u) => (
                      <option key={u} value={u}>{FLOW_RATE_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Head */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pump Head ({headLabel})
                    <span className="ml-1 text-xs text-gray-400" title="Total dynamic head the pump must overcome">ⓘ</span>
                  </label>
                  <input
                    type="number" inputMode="decimal"
                    value={inputs.head}
                    onChange={(e) => set("head", e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.head ? "border-red-300" : "border-gray-200"}`}
                    placeholder={isImperial ? "100" : "20"}
                    min="0" step="any"
                    aria-label="Pump head"
                  />
                  {errors.head && <p className="text-xs text-red-600 mt-1">{errors.head}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Power ({powerLabel})
                    <span className="ml-1 text-xs text-gray-400" title="Shaft or motor input power">ⓘ</span>
                  </label>
                  <input
                    type="number" inputMode="decimal"
                    value={inputs.inputPower}
                    onChange={(e) => set("inputPower", e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.inputPower ? "border-red-300" : "border-gray-200"}`}
                    placeholder={isImperial ? "12" : "8"}
                    min="0" step="any"
                    aria-label="Input power"
                  />
                  {errors.inputPower && <p className="text-xs text-red-600 mt-1">{errors.inputPower}</p>}
                </div>
              </div>

              {/* Density */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fluid Density (kg/m³)
                  <span className="ml-1 text-xs text-gray-400" title="Water = 1000, Sea Water = 1025, Oil ≈ 850">ⓘ</span>
                </label>
                <input
                  type="number" inputMode="decimal"
                  value={inputs.density}
                  onChange={(e) => set("density", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.density ? "border-red-300" : "border-gray-200"}`}
                  placeholder="998"
                  min="0" step="any"
                  aria-label="Fluid density"
                />
                {errors.density && <p className="text-xs text-red-600 mt-1">{errors.density}</p>}
                {/* Fluid presets */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {FLUID_PRESETS.map((fp) => (
                    <button
                      key={fp.label}
                      onClick={() => handleFluidPreset(fp.density)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors border ${
                        inputs.density === fp.density
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {fp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gravity toggle */}
              <div>
                <button
                  onClick={() => setShowGravity(!showGravity)}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  {showGravity ? "▲ Hide" : "▼ Show"} gravity constant
                </button>
                {showGravity && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gravity (m/s²)
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.gravity}
                      onChange={(e) => set("gravity", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.gravity ? "border-red-300" : "border-gray-200"}`}
                      placeholder="9.81"
                      min="0" step="any"
                    />
                    {errors.gravity && <p className="text-xs text-red-600 mt-1">{errors.gravity}</p>}
                  </div>
                )}
              </div>

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>η = (ρ × g × Q × H) / P_in × 100</strong>
                  <br />
                  <span className="font-mono text-xs">{result.formulaSubstituted} = <strong>{fmt(result.efficiency, 2)}%</strong></span>
                </div>
              )}

              <p className="text-xs text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>
            </div>

            {/* Pump System Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">System Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PUMP_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handlePreset(preset)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Efficiency Rating Indicator */}
            {result && (
              <div className={`bg-${ratingColor}-50 border border-${ratingColor}-200 rounded-xl p-4`}>
                <div className="flex items-start gap-3">
                  <span className="text-xl">
                    {result.efficiencyRating === "excellent" ? "✓" :
                     result.efficiencyRating === "good" ? "👍" :
                     result.efficiencyRating === "fair" ? "ℹ️" : "⚠️"}
                  </span>
                  <div>
                    <h4 className={`font-semibold text-${ratingColor}-900 mb-1`}>
                      {RATING_LABELS[result.efficiencyRating]}
                    </h4>
                    <p className={`text-sm text-${ratingColor}-800`}>
                      {RATING_DESCRIPTIONS[result.efficiencyRating]}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Results Breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Results Breakdown</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">Pump Efficiency</div>
                    <div className="text-2xl font-bold text-primary">{fmt(result.efficiency, 2)}%</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Hydraulic Power</div>
                    <div className="text-2xl font-bold text-gray-900">{fmt(result.hydraulicPowerKW, 4)} kW</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Hydraulic Power (W)</span>
                    <span className="font-mono font-semibold">{fmt(result.hydraulicPowerW, 2)} W</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Input Power (W)</span>
                    <span className="font-mono font-semibold">{fmt(result.inputPowerW, 2)} W</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                    <span className="text-gray-600">Power Losses</span>
                    <span className="font-mono font-semibold text-red-600">{fmt(result.inputPowerW - result.hydraulicPowerW, 2)} W</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-gray-600">Loss Percentage</span>
                    <span className="font-mono font-semibold text-red-600">{fmt(100 - result.efficiency, 2)}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Efficiency Rating Guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Efficiency Rating Guide</h3>
              <div className="space-y-2">
                {[
                  { range: "≥ 80%", label: "Excellent", desc: "High-performance pump", color: "green" },
                  { range: "60–80%", label: "Good", desc: "Acceptable for most applications", color: "blue" },
                  { range: "40–60%", label: "Fair", desc: "Consider maintenance or optimization", color: "yellow" },
                  { range: "< 40%", label: "Poor", desc: "Needs repair or replacement", color: "red" },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center gap-3 p-3 bg-${item.color}-50 rounded-lg border border-${item.color}-200`}>
                    <div className="w-16 text-center">
                      <div className={`text-sm font-bold text-${item.color}-900`}>{item.range}</div>
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold text-${item.color}-900 text-sm`}>{item.label}</div>
                      <div className={`text-xs text-${item.color}-700`}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculation Steps */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Calculation Steps</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-0.5 max-h-80 overflow-y-auto">
                  {result.steps.map((step, i) => (
                    <div key={i} className={step === "" ? "h-2" : "text-gray-700"}>{step}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formula & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    η (%) = (P_hyd / P_in) × 100
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    P_hyd = ρ × g × Q × H
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">ρ — Fluid Density</div>
                      <div className="text-blue-700 text-xs">Mass per unit volume (kg/m³). Water ≈ 1000.</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">g — Gravity</div>
                      <div className="text-orange-700 text-xs">Gravitational acceleration = 9.81 m/s².</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">Q — Flow Rate</div>
                      <div className="text-green-700 text-xs">Volumetric flow rate in m³/s.</div>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="font-semibold text-purple-800 text-xs uppercase mb-1">H — Pump Head</div>
                      <div className="text-purple-700 text-xs">Total dynamic head in meters.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Calculation History</h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">No calculations saved yet</div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900">
                            {fmt(entry.result.efficiency, 2)}% — {RATING_LABELS[entry.result.efficiencyRating]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Q: {entry.inputs.flowRate} {FLOW_RATE_LABELS[entry.inputs.flowRateUnit]} · H: {entry.inputs.head} {entry.inputs.unitSystem === "imperial" ? "ft" : "m"} · P: {entry.inputs.inputPower} {entry.inputs.unitSystem === "imperial" ? "hp" : "kW"}
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

      <PumpEfficiencyCalculatorSEO />
      <RelatedTools
        currentTool="pump-efficiency-calculator"
        tools={[
          "hydraulic-power-calculator",
          "flow-rate-calculator",
          "reynolds-number-calculator",
          "pressure-drop-calculator",
          "motor-efficiency-calculator",
        ]}
      />
    </>
  );
}

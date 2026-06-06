"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ThermalEfficiencyInputs,
  ThermalEfficiencyResult,
  HistoryEntry,
  CalcMode,
  EnergyUnit,
  PowerUnit,
  TempUnit,
  Precision,
} from "./types";
import {
  calculate,
  validateBasic,
  validateCarnot,
  validateEngine,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNum,
  debounce,
  buildShareUrl,
  parseUrlParams,
  BASIC_PRESETS,
  CARNOT_PRESETS,
  ENGINE_PRESETS,
} from "./logic";
import ThermalEfficiencyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: ThermalEfficiencyInputs = {
  mode: "basic",
  basic: { output: "400", input: "1000", unit: "kJ" },
  carnot: { th: "900", tc: "300", tempUnit: "K" },
  engine: { powerOutput: "1200", fuelInput: "3000", unit: "W" },
  precision: 2,
};

const MODE_LABELS: Record<CalcMode, string> = {
  basic: "Basic Thermal Efficiency",
  carnot: "Carnot Efficiency",
  engine: "Engine Efficiency",
};

const ENERGY_UNITS: { label: string; value: EnergyUnit | PowerUnit }[] = [
  { label: "J (Joules)", value: "J" },
  { label: "kJ (Kilojoules)", value: "kJ" },
  { label: "MJ (Megajoules)", value: "MJ" },
];

const POWER_UNITS: { label: string; value: PowerUnit }[] = [
  { label: "W (Watts)", value: "W" },
  { label: "kW (Kilowatts)", value: "kW" },
  { label: "MW (Megawatts)", value: "MW" },
];

function getRatingColors(rating: ThermalEfficiencyResult["rating"]) {
  switch (rating) {
    case "excellent": return { text: "text-green-600", bg: "bg-green-50 border-green-200" };
    case "good":      return { text: "text-blue-600",  bg: "bg-blue-50 border-blue-200" };
    case "fair":      return { text: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" };
    case "poor":      return { text: "text-red-600",   bg: "bg-red-50 border-red-200" };
  }
}

export default function ThermalEfficiencyCalculatorUI() {
  const [inputs, setInputs] = useState<ThermalEfficiencyInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<ThermalEfficiencyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Load history and parse URL params on mount
  useEffect(() => {
    setHistory(getHistory());
    const parsed = parseUrlParams(window.location.search);
    if (parsed) {
      setInputs((prev) => ({ ...prev, ...parsed }));
    }
    firstInputRef.current?.focus();
  }, []);

  // Debounced calculation
  const run = useCallback(
    debounce(() => {
      setError(null);
      let err: string | null = null;
      if (inputs.mode === "basic") {
        err = validateBasic(inputs.basic.output, inputs.basic.input);
      } else if (inputs.mode === "carnot") {
        err = validateCarnot(inputs.carnot.th, inputs.carnot.tc, inputs.carnot.tempUnit);
      } else {
        err = validateEngine(inputs.engine.powerOutput, inputs.engine.fuelInput);
      }
      if (err) { setError(err); setResult(null); return; }
      try {
        setResult(calculate(inputs));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Calculation error");
        setResult(null);
      }
    }, 120),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const setMode = (mode: CalcMode) => {
    setInputs((p) => ({ ...p, mode }));
    setResult(null);
    setError(null);
  };

  const setBasic = (patch: Partial<ThermalEfficiencyInputs["basic"]>) =>
    setInputs((p) => ({ ...p, basic: { ...p.basic, ...patch } }));

  const setCarnot = (patch: Partial<ThermalEfficiencyInputs["carnot"]>) =>
    setInputs((p) => ({ ...p, carnot: { ...p.carnot, ...patch } }));

  const setEngine = (patch: Partial<ThermalEfficiencyInputs["engine"]>) =>
    setInputs((p) => ({ ...p, engine: { ...p.engine, ...patch } }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setError(null);
    firstInputRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`Thermal Efficiency: ${result.efficiency}% (${result.ratingLabel})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareUrl = () => {
    const url = buildShareUrl(inputs);
    navigator.clipboard.writeText(url);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleExport = () => {
    if (!result) return;
    downloadFile(exportToText(inputs, result), "thermal_efficiency_calculation.txt");
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

  const ratingColors = result ? getRatingColors(result.rating) : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔥</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Thermal Efficiency Calculator</h3>
              <p className="text-sm text-blue-800">
                Select a calculation mode, enter your values, and get instant thermal efficiency results with step-by-step formula breakdowns.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Calculation Mode</p>
          <div className="flex gap-2 flex-wrap">
            {(["basic", "carnot", "engine"] as CalcMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setMode(mode)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                  inputs.mode === mode
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {MODE_LABELS[mode]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left Panel */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Thermal Efficiency
              </p>
              <div className="text-5xl font-bold mb-1 leading-none">
                {result ? `${formatNum(result.efficiency, inputs.precision)}` : "—"}
              </div>
              <div className="text-xl text-primary-100">%</div>

              {result && (
                <>
                  {/* Efficiency bar */}
                  <div className="mt-4">
                    <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-500"
                        style={{ width: `${Math.min(result.efficiency, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-primary-100 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Rating:</span>
                      <span className="font-semibold">{result.ratingLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-100">Formula:</span>
                      <span className="font-semibold text-xs">{inputs.mode === "basic" ? "η = W/Q × 100" : inputs.mode === "carnot" ? "η = (1−Tc/Th) × 100" : "η = P/Q × 100"}</span>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2 mt-4">
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

            {/* Settings & Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Settings & Actions</h3>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select
                  value={inputs.precision}
                  onChange={(e) => setInputs((p) => ({ ...p, precision: parseInt(e.target.value) as Precision }))}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  <option value={2}>2 decimal places</option>
                  <option value={3}>3 decimal places</option>
                  <option value={4}>4 decimal places</option>
                  <option value={6}>6 decimal places</option>
                  <option value={8}>8 decimal places</option>
                </select>
              </div>

              <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ↺ Reset
              </button>
              <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📜 {showHistory ? "Hide" : "Show"} History
              </button>
              <button onClick={handleShareUrl} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                {urlCopied ? "✓ URL Copied!" : "🔗 Share URL"}
              </button>
              {result && (
                <button onClick={handleExport} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📄 Export TXT
                </button>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-8 space-y-6">

            {/* ── BASIC MODE ─────────────────────────────────────────── */}
            {inputs.mode === "basic" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Basic Thermal Efficiency</h3>

                {/* Presets */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Quick Presets</p>
                  <div className="flex flex-wrap gap-2">
                    {BASIC_PRESETS.map((p) => {
                      const active = inputs.basic.output === p.output && inputs.basic.input === p.input;
                      return (
                        <button
                          key={p.label}
                          onClick={() => setBasic({ output: p.output, input: p.input, unit: p.unit })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                            active ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Useful Energy Output
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number" inputMode="decimal"
                      value={inputs.basic.output}
                      onChange={(e) => setBasic({ output: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="400"
                      min="0" step="any"
                      aria-label="Useful energy output"
                    />
                    <p className="text-xs text-gray-400 mt-1">Work done by the system</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heat Energy Input
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.basic.input}
                      onChange={(e) => setBasic({ input: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1000"
                      min="0" step="any"
                      aria-label="Heat energy input"
                    />
                    <p className="text-xs text-gray-400 mt-1">Total heat supplied</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Energy Unit</label>
                  <select
                    value={inputs.basic.unit}
                    onChange={(e) => setBasic({ unit: e.target.value as EnergyUnit })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ENERGY_UNITS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
                    {POWER_UNITS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
                  </select>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Formula:</strong> η = (Useful Output / Heat Input) × 100<br />
                    <span className="font-mono text-xs">{result.breakdown}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* ── CARNOT MODE ────────────────────────────────────────── */}
            {inputs.mode === "carnot" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Carnot Efficiency</h3>

                {/* Presets */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Quick Presets</p>
                  <div className="flex flex-wrap gap-2">
                    {CARNOT_PRESETS.map((p) => {
                      const active = inputs.carnot.th === p.th && inputs.carnot.tc === p.tc;
                      return (
                        <button
                          key={p.label}
                          onClick={() => setCarnot({ th: p.th, tc: p.tc, tempUnit: p.tempUnit })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                            active ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Unit</label>
                  <div className="flex gap-2">
                    {(["K", "C"] as TempUnit[]).map((u) => (
                      <button
                        key={u}
                        onClick={() => setCarnot({ tempUnit: u })}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                          inputs.carnot.tempUnit === u
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {u === "K" ? "Kelvin (K)" : "Celsius (°C)"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hot Reservoir Temperature (Th)
                    </label>
                    <div className="flex gap-2">
                      <input
                        ref={firstInputRef}
                        type="number" inputMode="decimal"
                        value={inputs.carnot.th}
                        onChange={(e) => setCarnot({ th: e.target.value })}
                        onKeyDown={handleKeyDown}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="900"
                        step="any"
                        aria-label="Hot reservoir temperature"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center min-w-[52px] justify-center">
                        {inputs.carnot.tempUnit === "K" ? "K" : "°C"}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Higher temperature source</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cold Reservoir Temperature (Tc)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number" inputMode="decimal"
                        value={inputs.carnot.tc}
                        onChange={(e) => setCarnot({ tc: e.target.value })}
                        onKeyDown={handleKeyDown}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="300"
                        step="any"
                        aria-label="Cold reservoir temperature"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center min-w-[52px] justify-center">
                        {inputs.carnot.tempUnit === "K" ? "K" : "°C"}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Lower temperature sink</p>
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Formula:</strong> η = (1 − Tc / Th) × 100<br />
                    <span className="font-mono text-xs">{result.breakdown}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* ── ENGINE MODE ────────────────────────────────────────── */}
            {inputs.mode === "engine" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Engine Efficiency</h3>

                {/* Presets */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Quick Presets</p>
                  <div className="flex flex-wrap gap-2">
                    {ENGINE_PRESETS.map((p) => {
                      const active = inputs.engine.powerOutput === p.powerOutput && inputs.engine.fuelInput === p.fuelInput;
                      return (
                        <button
                          key={p.label}
                          onClick={() => setEngine({ powerOutput: p.powerOutput, fuelInput: p.fuelInput, unit: p.unit })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                            active ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mechanical Output Power
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number" inputMode="decimal"
                      value={inputs.engine.powerOutput}
                      onChange={(e) => setEngine({ powerOutput: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1200"
                      min="0" step="any"
                      aria-label="Mechanical output power"
                    />
                    <p className="text-xs text-gray-400 mt-1">Useful work output</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuel Energy Input
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.engine.fuelInput}
                      onChange={(e) => setEngine({ fuelInput: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="3000"
                      min="0" step="any"
                      aria-label="Fuel energy input"
                    />
                    <p className="text-xs text-gray-400 mt-1">Total fuel energy supplied</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Power Unit</label>
                  <select
                    value={inputs.engine.unit}
                    onChange={(e) => setEngine({ unit: e.target.value as PowerUnit })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {POWER_UNITS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
                  </select>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Formula:</strong> η = (Power Output / Fuel Input) × 100<br />
                    <span className="font-mono text-xs">{result.breakdown}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Efficiency Rating */}
            {result && !error && ratingColors && (
              <div className={`border rounded-xl p-5 ${ratingColors.bg}`}>
                <h3 className="font-semibold text-gray-800 mb-3">Efficiency Rating</h3>
                <div className="flex items-center gap-4">
                  <div className={`text-4xl font-bold ${ratingColors.text}`}>
                    {result.ratingLabel}
                  </div>
                  <div className="flex-1 text-sm text-gray-700">
                    {result.rating === "excellent" && <p>✓ Excellent thermal efficiency. High-performance thermodynamic system.</p>}
                    {result.rating === "good" && <p>✓ Good efficiency. Typical for well-designed engines and turbines.</p>}
                    {result.rating === "fair" && <p>⚠ Fair efficiency. Room for improvement in system design.</p>}
                    {result.rating === "poor" && <p>⚠ Poor efficiency. Significant energy losses — review system design.</p>}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4 text-xs">
                  {[
                    { label: "Excellent", range: "≥60%", color: "bg-green-50 border-green-200 text-green-700" },
                    { label: "Good",      range: "40–59%", color: "bg-blue-50 border-blue-200 text-blue-700" },
                    { label: "Fair",      range: "20–39%", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
                    { label: "Poor",      range: "<20%",  color: "bg-red-50 border-red-200 text-red-700" },
                  ].map((r) => (
                    <div key={r.label} className={`text-center p-2 rounded border ${r.color}`}>
                      <div className="font-semibold">{r.label}</div>
                      <div>{r.range}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calculation Steps */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Steps
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1 max-h-80 overflow-y-auto">
                  {result.steps.map((step, i) => (
                    <div key={i} className={step === "" ? "h-2" : "text-gray-700"}>{step}</div>
                  ))}
                </div>
              </div>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation History
                  </h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">
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
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {formatNum(entry.result.efficiency, 2)}% — {MODE_LABELS[entry.inputs.mode]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">{entry.result.ratingLabel} · {entry.result.formula}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <ThermalEfficiencyCalculatorSEO />
      <RelatedTools
        currentTool="thermal-efficiency-calculator"
        tools={["heat-transfer-calculator", "ideal-gas-law-calculator", "thermal-expansion-calculator", "pump-efficiency-calculator"]}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  RefrigerationCOPInputs,
  COPResult,
  HistoryEntry,
  CalcMethod,
} from "./types";
import {
  calculate,
  validatePositive,
  validateNotNegative,
  toKelvin,
  debounce,
  fmt,
  RATING_LABELS,
  RATING_DESCRIPTIONS,
  RATING_COLORS,
  COOLING_UNIT_LABELS,
  POWER_UNIT_LABELS,
  TEMP_UNIT_LABELS,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
} from "./logic";
import RefrigerationCOPCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: RefrigerationCOPInputs = {
  method: "basic",
  basic: {
    coolingEffect: "5000",
    coolingUnit: "W",
    powerInput: "1000",
    powerUnit: "W",
  },
  carnot: {
    coldTemp: "5",
    coldTempUnit: "C",
    hotTemp: "35",
    hotTempUnit: "C",
  },
};

export default function RefrigerationCOPCalculatorUI() {
  const [inputs, setInputs] = useState<RefrigerationCOPInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<COPResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstInputRef.current?.focus();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(
    debounce(() => {
      let newErrors: Record<string, string | null> = {};

      if (inputs.method === "basic") {
        newErrors.coolingEffect = validatePositive(inputs.basic.coolingEffect, "Cooling Effect");
        newErrors.powerInput = validatePositive(inputs.basic.powerInput, "Power Input");
        setErrors(newErrors);
        if (newErrors.coolingEffect || newErrors.powerInput) { setResult(null); return; }
      } else {
        newErrors.coldTemp = validateNotNegative(inputs.carnot.coldTemp, "Cold Temperature");
        newErrors.hotTemp  = validateNotNegative(inputs.carnot.hotTemp, "Hot Temperature");
        setErrors(newErrors);
        if (newErrors.coldTemp || newErrors.hotTemp) { setResult(null); return; }

        const tcK = toKelvin(parseFloat(inputs.carnot.coldTemp), inputs.carnot.coldTempUnit);
        const thK = toKelvin(parseFloat(inputs.carnot.hotTemp),  inputs.carnot.hotTempUnit);
        if (thK <= tcK) {
          setErrors((p) => ({ ...p, hotTemp: "Hot temperature must be higher than cold temperature." }));
          setResult(null);
          return;
        }
      }

      try {
        setResult(calculate(inputs));
      } catch {
        setResult(null);
      }
    }, 120),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const setMethod = (method: CalcMethod) =>
    setInputs((p) => ({ ...p, method }));

  const setBasic = (field: keyof RefrigerationCOPInputs["basic"], value: string) =>
    setInputs((p) => ({ ...p, basic: { ...p.basic, [field]: value } }));

  const setCarnot = (field: keyof RefrigerationCOPInputs["carnot"], value: string) =>
    setInputs((p) => ({ ...p, carnot: { ...p.carnot, [field]: value } }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    firstInputRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `Refrigeration COP: ${fmt(result.cop, 4)} | Rating: ${RATING_LABELS[result.rating]} | ${result.method === "basic" ? `Cooling: ${inputs.basic.coolingEffect} ${inputs.basic.coolingUnit}, Power: ${inputs.basic.powerInput} ${inputs.basic.powerUnit}` : `T_cold: ${inputs.carnot.coldTemp} °${inputs.carnot.coldTempUnit}, T_hot: ${inputs.carnot.hotTemp} °${inputs.carnot.hotTempUnit}`}`
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
    downloadFile(exportToText(inputs, result), "refrigeration-cop-calculation.txt");
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

  const ratingColor = result ? RATING_COLORS[result.rating] : "gray";

  // COP bar: typical good COP is up to ~8; cap display at 10
  const copBarWidth = result ? Math.min((result.cop / 10) * 100, 100) : 0;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧊</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Refrigeration COP Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the Coefficient of Performance (COP) using the basic method (cooling effect ÷ power input) or the Carnot method (temperature-based theoretical maximum). Select a method below.
              </p>
            </div>
          </div>
        </div>

        {/* Method Selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">Calculation Method</label>
          <div className="grid grid-cols-2 gap-2 max-w-sm">
            {(["basic", "carnot"] as CalcMethod[]).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                  inputs.method === m
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {m === "basic" ? "Basic COP" : "Carnot COP"}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400">
            {inputs.method === "basic"
              ? "Uses actual cooling effect and power input."
              : "Theoretical maximum COP using hot and cold reservoir temperatures."}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-white/70 font-medium mb-2 text-xs uppercase tracking-wider">
                COP (Coefficient of Performance)
              </p>
              <div className="text-5xl font-bold mb-1 leading-none">
                {result ? fmt(result.cop, 2) : "—"}
              </div>
              <div className="text-base text-white/70 mb-4">dimensionless</div>

              {result && (
                <>
                  <div className="mb-4">
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-white transition-all duration-500"
                        style={{ width: `${copBarWidth}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/50 mt-1">
                      <span>0</span>
                      <span>COP scale (0–10)</span>
                      <span>10</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                    {result.method === "basic" ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-white/70">Cooling Effect</span>
                          <span className="font-semibold">{fmt(result.coolingEffectW!, 2)} W</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Power Input</span>
                          <span className="font-semibold">{fmt(result.powerInputW!, 2)} W</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-white/70">T_cold</span>
                          <span className="font-semibold">{fmt(result.tcK!, 2)} K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">T_hot</span>
                          <span className="font-semibold">{fmt(result.thK!, 2)} K</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-white/70">Rating</span>
                      <span className="font-semibold uppercase">{result.rating}</span>
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
                  className="w-full border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💾 Save to History
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Actions</h3>
              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                ↺ Reset
              </button>
              <button
                onClick={() => setShowFormula((p) => !p)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📐 {showFormula ? "Hide" : "Show"} Formula
              </button>
              <button
                onClick={() => setShowHistory((p) => !p)}
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

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Inputs */}
            {inputs.method === "basic" ? (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Basic COP Inputs</h3>

                {/* Cooling Effect */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cooling Effect (Q)
                      <span className="ml-1 text-xs text-gray-400" title="Heat removed by the refrigeration system">ⓘ</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.basic.coolingEffect}
                      onChange={(e) => setBasic("coolingEffect", e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="5000"
                      min="0"
                      step="any"
                      aria-label="Cooling effect"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${
                        errors.coolingEffect ? "border-red-300" : "border-gray-200"
                      }`}
                    />
                    {errors.coolingEffect && (
                      <p className="text-xs text-red-600 mt-1">{errors.coolingEffect}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={inputs.basic.coolingUnit}
                      onChange={(e) => setBasic("coolingUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {Object.entries(COOLING_UNIT_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Power Input */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Power Input (W)
                      <span className="ml-1 text-xs text-gray-400" title="Compressor or motor power consumption">ⓘ</span>
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.basic.powerInput}
                      onChange={(e) => setBasic("powerInput", e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="1000"
                      min="0"
                      step="any"
                      aria-label="Power input"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${
                        errors.powerInput ? "border-red-300" : "border-gray-200"
                      }`}
                    />
                    {errors.powerInput && (
                      <p className="text-xs text-red-600 mt-1">{errors.powerInput}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={inputs.basic.powerUnit}
                      onChange={(e) => setBasic("powerUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {Object.entries(POWER_UNIT_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Live formula */}
                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>COP = Q_cooling / W_input</strong><br />
                    <span className="font-mono text-xs">{result.formulaDisplay}</span>
                  </div>
                )}

                <p className="text-xs text-gray-400">
                  Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Carnot COP Inputs</h3>

                {/* Cold Temperature */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cold Reservoir Temperature (T<sub>c</sub>)
                      <span className="ml-1 text-xs text-gray-400" title="Temperature of the space being cooled">ⓘ</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.carnot.coldTemp}
                      onChange={(e) => setCarnot("coldTemp", e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="5"
                      step="any"
                      aria-label="Cold temperature"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${
                        errors.coldTemp ? "border-red-300" : "border-gray-200"
                      }`}
                    />
                    {errors.coldTemp && (
                      <p className="text-xs text-red-600 mt-1">{errors.coldTemp}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={inputs.carnot.coldTempUnit}
                      onChange={(e) => setCarnot("coldTempUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {Object.entries(TEMP_UNIT_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Hot Temperature */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hot Reservoir Temperature (T<sub>h</sub>)
                      <span className="ml-1 text-xs text-gray-400" title="Temperature of the heat rejection environment (ambient/condenser)">ⓘ</span>
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.carnot.hotTemp}
                      onChange={(e) => setCarnot("hotTemp", e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="35"
                      step="any"
                      aria-label="Hot temperature"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${
                        errors.hotTemp ? "border-red-300" : "border-gray-200"
                      }`}
                    />
                    {errors.hotTemp && (
                      <p className="text-xs text-red-600 mt-1">{errors.hotTemp}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={inputs.carnot.hotTempUnit}
                      onChange={(e) => setCarnot("hotTempUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {Object.entries(TEMP_UNIT_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Live formula */}
                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>COP = T_c / (T_h − T_c)</strong><br />
                    <span className="font-mono text-xs">{result.formulaDisplay}</span>
                  </div>
                )}

                <p className="text-xs text-gray-400">
                  Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset · Temperatures are auto-converted to Kelvin
                </p>
              </div>
            )}

            {/* Rating Indicator */}
            {result && (
              <div className={`bg-${ratingColor}-50 border border-${ratingColor}-200 rounded-xl p-4`}>
                <div className="flex items-start gap-3">
                  <span className="text-xl">
                    {result.rating === "high" ? "✅" : result.rating === "average" ? "ℹ️" : "⚠️"}
                  </span>
                  <div>
                    <h4 className={`font-semibold text-${ratingColor}-900 mb-1`}>
                      {RATING_LABELS[result.rating]}
                    </h4>
                    <p className={`text-sm text-${ratingColor}-800`}>
                      {RATING_DESCRIPTIONS[result.rating]}
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
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">COP</div>
                    <div className="text-3xl font-bold text-primary">{fmt(result.cop, 4)}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">
                      {result.method === "basic" ? "Energy Ratio" : "Ideal COP"}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {result.method === "basic"
                        ? `${fmt(result.cop * 100, 1)}%`
                        : fmt(result.cop, 4)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {result.method === "basic"
                        ? "cooling delivered per unit of work"
                        : "Carnot theoretical maximum"}
                    </div>
                  </div>
                </div>

                {result.method === "basic" && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-gray-600">Cooling Effect (normalized)</span>
                      <span className="font-mono font-semibold">{fmt(result.coolingEffectW!, 2)} W</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-gray-600">Power Input (normalized)</span>
                      <span className="font-mono font-semibold">{fmt(result.powerInputW!, 2)} W</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-gray-600">Heat rejected to hot reservoir (Q_h)</span>
                      <span className="font-mono font-semibold">
                        {fmt(result.coolingEffectW! + result.powerInputW!, 2)} W
                      </span>
                    </div>
                  </div>
                )}

                {result.method === "carnot" && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-gray-600">T_cold (Kelvin)</span>
                      <span className="font-mono font-semibold">{fmt(result.tcK!, 4)} K</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-gray-600">T_hot (Kelvin)</span>
                      <span className="font-mono font-semibold">{fmt(result.thK!, 4)} K</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-gray-600">Temperature Difference (T_h − T_c)</span>
                      <span className="font-mono font-semibold">{fmt(result.thK! - result.tcK!, 4)} K</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* COP Rating Guide */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">COP Rating Guide</h3>
              <div className="space-y-2">
                {[
                  { range: "COP > 4", label: "High Efficiency", desc: "Excellent — common in modern HVAC and heat pumps", color: "green" },
                  { range: "COP 2–4", label: "Average Efficiency", desc: "Acceptable for standard refrigeration systems", color: "yellow" },
                  { range: "COP < 2", label: "Low Efficiency", desc: "Poor — review compressor load or system design", color: "red" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 p-3 bg-${item.color}-50 rounded-lg border border-${item.color}-200`}
                  >
                    <div className="w-20 text-center">
                      <div className={`text-xs font-bold text-${item.color}-900`}>{item.range}</div>
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
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-0.5 max-h-72 overflow-y-auto">
                  {result.steps.map((step, i) => (
                    <div key={i} className={step === "" ? "h-2" : "text-gray-700"}>{step}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formula Reference</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    COP = Q_cooling / W_input
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    COP_Carnot = T_c / (T_h − T_c)
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">Q_cooling</div>
                      <div className="text-blue-700 text-xs">Heat removed from the cold space (Watts).</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">W_input</div>
                      <div className="text-orange-700 text-xs">Compressor work / electrical power input (Watts).</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">T_c (Kelvin)</div>
                      <div className="text-green-700 text-xs">Cold reservoir absolute temperature.</div>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="font-semibold text-purple-800 text-xs uppercase mb-1">T_h (Kelvin)</div>
                      <div className="text-purple-700 text-xs">Hot reservoir absolute temperature.</div>
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
                            COP = {fmt(entry.result.cop, 4)} — {RATING_LABELS[entry.result.rating]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {entry.inputs.method === "basic"
                            ? `Q: ${entry.inputs.basic.coolingEffect} ${entry.inputs.basic.coolingUnit} · W: ${entry.inputs.basic.powerInput} ${entry.inputs.basic.powerUnit}`
                            : `T_cold: ${entry.inputs.carnot.coldTemp} °${entry.inputs.carnot.coldTempUnit} · T_hot: ${entry.inputs.carnot.hotTemp} °${entry.inputs.carnot.hotTempUnit}`}
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

      <RefrigerationCOPCalculatorSEO />
      <RelatedTools
        currentTool="refrigeration-cop-calculator"
        tools={[
          "thermal-efficiency-calculator",
          "air-conditioner-power-calculator",
          "ideal-gas-law-calculator",
          "heat-dissipation-calculator",
          "pump-efficiency-calculator",
        ]}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SpecificHeatInputs, SpecificHeatResult, HistoryEntry, CalcMode, MassUnit, HeatUnit, TempUnit, Precision } from "./types";
import {
  calculate, validatePositive, validateNonNegative, validateTemp,
  saveToHistory, getHistory, clearHistory, exportToText, downloadFile,
  formatNum, debounce, MATERIAL_PRESETS,
} from "./logic";
import SpecificHeatCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";
import { specificHeatCalculatorConfig } from "./config";

const DEFAULT_INPUTS: SpecificHeatInputs = {
  mode: "Q",
  mass: "2",
  massUnit: "kg",
  specificHeat: "4186",
  heatUnit: "J/kgC",
  initialTemp: "20",
  finalTemp: "80",
  tempUnit: "C",
  heatEnergy: "502320",
  precision: 2,
  material: "Water",
};

const MODE_LABELS: Record<CalcMode, string> = {
  Q:      "Heat Energy (Q)",
  m:      "Mass (m)",
  c:      "Specific Heat (c)",
  deltaT: "Temp Change (ΔT)",
};

const MASS_UNIT_LABELS: Record<MassUnit, string> = {
  kg: "kg",
  g:  "g",
  lb: "lb",
};

const HEAT_UNIT_LABELS: Record<HeatUnit, string> = {
  "J/kgC":  "J/kg°C",
  "kJ/kgC": "kJ/kg°C",
  "cal/gC": "cal/g°C",
};

const TEMP_UNIT_LABELS: Record<TempUnit, string> = {
  C: "°C",
  F: "°F",
  K: "K",
};

export default function SpecificHeatCalculatorUI() {
  const [inputs,      setInputs]      = useState<SpecificHeatInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<SpecificHeatResult | null>(null);
  const [errors,      setErrors]      = useState<Record<string, string | null>>({});
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstInputRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const errs: Record<string, string | null> = {};
      const { mode, tempUnit } = inputs;

      if (mode !== "Q") {
        errs.heatEnergy = validatePositive(inputs.heatEnergy, "Heat Energy");
      }
      if (mode !== "m") {
        errs.mass = validatePositive(inputs.mass, "Mass");
      }
      if (mode !== "c") {
        errs.specificHeat = validatePositive(inputs.specificHeat, "Specific Heat");
      }
      if (mode !== "deltaT") {
        errs.initialTemp = validateTemp(inputs.initialTemp, "Initial Temperature", tempUnit);
        errs.finalTemp   = validateTemp(inputs.finalTemp,   "Final Temperature",   tempUnit);
      }

      setErrors(errs);
      if (Object.values(errs).some(Boolean)) { setResult(null); return; }

      try {
        setResult(calculate(inputs));
      } catch {
        setResult(null);
      }
    }, 120),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const setMode = (mode: CalcMode) => {
    setInputs((p) => ({ ...p, mode }));
    setResult(null);
    setErrors({});
  };

  const setMaterial = (label: string) => {
    const preset = MATERIAL_PRESETS.find((p) => p.label === label);
    if (preset) {
      setInputs((p) => ({
        ...p,
        material: label,
        specificHeat: String(preset.value),
        heatUnit: preset.unit,
      }));
    } else {
      setInputs((p) => ({ ...p, material: "Custom" }));
    }
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    firstInputRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `${result.label}: ${formatNum(result.value, inputs.precision)} ${result.unit}\nFormula: ${result.formula}\n${result.breakdown}`
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
    downloadFile(exportToText(inputs, result), "specific-heat-calculation.txt");
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

  const patch = (update: Partial<SpecificHeatInputs>) =>
    setInputs((p) => ({ ...p, ...update }));

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌡️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Specific Heat Calculator</h3>
              <p className="text-sm text-blue-800">
                Select what you want to calculate, enter your values, and get instant results using Q = m × c × ΔT with step-by-step breakdowns.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Calculation Mode</p>
          <div className="flex gap-2 flex-wrap">
            {(["Q", "m", "c", "deltaT"] as CalcMode[]).map((mode) => (
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

          {/* ── Left Panel ─────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider">
                {result ? result.label : "Result"}
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? `${formatNum(result.value, inputs.precision)}` : "—"}
              </div>
              {result && (
                <div className="text-lg text-primary-100 mb-3">{result.unit}</div>
              )}

              {result && inputs.mode === "Q" && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Joules (J)</span>
                    <span className="font-semibold">{formatNum(result.Q_J, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Kilojoules (kJ)</span>
                    <span className="font-semibold">{formatNum(result.Q_kJ, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">kcal</span>
                    <span className="font-semibold">{formatNum(result.Q_kcal, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">BTU</span>
                    <span className="font-semibold">{formatNum(result.Q_BTU, inputs.precision)}</span>
                  </div>
                </div>
              )}

              {result && (
                <div className="pt-3 border-t border-white/20 text-xs text-primary-100 mb-4">
                  <span className="font-mono">{result.formula}</span>
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

            {/* Settings & Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Settings & Actions</h3>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select
                  value={inputs.precision}
                  onChange={(e) => patch({ precision: parseInt(e.target.value) as Precision })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
                  <option value={6}>6 decimal places</option>
                </select>
              </div>
              <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ↺ Reset
              </button>
              <button onClick={() => setShowFormula(!showFormula)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📖 {showFormula ? "Hide" : "Show"} Formula
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

          {/* ── Right Panel ────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Inputs Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">
                {inputs.mode === "Q"      && "Calculate Heat Energy (Q)"}
                {inputs.mode === "m"      && "Calculate Mass (m)"}
                {inputs.mode === "c"      && "Calculate Specific Heat (c)"}
                {inputs.mode === "deltaT" && "Calculate Temperature Change (ΔT)"}
              </h3>

              {/* Material Presets */}
              {(inputs.mode === "Q" || inputs.mode === "m" || inputs.mode === "deltaT") && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Material Preset</p>
                  <div className="flex flex-wrap gap-2">
                    {MATERIAL_PRESETS.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => setMaterial(p.label)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                          inputs.material === p.label
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                    <button
                      onClick={() => patch({ material: "Custom" })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                        inputs.material === "Custom"
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      Custom
                    </button>
                  </div>
                </div>
              )}

              {/* Heat Energy input – shown when mode !== Q */}
              {inputs.mode !== "Q" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heat Energy (Q)
                    <span className="ml-1 text-xs text-gray-400" title="Total heat energy in Joules">ⓘ</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      ref={firstInputRef}
                      type="number" inputMode="decimal"
                      value={inputs.heatEnergy}
                      onChange={(e) => patch({ heatEnergy: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={`flex-1 px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.heatEnergy ? "border-red-300" : "border-gray-200"}`}
                      placeholder="502320" min="0" step="any" aria-label="Heat energy"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center min-w-[52px] justify-center text-sm">
                      J
                    </div>
                  </div>
                  {errors.heatEnergy && <p className="text-xs text-red-600 mt-1">{errors.heatEnergy}</p>}
                </div>
              )}

              {/* Mass input – shown when mode !== m */}
              {inputs.mode !== "m" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mass (m)
                      <span className="ml-1 text-xs text-gray-400" title="Mass of the substance">ⓘ</span>
                    </label>
                    <input
                      ref={inputs.mode === "Q" ? firstInputRef : undefined}
                      type="number" inputMode="decimal"
                      value={inputs.mass}
                      onChange={(e) => patch({ mass: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.mass ? "border-red-300" : "border-gray-200"}`}
                      placeholder="2" min="0" step="any" aria-label="Mass"
                    />
                    {errors.mass && <p className="text-xs text-red-600 mt-1">{errors.mass}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mass Unit</label>
                    <select
                      value={inputs.massUnit}
                      onChange={(e) => patch({ massUnit: e.target.value as MassUnit })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(["kg", "g", "lb"] as MassUnit[]).map((u) => (
                        <option key={u} value={u}>{MASS_UNIT_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Specific Heat input – shown when mode !== c */}
              {inputs.mode !== "c" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specific Heat (c)
                      <span className="ml-1 text-xs text-gray-400" title="Heat needed to raise 1 kg by 1°C">ⓘ</span>
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.specificHeat}
                      onChange={(e) => patch({ specificHeat: e.target.value, material: "Custom" })}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.specificHeat ? "border-red-300" : "border-gray-200"}`}
                      placeholder="4186" min="0" step="any" aria-label="Specific heat capacity"
                    />
                    {errors.specificHeat && <p className="text-xs text-red-600 mt-1">{errors.specificHeat}</p>}
                    <p className="text-xs text-gray-400 mt-1">Water: 4186 · Aluminum: 900 · Copper: 385</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heat Unit</label>
                    <select
                      value={inputs.heatUnit}
                      onChange={(e) => patch({ heatUnit: e.target.value as HeatUnit })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(["J/kgC", "kJ/kgC", "cal/gC"] as HeatUnit[]).map((u) => (
                        <option key={u} value={u}>{HEAT_UNIT_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Temperature inputs – shown when mode !== deltaT */}
              {inputs.mode !== "deltaT" && (
                <>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Initial Temp (T₁)</label>
                      <input
                        type="number" inputMode="decimal"
                        value={inputs.initialTemp}
                        onChange={(e) => patch({ initialTemp: e.target.value })}
                        onKeyDown={handleKeyDown}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.initialTemp ? "border-red-300" : "border-gray-200"}`}
                        placeholder="20" step="any" aria-label="Initial temperature"
                      />
                      {errors.initialTemp && <p className="text-xs text-red-600 mt-1">{errors.initialTemp}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Final Temp (T₂)</label>
                      <input
                        type="number" inputMode="decimal"
                        value={inputs.finalTemp}
                        onChange={(e) => patch({ finalTemp: e.target.value })}
                        onKeyDown={handleKeyDown}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.finalTemp ? "border-red-300" : "border-gray-200"}`}
                        placeholder="80" step="any" aria-label="Final temperature"
                      />
                      {errors.finalTemp && <p className="text-xs text-red-600 mt-1">{errors.finalTemp}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Temp Unit</label>
                      <select
                        value={inputs.tempUnit}
                        onChange={(e) => patch({ tempUnit: e.target.value as TempUnit })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                      >
                        {(["C", "F", "K"] as TempUnit[]).map((u) => (
                          <option key={u} value={u}>{TEMP_UNIT_LABELS[u]}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {result && (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                      <span className="font-medium">ΔT = </span>
                      <span className="font-mono">{formatNum(result.deltaT, inputs.precision)}°C</span>
                      <span className="text-gray-500 ml-2">(T₂ − T₁)</span>
                    </div>
                  )}
                </>
              )}

              {/* Formula breakdown */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong> {result.formula}<br />
                  <span className="font-mono text-xs">{result.breakdown}</span>
                </div>
              )}

              <p className="text-xs text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>
            </div>

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Formula Reference</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Heat Energy",    formula: "Q = m × c × ΔT",    active: inputs.mode === "Q" },
                    { label: "Mass",           formula: "m = Q / (c × ΔT)",  active: inputs.mode === "m" },
                    { label: "Specific Heat",  formula: "c = Q / (m × ΔT)",  active: inputs.mode === "c" },
                    { label: "Temp Change",    formula: "ΔT = Q / (m × c)",  active: inputs.mode === "deltaT" },
                  ].map(({ label, formula, active }) => (
                    <div key={label} className={`p-4 rounded-lg border ${active ? "bg-primary/5 border-primary/30" : "bg-gray-50 border-gray-200"}`}>
                      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
                      <p className={`font-mono text-sm font-semibold ${active ? "text-primary" : "text-gray-700"}`}>{formula}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                  <strong>Where:</strong> Q = heat energy (J) · m = mass (kg) · c = specific heat (J/kg°C) · ΔT = temperature change (°C)
                </div>
              </div>
            )}

            {/* Calculation Steps */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Calculation Steps</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1 max-h-72 overflow-y-auto">
                  {result.steps.map((step, i) => (
                    <div key={i} className={step === "" ? "h-2" : "text-gray-700"}>{step}</div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  {result.interpretation}
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
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                {history.length === 0 ? (
                  <div className="p-6 text-center text-gray-400 text-sm">No saved calculations yet.</div>
                ) : (
                  <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                    {history.map((entry) => (
                      <button
                        key={entry.id}
                        onClick={() => loadFromHistory(entry)}
                        className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-primary">{entry.result.label}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-sm font-mono text-gray-700">
                          {formatNum(entry.result.value, 2)} {entry.result.unit}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 font-mono">{entry.result.breakdown}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      <SpecificHeatCalculatorSEO />

      <RelatedTools
        currentTool="specific-heat-calculator"
        tools={specificHeatCalculatorConfig.relatedTools}
      />
    </>
  );
}

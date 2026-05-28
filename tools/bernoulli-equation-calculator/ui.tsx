"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  BernoulliInputs,
  BernoulliResult,
  HistoryEntry,
  PressureUnit,
  VelocityUnit,
  HeightUnit,
  DensityUnit,
  Precision,
  SolveFor,
} from "./types";
import {
  calculate,
  validateNumber,
  validatePositive,
  fmt,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  FLUID_PRESETS,
  SOLVE_FOR_LABELS,
} from "./logic";
import BernoulliEquationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: BernoulliInputs = {
  solveFor:    "P2",
  P1:          "200000",
  P1Unit:      "Pa",
  P2:          "",
  P2Unit:      "Pa",
  V1:          "2",
  V1Unit:      "m/s",
  V2:          "5",
  V2Unit:      "m/s",
  h1:          "0",
  h1Unit:      "m",
  h2:          "3",
  h2Unit:      "m",
  density:     "1000",
  densityUnit: "kg/m3",
  gravity:     "9.81",
  precision:   2,
};

export default function BernoulliEquationCalculatorUI() {
  const [inputs,      setInputs]      = useState<BernoulliInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<BernoulliResult | null>(null);
  const [errors,      setErrors]      = useState<Record<string, string | null>>({});
  const [calcError,   setCalcError]   = useState<string | null>(null);
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstInputRef.current?.focus();
  }, []);

  const set = (field: keyof BernoulliInputs, value: string) =>
    setInputs((prev) => ({ ...prev, [field]: value }));

  // ── Validation helpers ────────────────────────────────────────────────────
  function getFieldErrors(inp: BernoulliInputs): Record<string, string | null> {
    const e: Record<string, string | null> = {};
    const sf = inp.solveFor;
    if (sf !== "P1") e.P1 = validateNumber(inp.P1, "Pressure 1");
    if (sf !== "P2") e.P2 = validateNumber(inp.P2, "Pressure 2");
    if (sf !== "V1") e.V1 = validatePositive(inp.V1, "Velocity 1");
    if (sf !== "V2") e.V2 = validatePositive(inp.V2, "Velocity 2");
    if (sf !== "h1") e.h1 = validateNumber(inp.h1, "Height 1");
    if (sf !== "h2") e.h2 = validateNumber(inp.h2, "Height 2");
    e.density = validatePositive(inp.density, "Fluid Density");
    e.gravity = validatePositive(inp.gravity, "Gravity");
    return e;
  }

  // ── Debounced calculation ─────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const errs = getFieldErrors(inputs);
      setErrors(errs);
      if (Object.values(errs).some(Boolean)) { setResult(null); setCalcError(null); return; }
      try {
        setResult(calculate(inputs));
        setCalcError(null);
      } catch (err: unknown) {
        setResult(null);
        setCalcError(err instanceof Error ? err.message : "Calculation error.");
      }
    }, 150),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSolveForChange = (sf: SolveFor) => {
    setInputs((prev) => {
      const next = { ...prev, solveFor: sf };
      // Clear the field being solved for
      if (sf === "P1") next.P1 = "";
      if (sf === "P2") next.P2 = "";
      if (sf === "V1") next.V1 = "";
      if (sf === "V2") next.V2 = "";
      if (sf === "h1") next.h1 = "";
      if (sf === "h2") next.h2 = "";
      return next;
    });
  };

  const handlePreset = (p: typeof FLUID_PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, density: p.density, densityUnit: p.densityUnit }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    setCalcError(null);
    firstInputRef.current?.focus();
  };

  const handleSwap = () => {
    setInputs((prev) => ({
      ...prev,
      P1: prev.P2, P1Unit: prev.P2Unit,
      P2: prev.P1, P2Unit: prev.P1Unit,
      V1: prev.V2, V1Unit: prev.V2Unit,
      V2: prev.V1, V2Unit: prev.V1Unit,
      h1: prev.h2, h1Unit: prev.h2Unit,
      h2: prev.h1, h2Unit: prev.h1Unit,
    }));
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${result.label} = ${result.formulaResult}`);
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
    downloadFile(exportToText(inputs, result), "bernoulli-calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const isSolving = (field: string) => inputs.solveFor === field;

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${
      isSolving(field)
        ? "bg-primary/5 border-primary/30 text-primary/50 cursor-not-allowed"
        : errors[field]
        ? "border-red-300"
        : "border-gray-200"
    }`;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌊</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Bernoulli Equation Calculator</h3>
              <p className="text-sm text-blue-800">
                Select the unknown variable, enter all known values, and instantly solve using the Bernoulli principle:
                P₁ + ½ρV₁² + ρgh₁ = P₂ + ½ρV₂² + ρgh₂
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ─────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-1 text-xs uppercase tracking-wider">
                {result ? result.label : "Result"}
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? result.formulaResult : calcError ? "Error" : "—"}
              </div>

              {calcError && (
                <p className="text-red-200 text-xs mt-2">{calcError}</p>
              )}

              {result && (
                <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mt-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">P₁</span>
                    <span className="font-semibold">{fmt(result.P1_si, 2)} Pa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">P₂</span>
                    <span className="font-semibold">{fmt(result.P2_si, 2)} Pa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">V₁</span>
                    <span className="font-semibold">{fmt(result.V1_si, 4)} m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">V₂</span>
                    <span className="font-semibold">{fmt(result.V2_si, 4)} m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">h₁</span>
                    <span className="font-semibold">{fmt(result.h1_si, 4)} m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">h₂</span>
                    <span className="font-semibold">{fmt(result.h2_si, 4)} m</span>
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

            {/* Actions */}
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
                  <option value={4}>4 decimal places</option>
                  <option value={6}>6 decimal places</option>
                </select>
              </div>

              <button onClick={handleSwap} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ⇄ Swap Inputs (1↔2)
              </button>
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

            {/* Solve For */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Solve For</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(SOLVE_FOR_LABELS) as SolveFor[]).map((sf) => (
                  <button
                    key={sf}
                    onClick={() => handleSolveForChange(sf)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                      inputs.solveFor === sf
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {SOLVE_FOR_LABELS[sf]}
                  </button>
                ))}
              </div>
            </div>

            {/* Pressure Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Pressure</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pressure 1 (P₁)
                    {isSolving("P1") && <span className="ml-2 text-xs text-primary font-semibold">← Solving</span>}
                  </label>
                  <input
                    ref={firstInputRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.P1}
                    onChange={(e) => set("P1", e.target.value)}
                    disabled={isSolving("P1")}
                    className={inputClass("P1")}
                    placeholder={isSolving("P1") ? "Calculated" : "200000"}
                    step="any"
                    aria-label="Pressure 1"
                  />
                  {errors.P1 && !isSolving("P1") && <p className="text-xs text-red-600 mt-1">{errors.P1}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">P₁ Unit</label>
                  <select
                    value={inputs.P1Unit}
                    onChange={(e) => set("P1Unit", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="Pa">Pa (Pascal)</option>
                    <option value="kPa">kPa (Kilopascal)</option>
                    <option value="bar">bar</option>
                    <option value="psi">psi</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pressure 2 (P₂)
                    {isSolving("P2") && <span className="ml-2 text-xs text-primary font-semibold">← Solving</span>}
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.P2}
                    onChange={(e) => set("P2", e.target.value)}
                    disabled={isSolving("P2")}
                    className={inputClass("P2")}
                    placeholder={isSolving("P2") ? "Calculated" : "180000"}
                    step="any"
                    aria-label="Pressure 2"
                  />
                  {errors.P2 && !isSolving("P2") && <p className="text-xs text-red-600 mt-1">{errors.P2}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">P₂ Unit</label>
                  <select
                    value={inputs.P2Unit}
                    onChange={(e) => set("P2Unit", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="Pa">Pa (Pascal)</option>
                    <option value="kPa">kPa (Kilopascal)</option>
                    <option value="bar">bar</option>
                    <option value="psi">psi</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Velocity Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Velocity</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Velocity 1 (V₁)
                    {isSolving("V1") && <span className="ml-2 text-xs text-primary font-semibold">← Solving</span>}
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.V1}
                    onChange={(e) => set("V1", e.target.value)}
                    disabled={isSolving("V1")}
                    className={inputClass("V1")}
                    placeholder={isSolving("V1") ? "Calculated" : "2"}
                    min="0"
                    step="any"
                    aria-label="Velocity 1"
                  />
                  {errors.V1 && !isSolving("V1") && <p className="text-xs text-red-600 mt-1">{errors.V1}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">V₁ Unit</label>
                  <select
                    value={inputs.V1Unit}
                    onChange={(e) => set("V1Unit", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="m/s">m/s</option>
                    <option value="ft/s">ft/s</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Velocity 2 (V₂)
                    {isSolving("V2") && <span className="ml-2 text-xs text-primary font-semibold">← Solving</span>}
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.V2}
                    onChange={(e) => set("V2", e.target.value)}
                    disabled={isSolving("V2")}
                    className={inputClass("V2")}
                    placeholder={isSolving("V2") ? "Calculated" : "5"}
                    min="0"
                    step="any"
                    aria-label="Velocity 2"
                  />
                  {errors.V2 && !isSolving("V2") && <p className="text-xs text-red-600 mt-1">{errors.V2}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">V₂ Unit</label>
                  <select
                    value={inputs.V2Unit}
                    onChange={(e) => set("V2Unit", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="m/s">m/s</option>
                    <option value="ft/s">ft/s</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Height Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Elevation</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height 1 (h₁)
                    {isSolving("h1") && <span className="ml-2 text-xs text-primary font-semibold">← Solving</span>}
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.h1}
                    onChange={(e) => set("h1", e.target.value)}
                    disabled={isSolving("h1")}
                    className={inputClass("h1")}
                    placeholder={isSolving("h1") ? "Calculated" : "0"}
                    step="any"
                    aria-label="Height 1"
                  />
                  {errors.h1 && !isSolving("h1") && <p className="text-xs text-red-600 mt-1">{errors.h1}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">h₁ Unit</label>
                  <select
                    value={inputs.h1Unit}
                    onChange={(e) => set("h1Unit", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="m">meters (m)</option>
                    <option value="ft">feet (ft)</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height 2 (h₂)
                    {isSolving("h2") && <span className="ml-2 text-xs text-primary font-semibold">← Solving</span>}
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.h2}
                    onChange={(e) => set("h2", e.target.value)}
                    disabled={isSolving("h2")}
                    className={inputClass("h2")}
                    placeholder={isSolving("h2") ? "Calculated" : "3"}
                    step="any"
                    aria-label="Height 2"
                  />
                  {errors.h2 && !isSolving("h2") && <p className="text-xs text-red-600 mt-1">{errors.h2}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">h₂ Unit</label>
                  <select
                    value={inputs.h2Unit}
                    onChange={(e) => set("h2Unit", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="m">meters (m)</option>
                    <option value="ft">feet (ft)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Fluid Properties */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Fluid Properties</h3>

              {/* Fluid presets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fluid Preset</label>
                <div className="flex flex-wrap gap-2">
                  {FLUID_PRESETS.map((p) => {
                    const active = inputs.density === p.density && inputs.densityUnit === p.densityUnit;
                    return (
                      <button
                        key={p.label}
                        onClick={() => handlePreset(p)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                          active
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
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
                    Fluid Density (ρ)
                    <span className="ml-1 text-xs text-gray-400" title="Mass per unit volume">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.density}
                    onChange={(e) => set("density", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.density ? "border-red-300" : "border-gray-200"}`}
                    placeholder="1000"
                    min="0"
                    step="any"
                    aria-label="Fluid density"
                  />
                  {errors.density && <p className="text-xs text-red-600 mt-1">{errors.density}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Density Unit</label>
                  <select
                    value={inputs.densityUnit}
                    onChange={(e) => set("densityUnit", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="kg/m3">kg/m³</option>
                    <option value="lb/ft3">lb/ft³</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gravity (g)
                    <span className="ml-1 text-xs text-gray-400" title="Standard: 9.81 m/s²">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.gravity}
                    onChange={(e) => set("gravity", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.gravity ? "border-red-300" : "border-gray-200"}`}
                    placeholder="9.81"
                    min="0"
                    step="any"
                    aria-label="Gravitational acceleration"
                  />
                  {errors.gravity && <p className="text-xs text-red-600 mt-1">{errors.gravity}</p>}
                </div>
                <div className="flex items-end">
                  <p className="text-xs text-gray-500 pb-3">
                    Standard: 9.81 m/s² (Earth)<br />
                    Moon: 1.62 m/s²
                  </p>
                </div>
              </div>
            </div>

            {/* Live Formula Substitution */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
                <h3 className="font-semibold text-gray-800">Step-by-Step Solution</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center">
                    {result.formulaGeneral}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs px-1">
                    <span>↓ Rearranged for {result.label}</span>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg font-mono text-xs text-blue-800 break-all">
                    {result.formulaRearranged}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs px-1">
                    <span>↓ Substituted values (SI)</span>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg font-mono text-xs text-green-800 break-all">
                    = {result.formulaSubstituted}
                  </div>
                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-center">
                    <span className="font-semibold text-primary text-base">{result.label} = {result.formulaResult}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Energy Breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Energy Terms Breakdown (Pa)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Term</th>
                        <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Point 1</th>
                        <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Point 2</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Static Pressure (P)</td>
                        <td className="py-2 px-3 font-mono text-right">{fmt(result.P1_si, 2)}</td>
                        <td className="py-2 px-3 font-mono text-right">{fmt(result.P2_si, 2)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Kinetic Energy (½ρV²)</td>
                        <td className="py-2 px-3 font-mono text-right">{fmt(result.kineticEnergy1, 2)}</td>
                        <td className="py-2 px-3 font-mono text-right">{fmt(result.kineticEnergy2, 2)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Potential Energy (ρgh)</td>
                        <td className="py-2 px-3 font-mono text-right">{fmt(result.potentialEnergy1, 2)}</td>
                        <td className="py-2 px-3 font-mono text-right">{fmt(result.potentialEnergy2, 2)}</td>
                      </tr>
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-semibold text-primary">Total Energy</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary text-right">{fmt(result.totalEnergy1, 2)}</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary text-right">{fmt(result.totalEnergy2, 2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Total energy should be equal at both points (conservation of energy).
                  Small differences may occur due to rounding.
                </p>
              </div>
            )}

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Bernoulli Equation — Reference</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    P + ½ρV² + ρgh = constant
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-sm">
                    P₁ + ½ρV₁² + ρgh₁ = P₂ + ½ρV₂² + ρgh₂
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">P — Static Pressure</div>
                      <div className="text-blue-700 text-xs">Pressure exerted by the fluid (Pa). Higher velocity → lower pressure.</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">½ρV² — Kinetic Energy</div>
                      <div className="text-orange-700 text-xs">Dynamic pressure from fluid motion. Increases with velocity squared.</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">ρgh — Potential Energy</div>
                      <div className="text-green-700 text-xs">Pressure from elevation. Increases with height above datum.</div>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="font-semibold text-purple-800 text-xs uppercase mb-1">ρ — Fluid Density</div>
                      <div className="text-purple-700 text-xs">Mass per unit volume (kg/m³). Water ≈ 1000, Air ≈ 1.225.</div>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
                    <strong>Assumptions:</strong> Steady, incompressible, inviscid flow along a streamline. No energy losses from friction or heat transfer.
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
                {history.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 text-sm">No saved calculations yet.</div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {history.map((entry) => (
                      <button
                        key={entry.id}
                        onClick={() => loadFromHistory(entry)}
                        className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-800">
                            {entry.result.label} = {entry.result.formulaResult}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          ρ = {entry.inputs.density} {entry.inputs.densityUnit} · g = {entry.inputs.gravity} m/s²
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>{/* end right panel */}
        </div>{/* end grid */}
      </div>{/* end max-w */}

      <BernoulliEquationCalculatorSEO />

      <RelatedTools
        currentTool="bernoulli-equation-calculator"
        tools={[
          "reynolds-number-calculator",
          "pressure-drop-calculator",
          "flow-rate-calculator",
          "pipe-velocity-calculator",
          "hydraulic-pressure-calculator",
          "venturi-flow-calculator",
        ]}
      />
    </>
  );
}

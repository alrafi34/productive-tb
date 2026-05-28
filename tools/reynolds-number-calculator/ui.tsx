"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ReynoldsInputs,
  ReynoldsResult,
  HistoryEntry,
  VelocityUnit,
  DiameterUnit,
  DensityUnit,
  ViscosityUnit,
  Precision,
} from "./types";
import {
  calculate,
  validatePositive,
  formatRe,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  detectFluidHint,
  VELOCITY_LABELS,
  DIAMETER_LABELS,
  DENSITY_LABELS,
  VISCOSITY_LABELS,
  ALL_VELOCITY_UNITS,
  ALL_DIAMETER_UNITS,
  ALL_DENSITY_UNITS,
  ALL_VISCOSITY_UNITS,
  FLUID_PRESETS,
  REGIME_LABELS,
  REGIME_DESCRIPTIONS,
} from "./logic";
import ReynoldsNumberCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: ReynoldsInputs = {
  velocity:      "2",
  velocityUnit:  "m/s",
  diameter:      "0.05",
  diameterUnit:  "m",
  density:       "998",
  densityUnit:   "kg/m3",
  viscosity:     "1.002",
  viscosityUnit: "cP",
  flowContext:   "pipe",
  precision:     2,
};

export default function ReynoldsNumberCalculatorUI() {
  const [inputs,      setInputs]      = useState<ReynoldsInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<ReynoldsResult | null>(null);
  const [errors,      setErrors]      = useState<Record<string, string | null>>({});
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu,     setShowEdu]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const [fluidHint,   setFluidHint]   = useState<string | null>(null);
  const velocityRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    velocityRef.current?.focus();
  }, []);

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const ve = validatePositive(inputs.velocity,  "Fluid Velocity");
      const de = validatePositive(inputs.diameter,  "Pipe Diameter");
      const rhe = validatePositive(inputs.density,  "Fluid Density");
      const mue = validatePositive(inputs.viscosity,"Dynamic Viscosity");
      setErrors({ velocity: ve, diameter: de, density: rhe, viscosity: mue });
      if (ve || de || rhe || mue) { setResult(null); return; }
      setResult(calculate(inputs));
      setFluidHint(detectFluidHint(inputs.density, inputs.viscosity, inputs.densityUnit, inputs.viscosityUnit));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePreset = (p: typeof FLUID_PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      density:       p.density,
      densityUnit:   p.densityUnit,
      viscosity:     p.viscosity,
      viscosityUnit: p.viscosityUnit,
    }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    setFluidHint(null);
    velocityRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `Reynolds Number: ${formatRe(result.re, inputs.precision)} | Flow Regime: ${REGIME_LABELS[result.regime]}`
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
    downloadFile(exportToText(inputs, result), "reynolds-number-calculation.txt");
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

  // ── Regime indicator helpers ──────────────────────────────────────────────
  const regimePosition = result
    ? result.re < 2300
      ? Math.min((result.re / 2300) * 33, 33)
      : result.re <= 4000
      ? 33 + ((result.re - 2300) / 1700) * 17
      : Math.min(50 + ((result.re - 4000) / 96000) * 50, 100)
    : null;

  const regimeBg: Record<string, string> = {
    laminar:      "bg-green-100 border-green-300 text-green-800",
    transitional: "bg-yellow-100 border-yellow-300 text-yellow-800",
    turbulent:    "bg-red-100 border-red-300 text-red-800",
  };

  const regimeDot: Record<string, string> = {
    laminar:      "bg-green-500",
    transitional: "bg-yellow-500",
    turbulent:    "bg-red-500",
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💧</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Reynolds Number Calculator</h3>
              <p className="text-sm text-blue-800">
                Enter fluid velocity, pipe diameter, density, and viscosity to instantly calculate the Reynolds Number and determine the flow regime.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ─────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider">
                Reynolds Number
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? formatRe(result.re, inputs.precision) : "—"}
              </div>

              {result && (
                <div className={`mt-3 mb-4 px-3 py-2 rounded-lg border text-sm font-semibold ${regimeBg[result.regime]}`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${regimeDot[result.regime]}`} />
                    {REGIME_LABELS[result.regime]}
                  </div>
                </div>
              )}

              {result && (
                <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">V (SI)</span>
                    <span className="font-semibold">{formatRe(result.velocitySI, 4)} m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">D (SI)</span>
                    <span className="font-semibold">{formatRe(result.diameterSI, 4)} m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">ρ (SI)</span>
                    <span className="font-semibold">{formatRe(result.densitySI, 2)} kg/m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">μ (SI)</span>
                    <span className="font-semibold">{result.viscositySI.toExponential(3)} Pa·s</span>
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
                  <option value={4}>4 decimal places</option>
                  <option value={6}>6 decimal places</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Flow Context</label>
                <select
                  value={inputs.flowContext}
                  onChange={(e) => setInputs((p) => ({ ...p, flowContext: e.target.value as ReynoldsInputs["flowContext"] }))}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  <option value="pipe">Pipe Flow</option>
                  <option value="external">External Flow</option>
                  <option value="general">General Fluid Flow</option>
                </select>
              </div>

              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                ↺ Reset
              </button>
              <button
                onClick={() => setShowEdu(!showEdu)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📖 {showEdu ? "Hide" : "Show"} Formula
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

          {/* ── Right Panel ────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Main Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Enter Values</h3>

              {/* Velocity */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fluid Velocity
                    <span className="ml-1 text-xs text-gray-400" title="Speed of the fluid flow">ⓘ</span>
                  </label>
                  <input
                    ref={velocityRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.velocity}
                    onChange={(e) => setInputs((p) => ({ ...p, velocity: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.velocity ? "border-red-300" : "border-gray-200"}`}
                    placeholder="2"
                    min="0"
                    step="any"
                    aria-label="Fluid velocity"
                  />
                  {errors.velocity && <p className="text-xs text-red-600 mt-1">{errors.velocity}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Velocity Unit</label>
                  <select
                    value={inputs.velocityUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, velocityUnit: e.target.value as VelocityUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_VELOCITY_UNITS.map((u) => (
                      <option key={u} value={u}>{VELOCITY_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Diameter */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pipe Diameter / Characteristic Length
                    <span className="ml-1 text-xs text-gray-400" title="Internal pipe diameter or characteristic length">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.diameter}
                    onChange={(e) => setInputs((p) => ({ ...p, diameter: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.diameter ? "border-red-300" : "border-gray-200"}`}
                    placeholder="0.05"
                    min="0"
                    step="any"
                    aria-label="Pipe diameter"
                  />
                  {errors.diameter && <p className="text-xs text-red-600 mt-1">{errors.diameter}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diameter Unit</label>
                  <select
                    value={inputs.diameterUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, diameterUnit: e.target.value as DiameterUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_DIAMETER_UNITS.map((u) => (
                      <option key={u} value={u}>{DIAMETER_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Density */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fluid Density (ρ)
                    <span className="ml-1 text-xs text-gray-400" title="Mass per unit volume of the fluid">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.density}
                    onChange={(e) => setInputs((p) => ({ ...p, density: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.density ? "border-red-300" : "border-gray-200"}`}
                    placeholder="998"
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
                    onChange={(e) => setInputs((p) => ({ ...p, densityUnit: e.target.value as DensityUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_DENSITY_UNITS.map((u) => (
                      <option key={u} value={u}>{DENSITY_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Viscosity */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dynamic Viscosity (μ)
                    <span className="ml-1 text-xs text-gray-400" title="Resistance of fluid to flow">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.viscosity}
                    onChange={(e) => setInputs((p) => ({ ...p, viscosity: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.viscosity ? "border-red-300" : "border-gray-200"}`}
                    placeholder="1.002"
                    min="0"
                    step="any"
                    aria-label="Dynamic viscosity"
                  />
                  {errors.viscosity && <p className="text-xs text-red-600 mt-1">{errors.viscosity}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Viscosity Unit</label>
                  <select
                    value={inputs.viscosityUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, viscosityUnit: e.target.value as ViscosityUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_VISCOSITY_UNITS.map((u) => (
                      <option key={u} value={u}>{VISCOSITY_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fluid hint */}
              {fluidHint && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex items-center gap-2">
                  <span>💡</span>
                  <span>{fluidHint} — density and viscosity match typical values.</span>
                </div>
              )}

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Re = (ρ × V × D) / μ</strong>
                  <br />
                  <span className="font-mono text-xs">{result.formulaSubstituted} = <strong>{formatRe(result.re, inputs.precision)}</strong></span>
                </div>
              )}

              <p className="text-xs text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>
            </div>

            {/* Flow Regime Visualization */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Flow Regime Indicator</h3>
                <div className="relative">
                  {/* Track */}
                  <div className="flex h-4 rounded-full overflow-hidden">
                    <div className="w-1/3 bg-green-200" />
                    <div className="w-[17%] bg-yellow-200" />
                    <div className="flex-1 bg-red-200" />
                  </div>
                  {/* Marker */}
                  {regimePosition !== null && (
                    <div
                      className="absolute top-0 w-4 h-4 rounded-full border-2 border-white shadow-md -translate-x-1/2 transition-all duration-300"
                      style={{
                        left: `${regimePosition}%`,
                        backgroundColor:
                          result.regime === "laminar" ? "#22c55e" :
                          result.regime === "transitional" ? "#eab308" : "#ef4444",
                      }}
                    />
                  )}
                  {/* Labels */}
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span className="text-green-700 font-medium">Laminar<br />&lt; 2,300</span>
                    <span className="text-yellow-700 font-medium text-center">Transitional<br />2,300–4,000</span>
                    <span className="text-red-700 font-medium text-right">Turbulent<br />&gt; 4,000</span>
                  </div>
                </div>

                {/* Regime description */}
                <div className={`mt-4 p-3 rounded-lg border text-sm ${
                  result.regime === "laminar"      ? "bg-green-50 border-green-200 text-green-800" :
                  result.regime === "transitional" ? "bg-yellow-50 border-yellow-200 text-yellow-800" :
                                                     "bg-red-50 border-red-200 text-red-800"
                }`}>
                  <strong>{REGIME_LABELS[result.regime]}:</strong> {REGIME_DESCRIPTIONS[result.regime]}
                </div>
              </div>
            )}

            {/* Fluid Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Fluid Presets</h3>
              <div className="flex flex-wrap gap-2">
                {FLUID_PRESETS.map((p) => {
                  const active =
                    inputs.density === p.density &&
                    inputs.densityUnit === p.densityUnit &&
                    inputs.viscosity === p.viscosity &&
                    inputs.viscosityUnit === p.viscosityUnit;
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

            {/* Results Breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Calculation Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parameter</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Input</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">SI Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Velocity (V)</td>
                        <td className="py-2 px-3 font-mono">{inputs.velocity} {inputs.velocityUnit}</td>
                        <td className="py-2 px-3 font-mono">{formatRe(result.velocitySI, 4)} m/s</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Diameter (D)</td>
                        <td className="py-2 px-3 font-mono">{inputs.diameter} {inputs.diameterUnit}</td>
                        <td className="py-2 px-3 font-mono">{formatRe(result.diameterSI, 4)} m</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Density (ρ)</td>
                        <td className="py-2 px-3 font-mono">{inputs.density} {inputs.densityUnit}</td>
                        <td className="py-2 px-3 font-mono">{formatRe(result.densitySI, 2)} kg/m³</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Viscosity (μ)</td>
                        <td className="py-2 px-3 font-mono">{inputs.viscosity} {inputs.viscosityUnit}</td>
                        <td className="py-2 px-3 font-mono">{result.viscositySI.toExponential(3)} Pa·s</td>
                      </tr>
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">Reynolds Number</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary" colSpan={2}>{formatRe(result.re, inputs.precision)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Educational Formula Panel */}
            {showEdu && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formula & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    Re = (ρ × V × D) / μ
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">ρ — Fluid Density</div>
                      <div className="text-blue-700 text-xs">Mass per unit volume (kg/m³). Higher density increases Re.</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">V — Fluid Velocity</div>
                      <div className="text-orange-700 text-xs">Speed of the fluid (m/s). Higher velocity increases Re.</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">D — Characteristic Length</div>
                      <div className="text-green-700 text-xs">Pipe diameter or length scale (m). Larger diameter increases Re.</div>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="font-semibold text-purple-800 text-xs uppercase mb-1">μ — Dynamic Viscosity</div>
                      <div className="text-purple-700 text-xs">Fluid resistance to flow (Pa·s). Higher viscosity decreases Re.</div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 space-y-1">
                    <div className="flex justify-between"><span className="font-medium">Re &lt; 2,300</span><span className="text-green-700">Laminar — smooth, layered flow</span></div>
                    <div className="flex justify-between"><span className="font-medium">2,300 ≤ Re ≤ 4,000</span><span className="text-yellow-700">Transitional — unstable flow</span></div>
                    <div className="flex justify-between"><span className="font-medium">Re &gt; 4,000</span><span className="text-red-700">Turbulent — chaotic, mixed flow</span></div>
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
                            V={entry.inputs.velocity} {entry.inputs.velocityUnit}, D={entry.inputs.diameter} {entry.inputs.diameterUnit}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-primary">
                            Re = {formatRe(entry.result.re, 2)}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            entry.result.regime === "laminar"      ? "bg-green-100 text-green-700" :
                            entry.result.regime === "transitional" ? "bg-yellow-100 text-yellow-700" :
                                                                     "bg-red-100 text-red-700"
                          }`}>
                            {REGIME_LABELS[entry.result.regime]}
                          </span>
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

      <ReynoldsNumberCalculatorSEO />
      <RelatedTools
        currentTool="reynolds-number-calculator"
        tools={[
          "flow-rate-calculator",
          "pressure-drop-calculator",
          "bernoulli-equation-calculator",
          "drag-force-calculator",
          "torque-calculator",
          "force-calculator",
        ]}
      />
    </>
  );
}

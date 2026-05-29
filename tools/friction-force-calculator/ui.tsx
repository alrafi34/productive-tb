"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FrictionInputs, FrictionResult, HistoryEntry, ForceUnit, CalcMode, Precision } from "./types";
import {
  calculate,
  validateCoefficient,
  validateNormalForce,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  FORCE_LABELS,
  FORCE_SHORT,
  ALL_FORCE_UNITS,
  SURFACE_PRESETS,
} from "./logic";
import FrictionForceCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets (US defaults) ──────────────────────────────────────────────────
const QUICK_PRESETS = [
  { label: "Car Braking",       coefficient: "0.7",  normalForce: "15000", normalForceUnit: "N"   as ForceUnit, calcMode: "kinetic" as CalcMode },
  { label: "Box on Floor",      coefficient: "0.5",  normalForce: "100",   normalForceUnit: "N"   as ForceUnit, calcMode: "static"  as CalcMode },
  { label: "Steel Machinery",   coefficient: "0.57", normalForce: "500",   normalForceUnit: "N"   as ForceUnit, calcMode: "kinetic" as CalcMode },
  { label: "Ice Surface",       coefficient: "0.05", normalForce: "800",   normalForceUnit: "N"   as ForceUnit, calcMode: "kinetic" as CalcMode },
];

const DEFAULT_INPUTS: FrictionInputs = {
  coefficient:     "0.5",
  normalForce:     "100",
  normalForceUnit: "N",
  calcMode:        "static",
  precision:       2,
};

export default function FrictionForceCalculatorUI() {
  const [inputs,        setInputs]        = useState<FrictionInputs>(DEFAULT_INPUTS);
  const [result,        setResult]        = useState<FrictionResult | null>(null);
  const [coeffErr,      setCoeffErr]      = useState<string | null>(null);
  const [normalErr,     setNormalErr]     = useState<string | null>(null);
  const [copied,        setCopied]        = useState(false);
  const [showHistory,   setShowHistory]   = useState(false);
  const [showEdu,       setShowEdu]       = useState(false);
  const [history,       setHistory]       = useState<HistoryEntry[]>([]);
  const [selectedSurface, setSelectedSurface] = useState<string>("");
  const coeffRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    coeffRef.current?.focus();
  }, []);

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const ce = validateCoefficient(inputs.coefficient);
      const ne = validateNormalForce(inputs.normalForce);
      setCoeffErr(ce);
      setNormalErr(ne);
      if (ce || ne) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSurfacePreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const label = e.target.value;
    setSelectedSurface(label);
    if (!label) return;
    const preset = SURFACE_PRESETS.find((p) => p.label === label);
    if (!preset) return;
    const mu = inputs.calcMode === "static" ? preset.staticMu : preset.kineticMu;
    setInputs((prev) => ({ ...prev, coefficient: String(mu) }));
  };

  const handleModeChange = (mode: CalcMode) => {
    setInputs((prev) => {
      // If a surface is selected, update coefficient for the new mode
      if (selectedSurface) {
        const preset = SURFACE_PRESETS.find((p) => p.label === selectedSurface);
        if (preset) {
          const mu = mode === "static" ? preset.staticMu : preset.kineticMu;
          return { ...prev, calcMode: mode, coefficient: String(mu) };
        }
      }
      return { ...prev, calcMode: mode };
    });
  };

  const handleQuickPreset = (p: typeof QUICK_PRESETS[0]) => {
    setSelectedSurface("");
    setInputs((prev) => ({
      ...prev,
      coefficient:     p.coefficient,
      normalForce:     p.normalForce,
      normalForceUnit: p.normalForceUnit,
      calcMode:        p.calcMode,
    }));
    coeffRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setCoeffErr(null);
    setNormalErr(null);
    setSelectedSurface("");
    coeffRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Friction Force: ${formatNum(result.frictionN, inputs.precision)} N | μ = ${inputs.coefficient} | N = ${inputs.normalForce} ${FORCE_SHORT[inputs.normalForceUnit]} | Mode: ${inputs.calcMode}`;
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
    downloadFile(exportToText(inputs, result), "friction-force-calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setSelectedSurface("");
    setShowHistory(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") handleReset();
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔩</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Friction Force Calculator (F = μ × N)</h3>
              <p className="text-sm text-blue-800">
                Enter the coefficient of friction and normal force to instantly calculate frictional force.
                Supports static and kinetic modes with surface material presets and multi-unit output.
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
                Friction Force Result
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result !== null ? `${formatNum(result.frictionN, inputs.precision)} N` : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Newtons (N)</span>
                    <span className="font-semibold">{formatNum(result.frictionN, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Kilonewtons (kN)</span>
                    <span className="font-semibold">{formatNum(result.frictionKN, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Pound-force (lbf)</span>
                    <span className="font-semibold">{formatNum(result.frictionLbf, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Mode</span>
                    <span className="font-semibold capitalize">{inputs.calcMode}</span>
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

              {/* Calculation Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
                <div className="flex gap-3">
                  {(["static", "kinetic"] as CalcMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => handleModeChange(mode)}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                        inputs.calcMode === mode
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {mode === "static" ? "⏸ Static Friction" : "▶ Kinetic Friction"}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  {inputs.calcMode === "static"
                    ? "Maximum friction before motion begins (Fs ≤ μs × N)"
                    : "Friction during sliding motion (Fk = μk × N)"}
                </p>
              </div>

              {/* Surface Preset */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surface Preset
                  <span className="ml-1 text-xs text-gray-400" title="Auto-fills the coefficient of friction">ⓘ</span>
                </label>
                <select
                  value={selectedSurface}
                  onChange={handleSurfacePreset}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="">— Select a surface (optional) —</option>
                  {SURFACE_PRESETS.map((p) => (
                    <option key={p.label} value={p.label}>
                      {p.label} (μ = {inputs.calcMode === "static" ? p.staticMu : p.kineticMu})
                    </option>
                  ))}
                </select>
                {selectedSurface && (
                  <p className="text-xs text-gray-400 mt-1">
                    {SURFACE_PRESETS.find((p) => p.label === selectedSurface)?.description}
                  </p>
                )}
              </div>

              {/* Coefficient of Friction */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coefficient of Friction (μ)
                  <span className="ml-1 text-xs text-gray-400" title="Dimensionless ratio — typical range: 0.01 to 1.5">ⓘ</span>
                </label>
                <input
                  ref={coeffRef}
                  type="number"
                  inputMode="decimal"
                  value={inputs.coefficient}
                  onChange={(e) => {
                    setSelectedSurface("");
                    setInputs((p) => ({ ...p, coefficient: e.target.value.replace(/[^0-9.]/g, "") }));
                  }}
                  onKeyDown={handleKeyDown}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${coeffErr ? "border-red-300" : "border-gray-200"}`}
                  placeholder="0.5"
                  min="0"
                  step="any"
                  aria-label="Coefficient of friction"
                />
                {coeffErr && <p className="text-xs text-red-600 mt-1">{coeffErr}</p>}
                <p className="text-xs text-gray-400 mt-1">Typical range: 0.01 (Teflon) → 0.8+ (rubber on concrete)</p>
              </div>

              {/* Normal Force row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Normal Force (N)
                    <span className="ml-1 text-xs text-gray-400" title="Force perpendicular to the contact surface">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.normalForce}
                    onChange={(e) => setInputs((p) => ({ ...p, normalForce: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${normalErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="100"
                    min="0"
                    step="any"
                    aria-label="Normal force value"
                  />
                  {normalErr && <p className="text-xs text-red-600 mt-1">{normalErr}</p>}
                  <p className="text-xs text-gray-400 mt-1">e.g. 100 kg object on flat surface ≈ 981 N</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Normal Force Unit</label>
                  <select
                    value={inputs.normalForceUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, normalForceUnit: e.target.value as ForceUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_FORCE_UNITS.map((u) => (
                      <option key={u} value={u}>{FORCE_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live formula display */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong>{" "}
                  F = μ × N = {inputs.coefficient} × {formatNum(result.normalForceN, inputs.precision)} N = <strong>{formatNum(result.frictionN, inputs.precision)} N</strong>
                </div>
              )}

              {result && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  A surface with μ = <strong>{inputs.coefficient}</strong> and a normal force of{" "}
                  <strong>{formatNum(result.normalForceN, 2)} N</strong> produces{" "}
                  <strong>{formatNum(result.frictionN, inputs.precision)} N</strong> of{" "}
                  {inputs.calcMode} friction force.
                </div>
              )}

              <p className="text-xs text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {QUICK_PRESETS.map((p) => {
                  const active =
                    inputs.coefficient === p.coefficient &&
                    inputs.normalForce === p.normalForce &&
                    inputs.normalForceUnit === p.normalForceUnit;
                  return (
                    <button
                      key={p.label}
                      onClick={() => handleQuickPreset(p)}
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

            {/* Results Breakdown Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Unit Conversion Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">N</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.frictionN, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Newton (SI standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">kN</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.frictionKN, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilonewton</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">lbf</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.frictionLbf, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Pound-force (US standard)</td>
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
                    F = μ × N
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-sm">
                      Static: Fs ≤ μs × N
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-sm">
                      Kinetic: Fk = μk × N
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">F (Friction Force)</div>
                      <div className="text-blue-700 text-xs">Resistive force in Newtons opposing relative motion</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">μ (Coefficient)</div>
                      <div className="text-orange-700 text-xs">Dimensionless surface roughness ratio (0.01–1.5+)</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">N (Normal Force)</div>
                      <div className="text-green-700 text-xs">Force perpendicular to the contact surface in Newtons</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Static vs Kinetic:</strong> Static friction (μs) is always ≥ kinetic friction (μk) for the same surface pair. Once an object starts moving, the friction force drops to the kinetic value.
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
                            μ={entry.inputs.coefficient} × {entry.inputs.normalForce} {FORCE_SHORT[entry.inputs.normalForceUnit]}
                            <span className="ml-2 text-xs font-normal text-gray-500 capitalize">({entry.inputs.calcMode})</span>
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {formatNum(entry.result.frictionN, 2)} N
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

      <FrictionForceCalculatorSEO />
      <RelatedTools
        currentTool="friction-force-calculator"
        tools={[
          "force-calculator",
          "torque-calculator",
          "stress-calculator",
          "spring-force-calculator",
          "centripetal-force-calculator",
          "momentum-calculator",
        ]}
      />
    </>
  );
}

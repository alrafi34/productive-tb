"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  SpringForceInputs,
  SpringForceResult,
  HistoryEntry,
  SpringConstantUnit,
  DisplacementUnit,
  Precision,
} from "./types";
import {
  calculate,
  validateSpringConstant,
  validateDisplacement,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  savePrefs,
  loadPrefs,
  K_LABELS,
  K_SHORT,
  X_LABELS,
  X_SHORT,
  ALL_K_UNITS,
  ALL_X_UNITS,
} from "./logic";
import SpringForceCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets (US defaults) ──────────────────────────────────────────────────
const PRESETS = [
  { label: "Car Suspension",   k: "25000", kUnit: "N/m"   as SpringConstantUnit, x: "0.05", xUnit: "m"  as DisplacementUnit },
  { label: "Pen Spring",       k: "5",     kUnit: "N/m"   as SpringConstantUnit, x: "10",   xUnit: "mm" as DisplacementUnit },
  { label: "Industrial Press", k: "1200",  kUnit: "N/m"   as SpringConstantUnit, x: "0.03", xUnit: "m"  as DisplacementUnit },
  { label: "Garage Door",      k: "10",    kUnit: "lb/in" as SpringConstantUnit, x: "3",    xUnit: "in" as DisplacementUnit },
];

const DEFAULT_INPUTS: SpringForceInputs = {
  springConstant:     "100",
  springConstantUnit: "N/m",
  displacement:       "0.2",
  displacementUnit:   "m",
  motionType:         "compression",
  precision:          2,
};

export default function SpringForceCalculatorUI() {
  const [inputs,      setInputs]      = useState<SpringForceInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<SpringForceResult | null>(null);
  const [kErr,        setKErr]        = useState<string | null>(null);
  const [xErr,        setXErr]        = useState<string | null>(null);
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu,     setShowEdu]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const kRef = useRef<HTMLInputElement>(null);

  // Load history and saved unit prefs on mount
  useEffect(() => {
    setHistory(getHistory());
    const prefs = loadPrefs();
    if (prefs) {
      setInputs((p) => ({
        ...p,
        springConstantUnit: prefs.kUnit,
        displacementUnit:   prefs.xUnit,
      }));
    }
    kRef.current?.focus();
  }, []);

  // Persist unit preferences when they change
  useEffect(() => {
    savePrefs(inputs.springConstantUnit, inputs.displacementUnit);
  }, [inputs.springConstantUnit, inputs.displacementUnit]);

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const ke = validateSpringConstant(inputs.springConstant);
      const xe = validateDisplacement(inputs.displacement);
      setKErr(ke);
      setXErr(xe);
      if (ke || xe) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      springConstant:     p.k,
      springConstantUnit: p.kUnit,
      displacement:       p.x,
      displacementUnit:   p.xUnit,
    }));
    kRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setKErr(null);
    setXErr(null);
    kRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Spring Force Result: ${formatNum(result.forceN, inputs.precision)} N | k = ${inputs.springConstant} ${K_SHORT[inputs.springConstantUnit]} | x = ${inputs.displacement} ${X_SHORT[inputs.displacementUnit]}`;
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
    downloadFile(exportToText(inputs, result), "spring-force-calculation.txt");
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

  // Displacement slider: max depends on unit
  const sliderMax: Record<DisplacementUnit, number> = { m: 2, cm: 200, mm: 2000, in: 80 };
  const sliderStep: Record<DisplacementUnit, number> = { m: 0.01, cm: 1, mm: 1, in: 0.1 };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌀</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Spring Force Calculator (F = k × x)</h3>
              <p className="text-sm text-blue-800">
                Enter spring constant and displacement to instantly calculate spring force using Hooke&apos;s Law.
                Supports metric and imperial units with real-time results and formula breakdown.
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
                Spring Force Result
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result !== null ? `${formatNum(result.forceN, inputs.precision)} N` : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Newtons (N)</span>
                    <span className="font-semibold">{formatNum(result.forceN, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Kilonewtons (kN)</span>
                    <span className="font-semibold">{formatNum(result.forceKN, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Pound-force (lbf)</span>
                    <span className="font-semibold">{formatNum(result.forceLbf, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Motion Type</span>
                    <span className="font-semibold capitalize">{inputs.motionType}</span>
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

              {/* Spring Constant row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spring Constant (k)
                    <span className="ml-1 text-xs text-gray-400" title="Stiffness of the spring">ⓘ</span>
                  </label>
                  <input
                    ref={kRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.springConstant}
                    onChange={(e) => setInputs((p) => ({ ...p, springConstant: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${kErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="100"
                    min="0"
                    step="any"
                    aria-label="Spring constant value"
                  />
                  {kErr && <p className="text-xs text-red-600 mt-1">{kErr}</p>}
                  <p className="text-xs text-gray-400 mt-1">e.g. Car suspension ≈ 25,000 N/m</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Spring Constant Unit</label>
                  <select
                    value={inputs.springConstantUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, springConstantUnit: e.target.value as SpringConstantUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_K_UNITS.map((u) => (
                      <option key={u} value={u}>{K_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Displacement row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Displacement (x)
                    <span className="ml-1 text-xs text-gray-400" title="Distance the spring is stretched or compressed">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.displacement}
                    onChange={(e) => setInputs((p) => ({ ...p, displacement: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${xErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="0.2"
                    min="0"
                    step="any"
                    aria-label="Displacement value"
                  />
                  {xErr && <p className="text-xs text-red-600 mt-1">{xErr}</p>}
                  <p className="text-xs text-gray-400 mt-1">e.g. 0.2 m, 20 cm, 200 mm</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Displacement Unit</label>
                  <select
                    value={inputs.displacementUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, displacementUnit: e.target.value as DisplacementUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_X_UNITS.map((u) => (
                      <option key={u} value={u}>{X_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Displacement Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Displacement Slider
                  </label>
                  <span className="text-sm font-mono font-semibold text-primary">
                    {inputs.displacement || "0"} {X_SHORT[inputs.displacementUnit]}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={sliderMax[inputs.displacementUnit]}
                  step={sliderStep[inputs.displacementUnit]}
                  value={parseFloat(inputs.displacement) || 0}
                  onChange={(e) => setInputs((p) => ({ ...p, displacement: e.target.value }))}
                  className="w-full accent-primary"
                  aria-label="Displacement slider"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0</span>
                  <span>{sliderMax[inputs.displacementUnit] / 2} {X_SHORT[inputs.displacementUnit]}</span>
                  <span>{sliderMax[inputs.displacementUnit]} {X_SHORT[inputs.displacementUnit]}</span>
                </div>
              </div>

              {/* Motion Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Spring Motion Type</label>
                <div className="flex gap-3">
                  {(["compression", "extension"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setInputs((p) => ({ ...p, motionType: type }))}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                        inputs.motionType === type
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {type === "compression" ? "🔽 Compression" : "🔼 Extension"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live formula display */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong>{" "}
                  F = k × x = {inputs.springConstant} {K_SHORT[inputs.springConstantUnit]} × {inputs.displacement} {X_SHORT[inputs.displacementUnit]} = <strong>{formatNum(result.forceN, inputs.precision)} N</strong>
                </div>
              )}

              {result && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  A spring with constant <strong>{formatNum(result.springConstantNm, 2)} N/m</strong> {inputs.motionType === "compression" ? "compressed" : "stretched"} by <strong>{formatNum(result.displacementM, 4)} m</strong> exerts <strong>{formatNum(result.forceN, inputs.precision)} Newtons</strong> of force.
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
                {PRESETS.map((p) => {
                  const active =
                    inputs.springConstant === p.k &&
                    inputs.springConstantUnit === p.kUnit &&
                    inputs.displacement === p.x &&
                    inputs.displacementUnit === p.xUnit;
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
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.forceN, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Newton (SI standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">kN</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.forceKN, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilonewton</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">lbf</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.forceLbf, inputs.precision)}</td>
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
                    F = k × x
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">F (Force)</div>
                      <div className="text-blue-700 text-xs">Spring force in Newtons (N). The restoring force opposing displacement.</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">k (Spring Constant)</div>
                      <div className="text-orange-700 text-xs">Stiffness in N/m. Higher k = stiffer spring = more force per unit displacement.</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">x (Displacement)</div>
                      <div className="text-green-700 text-xs">Distance stretched or compressed from natural length, in meters (m).</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Hooke&apos;s Law:</strong> The force exerted by a spring is directly proportional to its displacement from the equilibrium position. This relationship holds as long as the spring is not stretched beyond its elastic limit.
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
                            k={entry.inputs.springConstant} {K_SHORT[entry.inputs.springConstantUnit]} × x={entry.inputs.displacement} {X_SHORT[entry.inputs.displacementUnit]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {formatNum(entry.result.forceN, 2)} N
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

      <SpringForceCalculatorSEO />
      <RelatedTools
        currentTool="spring-force-calculator"
        tools={[
          "force-calculator",
          "torque-calculator",
          "kinetic-energy-calculator",
          "stress-calculator",
          "natural-frequency-calculator",
          "elastic-potential-energy-calculator",
        ]}
      />
    </>
  );
}

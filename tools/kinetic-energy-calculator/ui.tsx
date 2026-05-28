"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { KEInputs, KEResult, HistoryEntry, MassUnit, VelocityUnit, Precision } from "./types";
import {
  calculate,
  validateMass,
  validateVelocity,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  MASS_LABELS,
  MASS_SHORT,
  VEL_LABELS,
  VEL_SHORT,
  ALL_MASS_UNITS,
  ALL_VEL_UNITS,
} from "./logic";
import KineticEnergyCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets (US defaults) ──────────────────────────────────────────────────
const PRESETS = [
  { label: "Baseball",    mass: "0.145", massUnit: "kg" as MassUnit, velocity: "40",   velocityUnit: "m/s"  as VelocityUnit },
  { label: "Car (60 mph)", mass: "1500", massUnit: "kg" as MassUnit, velocity: "60",   velocityUnit: "mph"  as VelocityUnit },
  { label: "Bicycle",     mass: "90",   massUnit: "kg" as MassUnit, velocity: "15",   velocityUnit: "mph"  as VelocityUnit },
  { label: "Train",       mass: "50",   massUnit: "t"  as MassUnit, velocity: "60",   velocityUnit: "mph"  as VelocityUnit },
];

const DEFAULT_INPUTS: KEInputs = {
  mass:         "10",
  massUnit:     "kg",
  velocity:     "5",
  velocityUnit: "m/s",
  precision:    2,
};

export default function KineticEnergyCalculatorUI() {
  const [inputs,      setInputs]      = useState<KEInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<KEResult | null>(null);
  const [massErr,     setMassErr]     = useState<string | null>(null);
  const [velErr,      setVelErr]      = useState<string | null>(null);
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu,     setShowEdu]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const massRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    massRef.current?.focus();
  }, []);

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const me = validateMass(inputs.mass);
      const ve = validateVelocity(inputs.velocity);
      setMassErr(me);
      setVelErr(ve);
      if (me || ve) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      mass:         p.mass,
      massUnit:     p.massUnit,
      velocity:     p.velocity,
      velocityUnit: p.velocityUnit,
    }));
    massRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setMassErr(null);
    setVelErr(null);
    massRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Kinetic Energy: ${formatNum(result.keJ, inputs.precision)} Joules\nMass: ${inputs.mass} ${MASS_SHORT[inputs.massUnit]}\nVelocity: ${inputs.velocity} ${VEL_SHORT[inputs.velocityUnit]}`;
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
    downloadFile(exportToText(inputs, result), "kinetic-energy-calculation.txt");
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

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚀</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Kinetic Energy Calculator (KE = ½mv²)</h3>
              <p className="text-sm text-blue-800">
                Enter mass and velocity to instantly calculate the kinetic energy of a moving object. Supports metric and imperial units with real-time results and formula breakdown.
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
                Kinetic Energy
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result !== null ? `${formatNum(result.keJ, inputs.precision)} J` : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Joules (J)</span>
                    <span className="font-semibold">{formatNum(result.keJ, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Kilojoules (kJ)</span>
                    <span className="font-semibold">{formatNum(result.keKJ, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Megajoules (MJ)</span>
                    <span className="font-semibold">{formatNum(result.keMJ, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Calories (cal)</span>
                    <span className="font-semibold">{formatNum(result.keCalorie, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Kilowatt-hours (kWh)</span>
                    <span className="font-semibold">{formatNum(result.keKWh, inputs.precision)}</span>
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
                  <option value={0}>0 decimal places</option>
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
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

              {/* Mass row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mass
                    <span className="ml-1 text-xs text-gray-400" title="Human body ≈ 70 kg">ⓘ</span>
                  </label>
                  <input
                    ref={massRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.mass}
                    onChange={(e) => setInputs((p) => ({ ...p, mass: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${massErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="10"
                    step="any"
                    aria-label="Mass value"
                  />
                  {massErr && <p className="text-xs text-red-600 mt-1">{massErr}</p>}
                  <p className="text-xs text-gray-400 mt-1">e.g. Human body ≈ 70 kg</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mass Unit</label>
                  <select
                    value={inputs.massUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, massUnit: e.target.value as MassUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_MASS_UNITS.map((u) => (
                      <option key={u} value={u}>{MASS_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Velocity row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Velocity
                    <span className="ml-1 text-xs text-gray-400" title="Highway speed ≈ 60 mph">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.velocity}
                    onChange={(e) => setInputs((p) => ({ ...p, velocity: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${velErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="5"
                    step="any"
                    aria-label="Velocity value"
                  />
                  {velErr && <p className="text-xs text-red-600 mt-1">{velErr}</p>}
                  <p className="text-xs text-gray-400 mt-1">e.g. Highway speed ≈ 60 mph</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Velocity Unit</label>
                  <select
                    value={inputs.velocityUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, velocityUnit: e.target.value as VelocityUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_VEL_UNITS.map((u) => (
                      <option key={u} value={u}>{VEL_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live formula display */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong>{" "}
                  KE = ½ × {inputs.mass} {MASS_SHORT[inputs.massUnit]} × ({inputs.velocity} {VEL_SHORT[inputs.velocityUnit]})² = <strong>{formatNum(result.keJ, inputs.precision)} J</strong>
                </div>
              )}

              {result && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  An object with a mass of <strong>{formatNum(result.massKg, 2)} kg</strong> moving at <strong>{formatNum(result.velMs, 2)} m/s</strong> has a kinetic energy of <strong>{formatNum(result.keJ, inputs.precision)} Joules</strong>.
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
                    inputs.mass === p.mass &&
                    inputs.massUnit === p.massUnit &&
                    inputs.velocity === p.velocity &&
                    inputs.velocityUnit === p.velocityUnit;
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
                        <td className="py-2 px-3 font-medium text-primary">J</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.keJ, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Joule (SI standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">kJ</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.keKJ, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilojoule</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">MJ</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.keMJ, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Megajoule</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">cal</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.keCalorie, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Calorie (thermochemical)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">kWh</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.keKWh, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilowatt-hour</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step-by-step breakdown */}
            {showEdu && result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Step-by-Step Breakdown</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    KE = ½ × m × v²
                  </div>
                  <div className="space-y-2">
                    {[
                      `Step 1: KE = ½ × m × v²`,
                      `Step 2: KE = ½ × ${formatNum(result.massKg, 4)} × (${formatNum(result.velMs, 4)})²`,
                      `Step 3: KE = ½ × ${formatNum(result.massKg, 4)} × ${formatNum(result.velMs * result.velMs, 4)}`,
                      `Step 4: KE = ${formatNum(result.keJ, inputs.precision)} J`,
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-semibold">
                          {i + 1}
                        </span>
                        <span className="font-mono text-xs">{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">KE (Energy)</div>
                      <div className="text-blue-700 text-xs">Measured in Joules (J). Energy of motion.</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">m (Mass)</div>
                      <div className="text-orange-700 text-xs">Measured in kilograms (kg). Amount of matter.</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">v (Velocity)</div>
                      <div className="text-green-700 text-xs">Measured in m/s. Speed of the object.</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Why v²?</strong> Kinetic energy grows with the square of velocity. Doubling speed quadruples kinetic energy — this is why high-speed collisions are so much more destructive.
                  </div>
                </div>
              </div>
            )}

            {/* Formula panel when no result yet */}
            {showEdu && !result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formula & Explanation</h3>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                  KE = ½ × m × v²
                </div>
                <p className="text-sm text-gray-600">Enter valid mass and velocity values to see the step-by-step breakdown.</p>
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
                            {entry.inputs.mass} {MASS_SHORT[entry.inputs.massUnit]} @ {entry.inputs.velocity} {VEL_SHORT[entry.inputs.velocityUnit]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {formatNum(entry.result.keJ, 2)} J
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

      <KineticEnergyCalculatorSEO />
      <RelatedTools
        currentTool="kinetic-energy-calculator"
        tools={[
          "force-calculator",
          "momentum-calculator",
          "potential-energy-calculator",
          "velocity-calculator",
          "torque-calculator",
          "projectile-motion-calculator",
        ]}
      />
    </>
  );
}

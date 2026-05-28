"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ForceInputs, ForceResult, HistoryEntry, MassUnit, AccelUnit, Precision } from "./types";
import {
  calculate,
  validateMass,
  validateAccel,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  MASS_LABELS,
  MASS_SHORT,
  ACCEL_LABELS,
  ACCEL_SHORT,
  ALL_MASS_UNITS,
  ALL_ACCEL_UNITS,
} from "./logic";
import ForceCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets (US defaults) ──────────────────────────────────────────────────
const PRESETS = [
  { label: "Physics Example",  mass: "10",   massUnit: "kg" as MassUnit, accel: "5",    accelUnit: "m/s2"  as AccelUnit },
  { label: "Car Motion",       mass: "1200", massUnit: "kg" as MassUnit, accel: "3",    accelUnit: "m/s2"  as AccelUnit },
  { label: "Rocket Launch",    mass: "500",  massUnit: "kg" as MassUnit, accel: "30",   accelUnit: "m/s2"  as AccelUnit },
  { label: "Object Falling",   mass: "0.5",  massUnit: "kg" as MassUnit, accel: "9.8",  accelUnit: "m/s2"  as AccelUnit },
];

const DEFAULT_INPUTS: ForceInputs = {
  mass:      "10",
  massUnit:  "kg",
  accel:     "9.8",
  accelUnit: "m/s2",
  precision: 2,
};

export default function ForceCalculatorUI() {
  const [inputs,      setInputs]      = useState<ForceInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<ForceResult | null>(null);
  const [massErr,     setMassErr]     = useState<string | null>(null);
  const [accelErr,    setAccelErr]    = useState<string | null>(null);
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
      const ae = validateAccel(inputs.accel);
      setMassErr(me);
      setAccelErr(ae);
      if (me || ae) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      mass:      p.mass,
      massUnit:  p.massUnit,
      accel:     p.accel,
      accelUnit: p.accelUnit,
    }));
    massRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setMassErr(null);
    setAccelErr(null);
    massRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Force Calculation\nFormula: F = m × a\nMass = ${inputs.mass} ${MASS_SHORT[inputs.massUnit]}\nAcceleration = ${inputs.accel} ${ACCEL_SHORT[inputs.accelUnit]}\nResult = ${formatNum(result.forceN, inputs.precision)} N`;
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
    downloadFile(exportToText(inputs, result), "force-calculation.txt");
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
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Force Calculator (F = ma)</h3>
              <p className="text-sm text-blue-800">
                Enter mass and acceleration to instantly calculate force using Newton&apos;s Second Law. Supports metric and imperial units with real-time results and formula breakdown.
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
                Force Result
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

              {/* Acceleration row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Acceleration
                    <span className="ml-1 text-xs text-gray-400" title="Earth gravity ≈ 9.8 m/s²">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.accel}
                    onChange={(e) => setInputs((p) => ({ ...p, accel: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${accelErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="9.8"
                    step="any"
                    aria-label="Acceleration value"
                  />
                  {accelErr && <p className="text-xs text-red-600 mt-1">{accelErr}</p>}
                  <p className="text-xs text-gray-400 mt-1">e.g. Earth gravity ≈ 9.8 m/s²</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Acceleration Unit</label>
                  <select
                    value={inputs.accelUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, accelUnit: e.target.value as AccelUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_ACCEL_UNITS.map((u) => (
                      <option key={u} value={u}>{ACCEL_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live formula display */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong>{" "}
                  F = m × a = {inputs.mass} {MASS_SHORT[inputs.massUnit]} × {inputs.accel} {ACCEL_SHORT[inputs.accelUnit]} = <strong>{formatNum(result.forceN, inputs.precision)} N</strong>
                </div>
              )}

              {result && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  An object with a mass of <strong>{formatNum(result.massKg, 2)} kg</strong> accelerating at <strong>{formatNum(result.accelMs2, 2)} m/s²</strong> produces <strong>{formatNum(result.forceN, inputs.precision)} Newtons</strong> of force.
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
                    inputs.accel === p.accel &&
                    inputs.accelUnit === p.accelUnit;
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
                    F = m × a
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">F (Force)</div>
                      <div className="text-blue-700 text-xs">Measured in Newtons (N). The net force acting on the object.</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">m (Mass)</div>
                      <div className="text-orange-700 text-xs">Measured in kilograms (kg). The amount of matter in the object.</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">a (Acceleration)</div>
                      <div className="text-green-700 text-xs">Measured in m/s². Rate of change of velocity. Can be negative (deceleration).</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Newton&apos;s Second Law:</strong> The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.
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
                            {entry.inputs.mass} {MASS_SHORT[entry.inputs.massUnit]} × {entry.inputs.accel} {ACCEL_SHORT[entry.inputs.accelUnit]}
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

      <ForceCalculatorSEO />
      <RelatedTools
        currentTool="force-calculator"
        tools={[
          "torque-calculator",
          "kinetic-energy-calculator",
          "centripetal-force-calculator",
          "momentum-calculator",
          "spring-force-calculator",
          "acceleration-calculator",
        ]}
      />
    </>
  );
}

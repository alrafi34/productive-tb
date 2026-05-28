"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { TorqueInputs, TorqueResult, HistoryEntry, ForceUnit, DistanceUnit, Precision } from "./types";
import {
  calculate,
  validateForce,
  validateDistance,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  FORCE_LABELS,
  FORCE_SHORT,
  DISTANCE_LABELS,
  DISTANCE_SHORT,
  ALL_FORCE_UNITS,
  ALL_DISTANCE_UNITS,
} from "./logic";
import TorqueCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets (US defaults) ──────────────────────────────────────────────────
const PRESETS = [
  { label: "Bolt Tightening",  force: "50",  forceUnit: "N"   as ForceUnit, distance: "0.3", distanceUnit: "m"  as DistanceUnit, angle: 90, useAngle: false },
  { label: "Automotive Wrench", force: "100", forceUnit: "lbf" as ForceUnit, distance: "1",   distanceUnit: "ft" as DistanceUnit, angle: 90, useAngle: false },
  { label: "Robotic Arm",      force: "20",  forceUnit: "N"   as ForceUnit, distance: "0.5", distanceUnit: "m"  as DistanceUnit, angle: 90, useAngle: false },
  { label: "Angled Force",     force: "80",  forceUnit: "N"   as ForceUnit, distance: "2",   distanceUnit: "m"  as DistanceUnit, angle: 45, useAngle: true  },
];

const DEFAULT_INPUTS: TorqueInputs = {
  force:        "100",
  forceUnit:    "N",
  distance:     "1",
  distanceUnit: "m",
  angle:        90,
  useAngle:     false,
  precision:    2,
};

export default function TorqueCalculatorUI() {
  const [inputs,      setInputs]      = useState<TorqueInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<TorqueResult | null>(null);
  const [forceErr,    setForceErr]    = useState<string | null>(null);
  const [distErr,     setDistErr]     = useState<string | null>(null);
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu,     setShowEdu]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const forceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    forceRef.current?.focus();
  }, []);

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const fe = validateForce(inputs.force);
      const de = validateDistance(inputs.distance);
      setForceErr(fe);
      setDistErr(de);
      if (fe || de) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      force:        p.force,
      forceUnit:    p.forceUnit,
      distance:     p.distance,
      distanceUnit: p.distanceUnit,
      angle:        p.angle,
      useAngle:     p.useAngle,
    }));
    forceRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setForceErr(null);
    setDistErr(null);
    forceRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Torque Result: ${formatNum(result.torqueNm, inputs.precision)} Nm | Force: ${inputs.force} ${FORCE_SHORT[inputs.forceUnit]} | Distance: ${inputs.distance} ${DISTANCE_SHORT[inputs.distanceUnit]}${inputs.useAngle ? ` | Angle: ${inputs.angle}°` : ""}`;
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
    downloadFile(exportToText(inputs, result), "torque-calculation.txt");
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

  // ── Derived display unit label ────────────────────────────────────────────
  const primaryUnit = inputs.forceUnit === "lbf" ? "lb-ft" : "Nm";
  const primaryValue = result
    ? (inputs.forceUnit === "lbf" ? result.torqueLbFt : result.torqueNm)
    : null;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔧</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Torque Calculator</h3>
              <p className="text-sm text-blue-800">
                Enter force and lever arm distance to instantly calculate torque. Supports metric and imperial units with optional angle correction for non-perpendicular forces.
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
                Torque Result
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {primaryValue !== null ? `${formatNum(primaryValue, inputs.precision)} ${primaryUnit}` : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  {inputs.forceUnit !== "lbf" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Nm</span>
                        <span className="font-semibold">{formatNum(result.torqueNm, inputs.precision)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">kNm</span>
                        <span className="font-semibold">{formatNum(result.torqueKNm, inputs.precision)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">lb-ft</span>
                    <span className="font-semibold">{formatNum(result.torqueLbFt, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">lb-in</span>
                    <span className="font-semibold">{formatNum(result.torqueLbIn, inputs.precision)}</span>
                  </div>
                  {inputs.useAngle && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Angle</span>
                      <span className="font-semibold">{inputs.angle}°</span>
                    </div>
                  )}
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

              {/* Force row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Force
                    <span className="ml-1 text-xs text-gray-400" title="The applied force magnitude">ⓘ</span>
                  </label>
                  <input
                    ref={forceRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.force}
                    onChange={(e) => setInputs((p) => ({ ...p, force: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${forceErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="100"
                    min="0"
                    step="any"
                    aria-label="Force value"
                  />
                  {forceErr && <p className="text-xs text-red-600 mt-1">{forceErr}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Force Unit</label>
                  <select
                    value={inputs.forceUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, forceUnit: e.target.value as ForceUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_FORCE_UNITS.map((u) => (
                      <option key={u} value={u}>{FORCE_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Distance row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance / Lever Arm
                    <span className="ml-1 text-xs text-gray-400" title="Distance from pivot point to force application">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.distance}
                    onChange={(e) => setInputs((p) => ({ ...p, distance: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${distErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="1"
                    min="0"
                    step="any"
                    aria-label="Distance value"
                  />
                  {distErr && <p className="text-xs text-red-600 mt-1">{distErr}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distance Unit</label>
                  <select
                    value={inputs.distanceUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, distanceUnit: e.target.value as DistanceUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_DISTANCE_UNITS.map((u) => (
                      <option key={u} value={u}>{DISTANCE_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Angle toggle */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Angle Correction</span>
                    <p className="text-xs text-gray-500 mt-0.5">Enable if force is not perpendicular to lever arm</p>
                  </div>
                  <button
                    role="switch"
                    aria-checked={inputs.useAngle}
                    onClick={() => setInputs((p) => ({ ...p, useAngle: !p.useAngle }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${inputs.useAngle ? "bg-primary" : "bg-gray-300"}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${inputs.useAngle ? "translate-x-6" : "translate-x-1"}`}
                    />
                  </button>
                </div>

                {inputs.useAngle && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Angle θ between force and lever arm
                      </label>
                      <span className="text-sm font-mono font-semibold text-primary">{inputs.angle}°</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={180}
                      step={1}
                      value={inputs.angle}
                      onChange={(e) => setInputs((p) => ({ ...p, angle: parseInt(e.target.value) }))}
                      className="w-full accent-primary"
                      aria-label="Angle in degrees"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>0°</span>
                      <span>90°</span>
                      <span>180°</span>
                    </div>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={inputs.angle}
                      onChange={(e) => {
                        const v = Math.min(180, Math.max(0, parseInt(e.target.value) || 0));
                        setInputs((p) => ({ ...p, angle: v }));
                      }}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                      min={0}
                      max={180}
                      aria-label="Angle numeric input"
                    />
                  </div>
                )}
              </div>

              {/* Live formula display */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong>{" "}
                  {inputs.useAngle
                    ? <>τ = F × r × sin(θ) = {inputs.force} {FORCE_SHORT[inputs.forceUnit]} × {inputs.distance} {DISTANCE_SHORT[inputs.distanceUnit]} × sin({inputs.angle}°) = <strong>{formatNum(result.torqueNm, inputs.precision)} Nm</strong></>
                    : <>τ = F × r = {inputs.force} {FORCE_SHORT[inputs.forceUnit]} × {inputs.distance} {DISTANCE_SHORT[inputs.distanceUnit]} = <strong>{formatNum(result.torqueNm, inputs.precision)} Nm</strong></>
                  }
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
                    inputs.force === p.force &&
                    inputs.forceUnit === p.forceUnit &&
                    inputs.distance === p.distance &&
                    inputs.distanceUnit === p.distanceUnit;
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
                        <td className="py-2 px-3 font-medium text-primary">Nm</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.torqueNm, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Newton-meter (SI standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">kNm</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.torqueKNm, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilonewton-meter</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">lb-ft</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.torqueLbFt, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Pound-foot (US standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">lb-in</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.torqueLbIn, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Pound-inch</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">oz-in</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.torqueOzIn, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Ounce-inch (small motors)</td>
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
                    τ = F × r
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    τ = F × r × sin(θ)  <span className="text-gray-400 text-sm">(with angle)</span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">τ (Torque)</div>
                      <div className="text-blue-700 text-xs">Rotational force in Newton-meters (Nm) or lb-ft</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">F (Force)</div>
                      <div className="text-orange-700 text-xs">Applied force in Newtons (N) or pound-force (lbf)</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">r (Distance)</div>
                      <div className="text-green-700 text-xs">Lever arm length from pivot to force point</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Why sin(θ)?</strong> Only the perpendicular component of force creates torque. At 90°, sin(90°) = 1 (maximum torque). At 0° or 180°, sin = 0 (no torque).
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
                            {entry.inputs.force} {FORCE_SHORT[entry.inputs.forceUnit]} × {entry.inputs.distance} {DISTANCE_SHORT[entry.inputs.distanceUnit]}
                            {entry.inputs.useAngle ? ` @ ${entry.inputs.angle}°` : ""}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {formatNum(entry.result.torqueNm, 2)} Nm
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

      <TorqueCalculatorSEO />
      <RelatedTools
        currentTool="torque-calculator"
        tools={[
          "gear-ratio-calculator",
          "force-calculator",
          "angular-velocity-calculator",
          "spring-force-calculator",
          "centripetal-force-calculator",
          "kinetic-energy-calculator",
        ]}
      />
    </>
  );
}

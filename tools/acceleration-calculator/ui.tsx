"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  AccelerationInputs,
  AccelerationResult,
  HistoryEntry,
  VelocityUnit,
  TimeUnit,
  CalcMode,
  Precision,
} from "./types";
import {
  calculate,
  validateVelocity,
  validateTime,
  validateAcceleration,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  getAccelUnit,
  VELOCITY_LABELS,
  TIME_LABELS,
  ALL_VELOCITY_UNITS,
  ALL_TIME_UNITS,
} from "./logic";
import AccelerationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ────────────────────────────────────────────────────────────────
const PRESETS = [
  { label: "Car Acceleration",  mode: "acceleration" as CalcMode, initialVelocity: "0",   finalVelocity: "60",  time: "6",  acceleration: "", velocityUnit: "mph" as VelocityUnit, timeUnit: "s" as TimeUnit },
  { label: "Braking (60→0)",    mode: "acceleration" as CalcMode, initialVelocity: "60",  finalVelocity: "0",   time: "4",  acceleration: "", velocityUnit: "mph" as VelocityUnit, timeUnit: "s" as TimeUnit },
  { label: "Sprint (0→10 m/s)", mode: "acceleration" as CalcMode, initialVelocity: "0",   finalVelocity: "10",  time: "2",  acceleration: "", velocityUnit: "m/s" as VelocityUnit, timeUnit: "s" as TimeUnit },
  { label: "Free Fall (5s)",    mode: "finalVelocity" as CalcMode, initialVelocity: "0",  finalVelocity: "",    time: "5",  acceleration: "9.8", velocityUnit: "m/s" as VelocityUnit, timeUnit: "s" as TimeUnit },
];

const DEFAULT_INPUTS: AccelerationInputs = {
  mode: "acceleration",
  initialVelocity: "0",
  finalVelocity: "60",
  time: "6",
  acceleration: "",
  velocityUnit: "mph",
  timeUnit: "s",
  precision: 2,
};

const MODE_LABELS: Record<CalcMode, string> = {
  acceleration:    "Calculate Acceleration",
  finalVelocity:   "Calculate Final Velocity",
  initialVelocity: "Calculate Initial Velocity",
  time:            "Calculate Time",
};

const MODE_FORMULA: Record<CalcMode, string> = {
  acceleration:    "a = (v₂ − v₁) / t",
  finalVelocity:   "v₂ = v₁ + a × t",
  initialVelocity: "v₁ = v₂ − a × t",
  time:            "t = (v₂ − v₁) / a",
};

export default function AccelerationCalculatorUI() {
  const [inputs,      setInputs]      = useState<AccelerationInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<AccelerationResult | null>(null);
  const [v1Err,       setV1Err]       = useState<string | null>(null);
  const [v2Err,       setV2Err]       = useState<string | null>(null);
  const [tErr,        setTErr]        = useState<string | null>(null);
  const [aErr,        setAErr]        = useState<string | null>(null);
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSteps,   setShowSteps]   = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstRef.current?.focus();
  }, []);

  const needsV1 = inputs.mode !== "initialVelocity";
  const needsV2 = inputs.mode !== "finalVelocity";
  const needsT  = inputs.mode !== "time";
  const needsA  = inputs.mode === "finalVelocity" || inputs.mode === "initialVelocity" || inputs.mode === "time";

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const e1 = needsV1 ? validateVelocity(inputs.initialVelocity, "initial velocity") : null;
      const e2 = needsV2 ? validateVelocity(inputs.finalVelocity, "final velocity") : null;
      const et = needsT  ? validateTime(inputs.time) : null;
      const ea = needsA  ? validateAcceleration(inputs.acceleration) : null;
      setV1Err(e1); setV2Err(e2); setTErr(et); setAErr(ea);
      if (e1 || e2 || et || ea) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      mode:            p.mode,
      initialVelocity: p.initialVelocity,
      finalVelocity:   p.finalVelocity,
      time:            p.time,
      acceleration:    p.acceleration,
      velocityUnit:    p.velocityUnit,
      timeUnit:        p.timeUnit,
    }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setV1Err(null); setV2Err(null); setTErr(null); setAErr(null);
    firstRef.current?.focus();
  };

  const handleSwap = () => {
    setInputs((p) => ({ ...p, initialVelocity: p.finalVelocity, finalVelocity: p.initialVelocity }));
  };

  const handleCopy = () => {
    if (!result) return;
    const accelUnit = getAccelUnit(inputs.velocityUnit, inputs.timeUnit);
    const label = inputs.mode === "acceleration"
      ? `Acceleration: ${formatNum(result.value, inputs.precision)} ${accelUnit}`
      : inputs.mode === "finalVelocity"
      ? `Final Velocity: ${formatNum(result.value, inputs.precision)} ${inputs.velocityUnit}`
      : inputs.mode === "initialVelocity"
      ? `Initial Velocity: ${formatNum(result.value, inputs.precision)} ${inputs.velocityUnit}`
      : `Time: ${formatNum(result.value, inputs.precision)} ${inputs.timeUnit}`;
    navigator.clipboard.writeText(label);
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
    downloadFile(exportToText(inputs, result), "acceleration-calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const accelUnit = getAccelUnit(inputs.velocityUnit, inputs.timeUnit);

  const resultLabel = inputs.mode === "acceleration"
    ? `${result ? (result.isDeceleration ? "Deceleration" : "Acceleration") : "Acceleration"}`
    : inputs.mode === "finalVelocity" ? "Final Velocity"
    : inputs.mode === "initialVelocity" ? "Initial Velocity"
    : "Time";

  const resultUnit = inputs.mode === "acceleration" ? accelUnit
    : inputs.mode === "time" ? inputs.timeUnit
    : inputs.velocityUnit;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Acceleration Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate acceleration, velocity, or time using kinematics formulas. Supports m/s, km/h, mph, and ft/s with real-time step-by-step results.
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
                {resultLabel}
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? `${formatNum(result.value, inputs.precision)} ${resultUnit}` : "—"}
              </div>

              {result && inputs.mode === "acceleration" && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Δv (change)</span>
                    <span className="font-semibold">
                      {formatNum(Math.abs(result.deltaV), inputs.precision)} m/s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Type</span>
                    <span className="font-semibold">
                      {result.isDeceleration ? "Deceleration" : "Acceleration"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">SI value</span>
                    <span className="font-semibold">
                      {formatNum(result.accelerationMs2, inputs.precision)} m/s²
                    </span>
                  </div>
                </div>
              )}

              {result && inputs.mode !== "acceleration" && (
                <div className="pt-4 border-t border-white/20 text-sm mb-4 mt-3">
                  <div className="text-primary-100 text-xs">{MODE_FORMULA[inputs.mode]}</div>
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
                  <option value={1}>1 decimal place</option>
                  <option value={2}>2 decimal places</option>
                  <option value={3}>3 decimal places</option>
                </select>
              </div>

              <button onClick={handleSwap} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ⇅ Swap Velocities
              </button>
              <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ↺ Reset
              </button>
              <button onClick={() => setShowSteps(!showSteps)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                🔢 {showSteps ? "Hide" : "Show"} Steps
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

            {/* Main Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Enter Values</h3>

              {/* Calculation Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
                <select
                  value={inputs.mode}
                  onChange={(e) => setInputs((p) => ({ ...p, mode: e.target.value as CalcMode }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  {(Object.keys(MODE_LABELS) as CalcMode[]).map((m) => (
                    <option key={m} value={m}>{MODE_LABELS[m]}</option>
                  ))}
                </select>
              </div>

              {/* Active formula hint */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-mono text-center">
                {MODE_FORMULA[inputs.mode]}
              </div>

              {/* Units row */}
              <div className="grid sm:grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Unit</label>
                  <select
                    value={inputs.timeUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, timeUnit: e.target.value as TimeUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_TIME_UNITS.map((u) => (
                      <option key={u} value={u}>{TIME_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Velocity inputs */}
              <div className="grid sm:grid-cols-2 gap-4">
                {needsV1 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Velocity (v₁)
                      <span className="ml-1 text-xs text-gray-400" title="Starting velocity of the object">ⓘ</span>
                    </label>
                    <input
                      ref={firstRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.initialVelocity}
                      onChange={(e) => setInputs((p) => ({ ...p, initialVelocity: e.target.value }))}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${v1Err ? "border-red-300" : "border-gray-200"}`}
                      placeholder="0"
                      step="any"
                      aria-label="Initial velocity"
                    />
                    {v1Err && <p className="text-xs text-red-600 mt-1">{v1Err}</p>}
                  </div>
                )}
                {needsV2 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Final Velocity (v₂)
                      <span className="ml-1 text-xs text-gray-400" title="Ending velocity of the object">ⓘ</span>
                    </label>
                    <input
                      ref={!needsV1 ? firstRef : undefined}
                      type="number"
                      inputMode="decimal"
                      value={inputs.finalVelocity}
                      onChange={(e) => setInputs((p) => ({ ...p, finalVelocity: e.target.value }))}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${v2Err ? "border-red-300" : "border-gray-200"}`}
                      placeholder="60"
                      step="any"
                      aria-label="Final velocity"
                    />
                    {v2Err && <p className="text-xs text-red-600 mt-1">{v2Err}</p>}
                  </div>
                )}
              </div>

              {/* Time and Acceleration inputs */}
              <div className="grid sm:grid-cols-2 gap-4">
                {needsT && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time (t)
                      <span className="ml-1 text-xs text-gray-400" title="Duration of the motion">ⓘ</span>
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.time}
                      onChange={(e) => setInputs((p) => ({ ...p, time: e.target.value }))}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${tErr ? "border-red-300" : "border-gray-200"}`}
                      placeholder="6"
                      step="any"
                      aria-label="Time"
                    />
                    {tErr && <p className="text-xs text-red-600 mt-1">{tErr}</p>}
                  </div>
                )}
                {needsA && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Acceleration (a)
                      <span className="ml-1 text-xs text-gray-400" title={`Acceleration in ${accelUnit}`}>ⓘ</span>
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.acceleration}
                      onChange={(e) => setInputs((p) => ({ ...p, acceleration: e.target.value }))}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${aErr ? "border-red-300" : "border-gray-200"}`}
                      placeholder={`e.g. 9.8`}
                      step="any"
                      aria-label="Acceleration"
                    />
                    {aErr && <p className="text-xs text-red-600 mt-1">{aErr}</p>}
                    <p className="text-xs text-gray-400 mt-1">Unit: {accelUnit}</p>
                  </div>
                )}
              </div>

              {/* Live formula display */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Result:</strong>{" "}
                  {resultLabel} = <strong>{formatNum(result.value, inputs.precision)} {resultUnit}</strong>
                  {result.isDeceleration && inputs.mode === "acceleration" && (
                    <span className="ml-2 text-orange-700 font-medium">(Deceleration)</span>
                  )}
                </div>
              )}

              <p className="text-xs text-gray-500">
                Tip: Negative acceleration = deceleration. Use <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Tab</kbd> to move between fields.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active =
                    inputs.mode === p.mode &&
                    inputs.initialVelocity === p.initialVelocity &&
                    inputs.finalVelocity === p.finalVelocity &&
                    inputs.time === p.time &&
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

            {/* Step-by-Step Breakdown */}
            {showSteps && result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Step-by-Step Calculation</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-0.5">
                  {result.steps.map((step, i) => (
                    <div key={i} className={step === "" ? "h-2" : "text-gray-700"}>{step}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formulas & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {(Object.keys(MODE_FORMULA) as CalcMode[]).map((m) => (
                      <div key={m} className={`p-3 rounded-lg border ${inputs.mode === m ? "bg-primary/5 border-primary/30" : "bg-gray-50 border-gray-200"}`}>
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">{MODE_LABELS[m]}</div>
                        <div className="font-mono text-base text-gray-800">{MODE_FORMULA[m]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">a (Acceleration)</div>
                      <div className="text-blue-700 text-xs">Rate of velocity change — m/s², km/h/s</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">v₁ / v₂ (Velocity)</div>
                      <div className="text-orange-700 text-xs">Initial and final speed — m/s, mph</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">t (Time)</div>
                      <div className="text-green-700 text-xs">Duration of motion — s, min, h</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Key insight:</strong> Negative acceleration means deceleration — the object is slowing down. Gravity on Earth is approximately 9.8 m/s² downward.
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
                            {MODE_LABELS[entry.inputs.mode]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {formatNum(entry.result.value, 2)} {entry.result.unit}
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

      <AccelerationCalculatorSEO />
      <RelatedTools
        currentTool="acceleration-calculator"
        tools={[
          "velocity-calculator",
          "force-calculator",
          "kinetic-energy-calculator",
          "torque-calculator",
          "centripetal-force-calculator",
          "projectile-motion-calculator",
        ]}
      />
    </>
  );
}

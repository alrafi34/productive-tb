"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  AngularVelocityInputs,
  AngularVelocityResult,
  HistoryEntry,
  CalcMode,
  AngleUnit,
  TimeUnit,
  LinearVelocityUnit,
  RadiusUnit,
  FrequencyUnit,
  PeriodUnit,
  ResultUnit,
  Precision,
} from "./types";
import {
  calculate,
  validateInputs,
  formatNum,
  getPrimaryValue,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  ANGLE_LABELS,
  TIME_LABELS,
  VELOCITY_LABELS,
  RADIUS_LABELS,
  FREQUENCY_LABELS,
  PERIOD_LABELS,
  RESULT_UNIT_LABELS,
  MODE_LABELS,
  ALL_ANGLE_UNITS,
  ALL_TIME_UNITS,
  ALL_VELOCITY_UNITS,
  ALL_RADIUS_UNITS,
  ALL_FREQUENCY_UNITS,
  ALL_PERIOD_UNITS,
  ALL_RESULT_UNITS,
} from "./logic";
import AngularVelocitySEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets (US defaults) ───────────────────────────────────────────────────
const PRESETS: Array<{ label: string; inputs: Partial<AngularVelocityInputs> }> = [
  {
    label: "Car Engine (1200 RPM)",
    inputs: { mode: "rpm", rpm: "1200" },
  },
  {
    label: "Electric Motor (3600 RPM)",
    inputs: { mode: "rpm", rpm: "3600" },
  },
  {
    label: "AC Power (60 Hz)",
    inputs: { mode: "frequency", frequency: "60", frequencyUnit: "Hz" },
  },
  {
    label: "Full Rotation (2 sec)",
    inputs: { mode: "displacement", theta: "360", thetaUnit: "deg", time: "2", timeUnit: "s" },
  },
  {
    label: "Wheel (v=20 m/s, r=0.3 m)",
    inputs: { mode: "linear", velocity: "20", velocityUnit: "ms", radius: "0.3", radiusUnit: "m" },
  },
];

const DEFAULT_INPUTS: AngularVelocityInputs = {
  mode: "rpm",
  // displacement
  theta: "360",
  thetaUnit: "deg",
  time: "2",
  timeUnit: "s",
  // linear
  velocity: "20",
  velocityUnit: "ms",
  radius: "0.3",
  radiusUnit: "m",
  // rpm
  rpm: "1200",
  // frequency
  frequency: "60",
  frequencyUnit: "Hz",
  // period
  period: "0.5",
  periodUnit: "s",
  // output
  resultUnit: "rad/s",
  precision: 2,
};

export default function AngularVelocityCalculatorUI() {
  const [inputs,      setInputs]      = useState<AngularVelocityInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<AngularVelocityResult | null>(null);
  const [errors,      setErrors]      = useState<Record<string, string | null>>({});
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSteps,   setShowSteps]   = useState(false);
  const [showEdu,     setShowEdu]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstInputRef.current?.focus();
  }, []);

  // ── Debounced calculation ─────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const errs = validateInputs(inputs);
      setErrors(errs);
      if (Object.values(errs).some(Boolean)) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const set = (partial: Partial<AngularVelocityInputs>) =>
    setInputs((p) => ({ ...p, ...partial }));

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, ...p.inputs }));
    firstInputRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    firstInputRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const primary = getPrimaryValue(result, inputs.resultUnit);
    const text = [
      `Angular Velocity: ${formatNum(primary, inputs.precision)} ${inputs.resultUnit}`,
      `rad/s: ${formatNum(result.radPerS, inputs.precision)}`,
      `deg/s: ${formatNum(result.degPerS, inputs.precision)}`,
      `rev/s: ${formatNum(result.revPerS, inputs.precision)}`,
      `RPM:   ${formatNum(result.rpm, inputs.precision)}`,
    ].join(" | ");
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
    downloadFile(exportToText(inputs, result), "angular-velocity-calculation.txt");
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

  const primaryValue = result ? getPrimaryValue(result, inputs.resultUnit) : null;

  // ── Shared input class ────────────────────────────────────────────────────
  const inputCls = (err?: string | null) =>
    `w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${err ? "border-red-300" : "border-gray-200"}`;
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔄</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Angular Velocity Calculator</h3>
              <p className="text-sm text-blue-800">
                Choose a formula mode and enter values to instantly calculate angular velocity in rad/s, deg/s, rev/s, and RPM. Supports displacement, linear velocity, RPM, frequency, and period inputs.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ──────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider">
                Angular Velocity
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {primaryValue !== null ? `${formatNum(primaryValue, inputs.precision)} ${inputs.resultUnit}` : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  {inputs.resultUnit !== "rad/s" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">rad/s</span>
                      <span className="font-semibold">{formatNum(result.radPerS, inputs.precision)}</span>
                    </div>
                  )}
                  {inputs.resultUnit !== "deg/s" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">deg/s</span>
                      <span className="font-semibold">{formatNum(result.degPerS, inputs.precision)}</span>
                    </div>
                  )}
                  {inputs.resultUnit !== "rev/s" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">rev/s</span>
                      <span className="font-semibold">{formatNum(result.revPerS, inputs.precision)}</span>
                    </div>
                  )}
                  {inputs.resultUnit !== "rpm" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">RPM</span>
                      <span className="font-semibold">{formatNum(result.rpm, inputs.precision)}</span>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Output Unit</label>
                <select
                  value={inputs.resultUnit}
                  onChange={(e) => set({ resultUnit: e.target.value as ResultUnit })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  {ALL_RESULT_UNITS.map((u) => (
                    <option key={u} value={u}>{RESULT_UNIT_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select
                  value={inputs.precision}
                  onChange={(e) => set({ precision: parseInt(e.target.value) as Precision })}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
                  <option value={6}>6 decimal places</option>
                  <option value={8}>8 decimal places</option>
                </select>
              </div>

              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                ↺ Reset
              </button>
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                🔢 {showSteps ? "Hide" : "Show"} Steps
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

          {/* ── Right Panel ─────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Formula Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Formula / Method</label>
                <select
                  value={inputs.mode}
                  onChange={(e) => set({ mode: e.target.value as CalcMode })}
                  className={selectCls}
                  aria-label="Calculation method"
                >
                  {(Object.keys(MODE_LABELS) as CalcMode[]).map((m) => (
                    <option key={m} value={m}>{MODE_LABELS[m]}</option>
                  ))}
                </select>
              </div>

              {/* ── Mode 1: Displacement + Time ────────────────────────── */}
              {inputs.mode === "displacement" && (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Angular Displacement (θ)
                        <span className="ml-1 text-xs text-gray-400" title="Total angle swept">ⓘ</span>
                      </label>
                      <input
                        ref={firstInputRef}
                        type="number"
                        inputMode="decimal"
                        value={inputs.theta}
                        onChange={(e) => set({ theta: e.target.value })}
                        onKeyDown={handleKeyDown}
                        className={inputCls(errors.theta)}
                        placeholder="360"
                        step="any"
                        aria-label="Angular displacement"
                      />
                      {errors.theta && <p className="text-xs text-red-600 mt-1">{errors.theta}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Angle Unit</label>
                      <select value={inputs.thetaUnit} onChange={(e) => set({ thetaUnit: e.target.value as AngleUnit })} className={selectCls}>
                        {ALL_ANGLE_UNITS.map((u) => <option key={u} value={u}>{ANGLE_LABELS[u]}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time (t)
                        <span className="ml-1 text-xs text-gray-400" title="Duration of rotation">ⓘ</span>
                      </label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={inputs.time}
                        onChange={(e) => set({ time: e.target.value })}
                        onKeyDown={handleKeyDown}
                        className={inputCls(errors.time)}
                        placeholder="2"
                        step="any"
                        aria-label="Time"
                      />
                      {errors.time && <p className="text-xs text-red-600 mt-1">{errors.time}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time Unit</label>
                      <select value={inputs.timeUnit} onChange={(e) => set({ timeUnit: e.target.value as TimeUnit })} className={selectCls}>
                        {ALL_TIME_UNITS.map((u) => <option key={u} value={u}>{TIME_LABELS[u]}</option>)}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* ── Mode 2: Linear Velocity + Radius ───────────────────── */}
              {inputs.mode === "linear" && (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Linear Velocity (v)
                        <span className="ml-1 text-xs text-gray-400" title="Speed of a point on the rotating body">ⓘ</span>
                      </label>
                      <input
                        ref={firstInputRef}
                        type="number"
                        inputMode="decimal"
                        value={inputs.velocity}
                        onChange={(e) => set({ velocity: e.target.value })}
                        onKeyDown={handleKeyDown}
                        className={inputCls(errors.velocity)}
                        placeholder="20"
                        step="any"
                        aria-label="Linear velocity"
                      />
                      {errors.velocity && <p className="text-xs text-red-600 mt-1">{errors.velocity}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Velocity Unit</label>
                      <select value={inputs.velocityUnit} onChange={(e) => set({ velocityUnit: e.target.value as LinearVelocityUnit })} className={selectCls}>
                        {ALL_VELOCITY_UNITS.map((u) => <option key={u} value={u}>{VELOCITY_LABELS[u]}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Radius (r)
                        <span className="ml-1 text-xs text-gray-400" title="Distance from center of rotation">ⓘ</span>
                      </label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={inputs.radius}
                        onChange={(e) => set({ radius: e.target.value })}
                        onKeyDown={handleKeyDown}
                        className={inputCls(errors.radius)}
                        placeholder="0.3"
                        min="0.000001"
                        step="any"
                        aria-label="Radius"
                      />
                      {errors.radius && <p className="text-xs text-red-600 mt-1">{errors.radius}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Radius Unit</label>
                      <select value={inputs.radiusUnit} onChange={(e) => set({ radiusUnit: e.target.value as RadiusUnit })} className={selectCls}>
                        {ALL_RADIUS_UNITS.map((u) => <option key={u} value={u}>{RADIUS_LABELS[u]}</option>)}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* ── Mode 3: RPM ─────────────────────────────────────────── */}
              {inputs.mode === "rpm" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RPM (Revolutions per Minute)
                    <span className="ml-1 text-xs text-gray-400" title="Rotational speed in RPM">ⓘ</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.rpm}
                    onChange={(e) => set({ rpm: e.target.value })}
                    onKeyDown={handleKeyDown}
                    className={inputCls(errors.rpm)}
                    placeholder="1200"
                    min="0"
                    step="any"
                    aria-label="RPM"
                  />
                  {errors.rpm && <p className="text-xs text-red-600 mt-1">{errors.rpm}</p>}
                </div>
              )}

              {/* ── Mode 4: Frequency ───────────────────────────────────── */}
              {inputs.mode === "frequency" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency (f)
                      <span className="ml-1 text-xs text-gray-400" title="Number of complete cycles per second">ⓘ</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.frequency}
                      onChange={(e) => set({ frequency: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={inputCls(errors.frequency)}
                      placeholder="60"
                      min="0"
                      step="any"
                      aria-label="Frequency"
                    />
                    {errors.frequency && <p className="text-xs text-red-600 mt-1">{errors.frequency}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency Unit</label>
                    <select value={inputs.frequencyUnit} onChange={(e) => set({ frequencyUnit: e.target.value as FrequencyUnit })} className={selectCls}>
                      {ALL_FREQUENCY_UNITS.map((u) => <option key={u} value={u}>{FREQUENCY_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* ── Mode 5: Period ───────────────────────────────────────── */}
              {inputs.mode === "period" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Period (T)
                      <span className="ml-1 text-xs text-gray-400" title="Time for one complete rotation">ⓘ</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.period}
                      onChange={(e) => set({ period: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={inputCls(errors.period)}
                      placeholder="0.5"
                      min="0.000001"
                      step="any"
                      aria-label="Period"
                    />
                    {errors.period && <p className="text-xs text-red-600 mt-1">{errors.period}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Period Unit</label>
                    <select value={inputs.periodUnit} onChange={(e) => set({ periodUnit: e.target.value as PeriodUnit })} className={selectCls}>
                      {ALL_PERIOD_UNITS.map((u) => <option key={u} value={u}>{PERIOD_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong> {result.formula} = <strong>{formatNum(result.radPerS, inputs.precision)} rad/s</strong>
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
                  const active = inputs.mode === p.inputs.mode &&
                    (p.inputs.rpm ? inputs.rpm === p.inputs.rpm :
                     p.inputs.frequency ? inputs.frequency === p.inputs.frequency :
                     p.inputs.theta ? inputs.theta === p.inputs.theta :
                     p.inputs.velocity ? inputs.velocity === p.inputs.velocity : false);
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

            {/* Unit Conversion Breakdown */}
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
                        <td className="py-2 px-3 font-medium text-primary">rad/s</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.radPerS, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Radians per second (SI standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">deg/s</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.degPerS, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Degrees per second</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">rev/s</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.revPerS, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Revolutions per second (Hz)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">RPM</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.rpm, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Revolutions per minute</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step-by-Step Breakdown */}
            {showSteps && result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Step-by-Step Calculation</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1">
                  {result.steps.map((step, i) => (
                    <div key={i} className="text-gray-700">{step}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Educational Formula Panel */}
            {showEdu && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formulas & Explanations</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="font-semibold text-gray-700 text-xs uppercase mb-1">Displacement + Time</div>
                      <div className="font-mono text-center text-base py-1">ω = θ / t</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="font-semibold text-gray-700 text-xs uppercase mb-1">Linear Velocity + Radius</div>
                      <div className="font-mono text-center text-base py-1">ω = v / r</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="font-semibold text-gray-700 text-xs uppercase mb-1">RPM Conversion</div>
                      <div className="font-mono text-center text-base py-1">ω = (2π × RPM) / 60</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="font-semibold text-gray-700 text-xs uppercase mb-1">Frequency Conversion</div>
                      <div className="font-mono text-center text-base py-1">ω = 2πf</div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg sm:col-span-2">
                      <div className="font-semibold text-gray-700 text-xs uppercase mb-1">Period Conversion</div>
                      <div className="font-mono text-center text-base py-1">ω = 2π / T</div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">ω (Angular Velocity)</div>
                      <div className="text-blue-700 text-xs">Rate of rotation — rad/s is SI standard</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">θ (Displacement)</div>
                      <div className="text-orange-700 text-xs">Angle swept in degrees, radians, or revolutions</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">T (Period)</div>
                      <div className="text-green-700 text-xs">Time for one complete rotation — reciprocal of frequency</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Key insight:</strong> Angular velocity (ω) is the rotational analogue of linear velocity. 1 rev/s = 2π rad/s ≈ 6.283 rad/s. 1 RPM = π/30 rad/s ≈ 0.1047 rad/s.
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
                          = {formatNum(entry.result.radPerS, 4)} rad/s
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

      <AngularVelocitySEO />
      <RelatedTools
        currentTool="angular-velocity-calculator"
        tools={[
          "torque-calculator",
          "centripetal-force-calculator",
          "gear-ratio-calculator",
          "velocity-calculator",
          "angular-acceleration-calculator",
          "rotational-kinetic-energy-calculator",
        ]}
      />
    </>
  );
}

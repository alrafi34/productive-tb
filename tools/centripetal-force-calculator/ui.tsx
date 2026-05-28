"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CentripetalInputs,
  CentripetalResult,
  HistoryEntry,
  MassUnit,
  VelocityUnit,
  RadiusUnit,
  CalcMode,
  Precision,
} from "./types";
import {
  calculate,
  validateMass,
  validateVelocity,
  validateRadius,
  validateOmega,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  MASS_LABELS,
  MASS_SHORT,
  VELOCITY_LABELS,
  VELOCITY_SHORT,
  RADIUS_LABELS,
  RADIUS_SHORT,
  ALL_MASS_UNITS,
  ALL_VELOCITY_UNITS,
  ALL_RADIUS_UNITS,
} from "./logic";
import CentripetalForceSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets (US defaults) ──────────────────────────────────────────────────
const PRESETS = [
  {
    label: "Student Example",
    mode: "velocity" as CalcMode,
    mass: "10", massUnit: "kg" as MassUnit,
    velocity: "5", velocityUnit: "m/s" as VelocityUnit,
    radius: "2", radiusUnit: "m" as RadiusUnit,
    omega: "2.5",
  },
  {
    label: "Car Turning",
    mode: "velocity" as CalcMode,
    mass: "1500", massUnit: "kg" as MassUnit,
    velocity: "20", velocityUnit: "m/s" as VelocityUnit,
    radius: "50", radiusUnit: "m" as RadiusUnit,
    omega: "0.4",
  },
  {
    label: "Roller Coaster",
    mode: "velocity" as CalcMode,
    mass: "80", massUnit: "kg" as MassUnit,
    velocity: "25", velocityUnit: "m/s" as VelocityUnit,
    radius: "15", radiusUnit: "m" as RadiusUnit,
    omega: "1.67",
  },
  {
    label: "Angular Velocity",
    mode: "angular" as CalcMode,
    mass: "0.5", massUnit: "kg" as MassUnit,
    velocity: "15", velocityUnit: "m/s" as VelocityUnit,
    radius: "1.5", radiusUnit: "m" as RadiusUnit,
    omega: "10",
  },
];

const DEFAULT_INPUTS: CentripetalInputs = {
  mode: "velocity",
  mass: "10",
  massUnit: "kg",
  velocity: "5",
  velocityUnit: "m/s",
  radius: "2",
  radiusUnit: "m",
  omega: "2.5",
  omegaUnit: "rad/s",
  precision: 2,
};

export default function CentripetalForceCalculatorUI() {
  const [inputs, setInputs] = useState<CentripetalInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CentripetalResult | null>(null);
  const [massErr, setMassErr] = useState<string | null>(null);
  const [velErr, setVelErr] = useState<string | null>(null);
  const [radErr, setRadErr] = useState<string | null>(null);
  const [omegaErr, setOmegaErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu, setShowEdu] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const massRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    massRef.current?.focus();
  }, []);

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const me = validateMass(inputs.mass);
      const re = validateRadius(inputs.radius);
      const ve = inputs.mode === "velocity" ? validateVelocity(inputs.velocity) : null;
      const oe = inputs.mode === "angular" ? validateOmega(inputs.omega) : null;
      setMassErr(me);
      setRadErr(re);
      setVelErr(ve);
      setOmegaErr(oe);
      if (me || re || ve || oe) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      mode: p.mode,
      mass: p.mass,
      massUnit: p.massUnit,
      velocity: p.velocity,
      velocityUnit: p.velocityUnit,
      radius: p.radius,
      radiusUnit: p.radiusUnit,
      omega: p.omega,
    }));
    massRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setMassErr(null);
    setVelErr(null);
    setRadErr(null);
    setOmegaErr(null);
    massRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Centripetal Force = ${formatNum(result.forceN, inputs.precision)} N\nMass = ${inputs.mass} ${MASS_SHORT[inputs.massUnit]}\n${inputs.mode === "velocity" ? `Velocity = ${inputs.velocity} ${VELOCITY_SHORT[inputs.velocityUnit]}` : `Angular Velocity = ${inputs.omega} rad/s`}\nRadius = ${inputs.radius} ${RADIUS_SHORT[inputs.radiusUnit]}`;
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
    downloadFile(exportToText(inputs, result), "centripetal-force-calculation.txt");
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
            <span className="text-2xl">🌀</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Centripetal Force Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the centripetal force for circular motion using mass, velocity, and radius (F = mv²/r) or angular velocity (F = mrω²). Supports metric and imperial units with real-time results.
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
                Centripetal Force
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

            {/* Calculation Mode Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setInputs((p) => ({ ...p, mode: "velocity" }))}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                      inputs.mode === "velocity"
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    F = mv² / r
                  </button>
                  <button
                    onClick={() => setInputs((p) => ({ ...p, mode: "angular" }))}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                      inputs.mode === "angular"
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    F = mrω²
                  </button>
                </div>
              </div>

              {/* Mass row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mass (m)
                    <span className="ml-1 text-xs text-gray-400" title="Mass of the object in circular motion">ⓘ</span>
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
                  <p className="text-xs text-gray-400 mt-1">e.g. Car ≈ 1500 kg</p>
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

              {/* Velocity or Angular Velocity row */}
              {inputs.mode === "velocity" ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Velocity (v)
                      <span className="ml-1 text-xs text-gray-400" title="Speed of the object along the circular path">ⓘ</span>
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
                    <p className="text-xs text-gray-400 mt-1">e.g. Highway ≈ 30 m/s</p>
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
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Angular Velocity (ω)
                      <span className="ml-1 text-xs text-gray-400" title="Rate of rotation in radians per second">ⓘ</span>
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.omega}
                      onChange={(e) => setInputs((p) => ({ ...p, omega: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${omegaErr ? "border-red-300" : "border-gray-200"}`}
                      placeholder="2.5"
                      step="any"
                      aria-label="Angular velocity value"
                    />
                    {omegaErr && <p className="text-xs text-red-600 mt-1">{omegaErr}</p>}
                    <p className="text-xs text-gray-400 mt-1">e.g. Motor ≈ 10 rad/s</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value="rad/s"
                      disabled
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-medium bg-gray-50 text-gray-500"
                    >
                      <option value="rad/s">Radians/sec (rad/s)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Radius row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Radius (r)
                    <span className="ml-1 text-xs text-gray-400" title="Radius of the circular path">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.radius}
                    onChange={(e) => setInputs((p) => ({ ...p, radius: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${radErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="2"
                    step="any"
                    aria-label="Radius value"
                  />
                  {radErr && <p className="text-xs text-red-600 mt-1">{radErr}</p>}
                  <p className="text-xs text-gray-400 mt-1">e.g. Road curve ≈ 50 m</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Radius Unit</label>
                  <select
                    value={inputs.radiusUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, radiusUnit: e.target.value as RadiusUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_RADIUS_UNITS.map((u) => (
                      <option key={u} value={u}>{RADIUS_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live formula display */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong>{" "}
                  {inputs.mode === "velocity"
                    ? <>F = mv² / r = {inputs.mass} {MASS_SHORT[inputs.massUnit]} × {inputs.velocity}² {VELOCITY_SHORT[inputs.velocityUnit]} / {inputs.radius} {RADIUS_SHORT[inputs.radiusUnit]} = <strong>{formatNum(result.forceN, inputs.precision)} N</strong></>
                    : <>F = mrω² = {inputs.mass} {MASS_SHORT[inputs.massUnit]} × {inputs.radius} {RADIUS_SHORT[inputs.radiusUnit]} × {inputs.omega}² rad/s = <strong>{formatNum(result.forceN, inputs.precision)} N</strong></>
                  }
                </div>
              )}

              {result && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  An object of <strong>{formatNum(result.massKg, 2)} kg</strong> moving at <strong>{formatNum(result.velocityMs, 2)} m/s</strong> along a circular path of radius <strong>{formatNum(result.radiusM, 2)} m</strong> requires <strong>{formatNum(result.forceN, inputs.precision)} N</strong> of centripetal force.
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
                    inputs.mode === p.mode &&
                    inputs.mass === p.mass &&
                    inputs.massUnit === p.massUnit &&
                    inputs.radius === p.radius &&
                    inputs.radiusUnit === p.radiusUnit;
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
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Step-by-Step Breakdown</h3>
                <div className="space-y-2">
                  {result.steps.map((step, i) => (
                    <div key={i} className={`flex items-start gap-3 p-2.5 rounded-lg ${i === result.steps.length - 1 ? "bg-primary/5 border border-primary/20" : "bg-gray-50"}`}>
                      <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold ${i === result.steps.length - 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}>
                        {i + 1}
                      </span>
                      <span className={`font-mono text-sm ${i === result.steps.length - 1 ? "text-primary font-semibold" : "text-gray-700"}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                    F = mv² / r
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    F = mrω² <span className="text-gray-400 text-sm">(angular velocity)</span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">F (Force)</div>
                      <div className="text-blue-700 text-xs">Centripetal force in Newtons (N). Always directed toward the center.</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">m (Mass)</div>
                      <div className="text-orange-700 text-xs">Mass of the object in kilograms (kg).</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">v / ω (Speed)</div>
                      <div className="text-green-700 text-xs">Linear velocity (m/s) or angular velocity (rad/s).</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Key insight:</strong> Velocity is squared in the formula — doubling speed quadruples the required centripetal force. This is why sharp turns at high speed are so dangerous.
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
                            {entry.inputs.mass} {MASS_SHORT[entry.inputs.massUnit]}{" "}
                            {entry.inputs.mode === "velocity"
                              ? `@ ${entry.inputs.velocity} ${VELOCITY_SHORT[entry.inputs.velocityUnit]}`
                              : `@ ${entry.inputs.omega} rad/s`
                            }{" "}
                            r={entry.inputs.radius} {RADIUS_SHORT[entry.inputs.radiusUnit]}
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

      <CentripetalForceSEO />
      <RelatedTools
        currentTool="centripetal-force-calculator"
        tools={[
          "force-calculator",
          "torque-calculator",
          "angular-velocity-calculator",
          "kinetic-energy-calculator",
          "spring-force-calculator",
          "velocity-calculator",
        ]}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { DragInputs, DragResult, HistoryEntry, VelocityUnit, FluidType, Precision } from "./types";
import {
  calculate,
  validateVelocity,
  validateDensity,
  validateCd,
  validateArea,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  VELOCITY_LABELS,
  ALL_VELOCITY_UNITS,
  FLUID_DENSITY,
  CD_PRESETS,
} from "./logic";
import DragForceCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const QUICK_PRESETS = [
  { label: "Car at 100 km/h",  velocity: "100",  velocityUnit: "km/h" as VelocityUnit, density: "1.225", dragCoefficient: "0.30", area: "2.2",  fluidType: "air"   as FluidType },
  { label: "Cyclist at 30 km/h", velocity: "30", velocityUnit: "km/h" as VelocityUnit, density: "1.225", dragCoefficient: "0.90", area: "0.45", fluidType: "air"   as FluidType },
  { label: "Sphere in Air",    velocity: "20",   velocityUnit: "m/s"  as VelocityUnit, density: "1.225", dragCoefficient: "0.47", area: "0.5",  fluidType: "air"   as FluidType },
  { label: "Swimmer in Water", velocity: "2",    velocityUnit: "m/s"  as VelocityUnit, density: "1000",  dragCoefficient: "0.90", area: "0.07", fluidType: "water" as FluidType },
];

const DEFAULT_INPUTS: DragInputs = {
  fluidType:       "air",
  velocity:        "20",
  velocityUnit:    "m/s",
  density:         "1.225",
  dragCoefficient: "0.47",
  area:            "0.5",
  precision:       2,
};

export default function DragForceCalculatorUI() {
  const [inputs,      setInputs]      = useState<DragInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<DragResult | null>(null);
  const [velErr,      setVelErr]      = useState<string | null>(null);
  const [densErr,     setDensErr]     = useState<string | null>(null);
  const [cdErr,       setCdErr]       = useState<string | null>(null);
  const [areaErr,     setAreaErr]     = useState<string | null>(null);
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu,     setShowEdu]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const velRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    velRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const ve = validateVelocity(inputs.velocity);
      const de = validateDensity(inputs.density);
      const ce = validateCd(inputs.dragCoefficient);
      const ae = validateArea(inputs.area);
      setVelErr(ve);
      setDensErr(de);
      setCdErr(ce);
      setAreaErr(ae);
      if (ve || de || ce || ae) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const handleFluidChange = (fluid: FluidType) => {
    setInputs((prev) => ({
      ...prev,
      fluidType: fluid,
      density: fluid !== "custom" ? String(FLUID_DENSITY[fluid]) : prev.density,
    }));
  };

  const handleQuickPreset = (p: typeof QUICK_PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      velocity:        p.velocity,
      velocityUnit:    p.velocityUnit,
      density:         p.density,
      dragCoefficient: p.dragCoefficient,
      area:            p.area,
      fluidType:       p.fluidType,
    }));
    velRef.current?.focus();
  };

  const handleCdPreset = (cd: string) => {
    setInputs((prev) => ({ ...prev, dragCoefficient: cd }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setVelErr(null); setDensErr(null); setCdErr(null); setAreaErr(null);
    velRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Drag Force: ${formatNum(result.dragForceN, inputs.precision)} N | v=${inputs.velocity} ${inputs.velocityUnit} | ρ=${inputs.density} kg/m³ | Cd=${inputs.dragCoefficient} | A=${inputs.area} m²`;
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
    downloadFile(exportToText(inputs, result), "drag-force-calculation.txt");
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
            <span className="text-2xl">💨</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Drag Force Calculator (F = ½ρv²CdA)</h3>
              <p className="text-sm text-blue-800">
                Enter velocity, fluid density, drag coefficient, and frontal area to instantly calculate
                the drag force acting on an object moving through a fluid.
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
                Drag Force Result
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result !== null ? `${formatNum(result.dragForceN, inputs.precision)} N` : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Newtons (N)</span>
                    <span className="font-semibold">{formatNum(result.dragForceN, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Kilonewtons (kN)</span>
                    <span className="font-semibold">{formatNum(result.dragForceKN, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Pound-force (lbf)</span>
                    <span className="font-semibold">{formatNum(result.dragForceLbf, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Velocity (m/s)</span>
                    <span className="font-semibold">{formatNum(result.velocityMs, 3)}</span>
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

              <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ↺ Reset
              </button>
              <button onClick={() => setShowEdu(!showEdu)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📖 {showEdu ? "Hide" : "Show"} Formula
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

              {/* Fluid Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fluid Type</label>
                <div className="flex gap-3">
                  {(["air", "water", "custom"] as FluidType[]).map((fluid) => (
                    <button
                      key={fluid}
                      onClick={() => handleFluidChange(fluid)}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border capitalize ${
                        inputs.fluidType === fluid
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {fluid === "air" ? "🌬 Air" : fluid === "water" ? "💧 Water" : "⚗️ Custom"}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  {inputs.fluidType === "air"
                    ? "Standard air at sea level: ρ = 1.225 kg/m³"
                    : inputs.fluidType === "water"
                    ? "Fresh water at 4°C: ρ = 1000 kg/m³"
                    : "Enter a custom fluid density below"}
                </p>
              </div>

              {/* Velocity row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Object Velocity
                    <span className="ml-1 text-xs text-gray-400" title="Speed of the object relative to the fluid">ⓘ</span>
                  </label>
                  <input
                    ref={velRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.velocity}
                    onChange={(e) => setInputs((p) => ({ ...p, velocity: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${velErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="20"
                    min="0"
                    step="any"
                    aria-label="Object velocity"
                  />
                  {velErr && <p className="text-xs text-red-600 mt-1">{velErr}</p>}
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

              {/* Fluid Density */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fluid Density (ρ)
                  <span className="ml-1 text-xs text-gray-400" title="Mass per unit volume of the fluid in kg/m³">ⓘ</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.density}
                    onChange={(e) => setInputs((p) => ({ ...p, density: e.target.value.replace(/[^0-9.]/g, ""), fluidType: "custom" }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono pr-16 ${densErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="1.225"
                    min="0"
                    step="any"
                    aria-label="Fluid density"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">kg/m³</span>
                </div>
                {densErr && <p className="text-xs text-red-600 mt-1">{densErr}</p>}
                <p className="text-xs text-gray-400 mt-1">Air = 1.225 · Water = 1000 · Seawater ≈ 1025 · Oil ≈ 870</p>
              </div>

              {/* Drag Coefficient */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Drag Coefficient (Cd)
                  <span className="ml-1 text-xs text-gray-400" title="Dimensionless measure of aerodynamic resistance">ⓘ</span>
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={inputs.dragCoefficient}
                  onChange={(e) => setInputs((p) => ({ ...p, dragCoefficient: e.target.value.replace(/[^0-9.]/g, "") }))}
                  onKeyDown={handleKeyDown}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${cdErr ? "border-red-300" : "border-gray-200"}`}
                  placeholder="0.47"
                  min="0"
                  step="any"
                  aria-label="Drag coefficient"
                />
                {cdErr && <p className="text-xs text-red-600 mt-1">{cdErr}</p>}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {CD_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => handleCdPreset(String(p.cd))}
                      title={p.description}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors border ${
                        inputs.dragCoefficient === String(p.cd)
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p.label} ({p.cd})
                    </button>
                  ))}
                </div>
              </div>

              {/* Frontal Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frontal Area (A)
                  <span className="ml-1 text-xs text-gray-400" title="Cross-sectional area perpendicular to flow direction">ⓘ</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.area}
                    onChange={(e) => setInputs((p) => ({ ...p, area: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono pr-12 ${areaErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder="0.5"
                    min="0"
                    step="any"
                    aria-label="Frontal area"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">m²</span>
                </div>
                {areaErr && <p className="text-xs text-red-600 mt-1">{areaErr}</p>}
                <p className="text-xs text-gray-400 mt-1">Car ≈ 2.2 m² · Cyclist ≈ 0.45 m² · Person ≈ 0.7 m²</p>
              </div>

              {/* Live formula display */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong>{" "}
                  F = 0.5 × {inputs.density} × {formatNum(result.velocityMs, 3)}² × {inputs.dragCoefficient} × {inputs.area} = <strong>{formatNum(result.dragForceN, inputs.precision)} N</strong>
                </div>
              )}

              {result && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  The object experiences approximately <strong>{formatNum(result.dragForceN, inputs.precision)} N</strong> of resistance
                  due to fluid drag at <strong>{formatNum(result.velocityMs, 2)} m/s</strong> through{" "}
                  {inputs.fluidType === "custom" ? "the custom fluid" : inputs.fluidType}.
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
                    inputs.velocity === p.velocity &&
                    inputs.velocityUnit === p.velocityUnit &&
                    inputs.dragCoefficient === p.dragCoefficient &&
                    inputs.area === p.area;
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
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.dragForceN, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Newton (SI standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">kN</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.dragForceKN, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilonewton</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">lbf</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.dragForceLbf, inputs.precision)}</td>
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
                    F = ½ × ρ × v² × Cd × A
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">F (Drag Force)</div>
                      <div className="text-blue-700 text-xs">Resistive force in Newtons (N)</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">ρ (Density)</div>
                      <div className="text-orange-700 text-xs">Fluid density in kg/m³</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">v (Velocity)</div>
                      <div className="text-green-700 text-xs">Object speed in m/s</div>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
                      <div className="font-semibold text-purple-800 text-xs uppercase mb-1">Cd × A</div>
                      <div className="text-purple-700 text-xs">Drag coeff × frontal area</div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                    <strong>Key insight:</strong> Drag force scales with the <em>square</em> of velocity — doubling speed quadruples drag force. This is why aerodynamics matter most at high speeds.
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
                            v={entry.inputs.velocity} {entry.inputs.velocityUnit} · Cd={entry.inputs.dragCoefficient} · A={entry.inputs.area} m²
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {formatNum(entry.result.dragForceN, 2)} N
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

      <DragForceCalculatorSEO />
      <RelatedTools
        currentTool="drag-force-calculator"
        tools={[
          "friction-force-calculator",
          "force-calculator",
          "reynolds-number-calculator",
          "bernoulli-equation-calculator",
          "flow-rate-calculator",
          "pressure-drop-calculator",
        ]}
      />
    </>
  );
}

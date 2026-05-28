"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalcMode,
  VolumeUnit, TimeUnit,
  DiameterUnit, VelocityUnit,
  AreaUnit, DensityUnit, FlowUnit,
  FlowResult, HistoryEntry,
} from "./types";
import {
  calcVolumeTime, calcPipeVelocity, calcAreaVelocity, calcMassFlow,
  validatePositive, debounce,
  saveToHistory, getHistory, clearHistory, exportToText, downloadFile,
  fmtDisplay, fmt,
  VOLUME_LABELS, TIME_LABELS, DIAMETER_LABELS, VELOCITY_LABELS,
  AREA_LABELS, DENSITY_LABELS, FLOW_LABELS,
  FLUID_PRESETS,
} from "./logic";
import FlowRateCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Default states ────────────────────────────────────────────────────────────
const DEFAULT_VOL_TIME = { volume: "500", volumeUnit: "L" as VolumeUnit, time: "10", timeUnit: "min" as TimeUnit };
const DEFAULT_PIPE_VEL = { diameter: "4", diameterUnit: "in" as DiameterUnit, velocity: "6", velocityUnit: "ft/s" as VelocityUnit };
const DEFAULT_AREA_VEL = { area: "0.00785", areaUnit: "m2" as AreaUnit, velocity: "2", velocityUnit: "m/s" as VelocityUnit };
const DEFAULT_MASS    = { flowRate: "0.5", flowRateUnit: "m3/s" as FlowUnit, density: "998", densityUnit: "kg/m3" as DensityUnit };

const MODE_LABELS: Record<CalcMode, string> = {
  "volume-time":   "Volume & Time",
  "pipe-velocity": "Pipe Diameter & Velocity",
  "area-velocity": "Area & Velocity",
  "mass-flow":     "Mass Flow Rate",
};

const MODE_FORMULAS: Record<CalcMode, string> = {
  "volume-time":   "Q = V / t",
  "pipe-velocity": "Q = (π × d²/4) × v",
  "area-velocity": "Q = A × v",
  "mass-flow":     "ṁ = ρ × Q",
};

export default function FlowRateCalculatorUI() {
  const [mode, setMode] = useState<CalcMode>("volume-time");
  const [volTime, setVolTime] = useState(DEFAULT_VOL_TIME);
  const [pipeVel, setPipeVel] = useState(DEFAULT_PIPE_VEL);
  const [areaVel, setAreaVel] = useState(DEFAULT_AREA_VEL);
  const [massFlow, setMassFlow] = useState(DEFAULT_MASS);

  const [result, setResult] = useState<FlowResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstInputRef.current?.focus();
  }, []);

  // ── Debounced calculation ─────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      let newErrors: Record<string, string | null> = {};
      let res: FlowResult | null = null;

      try {
        if (mode === "volume-time") {
          const e1 = validatePositive(volTime.volume, "Volume");
          const e2 = validatePositive(volTime.time, "Time");
          newErrors = { volume: e1, time: e2 };
          if (!e1 && !e2) res = calcVolumeTime(volTime);
        } else if (mode === "pipe-velocity") {
          const e1 = validatePositive(pipeVel.diameter, "Pipe Diameter");
          const e2 = validatePositive(pipeVel.velocity, "Fluid Velocity");
          newErrors = { diameter: e1, velocity: e2 };
          if (!e1 && !e2) res = calcPipeVelocity(pipeVel);
        } else if (mode === "area-velocity") {
          const e1 = validatePositive(areaVel.area, "Cross-sectional Area");
          const e2 = validatePositive(areaVel.velocity, "Fluid Velocity");
          newErrors = { area: e1, velocity: e2 };
          if (!e1 && !e2) res = calcAreaVelocity(areaVel);
        } else if (mode === "mass-flow") {
          const e1 = validatePositive(massFlow.flowRate, "Volumetric Flow Rate");
          const e2 = validatePositive(massFlow.density, "Fluid Density");
          newErrors = { flowRate: e1, density: e2 };
          if (!e1 && !e2) res = calcMassFlow(massFlow);
        }
      } catch {
        res = null;
      }

      setErrors(newErrors);
      setResult(res);
    }, 150),
    [mode, volTime, pipeVel, areaVel, massFlow]
  );

  useEffect(() => { run(); }, [mode, volTime, pipeVel, areaVel, massFlow, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleReset = () => {
    setVolTime(DEFAULT_VOL_TIME);
    setPipeVel(DEFAULT_PIPE_VEL);
    setAreaVel(DEFAULT_AREA_VEL);
    setMassFlow(DEFAULT_MASS);
    setResult(null);
    setErrors({});
    firstInputRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const primary = result.massFlowSI !== undefined
      ? `Mass Flow Rate: ${fmtDisplay(result.massFlowSI)} kg/s | Volumetric Flow: ${fmtDisplay(result.qSI)} m³/s`
      : `Flow Rate: ${fmtDisplay(result.qSI)} m³/s | ${fmtDisplay(result.qSI * 60000)} L/min`;
    navigator.clipboard.writeText(primary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(mode, result, MODE_LABELS[mode]);
    setHistory(getHistory());
  };

  const handleExport = () => {
    if (!result) return;
    downloadFile(exportToText(mode, result, MODE_LABELS[mode]), "flow-rate-calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setMode(entry.mode);
    setResult(entry.result);
    setShowHistory(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") handleReset();
  };

  // ── Primary display value ─────────────────────────────────────────────────
  const primaryValue = result
    ? mode === "mass-flow" && result.massFlowSI !== undefined
      ? fmtDisplay(result.massFlowSI)
      : fmtDisplay(result.qSI * 60000)
    : "—";

  const primaryUnit = result
    ? mode === "mass-flow" && result.massFlowSI !== undefined
      ? "kg/s"
      : "L/min"
    : "";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌊</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Flow Rate Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate volumetric and mass flow rate using multiple engineering methods. Supports pipe flow, area-velocity, volume-time, and mass flow formulas with automatic unit conversion.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">Calculation Mode</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(MODE_LABELS) as CalcMode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setErrors({}); }}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border text-center ${
                  mode === m
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ─────────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider">
                {mode === "mass-flow" ? "Mass Flow Rate" : "Volumetric Flow Rate"}
              </p>
              <div className="text-4xl font-bold mb-1 leading-none break-all">
                {primaryValue}
              </div>
              <div className="text-lg text-primary-100 mb-4">{primaryUnit}</div>

              {result && (
                <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  {mode !== "mass-flow" ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">m³/s</span>
                        <span className="font-semibold">{fmtDisplay(result.qSI)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">L/s</span>
                        <span className="font-semibold">{fmtDisplay(result.qSI * 1000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">m³/hr</span>
                        <span className="font-semibold">{fmtDisplay(result.qSI * 3600)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">gal/min</span>
                        <span className="font-semibold">{fmtDisplay(result.qSI * 15850.3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">CFM</span>
                        <span className="font-semibold">{fmtDisplay(result.qSI * 2118.88)}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">kg/s</span>
                        <span className="font-semibold">{fmtDisplay(result.massFlowSI!)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">kg/hr</span>
                        <span className="font-semibold">{fmtDisplay(result.massFlowSI! * 3600)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">lb/min</span>
                        <span className="font-semibold">{fmtDisplay(result.massFlowSI! * 132.277)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Q (m³/s)</span>
                        <span className="font-semibold">{fmtDisplay(result.qSI)}</span>
                      </div>
                    </>
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

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Actions</h3>
              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                ↺ Reset
              </button>
              <button
                onClick={() => setShowFormula(!showFormula)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                📐 {showFormula ? "Hide" : "Show"} Formula
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

            {/* ── Mode: Volume & Time ─────────────────────────────────── */}
            {mode === "volume-time" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Volume & Time</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Volume</label>
                    <input
                      ref={firstInputRef}
                      type="number" inputMode="decimal"
                      value={volTime.volume}
                      onChange={(e) => setVolTime((p) => ({ ...p, volume: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.volume ? "border-red-300" : "border-gray-200"}`}
                      placeholder="500" min="0" step="any"
                    />
                    {errors.volume && <p className="text-xs text-red-600 mt-1">{errors.volume}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Volume Unit</label>
                    <select
                      value={volTime.volumeUnit}
                      onChange={(e) => setVolTime((p) => ({ ...p, volumeUnit: e.target.value as VolumeUnit }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(Object.keys(VOLUME_LABELS) as VolumeUnit[]).map((u) => (
                        <option key={u} value={u}>{VOLUME_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="number" inputMode="decimal"
                      value={volTime.time}
                      onChange={(e) => setVolTime((p) => ({ ...p, time: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.time ? "border-red-300" : "border-gray-200"}`}
                      placeholder="10" min="0" step="any"
                    />
                    {errors.time && <p className="text-xs text-red-600 mt-1">{errors.time}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Unit</label>
                    <select
                      value={volTime.timeUnit}
                      onChange={(e) => setVolTime((p) => ({ ...p, timeUnit: e.target.value as TimeUnit }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(Object.keys(TIME_LABELS) as TimeUnit[]).map((u) => (
                        <option key={u} value={u}>{TIME_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Q = V / t</strong>
                    <br />
                    <span className="font-mono text-xs">{result.formulaSubstituted} = <strong>{fmt(result.qSI)} m³/s</strong></span>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* ── Mode: Pipe Diameter & Velocity ─────────────────────── */}
            {mode === "pipe-velocity" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Pipe Diameter & Velocity</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pipe Diameter
                      <span className="ml-1 text-xs text-gray-400" title="Internal pipe diameter">ⓘ</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number" inputMode="decimal"
                      value={pipeVel.diameter}
                      onChange={(e) => setPipeVel((p) => ({ ...p, diameter: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.diameter ? "border-red-300" : "border-gray-200"}`}
                      placeholder="4" min="0" step="any"
                    />
                    {errors.diameter && <p className="text-xs text-red-600 mt-1">{errors.diameter}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Diameter Unit</label>
                    <select
                      value={pipeVel.diameterUnit}
                      onChange={(e) => setPipeVel((p) => ({ ...p, diameterUnit: e.target.value as DiameterUnit }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(Object.keys(DIAMETER_LABELS) as DiameterUnit[]).map((u) => (
                        <option key={u} value={u}>{DIAMETER_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fluid Velocity</label>
                    <input
                      type="number" inputMode="decimal"
                      value={pipeVel.velocity}
                      onChange={(e) => setPipeVel((p) => ({ ...p, velocity: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.velocity ? "border-red-300" : "border-gray-200"}`}
                      placeholder="6" min="0" step="any"
                    />
                    {errors.velocity && <p className="text-xs text-red-600 mt-1">{errors.velocity}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Velocity Unit</label>
                    <select
                      value={pipeVel.velocityUnit}
                      onChange={(e) => setPipeVel((p) => ({ ...p, velocityUnit: e.target.value as VelocityUnit }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(Object.keys(VELOCITY_LABELS) as VelocityUnit[]).map((u) => (
                        <option key={u} value={u}>{VELOCITY_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Q = (π × d²/4) × v</strong>
                    <br />
                    <span className="font-mono text-xs">{result.formulaSubstituted} = <strong>{fmt(result.qSI)} m³/s</strong></span>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* ── Mode: Area & Velocity ───────────────────────────────── */}
            {mode === "area-velocity" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Cross-sectional Area & Velocity</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cross-sectional Area
                      <span className="ml-1 text-xs text-gray-400" title="Flow cross-section area">ⓘ</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number" inputMode="decimal"
                      value={areaVel.area}
                      onChange={(e) => setAreaVel((p) => ({ ...p, area: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.area ? "border-red-300" : "border-gray-200"}`}
                      placeholder="0.00785" min="0" step="any"
                    />
                    {errors.area && <p className="text-xs text-red-600 mt-1">{errors.area}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                    <select
                      value={areaVel.areaUnit}
                      onChange={(e) => setAreaVel((p) => ({ ...p, areaUnit: e.target.value as AreaUnit }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(Object.keys(AREA_LABELS) as AreaUnit[]).map((u) => (
                        <option key={u} value={u}>{AREA_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fluid Velocity</label>
                    <input
                      type="number" inputMode="decimal"
                      value={areaVel.velocity}
                      onChange={(e) => setAreaVel((p) => ({ ...p, velocity: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.velocity ? "border-red-300" : "border-gray-200"}`}
                      placeholder="2" min="0" step="any"
                    />
                    {errors.velocity && <p className="text-xs text-red-600 mt-1">{errors.velocity}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Velocity Unit</label>
                    <select
                      value={areaVel.velocityUnit}
                      onChange={(e) => setAreaVel((p) => ({ ...p, velocityUnit: e.target.value as VelocityUnit }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(Object.keys(VELOCITY_LABELS) as VelocityUnit[]).map((u) => (
                        <option key={u} value={u}>{VELOCITY_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Q = A × v</strong>
                    <br />
                    <span className="font-mono text-xs">{result.formulaSubstituted} = <strong>{fmt(result.qSI)} m³/s</strong></span>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* ── Mode: Mass Flow Rate ────────────────────────────────── */}
            {mode === "mass-flow" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Mass Flow Rate</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Volumetric Flow Rate</label>
                    <input
                      ref={firstInputRef}
                      type="number" inputMode="decimal"
                      value={massFlow.flowRate}
                      onChange={(e) => setMassFlow((p) => ({ ...p, flowRate: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.flowRate ? "border-red-300" : "border-gray-200"}`}
                      placeholder="0.5" min="0" step="any"
                    />
                    {errors.flowRate && <p className="text-xs text-red-600 mt-1">{errors.flowRate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Flow Rate Unit</label>
                    <select
                      value={massFlow.flowRateUnit}
                      onChange={(e) => setMassFlow((p) => ({ ...p, flowRateUnit: e.target.value as FlowUnit }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(Object.keys(FLOW_LABELS) as FlowUnit[]).map((u) => (
                        <option key={u} value={u}>{FLOW_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fluid Density (ρ)
                      <span className="ml-1 text-xs text-gray-400" title="Mass per unit volume">ⓘ</span>
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={massFlow.density}
                      onChange={(e) => setMassFlow((p) => ({ ...p, density: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.density ? "border-red-300" : "border-gray-200"}`}
                      placeholder="998" min="0" step="any"
                    />
                    {errors.density && <p className="text-xs text-red-600 mt-1">{errors.density}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Density Unit</label>
                    <select
                      value={massFlow.densityUnit}
                      onChange={(e) => setMassFlow((p) => ({ ...p, densityUnit: e.target.value as DensityUnit }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {(Object.keys(DENSITY_LABELS) as DensityUnit[]).map((u) => (
                        <option key={u} value={u}>{DENSITY_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Fluid Presets */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Fluid Presets</p>
                  <div className="flex flex-wrap gap-2">
                    {FLUID_PRESETS.map((p) => {
                      const active = massFlow.density === p.density && massFlow.densityUnit === p.densityUnit;
                      return (
                        <button
                          key={p.label}
                          onClick={() => setMassFlow((prev) => ({ ...prev, density: p.density, densityUnit: p.densityUnit }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                            active ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>ṁ = ρ × Q</strong>
                    <br />
                    <span className="font-mono text-xs">{result.formulaSubstituted} = <strong>{fmt(result.massFlowSI!)} kg/s</strong></span>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* ── Conversion Table ────────────────────────────────────── */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  {mode === "mass-flow" ? "All Conversions" : "Volumetric Flow Conversions"}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {result.conversions.map((c) => (
                    <div key={c.label} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{c.label}</div>
                      <div className="font-mono font-semibold text-gray-900 text-sm">{c.value}</div>
                    </div>
                  ))}
                </div>

                {result.massConversions && (
                  <>
                    <h3 className="font-semibold text-gray-800 mt-5 mb-4">Mass Flow Conversions</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {result.massConversions.map((c) => (
                        <div key={c.label} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">{c.label}</div>
                          <div className="font-mono font-semibold text-blue-900 text-sm">{c.value}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ── Calculation Steps ───────────────────────────────────── */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Calculation Steps</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1">
                  {result.steps.map((step, i) => (
                    <div key={i} className="text-gray-700">{step}</div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Formula Panel ───────────────────────────────────────── */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formula Reference</h3>
                <div className="space-y-3">
                  {(Object.keys(MODE_FORMULAS) as CalcMode[]).map((m) => (
                    <div
                      key={m}
                      className={`p-3 rounded-lg border text-sm ${mode === m ? "bg-primary/5 border-primary/30" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div className={`font-semibold mb-1 ${mode === m ? "text-primary" : "text-gray-700"}`}>{MODE_LABELS[m]}</div>
                      <div className="font-mono text-gray-800">{MODE_FORMULAS[m]}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── History Panel ───────────────────────────────────────── */}
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
                          <span className="font-semibold text-gray-900 text-sm">{entry.label}</span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-gray-600 font-mono">
                          Q = {fmtDisplay(entry.result.qSI)} m³/s
                          {entry.result.massFlowSI !== undefined && ` | ṁ = ${fmtDisplay(entry.result.massFlowSI)} kg/s`}
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

      <FlowRateCalculatorSEO />
      <RelatedTools
        currentTool="flow-rate-calculator"
        tools={["reynolds-number-calculator", "pipe-velocity-calculator", "pressure-drop-calculator", "bernoulli-equation-calculator", "water-flow-rate-calculator", "drainage-flow-calculator"]}
      />
    </>
  );
}

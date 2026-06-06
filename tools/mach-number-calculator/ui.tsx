"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  MachInputs,
  MachResult,
  HistoryEntry,
  SpeedUnit,
  TempUnit,
  Medium,
  CalcMode,
  Precision,
} from "./types";
import {
  calculate,
  validateSpeed,
  validateMach,
  validateTemp,
  validateCustomSound,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  SPEED_LABELS,
  TEMP_LABELS,
  ALL_SPEED_UNITS,
  ALL_TEMP_UNITS,
  MEDIUM_PARAMS,
  CLASSIFICATION_LABELS,
  CLASSIFICATION_DESCRIPTIONS,
  CLASSIFICATION_COLORS,
  CLASSIFICATION_DOT,
  QUICK_PRESETS,
  MS_TO_UNIT,
} from "./logic";
import MachNumberCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: MachInputs = {
  mode:            "mach",
  speed:           "343",
  speedUnit:       "m/s",
  temperature:     "20",
  tempUnit:        "C",
  medium:          "dry-air",
  customSoundSpeed:"343",
  machNumber:      "1.5",
  precision:       2,
};

export default function MachNumberCalculatorUI() {
  const [inputs,      setInputs]      = useState<MachInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<MachResult | null>(null);
  const [errors,      setErrors]      = useState<Record<string, string | null>>({});
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu,     setShowEdu]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const primaryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    primaryRef.current?.focus();
  }, []);

  // ── Debounced calculation ─────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const errs: Record<string, string | null> = {};

      if (inputs.mode === "mach") {
        errs.speed = validateSpeed(inputs.speed);
      } else if (inputs.mode === "speed") {
        errs.machNumber = validateMach(inputs.machNumber);
      }

      errs.temperature = validateTemp(inputs.temperature, inputs.tempUnit);

      if (inputs.medium === "custom") {
        errs.customSoundSpeed = validateCustomSound(inputs.customSoundSpeed);
      }

      setErrors(errs);
      if (Object.values(errs).some(Boolean)) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handlePreset = (p: typeof QUICK_PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      mode:        "mach",
      speed:       p.speed,
      speedUnit:   p.speedUnit,
      temperature: p.temperature,
      tempUnit:    p.tempUnit,
      medium:      p.medium,
    }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    primaryRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = inputs.mode === "sound"
      ? `Speed of Sound: ${formatNum(result.speedOfSoundMs, inputs.precision)} m/s | T=${inputs.temperature}°${inputs.tempUnit} | ${inputs.medium}`
      : `Mach ${formatNum(result.machNumber, inputs.precision)} | ${CLASSIFICATION_LABELS[result.classification]} | ${formatNum(result.speedMs, inputs.precision)} m/s`;
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
    downloadFile(exportToText(inputs, result), "mach-number-calculation.txt");
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

  // ── Mach scale position ───────────────────────────────────────────────────
  const machScalePosition = result && inputs.mode !== "sound"
    ? Math.min((Math.log10(Math.max(result.machNumber, 0.01) + 1) / Math.log10(6)) * 100, 100)
    : null;

  const isSoundMode = inputs.mode === "sound";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚀</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Mach Number Calculator (M = v / a)</h3>
              <p className="text-sm text-blue-800">
                Calculate Mach number from speed and temperature, or reverse-calculate speed from Mach.
                Supports dry air, helium, hydrogen, and custom mediums with instant regime classification.
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
                {isSoundMode ? "Speed of Sound" : "Mach Number"}
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result
                  ? isSoundMode
                    ? `${formatNum(result.speedOfSoundMs, inputs.precision)} m/s`
                    : `M ${formatNum(result.machNumber, inputs.precision)}`
                  : "—"}
              </div>

              {result && !isSoundMode && (
                <div className={`mt-3 mb-4 px-3 py-2 rounded-lg border text-sm font-semibold ${CLASSIFICATION_COLORS[result.classification]}`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${CLASSIFICATION_DOT[result.classification]}`} />
                    {CLASSIFICATION_LABELS[result.classification]}
                  </div>
                </div>
              )}

              {result && (
                <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  {!isSoundMode && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Speed (m/s)</span>
                        <span className="font-semibold">{formatNum(result.speedMs, inputs.precision)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Speed (km/h)</span>
                        <span className="font-semibold">{formatNum(result.speedKmh, inputs.precision)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Speed (mph)</span>
                        <span className="font-semibold">{formatNum(result.speedMph, inputs.precision)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Speed (knots)</span>
                        <span className="font-semibold">{formatNum(result.speedKnots, inputs.precision)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Sound (m/s)</span>
                    <span className="font-semibold">{formatNum(result.speedOfSoundMs, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Sound (km/h)</span>
                    <span className="font-semibold">{formatNum(result.soundKmh, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Temp (K)</span>
                    <span className="font-semibold">{formatNum(result.temperatureK, 2)} K</span>
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

              {/* Calculation Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: "mach",  label: "Mach Number" },
                    { value: "speed", label: "Speed" },
                    { value: "sound", label: "Speed of Sound" },
                  ] as { value: CalcMode; label: string }[]).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setInputs((p) => ({ ...p, mode: opt.value }))}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                        inputs.mode === opt.value
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  {inputs.mode === "mach"  && "Enter object speed → get Mach number"}
                  {inputs.mode === "speed" && "Enter Mach number → get object speed"}
                  {inputs.mode === "sound" && "Enter temperature → get speed of sound"}
                </p>
              </div>

              {/* Speed input — Mode 1 only */}
              {inputs.mode === "mach" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Object Speed
                      <span className="ml-1 text-xs text-gray-400" title="Speed of the object through the medium">ⓘ</span>
                    </label>
                    <input
                      ref={primaryRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.speed}
                      onChange={(e) => setInputs((p) => ({ ...p, speed: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.speed ? "border-red-300" : "border-gray-200"}`}
                      placeholder="343"
                      min="0"
                      step="any"
                      aria-label="Object speed"
                    />
                    {errors.speed && <p className="text-xs text-red-600 mt-1">{errors.speed}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Speed Unit</label>
                    <select
                      value={inputs.speedUnit}
                      onChange={(e) => setInputs((p) => ({ ...p, speedUnit: e.target.value as SpeedUnit }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_SPEED_UNITS.map((u) => (
                        <option key={u} value={u}>{SPEED_LABELS[u]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Mach input — Mode 2 only */}
              {inputs.mode === "speed" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mach Number
                    <span className="ml-1 text-xs text-gray-400" title="Desired Mach number to convert to speed">ⓘ</span>
                  </label>
                  <input
                    ref={primaryRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.machNumber}
                    onChange={(e) => setInputs((p) => ({ ...p, machNumber: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.machNumber ? "border-red-300" : "border-gray-200"}`}
                    placeholder="1.5"
                    min="0"
                    step="any"
                    aria-label="Mach number"
                  />
                  {errors.machNumber && <p className="text-xs text-red-600 mt-1">{errors.machNumber}</p>}
                  <p className="text-xs text-gray-400 mt-1">Enter any Mach value (e.g., 0.8 subsonic, 1.5 supersonic, 6 hypersonic)</p>
                </div>
              )}

              {/* Temperature */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Air Temperature
                    <span className="ml-1 text-xs text-gray-400" title="Ambient temperature affects the speed of sound">ⓘ</span>
                  </label>
                  <input
                    ref={inputs.mode === "sound" ? primaryRef : undefined}
                    type="number"
                    inputMode="decimal"
                    value={inputs.temperature}
                    onChange={(e) => setInputs((p) => ({ ...p, temperature: e.target.value }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.temperature ? "border-red-300" : "border-gray-200"}`}
                    placeholder="20"
                    step="any"
                    aria-label="Air temperature"
                  />
                  {errors.temperature && <p className="text-xs text-red-600 mt-1">{errors.temperature}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Unit</label>
                  <select
                    value={inputs.tempUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, tempUnit: e.target.value as TempUnit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_TEMP_UNITS.map((u) => (
                      <option key={u} value={u}>{TEMP_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Medium */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medium</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["dry-air", "helium", "hydrogen", "custom"] as Medium[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setInputs((p) => ({ ...p, medium: m }))}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                        inputs.medium === m
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {m === "dry-air"  && "🌬️ Dry Air"}
                      {m === "helium"   && "🎈 Helium"}
                      {m === "hydrogen" && "⚗️ Hydrogen"}
                      {m === "custom"   && "⚙️ Custom"}
                    </button>
                  ))}
                </div>
                {inputs.medium !== "custom" && (
                  <p className="text-xs text-gray-400 mt-1.5">
                    {inputs.medium === "dry-air"  && "γ = 1.4, R = 287.05 J/(kg·K) — Standard atmosphere"}
                    {inputs.medium === "helium"   && "γ = 1.667, R = 2,077 J/(kg·K) — Monatomic gas"}
                    {inputs.medium === "hydrogen" && "γ = 1.4, R = 4,124 J/(kg·K) — Diatomic, lightest gas"}
                  </p>
                )}
              </div>

              {/* Custom sound speed */}
              {inputs.medium === "custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Speed of Sound (m/s)
                    <span className="ml-1 text-xs text-gray-400" title="Enter the speed of sound in your custom medium">ⓘ</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.customSoundSpeed}
                      onChange={(e) => setInputs((p) => ({ ...p, customSoundSpeed: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono pr-16 ${errors.customSoundSpeed ? "border-red-300" : "border-gray-200"}`}
                      placeholder="343"
                      min="0"
                      step="any"
                      aria-label="Custom speed of sound"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">m/s</span>
                  </div>
                  {errors.customSoundSpeed && <p className="text-xs text-red-600 mt-1">{errors.customSoundSpeed}</p>}
                  <p className="text-xs text-gray-400 mt-1">Air ≈ 343 · Water ≈ 1,480 · Steel ≈ 5,100 · Diamond ≈ 12,000</p>
                </div>
              )}

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong>{" "}
                  <span className="font-mono text-xs">{result.formulaSubstituted} = <strong>{
                    isSoundMode
                      ? `${formatNum(result.speedOfSoundMs, inputs.precision)} m/s`
                      : inputs.mode === "mach"
                        ? `M ${formatNum(result.machNumber, inputs.precision)}`
                        : `${formatNum(result.speedMs, inputs.precision)} m/s`
                  }</strong></span>
                </div>
              )}

              <p className="text-xs text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>
            </div>

            {/* Mach Scale Visualization */}
            {result && !isSoundMode && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Mach Regime Indicator</h3>
                <div className="relative">
                  <div className="flex h-4 rounded-full overflow-hidden">
                    <div className="w-[40%]  bg-blue-200"   title="Subsonic M<0.8" />
                    <div className="w-[20%]  bg-yellow-200" title="Transonic M 0.8-1.2" />
                    <div className="w-[25%]  bg-red-200"    title="Supersonic M 1.2-5" />
                    <div className="flex-1   bg-purple-200" title="Hypersonic M>5" />
                  </div>
                  {machScalePosition !== null && (
                    <div
                      className="absolute top-0 w-4 h-4 rounded-full border-2 border-white shadow-md -translate-x-1/2 transition-all duration-300"
                      style={{
                        left: `${machScalePosition}%`,
                        backgroundColor:
                          result.classification === "subsonic"   ? "#3b82f6" :
                          result.classification === "transonic"  ? "#eab308" :
                          result.classification === "sonic"      ? "#f97316" :
                          result.classification === "supersonic" ? "#ef4444" : "#a855f7",
                      }}
                    />
                  )}
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span className="text-blue-700 font-medium">Subsonic<br />&lt;0.8</span>
                    <span className="text-yellow-700 font-medium text-center">Transonic<br />0.8–1.2</span>
                    <span className="text-red-700 font-medium text-center">Supersonic<br />1.2–5</span>
                    <span className="text-purple-700 font-medium text-right">Hypersonic<br />&gt;5</span>
                  </div>
                </div>
                <div className={`mt-4 p-3 rounded-lg border text-sm ${CLASSIFICATION_COLORS[result.classification]}`}>
                  <strong>{CLASSIFICATION_LABELS[result.classification]}:</strong>{" "}
                  {CLASSIFICATION_DESCRIPTIONS[result.classification]}
                </div>
              </div>
            )}

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {QUICK_PRESETS.map((p) => {
                  const active =
                    inputs.speed === p.speed &&
                    inputs.speedUnit === p.speedUnit &&
                    inputs.temperature === p.temperature;
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
            {result && !isSoundMode && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Speed Conversion Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Object Speed</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Speed of Sound</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">m/s</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.speedMs, inputs.precision)}</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.speedOfSoundMs, inputs.precision)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">km/h</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.speedKmh, inputs.precision)}</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.soundKmh, inputs.precision)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">mph</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.speedMph, inputs.precision)}</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.speedOfSoundMs * MS_TO_UNIT["mph"], inputs.precision)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">ft/s</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.speedFts, inputs.precision)}</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.speedOfSoundMs * MS_TO_UNIT["ft/s"], inputs.precision)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">knots</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.speedKnots, inputs.precision)}</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.speedOfSoundMs * MS_TO_UNIT["knots"], inputs.precision)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Speed of Sound breakdown — sound mode */}
            {result && isSoundMode && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Speed of Sound Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Speed of Sound</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {([
                        { unit: "m/s",   val: result.speedOfSoundMs },
                        { unit: "km/h",  val: result.soundKmh },
                        { unit: "mph",   val: result.speedOfSoundMs * MS_TO_UNIT["mph"] },
                        { unit: "ft/s",  val: result.speedOfSoundMs * MS_TO_UNIT["ft/s"] },
                        { unit: "knots", val: result.speedOfSoundMs * MS_TO_UNIT["knots"] },
                      ]).map(({ unit, val }, idx) => (
                        <tr key={unit} className={idx === 0 ? "bg-primary/5" : ""}>
                          <td className={`py-2 px-3 font-medium ${idx === 0 ? "text-primary" : "text-gray-700"}`}>{unit}</td>
                          <td className={`py-2 px-3 font-mono ${idx === 0 ? "font-semibold text-primary" : ""}`}>{formatNum(val, inputs.precision)}</td>
                        </tr>
                      ))}
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
                    M = v / a &nbsp;&nbsp;&nbsp;&nbsp; a = √(γ × R × T)
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">M — Mach Number</div>
                      <div className="text-blue-700 text-xs">Dimensionless ratio of object speed to speed of sound. M = 1 is sonic, &gt;1 is supersonic.</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">v — Object Speed</div>
                      <div className="text-orange-700 text-xs">True airspeed of the object in m/s. Faster speed → higher Mach number.</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">a — Speed of Sound</div>
                      <div className="text-green-700 text-xs">Depends on medium and temperature. At 20°C in dry air, a ≈ 343 m/s.</div>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="font-semibold text-purple-800 text-xs uppercase mb-1">T — Temperature (K)</div>
                      <div className="text-purple-700 text-xs">Higher temperature → faster speed of sound → lower Mach number for same speed.</div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 space-y-1">
                    <div className="flex justify-between"><span className="font-medium">M &lt; 0.8</span><span className="text-blue-700">Subsonic — no shock waves</span></div>
                    <div className="flex justify-between"><span className="font-medium">0.8 ≤ M ≤ 1.2</span><span className="text-yellow-700">Transonic — mixed flow, wave drag</span></div>
                    <div className="flex justify-between"><span className="font-medium">1.2 ≤ M &lt; 5</span><span className="text-red-700">Supersonic — shock waves form</span></div>
                    <div className="flex justify-between"><span className="font-medium">M ≥ 5</span><span className="text-purple-700">Hypersonic — extreme heating</span></div>
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
                            {entry.inputs.mode === "mach"
                              ? `v=${entry.inputs.speed} ${entry.inputs.speedUnit}`
                              : entry.inputs.mode === "speed"
                              ? `M=${entry.inputs.machNumber}`
                              : `T=${entry.inputs.temperature}°${entry.inputs.tempUnit}`}
                            {" "}· {entry.inputs.medium} · {entry.inputs.temperature}°{entry.inputs.tempUnit}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {entry.inputs.mode === "sound"
                            ? `a = ${formatNum(entry.result.speedOfSoundMs, 2)} m/s`
                            : `M = ${formatNum(entry.result.machNumber, 2)} (${CLASSIFICATION_LABELS[entry.result.classification]})`}
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

      <MachNumberCalculatorSEO />
      <RelatedTools
        currentTool="mach-number-calculator"
        tools={[
          "drag-force-calculator",
          "reynolds-number-calculator",
          "velocity-calculator",
          "bernoulli-equation-calculator",
          "flow-rate-calculator",
          "pressure-drop-calculator",
        ]}
      />
    </>
  );
}

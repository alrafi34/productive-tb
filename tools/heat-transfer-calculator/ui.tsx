"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  HeatTransferInputs,
  HeatTransferResult,
  HistoryEntry,
  TransferMode,
  AreaUnit,
  ThicknessUnit,
  ConductivityUnit,
  HeatCoeffUnit,
  TemperatureUnit,
  Precision,
} from "./types";
import {
  calculate,
  validatePositive,
  validateNonNegative,
  validateEmissivity,
  validateTemperature,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  AREA_LABELS,
  AREA_SHORT,
  THICKNESS_LABELS,
  THICKNESS_SHORT,
  K_LABELS,
  H_LABELS,
  TEMP_LABELS,
  ALL_AREA_UNITS,
  ALL_THICKNESS_UNITS,
  ALL_K_UNITS,
  ALL_H_UNITS,
  ALL_TEMP_UNITS,
  MATERIAL_PRESETS,
  CONVECTION_PRESETS,
} from "./logic";
import HeatTransferCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: HeatTransferInputs = {
  mode: "conduction",
  conduction: {
    k: "205",
    kUnit: "W/mK",
    area: "2",
    areaUnit: "m2",
    deltaT: "40",
    tempUnit: "F",
    thickness: "0.1",
    thicknessUnit: "m",
  },
  convection: {
    h: "25",
    hUnit: "W/m2K",
    area: "5",
    areaUnit: "m2",
    deltaT: "20",
    tempUnit: "F",
  },
  radiation: {
    emissivity: "0.9",
    area: "3",
    areaUnit: "m2",
    T1: "400",
    T2: "300",
    tempUnit: "K",
  },
  precision: 2,
};

const MODE_LABELS: Record<TransferMode, string> = {
  conduction: "Conduction",
  convection: "Convection",
  radiation:  "Radiation",
};

const MODE_ICONS: Record<TransferMode, string> = {
  conduction: "🔥",
  convection: "💨",
  radiation:  "☀️",
};

export default function HeatTransferCalculatorUI() {
  const [inputs,      setInputs]      = useState<HeatTransferInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<HeatTransferResult | null>(null);
  const [errors,      setErrors]      = useState<Record<string, string | null>>({});
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu,     setShowEdu]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstInputRef.current?.focus();
  }, []);

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const errs: Record<string, string | null> = {};
      if (inputs.mode === "conduction") {
        const c = inputs.conduction;
        errs.k         = validatePositive(c.k, "Thermal Conductivity");
        errs.area      = validatePositive(c.area, "Surface Area");
        errs.deltaT    = validatePositive(c.deltaT, "Temperature Difference");
        errs.thickness = validatePositive(c.thickness, "Material Thickness");
      } else if (inputs.mode === "convection") {
        const c = inputs.convection;
        errs.h      = validatePositive(c.h, "Heat Transfer Coefficient");
        errs.area   = validatePositive(c.area, "Surface Area");
        errs.deltaT = validatePositive(c.deltaT, "Temperature Difference");
      } else {
        const r = inputs.radiation;
        errs.emissivity = validateEmissivity(r.emissivity);
        errs.area       = validatePositive(r.area, "Surface Area");
        errs.T1         = validateTemperature(r.T1, "Surface Temperature (T₁)", r.tempUnit);
        errs.T2         = validateTemperature(r.T2, "Surrounding Temperature (T₂)", r.tempUnit);
      }
      setErrors(errs);
      const hasError = Object.values(errs).some(Boolean);
      if (hasError) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 120),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const setMode = (mode: TransferMode) => {
    setInputs((p) => ({ ...p, mode }));
    setResult(null);
    setErrors({});
  };

  const setCond = (patch: Partial<HeatTransferInputs["conduction"]>) =>
    setInputs((p) => ({ ...p, conduction: { ...p.conduction, ...patch } }));

  const setConv = (patch: Partial<HeatTransferInputs["convection"]>) =>
    setInputs((p) => ({ ...p, convection: { ...p.convection, ...patch } }));

  const setRad = (patch: Partial<HeatTransferInputs["radiation"]>) =>
    setInputs((p) => ({ ...p, radiation: { ...p.radiation, ...patch } }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    firstInputRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `Heat Transfer (${inputs.mode}): ${formatNum(result.Q_W, inputs.precision)} W | ${formatNum(result.Q_kW, inputs.precision)} kW | Formula: ${result.formula}`
    );
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
    downloadFile(exportToText(inputs, result), "heat-transfer-calculation.txt");
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
            <span className="text-2xl">🌡️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Heat Transfer Calculator</h3>
              <p className="text-sm text-blue-800">
                Select a heat transfer mode — conduction, convection, or radiation — enter your values, and get instant results with formula breakdowns and unit conversions.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Transfer Mode</p>
          <div className="flex gap-2 flex-wrap">
            {(["conduction", "convection", "radiation"] as TransferMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setMode(mode)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                  inputs.mode === mode
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <span>{MODE_ICONS[mode]}</span>
                {MODE_LABELS[mode]}
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
                Heat Transfer Rate
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? `${formatNum(result.Q_W, inputs.precision)} W` : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Watts (W)</span>
                    <span className="font-semibold">{formatNum(result.Q_W, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Kilowatts (kW)</span>
                    <span className="font-semibold">{formatNum(result.Q_kW, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">BTU/hr</span>
                    <span className="font-semibold">{formatNum(result.Q_BTU, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">kcal/hr</span>
                    <span className="font-semibold">{formatNum(result.Q_kcal, inputs.precision)}</span>
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

            {/* ── CONDUCTION INPUTS ──────────────────────────────────── */}
            {inputs.mode === "conduction" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Conduction Inputs</h3>

                {/* Material Presets */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Material Preset</p>
                  <div className="flex flex-wrap gap-2">
                    {MATERIAL_PRESETS.map((p) => {
                      const active = inputs.conduction.k === p.k && inputs.conduction.kUnit === p.kUnit;
                      return (
                        <button
                          key={p.label}
                          onClick={() => setCond({ k: p.k, kUnit: p.kUnit })}
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

                {/* k and unit */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thermal Conductivity (k)
                      <span className="ml-1 text-xs text-gray-400" title="Material's ability to conduct heat">ⓘ</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number" inputMode="decimal"
                      value={inputs.conduction.k}
                      onChange={(e) => setCond({ k: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.k ? "border-red-300" : "border-gray-200"}`}
                      placeholder="205" min="0" step="any" aria-label="Thermal conductivity"
                    />
                    {errors.k && <p className="text-xs text-red-600 mt-1">{errors.k}</p>}
                    <p className="text-xs text-gray-400 mt-1">Copper: 401 · Aluminum: 205 · Steel: 50</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Conductivity Unit</label>
                    <select
                      value={inputs.conduction.kUnit}
                      onChange={(e) => setCond({ kUnit: e.target.value as ConductivityUnit })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_K_UNITS.map((u) => <option key={u} value={u}>{K_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>

                {/* Area and unit */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Surface Area (A)
                      <span className="ml-1 text-xs text-gray-400" title="Cross-sectional area perpendicular to heat flow">ⓘ</span>
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.conduction.area}
                      onChange={(e) => setCond({ area: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.area ? "border-red-300" : "border-gray-200"}`}
                      placeholder="2" min="0" step="any" aria-label="Surface area"
                    />
                    {errors.area && <p className="text-xs text-red-600 mt-1">{errors.area}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                    <select
                      value={inputs.conduction.areaUnit}
                      onChange={(e) => setCond({ areaUnit: e.target.value as AreaUnit })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_AREA_UNITS.map((u) => <option key={u} value={u}>{AREA_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>

                {/* ΔT and unit */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temperature Difference (ΔT)
                      <span className="ml-1 text-xs text-gray-400" title="Temperature difference across the material">ⓘ</span>
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.conduction.deltaT}
                      onChange={(e) => setCond({ deltaT: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.deltaT ? "border-red-300" : "border-gray-200"}`}
                      placeholder="40" min="0" step="any" aria-label="Temperature difference"
                    />
                    {errors.deltaT && <p className="text-xs text-red-600 mt-1">{errors.deltaT}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Unit</label>
                    <select
                      value={inputs.conduction.tempUnit}
                      onChange={(e) => setCond({ tempUnit: e.target.value as TemperatureUnit })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_TEMP_UNITS.map((u) => <option key={u} value={u}>{TEMP_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>

                {/* Thickness and unit */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material Thickness (L)
                      <span className="ml-1 text-xs text-gray-400" title="Distance heat travels through the material">ⓘ</span>
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.conduction.thickness}
                      onChange={(e) => setCond({ thickness: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.thickness ? "border-red-300" : "border-gray-200"}`}
                      placeholder="0.1" min="0" step="any" aria-label="Material thickness"
                    />
                    {errors.thickness && <p className="text-xs text-red-600 mt-1">{errors.thickness}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thickness Unit</label>
                    <select
                      value={inputs.conduction.thicknessUnit}
                      onChange={(e) => setCond({ thicknessUnit: e.target.value as ThicknessUnit })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_THICKNESS_UNITS.map((u) => <option key={u} value={u}>{THICKNESS_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Formula:</strong> {result.formula}<br />
                    <span className="font-mono text-xs">{result.breakdown}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* ── CONVECTION INPUTS ──────────────────────────────────── */}
            {inputs.mode === "convection" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Convection Inputs</h3>

                {/* Scenario Presets */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Scenario Preset</p>
                  <div className="flex flex-wrap gap-2">
                    {CONVECTION_PRESETS.map((p) => {
                      const active = inputs.convection.h === p.h && inputs.convection.hUnit === p.hUnit;
                      return (
                        <button
                          key={p.label}
                          onClick={() => setConv({ h: p.h, hUnit: p.hUnit, area: p.area, areaUnit: p.areaUnit, deltaT: p.deltaT })}
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

                {/* h and unit */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heat Transfer Coefficient (h)
                      <span className="ml-1 text-xs text-gray-400" title="Convective heat transfer coefficient">ⓘ</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number" inputMode="decimal"
                      value={inputs.convection.h}
                      onChange={(e) => setConv({ h: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.h ? "border-red-300" : "border-gray-200"}`}
                      placeholder="25" min="0" step="any" aria-label="Heat transfer coefficient"
                    />
                    {errors.h && <p className="text-xs text-red-600 mt-1">{errors.h}</p>}
                    <p className="text-xs text-gray-400 mt-1">Natural air: 5–25 · Forced air: 25–250 · Water: 200–1000</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Coefficient Unit</label>
                    <select
                      value={inputs.convection.hUnit}
                      onChange={(e) => setConv({ hUnit: e.target.value as HeatCoeffUnit })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_H_UNITS.map((u) => <option key={u} value={u}>{H_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>

                {/* Area and unit */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Surface Area (A)</label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.convection.area}
                      onChange={(e) => setConv({ area: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.area ? "border-red-300" : "border-gray-200"}`}
                      placeholder="5" min="0" step="any" aria-label="Surface area"
                    />
                    {errors.area && <p className="text-xs text-red-600 mt-1">{errors.area}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                    <select
                      value={inputs.convection.areaUnit}
                      onChange={(e) => setConv({ areaUnit: e.target.value as AreaUnit })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_AREA_UNITS.map((u) => <option key={u} value={u}>{AREA_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>

                {/* ΔT and unit */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temperature Difference (ΔT)
                      <span className="ml-1 text-xs text-gray-400" title="Difference between surface and fluid temperature">ⓘ</span>
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.convection.deltaT}
                      onChange={(e) => setConv({ deltaT: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.deltaT ? "border-red-300" : "border-gray-200"}`}
                      placeholder="20" min="0" step="any" aria-label="Temperature difference"
                    />
                    {errors.deltaT && <p className="text-xs text-red-600 mt-1">{errors.deltaT}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Unit</label>
                    <select
                      value={inputs.convection.tempUnit}
                      onChange={(e) => setConv({ tempUnit: e.target.value as TemperatureUnit })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_TEMP_UNITS.map((u) => <option key={u} value={u}>{TEMP_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Formula:</strong> {result.formula}<br />
                    <span className="font-mono text-xs">{result.breakdown}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
              </div>
            )}

            {/* ── RADIATION INPUTS ───────────────────────────────────── */}
            {inputs.mode === "radiation" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h3 className="font-semibold text-gray-800">Radiation Inputs</h3>

                {/* Emissivity slider + input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Emissivity (ε)
                      <span className="ml-1 text-xs text-gray-400" title="Ratio of emitted radiation to blackbody radiation (0–1)">ⓘ</span>
                    </label>
                    <span className="text-sm font-mono font-semibold text-primary">{inputs.radiation.emissivity}</span>
                  </div>
                  <input
                    type="range" min={0} max={1} step={0.01}
                    value={parseFloat(inputs.radiation.emissivity) || 0}
                    onChange={(e) => setRad({ emissivity: e.target.value })}
                    className="w-full accent-primary mb-2"
                    aria-label="Emissivity slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>0 (perfect reflector)</span>
                    <span>0.5</span>
                    <span>1 (blackbody)</span>
                  </div>
                  <input
                    ref={firstInputRef}
                    type="number" inputMode="decimal"
                    value={inputs.radiation.emissivity}
                    onChange={(e) => setRad({ emissivity: e.target.value })}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.emissivity ? "border-red-300" : "border-gray-200"}`}
                    placeholder="0.9" min="0" max="1" step="0.01" aria-label="Emissivity value"
                  />
                  {errors.emissivity && <p className="text-xs text-red-600 mt-1">{errors.emissivity}</p>}
                  <p className="text-xs text-gray-400 mt-1">Polished metal: 0.05 · Painted surface: 0.9 · Blackbody: 1.0</p>
                </div>

                {/* Area and unit */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Surface Area (A)</label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.radiation.area}
                      onChange={(e) => setRad({ area: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.area ? "border-red-300" : "border-gray-200"}`}
                      placeholder="3" min="0" step="any" aria-label="Surface area"
                    />
                    {errors.area && <p className="text-xs text-red-600 mt-1">{errors.area}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                    <select
                      value={inputs.radiation.areaUnit}
                      onChange={(e) => setRad({ areaUnit: e.target.value as AreaUnit })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_AREA_UNITS.map((u) => <option key={u} value={u}>{AREA_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>

                {/* Temperature unit selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Unit</label>
                  <select
                    value={inputs.radiation.tempUnit}
                    onChange={(e) => setRad({ tempUnit: e.target.value as TemperatureUnit })}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                  >
                    {ALL_TEMP_UNITS.map((u) => <option key={u} value={u}>{TEMP_LABELS[u]}</option>)}
                  </select>
                  {inputs.radiation.tempUnit !== "K" && (
                    <p className="text-xs text-amber-600 mt-1">⚠️ Temperatures will be converted to Kelvin for calculation.</p>
                  )}
                </div>

                {/* T1 and T2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Surface Temperature (T₁)
                      <span className="ml-1 text-xs text-gray-400" title="Temperature of the radiating surface">ⓘ</span>
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.radiation.T1}
                      onChange={(e) => setRad({ T1: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.T1 ? "border-red-300" : "border-gray-200"}`}
                      placeholder="400" step="any" aria-label="Surface temperature T1"
                    />
                    {errors.T1 && <p className="text-xs text-red-600 mt-1">{errors.T1}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Surrounding Temperature (T₂)
                      <span className="ml-1 text-xs text-gray-400" title="Temperature of the surrounding environment">ⓘ</span>
                    </label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.radiation.T2}
                      onChange={(e) => setRad({ T2: e.target.value })}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.T2 ? "border-red-300" : "border-gray-200"}`}
                      placeholder="300" step="any" aria-label="Surrounding temperature T2"
                    />
                    {errors.T2 && <p className="text-xs text-red-600 mt-1">{errors.T2}</p>}
                  </div>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Formula:</strong> {result.formula}<br />
                    <span className="font-mono text-xs">{result.breakdown}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500">Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset</p>
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
                        <td className="py-2 px-3 font-medium text-primary">W</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.Q_W, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Watts (SI standard)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">kW</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.Q_kW, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilowatts</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">BTU/hr</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.Q_BTU, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">British Thermal Units per hour (US)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">kcal/hr</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.Q_kcal, inputs.precision)}</td>
                        <td className="py-2 px-3 text-gray-500">Kilocalories per hour</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {result.interpretation && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                    <strong>Interpretation:</strong> {result.interpretation}
                  </div>
                )}
              </div>
            )}

            {/* Educational Formula Panel */}
            {showEdu && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formulas & Explanation</h3>
                <div className="space-y-4 text-sm text-gray-700">

                  {/* Conduction */}
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-2">🔥 Conduction — Fourier&apos;s Law</div>
                    <div className="font-mono text-center bg-white border border-gray-200 rounded p-2 mb-2">Q = (k × A × ΔT) / L</div>
                    <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-600">
                      <span><strong>k</strong> — Thermal conductivity (W/m·K)</span>
                      <span><strong>A</strong> — Surface area (m²)</span>
                      <span><strong>ΔT</strong> — Temperature difference (K or °C)</span>
                      <span><strong>L</strong> — Material thickness (m)</span>
                    </div>
                  </div>

                  {/* Convection */}
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-2">💨 Convection — Newton&apos;s Law of Cooling</div>
                    <div className="font-mono text-center bg-white border border-gray-200 rounded p-2 mb-2">Q = h × A × ΔT</div>
                    <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-600">
                      <span><strong>h</strong> — Heat transfer coefficient (W/m²·K)</span>
                      <span><strong>A</strong> — Surface area (m²)</span>
                      <span><strong>ΔT</strong> — Temperature difference (K or °C)</span>
                    </div>
                  </div>

                  {/* Radiation */}
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="font-semibold text-gray-800 mb-2">☀️ Radiation — Stefan-Boltzmann Law</div>
                    <div className="font-mono text-center bg-white border border-gray-200 rounded p-2 mb-2">Q = ε × σ × A × (T₁⁴ − T₂⁴)</div>
                    <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-600">
                      <span><strong>ε</strong> — Emissivity (0–1)</span>
                      <span><strong>σ</strong> — 5.67×10⁻⁸ W/m²·K⁴</span>
                      <span><strong>T₁</strong> — Surface temperature (K)</span>
                      <span><strong>T₂</strong> — Surrounding temperature (K)</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                    <strong>Note:</strong> For radiation, temperatures must be in Kelvin. The calculator automatically converts °C and °F to K before computing.
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
                          <span className="font-semibold text-gray-900 text-sm capitalize">
                            {MODE_ICONS[entry.inputs.mode]} {entry.inputs.mode}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          Q = {formatNum(entry.result.Q_W, 2)} W ({formatNum(entry.result.Q_kW, 4)} kW)
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

      <HeatTransferCalculatorSEO />
      <RelatedTools
        currentTool="heat-transfer-calculator"
        tools={[
          "thermal-stress-calculator",
          "thermal-expansion-calculator",
          "specific-heat-calculator",
          "thermal-efficiency-calculator",
          "reynolds-number-calculator",
          "ideal-gas-law-calculator",
        ]}
      />
    </>
  );
}

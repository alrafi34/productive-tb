"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  HydraulicInputs,
  HydraulicResult,
  HistoryEntry,
  CalcMode,
  ForceUnit,
  AreaUnit,
  PressureUnit,
  DiameterUnit,
  Precision,
} from "./types";
import {
  calculate,
  validateForce,
  validateArea,
  validatePressure,
  validateDiameter,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  FORCE_LABELS,
  FORCE_SHORT,
  AREA_LABELS,
  AREA_SHORT,
  PRESSURE_LABELS,
  PRESSURE_SHORT,
  DIAM_LABELS,
  DIAM_SHORT,
  ALL_FORCE_UNITS,
  ALL_AREA_UNITS,
  ALL_PRESSURE_UNITS,
  ALL_DIAM_UNITS,
} from "./logic";
import HydraulicPressureCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets (US defaults) ──────────────────────────────────────────────────
const PRESETS = [
  { label: "Hydraulic Jack",    mode: "pressure" as CalcMode, force: "5000",  forceUnit: "N"   as ForceUnit, area: "50",   areaUnit: "cm2" as AreaUnit, pressure: "100", pressureUnit: "kPa" as PressureUnit, diameter: "50", diameterUnit: "mm" as DiameterUnit },
  { label: "Industrial Press",  mode: "force"    as CalcMode, force: "10000", forceUnit: "N"   as ForceUnit, area: "0.01", areaUnit: "m2"  as AreaUnit, pressure: "3000", pressureUnit: "psi" as PressureUnit, diameter: "50", diameterUnit: "mm" as DiameterUnit },
  { label: "Automotive Brake",  mode: "pressure" as CalcMode, force: "500",   forceUnit: "N"   as ForceUnit, area: "20",   areaUnit: "cm2" as AreaUnit, pressure: "250", pressureUnit: "bar" as PressureUnit, diameter: "50", diameterUnit: "mm" as DiameterUnit },
  { label: "Excavator Cylinder",mode: "force"    as CalcMode, force: "50000", forceUnit: "N"   as ForceUnit, area: "200",  areaUnit: "cm2" as AreaUnit, pressure: "250", pressureUnit: "bar" as PressureUnit, diameter: "50", diameterUnit: "mm" as DiameterUnit },
];

const DEFAULT_INPUTS: HydraulicInputs = {
  mode:         "pressure",
  force:        "1000",
  forceUnit:    "N",
  area:         "0.01",
  areaUnit:     "m2",
  pressure:     "100",
  pressureUnit: "kPa",
  diameter:     "50",
  diameterUnit: "mm",
  precision:    2,
};

const MODE_OPTIONS: { value: CalcMode; label: string }[] = [
  { value: "pressure", label: "Calculate Pressure" },
  { value: "force",    label: "Calculate Force" },
  { value: "area",     label: "Calculate Area" },
  { value: "diameter", label: "Calculate Piston Diameter" },
];

export default function HydraulicPressureCalculatorUI() {
  const [inputs,      setInputs]      = useState<HydraulicInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<HydraulicResult | null>(null);
  const [forceErr,    setForceErr]    = useState<string | null>(null);
  const [areaErr,     setAreaErr]     = useState<string | null>(null);
  const [pressureErr, setPressureErr] = useState<string | null>(null);
  const [diamErr,     setDiamErr]     = useState<string | null>(null);
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu,     setShowEdu]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstRef.current?.focus();
  }, []);

  // ── Debounced calculation ────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const fe = validateForce(inputs.force);
      const ae = validateArea(inputs.area);
      const pe = validatePressure(inputs.pressure);
      const de = validateDiameter(inputs.diameter);

      if (inputs.mode === "pressure") {
        setForceErr(fe); setAreaErr(ae); setPressureErr(null); setDiamErr(null);
        if (fe || ae) { setResult(null); return; }
      } else if (inputs.mode === "force") {
        setPressureErr(pe); setAreaErr(ae); setForceErr(null); setDiamErr(null);
        if (pe || ae) { setResult(null); return; }
      } else if (inputs.mode === "area") {
        setForceErr(fe); setPressureErr(pe); setAreaErr(null); setDiamErr(null);
        if (fe || pe) { setResult(null); return; }
      } else if (inputs.mode === "diameter") {
        setForceErr(fe); setPressureErr(pe); setAreaErr(null); setDiamErr(de);
        if (fe || pe) { setResult(null); return; }
      }
      setResult(calculate(inputs));
    }, 120),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, ...p }));
    firstRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setForceErr(null); setAreaErr(null); setPressureErr(null); setDiamErr(null);
    firstRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    let text = "";
    if (inputs.mode === "pressure") text = `Pressure: ${formatNum(result.pressureKPa, inputs.precision)} kPa | ${formatNum(result.pressureBar, inputs.precision)} bar | ${formatNum(result.pressurePsi, inputs.precision)} PSI`;
    else if (inputs.mode === "force") text = `Force: ${formatNum(result.forceN, inputs.precision)} N | ${formatNum(result.forceLbf, inputs.precision)} lbf`;
    else if (inputs.mode === "area") text = `Area: ${formatNum(result.areaCm2, inputs.precision)} cm² | ${formatNum(result.areaIn2, inputs.precision)} in²`;
    else text = `Diameter: ${formatNum(result.diameterMm, inputs.precision)} mm | ${formatNum(result.diameterIn, inputs.precision)} in`;
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
    downloadFile(exportToText(inputs, result), "hydraulic-pressure-calculation.txt");
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

  // ── Primary result display helpers ────────────────────────────────────────
  const primaryLabel = inputs.mode === "pressure" ? "Hydraulic Pressure"
    : inputs.mode === "force" ? "Hydraulic Force"
    : inputs.mode === "area"  ? "Piston Area"
    : "Piston Diameter";

  const primaryValue = result
    ? inputs.mode === "pressure" ? `${formatNum(result.pressureKPa, inputs.precision)} kPa`
    : inputs.mode === "force"    ? `${formatNum(result.forceN, inputs.precision)} N`
    : inputs.mode === "area"     ? `${formatNum(result.areaCm2, inputs.precision)} cm²`
    : `${formatNum(result.diameterMm, inputs.precision)} mm`
    : "—";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔩</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Hydraulic Pressure Calculator (P = F / A)</h3>
              <p className="text-sm text-blue-800">
                Calculate hydraulic pressure, force, piston area, or diameter using Pascal&apos;s Law.
                Supports Pa, kPa, MPa, bar, PSI, Newtons, lbf, and more with real-time unit conversion.
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
                {primaryLabel}
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {primaryValue}
              </div>

              {result && inputs.mode === "pressure" && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between"><span className="text-primary-100">Pa</span><span className="font-semibold">{formatNum(result.pressurePa, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">kPa</span><span className="font-semibold">{formatNum(result.pressureKPa, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">MPa</span><span className="font-semibold">{formatNum(result.pressureMPa, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">bar</span><span className="font-semibold">{formatNum(result.pressureBar, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">PSI</span><span className="font-semibold">{formatNum(result.pressurePsi, inputs.precision)}</span></div>
                </div>
              )}
              {result && inputs.mode === "force" && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between"><span className="text-primary-100">N</span><span className="font-semibold">{formatNum(result.forceN, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">kN</span><span className="font-semibold">{formatNum(result.forceKN, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">lbf</span><span className="font-semibold">{formatNum(result.forceLbf, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">tonf</span><span className="font-semibold">{formatNum(result.forceTonf, inputs.precision)}</span></div>
                </div>
              )}
              {result && inputs.mode === "area" && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between"><span className="text-primary-100">m²</span><span className="font-semibold">{formatNum(result.areaM2, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">cm²</span><span className="font-semibold">{formatNum(result.areaCm2, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">mm²</span><span className="font-semibold">{formatNum(result.areaMm2, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">in²</span><span className="font-semibold">{formatNum(result.areaIn2, inputs.precision)}</span></div>
                </div>
              )}
              {result && inputs.mode === "diameter" && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between"><span className="text-primary-100">mm</span><span className="font-semibold">{formatNum(result.diameterMm, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">cm</span><span className="font-semibold">{formatNum(result.diameterCm, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">m</span><span className="font-semibold">{formatNum(result.diameterM, inputs.precision)}</span></div>
                  <div className="flex justify-between"><span className="text-primary-100">in</span><span className="font-semibold">{formatNum(result.diameterIn, inputs.precision)}</span></div>
                </div>
              )}

              <div className="space-y-2">
                <button onClick={handleCopy} disabled={!result}
                  className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed">
                  {copied ? "✓ Copied!" : "📋 Copy Result"}
                </button>
                <button onClick={handleSave} disabled={!result}
                  className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
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
              <button onClick={handleReset}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ↺ Reset
              </button>
              <button onClick={() => setShowEdu(!showEdu)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📖 {showEdu ? "Hide" : "Show"} Formula
              </button>
              <button onClick={() => setShowHistory(!showHistory)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📜 {showHistory ? "Hide" : "Show"} History
              </button>
              {result && (
                <button onClick={handleExport}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📄 Export TXT
                </button>
              )}
            </div>
          </div>

          {/* ── Right Panel ────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Calculation Mode */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
                <select
                  value={inputs.mode}
                  onChange={(e) => setInputs((p) => ({ ...p, mode: e.target.value as CalcMode }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  aria-label="Calculation mode"
                >
                  {MODE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Force input — shown when mode needs it */}
              {(inputs.mode === "pressure" || inputs.mode === "area" || inputs.mode === "diameter") && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Force
                      <span className="ml-1 text-xs text-gray-400" title="Applied hydraulic force">ⓘ</span>
                    </label>
                    <input
                      ref={inputs.mode === "pressure" ? firstRef : undefined}
                      type="number" inputMode="decimal"
                      value={inputs.force}
                      onChange={(e) => setInputs((p) => ({ ...p, force: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${forceErr ? "border-red-300" : "border-gray-200"}`}
                      placeholder="1000" min="0" step="any" aria-label="Force value"
                    />
                    {forceErr && <p className="text-xs text-red-600 mt-1">{forceErr}</p>}
                    <p className="text-xs text-gray-400 mt-1">e.g. 1000 N, 500 lbf</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Force Unit</label>
                    <select
                      value={inputs.forceUnit}
                      onChange={(e) => setInputs((p) => ({ ...p, forceUnit: e.target.value as ForceUnit }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_FORCE_UNITS.map((u) => <option key={u} value={u}>{FORCE_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Area input — shown when mode needs it */}
              {(inputs.mode === "pressure" || inputs.mode === "force") && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Piston Area
                      <span className="ml-1 text-xs text-gray-400" title="Cross-sectional area of the piston">ⓘ</span>
                    </label>
                    <input
                      ref={inputs.mode === "force" ? firstRef : undefined}
                      type="number" inputMode="decimal"
                      value={inputs.area}
                      onChange={(e) => setInputs((p) => ({ ...p, area: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${areaErr ? "border-red-300" : "border-gray-200"}`}
                      placeholder="0.01" min="0" step="any" aria-label="Area value"
                    />
                    {areaErr && <p className="text-xs text-red-600 mt-1">{areaErr}</p>}
                    <p className="text-xs text-gray-400 mt-1">e.g. 0.01 m², 50 cm²</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                    <select
                      value={inputs.areaUnit}
                      onChange={(e) => setInputs((p) => ({ ...p, areaUnit: e.target.value as AreaUnit }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_AREA_UNITS.map((u) => <option key={u} value={u}>{AREA_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Pressure input — shown when mode needs it */}
              {(inputs.mode === "force" || inputs.mode === "area" || inputs.mode === "diameter") && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pressure
                      <span className="ml-1 text-xs text-gray-400" title="System hydraulic pressure">ⓘ</span>
                    </label>
                    <input
                      ref={inputs.mode === "area" || inputs.mode === "diameter" ? firstRef : undefined}
                      type="number" inputMode="decimal"
                      value={inputs.pressure}
                      onChange={(e) => setInputs((p) => ({ ...p, pressure: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${pressureErr ? "border-red-300" : "border-gray-200"}`}
                      placeholder="100" min="0" step="any" aria-label="Pressure value"
                    />
                    {pressureErr && <p className="text-xs text-red-600 mt-1">{pressureErr}</p>}
                    <p className="text-xs text-gray-400 mt-1">e.g. 3000 PSI, 250 bar</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pressure Unit</label>
                    <select
                      value={inputs.pressureUnit}
                      onChange={(e) => setInputs((p) => ({ ...p, pressureUnit: e.target.value as PressureUnit }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {ALL_PRESSURE_UNITS.map((u) => <option key={u} value={u}>{PRESSURE_LABELS[u]}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Live formula display */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong> {result.formula}
                </div>
              )}

              {/* Contextual summary */}
              {result && inputs.mode === "pressure" && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  A force of <strong>{formatNum(result.forceN, 2)} N</strong> applied over <strong>{formatNum(result.areaCm2, 2)} cm²</strong> generates <strong>{formatNum(result.pressureBar, inputs.precision)} bar</strong> ({formatNum(result.pressurePsi, inputs.precision)} PSI) of hydraulic pressure.
                </div>
              )}
              {result && inputs.mode === "force" && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  At <strong>{formatNum(result.pressureBar, 2)} bar</strong> over <strong>{formatNum(result.areaCm2, 2)} cm²</strong>, the hydraulic cylinder produces <strong>{formatNum(result.forceN, inputs.precision)} N</strong> ({formatNum(result.forceLbf, inputs.precision)} lbf) of force.
                </div>
              )}
              {result && (inputs.mode === "area" || inputs.mode === "diameter") && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  To achieve <strong>{formatNum(result.forceN, 2)} N</strong> at <strong>{formatNum(result.pressureBar, 2)} bar</strong>, you need a piston area of <strong>{formatNum(result.areaCm2, inputs.precision)} cm²</strong> (diameter ≈ <strong>{formatNum(result.diameterMm, inputs.precision)} mm</strong>).
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
                  const active = inputs.mode === p.mode && inputs.force === p.force && inputs.forceUnit === p.forceUnit;
                  return (
                    <button key={p.label} onClick={() => handlePreset(p)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        active ? "bg-primary text-white border-primary" : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}>
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Breakdown Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Full Unit Conversion Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary" rowSpan={5}>Pressure</td>
                        <td className="py-2 px-3 font-medium text-primary">Pa</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.pressurePa, inputs.precision)}</td>
                      </tr>
                      <tr><td className="py-2 px-3 text-gray-700">kPa</td><td className="py-2 px-3 font-mono">{formatNum(result.pressureKPa, inputs.precision)}</td></tr>
                      <tr><td className="py-2 px-3 text-gray-700">MPa</td><td className="py-2 px-3 font-mono">{formatNum(result.pressureMPa, inputs.precision)}</td></tr>
                      <tr><td className="py-2 px-3 text-gray-700">bar</td><td className="py-2 px-3 font-mono">{formatNum(result.pressureBar, inputs.precision)}</td></tr>
                      <tr><td className="py-2 px-3 text-gray-700">PSI</td><td className="py-2 px-3 font-mono">{formatNum(result.pressurePsi, inputs.precision)}</td></tr>
                      <tr className="bg-blue-50/50">
                        <td className="py-2 px-3 font-medium text-blue-700" rowSpan={4}>Force</td>
                        <td className="py-2 px-3 font-medium text-blue-700">N</td>
                        <td className="py-2 px-3 font-mono font-semibold text-blue-700">{formatNum(result.forceN, inputs.precision)}</td>
                      </tr>
                      <tr><td className="py-2 px-3 text-gray-700">kN</td><td className="py-2 px-3 font-mono">{formatNum(result.forceKN, inputs.precision)}</td></tr>
                      <tr><td className="py-2 px-3 text-gray-700">lbf</td><td className="py-2 px-3 font-mono">{formatNum(result.forceLbf, inputs.precision)}</td></tr>
                      <tr><td className="py-2 px-3 text-gray-700">tonf</td><td className="py-2 px-3 font-mono">{formatNum(result.forceTonf, inputs.precision)}</td></tr>
                      <tr className="bg-green-50/50">
                        <td className="py-2 px-3 font-medium text-green-700" rowSpan={4}>Area</td>
                        <td className="py-2 px-3 font-medium text-green-700">m²</td>
                        <td className="py-2 px-3 font-mono font-semibold text-green-700">{formatNum(result.areaM2, inputs.precision)}</td>
                      </tr>
                      <tr><td className="py-2 px-3 text-gray-700">cm²</td><td className="py-2 px-3 font-mono">{formatNum(result.areaCm2, inputs.precision)}</td></tr>
                      <tr><td className="py-2 px-3 text-gray-700">mm²</td><td className="py-2 px-3 font-mono">{formatNum(result.areaMm2, inputs.precision)}</td></tr>
                      <tr><td className="py-2 px-3 text-gray-700">in²</td><td className="py-2 px-3 font-mono">{formatNum(result.areaIn2, inputs.precision)}</td></tr>
                      <tr className="bg-orange-50/50">
                        <td className="py-2 px-3 font-medium text-orange-700" rowSpan={4}>Diameter</td>
                        <td className="py-2 px-3 font-medium text-orange-700">mm</td>
                        <td className="py-2 px-3 font-mono font-semibold text-orange-700">{formatNum(result.diameterMm, inputs.precision)}</td>
                      </tr>
                      <tr><td className="py-2 px-3 text-gray-700">cm</td><td className="py-2 px-3 font-mono">{formatNum(result.diameterCm, inputs.precision)}</td></tr>
                      <tr><td className="py-2 px-3 text-gray-700">m</td><td className="py-2 px-3 font-mono">{formatNum(result.diameterM, inputs.precision)}</td></tr>
                      <tr><td className="py-2 px-3 text-gray-700">in</td><td className="py-2 px-3 font-mono">{formatNum(result.diameterIn, inputs.precision)}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Educational Formula Panel */}
            {showEdu && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formulas & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">P = F / A</div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">F = P × A</div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">A = F / P</div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">d = √(4A / π)</div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">P (Pressure)</div>
                      <div className="text-blue-700 text-xs">Force per unit area. SI unit: Pascal (Pa). Common: bar, PSI, MPa.</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">F (Force)</div>
                      <div className="text-orange-700 text-xs">Applied or output force. SI unit: Newton (N). Also: kN, lbf, tonf.</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">A (Area)</div>
                      <div className="text-green-700 text-xs">Piston cross-sectional area. SI unit: m². Also: cm², mm², in².</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Pascal&apos;s Law:</strong> Pressure applied to a confined fluid is transmitted equally in all directions. This principle is the foundation of all hydraulic systems — from car brakes to industrial presses.
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
                      <div key={entry.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => loadFromHistory(entry)}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm capitalize">{entry.inputs.mode}</span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {entry.inputs.mode === "pressure" && `${formatNum(entry.result.pressureKPa, 2)} kPa | ${formatNum(entry.result.pressureBar, 2)} bar`}
                          {entry.inputs.mode === "force"    && `${formatNum(entry.result.forceN, 2)} N | ${formatNum(entry.result.forceLbf, 2)} lbf`}
                          {entry.inputs.mode === "area"     && `${formatNum(entry.result.areaCm2, 2)} cm²`}
                          {entry.inputs.mode === "diameter" && `${formatNum(entry.result.diameterMm, 2)} mm`}
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

      <HydraulicPressureCalculatorSEO />
      <RelatedTools
        currentTool="hydraulic-pressure-calculator"
        tools={[
          "pressure-drop-calculator",
          "flow-rate-calculator",
          "pump-efficiency-calculator",
          "force-calculator",
          "stress-calculator",
          "bernoulli-equation-calculator",
        ]}
      />
    </>
  );
}

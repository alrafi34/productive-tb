"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { BoltLoadInputs, BoltLoadResult, HistoryEntry, BoltGrade, Precision } from "./types";
import {
  calculate,
  validateDiameter,
  validateYieldStrength,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  GRADE_DATA,
  ALL_GRADES,
} from "./logic";
import BoltLoadCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS = [
  { label: "M12 Grade 8.8",  diameter: "12",  diameterUnit: "mm" as const, unitSystem: "metric"   as const, grade: "8.8"    as BoltGrade, yieldStrength: "640",  tighteningPercent: 75, externalLoad: "0" },
  { label: "M16 Grade 10.9", diameter: "16",  diameterUnit: "mm" as const, unitSystem: "metric"   as const, grade: "10.9"   as BoltGrade, yieldStrength: "900",  tighteningPercent: 75, externalLoad: "0" },
  { label: "M20 Grade 12.9", diameter: "20",  diameterUnit: "mm" as const, unitSystem: "metric"   as const, grade: "12.9"   as BoltGrade, yieldStrength: "1080", tighteningPercent: 80, externalLoad: "0" },
  { label: '1/2" Grade 8',   diameter: "0.5", diameterUnit: "in" as const, unitSystem: "imperial" as const, grade: "grade8" as BoltGrade, yieldStrength: "130000", tighteningPercent: 75, externalLoad: "0" },
];

const DEFAULT_INPUTS: BoltLoadInputs = {
  diameter: "12",
  diameterUnit: "mm",
  unitSystem: "metric",
  grade: "8.8",
  yieldStrength: "640",
  tighteningPercent: 75,
  externalLoad: "0",
  threadType: "coarse",
  customPitch: "",
  safetyFactor: "2.0",
  precision: 2,
};

export default function BoltLoadCalculatorUI() {
  const [inputs, setInputs] = useState<BoltLoadInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<BoltLoadResult | null>(null);
  const [diamErr, setDiamErr] = useState<string | null>(null);
  const [syErr, setSyErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEdu, setShowEdu] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const diamRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    diamRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const de = validateDiameter(inputs.diameter);
      const se = validateYieldStrength(inputs.yieldStrength);
      setDiamErr(de);
      setSyErr(se);
      if (de || se) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const handleGradeChange = (grade: BoltGrade) => {
    const data = GRADE_DATA[grade];
    const isMetric = inputs.unitSystem === "metric";
    const sy = grade === "custom"
      ? inputs.yieldStrength
      : isMetric
        ? String(data.yieldStrengthMPa)
        : String(Math.round(data.yieldStrengthMPa * 145.038));
    setInputs(p => ({ ...p, grade, yieldStrength: sy }));
  };

  const handleUnitSystemChange = (unitSystem: "metric" | "imperial") => {
    const isNowMetric = unitSystem === "metric";
    const currentSy = parseFloat(inputs.yieldStrength) || 0;
    const convertedSy = isNowMetric
      ? String(Math.round(currentSy * 0.00689476 * 100) / 100)
      : String(Math.round(currentSy * 145.038));
    const newDiamUnit = isNowMetric ? "mm" as const : "in" as const;
    const currentDiam = parseFloat(inputs.diameter) || 0;
    const convertedDiam = isNowMetric
      ? String(Math.round(currentDiam * 25.4 * 10) / 10)
      : String(Math.round(currentDiam / 25.4 * 1000) / 1000);
    setInputs(p => ({
      ...p,
      unitSystem,
      diameterUnit: newDiamUnit,
      diameter: convertedDiam,
      yieldStrength: convertedSy,
    }));
  };

  const handlePreset = (preset: typeof PRESETS[0]) => {
    setInputs(p => ({
      ...p,
      diameter: preset.diameter,
      diameterUnit: preset.diameterUnit,
      unitSystem: preset.unitSystem,
      grade: preset.grade,
      yieldStrength: preset.yieldStrength,
      tighteningPercent: preset.tighteningPercent,
      externalLoad: preset.externalLoad,
    }));
    diamRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setDiamErr(null);
    setSyErr(null);
    diamRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const isMetric = inputs.unitSystem === "metric";
    const text = [
      `Bolt Diameter: ${inputs.diameter} ${inputs.diameterUnit}`,
      `Grade: ${GRADE_DATA[inputs.grade].label}`,
      `Preload Force: ${formatNum(result.preloadForcekN, inputs.precision)} kN`,
      `Clamp Load: ${formatNum(result.clampLoadkN, inputs.precision)} kN`,
      `Tensile Stress: ${formatNum(result.tensileStressMPa, inputs.precision)} MPa`,
      `Safety Factor: ${formatNum(result.safetyFactor, inputs.precision)}`,
      `Status: ${result.statusLabel}`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleExportTxt = () => {
    if (!result) return;
    downloadFile(exportToText(inputs, result), "bolt-load-calculation.txt");
  };

  const handleExportCSV = () => {
    if (!result) return;
    downloadFile(exportToCSV(inputs, result), "bolt-load-calculation.csv", "text/csv");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const isMetric = inputs.unitSystem === "metric";
  const syUnit = isMetric ? "MPa" : "psi";
  const forceUnit = isMetric ? "kN" : "lbf";
  const primaryPreload = result
    ? (isMetric ? result.preloadForcekN : result.preloadForceLbf)
    : null;
  const primaryClamp = result
    ? (isMetric ? result.clampLoadkN : result.clampLoadLbf)
    : null;

  const statusColors = {
    safe:    { bg: "bg-green-50",  border: "border-green-200",  text: "text-green-800",  badge: "bg-green-100 text-green-800" },
    warning: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800", badge: "bg-yellow-100 text-yellow-800" },
    danger:  { bg: "bg-red-50",    border: "border-red-200",    text: "text-red-800",    badge: "bg-red-100 text-red-800" },
  };
  const sc = result ? statusColors[result.status] : statusColors.safe;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔩</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Bolt Load Calculator</h3>
              <p className="text-sm text-blue-800">
                Enter bolt diameter and grade to instantly calculate preload force, clamp load, tensile stress, and safety factor. Supports metric (ISO) and imperial (ASTM) bolt standards.
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
                Bolt Preload Force
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {primaryPreload !== null
                  ? `${formatNum(primaryPreload, inputs.precision)} ${forceUnit}`
                  : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1.5 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Preload (kN)</span>
                    <span className="font-semibold">{formatNum(result.preloadForcekN, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Preload (lbf)</span>
                    <span className="font-semibold">{formatNum(result.preloadForceLbf, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Clamp Load (kN)</span>
                    <span className="font-semibold">{formatNum(result.clampLoadkN, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Stress Area (mm²)</span>
                    <span className="font-semibold">{formatNum(result.stressAreaMm2, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Safety Factor</span>
                    <span className="font-semibold">{formatNum(result.safetyFactor, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-primary-100">Status</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sc.badge}`}>
                      {result.statusLabel}
                    </span>
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
                  onChange={(e) => setInputs(p => ({ ...p, precision: parseInt(e.target.value) as Precision }))}
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
                <>
                  <button onClick={handleExportTxt} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                    📄 Export TXT
                  </button>
                  <button onClick={handleExportCSV} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                    📊 Export CSV
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ── Right Panel ────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Main Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Enter Values</h3>

              {/* Unit System Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
                <div className="flex gap-3">
                  {(["metric", "imperial"] as const).map((sys) => (
                    <button
                      key={sys}
                      onClick={() => handleUnitSystemChange(sys)}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                        inputs.unitSystem === sys
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {sys === "metric" ? "⚙️ Metric (mm, MPa, kN)" : "🔧 Imperial (in, psi, lbf)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Diameter + Grade */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bolt Diameter ({inputs.diameterUnit})
                    <span className="ml-1 text-xs text-gray-400" title="Nominal bolt diameter">ⓘ</span>
                  </label>
                  <input
                    ref={diamRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.diameter}
                    onChange={(e) => setInputs(p => ({ ...p, diameter: e.target.value }))}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${diamErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder={isMetric ? "12" : "0.5"}
                    min="0"
                    step="any"
                    aria-label="Bolt diameter"
                  />
                  {diamErr && <p className="text-xs text-red-600 mt-1">{diamErr}</p>}
                  <p className="text-xs text-gray-400 mt-1">
                    {isMetric ? "e.g. 6, 8, 10, 12, 16, 20 mm" : "e.g. 0.25, 0.375, 0.5, 0.75 in"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bolt Grade / Material</label>
                  <select
                    value={inputs.grade}
                    onChange={(e) => handleGradeChange(e.target.value as BoltGrade)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_GRADES.map((g) => (
                      <option key={g} value={g}>{GRADE_DATA[g].label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Yield Strength + Safety Factor */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yield Strength ({syUnit})
                    <span className="ml-1 text-xs text-gray-400" title="Auto-filled from grade, can be overridden">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.yieldStrength}
                    onChange={(e) => setInputs(p => ({ ...p, yieldStrength: e.target.value, grade: "custom" }))}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${syErr ? "border-red-300" : "border-gray-200"}`}
                    placeholder={isMetric ? "640" : "92800"}
                    min="0"
                    step="any"
                    aria-label="Yield strength"
                  />
                  {syErr && <p className="text-xs text-red-600 mt-1">{syErr}</p>}
                  <p className="text-xs text-gray-400 mt-1">Auto-filled from grade selection</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Safety Factor
                    <span className="ml-1 text-xs text-gray-400" title="Minimum acceptable safety factor">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.safetyFactor}
                    onChange={(e) => setInputs(p => ({ ...p, safetyFactor: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2.0"
                    min="1"
                    step="0.1"
                    aria-label="Safety factor"
                  />
                  <p className="text-xs text-gray-400 mt-1">Typical: 1.5–3.0 for structural bolts</p>
                </div>
              </div>

              {/* Tightening Percentage Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Tightening Percentage
                    <span className="ml-1 text-xs text-gray-400" title="Percentage of yield strength used for preload">ⓘ</span>
                  </label>
                  <span className="text-sm font-mono font-semibold text-primary">{inputs.tighteningPercent}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={90}
                  step={1}
                  value={inputs.tighteningPercent}
                  onChange={(e) => setInputs(p => ({ ...p, tighteningPercent: parseInt(e.target.value) }))}
                  className="w-full accent-primary"
                  aria-label="Tightening percentage"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>50% (loose)</span>
                  <span>70% (standard)</span>
                  <span>90% (tight)</span>
                </div>
                <p className="text-xs text-gray-500">Typical preload range: 70–80% of yield strength</p>
              </div>

              {/* External Load + Thread Type */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Applied External Load ({isMetric ? "N" : "lbf"})
                    <span className="ml-1 text-xs text-gray-400" title="External tensile load on the bolt">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.externalLoad}
                    onChange={(e) => setInputs(p => ({ ...p, externalLoad: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0"
                    min="0"
                    step="any"
                    aria-label="External load"
                  />
                  <p className="text-xs text-gray-400 mt-1">Leave 0 to use preload as reference stress</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thread Type</label>
                  <select
                    value={inputs.threadType}
                    onChange={(e) => setInputs(p => ({ ...p, threadType: e.target.value as "coarse" | "fine" | "custom" }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="coarse">Coarse Thread (UNC / ISO)</option>
                    <option value="fine">Fine Thread (UNF / ISO)</option>
                    <option value="custom">Custom Pitch</option>
                  </select>
                </div>
              </div>

              {/* Custom Pitch */}
              {inputs.threadType === "custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Thread Pitch ({isMetric ? "mm" : "TPI"})
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.customPitch}
                    onChange={(e) => setInputs(p => ({ ...p, customPitch: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={isMetric ? "1.75" : "13"}
                    min="0"
                    step="any"
                    aria-label="Custom thread pitch"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {isMetric ? "Pitch in mm (e.g. M12 coarse = 1.75 mm)" : "Threads per inch (e.g. 1/2\" UNC = 13 TPI)"}
                  </p>
                </div>
              )}

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong>{" "}
                  F = A × Sy × P = {formatNum(result.stressAreaMm2, 2)} mm² × {inputs.yieldStrength} {syUnit} × {inputs.tighteningPercent / 100} = <strong>{formatNum(result.preloadForcekN, inputs.precision)} kN</strong>
                </div>
              )}

              {/* Status warning */}
              {result && result.status !== "safe" && (
                <div className={`p-3 rounded-lg border text-sm font-medium ${sc.bg} ${sc.border} ${sc.text}`}>
                  {result.status === "warning"
                    ? "⚠️ Approaching yield limit — consider reducing load or upgrading bolt grade."
                    : "🚨 Bolt may fail under load — reduce load, increase bolt size, or use higher grade."}
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active = inputs.diameter === p.diameter && inputs.grade === p.grade;
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

            {/* Results Breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Results Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parameter</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">Preload Force</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">
                          {formatNum(result.preloadForcekN, inputs.precision)} kN
                        </td>
                        <td className="py-2 px-3 text-gray-500">Bolt clamping force at tightening %</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Preload (lbf)</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.preloadForceLbf, inputs.precision)} lbf</td>
                        <td className="py-2 px-3 text-gray-500">Imperial equivalent</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Clamp Load</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.clampLoadkN, inputs.precision)} kN</td>
                        <td className="py-2 px-3 text-gray-500">Effective joint clamping (~90% of preload)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Stress Area</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.stressAreaMm2, inputs.precision)} mm²</td>
                        <td className="py-2 px-3 text-gray-500">Tensile stress area (ISO 898)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Tensile Stress</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.tensileStressMPa, inputs.precision)} MPa</td>
                        <td className="py-2 px-3 text-gray-500">Actual stress in bolt</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Tensile Stress (psi)</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.tensileStressPsi, inputs.precision)} psi</td>
                        <td className="py-2 px-3 text-gray-500">Imperial equivalent</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Yield Utilization</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.yieldUtilizationPct, inputs.precision)}%</td>
                        <td className="py-2 px-3 text-gray-500">% of yield strength used</td>
                      </tr>
                      <tr className={result.status === "safe" ? "bg-green-50" : result.status === "warning" ? "bg-yellow-50" : "bg-red-50"}>
                        <td className="py-2 px-3 font-medium text-gray-700">Safety Factor</td>
                        <td className={`py-2 px-3 font-mono font-semibold ${result.status === "safe" ? "text-green-700" : result.status === "warning" ? "text-yellow-700" : "text-red-700"}`}>
                          {formatNum(result.safetyFactor, inputs.precision)}
                        </td>
                        <td className="py-2 px-3 text-gray-500">{result.statusLabel}</td>
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
                    F = A × Sy × P
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    σ = Load ÷ A &nbsp;|&nbsp; SF = Sy ÷ σ
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">F (Preload)</div>
                      <div className="text-blue-700 text-xs">Bolt clamping force in Newtons (N) or kN</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">A (Stress Area)</div>
                      <div className="text-orange-700 text-xs">Tensile stress area in mm² from thread geometry</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">Sy (Yield Strength)</div>
                      <div className="text-green-700 text-xs">Material yield strength in MPa or psi</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Tightening %:</strong> Typically 70–80% of yield strength is used for preload. Higher values increase clamping force but reduce fatigue life margin.
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
                            {entry.inputs.diameter} {entry.inputs.diameterUnit} · {GRADE_DATA[entry.inputs.grade].label}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          Preload = {formatNum(entry.result.preloadForcekN, 2)} kN · SF = {formatNum(entry.result.safetyFactor, 2)}
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

      <BoltLoadCalculatorSEO />
      <RelatedTools
        currentTool="bolt-load-calculator"
        tools={[
          "torque-calculator",
          "stress-calculator",
          "force-calculator",
          "spring-force-calculator",
          "friction-force-calculator",
          "factor-of-safety-calculator",
        ]}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { BearingInputs, BearingResult, HistoryEntry, CompareEntry, LoadUnit, BearingType } from "./types";
import {
  calculate,
  validateLoad,
  validateRPM,
  validateHours,
  warnHighLoad,
  formatNum,
  formatRevs,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  RELIABILITY_FACTORS,
  RELIABILITY_LABELS,
  LOAD_LABELS,
  LOAD_SHORT,
  ALL_LOAD_UNITS,
  toKN,
} from "./logic";
import BearingLifeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets (US/metric engineering defaults) ──────────────────────────────
const PRESETS = [
  { label: "Light Duty",      C: "25",  P: "5",  rpm: "1200", bearingType: "ball"   as BearingType, loadUnit: "kN" as LoadUnit },
  { label: "Medium Duty",     C: "40",  P: "8",  rpm: "1800", bearingType: "ball"   as BearingType, loadUnit: "kN" as LoadUnit },
  { label: "Heavy Load",      C: "30",  P: "18", rpm: "900",  bearingType: "ball"   as BearingType, loadUnit: "kN" as LoadUnit },
  { label: "Roller Bearing",  C: "60",  P: "12", rpm: "600",  bearingType: "roller" as BearingType, loadUnit: "kN" as LoadUnit },
  { label: "High Speed",      C: "20",  P: "4",  rpm: "3600", bearingType: "ball"   as BearingType, loadUnit: "kN" as LoadUnit },
  { label: "Industrial",      C: "100", P: "20", rpm: "750",  bearingType: "roller" as BearingType, loadUnit: "kN" as LoadUnit },
];

const DEFAULT_INPUTS: BearingInputs = {
  bearingType: "ball",
  dynamicLoadRating: "25",
  equivalentLoad: "5",
  loadUnit: "kN",
  rpm: "1200",
  reliability: "90",
  serviceFactor: 1.0,
  hoursPerDay: "8",
  precision: 2,
};

const DEFAULT_COMPARE: CompareEntry[] = [
  { label: "Bearing A", C: "",  P: "",  rpm: "",  bearingType: "ball" },
  { label: "Bearing B", C: "",  P: "",  rpm: "",  bearingType: "ball" },
];

const HEALTH_STYLES: Record<string, string> = {
  green:  "bg-green-50 border-green-200 text-green-800",
  yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
  orange: "bg-orange-50 border-orange-200 text-orange-800",
  red:    "bg-red-50 border-red-200 text-red-800",
};

export default function BearingLifeCalculatorUI() {
  const [inputs,       setInputs]       = useState<BearingInputs>(DEFAULT_INPUTS);
  const [result,       setResult]       = useState<BearingResult | null>(null);
  const [cErr,         setCErr]         = useState<string | null>(null);
  const [pErr,         setPErr]         = useState<string | null>(null);
  const [rpmErr,       setRpmErr]       = useState<string | null>(null);
  const [hoursErr,     setHoursErr]     = useState<string | null>(null);
  const [loadWarning,  setLoadWarning]  = useState<string | null>(null);
  const [copied,       setCopied]       = useState(false);
  const [showHistory,  setShowHistory]  = useState(false);
  const [showEdu,      setShowEdu]      = useState(false);
  const [showCompare,  setShowCompare]  = useState(false);
  const [history,      setHistory]      = useState<HistoryEntry[]>([]);
  const [compareEntries, setCompareEntries] = useState<CompareEntry[]>(DEFAULT_COMPARE);
  const cRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    cRef.current?.focus();
  }, []);

  // ── Debounced calculation ─────────────────────────────────────────────────
  const run = useCallback(
    debounce(() => {
      const ce  = validateLoad(inputs.dynamicLoadRating, "Dynamic load rating (C)");
      const pe  = validateLoad(inputs.equivalentLoad, "Equivalent bearing load (P)");
      const re  = validateRPM(inputs.rpm);
      const he  = validateHours(inputs.hoursPerDay);
      setCErr(ce);
      setPErr(pe);
      setRpmErr(re);
      setHoursErr(he);

      if (ce || pe || re) { setResult(null); setLoadWarning(null); return; }

      const C_kN = toKN(parseFloat(inputs.dynamicLoadRating), inputs.loadUnit);
      const P_kN = toKN(parseFloat(inputs.equivalentLoad), inputs.loadUnit);
      const warn = warnHighLoad(C_kN, P_kN, inputs.serviceFactor);
      setLoadWarning(warn);

      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      dynamicLoadRating: p.C,
      equivalentLoad: p.P,
      rpm: p.rpm,
      bearingType: p.bearingType,
      loadUnit: p.loadUnit,
    }));
    cRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setCErr(null);
    setPErr(null);
    setRpmErr(null);
    setHoursErr(null);
    setLoadWarning(null);
    cRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Bearing Life: ${result.adjustedHours.toFixed(inputs.precision)} hours | ${formatRevs(result.adjustedRevolutions)} revolutions | C=${inputs.dynamicLoadRating} ${LOAD_SHORT[inputs.loadUnit]}, P=${inputs.equivalentLoad} ${LOAD_SHORT[inputs.loadUnit]}, ${inputs.rpm} RPM | ${inputs.reliability}% reliability`;
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
    downloadFile(exportToText(inputs, result), "bearing-life-calculation.txt");
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

  // Gauge width for visual life indicator
  const gaugeWidth = result
    ? Math.min(100, Math.max(2, (Math.log10(result.adjustedHours + 1) / Math.log10(100001)) * 100))
    : 0;
  const gaugeColor = result
    ? result.healthColor === "green" ? "bg-green-500"
    : result.healthColor === "yellow" ? "bg-yellow-500"
    : result.healthColor === "orange" ? "bg-orange-500"
    : "bg-red-500"
    : "bg-gray-300";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Bearing Life Calculator (L10 ISO Formula)</h3>
              <p className="text-sm text-blue-800">
                Enter bearing load ratings and operating speed to instantly calculate expected bearing life in revolutions, hours, and years. Supports ball and roller bearings with ISO reliability adjustments.
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
                Bearing Life (L10)
              </p>

              {/* Primary result */}
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? `${formatNum(result.adjustedHours, inputs.precision)} h` : "—"}
              </div>
              {result && (
                <div className="text-primary-100 text-sm mb-3">
                  {formatRevs(result.adjustedRevolutions)} revolutions
                </div>
              )}

              {/* Details */}
              {result && (
                <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">L10 Hours</span>
                    <span className="font-semibold">{formatNum(result.lifeHours, inputs.precision)} h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Adjusted Hours</span>
                    <span className="font-semibold">{formatNum(result.adjustedHours, inputs.precision)} h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Million Revolutions</span>
                    <span className="font-semibold">{result.lifeMillionRevolutions.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Estimated Years</span>
                    <span className="font-semibold">{result.adjustedYears.toFixed(2)} yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">C/P Ratio</span>
                    <span className="font-semibold">{result.ratio.toFixed(3)}</span>
                  </div>
                </div>
              )}

              {/* Health indicator */}
              {result && (
                <div className={`text-xs font-semibold px-2 py-1 rounded-md border mb-4 ${HEALTH_STYLES[result.healthColor]}`}>
                  {result.healthLabel}
                </div>
              )}

              {/* Life gauge */}
              {result && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-primary-100 mb-1">
                    <span>Life Gauge</span>
                    <span>{formatNum(result.adjustedHours, 0)} hrs</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${gaugeColor}`}
                      style={{ width: `${gaugeWidth}%` }}
                    />
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
                  onChange={(e) => setInputs((p) => ({ ...p, precision: parseInt(e.target.value) as 2 | 4 | 6 }))}
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
                onClick={() => setShowCompare(!showCompare)}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                ⚖️ {showCompare ? "Hide" : "Show"} Compare
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
              <h3 className="font-semibold text-gray-800">Bearing Parameters</h3>

              {/* Bearing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bearing Type</label>
                <div className="flex gap-3">
                  {(["ball", "roller"] as BearingType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setInputs((p) => ({ ...p, bearingType: type }))}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                        inputs.bearingType === type
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {type === "ball" ? "🔵 Ball Bearing" : "🟠 Roller Bearing"}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  {inputs.bearingType === "ball"
                    ? "Exponent p = 3 (Ball bearing ISO formula)"
                    : "Exponent p = 10/3 (Roller bearing ISO formula)"}
                </p>
              </div>

              {/* Load unit selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Load Unit</label>
                <div className="flex gap-2 flex-wrap">
                  {ALL_LOAD_UNITS.map((u) => (
                    <button
                      key={u}
                      onClick={() => setInputs((p) => ({ ...p, loadUnit: u }))}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        inputs.loadUnit === u
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* C and P */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dynamic Load Rating (C)
                    <span className="ml-1 text-xs text-gray-400" title="Manufacturer-rated dynamic capacity">ⓘ</span>
                  </label>
                  <div className={`flex rounded-lg border-2 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${cErr ? "border-red-300" : "border-gray-200"}`}>
                    <input
                      ref={cRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.dynamicLoadRating}
                      onChange={(e) => setInputs((p) => ({ ...p, dynamicLoadRating: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className="w-0 flex-1 px-4 py-3 font-mono text-sm bg-white outline-none text-lg"
                      placeholder="25"
                      min="0"
                      step="any"
                      aria-label="Dynamic load rating C"
                    />
                    <span className="shrink-0 px-3 py-3 bg-gray-50 border-l border-gray-200 text-sm font-medium text-gray-600 flex items-center">
                      {LOAD_SHORT[inputs.loadUnit]}
                    </span>
                  </div>
                  {cErr && <p className="text-xs text-red-600 mt-1">{cErr}</p>}
                  <p className="text-xs text-gray-400 mt-1">From bearing catalog (e.g. 25 kN)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equivalent Dynamic Load (P)
                    <span className="ml-1 text-xs text-gray-400" title="Applied radial/axial bearing load during operation">ⓘ</span>
                  </label>
                  <div className={`flex rounded-lg border-2 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${pErr ? "border-red-300" : "border-gray-200"}`}>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.equivalentLoad}
                      onChange={(e) => setInputs((p) => ({ ...p, equivalentLoad: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className="w-0 flex-1 px-4 py-3 font-mono text-sm bg-white outline-none text-lg"
                      placeholder="5"
                      min="0"
                      step="any"
                      aria-label="Equivalent dynamic bearing load P"
                    />
                    <span className="shrink-0 px-3 py-3 bg-gray-50 border-l border-gray-200 text-sm font-medium text-gray-600 flex items-center">
                      {LOAD_SHORT[inputs.loadUnit]}
                    </span>
                  </div>
                  {pErr && <p className="text-xs text-red-600 mt-1">{pErr}</p>}
                  <p className="text-xs text-gray-400 mt-1">Must be less than C for positive life</p>
                </div>
              </div>

              {/* RPM */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rotational Speed
                    <span className="ml-1 text-xs text-gray-400" title="Shaft speed in revolutions per minute">ⓘ</span>
                  </label>
                  <div className={`flex rounded-lg border-2 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${rpmErr ? "border-red-300" : "border-gray-200"}`}>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.rpm}
                      onChange={(e) => setInputs((p) => ({ ...p, rpm: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className="w-0 flex-1 px-4 py-3 font-mono text-sm bg-white outline-none text-lg"
                      placeholder="1200"
                      min="0"
                      step="any"
                      aria-label="Rotational speed RPM"
                    />
                    <span className="shrink-0 px-3 py-3 bg-gray-50 border-l border-gray-200 text-sm font-medium text-gray-600 flex items-center">
                      RPM
                    </span>
                  </div>
                  {rpmErr && <p className="text-xs text-red-600 mt-1">{rpmErr}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hours Per Day
                    <span className="ml-1 text-xs text-gray-400" title="Daily operating hours, used to convert to years">ⓘ</span>
                  </label>
                  <div className={`flex rounded-lg border-2 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent ${hoursErr ? "border-red-300" : "border-gray-200"}`}>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.hoursPerDay}
                      onChange={(e) => setInputs((p) => ({ ...p, hoursPerDay: e.target.value }))}
                      onKeyDown={handleKeyDown}
                      className="w-0 flex-1 px-4 py-3 font-mono text-sm bg-white outline-none text-lg"
                      placeholder="8"
                      min="1"
                      max="24"
                      step="any"
                      aria-label="Hours per day of operation"
                    />
                    <span className="shrink-0 px-3 py-3 bg-gray-50 border-l border-gray-200 text-sm font-medium text-gray-600 flex items-center">
                      h/day
                    </span>
                  </div>
                  {hoursErr && <p className="text-xs text-red-600 mt-1">{hoursErr}</p>}
                </div>
              </div>

              {/* Reliability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reliability Level
                  <span className="ml-1 text-xs text-gray-400" title="ISO 281 a1 reliability factor adjusts life for higher confidence">ⓘ</span>
                </label>
                <select
                  value={inputs.reliability}
                  onChange={(e) => setInputs((p) => ({ ...p, reliability: e.target.value as BearingInputs["reliability"] }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  aria-label="Reliability factor"
                >
                  {Object.entries(RELIABILITY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
                {inputs.reliability !== "90" && (
                  <p className="text-xs text-gray-500 mt-1">
                    a₁ = {RELIABILITY_FACTORS[inputs.reliability]} — life adjusted to {inputs.reliability}% survival probability
                  </p>
                )}
              </div>

              {/* Service Factor Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Service Factor (f_s)
                    <span className="ml-1 text-xs text-gray-400" title="Multiply equivalent load by this factor for harsh environments">ⓘ</span>
                  </label>
                  <span className="text-sm font-mono font-semibold text-primary">{inputs.serviceFactor.toFixed(1)}×</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={3.0}
                  step={0.1}
                  value={inputs.serviceFactor}
                  onChange={(e) => setInputs((p) => ({ ...p, serviceFactor: parseFloat(e.target.value) }))}
                  className="w-full accent-primary"
                  aria-label="Service factor slider"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0.5 (Light)</span>
                  <span>1.0 (Normal)</span>
                  <span>3.0 (Heavy)</span>
                </div>
                {inputs.serviceFactor !== 1.0 && (
                  <p className="text-xs text-gray-500">
                    Effective load = P × {inputs.serviceFactor.toFixed(1)} = {
                      isNaN(parseFloat(inputs.equivalentLoad)) ? "—" :
                      (parseFloat(inputs.equivalentLoad) * inputs.serviceFactor).toFixed(2)
                    } {LOAD_SHORT[inputs.loadUnit]}
                  </p>
                )}
              </div>

              {/* Warnings */}
              {loadWarning && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                  {loadWarning}
                </div>
              )}

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong>{" "}
                  L10 = (C/P)^{inputs.bearingType === "ball" ? "3" : "10/3"} × 10⁶ = ({inputs.dynamicLoadRating}/{inputs.equivalentLoad})^{inputs.bearingType === "ball" ? "3" : "10/3"} × 10⁶ = <strong>{formatRevs(result.lifeRevolutions)} revolutions</strong>
                  {" "}→ <strong>{result.lifeHours.toFixed(inputs.precision)} hours</strong>
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
                    inputs.dynamicLoadRating === p.C &&
                    inputs.equivalentLoad === p.P &&
                    inputs.rpm === p.rpm &&
                    inputs.bearingType === p.bearingType;
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

            {/* Results Summary Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Results Summary</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parameter</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">L10 (90%)</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Adjusted ({inputs.reliability}%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">Life (hours)</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.lifeHours, inputs.precision)} h</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.adjustedHours, inputs.precision)} h</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Life (million rev)</td>
                        <td className="py-2 px-3 font-mono">{result.lifeMillionRevolutions.toFixed(2)} M rev</td>
                        <td className="py-2 px-3 font-mono">{(result.adjustedRevolutions / 1e6).toFixed(2)} M rev</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Life (years)</td>
                        <td className="py-2 px-3 font-mono">{result.lifeYears.toFixed(4)} yr</td>
                        <td className="py-2 px-3 font-mono">{result.adjustedYears.toFixed(4)} yr</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">C/P Ratio</td>
                        <td className="py-2 px-3 font-mono" colSpan={2}>{result.ratio.toFixed(4)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Reliability Factor (a₁)</td>
                        <td className="py-2 px-3 font-mono" colSpan={2}>{result.reliabilityFactor.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Health Status</td>
                        <td className="py-2 px-3" colSpan={2}>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${HEALTH_STYLES[result.healthColor]}`}>
                            {result.healthLabel}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Educational Panel */}
            {showEdu && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formula & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    L10 = (C / P)³ × 10⁶ revolutions
                    <span className="block text-xs text-gray-400 mt-1">(Ball bearings)</span>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    L10 = (C / P)^(10/3) × 10⁶ revolutions
                    <span className="block text-xs text-gray-400 mt-1">(Roller bearings)</span>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                    L10h = L10 ÷ (60 × n)
                    <span className="block text-xs text-gray-400 mt-1">(Hours, n = RPM)</span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="font-semibold text-blue-800 text-xs uppercase mb-1">C (kN)</div>
                      <div className="text-blue-700 text-xs">Dynamic load rating from bearing catalog. Maximum load for 1 million revolutions.</div>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-center">
                      <div className="font-semibold text-orange-800 text-xs uppercase mb-1">P (kN)</div>
                      <div className="text-orange-700 text-xs">Equivalent dynamic bearing load. Combined radial and axial forces.</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="font-semibold text-green-800 text-xs uppercase mb-1">n (RPM)</div>
                      <div className="text-green-700 text-xs">Rotational speed. Higher RPM converts revolutions to fewer operating hours.</div>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>L10 definition:</strong> 90% of a group of identical bearings under identical load conditions will meet or exceed this life. 10% fail before this point. The reliability factors (a₁) adjust this for higher survival probabilities.
                  </div>
                </div>
              </div>
            )}

            {/* Compare Mode */}
            {showCompare && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Compare Two Bearings</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {compareEntries.map((entry, idx) => {
                    const cVal = parseFloat(entry.C);
                    const pVal = parseFloat(entry.P);
                    const rVal = parseFloat(entry.rpm);
                    let compLife: number | null = null;
                    if (cVal > 0 && pVal > 0 && rVal > 0) {
                      const exp = entry.bearingType === "ball" ? 3 : 10 / 3;
                      const revs = Math.pow(cVal / pVal, exp) * 1e6;
                      compLife = revs / (60 * rVal);
                    }
                    return (
                      <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
                        <div className="font-semibold text-gray-700 text-sm">{entry.label}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const updated = [...compareEntries];
                              updated[idx] = { ...updated[idx], bearingType: "ball" };
                              setCompareEntries(updated);
                            }}
                            className={`flex-1 py-1.5 rounded text-xs font-medium border transition-colors ${entry.bearingType === "ball" ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"}`}
                          >
                            Ball
                          </button>
                          <button
                            onClick={() => {
                              const updated = [...compareEntries];
                              updated[idx] = { ...updated[idx], bearingType: "roller" };
                              setCompareEntries(updated);
                            }}
                            className={`flex-1 py-1.5 rounded text-xs font-medium border transition-colors ${entry.bearingType === "roller" ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"}`}
                          >
                            Roller
                          </button>
                        </div>
                        <input
                          type="number"
                          inputMode="decimal"
                          value={entry.C}
                          onChange={(e) => {
                            const updated = [...compareEntries];
                            updated[idx] = { ...updated[idx], C: e.target.value };
                            setCompareEntries(updated);
                          }}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="C (kN)"
                        />
                        <input
                          type="number"
                          inputMode="decimal"
                          value={entry.P}
                          onChange={(e) => {
                            const updated = [...compareEntries];
                            updated[idx] = { ...updated[idx], P: e.target.value };
                            setCompareEntries(updated);
                          }}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="P (kN)"
                        />
                        <input
                          type="number"
                          inputMode="decimal"
                          value={entry.rpm}
                          onChange={(e) => {
                            const updated = [...compareEntries];
                            updated[idx] = { ...updated[idx], rpm: e.target.value };
                            setCompareEntries(updated);
                          }}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="RPM"
                        />
                        <div className={`text-center py-2 rounded-lg font-mono font-bold ${compLife ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`}>
                          {compLife ? `${formatNum(compLife, 0)} h` : "—"}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {(() => {
                  const entries = compareEntries;
                  const calcHours = (e: CompareEntry) => {
                    const c = parseFloat(e.C), p = parseFloat(e.P), r = parseFloat(e.rpm);
                    if (c > 0 && p > 0 && r > 0) {
                      const exp = e.bearingType === "ball" ? 3 : 10 / 3;
                      return Math.pow(c / p, exp) * 1e6 / (60 * r);
                    }
                    return null;
                  };
                  const hA = calcHours(entries[0]);
                  const hB = calcHours(entries[1]);
                  if (!hA || !hB) return null;
                  const better = hA > hB ? "Bearing A" : hA < hB ? "Bearing B" : null;
                  const ratio = hA > hB ? hA / hB : hB / hA;
                  return (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                      {better
                        ? <><strong>{better}</strong> lasts <strong>{ratio.toFixed(2)}×</strong> longer ({formatNum(Math.max(hA, hB), 0)} h vs {formatNum(Math.min(hA, hB), 0)} h).</>
                        : <>Both bearings have equal expected life ({formatNum(hA, 0)} h).</>
                      }
                    </div>
                  );
                })()}
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
                            C={entry.inputs.dynamicLoadRating}, P={entry.inputs.equivalentLoad} {LOAD_SHORT[entry.inputs.loadUnit]} @ {entry.inputs.rpm} RPM
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {formatNum(entry.result.adjustedHours, 2)} hours
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

      <BearingLifeCalculatorSEO />
      <RelatedTools
        currentTool="bearing-life-calculator"
        tools={[
          "torque-calculator",
          "gear-ratio-calculator",
          "spring-force-calculator",
          "angular-velocity-calculator",
          "natural-frequency-calculator",
          "centripetal-force-calculator",
        ]}
      />
    </>
  );
}

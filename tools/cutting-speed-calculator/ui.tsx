"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CuttingInputs, CuttingResult, HistoryEntry, Material, CalcMode, UnitSystem } from "./types";
import {
  calculate,
  validateDiameter,
  validateRPM,
  validateCuttingSpeed,
  validateFeedPerTooth,
  validateFlutes,
  validateLength,
  formatNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  getSpeedStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  MATERIAL_DATA,
  ALL_MATERIALS,
} from "./logic";
import CuttingSpeedCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const MODE_LABELS: Record<CalcMode, string> = {
  "cutting-speed":  "Cutting Speed",
  "rpm":            "Spindle RPM",
  "feed-rate":      "Feed Rate",
  "machining-time": "Machining Time",
};

const DEFAULT_INPUTS: CuttingInputs = {
  mode:         "cutting-speed",
  material:     "mild-steel",
  unitSystem:   "metric",
  diameter:     "20",
  rpm:          "500",
  cuttingSpeed: "150",
  feedPerTooth: "0.05",
  flutes:       "4",
  feedRate:     "",
  length:       "100",
  precision:    2,
};

const PRESETS = [
  { label: "Mild Steel Ø20mm",  diameter: "20",  rpm: "500",  cuttingSpeed: "31",  material: "mild-steel"      as Material, unitSystem: "metric"   as UnitSystem },
  { label: "Aluminum Ø10mm",    diameter: "10",  rpm: "6000", cuttingSpeed: "188", material: "aluminum"        as Material, unitSystem: "metric"   as UnitSystem },
  { label: "Stainless Ø12mm",   diameter: "12",  rpm: "600",  cuttingSpeed: "22",  material: "stainless-steel" as Material, unitSystem: "metric"   as UnitSystem },
  { label: '0.5" Drill (Imp)',  diameter: "0.5", rpm: "1200", cuttingSpeed: "157", material: "mild-steel"      as Material, unitSystem: "imperial" as UnitSystem },
];

export default function CuttingSpeedCalculatorUI() {
  const [inputs,      setInputs]      = useState<CuttingInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<CuttingResult | null>(null);
  const [errors,      setErrors]      = useState<Record<string, string | null>>({});
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [showRef,     setShowRef]     = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const diamRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    diamRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const newErrors: Record<string, string | null> = {};
      const { mode } = inputs;

      if (mode === "cutting-speed") {
        newErrors.diameter = validateDiameter(inputs.diameter);
        newErrors.rpm      = validateRPM(inputs.rpm);
      } else if (mode === "rpm") {
        newErrors.diameter     = validateDiameter(inputs.diameter);
        newErrors.cuttingSpeed = validateCuttingSpeed(inputs.cuttingSpeed);
      } else if (mode === "feed-rate") {
        newErrors.rpm          = validateRPM(inputs.rpm);
        newErrors.flutes       = validateFlutes(inputs.flutes);
        newErrors.feedPerTooth = validateFeedPerTooth(inputs.feedPerTooth);
      } else if (mode === "machining-time") {
        newErrors.length = validateLength(inputs.length);
      }

      setErrors(newErrors);
      const hasError = Object.values(newErrors).some(Boolean);
      if (hasError) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 120),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({
      ...prev,
      mode: "cutting-speed",
      diameter: p.diameter,
      rpm: p.rpm,
      cuttingSpeed: p.cuttingSpeed,
      material: p.material,
      unitSystem: p.unitSystem,
    }));
    diamRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setErrors({});
    diamRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const isMetric = inputs.unitSystem === "metric";
    const vcUnit = isMetric ? "m/min" : "ft/min";
    const parts: string[] = [];
    if (result.cuttingSpeed) parts.push(`Cutting Speed: ${formatNum(result.cuttingSpeed, inputs.precision)} ${vcUnit}`);
    if (result.rpm)          parts.push(`RPM: ${Math.round(result.rpm)}`);
    if (result.feedRate)     parts.push(`Feed Rate: ${formatNum(result.feedRate, inputs.precision)} ${isMetric ? "mm/min" : "in/min"}`);
    if (result.machiningTime) parts.push(`Machining Time: ${formatNum(result.machiningTime, inputs.precision)} min`);
    navigator.clipboard.writeText(parts.join(" | "));
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
    downloadFile(exportToText(inputs, result), "cutting-speed-calculation.txt");
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

  const isMetric = inputs.unitSystem === "metric";
  const vcUnit   = isMetric ? "m/min" : "ft/min";
  const dUnit    = isMetric ? "mm" : "in";
  const frUnit   = isMetric ? "mm/min" : "in/min";
  const lenUnit  = isMetric ? "mm" : "in";
  const mat      = MATERIAL_DATA[inputs.material];

  // Speed status (convert to m/min for comparison)
  const vcMmin = result && result.cuttingSpeed
    ? (isMetric ? result.cuttingSpeed : result.cuttingSpeed / 3.28084)
    : 0;
  const speedStatus = result && vcMmin > 0 ? getSpeedStatus(vcMmin, inputs.material) : "unknown";

  // Primary result label & value
  const primaryLabel = MODE_LABELS[inputs.mode];
  let primaryValue = "—";
  let primaryUnit  = "";
  if (result) {
    if (inputs.mode === "cutting-speed" && result.cuttingSpeed) {
      primaryValue = formatNum(result.cuttingSpeed, inputs.precision);
      primaryUnit  = vcUnit;
    } else if (inputs.mode === "rpm" && result.rpm) {
      primaryValue = Math.round(result.rpm).toLocaleString("en-US");
      primaryUnit  = "RPM";
    } else if (inputs.mode === "feed-rate" && result.feedRate) {
      primaryValue = formatNum(result.feedRate, inputs.precision);
      primaryUnit  = frUnit;
    } else if (inputs.mode === "machining-time" && result.machiningTime) {
      primaryValue = formatNum(result.machiningTime, inputs.precision);
      primaryUnit  = "min";
    }
  }

  const showDiameter     = inputs.mode !== "feed-rate";
  const showRPM          = inputs.mode !== "rpm";
  const showCuttingSpeed = inputs.mode === "rpm";
  const showFeedInputs   = inputs.mode === "feed-rate" || inputs.mode === "machining-time";
  const showLength       = inputs.mode === "machining-time";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Cutting Speed Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate machining cutting speed, spindle RPM, feed rate, and machining time for milling, turning, drilling, and CNC operations. Supports metric and imperial units.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left Panel */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-1 text-xs uppercase tracking-wider">{primaryLabel}</p>
              <div className="text-3xl font-bold leading-none break-all mb-1">
                {primaryValue}
              </div>
              {primaryUnit && (
                <p className="text-primary-100 text-sm mb-3">{primaryUnit}</p>
              )}

              {result && speedStatus !== "unknown" && (
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border mb-3 ${STATUS_COLORS[speedStatus]}`}>
                  <span>{speedStatus === "optimal" ? "✓" : speedStatus === "too-fast" ? "⚠" : speedStatus === "too-slow" ? "↓" : "~"}</span>
                  {STATUS_LABELS[speedStatus]}
                </div>
              )}

              {result && (
                <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  {result.cuttingSpeed > 0 && inputs.mode !== "cutting-speed" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Cutting Speed</span>
                      <span className="font-semibold">{formatNum(result.cuttingSpeed, inputs.precision)} {vcUnit}</span>
                    </div>
                  )}
                  {result.rpm > 0 && inputs.mode !== "rpm" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">RPM</span>
                      <span className="font-semibold">{Math.round(result.rpm).toLocaleString("en-US")}</span>
                    </div>
                  )}
                  {result.feedRate > 0 && inputs.mode !== "feed-rate" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Feed Rate</span>
                      <span className="font-semibold">{formatNum(result.feedRate, inputs.precision)} {frUnit}</span>
                    </div>
                  )}
                  {result.machiningTime > 0 && inputs.mode !== "machining-time" && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Machining Time</span>
                      <span className="font-semibold">{formatNum(result.machiningTime, inputs.precision)} min</span>
                    </div>
                  )}
                  {result.cuttingSpeedAlt > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">{isMetric ? "ft/min" : "m/min"}</span>
                      <span className="font-semibold">{formatNum(result.cuttingSpeedAlt, inputs.precision)}</span>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select
                  value={inputs.precision}
                  onChange={(e) => setInputs((p) => ({ ...p, precision: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm"
                >
                  <option value={2}>2 decimal places</option>
                  <option value={3}>3 decimal places</option>
                  <option value={4}>4 decimal places</option>
                </select>
              </div>

              <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ↺ Reset
              </button>
              <button onClick={() => setShowFormula(!showFormula)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📖 {showFormula ? "Hide" : "Show"} Formula
              </button>
              <button onClick={() => setShowRef(!showRef)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📊 {showRef ? "Hide" : "Show"} Reference
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

          {/* Right Panel */}
          <div className="lg:col-span-8 space-y-6">

            {/* Mode + Unit + Material */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Calculator Settings</h3>

              {/* Calculation Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(MODE_LABELS) as CalcMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setInputs((p) => ({ ...p, mode: m }))}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        inputs.mode === m
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {MODE_LABELS[m]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Unit System */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
                <div className="flex gap-2">
                  {(["metric", "imperial"] as UnitSystem[]).map((u) => (
                    <button
                      key={u}
                      onClick={() => setInputs((p) => ({ ...p, unitSystem: u }))}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                        inputs.unitSystem === u
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {u === "metric" ? "Metric (mm, m/min)" : "Imperial (in, ft/min)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material Type</label>
                <select
                  value={inputs.material}
                  onChange={(e) => setInputs((p) => ({ ...p, material: e.target.value as Material }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  {ALL_MATERIALS.map((m) => (
                    <option key={m} value={m}>{MATERIAL_DATA[m].label}</option>
                  ))}
                </select>
                {inputs.material !== "custom" && (
                  <p className="text-xs text-gray-500 mt-1.5">
                    Recommended: {mat.minSpeed}–{mat.maxSpeed} m/min ({(mat.minSpeed * 3.28084).toFixed(0)}–{(mat.maxSpeed * 3.28084).toFixed(0)} ft/min) — {mat.note}
                  </p>
                )}
              </div>
            </div>

            {/* Input Values */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Enter Values</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Tool Diameter */}
                {showDiameter && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tool Diameter ({dUnit})
                      <span className="ml-1 text-xs text-gray-400" title="Outer diameter of the cutting tool">ⓘ</span>
                    </label>
                    <input
                      ref={diamRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.diameter}
                      onChange={(e) => setInputs((p) => ({ ...p, diameter: e.target.value.replace(/[^0-9.]/g, "") }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.diameter ? "border-red-300" : "border-gray-200"}`}
                      placeholder={isMetric ? "20" : "0.75"}
                      min="0" step="any"
                      aria-label="Tool diameter"
                    />
                    {errors.diameter && <p className="text-xs text-red-600 mt-1">{errors.diameter}</p>}
                  </div>
                )}

                {/* Spindle RPM */}
                {showRPM && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Spindle Speed (RPM)
                      <span className="ml-1 text-xs text-gray-400" title="Revolutions per minute of the spindle">ⓘ</span>
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={inputs.rpm}
                      onChange={(e) => setInputs((p) => ({ ...p, rpm: e.target.value.replace(/[^0-9.]/g, "") }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.rpm ? "border-red-300" : "border-gray-200"}`}
                      placeholder="500"
                      min="0" step="1"
                      aria-label="Spindle RPM"
                    />
                    {errors.rpm && <p className="text-xs text-red-600 mt-1">{errors.rpm}</p>}
                  </div>
                )}

                {/* Cutting Speed (for RPM mode) */}
                {showCuttingSpeed && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cutting Speed ({vcUnit})
                      <span className="ml-1 text-xs text-gray-400" title="Surface speed of the cutting tool">ⓘ</span>
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.cuttingSpeed}
                      onChange={(e) => setInputs((p) => ({ ...p, cuttingSpeed: e.target.value.replace(/[^0-9.]/g, "") }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.cuttingSpeed ? "border-red-300" : "border-gray-200"}`}
                      placeholder={isMetric ? "150" : "492"}
                      min="0" step="any"
                      aria-label="Cutting speed"
                    />
                    {errors.cuttingSpeed && <p className="text-xs text-red-600 mt-1">{errors.cuttingSpeed}</p>}
                  </div>
                )}
              </div>

              {/* Feed inputs */}
              {showFeedInputs && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Flutes
                      <span className="ml-1 text-xs text-gray-400" title="Number of cutting edges on the tool">ⓘ</span>
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={inputs.flutes}
                      onChange={(e) => setInputs((p) => ({ ...p, flutes: e.target.value.replace(/[^0-9.]/g, "") }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.flutes ? "border-red-300" : "border-gray-200"}`}
                      placeholder="4"
                      min="1" step="1"
                      aria-label="Number of flutes"
                    />
                    {errors.flutes && <p className="text-xs text-red-600 mt-1">{errors.flutes}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feed Per Tooth ({dUnit}/tooth)
                      <span className="ml-1 text-xs text-gray-400" title="Chip load per cutting edge">ⓘ</span>
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.feedPerTooth}
                      onChange={(e) => setInputs((p) => ({ ...p, feedPerTooth: e.target.value.replace(/[^0-9.]/g, "") }))}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.feedPerTooth ? "border-red-300" : "border-gray-200"}`}
                      placeholder={isMetric ? "0.05" : "0.002"}
                      min="0" step="any"
                      aria-label="Feed per tooth"
                    />
                    {errors.feedPerTooth && <p className="text-xs text-red-600 mt-1">{errors.feedPerTooth}</p>}
                  </div>
                </div>
              )}

              {/* Machining Length */}
              {showLength && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Machining Length ({lenUnit})
                    <span className="ml-1 text-xs text-gray-400" title="Total length to be machined">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.length}
                    onChange={(e) => setInputs((p) => ({ ...p, length: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.length ? "border-red-300" : "border-gray-200"}`}
                    placeholder={isMetric ? "100" : "4"}
                    min="0" step="any"
                    aria-label="Machining length"
                  />
                  {errors.length && <p className="text-xs text-red-600 mt-1">{errors.length}</p>}
                </div>
              )}

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  {inputs.mode === "cutting-speed" && (
                    <>
                      <strong>Vc = (π × D × RPM) / 1000</strong>
                      {" = "}(π × {inputs.diameter} × {inputs.rpm}) / 1000
                      {" = "}<strong>{formatNum(result.cuttingSpeed, inputs.precision)} {vcUnit}</strong>
                    </>
                  )}
                  {inputs.mode === "rpm" && (
                    <>
                      <strong>RPM = (1000 × Vc) / (π × D)</strong>
                      {" = "}(1000 × {inputs.cuttingSpeed}) / (π × {inputs.diameter})
                      {" = "}<strong>{Math.round(result.rpm).toLocaleString("en-US")} RPM</strong>
                    </>
                  )}
                  {inputs.mode === "feed-rate" && (
                    <>
                      <strong>Vf = RPM × z × fz</strong>
                      {" = "}{inputs.rpm} × {inputs.flutes} × {inputs.feedPerTooth}
                      {" = "}<strong>{formatNum(result.feedRate, inputs.precision)} {frUnit}</strong>
                    </>
                  )}
                  {inputs.mode === "machining-time" && (
                    <>
                      <strong>T = L / Vf</strong>
                      {" = "}{inputs.length} / {formatNum(result.feedRate, inputs.precision)}
                      {" = "}<strong>{formatNum(result.machiningTime, inputs.precision)} min</strong>
                    </>
                  )}
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
                  const active = inputs.diameter === p.diameter && inputs.rpm === p.rpm && inputs.material === p.material;
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
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.cuttingSpeed > 0 && (
                        <tr className={inputs.mode === "cutting-speed" ? "bg-primary/5" : ""}>
                          <td className={`py-2 px-3 font-medium ${inputs.mode === "cutting-speed" ? "text-primary" : "text-gray-700"}`}>Cutting Speed</td>
                          <td className={`py-2 px-3 font-mono font-semibold ${inputs.mode === "cutting-speed" ? "text-primary" : ""}`}>{formatNum(result.cuttingSpeed, inputs.precision)}</td>
                          <td className="py-2 px-3 text-gray-500">{vcUnit}</td>
                        </tr>
                      )}
                      {result.cuttingSpeedAlt > 0 && (
                        <tr>
                          <td className="py-2 px-3 font-medium text-gray-700">Cutting Speed</td>
                          <td className="py-2 px-3 font-mono">{formatNum(result.cuttingSpeedAlt, inputs.precision)}</td>
                          <td className="py-2 px-3 text-gray-500">{isMetric ? "ft/min" : "m/min"}</td>
                        </tr>
                      )}
                      {result.rpm > 0 && (
                        <tr className={inputs.mode === "rpm" ? "bg-primary/5" : ""}>
                          <td className={`py-2 px-3 font-medium ${inputs.mode === "rpm" ? "text-primary" : "text-gray-700"}`}>Spindle RPM</td>
                          <td className={`py-2 px-3 font-mono font-semibold ${inputs.mode === "rpm" ? "text-primary" : ""}`}>{Math.round(result.rpm).toLocaleString("en-US")}</td>
                          <td className="py-2 px-3 text-gray-500">RPM</td>
                        </tr>
                      )}
                      {result.feedRate > 0 && (
                        <tr className={inputs.mode === "feed-rate" ? "bg-primary/5" : ""}>
                          <td className={`py-2 px-3 font-medium ${inputs.mode === "feed-rate" ? "text-primary" : "text-gray-700"}`}>Feed Rate</td>
                          <td className={`py-2 px-3 font-mono font-semibold ${inputs.mode === "feed-rate" ? "text-primary" : ""}`}>{formatNum(result.feedRate, inputs.precision)}</td>
                          <td className="py-2 px-3 text-gray-500">{frUnit}</td>
                        </tr>
                      )}
                      {result.machiningTime > 0 && (
                        <tr className={inputs.mode === "machining-time" ? "bg-primary/5" : ""}>
                          <td className={`py-2 px-3 font-medium ${inputs.mode === "machining-time" ? "text-primary" : "text-gray-700"}`}>Machining Time</td>
                          <td className={`py-2 px-3 font-mono font-semibold ${inputs.mode === "machining-time" ? "text-primary" : ""}`}>{formatNum(result.machiningTime, inputs.precision)}</td>
                          <td className="py-2 px-3 text-gray-500">min</td>
                        </tr>
                      )}
                      {inputs.material !== "custom" && (
                        <tr className="bg-gray-50">
                          <td className="py-2 px-3 font-medium text-gray-600">Recommended Range</td>
                          <td className="py-2 px-3 font-mono text-gray-600">{mat.minSpeed}–{mat.maxSpeed}</td>
                          <td className="py-2 px-3 text-gray-500">m/min</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formulas & Explanation</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="font-semibold text-gray-700 text-xs uppercase mb-2">Cutting Speed</div>
                      <div className="font-mono text-center text-base bg-white border border-gray-200 rounded p-2">Vc = (π × D × n) / 1000</div>
                      <p className="text-xs text-gray-500 mt-2">Vc = m/min, D = mm, n = RPM</p>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="font-semibold text-gray-700 text-xs uppercase mb-2">Spindle RPM</div>
                      <div className="font-mono text-center text-base bg-white border border-gray-200 rounded p-2">n = (1000 × Vc) / (π × D)</div>
                      <p className="text-xs text-gray-500 mt-2">n = RPM, Vc = m/min, D = mm</p>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="font-semibold text-gray-700 text-xs uppercase mb-2">Feed Rate</div>
                      <div className="font-mono text-center text-base bg-white border border-gray-200 rounded p-2">Vf = n × z × fz</div>
                      <p className="text-xs text-gray-500 mt-2">Vf = mm/min, z = flutes, fz = feed/tooth</p>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="font-semibold text-gray-700 text-xs uppercase mb-2">Machining Time</div>
                      <div className="font-mono text-center text-base bg-white border border-gray-200 rounded p-2">T = L / Vf</div>
                      <p className="text-xs text-gray-500 mt-2">T = min, L = mm, Vf = mm/min</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                    <strong>Imperial note:</strong> For ft/min, use Vc = (π × D × n) / 12 where D is in inches.
                  </div>
                </div>
              </div>
            )}

            {/* Material Reference Table */}
            {showRef && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Material Speed Reference (HSS Tools)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Material</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">m/min</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">ft/min</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {ALL_MATERIALS.filter((m) => m !== "custom").map((m) => {
                        const d = MATERIAL_DATA[m];
                        const isActive = inputs.material === m;
                        return (
                          <tr key={m} className={`hover:bg-gray-50 transition-colors ${isActive ? "bg-primary/5" : ""}`}>
                            <td className={`py-2 px-3 font-medium ${isActive ? "text-primary" : "text-gray-700"}`}>{d.label}</td>
                            <td className="py-2 px-3 font-mono text-gray-700">{d.minSpeed}–{d.maxSpeed}</td>
                            <td className="py-2 px-3 font-mono text-gray-600">{(d.minSpeed * 3.28084).toFixed(0)}–{(d.maxSpeed * 3.28084).toFixed(0)}</td>
                            <td className="py-2 px-3 text-gray-500 text-xs hidden sm:table-cell">{d.note}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
                            {MATERIAL_DATA[entry.inputs.material].label} — Ø{entry.inputs.diameter} {entry.inputs.unitSystem === "metric" ? "mm" : "in"}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {entry.result.cuttingSpeed > 0 && `Vc: ${entry.result.cuttingSpeed.toFixed(2)} ${entry.inputs.unitSystem === "metric" ? "m/min" : "ft/min"}`}
                          {entry.result.rpm > 0 && ` | RPM: ${Math.round(entry.result.rpm).toLocaleString("en-US")}`}
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

      <CuttingSpeedCalculatorSEO />
      <RelatedTools
        currentTool="cutting-speed-calculator"
        tools={[
          "torque-calculator",
          "gear-ratio-calculator",
          "angular-velocity-calculator",
          "force-calculator",
          "reynolds-number-calculator",
          "flow-rate-calculator",
        ]}
      />
    </>
  );
}

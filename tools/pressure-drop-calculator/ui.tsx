"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  PressureDropInputs,
  PressureDropResult,
  HistoryEntry,
} from "./types";
import {
  calculate,
  validatePositive,
  fmt,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  ROUGHNESS_PRESETS,
  MATERIAL_LABELS,
  encodeToURL,
  decodeFromURL,
} from "./logic";
import PressureDropCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const METRIC_DEFAULTS: PressureDropInputs = {
  unitSystem:      "imperial",
  fluidType:       "water",
  customDensity:   "1000",
  customViscosity: "0.001",
  pipeLength:      "100",
  pipeDiameter:    "2",
  flowInputMethod: "flowRate",
  flowRate:        "40",
  flowRateUnit:    "GPM",
  velocity:        "2",
  pipeMaterial:    "steel",
  roughness:       "0.046",
  temperature:     "68",
};

const IMPERIAL_DEFAULTS: PressureDropInputs = {
  unitSystem:      "imperial",
  fluidType:       "water",
  customDensity:   "62.4",
  customViscosity: "0.001",
  pipeLength:      "100",
  pipeDiameter:    "2",
  flowInputMethod: "flowRate",
  flowRate:        "40",
  flowRateUnit:    "GPM",
  velocity:        "2",
  pipeMaterial:    "steel",
  roughness:       "0.046",
  temperature:     "68",
};

const FLOW_REGIME_LABELS = {
  laminar:      "Laminar",
  transitional: "Transitional",
  turbulent:    "Turbulent",
};

const FLOW_REGIME_COLORS = {
  laminar:      { bg: "bg-green-100 border-green-300 text-green-800",  dot: "bg-green-500" },
  transitional: { bg: "bg-yellow-100 border-yellow-300 text-yellow-800", dot: "bg-yellow-500" },
  turbulent:    { bg: "bg-red-100 border-red-300 text-red-800",        dot: "bg-red-500" },
};

export default function PressureDropCalculatorUI() {
  const [inputs, setInputs]           = useState<PressureDropInputs>(IMPERIAL_DEFAULTS);
  const [result, setResult]           = useState<PressureDropResult | null>(null);
  const [errors, setErrors]           = useState<Record<string, string | null>>({});
  const [copied, setCopied]           = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history, setHistory]         = useState<HistoryEntry[]>([]);
  const [urlCopied, setUrlCopied]     = useState(false);
  const lengthRef = useRef<HTMLInputElement>(null);

  // Load history and URL params on mount
  useEffect(() => {
    setHistory(getHistory());
    if (typeof window !== "undefined" && window.location.search) {
      const decoded = decodeFromURL(window.location.search);
      if (Object.keys(decoded).length > 0) {
        setInputs((prev) => ({ ...prev, ...decoded }));
      }
    }
    lengthRef.current?.focus();
  }, []);

  // Auto-update roughness when material changes
  useEffect(() => {
    if (inputs.pipeMaterial !== "custom") {
      const roughnessM = ROUGHNESS_PRESETS[inputs.pipeMaterial];
      setInputs((prev) => ({ ...prev, roughness: (roughnessM * 1000).toFixed(4) }));
    }
  }, [inputs.pipeMaterial]);

  // Auto-switch flow rate unit when unit system changes
  useEffect(() => {
    if (inputs.unitSystem === "imperial") {
      setInputs((prev) => ({
        ...prev,
        flowRateUnit: "GPM",
        pipeLength:   "100",
        pipeDiameter: "2",
        flowRate:     "40",
        temperature:  "68",
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        flowRateUnit: "L/s",
        pipeLength:   "30",
        pipeDiameter: "25",
        flowRate:     "2",
        temperature:  "20",
      }));
    }
  }, [inputs.unitSystem]);

  // Debounced calculation
  const run = useCallback(
    debounce(() => {
      const errs: Record<string, string | null> = {};
      errs.pipeLength   = validatePositive(inputs.pipeLength,   "Pipe Length");
      errs.pipeDiameter = validatePositive(inputs.pipeDiameter, "Pipe Diameter");
      if (inputs.flowInputMethod === "flowRate") {
        errs.flowRate = validatePositive(inputs.flowRate, "Flow Rate");
      } else {
        errs.velocity = validatePositive(inputs.velocity, "Velocity");
      }
      if (inputs.fluidType === "custom") {
        errs.customDensity   = validatePositive(inputs.customDensity,   "Fluid Density");
        errs.customViscosity = validatePositive(inputs.customViscosity, "Dynamic Viscosity");
      }
      setErrors(errs);
      const hasError = Object.values(errs).some(Boolean);
      if (hasError) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 150),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const set = (field: keyof PressureDropInputs, value: string) =>
    setInputs((prev) => ({ ...prev, [field]: value }));

  const handleReset = () => {
    const defaults = inputs.unitSystem === "imperial" ? IMPERIAL_DEFAULTS : METRIC_DEFAULTS;
    setInputs(defaults);
    setResult(null);
    setErrors({});
    lengthRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Pressure Drop: ${fmt(result.pressureDropKPa, 3)} kPa | ${fmt(result.pressureDropPsi, 3)} psi | Flow Regime: ${FLOW_REGIME_LABELS[result.flowRegime]}`;
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
    downloadFile(exportToText(inputs, result), "pressure-drop-calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const handleShareURL = () => {
    const url = window.location.origin + window.location.pathname + encodeToURL(inputs);
    navigator.clipboard.writeText(url);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  // Regime bar position (0–100%)
  const regimePosition = result
    ? result.reynoldsNumber < 2300
      ? Math.min((result.reynoldsNumber / 2300) * 33, 33)
      : result.reynoldsNumber <= 4000
      ? 33 + ((result.reynoldsNumber - 2300) / 1700) * 17
      : Math.min(50 + ((result.reynoldsNumber - 4000) / 96000) * 50, 100)
    : null;

  const isMetric = inputs.unitSystem === "metric";
  const lengthLabel   = isMetric ? "m"   : "ft";
  const diameterLabel = isMetric ? "mm"  : "in";
  const tempLabel     = isMetric ? "°C"  : "°F";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔧</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Pressure Drop Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate pipe pressure loss using the Darcy–Weisbach equation. Enter pipe dimensions, fluid type, and flow rate to get instant results.
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
                Pressure Drop
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? `${fmt(result.pressureDropKPa, 3)} kPa` : "—"}
              </div>

              {result && (
                <div className="text-sm text-primary-100 space-y-0.5 mt-1 mb-3">
                  <div>{fmt(result.pressureDropBar, 5)} bar</div>
                  <div>{fmt(result.pressureDropPsi, 3)} psi</div>
                </div>
              )}

              {result && (
                <div className={`mb-4 px-3 py-2 rounded-lg border text-sm font-semibold ${FLOW_REGIME_COLORS[result.flowRegime].bg}`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${FLOW_REGIME_COLORS[result.flowRegime].dot}`} />
                    {FLOW_REGIME_LABELS[result.flowRegime]} Flow
                  </div>
                </div>
              )}

              {result && (
                <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Loss/meter</span>
                    <span className="font-semibold">{fmt(result.pressureDropPerMeter, 2)} Pa/m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Velocity</span>
                    <span className="font-semibold">{fmt(result.velocity, 3)} m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Reynolds No.</span>
                    <span className="font-semibold">{fmt(result.reynoldsNumber, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Friction Factor</span>
                    <span className="font-semibold">{fmt(result.frictionFactor, 5)}</span>
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

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Actions</h3>
              <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                ↺ Reset
              </button>
              <button onClick={() => setShowFormula(!showFormula)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📖 {showFormula ? "Hide" : "Show"} Formula
              </button>
              <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                📜 {showHistory ? "Hide" : "Show"} History
              </button>
              {result && (
                <button onClick={handleExport} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📄 Export TXT
                </button>
              )}
              <button onClick={handleShareURL} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                {urlCopied ? "✓ Link Copied!" : "🔗 Share URL"}
              </button>
            </div>
          </div>

          {/* ── Right Panel ────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Unit System + Fluid */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">System Settings</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
                  <select
                    value={inputs.unitSystem}
                    onChange={(e) => set("unitSystem", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="imperial">Imperial (US)</option>
                    <option value="metric">Metric (SI)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fluid Type</label>
                  <select
                    value={inputs.fluidType}
                    onChange={(e) => set("fluidType", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="water">Water</option>
                    <option value="air">Air</option>
                    <option value="oil">Oil (SAE 30)</option>
                    <option value="steam">Steam</option>
                    <option value="custom">Custom Fluid</option>
                  </select>
                </div>
              </div>

              {/* Temperature */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fluid Temperature ({tempLabel})
                    <span className="ml-1 text-xs text-gray-400" title="Used to auto-estimate fluid density and viscosity">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.temperature}
                    onChange={(e) => set("temperature", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={isMetric ? "20" : "68"}
                    step="any"
                  />
                </div>
              </div>

              {/* Custom fluid */}
              {inputs.fluidType === "custom" && (
                <div className="grid sm:grid-cols-2 gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Density ρ (kg/m³)</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.customDensity}
                      onChange={(e) => set("customDensity", e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.customDensity ? "border-red-300" : "border-gray-200"}`}
                      placeholder="1000"
                      min="0"
                      step="any"
                    />
                    {errors.customDensity && <p className="text-xs text-red-600 mt-1">{errors.customDensity}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dynamic Viscosity μ (Pa·s)</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.customViscosity}
                      onChange={(e) => set("customViscosity", e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.customViscosity ? "border-red-300" : "border-gray-200"}`}
                      placeholder="0.001"
                      min="0"
                      step="any"
                    />
                    {errors.customViscosity && <p className="text-xs text-red-600 mt-1">{errors.customViscosity}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Pipe Parameters */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Pipe Parameters</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pipe Length ({lengthLabel})</label>
                  <input
                    ref={lengthRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.pipeLength}
                    onChange={(e) => set("pipeLength", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.pipeLength ? "border-red-300" : "border-gray-200"}`}
                    placeholder={isMetric ? "30" : "100"}
                    min="0"
                    step="any"
                    aria-label="Pipe length"
                  />
                  {errors.pipeLength && <p className="text-xs text-red-600 mt-1">{errors.pipeLength}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pipe Diameter ({diameterLabel})</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.pipeDiameter}
                    onChange={(e) => set("pipeDiameter", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.pipeDiameter ? "border-red-300" : "border-gray-200"}`}
                    placeholder={isMetric ? "25" : "2"}
                    min="0"
                    step="any"
                    aria-label="Pipe diameter"
                  />
                  {errors.pipeDiameter && <p className="text-xs text-red-600 mt-1">{errors.pipeDiameter}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pipe Material</label>
                  <select
                    value={inputs.pipeMaterial}
                    onChange={(e) => set("pipeMaterial", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {(Object.keys(MATERIAL_LABELS) as Array<keyof typeof MATERIAL_LABELS>).map((m) => (
                      <option key={m} value={m}>{MATERIAL_LABELS[m]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roughness ε (mm)
                    <span className="ml-1 text-xs text-gray-400" title="Auto-filled from material. Edit for custom.">ⓘ</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.roughness}
                    onChange={(e) => set("roughness", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0.046"
                    min="0"
                    step="any"
                    aria-label="Pipe roughness"
                  />
                </div>
              </div>
            </div>

            {/* Flow Input */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Flow Input</h3>

              {/* Method toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => set("flowInputMethod", "flowRate")}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${inputs.flowInputMethod === "flowRate" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  Flow Rate
                </button>
                <button
                  onClick={() => set("flowInputMethod", "velocity")}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${inputs.flowInputMethod === "velocity" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  Velocity
                </button>
              </div>

              {inputs.flowInputMethod === "flowRate" ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Flow Rate</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.flowRate}
                      onChange={(e) => set("flowRate", e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.flowRate ? "border-red-300" : "border-gray-200"}`}
                      placeholder={isMetric ? "2" : "40"}
                      min="0"
                      step="any"
                      aria-label="Flow rate"
                    />
                    {errors.flowRate && <p className="text-xs text-red-600 mt-1">{errors.flowRate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Flow Rate Unit</label>
                    <select
                      value={inputs.flowRateUnit}
                      onChange={(e) => set("flowRateUnit", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      {isMetric ? (
                        <>
                          <option value="L/s">L/s (Liters per second)</option>
                          <option value="m3/h">m³/h (Cubic meters per hour)</option>
                        </>
                      ) : (
                        <option value="GPM">GPM (Gallons per minute)</option>
                      )}
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fluid Velocity (m/s)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.velocity}
                    onChange={(e) => set("velocity", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${errors.velocity ? "border-red-300" : "border-gray-200"}`}
                    placeholder="2"
                    min="0"
                    step="any"
                    aria-label="Fluid velocity"
                  />
                  {errors.velocity && <p className="text-xs text-red-600 mt-1">{errors.velocity}</p>}
                </div>
              )}

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>ΔP = f × (L/D) × (ρv²/2)</strong>
                  <br />
                  <span className="font-mono text-xs">{result.formulaSubstituted} = <strong>{fmt(result.pressureDropPa, 1)} Pa</strong></span>
                </div>
              )}
            </div>

            {/* Flow Regime Visualization */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Flow Regime Indicator</h3>
                <div className="relative">
                  <div className="flex h-4 rounded-full overflow-hidden">
                    <div className="w-1/3 bg-green-200" />
                    <div className="w-[17%] bg-yellow-200" />
                    <div className="flex-1 bg-red-200" />
                  </div>
                  {regimePosition !== null && (
                    <div
                      className="absolute top-0 w-4 h-4 rounded-full border-2 border-white shadow-md -translate-x-1/2 transition-all duration-300"
                      style={{
                        left: `${regimePosition}%`,
                        backgroundColor:
                          result.flowRegime === "laminar"      ? "#22c55e" :
                          result.flowRegime === "transitional" ? "#eab308" : "#ef4444",
                      }}
                    />
                  )}
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span className="text-green-700 font-medium">Laminar<br />&lt; 2,300</span>
                    <span className="text-yellow-700 font-medium text-center">Transitional<br />2,300–4,000</span>
                    <span className="text-red-700 font-medium text-right">Turbulent<br />&gt; 4,000</span>
                  </div>
                </div>
                <div className={`mt-4 p-3 rounded-lg border text-sm ${
                  result.flowRegime === "laminar"      ? "bg-green-50 border-green-200 text-green-800" :
                  result.flowRegime === "transitional" ? "bg-yellow-50 border-yellow-200 text-yellow-800" :
                                                         "bg-red-50 border-red-200 text-red-800"
                }`}>
                  <strong>{FLOW_REGIME_LABELS[result.flowRegime]}:</strong>{" "}
                  {result.flowRegime === "laminar"
                    ? "Smooth, layered flow. Friction factor = 64/Re. Low pressure loss."
                    : result.flowRegime === "transitional"
                    ? "Unstable flow between laminar and turbulent. Avoid in design when possible."
                    : "Chaotic, mixed flow. Higher pressure loss. Most industrial pipe flows are turbulent."}
                </div>
              </div>
            )}

            {/* Results Breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Calculation Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parameter</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Pipe Length (L)</td>
                        <td className="py-2 px-3 font-mono">{fmt(result.lengthM, 3)} m</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Pipe Diameter (D)</td>
                        <td className="py-2 px-3 font-mono">{fmt(result.diameterM * 1000, 2)} mm ({fmt(result.diameterM, 4)} m)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Fluid Density (ρ)</td>
                        <td className="py-2 px-3 font-mono">{fmt(result.density, 2)} kg/m³</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Dynamic Viscosity (μ)</td>
                        <td className="py-2 px-3 font-mono">{result.viscosity.toExponential(3)} Pa·s</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Velocity (v)</td>
                        <td className="py-2 px-3 font-mono">{fmt(result.velocity, 4)} m/s</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Reynolds Number (Re)</td>
                        <td className="py-2 px-3 font-mono">{fmt(result.reynoldsNumber, 0)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Friction Factor (f)</td>
                        <td className="py-2 px-3 font-mono">{fmt(result.frictionFactor, 6)}</td>
                      </tr>
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">Pressure Drop (ΔP)</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">
                          {fmt(result.pressureDropKPa, 4)} kPa &nbsp;|&nbsp; {fmt(result.pressureDropPsi, 4)} psi
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Darcy–Weisbach Formula</h3>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-center text-base">
                  ΔP = f × (L / D) × (ρ × v² / 2)
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="font-semibold text-blue-800 text-xs uppercase mb-1">f — Friction Factor</div>
                    <div className="text-blue-700 text-xs">Laminar: f = 64/Re. Turbulent: Swamee–Jain equation.</div>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="font-semibold text-orange-800 text-xs uppercase mb-1">L/D — Length/Diameter Ratio</div>
                    <div className="text-orange-700 text-xs">Longer pipes and smaller diameters increase pressure drop significantly.</div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="font-semibold text-green-800 text-xs uppercase mb-1">ρ — Fluid Density</div>
                    <div className="text-green-700 text-xs">Denser fluids produce higher pressure drops at the same velocity.</div>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="font-semibold text-purple-800 text-xs uppercase mb-1">v² — Velocity Squared</div>
                    <div className="text-purple-700 text-xs">Doubling velocity quadruples pressure drop. Velocity has the largest impact.</div>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 space-y-1">
                  <div className="font-semibold mb-1">Swamee–Jain (Turbulent):</div>
                  <div className="font-mono">f = 0.25 / [log₁₀(ε/3.7D + 5.74/Re⁰·⁹)]²</div>
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
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
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
                            ΔP: {fmt(entry.result.pressureDropKPa, 3)} kPa
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {entry.inputs.pipeLength}{entry.inputs.unitSystem === "metric" ? "m" : "ft"} ×{" "}
                          {entry.inputs.pipeDiameter}{entry.inputs.unitSystem === "metric" ? "mm" : "in"} •{" "}
                          {entry.inputs.fluidType} • {FLOW_REGIME_LABELS[entry.result.flowRegime]}
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

      <PressureDropCalculatorSEO />
      <RelatedTools
        currentTool="pressure-drop-calculator"
        tools={["reynolds-number-calculator", "flow-rate-calculator", "pipe-velocity-calculator", "bernoulli-equation-calculator", "hydraulic-pressure-calculator", "viscosity-calculator"]}
      />
    </>
  );
}

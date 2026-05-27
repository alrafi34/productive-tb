"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalcMode, AreaUnit, PipeMaterial, DrainageInputs, DrainageResult, HistoryEntry } from "./types";
import {
  calculate, fmt, fmtFlow, debounce,
  saveToHistory, getHistory, clearHistory,
  saveConfig, loadConfig,
  exportToText, downloadFile,
  MANNING_N, MATERIAL_LABELS, SURFACE_COEFFICIENTS, LAND_PRESETS,
} from "./logic";
import DrainageSystemCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: DrainageInputs = {
  mode: "runoff",
  area: "2",
  areaUnit: "hectare",
  rainfallIntensity: "50",
  runoffCoefficient: 0.5,
  pipeDiameter: "300",
  pipeMaterial: "pvc",
  slope: "2",
  drainLength: "100",
  channelWidth: "2",
  channelDepth: "1",
};

const MODE_OPTIONS: { value: CalcMode; label: string }[] = [
  { value: "runoff",        label: "Peak Runoff Flow" },
  { value: "pipe",          label: "Pipe Capacity" },
  { value: "channel",       label: "Channel Flow" },
  { value: "drainage-area", label: "Drainage Area Design" },
  { value: "stormwater",    label: "Stormwater Estimate" },
];

const RISK_STYLES: Record<DrainageResult["overflowRisk"], string> = {
  low:      "text-green-700 bg-green-50 border-green-200",
  moderate: "text-yellow-700 bg-yellow-50 border-yellow-200",
  high:     "text-orange-700 bg-orange-50 border-orange-200",
  critical: "text-red-700 bg-red-50 border-red-200",
};

const RISK_LABELS: Record<DrainageResult["overflowRisk"], string> = {
  low:      "Low Risk",
  moderate: "Moderate Risk",
  high:     "High Risk",
  critical: "Critical – Overflow Likely",
};

export default function DrainageSystemCalculatorUI() {
  const [inputs, setInputs] = useState<DrainageInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<DrainageResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = loadConfig();
    if (saved) setInputs(saved);
    setHistory(getHistory());
    firstRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const r = calculate(inputs);
      setResult(r);
    }, 150),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);
  useEffect(() => { saveConfig(inputs); }, [inputs]);

  const set = <K extends keyof DrainageInputs>(key: K, value: DrainageInputs[K]) =>
    setInputs((p) => ({ ...p, [key]: value }));
  const setNum = (key: keyof DrainageInputs, val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  const handleReset = () => { setInputs(DEFAULT_INPUTS); setResult(null); firstRef.current?.focus(); };
  const handlePreset = (p: typeof LAND_PRESETS[0]) => setInputs((prev) => ({ ...prev, ...p.inputs }));

  const handleCopy = () => {
    if (!result) return;
    const lines = [
      `Drainage System Calculator`,
      `Mode: ${inputs.mode}`,
      result.runoffFlowRate !== undefined ? `Peak Runoff: ${result.runoffFlowRate.toFixed(6)} m³/s (${result.runoffFlowRateLps?.toFixed(3)} L/s)` : "",
      result.pipeFlowRate !== undefined   ? `Pipe Capacity: ${result.pipeFlowRate.toFixed(6)} m³/s` : "",
      result.recommendedPipeDiameter !== undefined ? `Recommended Pipe: ${result.recommendedPipeDiameter} mm` : "",
      `Overflow Risk: ${RISK_LABELS[result.overflowRisk]}`,
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(lines);
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
    downloadFile(exportToText(inputs, result), "drainage_system_report.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  const showArea    = ["runoff", "drainage-area", "stormwater"].includes(inputs.mode);
  const showPipe    = ["pipe", "stormwater"].includes(inputs.mode);
  const showChannel = inputs.mode === "channel";
  const showSlope   = true;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌊</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Drainage System Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate peak runoff flow, pipe capacity, and drainage requirements using the Rational Method and Manning&apos;s Equation. Ideal for civil engineers, agricultural planners, and land developers.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              {/* Calculation Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Type</label>
                <select value={inputs.mode} onChange={(e) => set("mode", e.target.value as CalcMode)} className={selectCls}>
                  {MODE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Pipe Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pipe Material</label>
                <select value={inputs.pipeMaterial} onChange={(e) => set("pipeMaterial", e.target.value as PipeMaterial)} className={selectCls}>
                  {(Object.keys(MATERIAL_LABELS) as PipeMaterial[]).map((m) => (
                    <option key={m} value={m}>{MATERIAL_LABELS[m]}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Manning&apos;s n = {MANNING_N[inputs.pipeMaterial]}</p>
              </div>

              {/* Formula reference */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formulas</div>
                <div className="font-mono">Q = C × I × A / 360</div>
                <div className="font-mono">Q = (1/n) × A × R²/³ × S½</div>
              </div>

              <div className="pt-2 space-y-2">
                <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  🔄 Reset
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

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                {inputs.mode === "pipe" ? "Pipe Capacity" : "Peak Runoff Flow"}
              </p>
              <div className="text-3xl font-bold mb-1 leading-none">
                {result?.runoffFlowRate !== undefined
                  ? `${result.runoffFlowRate.toFixed(4)} m³/s`
                  : result?.pipeFlowRate !== undefined
                  ? `${result.pipeFlowRate.toFixed(4)} m³/s`
                  : "—"}
              </div>
              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  {result.runoffFlowRateLps !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Liters/sec:</span>
                      <span className="font-semibold">{result.runoffFlowRateLps.toFixed(3)} L/s</span>
                    </div>
                  )}
                  {result.runoffFlowRateCfs !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">ft³/sec:</span>
                      <span className="font-semibold">{result.runoffFlowRateCfs.toFixed(3)} cfs</span>
                    </div>
                  )}
                  {result.pipeVelocity !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Velocity:</span>
                      <span className="font-semibold">{result.pipeVelocity.toFixed(3)} m/s</span>
                    </div>
                  )}
                  {result.recommendedPipeDiameter !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Rec. Pipe:</span>
                      <span className="font-semibold">{result.recommendedPipeDiameter} mm</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Risk:</span>
                    <span className={`font-semibold text-xs px-2 py-0.5 rounded-full ${
                      result.overflowRisk === "low" ? "bg-green-400/30 text-green-100" :
                      result.overflowRisk === "moderate" ? "bg-yellow-400/30 text-yellow-100" :
                      result.overflowRisk === "high" ? "bg-orange-400/30 text-orange-100" :
                      "bg-red-400/30 text-red-100"
                    }`}>{RISK_LABELS[result.overflowRisk]}</span>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <button onClick={handleCopy} disabled={!result} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed">
                  {copied ? "✓ Copied!" : "📋 Copy Result"}
                </button>
                <button onClick={handleSave} disabled={!result} className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  💾 Save to History
                </button>
              </div>
            </div>

          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Land Area & Rainfall */}
            {showArea && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Land Area & Rainfall</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Land Area</label>
                    <div className="flex gap-2">
                      <input ref={firstRef} type="number" inputMode="decimal"
                        value={inputs.area} onChange={(e) => setNum("area", e.target.value)}
                        className={inputCls} placeholder="e.g. 2" min="0" step="any" />
                      <select value={inputs.areaUnit} onChange={(e) => set("areaUnit", e.target.value as AreaUnit)}
                        className="px-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-sm">
                        <option value="m2">m²</option>
                        <option value="hectare">ha</option>
                        <option value="acre">acre</option>
                      </select>
                    </div>
                    {result && result.areaM2 > 0 && (
                      <p className="text-xs text-gray-500 mt-1">{result.areaM2.toLocaleString("en-US", { maximumFractionDigits: 2 })} m²</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rainfall Intensity (mm/hr)</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.rainfallIntensity} onChange={(e) => setNum("rainfallIntensity", e.target.value)}
                      className={inputCls} placeholder="e.g. 50" min="0" step="any" />
                    <p className="text-xs text-gray-500 mt-1">Typical US: 25–100 mm/hr</p>
                  </div>
                </div>

                {/* Runoff Coefficient */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Runoff Coefficient (C): <span className="font-bold text-primary">{inputs.runoffCoefficient.toFixed(2)}</span>
                  </label>
                  <input type="range" min="0.1" max="1.0" step="0.01"
                    value={inputs.runoffCoefficient}
                    onChange={(e) => set("runoffCoefficient", parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                  <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                    <span>0.1 (Forest)</span><span>0.5 (Residential)</span><span>1.0 (Concrete)</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(SURFACE_COEFFICIENTS).map(([key, { label, c }]) => (
                      <button key={key} onClick={() => set("runoffCoefficient", c)}
                        className={`px-2 py-1 rounded text-xs font-medium border transition-colors ${
                          Math.abs(inputs.runoffCoefficient - c) < 0.01
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}>
                        {label} ({c})
                      </button>
                    ))}
                  </div>
                </div>

                {result?.runoffFlowRate !== undefined && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <strong>Q = {inputs.runoffCoefficient} × {inputs.rainfallIntensity} mm/hr × {(result.areaM2 / 10000).toFixed(4)} ha / 360</strong>
                    {" = "}<strong>{result.runoffFlowRate.toFixed(6)} m³/s</strong>
                  </div>
                )}
              </div>
            )}

            {/* Pipe Parameters */}
            {showPipe && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Pipe Parameters</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pipe Diameter (mm)</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.pipeDiameter} onChange={(e) => setNum("pipeDiameter", e.target.value)}
                      className={inputCls} placeholder="e.g. 300" min="0" step="any" />
                    <p className="text-xs text-gray-500 mt-1">Standard: 100–1500 mm</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Drain Length (m)</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.drainLength} onChange={(e) => setNum("drainLength", e.target.value)}
                      className={inputCls} placeholder="e.g. 100" min="0" step="any" />
                  </div>
                </div>
              </div>
            )}

            {/* Channel Parameters */}
            {showChannel && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Channel Parameters</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Channel Width (m)</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.channelWidth} onChange={(e) => setNum("channelWidth", e.target.value)}
                      className={inputCls} placeholder="e.g. 2" min="0" step="any" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Water Depth (m)</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.channelDepth} onChange={(e) => setNum("channelDepth", e.target.value)}
                      className={inputCls} placeholder="e.g. 1" min="0" step="any" />
                  </div>
                </div>
              </div>
            )}

            {/* Slope */}
            {showSlope && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Slope / Gradient</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Land Slope (%)</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.slope} onChange={(e) => setNum("slope", e.target.value)}
                      className={inputCls} placeholder="e.g. 2" min="0" step="any" />
                    {inputs.slope && !isNaN(parseFloat(inputs.slope)) && (
                      <p className="text-xs text-gray-500 mt-1">
                        S = {(parseFloat(inputs.slope) / 100).toFixed(4)} (decimal)
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                      <div className="font-semibold text-gray-500 mb-1">Slope Guidelines</div>
                      <div>Min. sewer: 0.4%</div>
                      <div>Typical drain: 1–2%</div>
                      <div>Max. (no erosion): 5%</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Quick Presets</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {LAND_PRESETS.map((p) => (
                  <button key={p.label} onClick={() => handlePreset(p)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left">
                    <div className="font-semibold text-gray-900 text-sm">{p.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{p.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Summary */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Calculation Summary</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${RISK_STYLES[result.overflowRisk]}`}>
                    {RISK_LABELS[result.overflowRisk]}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {result.runoffFlowRate !== undefined && (
                    <>
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Peak Runoff</div>
                        <div className="text-lg font-bold text-primary">{result.runoffFlowRate.toFixed(4)} m³/s</div>
                      </div>
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Flow (L/s)</div>
                        <div className="text-base font-bold text-gray-900">{result.runoffFlowRateLps?.toFixed(3)} L/s</div>
                      </div>
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Flow (cfs)</div>
                        <div className="text-base font-bold text-gray-900">{result.runoffFlowRateCfs?.toFixed(3)} cfs</div>
                      </div>
                    </>
                  )}
                  {result.pipeFlowRate !== undefined && (
                    <>
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pipe Capacity</div>
                        <div className="text-base font-bold text-gray-900">{result.pipeFlowRate.toFixed(4)} m³/s</div>
                      </div>
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Velocity</div>
                        <div className="text-base font-bold text-gray-900">{result.pipeVelocity?.toFixed(3)} m/s</div>
                      </div>
                      {result.pipeFillPct !== undefined && (
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pipe Fill</div>
                          <div className="text-base font-bold text-gray-900">{result.pipeFillPct.toFixed(1)}%</div>
                        </div>
                      )}
                    </>
                  )}
                  {result.channelFlowRate !== undefined && (
                    <>
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Channel Flow</div>
                        <div className="text-lg font-bold text-primary">{result.channelFlowRate.toFixed(4)} m³/s</div>
                      </div>
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Channel Velocity</div>
                        <div className="text-base font-bold text-gray-900">{result.channelVelocity?.toFixed(3)} m/s</div>
                      </div>
                    </>
                  )}
                  {result.recommendedPipeDiameter !== undefined && (
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rec. Pipe Ø</div>
                      <div className="text-base font-bold text-gray-900">{result.recommendedPipeDiameter} mm</div>
                    </div>
                  )}
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Manning&apos;s n</div>
                    <div className="text-base font-bold text-gray-900">{result.manningsN}</div>
                  </div>
                </div>

                {/* Pipe fill bar */}
                {result.pipeFillPct !== undefined && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Pipe Fill Level</span>
                      <span>{result.pipeFillPct.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          result.pipeFillPct < 60 ? "bg-green-500" :
                          result.pipeFillPct < 85 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${Math.min(100, result.pipeFillPct)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                      <span>0%</span><span>Safe (&lt;60%)</span><span>100%</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Warnings */}
            {result && result.warnings.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
                <div className="font-semibold text-red-800 text-sm flex items-center gap-2">
                  <span>⚠️</span> Warnings
                </div>
                {result.warnings.map((w, i) => (
                  <p key={i} className="text-sm text-red-700">{w}</p>
                ))}
              </div>
            )}

            {/* Recommendations */}
            {result && result.recommendations.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Engineering Recommendations</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* History */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Calculation History</h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No calculations saved yet</div>
                  ) : (
                    history.map((entry) => (
                      <div key={entry.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm capitalize">{entry.inputs.mode}</span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString("en-US")}</span>
                        </div>
                        <div className="text-sm text-primary font-semibold">
                          {entry.result.runoffFlowRate !== undefined
                            ? `Runoff: ${entry.result.runoffFlowRate.toFixed(4)} m³/s`
                            : entry.result.pipeFlowRate !== undefined
                            ? `Pipe: ${entry.result.pipeFlowRate.toFixed(4)} m³/s`
                            : "—"}
                          {" · "}{RISK_LABELS[entry.result.overflowRisk]}
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

      <DrainageSystemCalculatorSEO />
      <RelatedTools
        currentTool="drainage-system-calculator"
        tools={[
          "rainwater-runoff-calculator",
          "irrigation-water-calculator",
          "soil-volume-calculator",
          "land-slope-calculator",
          "well-depth-calculator",
          "water-table-depth-calculator",
        ]}
      />
    </>
  );
}

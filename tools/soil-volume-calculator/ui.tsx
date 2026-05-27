"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculatorInputs,
  CalculationResult,
  ExcavationType,
  HistoryEntry,
  InputUnit,
  OutputUnit,
} from "./types";
import {
  calculate,
  smartFormat,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  EXCAVATION_TYPE_LABELS,
  ALL_EXCAVATION_TYPES,
  INPUT_UNIT_LABELS,
  INPUT_UNIT_SHORT,
  ALL_INPUT_UNITS,
  OUTPUT_UNIT_LABELS,
  OUTPUT_UNIT_SHORT,
  ALL_OUTPUT_UNITS,
} from "./logic";
import SoilVolumeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ───────────────────────────────────────────────────────────────────

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  {
    label: "10×5×2 ft",
    inputs: { type: "rectangular", unit: "ft", rectangular: { length: "10", width: "5", depth: "2" } },
  },
  {
    label: "Trench 20×0.6×1.2 ft",
    inputs: { type: "trench", unit: "ft", trench: { length: "20", width: "0.6", depth: "1.2" } },
  },
  {
    label: "Circle Ø8×1.5 ft",
    inputs: { type: "circular", unit: "ft", circular: { diameter: "8", depth: "1.5" } },
  },
  {
    label: "Triangle 6×4×2 ft",
    inputs: { type: "triangular", unit: "ft", triangular: { base: "6", triHeight: "4", depth: "2" } },
  },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  type: "rectangular",
  unit: "ft",
  outputUnit: "ft3",
  rectangular: { length: "", width: "", depth: "" },
  circular:    { diameter: "", depth: "" },
  trench:      { length: "", width: "", depth: "" },
  triangular:  { base: "", triHeight: "", depth: "" },
  custom:      { area: "", depth: "" },
  soilDensity: "",
  costPerUnit: "",
  mode: "excavation",
};

// ── Shape SVG diagrams ────────────────────────────────────────────────────────

function ShapeDiagram({ type }: { type: ExcavationType }) {
  const W = 200, H = 120;
  if (type === "rectangular" || type === "trench" || type === "custom") {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[200px]" aria-hidden="true">
        <rect x="30" y="20" width="140" height="70" fill="#05855418" stroke="#058554" strokeWidth="2" />
        <line x1="30" y1="100" x2="170" y2="100" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
        <text x="100" y="112" textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="system-ui">Length</text>
        <line x1="180" y1="20" x2="180" y2="90" stroke="#058554" strokeWidth="1.5" />
        <text x="192" y="58" textAnchor="start" fontSize="10" fill="#058554" fontFamily="system-ui">Depth</text>
        <line x1="30" y1="10" x2="170" y2="10" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
        <text x="100" y="8" textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="system-ui">Width</text>
      </svg>
    );
  }
  if (type === "circular") {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[200px]" aria-hidden="true">
        <ellipse cx="100" cy="55" rx="65" ry="40" fill="#05855418" stroke="#058554" strokeWidth="2" />
        <line x1="100" y1="55" x2="165" y2="55" stroke="#058554" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x="132" y="50" textAnchor="middle" fontSize="10" fill="#058554" fontFamily="system-ui">r</text>
        <line x1="35" y1="55" x2="165" y2="55" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
        <text x="100" y="108" textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="system-ui">Diameter</text>
      </svg>
    );
  }
  if (type === "triangular") {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[200px]" aria-hidden="true">
        <polygon points="100,15 170,95 30,95" fill="#05855418" stroke="#058554" strokeWidth="2" />
        <line x1="30" y1="105" x2="170" y2="105" stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
        <text x="100" y="115" textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="system-ui">Base</text>
        <line x1="100" y1="15" x2="100" y2="95" stroke="#058554" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x="106" y="58" textAnchor="start" fontSize="10" fill="#058554" fontFamily="system-ui">h</text>
      </svg>
    );
  }
  return null;
}

export default function SoilVolumeCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); firstRef.current?.focus(); }, []);

  const run = useCallback(debounce(() => { setResult(calculate(inputs)); }, 120), [inputs]);
  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));

  const setRect  = (k: keyof CalculatorInputs["rectangular"], v: string) =>
    setInputs((p) => ({ ...p, rectangular: { ...p.rectangular, [k]: v.replace(/[^0-9.]/g, "") } }));
  const setCirc  = (k: keyof CalculatorInputs["circular"], v: string) =>
    setInputs((p) => ({ ...p, circular: { ...p.circular, [k]: v.replace(/[^0-9.]/g, "") } }));
  const setTrench = (k: keyof CalculatorInputs["trench"], v: string) =>
    setInputs((p) => ({ ...p, trench: { ...p.trench, [k]: v.replace(/[^0-9.]/g, "") } }));
  const setTri   = (k: keyof CalculatorInputs["triangular"], v: string) =>
    setInputs((p) => ({ ...p, triangular: { ...p.triangular, [k]: v.replace(/[^0-9.]/g, "") } }));
  const setCustom = (k: keyof CalculatorInputs["custom"], v: string) =>
    setInputs((p) => ({ ...p, custom: { ...p.custom, [k]: v.replace(/[^0-9.]/g, "") } }));

  const handleReset = () => { setInputs(DEFAULT_INPUTS); setResult(null); firstRef.current?.focus(); };
  const handlePreset = (p: (typeof PRESETS)[0]) =>
    setInputs((prev) => ({
      ...prev,
      ...p.inputs,
      rectangular: p.inputs.rectangular ?? prev.rectangular,
      circular:    p.inputs.circular    ?? prev.circular,
      trench:      p.inputs.trench      ?? prev.trench,
      triangular:  p.inputs.triangular  ?? prev.triangular,
      custom:      prev.custom,
    }));

  const handleCopy = () => {
    if (!result) return;
    const text = `Soil Volume: ${smartFormat(result.volumeInUnit)} ${OUTPUT_UNIT_SHORT[result.outputUnit]}\n${smartFormat(result.m3)} m³ | ${smartFormat(result.ft3)} ft³ | ${smartFormat(result.yd3)} yd³`;
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
    downloadFile(exportToText(inputs, result), "soil_volume.txt");
  };
  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const u = INPUT_UNIT_SHORT[inputs.unit];
  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Soil Volume Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate soil excavation or fill volume for rectangular, circular, trench, and triangular shapes. Instant unit conversions and optional weight estimation.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              {/* Mode toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["excavation", "fill"] as const).map((m) => (
                    <button key={m} onClick={() => set("mode", m)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${inputs.mode === m ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {m === "excavation" ? "⛏ Excavation" : "🚜 Fill"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Unit</label>
                <div className="grid grid-cols-3 gap-2">
                  {ALL_INPUT_UNITS.map((u) => (
                    <button key={u} onClick={() => set("unit", u)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.unit === u ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output Unit</label>
                <select value={inputs.outputUnit} onChange={(e) => set("outputUnit", e.target.value as OutputUnit)} className={selectCls}>
                  {ALL_OUTPUT_UNITS.map((u) => (
                    <option key={u} value={u}>{OUTPUT_UNIT_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              {/* Formula hint */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                {inputs.type === "rectangular" && <div className="font-mono">V = L × W × D</div>}
                {inputs.type === "circular"    && <div className="font-mono">V = π × r² × D</div>}
                {inputs.type === "trench"      && <div className="font-mono">V = L × W × D</div>}
                {inputs.type === "triangular"  && <div className="font-mono">V = 0.5 × B × H × D</div>}
                {inputs.type === "custom"      && <div className="font-mono">V = Area × D</div>}
              </div>

              {/* Actions */}
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
                {inputs.mode === "fill" ? "Fill Volume" : "Excavation Volume"}
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? smartFormat(result.volumeInUnit) : "—"}
              </div>
              {result && <div className="text-primary-100 text-sm mb-3">{OUTPUT_UNIT_SHORT[result.outputUnit]}</div>}

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">m³:</span>
                    <span className="font-semibold">{smartFormat(result.m3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">ft³:</span>
                    <span className="font-semibold">{smartFormat(result.ft3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">yd³:</span>
                    <span className="font-semibold">{smartFormat(result.yd3)}</span>
                  </div>
                  {result.weightKg !== undefined && (
                    <>
                      <div className="flex justify-between pt-1 border-t border-white/20 mt-1">
                        <span className="text-primary-100">Weight:</span>
                        <span className="font-semibold">{smartFormat(result.weightKg)} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Tons:</span>
                        <span className="font-semibold">{smartFormat(result.weightTons!)} t</span>
                      </div>
                    </>
                  )}
                  {result.estimatedCost !== undefined && (
                    <div className="flex justify-between pt-1 border-t border-white/20 mt-1">
                      <span className="text-primary-100">Est. Cost:</span>
                      <span className="font-semibold">${smartFormat(result.estimatedCost)}</span>
                    </div>
                  )}
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

            {/* Excavation Type Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Excavation Type
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ALL_EXCAVATION_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => set("type", t)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      inputs.type === t ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {EXCAVATION_TYPE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimension Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Dimensions
                </h3>
                <ShapeDiagram type={inputs.type} />
              </div>

              {/* Rectangular */}
              {inputs.type === "rectangular" && (
                <div className="grid sm:grid-cols-3 gap-4">
                  {(["length", "width", "depth"] as const).map((k, i) => (
                    <div key={k}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{k} ({u})</label>
                      <input
                        ref={i === 0 ? firstRef : undefined}
                        type="number" inputMode="decimal"
                        value={inputs.rectangular[k]}
                        onChange={(e) => setRect(k, e.target.value)}
                        className={inputCls}
                        placeholder={k === "length" ? "e.g. 10" : k === "width" ? "e.g. 5" : "e.g. 2"}
                        min="0" step="any"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Circular */}
              {inputs.type === "circular" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Diameter ({u})</label>
                    <input ref={firstRef} type="number" inputMode="decimal"
                      value={inputs.circular.diameter}
                      onChange={(e) => setCirc("diameter", e.target.value)}
                      className={inputCls} placeholder="e.g. 8" min="0" step="any" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Depth ({u})</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.circular.depth}
                      onChange={(e) => setCirc("depth", e.target.value)}
                      className={inputCls} placeholder="e.g. 1.5" min="0" step="any" />
                  </div>
                </div>
              )}

              {/* Trench */}
              {inputs.type === "trench" && (
                <div className="grid sm:grid-cols-3 gap-4">
                  {(["length", "width", "depth"] as const).map((k, i) => (
                    <div key={k}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{k} ({u})</label>
                      <input
                        ref={i === 0 ? firstRef : undefined}
                        type="number" inputMode="decimal"
                        value={inputs.trench[k]}
                        onChange={(e) => setTrench(k, e.target.value)}
                        className={inputCls}
                        placeholder={k === "length" ? "e.g. 20" : k === "width" ? "e.g. 0.6" : "e.g. 1.2"}
                        min="0" step="any"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Triangular */}
              {inputs.type === "triangular" && (
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base ({u})</label>
                    <input ref={firstRef} type="number" inputMode="decimal"
                      value={inputs.triangular.base}
                      onChange={(e) => setTri("base", e.target.value)}
                      className={inputCls} placeholder="e.g. 6" min="0" step="any" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height ({u})</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.triangular.triHeight}
                      onChange={(e) => setTri("triHeight", e.target.value)}
                      className={inputCls} placeholder="e.g. 4" min="0" step="any" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Depth ({u})</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.triangular.depth}
                      onChange={(e) => setTri("depth", e.target.value)}
                      className={inputCls} placeholder="e.g. 2" min="0" step="any" />
                  </div>
                </div>
              )}

              {/* Custom */}
              {inputs.type === "custom" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base Area ({u}²)</label>
                    <input ref={firstRef} type="number" inputMode="decimal"
                      value={inputs.custom.area}
                      onChange={(e) => setCustom("area", e.target.value)}
                      className={inputCls} placeholder="e.g. 50" min="0" step="any" />
                    <p className="text-xs text-gray-500 mt-1">Enter the cross-sectional area</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Depth ({u})</label>
                    <input type="number" inputMode="decimal"
                      value={inputs.custom.depth}
                      onChange={(e) => setCustom("depth", e.target.value)}
                      className={inputCls} placeholder="e.g. 2" min="0" step="any" />
                  </div>
                </div>
              )}

              {/* Inline result */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>{result.formula}</strong> = <strong>{smartFormat(result.m3)} m³</strong>
                </div>
              )}
            </div>

            {/* Optional: Density + Cost */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Optional Estimates
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soil Density (kg/m³)</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.soilDensity}
                    onChange={(e) => set("soilDensity", e.target.value.replace(/[^0-9.]/g, ""))}
                    className={inputCls} placeholder="e.g. 1600" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Typical: 1400–1800 kg/m³</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost per {OUTPUT_UNIT_SHORT[inputs.outputUnit]} ($)
                  </label>
                  <input type="number" inputMode="decimal"
                    value={inputs.costPerUnit}
                    onChange={(e) => set("costPerUnit", e.target.value.replace(/[^0-9.]/g, ""))}
                    className={inputCls} placeholder="e.g. 25" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Optional cost estimation</p>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button key={p.label} onClick={() => handlePreset(p)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step-by-step */}
            {result && result.steps.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Step-by-Step Breakdown
                  </h3>
                  <button onClick={() => setShowSteps(!showSteps)} className="text-sm text-primary font-medium hover:underline">
                    {showSteps ? "Hide" : "Show"}
                  </button>
                </div>
                {showSteps ? (
                  <ol className="space-y-2">
                    {result.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">{i + 1}</span>
                        <code className="font-mono text-gray-700 bg-gray-50 px-2 py-0.5 rounded text-xs">{step}</code>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-gray-500">Click Show to see the full calculation steps.</p>
                )}
              </div>
            )}

            {/* Volume Conversion Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Volume Conversions
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {(["m3", "ft3", "yd3"] as OutputUnit[]).map((unit) => {
                    const val = result[unit as keyof CalculationResult] as number;
                    const isSelected = inputs.outputUnit === unit;
                    return (
                      <div key={unit}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}
                        onClick={() => set("outputUnit", unit)}>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{OUTPUT_UNIT_LABELS[unit]}</div>
                        <div className={`font-bold text-lg break-all ${isSelected ? "text-primary" : "text-gray-900"}`}>{smartFormat(val)}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{OUTPUT_UNIT_SHORT[unit]}</div>
                      </div>
                    );
                  })}
                </div>
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
                          <span className="font-semibold text-gray-900 text-sm capitalize">
                            {EXCAVATION_TYPE_LABELS[entry.inputs.type]} · {entry.inputs.mode}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {smartFormat(entry.result.m3)} m³ · {smartFormat(entry.result.ft3)} ft³
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

      <SoilVolumeCalculatorSEO />
      <RelatedTools
        currentTool="soil-volume-calculator"
        tools={[
          "earth-filling-calculator",
          "cut-and-fill-calculator",
          "excavation-cost-calculator",
          "land-area-calculator-square-feet",
        ]}
      />
    </>
  );
}

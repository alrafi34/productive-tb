"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculatorInputs,
  CalculationResult,
  CalcMethod,
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
  INPUT_UNIT_LABELS,
  INPUT_UNIT_SHORT,
  ALL_INPUT_UNITS,
  OUTPUT_UNIT_LABELS,
  OUTPUT_UNIT_SHORT,
  ALL_OUTPUT_UNITS,
} from "./logic";
import TriangleLandAreaCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ───────────────────────────────────────────────────────────────────

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  {
    label: "50×30 ft",
    inputs: { method: "base-height", unit: "ft", baseHeight: { base: "50", height: "30" } },
  },
  {
    label: "120×85 ft",
    inputs: { method: "base-height", unit: "ft", baseHeight: { base: "120", height: "85" } },
  },
  {
    label: "10-12-14 ft",
    inputs: { method: "three-sides", unit: "ft", threeSides: { sideA: "10", sideB: "12", sideC: "14" } },
  },
  {
    label: "30-40-50 ft",
    inputs: { method: "three-sides", unit: "ft", threeSides: { sideA: "30", sideB: "40", sideC: "50" } },
  },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  method: "base-height",
  unit: "ft",
  outputUnit: "sqft",
  baseHeight: { base: "", height: "" },
  threeSides: { sideA: "", sideB: "", sideC: "" },
  coords: { x1: "", y1: "", x2: "", y2: "", x3: "", y3: "" },
  precision: 2,
};

const METHOD_LABELS: Record<CalcMethod, string> = {
  "base-height": "Base × Height",
  "three-sides": "Three Sides",
  "coordinates": "Coordinates",
};

export default function TriangleLandAreaCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => { setResult(calculate(inputs)); }, 120),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));

  const setBH = (key: keyof CalculatorInputs["baseHeight"], val: string) =>
    setInputs((p) => ({ ...p, baseHeight: { ...p.baseHeight, [key]: val.replace(/[^0-9.]/g, "") } }));

  const setTS = (key: keyof CalculatorInputs["threeSides"], val: string) =>
    setInputs((p) => ({ ...p, threeSides: { ...p.threeSides, [key]: val.replace(/[^0-9.]/g, "") } }));

  const setCoord = (key: keyof CalculatorInputs["coords"], val: string) =>
    setInputs((p) => ({ ...p, coords: { ...p.coords, [key]: val.replace(/[^0-9.\-]/g, "") } }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    firstRef.current?.focus();
  };

  const handlePreset = (preset: (typeof PRESETS)[0]) => {
    setInputs((p) => ({
      ...p,
      ...preset.inputs,
      baseHeight: preset.inputs.baseHeight ?? p.baseHeight,
      threeSides: preset.inputs.threeSides ?? p.threeSides,
      coords: p.coords,
    }));
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Triangle Area: ${smartFormat(result.areaInUnit)} ${OUTPUT_UNIT_SHORT[result.outputUnit]}\n${smartFormat(result.sqft)} ft² | ${smartFormat(result.sqm)} m² | ${smartFormat(result.acres)} acres`;
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
    downloadFile(exportToText(inputs, result), "triangle_area.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const u = INPUT_UNIT_SHORT[inputs.unit];
  const inputCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  const conversionRows: { label: string; unit: OutputUnit }[] = [
    { label: "Square Feet",   unit: "sqft" },
    { label: "Square Meters", unit: "sqm" },
    { label: "Acres",         unit: "acres" },
    { label: "Hectares",      unit: "hectares" },
    { label: "Square Yards",  unit: "sqyd" },
    { label: "Square Inches", unit: "sqin" },
    { label: "Square Cm",     unit: "sqcm" },
  ];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Triangle Land Area Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate triangular plot area using base &amp; height, Heron&apos;s formula (three sides), or vertex coordinates. Instant unit conversions included.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Settings
              </h3>

              {/* Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Method</label>
                <div className="grid grid-cols-1 gap-2">
                  {(["base-height", "three-sides", "coordinates"] as CalcMethod[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => set("method", m)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                        inputs.method === m ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {METHOD_LABELS[m]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Unit</label>
                <select value={inputs.unit} onChange={(e) => set("unit", e.target.value as InputUnit)} className={selectCls}>
                  {ALL_INPUT_UNITS.map((u) => (
                    <option key={u} value={u}>{INPUT_UNIT_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              {/* Output Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Output Unit</label>
                <select value={inputs.outputUnit} onChange={(e) => set("outputUnit", e.target.value as OutputUnit)} className={selectCls}>
                  {ALL_OUTPUT_UNITS.map((u) => (
                    <option key={u} value={u}>{OUTPUT_UNIT_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              {/* Formula hint */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                {inputs.method === "base-height" && <div className="font-mono">Area = (Base × Height) ÷ 2</div>}
                {inputs.method === "three-sides" && (
                  <>
                    <div className="font-mono">s = (a+b+c) ÷ 2</div>
                    <div className="font-mono">Area = √(s(s-a)(s-b)(s-c))</div>
                  </>
                )}
                {inputs.method === "coordinates" && (
                  <div className="font-mono text-[10px] leading-relaxed">Area = ½|x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)|</div>
                )}
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
                Triangle Area
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? smartFormat(result.areaInUnit) : "—"}
              </div>
              {result && <div className="text-primary-100 text-sm mb-3">{OUTPUT_UNIT_SHORT[result.outputUnit]}</div>}

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">ft²:</span>
                    <span className="font-semibold">{smartFormat(result.sqft)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">m²:</span>
                    <span className="font-semibold">{smartFormat(result.sqm)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">acres:</span>
                    <span className="font-semibold">{smartFormat(result.acres)}</span>
                  </div>
                  {result.perimeter !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Perimeter:</span>
                      <span className="font-semibold">{smartFormat(result.perimeter)} ft</span>
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

            {/* Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {inputs.method === "base-height" ? "Base & Height" : inputs.method === "three-sides" ? "Three Side Lengths" : "Vertex Coordinates"}
              </h3>

              {/* Base × Height */}
              {inputs.method === "base-height" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base ({u})</label>
                    <input ref={firstRef} type="number" inputMode="decimal" value={inputs.baseHeight.base}
                      onChange={(e) => setBH("base", e.target.value)} className={inputCls} placeholder="e.g. 50" min="0" step="any" />
                    <p className="text-xs text-gray-500 mt-1">Bottom edge of the triangle</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height ({u})</label>
                    <input type="number" inputMode="decimal" value={inputs.baseHeight.height}
                      onChange={(e) => setBH("height", e.target.value)} className={inputCls} placeholder="e.g. 30" min="0" step="any" />
                    <p className="text-xs text-gray-500 mt-1">Perpendicular height to base</p>
                  </div>
                </div>
              )}

              {/* Three Sides */}
              {inputs.method === "three-sides" && (
                <>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Side A ({u})</label>
                      <input ref={firstRef} type="number" inputMode="decimal" value={inputs.threeSides.sideA}
                        onChange={(e) => setTS("sideA", e.target.value)} className={inputCls} placeholder="e.g. 10" min="0" step="any" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Side B ({u})</label>
                      <input type="number" inputMode="decimal" value={inputs.threeSides.sideB}
                        onChange={(e) => setTS("sideB", e.target.value)} className={inputCls} placeholder="e.g. 12" min="0" step="any" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Side C ({u})</label>
                      <input type="number" inputMode="decimal" value={inputs.threeSides.sideC}
                        onChange={(e) => setTS("sideC", e.target.value)} className={inputCls} placeholder="e.g. 14" min="0" step="any" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">All three sides must satisfy the triangle inequality (a+b &gt; c, etc.)</p>
                </>
              )}

              {/* Coordinates */}
              {inputs.method === "coordinates" && (
                <>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {(["A", "B", "C"] as const).map((pt, i) => {
                      const xKey = `x${i+1}` as keyof CalculatorInputs["coords"];
                      const yKey = `y${i+1}` as keyof CalculatorInputs["coords"];
                      return (
                        <div key={pt} className="space-y-2">
                          <div className="text-sm font-semibold text-gray-700">Point {pt}</div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">X ({u})</label>
                            <input
                              ref={i === 0 ? firstRef : undefined}
                              type="number" inputMode="decimal"
                              value={inputs.coords[xKey]}
                              onChange={(e) => setCoord(xKey, e.target.value)}
                              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-base"
                              placeholder="0"
                              step="any"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Y ({u})</label>
                            <input
                              type="number" inputMode="decimal"
                              value={inputs.coords[yKey]}
                              onChange={(e) => setCoord(yKey, e.target.value)}
                              className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-base"
                              placeholder="0"
                              step="any"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-500">Example: A(0,0), B(10,0), C(5,8)</p>
                </>
              )}

              {/* Inline result preview */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>{result.formula}</strong> → Area = <strong>{smartFormat(result.sqft)} ft²</strong>
                </div>
              )}

              {/* Validation error */}
              {!result && inputs.method === "three-sides" &&
                inputs.threeSides.sideA && inputs.threeSides.sideB && inputs.threeSides.sideC && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  Invalid triangle dimensions. Check that a+b &gt; c, b+c &gt; a, and a+c &gt; b.
                </div>
              )}
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

            {/* Step-by-step breakdown */}
            {result && result.steps.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Breakdown</h3>
                  <button onClick={() => setShowSteps(!showSteps)} className="text-sm text-primary font-medium hover:underline">
                    {showSteps ? "Hide" : "Show"}
                  </button>
                </div>
                {showSteps && (
                  <ol className="space-y-2">
                    {result.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">
                          {i + 1}
                        </span>
                        <code className="font-mono text-gray-700 bg-gray-50 px-2 py-0.5 rounded text-xs">{step}</code>
                      </li>
                    ))}
                  </ol>
                )}
                {!showSteps && (
                  <p className="text-sm text-gray-500">Click Show to see the full calculation steps.</p>
                )}
              </div>
            )}

            {/* Conversion Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Area Conversions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {conversionRows.map(({ label, unit }) => {
                    const val = result[unit as keyof CalculationResult] as number;
                    const isSelected = inputs.outputUnit === unit;
                    return (
                      <div key={unit} className={`p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}
                        onClick={() => set("outputUnit", unit)}>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                        <div className={`font-bold text-base break-all ${isSelected ? "text-primary" : "text-gray-900"}`}>{smartFormat(val)}</div>
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
                          <span className="font-semibold text-gray-900 text-sm">{METHOD_LABELS[entry.inputs.method]}</span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {smartFormat(entry.result.sqft)} ft² · {smartFormat(entry.result.acres)} acres
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

      <TriangleLandAreaCalculatorSEO />
      <RelatedTools
        currentTool="triangle-land-area-calculator"
        tools={[
          "survey-area-calculator",
          "polygon-area-calculator",
          "land-price-calculator",
          "boundary-length-calculator",
        ]}
      />
    </>
  );
}

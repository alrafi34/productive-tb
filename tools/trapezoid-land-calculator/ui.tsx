"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculatorInputs,
  CalculationResult,
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
import TrapezoidLandCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ───────────────────────────────────────────────────────────────────

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  { label: "20-40-15 ft",  inputs: { topBase: "20",  bottomBase: "40",  height: "15",  unit: "ft" } },
  { label: "120-150-80 ft",inputs: { topBase: "120", bottomBase: "150", height: "80",  unit: "ft" } },
  { label: "25-30-12 m",   inputs: { topBase: "25",  bottomBase: "30",  height: "12",  unit: "m"  } },
  { label: "50-80-40 ft",  inputs: { topBase: "50",  bottomBase: "80",  height: "40",  unit: "ft" } },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  topBase:    "",
  bottomBase: "",
  height:     "",
  unit:       "ft",
  outputUnit: "sqft",
  precision:  2,
};

// ── SVG Trapezoid Diagram ─────────────────────────────────────────────────────

function TrapezoidDiagram({
  topBase, bottomBase, height, unit,
}: {
  topBase: number; bottomBase: number; height: number; unit: string;
}) {
  const W = 320, H = 180, PAD = 40;
  const drawW = W - PAD * 2;
  const drawH = H - PAD * 2;

  // Normalize so bottom is always wider visually
  const maxBase = Math.max(topBase, bottomBase, 1);
  const bW = (bottomBase / maxBase) * drawW;
  const tW = (topBase / maxBase) * drawW;
  const bX = PAD + (drawW - bW) / 2;
  const tX = PAD + (drawW - tW) / 2;
  const bY = PAD + drawH;
  const tY = PAD;

  const pts = `${tX},${tY} ${tX + tW},${tY} ${bX + bW},${bY} ${bX},${bY}`;
  const midX = W / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Trapezoid diagram">
      {/* Shape */}
      <polygon points={pts} fill="#05855418" stroke="#058554" strokeWidth="2" />

      {/* Top base label */}
      <line x1={tX} y1={tY - 10} x2={tX + tW} y2={tY - 10} stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
      <text x={midX} y={tY - 14} textAnchor="middle" fontSize="11" fill="#374151" fontFamily="system-ui">
        a = {topBase} {unit}
      </text>

      {/* Bottom base label */}
      <line x1={bX} y1={bY + 10} x2={bX + bW} y2={bY + 10} stroke="#6b7280" strokeWidth="1" strokeDasharray="3,3" />
      <text x={midX} y={bY + 22} textAnchor="middle" fontSize="11" fill="#374151" fontFamily="system-ui">
        b = {bottomBase} {unit}
      </text>

      {/* Height arrow */}
      <line x1={bX - 16} y1={tY} x2={bX - 16} y2={bY} stroke="#058554" strokeWidth="1.5" markerEnd="url(#arr)" markerStart="url(#arr)" />
      <text x={bX - 20} y={(tY + bY) / 2 + 4} textAnchor="end" fontSize="11" fill="#058554" fontFamily="system-ui">
        h={height}{unit}
      </text>

      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#058554" />
        </marker>
      </defs>
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function TrapezoidLandCalculatorUI() {
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

  const setNum = (key: "topBase" | "bottomBase" | "height", val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    firstRef.current?.focus();
  };

  const handlePreset = (preset: (typeof PRESETS)[0]) =>
    setInputs((p) => ({ ...p, ...preset.inputs }));

  const handleCopy = () => {
    if (!result) return;
    const u = INPUT_UNIT_SHORT[inputs.unit];
    const text = `Trapezoid Area\nTop: ${result.topBase}${u}, Bottom: ${result.bottomBase}${u}, Height: ${result.height}${u}\nArea: ${smartFormat(result.areaInUnit)} ${OUTPUT_UNIT_SHORT[result.outputUnit]}\n${smartFormat(result.sqft)} ft² | ${smartFormat(result.sqm)} m² | ${smartFormat(result.acres)} acres`;
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
    downloadFile(exportToText(inputs, result), "trapezoid_land_area.txt");
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
  ];

  // Slider max values (dynamic based on current inputs)
  const topVal    = parseFloat(inputs.topBase)    || 0;
  const bottomVal = parseFloat(inputs.bottomBase) || 0;
  const heightVal = parseFloat(inputs.height)     || 0;
  const sliderMax = Math.max(topVal, bottomVal, heightVal, 200);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Trapezoid Land Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate trapezoid-shaped land area using the formula: Area = ((a + b) ÷ 2) × h. Enter top base, bottom base, and height for instant results.
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_INPUT_UNITS.map((u) => (
                    <button
                      key={u}
                      onClick={() => set("unit", u)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.unit === u ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      {INPUT_UNIT_LABELS[u]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Output Unit</label>
                <select value={inputs.outputUnit} onChange={(e) => set("outputUnit", e.target.value as OutputUnit)} className={selectCls}>
                  {ALL_OUTPUT_UNITS.map((u) => (
                    <option key={u} value={u}>{OUTPUT_UNIT_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              {/* Formula box */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Area = ((a + b) ÷ 2) × h</div>
                <div className="text-gray-500 mt-1">a = top base, b = bottom base, h = height</div>
              </div>

              {/* Live formula with values */}
              {result && (
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-xs font-mono text-primary">
                  (({result.topBase} + {result.bottomBase}) ÷ 2) × {result.height}<br />
                  = {((result.topBase + result.bottomBase) / 2).toFixed(2)} × {result.height}<br />
                  = {smartFormat(result.rawArea)} {u}²
                </div>
              )}

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
                Trapezoid Area
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
                  <div className="flex justify-between">
                    <span className="text-primary-100">hectares:</span>
                    <span className="font-semibold">{smartFormat(result.hectares)}</span>
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

            {/* Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Dimensions
              </h3>

              {/* Top Base */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Top Base — a ({u})</label>
                  <span className="text-xs text-gray-500">shorter parallel side</span>
                </div>
                <input
                  ref={firstRef}
                  type="number" inputMode="decimal"
                  value={inputs.topBase}
                  onChange={(e) => setNum("topBase", e.target.value)}
                  className={inputCls}
                  placeholder="e.g. 20"
                  min="0" step="any"
                />
                <input
                  type="range" min="0" max={sliderMax} step="0.5"
                  value={topVal}
                  onChange={(e) => setNum("topBase", e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mt-2"
                />
              </div>

              {/* Bottom Base */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Bottom Base — b ({u})</label>
                  <span className="text-xs text-gray-500">longer parallel side</span>
                </div>
                <input
                  type="number" inputMode="decimal"
                  value={inputs.bottomBase}
                  onChange={(e) => setNum("bottomBase", e.target.value)}
                  className={inputCls}
                  placeholder="e.g. 40"
                  min="0" step="any"
                />
                <input
                  type="range" min="0" max={sliderMax} step="0.5"
                  value={bottomVal}
                  onChange={(e) => setNum("bottomBase", e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mt-2"
                />
              </div>

              {/* Height */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Height — h ({u})</label>
                  <span className="text-xs text-gray-500">perpendicular distance</span>
                </div>
                <input
                  type="number" inputMode="decimal"
                  value={inputs.height}
                  onChange={(e) => setNum("height", e.target.value)}
                  className={inputCls}
                  placeholder="e.g. 15"
                  min="0" step="any"
                />
                <input
                  type="range" min="0" max={sliderMax} step="0.5"
                  value={heightVal}
                  onChange={(e) => setNum("height", e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mt-2"
                />
              </div>

              {/* Inline result */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>((a + b) ÷ 2) × h</strong> = ((
                  {result.topBase} + {result.bottomBase}) ÷ 2) × {result.height} = <strong>{smartFormat(result.rawArea)} {u}²</strong>
                </div>
              )}
            </div>

            {/* SVG Diagram */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Shape Preview
              </h3>
              {topVal > 0 && bottomVal > 0 && heightVal > 0 ? (
                <TrapezoidDiagram topBase={topVal} bottomBase={bottomVal} height={heightVal} unit={u} />
              ) : (
                <div className="flex items-center justify-center h-32 text-gray-400 text-sm bg-gray-50 rounded-lg border border-gray-200">
                  Enter dimensions to see the trapezoid preview
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

            {/* Step-by-step */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Breakdown</h3>
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

            {/* Conversion Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Area Conversions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {conversionRows.map(({ label, unit }) => {
                    const val = result[unit as keyof CalculationResult] as number;
                    const isSelected = inputs.outputUnit === unit;
                    return (
                      <div key={unit}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}
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
                          <span className="font-semibold text-gray-900 text-sm">
                            {entry.result.topBase}–{entry.result.bottomBase}–{entry.result.height} {INPUT_UNIT_SHORT[entry.inputs.unit]}
                          </span>
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

      <TrapezoidLandCalculatorSEO />
      <RelatedTools
        currentTool="trapezoid-land-calculator"
        tools={[
          "triangle-land-area-calculator",
          "survey-area-calculator",
          "polygon-area-calculator",
          "land-price-calculator",
        ]}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MOIInputs, MOIResult, ShapeType, LengthUnit, HistoryEntry, ShapeDimensions } from "./types";
import {
  calculate, validateInputs, formatNum, debounce,
  saveToHistory, getHistory, clearHistory, exportToText, downloadFile,
  SHAPE_LABELS, SHAPE_HINTS, ALL_UNITS, UNIT_LABELS, DEFAULT_DIMS,
} from "./logic";
import ShapeDiagram from "./ShapeDiagram";
import MomentOfInertiaSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ────────────────────────────────────────────────────────────────
const PRESETS = [
  { label: "Steel W8×31",  shape: "i-beam"        as ShapeType, unit: "in" as LengthUnit, dims: { flangeWidth: "8", flangeThickness: "0.435", webHeight: "7.93", webThickness: "0.285" } },
  { label: "4\" Pipe",     shape: "pipe"           as ShapeType, unit: "in" as LengthUnit, dims: { outerDiameter: "4.5", innerDiameter: "4.026" } },
  { label: "2×6 Lumber",  shape: "rectangle"      as ShapeType, unit: "in" as LengthUnit, dims: { width: "1.5", height: "5.5" } },
  { label: "Round Bar 2\"",shape: "circle"         as ShapeType, unit: "in" as LengthUnit, dims: { diameter: "2" } },
];

const DEFAULT_INPUTS: MOIInputs = {
  shape: "rectangle",
  unit: "in",
  dims: { width: "4", height: "8" },
  precision: 2,
};

// ── Dimension Inputs per shape ─────────────────────────────────────────────
function DimInputs({
  shape, dims, unit, onChange,
}: {
  shape: ShapeType;
  dims: ShapeDimensions;
  unit: string;
  onChange: (d: ShapeDimensions) => void;
}) {
  const inp = (label: string, key: keyof ShapeDimensions, placeholder: string, hint?: string) => (
    <div key={key}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-xs text-gray-400">({unit})</span>
        {hint && <span className="ml-1 text-xs text-gray-400" title={hint}>ⓘ</span>}
      </label>
      <input
        type="number"
        inputMode="decimal"
        value={dims[key] ?? ""}
        onChange={e => onChange({ ...dims, [key]: e.target.value })}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
        placeholder={placeholder}
        min="0"
        step="any"
        aria-label={label}
      />
    </div>
  );

  if (shape === "rectangle") return (
    <div className="grid sm:grid-cols-2 gap-4">
      {inp("Width (b)", "width", "4", "Horizontal dimension")}
      {inp("Height (h)", "height", "8", "Vertical dimension")}
    </div>
  );
  if (shape === "hollow-rectangle") return (
    <div className="grid sm:grid-cols-2 gap-4">
      {inp("Outer Width (b)", "width", "6")}
      {inp("Outer Height (h)", "height", "10")}
      {inp("Inner Width (b_i)", "innerWidth", "4")}
      {inp("Inner Height (h_i)", "innerHeight", "8")}
    </div>
  );
  if (shape === "circle") return (
    <div className="grid sm:grid-cols-2 gap-4">
      {inp("Diameter (d)", "diameter", "4", "Full diameter of the circle")}
    </div>
  );
  if (shape === "hollow-circle" || shape === "pipe") return (
    <div className="grid sm:grid-cols-2 gap-4">
      {inp("Outer Diameter (D)", "outerDiameter", "4")}
      {inp("Inner Diameter (d)", "innerDiameter", "3")}
    </div>
  );
  if (shape === "triangle") return (
    <div className="grid sm:grid-cols-2 gap-4">
      {inp("Base (b)", "base", "6")}
      {inp("Height (h)", "height", "8")}
    </div>
  );
  if (shape === "i-beam") return (
    <div className="grid sm:grid-cols-2 gap-4">
      {inp("Flange Width (bf)", "flangeWidth", "6")}
      {inp("Flange Thickness (tf)", "flangeThickness", "0.5")}
      {inp("Web Height (hw)", "webHeight", "10")}
      {inp("Web Thickness (tw)", "webThickness", "0.375")}
    </div>
  );
  if (shape === "t-beam") return (
    <div className="grid sm:grid-cols-2 gap-4">
      {inp("Flange Width (bf)", "tFlangeWidth", "6")}
      {inp("Flange Thickness (tf)", "tFlangeThickness", "0.5")}
      {inp("Web Height (hw)", "tWebHeight", "8")}
      {inp("Web Thickness (tw)", "tWebThickness", "0.375")}
    </div>
  );
  if (shape === "channel") return (
    <div className="grid sm:grid-cols-2 gap-4">
      {inp("Flange Width (bf)", "chFlangeWidth", "4")}
      {inp("Flange Thickness (tf)", "chFlangeThickness", "0.5")}
      {inp("Web Height (hw)", "chWebHeight", "8")}
      {inp("Web Thickness (tw)", "chWebThickness", "0.375")}
    </div>
  );
  return null;
}

// ── Main UI ────────────────────────────────────────────────────────────────
export default function MomentOfInertiaCalculatorUI() {
  const [inputs,      setInputs]      = useState<MOIInputs>(DEFAULT_INPUTS);
  const [result,      setResult]      = useState<MOIResult | null>(null);
  const [error,       setError]       = useState<string | null>(null);
  const [copied,      setCopied]      = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFormula, setShowFormula] = useState(false);
  const [history,     setHistory]     = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const err = validateInputs(inputs);
      if (err) { setError(err); setResult(null); return; }
      setError(null);
      try { setResult(calculate(inputs)); }
      catch (e) { setError(e instanceof Error ? e.message : "Calculation error"); setResult(null); }
    }, 150),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const set = (patch: Partial<MOIInputs>) => setInputs(p => ({ ...p, ...patch }));

  const handleShapeChange = (shape: ShapeType) => {
    set({ shape, dims: { ...DEFAULT_DIMS[shape] } });
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setError(null);
    firstRef.current?.focus();
  };

  const handlePreset = (preset: typeof PRESETS[0]) => {
    setInputs(p => ({ ...p, shape: preset.shape, unit: preset.unit, dims: { ...preset.dims } }));
  };

  const handleCopy = () => {
    if (!result) return;
    const u = result.unitLabel;
    const text = `Moment of Inertia | Shape: ${SHAPE_LABELS[inputs.shape]} | Ix = ${formatNum(result.Ix, inputs.precision)} ${u} | Iy = ${formatNum(result.Iy, inputs.precision)} ${u} | Ip = ${formatNum(result.Ip, inputs.precision)} ${u}`;
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
    downloadFile(exportToText(inputs, result), "moment-of-inertia-report.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const u = result?.unitLabel ?? `${inputs.unit}⁴`;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Moment of Inertia Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate area moment of inertia (Ix, Iy), polar moment, and section modulus for common structural cross-sections. Used in beam bending, shaft design, and structural analysis.
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
                Moment of Inertia
              </p>
              <div className="text-2xl font-bold mb-1 leading-none break-all">
                {result ? `${formatNum(result.Ix, inputs.precision)} ${u}` : "—"}
              </div>
              <p className="text-primary-100 text-xs mb-3">Ix (about x-axis)</p>

              {result && (
                <div className="pt-3 border-t border-white/20 text-sm space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Ix</span>
                    <span className="font-semibold">{formatNum(result.Ix, inputs.precision)} {u}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Iy</span>
                    <span className="font-semibold">{formatNum(result.Iy, inputs.precision)} {u}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Ip (polar)</span>
                    <span className="font-semibold">{formatNum(result.Ip, inputs.precision)} {u}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Sx</span>
                    <span className="font-semibold">{formatNum(result.Sx, inputs.precision)} {inputs.unit}³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Sy</span>
                    <span className="font-semibold">{formatNum(result.Sy, inputs.precision)} {inputs.unit}³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Area</span>
                    <span className="font-semibold">{formatNum(result.area, inputs.precision)} {result.areaUnitLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Centroid (x, y)</span>
                    <span className="font-semibold">{formatNum(result.centroidX, inputs.precision)}, {formatNum(result.centroidY, inputs.precision)}</span>
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
                  onChange={e => set({ precision: parseInt(e.target.value) as 2 | 4 | 6 })}
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
            </div>
          </div>

          {/* ── Right Panel ────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Shape & Unit Selection */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Shape & Unit</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cross-Section Shape</label>
                  <select
                    ref={firstRef}
                    value={inputs.shape}
                    onChange={e => handleShapeChange(e.target.value as ShapeType)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    aria-label="Select cross-section shape"
                  >
                    {(Object.keys(SHAPE_LABELS) as ShapeType[]).map(s => (
                      <option key={s} value={s}>{SHAPE_LABELS[s]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select
                    value={inputs.unit}
                    onChange={e => set({ unit: e.target.value as LengthUnit })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    aria-label="Select unit"
                  >
                    {ALL_UNITS.map(u => (
                      <option key={u} value={u}>{UNIT_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Shape hint */}
              <p className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                💡 {SHAPE_HINTS[inputs.shape]}
              </p>
            </div>

            {/* Dimensions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800">Dimensions</h3>

              <DimInputs
                shape={inputs.shape}
                dims={inputs.dims}
                unit={inputs.unit}
                onChange={dims => set({ dims })}
              />

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-800 text-sm">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Live formula */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Formula:</strong> {result.formula}
                </div>
              )}
            </div>

            {/* Shape Diagram */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Cross-Section Diagram</h3>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <ShapeDiagram shape={inputs.shape} dims={inputs.dims} unit={inputs.unit} />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(preset => {
                  const active = inputs.shape === preset.shape && inputs.unit === preset.unit;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => handlePreset(preset)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        active
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Breakdown Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Results Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="bg-primary/5">
                        <td className="py-2 px-3 font-medium text-primary">Ix</td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">{formatNum(result.Ix, inputs.precision)} {result.unitLabel}</td>
                        <td className="py-2 px-3 text-gray-500">Moment of inertia about x-axis</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Iy</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.Iy, inputs.precision)} {result.unitLabel}</td>
                        <td className="py-2 px-3 text-gray-500">Moment of inertia about y-axis</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Ip</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.Ip, inputs.precision)} {result.unitLabel}</td>
                        <td className="py-2 px-3 text-gray-500">Polar moment of inertia (Ix + Iy)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Sx</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.Sx, inputs.precision)} {inputs.unit}³</td>
                        <td className="py-2 px-3 text-gray-500">Section modulus about x-axis</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Sy</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.Sy, inputs.precision)} {inputs.unit}³</td>
                        <td className="py-2 px-3 text-gray-500">Section modulus about y-axis</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Area</td>
                        <td className="py-2 px-3 font-mono">{formatNum(result.area, inputs.precision)} {result.areaUnitLabel}</td>
                        <td className="py-2 px-3 text-gray-500">Cross-sectional area</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-medium text-gray-700">Centroid</td>
                        <td className="py-2 px-3 font-mono">({formatNum(result.centroidX, inputs.precision)}, {formatNum(result.centroidY, inputs.precision)}) {inputs.unit}</td>
                        <td className="py-2 px-3 text-gray-500">Centroid location (x, y)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Formula Panel */}
            {showFormula && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800">Formulas & Reference</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { shape: "Rectangle",       formula: "Ix = bh³/12\nIy = hb³/12" },
                      { shape: "Hollow Rect",     formula: "Ix = (bh³ - b_i·h_i³)/12" },
                      { shape: "Solid Circle",    formula: "I = πd⁴/64" },
                      { shape: "Hollow Circle",   formula: "I = π(D⁴ - d⁴)/64" },
                      { shape: "Triangle",        formula: "Ix = bh³/36\nIy = hb³/48" },
                      { shape: "I-Beam",          formula: "Ix = (bf·H³ - (bf-tw)·hw³)/12" },
                    ].map(({ shape: s, formula }) => (
                      <div key={s} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="text-xs font-semibold text-gray-600 mb-1">{s}</div>
                        <div className="font-mono text-xs text-gray-800 whitespace-pre">{formula}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                    <strong>Parallel Axis Theorem:</strong> I = I_c + A·d² — used to shift the moment of inertia from the centroidal axis to any parallel axis at distance d.
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm text-purple-800">
                    <strong>Section Modulus:</strong> S = I / c — where c is the distance from the neutral axis to the extreme fiber. Used to calculate bending stress: σ = M / S.
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
                    history.map(entry => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {SHAPE_LABELS[entry.inputs.shape]} — {entry.inputs.unit}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          Ix = {formatNum(entry.result.Ix, 2)} {entry.result.unitLabel}
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

      <MomentOfInertiaSEO />
      <RelatedTools
        currentTool="moment-of-inertia-calculator"
        tools={[
          "beam-deflection-calculator",
          "stress-calculator",
          "torque-calculator",
          "bending-stress-calculator",
          "section-modulus-calculator",
          "shear-stress-calculator",
        ]}
      />
    </>
  );
}

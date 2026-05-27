"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculatorInputs,
  CalculationResult,
  HistoryEntry,
  OutputUnit,
  PlotMode,
  Unit,
} from "./types";
import {
  calculate,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  smartFormat,
  parsePolygonCoords,
  OUTPUT_UNIT_LABELS,
  OUTPUT_UNIT_SHORT,
  ALL_OUTPUT_UNITS,
  INPUT_UNIT_LABELS,
  ALL_INPUT_UNITS,
} from "./logic";
import SurveyAreaCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ───────────────────────────────────────────────────────────────────

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  {
    label: "Small Lot 100×80 ft",
    inputs: {
      mode: "rectangle",
      unit: "ft",
      rectangle: { length: "100", width: "80" },
    },
  },
  {
    label: "Acre Plot 209×209 ft",
    inputs: {
      mode: "rectangle",
      unit: "ft",
      rectangle: { length: "208.71", width: "208.71" },
    },
  },
  {
    label: "Triangle 10-12-14 ft",
    inputs: {
      mode: "triangle",
      unit: "ft",
      triangle: { sideA: "10", sideB: "12", sideC: "14" },
    },
  },
  {
    label: "Polygon Sample",
    inputs: {
      mode: "polygon",
      polygonCoords: "0 0\n100 0\n100 50\n0 50",
    },
  },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  mode: "rectangle",
  unit: "ft",
  outputUnit: "sqft",
  rectangle: { length: "", width: "" },
  triangle: { sideA: "", sideB: "", sideC: "" },
  polygonCoords: "",
  precision: 2,
};

const MODE_LABELS: Record<PlotMode, string> = {
  rectangle: "Rectangle",
  triangle: "Triangle",
  polygon: "Polygon",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function SurveyAreaCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [polygonError, setPolygonError] = useState<string | null>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstInputRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      // Validate polygon coords
      if (inputs.mode === "polygon" && inputs.polygonCoords.trim()) {
        const pts = parsePolygonCoords(inputs.polygonCoords);
        if (!pts) {
          setPolygonError("Invalid coordinates. Enter pairs like: 0 0, 100 0, 100 50, 0 50");
          setResult(null);
          return;
        }
        setPolygonError(null);
      } else {
        setPolygonError(null);
      }
      setResult(calculate(inputs));
    }, 150),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));

  const setRect = (key: keyof CalculatorInputs["rectangle"], value: string) =>
    setInputs((p) => ({ ...p, rectangle: { ...p.rectangle, [key]: value.replace(/[^0-9.]/g, "") } }));

  const setTri = (key: keyof CalculatorInputs["triangle"], value: string) =>
    setInputs((p) => ({ ...p, triangle: { ...p.triangle, [key]: value.replace(/[^0-9.]/g, "") } }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setPolygonError(null);
    firstInputRef.current?.focus();
  };

  const handlePreset = (preset: (typeof PRESETS)[0]) => {
    setInputs((p) => ({
      ...p,
      ...preset.inputs,
      rectangle: preset.inputs.rectangle ?? p.rectangle,
      triangle: preset.inputs.triangle ?? p.triangle,
      polygonCoords: preset.inputs.polygonCoords ?? p.polygonCoords,
    }));
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Survey Area Result\nArea: ${smartFormat(result.areaInUnit)} ${OUTPUT_UNIT_SHORT[result.outputUnit]}\n${smartFormat(result.sqft)} sq ft | ${smartFormat(result.sqm)} sq m | ${smartFormat(result.acres)} acres`;
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
    downloadFile(exportToText(inputs, result), "survey_area_result.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const inputCls =
    "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls =
    "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  // Conversion rows to display
  const conversionRows: { label: string; unit: OutputUnit }[] = [
    { label: "Square Feet",   unit: "sqft" },
    { label: "Square Meters", unit: "sqm" },
    { label: "Acres",         unit: "acres" },
    { label: "Hectares",      unit: "hectares" },
    { label: "Square Yards",  unit: "sqyd" },
    { label: "Decimal",       unit: "decimal" },
    { label: "Bigha",         unit: "bigha" },
    { label: "Katha",         unit: "katha" },
  ];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🗺️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Survey Area Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate land area for rectangle, triangle, and polygon plots. Get instant conversions to sq ft, sq m, acres, hectares, and more.
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

              {/* Plot Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plot Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["rectangle", "triangle", "polygon"] as PlotMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => set("mode", m)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        inputs.mode === m
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {MODE_LABELS[m]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Unit</label>
                <select
                  value={inputs.unit}
                  onChange={(e) => set("unit", e.target.value as Unit)}
                  className={selectCls}
                >
                  {ALL_INPUT_UNITS.map((u) => (
                    <option key={u} value={u}>{INPUT_UNIT_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              {/* Output Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Output Unit</label>
                <select
                  value={inputs.outputUnit}
                  onChange={(e) => set("outputUnit", e.target.value as OutputUnit)}
                  className={selectCls}
                >
                  {ALL_OUTPUT_UNITS.map((u) => (
                    <option key={u} value={u}>{OUTPUT_UNIT_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              {/* Formula hint */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                {inputs.mode === "rectangle" && <div className="font-mono">Area = Length × Width</div>}
                {inputs.mode === "triangle" && (
                  <>
                    <div className="font-mono">s = (a+b+c) / 2</div>
                    <div className="font-mono">Area = √(s·(s-a)·(s-b)·(s-c))</div>
                  </>
                )}
                {inputs.mode === "polygon" && (
                  <div className="font-mono">Area = ½|Σ(xᵢyᵢ₊₁ − yᵢxᵢ₊₁)|</div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset
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

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p
                className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Total Area
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? smartFormat(result.areaInUnit) : "—"}
              </div>
              {result && (
                <div className="text-primary-100 text-sm mb-3">
                  {OUTPUT_UNIT_SHORT[result.outputUnit]}
                </div>
              )}

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-1">
                  <div className="flex justify-between">
                    <span className="text-primary-100">sq ft:</span>
                    <span className="font-semibold">{smartFormat(result.sqft)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">sq m:</span>
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

          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {inputs.mode === "rectangle"
                  ? "Rectangle Dimensions"
                  : inputs.mode === "triangle"
                  ? "Triangle Sides"
                  : "Polygon Coordinates"}
              </h3>

              {/* Rectangle */}
              {inputs.mode === "rectangle" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({inputs.unit})
                    </label>
                    <input
                      ref={firstInputRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.rectangle.length}
                      onChange={(e) => setRect("length", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. 100"
                      min="0"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width ({inputs.unit})
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.rectangle.width}
                      onChange={(e) => setRect("width", e.target.value)}
                      className={inputCls}
                      placeholder="e.g. 80"
                      min="0"
                      step="any"
                    />
                  </div>
                </div>
              )}

              {/* Triangle */}
              {inputs.mode === "triangle" && (
                <>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Side A ({inputs.unit})
                      </label>
                      <input
                        ref={firstInputRef}
                        type="number"
                        inputMode="decimal"
                        value={inputs.triangle.sideA}
                        onChange={(e) => setTri("sideA", e.target.value)}
                        className={inputCls}
                        placeholder="e.g. 10"
                        min="0"
                        step="any"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Side B ({inputs.unit})
                      </label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={inputs.triangle.sideB}
                        onChange={(e) => setTri("sideB", e.target.value)}
                        className={inputCls}
                        placeholder="e.g. 12"
                        min="0"
                        step="any"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Side C ({inputs.unit})
                      </label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={inputs.triangle.sideC}
                        onChange={(e) => setTri("sideC", e.target.value)}
                        className={inputCls}
                        placeholder="e.g. 14"
                        min="0"
                        step="any"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Uses Heron&apos;s Formula. All three sides must satisfy the triangle inequality.
                  </p>
                </>
              )}

              {/* Polygon */}
              {inputs.mode === "polygon" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coordinates (one pair per line: x y)
                    </label>
                    <textarea
                      value={inputs.polygonCoords}
                      onChange={(e) => set("polygonCoords", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm resize-none"
                      rows={6}
                      placeholder={"0 0\n100 0\n100 50\n0 50"}
                      spellCheck={false}
                    />
                  </div>
                  {polygonError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      {polygonError}
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Enter at least 3 coordinate pairs. Format: <code className="bg-gray-100 px-1 rounded">x y</code> per line, or comma-separated pairs. Uses the Shoelace formula.
                  </p>
                </>
              )}

              {/* Inline area preview */}
              {result && inputs.mode === "rectangle" && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>{inputs.rectangle.length} × {inputs.rectangle.width} {inputs.unit}</strong> ={" "}
                  <strong>{smartFormat(result.areaSqFt)} sq ft</strong>
                </div>
              )}
              {result && inputs.mode === "triangle" && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Heron&apos;s formula</strong> → Area ={" "}
                  <strong>{smartFormat(result.areaSqFt)} sq ft</strong>
                </div>
              )}
              {result && inputs.mode === "polygon" && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Shoelace formula</strong> → Area ={" "}
                  <strong>{smartFormat(result.areaSqFt)} sq ft</strong>
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handlePreset(p)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Conversion Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3
                  className="font-semibold text-gray-800 mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Area Conversions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {conversionRows.map(({ label, unit }) => {
                    const val = result[unit as keyof CalculationResult] as number;
                    const isSelected = inputs.outputUnit === unit;
                    return (
                      <div
                        key={unit}
                        className={`p-3 rounded-lg border ${
                          isSelected
                            ? "bg-primary/5 border-primary/20"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          {label}
                        </div>
                        <div
                          className={`font-bold text-base break-all ${
                            isSelected ? "text-primary" : "text-gray-900"
                          }`}
                        >
                          {smartFormat(val)}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {OUTPUT_UNIT_SHORT[unit]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3
                    className="font-semibold text-gray-800"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Calculation History
                  </h3>
                  {history.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      No calculations saved yet
                    </div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setInputs(entry.inputs);
                          setShowHistory(false);
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm capitalize">
                            {entry.inputs.mode} plot
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {smartFormat(entry.result.sqft)} sq ft ·{" "}
                          {smartFormat(entry.result.acres)} acres
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

      <SurveyAreaCalculatorSEO />
      <RelatedTools
        currentTool="survey-area-calculator"
        tools={[
          "land-area-calculator-square-feet",
          "polygon-area-calculator",
          "land-price-calculator",
          "boundary-length-calculator",
        ]}
      />
    </>
  );
}

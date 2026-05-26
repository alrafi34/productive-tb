"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalculatorInputs, CalculationResult, HistoryEntry, Side, ShapeMode, Unit } from "./types";
import {
  calculate,
  formatNumber,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  UNIT_LABELS,
  UNIT_SHORT,
  ALL_UNITS,
} from "./logic";
import BoundaryLengthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: CalculatorInputs = {
  sides: [
    { id: "1", value: "" },
    { id: "2", value: "" },
    { id: "3", value: "" },
    { id: "4", value: "" },
  ],
  unit: "ft",
  shapeMode: "manual",
  rectangleLength: "",
  rectangleWidth: "",
  squareSide: "",
  triangleSide1: "",
  triangleSide2: "",
  triangleSide3: "",
  precision: 2,
};

export default function BoundaryLengthCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstInputRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => {
    run();
  }, [inputs, run]);

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    firstInputRef.current?.focus();
  };

  const handleAddSide = () => {
    setInputs((p) => ({
      ...p,
      sides: [...p.sides, { id: Date.now().toString(), value: "" }],
    }));
  };

  const handleRemoveSide = (id: string) => {
    if (inputs.sides.length <= 1) return;
    setInputs((p) => ({
      ...p,
      sides: p.sides.filter((s) => s.id !== id),
    }));
  };

  const handleSideChange = (id: string, value: string) => {
    setInputs((p) => ({
      ...p,
      sides: p.sides.map((s) => (s.id === id ? { ...s, value: value.replace(/[^0-9.]/g, "") } : s)),
    }));
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Boundary Length: ${formatNumber(result.totalBoundary, inputs.precision)} ${UNIT_SHORT[inputs.unit]}`;
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
    downloadFile(exportToText(inputs, result), "boundary_length_calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") handleReset();
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📏</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Boundary Length Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate total boundary length or perimeter instantly for plots, land, rooms, or property boundaries. Enter side lengths or choose a preset shape.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Settings
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shape Mode</label>
                <select
                  value={inputs.shapeMode}
                  onChange={(e) => setInputs((p) => ({ ...p, shapeMode: e.target.value as ShapeMode }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="manual">Manual Side Entry</option>
                  <option value="rectangle">Rectangle</option>
                  <option value="square">Square</option>
                  <option value="triangle">Triangle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={inputs.unit}
                  onChange={(e) => setInputs((p) => ({ ...p, unit: e.target.value as Unit }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  {ALL_UNITS.map((u) => (
                    <option key={u} value={u}>
                      {UNIT_LABELS[u]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select
                  value={inputs.precision}
                  onChange={(e) => setInputs((p) => ({ ...p, precision: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={0}>0 decimal places</option>
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
                </select>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">
                  {inputs.shapeMode === "rectangle" && "P = 2 × (L + W)"}
                  {inputs.shapeMode === "square" && "P = 4 × Side"}
                  {inputs.shapeMode === "triangle" && "P = a + b + c"}
                  {inputs.shapeMode === "manual" && "P = Sum of All Sides"}
                </div>
              </div>

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

            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Total Boundary Length
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? `${formatNumber(result.totalBoundary, inputs.precision)} ${UNIT_SHORT[inputs.unit]}` : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Number of Sides:</span>
                    <span className="font-semibold">{result.sidesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Unit:</span>
                    <span className="font-semibold">{UNIT_LABELS[inputs.unit]}</span>
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

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Enter Boundary Details
              </h3>

              {inputs.shapeMode === "manual" && (
                <>
                  <div className="space-y-3">
                    {inputs.sides.map((side, index) => (
                      <div key={side.id} className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Side {index + 1}
                          </label>
                          <input
                            ref={index === 0 ? firstInputRef : null}
                            type="number"
                            inputMode="decimal"
                            value={side.value}
                            onChange={(e) => handleSideChange(side.id, e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                            placeholder={`e.g. ${10 + index * 5}`}
                            min="0"
                            step="any"
                          />
                        </div>
                        {inputs.sides.length > 1 && (
                          <button
                            onClick={() => handleRemoveSide(side.id)}
                            className="mt-8 px-3 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm font-medium"
                            title="Remove side"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleAddSide}
                    className="w-full px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-medium text-sm"
                  >
                    ➕ Add Side
                  </button>
                </>
              )}

              {inputs.shapeMode === "rectangle" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                    <input
                      ref={firstInputRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.rectangleLength}
                      onChange={(e) => setInputs((p) => ({ ...p, rectangleLength: e.target.value.replace(/[^0-9.]/g, "") }))}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="e.g. 20"
                      min="0"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.rectangleWidth}
                      onChange={(e) => setInputs((p) => ({ ...p, rectangleWidth: e.target.value.replace(/[^0-9.]/g, "") }))}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="e.g. 10"
                      min="0"
                      step="any"
                    />
                  </div>
                </div>
              )}

              {inputs.shapeMode === "square" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Side Length</label>
                  <input
                    ref={firstInputRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.squareSide}
                    onChange={(e) => setInputs((p) => ({ ...p, squareSide: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="e.g. 15"
                    min="0"
                    step="any"
                  />
                </div>
              )}

              {inputs.shapeMode === "triangle" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Side 1</label>
                    <input
                      ref={firstInputRef}
                      type="number"
                      inputMode="decimal"
                      value={inputs.triangleSide1}
                      onChange={(e) => setInputs((p) => ({ ...p, triangleSide1: e.target.value.replace(/[^0-9.]/g, "") }))}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="e.g. 10"
                      min="0"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Side 2</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.triangleSide2}
                      onChange={(e) => setInputs((p) => ({ ...p, triangleSide2: e.target.value.replace(/[^0-9.]/g, "") }))}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="e.g. 12"
                      min="0"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Side 3</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.triangleSide3}
                      onChange={(e) => setInputs((p) => ({ ...p, triangleSide3: e.target.value.replace(/[^0-9.]/g, "") }))}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="e.g. 8"
                      min="0"
                      step="any"
                    />
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>

              {result && result.breakdown.length > 0 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Calculation:</strong>{" "}
                    {result.breakdown.join(" + ")}
                    {" = "}
                    <strong>
                      {formatNumber(result.totalBoundary, inputs.precision)} {UNIT_SHORT[inputs.unit]}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Boundary Breakdown
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Multiplier
                        </th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Boundary Length
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[0.5, 1, 2, 5, 10].map((multiplier) => {
                        const scaled = result.totalBoundary * multiplier;
                        const isActive = multiplier === 1;
                        return (
                          <tr key={multiplier} className={`hover:bg-gray-50 transition-colors ${isActive ? "bg-primary/5" : ""}`}>
                            <td className={`py-2 px-3 font-mono ${isActive ? "text-primary font-semibold" : "text-gray-700"}`}>
                              ×{multiplier}
                            </td>
                            <td className={`py-2 px-3 font-mono font-semibold ${isActive ? "text-primary" : "text-gray-900"}`}>
                              {formatNumber(scaled, inputs.precision)} {UNIT_SHORT[inputs.unit]}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Calculation History
                  </h3>
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
                            {entry.inputs.shapeMode.charAt(0).toUpperCase() + entry.inputs.shapeMode.slice(1)} - {entry.result.sidesCount} sides
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {formatNumber(entry.result.totalBoundary, 2)} {UNIT_SHORT[entry.inputs.unit]}
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

      <BoundaryLengthCalculatorSEO />
      <RelatedTools
        currentTool="boundary-length-calculator"
        tools={[
          "plot-division-calculator",
          "land-area-calculator-square-feet",
          "fence-material-calculator",
          "land-price-calculator",
        ]}
      />
    </>
  );
}

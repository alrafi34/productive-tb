"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalculatorInputs, CalculationResult, HistoryEntry, Unit } from "./types";
import {
  calculate,
  validatePositive,
  validatePlots,
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
import PlotDivisionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: CalculatorInputs = {
  totalLand: "",
  landUnit: "sqft",
  numPlots: "",
  landWidth: "",
  landLength: "",
  roadWidth: "",
  divisionMode: "equal-area",
  customRows: "",
  customCols: "",
};

export default function PlotDivisionCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [landError, setLandError] = useState<string | null>(null);
  const [plotError, setPlotError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const landRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    landRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const le = validatePositive(inputs.totalLand, "Total land");
      const pe = validatePlots(inputs.numPlots);
      setLandError(le);
      setPlotError(pe);
      if (le || pe) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 150),
    [inputs]
  );

  useEffect(() => {
    if (inputs.totalLand === "" && inputs.numPlots === "") {
      setResult(null); setLandError(null); setPlotError(null); return;
    }
    run();
  }, [inputs, run]);

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setLandError(null);
    setPlotError(null);
    landRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `${formatNumber(parseFloat(inputs.totalLand))} ${UNIT_LABELS[inputs.landUnit]} ÷ ${inputs.numPlots} plots = ${formatNumber(result.plotSize)} ${UNIT_LABELS[inputs.landUnit]} per plot`;
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
    downloadFile(exportToText(inputs, result), "plot_division_calculation.txt");
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

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Plot Division Calculator</h3>
              <p className="text-sm text-blue-800">
                Divide land into equal plots instantly. Enter total land size and number of plots to calculate individual plot sizes with optional road spacing and layout planning.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Division Mode</label>
                <select
                  value={inputs.divisionMode}
                  onChange={(e) => setInputs((p) => ({ ...p, divisionMode: e.target.value as any }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="equal-area">Equal Area</option>
                  <option value="equal-width">Equal Width</option>
                  <option value="equal-length">Equal Length</option>
                  <option value="custom-grid">Custom Grid</option>
                </select>
              </div>

              {inputs.divisionMode === "custom-grid" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rows</label>
                    <input
                      type="number"
                      value={inputs.customRows}
                      onChange={(e) => setInputs((p) => ({ ...p, customRows: e.target.value.replace(/[^0-9]/g, "") }))}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="2"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cols</label>
                    <input
                      type="number"
                      value={inputs.customCols}
                      onChange={(e) => setInputs((p) => ({ ...p, customCols: e.target.value.replace(/[^0-9]/g, "") }))}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="5"
                      min="1"
                    />
                  </div>
                </div>
              )}

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Plot Size = Total Land ÷ Plots</div>
                {result && result.roadArea > 0 && (
                  <div className="text-gray-500 mt-1">Road area deducted from total</div>
                )}
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
                Plot Size (Each)
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? `${formatNumber(result.plotSize)} ${UNIT_SHORT[inputs.landUnit]}` : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Land:</span>
                    <span className="font-semibold">{formatNumber(parseFloat(inputs.totalLand))} {UNIT_SHORT[inputs.landUnit]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Number of Plots:</span>
                    <span className="font-semibold">{inputs.numPlots}</span>
                  </div>
                  {result.roadArea > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Road Area:</span>
                        <span className="font-semibold">{formatNumber(result.roadArea)} {UNIT_SHORT[inputs.landUnit]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Usable Land:</span>
                        <span className="font-semibold">{formatNumber(result.usableLand)} {UNIT_SHORT[inputs.landUnit]}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Layout:</span>
                    <span className="font-semibold">{result.suggestedRows} × {result.suggestedCols}</span>
                  </div>
                  {result.plotWidth && result.plotLength && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Plot Dimensions:</span>
                      <span className="font-semibold">{formatNumber(result.plotWidth)} × {formatNumber(result.plotLength)}</span>
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

          </div>

          <div className="lg:col-span-8 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Enter Land Details
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Land Size</label>
                  <input
                    ref={landRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.totalLand}
                    onChange={(e) => setInputs((p) => ({ ...p, totalLand: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${landError ? "border-red-300" : "border-gray-200"}`}
                    placeholder="e.g. 10000"
                    min="0"
                    step="any"
                  />
                  {landError && <p className="text-xs text-red-600 mt-1">{landError}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Unit</label>
                  <select
                    value={inputs.landUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, landUnit: e.target.value as Unit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_UNITS.map((u) => (
                      <option key={u} value={u}>{UNIT_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Plots</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={inputs.numPlots}
                  onChange={(e) => setInputs((p) => ({ ...p, numPlots: e.target.value.replace(/[^0-9]/g, "") }))}
                  onKeyDown={handleKeyDown}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${plotError ? "border-red-300" : "border-gray-200"}`}
                  placeholder="e.g. 5"
                  min="1"
                  step="1"
                />
                {plotError && <p className="text-xs text-red-600 mt-1">{plotError}</p>}
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Optional: Land Dimensions</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Land Width</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.landWidth}
                      onChange={(e) => setInputs((p) => ({ ...p, landWidth: e.target.value.replace(/[^0-9.]/g, "") }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                      placeholder="e.g. 100"
                      min="0"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Land Length</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.landLength}
                      onChange={(e) => setInputs((p) => ({ ...p, landLength: e.target.value.replace(/[^0-9.]/g, "") }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                      placeholder="e.g. 80"
                      min="0"
                      step="any"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Road Width (Optional)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={inputs.roadWidth}
                  onChange={(e) => setInputs((p) => ({ ...p, roadWidth: e.target.value.replace(/[^0-9.]/g, "") }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                  placeholder="e.g. 10"
                  min="0"
                  step="any"
                />
                <p className="text-xs text-gray-500 mt-1">Space reserved for roads between plots</p>
              </div>

              <p className="text-xs text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Calculation:</strong>{" "}
                    {formatNumber(parseFloat(inputs.totalLand))} {UNIT_LABELS[inputs.landUnit]}
                    {" ÷ "}{inputs.numPlots} plots
                    {" = "}<strong>{formatNumber(result.plotSize)} {UNIT_LABELS[inputs.landUnit]} per plot</strong>
                  </div>
                </div>
              )}
            </div>

            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Plot Size Breakdown
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plots</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Each Plot Size</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Area</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[1, 2, 5, 10, 20, 50].map((multiplier) => {
                        const scaledPlots = parseInt(inputs.numPlots) * multiplier;
                        const scaledPlotSize = result.usableLand / scaledPlots;
                        const isActive = multiplier === 1;
                        return (
                          <tr key={multiplier} className={`hover:bg-gray-50 transition-colors ${isActive ? "bg-primary/5" : ""}`}>
                            <td className={`py-2 px-3 font-mono ${isActive ? "text-primary font-semibold" : "text-gray-700"}`}>
                              {scaledPlots}
                            </td>
                            <td className={`py-2 px-3 font-mono font-semibold ${isActive ? "text-primary" : "text-gray-900"}`}>
                              {formatNumber(scaledPlotSize)} {UNIT_SHORT[inputs.landUnit]}
                            </td>
                            <td className="py-2 px-3 font-mono text-gray-600">
                              {formatNumber(result.usableLand)} {UNIT_SHORT[inputs.landUnit]}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {result && result.plotWidth && result.plotLength && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Visual Layout Preview
                </h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result.suggestedCols}, 1fr)` }}>
                    {Array.from({ length: result.suggestedRows * result.suggestedCols }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-primary/10 border-2 border-primary rounded-lg p-3 text-center"
                        style={{ aspectRatio: `${result.plotWidth} / ${result.plotLength}` }}
                      >
                        <div className="text-xs font-semibold text-primary">Plot {i + 1}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {formatNumber(result.plotSize, 0)} {UNIT_SHORT[inputs.landUnit]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-600 text-center">
                    Layout: {result.suggestedRows} rows × {result.suggestedCols} columns
                  </div>
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
                            {formatNumber(parseFloat(entry.inputs.totalLand))} {UNIT_LABELS[entry.inputs.landUnit]}
                            {" ÷ "}{entry.inputs.numPlots} plots
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {formatNumber(entry.result.plotSize)} {UNIT_LABELS[entry.inputs.landUnit]} per plot
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

      <PlotDivisionCalculatorSEO />
      <RelatedTools
        currentTool="plot-division-calculator"
        tools={[
          "land-price-calculator",
          "land-area-calculator-square-feet",
          "boundary-length-calculator",
          "fence-material-calculator",
        ]}
      />
    </>
  );
}

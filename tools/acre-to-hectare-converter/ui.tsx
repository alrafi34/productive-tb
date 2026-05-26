"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ConverterInputs, ConverterResult, HistoryEntry } from "./types";
import {
  convert,
  validateInput,
  formatNumber,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  HECTARES_PER_ACRE,
} from "./logic";
import AcreToHectareConverterSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS = [
  { label: "1 ac", value: "1" },
  { label: "5 ac", value: "5" },
  { label: "10 ac", value: "10" },
  { label: "50 ac", value: "50" },
  { label: "100 ac", value: "100" },
];

function getComparison(hectares: number): string {
  if (hectares < 0.1) return "Smaller than a typical city block";
  if (hectares < 0.5) return "About the size of a large residential lot";
  if (hectares < 1) return "Similar to a small park or playground";
  if (hectares < 5) return "Comparable to a few city blocks";
  if (hectares < 10) return "About the size of a small farm";
  if (hectares < 50) return "Similar to a medium-sized farm";
  if (hectares < 100) return "Comparable to a large agricultural property";
  return "Equivalent to a very large farm or ranch";
}

export default function AcreToHectareConverterUI() {
  const [inputs, setInputs] = useState<ConverterInputs>({ value: "", precision: 4 });
  const [result, setResult] = useState<ConverterResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    inputRef.current?.focus();
  }, []);

  const calculate = useCallback(
    debounce(() => {
      const err = validateInput(inputs.value);
      if (err) {
        setError(err);
        setResult(null);
        return;
      }
      setError(null);
      setResult(convert(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => {
    if (inputs.value === "") {
      setResult(null);
      setError(null);
      return;
    }
    calculate();
  }, [inputs, calculate]);

  const handleValueChange = (val: string) => {
    setInputs((prev) => ({ ...prev, value: val.replace(/[^0-9.]/g, "") }));
  };

  const handlePrecisionChange = (precision: number) => {
    setInputs((prev) => ({ ...prev, precision }));
  };

  const handlePreset = (value: string) => {
    setInputs((prev) => ({ ...prev, value }));
    inputRef.current?.focus();
  };

  const handleReset = () => {
    setInputs({ value: "", precision: 4 });
    setResult(null);
    setError(null);
    inputRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `${formatNumber(result.acres, inputs.precision)} acres = ${formatNumber(result.hectares, inputs.precision)} hectares`
    );
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
    downloadFile(exportToText(inputs, result), "acre_to_hectare_conversion.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all conversion history?")) {
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

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔄</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Acre to Hectare Converter</h3>
              <p className="text-sm text-blue-800">
                Enter any acre value to instantly convert it to hectares. 1 acre = 0.404686 hectares.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left Panel */}
          <div className="lg:col-span-4 space-y-6">

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Settings
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decimal Precision
                </label>
                <select
                  value={inputs.precision}
                  onChange={(e) => handlePrecisionChange(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
                  <option value={6}>6 decimal places</option>
                  <option value={8}>8 decimal places</option>
                </select>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Formula</div>
                <div className="text-sm font-mono text-gray-900">
                  ha = acres × 0.404686
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

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p
                className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Hectares
              </p>
              <div className="text-4xl font-bold mb-1 leading-none break-all">
                {result ? formatNumber(result.hectares, inputs.precision) : "—"}
              </div>
              <div className="text-lg text-primary-100 mb-4">
                ha
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Input:</span>
                    <span className="font-semibold">{formatNumber(result.acres, inputs.precision)} acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Factor:</span>
                    <span className="font-semibold">× {HECTARES_PER_ACRE}</span>
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

          {/* Right Panel */}
          <div className="lg:col-span-8 space-y-6">

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Enter Acres
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Acres</label>
                <input
                  ref={inputRef}
                  type="number"
                  inputMode="decimal"
                  value={inputs.value}
                  onChange={(e) => handleValueChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="e.g. 2.47105"
                  min="0"
                  step="any"
                  aria-label="Acre value"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tip: Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
                </p>

                {result && !error && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      <strong>Calculation:</strong>{" "}
                      {formatNumber(result.acres, inputs.precision)} × 0.404686 ={" "}
                      <strong>{formatNumber(result.hectares, inputs.precision)} hectares</strong>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800 text-sm">
                      <span>⚠️</span>
                      <span>{error}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => handlePreset(p.value)}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
                      inputs.value === p.value
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Land Size Comparison */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Land Size Context
                </h3>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <span className="text-lg">📏</span>
                    <span className="font-medium text-sm">{getComparison(result.hectares)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Reference Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Common Conversions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acres</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Hectares</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[0.25, 0.5, 1, 2, 5, 10, 25, 50, 100].map((acres) => (
                      <tr
                        key={acres}
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                          parseFloat(inputs.value) === acres ? "bg-primary/5" : ""
                        }`}
                        onClick={() => handlePreset(String(acres))}
                      >
                        <td className="py-2 px-3 font-mono text-gray-700">{acres}</td>
                        <td className="py-2 px-3 font-mono font-semibold text-gray-900">
                          {formatNumber(acres * HECTARES_PER_ACRE, inputs.precision)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Conversion History
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
                    <div className="p-8 text-center text-gray-400">No conversions saved yet</div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {formatNumber(entry.result.acres, entry.inputs.precision)} acres
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          = {formatNumber(entry.result.hectares, entry.inputs.precision)} hectares
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

      <AcreToHectareConverterSEO />
      <RelatedTools
        currentTool="acre-to-hectare-converter"
        tools={[
          "hectare-to-acre-converter",
          "acre-to-square-feet-converter",
          "square-feet-to-acre-converter",
          "land-area-calculator-square-meter",
        ]}
      />
    </>
  );
}
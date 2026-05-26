"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ConverterInputs, ConverterResult, HistoryEntry } from "./types";
import {
  convert,
  convertReverse,
  validateInput,
  formatNumber,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  getComparison,
  ACRES_PER_HECTARE,
} from "./logic";
import HectareToAcreConverterSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS = [
  { label: "1 ha", value: "1" },
  { label: "5 ha", value: "5" },
  { label: "10 ha", value: "10" },
  { label: "50 ha", value: "50" },
  { label: "100 ha", value: "100" },
];

export default function HectareToAcreConverterUI() {
  const [inputs, setInputs] = useState<ConverterInputs>({ value: "", precision: 4 });
  const [result, setResult] = useState<ConverterResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [reversed, setReversed] = useState(false);
  const [reverseValue, setReverseValue] = useState("");
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

  // Reverse: acres → hectares
  const reverseNum = reverseValue !== "" ? parseFloat(reverseValue) : NaN;
  const reverseResult = !isNaN(reverseNum) && reverseNum >= 0
    ? convertReverse(reverseNum)
    : null;

  const handleValueChange = (val: string) => {
    setInputs((prev) => ({ ...prev, value: val.replace(/[^0-9.]/g, "") }));
  };

  const handlePrecisionChange = (precision: number) => {
    setInputs((prev) => ({ ...prev, precision }));
  };

  const handlePreset = (value: string) => {
    setReversed(false);
    setInputs((prev) => ({ ...prev, value }));
    inputRef.current?.focus();
  };

  const handleReset = () => {
    setInputs({ value: "", precision: 4 });
    setResult(null);
    setError(null);
    setReversed(false);
    setReverseValue("");
    inputRef.current?.focus();
  };

  const handleSwap = () => {
    setReversed((r) => !r);
    setReverseValue("");
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `${formatNumber(result.hectares, inputs.precision)} hectares = ${formatNumber(result.acres, inputs.precision)} acres`
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
    downloadFile(exportToText(inputs, result), "hectare_to_acre_conversion.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all conversion history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setReversed(false);
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
              <h3 className="font-semibold text-blue-900 mb-1">Hectare to Acre Converter</h3>
              <p className="text-sm text-blue-800">
                Enter any hectare value to instantly convert it to acres. 1 hectare = 2.47105 acres.
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
                  {reversed ? "ha = acres ÷ 2.47105" : "acres = ha × 2.47105"}
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={handleSwap}
                  className={`w-full px-4 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                    reversed
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  ⇄ {reversed ? "Back to ha → ac" : "Swap: ac → ha"}
                </button>
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
                {result && !reversed && (
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
                {reversed ? "Hectares" : "Acres"}
              </p>
              <div className="text-4xl font-bold mb-1 leading-none break-all">
                {reversed
                  ? reverseResult !== null
                    ? formatNumber(reverseResult, inputs.precision)
                    : "—"
                  : result
                  ? formatNumber(result.acres, inputs.precision)
                  : "—"}
              </div>
              <div className="text-lg text-primary-100 mb-4">
                {reversed ? "ha" : "acres"}
              </div>

              {!reversed && result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Input:</span>
                    <span className="font-semibold">{formatNumber(result.hectares, inputs.precision)} ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Factor:</span>
                    <span className="font-semibold">× {ACRES_PER_HECTARE}</span>
                  </div>
                </div>
              )}

              {!reversed && (
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
              )}
            </div>

          </div>

          {/* Right Panel */}
          <div className="lg:col-span-8 space-y-6">

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {reversed ? "Enter Acres" : "Enter Hectares"}
              </h3>

              {reversed ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Acres</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={reverseValue}
                    onChange={(e) => setReverseValue(e.target.value.replace(/[^0-9.]/g, ""))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="e.g. 2.47105"
                    min="0"
                    step="any"
                  />
                  {reverseResult !== null && reverseValue !== "" && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-sm text-green-800">
                        <strong>Calculation:</strong> {reverseValue} ÷ 2.47105 ={" "}
                        <strong>{formatNumber(reverseResult, inputs.precision)} ha</strong>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hectares</label>
                  <input
                    ref={inputRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.value}
                    onChange={(e) => handleValueChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="e.g. 1.5"
                    min="0"
                    step="any"
                    aria-label="Hectare value"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
                  </p>

                  {result && !error && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-sm text-green-800">
                        <strong>Calculation:</strong>{" "}
                        {formatNumber(result.hectares, inputs.precision)} × 2.47105 ={" "}
                        <strong>{formatNumber(result.acres, inputs.precision)} acres</strong>
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
              )}
            </div>

            {/* Quick Presets */}
            {!reversed && (
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
            )}

            {/* Land Size Comparison */}
            {result && !reversed && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Land Size Context
                </h3>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <span className="text-lg">📏</span>
                    <span className="font-medium text-sm">{getComparison(result.acres)}</span>
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
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Hectares</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acres</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[0.5, 1, 2, 5, 10, 25, 50, 100].map((ha) => (
                      <tr
                        key={ha}
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                          parseFloat(inputs.value) === ha ? "bg-primary/5" : ""
                        }`}
                        onClick={() => handlePreset(String(ha))}
                      >
                        <td className="py-2 px-3 font-mono text-gray-700">{ha}</td>
                        <td className="py-2 px-3 font-mono font-semibold text-gray-900">
                          {formatNumber(ha * ACRES_PER_HECTARE, inputs.precision)}
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
                            {formatNumber(entry.result.hectares, entry.inputs.precision)} ha
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          = {formatNumber(entry.result.acres, entry.inputs.precision)} acres
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

      <HectareToAcreConverterSEO />
      <RelatedTools
        currentTool="hectare-to-acre-converter"
        tools={[
          "acre-to-hectare-converter",
          "acre-to-square-feet-converter",
          "square-feet-to-acre-converter",
          "land-area-calculator-square-meter",
        ]}
      />
    </>
  );
}

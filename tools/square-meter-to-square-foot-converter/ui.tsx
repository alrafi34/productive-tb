"use client";

import { useState, useMemo, useCallback } from "react";
import {
  AreaHistoryEntry,
  AreaType,
  convertArea,
  formatAreaValue,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry,
  processBatchArea,
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function AreaConverterUI() {
  const [mode, setMode] = useState<AreaType>("m2");
  const [inputValue, setInputValue] = useState<string>("10");
  const [precision, setPrecision] = useState<number>(2);
  const [batchMode, setBatchMode] = useState<boolean>(false);
  const [batchInput, setBatchInput] = useState<string>("");
  const [batchSource, setBatchSource] = useState<AreaType>("m2");
  const [history, setHistory] = useState<AreaHistoryEntry[]>(() => getHistory());
  const [copied, setCopied] = useState<boolean>(false);

  const inputNumber = Number.parseFloat(inputValue);
  const isValidInput = inputValue.trim() !== "" && Number.isFinite(inputNumber);

  const resultNumber = useMemo(() => {
    if (!isValidInput) return null;
    return convertArea(inputNumber, mode);
  }, [inputNumber, mode, isValidInput]);

  const sourceUnit = mode === "m2" ? "m²" : "ft²";
  const targetUnit = mode === "m2" ? "ft²" : "m²";
  const sourceLabel = mode === "m2" ? "Square Meters" : "Square Feet";
  const targetLabel = mode === "m2" ? "Square Feet" : "Square Meters";

  const formattedResult = resultNumber === null ? "" : formatAreaValue(resultNumber, precision);

  const previewPercent = useMemo(() => {
    if (!isValidInput) return 0;
    const normalized = mode === "m2" ? inputNumber : inputNumber * 0.09290304;
    return Math.max(5, Math.min(100, Math.sqrt(Math.max(0, normalized)) * 8));
  }, [inputNumber, isValidInput, mode]);

  const batchResults = useMemo(() => {
    if (!batchMode || batchInput.trim() === "") return [];
    return processBatchArea(batchInput, precision, batchSource);
  }, [batchInput, precision, batchMode, batchSource]);

  const refreshHistory = useCallback(() => {
    setHistory(getHistory());
  }, []);

  const handleSwapDirection = () => {
    if (resultNumber !== null) {
      setInputValue(formatAreaValue(resultNumber, precision));
    }
    setMode((prev) => (prev === "m2" ? "ft2" : "m2"));
  };

  const handleCopy = () => {
    if (!isValidInput || resultNumber === null) return;
    const text = `${formatAreaValue(inputNumber, precision)} ${sourceUnit} = ${formatAreaValue(resultNumber, precision)} ${targetUnit}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleSaveToHistory = () => {
    if (!isValidInput || resultNumber === null) return;

    const m2ValueRaw = mode === "m2" ? inputNumber : resultNumber;
    const ft2ValueRaw = mode === "m2" ? resultNumber : inputNumber;

    const entry: AreaHistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      m2Value: Number.parseFloat(formatAreaValue(m2ValueRaw, precision)),
      ft2Value: Number.parseFloat(formatAreaValue(ft2ValueRaw, precision)),
      precision,
    };

    saveToHistory(entry);
    refreshHistory();
  };

  const handleClear = () => {
    setInputValue("");
    setBatchInput("");
  };

  const handleQuickFill = (value: number) => {
    setInputValue(String(value));
  };

  const handleExportCSV = () => {
    if (batchResults.length === 0) return;
    const fromUnit = batchSource === "m2" ? "Square Meters (m2)" : "Square Feet (ft2)";
    const toUnit = batchSource === "m2" ? "Square Feet (ft2)" : "Square Meters (m2)";
    const csvContent =
      `data:text/csv;charset=utf-8,${fromUnit},${toUnit}\n` +
      batchResults.map((item) => `${item.input},${item.result}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const anchor = document.createElement("a");
    anchor.setAttribute("href", encodedUri);
    anchor.setAttribute("download", "area-conversion-results.csv");
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const quickValues = mode === "m2" ? [1, 10, 25, 50, 100, 250] : [10, 100, 500, 1000, 2500, 5000];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
              Square Meter to Square Foot Converter
            </h2>
            <p className="text-gray-600 mt-1">
              Convert area instantly between metric and imperial units with adjustable precision.
            </p>
          </div>

          <button
            onClick={() => setBatchMode((prev) => !prev)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-bold transition-colors"
          >
            {batchMode ? "Switch to Single Conversion" : "Switch to Batch Conversion"}
          </button>
        </div>

        {!batchMode ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-5 bg-gray-50 rounded-2xl border border-gray-100 p-5 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setMode("m2")}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                      mode === "m2" ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    m² to ft²
                  </button>
                  <button
                    onClick={() => setMode("ft2")}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                      mode === "ft2" ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    ft² to m²
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    {sourceLabel} ({sourceUnit})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full px-4 py-4 bg-white border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white text-xl font-semibold text-gray-800 transition-all"
                      placeholder={`Enter ${sourceLabel.toLowerCase()}`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                      {sourceUnit}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSwapDirection}
                  className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Swap Direction
                </button>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-700">Precision</label>
                    <span className="text-sm font-bold text-primary">{precision} decimals</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={precision}
                    onChange={(e) => setPrecision(Number.parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Quick Values ({sourceUnit})</label>
                  <div className="grid grid-cols-3 gap-2">
                    {quickValues.map((value) => (
                      <button
                        key={value}
                        onClick={() => handleQuickFill(value)}
                        className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-100 transition-colors"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-emerald-100 border border-primary/20 p-5 sm:p-6">
                  <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Converted Result</p>
                  <div className="flex items-end gap-2 flex-wrap">
                    <span className="text-4xl sm:text-5xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                      {resultNumber === null ? "0" : formattedResult}
                    </span>
                    <span className="text-xl font-bold text-primary mb-1">{targetUnit}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{sourceLabel} to {targetLabel}</p>
                </div>

                <div className="rounded-2xl border border-gray-100 p-5 bg-white">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">Area Preview</p>
                  <div className="w-full h-40 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
                    <div
                      className="bg-primary/75 rounded-lg transition-all duration-300 flex items-center justify-center text-white text-xs font-bold"
                      style={{ width: `${previewPercent}%`, height: `${previewPercent}%` }}
                    >
                      {isValidInput ? `${formatAreaValue(inputNumber, 2)} ${sourceUnit}` : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 pt-5 border-t border-gray-100">
              <button
                onClick={handleCopy}
                disabled={!isValidInput || resultNumber === null}
                className="px-5 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
              >
                {copied ? "Copied" : "Copy Result"}
              </button>
              <button
                onClick={handleSaveToHistory}
                disabled={!isValidInput || resultNumber === null}
                className="px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
              >
                Save to History
              </button>
              <button
                onClick={handleClear}
                className="px-5 py-3 bg-white border border-gray-200 hover:border-red-200 hover:text-red-600 rounded-xl font-bold text-sm text-gray-600 transition-colors"
              >
                Clear
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-5">
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setBatchSource("m2")}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                      batchSource === "m2" ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600"
                    }`}
                  >
                    m² to ft²
                  </button>
                  <button
                    onClick={() => setBatchSource("ft2")}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                      batchSource === "ft2" ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-600"
                    }`}
                  >
                    ft² to m²
                  </button>
                </div>

                <button
                  onClick={handleExportCSV}
                  disabled={batchResults.length === 0}
                  className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 disabled:opacity-50 transition-colors"
                >
                  Export CSV
                </button>
              </div>

              <textarea
                value={batchInput}
                onChange={(e) => setBatchInput(e.target.value)}
                className="w-full h-40 p-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Enter multiple values separated by commas, spaces, or new lines"
              />
              <p className="text-xs text-gray-500 mt-2">
                Parsed entries: {batchResults.length}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {batchResults.map((result, index) => (
                <div key={`${result.input}-${index}`} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{result.input}</span>
                  <span className="text-gray-300">→</span>
                  <span className="text-sm font-bold text-primary">
                    {result.result} {batchSource === "m2" ? "ft²" : "m²"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {history.length > 0 && !batchMode && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-gray-900">Recent Conversions</h3>
            <button
              onClick={() => {
                clearHistory();
                setHistory([]);
              }}
              className="text-sm font-bold text-red-500 hover:text-red-600"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-3">
            {history.map((entry) => (
              <div key={entry.id} className="group bg-gray-50 border border-transparent hover:border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-semibold text-gray-900">{formatAreaValue(entry.m2Value, entry.precision)} m²</span>
                  <span className="text-gray-300">→</span>
                  <span className="font-bold text-primary">{formatAreaValue(entry.ft2Value, entry.precision)} ft²</span>
                  <span className="text-xs text-gray-400">
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                <button
                  onClick={() => {
                    deleteHistoryEntry(entry.id);
                    refreshHistory();
                  }}
                  className="self-end sm:self-auto text-sm text-gray-400 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToolSEOContent />
      <RelatedTools
        currentTool="square-meter-to-square-foot-converter"
        tools={["inch-to-cm-converter", "meter-to-km-converter", "centimeter-to-meter-converter"]}
      />
    </div>
  );
}

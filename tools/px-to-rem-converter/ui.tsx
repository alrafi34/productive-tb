"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  parsePixelValue,
  convertPxToRem,
  convertRemToPx,
  processBatchInput,
  generateCSSOutput,
  getHistoryFromStorage,
  saveToHistory,
  clearHistory,
  ConversionResult,
  ConversionHistory
} from "./logic";
import PxToRemSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PxToRemConverterUI() {
  const [input, setInput] = useState("");
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [unit, setUnit] = useState<"rem" | "em">("rem");
  const [mode, setMode] = useState<"px-to-rem" | "rem-to-px">("px-to-rem");
  const [copied, setCopied] = useState<string | null>(null);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setHistory(getHistoryFromStorage());
  }, []);

  const results = useMemo(() => {
    if (!input.trim()) return [];
    
    if (mode === "px-to-rem") {
      return processBatchInput(input, baseFontSize);
    } else {
      const lines = input.split(/[\n,;]/).filter(line => line.trim());
      return lines
        .map(line => {
          const rem = parsePixelValue(line);
          if (rem === null) return null;
          const px = convertRemToPx(rem, baseFontSize);
          return convertPxToRem(px, baseFontSize);
        })
        .filter((r): r is ConversionResult => r !== null);
    }
  }, [input, baseFontSize, mode]);

  const cssOutput = useMemo(() => {
    if (results.length === 0) return "";
    return generateCSSOutput(results, unit);
  }, [results, unit]);

  const handleCopy = useCallback((text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const handleQuickPreset = useCallback((preset: number) => {
    setBaseFontSize(preset);
  }, []);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  const handleHistoryClear = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  const handleHistoryItem = useCallback((item: ConversionHistory) => {
    setBaseFontSize(item.base);
    setInput(item.px.toString());
  }, []);

  const outputText = results
    .map(r => (mode === "px-to-rem" ? `${r.px}px → ${r.formatted[unit]}` : `${r.rem}${unit} → ${r.px}px`))
    .join("\n");

  const outputValues = results
    .map(r => r.formatted[unit])
    .join("\n");

  const actionButtonBase =
    "px-6 py-2.5 text-sm font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit">
            {(["px-to-rem", "rem-to-px"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === m
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {m === "px-to-rem" ? "PX to REM/EM" : "REM/EM to PX"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {mode === "px-to-rem" ? "Pixel values" : "Rem or em values"}
                </label>
                <div className="relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      mode === "px-to-rem"
                        ? "16\n24\n32\n\nOr: 16, 24, 32\nOr: 16px 24px 32px"
                        : "1\n1.5\n2\n\nOr: 1, 1.5, 2"
                    }
                    rows={12}
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <span className="absolute top-3 right-3 text-xs text-gray-400">{input.length} chars</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Base Font Size (px)</label>
                  <input
                    type="number"
                    min="8"
                    max="40"
                    value={baseFontSize}
                    onChange={(e) => setBaseFontSize(Math.max(8, Math.min(40, parseInt(e.target.value) || 16)))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Quick Presets</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[16, 18, 20].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handleQuickPreset(preset)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          baseFontSize === preset
                            ? "bg-primary hover:bg-primary-hover text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Output Unit</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["rem", "em"] as const).map((u) => (
                      <button
                        key={u}
                        onClick={() => setUnit(u)}
                        className={`px-3 py-2.5 rounded-lg text-sm font-medium uppercase transition-colors ${
                          unit === u
                            ? "bg-primary hover:bg-primary-hover text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                <button
                  onClick={() => handleCopy(outputValues, "values")}
                  disabled={results.length === 0}
                  className={`${actionButtonBase} ${
                    copied === "values"
                      ? "bg-green-600 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  {copied === "values" ? "Copied" : "Copy Values"}
                </button>

                <button
                  onClick={() => handleCopy(cssOutput, "css")}
                  disabled={results.length === 0}
                  className={`${actionButtonBase} ${
                    copied === "css"
                      ? "bg-green-600 text-white"
                      : "bg-primary hover:bg-primary-hover text-white"
                  }`}
                >
                  {copied === "css" ? "Copied" : "Copy CSS"}
                </button>

                <button
                  onClick={() => handleCopy(outputText, "full")}
                  disabled={results.length === 0}
                  className={`${actionButtonBase} ${
                    copied === "full"
                      ? "bg-green-600 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  {copied === "full" ? "Copied" : "Copy Full"}
                </button>

                <button
                  onClick={handleClear}
                  disabled={!input}
                  className={`${actionButtonBase} bg-white border-2 border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 text-gray-600`}
                >
                  Clear Input
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {results.length > 0 && (
                <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700">Summary</h3>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 flex items-center justify-between">
                      <span className="text-gray-500">Conversions</span>
                      <span className="font-semibold text-gray-900">{results.length}</span>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 flex items-center justify-between">
                      <span className="text-gray-500">Base Size</span>
                      <span className="font-semibold text-gray-900">{baseFontSize}px</span>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 flex items-center justify-between">
                      <span className="text-gray-500">Unit</span>
                      <span className="font-semibold text-gray-900 uppercase">{unit}</span>
                    </div>
                  </div>
                </div>
              )}

              {history.length > 0 && (
                <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700">History</h3>
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showHistory ? "Hide" : "Show"}
                    </button>
                  </div>

                  {showHistory && (
                    <div className="space-y-2 max-h-56 overflow-y-auto">
                      {history.slice(0, 10).map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleHistoryItem(item)}
                          className="w-full text-left px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <div className="font-medium text-sm text-gray-900">{item.px}px</div>
                          <div className="text-xs text-gray-500">base: {item.base}px</div>
                        </button>
                      ))}
                      <button
                        onClick={handleHistoryClear}
                        className="w-full px-3 py-2 rounded-lg border border-red-200 text-red-600 bg-white hover:bg-red-50 text-xs font-medium transition-colors"
                      >
                        Clear History
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-700">Formula</h3>
                <div className="rounded-lg border border-gray-200 bg-white p-3 text-xs font-mono text-gray-700">
                  px ÷ base = rem/em
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-3 text-xs font-mono text-gray-700">
                  Example: 24 ÷ 16 = 1.5rem
                </div>
              </div>
            </div>
          </div>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-base font-semibold text-gray-900">Conversion Results</h3>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">Values Only</h4>
                  <div className="relative">
                    <pre className="p-4 rounded-xl bg-gray-50 border border-gray-200 overflow-auto text-sm font-mono text-gray-800 leading-relaxed max-h-64">
                      {outputValues}
                    </pre>
                    <button
                      onClick={() => handleCopy(outputValues, "values-view")}
                      className="absolute top-2 right-2 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      {copied === "values-view" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700">CSS Ready</h4>
                  <div className="relative">
                    <pre className="p-4 rounded-xl bg-gray-50 border border-gray-200 overflow-auto text-sm font-mono text-gray-800 leading-relaxed max-h-64">
                      {cssOutput}
                    </pre>
                    <button
                      onClick={() => handleCopy(cssOutput, "css-view")}
                      className="absolute top-2 right-2 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      {copied === "css-view" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">Detailed Breakdown</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {results.map((result, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2"
                    >
                      <div className="font-mono text-sm text-gray-800 break-all">
                        <span className="font-semibold text-gray-900">{result.px}px</span>
                        <span className="text-gray-500 mx-2">→</span>
                        <span className="font-semibold text-primary">{result.formatted[unit]}{unit}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(`${result.formatted[unit]}${unit}`, `result-${idx}`)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          copied === `result-${idx}`
                            ? "bg-green-600 text-white"
                            : "bg-primary hover:bg-primary-hover text-white"
                        }`}
                      >
                        {copied === `result-${idx}` ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <PxToRemSEOContent />

      <RelatedTools
        currentTool="px-to-rem-converter"
        tools={["css-gradient-generator", "css-box-shadow-generator", "css-flexbox-playground"]}
      />
    </>
  );
}

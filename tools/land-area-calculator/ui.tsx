"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { InputUnit, LandDimensions, LandAreaResult, HistoryEntry } from "./types";
import {
  calculateLandArea,
  validateInputs,
  formatNumber,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  generateShareUrl,
  parseShareParams,
  getUnitName,
} from "./logic";
import LandAreaCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function LandAreaCalculatorUI() {
  const [dimensions, setDimensions] = useState<LandDimensions>({
    length: "",
    width: "",
    unit: "ft",
  });

  const [result, setResult] = useState<LandAreaResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const initialized = useRef(false);

  // Load history and parse share params on mount
  useEffect(() => {
    setHistory(getHistory());
    if (!initialized.current) {
      initialized.current = true;
      const shared = parseShareParams();
      if (shared) {
        setDimensions((prev) => ({ ...prev, ...shared }));
      }
    }
  }, []);

  // Debounced calculation
  const calculate = useCallback(
    debounce(() => {
      const validationError = validateInputs(dimensions);
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      setError(null);
      const res = calculateLandArea(dimensions);
      setResult(res);
    }, 100),
    [dimensions]
  );

  useEffect(() => {
    calculate();
  }, [dimensions, calculate]);

  const handleChange = (field: keyof LandDimensions, value: string) => {
    // Strip non-numeric characters except dot and minus
    if (field === "length" || field === "width") {
      value = value.replace(/[^0-9.]/g, "");
    }
    setDimensions((prev) => ({ ...prev, [field]: value }));
  };

  const handleUnitChange = (unit: InputUnit) => {
    setDimensions((prev) => ({ ...prev, unit }));
  };

  const handleReset = () => {
    setDimensions({ length: "", width: "", unit: "ft" });
    setResult(null);
    setError(null);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Length: ${dimensions.length} ${getUnitName(dimensions.unit)}\nWidth: ${dimensions.width} ${getUnitName(dimensions.unit)}\nArea: ${formatNumber(result.sqft)} sq ft`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const url = generateShareUrl(dimensions);
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(dimensions, result);
    setHistory(getHistory());
  };

  const handleExport = () => {
    if (!result) return;
    const text = exportToText(dimensions, result);
    downloadFile(text, "land_area_calculation.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setDimensions(entry.dimensions);
    setShowHistory(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") calculate();
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Land Area Calculator</h3>
              <p className="text-sm text-blue-800">
                Enter length and width to calculate land area in square feet instantly. Supports feet, meters, and yards with automatic unit conversion.
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

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input Unit
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["ft", "m", "yd"] as InputUnit[]).map((u) => (
                    <button
                      key={u}
                      onClick={() => handleUnitChange(u)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        dimensions.unit === u
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {u === "ft" ? "Feet" : u === "m" ? "Meters" : "Yards"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Formula */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Formula</div>
                <div className="text-sm font-mono text-gray-900">Area = Length × Width</div>
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

            {/* Result Display */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p
                className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Land Area
              </p>
              <div className="text-5xl font-bold mb-1 leading-none">
                {result ? formatNumber(result.sqft) : "—"}
              </div>
              <div className="text-xl text-primary-100 mb-4">sq ft</div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Square Meters:</span>
                    <span className="font-semibold">{formatNumber(result.sqm)} sq m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Square Yards:</span>
                    <span className="font-semibold">{formatNumber(result.sqyd)} sq yd</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Acres:</span>
                    <span className="font-semibold">{formatNumber(result.acres, 4)} ac</span>
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
                <button
                  onClick={handleShare}
                  disabled={!result}
                  className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {shareCopied ? "✓ Link Copied!" : "🔗 Share Link"}
                </button>
              </div>
            </div>

          </div>

          {/* Right Panel */}
          <div className="lg:col-span-8 space-y-6">

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Land Dimensions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length ({dimensions.unit})
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={dimensions.length}
                    onChange={(e) => handleChange("length", e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="50"
                    min="0"
                    step="any"
                    aria-label="Length"
                  />
                  <p className="text-xs text-gray-500 mt-1">Example: 50</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width ({dimensions.unit})
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={dimensions.width}
                    onChange={(e) => handleChange("width", e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="40"
                    min="0"
                    step="any"
                    aria-label="Width"
                  />
                  <p className="text-xs text-gray-500 mt-1">Example: 40</p>
                </div>
              </div>

              {/* Inline formula result */}
              {result && !error && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Area = {dimensions.length} × {dimensions.width}{" "}
                    {dimensions.unit !== "ft" && (
                      <span className="text-green-700">
                        (converted to ft: {formatNumber(result.length * (dimensions.unit === "m" ? 3.28084 : 3), 4)} × {formatNumber(result.width * (dimensions.unit === "m" ? 3.28084 : 3), 4)} ft)
                      </span>
                    )}{" "}
                    = <strong>{formatNumber(result.sqft)} sq ft</strong>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800 text-sm">
                    <span>⚠️</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Examples */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Examples
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { name: "Small Lot", desc: "50 × 40 ft", length: "50", width: "40", unit: "ft" as InputUnit },
                  { name: "Medium Plot", desc: "120 × 75 ft", length: "120", width: "75", unit: "ft" as InputUnit },
                  { name: "Large Land", desc: "200 × 150 ft", length: "200", width: "150", unit: "ft" as InputUnit },
                  { name: "Metric Plot", desc: "30 × 20 m", length: "30", width: "20", unit: "m" as InputUnit },
                  { name: "Yard Plot", desc: "60 × 45 yd", length: "60", width: "45", unit: "yd" as InputUnit },
                  { name: "Narrow Strip", desc: "100 × 25 ft", length: "100", width: "25", unit: "ft" as InputUnit },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      setDimensions({ length: preset.length, width: preset.width, unit: preset.unit })
                    }
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{preset.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Conversion Reference */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Area Conversions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Square Feet", value: formatNumber(result.sqft), unit: "sq ft" },
                    { label: "Square Meters", value: formatNumber(result.sqm), unit: "sq m" },
                    { label: "Square Yards", value: formatNumber(result.sqyd), unit: "sq yd" },
                    { label: "Acres", value: formatNumber(result.acres, 4), unit: "ac" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center"
                    >
                      <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                      <div className="font-bold text-gray-900 text-sm">{item.value}</div>
                      <div className="text-xs text-gray-500">{item.unit}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
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
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
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
                            {entry.dimensions.length} × {entry.dimensions.width}{" "}
                            {entry.dimensions.unit}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.result.sqft)} sq ft
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

      <LandAreaCalculatorSEO />
      <RelatedTools
        currentTool="land-area-calculator"
        tools={[
          "plot-area-calculator",
          "room-area-calculator",
          "floor-area-calculator",
          "square-meter-to-square-foot-converter",
        ]}
      />
    </>
  );
}

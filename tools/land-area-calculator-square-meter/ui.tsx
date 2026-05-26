"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalculationMode, DimensionUnit, AreaUnit, CalculationInputs, CalculationResult, HistoryEntry } from "./types";
import {
  calculateSquareMeters,
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
  getLandSizeComparison,
} from "./logic";
import LandAreaCalculatorSquareMeterSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function LandAreaCalculatorSquareMeterUI() {
  const [inputs, setInputs] = useState<CalculationInputs>({
    mode: "dimensions",
    dimensions: { length: "", width: "", unit: "m" },
    conversion: { value: "", unit: "sqft" },
    precision: 2,
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
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
        setInputs((prev) => ({ ...prev, ...shared }));
      }
    }
  }, []);

  // Debounced calculation
  const calculate = useCallback(
    debounce(() => {
      const validationError = validateInputs(inputs);
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      setError(null);
      const res = calculateSquareMeters(inputs);
      setResult(res);
    }, 150),
    [inputs]
  );

  useEffect(() => {
    calculate();
  }, [inputs, calculate]);

  const handleModeChange = (mode: CalculationMode) => {
    setInputs((prev) => ({ ...prev, mode }));
  };

  const handleDimensionChange = (field: keyof typeof inputs.dimensions, value: string | DimensionUnit) => {
    if (field === "length" || field === "width") {
      value = (value as string).replace(/[^0-9.]/g, "");
    }
    setInputs((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [field]: value },
    }));
  };

  const handleConversionChange = (field: keyof typeof inputs.conversion, value: string | AreaUnit) => {
    if (field === "value") {
      value = (value as string).replace(/[^0-9.]/g, "");
    }
    setInputs((prev) => ({
      ...prev,
      conversion: { ...prev.conversion, [field]: value },
    }));
  };

  const handlePrecisionChange = (precision: number) => {
    setInputs((prev) => ({ ...prev, precision }));
  };

  const handleReset = () => {
    setInputs({
      mode: "dimensions",
      dimensions: { length: "", width: "", unit: "m" },
      conversion: { value: "", unit: "sqft" },
      precision: 2,
    });
    setResult(null);
    setError(null);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `${result.inputSummary}\nArea: ${formatNumber(result.squareMeters, inputs.precision)} m²`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const url = generateShareUrl(inputs);
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    saveToHistory(inputs, result);
    setHistory(getHistory());
  };

  const handleExport = () => {
    if (!result) return;
    const text = exportToText(inputs, result);
    downloadFile(text, "land_area_square_meter_calculation.txt");
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
              <h3 className="font-semibold text-blue-900 mb-1">Land Area Calculator (Square Meter)</h3>
              <p className="text-sm text-blue-800">
                Calculate land area in square meters from dimensions or convert from other units like acres, hectares, square feet, katha, and bigha.
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

              {/* Mode Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calculation Mode
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleModeChange("dimensions")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      inputs.mode === "dimensions"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Calculate by Dimensions
                  </button>
                  <button
                    onClick={() => handleModeChange("conversion")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      inputs.mode === "conversion"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Convert Existing Area
                  </button>
                </div>
              </div>

              {/* Precision Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decimal Precision
                </label>
                <select
                  value={inputs.precision}
                  onChange={(e) => handlePrecisionChange(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="0">0 decimal places</option>
                  <option value="2">2 decimal places</option>
                  <option value="4">4 decimal places</option>
                </select>
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
                    📄 Export Report
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
                Area in Square Meters
              </p>
              <div className="text-5xl font-bold mb-1 leading-none">
                {result ? formatNumber(result.squareMeters, inputs.precision) : "—"}
              </div>
              <div className="text-xl text-primary-100 mb-4">m²</div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Square Feet:</span>
                    <span className="font-semibold">{formatNumber(result.conversions.sqft, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Acres:</span>
                    <span className="font-semibold">{formatNumber(result.conversions.acre, 4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Hectares:</span>
                    <span className="font-semibold">{formatNumber(result.conversions.hectare, 4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Square Yards:</span>
                    <span className="font-semibold">{formatNumber(result.conversions.sqyd, inputs.precision)}</span>
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
                {inputs.mode === "dimensions" ? "Land Dimensions" : "Area Conversion"}
              </h3>

              {inputs.mode === "dimensions" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Length ({inputs.dimensions.unit})
                      </label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={inputs.dimensions.length}
                        onChange={(e) => handleDimensionChange("length", e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="20"
                        min="0"
                        step="any"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Width ({inputs.dimensions.unit})
                      </label>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={inputs.dimensions.width}
                        onChange={(e) => handleDimensionChange("width", e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="15"
                        min="0"
                        step="any"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dimension Unit
                    </label>
                    <select
                      value={inputs.dimensions.unit}
                      onChange={(e) => handleDimensionChange("unit", e.target.value as DimensionUnit)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="m">Meters (m)</option>
                      <option value="ft">Feet (ft)</option>
                      <option value="yd">Yards (yd)</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area Value
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.conversion.value}
                      onChange={(e) => handleConversionChange("value", e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1000"
                      min="0"
                      step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Unit
                    </label>
                    <select
                      value={inputs.conversion.unit}
                      onChange={(e) => handleConversionChange("unit", e.target.value as AreaUnit)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="sqft">Square Feet (sq ft)</option>
                      <option value="sqyd">Square Yards (sq yd)</option>
                      <option value="acre">Acres</option>
                      <option value="hectare">Hectares</option>
                      <option value="decimal">Decimals</option>
                      <option value="katha">Katha</option>
                      <option value="bigha">Bigha</option>
                      <option value="sqkm">Square Kilometers (km²)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Formula display */}
              {result && !error && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {result.formula}
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

            {/* Land Size Comparison */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Land Size Comparison
                </h3>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <span className="text-lg">📏</span>
                    <span className="font-medium">{getLandSizeComparison(result.squareMeters)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Examples */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Examples
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { name: "Small Plot", desc: "20 × 15 m", mode: "dimensions" as CalculationMode, dimensions: { length: "20", width: "15", unit: "m" as DimensionUnit } },
                  { name: "1000 sq ft", desc: "Convert to m²", mode: "conversion" as CalculationMode, conversion: { value: "1000", unit: "sqft" as AreaUnit } },
                  { name: "1 Acre", desc: "Convert to m²", mode: "conversion" as CalculationMode, conversion: { value: "1", unit: "acre" as AreaUnit } },
                  { name: "1 Hectare", desc: "Convert to m²", mode: "conversion" as CalculationMode, conversion: { value: "1", unit: "hectare" as AreaUnit } },
                  { name: "1 Katha", desc: "Convert to m²", mode: "conversion" as CalculationMode, conversion: { value: "1", unit: "katha" as AreaUnit } },
                  { name: "Large Plot", desc: "50 × 30 m", mode: "dimensions" as CalculationMode, dimensions: { length: "50", width: "30", unit: "m" as DimensionUnit } },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      setInputs((prev) => ({
                        ...prev,
                        mode: preset.mode,
                        ...(preset.dimensions && { dimensions: preset.dimensions }),
                        ...(preset.conversion && { conversion: preset.conversion }),
                      }))
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
                  All Conversions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { label: "Square Meters", value: formatNumber(result.squareMeters, inputs.precision), unit: "m²" },
                    { label: "Square Feet", value: formatNumber(result.conversions.sqft, inputs.precision), unit: "sq ft" },
                    { label: "Square Yards", value: formatNumber(result.conversions.sqyd, inputs.precision), unit: "sq yd" },
                    { label: "Acres", value: formatNumber(result.conversions.acre, 4), unit: "acres" },
                    { label: "Hectares", value: formatNumber(result.conversions.hectare, 4), unit: "ha" },
                    { label: "Square Km", value: formatNumber(result.conversions.sqkm, 6), unit: "km²" },
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
                            {entry.result.inputSummary}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.result.squareMeters, entry.inputs.precision)} m²
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

      <LandAreaCalculatorSquareMeterSEO />
      <RelatedTools
        currentTool="land-area-calculator-square-meter"
        tools={[
          "land-area-calculator-square-feet",
          "acre-to-square-feet-converter",
          "square-meter-to-square-foot-converter",
          "plot-area-calculator",
        ]}
      />
    </>
  );
}
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalculatorInputs, CalculationResult, Currency, HistoryEntry, Unit } from "./types";
import {
  calculate,
  validatePrice,
  validateArea,
  formatNumber,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  UNIT_LABELS,
  UNIT_SHORT,
  UNIT_TO_SQFT,
  CURRENCY_SYMBOLS,
  CURRENCY_LABELS,
  ALL_UNITS,
  ALL_CURRENCIES,
} from "./logic";
import PricePerSquareFeetCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS: { label: string; price: string; area: string; unit: Unit }[] = [
  { label: "5M / 2500 sqft",   price: "5000000",  area: "2500", unit: "sqft"    },
  { label: "1.2M / 3 Decimal", price: "1200000",  area: "3",    unit: "decimal" },
  { label: "25M / 0.5 Acre",   price: "25000000", area: "0.5",  unit: "acre"    },
  { label: "500K / 10 Katha",  price: "500000",   area: "10",   unit: "katha"   },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  totalPrice: "",
  area: "",
  areaUnit: "sqft",
  currency: "USD",
  precision: 2,
};

export default function PricePerSquareFeetCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [areaError, setAreaError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const priceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    priceRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const pe = validatePrice(inputs.totalPrice);
      const ae = validateArea(inputs.area);
      setPriceError(pe);
      setAreaError(ae);
      if (pe || ae) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => {
    if (inputs.totalPrice === "" && inputs.area === "") {
      setResult(null); setPriceError(null); setAreaError(null); return;
    }
    run();
  }, [inputs, run]);

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, totalPrice: p.price, area: p.area, areaUnit: p.unit }));
    priceRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setPriceError(null);
    setAreaError(null);
    priceRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const sym = CURRENCY_SYMBOLS[inputs.currency];
    navigator.clipboard.writeText(
      `Price per sq ft: ${sym}${formatNumber(result.pricePerSqFt, inputs.precision)}\nTotal Area: ${formatNumber(result.totalAreaSqFt, inputs.precision)} sq ft\nTotal Price: ${sym}${formatNumber(result.totalPrice, inputs.precision)}`
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
    downloadFile(exportToText(inputs, result), "price_per_sqft_calculation.txt");
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

  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const isConverted = inputs.areaUnit !== "sqft";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Price per Square Feet Calculator</h3>
              <p className="text-sm text-blue-800">
                Enter total land price and area to instantly calculate price per square foot. Supports Decimal, Acre, Katha, Bigha, Square Meter, and Hectare with automatic unit conversion.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left Panel */}
          <div className="lg:col-span-4 space-y-6">

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Price per Square Foot
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? `${sym}${formatNumber(result.pricePerSqFt, inputs.precision)}` : "—"}
              </div>
              <div className="text-base text-primary-100 mb-4">per sq ft</div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Price:</span>
                    <span className="font-semibold">{sym}{formatNumber(result.totalPrice, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Area:</span>
                    <span className="font-semibold">{formatNumber(result.totalAreaSqFt, inputs.precision)} sq ft</span>
                  </div>
                  {isConverted && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Input Area:</span>
                      <span className="font-semibold">{formatNumber(parseFloat(inputs.area), inputs.precision)} {UNIT_SHORT[inputs.areaUnit]}</span>
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

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Settings
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={inputs.currency}
                  onChange={(e) => setInputs((p) => ({ ...p, currency: e.target.value as Currency }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  {ALL_CURRENCIES.map((c) => (
                    <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
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
                <div className="font-mono">Price/sq ft = Total Price ÷ Area (sq ft)</div>
                {isConverted && inputs.area && (
                  <div className="text-gray-500 mt-1">
                    1 {UNIT_SHORT[inputs.areaUnit]} = {UNIT_TO_SQFT[inputs.areaUnit].toLocaleString()} sq ft
                  </div>
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

          </div>

          {/* Right Panel */}
          <div className="lg:col-span-8 space-y-6">

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Enter Land Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Land Price ({sym})
                </label>
                <input
                  ref={priceRef}
                  type="number"
                  inputMode="decimal"
                  value={inputs.totalPrice}
                  onChange={(e) => setInputs((p) => ({ ...p, totalPrice: e.target.value.replace(/[^0-9.]/g, "") }))}
                  onKeyDown={handleKeyDown}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${priceError && inputs.totalPrice ? "border-red-300" : "border-gray-200"}`}
                  placeholder="e.g. 5000000"
                  min="0"
                  step="any"
                  aria-label="Total land price"
                />
                {priceError && inputs.totalPrice && (
                  <p className="text-xs text-red-600 mt-1">{priceError}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Area</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.area}
                    onChange={(e) => setInputs((p) => ({ ...p, area: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${areaError && inputs.area ? "border-red-300" : "border-gray-200"}`}
                    placeholder="e.g. 2500"
                    min="0"
                    step="any"
                    aria-label="Land area"
                  />
                  {areaError && inputs.area && (
                    <p className="text-xs text-red-600 mt-1">{areaError}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                  <select
                    value={inputs.areaUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, areaUnit: e.target.value as Unit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_UNITS.map((u) => (
                      <option key={u} value={u}>{UNIT_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>

              {/* Calculation breakdown */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Calculation:</strong>{" "}
                    {isConverted ? (
                      <>
                        {formatNumber(parseFloat(inputs.area), inputs.precision)} {UNIT_SHORT[inputs.areaUnit]}
                        {" → "}{formatNumber(result.totalAreaSqFt, inputs.precision)} sq ft
                        {" · "}{sym}{formatNumber(result.totalPrice, inputs.precision)} ÷ {formatNumber(result.totalAreaSqFt, inputs.precision)}
                        {" = "}<strong>{sym}{formatNumber(result.pricePerSqFt, inputs.precision)}/sq ft</strong>
                      </>
                    ) : (
                      <>
                        {sym}{formatNumber(result.totalPrice, inputs.precision)} ÷ {formatNumber(result.totalAreaSqFt, inputs.precision)} sq ft
                        {" = "}<strong>{sym}{formatNumber(result.pricePerSqFt, inputs.precision)}/sq ft</strong>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Errors when both fields touched */}
              {(priceError && !inputs.totalPrice) || (areaError && !inputs.area) ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800 text-sm">
                    <span>⚠️</span>
                    <span>Please enter a valid land price and area.</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active = inputs.totalPrice === p.price && inputs.area === p.area && inputs.areaUnit === p.unit;
                  return (
                    <button
                      key={p.label}
                      onClick={() => handlePreset(p)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        active
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Breakdown Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Price Breakdown by Area
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Area</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sq Ft</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[0.25, 0.5, 1, 2, 5, 10].map((multiplier) => {
                        const scaledArea = parseFloat(inputs.area) * multiplier;
                        const scaledSqFt = scaledArea * UNIT_TO_SQFT[inputs.areaUnit];
                        const scaledPrice = scaledSqFt * result.pricePerSqFt;
                        const isActive = multiplier === 1;
                        return (
                          <tr key={multiplier} className={`hover:bg-gray-50 transition-colors ${isActive ? "bg-primary/5" : ""}`}>
                            <td className={`py-2 px-3 font-mono ${isActive ? "text-primary font-semibold" : "text-gray-700"}`}>
                              {formatNumber(scaledArea, inputs.precision)} {UNIT_SHORT[inputs.areaUnit]}
                            </td>
                            <td className="py-2 px-3 font-mono text-gray-600">
                              {formatNumber(scaledSqFt, inputs.precision)}
                            </td>
                            <td className={`py-2 px-3 font-mono font-semibold ${isActive ? "text-primary" : "text-gray-900"}`}>
                              {sym}{formatNumber(scaledPrice, inputs.precision)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Unit Conversion Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Unit Conversion Reference
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {ALL_UNITS.filter((u) => u !== "sqft").map((unit) => {
                  const isActive = unit === inputs.areaUnit;
                  return (
                    <div
                      key={unit}
                      className={`flex items-center justify-between p-3 rounded-lg border text-sm ${
                        isActive ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span className={`font-medium ${isActive ? "text-primary" : "text-gray-600"}`}>
                        1 {UNIT_SHORT[unit]}
                      </span>
                      <span className={`font-mono font-semibold ${isActive ? "text-primary" : "text-gray-900"}`}>
                        {UNIT_TO_SQFT[unit].toLocaleString()} sq ft
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* History Panel */}
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
                    history.map((entry) => {
                      const esym = CURRENCY_SYMBOLS[entry.inputs.currency];
                      return (
                        <div
                          key={entry.id}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => loadFromHistory(entry)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900 text-sm">
                              {esym}{formatNumber(entry.result.totalPrice, 0)} / {formatNumber(parseFloat(entry.inputs.area), 2)} {UNIT_SHORT[entry.inputs.areaUnit]}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-primary">
                            = {esym}{formatNumber(entry.result.pricePerSqFt, entry.inputs.precision)}/sq ft
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <PricePerSquareFeetCalculatorSEO />
      <RelatedTools
        currentTool="price-per-square-feet-calculator"
        tools={[
          "land-price-calculator",
          "decimal-land-calculator",
          "katha-land-calculator",
          "acre-to-square-feet-converter",
        ]}
      />
    </>
  );
}

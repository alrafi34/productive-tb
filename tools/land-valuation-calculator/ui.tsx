"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalculatorInputs, CalculationResult, Currency, HistoryEntry, Unit } from "./types";
import {
  calculate,
  validateArea,
  validatePrice,
  formatNumber,
  formatCurrency,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  UNIT_LABELS,
  UNIT_SHORT,
  UNIT_NOTES,
  UNIT_TO_SQFT,
  CURRENCY_SYMBOLS,
  CURRENCY_LABELS,
  ALL_UNITS,
  ALL_CURRENCIES,
} from "./logic";
import LandValuationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS: { label: string; area: string; unit: Unit; price: string }[] = [
  { label: "5 Katha @ $5k",    area: "5",    unit: "katha",   price: "5000"   },
  { label: "10 Decimal @ $2k", area: "10",   unit: "decimal", price: "2000"   },
  { label: "1 Acre @ $50k",    area: "1",    unit: "acre",    price: "50000"  },
  { label: "2500 Sq Ft @ $200",area: "2500", unit: "sqft",    price: "200"    },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  area: "",
  unit: "sqft",
  pricePerUnit: "",
  currency: "USD",
  extraCost: "",
  precision: 2,
};

export default function LandValuationCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [areaError, setAreaError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const areaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    areaRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const ae = validateArea(inputs.area);
      const pe = validatePrice(inputs.pricePerUnit);
      setAreaError(ae);
      setPriceError(pe);
      if (ae || pe) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => {
    if (inputs.area === "" && inputs.pricePerUnit === "") {
      setResult(null); setAreaError(null); setPriceError(null); return;
    }
    run();
  }, [inputs, run]);

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, area: p.area, unit: p.unit, pricePerUnit: p.price }));
    areaRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setAreaError(null);
    setPriceError(null);
    areaRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const sym = CURRENCY_SYMBOLS[inputs.currency];
    const extra = result.extraCost > 0 ? `\nAdditional Cost: ${sym}${formatNumber(result.extraCost, inputs.precision)}` : "";
    navigator.clipboard.writeText(
      `Estimated Land Value\nArea: ${formatNumber(result.area, inputs.precision)} ${UNIT_SHORT[result.unit]}\nPrice per Unit: ${sym}${formatNumber(result.pricePerUnit, inputs.precision)}${extra}\nTotal Estimated Value: ${sym}${formatNumber(result.totalValue, inputs.precision)}`
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
    downloadFile(exportToText(inputs, result), "land-valuation-report.txt");
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
  const unitNote = UNIT_NOTES[inputs.unit];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Land Valuation Calculator</h3>
              <p className="text-sm text-blue-800">
                Estimate total property value instantly. Enter land area, price per unit, and optional extra costs — get an accurate valuation with a full breakdown.
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
                <div className="font-mono">Value = (Area × Price) + Extra</div>
                {unitNote && (
                  <div className="text-gray-500 mt-1">{unitNote}</div>
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

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Estimated Total Value
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? formatCurrency(result.totalValue, inputs.currency, inputs.precision) : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Land Value:</span>
                    <span className="font-semibold">{sym}{formatNumber(result.landValue, inputs.precision)}</span>
                  </div>
                  {result.extraCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Extra Costs:</span>
                      <span className="font-semibold">{sym}{formatNumber(result.extraCost, inputs.precision)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Area:</span>
                    <span className="font-semibold">{formatNumber(result.area, inputs.precision)} {UNIT_SHORT[result.unit]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Rate:</span>
                    <span className="font-semibold">{sym}{formatNumber(result.pricePerUnit, inputs.precision)}/{UNIT_SHORT[result.unit]}</span>
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
                Enter Property Details
              </h3>

              {/* Area + Unit */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Area</label>
                  <input
                    ref={areaRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.area}
                    onChange={(e) => setInputs((p) => ({ ...p, area: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${areaError && inputs.area ? "border-red-300" : "border-gray-200"}`}
                    placeholder="e.g. 5"
                    min="0"
                    step="any"
                    aria-label="Land area"
                  />
                  {areaError && inputs.area && <p className="text-xs text-red-600 mt-1">{areaError}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit Type</label>
                  <select
                    value={inputs.unit}
                    onChange={(e) => setInputs((p) => ({ ...p, unit: e.target.value as Unit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_UNITS.map((u) => (
                      <option key={u} value={u}>{UNIT_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price + Extra */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per {UNIT_SHORT[inputs.unit]} ({sym})
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.pricePerUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, pricePerUnit: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${priceError && inputs.pricePerUnit ? "border-red-300" : "border-gray-200"}`}
                    placeholder="e.g. 500000"
                    min="0"
                    step="any"
                    aria-label="Price per unit"
                  />
                  {priceError && inputs.pricePerUnit && <p className="text-xs text-red-600 mt-1">{priceError}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Extra Costs ({sym}) <span className="text-gray-400 font-normal">Optional</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.extraCost}
                    onChange={(e) => setInputs((p) => ({ ...p, extraCost: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="e.g. 100000"
                    min="0"
                    step="any"
                    aria-label="Extra costs"
                  />
                  <p className="text-xs text-gray-400 mt-1">Registration, tax, legal fees, etc.</p>
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
                    ({formatNumber(result.area, inputs.precision)} × {sym}{formatNumber(result.pricePerUnit, inputs.precision)})
                    {result.extraCost > 0 && ` + ${sym}${formatNumber(result.extraCost, inputs.precision)}`}
                    {" = "}<strong>{formatCurrency(result.totalValue, inputs.currency, inputs.precision)}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active = inputs.area === p.area && inputs.unit === p.unit && inputs.pricePerUnit === p.price;
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

            {/* Value Breakdown Table */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Value Breakdown
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Area</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Land Value</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total (incl. extra)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[0.25, 0.5, 1, 2, 5, 10].map((multiplier) => {
                        const scaledArea = result.area * multiplier;
                        const scaledLand = scaledArea * result.pricePerUnit;
                        const scaledTotal = scaledLand + result.extraCost;
                        const isActive = multiplier === 1;
                        return (
                          <tr key={multiplier} className={`hover:bg-gray-50 transition-colors ${isActive ? "bg-primary/5" : ""}`}>
                            <td className={`py-2 px-3 font-mono ${isActive ? "text-primary font-semibold" : "text-gray-700"}`}>
                              {formatNumber(scaledArea, inputs.precision)} {UNIT_SHORT[result.unit]}
                            </td>
                            <td className="py-2 px-3 font-mono text-gray-600">
                              {sym}{formatNumber(scaledLand, inputs.precision)}
                            </td>
                            <td className={`py-2 px-3 font-mono font-semibold ${isActive ? "text-primary" : "text-gray-900"}`}>
                              {sym}{formatNumber(scaledTotal, inputs.precision)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Unit Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Unit Reference
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {ALL_UNITS.filter((u) => u !== "sqft").map((unit) => {
                  const isActive = unit === inputs.unit;
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
                              {formatNumber(entry.result.area, 2)} {UNIT_SHORT[entry.result.unit]}
                              {" @ "}{esym}{formatNumber(entry.result.pricePerUnit, 2)}/{UNIT_SHORT[entry.result.unit]}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-primary">
                            = {esym}{formatNumber(entry.result.totalValue, 2)}
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

      <LandValuationCalculatorSEO />
      <RelatedTools
        currentTool="land-valuation-calculator"
        tools={[
          "land-price-calculator",
          "price-per-square-feet-calculator",
          "decimal-land-calculator",
          "katha-land-calculator",
        ]}
      />
    </>
  );
}

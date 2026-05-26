"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalculatorInputs, CalculationResult, CompareEntry, Currency, HistoryEntry, Unit } from "./types";
import {
  calculate,
  validateArea,
  validateRate,
  formatNumber,
  formatCurrency,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  convertArea,
  UNIT_LABELS,
  UNIT_SHORT,
  CURRENCY_SYMBOLS,
  CURRENCY_LABELS,
  ALL_UNITS,
  ALL_CURRENCIES,
} from "./logic";
import LandPriceCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS: { label: string; area: string; areaUnit: Unit; rate: string }[] = [
  { label: "5 Decimal @ $20k",  area: "5",    areaUnit: "decimal", rate: "20000"  },
  { label: "1 Acre @ $50k",     area: "1",    areaUnit: "acre",    rate: "50000"  },
  { label: "10 Katha @ $5k",    area: "10",   areaUnit: "katha",   rate: "5000"   },
  { label: "4000 Sq Ft @ $120", area: "4000", areaUnit: "sqft",    rate: "120"    },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  area: "",
  areaUnit: "decimal",
  rate: "",
  rateUnit: "decimal",
  currency: "USD",
  precision: 2,
};

const DEFAULT_COMPARE: CompareEntry[] = [
  { label: "Option A", area: "", areaUnit: "decimal", rate: "", rateUnit: "decimal", currency: "USD" },
  { label: "Option B", area: "", areaUnit: "decimal", rate: "", rateUnit: "decimal", currency: "USD" },
];

export default function LandPriceCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [areaError, setAreaError] = useState<string | null>(null);
  const [rateError, setRateError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [compareEntries, setCompareEntries] = useState<CompareEntry[]>(DEFAULT_COMPARE);
  const areaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    areaRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const ae = validateArea(inputs.area);
      const re = validateRate(inputs.rate);
      setAreaError(ae);
      setRateError(re);
      if (ae || re) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => {
    if (inputs.area === "" && inputs.rate === "") {
      setResult(null); setAreaError(null); setRateError(null); return;
    }
    run();
  }, [inputs, run]);

  const handlePreset = (p: typeof PRESETS[0]) => {
    setInputs((prev) => ({ ...prev, area: p.area, areaUnit: p.areaUnit, rate: p.rate, rateUnit: p.areaUnit }));
    areaRef.current?.focus();
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setAreaError(null);
    setRateError(null);
    areaRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const sym = CURRENCY_SYMBOLS[inputs.currency];
    const text = `${formatNumber(parseFloat(inputs.area), inputs.precision)} ${UNIT_LABELS[inputs.areaUnit]} @ ${sym}${formatNumber(result.rateApplied, inputs.precision)} per ${UNIT_LABELS[inputs.rateUnit]} = ${sym}${formatNumber(result.totalPrice, inputs.precision)}`;
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
    downloadFile(exportToText(inputs, result), "land_price_calculation.txt");
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
  const sameUnit = inputs.areaUnit === inputs.rateUnit;

  // Compare mode results
  const compareResults = compareEntries.map((e) => {
    const ae = validateArea(e.area);
    const re = validateRate(e.rate);
    if (ae || re) return null;
    const area = parseFloat(e.area);
    const rate = parseFloat(e.rate);
    const converted = convertArea(area, e.areaUnit, e.rateUnit);
    return { total: converted * rate, currency: e.currency };
  });

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Land Price Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate total land cost instantly. Enter land area, select unit, set price rate — get the total price with automatic unit conversion.
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
                <div className="font-mono">Total = Area × Rate</div>
                {!sameUnit && inputs.area && inputs.rate && (
                  <div className="text-gray-500 mt-1">
                    Area auto-converted to {UNIT_LABELS[inputs.rateUnit]}
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
                  onClick={() => setShowCompare(!showCompare)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚖️ {showCompare ? "Hide" : "Show"} Compare
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
                Total Land Price
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? formatCurrency(result.totalPrice, inputs.currency, inputs.precision) : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Area:</span>
                    <span className="font-semibold">
                      {formatNumber(parseFloat(inputs.area), inputs.precision)} {UNIT_SHORT[inputs.areaUnit]}
                    </span>
                  </div>
                  {!sameUnit && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Converted:</span>
                      <span className="font-semibold">
                        {formatNumber(result.areaInRateUnit, inputs.precision)} {UNIT_SHORT[inputs.rateUnit]}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Rate:</span>
                    <span className="font-semibold">
                      {sym}{formatNumber(result.rateApplied, inputs.precision)}/{UNIT_SHORT[inputs.rateUnit]}
                    </span>
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
                Enter Land Details
              </h3>

              {/* Area row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Size</label>
                  <input
                    ref={areaRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.area}
                    onChange={(e) => setInputs((p) => ({ ...p, area: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${areaError ? "border-red-300" : "border-gray-200"}`}
                    placeholder="e.g. 5"
                    min="0"
                    step="any"
                    aria-label="Land area"
                  />
                  {areaError && <p className="text-xs text-red-600 mt-1">{areaError}</p>}
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

              {/* Rate row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Rate ({sym} per unit)
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.rate}
                    onChange={(e) => setInputs((p) => ({ ...p, rate: e.target.value.replace(/[^0-9.]/g, "") }))}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${rateError ? "border-red-300" : "border-gray-200"}`}
                    placeholder="e.g. 20000"
                    min="0"
                    step="any"
                    aria-label="Price rate"
                  />
                  {rateError && <p className="text-xs text-red-600 mt-1">{rateError}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rate Unit</label>
                  <select
                    value={inputs.rateUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, rateUnit: e.target.value as Unit }))}
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
                    {!sameUnit ? (
                      <>
                        {formatNumber(parseFloat(inputs.area), inputs.precision)} {UNIT_LABELS[inputs.areaUnit]}
                        {" → "}{formatNumber(result.areaInRateUnit, inputs.precision)} {UNIT_LABELS[inputs.rateUnit]}
                        {" × "}{sym}{formatNumber(result.rateApplied, inputs.precision)}
                        {" = "}<strong>{formatCurrency(result.totalPrice, inputs.currency, inputs.precision)}</strong>
                      </>
                    ) : (
                      <>
                        {formatNumber(parseFloat(inputs.area), inputs.precision)} {UNIT_LABELS[inputs.areaUnit]}
                        {" × "}{sym}{formatNumber(result.rateApplied, inputs.precision)}
                        {" = "}<strong>{formatCurrency(result.totalPrice, inputs.currency, inputs.precision)}</strong>
                      </>
                    )}
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
                  const active = inputs.area === p.area && inputs.areaUnit === p.areaUnit && inputs.rate === p.rate;
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
                  Price Breakdown
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Area</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rate / Unit</th>
                        <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[0.25, 0.5, 1, 2, 5, 10].map((multiplier) => {
                        const scaledArea = parseFloat(inputs.area) * multiplier;
                        const scaledConverted = convertArea(scaledArea, inputs.areaUnit, inputs.rateUnit);
                        const scaledTotal = scaledConverted * result.rateApplied;
                        const isActive = multiplier === 1;
                        return (
                          <tr key={multiplier} className={`hover:bg-gray-50 transition-colors ${isActive ? "bg-primary/5" : ""}`}>
                            <td className={`py-2 px-3 font-mono ${isActive ? "text-primary font-semibold" : "text-gray-700"}`}>
                              {formatNumber(scaledArea, inputs.precision)} {UNIT_SHORT[inputs.areaUnit]}
                            </td>
                            <td className="py-2 px-3 font-mono text-gray-600">
                              {sym}{formatNumber(result.rateApplied, inputs.precision)}/{UNIT_SHORT[inputs.rateUnit]}
                            </td>
                            <td className={`py-2 px-3 font-mono font-semibold ${isActive ? "text-primary" : "text-gray-900"}`}>
                              {formatCurrency(scaledTotal, inputs.currency, inputs.precision)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Compare Mode */}
            {showCompare && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Compare Two Land Prices
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {compareEntries.map((entry, idx) => {
                    const res = compareResults[idx];
                    const csym = CURRENCY_SYMBOLS[entry.currency];
                    return (
                      <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
                        <div className="font-semibold text-gray-700 text-sm">{entry.label}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            inputMode="decimal"
                            value={entry.area}
                            onChange={(e) => {
                              const updated = [...compareEntries];
                              updated[idx] = { ...updated[idx], area: e.target.value.replace(/[^0-9.]/g, "") };
                              setCompareEntries(updated);
                            }}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Area"
                          />
                          <select
                            value={entry.areaUnit}
                            onChange={(e) => {
                              const updated = [...compareEntries];
                              updated[idx] = { ...updated[idx], areaUnit: e.target.value as Unit, rateUnit: e.target.value as Unit };
                              setCompareEntries(updated);
                            }}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            {ALL_UNITS.map((u) => <option key={u} value={u}>{UNIT_LABELS[u]}</option>)}
                          </select>
                          <input
                            type="number"
                            inputMode="decimal"
                            value={entry.rate}
                            onChange={(e) => {
                              const updated = [...compareEntries];
                              updated[idx] = { ...updated[idx], rate: e.target.value.replace(/[^0-9.]/g, "") };
                              setCompareEntries(updated);
                            }}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Rate"
                          />
                          <select
                            value={entry.currency}
                            onChange={(e) => {
                              const updated = [...compareEntries];
                              updated[idx] = { ...updated[idx], currency: e.target.value as Currency };
                              setCompareEntries(updated);
                            }}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            {ALL_CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className={`text-center py-2 rounded-lg font-mono font-bold text-lg ${res ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`}>
                          {res ? `${csym}${formatNumber(res.total, 2)}` : "—"}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {compareResults[0] && compareResults[1] && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                    {(() => {
                      const a = compareResults[0]!.total;
                      const b = compareResults[1]!.total;
                      const diff = Math.abs(a - b);
                      const cheaper = a < b ? "Option A" : "Option B";
                      const csym = CURRENCY_SYMBOLS[compareResults[0]!.currency];
                      return (
                        <>
                          <strong>{cheaper}</strong> is cheaper by{" "}
                          <strong>{csym}{formatNumber(diff, 2)}</strong>
                          {" "}({formatNumber((diff / Math.max(a, b)) * 100, 1)}% less)
                        </>
                      );
                    })()}
                  </div>
                )}
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
                              {formatNumber(parseFloat(entry.inputs.area), 2)} {UNIT_LABELS[entry.inputs.areaUnit]}
                              {" @ "}{esym}{formatNumber(entry.result.rateApplied, 2)}/{UNIT_SHORT[entry.inputs.rateUnit]}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-primary">
                            = {esym}{formatNumber(entry.result.totalPrice, 2)}
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

      <LandPriceCalculatorSEO />
      <RelatedTools
        currentTool="land-price-calculator"
        tools={[
          "decimal-land-calculator",
          "katha-land-calculator",
          "bigha-land-calculator",
          "acre-to-square-feet-converter",
        ]}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalculatorInputs, ConversionResult, HistoryEntry, Region, Unit } from "./types";
import {
  calculate,
  validateInput,
  formatNumber,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  REGION_LABELS,
  UNIT_LABELS,
  UNIT_SHORT,
  ALL_UNITS,
  ALL_REGIONS,
  REGION_BIGHA_SQFT,
  REGION_KATHA_SQFT,
  getBighaForRegion,
  getKathaForRegion,
} from "./logic";
import BighaLandCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS: { label: string; value: string; unit: Unit }[] = [
  { label: "1 Bigha",  value: "1",  unit: "bigha" },
  { label: "5 Bigha",  value: "5",  unit: "bigha" },
  { label: "10 Bigha", value: "10", unit: "bigha" },
  { label: "20 Bigha", value: "20", unit: "bigha" },
  { label: "1 Acre",   value: "1",  unit: "acre"  },
];

export default function BighaLandCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    value: "",
    fromUnit: "bigha",
    region: "bangladesh",
    precision: 4,
    customBigha: "14400",
  });
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    inputRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const err = validateInput(inputs.value);
      if (err) { setError(err); setResult(null); return; }
      setError(null);
      setResult(calculate(inputs));
    }, 100),
    [inputs]
  );

  useEffect(() => {
    if (inputs.value === "") { setResult(null); setError(null); return; }
    run();
  }, [inputs, run]);

  const handleValueChange = (val: string) => {
    setInputs((p) => ({ ...p, value: val.replace(/[^0-9.]/g, "") }));
  };

  const handlePreset = (value: string, unit: Unit) => {
    setInputs((p) => ({ ...p, value, fromUnit: unit }));
    inputRef.current?.focus();
  };

  const handleReset = () => {
    setInputs({ value: "", fromUnit: "bigha", region: "bangladesh", precision: 4, customBigha: "14400" });
    setResult(null);
    setError(null);
    inputRef.current?.focus();
  };

  const handleCopy = () => {
    if (!result) return;
    const val = parseFloat(inputs.value);
    const fromLabel = UNIT_LABELS[inputs.fromUnit];
    const region = REGION_LABELS[inputs.region];
    const lines = ALL_UNITS
      .map((u) => `  ${UNIT_LABELS[u]}: ${formatNumber(result[u], inputs.precision)}`)
      .join("\n");
    navigator.clipboard.writeText(
      `${formatNumber(val, inputs.precision)} ${fromLabel} (${region})\n${lines}`
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
    downloadFile(exportToText(inputs, result), "bigha_land_calculation.txt");
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

  // Primary display: if input is bigha show katha, otherwise show bigha
  const primaryUnit: Unit = inputs.fromUnit === "bigha" ? "katha" : "bigha";

  const bighaPerRegion = inputs.region !== "custom"
    ? REGION_BIGHA_SQFT[inputs.region as Exclude<Region, "custom">]
    : parseFloat(inputs.customBigha) || 14400;

  const kathaPerRegion = inputs.region !== "custom"
    ? REGION_KATHA_SQFT[inputs.region as Exclude<Region, "custom">]
    : bighaPerRegion / 20;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📏</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Bigha Land Calculator</h3>
              <p className="text-sm text-blue-800">
                Convert land area between Bigha, Katha, Decimal, Acre, and more using Bangladesh, West Bengal, Assam, or Nepal standards.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Regional Standard</label>
                <select
                  value={inputs.region}
                  onChange={(e) => setInputs((p) => ({ ...p, region: e.target.value as Region }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  {ALL_REGIONS.map((r) => (
                    <option key={r} value={r}>{REGION_LABELS[r]}</option>
                  ))}
                </select>
              </div>

              {/* Custom Bigha input */}
              {inputs.region === "custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    1 Bigha = ? sq ft
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.customBigha}
                    onChange={(e) => setInputs((p) => ({ ...p, customBigha: e.target.value.replace(/[^0-9.]/g, "") }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                    placeholder="e.g. 14400"
                    min="1"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select
                  value={inputs.precision}
                  onChange={(e) => setInputs((p) => ({ ...p, precision: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
                  <option value={6}>6 decimal places</option>
                </select>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  {REGION_LABELS[inputs.region]} Standard
                </div>
                <div>1 Bigha = {bighaPerRegion.toLocaleString()} sq ft</div>
                <div>1 Katha = {kathaPerRegion.toLocaleString()} sq ft</div>
                <div>1 Bigha = 20 Katha</div>
                <div>1 Decimal = 435.6 sq ft</div>
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

            {/* Primary Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                {UNIT_LABELS[primaryUnit]}
              </p>
              <div className="text-4xl font-bold mb-1 leading-none break-all">
                {result ? formatNumber(result[primaryUnit], inputs.precision) : "—"}
              </div>
              <div className="text-lg text-primary-100 mb-4">
                {UNIT_SHORT[primaryUnit]}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Input:</span>
                    <span className="font-semibold">
                      {formatNumber(parseFloat(inputs.value), inputs.precision)} {UNIT_SHORT[inputs.fromUnit]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Region:</span>
                    <span className="font-semibold">{REGION_LABELS[inputs.region]}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={handleCopy}
                  disabled={!result}
                  className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed"
                >
                  {copied ? "✓ Copied!" : "📋 Copy All Results"}
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
                Enter Land Area
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Amount</label>
                  <input
                    ref={inputRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.value}
                    onChange={(e) => handleValueChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="e.g. 5"
                    min="0"
                    step="any"
                    aria-label="Land area value"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Unit</label>
                  <select
                    value={inputs.fromUnit}
                    onChange={(e) => setInputs((p) => ({ ...p, fromUnit: e.target.value as Unit }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {ALL_UNITS.map((u) => (
                      <option key={u} value={u}>{UNIT_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {result && !error && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Base:</strong>{" "}
                    {formatNumber(parseFloat(inputs.value), inputs.precision)} {UNIT_LABELS[inputs.fromUnit]} ={" "}
                    <strong>{formatNumber(result.sqft, inputs.precision)} sq ft</strong>
                    {" "}({REGION_LABELS[inputs.region]})
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800 text-sm">
                    <span>⚠️</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}
            </div>

            {/* All Conversions Output */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                All Conversions
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {ALL_UNITS.map((unit) => {
                  const isFrom = unit === inputs.fromUnit;
                  const val = result ? result[unit] : null;
                  return (
                    <div
                      key={unit}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        isFrom
                          ? "bg-primary/5 border-primary/20"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span className={`text-sm font-medium ${isFrom ? "text-primary" : "text-gray-600"}`}>
                        {UNIT_LABELS[unit]}
                        {isFrom && <span className="ml-1 text-xs">(input)</span>}
                      </span>
                      <span className={`font-mono font-semibold text-sm ${isFrom ? "text-primary" : "text-gray-900"}`}>
                        {val !== null ? formatNumber(val, inputs.precision) : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => {
                  const active = inputs.value === p.value && inputs.fromUnit === p.unit;
                  return (
                    <button
                      key={p.label}
                      onClick={() => handlePreset(p.value, p.unit)}
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

            {/* Regional Comparison */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Regional Comparison
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  Same input ({formatNumber(parseFloat(inputs.value), inputs.precision)} {UNIT_LABELS[inputs.fromUnit]}) in Bigha across all regions:
                </p>
                <div className="space-y-2">
                  {(["bangladesh", "westbengal", "assam", "nepal"] as Exclude<Region, "custom">[]).map((r) => {
                    const bigha = REGION_BIGHA_SQFT[r];
                    const katha = REGION_KATHA_SQFT[r];
                    // convert input to sqft using current region table, then to bigha in this region
                    const sqft = result.sqft;
                    const bighaVal = sqft / bigha;
                    return (
                      <div key={r} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">{REGION_LABELS[r]}</span>
                        <div className="text-right">
                          <span className="font-mono font-semibold text-gray-900 text-sm">
                            {formatNumber(bighaVal, inputs.precision)} Bigha
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            (1 Bigha = {bigha.toLocaleString()} sq ft)
                          </span>
                        </div>
                      </div>
                    );
                  })}
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
                            {formatNumber(parseFloat(entry.inputs.value), entry.inputs.precision)}{" "}
                            {UNIT_LABELS[entry.inputs.fromUnit]}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          = {formatNumber(entry.result.bigha, entry.inputs.precision)} Bigha
                          {" · "}{REGION_LABELS[entry.inputs.region]}
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

      <BighaLandCalculatorSEO />
      <RelatedTools
        currentTool="bigha-land-calculator"
        tools={[
          "katha-land-calculator",
          "land-area-calculator-square-feet",
          "acre-to-square-feet-converter",
          "hectare-to-acre-converter",
        ]}
      />
    </>
  );
}

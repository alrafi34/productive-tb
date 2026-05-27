"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalculatorInputs, CalculationResult, Currency, HistoryEntry, LandUnit } from "./types";
import {
  calculate,
  validateInputs,
  fmt,
  fmtNum,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  CURRENCY_SYMBOLS,
  CURRENCY_LABELS,
  ALL_CURRENCIES,
  UNIT_LABELS,
  UNIT_SHORT,
  ALL_UNITS,
} from "./logic";
import SubdivisionCostCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ───────────────────────────────────────────────────────────────────

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  {
    label: "10 Acres / 20 Plots",
    inputs: {
      landSize: "10", landUnit: "acres", numPlots: "20",
      surveyCost: "2000", legalFees: "3000", roadCost: "8000",
      utilityCost: "10000", permitCost: "2500",
    },
  },
  {
    label: "5 Acres / 8 Plots",
    inputs: {
      landSize: "5", landUnit: "acres", numPlots: "8",
      utilityCost: "10000", permitCost: "2500",
    },
  },
  {
    label: "50,000 sq ft / 12 Plots",
    inputs: {
      landSize: "50000", landUnit: "sqft", numPlots: "12",
      drainageCost: "6000", roadCost: "12000", miscCost: "3500",
    },
  },
  {
    label: "2 Hectares / 10 Plots",
    inputs: {
      landSize: "2", landUnit: "hectares", numPlots: "10",
      surveyCost: "3000", legalFees: "4000", permitCost: "3000",
      roadCost: "10000", drainageCost: "5000",
    },
  },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  landSize: "",
  landUnit: "acres",
  numPlots: "",
  surveyCost: "",
  legalFees: "",
  permitCost: "",
  utilityCost: "",
  roadCost: "",
  drainageCost: "",
  miscCost: "",
  currency: "USD",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function SubdivisionCostCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    firstRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      const err = validateInputs(inputs);
      setError(err);
      if (err) { setResult(null); return; }
      setResult(calculate(inputs));
    }, 150),
    [inputs]
  );

  useEffect(() => {
    const hasAnyInput =
      inputs.numPlots !== "" ||
      inputs.surveyCost !== "" ||
      inputs.legalFees !== "" ||
      inputs.permitCost !== "" ||
      inputs.utilityCost !== "" ||
      inputs.roadCost !== "" ||
      inputs.drainageCost !== "" ||
      inputs.miscCost !== "";
    if (!hasAnyInput) { setResult(null); setError(null); return; }
    run();
  }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: string) =>
    setInputs((p) => ({ ...p, [key]: value }));
  const setNum = (key: keyof CalculatorInputs, val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setError(null);
    firstRef.current?.focus();
  };

  const handlePreset = (p: (typeof PRESETS)[0]) =>
    setInputs((prev) => ({ ...DEFAULT_INPUTS, ...prev, ...p.inputs }));

  const handleCopy = () => {
    if (!result) return;
    const sym = CURRENCY_SYMBOLS[inputs.currency];
    const text = [
      "Subdivision Cost Estimate",
      `Land: ${inputs.landSize} ${UNIT_LABELS[inputs.landUnit]} | Plots: ${inputs.numPlots}`,
      `Total Cost: ${sym}${result.totalCost.toLocaleString("en-US")}`,
      `Cost Per Plot: ${sym}${result.costPerPlot.toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
      ...(result.landPerPlot > 0 ? [`Land Per Plot: ${fmtNum(result.landPerPlot)} ${UNIT_SHORT[result.landUnit]}`] : []),
    ].join("\n");
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
    downloadFile(exportToText(inputs, result), "subdivision_cost_estimate.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const sym = CURRENCY_SYMBOLS[inputs.currency];

  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Subdivision Cost Calculator</h3>
              <p className="text-sm text-blue-800">
                Estimate the total cost of subdividing land into multiple plots. Enter surveying, legal, permit, utility, road, and drainage costs to get an instant breakdown with cost per plot.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
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
                  onChange={(e) => set("currency", e.target.value)}
                  className={selectCls}
                >
                  {ALL_CURRENCIES.map((c) => (
                    <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Total = Survey + Legal + Permits</div>
                <div className="font-mono">     + Utilities + Road + Drainage + Misc</div>
                <div className="font-mono mt-1">Cost/Plot = Total ÷ Plots</div>
                <div className="font-mono">Land/Plot = Land Size ÷ Plots</div>
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
                Total Subdivision Cost
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? fmt(result.totalCost, result.currency) : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cost Per Plot:</span>
                    <span className="font-semibold">
                      {fmt(result.costPerPlot, result.currency, 2)}
                    </span>
                  </div>
                  {result.landPerPlot > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Land Per Plot:</span>
                      <span className="font-semibold">
                        {fmtNum(result.landPerPlot)} {UNIT_SHORT[result.landUnit]}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-primary-100">Number of Plots:</span>
                    <span className="font-semibold">{inputs.numPlots}</span>
                  </div>
                  {result.breakdown.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Cost Items:</span>
                      <span className="font-semibold">{result.breakdown.length}</span>
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

          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Land Information */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Land Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Land Size</label>
                  <input
                    ref={firstRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.landSize}
                    onChange={(e) => setNum("landSize", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 10"
                    min="0"
                    step="any"
                    aria-label="Total land size"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Unit</label>
                  <select
                    value={inputs.landUnit}
                    onChange={(e) => set("landUnit", e.target.value)}
                    className={selectCls}
                  >
                    {ALL_UNITS.map((u) => (
                      <option key={u} value={u}>{UNIT_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Plots</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={inputs.numPlots}
                  onChange={(e) => setNum("numPlots", e.target.value)}
                  className={`${inputCls} ${error ? "border-red-300" : ""}`}
                  placeholder="e.g. 20"
                  min="1"
                  step="1"
                  aria-label="Number of plots"
                />
                {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
                <p className="text-xs text-gray-500 mt-1">Minimum 1 plot required</p>
              </div>
            </div>

            {/* Cost Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Subdivision Costs ({sym})
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surveying Cost
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.surveyCost}
                    onChange={(e) => setNum("surveyCost", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 2000"
                    min="0"
                    step="any"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical: $500–$5,000</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Fees
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.legalFees}
                    onChange={(e) => setNum("legalFees", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 3000"
                    min="0"
                    step="any"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical: $1,000–$5,000</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Permit &amp; Approval Cost
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.permitCost}
                    onChange={(e) => setNum("permitCost", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 2500"
                    min="0"
                    step="any"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical: $500–$5,000</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Utility Installation
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.utilityCost}
                    onChange={(e) => setNum("utilityCost", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 10000"
                    min="0"
                    step="any"
                  />
                  <p className="text-xs text-gray-500 mt-1">Water, electricity, sewer, internet</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Road Development
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.roadCost}
                    onChange={(e) => setNum("roadCost", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 8000"
                    min="0"
                    step="any"
                  />
                  <p className="text-xs text-gray-500 mt-1">Access roads and paving</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drainage / Infrastructure
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.drainageCost}
                    onChange={(e) => setNum("drainageCost", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 6000"
                    min="0"
                    step="any"
                  />
                  <p className="text-xs text-gray-500 mt-1">Stormwater and drainage systems</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Miscellaneous Cost
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.miscCost}
                    onChange={(e) => setNum("miscCost", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 3500"
                    min="0"
                    step="any"
                  />
                  <p className="text-xs text-gray-500 mt-1">Contingency, admin, and other costs</p>
                </div>
              </div>

              {result && result.totalCost > 0 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Total: {fmt(result.totalCost, result.currency)}</strong>
                  {" → "}
                  <strong>Per Plot: {fmt(result.costPerPlot, result.currency, 2)}</strong>
                  {result.landPerPlot > 0 && (
                    <>
                      {" → "}
                      <strong>Land/Plot: {fmtNum(result.landPerPlot)} {UNIT_SHORT[result.landUnit]}</strong>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Presets
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handlePreset(p)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cost Breakdown */}
            {result && result.breakdown.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Cost Breakdown
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Total Cost",    value: fmt(result.totalCost, result.currency),    highlight: true },
                    { label: "Cost Per Plot", value: fmt(result.costPerPlot, result.currency, 2) },
                    ...(result.landPerPlot > 0
                      ? [{ label: "Land Per Plot", value: `${fmtNum(result.landPerPlot)} ${UNIT_SHORT[result.landUnit]}`, isText: true }]
                      : []),
                  ].map(({ label, value, highlight, isText }) => (
                    <div
                      key={label}
                      className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold break-all ${highlight ? "text-primary text-xl" : isText ? "text-base text-gray-900" : "text-lg text-gray-900"}`}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bar breakdown */}
                <div className="space-y-3">
                  {result.breakdown.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700 font-medium">{item.label}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">{item.pct.toFixed(1)}%</span>
                          <span className="font-mono text-gray-900 font-semibold text-sm">
                            {fmt(item.value, result.currency)}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, item.pct)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-step */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Step-by-Step Breakdown
                  </h3>
                  <button
                    onClick={() => setShowSteps(!showSteps)}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    {showSteps ? "Hide" : "Show"}
                  </button>
                </div>
                {showSteps ? (
                  <ol className="space-y-2">
                    {result.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">
                          {i + 1}
                        </span>
                        <code className="font-mono text-gray-700 bg-gray-50 px-2 py-0.5 rounded text-xs">
                          {step}
                        </code>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-gray-500">Click Show to see the full calculation steps.</p>
                )}
              </div>
            )}

            {/* History */}
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
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No calculations saved yet</div>
                  ) : (
                    history.map((entry: HistoryEntry) => {
                      const esym = CURRENCY_SYMBOLS[entry.inputs.currency];
                      return (
                        <div
                          key={entry.id}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900 text-sm">
                              {entry.inputs.landSize
                                ? `${entry.inputs.landSize} ${UNIT_SHORT[entry.inputs.landUnit]} · `
                                : ""}
                              {entry.inputs.numPlots} plots
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-primary">
                            Total: {esym}{entry.result.totalCost.toLocaleString("en-US")}
                            {" · "}Per plot: {esym}{entry.result.costPerPlot.toLocaleString("en-US", { maximumFractionDigits: 2 })}
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

      <SubdivisionCostCalculatorSEO />
      <RelatedTools
        currentTool="subdivision-cost-calculator"
        tools={[
          "land-price-calculator",
          "plot-division-calculator",
          "land-valuation-calculator",
          "excavation-cost-calculator",
          "fence-material-calculator",
          "boundary-length-calculator",
        ]}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CalculatorInputs, CalculationResult, Currency, HistoryEntry, Thickness, Unit } from "./types";
import {
  calculate,
  validate,
  formatNumber,
  formatCurrency,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  CURRENCY_SYMBOLS,
  CURRENCY_LABELS,
  THICKNESS_LABELS,
  ALL_CURRENCIES,
  ALL_THICKNESSES,
} from "./logic";
import WallBoundaryCostCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  { label: "Residential 200ft", inputs: { perimeter: "200", wallHeight: "6", materialCostPerSqft: "12", laborCostPerSqft: "4", gateCost: "2500" } },
  { label: "Commercial 500ft", inputs: { perimeter: "500", wallHeight: "8", materialCostPerSqft: "15", laborCostPerSqft: "6", gateCost: "5000" } },
  { label: "Farm Boundary 800ft", inputs: { perimeter: "800", wallHeight: "5", materialCostPerSqft: "8", laborCostPerSqft: "3", gateCost: "1500" } },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  perimeter: "",
  unit: "ft",
  wallHeight: "",
  thickness: "9in",
  materialCostPerSqft: "",
  laborCostPerSqft: "",
  plasterCost: "",
  gateCost: "",
  miscCost: "",
  currency: "USD",
  precision: 2,
};

export default function WallBoundaryCostCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const perimeterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(getHistory());
    perimeterRef.current?.focus();
  }, []);

  const run = useCallback(
    debounce(() => {
      setResult(calculate(inputs));
    }, 150),
    [inputs]
  );

  useEffect(() => {
    run();
  }, [inputs, run]);

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    perimeterRef.current?.focus();
  };

  const handlePreset = (preset: typeof PRESETS[0]) => {
    setInputs((p) => ({ ...p, ...preset.inputs }));
  };

  const handleCopy = () => {
    if (!result) return;
    const sym = CURRENCY_SYMBOLS[inputs.currency];
    const text = `Wall Boundary Cost Estimate\nTotal Cost: ${sym}${formatNumber(result.totalCost, inputs.precision)}\nWall Area: ${formatNumber(result.wallArea, 0)} sq ft\nMaterial: ${sym}${formatNumber(result.materialCost, inputs.precision)}\nLabor: ${sym}${formatNumber(result.laborCost, inputs.precision)}`;
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
    downloadFile(exportToText(inputs, result), "wall_boundary_cost_estimate.txt");
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") handleReset();
  };

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));

  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const inputCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧱</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Wall Boundary Cost Calculator</h3>
              <p className="text-sm text-blue-800">
                Estimate the total cost of building a boundary wall. Calculate material, labor, plaster, gate, and total construction cost instantly.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Settings
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["ft", "m"] as Unit[]).map((u) => (
                    <button
                      key={u}
                      onClick={() => set("unit", u)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.unit === u ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      {u === "ft" ? "Feet (ft)" : "Meters (m)"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wall Thickness</label>
                <select value={inputs.thickness} onChange={(e) => set("thickness", e.target.value as Thickness)} className={selectCls}>
                  {ALL_THICKNESSES.map((t) => (
                    <option key={t} value={t}>{THICKNESS_LABELS[t]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select value={inputs.currency} onChange={(e) => set("currency", e.target.value as Currency)} className={selectCls}>
                  {ALL_CURRENCIES.map((c) => (
                    <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Decimal Precision</label>
                <select value={inputs.precision} onChange={(e) => set("precision", parseInt(e.target.value))} className={selectCls}>
                  <option value={0}>0 decimal places</option>
                  <option value={2}>2 decimal places</option>
                  <option value={4}>4 decimal places</option>
                </select>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Area = Length × Height</div>
                <div className="font-mono">Total = Material + Labor + Extras</div>
              </div>

              <div className="pt-2 space-y-2">
                <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  🔄 Reset
                </button>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📜 {showHistory ? "Hide" : "Show"} History
                </button>
                {result && (
                  <button onClick={handleExport} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                    📄 Export TXT
                  </button>
                )}
              </div>
            </div>

            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Total Estimated Cost
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? formatCurrency(result.totalCost, inputs.currency, inputs.precision) : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Wall Area:</span>
                    <span className="font-semibold">{formatNumber(result.wallArea, 0)} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Material:</span>
                    <span className="font-semibold">{sym}{formatNumber(result.materialCost, inputs.precision)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Labor:</span>
                    <span className="font-semibold">{sym}{formatNumber(result.laborCost, inputs.precision)}</span>
                  </div>
                  {result.plasterCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Plaster:</span>
                      <span className="font-semibold">{sym}{formatNumber(result.plasterCost, inputs.precision)}</span>
                    </div>
                  )}
                  {result.gateCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Gate:</span>
                      <span className="font-semibold">{sym}{formatNumber(result.gateCost, inputs.precision)}</span>
                    </div>
                  )}
                  {result.miscCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Misc:</span>
                      <span className="font-semibold">{sym}{formatNumber(result.miscCost, inputs.precision)}</span>
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

          <div className="lg:col-span-8 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Wall Dimensions
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Boundary Length ({inputs.unit})</label>
                  <input
                    ref={perimeterRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.perimeter}
                    onChange={(e) => set("perimeter", e.target.value.replace(/[^0-9.]/g, ""))}
                    onKeyDown={handleKeyDown}
                    className={inputCls}
                    placeholder="e.g. 200"
                    min="0"
                    step="any"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wall Height ({inputs.unit})</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.wallHeight}
                    onChange={(e) => set("wallHeight", e.target.value.replace(/[^0-9.]/g, ""))}
                    onKeyDown={handleKeyDown}
                    className={inputCls}
                    placeholder="e.g. 6"
                    min="0"
                    step="any"
                  />
                </div>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Wall Area:</strong> {inputs.perimeter} × {inputs.wallHeight} = <strong>{formatNumber(result.wallArea, 0)} sq ft</strong>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Cost Per Square Foot
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Material Cost ({sym}/sq ft)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.materialCostPerSqft}
                    onChange={(e) => set("materialCostPerSqft", e.target.value.replace(/[^0-9.]/g, ""))}
                    onKeyDown={handleKeyDown}
                    className={inputCls}
                    placeholder="e.g. 12"
                    min="0"
                    step="any"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Labor Cost ({sym}/sq ft)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.laborCostPerSqft}
                    onChange={(e) => set("laborCostPerSqft", e.target.value.replace(/[^0-9.]/g, ""))}
                    onKeyDown={handleKeyDown}
                    className={inputCls}
                    placeholder="e.g. 4"
                    min="0"
                    step="any"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Additional Costs (Optional)
              </h3>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plaster/Finishing ({sym})</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.plasterCost}
                    onChange={(e) => set("plasterCost", e.target.value.replace(/[^0-9.]/g, ""))}
                    onKeyDown={handleKeyDown}
                    className={inputCls}
                    placeholder="e.g. 1000"
                    min="0"
                    step="any"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gate Cost ({sym})</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.gateCost}
                    onChange={(e) => set("gateCost", e.target.value.replace(/[^0-9.]/g, ""))}
                    onKeyDown={handleKeyDown}
                    className={inputCls}
                    placeholder="e.g. 2500"
                    min="0"
                    step="any"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Miscellaneous ({sym})</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.miscCost}
                    onChange={(e) => set("miscCost", e.target.value.replace(/[^0-9.]/g, ""))}
                    onKeyDown={handleKeyDown}
                    className={inputCls}
                    placeholder="e.g. 500"
                    min="0"
                    step="any"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd> to reset
              </p>
            </div>

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

            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Cost Breakdown
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Wall Area", value: `${formatNumber(result.wallArea, 0)} sq ft`, isText: true },
                    { label: "Material Cost", value: formatCurrency(result.materialCost, inputs.currency, inputs.precision) },
                    { label: "Labor Cost", value: formatCurrency(result.laborCost, inputs.currency, inputs.precision) },
                    ...(result.plasterCost > 0 ? [{ label: "Plaster Cost", value: formatCurrency(result.plasterCost, inputs.currency, inputs.precision) }] : []),
                    ...(result.gateCost > 0 ? [{ label: "Gate Cost", value: formatCurrency(result.gateCost, inputs.currency, inputs.precision) }] : []),
                    ...(result.miscCost > 0 ? [{ label: "Miscellaneous", value: formatCurrency(result.miscCost, inputs.currency, inputs.precision) }] : []),
                    { label: "Total Cost", value: formatCurrency(result.totalCost, inputs.currency, inputs.precision), highlight: true },
                  ].map(({ label, value, isText, highlight }) => (
                    <div key={label} className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold ${highlight ? "text-primary text-xl" : isText ? "text-base text-gray-900" : "text-lg text-gray-900"}`}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                            {entry.inputs.perimeter} × {entry.inputs.wallHeight} {entry.inputs.unit} wall
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          = {formatCurrency(entry.result.totalCost, entry.inputs.currency, 0)}
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

      <WallBoundaryCostCalculatorSEO />
      <RelatedTools
        currentTool="wall-boundary-cost-calculator"
        tools={[
          "boundary-length-calculator",
          "fence-material-calculator",
          "land-price-calculator",
          "plot-division-calculator",
        ]}
      />
    </>
  );
}
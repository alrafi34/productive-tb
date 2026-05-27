"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculatorInputs,
  CalculationResult,
  Currency,
  ExcavationType,
  HistoryEntry,
  InputUnit,
  OutputUnit,
  SoilType,
} from "./types";
import {
  calculate,
  smartFormat,
  formatCurrency,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  EXCAVATION_TYPE_LABELS,
  ALL_EXCAVATION_TYPES,
  SOIL_LABELS,
  SOIL_MULTIPLIERS,
  ALL_SOIL_TYPES,
  INPUT_UNIT_LABELS,
  INPUT_UNIT_SHORT,
  OUTPUT_UNIT_LABELS,
  OUTPUT_UNIT_SHORT,
  ALL_OUTPUT_UNITS,
  CURRENCY_SYMBOLS,
  CURRENCY_LABELS,
  ALL_CURRENCIES,
} from "./logic";
import ExcavationCostCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ───────────────────────────────────────────────────────────────────

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  { label: "Foundation 50×30×5 ft",  inputs: { excavationType: "foundation", unit: "ft", length: "50",  width: "30", depth: "5", soilType: "loose",  excavationRate: "6"  } },
  { label: "Basement 40×25×8 ft",    inputs: { excavationType: "basement",   unit: "ft", length: "40",  width: "25", depth: "8", soilType: "clay",   excavationRate: "8"  } },
  { label: "Trench 100×2×4 ft",      inputs: { excavationType: "trench",     unit: "ft", length: "100", width: "2",  depth: "4", soilType: "sand",   excavationRate: "5"  } },
  { label: "Pond 60×40×6 ft",        inputs: { excavationType: "pond",       unit: "ft", length: "60",  width: "40", depth: "6", soilType: "gravel", excavationRate: "7"  } },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  unit:            "ft",
  excavationType:  "foundation",
  length:          "",
  width:           "",
  depth:           "",
  soilType:        "loose",
  excavationRate:  "",
  laborCost:       "",
  laborDays:       "",
  equipmentCost:   "",
  equipmentHours:  "",
  transportCost:   "",
  currency:        "USD",
  outputUnit:      "yd3",
};

export default function ExcavationCostCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); firstRef.current?.focus(); }, []);

  const run = useCallback(debounce(() => { setResult(calculate(inputs)); }, 120), [inputs]);
  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));
  const setNum = (key: keyof CalculatorInputs, val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  const handleReset = () => { setInputs(DEFAULT_INPUTS); setResult(null); firstRef.current?.focus(); };
  const handlePreset = (p: (typeof PRESETS)[0]) =>
    setInputs((prev) => ({ ...prev, ...p.inputs }));

  const handleCopy = () => {
    if (!result) return;
    const sym = CURRENCY_SYMBOLS[inputs.currency];
    const text = `Excavation Cost Estimate\nVolume: ${smartFormat(result.volumeInUnit)} ${OUTPUT_UNIT_SHORT[result.outputUnit]}\nAdjusted Excavation: ${sym}${smartFormat(result.adjustedExcavationCost)}\nTotal: ${sym}${smartFormat(result.totalCost)}`;
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
    downloadFile(exportToText(inputs, result), "excavation_cost_estimate.txt");
  };
  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const u = INPUT_UNIT_SHORT[inputs.unit];
  const sym = CURRENCY_SYMBOLS[inputs.currency];
  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💰</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Excavation Cost Calculator</h3>
              <p className="text-sm text-blue-800">
                Estimate excavation costs for foundations, basements, trenches, and ponds. Includes soil type multipliers, labor, equipment, and transport costs.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              {/* Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Input Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["ft", "m"] as InputUnit[]).map((u) => (
                    <button key={u} onClick={() => set("unit", u)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.unit === u ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                      {INPUT_UNIT_LABELS[u]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Volume Unit</label>
                <select value={inputs.outputUnit} onChange={(e) => set("outputUnit", e.target.value as OutputUnit)} className={selectCls}>
                  {ALL_OUTPUT_UNITS.map((u) => (
                    <option key={u} value={u}>{OUTPUT_UNIT_LABELS[u]}</option>
                  ))}
                </select>
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select value={inputs.currency} onChange={(e) => set("currency", e.target.value as Currency)} className={selectCls}>
                  {ALL_CURRENCIES.map((c) => (
                    <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
                  ))}
                </select>
              </div>

              {/* Soil type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                <select value={inputs.soilType} onChange={(e) => set("soilType", e.target.value as SoilType)} className={selectCls}>
                  {ALL_SOIL_TYPES.map((s) => (
                    <option key={s} value={s}>{SOIL_LABELS[s]}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Multiplier: ×{SOIL_MULTIPLIERS[inputs.soilType]}
                </p>
              </div>

              {/* Formula hint */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Vol = L × W × D</div>
                <div className="font-mono">Cost = Vol × Rate × Soil</div>
                <div className="font-mono">Total = Cost + Labor + Equip + Transport</div>
              </div>

              {/* Actions */}
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

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Total Estimated Cost
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? formatCurrency(result.totalCost, result.currency) : "—"}
              </div>
              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Volume:</span>
                    <span className="font-semibold">{smartFormat(result.volumeInUnit)} {OUTPUT_UNIT_SHORT[result.outputUnit]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Base Cost:</span>
                    <span className="font-semibold">{formatCurrency(result.baseExcavationCost, result.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Soil Adj. (×{result.soilMultiplier}):</span>
                    <span className="font-semibold">{formatCurrency(result.adjustedExcavationCost, result.currency)}</span>
                  </div>
                  {result.laborTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Labor:</span>
                      <span className="font-semibold">{formatCurrency(result.laborTotal, result.currency)}</span>
                    </div>
                  )}
                  {result.equipmentTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Equipment:</span>
                      <span className="font-semibold">{formatCurrency(result.equipmentTotal, result.currency)}</span>
                    </div>
                  )}
                  {result.transportTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Transport:</span>
                      <span className="font-semibold">{formatCurrency(result.transportTotal, result.currency)}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="space-y-2">
                <button onClick={handleCopy} disabled={!result} className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors text-sm disabled:cursor-not-allowed">
                  {copied ? "✓ Copied!" : "📋 Copy Result"}
                </button>
                <button onClick={handleSave} disabled={!result} className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  💾 Save to History
                </button>
              </div>
            </div>

          </div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* Excavation type */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Excavation Type</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ALL_EXCAVATION_TYPES.map((t) => (
                  <button key={t} onClick={() => set("excavationType", t)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.excavationType === t ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    {EXCAVATION_TYPE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions + Rate */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Dimensions & Rate</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Length ({u})</label>
                  <input ref={firstRef} type="number" inputMode="decimal"
                    value={inputs.length} onChange={(e) => setNum("length", e.target.value)}
                    className={inputCls} placeholder="e.g. 50" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Width ({u})</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.width} onChange={(e) => setNum("width", e.target.value)}
                    className={inputCls} placeholder="e.g. 30" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Depth ({u})</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.depth} onChange={(e) => setNum("depth", e.target.value)}
                    className={inputCls} placeholder="e.g. 5" min="0" step="any" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excavation Rate ({sym} per {OUTPUT_UNIT_SHORT[inputs.outputUnit]})
                </label>
                <input type="number" inputMode="decimal"
                  value={inputs.excavationRate} onChange={(e) => setNum("excavationRate", e.target.value)}
                  className={inputCls} placeholder="e.g. 6" min="0" step="any" />
                <p className="text-xs text-gray-500 mt-1">Typical US range: $5–$15 per yd³ for loose soil</p>
              </div>
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Volume: {smartFormat(result.volumeInUnit)} {OUTPUT_UNIT_SHORT[result.outputUnit]}</strong>
                  {" → "}
                  <strong>Base: {formatCurrency(result.baseExcavationCost, result.currency)}</strong>
                  {" → "}
                  <strong>Adjusted: {formatCurrency(result.adjustedExcavationCost, result.currency)}</strong>
                </div>
              )}
            </div>

            {/* Optional costs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Additional Costs (Optional)</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Labor Rate ({sym}/day)</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.laborCost} onChange={(e) => setNum("laborCost", e.target.value)}
                    className={inputCls} placeholder="e.g. 400" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Labor Days</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.laborDays} onChange={(e) => setNum("laborDays", e.target.value)}
                    className={inputCls} placeholder="e.g. 3" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Rate ({sym}/hr)</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.equipmentCost} onChange={(e) => setNum("equipmentCost", e.target.value)}
                    className={inputCls} placeholder="e.g. 150" min="0" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Hours</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.equipmentHours} onChange={(e) => setNum("equipmentHours", e.target.value)}
                    className={inputCls} placeholder="e.g. 8" min="0" step="any" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transport / Disposal ({sym} flat)</label>
                  <input type="number" inputMode="decimal"
                    value={inputs.transportCost} onChange={(e) => setNum("transportCost", e.target.value)}
                    className={inputCls} placeholder="e.g. 500" min="0" step="any" />
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button key={p.label} onClick={() => handlePreset(p)}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cost Breakdown */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Cost Breakdown</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Volume",       value: `${smartFormat(result.volumeInUnit)} ${OUTPUT_UNIT_SHORT[result.outputUnit]}`, isText: true },
                    { label: "Base Cost",    value: formatCurrency(result.baseExcavationCost, result.currency) },
                    { label: "Soil Adj.",    value: formatCurrency(result.adjustedExcavationCost, result.currency) },
                    ...(result.laborTotal > 0     ? [{ label: "Labor",     value: formatCurrency(result.laborTotal, result.currency) }] : []),
                    ...(result.equipmentTotal > 0 ? [{ label: "Equipment", value: formatCurrency(result.equipmentTotal, result.currency) }] : []),
                    ...(result.transportTotal > 0 ? [{ label: "Transport", value: formatCurrency(result.transportTotal, result.currency) }] : []),
                    { label: "Total",        value: formatCurrency(result.totalCost, result.currency), highlight: true },
                  ].map(({ label, value, isText, highlight }) => (
                    <div key={label} className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold break-all ${highlight ? "text-primary text-xl" : isText ? "text-base text-gray-900" : "text-lg text-gray-900"}`}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-step */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Breakdown</h3>
                  <button onClick={() => setShowSteps(!showSteps)} className="text-sm text-primary font-medium hover:underline">
                    {showSteps ? "Hide" : "Show"}
                  </button>
                </div>
                {showSteps ? (
                  <ol className="space-y-2">
                    {result.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">{i + 1}</span>
                        <code className="font-mono text-gray-700 bg-gray-50 px-2 py-0.5 rounded text-xs">{step}</code>
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
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Calculation History</h3>
                  {history.length > 0 && (
                    <button onClick={handleClearHistory} className="text-xs text-red-600 hover:text-red-700 font-medium">Clear All</button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No calculations saved yet</div>
                  ) : (
                    history.map((entry) => (
                      <div key={entry.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {EXCAVATION_TYPE_LABELS[entry.inputs.excavationType]}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {formatCurrency(entry.result.totalCost, entry.result.currency)} · {smartFormat(entry.result.volumeInUnit)} {OUTPUT_UNIT_SHORT[entry.inputs.outputUnit]}
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

      <ExcavationCostCalculatorSEO />
      <RelatedTools
        currentTool="excavation-cost-calculator"
        tools={[
          "soil-volume-calculator",
          "earth-filling-calculator",
          "cut-and-fill-calculator",
          "land-price-calculator",
        ]}
      />
    </>
  );
}

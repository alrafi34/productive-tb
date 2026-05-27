"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculatorInputs, CalculationResult, Currency, AreaUnit,
  CustomCostRow, HistoryEntry, ScenarioEntry,
} from "./types";
import {
  calculate, fmt, fmtNum, debounce,
  saveToHistory, getHistory, clearHistory,
  saveScenario, getScenarios, deleteScenario,
  autoSave, loadAutoSave,
  exportToText, downloadFile,
  CURRENCY_SYMBOLS, CURRENCY_LABELS, ALL_CURRENCIES,
  AREA_UNIT_LABELS, AREA_UNIT_SHORT, ALL_AREA_UNITS,
} from "./logic";
import LandDevelopmentCostCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

// ── Presets ───────────────────────────────────────────────────────────────────

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  {
    label: "Residential",
    inputs: {
      landArea: "10000", areaUnit: "sqft", landPurchase: "100000",
      roadCost: "15000", sitePreparation: "8000", drainage: "5000",
      water: "3000", electricity: "4000", sewer: "6000",
      permitFees: "2500", engineering: "3500", labor: "7000", materials: "12000",
      contingencyPct: 10, taxPct: 5,
    },
  },
  {
    label: "Commercial",
    inputs: {
      landArea: "2", areaUnit: "acre", landPurchase: "250000",
      roadCost: "35000", sitePreparation: "20000", drainage: "15000",
      water: "8000", electricity: "12000", sewer: "10000",
      permitFees: "8000", engineering: "12000", labor: "25000", materials: "40000",
      contingencyPct: 15, taxPct: 5,
    },
  },
  {
    label: "Agricultural",
    inputs: {
      landArea: "5", areaUnit: "acre", landPurchase: "50000",
      roadCost: "8000", sitePreparation: "5000", drainage: "8000",
      water: "4000", electricity: "3000", sewer: "0",
      permitFees: "1500", engineering: "2000", labor: "5000", materials: "6000",
      contingencyPct: 10, taxPct: 3,
    },
  },
  {
    label: "Industrial",
    inputs: {
      landArea: "1", areaUnit: "hectare", landPurchase: "180000",
      roadCost: "45000", sitePreparation: "30000", drainage: "20000",
      water: "12000", electricity: "18000", sewer: "15000",
      permitFees: "10000", engineering: "15000", labor: "35000", materials: "55000",
      contingencyPct: 12, taxPct: 5,
    },
  },
];

const DEFAULT_INPUTS: CalculatorInputs = {
  landArea: "", areaUnit: "sqft", landPurchase: "",
  roadCost: "", sitePreparation: "", drainage: "",
  water: "", electricity: "", sewer: "",
  permitFees: "", engineering: "", labor: "", materials: "",
  contingencyPct: 10, taxPct: 5,
  currency: "USD",
  customRows: [],
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function LandDevelopmentCostCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showScenarios, setShowScenarios] = useState(false);
  const [scenarioLabel, setScenarioLabel] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [scenarios, setScenarios] = useState<ScenarioEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  // Load autosave + history on mount
  useEffect(() => {
    const saved = loadAutoSave();
    if (saved) setInputs(saved);
    setHistory(getHistory());
    setScenarios(getScenarios());
    firstRef.current?.focus();
  }, []);

  // Debounced calculation
  const run = useCallback(
    debounce(() => {
      setResult(calculate(inputs));
      autoSave(inputs);
    }, 150),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));
  const setNum = (key: keyof CalculatorInputs, val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    firstRef.current?.focus();
  };

  const handlePreset = (p: (typeof PRESETS)[0]) =>
    setInputs((prev) => ({ ...DEFAULT_INPUTS, ...prev, ...p.inputs }));

  const handleCopy = () => {
    if (!result) return;
    const sym = CURRENCY_SYMBOLS[inputs.currency];
    const text = [
      "Land Development Cost Summary",
      `Base Cost: ${sym}${result.baseCost.toLocaleString("en-US")}`,
      `Contingency (${inputs.contingencyPct}%): ${sym}${result.contingencyAmount.toLocaleString("en-US")}`,
      `Tax (${inputs.taxPct}%): ${sym}${result.taxAmount.toLocaleString("en-US")}`,
      `Total Cost: ${sym}${result.totalCost.toLocaleString("en-US")}`,
      ...(parseFloat(inputs.landArea) > 0
        ? [`Cost per ${AREA_UNIT_SHORT[inputs.areaUnit]}: ${sym}${fmtNum(result.costPerUnit)}`]
        : []),
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
    downloadFile(exportToText(inputs, result), "land_development_cost.txt");
  };

  const handleSaveScenario = () => {
    if (!result || !scenarioLabel.trim()) return;
    saveScenario(scenarioLabel.trim(), inputs, result);
    setScenarios(getScenarios());
    setScenarioLabel("");
  };

  const handleDeleteScenario = (id: string) => {
    deleteScenario(id);
    setScenarios(getScenarios());
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  // Custom rows
  const addCustomRow = () => {
    const newRow: CustomCostRow = { id: Date.now().toString(), label: "", value: "" };
    setInputs((p) => ({ ...p, customRows: [...p.customRows, newRow] }));
  };

  const updateCustomRow = (id: string, field: "label" | "value", val: string) => {
    setInputs((p) => ({
      ...p,
      customRows: p.customRows.map((r) =>
        r.id === id
          ? { ...r, [field]: field === "value" ? val.replace(/[^0-9.]/g, "") : val }
          : r
      ),
    }));
  };

  const removeCustomRow = (id: string) => {
    setInputs((p) => ({ ...p, customRows: p.customRows.filter((r) => r.id !== id) }));
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
              <h3 className="font-semibold text-blue-900 mb-1">Land Development Cost Calculator</h3>
              <p className="text-sm text-blue-800">
                Estimate the total cost of land development by combining all major expenses — road, utilities, permits, labor, materials, and more. Includes contingency and tax adjustments.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select value={inputs.currency} onChange={(e) => set("currency", e.target.value as Currency)} className={selectCls}>
                  {ALL_CURRENCIES.map((c) => (
                    <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contingency: {inputs.contingencyPct}%
                </label>
                <input type="range" min="0" max="30" step="1"
                  value={inputs.contingencyPct}
                  onChange={(e) => set("contingencyPct", parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>0%</span><span>30%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Covers unexpected expenses. Default: 10%</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate: {inputs.taxPct}%
                </label>
                <input type="range" min="0" max="20" step="0.5"
                  value={inputs.taxPct}
                  onChange={(e) => set("taxPct", parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>0%</span><span>20%</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Base = Sum of all costs</div>
                <div className="font-mono">Contingency = Base × %</div>
                <div className="font-mono">Tax = Base × %</div>
                <div className="font-mono">Total = Base + Cont. + Tax</div>
              </div>

              <div className="pt-2 space-y-2">
                <button onClick={handleReset} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  🔄 Reset
                </button>
                <button onClick={() => setShowHistory(!showHistory)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📜 {showHistory ? "Hide" : "Show"} History
                </button>
                <button onClick={() => setShowScenarios(!showScenarios)} className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm">
                  📁 {showScenarios ? "Hide" : "Show"} Scenarios
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
                Total Development Cost
              </p>
              <div className="text-3xl font-bold mb-1 leading-none break-all">
                {result ? fmt(result.totalCost, result.currency) : "—"}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Base Cost:</span>
                    <span className="font-semibold">{fmt(result.baseCost, result.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Contingency ({inputs.contingencyPct}%):</span>
                    <span className="font-semibold">{fmt(result.contingencyAmount, result.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Tax ({inputs.taxPct}%):</span>
                    <span className="font-semibold">{fmt(result.taxAmount, result.currency)}</span>
                  </div>
                  {parseFloat(inputs.landArea) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Per {AREA_UNIT_SHORT[inputs.areaUnit]}:</span>
                      <span className="font-semibold">{sym}{fmtNum(result.costPerUnit)}</span>
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

            {/* Land Information */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Land Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Area</label>
                  <input
                    ref={firstRef}
                    type="number" inputMode="decimal"
                    value={inputs.landArea}
                    onChange={(e) => setNum("landArea", e.target.value)}
                    className={inputCls} placeholder="e.g. 10000" min="0" step="any"
                    aria-label="Land area"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                  <select value={inputs.areaUnit} onChange={(e) => set("areaUnit", e.target.value as AreaUnit)} className={selectCls}>
                    {ALL_AREA_UNITS.map((u) => (
                      <option key={u} value={u}>{AREA_UNIT_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Land Purchase Cost ({sym})</label>
                <input
                  type="number" inputMode="decimal"
                  value={inputs.landPurchase}
                  onChange={(e) => setNum("landPurchase", e.target.value)}
                  className={inputCls} placeholder="e.g. 100000" min="0" step="any"
                  aria-label="Land purchase cost"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank if not purchasing land</p>
              </div>
            </div>

            {/* Infrastructure Costs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Infrastructure Costs ({sym})</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Road Construction</label>
                  <input type="number" inputMode="decimal" value={inputs.roadCost}
                    onChange={(e) => setNum("roadCost", e.target.value)}
                    className={inputCls} placeholder="e.g. 15000" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Typical: $5,000–$50,000</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Preparation / Clearing</label>
                  <input type="number" inputMode="decimal" value={inputs.sitePreparation}
                    onChange={(e) => setNum("sitePreparation", e.target.value)}
                    className={inputCls} placeholder="e.g. 8000" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Grading, clearing, leveling</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Drainage System</label>
                  <input type="number" inputMode="decimal" value={inputs.drainage}
                    onChange={(e) => setNum("drainage", e.target.value)}
                    className={inputCls} placeholder="e.g. 5000" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Stormwater, culverts</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Water Connection</label>
                  <input type="number" inputMode="decimal" value={inputs.water}
                    onChange={(e) => setNum("water", e.target.value)}
                    className={inputCls} placeholder="e.g. 3000" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Water line installation</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Electricity Connection</label>
                  <input type="number" inputMode="decimal" value={inputs.electricity}
                    onChange={(e) => setNum("electricity", e.target.value)}
                    className={inputCls} placeholder="e.g. 4000" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Power line, transformer</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sewer System</label>
                  <input type="number" inputMode="decimal" value={inputs.sewer}
                    onChange={(e) => setNum("sewer", e.target.value)}
                    className={inputCls} placeholder="e.g. 6000" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Sewer line, septic</p>
                </div>
              </div>
            </div>

            {/* Professional & Labor Costs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Professional & Labor Costs ({sym})</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permits & Legal Fees</label>
                  <input type="number" inputMode="decimal" value={inputs.permitFees}
                    onChange={(e) => setNum("permitFees", e.target.value)}
                    className={inputCls} placeholder="e.g. 2500" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Typical: $500–$10,000</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Survey & Engineering</label>
                  <input type="number" inputMode="decimal" value={inputs.engineering}
                    onChange={(e) => setNum("engineering", e.target.value)}
                    className={inputCls} placeholder="e.g. 3500" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Survey, design, consulting</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Labor Cost</label>
                  <input type="number" inputMode="decimal" value={inputs.labor}
                    onChange={(e) => setNum("labor", e.target.value)}
                    className={inputCls} placeholder="e.g. 7000" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Construction labor</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Material Cost</label>
                  <input type="number" inputMode="decimal" value={inputs.materials}
                    onChange={(e) => setNum("materials", e.target.value)}
                    className={inputCls} placeholder="e.g. 12000" min="0" step="any" />
                  <p className="text-xs text-gray-500 mt-1">Construction materials</p>
                </div>
              </div>
            </div>

            {/* Custom Cost Rows */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Custom Cost Items</h3>
                <button onClick={addCustomRow} className="px-3 py-1.5 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors">
                  + Add Row
                </button>
              </div>
              {inputs.customRows.length === 0 ? (
                <p className="text-sm text-gray-500">Add custom expense categories specific to your project.</p>
              ) : (
                <div className="space-y-3">
                  {inputs.customRows.map((row) => (
                    <div key={row.id} className="grid grid-cols-[1fr_auto_auto] gap-2 items-center">
                      <input
                        type="text"
                        value={row.label}
                        onChange={(e) => updateCustomRow(row.id, "label", e.target.value)}
                        className="px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Cost label"
                      />
                      <input
                        type="number" inputMode="decimal"
                        value={row.value}
                        onChange={(e) => updateCustomRow(row.id, "value", e.target.value)}
                        className="w-32 px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Amount"
                        min="0" step="any"
                      />
                      <button onClick={() => removeCustomRow(row.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" aria-label="Remove row">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
            {result && result.breakdown.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Cost Breakdown</h3>

                {/* Summary cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Base Cost",    value: fmt(result.baseCost, result.currency),    highlight: false },
                    { label: "Contingency",  value: fmt(result.contingencyAmount, result.currency) },
                    { label: "Tax",          value: fmt(result.taxAmount, result.currency) },
                    { label: "Total Cost",   value: fmt(result.totalCost, result.currency),   highlight: true },
                    ...(parseFloat(inputs.landArea) > 0
                      ? [{ label: `Per ${AREA_UNIT_SHORT[inputs.areaUnit]}`, value: `${sym}${fmtNum(result.costPerUnit)}`, isText: true }]
                      : []),
                  ].map(({ label, value, highlight, isText }) => (
                    <div key={label} className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold break-all ${highlight ? "text-primary text-xl" : isText ? "text-base text-gray-900" : "text-lg text-gray-900"}`}>{value}</div>
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
                          <span className="font-mono text-gray-900 font-semibold text-sm">{fmt(item.value, result.currency)}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, item.pct)}%` }} />
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

            {/* Scenario Comparison */}
            {showScenarios && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Saved Scenarios</h3>
                </div>
                <div className="p-4 space-y-3">
                  {result && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={scenarioLabel}
                        onChange={(e) => setScenarioLabel(e.target.value)}
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Scenario name (e.g. Option A)"
                      />
                      <button
                        onClick={handleSaveScenario}
                        disabled={!scenarioLabel.trim()}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Save
                      </button>
                    </div>
                  )}
                  {scenarios.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">No scenarios saved yet</p>
                  ) : (
                    <div className="space-y-2">
                      {scenarios.map((s: ScenarioEntry) => (
                        <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-800 text-sm">{s.label}</div>
                            <div className="text-xs text-primary font-semibold">
                              {fmt(s.result.totalCost, s.result.currency)} · Base: {fmt(s.result.baseCost, s.result.currency)}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setInputs(s.inputs); setShowScenarios(false); }}
                              className="text-xs text-primary font-medium hover:underline"
                            >
                              Load
                            </button>
                            <button
                              onClick={() => handleDeleteScenario(s.id)}
                              className="text-xs text-red-500 font-medium hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                    history.map((entry: HistoryEntry) => {
                      const esym = CURRENCY_SYMBOLS[entry.inputs.currency];
                      return (
                        <div key={entry.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900 text-sm">
                              {entry.inputs.landArea
                                ? `${entry.inputs.landArea} ${AREA_UNIT_SHORT[entry.inputs.areaUnit]} · `
                                : ""}
                              {esym}{entry.result.totalCost.toLocaleString("en-US")}
                            </span>
                            <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                          </div>
                          <div className="text-sm font-semibold text-primary">
                            Base: {esym}{entry.result.baseCost.toLocaleString("en-US")}
                            {" · "}Contingency: {esym}{entry.result.contingencyAmount.toLocaleString("en-US")}
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

      <LandDevelopmentCostCalculatorSEO />
      <RelatedTools
        currentTool="land-development-cost-calculator"
        tools={[
          "land-price-calculator",
          "subdivision-cost-calculator",
          "excavation-cost-calculator",
          "land-valuation-calculator",
          "construction-cost-estimator",
          "property-appreciation-calculator",
        ]}
      />
    </>
  );
}

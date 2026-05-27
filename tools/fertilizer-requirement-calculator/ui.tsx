"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculationResult, CalculatorInputs, Currency, AreaUnit, CropType, FertilizerType, HistoryEntry,
} from "./types";
import {
  calculate, fmt, fmtNum, debounce,
  saveToHistory, getHistory, clearHistory,
  exportToText, downloadFile,
  CURRENCY_SYMBOLS, CURRENCY_LABELS, ALL_CURRENCIES,
  AREA_UNIT_LABELS, AREA_UNIT_SHORT, ALL_AREA_UNITS,
  CROP_LABELS, ALL_CROPS,
  FERTILIZER_LABELS, ALL_FERTILIZERS,
  CROP_NUTRIENT_PRESETS, FERTILIZER_COMPOSITION_PRESETS,
} from "./logic";
import FertilizerRequirementCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: CalculatorInputs = {
  landArea: "",
  areaUnit: "acre",
  cropType: "rice",
  fertilizerType: "urea",
  nutrientRequirement: CROP_NUTRIENT_PRESETS.rice,
  fertilizerComposition: FERTILIZER_COMPOSITION_PRESETS.urea,
  currency: "USD",
  fertilizerPrice: "",
};

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  { label: "Rice 2 acres + Urea", inputs: { landArea: "2", cropType: "rice", fertilizerType: "urea" } },
  { label: "Wheat 5 acres + DAP", inputs: { landArea: "5", cropType: "wheat", fertilizerType: "dap" } },
  { label: "Corn 3 acres + NPK", inputs: { landArea: "3", cropType: "corn", fertilizerType: "npk-20-20-20" } },
  { label: "Tomato 1 hectare", inputs: { landArea: "1", areaUnit: "hectare", cropType: "tomato", fertilizerType: "npk-10-10-10" } },
];
export default function FertilizerRequirementCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); firstRef.current?.focus(); }, []);

  const run = useCallback(debounce(() => { setResult(calculate(inputs)); }, 150), [inputs]);
  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));
  const setNum = (key: keyof CalculatorInputs, val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  // Handle crop change - auto-update nutrient requirements
  const handleCropChange = (cropType: CropType) => {
    setInputs((p) => ({
      ...p,
      cropType,
      nutrientRequirement: CROP_NUTRIENT_PRESETS[cropType],
    }));
  };

  // Handle fertilizer change - auto-update composition
  const handleFertilizerChange = (fertilizerType: FertilizerType) => {
    setInputs((p) => ({
      ...p,
      fertilizerType,
      fertilizerComposition: FERTILIZER_COMPOSITION_PRESETS[fertilizerType],
    }));
  };

  const handleReset = () => { setInputs(DEFAULT_INPUTS); setResult(null); firstRef.current?.focus(); };
  const handlePreset = (p: (typeof PRESETS)[0]) => {
    const newInputs = { ...DEFAULT_INPUTS, ...p.inputs };
    // Update nutrient requirements and composition based on crop/fertilizer
    if (p.inputs.cropType) {
      newInputs.nutrientRequirement = CROP_NUTRIENT_PRESETS[p.inputs.cropType];
    }
    if (p.inputs.fertilizerType) {
      newInputs.fertilizerComposition = FERTILIZER_COMPOSITION_PRESETS[p.inputs.fertilizerType];
    }
    setInputs(newInputs);
  };

  const handleCopy = () => {
    if (!result) return;
    const sym = CURRENCY_SYMBOLS[inputs.currency];
    const text = `Fertilizer Requirement Summary\nCrop: ${CROP_LABELS[result.cropType]}\nLand: ${fmtNum(result.landArea, 1)} ${AREA_UNIT_SHORT[result.areaUnit]}\nFertilizer: ${FERTILIZER_LABELS[result.fertilizerType]}\nRequired: ${fmtNum(result.totalFertilizerNeeded, 1)} kg${result.totalCost ? `\nCost: ${fmt(result.totalCost, result.currency, 2)}` : ""}`;
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
    downloadFile(exportToText(inputs, result), "fertilizer_requirement.txt");
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
          <p className="text-sm text-blue-800">
            Calculate fertilizer requirements for crops based on land size, crop type, and nutrient needs. Get instant estimates for Urea, DAP, NPK, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

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

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Required = Nutrient ÷ (% / 100)</div>
                <div className="font-mono">Total = Required × Land Area</div>
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

            {/* Result Card */}
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white">
              <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                Total Fertilizer Required
              </p>
              <div className="text-3xl font-bold mb-1 leading-none">
                {result ? `${fmtNum(result.totalFertilizerNeeded, 1)} kg` : "—"}
              </div>
              {result && (
                <div className="text-primary-100 text-sm mb-3">
                  {FERTILIZER_LABELS[result.fertilizerType]}
                </div>
              )}

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Land Area:</span>
                    <span className="font-semibold">{fmtNum(result.landArea, 1)} {AREA_UNIT_SHORT[result.areaUnit]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Crop:</span>
                    <span className="font-semibold">{CROP_LABELS[result.cropType]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Per Acre:</span>
                    <span className="font-semibold">{fmtNum(result.totalFertilizerNeeded / result.landAreaInAcres, 1)} kg</span>
                  </div>
                  {result.totalCost !== null && (
                    <div className="flex justify-between pt-1 border-t border-white/20 mt-1">
                      <span className="text-primary-100">Est. Cost:</span>
                      <span className="font-semibold text-yellow-300">{fmt(result.totalCost, result.currency, 2)}</span>
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

            {/* Core Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Land & Crop Details</h3>

              {/* Land Area */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Area</label>
                  <input
                    ref={firstRef}
                    type="number"
                    inputMode="decimal"
                    value={inputs.landArea}
                    onChange={(e) => setNum("landArea", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 2"
                    min="0"
                    step="any"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                  <select
                    value={inputs.areaUnit}
                    onChange={(e) => set("areaUnit", e.target.value as AreaUnit)}
                    className={selectCls}
                  >
                    {ALL_AREA_UNITS.map((u) => (
                      <option key={u} value={u}>{AREA_UNIT_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Crop & Fertilizer */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                  <select
                    value={inputs.cropType}
                    onChange={(e) => handleCropChange(e.target.value as CropType)}
                    className={selectCls}
                  >
                    {ALL_CROPS.map((c) => (
                      <option key={c} value={c}>{CROP_LABELS[c]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fertilizer Type</label>
                  <select
                    value={inputs.fertilizerType}
                    onChange={(e) => handleFertilizerChange(e.target.value as FertilizerType)}
                    className={selectCls}
                  >
                    {ALL_FERTILIZERS.map((f) => (
                      <option key={f} value={f}>{FERTILIZER_LABELS[f]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Optional Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fertilizer Price ({sym}/kg) <span className="text-gray-400 font-normal">Optional</span>
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={inputs.fertilizerPrice}
                  onChange={(e) => setNum("fertilizerPrice", e.target.value)}
                  className={inputCls}
                  placeholder="e.g. 0.50"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-500 mt-1">Enter price per kg to calculate total cost</p>
              </div>

              {/* Calculation preview */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Land:</strong> {fmtNum(result.landArea, 1)} {AREA_UNIT_SHORT[result.areaUnit]} 
                  ({fmtNum(result.landAreaInAcres, 2)} acres) → 
                  <strong> {fmtNum(result.totalFertilizerNeeded, 1)} kg {FERTILIZER_LABELS[result.fertilizerType]}</strong>
                </div>
              )}
            </div>

            {/* Nutrient Requirements */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Nutrient Requirements (kg/acre)</h3>
                <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-sm text-primary font-medium hover:underline">
                  {showAdvanced ? "Hide" : "Show"} Advanced
                </button>
              </div>
              
              {showAdvanced ? (
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nitrogen (N)</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.nutrientRequirement.nitrogen}
                      onChange={(e) => setInputs(p => ({
                        ...p,
                        nutrientRequirement: { ...p.nutrientRequirement, nitrogen: parseFloat(e.target.value) || 0 }
                      }))}
                      className={inputCls}
                      placeholder="60"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phosphorus (P)</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.nutrientRequirement.phosphorus}
                      onChange={(e) => setInputs(p => ({
                        ...p,
                        nutrientRequirement: { ...p.nutrientRequirement, phosphorus: parseFloat(e.target.value) || 0 }
                      }))}
                      className={inputCls}
                      placeholder="25"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Potassium (K)</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.nutrientRequirement.potassium}
                      onChange={(e) => setInputs(p => ({
                        ...p,
                        nutrientRequirement: { ...p.nutrientRequirement, potassium: parseFloat(e.target.value) || 0 }
                      }))}
                      className={inputCls}
                      placeholder="30"
                      min="0"
                      step="1"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="text-sm text-gray-700">
                    <strong>{CROP_LABELS[inputs.cropType]} Requirements:</strong>{" "}
                    N: {inputs.nutrientRequirement.nitrogen} kg/acre, 
                    P: {inputs.nutrientRequirement.phosphorus} kg/acre, 
                    K: {inputs.nutrientRequirement.potassium} kg/acre
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Click "Show Advanced" to customize nutrient requirements</p>
                </div>
              )}
            </div>

            {/* Fertilizer Composition */}
            {showAdvanced && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Fertilizer Composition (%)</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nitrogen %</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.fertilizerComposition.nitrogen}
                      onChange={(e) => setInputs(p => ({
                        ...p,
                        fertilizerComposition: { ...p.fertilizerComposition, nitrogen: parseFloat(e.target.value) || 0 }
                      }))}
                      className={inputCls}
                      placeholder="46"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phosphorus %</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.fertilizerComposition.phosphorus}
                      onChange={(e) => setInputs(p => ({
                        ...p,
                        fertilizerComposition: { ...p.fertilizerComposition, phosphorus: parseFloat(e.target.value) || 0 }
                      }))}
                      className={inputCls}
                      placeholder="0"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Potassium %</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={inputs.fertilizerComposition.potassium}
                      onChange={(e) => setInputs(p => ({
                        ...p,
                        fertilizerComposition: { ...p.fertilizerComposition, potassium: parseFloat(e.target.value) || 0 }
                      }))}
                      className={inputCls}
                      placeholder="0"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {FERTILIZER_LABELS[inputs.fertilizerType]} composition: 
                  N: {inputs.fertilizerComposition.nitrogen}%, 
                  P: {inputs.fertilizerComposition.phosphorus}%, 
                  K: {inputs.fertilizerComposition.potassium}%
                </p>
              </div>
            )}

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
            {/* Calculation Results */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Calculation Results</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Total Fertilizer",  value: `${fmtNum(result.totalFertilizerNeeded, 1)} kg`,    highlight: true },
                    { label: "Land Area",         value: `${fmtNum(result.landArea, 1)} ${AREA_UNIT_SHORT[result.areaUnit]}` },
                    { label: "Per Acre",          value: `${fmtNum(result.totalFertilizerNeeded / result.landAreaInAcres, 1)} kg` },
                    { label: "Crop Type",         value: CROP_LABELS[result.cropType], isText: true },
                    { label: "Fertilizer Type",  value: FERTILIZER_LABELS[result.fertilizerType], isText: true },
                    ...(result.totalCost !== null ? [
                      { label: "Estimated Cost", value: fmt(result.totalCost, result.currency, 2), highlight: true },
                    ] : []),
                  ].map(({ label, value, highlight, isText }) => (
                    <div key={label} className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold break-all ${highlight ? "text-primary text-lg" : isText ? "text-sm text-gray-900" : "text-base text-gray-900"}`}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nutrient Breakdown */}
            {result && result.calculations.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Nutrient Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-2 px-3 font-semibold text-gray-700">Nutrient</th>
                        <th className="text-right py-2 px-3 font-semibold text-gray-700">Required (kg)</th>
                        <th className="text-right py-2 px-3 font-semibold text-gray-700">Fertilizer Needed (kg)</th>
                        <th className="text-right py-2 px-3 font-semibold text-gray-700">Per Acre (kg)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {result.calculations.map((calc) => (
                        <tr key={calc.nutrient} className="hover:bg-gray-50">
                          <td className="py-2 px-3 font-medium capitalize">{calc.nutrient}</td>
                          <td className="py-2 px-3 text-right font-mono">{fmtNum(calc.required, 1)}</td>
                          <td className="py-2 px-3 text-right font-mono text-primary font-semibold">{fmtNum(calc.fertilizerNeeded, 1)}</td>
                          <td className="py-2 px-3 text-right font-mono">{fmtNum(calc.fertilizerNeeded / result.landAreaInAcres, 1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {result && result.recommendations.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Application Recommendations</h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                        {i + 1}
                      </span>
                      <span className="text-sm text-green-800">{rec}</span>
                    </div>
                  ))}
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
                    history.map((entry) => (
                      <div key={entry.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {CROP_LABELS[entry.inputs.cropType]} · {fmtNum(parseFloat(entry.inputs.landArea), 1)} {AREA_UNIT_SHORT[entry.inputs.areaUnit]}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {FERTILIZER_LABELS[entry.inputs.fertilizerType]} · {fmtNum(entry.result.totalFertilizerNeeded, 1)} kg
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

      <FertilizerRequirementCalculatorSEO />
      <RelatedTools
        currentTool="fertilizer-requirement-calculator"
        tools={[
          "land-area-calculator-square-feet",
          "acre-to-hectare-converter",
          "soil-volume-calculator",
          "irrigation-water-calculator",
        ]}
      />
    </>
  );
}
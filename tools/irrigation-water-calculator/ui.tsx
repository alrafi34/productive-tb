"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  CalculationResult, CalculatorInputs, AreaUnit, CropType,
  SoilType, ClimateType, IrrigationMethod, GrowthStage, HistoryEntry,
} from "./types";
import {
  calculate, fmtNum, fmtLiters, debounce,
  saveToHistory, getHistory, clearHistory,
  exportToText, downloadFile,
  AREA_UNIT_LABELS, AREA_UNIT_SHORT, ALL_AREA_UNITS,
  CROP_LABELS, ALL_CROPS,
  SOIL_LABELS, ALL_SOILS,
  CLIMATE_LABELS, ALL_CLIMATES,
  IRRIGATION_LABELS, ALL_IRRIGATION_METHODS,
  GROWTH_STAGE_LABELS, ALL_GROWTH_STAGES,
} from "./logic";
import IrrigationWaterCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: CalculatorInputs = {
  landArea: "",
  areaUnit: "acre",
  cropType: "rice",
  soilType: "loam",
  climate: "moderate",
  irrigationMethod: "drip",
  growthStage: "development",
  rainfall: "0",
};

const PRESETS: { label: string; inputs: Partial<CalculatorInputs> }[] = [
  { label: "Rice 2 acres · Hot", inputs: { landArea: "2", cropType: "rice", climate: "hot", soilType: "clay", irrigationMethod: "surface" } },
  { label: "Wheat 1 ha · Moderate", inputs: { landArea: "1", areaUnit: "hectare", cropType: "wheat", climate: "moderate", soilType: "sandy" } },
  { label: "Vegetables 5000 sqft · Drip", inputs: { landArea: "5000", areaUnit: "sqft", cropType: "vegetables", irrigationMethod: "drip" } },
  { label: "Sugarcane 3 acres · Very Hot", inputs: { landArea: "3", cropType: "sugarcane", climate: "very_hot", irrigationMethod: "sprinkler" } },
];

export default function IrrigationWaterCalculatorUI() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHistory(getHistory()); firstRef.current?.focus(); }, []);

  const run = useCallback(debounce(() => { setResult(calculate(inputs)); }, 150), [inputs]);
  useEffect(() => { run(); }, [inputs, run]);

  const set = (key: keyof CalculatorInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));
  const setNum = (key: keyof CalculatorInputs, val: string) =>
    setInputs((p) => ({ ...p, [key]: val.replace(/[^0-9.]/g, "") }));

  const handleReset = () => { setInputs(DEFAULT_INPUTS); setResult(null); firstRef.current?.focus(); };
  const handlePreset = (p: (typeof PRESETS)[0]) =>
    setInputs((prev) => ({ ...DEFAULT_INPUTS, ...prev, ...p.inputs }));

  const handleCopy = () => {
    if (!result) return;
    const text = `Irrigation Water Requirement\nLand: ${fmtNum(result.landArea, 2)} ${AREA_UNIT_SHORT[result.areaUnit]} | Crop: ${CROP_LABELS[result.cropType]}\nDaily: ${fmtNum(result.dailyWaterLiters, 0)} liters/day | Depth: ${fmtNum(result.dailyWaterDepthMm, 2)} mm/day\nMethod: ${IRRIGATION_LABELS[result.irrigationMethod]}`;
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
    downloadFile(exportToText(inputs, result), "irrigation_water_requirement.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const inputCls  = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            Estimate daily irrigation water requirements for crops based on land size, crop type, soil, climate, and irrigation method. All calculations run instantly in your browser.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ── Left Panel ── */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Irrigation Method</label>
                <select
                  value={inputs.irrigationMethod}
                  onChange={(e) => set("irrigationMethod", e.target.value as IrrigationMethod)}
                  className={selectCls}
                >
                  {ALL_IRRIGATION_METHODS.map((m) => (
                    <option key={m} value={m}>{IRRIGATION_LABELS[m]}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Affects water delivery efficiency</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Growth Stage</label>
                <select
                  value={inputs.growthStage}
                  onChange={(e) => set("growthStage", e.target.value as GrowthStage)}
                  className={selectCls}
                >
                  {ALL_GROWTH_STAGES.map((s) => (
                    <option key={s} value={s}>{GROWTH_STAGE_LABELS[s]}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Water needs vary by growth stage</p>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Water = ET × Kc × Soil ÷ Efficiency</div>
                <div className="font-mono text-gray-400">× Growth Stage Factor</div>
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
                Daily Water Requirement
              </p>
              <div className="text-3xl font-bold mb-1 leading-none">
                {result ? fmtLiters(result.dailyWaterLiters) : "—"}
              </div>
              {result && (
                <div className="text-primary-100 text-sm mb-3">per day</div>
              )}

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Water Depth:</span>
                    <span className="font-semibold">{fmtNum(result.dailyWaterDepthMm, 2)} mm/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Weekly:</span>
                    <span className="font-semibold">{fmtLiters(result.weeklyWaterLiters)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Monthly:</span>
                    <span className="font-semibold">{fmtLiters(result.monthlyWaterLiters)}</span>
                  </div>
                  {result.rainfallReductionLiters > 0 && (
                    <div className="flex justify-between pt-1 border-t border-white/20 mt-1">
                      <span className="text-primary-100">Rainfall saves:</span>
                      <span className="font-semibold text-green-300">{fmtLiters(result.rainfallReductionLiters)}/day</span>
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

            {/* Land & Crop */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Land & Crop Details</h3>

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
                    aria-label="Land area"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                  <select
                    value={inputs.areaUnit}
                    onChange={(e) => set("areaUnit", e.target.value as AreaUnit)}
                    className={selectCls}
                    aria-label="Area unit"
                  >
                    {ALL_AREA_UNITS.map((u) => (
                      <option key={u} value={u}>{AREA_UNIT_LABELS[u]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                  <select
                    value={inputs.cropType}
                    onChange={(e) => set("cropType", e.target.value as CropType)}
                    className={selectCls}
                    aria-label="Crop type"
                  >
                    {ALL_CROPS.map((c) => (
                      <option key={c} value={c}>{CROP_LABELS[c]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                  <select
                    value={inputs.soilType}
                    onChange={(e) => set("soilType", e.target.value as SoilType)}
                    className={selectCls}
                    aria-label="Soil type"
                  >
                    {ALL_SOILS.map((s) => (
                      <option key={s} value={s}>{SOIL_LABELS[s]}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Affects water retention in the ground</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Climate / Temperature</label>
                  <select
                    value={inputs.climate}
                    onChange={(e) => set("climate", e.target.value as ClimateType)}
                    className={selectCls}
                    aria-label="Climate"
                  >
                    {ALL_CLIMATES.map((c) => (
                      <option key={c} value={c}>{CLIMATE_LABELS[c]}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Affects evapotranspiration rate</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rainfall Amount (mm) <span className="text-gray-400 font-normal">Optional</span>
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={inputs.rainfall}
                    onChange={(e) => setNum("rainfall", e.target.value)}
                    className={inputCls}
                    placeholder="0"
                    min="0"
                    step="0.1"
                    aria-label="Rainfall amount in mm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Reduces required irrigation water</p>
                </div>
              </div>

              {/* Calculation preview */}
              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>{fmtNum(result.landArea, 2)} {AREA_UNIT_SHORT[result.areaUnit]}</strong>
                  {" · "}
                  <strong>{CROP_LABELS[result.cropType]}</strong>
                  {" · "}
                  <strong>{CLIMATE_LABELS[result.climate]}</strong>
                  {" → "}
                  <strong>{fmtNum(result.dailyWaterLiters, 0)} liters/day</strong>
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Quick Presets</h3>
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

            {/* Results Summary */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Water Requirement Summary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: "Daily (Liters)",   value: `${fmtNum(result.dailyWaterLiters, 0)} L`,    highlight: true },
                    { label: "Daily (Depth)",    value: `${fmtNum(result.dailyWaterDepthMm, 2)} mm` },
                    { label: "Weekly",           value: fmtLiters(result.weeklyWaterLiters) },
                    { label: "Monthly",          value: fmtLiters(result.monthlyWaterLiters) },
                    { label: "Land Area",        value: `${fmtNum(result.landArea, 2)} ${AREA_UNIT_SHORT[result.areaUnit]}` },
                    { label: "Area (sq m)",      value: `${fmtNum(result.landAreaInSqm, 0)} m²` },
                  ].map(({ label, value, highlight }) => (
                    <div
                      key={label}
                      className={`p-3 rounded-lg border ${highlight ? "bg-primary/5 border-primary/20" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold break-all ${highlight ? "text-primary text-lg" : "text-base text-gray-900"}`}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calculation Factors */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Calculation Factors</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-2 px-3 font-semibold text-gray-700">Factor</th>
                        <th className="text-right py-2 px-3 font-semibold text-gray-700">Value</th>
                        <th className="text-left py-2 px-3 font-semibold text-gray-700">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50">
                        <td className="py-2 px-3 font-medium">Reference ET</td>
                        <td className="py-2 px-3 text-right font-mono text-primary font-semibold">{result.etRate} mm/day</td>
                        <td className="py-2 px-3 text-gray-500 text-xs">{CLIMATE_LABELS[result.climate]} climate</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-2 px-3 font-medium">Crop Coefficient (Kc)</td>
                        <td className="py-2 px-3 text-right font-mono text-primary font-semibold">{result.cropCoefficient}</td>
                        <td className="py-2 px-3 text-gray-500 text-xs">{CROP_LABELS[result.cropType]}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-2 px-3 font-medium">Soil Factor</td>
                        <td className="py-2 px-3 text-right font-mono text-primary font-semibold">{result.soilFactor}</td>
                        <td className="py-2 px-3 text-gray-500 text-xs">{SOIL_LABELS[result.soilType]} soil</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-2 px-3 font-medium">Irrigation Efficiency</td>
                        <td className="py-2 px-3 text-right font-mono text-primary font-semibold">{(result.irrigationEfficiency * 100).toFixed(0)}%</td>
                        <td className="py-2 px-3 text-gray-500 text-xs">{IRRIGATION_LABELS[result.irrigationMethod]}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-2 px-3 font-medium">Growth Stage Factor</td>
                        <td className="py-2 px-3 text-right font-mono text-primary font-semibold">{result.growthStageFactor}</td>
                        <td className="py-2 px-3 text-gray-500 text-xs">{GROWTH_STAGE_LABELS[result.growthStage]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {result && result.recommendations.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Irrigation Recommendations</h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                        {i + 1}
                      </span>
                      <span className="text-sm text-green-800">{rec}</span>
                    </div>
                  ))}
                  {result.efficiencyTip && (
                    <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="flex-shrink-0 text-blue-500 text-lg">💡</span>
                      <span className="text-sm text-blue-800">{result.efficiencyTip}</span>
                    </div>
                  )}
                  {result.rainfallNote && (
                    <div className="flex items-start gap-3 p-3 bg-sky-50 border border-sky-200 rounded-lg">
                      <span className="flex-shrink-0 text-sky-500 text-lg">🌧️</span>
                      <span className="text-sm text-sky-800">{result.rainfallNote}</span>
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
                        onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {CROP_LABELS[entry.inputs.cropType]} · {fmtNum(parseFloat(entry.inputs.landArea), 1)} {AREA_UNIT_SHORT[entry.inputs.areaUnit]}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {fmtNum(entry.result.dailyWaterLiters, 0)} L/day · {IRRIGATION_LABELS[entry.inputs.irrigationMethod]}
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

      <IrrigationWaterCalculatorSEO />
      <RelatedTools
        currentTool="irrigation-water-calculator"
        tools={[
          "fertilizer-requirement-calculator",
          "land-area-calculator",
          "rainwater-harvesting-calculator",
          "water-tank-capacity-calculator",
        ]}
      />
    </>
  );
}

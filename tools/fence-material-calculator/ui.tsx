"use client";

import { useState, useEffect, useCallback } from "react";
import { FenceInputs, FenceResult, FenceType, HistoryEntry, Unit } from "./types";
import {
  calculate,
  formatNumber,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  FENCE_TYPE_LABELS,
  FENCE_DEFAULTS,
  FENCE_HEIGHTS,
  UNIT_SHORT,
} from "./logic";
import FenceMaterialCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const DEFAULT_INPUTS: FenceInputs = {
  fenceType: "wood",
  unit: "ft",
  propertyMode: "straight",
  fenceLength: "",
  propertyWidth: "",
  propertyLength: "",
  fenceHeight: "6",
  panelWidth: "8",
  includeGate: false,
  gateWidth: "4",
  wastePercent: 10,
};

const PRESETS: { label: string; inputs: Partial<FenceInputs> }[] = [
  { label: "Backyard 100ft",  inputs: { fenceLength: "100", fenceType: "wood",         panelWidth: "8",  fenceHeight: "6" } },
  { label: "Ranch 200ft",     inputs: { fenceLength: "200", fenceType: "chain-link",   panelWidth: "10", fenceHeight: "4" } },
  { label: "Privacy 150ft",   inputs: { fenceLength: "150", fenceType: "privacy",      panelWidth: "8",  fenceHeight: "8" } },
  { label: "Vinyl 120ft",     inputs: { fenceLength: "120", fenceType: "vinyl",        panelWidth: "8",  fenceHeight: "5" } },
];

export default function FenceMaterialCalculatorUI() {
  const [inputs, setInputs] = useState<FenceInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<FenceResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => { setHistory(getHistory()); }, []);

  const run = useCallback(
    debounce(() => { setResult(calculate(inputs)); }, 150),
    [inputs]
  );

  useEffect(() => { run(); }, [inputs, run]);

  // Auto-update panel width when fence type changes
  useEffect(() => {
    setInputs((p) => ({ ...p, panelWidth: String(FENCE_DEFAULTS[p.fenceType].panelWidth) }));
  }, [inputs.fenceType]);

  const handleReset = () => { setInputs(DEFAULT_INPUTS); setResult(null); };

  const handlePreset = (preset: typeof PRESETS[0]) => {
    setInputs((p) => ({ ...p, ...preset.inputs }));
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Fence Material Estimate\nTotal Length: ${formatNumber(result.totalLength, 1)} ${UNIT_SHORT[inputs.unit]}\nPanels: ${result.panelsWithWaste} (incl. ${inputs.wastePercent}% waste)\nPosts: ${result.posts}\nConcrete Bags: ${result.concreteBags}\nRails: ${result.rails}`;
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
    downloadFile(exportToText(inputs, result), "fence_material_estimate.txt");
  };

  const handleClearHistory = () => {
    if (confirm("Clear all calculation history?")) { clearHistory(); setHistory([]); }
  };

  const set = (key: keyof FenceInputs, value: unknown) =>
    setInputs((p) => ({ ...p, [key]: value }));

  const inputCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono";
  const selectCls = "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🪵</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Fence Material Calculator</h3>
              <p className="text-sm text-blue-800">
                Estimate fence panels, posts, concrete bags, and rails for your fencing project. Supports wood, vinyl, chain link, metal, and privacy fences.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* Left Panel */}
          <div className="lg:col-span-4 space-y-6">

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fence Type</label>
                <select value={inputs.fenceType} onChange={(e) => set("fenceType", e.target.value as FenceType)} className={selectCls}>
                  {(Object.keys(FENCE_TYPE_LABELS) as FenceType[]).map((t) => (
                    <option key={t} value={t}>{FENCE_TYPE_LABELS[t]}</option>
                  ))}
                </select>
              </div>

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
                <label className="block text-sm font-medium text-gray-700 mb-2">Fence Height ({UNIT_SHORT[inputs.unit]})</label>
                <select value={inputs.fenceHeight} onChange={(e) => set("fenceHeight", e.target.value)} className={selectCls}>
                  {FENCE_HEIGHTS.map((h) => <option key={h} value={h}>{h} {UNIT_SHORT[inputs.unit]}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Waste: {inputs.wastePercent}%</label>
                <input
                  type="range" min="0" max="20" step="1"
                  value={inputs.wastePercent}
                  onChange={(e) => set("wastePercent", parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1"><span>0%</span><span>20%</span></div>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 space-y-1">
                <div className="font-semibold text-gray-500 uppercase tracking-wider mb-1">Formula</div>
                <div className="font-mono">Panels = ⌈Length ÷ Panel Width⌉</div>
                <div className="font-mono">Posts = Panels + 1</div>
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
                Panels Needed
              </p>
              <div className="text-4xl font-bold mb-1">
                {result ? result.panelsWithWaste : "—"}
              </div>
              {result && <div className="text-primary-100 text-sm mb-1">panels (incl. {inputs.wastePercent}% waste)</div>}

              {result && (
                <div className="pt-4 border-t border-white/20 text-sm space-y-1 mb-4 mt-3">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Length:</span>
                    <span className="font-semibold">{formatNumber(result.totalLength, 1)} {UNIT_SHORT[inputs.unit]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Posts:</span>
                    <span className="font-semibold">{result.posts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Concrete Bags:</span>
                    <span className="font-semibold">{result.concreteBags}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Rails:</span>
                    <span className="font-semibold">{result.rails}</span>
                  </div>
                  {inputs.includeGate && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Gate Posts:</span>
                      <span className="font-semibold">+{result.gatePostsExtra}</span>
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

          {/* Right Panel */}
          <div className="lg:col-span-8 space-y-6">

            {/* Fence Dimensions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Fence Dimensions</h3>

              {/* Property Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["straight", "perimeter"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => set("propertyMode", mode)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${inputs.propertyMode === mode ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                      {mode === "straight" ? "Straight Fence" : "Full Perimeter"}
                    </button>
                  ))}
                </div>
              </div>

              {inputs.propertyMode === "straight" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fence Length ({UNIT_SHORT[inputs.unit]})</label>
                  <input
                    type="number" inputMode="decimal"
                    value={inputs.fenceLength}
                    onChange={(e) => set("fenceLength", e.target.value.replace(/[^0-9.]/g, ""))}
                    className={inputCls} placeholder="e.g. 100" min="0" step="any"
                  />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Width ({UNIT_SHORT[inputs.unit]})</label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.propertyWidth}
                      onChange={(e) => set("propertyWidth", e.target.value.replace(/[^0-9.]/g, ""))}
                      className={inputCls} placeholder="e.g. 50" min="0" step="any"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Length ({UNIT_SHORT[inputs.unit]})</label>
                    <input
                      type="number" inputMode="decimal"
                      value={inputs.propertyLength}
                      onChange={(e) => set("propertyLength", e.target.value.replace(/[^0-9.]/g, ""))}
                      className={inputCls} placeholder="e.g. 70" min="0" step="any"
                    />
                  </div>
                </div>
              )}

              {inputs.propertyMode === "perimeter" && result && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                  <strong>Perimeter:</strong> 2 × ({inputs.propertyWidth || "0"} + {inputs.propertyLength || "0"}) = <strong>{formatNumber(result.totalLength, 1)} {UNIT_SHORT[inputs.unit]}</strong>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Panel / Post Spacing ({UNIT_SHORT[inputs.unit]})</label>
                <input
                  type="number" inputMode="decimal"
                  value={inputs.panelWidth}
                  onChange={(e) => set("panelWidth", e.target.value.replace(/[^0-9.]/g, ""))}
                  className={inputCls} placeholder="e.g. 8" min="0" step="any"
                />
                <p className="text-xs text-gray-500 mt-1">Distance between fence posts</p>
              </div>

              {/* Gate Toggle */}
              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-700">Include Gate</div>
                  <div className="text-xs text-gray-500">Adds 2 extra gate posts</div>
                </div>
                <button
                  onClick={() => set("includeGate", !inputs.includeGate)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${inputs.includeGate ? "bg-primary" : "bg-gray-300"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${inputs.includeGate ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>

              {inputs.includeGate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gate Width ({UNIT_SHORT[inputs.unit]})</label>
                  <input
                    type="number" inputMode="decimal"
                    value={inputs.gateWidth}
                    onChange={(e) => set("gateWidth", e.target.value.replace(/[^0-9.]/g, ""))}
                    className={inputCls} placeholder="e.g. 4" min="0" step="any"
                  />
                </div>
              )}

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  <strong>Calculation:</strong> {formatNumber(result.totalLength, 1)} {UNIT_SHORT[inputs.unit]} ÷ {inputs.panelWidth} {UNIT_SHORT[inputs.unit]} = {result.panels} panels → <strong>{result.panelsWithWaste} with {inputs.wastePercent}% waste</strong>
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

            {/* Material Summary */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>Material Summary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Fence Panels",    value: result.panelsWithWaste, sub: `${result.panels} base + waste` },
                    { label: "Fence Posts",     value: result.posts,           sub: "including corners" },
                    { label: "Concrete Bags",   value: result.concreteBags,    sub: `${FENCE_DEFAULTS[inputs.fenceType].concretePerPost} bags/post` },
                    { label: "Rails",           value: result.rails,           sub: `${FENCE_DEFAULTS[inputs.fenceType].railsPerPanel} rails/panel` },
                    { label: "Total Length",    value: `${formatNumber(result.totalLength, 1)} ${UNIT_SHORT[inputs.unit]}`, sub: "fence run", isText: true },
                    { label: "Fence Height",    value: `${inputs.fenceHeight} ${UNIT_SHORT[inputs.unit]}`, sub: FENCE_TYPE_LABELS[inputs.fenceType], isText: true },
                  ].map(({ label, value, sub, isText }) => (
                    <div key={label} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
                      <div className={`font-bold text-gray-900 ${isText ? "text-base" : "text-2xl"}`}>{value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* History Panel */}
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
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => { setInputs(entry.inputs); setShowHistory(false); }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">
                            {FENCE_TYPE_LABELS[entry.inputs.fenceType]} — {formatNumber(entry.result.totalLength, 1)} {UNIT_SHORT[entry.inputs.unit]}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {entry.result.panelsWithWaste} panels · {entry.result.posts} posts · {entry.result.concreteBags} bags
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

      <FenceMaterialCalculatorSEO />
      <RelatedTools
        currentTool="fence-material-calculator"
        tools={[
          "boundary-length-calculator",
          "plot-division-calculator",
          "land-price-calculator",
          "wall-boundary-cost-calculator",
        ]}
      />
    </>
  );
}

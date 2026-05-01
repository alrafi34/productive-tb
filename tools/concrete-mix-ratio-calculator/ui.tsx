"use client";

import { useState, useEffect } from "react";
import { Unit, BagSize, MixRatio, ConcreteCalculation } from "./types";
import {
  calculateConcreteMix,
  parseMixRatio,
  formatMixRatio,
  getMixRatioPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber
} from "./logic";
import ConcreteMixRatioCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ConcreteMixRatioCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("m");
  const [volume, setVolume] = useState("");
  const [ratioInput, setRatioInput] = useState("1:2:4");
  const [mixRatio, setMixRatio] = useState<MixRatio>({ cement: 1, sand: 2, aggregate: 4 });
  const [bagSize, setBagSize] = useState<BagSize>(50);
  const [dryVolumeFactor, setDryVolumeFactor] = useState("1.54");
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Results
  const [calculation, setCalculation] = useState<ConcreteCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());
  const [ratioError, setRatioError] = useState("");

  // Parse and validate ratio input
  useEffect(() => {
    const parsed = parseMixRatio(ratioInput);
    if (parsed) {
      setMixRatio(parsed);
      setRatioError("");
    } else if (ratioInput.trim() !== "") {
      setRatioError("Invalid format. Use format like 1:2:4");
    }
  }, [ratioInput]);

  // Calculate concrete in real-time
  useEffect(() => {
    const vol = parseFloat(volume);
    const dryFactor = parseFloat(dryVolumeFactor);
    
    if (!isNaN(vol) && vol > 0 && mixRatio && !isNaN(dryFactor) && dryFactor > 0) {
      const result = calculateConcreteMix(vol, unit, mixRatio, bagSize, dryFactor);
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [volume, unit, mixRatio, bagSize, dryVolumeFactor]);

  const handleReset = () => {
    setVolume("");
    setRatioInput("1:2:4");
    setMixRatio({ cement: 1, sand: 2, aggregate: 4 });
    setBagSize(50);
    setDryVolumeFactor("1.54");
    setCalculation(null);
    setRatioError("");
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Cement: ${formatNumber(calculation.cementBags)} bags (${formatNumber(calculation.cementWeight)} kg)\nSand: ${formatNumber(calculation.sandVolume)} m³\nAggregate: ${formatNumber(calculation.aggregateVolume)} m³`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (calculation) {
      saveToHistory(calculation);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'concrete_mix_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'concrete_mix_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: ConcreteCalculation) => {
    setVolume(calc.volume.toString());
    setUnit(calc.unit);
    setRatioInput(formatMixRatio(calc.mixRatio));
    setBagSize(calc.bagSize);
    setDryVolumeFactor(calc.dryVolumeFactor.toString());
    setShowHistory(false);
  };

  const applyPreset = (preset: MixRatio) => {
    setRatioInput(formatMixRatio(preset));
  };

  const mixRatioPresets = getMixRatioPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏗️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Concrete Mix Ratio Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate exact proportions of cement, sand, and aggregate for concrete. Get instant results with accurate construction formulas.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Volume Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("m")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "m"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    m³
                  </button>
                  <button
                    onClick={() => setUnit("ft")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "ft"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ft³
                  </button>
                </div>
              </div>

              {/* Bag Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cement Bag Size</label>
                <select
                  value={bagSize}
                  onChange={(e) => setBagSize(parseInt(e.target.value) as BagSize)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={50}>50 kg</option>
                  <option value={40}>40 kg</option>
                </select>
              </div>

              {/* Advanced Settings Toggle */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                {showAdvanced ? '▼' : '▶'} Advanced Settings
              </button>

              {showAdvanced && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dry Volume Factor
                  </label>
                  <input
                    type="number"
                    value={dryVolumeFactor}
                    onChange={(e) => setDryVolumeFactor(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1.54"
                    min="1"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Standard value: 1.54 (accounts for voids)
                  </p>
                </div>
              )}

              <div className="pt-4 space-y-2">
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
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
              </div>
            </div>

            {/* Result Display */}
            {calculation && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Cement Required
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.cementBags)}
                  </div>
                  <div className="text-xl text-primary-100">
                    bags ({calculation.bagSize}kg)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cement Weight:</span>
                    <span className="font-semibold">{formatNumber(calculation.cementWeight)} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cement Volume:</span>
                    <span className="font-semibold">{formatNumber(calculation.cementVolume)} m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Sand:</span>
                    <span className="font-semibold">{formatNumber(calculation.sandVolume)} m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Aggregate:</span>
                    <span className="font-semibold">{formatNumber(calculation.aggregateVolume)} m³</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Result"}
                  </button>
                  <button
                    onClick={handleSaveCalculation}
                    className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                  >
                    💾 Save to History
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Concrete Volume & Mix Ratio
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Volume ({unit === 'm' ? 'cubic meters' : 'cubic feet'})
                  </label>
                  <input
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'm' ? '1' : '35.31'}
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter total concrete volume needed
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mix Ratio (Cement:Sand:Aggregate)
                  </label>
                  <input
                    type="text"
                    value={ratioInput}
                    onChange={(e) => setRatioInput(e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono ${
                      ratioError ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="1:2:4"
                  />
                  {ratioError ? (
                    <p className="text-xs text-red-600 mt-1">{ratioError}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      Example: 1:2:4 or 1:1.5:3
                    </p>
                  )}
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Dry Volume:</strong> {formatNumber(calculation.dryVolume)} m³ (Wet: {formatNumber(calculation.volumeM3)} m³ × {calculation.dryVolumeFactor})
                  </div>
                </div>
              )}
            </div>

            {/* Mix Ratio Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Standard Mix Ratio Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mixRatioPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset.ratio)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{preset.name}</span>
                      <span className="text-xs font-mono text-gray-600">{formatMixRatio(preset.ratio)}</span>
                    </div>
                    <div className="text-xs text-gray-600">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Material Breakdown
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Cement Bags</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.cementBags)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Cement (kg)</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.cementWeight)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Cement (m³)</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.cementVolume)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sand (m³)</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.sandVolume)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Aggregate (m³)</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.aggregateVolume)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Mix Ratio</div>
                    <div className="text-lg font-bold text-gray-900">{formatMixRatio(calculation.mixRatio)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Export Buttons */}
            {calculation && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExportText}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📄 Export as Text
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export as CSV
                </button>
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
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      No calculations saved yet
                    </div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry.calculation)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {formatNumber(entry.calculation.cementBags)} bags
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.volumeM3)} m³ • 
                          Ratio: {formatMixRatio(entry.calculation.mixRatio)} • 
                          {entry.calculation.bagSize}kg bags
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

      <ConcreteMixRatioCalculatorSEO />
      <RelatedTools
        currentTool="concrete-mix-ratio-calculator"
        tools={['cement-calculator', 'sand-calculator', 'brick-calculator']}
      />
    </>
  );
}

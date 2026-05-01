"use client";

import { useState, useEffect } from "react";
import { Unit, SlabCalculation } from "./types";
import {
  calculateSlabLoad,
  getSlabPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  getWarnings
} from "./logic";
import SlabLoadCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SlabLoadCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [density, setDensity] = useState("25");
  const [liveLoad, setLiveLoad] = useState("");
  const [additionalLoad, setAdditionalLoad] = useState("0");
  
  // Results
  const [calculation, setCalculation] = useState<SlabCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const t = parseFloat(thickness);
    const d = parseFloat(density);
    const ll = parseFloat(liveLoad);
    const al = parseFloat(additionalLoad) || 0;
    
    if (!isNaN(l) && !isNaN(w) && !isNaN(t) && !isNaN(d) && !isNaN(ll) &&
        l > 0 && w > 0 && t > 0 && d > 0) {
      const result = calculateSlabLoad(l, w, t, d, ll, al, unit);
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [length, width, thickness, density, liveLoad, additionalLoad, unit]);

  const handleReset = () => {
    setLength("");
    setWidth("");
    setThickness("");
    setDensity("25");
    setLiveLoad("");
    setAdditionalLoad("0");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setLength("5");
    setWidth("4");
    setThickness("0.15");
    setDensity("25");
    setLiveLoad("2");
    setAdditionalLoad("0");
  };

  const handleApplyPreset = (preset: any) => {
    setThickness(preset.thickness.toString());
    setLiveLoad(preset.liveLoad.toString());
    setAdditionalLoad(preset.additionalLoad.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Slab Load Calculation\nArea: ${formatNumber(calculation.area)} m²\nDead Load: ${formatNumber(calculation.deadLoad)} kN/m²\nTotal Load: ${formatNumber(calculation.totalLoad)} kN`;
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
      downloadFile(text, 'slab_load_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'slab_load_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: SlabCalculation) => {
    setLength(calc.length.toString());
    setWidth(calc.width.toString());
    setThickness(calc.thickness.toString());
    setDensity(calc.density.toString());
    setLiveLoad(calc.liveLoad.toString());
    setAdditionalLoad(calc.additionalLoad.toString());
    setUnit(calc.unit);
    setShowHistory(false);
  };

  const slabPresets = getSlabPresets();
  const warnings = calculation ? getWarnings(calculation) : [];

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Slab Load Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate slab dead load, live load, and total load capacity with instant results. Perfect for civil engineers and construction planning.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("metric")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "metric"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUnit("imperial")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "imperial"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Imperial
                  </button>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset
                </button>
                <button
                  onClick={handleUseDefaults}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚙️ Use Default Values
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
                    Total Slab Load
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalLoad)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kilonewtons (kN)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Area:</span>
                    <span className="font-semibold">{formatNumber(calculation.area)} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Dead Load:</span>
                    <span className="font-semibold">{formatNumber(calculation.deadLoad)} kN/m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Load/m²:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalLoadPerSqm)} kN/m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">In Pounds:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalLoadLb!)} lb</span>
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
            
            {/* Dimensions Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Slab Dimensions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length ({unit === 'metric' ? 'm' : 'ft'})
                  </label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="5"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width ({unit === 'metric' ? 'm' : 'ft'})
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="4"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thickness ({unit === 'metric' ? 'm' : 'ft'})
                  </label>
                  <input
                    type="number"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0.15"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typical: 0.1-0.3 m
                  </p>
                </div>
              </div>
            </div>

            {/* Load Parameters Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Load Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Concrete Density ({unit === 'metric' ? 'kN/m³' : 'pcf'})
                  </label>
                  <input
                    type="number"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="25"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Standard: 25 kN/m³
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live Load ({unit === 'metric' ? 'kN/m²' : 'psf'})
                  </label>
                  <input
                    type="number"
                    value={liveLoad}
                    onChange={(e) => setLiveLoad(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Residential: 2 kN/m²
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Load ({unit === 'metric' ? 'kN/m²' : 'psf'})
                  </label>
                  <input
                    type="number"
                    value={additionalLoad}
                    onChange={(e) => setAdditionalLoad(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional (finishes, etc.)
                  </p>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formulas:</strong> Dead Load = Thickness × Density | Total Load = (Dead + Live + Additional) × Area
                  </div>
                </div>
              )}
            </div>

            {/* Slab Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Slab Type Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {slabPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-900 mb-2 text-sm">⚠️ Warnings & Notes</h4>
                <ul className="space-y-1">
                  {warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-yellow-800">
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Area</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.area)} m²</div>
                    <div className="text-xs text-gray-600">{formatNumber(calculation.areaFt!)} sq ft</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dead Load</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.deadLoad)} kN/m²</div>
                    <div className="text-xs text-gray-600">{formatNumber(calculation.deadLoadPsf!)} psf</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Live Load</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.liveLoad)} kN/m²</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Load/m²</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.totalLoadPerSqm)} kN/m²</div>
                    <div className="text-xs text-gray-600">{formatNumber(calculation.totalLoadPerSqft!)} psf</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Load</div>
                    <div className="text-sm font-bold text-primary">{formatNumber(calculation.totalLoad)} kN</div>
                    <div className="text-xs text-gray-600">{formatNumber(calculation.totalLoadLb!)} lb</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Thickness</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.thickness)} {calculation.unit === 'metric' ? 'm' : 'ft'}</div>
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
                  📄 Export Text
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📊 Export CSV
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
                            {formatNumber(entry.calculation.area)} m² slab
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.length)} × {formatNumber(entry.calculation.width)} m • 
                          Total: {formatNumber(entry.calculation.totalLoad)} kN
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

      <SlabLoadCalculatorSEO />
      <RelatedTools
        currentTool="slab-load-calculator"
        tools={['concrete-volume-calculator', 'beam-load-calculator', 'column-load-calculator']}
      />
    </>
  );
}

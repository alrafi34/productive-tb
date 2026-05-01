"use client";

import { useState, useEffect } from "react";
import { BuildingType, Unit, LiveLoadCalculation } from "./types";
import {
  calculateLiveLoad,
  getBuildingTypeDisplayName,
  getBuildingTypeDescription,
  getLoadPresets,
  getLoadPerUnit,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber
} from "./logic";
import LiveLoadCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function LiveLoadCalculatorUI() {
  const [buildingType, setBuildingType] = useState<BuildingType>("residential");
  const [area, setArea] = useState("");
  const [unit, setUnit] = useState<Unit>("metric");
  
  // Results
  const [calculation, setCalculation] = useState<LiveLoadCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate in real-time
  useEffect(() => {
    const areaNum = parseFloat(area);
    
    if (!isNaN(areaNum) && areaNum > 0) {
      const result = calculateLiveLoad(buildingType, areaNum, unit);
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [buildingType, area, unit]);

  const handleReset = () => {
    setArea("");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setArea("100");
  };

  const handleBuildingTypeChange = (type: BuildingType) => {
    setBuildingType(type);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Total Live Load: ${formatNumber(calculation.totalLoad)} ${calculation.unit === 'metric' ? 'kN' : 'lbs'}`;
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
      downloadFile(text, 'live_load_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'live_load_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: LiveLoadCalculation) => {
    setBuildingType(calc.buildingType);
    setArea(calc.area.toString());
    setUnit(calc.unit);
    setShowHistory(false);
  };

  const loadPresets = getLoadPresets();
  const currentLoadPerUnit = getLoadPerUnit(buildingType, unit);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📦</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Live Load Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate live loads in buildings based on occupancy type and area. Get instant results with code references for structural design.
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
                    Total Live Load
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalLoad)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {calculation.unit === 'metric' ? 'kilonewtons (kN)' : 'pounds (lbs)'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Load per Unit:</span>
                    <span className="font-semibold">{formatNumber(calculation.loadPerUnit)} {calculation.unit === 'metric' ? 'kN/m²' : 'psf'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Area:</span>
                    <span className="font-semibold">{formatNumber(calculation.area)} {calculation.unit === 'metric' ? 'm²' : 'sq ft'}</span>
                  </div>
                  {calculation.unit === 'metric' && calculation.loadPerUnitImperial && (
                    <>
                      <div className="pt-2 border-t border-white/10">
                        <div className="text-xs text-primary-100 mb-1">Imperial Equivalent:</div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Load/Unit:</span>
                        <span className="font-semibold">{formatNumber(calculation.loadPerUnitImperial)} psf</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Total:</span>
                        <span className="font-semibold">{formatNumber(calculation.totalLoadImperial!)} lbs</span>
                      </div>
                    </>
                  )}
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
                Building Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building/Room Type
                  </label>
                  <select
                    value={buildingType}
                    onChange={(e) => handleBuildingTypeChange(e.target.value as BuildingType)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    {loadPresets.map((preset) => (
                      <option key={preset.type} value={preset.type}>
                        {preset.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {getBuildingTypeDescription(buildingType)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area ({unit === 'metric' ? 'm²' : 'sq ft'})
                  </label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="100"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Floor or room area
                  </p>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Total Live Load = Area × Load per Unit Area
                  </div>
                  <div className="text-sm text-green-700 mt-1">
                    {formatNumber(calculation.area)} × {formatNumber(calculation.loadPerUnit)} = {formatNumber(calculation.totalLoad)} {calculation.unit === 'metric' ? 'kN' : 'lbs'}
                  </div>
                </div>
              )}
            </div>

            {/* Current Load Info */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Current Load Standard
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Load per Unit</div>
                  <div className="text-2xl font-bold text-blue-900">
                    {formatNumber(currentLoadPerUnit)} {unit === 'metric' ? 'kN/m²' : 'psf'}
                  </div>
                  <div className="text-xs text-blue-700 mt-1">
                    {getBuildingTypeDisplayName(buildingType)}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Code Reference</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {loadPresets.find(p => p.type === buildingType)?.codeReference}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Standard building codes
                  </div>
                </div>
              </div>
            </div>

            {/* Load Presets Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Load Reference Table
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-700">Building Type</th>
                      <th className="text-right py-2 px-3 font-semibold text-gray-700">kN/m²</th>
                      <th className="text-right py-2 px-3 font-semibold text-gray-700">psf</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadPresets.map((preset) => (
                      <tr 
                        key={preset.type}
                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          preset.type === buildingType ? 'bg-primary/5' : ''
                        }`}
                        onClick={() => handleBuildingTypeChange(preset.type)}
                      >
                        <td className="py-2 px-3">
                          <div className="font-medium text-gray-900">{preset.name}</div>
                          <div className="text-xs text-gray-500">{preset.description}</div>
                        </td>
                        <td className="text-right py-2 px-3 font-mono text-gray-900">
                          {formatNumber(preset.loadMetric)}
                        </td>
                        <td className="text-right py-2 px-3 font-mono text-gray-900">
                          {formatNumber(preset.loadImperial)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Load</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.totalLoad)} {calculation.unit === 'metric' ? 'kN' : 'lbs'}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Area</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.area)} {calculation.unit === 'metric' ? 'm²' : 'sq ft'}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Load/Unit</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.loadPerUnit)} {calculation.unit === 'metric' ? 'kN/m²' : 'psf'}</div>
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
                            {getBuildingTypeDisplayName(entry.calculation.buildingType)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Area: {formatNumber(entry.calculation.area)} {entry.calculation.unit === 'metric' ? 'm²' : 'sq ft'} • 
                          Total: {formatNumber(entry.calculation.totalLoad)} {entry.calculation.unit === 'metric' ? 'kN' : 'lbs'}
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

      <LiveLoadCalculatorSEO />
      <RelatedTools
        currentTool="live-load-calculator"
        tools={['dead-load-calculator', 'structural-load-calculator', 'slab-load-calculator']}
      />
    </>
  );
}

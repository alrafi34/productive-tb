"use client";

import { useState, useEffect } from "react";
import { Unit, SoilType, WaterLevel, SafetyFactor, FoundationType, FoundationInputs, FoundationCalculation } from "./types";
import {
  calculateFoundationDepth,
  getSoilPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  getStatusColor,
  getStatusBgColor
} from "./logic";
import FoundationDepthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FoundationDepthCalculatorUI() {
  const [unit, setUnit] = useState<Unit>("m");
  const [soilType, setSoilType] = useState<SoilType>("sand");
  const [load, setLoad] = useState("");
  const [frostDepth, setFrostDepth] = useState("");
  const [waterLevel, setWaterLevel] = useState<WaterLevel>("low");
  const [safetyFactor, setSafetyFactor] = useState<SafetyFactor>(2.0);
  const [foundationType, setFoundationType] = useState<FoundationType>("shallow");
  const [customBearingCapacity, setCustomBearingCapacity] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Results
  const [calculation, setCalculation] = useState<FoundationCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate depth in real-time
  useEffect(() => {
    const loadNum = parseFloat(load);
    const frostNum = parseFloat(frostDepth);
    const customCapacity = customBearingCapacity ? parseFloat(customBearingCapacity) : undefined;
    
    if (!isNaN(loadNum) && !isNaN(frostNum) && loadNum > 0 && frostNum >= 0) {
      const result = calculateFoundationDepth(
        soilType,
        loadNum,
        frostNum,
        waterLevel,
        safetyFactor,
        foundationType,
        unit,
        customCapacity
      );
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [soilType, load, frostDepth, waterLevel, safetyFactor, foundationType, unit, customBearingCapacity]);

  const handleReset = () => {
    setLoad("");
    setFrostDepth("");
    setSoilType("sand");
    setWaterLevel("low");
    setSafetyFactor(2.0);
    setFoundationType("shallow");
    setCustomBearingCapacity("");
    setCalculation(null);
  };

  const handleUseDefaults = () => {
    setLoad("150");
    setFrostDepth(unit === 'm' ? "1.2" : "4");
    setSoilType("sand");
    setWaterLevel("low");
    setSafetyFactor(2.0);
    setFoundationType("shallow");
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Foundation Depth: ${formatNumber(calculation.requiredDepth)} m (${formatNumber(calculation.requiredDepthFt)} ft) - Status: ${calculation.status.toUpperCase()}`;
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
      downloadFile(text, 'foundation_depth_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (calculation) {
      const csv = exportToCSV(calculation);
      downloadFile(csv, 'foundation_depth_calculation.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: FoundationCalculation) => {
    setLoad(calc.load.toString());
    setFrostDepth(calc.frostDepth.toString());
    setSoilType(calc.soilType);
    setWaterLevel(calc.waterLevel);
    setSafetyFactor(calc.safetyFactor);
    setFoundationType(calc.foundationType);
    setUnit(calc.unit);
    setShowHistory(false);
  };

  const soilPresets = getSoilPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⬇️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Foundation Depth Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate required foundation depth based on soil conditions, load, frost depth, and safety factors. Get instant engineering estimates.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUnit("m")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "m"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Meters (m)
                  </button>
                  <button
                    onClick={() => setUnit("ft")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      unit === "ft"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Feet (ft)
                  </button>
                </div>
              </div>

              {/* Safety Factor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Safety Factor</label>
                <select
                  value={safetyFactor}
                  onChange={(e) => setSafetyFactor(parseFloat(e.target.value) as SafetyFactor)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={1.5}>Low (1.5)</option>
                  <option value={2.0}>Medium (2.0)</option>
                  <option value={2.5}>High (2.5)</option>
                </select>
              </div>

              {/* Foundation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foundation Type</label>
                <select
                  value={foundationType}
                  onChange={(e) => setFoundationType(e.target.value as FoundationType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="shallow">Shallow Foundation</option>
                  <option value="strip">Strip Footing</option>
                  <option value="raft">Raft Foundation</option>
                  <option value="pile">Pile Foundation</option>
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
                    Custom Bearing Capacity (kN/m²)
                  </label>
                  <input
                    type="number"
                    value={customBearingCapacity}
                    onChange={(e) => setCustomBearingCapacity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="Optional"
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to use default for soil type
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
                    Required Foundation Depth
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.requiredDepth)}
                  </div>
                  <div className="text-xl text-primary-100">
                    meters (m)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">In Feet:</span>
                    <span className="font-semibold">{formatNumber(calculation.requiredDepthFt)} ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Base Depth:</span>
                    <span className="font-semibold">{formatNumber(calculation.baseDepth)} m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Adjustment:</span>
                    <span className="font-semibold">{formatNumber(calculation.adjustment)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Status:</span>
                    <span className="font-semibold uppercase">{calculation.status}</span>
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
                Foundation Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil Type
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value as SoilType)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="clay">Clay (75 kN/m²)</option>
                    <option value="sand">Sand (150 kN/m²)</option>
                    <option value="silt">Silt (100 kN/m²)</option>
                    <option value="gravel">Gravel (300 kN/m²)</option>
                    <option value="rock">Rock (1000 kN/m²)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Load on Foundation (kN/m²)
                  </label>
                  <input
                    type="number"
                    value={load}
                    onChange={(e) => setLoad(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="150"
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typical: 100-200 kN/m²
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frost Depth ({unit})
                  </label>
                  <input
                    type="number"
                    value={frostDepth}
                    onChange={(e) => setFrostDepth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={unit === 'm' ? '1.2' : '4'}
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Local frost penetration depth
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Groundwater Level
                  </label>
                  <select
                    value={waterLevel}
                    onChange={(e) => setWaterLevel(e.target.value as WaterLevel)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="low">Low (No adjustment)</option>
                    <option value="medium">Medium (+10%)</option>
                    <option value="high">High (+15%)</option>
                  </select>
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Depth = max(Frost Depth, (Load / Bearing Capacity) × Safety Factor) × Adjustments
                  </div>
                </div>
              )}
            </div>

            {/* Soil Type Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Soil Type Reference
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {soilPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setSoilType(preset.type)}
                    className={`p-3 border rounded-lg transition-colors text-left ${
                      soilType === preset.type
                        ? 'bg-primary/10 border-primary'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.bearingCapacity} kN/m²
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Status and Notes */}
            {calculation && (
              <div className={`rounded-xl border p-6 ${getStatusBgColor(calculation.status)}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">
                    {calculation.status === 'safe' ? '✅' : calculation.status === 'risky' ? '⚠️' : '❌'}
                  </span>
                  <h3 className={`font-semibold text-lg ${getStatusColor(calculation.status)}`}>
                    Status: {calculation.status.charAt(0).toUpperCase() + calculation.status.slice(1)}
                  </h3>
                </div>
                
                {calculation.notes.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Engineering Notes:</p>
                    <ul className="space-y-1">
                      {calculation.notes.map((note, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Required Depth</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.requiredDepth)} m</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">In Feet</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.requiredDepthFt)} ft</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Soil Type</div>
                    <div className="text-sm font-bold text-gray-900">{calculation.soilType.charAt(0).toUpperCase() + calculation.soilType.slice(1)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Load</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.load)} kN/m²</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bearing Capacity</div>
                    <div className="text-sm font-bold text-gray-900">{formatNumber(calculation.bearingCapacity)} kN/m²</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Safety Factor</div>
                    <div className="text-sm font-bold text-gray-900">{calculation.safetyFactor}</div>
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
                            {formatNumber(entry.calculation.requiredDepth)} m
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.soilType.charAt(0).toUpperCase() + entry.calculation.soilType.slice(1)} • 
                          Load: {formatNumber(entry.calculation.load)} kN/m² • 
                          Status: {entry.calculation.status}
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

      <FoundationDepthCalculatorSEO />
      <RelatedTools
        currentTool="foundation-depth-calculator"
        tools={['footing-size-calculator', 'concrete-volume-calculator', 'slab-concrete-calculator']}
      />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Unit, CalculationType, ConcreteDimensions, PlasterDimensions, MixRatio, CementCalculation } from "./types";
import {
  calculateConcreteVolume,
  calculatePlasterVolume,
  calculateCementRequired,
  getMixRatioPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber
} from "./logic";
import CementCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CementCalculatorUI() {
  const [calculationType, setCalculationType] = useState<CalculationType>("concrete");
  const [unit, setUnit] = useState<Unit>("ft");
  
  // Concrete dimensions
  const [concreteDimensions, setConcreteDimensions] = useState<ConcreteDimensions>({
    length: "",
    width: "",
    thickness: ""
  });
  
  // Plaster dimensions
  const [plasterDimensions, setPlasterDimensions] = useState<PlasterDimensions>({
    area: "",
    thickness: ""
  });
  
  // Mix ratio
  const [mixRatio, setMixRatio] = useState<MixRatio>({ cement: 1, sand: 2, aggregate: 4 });
  
  // Results
  const [calculation, setCalculation] = useState<CementCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate cement in real-time
  useEffect(() => {
    let volumeCubicFeet = 0;
    
    if (calculationType === "concrete") {
      const length = parseFloat(concreteDimensions.length);
      const width = parseFloat(concreteDimensions.width);
      const thickness = parseFloat(concreteDimensions.thickness);
      
      if (!isNaN(length) && !isNaN(width) && !isNaN(thickness) && 
          length > 0 && width > 0 && thickness > 0) {
        volumeCubicFeet = calculateConcreteVolume(length, width, thickness, unit);
      }
    } else if (calculationType === "plaster" || calculationType === "mortar") {
      const area = parseFloat(plasterDimensions.area);
      const thickness = parseFloat(plasterDimensions.thickness);
      
      if (!isNaN(area) && !isNaN(thickness) && area > 0 && thickness > 0) {
        volumeCubicFeet = calculatePlasterVolume(area, thickness, unit);
      }
    }
    
    if (volumeCubicFeet > 0 && mixRatio.cement > 0 && mixRatio.sand > 0) {
      const result = calculateCementRequired(volumeCubicFeet, mixRatio, calculationType);
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [calculationType, concreteDimensions, plasterDimensions, mixRatio, unit]);

  const handleCalculationTypeChange = (type: CalculationType) => {
    setCalculationType(type);
    setCalculation(null);
    
    // Set appropriate default mix ratio
    if (type === "plaster") {
      setMixRatio({ cement: 1, sand: 3, aggregate: 0 });
    } else if (type === "mortar") {
      setMixRatio({ cement: 1, sand: 6, aggregate: 0 });
    } else {
      setMixRatio({ cement: 1, sand: 2, aggregate: 4 });
    }
  };

  const handleReset = () => {
    setConcreteDimensions({ length: "", width: "", thickness: "" });
    setPlasterDimensions({ area: "", thickness: "" });
    setMixRatio({ cement: 1, sand: 2, aggregate: 4 });
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Cement Required: ${calculation.cementBags} bags (50kg each)\nSand: ${formatNumber(calculation.sandVolume || 0)} m³`;
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

  const handleExport = () => {
    if (calculation) {
      const text = exportToText(calculation);
      downloadFile(text, 'cement_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: CementCalculation) => {
    setMixRatio(calc.mixRatio);
    setCalculationType(calc.type);
    setShowHistory(false);
  };

  const applyMixRatioPreset = (preset: MixRatio) => {
    setMixRatio(preset);
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
              <h3 className="font-semibold text-blue-900 mb-1">Cement Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate exact amount of cement needed for concrete, plaster, and mortar. Get instant results with accurate construction formulas.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Calculation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Type</label>
                <select
                  value={calculationType}
                  onChange={(e) => handleCalculationTypeChange(e.target.value as CalculationType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="concrete">Concrete (Slab/Column/Beam)</option>
                  <option value="plaster">Plaster</option>
                  <option value="mortar">Brick Mortar</option>
                </select>
              </div>

              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                <div className="grid grid-cols-2 gap-2">
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
                </div>
              </div>

              {/* Mix Ratio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mix Ratio</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Cement</label>
                    <input
                      type="number"
                      value={mixRatio.cement}
                      onChange={(e) => setMixRatio({ ...mixRatio, cement: parseFloat(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Sand</label>
                    <input
                      type="number"
                      value={mixRatio.sand}
                      onChange={(e) => setMixRatio({ ...mixRatio, sand: parseFloat(e.target.value) || 1 })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Aggregate</label>
                    <input
                      type="number"
                      value={mixRatio.aggregate}
                      onChange={(e) => setMixRatio({ ...mixRatio, aggregate: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                      min="0"
                      step="0.1"
                      disabled={calculationType === "plaster" || calculationType === "mortar"}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Current: {mixRatio.cement}:{mixRatio.sand}{mixRatio.aggregate > 0 ? `:${mixRatio.aggregate}` : ''}
                </p>
              </div>

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
                    {calculation.cementBags}
                  </div>
                  <div className="text-xl text-primary-100">
                    bags (50kg)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Cement Volume:</span>
                    <span className="font-semibold">{formatNumber(calculation.cementVolume)} m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Sand:</span>
                    <span className="font-semibold">{formatNumber(calculation.sandVolume || 0)} m³</span>
                  </div>
                  {calculation.aggregateVolume && calculation.aggregateVolume > 0 && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Aggregate:</span>
                      <span className="font-semibold">{formatNumber(calculation.aggregateVolume)} m³</span>
                    </div>
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
            
            {/* Dimensions Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {calculationType === "concrete" ? "Concrete Dimensions" : 
                 calculationType === "plaster" ? "Plaster Area" : "Mortar Area"}
              </h3>
              
              {calculationType === "concrete" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({unit})
                    </label>
                    <input
                      type="number"
                      value={concreteDimensions.length}
                      onChange={(e) => setConcreteDimensions({ ...concreteDimensions, length: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width ({unit})
                    </label>
                    <input
                      type="number"
                      value={concreteDimensions.width}
                      onChange={(e) => setConcreteDimensions({ ...concreteDimensions, width: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thickness ({unit})
                    </label>
                    <input
                      type="number"
                      value={concreteDimensions.thickness}
                      onChange={(e) => setConcreteDimensions({ ...concreteDimensions, thickness: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.5"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Typical: 4-6 inches (0.33-0.5 ft)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area ({unit}²)
                    </label>
                    <input
                      type="number"
                      value={plasterDimensions.area}
                      onChange={(e) => setPlasterDimensions({ ...plasterDimensions, area: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="100"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thickness (inches)
                    </label>
                    <input
                      type="number"
                      value={plasterDimensions.thickness}
                      onChange={(e) => setPlasterDimensions({ ...plasterDimensions, thickness: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.5"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Typical: 0.5-0.75 inches
                    </p>
                  </div>
                </div>
              )}

              {calculation && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Volume:</strong> {formatNumber(calculation.volumeM3)} m³ (wet) → {formatNumber(calculation.dryVolume)} m³ (dry)
                  </div>
                </div>
              )}
            </div>

            {/* Mix Ratio Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Mix Ratio Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mixRatioPresets
                  .filter(preset => {
                    if (calculationType === "plaster") return preset.ratio.aggregate === 0 && preset.name.includes("Plaster");
                    if (calculationType === "mortar") return preset.ratio.aggregate === 0 && preset.name.includes("Mortar");
                    return preset.ratio.aggregate > 0;
                  })
                  .map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyMixRatioPreset(preset.ratio)}
                      className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                    >
                      <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Wet Volume</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.volumeM3)} m³</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dry Volume</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.dryVolume)} m³</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Cement Bags</div>
                    <div className="text-lg font-bold text-primary">{calculation.cementBags} bags</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Mix Ratio</div>
                    <div className="text-lg font-bold text-gray-900">
                      {mixRatio.cement}:{mixRatio.sand}{mixRatio.aggregate > 0 ? `:${mixRatio.aggregate}` : ''}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Export Button */}
            {calculation && (
              <button
                onClick={handleExport}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Calculation
              </button>
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
                            {entry.calculation.cementBags} bags
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.type.charAt(0).toUpperCase() + entry.calculation.type.slice(1)} • 
                          Mix: {entry.calculation.mixRatio.cement}:{entry.calculation.mixRatio.sand}
                          {entry.calculation.mixRatio.aggregate > 0 ? `:${entry.calculation.mixRatio.aggregate}` : ''}
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

      <CementCalculatorSEO />
      <RelatedTools
        currentTool="cement-calculator"
        tools={['brick-calculator', 'tile-quantity-calculator', 'wall-area-calculator']}
      />
    </>
  );
}

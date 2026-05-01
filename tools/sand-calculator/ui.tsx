"use client";

import { useState, useEffect } from "react";
import { Unit, CalculationType, AreaDimensions, ConcreteMix, PlasterDimensions, SandCalculation } from "./types";
import {
  calculateSandForArea,
  calculateSandForConcrete,
  calculateSandForPlaster,
  getMixRatioPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber
} from "./logic";
import SandCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SandCalculatorUI() {
  const [calculationType, setCalculationType] = useState<CalculationType>("area");
  const [unit, setUnit] = useState<Unit>("ft");
  
  // Area dimensions
  const [areaDimensions, setAreaDimensions] = useState<AreaDimensions>({
    length: "",
    width: "",
    depth: ""
  });
  
  // Concrete mix
  const [concreteMix, setConcreteMix] = useState<ConcreteMix>({
    volume: "",
    cement: 1,
    sand: 2,
    aggregate: 4
  });
  
  // Plaster dimensions
  const [plasterDimensions, setPlasterDimensions] = useState<PlasterDimensions>({
    area: "",
    thickness: ""
  });
  
  // Results
  const [calculation, setCalculation] = useState<SandCalculation | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Calculate sand in real-time
  useEffect(() => {
    if (calculationType === "area") {
      const length = parseFloat(areaDimensions.length);
      const width = parseFloat(areaDimensions.width);
      const depth = parseFloat(areaDimensions.depth);
      
      if (!isNaN(length) && !isNaN(width) && !isNaN(depth) && 
          length > 0 && width > 0 && depth > 0) {
        const result = calculateSandForArea(length, width, depth, unit);
        setCalculation(result);
      } else {
        setCalculation(null);
      }
    } else if (calculationType === "concrete") {
      const volume = parseFloat(concreteMix.volume);
      
      if (!isNaN(volume) && volume > 0 && 
          concreteMix.cement > 0 && concreteMix.sand > 0 && concreteMix.aggregate > 0) {
        const result = calculateSandForConcrete(
          volume,
          concreteMix.cement,
          concreteMix.sand,
          concreteMix.aggregate,
          unit
        );
        setCalculation(result);
      } else {
        setCalculation(null);
      }
    } else if (calculationType === "plaster") {
      const area = parseFloat(plasterDimensions.area);
      const thickness = parseFloat(plasterDimensions.thickness);
      
      if (!isNaN(area) && !isNaN(thickness) && area > 0 && thickness > 0) {
        const result = calculateSandForPlaster(area, thickness, unit);
        setCalculation(result);
      } else {
        setCalculation(null);
      }
    }
  }, [calculationType, areaDimensions, concreteMix, plasterDimensions, unit]);

  const handleCalculationTypeChange = (type: CalculationType) => {
    setCalculationType(type);
    setCalculation(null);
  };

  const handleReset = () => {
    setAreaDimensions({ length: "", width: "", depth: "" });
    setConcreteMix({ volume: "", cement: 1, sand: 2, aggregate: 4 });
    setPlasterDimensions({ area: "", thickness: "" });
    setCalculation(null);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Sand Required: ${formatNumber(calculation.sandRequiredM3)} m³ (${formatNumber(calculation.sandRequired)} cubic feet)`;
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
      downloadFile(text, 'sand_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: SandCalculation) => {
    setCalculationType(calc.calculationType);
    setShowHistory(false);
  };

  const applyMixRatioPreset = (cement: number, sand: number, aggregate: number) => {
    setConcreteMix({ ...concreteMix, cement, sand, aggregate });
  };

  const mixRatioPresets = getMixRatioPresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏖️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Sand Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate exact amount of sand needed for construction, concrete mixing, plastering, and brickwork. Get instant results with accurate formulas.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
                <select
                  value={calculationType}
                  onChange={(e) => handleCalculationTypeChange(e.target.value as CalculationType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="area">Area (Length × Width × Depth)</option>
                  <option value="concrete">Concrete Mix (Ratio Based)</option>
                  <option value="plaster">Plaster Calculation</option>
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
                    Sand Required
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.sandRequiredM3)}
                  </div>
                  <div className="text-xl text-primary-100">
                    cubic meters (m³)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">In Cubic Feet:</span>
                    <span className="font-semibold">{formatNumber(calculation.sandRequired)} ft³</span>
                  </div>
                  {calculation.volumeDetails && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Wet Volume:</span>
                        <span className="font-semibold">{formatNumber(calculation.volumeDetails.wetVolume)} m³</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Dry Volume:</span>
                        <span className="font-semibold">{formatNumber(calculation.volumeDetails.dryVolume)} m³</span>
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
                {calculationType === "area" ? "Area Dimensions" : 
                 calculationType === "concrete" ? "Concrete Mix Details" : "Plaster Details"}
              </h3>
              
              {calculationType === "area" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length ({unit})
                    </label>
                    <input
                      type="number"
                      value={areaDimensions.length}
                      onChange={(e) => setAreaDimensions({ ...areaDimensions, length: e.target.value })}
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
                      value={areaDimensions.width}
                      onChange={(e) => setAreaDimensions({ ...areaDimensions, width: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Depth ({unit})
                    </label>
                    <input
                      type="number"
                      value={areaDimensions.depth}
                      onChange={(e) => setAreaDimensions({ ...areaDimensions, depth: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.5"
                      min="0"
                      step="0.1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Typical: 0.5-1 {unit}
                    </p>
                  </div>
                </div>
              )}

              {calculationType === "concrete" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Volume ({unit === 'ft' ? 'cubic feet' : 'cubic meters'})
                    </label>
                    <input
                      type="number"
                      value={concreteMix.volume}
                      onChange={(e) => setConcreteMix({ ...concreteMix, volume: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mix Ratio</label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Cement</label>
                        <input
                          type="number"
                          value={concreteMix.cement}
                          onChange={(e) => setConcreteMix({ ...concreteMix, cement: parseFloat(e.target.value) || 1 })}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                          min="0.1"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Sand</label>
                        <input
                          type="number"
                          value={concreteMix.sand}
                          onChange={(e) => setConcreteMix({ ...concreteMix, sand: parseFloat(e.target.value) || 1 })}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                          min="0.1"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Aggregate</label>
                        <input
                          type="number"
                          value={concreteMix.aggregate}
                          onChange={(e) => setConcreteMix({ ...concreteMix, aggregate: parseFloat(e.target.value) || 1 })}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-mono"
                          min="0.1"
                          step="0.1"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Current: {concreteMix.cement}:{concreteMix.sand}:{concreteMix.aggregate}
                    </p>
                  </div>
                </div>
              )}

              {calculationType === "plaster" && (
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
                    <strong>Formula:</strong> {
                      calculationType === "area" ? "Volume = Length × Width × Depth" :
                      calculationType === "concrete" ? "Sand = (Sand ratio / Total ratio) × Dry volume" :
                      "Volume = Area × Thickness × 0.5 (sand portion)"
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Mix Ratio Presets (for concrete mode) */}
            {calculationType === "concrete" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Mix Ratio Presets
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mixRatioPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyMixRatioPreset(preset.cement, preset.sand, preset.aggregate)}
                      className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                    >
                      <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Summary Panel */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sand (m³)</div>
                    <div className="text-lg font-bold text-primary">{formatNumber(calculation.sandRequiredM3)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sand (ft³)</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.sandRequired)}</div>
                  </div>
                  {calculation.volumeDetails && (
                    <>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Wet Volume</div>
                        <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.volumeDetails.wetVolume)} m³</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dry Volume</div>
                        <div className="text-lg font-bold text-gray-900">{formatNumber(calculation.volumeDetails.dryVolume)} m³</div>
                      </div>
                    </>
                  )}
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
                            {formatNumber(entry.calculation.sandRequiredM3)} m³
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.calculationType.charAt(0).toUpperCase() + entry.calculation.calculationType.slice(1)} Mode
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

      <SandCalculatorSEO />
      <RelatedTools
        currentTool="sand-calculator"
        tools={['cement-calculator', 'brick-calculator', 'concrete-calculator']}
      />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { DimensionUnit, InsulationQuality, WindowCount, SunExposure, EquipmentLoad, ClimateZone, HVACCalculation } from "./types";
import {
  performHVACCalculation,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getDimensionUnitLabel,
  getRoomPresets,
  getACRecommendation,
  validateInputs
} from "./logic";
import HVACLoadCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function HVACLoadCalculatorUI() {
  const [dimensionUnit, setDimensionUnit] = useState<DimensionUnit>("ft");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [insulation, setInsulation] = useState<InsulationQuality>("average");
  const [occupants, setOccupants] = useState("2");
  const [windows, setWindows] = useState<WindowCount>("few");
  const [sunExposure, setSunExposure] = useState<SunExposure>("medium");
  const [equipment, setEquipment] = useState<EquipmentLoad>("moderate");
  const [climate, setClimate] = useState<ClimateZone>("moderate");
  
  // Results
  const [calculation, setCalculation] = useState<HVACCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getRoomPresets();

  // Calculate in real-time
  useEffect(() => {
    setError(null);
    
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const occ = parseInt(occupants);
    
    const validationError = validateInputs(l, w, h, occ);
    if (validationError) {
      setCalculation(null);
      return;
    }
    
    const result = performHVACCalculation(
      l, w, h, dimensionUnit, insulation, occ, windows, sunExposure, equipment, climate
    );
    setCalculation(result);
  }, [length, width, height, dimensionUnit, insulation, occupants, windows, sunExposure, equipment, climate]);

  const handleReset = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setInsulation("average");
    setOccupants("2");
    setWindows("few");
    setSunExposure("medium");
    setEquipment("moderate");
    setClimate("moderate");
    setCalculation(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setDimensionUnit("ft");
    setLength(preset.length.toString());
    setWidth(preset.width.toString());
    setHeight(preset.height.toString());
    setOccupants(preset.occupants.toString());
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `HVAC Load: ${formatNumber(calculation.totalBTU, 0)} BTU/hr | ${formatNumber(calculation.recommendedTons, 2)} Tons`;
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
      downloadFile(text, 'hvac_load_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: HVACCalculation) => {
    setDimensionUnit(calc.dimensionUnit);
    setLength(calc.length.toString());
    setWidth(calc.width.toString());
    setHeight(calc.height.toString());
    setInsulation(calc.insulation);
    setOccupants(calc.occupants.toString());
    setWindows(calc.windows);
    setSunExposure(calc.sunExposure);
    setEquipment(calc.equipment);
    setClimate(calc.climate);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">❄️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">HVAC Load Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate heating and cooling load requirements for rooms and buildings. Estimate BTU, kW, and AC tonnage based on room size, insulation, occupancy, and climate.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Dimension Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dimension Unit</label>
                <select
                  value={dimensionUnit}
                  onChange={(e) => setDimensionUnit(e.target.value as DimensionUnit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="ft">Feet (ft)</option>
                  <option value="m">Meters (m)</option>
                </select>
              </div>

              {/* Climate Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Climate Zone</label>
                <select
                  value={climate}
                  onChange={(e) => setClimate(e.target.value as ClimateZone)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="cool">Cool</option>
                  <option value="moderate">Moderate</option>
                  <option value="hot">Hot</option>
                </select>
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
                    Cooling Load
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(calculation.totalBTU, 0)}
                  </div>
                  <div className="text-xl text-primary-100">
                    BTU/hr
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">kW:</span>
                    <span className="font-semibold">{formatNumber(calculation.totalKW, 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Tons:</span>
                    <span className="font-semibold">{formatNumber(calculation.recommendedTons, 2)}</span>
                  </div>
                  <div className="pt-2 border-t border-white/20">
                    <div className="text-xs text-primary-100 mb-1">Recommended:</div>
                    <div className="font-semibold text-sm">{getACRecommendation(calculation.recommendedTons)}</div>
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
            
            {/* Room Dimensions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Room Dimensions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length ({dimensionUnit})
                  </label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={dimensionUnit === "ft" ? "12" : "3.6"}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width ({dimensionUnit})
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={dimensionUnit === "ft" ? "10" : "3"}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height ({dimensionUnit})
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder={dimensionUnit === "ft" ? "10" : "3"}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {calculation && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Room Area:</strong> {formatNumber(calculation.area)} sq ft
                  </div>
                </div>
              )}
            </div>

            {/* Environmental Factors */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Environmental Factors
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Insulation Quality</label>
                  <select
                    value={insulation}
                    onChange={(e) => setInsulation(e.target.value as InsulationQuality)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="poor">Poor (+20%)</option>
                    <option value="average">Average (+10%)</option>
                    <option value="good">Good (0%)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Occupants</label>
                  <input
                    type="number"
                    value={occupants}
                    onChange={(e) => setOccupants(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Windows</label>
                  <select
                    value={windows}
                    onChange={(e) => setWindows(e.target.value as WindowCount)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="none">None</option>
                    <option value="few">Few (1-2)</option>
                    <option value="many">Many (3+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sun Exposure</label>
                  <select
                    value={sunExposure}
                    onChange={(e) => setSunExposure(e.target.value as SunExposure)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Load</label>
                  <select
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value as EquipmentLoad)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="none">None</option>
                    <option value="moderate">Moderate (TV, devices)</option>
                    <option value="high">High (Computers, servers)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Load Breakdown */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Load Breakdown
                  </h3>
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    {showBreakdown ? 'Hide' : 'Show'} Details
                  </button>
                </div>
                
                {showBreakdown && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">Base Load (Area)</span>
                      <span className="font-semibold text-gray-900">{formatNumber(calculation.baseLoad, 0)} BTU/hr</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">Occupant Load</span>
                      <span className="font-semibold text-gray-900">{formatNumber(calculation.occupantLoad, 0)} BTU/hr</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">Window Load</span>
                      <span className="font-semibold text-gray-900">{formatNumber(calculation.windowLoad, 0)} BTU/hr</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">Equipment Load</span>
                      <span className="font-semibold text-gray-900">{formatNumber(calculation.equipmentLoadValue, 0)} BTU/hr</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">Sun Exposure Load</span>
                      <span className="font-semibold text-gray-900">{formatNumber(calculation.sunExposureLoad, 0)} BTU/hr</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border-2 border-primary">
                      <span className="text-sm font-semibold text-primary">Total Load</span>
                      <span className="font-bold text-primary">{formatNumber(calculation.totalBTU, 0)} BTU/hr</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Room Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Room Presets
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {preset.length}×{preset.width}×{preset.height} ft | {preset.occupants} people
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Button */}
            {calculation && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Result
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
                            {formatNumber(entry.calculation.totalBTU, 0)} BTU/hr
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.area)} sq ft | {entry.calculation.occupants} people | {formatNumber(entry.calculation.recommendedTons, 2)} Tons
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

      <HVACLoadCalculatorSEO />
      <RelatedTools
        currentTool="hvac-load-calculator"
        tools={['ventilation-calculator', 'air-change-rate-calculator', 'cooling-load-calculator-architecture']}
      />
    </>
  );
}

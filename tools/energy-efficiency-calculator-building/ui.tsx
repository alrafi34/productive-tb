"use client";

import { useState, useEffect, useCallback } from "react";
import { Unit, BuildingType, ClimateZone, EnergyCalculation } from "./types";
import {
  calculateEnergyEfficiency,
  getBuildingPresets,
  validateInputs,
  formatNumber,
  getUnitLabel,
  getBuildingTypeLabel,
  getClimateZoneLabel,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  debounce
} from "./logic";
import EnergyEfficiencyCalculatorBuildingSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function EnergyEfficiencyCalculatorBuildingUI() {
  const [buildingArea, setBuildingArea] = useState(2000);
  const [annualEnergy, setAnnualEnergy] = useState(24000);
  const [occupancy, setOccupancy] = useState(4);
  const [buildingType, setBuildingType] = useState<BuildingType>("residential");
  const [climateZone, setClimateZone] = useState<ClimateZone>("moderate");
  const [unit, setUnit] = useState<Unit>("sqft");
  
  const [result, setResult] = useState<EnergyCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getBuildingPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const validationError = validateInputs(buildingArea, annualEnergy, occupancy);
      
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      
      try {
        const calculationResult = calculateEnergyEfficiency(
          buildingArea,
          annualEnergy,
          occupancy,
          buildingType,
          climateZone,
          unit
        );
        setResult(calculationResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [buildingArea, annualEnergy, occupancy, buildingType, climateZone, unit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [buildingArea, annualEnergy, occupancy, buildingType, climateZone, unit, debouncedCalculate]);

  const handleReset = () => {
    setBuildingArea(2000);
    setAnnualEnergy(24000);
    setOccupancy(4);
    setBuildingType("residential");
    setClimateZone("moderate");
    setUnit("sqft");
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setBuildingArea(preset.area);
    setAnnualEnergy(preset.energy);
    setOccupancy(preset.occupancy);
    setBuildingType(preset.type);
  };

  const handleCopy = () => {
    if (result) {
      const text = `EUI: ${formatNumber(result.eui, 2)} kWh/${getUnitLabel(result.unit)}/year\nRating: ${result.efficiencyRating}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      saveToHistory(result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const text = exportToText(result);
      downloadFile(text, 'energy_efficiency_report.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(result);
      downloadFile(csv, 'energy_efficiency_data.csv', 'text/csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: any) => {
    const calc = entry.calculation;
    setBuildingArea(calc.buildingArea);
    setAnnualEnergy(calc.annualEnergy);
    setOccupancy(calc.occupancy);
    setBuildingType(calc.buildingType);
    setClimateZone(calc.climateZone);
    setUnit(calc.unit);
    setShowHistory(false);
  };

  // Get rating color
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Excellent": return "text-green-700 bg-green-50 border-green-200";
      case "Good": return "text-blue-700 bg-blue-50 border-blue-200";
      case "Fair": return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "Poor": return "text-red-700 bg-red-50 border-red-200";
      default: return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  // Get efficiency percentage for visual meter
  const getEfficiencyPercentage = (eui: number) => {
    // Lower EUI is better, so invert the scale
    // Excellent: 0-8 → 100-80%
    // Good: 8-15 → 80-60%
    // Fair: 15-22.5 → 60-40%
    // Poor: 22.5+ → 40-0%
    if (eui < 8) return 100 - (eui / 8) * 20;
    if (eui < 15) return 80 - ((eui - 8) / 7) * 20;
    if (eui < 22.5) return 60 - ((eui - 15) / 7.5) * 20;
    return Math.max(0, 40 - ((eui - 22.5) / 22.5) * 40);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Energy Efficiency Calculator (Building)</h3>
              <p className="text-sm text-blue-800">
                Calculate Energy Use Intensity (EUI) and assess building energy efficiency. Get instant analysis, ratings, and recommendations for improving sustainability.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Area Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="sqft">Square Feet (sq ft)</option>
                  <option value="sqm">Square Meters (m²)</option>
                </select>
              </div>

              {/* Building Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Building Type</label>
                <select
                  value={buildingType}
                  onChange={(e) => setBuildingType(e.target.value as BuildingType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              {/* Climate Zone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Climate Zone</label>
                <select
                  value={climateZone}
                  onChange={(e) => setClimateZone(e.target.value as ClimateZone)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="cold">Cold</option>
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
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Energy Use Intensity
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(result.eui, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kWh/{getUnitLabel(result.unit)}/year
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-sm font-semibold mb-2">Efficiency Rating</div>
                  <div className="text-2xl font-bold">{result.efficiencyRating}</div>
                </div>

                {result.occupancy > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Per Person:</span>
                      <span className="font-semibold">{formatNumber(result.euiPerPerson, 0)} kWh/year</span>
                    </div>
                  </div>
                )}

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
                    Building Area ({getUnitLabel(unit)})
                  </label>
                  <input
                    type="number"
                    value={buildingArea || ''}
                    onChange={(e) => setBuildingArea(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2000"
                    min="0"
                    step="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Energy Use (kWh)
                  </label>
                  <input
                    type="number"
                    value={annualEnergy || ''}
                    onChange={(e) => setAnnualEnergy(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="24000"
                    min="0"
                    step="1000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Occupants (Optional)
                </label>
                <input
                  type="number"
                  value={occupancy || ''}
                  onChange={(e) => setOccupancy(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="4"
                  min="0"
                  step="1"
                />
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> EUI = Annual Energy ÷ Building Area = {formatNumber(result.annualEnergy, 0)} ÷ {formatNumber(result.buildingArea, 0)} = {formatNumber(result.eui, 2)}
                  </div>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Efficiency Meter */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Efficiency Meter
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Poor</span>
                    <span className="text-gray-600">Excellent</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-500"
                      style={{ width: `${getEfficiencyPercentage(result.eui)}%` }}
                    />
                  </div>
                  <div className={`p-4 border rounded-lg text-center ${getRatingColor(result.efficiencyRating)}`}>
                    <div className="text-2xl font-bold">{result.efficiencyRating}</div>
                    <div className="text-sm mt-1">Efficiency Rating</div>
                  </div>
                </div>
              </div>
            )}

            {/* Calculation Summary */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Area</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(result.buildingArea, 0)}</div>
                    <div className="text-xs text-gray-600">{getUnitLabel(result.unit)}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Energy</div>
                    <div className="text-lg font-bold text-gray-900">{formatNumber(result.annualEnergy, 0)}</div>
                    <div className="text-xs text-gray-600">kWh/year</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Occupants</div>
                    <div className="text-lg font-bold text-gray-900">{result.occupancy}</div>
                    <div className="text-xs text-gray-600">people</div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary">
                    <div className="text-xs text-primary uppercase tracking-wider mb-1 font-semibold">EUI</div>
                    <div className="text-2xl font-bold text-primary">{formatNumber(result.eui, 2)}</div>
                    <div className="text-xs text-primary font-medium">kWh/{getUnitLabel(result.unit)}/yr</div>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {result && result.suggestions.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Building Presets
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.area} sq ft</div>
                    <div className="text-xs text-primary font-semibold">{getBuildingTypeLabel(preset.type)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Buttons */}
            {result && !error && (
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
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            EUI: {formatNumber(entry.calculation.eui, 2)} • {entry.calculation.efficiencyRating}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.buildingArea, 0)} {getUnitLabel(entry.calculation.unit)} • 
                          {formatNumber(entry.calculation.annualEnergy, 0)} kWh • 
                          {getBuildingTypeLabel(entry.calculation.buildingType)}
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

      <EnergyEfficiencyCalculatorBuildingSEO />
      <RelatedTools
        currentTool="energy-efficiency-calculator-building"
        tools={['hvac-load-calculator', 'cooling-load-calculator-architecture', 'insulation-thickness-calculator']}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { MaterialType, SiteType, WasteManagement, ScoreInputs, GreenBuildingScore } from "./types";
import {
  calculateGreenBuildingScore,
  getRatingColor,
  getMaterialLabel,
  getSiteLabel,
  getWasteLabel,
  getPresetTemplates,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce
} from "./logic";
import GreenBuildingScoreCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function GreenBuildingScoreCalculatorUI() {
  const [energyEfficiency, setEnergyEfficiency] = useState(50);
  const [waterEfficiency, setWaterEfficiency] = useState(50);
  const [materialSustainability, setMaterialSustainability] = useState<MaterialType>("standard");
  const [indoorQuality, setIndoorQuality] = useState(50);
  const [siteSustainability, setSiteSustainability] = useState<SiteType>("suburban");
  const [renewableEnergy, setRenewableEnergy] = useState(50);
  const [wasteManagement, setWasteManagement] = useState<WasteManagement>("basic");

  const [calculation, setCalculation] = useState<GreenBuildingScore | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresetTemplates();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      const inputs: ScoreInputs = {
        energyEfficiency,
        waterEfficiency,
        materialSustainability,
        indoorQuality,
        siteSustainability,
        renewableEnergy,
        wasteManagement
      };
      
      const result = calculateGreenBuildingScore(inputs);
      setCalculation(result);
    }, 100),
    [energyEfficiency, waterEfficiency, materialSustainability, indoorQuality, siteSustainability, renewableEnergy, wasteManagement]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [energyEfficiency, waterEfficiency, materialSustainability, indoorQuality, siteSustainability, renewableEnergy, wasteManagement, debouncedCalculate]);

  const handleReset = () => {
    setEnergyEfficiency(50);
    setWaterEfficiency(50);
    setMaterialSustainability("standard");
    setIndoorQuality(50);
    setSiteSustainability("suburban");
    setRenewableEnergy(50);
    setWasteManagement("basic");
  };

  const handleApplyPreset = (preset: any) => {
    setEnergyEfficiency(preset.inputs.energyEfficiency);
    setWaterEfficiency(preset.inputs.waterEfficiency);
    setMaterialSustainability(preset.inputs.materialSustainability);
    setIndoorQuality(preset.inputs.indoorQuality);
    setSiteSustainability(preset.inputs.siteSustainability);
    setRenewableEnergy(preset.inputs.renewableEnergy);
    setWasteManagement(preset.inputs.wasteManagement);
  };

  const handleCopy = () => {
    if (calculation) {
      const text = `Green Building Score: ${calculation.totalScore}/100 - ${calculation.rating}`;
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
      downloadFile(text, 'green_building_score.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (calc: GreenBuildingScore) => {
    setEnergyEfficiency(calc.inputs.energyEfficiency);
    setWaterEfficiency(calc.inputs.waterEfficiency);
    setMaterialSustainability(calc.inputs.materialSustainability);
    setIndoorQuality(calc.inputs.indoorQuality);
    setSiteSustainability(calc.inputs.siteSustainability);
    setRenewableEnergy(calc.inputs.renewableEnergy);
    setWasteManagement(calc.inputs.wasteManagement);
    setShowHistory(false);
  };

  const ratingColor = calculation ? getRatingColor(calculation.rating) : "gray";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌱</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Green Building Score Calculator</h3>
              <p className="text-sm text-blue-800">
                Estimate your building's sustainability score based on energy efficiency, water usage, materials, and more. Get instant feedback and improvement suggestions.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Quick Actions</h3>
              
              <div className="space-y-2">
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
              <div className={`rounded-xl border shadow-lg p-6 text-white space-y-4 ${
                ratingColor === 'green' ? 'bg-green-600 border-green-700' :
                ratingColor === 'blue' ? 'bg-blue-600 border-blue-700' :
                ratingColor === 'yellow' ? 'bg-yellow-600 border-yellow-700' :
                ratingColor === 'orange' ? 'bg-orange-600 border-orange-700' :
                'bg-red-600 border-red-700'
              }`}>
                <div>
                  <p className="text-white/80 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Green Building Score
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {calculation.totalScore}
                  </div>
                  <div className="text-xl text-white/90">
                    {calculation.rating}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">Energy:</span>
                    <span className="font-semibold">{formatNumber(calculation.breakdown.energy)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Water:</span>
                    <span className="font-semibold">{formatNumber(calculation.breakdown.water)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Materials:</span>
                    <span className="font-semibold">{formatNumber(calculation.breakdown.materials)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Indoor Quality:</span>
                    <span className="font-semibold">{formatNumber(calculation.breakdown.indoor)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Site:</span>
                    <span className="font-semibold">{formatNumber(calculation.breakdown.site)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Renewable:</span>
                    <span className="font-semibold">{formatNumber(calculation.breakdown.renewable)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Waste:</span>
                    <span className="font-semibold">{formatNumber(calculation.breakdown.waste)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Score"}
                  </button>
                  <button
                    onClick={handleSaveCalculation}
                    className="w-full bg-white/20 border border-white/30 text-white font-medium py-2 rounded-lg hover:bg-white/30 transition-colors text-sm"
                  >
                    💾 Save to History
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Energy & Water */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Energy & Water Efficiency
              </h3>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Energy Efficiency</label>
                  <span className="text-sm font-mono font-semibold text-primary">{energyEfficiency}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={energyEfficiency}
                  onChange={(e) => setEnergyEfficiency(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  style={{
                    background: `linear-gradient(to right, #058554 0%, #058554 ${energyEfficiency}%, #e5e7eb ${energyEfficiency}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Very Poor</span>
                  <span>Net Zero</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Water Efficiency</label>
                  <span className="text-sm font-mono font-semibold text-primary">{waterEfficiency}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={waterEfficiency}
                  onChange={(e) => setWaterEfficiency(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  style={{
                    background: `linear-gradient(to right, #058554 0%, #058554 ${waterEfficiency}%, #e5e7eb ${waterEfficiency}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Optimized</span>
                </div>
              </div>
            </div>

            {/* Materials & Site */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Materials & Site
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Material Sustainability</label>
                  <select
                    value={materialSustainability}
                    onChange={(e) => setMaterialSustainability(e.target.value as MaterialType)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="standard">Standard Materials</option>
                    <option value="recycled">Recycled Materials</option>
                    <option value="eco-certified">Eco-certified Materials</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Sustainability</label>
                  <select
                    value={siteSustainability}
                    onChange={(e) => setSiteSustainability(e.target.value as SiteType)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="urban">Urban (Low Impact)</option>
                    <option value="suburban">Suburban</option>
                    <option value="rural">Rural (High Impact)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Indoor Quality & Renewable */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Indoor Quality & Renewable Energy
              </h3>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Indoor Environmental Quality</label>
                  <span className="text-sm font-mono font-semibold text-primary">{indoorQuality}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={indoorQuality}
                  onChange={(e) => setIndoorQuality(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  style={{
                    background: `linear-gradient(to right, #058554 0%, #058554 ${indoorQuality}%, #e5e7eb ${indoorQuality}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Renewable Energy Usage</label>
                  <span className="text-sm font-mono font-semibold text-primary">{renewableEnergy}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={renewableEnergy}
                  onChange={(e) => setRenewableEnergy(parseInt(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  style={{
                    background: `linear-gradient(to right, #058554 0%, #058554 ${renewableEnergy}%, #e5e7eb ${renewableEnergy}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>None</span>
                  <span>100% Renewable</span>
                </div>
              </div>
            </div>

            {/* Waste Management */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Waste Management
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Waste Management Plan</label>
                <select
                  value={wasteManagement}
                  onChange={(e) => setWasteManagement(e.target.value as WasteManagement)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="none">No Plan</option>
                  <option value="basic">Basic Recycling</option>
                  <option value="advanced">Advanced Waste Management</option>
                </select>
              </div>
            </div>

            {/* Score Breakdown Chart */}
            {calculation && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Score Breakdown
                </h3>
                
                <div className="space-y-3">
                  {[
                    { label: "Energy Efficiency", value: calculation.breakdown.energy, max: 25 },
                    { label: "Water Efficiency", value: calculation.breakdown.water, max: 15 },
                    { label: "Materials", value: calculation.breakdown.materials, max: 15 },
                    { label: "Indoor Quality", value: calculation.breakdown.indoor, max: 15 },
                    { label: "Site Impact", value: calculation.breakdown.site, max: 10 },
                    { label: "Renewable Energy", value: calculation.breakdown.renewable, max: 10 },
                    { label: "Waste Management", value: calculation.breakdown.waste, max: 10 }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                        <span className="text-sm font-mono font-semibold text-primary">
                          {formatNumber(item.value)} / {item.max}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${(item.value / item.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {calculation && calculation.suggestions.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Improvement Suggestions
                </h3>
                <ul className="space-y-2">
                  {calculation.suggestions.map((suggestion, index) => (
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
                Quick Presets
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
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.category}
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
                📄 Export Report
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
                            Score: {entry.calculation.totalScore}/100
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.calculation.rating}
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

      <GreenBuildingScoreCalculatorSEO />
      <RelatedTools
        currentTool="green-building-score-calculator"
        tools={['energy-efficiency-calculator-building', 'carbon-footprint-calculator-construction', 'sustainability-index-calculator']}
      />
    </>
  );
}

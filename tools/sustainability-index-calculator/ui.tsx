"use client";

import { useState, useEffect, useCallback } from "react";
import { SustainabilityInputs, SustainabilityResult, Preset } from "./types";
import {
  calculateSustainabilityIndex,
  getPresets,
  validateInputs,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToJSON,
  downloadFile,
  formatNumber,
  getScoreColor,
  debounce
} from "./logic";
import SustainabilityIndexCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SustainabilityIndexCalculatorUI() {
  const [inputs, setInputs] = useState<SustainabilityInputs>({
    energy: 50,
    water: 50,
    materials: 50,
    waste: 50,
    indoor: 50
  });
  
  const [result, setResult] = useState<SustainabilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const validationError = validateInputs(inputs);
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      
      try {
        const calculatedResult = calculateSustainabilityIndex(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [inputs]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  const handleInputChange = (key: keyof SustainabilityInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setInputs({
      energy: 50,
      water: 50,
      materials: 50,
      waste: 50,
      indoor: 50
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: Preset) => {
    setInputs(preset.values);
  };

  const handleCopy = () => {
    if (result) {
      const text = `Sustainability Index: ${result.score} (${result.rating})`;
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
      downloadFile(text, 'sustainability_index_report.txt');
    }
  };

  const handleExportJSON = () => {
    if (result) {
      const json = exportToJSON(result);
      downloadFile(json, 'sustainability_index_report.json', 'application/json');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (savedResult: SustainabilityResult) => {
    setInputs(savedResult.inputs);
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌱</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Sustainability Index Calculator</h3>
              <p className="text-sm text-blue-800">
                Evaluate building environmental performance based on energy efficiency, water usage, materials, waste management, and indoor quality.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Result Display */}
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Sustainability Score
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {result.score}
                  </div>
                  <div className="text-xl text-primary-100">
                    out of 100
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className={`inline-block px-4 py-2 rounded-lg font-semibold ${
                    result.rating === 'High Sustainability' ? 'bg-green-500' :
                    result.rating === 'Moderate Sustainability' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}>
                    {result.rating}
                  </div>
                </div>

                <div className="space-y-2 mt-4">
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

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actions</h3>
              
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
                {result && (
                  <>
                    <button
                      onClick={handleExportText}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📄 Export Report
                    </button>
                    <button
                      onClick={handleExportJSON}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📊 Export JSON
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Sliders */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Sustainability Metrics
              </h3>
              
              {/* Energy Efficiency */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Energy Efficiency
                  </label>
                  <input
                    type="number"
                    value={inputs.energy}
                    onChange={(e) => handleInputChange('energy', parseFloat(e.target.value) || 0)}
                    className="w-20 px-3 py-1 border-2 border-gray-200 rounded-lg text-center font-mono text-sm"
                    min="0"
                    max="100"
                  />
                </div>
                <input
                  type="range"
                  value={inputs.energy}
                  onChange={(e) => handleInputChange('energy', parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  min="0"
                  max="100"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Insulation, HVAC performance, energy consumption
                </p>
              </div>

              {/* Water Efficiency */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Water Efficiency
                  </label>
                  <input
                    type="number"
                    value={inputs.water}
                    onChange={(e) => handleInputChange('water', parseFloat(e.target.value) || 0)}
                    className="w-20 px-3 py-1 border-2 border-gray-200 rounded-lg text-center font-mono text-sm"
                    min="0"
                    max="100"
                  />
                </div>
                <input
                  type="range"
                  value={inputs.water}
                  onChange={(e) => handleInputChange('water', parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  min="0"
                  max="100"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Low-flow fixtures, water recycling, rainwater harvesting
                </p>
              </div>

              {/* Material Sustainability */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Material Sustainability
                  </label>
                  <input
                    type="number"
                    value={inputs.materials}
                    onChange={(e) => handleInputChange('materials', parseFloat(e.target.value) || 0)}
                    className="w-20 px-3 py-1 border-2 border-gray-200 rounded-lg text-center font-mono text-sm"
                    min="0"
                    max="100"
                  />
                </div>
                <input
                  type="range"
                  value={inputs.materials}
                  onChange={(e) => handleInputChange('materials', parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  min="0"
                  max="100"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recycled content, local sourcing, low embodied energy
                </p>
              </div>

              {/* Waste Management */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Waste Management
                  </label>
                  <input
                    type="number"
                    value={inputs.waste}
                    onChange={(e) => handleInputChange('waste', parseFloat(e.target.value) || 0)}
                    className="w-20 px-3 py-1 border-2 border-gray-200 rounded-lg text-center font-mono text-sm"
                    min="0"
                    max="100"
                  />
                </div>
                <input
                  type="range"
                  value={inputs.waste}
                  onChange={(e) => handleInputChange('waste', parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  min="0"
                  max="100"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recycling programs, composting, waste reduction
                </p>
              </div>

              {/* Indoor Environmental Quality */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Indoor Environmental Quality
                  </label>
                  <input
                    type="number"
                    value={inputs.indoor}
                    onChange={(e) => handleInputChange('indoor', parseFloat(e.target.value) || 0)}
                    className="w-20 px-3 py-1 border-2 border-gray-200 rounded-lg text-center font-mono text-sm"
                    min="0"
                    max="100"
                  />
                </div>
                <input
                  type="range"
                  value={inputs.indoor}
                  onChange={(e) => handleInputChange('indoor', parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  min="0"
                  max="100"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Air quality, natural lighting, ventilation, thermal comfort
                </p>
              </div>
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

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Preset Scenarios
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

            {/* Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Score Breakdown
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Energy (30%)</span>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(result.breakdown.energyContribution)} pts
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Water (20%)</span>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(result.breakdown.waterContribution)} pts
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Materials (20%)</span>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(result.breakdown.materialsContribution)} pts
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Waste (15%)</span>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(result.breakdown.wasteContribution)} pts
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Indoor Quality (15%)</span>
                    <span className="font-semibold text-gray-900">
                      {formatNumber(result.breakdown.indoorContribution)} pts
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Strong & Weak Areas */}
            {result && !error && (result.strongAreas.length > 0 || result.weakAreas.length > 0) && (
              <div className="grid md:grid-cols-2 gap-6">
                {result.strongAreas.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                      Strong Areas
                    </h3>
                    <ul className="space-y-2">
                      {result.strongAreas.map((area, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.weakAreas.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {result.weakAreas.map((area, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-orange-500 mt-0.5">•</span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Recommendations */}
            {result && result.recommendations.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Recommendations
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
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
                        onClick={() => loadFromHistory(entry.result)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            Score: {entry.result.score}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.result.rating}
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

      <SustainabilityIndexCalculatorSEO />
      <RelatedTools
        currentTool="sustainability-index-calculator"
        tools={['green-building-score-calculator', 'energy-efficiency-calculator-building', 'carbon-footprint-calculator-construction']}
      />
    </>
  );
}

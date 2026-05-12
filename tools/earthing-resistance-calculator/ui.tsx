"use client";

import { useState, useEffect, useCallback } from "react";
import { EarthingInputs, EarthingResult } from "./types";
import {
  calculateEarthingResistance,
  validateInputs,
  getPresets,
  getSoilTypes,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  saveSettings,
  loadSettings
} from "./logic";
import EarthingResistanceCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function EarthingResistanceCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<EarthingInputs>({
    soilResistivity: savedSettings.soilResistivity || 100,
    rodLength: savedSettings.rodLength || 2.5,
    rodDiameter: savedSettings.rodDiameter || 0.016,
    numberOfRods: savedSettings.numberOfRods || 1,
    spacing: savedSettings.spacing || 5,
    electrodeType: 'single_rod'
  });
  
  const [result, setResult] = useState<EarthingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSoilTypes, setShowSoilTypes] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresets();
  const soilTypes = getSoilTypes();

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
        const calculatedResult = calculateEarthingResistance(inputs);
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

  // Save settings when inputs change
  useEffect(() => {
    saveSettings(inputs);
  }, [inputs]);

  const handleInputChange = (field: keyof EarthingInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      soilResistivity: 100,
      rodLength: 2.5,
      rodDiameter: 0.016,
      numberOfRods: 1,
      spacing: 5,
      electrodeType: 'single_rod'
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs({
      soilResistivity: preset.soilResistivity,
      rodLength: preset.rodLength,
      rodDiameter: preset.rodDiameter,
      numberOfRods: preset.numberOfRods,
      spacing: preset.spacing,
      electrodeType: preset.numberOfRods > 1 ? 'multiple_rods' : 'single_rod'
    });
  };

  const handleApplySoilType = (resistivity: number) => {
    setInputs(prev => ({ ...prev, soilResistivity: resistivity }));
    setShowSoilTypes(false);
  };

  const handleCopy = () => {
    if (result) {
      const text = `Earthing Resistance: ${formatNumber(result.resistance, 2)}Ω`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      saveToHistory(inputs, result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const text = exportToText(inputs, result);
      downloadFile(text, 'earthing_resistance_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: typeof history[0]) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-green-600';
      case 'acceptable': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-50 border-green-200';
      case 'good': return 'bg-green-50 border-green-200';
      case 'acceptable': return 'bg-yellow-50 border-yellow-200';
      case 'poor': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔌</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Earthing Resistance Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate grounding resistance based on soil resistivity, electrode configuration, and installation parameters. Ensure electrical safety compliance.
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
                    Earthing Resistance
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.resistance, 2)}Ω
                  </div>
                  <div className="text-xl text-primary-100">
                    {result.statusMessage}
                  </div>
                </div>

                {(result.singleRodResistance || result.efficiencyFactor) && (
                  <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                    {result.singleRodResistance && (
                      <div className="flex justify-between">
                        <span className="text-primary-100">Single Rod:</span>
                        <span className="font-semibold">{formatNumber(result.singleRodResistance, 2)} Ω</span>
                      </div>
                    )}
                    {result.efficiencyFactor && (
                      <div className="flex justify-between">
                        <span className="text-primary-100">Efficiency:</span>
                        <span className="font-semibold">{formatNumber(result.efficiencyFactor * 100, 1)}%</span>
                      </div>
                    )}
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

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actions</h3>
              
              <div className="space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ↺ Reset
                </button>
                <button
                  onClick={() => setShowSoilTypes(!showSoilTypes)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🌍 {showSoilTypes ? 'Hide' : 'Show'} Soil Types
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
                {result && (
                  <button
                    onClick={handleExportText}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    📄 Export Report
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Earthing Parameters
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil Resistivity (ρ)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.soilResistivity}
                      onChange={(e) => handleInputChange('soilResistivity', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="100"
                      min="0"
                      step="10"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center text-sm">
                      Ω·m
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rod Length (L)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.rodLength}
                      onChange={(e) => handleInputChange('rodLength', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2.5"
                      min="0"
                      step="0.1"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      m
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rod Diameter (d)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.rodDiameter}
                      onChange={(e) => handleInputChange('rodDiameter', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.016"
                      min="0"
                      step="0.001"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      m
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Common: 16mm (0.016m), 20mm (0.02m)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Rods
                  </label>
                  <input
                    type="number"
                    value={inputs.numberOfRods}
                    onChange={(e) => handleInputChange('numberOfRods', parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1"
                    min="1"
                    step="1"
                  />
                </div>

                {inputs.numberOfRods > 1 && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Spacing Between Rods
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.spacing}
                        onChange={(e) => handleInputChange('spacing', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="5"
                        min="0"
                        step="0.5"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        m
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: 2× rod length for optimal efficiency
                    </p>
                  </div>
                )}
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {result.formula}
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

            {/* Status Display */}
            {result && !error && (
              <div className={`border rounded-xl p-4 ${getStatusBgColor(result.status)}`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    {result.status === 'excellent' || result.status === 'good' ? '✓' : '⚠️'}
                  </span>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${getStatusColor(result.status)}`}>
                      {result.statusMessage}
                    </h3>
                    {result.recommendation && (
                      <p className="text-sm text-gray-700">{result.recommendation}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Soil Types Panel */}
            {showSoilTypes && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Common Soil Types
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {soilTypes.map((soil, index) => (
                    <button
                      key={index}
                      onClick={() => handleApplySoilType(soil.resistivity)}
                      className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                    >
                      <div className="font-semibold text-gray-900 text-sm">{soil.name}</div>
                      <div className="text-xs text-primary font-semibold mt-1">
                        {soil.resistivity} Ω·m
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Configurations
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
                  </button>
                ))}
              </div>
            </div>

            {/* Calculation Steps */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Steps
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1">
                  {result.steps.map((step, index) => (
                    <div key={index} className={step === '' ? 'h-2' : 'text-gray-700'}>
                      {step}
                    </div>
                  ))}
                </div>
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
                            R: {formatNumber(entry.result.resistance, 2)}Ω
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.soilResistivity}Ω·m • {entry.inputs.rodLength}m × {entry.inputs.numberOfRods} rod(s)
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

      <EarthingResistanceCalculatorSEO />
      <RelatedTools
        currentTool="earthing-resistance-calculator"
        tools={['voltage-drop-calculator', 'fuse-rating-calculator', 'impedance-calculator']}
      />
    </>
  );
}

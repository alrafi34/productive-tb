"use client";

import { useState, useEffect, useCallback } from "react";
import { LightningProtectionInputs, LightningProtectionResult, RiskLevel, StructureType } from "./types";
import {
  calculateLightningProtection,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getRiskLevelLabel,
  getStructureTypeLabel,
  debounce,
  HistoryEntry
} from "./logic";
import LightningProtectionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function LightningProtectionCalculatorUI() {
  const [inputs, setInputs] = useState<LightningProtectionInputs>({
    height: 10,
    area: 150,
    riskLevel: 'medium',
    structureType: 'residential',
    precision: 2
  });
  
  const [result, setResult] = useState<LightningProtectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());

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
        const calculatedResult = calculateLightningProtection(inputs);
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

  const handleInputChange = (field: keyof LightningProtectionInputs, value: number | RiskLevel | StructureType | undefined) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      height: 10,
      area: 150,
      riskLevel: 'medium',
      structureType: 'residential',
      precision: 2
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setInputs({
      height: preset.height,
      area: preset.area,
      riskLevel: preset.riskLevel,
      structureType: preset.structureType,
      precision: inputs.precision,
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = `Risk Score: ${formatNumber(result.riskScore, inputs.precision || 2)}, Protection Level: ${result.protectionLevelText}, System: ${result.systemType}`;
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
      downloadFile(text, 'lightning_protection_assessment.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const getRiskColor = (score: number) => {
    if (score < 0.3) return 'text-green-600';
    if (score < 0.5) return 'text-yellow-600';
    if (score < 0.7) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRiskBgColor = (score: number) => {
    if (score < 0.3) return 'bg-green-50 border-green-200';
    if (score < 0.5) return 'bg-yellow-50 border-yellow-200';
    if (score < 0.7) return 'bg-orange-50 border-orange-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Lightning Protection Calculator</h3>
              <p className="text-sm text-blue-800">
                Estimate lightning protection requirements for buildings based on height, area, and risk level. Get instant safety recommendations for electrical protection systems.
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
                    Risk Score
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.riskScore, inputs.precision || 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {result.protectionLevelText}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Height Factor:</span>
                    <span className="font-semibold">{formatNumber(result.heightFactor, inputs.precision || 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Area Factor:</span>
                    <span className="font-semibold">{formatNumber(result.areaFactor, inputs.precision || 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Risk Factor:</span>
                    <span className="font-semibold">{formatNumber(result.riskFactor, inputs.precision || 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Structure Factor:</span>
                    <span className="font-semibold">{formatNumber(result.structureFactor, inputs.precision || 2)}</span>
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
                Building Parameters
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Building Height (meters)
                </label>
                <input
                  type="number"
                  value={inputs.height || ''}
                  onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="10"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Building Area (square meters)
                </label>
                <input
                  type="number"
                  value={inputs.area || ''}
                  onChange={(e) => handleInputChange('area', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="150"
                  step="1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Risk Level
                </label>
                <select
                  value={inputs.riskLevel}
                  onChange={(e) => handleInputChange('riskLevel', e.target.value as RiskLevel)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="low">Low Risk Area</option>
                  <option value="medium">Medium Risk Area</option>
                  <option value="high">High Risk Area</option>
                  <option value="very-high">Very High Risk Area</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Structure Type
                </label>
                <select
                  value={inputs.structureType}
                  onChange={(e) => handleInputChange('structureType', e.target.value as StructureType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="residential">Residential Building</option>
                  <option value="commercial">Commercial Building</option>
                  <option value="industrial">Industrial Facility</option>
                  <option value="critical">Critical Infrastructure</option>
                  <option value="open-field">Open Field Structure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ground Resistance (Ω) - Optional
                </label>
                <input
                  type="number"
                  value={inputs.groundResistance || ''}
                  onChange={(e) => handleInputChange('groundResistance', parseFloat(e.target.value) || undefined)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="Leave empty if unknown"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decimal Precision
                </label>
                <select
                  value={inputs.precision}
                  onChange={(e) => handleInputChange('precision', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="2">2 decimal places</option>
                  <option value="3">3 decimal places</option>
                  <option value="4">4 decimal places</option>
                </select>
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

            {/* Results Panel */}
            {result && !error && (
              <div className={`rounded-xl border p-6 ${getRiskBgColor(result.riskScore)}`}>
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Protection Recommendations
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">System Type:</p>
                    <p className="text-base font-semibold text-gray-900">{result.systemType}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">Recommendation:</p>
                    <p className="text-base text-gray-800">{result.recommendation}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">Estimated Cost:</p>
                    <p className="text-base font-semibold text-gray-900">{result.estimatedCost}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">Grounding Required:</p>
                    <p className="text-base font-semibold text-gray-900">{result.groundingRequired ? 'Yes' : 'No'}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-sm font-medium text-gray-800">{result.safetyWarning}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Building Types
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
                            {entry.inputs.height}m × {entry.inputs.area}m²
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Risk Score: {formatNumber(entry.result.riskScore, 2)} - {entry.result.protectionLevelText}
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

      <LightningProtectionCalculatorSEO />
      <RelatedTools
        currentTool="lightning-protection-calculator"
        tools={['power-calculator-electrical', 'energy-consumption-calculator', 'electric-bill-calculator', 'ohms-law-calculator']}
      />
    </>
  );
}

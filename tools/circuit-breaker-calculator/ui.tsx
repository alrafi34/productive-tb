"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CircuitBreakerInputs,
  CircuitBreakerResult,
  VoltageType,
  PhaseType,
  LoadType,
  PowerUnit,
} from "./types";
import {
  calculateCircuitBreaker,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  STANDARD_BREAKER_SIZES,
  getWireGaugeRecommendation,
} from "./logic";
import CircuitBreakerCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CircuitBreakerCalculatorUI() {
  const [inputs, setInputs] = useState<CircuitBreakerInputs>({
    load: 1500,
    loadUnit: 'W',
    voltage: 230,
    phaseType: 'single',
    loadType: 'non-continuous',
    powerFactor: 1.0,
  });

  const [result, setResult] = useState<CircuitBreakerResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      calculate();
    }, 150),
    [inputs]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  const calculate = () => {
    setError(null);

    const validationError = validateInputs(inputs);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    try {
      const calculatedResult = calculateCircuitBreaker(inputs);
      setResult(calculatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  const handleInputChange = (field: keyof CircuitBreakerInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      load: 1500,
      loadUnit: 'W',
      voltage: 230,
      phaseType: 'single',
      loadType: 'non-continuous',
      powerFactor: 1.0,
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs({
      load: preset.load,
      loadUnit: preset.loadUnit,
      voltage: preset.voltage,
      phaseType: preset.phaseType,
      loadType: preset.loadType,
      powerFactor: preset.powerFactor,
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = `Recommended Breaker: ${result.recommendedBreaker}A (Load: ${formatNumber(result.current, 2)}A)`;
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
      downloadFile(text, 'circuit_breaker_calculation.txt');
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

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔌</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Circuit Breaker Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the correct circuit breaker size for electrical loads with safety factors and code compliance. 
                Supports single-phase and three-phase systems.
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
                    Recommended Breaker
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {result.recommendedBreaker}
                  </div>
                  <div className="text-xl text-primary-100">
                    Amperes (A)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Load Current:</span>
                    <span className="font-semibold">{formatNumber(result.current, 2)} A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Adjusted Current:</span>
                    <span className="font-semibold">{formatNumber(result.adjustedCurrent, 2)} A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Safety Margin:</span>
                    <span className="font-semibold">{formatNumber(result.safetyMargin, 1)}%</span>
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

            {/* Wire Gauge Recommendation */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Wire Gauge Recommendation
                </h3>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-semibold">
                    {getWireGaugeRecommendation(result.adjustedCurrent)}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Based on {formatNumber(result.adjustedCurrent, 2)}A adjusted current
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Circuit Parameters
              </h3>
              
              {/* Load */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Load
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={inputs.load}
                    onChange={(e) => handleInputChange('load', parseFloat(e.target.value) || 0)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1500"
                    step="any"
                    min="0"
                  />
                  <select
                    value={inputs.loadUnit}
                    onChange={(e) => handleInputChange('loadUnit', e.target.value as PowerUnit)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="W">Watts (W)</option>
                    <option value="kW">Kilowatts (kW)</option>
                  </select>
                </div>
              </div>

              {/* Voltage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voltage
                </label>
                <select
                  value={inputs.voltage}
                  onChange={(e) => handleInputChange('voltage', parseInt(e.target.value) as VoltageType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value={120}>120V (US Single Phase)</option>
                  <option value={230}>230V (EU/Asia Single Phase)</option>
                  <option value={240}>240V (US Split Phase)</option>
                  <option value={400}>400V (EU Three Phase)</option>
                  <option value={415}>415V (Asia Three Phase)</option>
                </select>
              </div>

              {/* Phase Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phase Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleInputChange('phaseType', 'single')}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      inputs.phaseType === 'single'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Single Phase
                  </button>
                  <button
                    onClick={() => handleInputChange('phaseType', 'three')}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      inputs.phaseType === 'three'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Three Phase
                  </button>
                </div>
              </div>

              {/* Load Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Load Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleInputChange('loadType', 'non-continuous')}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      inputs.loadType === 'non-continuous'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Non-Continuous
                  </button>
                  <button
                    onClick={() => handleInputChange('loadType', 'continuous')}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                      inputs.loadType === 'continuous'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Continuous (125%)
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Continuous loads run for 3+ hours and require 125% safety factor
                </p>
              </div>

              {/* Power Factor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Power Factor (0-1)
                </label>
                <input
                  type="number"
                  value={inputs.powerFactor}
                  onChange={(e) => handleInputChange('powerFactor', parseFloat(e.target.value) || 1)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="1.0"
                  step="0.01"
                  min="0.1"
                  max="1"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Use 1.0 for resistive loads, 0.8-0.9 for motors/inductive loads
                </p>
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

            {/* Warnings */}
            {result && result.warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Important Warnings</span>
                </h4>
                <ul className="space-y-1">
                  {result.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-yellow-800">
                      • {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Load Examples
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
                      {preset.load} {preset.loadUnit} • {preset.voltage}V • {preset.phaseType === 'single' ? '1φ' : '3φ'}
                    </div>
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

            {/* Standard Breaker Sizes Reference */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Standard Breaker Sizes
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {STANDARD_BREAKER_SIZES.map((size) => (
                  <div
                    key={size}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                      result && size === result.recommendedBreaker
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {size}A
                  </div>
                ))}
              </div>
            </div>

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
                            Breaker: {entry.result.recommendedBreaker}A
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.load} {entry.inputs.loadUnit} • {entry.inputs.voltage}V • 
                          {entry.inputs.phaseType === 'single' ? ' Single Phase' : ' Three Phase'} • 
                          {entry.inputs.loadType === 'continuous' ? ' Continuous' : ' Non-Continuous'}
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

      <CircuitBreakerCalculatorSEO />
      <RelatedTools
        currentTool="circuit-breaker-calculator"
        tools={['voltage-drop-calculator', 'wire-size-calculator', 'power-consumption-calculator']}
      />
    </>
  );
}

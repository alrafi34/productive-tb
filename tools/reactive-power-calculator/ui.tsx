"use client";

import { useState, useEffect, useCallback } from "react";
import { ReactivePowerInputs, ReactivePowerResult } from "./types";
import {
  calculateReactivePower,
  validateInputs,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getPresets,
  debounce
} from "./logic";
import ReactivePowerCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ReactivePowerCalculatorUI() {
  const [voltage, setVoltage] = useState<string>("230");
  const [current, setCurrent] = useState<string>("10");
  const [phaseAngle, setPhaseAngle] = useState<string>("30");
  
  const [result, setResult] = useState<ReactivePowerResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());
  const [unitMode, setUnitMode] = useState<'VAR' | 'kVAR'>('VAR');

  const presets = getPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      calculate();
    }, 150),
    [voltage, current, phaseAngle]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [voltage, current, phaseAngle, debouncedCalculate]);

  const calculate = () => {
    setError(null);
    
    const inputs: ReactivePowerInputs = {
      voltage: parseFloat(voltage) || 0,
      current: parseFloat(current) || 0,
      phaseAngle: parseFloat(phaseAngle) || 0,
    };

    const validationError = validateInputs(inputs);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    try {
      const calcResult = calculateReactivePower(inputs);
      setResult(calcResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  const handleReset = () => {
    setVoltage("230");
    setCurrent("10");
    setPhaseAngle("30");
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setVoltage(preset.voltage.toString());
    setCurrent(preset.current.toString());
    setPhaseAngle(preset.phaseAngle.toString());
  };

  const handleCopy = () => {
    if (result) {
      const value = unitMode === 'VAR' ? result.reactivePower : result.reactivePowerKVAR;
      const text = `Reactive Power: ${formatNumber(value, 2)} ${unitMode}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      const inputs: ReactivePowerInputs = {
        voltage: parseFloat(voltage),
        current: parseFloat(current),
        phaseAngle: parseFloat(phaseAngle),
      };
      saveToHistory(inputs, result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const inputs: ReactivePowerInputs = {
        voltage: parseFloat(voltage),
        current: parseFloat(current),
        phaseAngle: parseFloat(phaseAngle),
      };
      const text = exportToText(inputs, result);
      downloadFile(text, 'reactive_power_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: any) => {
    setVoltage(entry.input.voltage.toString());
    setCurrent(entry.input.current.toString());
    setPhaseAngle(entry.input.phaseAngle.toString());
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Reactive Power Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate reactive power (VAR) in AC circuits using voltage, current, and phase angle. Get instant results with comprehensive power analysis.
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
                    Reactive Power (Q)
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {unitMode === 'VAR' 
                      ? formatNumber(result.reactivePower, 2)
                      : formatNumber(result.reactivePowerKVAR, 2)
                    }
                  </div>
                  <div className="text-xl text-primary-100">
                    {unitMode === 'VAR' ? 'VAR' : 'kVAR'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Apparent Power:</span>
                    <span className="font-semibold">{formatNumber(result.apparentPower, 2)} VA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Real Power:</span>
                    <span className="font-semibold">{formatNumber(result.realPower, 2)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power Factor:</span>
                    <span className="font-semibold">{formatNumber(result.powerFactor, 4)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setUnitMode(unitMode === 'VAR' ? 'kVAR' : 'VAR')}
                    className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    🔄 Switch to {unitMode === 'VAR' ? 'kVAR' : 'VAR'}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
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
                Circuit Parameters
              </h3>
              
              {/* Voltage Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voltage (V)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="230"
                    min="0"
                    step="0.1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    V
                  </div>
                </div>
              </div>

              {/* Current Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current (A)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    A
                  </div>
                </div>
              </div>

              {/* Phase Angle Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phase Angle (θ)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={phaseAngle}
                    onChange={(e) => setPhaseAngle(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="30"
                    min="0"
                    max="90"
                    step="1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    °
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Angle between 0° and 90°</p>
              </div>

              {/* Slider for Phase Angle */}
              <div>
                <input
                  type="range"
                  value={phaseAngle}
                  onChange={(e) => setPhaseAngle(e.target.value)}
                  min="0"
                  max="90"
                  step="1"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0°</span>
                  <span>45°</span>
                  <span>90°</span>
                </div>
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

            {/* Efficiency Rating */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Load Characteristics
                </h3>
                <div className={`p-4 rounded-lg border-2 ${
                  result.phaseAngle === 0 ? 'bg-green-50 border-green-200' :
                  result.phaseAngle <= 15 ? 'bg-blue-50 border-blue-200' :
                  result.phaseAngle <= 30 ? 'bg-yellow-50 border-yellow-200' :
                  result.phaseAngle <= 45 ? 'bg-orange-50 border-orange-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <p className={`text-sm font-medium ${
                    result.phaseAngle === 0 ? 'text-green-800' :
                    result.phaseAngle <= 15 ? 'text-blue-800' :
                    result.phaseAngle <= 30 ? 'text-yellow-800' :
                    result.phaseAngle <= 45 ? 'text-orange-800' :
                    'text-red-800'
                  }`}>
                    {result.efficiency}
                  </p>
                </div>
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
                      {preset.voltage}V, {preset.current}A, {preset.phaseAngle}°
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

            {/* Power Components */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Power Components
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Real Power (P)</div>
                    <div className="text-lg font-bold text-green-900">{formatNumber(result.realPower, 2)}</div>
                    <div className="text-xs text-green-700">Watts (W)</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1">Reactive Power (Q)</div>
                    <div className="text-lg font-bold text-purple-900">{formatNumber(result.reactivePower, 2)}</div>
                    <div className="text-xs text-purple-700">VAR</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Apparent Power (S)</div>
                    <div className="text-lg font-bold text-blue-900">{formatNumber(result.apparentPower, 2)}</div>
                    <div className="text-xs text-blue-700">VA</div>
                  </div>
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
                            Q: {formatNumber(entry.result.reactivePower, 2)} VAR
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          V: {entry.input.voltage}V • I: {entry.input.current}A • θ: {entry.input.phaseAngle}°
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

      <ReactivePowerCalculatorSEO />
      <RelatedTools
        currentTool="reactive-power-calculator"
        tools={['real-power-calculator', 'power-factor-calculator', 'phase-angle-calculator']}
      />
    </>
  );
}

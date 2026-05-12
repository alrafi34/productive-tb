"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CalculationMode,
  PowerInputs,
  VoltageInputs,
  DistanceInputs,
  AttenuationResult,
  PowerUnit,
  VoltageUnit,
  DistanceUnit,
} from "./types";
import {
  calculatePowerAttenuation,
  calculateVoltageAttenuation,
  calculateDistanceLoss,
  validatePowerInputs,
  validateVoltageInputs,
  validateDistanceInputs,
  getPowerPresets,
  getVoltagePresets,
  getDistancePresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
} from "./logic";
import SignalAttenuationCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SignalAttenuationCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>('power');
  
  // Power mode inputs
  const [powerInputs, setPowerInputs] = useState<PowerInputs>({
    inputPower: 100,
    outputPower: 50,
    inputUnit: 'W',
    outputUnit: 'W',
  });

  // Voltage mode inputs
  const [voltageInputs, setVoltageInputs] = useState<VoltageInputs>({
    inputVoltage: 10,
    outputVoltage: 5,
    inputUnit: 'V',
    outputUnit: 'V',
  });

  // Distance mode inputs
  const [distanceInputs, setDistanceInputs] = useState<DistanceInputs>({
    lossPerUnit: 0.2,
    distance: 50,
    distanceUnit: 'm',
  });

  const [result, setResult] = useState<AttenuationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      calculate();
    }, 150),
    [mode, powerInputs, voltageInputs, distanceInputs]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [mode, powerInputs, voltageInputs, distanceInputs, debouncedCalculate]);

  const calculate = () => {
    setError(null);

    try {
      let calculatedResult: AttenuationResult;

      if (mode === 'power') {
        const validationError = validatePowerInputs(powerInputs);
        if (validationError) {
          setError(validationError);
          setResult(null);
          return;
        }
        calculatedResult = calculatePowerAttenuation(powerInputs);
      } else if (mode === 'voltage') {
        const validationError = validateVoltageInputs(voltageInputs);
        if (validationError) {
          setError(validationError);
          setResult(null);
          return;
        }
        calculatedResult = calculateVoltageAttenuation(voltageInputs);
      } else {
        const validationError = validateDistanceInputs(distanceInputs);
        if (validationError) {
          setError(validationError);
          setResult(null);
          return;
        }
        calculatedResult = calculateDistanceLoss(distanceInputs);
      }

      setResult(calculatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  const handleReset = () => {
    if (mode === 'power') {
      setPowerInputs({
        inputPower: 100,
        outputPower: 50,
        inputUnit: 'W',
        outputUnit: 'W',
      });
    } else if (mode === 'voltage') {
      setVoltageInputs({
        inputVoltage: 10,
        outputVoltage: 5,
        inputUnit: 'V',
        outputUnit: 'V',
      });
    } else {
      setDistanceInputs({
        lossPerUnit: 0.2,
        distance: 50,
        distanceUnit: 'm',
      });
    }
    setResult(null);
    setError(null);
  };

  const handleSwap = () => {
    if (mode === 'power') {
      setPowerInputs(prev => ({
        inputPower: prev.outputPower,
        outputPower: prev.inputPower,
        inputUnit: prev.outputUnit,
        outputUnit: prev.inputUnit,
      }));
    } else if (mode === 'voltage') {
      setVoltageInputs(prev => ({
        inputVoltage: prev.outputVoltage,
        outputVoltage: prev.inputVoltage,
        inputUnit: prev.outputUnit,
        outputUnit: prev.inputUnit,
      }));
    }
  };

  const handleCopy = () => {
    if (result) {
      const text = `${result.isGain ? 'Gain' : 'Attenuation'}: ${formatNumber(result.attenuation, 4)} dB`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      const inputs = mode === 'power' ? powerInputs : mode === 'voltage' ? voltageInputs : distanceInputs;
      saveToHistory(mode, inputs, result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const inputs = mode === 'power' ? powerInputs : mode === 'voltage' ? voltageInputs : distanceInputs;
      const text = exportToText(mode, inputs, result);
      downloadFile(text, 'signal_attenuation_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: typeof history[0]) => {
    setMode(entry.mode);
    if (entry.mode === 'power') {
      setPowerInputs(entry.inputs as PowerInputs);
    } else if (entry.mode === 'voltage') {
      setVoltageInputs(entry.inputs as VoltageInputs);
    } else {
      setDistanceInputs(entry.inputs as DistanceInputs);
    }
    setShowHistory(false);
  };

  const powerPresets = getPowerPresets();
  const voltagePresets = getVoltagePresets();
  const distancePresets = getDistancePresets();

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Signal Attenuation Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate signal loss (attenuation) in dB using power, voltage, or distance-based methods. 
                Perfect for RF, telecom, and circuit design applications.
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
                    {result.isGain ? 'Signal Gain' : 'Signal Attenuation'}
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.attenuation, 4)}
                  </div>
                  <div className="text-xl text-primary-100">
                    dB (Decibels)
                  </div>
                </div>

                {mode !== 'distance' && result.signalLossPercentage > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary-100">Signal Loss:</span>
                      <span className="font-semibold">{formatNumber(result.signalLossPercentage, 2)}%</span>
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

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actions</h3>
              
              <div className="space-y-2">
                {(mode === 'power' || mode === 'voltage') && (
                  <button
                    onClick={handleSwap}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    🔄 Swap Input ↔ Output
                  </button>
                )}
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
            
            {/* Mode Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Calculation Mode
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setMode('power')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'power'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Power-Based
                </button>
                <button
                  onClick={() => setMode('voltage')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'voltage'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Voltage-Based
                </button>
                <button
                  onClick={() => setMode('distance')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'distance'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Distance-Based
                </button>
              </div>
            </div>

            {/* Input Panel - Power Mode */}
            {mode === 'power' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Power Parameters
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Power (P₁)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={powerInputs.inputPower}
                      onChange={(e) => setPowerInputs(prev => ({ ...prev, inputPower: parseFloat(e.target.value) || 0 }))}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="100"
                      step="any"
                      min="0"
                    />
                    <select
                      value={powerInputs.inputUnit}
                      onChange={(e) => setPowerInputs(prev => ({ ...prev, inputUnit: e.target.value as PowerUnit }))}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="W">W (Watts)</option>
                      <option value="mW">mW (Milliwatts)</option>
                      <option value="dBm">dBm</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Output Power (P₂)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={powerInputs.outputPower}
                      onChange={(e) => setPowerInputs(prev => ({ ...prev, outputPower: parseFloat(e.target.value) || 0 }))}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="50"
                      step="any"
                      min="0"
                    />
                    <select
                      value={powerInputs.outputUnit}
                      onChange={(e) => setPowerInputs(prev => ({ ...prev, outputUnit: e.target.value as PowerUnit }))}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="W">W (Watts)</option>
                      <option value="mW">mW (Milliwatts)</option>
                      <option value="dBm">dBm</option>
                    </select>
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
            )}

            {/* Input Panel - Voltage Mode */}
            {mode === 'voltage' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Voltage Parameters
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Voltage (V₁)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={voltageInputs.inputVoltage}
                      onChange={(e) => setVoltageInputs(prev => ({ ...prev, inputVoltage: parseFloat(e.target.value) || 0 }))}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="10"
                      step="any"
                      min="0"
                    />
                    <select
                      value={voltageInputs.inputUnit}
                      onChange={(e) => setVoltageInputs(prev => ({ ...prev, inputUnit: e.target.value as VoltageUnit }))}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="V">V (Volts)</option>
                      <option value="mV">mV (Millivolts)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Output Voltage (V₂)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={voltageInputs.outputVoltage}
                      onChange={(e) => setVoltageInputs(prev => ({ ...prev, outputVoltage: parseFloat(e.target.value) || 0 }))}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      step="any"
                      min="0"
                    />
                    <select
                      value={voltageInputs.outputUnit}
                      onChange={(e) => setVoltageInputs(prev => ({ ...prev, outputUnit: e.target.value as VoltageUnit }))}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="V">V (Volts)</option>
                      <option value="mV">mV (Millivolts)</option>
                    </select>
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
            )}

            {/* Input Panel - Distance Mode */}
            {mode === 'distance' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Distance Parameters
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loss per Unit Distance
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={distanceInputs.lossPerUnit}
                      onChange={(e) => setDistanceInputs(prev => ({ ...prev, lossPerUnit: parseFloat(e.target.value) || 0 }))}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.2"
                      step="any"
                      min="0"
                    />
                    <select
                      value={distanceInputs.distanceUnit}
                      onChange={(e) => setDistanceInputs(prev => ({ ...prev, distanceUnit: e.target.value as DistanceUnit }))}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="m">dB/m</option>
                      <option value="km">dB/km</option>
                      <option value="ft">dB/ft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={distanceInputs.distance}
                      onChange={(e) => setDistanceInputs(prev => ({ ...prev, distance: parseFloat(e.target.value) || 0 }))}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="50"
                      step="any"
                      min="0"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      {distanceInputs.distanceUnit}
                    </div>
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
            )}

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
                Common Examples
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mode === 'power' && powerPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setPowerInputs(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.inputPower} {preset.inputUnit} → {preset.outputPower} {preset.outputUnit}
                    </div>
                  </button>
                ))}

                {mode === 'voltage' && voltagePresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setVoltageInputs(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.inputVoltage} {preset.inputUnit} → {preset.outputVoltage} {preset.outputUnit}
                    </div>
                  </button>
                ))}

                {mode === 'distance' && distancePresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setDistanceInputs(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.lossPerUnit} dB/{preset.distanceUnit} × {preset.distance} {preset.distanceUnit}
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
                            {entry.result.isGain ? 'Gain' : 'Attenuation'}: {formatNumber(entry.result.attenuation, 4)} dB
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.mode.charAt(0).toUpperCase() + entry.mode.slice(1)} Mode • 
                          {entry.result.inputDisplay} → {entry.result.outputDisplay}
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

      <SignalAttenuationCalculatorSEO />
      <RelatedTools
        currentTool="signal-attenuation-calculator"
        tools={['amplifier-gain-calculator', 'power-factor-calculator', 'impedance-calculator']}
      />
    </>
  );
}

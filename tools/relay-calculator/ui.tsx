"use client";

import { useState, useEffect, useCallback } from "react";
import { RelayCalculatorInputs, RelayCalculatorResult } from "./types";
import {
  calculateRelay,
  validateInputs,
  getRelayPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  debounce,
  saveSettings,
  loadSettings
} from "./logic";
import RelayCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RelayCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<RelayCalculatorInputs>({
    supplyVoltage: savedSettings.supplyVoltage || 5,
    coilResistance: savedSettings.coilResistance || 70,
    mcuVoltage: savedSettings.mcuVoltage || 5,
    transistorGain: savedSettings.transistorGain || 100,
    baseEmitterVoltage: savedSettings.baseEmitterVoltage || 0.7,
    loadVoltage: savedSettings.loadVoltage || 220,
    loadCurrent: savedSettings.loadCurrent || 5,
    relayRatedVoltage: savedSettings.relayRatedVoltage || 250,
    relayRatedCurrent: savedSettings.relayRatedCurrent || 10
  });
  
  const [result, setResult] = useState<RelayCalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getRelayPresets();

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
        const calculatedResult = calculateRelay(inputs);
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

  const handleInputChange = (field: keyof RelayCalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      supplyVoltage: 5,
      coilResistance: 70,
      mcuVoltage: 5,
      transistorGain: 100,
      baseEmitterVoltage: 0.7,
      loadVoltage: 220,
      loadCurrent: 5,
      relayRatedVoltage: 250,
      relayRatedCurrent: 10
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs(prev => ({
      ...prev,
      supplyVoltage: preset.supplyVoltage,
      coilResistance: preset.coilResistance,
      mcuVoltage: preset.mcuVoltage,
      relayRatedVoltage: preset.relayRatedVoltage,
      relayRatedCurrent: preset.relayRatedCurrent
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Coil: ${formatNumber(result.coilCurrent, 2)}mA, ${formatNumber(result.coilPower, 4)}W | Base R: ${result.standardBaseResistor}Ω | Safe: ${result.loadSafe ? 'YES' : 'NO'}`;
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
      downloadFile(text, 'relay_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'relay_calculation.csv');
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
              <h3 className="font-semibold text-blue-900 mb-1">Relay Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate relay coil current, power consumption, transistor base resistor, and verify load safety. Essential for relay driver circuit design.
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
                    Coil Current
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.coilCurrent, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    mA
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Coil Power:</span>
                    <span className="font-semibold">{formatNumber(result.coilPower, 4)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Base Resistor:</span>
                    <span className="font-semibold">{result.standardBaseResistor} Ω</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Load Status:</span>
                    <span className={`font-semibold ${result.loadSafe ? 'text-green-200' : 'text-red-200'}`}>
                      {result.loadSafe ? '✓ SAFE' : '✗ UNSAFE'}
                    </span>
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
                  <>
                    <button
                      onClick={handleExportText}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📄 Export TXT
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📊 Export CSV
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Coil Parameters */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Coil Parameters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supply Voltage
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.supplyVoltage || ''}
                      onChange={(e) => handleInputChange('supplyVoltage', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.1"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      V
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coil Resistance
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.coilResistance || ''}
                      onChange={(e) => handleInputChange('coilResistance', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="70"
                      min="0"
                      step="1"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      Ω
                    </div>
                  </div>
                </div>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> I = V / R, P = V × I
                  </div>
                </div>
              )}
            </div>

            {/* Control Circuit */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Control Circuit (Transistor Driver)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MCU Output Voltage
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.mcuVoltage || ''}
                      onChange={(e) => handleInputChange('mcuVoltage', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.1"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      V
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleInputChange('mcuVoltage', 3.3)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      3.3V
                    </button>
                    <button
                      onClick={() => handleInputChange('mcuVoltage', 5)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      5V
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transistor Gain (hFE)
                  </label>
                  <input
                    type="number"
                    value={inputs.transistorGain || ''}
                    onChange={(e) => handleInputChange('transistorGain', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="100"
                    min="0"
                    step="10"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typical: 100-300 (2N2222, BC547)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base-Emitter Voltage (Vbe)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.baseEmitterVoltage || ''}
                      onChange={(e) => handleInputChange('baseEmitterVoltage', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.7"
                      min="0"
                      max="1"
                      step="0.1"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      V
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Standard: 0.7V (silicon transistor)
                  </p>
                </div>
              </div>

              {result && result.needsTransistor && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="text-sm text-orange-800">
                    <strong>⚠ Transistor driver required!</strong> MCU cannot drive relay directly.
                  </div>
                </div>
              )}
            </div>

            {/* Load Parameters */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Load & Relay Rating
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Load Voltage
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.loadVoltage || ''}
                      onChange={(e) => handleInputChange('loadVoltage', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="220"
                      min="0"
                      step="1"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      V
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Load Current
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.loadCurrent || ''}
                      onChange={(e) => handleInputChange('loadCurrent', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      min="0"
                      step="0.1"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      A
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relay Rated Voltage
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.relayRatedVoltage || ''}
                      onChange={(e) => handleInputChange('relayRatedVoltage', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="250"
                      min="0"
                      step="1"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      V
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relay Rated Current
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.relayRatedCurrent || ''}
                      onChange={(e) => handleInputChange('relayRatedCurrent', parseFloat(e.target.value) || 0)}
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

            {/* Safety Status */}
            {result && !error && (
              <div className={`border rounded-xl p-6 ${result.loadSafe ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Load Safety Analysis
                </h3>
                
                <div className="space-y-3">
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${result.voltageSafe ? 'bg-green-100' : 'bg-red-100'}`}>
                    <span className="text-xl">{result.voltageSafe ? '✓' : '✗'}</span>
                    <div className="flex-1">
                      <div className={`font-semibold ${result.voltageSafe ? 'text-green-900' : 'text-red-900'}`}>
                        Voltage: {result.voltageSafe ? 'SAFE' : 'UNSAFE'}
                      </div>
                      <div className={`text-sm ${result.voltageSafe ? 'text-green-700' : 'text-red-700'}`}>
                        {inputs.loadVoltage}V {result.voltageSafe ? '≤' : '>'} {inputs.relayRatedVoltage}V rated
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-lg ${result.currentSafe ? 'bg-green-100' : 'bg-red-100'}`}>
                    <span className="text-xl">{result.currentSafe ? '✓' : '✗'}</span>
                    <div className="flex-1">
                      <div className={`font-semibold ${result.currentSafe ? 'text-green-900' : 'text-red-900'}`}>
                        Current: {result.currentSafe ? 'SAFE' : 'UNSAFE'}
                      </div>
                      <div className={`text-sm ${result.currentSafe ? 'text-green-700' : 'text-red-700'}`}>
                        {inputs.loadCurrent}A {result.currentSafe ? '≤' : '>'} {inputs.relayRatedCurrent}A rated
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg font-semibold text-center ${result.loadSafe ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>
                    {result.loadSafe ? '✓ RELAY IS SAFE FOR THIS LOAD' : '✗ RELAY NOT SAFE - USE HIGHER RATING'}
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Relay Configurations
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
                      {preset.supplyVoltage}V • {preset.coilResistance}Ω • MCU: {preset.mcuVoltage}V
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculated Values
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Coil Current</div>
                    <div className="text-2xl font-bold text-blue-900">{formatNumber(result.coilCurrent, 2)}</div>
                    <div className="text-xs text-blue-700 mt-1">mA</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Coil Power</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.coilPower, 4)}</div>
                    <div className="text-xs text-green-700 mt-1">W (Watts)</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">Base Resistor</div>
                    <div className="text-2xl font-bold text-purple-900">{result.standardBaseResistor}</div>
                    <div className="text-xs text-purple-700 mt-1">Ω (Standard E24)</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1 font-semibold">Base Current</div>
                    <div className="text-2xl font-bold text-orange-900">{formatNumber(result.baseCurrent, 4)}</div>
                    <div className="text-xs text-orange-700 mt-1">mA</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-700">
                    <strong>Calculated Base Resistor:</strong> {formatNumber(result.baseResistor, 2)} Ω<br/>
                    <strong>Nearest Standard Value:</strong> {result.standardBaseResistor} Ω (E24 series)
                  </div>
                </div>
              </div>
            )}

            {/* Calculation Steps */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Steps
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
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
                            {formatNumber(entry.result.coilCurrent, 2)}mA • {entry.result.standardBaseResistor}Ω
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.supplyVoltage}V / {entry.inputs.coilResistance}Ω • {entry.result.loadSafe ? '✓ Safe' : '✗ Unsafe'}
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

      <RelayCalculatorSEO />
      <RelatedTools
        currentTool="relay-calculator"
        tools={['led-resistor-calculator', 'transistor-base-resistor-calculator', 'op-amp-calculator']}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { LEDResistorInputs, LEDResistorResult } from "./types";
import {
  calculateLEDResistor,
  validateInputs,
  getLEDPresets,
  getCommonVoltages,
  formatResistance,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce
} from "./logic";
import LEDResistorCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function LEDResistorCalculatorUI() {
  const [inputs, setInputs] = useState<LEDResistorInputs>({
    supplyVoltage: 5,
    ledForwardVoltage: 2,
    ledCurrent: 20,
    numberOfLEDs: 1
  });
  
  const [result, setResult] = useState<LEDResistorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const ledPresets = getLEDPresets();
  const commonVoltages = getCommonVoltages();

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
        const calculatedResult = calculateLEDResistor(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 100),
    [inputs]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  const handleInputChange = (field: keyof LEDResistorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      supplyVoltage: 5,
      ledForwardVoltage: 2,
      ledCurrent: 20,
      numberOfLEDs: 1
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof ledPresets[0]) => {
    setInputs(prev => ({
      ...prev,
      ledForwardVoltage: preset.forwardVoltage,
      ledCurrent: preset.typicalCurrent,
      ledColor: preset.color
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `LED Resistor: ${result.standardResistance}Ω (${result.recommendedWattage}W)`;
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
      downloadFile(text, 'led_resistor_calculation.txt');
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
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">LED Resistor Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the correct current-limiting resistor value for LED circuits. Prevents LED damage and ensures optimal brightness.
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
                    Standard Resistor
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {result.standardResistance}
                  </div>
                  <div className="text-xl text-primary-100">
                    Ω (Ohms)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Calculated:</span>
                    <span className="font-semibold">{formatNumber(result.resistance, 2)} Ω</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power:</span>
                    <span className="font-semibold">{formatNumber(result.power, 4)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Use Wattage:</span>
                    <span className="font-semibold">{result.recommendedWattage} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Voltage Drop:</span>
                    <span className="font-semibold">{formatNumber(result.voltageDrop, 2)} V</span>
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
                Circuit Parameters
              </h3>
              
              {/* Supply Voltage Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supply Voltage (Vs)
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
                <div className="mt-2 flex flex-wrap gap-2">
                  {commonVoltages.map((voltage) => (
                    <button
                      key={voltage}
                      onClick={() => handleInputChange('supplyVoltage', voltage)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      {voltage}V
                    </button>
                  ))}
                </div>
              </div>

              {/* LED Forward Voltage Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LED Forward Voltage (Vf)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.ledForwardVoltage || ''}
                    onChange={(e) => handleInputChange('ledForwardVoltage', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2.0"
                    min="0"
                    step="0.1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    V
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-600 italic">
                  💡 Depends on LED color (see presets below)
                </p>
              </div>

              {/* LED Current Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LED Current (If)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.ledCurrent || ''}
                    onChange={(e) => handleInputChange('ledCurrent', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="20"
                    min="0"
                    step="1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    mA
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  Typical LED current: 10-20mA (standard), 20-30mA (high brightness)
                </p>
              </div>

              {/* Number of LEDs Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of LEDs in Series
                </label>
                <input
                  type="number"
                  value={inputs.numberOfLEDs || ''}
                  onChange={(e) => handleInputChange('numberOfLEDs', parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="1"
                  min="1"
                  step="1"
                />
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> R = (Vs - Vf × N) / I
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

            {/* LED Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common LED Types
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ledPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      Vf: {preset.forwardVoltage}V @ {preset.typicalCurrent}mA
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

            {/* Result Analysis */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Result Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Calculated Resistance</div>
                    <div className="text-lg font-bold text-blue-900">{formatNumber(result.resistance, 2)}</div>
                    <div className="text-xs text-blue-700">Ω (Exact value)</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Standard Resistor</div>
                    <div className="text-lg font-bold text-green-900">{result.standardResistance}</div>
                    <div className="text-xs text-green-700">Ω (E24 series)</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1">Power Dissipation</div>
                    <div className="text-lg font-bold text-purple-900">{formatNumber(result.power, 4)}</div>
                    <div className="text-xs text-purple-700">W (Watts)</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1">Recommended Wattage</div>
                    <div className="text-lg font-bold text-orange-900">{result.recommendedWattage}</div>
                    <div className="text-xs text-orange-700">W resistor (2× safety)</div>
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
                            {entry.result.standardResistance}Ω ({entry.result.recommendedWattage}W)
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.supplyVoltage}V → {entry.inputs.ledForwardVoltage}V @ {entry.inputs.ledCurrent}mA
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

      <LEDResistorCalculatorSEO />
      <RelatedTools
        currentTool="led-resistor-calculator"
        tools={['ohms-law-calculator', 'voltage-divider-calculator', 'series-resistor-calculator', 'parallel-resistor-calculator']}
      />
    </>
  );
}

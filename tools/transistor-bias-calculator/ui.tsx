"use client";

import { useState, useEffect, useCallback } from "react";
import { BiasType, TransistorBiasInputs, TransistorBiasResult } from "./types";
import {
  calculateTransistorBias,
  validateInputs,
  getBiasPresets,
  getRegionColor,
  getRegionLabel,
  formatResistance,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce
} from "./logic";
import TransistorBiasCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function TransistorBiasCalculatorUI() {
  const [inputs, setInputs] = useState<TransistorBiasInputs>({
    biasType: 'voltage-divider',
    vcc: 12,
    r1: 10000,
    r2: 5000,
    rc: 1000,
    re: 500,
    beta: 100,
    vbe: 0.7
  });
  
  const [result, setResult] = useState<TransistorBiasResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const biasPresets = getBiasPresets();

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
        const calculatedResult = calculateTransistorBias(inputs);
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

  const handleInputChange = (field: keyof TransistorBiasInputs, value: number | BiasType | undefined) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleBiasTypeChange = (biasType: BiasType) => {
    // Reset to appropriate defaults for bias type
    if (biasType === 'voltage-divider') {
      setInputs({
        biasType,
        vcc: 12,
        r1: 10000,
        r2: 5000,
        rc: 1000,
        re: 500,
        beta: 100,
        vbe: 0.7
      });
    } else if (biasType === 'fixed') {
      setInputs({
        biasType,
        vcc: 12,
        rb: 470000,
        rc: 2200,
        re: 0,
        beta: 100,
        vbe: 0.7
      });
    } else if (biasType === 'emitter') {
      setInputs({
        biasType,
        vcc: 12,
        rb: 100000,
        rc: 1000,
        re: 500,
        beta: 100,
        vbe: 0.7
      });
    }
  };

  const handleReset = () => {
    handleBiasTypeChange('voltage-divider');
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof biasPresets[0]) => {
    setInputs({
      biasType: preset.biasType,
      vcc: preset.vcc,
      r1: preset.r1,
      r2: preset.r2,
      rb: preset.rb,
      rc: preset.rc,
      re: preset.re,
      beta: preset.beta,
      vbe: 0.7
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = `Vce: ${formatNumber(result.vce, 3)}V | Ic: ${formatNumber(result.ic, 3)}mA | Region: ${getRegionLabel(result.operatingRegion)}`;
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
      downloadFile(text, 'transistor_bias_calculation.txt');
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

  const regionColor = result ? getRegionColor(result.operatingRegion) : 'gray';

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔧</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Transistor Bias Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate BJT transistor biasing parameters including Q-point, currents, and voltages. Supports voltage divider, fixed, and emitter bias configurations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Result Display */}
            {result && !error && (
              <div className={`rounded-xl border shadow-lg p-6 text-white space-y-4 ${
                regionColor === 'green' ? 'bg-green-600 border-green-500' :
                regionColor === 'yellow' ? 'bg-yellow-600 border-yellow-500' :
                'bg-red-600 border-red-500'
              }`}>
                <div>
                  <p className="text-white/80 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Vce (Collector-Emitter)
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.vce, 2)}
                  </div>
                  <div className="text-xl text-white/90">
                    V (Volts)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">Region:</span>
                    <span className="font-semibold">{getRegionLabel(result.operatingRegion)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Ic:</span>
                    <span className="font-semibold">{formatNumber(result.ic, 3)} mA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Ib:</span>
                    <span className="font-semibold">{formatNumber(result.ib, 3)} mA</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-gray-900 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Result"}
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
            
            {/* Bias Type Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Bias Configuration
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => handleBiasTypeChange('voltage-divider')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    inputs.biasType === 'voltage-divider'
                      ? 'border-primary bg-primary/5 text-primary font-semibold'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-sm font-semibold">Voltage Divider</div>
                  <div className="text-xs mt-1 opacity-75">Most stable</div>
                </button>
                <button
                  onClick={() => handleBiasTypeChange('fixed')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    inputs.biasType === 'fixed'
                      ? 'border-primary bg-primary/5 text-primary font-semibold'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-sm font-semibold">Fixed Bias</div>
                  <div className="text-xs mt-1 opacity-75">Simple circuit</div>
                </button>
                <button
                  onClick={() => handleBiasTypeChange('emitter')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    inputs.biasType === 'emitter'
                      ? 'border-primary bg-primary/5 text-primary font-semibold'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-sm font-semibold">Emitter Bias</div>
                  <div className="text-xs mt-1 opacity-75">Temperature stable</div>
                </button>
              </div>
            </div>

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Circuit Parameters
              </h3>
              
              {/* Vcc */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supply Voltage (Vcc)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.vcc || ''}
                    onChange={(e) => handleInputChange('vcc', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="12"
                    min="0"
                    step="0.1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    V
                  </div>
                </div>
              </div>

              {/* Voltage Divider Bias Inputs */}
              {inputs.biasType === 'voltage-divider' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        R1 (Base Divider)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={inputs.r1 || ''}
                          onChange={(e) => handleInputChange('r1', parseFloat(e.target.value) || undefined)}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="10000"
                          min="0"
                          step="100"
                        />
                        <div className="px-3 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center text-sm">
                          Ω
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        R2 (Base Divider)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={inputs.r2 || ''}
                          onChange={(e) => handleInputChange('r2', parseFloat(e.target.value) || undefined)}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="5000"
                          min="0"
                          step="100"
                        />
                        <div className="px-3 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center text-sm">
                          Ω
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Fixed/Emitter Bias Rb Input */}
              {(inputs.biasType === 'fixed' || inputs.biasType === 'emitter') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rb (Base Resistor)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.rb || ''}
                      onChange={(e) => handleInputChange('rb', parseFloat(e.target.value) || undefined)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="470000"
                      min="0"
                      step="1000"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      Ω
                    </div>
                  </div>
                </div>
              )}

              {/* Rc and Re */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rc (Collector)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.rc || ''}
                      onChange={(e) => handleInputChange('rc', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="1000"
                      min="0"
                      step="100"
                    />
                    <div className="px-3 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center text-sm">
                      Ω
                    </div>
                  </div>
                </div>
                {inputs.biasType !== 'fixed' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Re (Emitter)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.re || ''}
                        onChange={(e) => handleInputChange('re', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="500"
                        min="0"
                        step="100"
                      />
                      <div className="px-3 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center text-sm">
                        Ω
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Beta and Vbe */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    β (Beta / hFE)
                  </label>
                  <input
                    type="number"
                    value={inputs.beta || ''}
                    onChange={(e) => handleInputChange('beta', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="100"
                    min="0"
                    step="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vbe (Base-Emitter)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.vbe || ''}
                      onChange={(e) => handleInputChange('vbe', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.7"
                      min="0"
                      step="0.1"
                    />
                    <div className="px-3 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center text-sm">
                      V
                    </div>
                  </div>
                </div>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Q-Point:</strong> Operating point calculated successfully
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

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Example Configurations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {biasPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      Vcc: {preset.vcc}V | β: {preset.beta}
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
                  Q-Point Analysis
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Vce</div>
                    <div className="text-lg font-bold text-blue-900">{formatNumber(result.vce, 3)}</div>
                    <div className="text-xs text-blue-700">V</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Ic</div>
                    <div className="text-lg font-bold text-green-900">{formatNumber(result.ic, 3)}</div>
                    <div className="text-xs text-green-700">mA</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1">Ib</div>
                    <div className="text-lg font-bold text-purple-900">{formatNumber(result.ib, 3)}</div>
                    <div className="text-xs text-purple-700">mA</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1">Vb</div>
                    <div className="text-lg font-bold text-orange-900">{formatNumber(result.vb, 3)}</div>
                    <div className="text-xs text-orange-700">V</div>
                  </div>
                  <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                    <div className="text-xs text-pink-600 uppercase tracking-wider mb-1">Ve</div>
                    <div className="text-lg font-bold text-pink-900">{formatNumber(result.ve, 3)}</div>
                    <div className="text-xs text-pink-700">V</div>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="text-xs text-indigo-600 uppercase tracking-wider mb-1">Vc</div>
                    <div className="text-lg font-bold text-indigo-900">{formatNumber(result.vc, 3)}</div>
                    <div className="text-xs text-indigo-700">V</div>
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
                            Vce: {formatNumber(entry.result.vce, 2)}V | {getRegionLabel(entry.result.operatingRegion)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.vcc}V supply | Ic: {formatNumber(entry.result.ic, 2)}mA
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

      <TransistorBiasCalculatorSEO />
      <RelatedTools
        currentTool="transistor-bias-calculator"
        tools={['ohms-law-calculator', 'voltage-divider-calculator', 'led-resistor-calculator', 'power-calculator-electrical']}
      />
    </>
  );
}

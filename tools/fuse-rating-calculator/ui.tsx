"use client";

import { useState, useEffect, useCallback } from "react";
import { FuseInputs, FuseResult, InputMode, FuseType } from "./types";
import {
  calculateFuseRating,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  getStandardFuseRatings,
  saveSettings,
  loadSettings
} from "./logic";
import FuseRatingCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FuseRatingCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [mode, setMode] = useState<InputMode>(
    (savedSettings.mode as InputMode) || 'power_voltage'
  );
  const [inputs, setInputs] = useState<FuseInputs>({
    mode: mode,
    power: savedSettings.power || 1000,
    voltage: savedSettings.voltage || 220,
    current: savedSettings.current || 10,
    safetyFactor: savedSettings.safetyFactor || 1.25,
    fuseType: (savedSettings.fuseType as FuseType) || 'fast'
  });
  
  const [result, setResult] = useState<FuseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getPresets();
  const standardFuses = getStandardFuseRatings();

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
        const calculatedResult = calculateFuseRating(inputs);
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

  const handleModeChange = (newMode: InputMode) => {
    setMode(newMode);
    setInputs(prev => ({ ...prev, mode: newMode }));
    setResult(null);
    setError(null);
  };

  const handleInputChange = (field: keyof FuseInputs, value: number | FuseType) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      mode: mode,
      power: 1000,
      voltage: 220,
      current: 10,
      safetyFactor: 1.25,
      fuseType: 'fast'
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    if (preset.mode === 'power_voltage') {
      setMode('power_voltage');
      setInputs({
        mode: 'power_voltage',
        power: preset.power,
        voltage: preset.voltage,
        safetyFactor: inputs.safetyFactor,
        fuseType: inputs.fuseType
      });
    } else {
      setMode('current');
      setInputs({
        mode: 'current',
        current: preset.current,
        safetyFactor: inputs.safetyFactor,
        fuseType: inputs.fuseType
      });
    }
  };

  const handleCopy = () => {
    if (result) {
      const text = `Recommended Fuse: ${result.recommendedFuse}A ${inputs.fuseType === 'fast' ? 'Fast Blow' : 'Slow Blow'}`;
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
      downloadFile(text, 'fuse_rating_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: typeof history[0]) => {
    setMode(entry.inputs.mode);
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
              <h3 className="font-semibold text-blue-900 mb-1">Fuse Rating Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate the correct fuse rating for electrical circuits and devices. Get instant recommendations with safety margins to prevent overload and equipment damage.
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
                    Recommended Fuse
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {result.recommendedFuse}A
                  </div>
                  <div className="text-xl text-primary-100">
                    {inputs.fuseType === 'fast' ? 'Fast Blow' : 'Slow Blow'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Calculated Current:</span>
                    <span className="font-semibold">{formatNumber(result.calculatedCurrent, 2)} A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Adjusted Current:</span>
                    <span className="font-semibold">{formatNumber(result.adjustedCurrent, 2)} A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Safety Margin:</span>
                    <span className="font-semibold">{formatNumber(result.safetyMargin, 1)}%</span>
                  </div>
                  {result.nextHigherFuse && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Next Higher:</span>
                      <span className="font-semibold">{result.nextHigherFuse}A</span>
                    </div>
                  )}
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
            
            {/* Mode Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Mode
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleModeChange('power_voltage')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'power_voltage'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Power + Voltage
                </button>
                <button
                  onClick={() => handleModeChange('current')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'current'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Direct Current
                </button>
              </div>
            </div>

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Circuit Parameters
              </h3>
              
              {mode === 'power_voltage' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Power (P)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.power || ''}
                        onChange={(e) => handleInputChange('power', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1000"
                        min="0"
                        step="10"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        W
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voltage (V)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.voltage || ''}
                        onChange={(e) => handleInputChange('voltage', parseFloat(e.target.value) || 0)}
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
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current (I)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.current || ''}
                      onChange={(e) => handleInputChange('current', parseFloat(e.target.value) || 0)}
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
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Safety Factor
                </label>
                <select
                  value={inputs.safetyFactor}
                  onChange={(e) => handleInputChange('safetyFactor', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="1.0">1.0 (No margin)</option>
                  <option value="1.25">1.25 (Standard - Recommended)</option>
                  <option value="1.5">1.5 (High safety)</option>
                  <option value="1.6">1.6 (Very high safety)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Standard 1.25× factor prevents nuisance blowing
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuse Type
                </label>
                <select
                  value={inputs.fuseType}
                  onChange={(e) => handleInputChange('fuseType', e.target.value as FuseType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="fast">Fast Blow (Standard circuits)</option>
                  <option value="slow">Slow Blow (Motors, inductive loads)</option>
                </select>
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

            {/* Warning Display */}
            {result?.warning && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-2 text-yellow-800">
                  <span className="text-lg">⚠️</span>
                  <div>
                    <div className="font-semibold mb-1">Warning</div>
                    <div className="text-sm">{result.warning}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Appliances
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

            {/* Standard Fuse Ratings */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Standard Fuse Ratings
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {standardFuses.slice(0, 15).map((rating) => (
                    <div
                      key={rating}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        rating === result.recommendedFuse
                          ? 'bg-primary text-white'
                          : rating === result.nextHigherFuse
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {rating}A
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span className="text-gray-600">Recommended</span>
                  </div>
                  {result.nextHigherFuse && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                      <span className="text-gray-600">Next Higher</span>
                    </div>
                  )}
                </div>
              </div>
            )}

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
                            Fuse: {entry.result.recommendedFuse}A
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.mode === 'power_voltage' 
                            ? `${entry.inputs.power}W @ ${entry.inputs.voltage}V`
                            : `${entry.inputs.current}A`
                          } • Current: {formatNumber(entry.result.calculatedCurrent, 2)}A
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

      <FuseRatingCalculatorSEO />
      <RelatedTools
        currentTool="fuse-rating-calculator"
        tools={['energy-consumption-calculator', 'voltage-divider-calculator', 'power-factor-calculator']}
      />
    </>
  );
}

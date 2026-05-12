"use client";

import { useState, useEffect, useCallback } from "react";
import { RFPowerInputs, RFPowerResult, CalculationMode } from "./types";
import {
  calculateRFPower,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  HistoryEntry
} from "./logic";
import RFPowerCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RFPowerCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>('watts');
  const [inputs, setInputs] = useState<RFPowerInputs>({
    mode: 'watts',
    watts: 1,
    resistance: 50,
    precision: 6
  });
  
  const [result, setResult] = useState<RFPowerResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());

  const presets = getPresets(mode);

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
        const calculatedResult = calculateRFPower(inputs);
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

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    
    if (newMode === 'watts') {
      setInputs({ 
        mode: newMode, 
        watts: 1,
        resistance: 50,
        precision: 6
      });
    } else if (newMode === 'dbm') {
      setInputs({ 
        mode: newMode, 
        dbm: 30,
        resistance: 50,
        precision: 6
      });
    } else if (newMode === 'dbw') {
      setInputs({ 
        mode: newMode, 
        dbw: 0,
        resistance: 50,
        precision: 6
      });
    } else {
      setInputs({ 
        mode: newMode, 
        voltage: 5,
        resistance: 50,
        precision: 6
      });
    }
    
    setResult(null);
    setError(null);
  };

  const handleInputChange = (field: keyof RFPowerInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (mode === 'watts') {
      setInputs({ 
        mode, 
        watts: 1,
        resistance: 50,
        precision: 6
      });
    } else if (mode === 'dbm') {
      setInputs({ 
        mode, 
        dbm: 30,
        resistance: 50,
        precision: 6
      });
    } else if (mode === 'dbw') {
      setInputs({ 
        mode, 
        dbw: 0,
        resistance: 50,
        precision: 6
      });
    } else {
      setInputs({ 
        mode, 
        voltage: 5,
        resistance: 50,
        precision: 6
      });
    }
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    const newInputs: RFPowerInputs = { 
      mode,
      precision: inputs.precision,
      resistance: inputs.resistance,
    };

    if ('watts' in preset) {
      newInputs.watts = preset.watts;
    }
    if ('dbm' in preset) {
      newInputs.dbm = preset.dbm;
    }
    if ('dbw' in preset) {
      newInputs.dbw = preset.dbw;
    }
    if ('voltage' in preset) {
      newInputs.voltage = preset.voltage;
    }
    if ('resistance' in preset) {
      newInputs.resistance = preset.resistance;
    }

    setInputs(newInputs);
  };

  const handleCopy = () => {
    if (result) {
      const text = `Power: ${formatNumber(result.watts, inputs.precision || 6)} W, ${formatNumber(result.dbm, inputs.precision || 6)} dBm, ${formatNumber(result.dbw, inputs.precision || 6)} dBW`;
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
      downloadFile(text, 'rf_power_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setMode(entry.inputs.mode);
    setInputs(entry.inputs);
    setShowHistory(false);
  };

  const getModeLabel = (m: CalculationMode) => {
    switch (m) {
      case 'watts': return 'Watts';
      case 'dbm': return 'dBm';
      case 'dbw': return 'dBW';
      case 'voltage': return 'Voltage';
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📻</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">RF Power Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate and convert RF signal power between Watts, dBm, and dBW. Includes voltage-to-power conversion for RF engineering and wireless systems.
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
                    RF Power
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.watts, inputs.precision || 6)}
                  </div>
                  <div className="text-xl text-primary-100">
                    Watts
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power (W):</span>
                    <span className="font-semibold">{formatNumber(result.watts, inputs.precision || 6)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power (dBm):</span>
                    <span className="font-semibold">{formatNumber(result.dbm, inputs.precision || 6)} dBm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power (dBW):</span>
                    <span className="font-semibold">{formatNumber(result.dbw, inputs.precision || 6)} dBW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power (mW):</span>
                    <span className="font-semibold">{formatNumber(result.milliwatts, inputs.precision || 6)} mW</span>
                  </div>
                  {result.voltage !== undefined && result.resistance !== undefined && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Voltage:</span>
                        <span className="font-semibold">{result.voltage} V</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Resistance:</span>
                        <span className="font-semibold">{result.resistance} Ω</span>
                      </div>
                    </>
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
                Calculation Mode
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => handleModeChange('watts')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'watts'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Watts
                </button>
                <button
                  onClick={() => handleModeChange('dbm')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'dbm'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  dBm
                </button>
                <button
                  onClick={() => handleModeChange('dbw')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'dbw'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  dBW
                </button>
                <button
                  onClick={() => handleModeChange('voltage')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    mode === 'voltage'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Voltage
                </button>
              </div>
            </div>

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Parameters
              </h3>
              
              {mode === 'watts' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Power (Watts)
                  </label>
                  <input
                    type="number"
                    value={inputs.watts || ''}
                    onChange={(e) => handleInputChange('watts', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1"
                    step="any"
                    min="0"
                  />
                </div>
              )}

              {mode === 'dbm' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Power (dBm)
                  </label>
                  <input
                    type="number"
                    value={inputs.dbm || ''}
                    onChange={(e) => handleInputChange('dbm', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="30"
                    step="any"
                  />
                </div>
              )}

              {mode === 'dbw' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Power (dBW)
                  </label>
                  <input
                    type="number"
                    value={inputs.dbw || ''}
                    onChange={(e) => handleInputChange('dbw', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0"
                    step="any"
                  />
                </div>
              )}

              {mode === 'voltage' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voltage (V)
                    </label>
                    <input
                      type="number"
                      value={inputs.voltage || ''}
                      onChange={(e) => handleInputChange('voltage', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      step="any"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resistance (Ω)
                    </label>
                    <input
                      type="number"
                      value={inputs.resistance || ''}
                      onChange={(e) => handleInputChange('resistance', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="50"
                      step="any"
                      min="0.001"
                    />
                  </div>
                </>
              )}

              {/* Precision Selector */}
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
                  <option value="6">6 decimal places</option>
                  <option value="8">8 decimal places</option>
                  <option value="10">10 decimal places</option>
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

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Examples
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
                            {getModeLabel(entry.result.mode)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.result.watts, 3)} W, {formatNumber(entry.result.dbm, 2)} dBm, {formatNumber(entry.result.dbw, 2)} dBW
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

      <RFPowerCalculatorSEO />
      <RelatedTools
        currentTool="rf-power-calculator"
        tools={['antenna-length-calculator', 'impedance-calculator', 'decibel-db-calculator', 'amplifier-gain-calculator']}
      />
    </>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { OpAmpInputs, OpAmpResult, CircuitType, ResistanceUnit } from "./types";
import {
  calculateOpAmp,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getUnitLabel,
  debounce,
  HistoryEntry
} from "./logic";
import OpAmpCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function OpAmpCalculatorUI() {
  const [circuitType, setCircuitType] = useState<CircuitType>('inverting');
  const [inputs, setInputs] = useState<OpAmpInputs>({
    circuitType: 'inverting',
    vin: 1,
    r1: 1,
    r2: 10,
    r1Unit: 'kohm',
    r2Unit: 'kohm'
  });
  
  const [result, setResult] = useState<OpAmpResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());

  const presets = getPresets(circuitType);

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
        const calculatedResult = calculateOpAmp(inputs);
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

  const handleCircuitTypeChange = (newType: CircuitType) => {
    setCircuitType(newType);
    
    // Reset inputs based on circuit type
    if (newType === 'inverting') {
      setInputs({ circuitType: newType, vin: 1, r1: 1, r2: 10, r1Unit: 'kohm', r2Unit: 'kohm' });
    } else if (newType === 'non-inverting') {
      setInputs({ circuitType: newType, vin: 1, r1: 1, r2: 9, r1Unit: 'kohm', r2Unit: 'kohm' });
    } else if (newType === 'voltage-follower') {
      setInputs({ circuitType: newType, vin: 5 });
    } else if (newType === 'summing') {
      setInputs({ 
        circuitType: newType, 
        vin1: 1, 
        vin2: 1, 
        rf: 10, 
        ri1: 10, 
        ri2: 10,
        rfUnit: 'kohm',
        ri1Unit: 'kohm',
        ri2Unit: 'kohm'
      });
    }
    
    setResult(null);
    setError(null);
  };

  const handleInputChange = (field: keyof OpAmpInputs, value: number | ResistanceUnit) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (circuitType === 'inverting') {
      setInputs({ circuitType, vin: 1, r1: 1, r2: 10, r1Unit: 'kohm', r2Unit: 'kohm' });
    } else if (circuitType === 'non-inverting') {
      setInputs({ circuitType, vin: 1, r1: 1, r2: 9, r1Unit: 'kohm', r2Unit: 'kohm' });
    } else if (circuitType === 'voltage-follower') {
      setInputs({ circuitType, vin: 5 });
    } else if (circuitType === 'summing') {
      setInputs({ 
        circuitType, 
        vin1: 1, 
        vin2: 1, 
        rf: 10, 
        ri1: 10, 
        ri2: 10,
        rfUnit: 'kohm',
        ri1Unit: 'kohm',
        ri2Unit: 'kohm'
      });
    }
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    if (circuitType === 'voltage-follower') {
      setInputs({ circuitType, vin: preset.vin });
    } else if (circuitType === 'summing') {
      setInputs({ 
        circuitType, 
        ...preset
      });
    } else {
      setInputs({ 
        circuitType, 
        vin: preset.vin, 
        r1: preset.r1, 
        r2: preset.r2,
        r1Unit: preset.r1Unit,
        r2Unit: preset.r2Unit
      });
    }
  };

  const handleCopy = () => {
    if (result) {
      const text = `Gain: ${formatNumber(result.gain, 4)}, Vout: ${formatNumber(result.vout, 4)} V`;
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
      downloadFile(text, 'op_amp_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
    setCircuitType(entry.inputs.circuitType);
    setInputs(entry.inputs);
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
              <h3 className="font-semibold text-blue-900 mb-1">Op-Amp Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate gain and output voltage for operational amplifier circuits. Supports inverting, non-inverting, voltage follower, and summing amplifier configurations.
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
                    {circuitType === 'voltage-follower' ? 'Output Voltage' : 'Gain'}
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {circuitType === 'voltage-follower' ? formatNumber(result.vout, 4) : formatNumber(result.gain, 4)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {circuitType === 'voltage-follower' ? 'Volts' : 'V/V'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Output Voltage:</span>
                    <span className="font-semibold">{formatNumber(result.vout, 4)} V</span>
                  </div>
                  {circuitType !== 'voltage-follower' && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Gain:</span>
                      <span className="font-semibold">{formatNumber(result.gain, 4)}</span>
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
            
            {/* Circuit Type Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Circuit Configuration
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => handleCircuitTypeChange('inverting')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    circuitType === 'inverting'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Inverting
                </button>
                <button
                  onClick={() => handleCircuitTypeChange('non-inverting')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    circuitType === 'non-inverting'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Non-Inverting
                </button>
                <button
                  onClick={() => handleCircuitTypeChange('voltage-follower')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    circuitType === 'voltage-follower'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Voltage Follower
                </button>
                <button
                  onClick={() => handleCircuitTypeChange('summing')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                    circuitType === 'summing'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Summing
                </button>
              </div>
            </div>

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Parameters
              </h3>
              
              {/* Inverting & Non-Inverting Inputs */}
              {(circuitType === 'inverting' || circuitType === 'non-inverting') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input Voltage (Vin)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.vin || ''}
                        onChange={(e) => handleInputChange('vin', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1"
                        step="0.1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        V
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {circuitType === 'inverting' ? 'Input Resistor (R1)' : 'Ground Resistor (R1)'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.r1 || ''}
                        onChange={(e) => handleInputChange('r1', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="1"
                        min="0"
                        step="0.1"
                      />
                      <select
                        value={inputs.r1Unit}
                        onChange={(e) => handleInputChange('r1Unit', e.target.value as ResistanceUnit)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                      >
                        <option value="ohm">Ω</option>
                        <option value="kohm">kΩ</option>
                        <option value="mohm">MΩ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feedback Resistor (R2)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.r2 || ''}
                        onChange={(e) => handleInputChange('r2', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="10"
                        min="0"
                        step="0.1"
                      />
                      <select
                        value={inputs.r2Unit}
                        onChange={(e) => handleInputChange('r2Unit', e.target.value as ResistanceUnit)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                      >
                        <option value="ohm">Ω</option>
                        <option value="kohm">kΩ</option>
                        <option value="mohm">MΩ</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Voltage Follower Input */}
              {circuitType === 'voltage-follower' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Voltage (Vin)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.vin || ''}
                      onChange={(e) => handleInputChange('vin', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="5"
                      step="0.1"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      V
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-600">
                    Voltage follower has unity gain (Gain = 1)
                  </p>
                </div>
              )}

              {/* Summing Amplifier Inputs */}
              {circuitType === 'summing' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feedback Resistor (Rf)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.rf || ''}
                        onChange={(e) => handleInputChange('rf', parseFloat(e.target.value) || 0)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="10"
                        min="0"
                        step="0.1"
                      />
                      <select
                        value={inputs.rfUnit}
                        onChange={(e) => handleInputChange('rfUnit', e.target.value as ResistanceUnit)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                      >
                        <option value="ohm">Ω</option>
                        <option value="kohm">kΩ</option>
                        <option value="mohm">MΩ</option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Input 1</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Voltage (Vin1)</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={inputs.vin1 || ''}
                            onChange={(e) => handleInputChange('vin1', parseFloat(e.target.value) || 0)}
                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                            placeholder="1"
                            step="0.1"
                          />
                          <div className="px-3 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 text-sm flex items-center">
                            V
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Resistor (Ri1)</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={inputs.ri1 || ''}
                            onChange={(e) => handleInputChange('ri1', parseFloat(e.target.value) || 0)}
                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                            placeholder="10"
                            min="0"
                            step="0.1"
                          />
                          <select
                            value={inputs.ri1Unit}
                            onChange={(e) => handleInputChange('ri1Unit', e.target.value as ResistanceUnit)}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold text-sm"
                          >
                            <option value="ohm">Ω</option>
                            <option value="kohm">kΩ</option>
                            <option value="mohm">MΩ</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Input 2 (Optional)</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Voltage (Vin2)</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={inputs.vin2 || ''}
                            onChange={(e) => handleInputChange('vin2', parseFloat(e.target.value) || 0)}
                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                            placeholder="0"
                            step="0.1"
                          />
                          <div className="px-3 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 text-sm flex items-center">
                            V
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Resistor (Ri2)</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={inputs.ri2 || ''}
                            onChange={(e) => handleInputChange('ri2', parseFloat(e.target.value) || 0)}
                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                            placeholder="10"
                            min="0"
                            step="0.1"
                          />
                          <select
                            value={inputs.ri2Unit}
                            onChange={(e) => handleInputChange('ri2Unit', e.target.value as ResistanceUnit)}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold text-sm"
                          >
                            <option value="ohm">Ω</option>
                            <option value="kohm">kΩ</option>
                            <option value="mohm">MΩ</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Input 3 (Optional)</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Voltage (Vin3)</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={inputs.vin3 || ''}
                            onChange={(e) => handleInputChange('vin3', parseFloat(e.target.value) || 0)}
                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                            placeholder="0"
                            step="0.1"
                          />
                          <div className="px-3 py-2 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 text-sm flex items-center">
                            V
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Resistor (Ri3)</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={inputs.ri3 || ''}
                            onChange={(e) => handleInputChange('ri3', parseFloat(e.target.value) || 0)}
                            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                            placeholder="10"
                            min="0"
                            step="0.1"
                          />
                          <select
                            value={inputs.ri3Unit}
                            onChange={(e) => handleInputChange('ri3Unit', e.target.value as ResistanceUnit)}
                            className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold text-sm"
                          >
                            <option value="ohm">Ω</option>
                            <option value="kohm">kΩ</option>
                            <option value="mohm">MΩ</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

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
            {presets.length > 0 && (
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
                          <span className="font-semibold text-gray-900 capitalize">
                            {entry.result.circuitType.replace('-', ' ')}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Gain: {formatNumber(entry.result.gain, 4)}, Vout: {formatNumber(entry.result.vout, 4)} V
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

      <OpAmpCalculatorSEO />
      <RelatedTools
        currentTool="op-amp-calculator"
        tools={['amplifier-gain-calculator', 'voltage-divider-calculator', 'impedance-calculator']}
      />
    </>
  );
}

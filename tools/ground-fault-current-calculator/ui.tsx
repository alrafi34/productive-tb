"use client";

import { useState, useEffect, useCallback } from "react";
import { FaultCurrentInputs, FaultCurrentResult, CalculationMode } from "./types";
import {
  calculateFaultCurrent,
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
import GroundFaultCurrentCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function GroundFaultCurrentCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>('basic');
  const [inputs, setInputs] = useState<FaultCurrentInputs>({
    mode: 'basic',
    systemVoltage: 230,
    totalImpedance: 0.8,
    precision: 2
  });
  
  const [result, setResult] = useState<FaultCurrentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());

  const presets = getPresets(mode);

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
        const calculatedResult = calculateFaultCurrent(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [inputs]
  );

  useEffect(() => {
    debouncedCalculate();
  }, [inputs, debouncedCalculate]);

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    
    if (newMode === 'basic') {
      setInputs({ 
        mode: newMode, 
        systemVoltage: 230, 
        totalImpedance: 0.8, 
        precision: 2 
      });
    } else {
      setInputs({ 
        mode: newMode, 
        systemVoltage: 230, 
        sourceImpedance: 0.3,
        cableImpedance: 0.5,
        transformerImpedance: 4,
        transformerRating: 100,
        precision: 2 
      });
    }
    
    setResult(null);
    setError(null);
  };

  const handleInputChange = (field: keyof FaultCurrentInputs, value: number | undefined) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (mode === 'basic') {
      setInputs({ 
        mode, 
        systemVoltage: 230, 
        totalImpedance: 0.8, 
        precision: 2 
      });
    } else {
      setInputs({ 
        mode, 
        systemVoltage: 230, 
        sourceImpedance: 0.3,
        cableImpedance: 0.5,
        transformerImpedance: 4,
        transformerRating: 100,
        precision: 2 
      });
    }
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    const newInputs: FaultCurrentInputs = { 
      mode,
      precision: inputs.precision,
      systemVoltage: preset.systemVoltage,
    };

    if (mode === 'basic') {
      newInputs.totalImpedance = preset.totalImpedance;
    } else {
      if ('sourceImpedance' in preset) newInputs.sourceImpedance = preset.sourceImpedance;
      if ('cableImpedance' in preset) newInputs.cableImpedance = preset.cableImpedance;
      if ('transformerImpedance' in preset) newInputs.transformerImpedance = preset.transformerImpedance;
      if ('transformerRating' in preset) newInputs.transformerRating = preset.transformerRating;
    }

    setInputs(newInputs);
  };

  const handleCopy = () => {
    if (result) {
      const text = `Ground Fault Current: ${formatNumber(result.faultCurrent, inputs.precision)} A`;
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
      downloadFile(text, 'ground_fault_current_calculation.txt');
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
      case 'basic': return 'Basic Mode';
      case 'advanced': return 'Advanced Mode';
    }
  };

  const getFaultColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getFaultBgColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-50 border-green-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'high': return 'bg-orange-50 border-orange-200';
      case 'critical': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Ground Fault Current Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate ground fault current instantly using voltage and impedance. Professional electrical engineering calculator for fault analysis, safety design, and protection device selection.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 space-y-6">
            
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Ground Fault Current
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(result.faultCurrent, inputs.precision)}
                  </div>
                  <div className="text-xl text-primary-100">
                    Amperes (A)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Fault Level:</span>
                    <span className="font-semibold uppercase">{result.faultLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">System Type:</span>
                    <span className="font-semibold text-xs">{result.systemType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Impedance:</span>
                    <span className="font-semibold">{formatNumber(result.totalImpedance, inputs.precision)} Ω</span>
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

          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Calculation Mode
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => handleModeChange('basic')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors text-left ${
                    mode === 'basic'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">Basic Mode</div>
                  <div className="text-xs opacity-80">Simple voltage and impedance</div>
                </button>
                <button
                  onClick={() => handleModeChange('advanced')}
                  className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors text-left ${
                    mode === 'advanced'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-semibold">Advanced Mode</div>
                  <div className="text-xs opacity-80">Component-based impedance</div>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                System Parameters
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Voltage (V)
                </label>
                <input
                  type="number"
                  value={inputs.systemVoltage || ''}
                  onChange={(e) => handleInputChange('systemVoltage', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="230"
                  step="1"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">Line-to-neutral or line-to-line voltage</p>
              </div>

              {mode === 'basic' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Fault Loop Impedance (Ω)
                  </label>
                  <input
                    type="number"
                    value={inputs.totalImpedance || ''}
                    onChange={(e) => handleInputChange('totalImpedance', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="0.8"
                    step="0.01"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Total impedance of the fault current path</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source Impedance (Ω)
                    </label>
                    <input
                      type="number"
                      value={inputs.sourceImpedance || ''}
                      onChange={(e) => handleInputChange('sourceImpedance', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.3"
                      step="0.01"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Impedance of the supply source</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cable Impedance (Ω)
                    </label>
                    <input
                      type="number"
                      value={inputs.cableImpedance || ''}
                      onChange={(e) => handleInputChange('cableImpedance', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.5"
                      step="0.01"
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Impedance of cables and conductors</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transformer Impedance (%)
                      </label>
                      <input
                        type="number"
                        value={inputs.transformerImpedance || ''}
                        onChange={(e) => handleInputChange('transformerImpedance', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="4"
                        step="0.1"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transformer Rating (kVA)
                      </label>
                      <input
                        type="number"
                        value={inputs.transformerRating || ''}
                        onChange={(e) => handleInputChange('transformerRating', parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="100"
                        step="1"
                        min="0"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Transformer impedance percentage and rating for impedance calculation</p>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decimal Precision
                </label>
                <select
                  value={inputs.precision}
                  onChange={(e) => handleInputChange('precision', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="1">1 decimal place</option>
                  <option value="2">2 decimal places</option>
                  <option value="3">3 decimal places</option>
                  <option value="4">4 decimal places</option>
                </select>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> I_fault = V / Z_total (Ohm's Law)
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-800">
                  <span className="text-lg">⚠️</span>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {result && result.warning && !error && (
              <div className={`rounded-xl border p-4 ${getFaultBgColor(result.faultLevel)}`}>
                <div className="flex items-start gap-2">
                  <span className="text-lg mt-0.5">
                    {result.faultLevel === 'low' ? 'ℹ️' : 
                     result.faultLevel === 'medium' ? 'ℹ️' :
                     result.faultLevel === 'high' ? '⚠️' : '🚨'}
                  </span>
                  <span className={`font-medium ${getFaultColor(result.faultLevel)}`}>{result.warning}</span>
                </div>
              </div>
            )}

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
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.systemVoltage}V • {mode === 'basic' ? `${(preset as any).totalImpedance}Ω` : 'Multi-component'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Fault Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">System Voltage</div>
                    <div className="text-2xl font-bold text-blue-900">{result.systemVoltage}V</div>
                    <div className="text-xs text-blue-700">{result.systemType}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600 uppercase tracking-wider mb-1 font-semibold">Total Impedance</div>
                    <div className="text-2xl font-bold text-gray-900">{formatNumber(result.totalImpedance, inputs.precision)}Ω</div>
                    <div className="text-xs text-gray-700">Fault loop impedance</div>
                  </div>
                  <div className={`p-4 rounded-lg border ${getFaultBgColor(result.faultLevel)}`}>
                    <div className={`text-xs uppercase tracking-wider mb-1 font-semibold ${getFaultColor(result.faultLevel)}`}>Fault Level</div>
                    <div className={`text-2xl font-bold ${getFaultColor(result.faultLevel)}`}>{result.faultLevel.toUpperCase()}</div>
                    <div className={`text-xs ${getFaultColor(result.faultLevel)}`}>Safety classification</div>
                  </div>
                </div>
              </div>
            )}

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
                            {formatNumber(entry.result.faultCurrent, 2)} A • {getModeLabel(entry.result.mode)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.systemVoltage}V • {entry.result.faultLevel.toUpperCase()} • {entry.result.systemType}
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

      <GroundFaultCurrentCalculatorSEO />
      <RelatedTools
        currentTool="ground-fault-current-calculator"
        tools={['short-circuit-current-calculator', 'power-loss-calculator', 'ohms-law-calculator', 'electrical-efficiency-calculator']}
      />
    </>
  );
}
"use client";

import { useState, useEffect, useCallback } from "react";
import { SMPSInputs, SMPSResult, HistoryEntry, LoadType } from "./types";
import {
  calculateSMPS,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  getEfficiencyColor,
  getEfficiencyBgColor,
  debounce,
} from "./logic";
import SMPSCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SMPSCalculatorUI() {
  const [inputs, setInputs] = useState<SMPSInputs>({
    outputVoltage: 12,
    outputCurrent: 2,
    efficiency: 85,
    inputVoltage: 230,
    loadType: 'resistive'
  });
  
  const [result, setResult] = useState<SMPSResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());
  const [showAdvanced, setShowAdvanced] = useState(true);

  const presets = getPresets();

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
        const calculatedResult = calculateSMPS(inputs);
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

  const handleInputChange = (field: keyof SMPSInputs, value: number | LoadType | undefined) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      outputVoltage: 12,
      outputCurrent: 2,
      efficiency: 85,
      inputVoltage: 230,
      loadType: 'resistive'
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setInputs({
      outputVoltage: preset.outputVoltage,
      outputCurrent: preset.outputCurrent,
      efficiency: preset.efficiency,
      inputVoltage: preset.inputVoltage,
      loadType: preset.loadType
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = `SMPS: ${formatNumber(result.outputPower, 2)}W output, ${formatNumber(result.inputPower, 2)}W input, ${inputs.efficiency}% efficiency`;
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
      downloadFile(text, 'smps_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'smps_calculation.csv');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: HistoryEntry) => {
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
              <h3 className="font-semibold text-blue-900 mb-1">SMPS Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate switching power supply parameters including output power, efficiency, input current, and load analysis for power supply design.
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
                    Output Power
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.outputPower, 2)}W
                  </div>
                  <div className="text-xl text-primary-100">
                    {result.efficiencyRating} Efficiency
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Input Power:</span>
                    <span className="font-semibold">{formatNumber(result.inputPower, 2)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power Loss:</span>
                    <span className="font-semibold">{formatNumber(result.powerLoss, 2)} W</span>
                  </div>
                  {result.inputCurrent && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Input Current:</span>
                      <span className="font-semibold">{formatNumber(result.inputCurrent, 3)} A</span>
                    </div>
                  )}
                </div>

                {/* Efficiency Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-primary-100 mb-1">
                    <span>Efficiency</span>
                    <span>{inputs.efficiency}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-500"
                      style={{ width: `${Math.min(inputs.efficiency, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-primary-100 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
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
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ⚙️ {showAdvanced ? 'Hide' : 'Show'} Advanced
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
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                SMPS Parameters
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Output Voltage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Output Voltage
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.outputVoltage}
                      onChange={(e) => handleInputChange('outputVoltage', parseFloat(e.target.value) || 0)}
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

                {/* Output Current */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Output Current
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputs.outputCurrent}
                      onChange={(e) => handleInputChange('outputCurrent', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2"
                      min="0"
                      step="0.1"
                    />
                    <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                      A
                    </div>
                  </div>
                </div>

                {/* Efficiency */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Efficiency: {inputs.efficiency}%
                  </label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="range"
                      min="50"
                      max="100"
                      step="1"
                      value={inputs.efficiency}
                      onChange={(e) => handleInputChange('efficiency', parseInt(e.target.value))}
                      className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <input
                      type="number"
                      value={inputs.efficiency}
                      onChange={(e) => handleInputChange('efficiency', parseFloat(e.target.value) || 50)}
                      className="w-20 px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-center font-mono"
                      min="50"
                      max="100"
                      step="1"
                    />
                  </div>
                </div>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Pin = Pout / η, where Pout = Vout × Iout
                  </div>
                </div>
              )}
            </div>

            {/* Advanced Options */}
            {showAdvanced && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Advanced Options
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Input Voltage */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input Voltage (Optional)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.inputVoltage || ''}
                        onChange={(e) => handleInputChange('inputVoltage', parseFloat(e.target.value) || undefined)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="230"
                        min="0"
                        step="1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        V
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">For input current calculation</p>
                  </div>

                  {/* Load Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Load Type
                    </label>
                    <select
                      value={inputs.loadType}
                      onChange={(e) => handleInputChange('loadType', e.target.value as LoadType)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                    >
                      <option value="resistive">Resistive Load</option>
                      <option value="inductive">Inductive Load</option>
                      <option value="mixed">Mixed Load</option>
                    </select>
                  </div>
                </div>
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

            {/* Warnings */}
            {result && result.warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Design Considerations</span>
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

            {/* Efficiency Rating */}
            {result && !error && (
              <div className={`border rounded-xl p-6 ${getEfficiencyBgColor(inputs.efficiency)}`}>
                <h3 className="font-semibold text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Efficiency Analysis
                </h3>
                
                <div className="flex items-center gap-4">
                  <div className={`text-4xl font-bold ${getEfficiencyColor(inputs.efficiency)}`}>
                    {result.efficiencyRating}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-700">
                      {inputs.efficiency >= 95 && (
                        <p>✓ Excellent efficiency! Modern high-performance SMPS with minimal losses.</p>
                      )}
                      {inputs.efficiency >= 90 && inputs.efficiency < 95 && (
                        <p>✓ Very good efficiency. Typical for quality switching power supplies.</p>
                      )}
                      {inputs.efficiency >= 85 && inputs.efficiency < 90 && (
                        <p>✓ Good efficiency. Acceptable for most applications.</p>
                      )}
                      {inputs.efficiency >= 80 && inputs.efficiency < 85 && (
                        <p>⚠ Fair efficiency. Consider design improvements for better performance.</p>
                      )}
                      {inputs.efficiency >= 70 && inputs.efficiency < 80 && (
                        <p>⚠ Poor efficiency. High losses - design optimization recommended.</p>
                      )}
                      {inputs.efficiency < 70 && (
                        <p>⚠ Very poor efficiency. Significant energy waste - major design changes needed.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Power Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Power Analysis
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Input Power</div>
                    <div className="text-lg font-bold text-blue-900">{formatNumber(result.inputPower, 2)}</div>
                    <div className="text-xs text-blue-700">Watts</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Output Power</div>
                    <div className="text-lg font-bold text-green-900">{formatNumber(result.outputPower, 2)}</div>
                    <div className="text-xs text-green-700">Watts</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-xs text-red-600 uppercase tracking-wider mb-1">Power Loss</div>
                    <div className="text-lg font-bold text-red-900">{formatNumber(result.powerLoss, 2)}</div>
                    <div className="text-xs text-red-700">Watts ({formatNumber(result.lossPercentage, 2)}%)</div>
                  </div>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common SMPS Examples
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
                      {preset.outputVoltage}V • {preset.outputCurrent}A • {preset.efficiency}%
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
                            {formatNumber(entry.result.outputPower, 2)}W • {entry.inputs.efficiency}%
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.outputVoltage}V • {entry.inputs.outputCurrent}A • {entry.result.efficiencyRating}
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

      <SMPSCalculatorSEO />
      <RelatedTools
        currentTool="smps-calculator"
        tools={['power-supply-calculator', 'transformer-efficiency-calculator', 'power-factor-calculator', 'voltage-regulation-calculator']}
      />
    </>
  );
}
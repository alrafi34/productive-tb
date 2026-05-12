"use client";

import { useState, useEffect, useCallback } from "react";
import { ZenerDiodeInputs, ZenerDiodeResult } from "./types";
import {
  calculateZenerDiode,
  validateInputs,
  getZenerPresets,
  getCommonZenerVoltages,
  getCommonInputVoltages,
  getStatusColor,
  getStatusLabel,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce
} from "./logic";
import ZenerDiodeCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ZenerDiodeCalculatorUI() {
  const [inputs, setInputs] = useState<ZenerDiodeInputs>({
    inputVoltage: 12,
    zenerVoltage: 5.1,
    seriesResistor: 220,
    loadResistance: 1000,
    zenerMinCurrent: 5,
    zenerMaxPower: 0.5
  });
  
  const [result, setResult] = useState<ZenerDiodeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const zenerPresets = getZenerPresets();
  const commonZenerVoltages = getCommonZenerVoltages();
  const commonInputVoltages = getCommonInputVoltages();

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
        const calculatedResult = calculateZenerDiode(inputs);
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

  const handleInputChange = (field: keyof ZenerDiodeInputs, value: number | undefined) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      inputVoltage: 12,
      zenerVoltage: 5.1,
      seriesResistor: 220,
      loadResistance: 1000,
      zenerMinCurrent: 5,
      zenerMaxPower: 0.5
    });
    setResult(null);
    setError(null);
    setShowAdvanced(false);
  };

  const handleApplyPreset = (preset: typeof zenerPresets[0]) => {
    setInputs(prev => ({
      ...prev,
      inputVoltage: preset.inputVoltage,
      zenerVoltage: preset.zenerVoltage,
      seriesResistor: preset.seriesResistor,
      loadResistance: preset.loadResistance
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Zener Regulation: ${formatNumber(result.outputVoltage, 2)}V | Status: ${getStatusLabel(result.regulationStatus)}`;
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
      downloadFile(text, 'zener_diode_calculation.txt');
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

  const statusColor = result ? getStatusColor(result.regulationStatus) : 'gray';

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Zener Diode Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate voltage regulation parameters for Zener diode circuits. Analyze current, power dissipation, and regulation stability.
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
                statusColor === 'green' ? 'bg-green-600 border-green-500' :
                statusColor === 'yellow' ? 'bg-yellow-600 border-yellow-500' :
                'bg-red-600 border-red-500'
              }`}>
                <div>
                  <p className="text-white/80 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Output Voltage
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.outputVoltage, 2)}
                  </div>
                  <div className="text-xl text-white/90">
                    V (Regulated)
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">Status:</span>
                    <span className="font-semibold">{getStatusLabel(result.regulationStatus)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Zener Current:</span>
                    <span className="font-semibold">{formatNumber(result.zenerCurrent, 2)} mA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Zener Power:</span>
                    <span className="font-semibold">{formatNumber(result.zenerPower, 4)} W</span>
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
              
              {/* Input Voltage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input Voltage (Vin)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.inputVoltage || ''}
                    onChange={(e) => handleInputChange('inputVoltage', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="12"
                    min="0"
                    step="0.1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    V
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {commonInputVoltages.map((voltage) => (
                    <button
                      key={voltage}
                      onClick={() => handleInputChange('inputVoltage', voltage)}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      {voltage}V
                    </button>
                  ))}
                </div>
              </div>

              {/* Zener Voltage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zener Voltage (Vz)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.zenerVoltage || ''}
                    onChange={(e) => handleInputChange('zenerVoltage', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="5.1"
                    min="0"
                    step="0.1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    V
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {commonZenerVoltages.slice(0, 8).map((voltage) => (
                    <button
                      key={voltage}
                      onClick={() => handleInputChange('zenerVoltage', voltage)}
                      className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                      {voltage}V
                    </button>
                  ))}
                </div>
              </div>

              {/* Series Resistor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Series Resistor (Rs)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.seriesResistor || ''}
                    onChange={(e) => handleInputChange('seriesResistor', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="220"
                    min="0"
                    step="10"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    Ω
                  </div>
                </div>
              </div>

              {/* Load Resistance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Load Resistance (RL) - Optional
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.loadResistance || ''}
                    onChange={(e) => handleInputChange('loadResistance', e.target.value ? parseFloat(e.target.value) : undefined)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1000"
                    min="0"
                    step="10"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    Ω
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  Leave empty if load current is specified
                </p>
              </div>

              {/* Advanced Options */}
              {showAdvanced && (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Load Current (IL) - Optional
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.loadCurrent || ''}
                        onChange={(e) => handleInputChange('loadCurrent', e.target.value ? parseFloat(e.target.value) : undefined)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="20"
                        min="0"
                        step="1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        mA
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zener Minimum Current
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.zenerMinCurrent || ''}
                        onChange={(e) => handleInputChange('zenerMinCurrent', parseFloat(e.target.value) || 5)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="5"
                        min="0"
                        step="1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        mA
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zener Maximum Power
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={inputs.zenerMaxPower || ''}
                        onChange={(e) => handleInputChange('zenerMaxPower', parseFloat(e.target.value) || 0.5)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="0.5"
                        min="0"
                        step="0.1"
                      />
                      <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                        W
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> I_total = (Vin - Vz) / Rs
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

            {/* Warnings Display */}
            {result && result.warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-yellow-900 font-semibold mb-2">
                  <span className="text-lg">⚠️</span>
                  <span>Warnings</span>
                </div>
                {result.warnings.map((warning, index) => (
                  <div key={index} className="text-sm text-yellow-800 pl-6">
                    • {warning}
                  </div>
                ))}
              </div>
            )}

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Configurations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {zenerPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">
                      {preset.inputVoltage}V → {preset.zenerVoltage}V
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
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Total Current</div>
                    <div className="text-lg font-bold text-blue-900">{formatNumber(result.totalCurrent, 3)}</div>
                    <div className="text-xs text-blue-700">mA (through Rs)</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Load Current</div>
                    <div className="text-lg font-bold text-green-900">{formatNumber(result.loadCurrent, 3)}</div>
                    <div className="text-xs text-green-700">mA (to load)</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1">Zener Current</div>
                    <div className="text-lg font-bold text-purple-900">{formatNumber(result.zenerCurrent, 3)}</div>
                    <div className="text-xs text-purple-700">mA (through Zener)</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1">Zener Power</div>
                    <div className="text-lg font-bold text-orange-900">{formatNumber(result.zenerPower, 4)}</div>
                    <div className="text-xs text-orange-700">W (dissipation)</div>
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
                            {formatNumber(entry.result.outputVoltage, 2)}V - {getStatusLabel(entry.result.regulationStatus)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.inputVoltage}V → {entry.inputs.zenerVoltage}V | Rs: {entry.inputs.seriesResistor}Ω
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

      <ZenerDiodeCalculatorSEO />
      <RelatedTools
        currentTool="zener-diode-calculator"
        tools={['diode-calculator', 'led-resistor-calculator', 'voltage-divider-calculator', 'ohms-law-calculator']}
      />
    </>
  );
}

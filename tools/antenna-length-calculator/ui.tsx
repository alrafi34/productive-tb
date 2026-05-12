"use client";

import { useState, useEffect, useCallback } from "react";
import { AntennaInputs, AntennaResult, AntennaType, FrequencyUnit, LengthUnit } from "./types";
import {
  calculateAntennaLength,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getAntennaTypeLabel,
  getFrequencyUnitLabel,
  getLengthUnitLabel,
  debounce,
  HistoryEntry
} from "./logic";
import AntennaLengthCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function AntennaLengthCalculatorUI() {
  const [inputs, setInputs] = useState<AntennaInputs>({
    frequency: 100,
    frequencyUnit: 'mhz',
    antennaType: 'quarter',
    velocityFactor: 1.0,
    lengthUnit: 'm',
    precision: 6
  });
  
  const [result, setResult] = useState<AntennaResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());

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
        const calculatedResult = calculateAntennaLength(inputs);
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

  const handleInputChange = (field: keyof AntennaInputs, value: number | AntennaType | FrequencyUnit | LengthUnit) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      frequency: 100,
      frequencyUnit: 'mhz',
      antennaType: 'quarter',
      velocityFactor: 1.0,
      lengthUnit: 'm',
      precision: 6
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setInputs(prev => ({
      ...prev,
      frequency: preset.frequency,
      frequencyUnit: preset.frequencyUnit,
    }));
  };

  const handleCopy = () => {
    if (result) {
      const text = `Frequency: ${inputs.frequency} ${getFrequencyUnitLabel(inputs.frequencyUnit)}, Antenna: ${getAntennaTypeLabel(inputs.antennaType)}, Length: ${formatNumber(result.antennaLength, inputs.precision)} ${getLengthUnitLabel(inputs.lengthUnit)}`;
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
      downloadFile(text, 'antenna_length_calculation.txt');
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
            <span className="text-2xl">📡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Antenna Length Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate optimal antenna length from frequency for RF engineering, IoT, and wireless communication. Supports quarter-wave, half-wave, and full-wave antennas.
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
                    Antenna Length
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.antennaLength, inputs.precision)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {getLengthUnitLabel(inputs.lengthUnit)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Wavelength:</span>
                    <span className="font-semibold">{formatNumber(result.wavelengthMeters, 4)} m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Frequency:</span>
                    <span className="font-semibold">{formatNumber(result.frequencyHz / 1e6, 2)} MHz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Type:</span>
                    <span className="font-semibold">{getAntennaTypeLabel(result.antennaType)}</span>
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
                Input Parameters
              </h3>
              
              {/* Frequency Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Frequency
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.frequency || ''}
                    onChange={(e) => handleInputChange('frequency', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="100"
                    step="any"
                  />
                  <select
                    value={inputs.frequencyUnit}
                    onChange={(e) => handleInputChange('frequencyUnit', e.target.value as FrequencyUnit)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                  >
                    <option value="hz">Hz</option>
                    <option value="khz">kHz</option>
                    <option value="mhz">MHz</option>
                    <option value="ghz">GHz</option>
                  </select>
                </div>
              </div>

              {/* Antenna Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Antenna Type
                </label>
                <select
                  value={inputs.antennaType}
                  onChange={(e) => handleInputChange('antennaType', e.target.value as AntennaType)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="quarter">Quarter Wave (λ/4)</option>
                  <option value="half">Half Wave (λ/2)</option>
                  <option value="full">Full Wave (λ)</option>
                  <option value="monopole">Monopole (λ/4)</option>
                  <option value="dipole">Dipole (λ/2)</option>
                </select>
              </div>

              {/* Velocity Factor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Velocity Factor (VF)
                </label>
                <input
                  type="number"
                  value={inputs.velocityFactor}
                  onChange={(e) => handleInputChange('velocityFactor', parseFloat(e.target.value) || 1.0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="1.0"
                  step="0.01"
                  min="0.1"
                  max="1.0"
                />
                <p className="mt-2 text-xs text-gray-600">
                  1.0 for air/vacuum, 0.66-0.95 for coaxial cables
                </p>
              </div>

              {/* Length Unit Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output Length Unit
                </label>
                <select
                  value={inputs.lengthUnit}
                  onChange={(e) => handleInputChange('lengthUnit', e.target.value as LengthUnit)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                >
                  <option value="m">meters (m)</option>
                  <option value="cm">centimeters (cm)</option>
                  <option value="mm">millimeters (mm)</option>
                  <option value="in">inches (in)</option>
                  <option value="ft">feet (ft)</option>
                </select>
              </div>

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
                Common Frequencies
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

            {/* Result Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Result Breakdown
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1">Wavelength</div>
                    <div className="text-lg font-bold text-blue-900">{formatNumber(result.wavelengthMeters, 4)}</div>
                    <div className="text-xs text-blue-700">meters</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Antenna Length</div>
                    <div className="text-lg font-bold text-green-900">{formatNumber(result.antennaLengthMeters, 4)}</div>
                    <div className="text-xs text-green-700">meters</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1">In Centimeters</div>
                    <div className="text-lg font-bold text-purple-900">{formatNumber(result.antennaLengthMeters * 100, 2)}</div>
                    <div className="text-xs text-purple-700">cm</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-xs text-orange-600 uppercase tracking-wider mb-1">In Inches</div>
                    <div className="text-lg font-bold text-orange-900">{formatNumber(result.antennaLengthMeters * 39.3701, 2)}</div>
                    <div className="text-xs text-orange-700">inches</div>
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
                            {entry.inputs.frequency} {getFrequencyUnitLabel(entry.inputs.frequencyUnit)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {getAntennaTypeLabel(entry.result.antennaType)}: {formatNumber(entry.result.antennaLengthMeters, 3)} m
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

      <AntennaLengthCalculatorSEO />
      <RelatedTools
        currentTool="antenna-length-calculator"
        tools={['clock-frequency-calculator', 'data-rate-calculator', 'impedance-calculator', 'capacitive-reactance-calculator']}
      />
    </>
  );
}

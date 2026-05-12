"use client";

import { useState, useEffect, useCallback } from "react";
import { MotorSpeedInputs, MotorSpeedResult } from "./types";
import {
  calculateMotorSpeed,
  validateInputs,
  MOTOR_PRESETS,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  debounce,
  saveSettings,
  loadSettings
} from "./logic";
import MotorSpeedCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function MotorSpeedCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<MotorSpeedInputs>({
    frequency: savedSettings.frequency || 50,
    poles: savedSettings.poles || 4,
    slip: savedSettings.slip || 3
  });
  
  const [result, setResult] = useState<MotorSpeedResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());
  const [unitMode, setUnitMode] = useState<'rpm' | 'rad/s'>('rpm');

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
        const calculatedResult = calculateMotorSpeed(inputs);
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

  // Save settings when inputs change
  useEffect(() => {
    saveSettings(inputs);
  }, [inputs]);

  const handleInputChange = (field: keyof MotorSpeedInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      frequency: 50,
      poles: 4,
      slip: 3
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof MOTOR_PRESETS[0]) => {
    setInputs({
      frequency: preset.frequency,
      poles: preset.poles,
      slip: preset.slip
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = unitMode === 'rpm'
        ? `Synchronous Speed: ${formatNumber(result.synchronousSpeed, 2)} RPM, Actual Speed: ${formatNumber(result.actualSpeed, 2)} RPM`
        : `Synchronous Speed: ${formatNumber(result.synchronousSpeedRadS, 2)} rad/s, Actual Speed: ${formatNumber(result.actualSpeedRadS, 2)} rad/s`;
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
      downloadFile(text, 'motor_speed_calculation.txt');
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
            <span className="text-2xl">⚙️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Motor Speed Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate motor speed (RPM) from frequency, number of poles, and slip. Get synchronous and actual motor speeds instantly.
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
                    {unitMode === 'rpm' ? 'Actual Motor Speed' : 'Actual Speed (Angular)'}
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {unitMode === 'rpm' 
                      ? formatNumber(result.actualSpeed, 2)
                      : formatNumber(result.actualSpeedRadS, 2)
                    }
                  </div>
                  <div className="text-xl text-primary-100">
                    {unitMode === 'rpm' ? 'RPM' : 'rad/s'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Synchronous Speed:</span>
                    <span className="font-semibold">
                      {unitMode === 'rpm' 
                        ? `${formatNumber(result.synchronousSpeed, 2)} RPM`
                        : `${formatNumber(result.synchronousSpeedRadS, 2)} rad/s`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Slip:</span>
                    <span className="font-semibold">{formatNumber(result.slip, 2)}%</span>
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
                  onClick={() => setUnitMode(unitMode === 'rpm' ? 'rad/s' : 'rpm')}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Switch to {unitMode === 'rpm' ? 'rad/s' : 'RPM'}
                </button>
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
                Motor Parameters
              </h3>
              
              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency (Hz)
                </label>
                <input
                  type="number"
                  value={inputs.frequency || ''}
                  onChange={(e) => handleInputChange('frequency', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                  placeholder="50"
                  min="0"
                  step="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supply frequency (typically 50 Hz or 60 Hz)
                </p>
              </div>

              {/* Number of Poles */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Poles
                </label>
                <select
                  value={inputs.poles}
                  onChange={(e) => handleInputChange('poles', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-semibold"
                >
                  <option value="2">2 Poles</option>
                  <option value="4">4 Poles</option>
                  <option value="6">6 Poles</option>
                  <option value="8">8 Poles</option>
                  <option value="10">10 Poles</option>
                  <option value="12">12 Poles</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Number of magnetic poles in the motor
                </p>
              </div>

              {/* Slip */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slip: {formatNumber(inputs.slip, 1)}%
                </label>
                <input
                  type="range"
                  value={inputs.slip}
                  onChange={(e) => handleInputChange('slip', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  min="0"
                  max="10"
                  step="0.1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>5%</span>
                  <span>10%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Motor slip percentage (0% for synchronous speed)
                </p>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> Ns = (120 × f) / P, N = Ns × (1 - s/100)
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
                Common Motor Configurations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MOTOR_PRESETS.map((preset, index) => (
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

            {/* Speed Comparison */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Speed Comparison
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Synchronous Speed</div>
                    <div className="text-2xl font-bold text-blue-900">{formatNumber(result.synchronousSpeed, 2)}</div>
                    <div className="text-xs text-blue-700 mt-1">RPM</div>
                    <div className="text-xs text-blue-600 mt-2">{formatNumber(result.synchronousSpeedRadS, 2)} rad/s</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Actual Speed</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.actualSpeed, 2)}</div>
                    <div className="text-xs text-green-700 mt-1">RPM</div>
                    <div className="text-xs text-green-600 mt-2">{formatNumber(result.actualSpeedRadS, 2)} rad/s</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-700">
                    <strong>Speed Difference:</strong> {formatNumber(result.synchronousSpeed - result.actualSpeed, 2)} RPM
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
                            {formatNumber(entry.result.actualSpeed, 2)} RPM
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.frequency} Hz • {entry.inputs.poles} Poles • {entry.inputs.slip}% Slip
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

      <MotorSpeedCalculatorSEO />
      <RelatedTools
        currentTool="motor-speed-calculator"
        tools={['electric-motor-power-calculator', 'frequency-calculator', 'power-factor-calculator']}
      />
    </>
  );
}

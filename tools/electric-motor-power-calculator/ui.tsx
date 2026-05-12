"use client";

import { useState, useEffect, useCallback } from "react";
import { MotorPowerInputs, MotorPowerResult, CalculationMode } from "./types";
import {
  calculateMotorPower,
  validateInputs,
  MOTOR_PRESETS,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  debounce,
  saveSettings,
  loadSettings
} from "./logic";
import ElectricMotorPowerCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ElectricMotorPowerCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [mode, setMode] = useState<CalculationMode>((savedSettings.mode as CalculationMode) || 'mechanical');
  const [mechanicalInputs, setMechanicalInputs] = useState({
    torque: savedSettings.mechanical?.torque || 10,
    speed: savedSettings.mechanical?.speed || 1500
  });
  const [electricalInputs, setElectricalInputs] = useState({
    voltage: savedSettings.electrical?.voltage || 220,
    current: savedSettings.electrical?.current || 5,
    efficiency: savedSettings.electrical?.efficiency || 0.9
  });
  const [horsepowerInputs, setHorsepowerInputs] = useState({
    horsepower: savedSettings.horsepower?.horsepower || 2
  });
  
  const [result, setResult] = useState<MotorPowerResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Build current inputs based on mode
  const getCurrentInputs = (): MotorPowerInputs => {
    switch (mode) {
      case 'mechanical':
        return { mode, mechanical: mechanicalInputs };
      case 'electrical':
        return { mode, electrical: electricalInputs };
      case 'horsepower':
        return { mode, horsepower: horsepowerInputs };
    }
  };

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const inputs = getCurrentInputs();
      const validationError = validateInputs(inputs);
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      
      try {
        const calculatedResult = calculateMotorPower(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150),
    [mode, mechanicalInputs, electricalInputs, horsepowerInputs]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [mode, mechanicalInputs, electricalInputs, horsepowerInputs, debouncedCalculate]);

  // Save settings when inputs change
  useEffect(() => {
    saveSettings(getCurrentInputs());
  }, [mode, mechanicalInputs, electricalInputs, horsepowerInputs]);

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
  };

  const handleReset = () => {
    setMechanicalInputs({ torque: 10, speed: 1500 });
    setElectricalInputs({ voltage: 220, current: 5, efficiency: 0.9 });
    setHorsepowerInputs({ horsepower: 2 });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof MOTOR_PRESETS[0]) => {
    setMode(preset.mode);
    switch (preset.mode) {
      case 'mechanical':
        setMechanicalInputs(preset.values as any);
        break;
      case 'electrical':
        setElectricalInputs(preset.values as any);
        break;
      case 'horsepower':
        setHorsepowerInputs(preset.values as any);
        break;
    }
  };

  const handleCopy = () => {
    if (result) {
      const text = `Motor Power: ${formatNumber(result.powerKW, 2)} kW (${formatNumber(result.powerWatts, 0)} W, ${formatNumber(result.powerHP, 2)} HP)`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      saveToHistory(getCurrentInputs(), result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const text = exportToText(getCurrentInputs(), result);
      downloadFile(text, 'motor_power_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(getCurrentInputs(), result);
      downloadFile(csv, 'motor_power_calculation.csv');
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
    if (entry.inputs.mechanical) setMechanicalInputs(entry.inputs.mechanical);
    if (entry.inputs.electrical) setElectricalInputs(entry.inputs.electrical);
    if (entry.inputs.horsepower) setHorsepowerInputs(entry.inputs.horsepower);
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
              <h3 className="font-semibold text-blue-900 mb-1">Electric Motor Power Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate motor power from torque & speed, voltage & current, or horsepower. Get instant results in Watts, kW, and HP.
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
                    Motor Power
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {formatNumber(result.powerKW, 2)}
                  </div>
                  <div className="text-xl text-primary-100">
                    kW
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Watts:</span>
                    <span className="font-semibold">{formatNumber(result.powerWatts, 0)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Horsepower:</span>
                    <span className="font-semibold">{formatNumber(result.powerHP, 2)} HP</span>
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
            
            {/* Mode Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Calculation Mode
              </h3>
              
              <select
                value={mode}
                onChange={(e) => handleModeChange(e.target.value as CalculationMode)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold text-lg"
              >
                <option value="mechanical">Mechanical (Torque + Speed)</option>
                <option value="electrical">Electrical (Voltage + Current)</option>
                <option value="horsepower">Horsepower Conversion</option>
              </select>
            </div>

            {/* Input Panel - Mechanical */}
            {mode === 'mechanical' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Mechanical Parameters
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Torque (Nm)
                  </label>
                  <input
                    type="number"
                    value={mechanicalInputs.torque || ''}
                    onChange={(e) => setMechanicalInputs(prev => ({ ...prev, torque: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Torque in Newton-meters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speed (RPM)
                  </label>
                  <input
                    type="number"
                    value={mechanicalInputs.speed || ''}
                    onChange={(e) => setMechanicalInputs(prev => ({ ...prev, speed: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="1500"
                    min="0"
                    step="10"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Rotational speed in revolutions per minute
                  </p>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      <strong>Formula:</strong> P = (2 × π × N × T) / 60
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Input Panel - Electrical */}
            {mode === 'electrical' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Electrical Parameters
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voltage (V)
                  </label>
                  <input
                    type="number"
                    value={electricalInputs.voltage || ''}
                    onChange={(e) => setElectricalInputs(prev => ({ ...prev, voltage: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="220"
                    min="0"
                    step="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Supply voltage in volts
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current (A)
                  </label>
                  <input
                    type="number"
                    value={electricalInputs.current || ''}
                    onChange={(e) => setElectricalInputs(prev => ({ ...prev, current: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="5"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Current draw in amperes
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Efficiency: {(electricalInputs.efficiency * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    value={electricalInputs.efficiency}
                    onChange={(e) => setElectricalInputs(prev => ({ ...prev, efficiency: parseFloat(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    min="0.5"
                    max="1.0"
                    step="0.01"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Motor efficiency (typical: 80-95%)
                  </p>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      <strong>Formula:</strong> P = V × I × η
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Input Panel - Horsepower */}
            {mode === 'horsepower' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Horsepower Conversion
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horsepower (HP)
                  </label>
                  <input
                    type="number"
                    value={horsepowerInputs.horsepower || ''}
                    onChange={(e) => setHorsepowerInputs({ horsepower: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="2"
                    min="0"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Motor power in horsepower (1 HP = 746 W)
                  </p>
                </div>

                {result && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800">
                      <strong>Formula:</strong> P (W) = HP × 746
                    </div>
                  </div>
                )}
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

            {/* Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Motor Presets
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

            {/* Power Conversions */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Power Conversions
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 uppercase tracking-wider mb-1 font-semibold">Watts</div>
                    <div className="text-2xl font-bold text-blue-900">{formatNumber(result.powerWatts, 2)}</div>
                    <div className="text-xs text-blue-700 mt-1">W</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-600 uppercase tracking-wider mb-1 font-semibold">Kilowatts</div>
                    <div className="text-2xl font-bold text-green-900">{formatNumber(result.powerKW, 3)}</div>
                    <div className="text-xs text-green-700 mt-1">kW</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-purple-600 uppercase tracking-wider mb-1 font-semibold">Horsepower</div>
                    <div className="text-2xl font-bold text-purple-900">{formatNumber(result.powerHP, 3)}</div>
                    <div className="text-xs text-purple-700 mt-1">HP</div>
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
                            {formatNumber(entry.result.powerKW, 2)} kW
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.inputs.mode === 'mechanical' && 'Mechanical'}
                          {entry.inputs.mode === 'electrical' && 'Electrical'}
                          {entry.inputs.mode === 'horsepower' && 'Horsepower'} • {formatNumber(entry.result.powerHP, 2)} HP
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

      <ElectricMotorPowerCalculatorSEO />
      <RelatedTools
        currentTool="electric-motor-power-calculator"
        tools={['transformer-efficiency-calculator', 'power-factor-calculator', 'energy-consumption-calculator']}
      />
    </>
  );
}

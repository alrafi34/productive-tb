"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CalculationMode,
  PhaseAngleInputs,
  PhaseAngleResult,
} from "./types";
import {
  calculatePhaseAngle,
  validateInputs,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getModeLabel,
  getPresets,
  debounce,
} from "./logic";
import PhaseAngleCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PhaseAngleCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>("power");
  
  // Power mode inputs
  const [realPower, setRealPower] = useState<string>("1000");
  const [apparentPower, setApparentPower] = useState<string>("1250");
  
  // Impedance mode inputs
  const [resistance, setResistance] = useState<string>("10");
  const [reactance, setReactance] = useState<string>("10");
  
  // Power factor mode input
  const [powerFactor, setPowerFactor] = useState<string>("0.8");
  
  const [result, setResult] = useState<PhaseAngleResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());
  const [angleUnit, setAngleUnit] = useState<'degrees' | 'radians'>('degrees');

  const presets = getPresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      calculate();
    }, 150),
    [mode, realPower, apparentPower, resistance, reactance, powerFactor]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [mode, realPower, apparentPower, resistance, reactance, powerFactor, debouncedCalculate]);

  const calculate = () => {
    setError(null);
    
    const inputs: PhaseAngleInputs = {
      mode,
      realPower: mode === 'power' ? parseFloat(realPower) || 0 : undefined,
      apparentPower: mode === 'power' ? parseFloat(apparentPower) || 0 : undefined,
      resistance: mode === 'impedance' ? parseFloat(resistance) || 0 : undefined,
      reactance: mode === 'impedance' ? parseFloat(reactance) || 0 : undefined,
      powerFactor: mode === 'powerFactor' ? parseFloat(powerFactor) || 0 : undefined,
    };

    const validationError = validateInputs(inputs);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    try {
      const calcResult = calculatePhaseAngle(inputs);
      setResult(calcResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  const handleModeChange = (newMode: CalculationMode) => {
    setMode(newMode);
    setError(null);
    setResult(null);
  };

  const handleReset = () => {
    setRealPower("1000");
    setApparentPower("1250");
    setResistance("10");
    setReactance("10");
    setPowerFactor("0.8");
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setMode(preset.mode);
    if (preset.values.realPower !== undefined) setRealPower(preset.values.realPower.toString());
    if (preset.values.apparentPower !== undefined) setApparentPower(preset.values.apparentPower.toString());
    if (preset.values.resistance !== undefined) setResistance(preset.values.resistance.toString());
    if (preset.values.reactance !== undefined) setReactance(preset.values.reactance.toString());
    if (preset.values.powerFactor !== undefined) setPowerFactor(preset.values.powerFactor.toString());
  };

  const handleCopy = () => {
    if (result) {
      const text = angleUnit === 'degrees' 
        ? `${formatNumber(result.angleDegrees, 4)}°`
        : `${formatNumber(result.angleRadians, 6)} rad`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      const inputs: PhaseAngleInputs = {
        mode,
        realPower: mode === 'power' ? parseFloat(realPower) : undefined,
        apparentPower: mode === 'power' ? parseFloat(apparentPower) : undefined,
        resistance: mode === 'impedance' ? parseFloat(resistance) : undefined,
        reactance: mode === 'impedance' ? parseFloat(reactance) : undefined,
        powerFactor: mode === 'powerFactor' ? parseFloat(powerFactor) : undefined,
      };
      saveToHistory(inputs, result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const inputs: PhaseAngleInputs = {
        mode,
        realPower: mode === 'power' ? parseFloat(realPower) : undefined,
        apparentPower: mode === 'power' ? parseFloat(apparentPower) : undefined,
        resistance: mode === 'impedance' ? parseFloat(resistance) : undefined,
        reactance: mode === 'impedance' ? parseFloat(reactance) : undefined,
        powerFactor: mode === 'powerFactor' ? parseFloat(powerFactor) : undefined,
      };
      const text = exportToText(inputs, result);
      downloadFile(text, 'phase_angle_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: any) => {
    setMode(entry.input.mode);
    if (entry.input.realPower !== undefined) setRealPower(entry.input.realPower.toString());
    if (entry.input.apparentPower !== undefined) setApparentPower(entry.input.apparentPower.toString());
    if (entry.input.resistance !== undefined) setResistance(entry.input.resistance.toString());
    if (entry.input.reactance !== undefined) setReactance(entry.input.reactance.toString());
    if (entry.input.powerFactor !== undefined) setPowerFactor(entry.input.powerFactor.toString());
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
              <h3 className="font-semibold text-blue-900 mb-1">Phase Angle Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate phase angle between voltage and current in AC circuits using power, impedance, or power factor with instant results.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Calculation Mode</h3>
              
              <select
                value={mode}
                onChange={(e) => handleModeChange(e.target.value as CalculationMode)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
              >
                <option value="power">Using Power (P & S)</option>
                <option value="impedance">Using Resistance & Reactance</option>
                <option value="powerFactor">Using Power Factor</option>
              </select>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
              </div>
            </div>

            {/* Result Display */}
            {result && !error && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Phase Angle (φ)
                  </p>
                  <div className="text-5xl font-bold mb-1">
                    {angleUnit === 'degrees' 
                      ? formatNumber(result.angleDegrees, 2)
                      : formatNumber(result.angleRadians, 4)
                    }
                  </div>
                  <div className="text-xl text-primary-100">
                    {angleUnit === 'degrees' ? 'Degrees (°)' : 'Radians'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Power Factor:</span>
                    <span className="font-semibold">{formatNumber(result.powerFactor, 4)}</span>
                  </div>
                  {angleUnit === 'degrees' ? (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Radians:</span>
                      <span className="font-semibold">{formatNumber(result.angleRadians, 4)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Degrees:</span>
                      <span className="font-semibold">{formatNumber(result.angleDegrees, 2)}°</span>
                    </div>
                  )}
                  {result.impedance && (
                    <div className="flex justify-between">
                      <span className="text-primary-100">Impedance:</span>
                      <span className="font-semibold">{formatNumber(result.impedance, 2)} Ω</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setAngleUnit(angleUnit === 'degrees' ? 'radians' : 'degrees')}
                    className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    🔄 Switch to {angleUnit === 'degrees' ? 'Radians' : 'Degrees'}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
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

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Values
              </h3>
              
              <div className="space-y-4">
                {mode === 'power' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Real Power (P)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={realPower}
                          onChange={(e) => setRealPower(e.target.value)}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="1000"
                          step="any"
                          min="0"
                        />
                        <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                          W
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apparent Power (S)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={apparentPower}
                          onChange={(e) => setApparentPower(e.target.value)}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="1250"
                          step="any"
                          min="0"
                        />
                        <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                          VA
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {mode === 'impedance' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resistance (R)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={resistance}
                          onChange={(e) => setResistance(e.target.value)}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="10"
                          step="any"
                          min="0"
                        />
                        <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                          Ω
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reactance (X)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={reactance}
                          onChange={(e) => setReactance(e.target.value)}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="10"
                          step="any"
                        />
                        <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                          Ω
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {mode === 'powerFactor' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Power Factor (cos φ)
                    </label>
                    <input
                      type="number"
                      value={powerFactor}
                      onChange={(e) => setPowerFactor(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0.8"
                      step="0.01"
                      min="0"
                      max="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Value between 0 and 1</p>
                  </div>
                )}
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
                Common Presets
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

            {/* Export Button */}
            {result && !error && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Calculation
              </button>
            )}

            {/* Info Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Phase angle represents the time difference between voltage and current waveforms in AC circuits. 
                A phase angle of 0° indicates a purely resistive load, while 90° indicates a purely reactive load. 
                Power factor is the cosine of the phase angle.
              </p>
            </div>

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
                            {formatNumber(entry.result.angleDegrees, 2)}° (PF: {formatNumber(entry.result.powerFactor, 3)})
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {getModeLabel(entry.result.mode)}
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

      <PhaseAngleCalculatorSEO />
      <RelatedTools
        currentTool="phase-angle-calculator"
        tools={['power-factor-calculator', 'impedance-calculator', 'inductive-reactance-calculator']}
      />
    </>
  );
}

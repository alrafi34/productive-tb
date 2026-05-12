"use client";

import { useState, useEffect, useCallback } from "react";
import {
  CalculationMode,
  CalculationInput,
  CalculationResult,
  CapacitanceUnit,
  VoltageUnit,
  ChargeUnit,
  EnergyUnit,
} from "./types";
import {
  performCalculation,
  validateInput,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  getModeLabel,
  debounce,
  EXAMPLE_PRESETS,
} from "./logic";
import CapacitorCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CapacitorCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>("charge");
  const [capacitance, setCapacitance] = useState<string>("100");
  const [capacitanceUnit, setCapacitanceUnit] = useState<CapacitanceUnit>("µF");
  const [voltage, setVoltage] = useState<string>("12");
  const [voltageUnit, setVoltageUnit] = useState<VoltageUnit>("V");
  const [charge, setCharge] = useState<string>("50");
  const [chargeUnit, setChargeUnit] = useState<ChargeUnit>("µC");
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      calculate();
    }, 150),
    [mode, capacitance, capacitanceUnit, voltage, voltageUnit, charge, chargeUnit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [mode, capacitance, capacitanceUnit, voltage, voltageUnit, charge, chargeUnit, debouncedCalculate]);

  const calculate = () => {
    setError(null);
    
    const input: CalculationInput = {
      mode,
      capacitance: parseFloat(capacitance) || 0,
      capacitanceUnit,
      voltage: parseFloat(voltage) || 0,
      voltageUnit,
      charge: parseFloat(charge) || 0,
      chargeUnit,
    };

    const validationError = validateInput(input);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    try {
      const calcResult = performCalculation(input);
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
    setCapacitance("100");
    setVoltage("12");
    setCharge("50");
    setResult(null);
    setError(null);
  };

  const handleLoadExample = () => {
    const preset = EXAMPLE_PRESETS[mode];
    if (preset) {
      if ('capacitance' in preset) {
        setCapacitance(preset.capacitance.toString());
        setCapacitanceUnit(preset.capacitanceUnit);
      }
      if ('voltage' in preset) {
        setVoltage(preset.voltage.toString());
        setVoltageUnit(preset.voltageUnit);
      }
      if ('charge' in preset) {
        setCharge(preset.charge.toString());
        setChargeUnit(preset.chargeUnit);
      }
    }
  };

  const handleCopy = () => {
    if (result) {
      const text = `${formatNumber(result.value)} ${result.unit}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      const input: CalculationInput = {
        mode,
        capacitance: parseFloat(capacitance),
        capacitanceUnit,
        voltage: parseFloat(voltage),
        voltageUnit,
        charge: parseFloat(charge),
        chargeUnit,
      };
      saveToHistory(mode, input, result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const input: CalculationInput = {
        mode,
        capacitance: parseFloat(capacitance),
        capacitanceUnit,
        voltage: parseFloat(voltage),
        voltageUnit,
        charge: parseFloat(charge),
        chargeUnit,
      };
      const text = exportToText(mode, input, result);
      downloadFile(text, 'capacitor_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: any) => {
    setMode(entry.mode);
    if (entry.input.capacitance) {
      setCapacitance(entry.input.capacitance.toString());
      setCapacitanceUnit(entry.input.capacitanceUnit);
    }
    if (entry.input.voltage) {
      setVoltage(entry.input.voltage.toString());
      setVoltageUnit(entry.input.voltageUnit);
    }
    if (entry.input.charge) {
      setCharge(entry.input.charge.toString());
      setChargeUnit(entry.input.chargeUnit);
    }
    setShowHistory(false);
  };

  const needsCapacitance = mode === "charge" || mode === "voltage" || mode === "energy";
  const needsVoltage = mode === "charge" || mode === "capacitance" || mode === "energy";
  const needsCharge = mode === "capacitance" || mode === "voltage";

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Capacitor Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate capacitance, charge, voltage, and stored energy with instant results and step-by-step explanations.
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
                <option value="charge">Calculate Charge (Q)</option>
                <option value="capacitance">Calculate Capacitance (C)</option>
                <option value="voltage">Calculate Voltage (V)</option>
                <option value="energy">Calculate Energy (E)</option>
              </select>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleLoadExample}
                  className="w-full px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm"
                >
                  📝 Load Example
                </button>
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
                    Result
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(result.value, 4)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {result.unit}
                  </div>
                </div>

                {result.conversions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                    <div className="text-primary-100 mb-2">Conversions:</div>
                    <div className="space-y-1">
                      {result.conversions.map((conv, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-primary-100">{conv.unit}:</span>
                          <span className="font-semibold">{conv.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Values
              </h3>
              
              <div className="space-y-4">
                {needsCapacitance && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacitance (C)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={capacitance}
                        onChange={(e) => setCapacitance(e.target.value)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="100"
                        step="any"
                      />
                      <select
                        value={capacitanceUnit}
                        onChange={(e) => setCapacitanceUnit(e.target.value as CapacitanceUnit)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                      >
                        <option value="F">F (Farad)</option>
                        <option value="mF">mF (Millifarad)</option>
                        <option value="µF">µF (Microfarad)</option>
                        <option value="nF">nF (Nanofarad)</option>
                        <option value="pF">pF (Picofarad)</option>
                      </select>
                    </div>
                  </div>
                )}

                {needsVoltage && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voltage (V)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={voltage}
                        onChange={(e) => setVoltage(e.target.value)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="12"
                        step="any"
                      />
                      <select
                        value={voltageUnit}
                        onChange={(e) => setVoltageUnit(e.target.value as VoltageUnit)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                      >
                        <option value="V">V (Volt)</option>
                        <option value="mV">mV (Millivolt)</option>
                        <option value="kV">kV (Kilovolt)</option>
                      </select>
                    </div>
                  </div>
                )}

                {needsCharge && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Charge (Q)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={charge}
                        onChange={(e) => setCharge(e.target.value)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                        placeholder="50"
                        step="any"
                      />
                      <select
                        value={chargeUnit}
                        onChange={(e) => setChargeUnit(e.target.value as ChargeUnit)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                      >
                        <option value="C">C (Coulomb)</option>
                        <option value="mC">mC (Millicoulomb)</option>
                        <option value="µC">µC (Microcoulomb)</option>
                        <option value="nC">nC (Nanocoulomb)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
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

            {/* Formula Display */}
            {result && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Formula & Steps
                </h3>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-center text-lg font-mono font-semibold text-blue-900">
                    {result.formula}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Calculation Steps:</p>
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="font-semibold text-primary">{idx + 1}.</span>
                      <span className="font-mono">{step}</span>
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
                <strong>Note:</strong> This calculator uses standard capacitor formulas. 
                Results are based on ideal conditions. Actual values may vary due to component tolerances, 
                temperature effects, and other real-world factors.
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
                            {getModeLabel(entry.mode)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Result: {formatNumber(entry.result.value, 4)} {entry.result.unit}
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

      <CapacitorCalculatorSEO />
      <RelatedTools
        currentTool="capacitor-calculator"
        tools={['ohms-law-calculator', 'voltage-divider-calculator', 'energy-consumption-calculator']}
      />
    </>
  );
}

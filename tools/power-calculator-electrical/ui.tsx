"use client";

import { useState, useEffect, useCallback } from "react";
import { CalculationMode, VoltageUnit, CurrentUnit, PowerUnit, PowerCalculation } from "./types";
import {
  calculatePower,
  getVoltagePresets,
  validateInputs,
  formatNumber,
  getVoltageUnitLabel,
  getCurrentUnitLabel,
  getPowerUnitLabel,
  getModeLabel,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  debounce
} from "./logic";
import PowerCalculatorElectricalSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PowerCalculatorElectricalUI() {
  const [voltage, setVoltage] = useState(220);
  const [current, setCurrent] = useState(2);
  const [power, setPower] = useState(440);
  const [voltageUnit, setVoltageUnit] = useState<VoltageUnit>("V");
  const [currentUnit, setCurrentUnit] = useState<CurrentUnit>("A");
  const [powerUnit, setPowerUnit] = useState<PowerUnit>("W");
  const [mode, setMode] = useState<CalculationMode>("power");
  
  const [result, setResult] = useState<PowerCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const presets = getVoltagePresets();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      const validationError = validateInputs(voltage, current, power, mode);
      
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      
      try {
        const calculationResult = calculatePower(
          voltage,
          current,
          power,
          voltageUnit,
          currentUnit,
          powerUnit,
          mode
        );
        setResult(calculationResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 100),
    [voltage, current, power, voltageUnit, currentUnit, powerUnit, mode]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [voltage, current, power, voltageUnit, currentUnit, powerUnit, mode, debouncedCalculate]);

  const handleReset = () => {
    setVoltage(220);
    setCurrent(2);
    setPower(440);
    setVoltageUnit("V");
    setCurrentUnit("A");
    setPowerUnit("W");
    setMode("power");
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: any) => {
    setVoltage(preset.voltage);
    setVoltageUnit(preset.voltageUnit);
  };

  const handleCopy = () => {
    if (result) {
      let text = "";
      if (mode === "power") {
        text = `Power = ${formatNumber(result.power)} ${result.powerUnit} (${formatNumber(result.voltage)} ${result.voltageUnit} × ${formatNumber(result.current)} ${result.currentUnit})`;
      } else if (mode === "voltage") {
        text = `Voltage = ${formatNumber(result.voltage)} ${result.voltageUnit} (${formatNumber(result.power)} ${result.powerUnit} / ${formatNumber(result.current)} ${result.currentUnit})`;
      } else {
        text = `Current = ${formatNumber(result.current)} ${result.currentUnit} (${formatNumber(result.power)} ${result.powerUnit} / ${formatNumber(result.voltage)} ${result.voltageUnit})`;
      }
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveCalculation = () => {
    if (result) {
      saveToHistory(result);
      setHistory(getHistory());
    }
  };

  const handleExportText = () => {
    if (result) {
      const text = exportToText(result);
      downloadFile(text, 'power_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: any) => {
    const calc = entry.calculation;
    setVoltage(calc.voltage);
    setCurrent(calc.current);
    setPower(calc.power);
    setVoltageUnit(calc.voltageUnit);
    setCurrentUnit(calc.currentUnit);
    setPowerUnit(calc.powerUnit);
    setMode(calc.mode);
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
              <h3 className="font-semibold text-blue-900 mb-1">Power Calculator (Electrical)</h3>
              <p className="text-sm text-blue-800">
                Calculate electrical power, voltage, or current using P = V × I. Get instant results with unit conversion and real-time calculations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              {/* Calculation Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as CalculationMode)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                >
                  <option value="power">Calculate Power (P)</option>
                  <option value="voltage">Calculate Voltage (V)</option>
                  <option value="current">Calculate Current (I)</option>
                </select>
              </div>

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
                    {mode === "power" ? "Power" : mode === "voltage" ? "Voltage" : "Current"}
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {mode === "power" && formatNumber(result.power)}
                    {mode === "voltage" && formatNumber(result.voltage)}
                    {mode === "current" && formatNumber(result.current)}
                  </div>
                  <div className="text-xl text-primary-100">
                    {mode === "power" && getPowerUnitLabel(result.powerUnit)}
                    {mode === "voltage" && getVoltageUnitLabel(result.voltageUnit)}
                    {mode === "current" && getCurrentUnitLabel(result.currentUnit)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  {mode === "power" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Voltage:</span>
                        <span className="font-semibold">{formatNumber(result.voltage)} {result.voltageUnit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Current:</span>
                        <span className="font-semibold">{formatNumber(result.current)} {result.currentUnit}</span>
                      </div>
                    </>
                  )}
                  {mode === "voltage" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Power:</span>
                        <span className="font-semibold">{formatNumber(result.power)} {result.powerUnit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Current:</span>
                        <span className="font-semibold">{formatNumber(result.current)} {result.currentUnit}</span>
                      </div>
                    </>
                  )}
                  {mode === "current" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Power:</span>
                        <span className="font-semibold">{formatNumber(result.power)} {result.powerUnit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-100">Voltage:</span>
                        <span className="font-semibold">{formatNumber(result.voltage)} {result.voltageUnit}</span>
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

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                {mode === "power" ? "Input Values" : mode === "voltage" ? "Known Values" : "Known Values"}
              </h3>
              
              {/* Voltage Input */}
              {mode !== "voltage" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voltage (V)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={voltage || ''}
                      onChange={(e) => setVoltage(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="220"
                      min="0"
                      step="0.1"
                    />
                    <select
                      value={voltageUnit}
                      onChange={(e) => setVoltageUnit(e.target.value as VoltageUnit)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="V">V (Volts)</option>
                      <option value="mV">mV (Millivolts)</option>
                      <option value="kV">kV (Kilovolts)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Current Input */}
              {mode !== "current" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current (I)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={current || ''}
                      onChange={(e) => setCurrent(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="2"
                      min="0"
                      step="0.1"
                    />
                    <select
                      value={currentUnit}
                      onChange={(e) => setCurrentUnit(e.target.value as CurrentUnit)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="A">A (Amperes)</option>
                      <option value="mA">mA (Milliamperes)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Power Input */}
              {mode !== "power" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Power (P)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={power || ''}
                      onChange={(e) => setPower(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="440"
                      min="0"
                      step="0.1"
                    />
                    <select
                      value={powerUnit}
                      onChange={(e) => setPowerUnit(e.target.value as PowerUnit)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="W">W (Watts)</option>
                      <option value="mW">mW (Milliwatts)</option>
                      <option value="kW">kW (Kilowatts)</option>
                    </select>
                  </div>
                </div>
              )}

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> {mode === "power" ? "P = V × I" : mode === "voltage" ? "V = P / I" : "I = P / V"}
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

            {/* Calculation Summary */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Calculation Summary
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className={`p-3 rounded-lg border ${mode === "voltage" ? "bg-primary/10 border-primary" : "bg-gray-50 border-gray-200"}`}>
                    <div className={`text-xs uppercase tracking-wider mb-1 ${mode === "voltage" ? "text-primary font-semibold" : "text-gray-500"}`}>Voltage</div>
                    <div className={`text-lg font-bold ${mode === "voltage" ? "text-primary" : "text-gray-900"}`}>{formatNumber(result.voltage)}</div>
                    <div className={`text-xs ${mode === "voltage" ? "text-primary font-medium" : "text-gray-600"}`}>{result.voltageUnit}</div>
                  </div>
                  <div className={`p-3 rounded-lg border ${mode === "current" ? "bg-primary/10 border-primary" : "bg-gray-50 border-gray-200"}`}>
                    <div className={`text-xs uppercase tracking-wider mb-1 ${mode === "current" ? "text-primary font-semibold" : "text-gray-500"}`}>Current</div>
                    <div className={`text-lg font-bold ${mode === "current" ? "text-primary" : "text-gray-900"}`}>{formatNumber(result.current)}</div>
                    <div className={`text-xs ${mode === "current" ? "text-primary font-medium" : "text-gray-600"}`}>{result.currentUnit}</div>
                  </div>
                  <div className={`p-3 rounded-lg border ${mode === "power" ? "bg-primary/10 border-primary" : "bg-gray-50 border-gray-200"}`}>
                    <div className={`text-xs uppercase tracking-wider mb-1 ${mode === "power" ? "text-primary font-semibold" : "text-gray-500"}`}>Power</div>
                    <div className={`text-lg font-bold ${mode === "power" ? "text-primary" : "text-gray-900"}`}>{formatNumber(result.power)}</div>
                    <div className={`text-xs ${mode === "power" ? "text-primary font-medium" : "text-gray-600"}`}>{result.powerUnit}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Voltage Presets */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Voltage Presets
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyPreset(preset)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{preset.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{preset.voltage} {preset.voltageUnit}</div>
                    <div className="text-xs text-primary font-semibold">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Button */}
            {result && !error && (
              <button
                onClick={handleExportText}
                className="w-full px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors font-medium text-sm"
              >
                📄 Export Calculation
              </button>
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
                            {entry.calculation.mode === "power" && `P = ${formatNumber(entry.calculation.power)} ${entry.calculation.powerUnit}`}
                            {entry.calculation.mode === "voltage" && `V = ${formatNumber(entry.calculation.voltage)} ${entry.calculation.voltageUnit}`}
                            {entry.calculation.mode === "current" && `I = ${formatNumber(entry.calculation.current)} ${entry.calculation.currentUnit}`}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(entry.calculation.voltage)} {entry.calculation.voltageUnit} • 
                          {formatNumber(entry.calculation.current)} {entry.calculation.currentUnit} • 
                          {formatNumber(entry.calculation.power)} {entry.calculation.powerUnit}
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

      <PowerCalculatorElectricalSEO />
      <RelatedTools
        currentTool="power-calculator-electrical"
        tools={['ohms-law-calculator', 'voltage-drop-calculator', 'electrical-load-calculator-building']}
      />
    </>
  );
}

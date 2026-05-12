"use client";

import { useState, useEffect, useCallback } from "react";
import { Resistor, ResistanceUnit, CalculationResult } from "./types";
import {
  createDefaultResistor,
  performCalculation,
  parseBulkInput,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  formatNumber,
  generateId,
  debounce,
  COMMON_RESISTOR_VALUES,
} from "./logic";
import SeriesResistorCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SeriesResistorCalculatorUI() {
  const [resistors, setResistors] = useState<Resistor[]>([
    createDefaultResistor(),
    createDefaultResistor(),
    createDefaultResistor(),
  ]);
  const [outputUnit, setOutputUnit] = useState<ResistanceUnit>("Ω");
  const [bulkInput, setBulkInput] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      calculate();
    }, 150),
    [resistors, outputUnit]
  );

  // Calculate in real-time
  useEffect(() => {
    debouncedCalculate();
  }, [resistors, outputUnit, debouncedCalculate]);

  const calculate = () => {
    const calcResult = performCalculation(resistors, outputUnit);
    setResult(calcResult);
  };

  const handleResistorChange = (id: string, field: keyof Resistor, value: any) => {
    setResistors(prev =>
      prev.map(r => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleAddResistor = () => {
    setResistors(prev => [...prev, createDefaultResistor()]);
  };

  const handleRemoveResistor = (id: string) => {
    if (resistors.length <= 1) return;
    setResistors(prev => prev.filter(r => r.id !== id));
  };

  const handleBulkInputApply = () => {
    if (!bulkInput.trim()) return;
    
    const parsedResistors = parseBulkInput(bulkInput, outputUnit);
    if (parsedResistors.length > 0) {
      setResistors(parsedResistors);
      setBulkInput("");
    }
  };

  const handleReset = () => {
    setResistors([
      createDefaultResistor(),
      createDefaultResistor(),
      createDefaultResistor(),
    ]);
    setBulkInput("");
    setResult(null);
  };

  const handleLoadCommon = (value: number, unit: ResistanceUnit) => {
    const newResistor: Resistor = {
      id: generateId(),
      value,
      unit,
    };
    setResistors(prev => [...prev, newResistor]);
  };

  const handleCopy = () => {
    if (result) {
      const text = `${formatNumber(result.totalResistance)} ${result.unit}`;
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
      downloadFile(text, 'series_resistor_calculation.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all calculation history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: any) => {
    setResistors(entry.result.resistors);
    setOutputUnit(entry.result.unit);
    setShowHistory(false);
  };

  const hasValidResistors = resistors.some(r => r.value > 0);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Series Resistor Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate total resistance in series circuits. Add multiple resistors and get instant results with unit conversion.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Output Unit</h3>
              
              <select
                value={outputUnit}
                onChange={(e) => setOutputUnit(e.target.value as ResistanceUnit)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
              >
                <option value="Ω">Ω (Ohm)</option>
                <option value="kΩ">kΩ (Kilo-ohm)</option>
                <option value="MΩ">MΩ (Mega-ohm)</option>
              </select>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleAddResistor}
                  className="w-full px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm"
                >
                  ➕ Add Resistor
                </button>
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  🔄 Reset All
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
            {result && hasValidResistors && (
              <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white space-y-4">
                <div>
                  <p className="text-primary-100 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Total Resistance
                  </p>
                  <div className="text-4xl font-bold mb-1">
                    {formatNumber(result.totalResistance)}
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
            
            {/* Resistor Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Resistors
              </h3>
              
              <div className="space-y-3">
                {resistors.map((resistor, index) => (
                  <div key={resistor.id} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600 w-8">R{index + 1}</span>
                    <input
                      type="number"
                      value={resistor.value || ""}
                      onChange={(e) => handleResistorChange(resistor.id, 'value', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                      placeholder="0"
                      min="0"
                      step="any"
                    />
                    <select
                      value={resistor.unit}
                      onChange={(e) => handleResistorChange(resistor.id, 'unit', e.target.value as ResistanceUnit)}
                      className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                    >
                      <option value="Ω">Ω</option>
                      <option value="kΩ">kΩ</option>
                      <option value="MΩ">MΩ</option>
                    </select>
                    {resistors.length > 1 && (
                      <button
                        onClick={() => handleRemoveResistor(resistor.id)}
                        className="px-3 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors text-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bulk Input */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Bulk Input (Optional)
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter resistor values (comma or line separated)
                </label>
                <textarea
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
                  placeholder="100, 220, 330&#10;or&#10;100&#10;220&#10;330"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Example: 100, 220, 330 or one value per line
                </p>
              </div>

              <button
                onClick={handleBulkInputApply}
                disabled={!bulkInput.trim()}
                className="w-full px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply Bulk Input
              </button>
            </div>

            {/* Common Values */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Common Resistor Values
              </h3>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {COMMON_RESISTOR_VALUES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLoadCommon(item.value, item.unit)}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-sm font-mono"
                  >
                    {item.value}{item.unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Formula Display */}
            {result && hasValidResistors && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Formula
                </h3>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-center text-lg font-mono font-semibold text-blue-900">
                    R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub> + ... + R<sub>n</sub>
                  </p>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Calculation:</strong>
                  </p>
                  <p className="font-mono text-sm text-gray-900">
                    {result.resistors.map((r, idx) => (
                      <span key={idx}>
                        {idx > 0 && " + "}
                        {formatNumber(r.value)}{r.unit}
                      </span>
                    ))}
                    {" = "}
                    {formatNumber(result.totalResistance)}{result.unit}
                  </p>
                </div>
              </div>
            )}

            {/* Export Button */}
            {result && hasValidResistors && (
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
                <strong>Note:</strong> In a series circuit, resistors are connected end-to-end. 
                The total resistance is the sum of all individual resistances. 
                The same current flows through all resistors, but voltage divides across them.
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
                            {formatNumber(entry.result.totalResistance)} {entry.result.unit}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.result.resistors.length} resistors
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

      <SeriesResistorCalculatorSEO />
      <RelatedTools
        currentTool="series-resistor-calculator"
        tools={['parallel-resistor-calculator', 'ohms-law-calculator', 'voltage-divider-calculator']}
      />
    </>
  );
}

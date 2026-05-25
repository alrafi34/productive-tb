"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  CurrentDividerInputs, 
  CurrentDividerResult, 
  ResistorInput, 
  ResistanceUnit, 
  HistoryEntry 
} from "./types";
import {
  calculateCurrentDivider,
  validateInputs,
  getPresets,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportToCSV,
  downloadFile,
  formatNumber,
  generateId,
  debounce,
  RESISTANCE_MULTIPLIERS
} from "./logic";
import CurrentDividerCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const RESISTANCE_UNITS: { label: string; value: ResistanceUnit }[] = [
  { label: 'Ω', value: 'Ω' },
  { label: 'kΩ', value: 'kΩ' },
  { label: 'MΩ', value: 'MΩ' },
];

export default function CurrentDividerCalculatorUI() {
  const [inputs, setInputs] = useState<CurrentDividerInputs>({
    totalCurrent: 10,
    resistors: [
      { id: generateId(), value: 5, unit: 'Ω' },
      { id: generateId(), value: 10, unit: 'Ω' }
    ],
    precision: 2
  });
  
  const [result, setResult] = useState<CurrentDividerResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const presets = getPresets();

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

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
        const calculatedResult = calculateCurrentDivider(inputs);
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

  const handleInputChange = (field: keyof CurrentDividerInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleResistorChange = (id: string, field: keyof ResistorInput, value: any) => {
    setInputs(prev => ({
      ...prev,
      resistors: prev.resistors.map(r => 
        r.id === id ? { ...r, [field]: value } : r
      )
    }));
  };

  const handleAddResistor = () => {
    if (inputs.resistors.length >= 10) return;
    
    setInputs(prev => ({
      ...prev,
      resistors: [...prev.resistors, { id: generateId(), value: 1, unit: 'kΩ' }]
    }));
  };

  const handleRemoveResistor = (id: string) => {
    if (inputs.resistors.length <= 2) return;
    
    setInputs(prev => ({
      ...prev,
      resistors: prev.resistors.filter(r => r.id !== id)
    }));
  };

  const handleReset = () => {
    setInputs({
      totalCurrent: 10,
      resistors: [
        { id: generateId(), value: 5, unit: 'Ω' },
        { id: generateId(), value: 10, unit: 'Ω' }
      ],
      precision: 2
    });
    setResult(null);
    setError(null);
  };

  const handleApplyPreset = (preset: typeof presets[0]) => {
    setInputs({
      totalCurrent: preset.totalCurrent,
      resistors: preset.resistors.map(r => ({
        id: generateId(),
        value: r.value,
        unit: r.unit
      })),
      precision: inputs.precision
    });
  };

  const handleCopy = () => {
    if (result) {
      const text = result.branchCurrents.map((branch, index) => 
        `I${index + 1} = ${formatNumber(branch.current, inputs.precision)} A`
      ).join(', ');
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
      downloadFile(text, 'current_divider_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportToCSV(inputs, result);
      downloadFile(csv, 'current_divider_calculation.csv');
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

  const validResistorCount = inputs.resistors.filter(r => r.value > 0).length;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Current Divider Calculator</h3>
              <p className="text-sm text-blue-800">
                Calculate how current splits across parallel resistors. Get instant results with real-time calculations and detailed analysis.
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
                    Branch Currents ({validResistorCount} resistors)
                  </p>
                  <div className="space-y-2">
                    {result.branchCurrents.map((branch, index) => (
                      <div key={branch.resistorId} className="flex justify-between items-center">
                        <span className="text-primary-100 text-sm">I{index + 1}:</span>
                        <span className="font-bold text-lg">
                          {formatNumber(branch.current, inputs.precision)} A
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Total Power:</span>
                    <span className="font-semibold">{formatNumber(result.totalPower, 3)} W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Validation:</span>
                    <span className={`font-semibold ${result.validation.isValid ? 'text-green-200' : 'text-yellow-200'}`}>
                      {result.validation.isValid ? 'PASSED' : 'CHECK'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Results"}
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
                  onClick={handleAddResistor}
                  disabled={inputs.resistors.length >= 10}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm disabled:opacity-50"
                >
                  ➕ Add Resistor
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
                Circuit Parameters
              </h3>
              
              {/* Total Current */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Current (I<sub>total</sub>)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs.totalCurrent}
                    onChange={(e) => handleInputChange('totalCurrent', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    placeholder="10"
                    min="0"
                    step="0.1"
                  />
                  <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 flex items-center">
                    A
                  </div>
                </div>
              </div>

              {/* Resistors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parallel Resistors
                </label>
                <div className="space-y-3">
                  {inputs.resistors.map((resistor, index) => (
                    <div key={resistor.id} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600 w-8">R{index + 1}</span>
                      <div className="flex-1 flex gap-2">
                        <input
                          type="number"
                          value={resistor.value}
                          onChange={(e) => handleResistorChange(resistor.id, 'value', parseFloat(e.target.value) || 0)}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                          placeholder="1"
                          min="0"
                          step="0.1"
                        />
                        <select
                          value={resistor.unit}
                          onChange={(e) => handleResistorChange(resistor.id, 'unit', e.target.value as ResistanceUnit)}
                          className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-semibold"
                        >
                          {RESISTANCE_UNITS.map(u => (
                            <option key={u.value} value={u.value}>{u.label}</option>
                          ))}
                        </select>
                      </div>
                      {inputs.resistors.length > 2 && (
                        <button
                          onClick={() => handleRemoveResistor(resistor.id)}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Precision */}
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
                </select>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Formula:</strong> I<sub>x</sub> = I<sub>total</sub> × (1/R<sub>x</sub>) / Σ(1/R<sub>i</sub>)
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
                      {preset.totalCurrent}A, {preset.resistors.map(r => `${r.value}${r.unit}`).join(', ')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Table */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    Current Distribution
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resistor</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resistance</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Power</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {result.branchCurrents.map((branch, index) => (
                        <tr key={branch.resistorId} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-semibold text-gray-900">R{index + 1}</td>
                          <td className="px-4 py-3 text-gray-700 font-mono">{branch.resistanceDisplay}</td>
                          <td className="px-4 py-3 text-gray-900 font-bold font-mono">
                            {formatNumber(branch.current, inputs.precision)} A
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {formatNumber(branch.percentage, 1)}%
                          </td>
                          <td className="px-4 py-3 text-gray-700 font-mono">
                            {formatNumber(branch.power, 3)} W
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                            {entry.inputs.totalCurrent}A → {entry.result.branchCurrents.length} branches
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.result.branchCurrents.map((branch, index) => 
                            `I${index + 1}: ${formatNumber(branch.current, 2)}A`
                          ).join(' | ')}
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

      <CurrentDividerCalculatorSEO />
      <RelatedTools
        currentTool="current-divider-calculator"
        tools={['voltage-divider-calculator', 'parallel-resistor-calculator', 'ohms-law-calculator', 'power-calculator-electrical']}
      />
    </>
  );
}
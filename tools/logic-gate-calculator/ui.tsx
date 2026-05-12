"use client";

import { useState, useEffect } from "react";
import { LogicGate, LogicGateInputs, LogicGateResult } from "./types";
import {
  calculateLogicGate,
  validateInputs,
  getGateDescription,
  getGateSymbol,
  getAllGates,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  exportTruthTableToCSV,
  downloadFile,
  saveSettings,
  loadSettings
} from "./logic";
import LogicGateCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function LogicGateCalculatorUI() {
  const [inputs, setInputs] = useState<LogicGateInputs>({
    gate: 'AND',
    inputs: [0, 0]
  });
  
  const [result, setResult] = useState<LogicGateResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ReturnType<typeof getHistory>>([]);
  const [isClient, setIsClient] = useState(false);

  // Load settings and history only on client side after mount
  useEffect(() => {
    setIsClient(true);
    const savedSettings = loadSettings();
    if (savedSettings.gate || savedSettings.inputs) {
      setInputs({
        gate: (savedSettings.gate as LogicGate) || 'AND',
        inputs: savedSettings.inputs || [0, 0]
      });
    }
    setHistory(getHistory());
  }, []);

  const gates = getAllGates();

  // Calculate in real-time
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      
      const validationError = validateInputs(inputs);
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      
      try {
        const calculatedResult = calculateLogicGate(inputs);
        setResult(calculatedResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [inputs]);

  // Save settings when inputs change
  useEffect(() => {
    saveSettings(inputs);
  }, [inputs]);

  const handleGateChange = (gate: LogicGate) => {
    // Adjust inputs based on gate type
    let newInputs: number[];
    if (gate === 'NOT') {
      newInputs = [inputs.inputs[0] || 0];
    } else if (gate === 'XOR' || gate === 'XNOR') {
      newInputs = inputs.inputs.length >= 2 ? inputs.inputs.slice(0, 2) : [0, 0];
    } else {
      newInputs = inputs.inputs.length >= 2 ? inputs.inputs : [0, 0];
    }
    setInputs({ gate, inputs: newInputs });
  };

  const handleInputToggle = (index: number) => {
    setInputs(prev => ({
      ...prev,
      inputs: prev.inputs.map((val, i) => i === index ? (val === 0 ? 1 : 0) : val)
    }));
  };

  const handleAddInput = () => {
    if (inputs.gate === 'NOT' || inputs.gate === 'XOR' || inputs.gate === 'XNOR') {
      return; // These gates have fixed input counts
    }
    if (inputs.inputs.length < 8) { // Max 8 inputs
      setInputs(prev => ({
        ...prev,
        inputs: [...prev.inputs, 0]
      }));
    }
  };

  const handleRemoveInput = (index: number) => {
    if (inputs.inputs.length <= 2) {
      return; // Minimum 2 inputs (except NOT)
    }
    setInputs(prev => ({
      ...prev,
      inputs: prev.inputs.filter((_, i) => i !== index)
    }));
  };

  const handleReset = () => {
    setInputs({
      gate: 'AND',
      inputs: [0, 0]
    });
    setResult(null);
    setError(null);
  };

  const handleCopy = () => {
    if (result) {
      const text = `${inputs.gate}: ${inputs.inputs.join(', ')} = ${result.output}`;
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
      downloadFile(text, 'logic_gate_calculation.txt');
    }
  };

  const handleExportCSV = () => {
    if (result) {
      const csv = exportTruthTableToCSV(inputs.gate, result.truthTable);
      downloadFile(csv, 'truth_table.csv');
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

  // Check if current row in truth table matches current inputs
  const isActiveRow = (row: { inputs: number[]; output: number }) => {
    if (row.inputs.length !== inputs.inputs.length) return false;
    return row.inputs.every((val, idx) => val === inputs.inputs[idx]);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Logic Gate Calculator</h3>
              <p className="text-sm text-blue-800">
                Evaluate digital logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) with instant results and interactive truth tables.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Result Display */}
            {result && !error && (
              <div className={`rounded-xl border shadow-lg shadow-primary/20 p-6 text-white space-y-4 ${
                result.output === 1 ? 'bg-green-600 border-green-500' : 'bg-gray-600 border-gray-500'
              }`}>
                <div>
                  <p className="text-white/80 font-medium mb-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                    Output
                  </p>
                  <div className="text-7xl font-bold mb-1">
                    {result.output}
                  </div>
                  <div className="text-xl text-white/80">
                    {result.output === 1 ? 'HIGH / TRUE' : 'LOW / FALSE'}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                  <div className="font-semibold mb-1">Gate: {inputs.gate}</div>
                  <div className="text-white/90">
                    Symbol: {getGateSymbol(inputs.gate)}
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
                      📄 Export Report
                    </button>
                    <button
                      onClick={handleExportCSV}
                      className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                    >
                      📊 Export Truth Table
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Gate Selection */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Select Logic Gate
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {gates.map((gate) => (
                  <button
                    key={gate}
                    onClick={() => handleGateChange(gate)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      inputs.gate === gate
                        ? 'border-primary bg-primary text-white font-bold'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:bg-primary/5'
                    }`}
                  >
                    <div className="text-2xl mb-1">{getGateSymbol(gate)}</div>
                    <div className="text-sm font-semibold">{gate}</div>
                  </button>
                ))}
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>{inputs.gate}:</strong> {getGateDescription(inputs.gate)}
                </div>
              </div>
            </div>

            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Input Values
                </h3>
                {inputs.gate !== 'NOT' && inputs.gate !== 'XOR' && inputs.gate !== 'XNOR' && inputs.inputs.length < 8 && (
                  <button
                    onClick={handleAddInput}
                    className="px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    + Add Input
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inputs.inputs.map((value, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Input {String.fromCharCode(65 + index)}
                      </label>
                      {inputs.inputs.length > 2 && inputs.gate !== 'NOT' && inputs.gate !== 'XOR' && inputs.gate !== 'XNOR' && (
                        <button
                          onClick={() => handleRemoveInput(index)}
                          className="text-red-600 hover:text-red-700 text-xs font-medium"
                        >
                          ✕ Remove
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleInputToggle(index)}
                      className={`w-full py-6 rounded-lg font-bold text-3xl transition-all ${
                        value === 1
                          ? 'bg-green-600 text-white border-2 border-green-700'
                          : 'bg-gray-300 text-gray-700 border-2 border-gray-400'
                      }`}
                    >
                      {value}
                    </button>
                    <div className="text-center text-xs text-gray-500 mt-2">
                      Click to toggle
                    </div>
                  </div>
                ))}
              </div>

              {result && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Result:</strong> {result.explanation}
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

            {/* Truth Table */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Truth Table
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {inputs.inputs.map((_, index) => (
                          <th key={index} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Input {String.fromCharCode(65 + index)}
                          </th>
                        ))}
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Output
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {result.truthTable.map((row, index) => (
                        <tr
                          key={index}
                          className={`${
                            isActiveRow(row)
                              ? 'bg-primary/10 border-l-4 border-primary'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {row.inputs.map((input, inputIndex) => (
                            <td key={inputIndex} className="px-4 py-3 text-center text-lg font-mono font-bold text-gray-900">
                              {input}
                            </td>
                          ))}
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center justify-center w-12 h-12 rounded-lg font-bold text-xl ${
                              row.output === 1
                                ? 'bg-green-100 text-green-800 border-2 border-green-300'
                                : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
                            }`}>
                              {row.output}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600">
                    <strong>Note:</strong> Highlighted row shows current input combination
                  </div>
                </div>
              </div>
            )}

            {/* Gate Information */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Logic Gate Reference
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {gates.map((gate) => (
                  <div
                    key={gate}
                    className={`p-3 rounded-lg border transition-colors ${
                      inputs.gate === gate
                        ? 'bg-primary/5 border-primary'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{getGateSymbol(gate)}</span>
                      <span className="font-semibold text-gray-900">{gate}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {getGateDescription(gate)}
                    </div>
                  </div>
                ))}
              </div>
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
                            {entry.inputs.gate}: {entry.inputs.inputs.join(', ')}
                            {' = '}{entry.result.output}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {entry.result.explanation}
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

      <LogicGateCalculatorSEO />
      <RelatedTools
        currentTool="logic-gate-calculator"
        tools={['binary-to-decimal-calculator', 'decimal-to-binary-calculator', 'adc-resolution-calculator']}
      />
    </>
  );
}

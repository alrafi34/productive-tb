"use client";

import { useState, useEffect, useCallback } from "react";
import { BinaryToDecimalInputs, BinaryToDecimalResult } from "./types";
import {
  convertBinaryToDecimal,
  validateBinaryInput,
  formatBinary,
  getExamples,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  debounce,
  saveSettings,
  loadSettings
} from "./logic";
import BinaryToDecimalCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function BinaryToDecimalCalculatorUI() {
  const savedSettings = loadSettings();
  
  const [inputs, setInputs] = useState<BinaryToDecimalInputs>({
    binaryInput: savedSettings.binaryInput || '',
    showSteps: savedSettings.showSteps ?? true
  });
  
  const [result, setResult] = useState<BinaryToDecimalResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());

  const examples = getExamples();

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(() => {
      setError(null);
      
      if (!inputs.binaryInput.trim()) {
        setResult(null);
        return;
      }
      
      const validationError = validateBinaryInput(inputs.binaryInput);
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      
      try {
        const calculatedResult = convertBinaryToDecimal(inputs);
        setResult(calculatedResult);
        saveToHistory(calculatedResult.binaryClean, calculatedResult.decimal);
        setHistory(getHistory());
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

  // Save settings when inputs change
  useEffect(() => {
    saveSettings(inputs);
  }, [inputs]);

  const handleInputChange = (value: string) => {
    // Allow only 0, 1, and spaces
    const filtered = value.replace(/[^01\s]/g, '');
    setInputs(prev => ({ ...prev, binaryInput: filtered }));
  };

  const handleClear = () => {
    setInputs(prev => ({ ...prev, binaryInput: '' }));
    setResult(null);
    setError(null);
  };

  const handleToggleSteps = () => {
    setInputs(prev => ({ ...prev, showSteps: !prev.showSteps }));
  };

  const handleApplyExample = (binary: string) => {
    setInputs(prev => ({ ...prev, binaryInput: binary }));
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.decimal.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopySteps = () => {
    if (result) {
      const text = result.steps.join('\n');
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExport = () => {
    if (result) {
      const text = exportToText(inputs.binaryInput, result);
      downloadFile(text, 'binary_to_decimal_conversion.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all conversion history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: typeof history[0]) => {
    setInputs(prev => ({ ...prev, binaryInput: entry.binary }));
    setShowHistory(false);
  };

  const handleFormat = () => {
    if (inputs.binaryInput) {
      const formatted = formatBinary(inputs.binaryInput);
      setInputs(prev => ({ ...prev, binaryInput: formatted }));
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔢</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Binary to Decimal Calculator</h3>
              <p className="text-sm text-blue-800">
                Convert binary numbers (base-2) to decimal (base-10) instantly with step-by-step explanation. Perfect for learning and verification.
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
                    Decimal Result
                  </p>
                  <div className="text-5xl font-bold mb-1 break-all">
                    {result.decimal.toLocaleString()}
                  </div>
                  <div className="text-xl text-primary-100">
                    Base 10
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Binary:</span>
                    <span className="font-semibold font-mono">{result.binaryClean}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Bits:</span>
                    <span className="font-semibold">{result.binaryClean.length}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Result"}
                  </button>
                  {inputs.showSteps && (
                    <button
                      onClick={handleCopySteps}
                      className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                    >
                      📝 Copy Steps
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Actions</h3>
              
              <div className="space-y-2">
                <button
                  onClick={handleClear}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  ↺ Clear
                </button>
                <button
                  onClick={handleFormat}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  disabled={!inputs.binaryInput}
                >
                  ✨ Format (4-bit groups)
                </button>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
                {result && (
                  <button
                    onClick={handleExport}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    📄 Export Report
                  </button>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Settings</h3>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.showSteps}
                  onChange={handleToggleSteps}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Show step-by-step calculation</span>
              </label>
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Enter Binary Number
              </h3>
              
              <div>
                <textarea
                  value={inputs.binaryInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-2xl font-mono resize-none"
                  placeholder="Enter binary (e.g., 1010 or 11111111)"
                  rows={3}
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2">
                  Enter only 0 and 1. Spaces are allowed and will be ignored.
                </p>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>✓ Valid binary number</strong> • {result.binaryClean.length} bits • Decimal: {result.decimal.toLocaleString()}
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

            {/* Examples */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h3 className="font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Quick Examples
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleApplyExample(example.binary)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-mono font-semibold text-gray-900 text-sm">{example.binary}</div>
                    <div className="text-xs text-gray-600 mt-1">{example.description}</div>
                    <div className="text-xs text-primary font-semibold mt-1">= {example.decimal}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bit Breakdown */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Bit Breakdown
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Position</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Bit</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Power</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Calculation</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Value</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {result.bitBreakdown.map((bit, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-center font-mono text-gray-900">{bit.power}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg font-bold text-lg ${
                              bit.bit === '1'
                                ? 'bg-green-100 text-green-800 border-2 border-green-300'
                                : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
                            }`}>
                              {bit.bit}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center font-mono text-sm text-gray-700">
                            2<sup>{bit.power}</sup>
                          </td>
                          <td className="px-4 py-3 text-center font-mono text-sm text-gray-700">
                            {bit.bit} × {Math.pow(2, bit.power)}
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-primary">
                            {bit.value.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-primary/5 font-bold">
                        <td colSpan={4} className="px-4 py-3 text-right text-gray-900">
                          Total (Decimal):
                        </td>
                        <td className="px-4 py-3 text-center text-primary text-lg">
                          {result.decimal.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Calculation Steps */}
            {result && !error && inputs.showSteps && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Step-by-Step Calculation
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
                    Conversion History
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
                      No conversions yet
                    </div>
                  ) : (
                    history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono font-semibold text-gray-900">
                            {entry.binary}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Decimal: <span className="font-semibold text-primary">{entry.decimal.toLocaleString()}</span>
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

      <BinaryToDecimalCalculatorSEO />
      <RelatedTools
        currentTool="binary-to-decimal-calculator"
        tools={['decimal-to-binary-calculator', 'logic-gate-calculator', 'adc-resolution-calculator']}
      />
    </>
  );
}

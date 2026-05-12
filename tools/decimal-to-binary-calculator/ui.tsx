"use client";

import { useState, useEffect } from "react";
import { DecimalToBinaryInputs, DecimalToBinaryResult } from "./types";
import {
  convertDecimalToBinary,
  validateDecimalInput,
  formatBinary,
  getExamples,
  saveToHistory,
  getHistory,
  clearHistory,
  exportToText,
  downloadFile,
  saveSettings,
  loadSettings
} from "./logic";
import DecimalToBinaryCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function DecimalToBinaryCalculatorUI() {
  const [inputs, setInputs] = useState<DecimalToBinaryInputs>({
    decimalInput: '',
    showSteps: true
  });
  
  const [result, setResult] = useState<DecimalToBinaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<ReturnType<typeof getHistory>>([]);

  // Load settings and history only on client side after mount
  useEffect(() => {
    const savedSettings = loadSettings();
    if (savedSettings.decimalInput || savedSettings.showSteps !== undefined) {
      setInputs({
        decimalInput: savedSettings.decimalInput || '',
        showSteps: savedSettings.showSteps ?? true
      });
    }
    setHistory(getHistory());
  }, []);

  const examples = getExamples();

  // Calculate in real-time
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      
      if (!inputs.decimalInput.trim()) {
        setResult(null);
        return;
      }
      
      const validationError = validateDecimalInput(inputs.decimalInput);
      if (validationError) {
        setError(validationError);
        setResult(null);
        return;
      }
      
      try {
        const calculatedResult = convertDecimalToBinary(inputs);
        setResult(calculatedResult);
        saveToHistory(calculatedResult.decimal, calculatedResult.binary);
        setHistory(getHistory());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation error");
        setResult(null);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [inputs]);

  // Save settings when inputs change
  useEffect(() => {
    saveSettings(inputs);
  }, [inputs]);

  const handleInputChange = (value: string) => {
    // Allow only numbers
    const filtered = value.replace(/[^0-9]/g, '');
    setInputs(prev => ({ ...prev, decimalInput: filtered }));
  };

  const handleClear = () => {
    setInputs(prev => ({ ...prev, decimalInput: '' }));
    setResult(null);
    setError(null);
  };

  const handleToggleSteps = () => {
    setInputs(prev => ({ ...prev, showSteps: !prev.showSteps }));
  };

  const handleApplyExample = (decimal: number) => {
    setInputs(prev => ({ ...prev, decimalInput: decimal.toString() }));
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.binary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyFormatted = () => {
    if (result) {
      const formatted = formatBinary(result.binary);
      navigator.clipboard.writeText(formatted);
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
      const text = exportToText(result);
      downloadFile(text, 'decimal_to_binary_conversion.txt');
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all conversion history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const loadFromHistory = (entry: typeof history[0]) => {
    setInputs(prev => ({ ...prev, decimalInput: entry.decimal.toString() }));
    setShowHistory(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔢</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Decimal to Binary Calculator</h3>
              <p className="text-sm text-blue-800">
                Convert decimal numbers (base-10) to binary (base-2) instantly with step-by-step explanation. Perfect for learning and verification.
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
                    Binary Result
                  </p>
                  <div className="text-4xl font-bold mb-1 break-all font-mono">
                    {result.binary}
                  </div>
                  <div className="text-xl text-primary-100">
                    Base 2
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-primary-100">Decimal:</span>
                    <span className="font-semibold">{result.decimal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Bits:</span>
                    <span className="font-semibold">{result.binary.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-100">Formatted:</span>
                    <span className="font-semibold font-mono text-xs">{formatBinary(result.binary)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Binary"}
                  </button>
                  <button
                    onClick={handleCopyFormatted}
                    className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
                  >
                    📝 Copy Formatted
                  </button>
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
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                >
                  📜 {showHistory ? 'Hide' : 'Show'} History
                </button>
                {result && inputs.showSteps && (
                  <button
                    onClick={handleCopySteps}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
                  >
                    📝 Copy Steps
                  </button>
                )}
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
                Enter Decimal Number
              </h3>
              
              <div>
                <input
                  type="text"
                  value={inputs.decimalInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-3xl font-mono text-center"
                  placeholder="Enter decimal (e.g., 10, 25, 255)"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Enter any positive integer (0 or greater)
                </p>
              </div>

              {result && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>✓ Valid decimal number</strong> • Binary: {result.binary} • {result.binary.length} bits
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
                    onClick={() => handleApplyExample(example.decimal)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors text-left"
                  >
                    <div className="font-bold text-gray-900 text-lg">{example.decimal}</div>
                    <div className="text-xs text-gray-600 mt-1">{example.description}</div>
                    <div className="text-xs text-primary font-mono font-semibold mt-1">= {example.binary}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Division Steps Table */}
            {result && !error && result.conversionSteps.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Division Steps
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Step</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Dividend</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">÷ 2</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Quotient</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Remainder</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {result.conversionSteps.map((step, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-center font-semibold text-gray-600">{index + 1}</td>
                          <td className="px-4 py-3 text-center font-mono text-gray-900">{step.dividend}</td>
                          <td className="px-4 py-3 text-center text-gray-500">÷ 2</td>
                          <td className="px-4 py-3 text-center font-mono text-gray-900">{step.quotient}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg font-bold text-lg ${
                              step.remainder === 1
                                ? 'bg-green-100 text-green-800 border-2 border-green-300'
                                : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
                            }`}>
                              {step.remainder}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>💡 Reading the result:</strong> Read the remainders from bottom to top to get the binary number: <span className="font-mono font-bold">{result.binary}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Calculation Steps */}
            {result && !error && inputs.showSteps && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Step-by-Step Explanation
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

            {/* Binary Representation */}
            {result && !error && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Binary Representation
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-2">Unformatted:</div>
                    <div className="font-mono text-2xl font-bold text-gray-900 break-all">
                      {result.binary}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-600 mb-2">Formatted (4-bit groups):</div>
                    <div className="font-mono text-2xl font-bold text-blue-900">
                      {formatBinary(result.binary)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-xs text-green-600 uppercase tracking-wider mb-1">Decimal</div>
                      <div className="text-2xl font-bold text-green-900">{result.decimal.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-xs text-purple-600 uppercase tracking-wider mb-1">Bit Length</div>
                      <div className="text-2xl font-bold text-purple-900">{result.binary.length} bits</div>
                    </div>
                  </div>
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
                          <span className="font-bold text-gray-900 text-lg">
                            {entry.decimal.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Binary: <span className="font-mono font-semibold text-primary">{entry.binary}</span>
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

      <DecimalToBinaryCalculatorSEO />
      <RelatedTools
        currentTool="decimal-to-binary-calculator"
        tools={['binary-to-decimal-calculator', 'logic-gate-calculator', 'dac-output-calculator']}
      />
    </>
  );
}

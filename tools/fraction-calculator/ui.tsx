"use client";

import { useState, useEffect } from "react";
import {
  calculateFractions,
  formatFraction,
  formatMixedNumber,
  generateRandomFraction,
  saveToHistory,
  getHistory,
  clearHistory,
  isValidFraction
} from "./logic";
import { Fraction, FractionOperation, FractionResult, CalculationHistory } from "./types";
import FractionCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FractionCalculatorUI() {
  // Fraction A
  const [numA, setNumA] = useState<string>("1");
  const [denA, setDenA] = useState<string>("2");

  // Fraction B
  const [numB, setNumB] = useState<string>("3");
  const [denB, setDenB] = useState<string>("4");

  // Operation
  const [operation, setOperation] = useState<FractionOperation>("add");

  // Options
  const [autoSimplify, setAutoSimplify] = useState<boolean>(true);
  const [showMixed, setShowMixed] = useState<boolean>(true);
  const [showDecimal, setShowDecimal] = useState<boolean>(true);
  const [showSteps, setShowSteps] = useState<boolean>(true);

  // Result
  const [result, setResult] = useState<FractionResult | null>(null);
  const [error, setError] = useState<string>("");

  // History
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // UI State
  const [copied, setCopied] = useState<string>("");

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Calculate
  const handleCalculate = () => {
    const nA = parseInt(numA);
    const dA = parseInt(denA);
    const nB = parseInt(numB);
    const dB = parseInt(denB);

    // Validation
    if (!isValidFraction(nA, dA)) {
      setError("Invalid Fraction A");
      return;
    }
    if (!isValidFraction(nB, dB)) {
      setError("Invalid Fraction B");
      return;
    }

    setError("");

    const fractionA: Fraction = { numerator: nA, denominator: dA };
    const fractionB: Fraction = { numerator: nB, denominator: dB };

    const calcResult = calculateFractions(fractionA, fractionB, operation);
    setResult(calcResult);

    saveToHistory(fractionA, fractionB, operation, calcResult);
    setHistory(getHistory());
  };

  // Auto-calculate on input change
  useEffect(() => {
    const nA = parseInt(numA);
    const dA = parseInt(denA);
    const nB = parseInt(numB);
    const dB = parseInt(denB);

    if (isValidFraction(nA, dA) && isValidFraction(nB, dB)) {
      const fractionA: Fraction = { numerator: nA, denominator: dA };
      const fractionB: Fraction = { numerator: nB, denominator: dB };
      const calcResult = calculateFractions(fractionA, fractionB, operation);
      setResult(calcResult);
      setError("");
    }
  }, [numA, denA, numB, denB, operation]);

  // Clear inputs
  const handleClear = () => {
    setNumA("0");
    setDenA("1");
    setNumB("0");
    setDenB("1");
    setResult(null);
    setError("");
  };

  // Random fractions
  const handleRandom = () => {
    const fracA = generateRandomFraction(12);
    const fracB = generateRandomFraction(12);
    setNumA(fracA.numerator.toString());
    setDenA(fracA.denominator.toString());
    setNumB(fracB.numerator.toString());
    setDenB(fracB.denominator.toString());
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  // Load from history
  const loadFromHistory = (item: CalculationHistory) => {
    setNumA(item.fractionA.numerator.toString());
    setDenA(item.fractionA.denominator.toString());
    setNumB(item.fractionB.numerator.toString());
    setDenB(item.fractionB.denominator.toString());
    setOperation(item.operation);
    setShowHistory(false);
  };

  // Clear history
  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  // Get operation symbol
  const getOperationSymbol = (op: FractionOperation): string => {
    switch (op) {
      case 'add': return '+';
      case 'subtract': return '−';
      case 'multiply': return '×';
      case 'divide': return '÷';
    }
  };

  // Get full result text
  const getFullResultText = (): string => {
    if (!result) return "";
    
    let text = `${numA}/${denA} ${getOperationSymbol(operation)} ${numB}/${denB} = ${formatFraction(result.simplified)}`;
    
    if (showMixed && result.mixedNumber) {
      text += `\nMixed Number: ${formatMixedNumber(result.mixedNumber)}`;
    }
    
    if (showDecimal) {
      text += `\nDecimal: ${result.decimal.toFixed(4)}`;
    }
    
    return text;
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">➗</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Fraction Calculator</h3>
              <p className="text-sm text-blue-800">
                Add, subtract, multiply, and divide fractions with automatic simplification. All calculations happen instantly in your browser.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Operation Selector */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Select Operation
              </h2>
              <div className="grid grid-cols-4 gap-2">
                {(['add', 'subtract', 'multiply', 'divide'] as FractionOperation[]).map((op) => (
                  <button
                    key={op}
                    onClick={() => setOperation(op)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all active:scale-95 ${
                      operation === op
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {getOperationSymbol(op)}
                  </button>
                ))}
              </div>
            </div>

            {/* Fraction Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Enter Fractions
                </h2>
                <button
                  onClick={handleRandom}
                  className="text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                >
                  🎲 Random
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Fraction A */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    Fraction A
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={numA}
                        onChange={(e) => setNumA(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center text-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="1"
                      />
                      <div className="text-center text-xs text-gray-500 mt-1">Numerator</div>
                    </div>
                    <div className="text-3xl font-bold text-gray-400">/</div>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={denA}
                        onChange={(e) => setDenA(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center text-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="2"
                      />
                      <div className="text-center text-xs text-gray-500 mt-1">Denominator</div>
                    </div>
                  </div>
                  
                  {/* Visual Representation A */}
                  {isValidFraction(parseInt(numA), parseInt(denA)) && (
                    <div className="mt-4">
                      <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all"
                          style={{ width: `${Math.min(100, (parseInt(numA) / parseInt(denA)) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 text-center mt-1">
                        {((parseInt(numA) / parseInt(denA)) * 100).toFixed(1)}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Fraction B */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    Fraction B
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={numB}
                        onChange={(e) => setNumB(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center text-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="3"
                      />
                      <div className="text-center text-xs text-gray-500 mt-1">Numerator</div>
                    </div>
                    <div className="text-3xl font-bold text-gray-400">/</div>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={denB}
                        onChange={(e) => setDenB(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center text-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="4"
                      />
                      <div className="text-center text-xs text-gray-500 mt-1">Denominator</div>
                    </div>
                  </div>

                  {/* Visual Representation B */}
                  {isValidFraction(parseInt(numB), parseInt(denB)) && (
                    <div className="mt-4">
                      <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all"
                          style={{ width: `${Math.min(100, (parseInt(numB) / parseInt(denB)) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 text-center mt-1">
                        {((parseInt(numB) / parseInt(denB)) * 100).toFixed(1)}%
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  ⚠️ {error}
                </div>
              )}
            </div>

            {/* Options */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Display Options
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMixed}
                    onChange={(e) => setShowMixed(e.target.checked)}
                    className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/50"
                  />
                  <span className="text-sm text-gray-700 font-medium">Show Mixed Number</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showDecimal}
                    onChange={(e) => setShowDecimal(e.target.checked)}
                    className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/50"
                  />
                  <span className="text-sm text-gray-700 font-medium">Show Decimal</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSteps}
                    onChange={(e) => setShowSteps(e.target.checked)}
                    className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/50"
                  />
                  <span className="text-sm text-gray-700 font-medium">Show Steps</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleClear}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                🗑️ Clear
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                📜 History
              </button>
            </div>
          </div>

          {/* Result Panel */}
          <div className="space-y-6">
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-6 text-white sticky top-6">
              <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Result
              </h2>

              {result ? (
                <div className="space-y-4">
                  {/* Main Result */}
                  <div className="text-center pb-4 border-b border-white/20">
                    <div className="text-primary-100 text-sm mb-2">Simplified</div>
                    <div className="text-5xl font-bold tracking-tight">
                      {formatFraction(result.simplified)}
                    </div>
                  </div>

                  {/* Mixed Number */}
                  {showMixed && result.mixedNumber && (
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-primary-100 text-xs mb-1">Mixed Number</div>
                      <div className="text-2xl font-bold">
                        {formatMixedNumber(result.mixedNumber)}
                      </div>
                    </div>
                  )}

                  {/* Decimal */}
                  {showDecimal && (
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-primary-100 text-xs mb-1">Decimal</div>
                      <div className="text-2xl font-bold font-mono">
                        {result.decimal.toFixed(6).replace(/\.?0+$/, '')}
                      </div>
                    </div>
                  )}

                  {/* Visual Result */}
                  {result.simplified.denominator !== 0 && (
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-primary-100 text-xs mb-2">Visual</div>
                      <div className="h-6 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white transition-all"
                          style={{ width: `${Math.min(100, Math.abs(result.decimal) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-primary-100 text-center mt-1">
                        {(Math.abs(result.decimal) * 100).toFixed(1)}%
                      </div>
                    </div>
                  )}

                  {/* Copy Buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => copyToClipboard(formatFraction(result.simplified), "fraction")}
                      className="w-full bg-white text-primary font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      {copied === "fraction" ? "✓ Copied!" : "📋 Copy Fraction"}
                    </button>
                    <button
                      onClick={() => copyToClipboard(getFullResultText(), "full")}
                      className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {copied === "full" ? "✓ Copied!" : "📋 Copy Full Result"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-primary-100">
                  Enter fractions to see results
                </div>
              )}
            </div>

            {/* Steps Panel */}
            {showSteps && result && result.steps && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Step-by-Step
                </h3>
                <div className="space-y-2 font-mono text-sm text-gray-600">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="bg-gray-50 rounded px-3 py-2">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Calculation History
              </h2>
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.length > 0 ? (
                history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm text-gray-900">
                        {formatFraction(item.fractionA)} {getOperationSymbol(item.operation)} {formatFraction(item.fractionB)} = {formatFraction(item.result.simplified)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    {item.result.mixedNumber && (
                      <div className="text-xs text-gray-600">
                        Mixed: {formatMixedNumber(item.result.mixedNumber)}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-gray-500">No history yet</p>
              )}
            </div>
          </div>
        )}

        {/* Quick Examples */}
        <div className="mt-6 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
          <h3 className="font-semibold text-purple-900 mb-3">Quick Examples</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => { setNumA("1"); setDenA("2"); setNumB("3"); setDenB("4"); setOperation("add"); }}
              className="p-3 bg-white hover:bg-purple-50 rounded-lg text-sm font-medium text-gray-700 transition-colors border border-purple-100"
            >
              1/2 + 3/4
            </button>
            <button
              onClick={() => { setNumA("7"); setDenA("8"); setNumB("1"); setDenB("4"); setOperation("subtract"); }}
              className="p-3 bg-white hover:bg-purple-50 rounded-lg text-sm font-medium text-gray-700 transition-colors border border-purple-100"
            >
              7/8 − 1/4
            </button>
            <button
              onClick={() => { setNumA("2"); setDenA("3"); setNumB("5"); setDenB("6"); setOperation("multiply"); }}
              className="p-3 bg-white hover:bg-purple-50 rounded-lg text-sm font-medium text-gray-700 transition-colors border border-purple-100"
            >
              2/3 × 5/6
            </button>
            <button
              onClick={() => { setNumA("3"); setDenA("4"); setNumB("2"); setDenB("5"); setOperation("divide"); }}
              className="p-3 bg-white hover:bg-purple-50 rounded-lg text-sm font-medium text-gray-700 transition-colors border border-purple-100"
            >
              3/4 ÷ 2/5
            </button>
          </div>
        </div>
      </div>

      <FractionCalculatorSEO />
      
      <RelatedTools
        currentTool="fraction-calculator"
        tools={['percentage-calculator', 'scientific-calculator', 'average-calculator']}
      />
    </>
  );
}

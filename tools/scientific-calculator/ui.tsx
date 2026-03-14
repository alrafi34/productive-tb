"use client";

import { useState, useEffect, useCallback } from "react";
import {
  evaluateExpression,
  formatNumber,
  saveToHistory,
  getHistory,
  clearHistory,
  exportHistoryAsJSON,
  generateRandomNumber,
  toRadians,
  toDegrees,
  factorial
} from "./logic";
import { AngleMode, CalculationHistory, MemoryState } from "./types";
import ScientificCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ScientificCalculatorUI() {
  const [display, setDisplay] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  const [angleMode, setAngleMode] = useState<AngleMode>("deg");
  const [memory, setMemory] = useState<MemoryState>({ value: 0 });
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [error, setError] = useState<string>("");

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Handle button click
  const handleButtonClick = (value: string) => {
    setError("");
    
    if (display === "0" && !isNaN(Number(value))) {
      setDisplay(value);
      setExpression(value);
    } else {
      setDisplay(display + value);
      setExpression(expression + value);
    }
  };

  // Handle function button
  const handleFunction = (fn: string) => {
    setError("");
    const newExpr = expression + fn + "(";
    setExpression(newExpr);
    setDisplay(display + fn + "(");
  };

  // Handle operator
  const handleOperator = (op: string) => {
    setError("");
    if (expression === "" || expression === "0") return;
    setExpression(expression + op);
    setDisplay(display + op);
  };

  // Clear display
  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setError("");
  };

  // Backspace
  const handleBackspace = () => {
    if (display.length <= 1) {
      setDisplay("0");
      setExpression("");
    } else {
      setDisplay(display.slice(0, -1));
      setExpression(expression.slice(0, -1));
    }
  };

  // Calculate result
  const handleEquals = () => {
    if (!expression || expression === "0") return;

    const { result, error: evalError } = evaluateExpression(expression, angleMode);
    
    if (evalError) {
      setError(evalError);
      return;
    }

    const formattedResult = formatNumber(result);
    setDisplay(formattedResult);
    saveToHistory(expression, formattedResult);
    setHistory(getHistory());
    setExpression(formattedResult);
  };

  // Memory functions
  const handleMemoryAdd = () => {
    const current = parseFloat(display) || 0;
    setMemory({ value: memory.value + current });
  };

  const handleMemorySubtract = () => {
    const current = parseFloat(display) || 0;
    setMemory({ value: memory.value - current });
  };

  const handleMemoryRecall = () => {
    setDisplay(memory.value.toString());
    setExpression(memory.value.toString());
  };

  const handleMemoryClear = () => {
    setMemory({ value: 0 });
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleButtonClick(e.key);
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperator(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Escape') {
        handleClear();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === '.') {
        handleButtonClick('.');
      } else if (e.key === '(' || e.key === ')') {
        handleButtonClick(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, expression, angleMode]);

  // Load from history
  const loadFromHistory = (item: CalculationHistory) => {
    setExpression(item.expression);
    setDisplay(item.expression);
    setShowHistory(false);
  };

  // Clear all history
  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  // Random number
  const handleRandom = () => {
    const rand = generateRandomNumber(0, 100);
    const formatted = formatNumber(rand);
    setDisplay(formatted);
    setExpression(formatted);
  };

  const buttonClass = `${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} rounded-lg font-semibold transition-all active:scale-95 shadow-sm`;
  const operatorClass = `${theme === 'dark' ? 'bg-orange-600 hover:bg-orange-500' : 'bg-orange-500 hover:bg-orange-600'} text-white rounded-lg font-semibold transition-all active:scale-95 shadow-sm`;
  const functionClass = `${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg font-semibold text-sm transition-all active:scale-95 shadow-sm`;

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Theme & Mode Controls */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              {angleMode === 'deg' ? '📐 DEG' : '📐 RAD'}
            </button>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
          
          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white border border-gray-200 text-gray-900'
            }`}
          >
            📜 History
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calculator Panel */}
          <div className="lg:col-span-2">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'} shadow-lg p-6`}>
              
              {/* Display */}
              <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} rounded-xl p-6 mb-6 min-h-[120px] flex flex-col justify-end`}>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-2 font-mono break-all min-h-[20px]`}>
                  {expression || " "}
                </div>
                <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-mono break-all`}>
                  {display}
                </div>
                {error && (
                  <div className="text-red-500 text-sm mt-2">⚠️ {error}</div>
                )}
              </div>

              {/* Memory & Special Functions */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                <button onClick={handleMemoryClear} className={functionClass + " py-2"}>MC</button>
                <button onClick={handleMemoryRecall} className={functionClass + " py-2"}>MR</button>
                <button onClick={handleMemoryAdd} className={functionClass + " py-2"}>M+</button>
                <button onClick={handleMemorySubtract} className={functionClass + " py-2"}>M-</button>
                <button onClick={handleRandom} className={functionClass + " py-2"}>RND</button>
              </div>

              {/* Scientific Functions */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                <button onClick={() => handleFunction('sin')} className={functionClass + " py-3"}>sin</button>
                <button onClick={() => handleFunction('cos')} className={functionClass + " py-3"}>cos</button>
                <button onClick={() => handleFunction('tan')} className={functionClass + " py-3"}>tan</button>
                <button onClick={() => handleFunction('log')} className={functionClass + " py-3"}>log</button>
                <button onClick={() => handleFunction('ln')} className={functionClass + " py-3"}>ln</button>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-4">
                <button onClick={() => handleFunction('asin')} className={functionClass + " py-3"}>asin</button>
                <button onClick={() => handleFunction('acos')} className={functionClass + " py-3"}>acos</button>
                <button onClick={() => handleFunction('atan')} className={functionClass + " py-3"}>atan</button>
                <button onClick={() => handleFunction('sqrt')} className={functionClass + " py-3"}>√</button>
                <button onClick={() => handleButtonClick('^')} className={functionClass + " py-3"}>x^y</button>
              </div>

              {/* Constants & Special */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                <button onClick={() => handleButtonClick('π')} className={functionClass + " py-3"}>π</button>
                <button onClick={() => handleButtonClick('e')} className={functionClass + " py-3"}>e</button>
                <button onClick={() => { const val = parseFloat(display); setDisplay(formatNumber(val * val)); setExpression((val * val).toString()); }} className={functionClass + " py-3"}>x²</button>
                <button onClick={() => { const val = parseFloat(display); setDisplay(formatNumber(Math.pow(10, val))); setExpression(Math.pow(10, val).toString()); }} className={functionClass + " py-3"}>10^x</button>
                <button onClick={() => { const val = parseFloat(display); setDisplay(formatNumber(Math.exp(val))); setExpression(Math.exp(val).toString()); }} className={functionClass + " py-3"}>e^x</button>
              </div>

              {/* Number Pad & Operators */}
              <div className="grid grid-cols-4 gap-2">
                <button onClick={handleClear} className="col-span-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold py-4 transition-all active:scale-95 shadow-sm">C</button>
                <button onClick={handleBackspace} className={operatorClass + " py-4"}>⌫</button>
                <button onClick={() => handleOperator('÷')} className={operatorClass + " py-4"}>÷</button>

                <button onClick={() => handleButtonClick('7')} className={buttonClass + " py-4 text-lg"}>7</button>
                <button onClick={() => handleButtonClick('8')} className={buttonClass + " py-4 text-lg"}>8</button>
                <button onClick={() => handleButtonClick('9')} className={buttonClass + " py-4 text-lg"}>9</button>
                <button onClick={() => handleOperator('×')} className={operatorClass + " py-4"}>×</button>

                <button onClick={() => handleButtonClick('4')} className={buttonClass + " py-4 text-lg"}>4</button>
                <button onClick={() => handleButtonClick('5')} className={buttonClass + " py-4 text-lg"}>5</button>
                <button onClick={() => handleButtonClick('6')} className={buttonClass + " py-4 text-lg"}>6</button>
                <button onClick={() => handleOperator('-')} className={operatorClass + " py-4"}>-</button>

                <button onClick={() => handleButtonClick('1')} className={buttonClass + " py-4 text-lg"}>1</button>
                <button onClick={() => handleButtonClick('2')} className={buttonClass + " py-4 text-lg"}>2</button>
                <button onClick={() => handleButtonClick('3')} className={buttonClass + " py-4 text-lg"}>3</button>
                <button onClick={() => handleOperator('+')} className={operatorClass + " py-4"}>+</button>

                <button onClick={() => handleButtonClick('0')} className={buttonClass + " py-4 text-lg"}>0</button>
                <button onClick={() => handleButtonClick('.')} className={buttonClass + " py-4 text-lg"}>.</button>
                <button onClick={() => handleButtonClick('(')} className={buttonClass + " py-4"}>(</button>
                <button onClick={() => handleButtonClick(')')} className={buttonClass + " py-4"}>)</button>

                <button onClick={handleEquals} className="col-span-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold py-4 text-xl transition-all active:scale-95 shadow-sm">=</button>
              </div>

              {/* Copy Button */}
              <button
                onClick={() => copyToClipboard(display)}
                className={`w-full mt-4 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'} rounded-lg font-semibold py-3 transition-colors`}
              >
                {copied ? '✓ Copied!' : '📋 Copy Result'}
              </button>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Memory Display */}
            <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl border shadow-sm p-6`}>
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`} style={{ fontFamily: "var(--font-heading)" }}>
                Memory
              </h3>
              <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg p-4`}>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-mono`}>
                  {formatNumber(memory.value)}
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl border shadow-sm p-6`}>
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`} style={{ fontFamily: "var(--font-heading)" }}>
                Quick Reference
              </h3>
              <div className={`space-y-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="flex justify-between">
                  <span>π (Pi)</span>
                  <span className="font-mono">3.14159...</span>
                </div>
                <div className="flex justify-between">
                  <span>e (Euler)</span>
                  <span className="font-mono">2.71828...</span>
                </div>
                <div className="flex justify-between">
                  <span>Mode</span>
                  <span className="font-semibold">{angleMode === 'deg' ? 'Degrees' : 'Radians'}</span>
                </div>
              </div>
            </div>

            {/* History Panel */}
            {showHistory && (
              <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl border shadow-sm p-6`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: "var(--font-heading)" }}>
                    History
                  </h3>
                  <div className="flex gap-2">
                    {history.length > 0 && (
                      <>
                        <button
                          onClick={() => exportHistoryAsJSON(history)}
                          className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded font-semibold transition-colors"
                        >
                          Export
                        </button>
                        <button
                          onClick={handleClearHistory}
                          className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded font-semibold transition-colors"
                        >
                          Clear
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {history.length > 0 ? (
                    history.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => loadFromHistory(item)}
                        className={`${theme === 'dark' ? 'bg-gray-900 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'} rounded-lg p-3 cursor-pointer transition-colors`}
                      >
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-mono mb-1 break-all`}>
                          {item.expression}
                        </div>
                        <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-mono`}>
                          = {item.result}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={`text-center py-8 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} text-sm`}>
                      No history yet
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'} border rounded-xl p-4 mt-6`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">⌨️</span>
            <div>
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-blue-900'} mb-1`}>Keyboard Shortcuts</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-blue-800'}`}>
                Numbers (0-9), Operators (+, -, *, /), Enter (=), Escape (Clear), Backspace, Parentheses ( )
              </p>
            </div>
          </div>
        </div>
      </div>

      <ScientificCalculatorSEO />
      
      <RelatedTools
        currentTool="scientific-calculator"
        tools={['percentage-calculator', 'matrix-calculator', 'average-calculator']}
      />
    </>
  );
}

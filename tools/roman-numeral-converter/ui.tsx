"use client";

import { useState, useEffect } from "react";
import {
  numberToRoman,
  romanToNumber,
  isValidRoman,
  getRandomNumber,
  loadHistory,
  saveHistory,
  clearHistory,
  ConversionHistory
} from "./logic";
import RomanNumeralConverterSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RomanNumeralConverterUI() {
  const [mode, setMode] = useState<'number' | 'roman'>('number');
  const [input, setInput] = useState<string>('49');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [copied, setCopied] = useState<string>('');

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    handleConversion();
  }, [mode, input]);

  const handleConversion = () => {
    setError('');
    
    if (!input.trim()) {
      setOutput('');
      return;
    }

    if (mode === 'number') {
      const num = parseInt(input);
      if (isNaN(num) || num <= 0 || num >= 4000) {
        setError('Enter a number between 1 and 3999');
        setOutput('');
        return;
      }
      const result = numberToRoman(num);
      setOutput(result);
    } else {
      if (!isValidRoman(input)) {
        setError('Invalid Roman numeral format');
        setOutput('');
        return;
      }
      const result = romanToNumber(input);
      if (result <= 0 || result >= 4000) {
        setError('Roman numeral out of valid range (1-3999)');
        setOutput('');
        return;
      }
      setOutput(result.toString());
    }
  };

  const handleConvert = () => {
    if (!output || error) return;
    
    const item: ConversionHistory = {
      id: Date.now().toString(),
      input,
      output,
      type: mode,
      timestamp: Date.now()
    };
    
    saveHistory(item);
    setHistory(loadHistory());
    setCopied('saved');
    setTimeout(() => setCopied(''), 2000);
  };

  const handleRandomNumber = () => {
    const random = getRandomNumber();
    setMode('number');
    setInput(random.toString());
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied('copied');
    setTimeout(() => setCopied(''), 2000);
  };

  const handleHistoryClick = (item: ConversionHistory) => {
    setMode(item.type);
    setInput(item.input);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const romanChart = [
    { numeral: 'I', value: 1 },
    { numeral: 'V', value: 5 },
    { numeral: 'X', value: 10 },
    { numeral: 'L', value: 50 },
    { numeral: 'C', value: 100 },
    { numeral: 'D', value: 500 },
    { numeral: 'M', value: 1000 },
    { numeral: 'IV', value: 4 },
    { numeral: 'IX', value: 9 },
    { numeral: 'XL', value: 40 },
    { numeral: 'XC', value: 90 },
    { numeral: 'CD', value: 400 },
    { numeral: 'CM', value: 900 }
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Mode Selector */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
          <button
            onClick={() => setMode('number')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'number'
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Number → Roman
          </button>
          <button
            onClick={() => setMode('roman')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'roman'
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Roman → Number
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
              
              {/* Input Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {mode === 'number' ? 'Enter Number' : 'Enter Roman Numeral'}
                </label>
                <input
                  type={mode === 'number' ? 'number' : 'text'}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={mode === 'number' ? 'e.g., 1987' : 'e.g., MCMLXXXVII'}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {mode === 'number' && (
                  <p className="text-xs text-gray-500 mt-2">Range: 1 - 3999</p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleRandomNumber}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors"
                >
                  🎲 Random
                </button>
                <button
                  onClick={() => setInput('')}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors"
                >
                  🗑️ Clear
                </button>
              </div>

              {/* Roman Chart */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Roman Numeral Reference
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {romanChart.map((item) => (
                    <div
                      key={item.numeral}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-colors"
                      onClick={() => {
                        if (mode === 'roman') {
                          setInput(input + item.numeral);
                        }
                      }}
                    >
                      <div className="text-sm font-bold text-gray-900">{item.numeral}</div>
                      <div className="text-xs text-gray-500">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Result Panel */}
          <div className="sticky top-6">
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-8 text-white relative overflow-hidden">
              
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h18M3 6h18M3 18h18"></path>
                </svg>
              </div>

              <div className="space-y-6 relative z-10">
                
                {/* Result Display */}
                <div className="text-center pb-6 border-b border-white/20">
                  <p className="text-primary-100 font-medium mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    {mode === 'number' ? 'Roman Numeral' : 'Number'}
                  </p>
                  <h2 className="text-5xl font-bold tracking-tight break-words">
                    {output || '—'}
                  </h2>
                </div>

                {/* Conversion Info */}
                {output && !error && (
                  <div className="text-center text-primary-100 font-medium">
                    {mode === 'number'
                      ? `${input} = ${output}`
                      : `${input.toUpperCase()} = ${output}`
                    }
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => output && handleCopy(output)}
                    disabled={!output || !!error}
                    className="w-full bg-white disabled:bg-white/50 text-primary disabled:text-primary/50 font-semibold py-2.5 rounded-lg hover:bg-gray-50 disabled:hover:bg-white/50 transition-colors shadow-sm"
                  >
                    {copied === 'copied' ? '✓ Copied!' : '📋 Copy Result'}
                  </button>
                  <button
                    onClick={handleConvert}
                    disabled={!output || !!error}
                    className="w-full bg-primary-dark border border-white/20 text-white disabled:opacity-50 font-medium py-2 rounded-lg hover:bg-white/10 disabled:hover:bg-primary-dark transition-colors"
                  >
                    {copied === 'saved' ? '✓ Saved to History' : '💾 Save to History'}
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                Conversion History
              </h3>
              <button
                onClick={handleClearHistory}
                className="text-xs bg-red-50 hover:bg-red-100 text-red-700 font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleHistoryClick(item)}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-1">
                        {item.type === 'number' ? 'Number → Roman' : 'Roman → Number'}
                      </p>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {item.input}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        = {item.output}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.output);
                      }}
                      className="text-gray-400 hover:text-primary p-1 shrink-0"
                    >
                      📋
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <RomanNumeralConverterSEO />

      <RelatedTools
        currentTool="roman-numeral-converter"
        tools={['binary-hex-decimal-converter', 'timestamp-unix-converter', 'random-number-generator']}
      />
    </>
  );
}

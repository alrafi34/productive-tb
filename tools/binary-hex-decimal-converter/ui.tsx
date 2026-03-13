"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  parseInput,
  convertFromDecimal,
  groupBinary,
  validateInput,
  autoDetectBase,
  generateRandomNumber,
  saveToHistory,
  getHistory,
  clearHistory,
  exportAsJSON,
  debounce,
  ConversionResult,
  ConversionHistory
} from "./logic";
import BinaryHexDecimalConverterSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function BinaryHexDecimalConverterUI() {
  const [binary, setBinary] = useState("");
  const [decimal, setDecimal] = useState("");
  const [hex, setHex] = useState("");
  const [octal, setOctal] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [uppercase, setUppercase] = useState(true);
  const [groupBinaryDigits, setGroupBinaryDigits] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = {
    binary: useRef<HTMLInputElement>(null),
    decimal: useRef<HTMLInputElement>(null),
    hex: useRef<HTMLInputElement>(null),
    octal: useRef<HTMLInputElement>(null)
  };

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Perform conversion
  const performConversion = useCallback((value: string, base: 'binary' | 'decimal' | 'hex' | 'octal') => {
    setError("");

    if (!value.trim()) {
      setBinary("");
      setDecimal("");
      setHex("");
      setOctal("");
      setResult(null);
      return;
    }

    // Auto-detect if needed
    let detectedBase = base;
    if (value.startsWith('0x') || value.startsWith('0X')) {
      detectedBase = 'hex';
      value = value.slice(2);
    } else if (value.startsWith('0b') || value.startsWith('0B')) {
      detectedBase = 'binary';
      value = value.slice(2);
    } else if (value.startsWith('0o') || value.startsWith('0O')) {
      detectedBase = 'octal';
      value = value.slice(2);
    }

    if (!validateInput(value, detectedBase)) {
      setError(`Invalid ${detectedBase} input`);
      return;
    }

    const decimalValue = parseInput(value, detectedBase);
    if (decimalValue === null) {
      setError("Invalid number");
      return;
    }

    const converted = convertFromDecimal(decimalValue, uppercase);
    setResult(converted);
    setBinary(groupBinaryDigits ? groupBinary(converted.binary) : converted.binary);
    setDecimal(converted.decimal);
    setHex(converted.hex);
    setOctal(converted.octal);

    saveToHistory(decimalValue);
    setHistory(getHistory());
  }, [uppercase, groupBinaryDigits]);

  const debouncedConversion = useCallback(
    debounce((value: string, base: 'binary' | 'decimal' | 'hex' | 'octal') => {
      performConversion(value, base);
    }, 200),
    [performConversion]
  );

  // Handle input changes
  const handleBinaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    setBinary(value);
    debouncedConversion(value, 'binary');
  };

  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDecimal(value);
    debouncedConversion(value, 'decimal');
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHex(value);
    debouncedConversion(value, 'hex');
  };

  const handleOctalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOctal(value);
    debouncedConversion(value, 'octal');
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Copy all
  const copyAll = () => {
    if (!result) return;
    const text = `Binary: ${binary}\nDecimal: ${decimal}\nHex: ${hex}\nOctal: ${octal}`;
    navigator.clipboard.writeText(text);
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  };

  // Clear all
  const clearAll = () => {
    setBinary("");
    setDecimal("");
    setHex("");
    setOctal("");
    setResult(null);
    setError("");
  };

  // Random number
  const generateRandom = () => {
    const random = generateRandomNumber(32);
    setDecimal(random.toString());
    performConversion(random.toString(), 'decimal');
  };

  // Load from history
  const loadFromHistory = (item: ConversionHistory) => {
    setDecimal(item.decimal.toString());
    performConversion(item.decimal.toString(), 'decimal');
    setShowHistory(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "r") {
        e.preventDefault();
        generateRandom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔢</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Binary/Hex/Decimal Converter</h3>
              <p className="text-sm text-blue-800">
                Convert numbers between Binary, Decimal, Hexadecimal, and Octal bases instantly. See real-time conversions with bit visualization and advanced options.
              </p>
            </div>
          </div>
        </div>

        {/* Options Panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Options
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={groupBinaryDigits}
                onChange={(e) => {
                  setGroupBinaryDigits(e.target.checked);
                  if (result) {
                    setBinary(e.target.checked ? groupBinary(result.binary) : result.binary);
                  }
                }}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-gray-700">Group Binary Digits</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => {
                  setUppercase(e.target.checked);
                  if (result) {
                    const converted = convertFromDecimal(parseInt(result.decimal), e.target.checked);
                    setHex(converted.hex);
                  }
                }}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-gray-700">Uppercase Hex</span>
            </label>

            <button
              onClick={generateRandom}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
            >
              🎲 Random Number
            </button>
          </div>
        </div>

        {/* Input Panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              Number Bases
            </h2>
            <button
              onClick={clearAll}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
            >
              🗑️ Clear
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              ⚠️ {error}
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Binary */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Binary (Base 2)</label>
              <input
                ref={inputRefs.binary}
                type="text"
                value={binary}
                onChange={handleBinaryChange}
                placeholder="1010"
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 font-mono text-sm focus:outline-none focus:border-primary"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(binary.replace(/\s/g, ''), 'binary')}
                  disabled={!binary}
                  className="flex-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded text-xs font-semibold transition-colors"
                >
                  {copied === 'binary' ? '✓' : '📋'}
                </button>
              </div>
            </div>

            {/* Decimal */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Decimal (Base 10)</label>
              <input
                ref={inputRefs.decimal}
                type="text"
                value={decimal}
                onChange={handleDecimalChange}
                placeholder="10"
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 font-mono text-sm focus:outline-none focus:border-primary"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(decimal, 'decimal')}
                  disabled={!decimal}
                  className="flex-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded text-xs font-semibold transition-colors"
                >
                  {copied === 'decimal' ? '✓' : '📋'}
                </button>
              </div>
            </div>

            {/* Hex */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Hexadecimal (Base 16)</label>
              <input
                ref={inputRefs.hex}
                type="text"
                value={hex}
                onChange={handleHexChange}
                placeholder="A"
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 font-mono text-sm focus:outline-none focus:border-primary"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(hex, 'hex')}
                  disabled={!hex}
                  className="flex-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded text-xs font-semibold transition-colors"
                >
                  {copied === 'hex' ? '✓' : '📋'}
                </button>
              </div>
            </div>

            {/* Octal */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Octal (Base 8)</label>
              <input
                ref={inputRefs.octal}
                type="text"
                value={octal}
                onChange={handleOctalChange}
                placeholder="12"
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 font-mono text-sm focus:outline-none focus:border-primary"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(octal, 'octal')}
                  disabled={!octal}
                  className="flex-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded text-xs font-semibold transition-colors"
                >
                  {copied === 'octal' ? '✓' : '📋'}
                </button>
              </div>
            </div>
          </div>

          {/* Copy All Button */}
          <button
            onClick={copyAll}
            disabled={!result}
            className="w-full mt-4 px-4 py-2 bg-primary hover:bg-primary-hover disabled:opacity-40 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            {copied === 'all' ? '✓ Copied All' : '📋 Copy All Bases'}
          </button>
        </div>

        {/* Bit Information */}
        {result && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              📊 Bit Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Bit Length</div>
                <div className="text-3xl font-bold text-gray-900">{result.bitLength}</div>
                <div className="text-xs text-gray-500 mt-1">bits required</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">Decimal Value</div>
                <div className="text-3xl font-bold text-blue-900">{result.decimal}</div>
              </div>
            </div>

            {/* Bit Visualization */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-700">Bit Visualization</div>
              <div className="flex flex-wrap gap-1 p-4 bg-gray-50 rounded-lg">
                {result.binary.split('').map((bit, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 flex items-center justify-center rounded font-semibold text-sm ${
                      bit === '1'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {bit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              Conversion History (Last 20)
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {showHistory ? "Hide" : "Show"}
              </button>
              {history.length > 0 && (
                <button
                  onClick={() => {
                    clearHistory();
                    setHistory([]);
                  }}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {showHistory && (
            <div className="space-y-2">
              {history.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No conversion history yet</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <code className="font-mono text-gray-800">{item.decimal}</code>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Keyboard Shortcuts</h3>
          <div className="text-xs text-gray-600">
            <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl+R</kbd> Generate random number
          </div>
        </div>
      </div>

      <BinaryHexDecimalConverterSEOContent />
      <RelatedTools
        currentTool="binary-hex-decimal-converter"
        tools={["base64-encoder-decoder", "hash-generator", "timestamp-unix-converter"]}
      />
    </>
  );
}

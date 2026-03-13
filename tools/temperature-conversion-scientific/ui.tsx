"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  TemperatureUnit, 
  convertTemperature, 
  formatTemperature, 
  TemperatureHistoryEntry,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const UNITS: { value: TemperatureUnit; label: string; symbol: string }[] = [
  { value: "Celsius", label: "Celsius", symbol: "°C" },
  { value: "Fahrenheit", label: "Fahrenheit", symbol: "°F" },
  { value: "Kelvin", label: "Kelvin", symbol: "K" },
  { value: "Rankine", label: "Rankine", symbol: "°R" },
];

export default function TemperatureConversionUI() {
  const [inputValue, setInputValue] = useState<string>("25");
  const [inputUnit, setInputUnit] = useState<TemperatureUnit>("Celsius");
  const [precision, setPrecision] = useState<number>(2);
  const [history, setHistory] = useState<TemperatureHistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  const handleCopy = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return;
    
    const results = convertTemperature(val, inputUnit);
    const text = UNITS.map(u => `${u.label}: ${formatTemperature(results[u.value], precision)}${u.symbol}`).join('\n');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToHistory = useCallback(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return;
    
    const entry: TemperatureHistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      inputValue: val,
      inputUnit,
      results: convertTemperature(val, inputUnit),
      precision
    };
    
    saveToHistory(entry);
    setHistory(getHistory());
  }, [inputValue, inputUnit, precision]);

  const handleClear = () => {
    setInputValue("");
  };
  
  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleDeleteHistoryEntry = (id: string) => {
    deleteHistoryEntry(id);
    setHistory(getHistory());
  };

  const currentVal = parseFloat(inputValue);
  const isValid = !isNaN(currentVal) && inputValue.trim() !== "";
  const results = isValid ? convertTemperature(currentVal, inputUnit) : null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        {/* Controls Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Temperature Value</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800 text-lg font-medium"
              placeholder="e.g. 25"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Input Unit</label>
            <select
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value as TemperatureUnit)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800 text-lg font-medium"
            >
              {UNITS.map(u => (
                <option key={u.value} value={u.value}>{u.label} ({u.symbol})</option>
              ))}
            </select>
          </div>

          {/* Precision Slider - Takes full width on smaller screens, 1 col on large */}
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Decimal Precision</label>
              <span className="text-sm font-semibold text-primary">{precision}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={precision}
              onChange={(e) => setPrecision(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mt-3"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0</span>
              <span>10</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results ? (
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {UNITS.map((unit) => {
                const isInputUnit = unit.value === inputUnit;
                return (
                  <div 
                    key={unit.value} 
                    className={`relative overflow-hidden p-6 rounded-2xl border ${isInputUnit ? 'border-primary/40 bg-primary/5 shadow-sm' : 'border-gray-100 bg-white shadow-sm transition-transform hover:-translate-y-1'}`}
                  >
                    <div className="flex items-center gap-2 mb-2 text-gray-500">
                      <span className="text-sm font-medium">{unit.label}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                        {formatTemperature(results[unit.value], precision)}
                      </span>
                      <span className="text-lg font-semibold text-gray-500">{unit.symbol}</span>
                    </div>
                    
                    {isInputUnit && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] uppercase font-bold text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
                        Original
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mb-8 p-8 text-center bg-gray-50 rounded-xl border border-gray-100 border-dashed">
            <p className="text-gray-500">Enter a valid numeric temperature to see conversions.</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSaveToHistory}
            disabled={!isValid}
            className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            <span>💾</span> Save to History
          </button>
          
          <button
            onClick={handleCopy}
            disabled={!isValid}
            className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            <span>{copied ? "✅" : "📋"}</span>
            {copied ? "Copied" : "Copy All"}
          </button>

          <button
            onClick={handleClear}
            disabled={!inputValue}
            className="px-6 py-2.5 bg-white border-2 border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 text-gray-600 font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            <span>🗑️</span> Clear Input
          </button>
        </div>
      </div>

      {/* History Section */}
      {isClient && history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>🕒</span> Recent Conversions
            </h3>
            <button
              onClick={handleClearHistory}
              className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              Clear All
            </button>
          </div>
          
          <div className="space-y-3">
            {history.map((entry) => (
              <div key={entry.id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 hover:bg-gray-100/80 rounded-xl border border-transparent hover:border-gray-200 transition-colors gap-4">
                <div className="flex flex-wrap gap-x-6 gap-y-2 items-center flex-1">
                  <div className="flex items-center gap-2 font-semibold text-gray-900 text-lg whitespace-nowrap">
                    {formatTemperature(entry.inputValue, entry.precision)}
                    <span className="text-gray-500 text-sm">{UNITS.find(u => u.value === entry.inputUnit)?.symbol}</span>
                    <span className="text-gray-300 mx-2">→</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm max-w-2xl">
                    {UNITS.filter(u => u.value !== entry.inputUnit).map(u => (
                      <div key={u.value} className="flex gap-1.5 items-baseline">
                        <span className="text-gray-500 font-medium">{u.label}:</span>
                        <span className="text-gray-900 font-semibold">{formatTemperature(entry.results[u.value], entry.precision)}{u.symbol}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => handleDeleteHistoryEntry(entry.id)}
                  className="sm:opacity-0 sm:group-hover:opacity-100 self-end sm:self-center p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all border border-gray-200"
                  aria-label="Delete history entry"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToolSEOContent />
      <RelatedTools currentTool="temperature-conversion-scientific" tools={["scientific-calculator-tool", "unit-converter", "fuel-cost-calculator"]} />
    </div>
  );
}

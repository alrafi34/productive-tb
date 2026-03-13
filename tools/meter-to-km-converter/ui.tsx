"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  MToKmEntry,
  convertMeterToKm, 
  formatValue,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function MeterToKmUI() {
  const [inputValue, setInputValue] = useState<string>("");
  const [precision, setPrecision] = useState<number>(3);
  const [history, setHistory] = useState<MToKmEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  const currentVal = parseFloat(inputValue);
  const isValid = !isNaN(currentVal) && inputValue.trim() !== "";
  const result = isValid ? convertMeterToKm(currentVal) : null;

  const handleCopy = () => {
    if (result === null) return;
    const text = formatValue(result, precision);
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToHistory = useCallback(() => {
    if (result === null) return;
    
    const entry: MToKmEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      meterValue: currentVal,
      kmValue: result,
      precision
    };
    
    saveToHistory(entry);
    setHistory(getHistory());
  }, [currentVal, result, precision]);

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

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in the precision slider or it takes away focus
      if (document.activeElement?.tagName === 'INPUT' && document.activeElement.getAttribute('type') === 'range') return;
      
      if (e.key === 'Enter' && isValid) {
        handleCopy();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isValid, handleCopy]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Meter (M) to Kilometer (KM)</h2>
          <p className="text-gray-500 text-sm mt-1">Convert meters to kilometers dynamically.</p>
        </div>

        {/* Controls Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50/50 p-6 rounded-xl border border-gray-100">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Meters (m)</label>
            <div className="relative">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800 text-lg font-medium transition-all"
                placeholder="e.g. 500"
                autoFocus
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">m</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="block text-sm font-medium text-gray-700">Result Precision</label>
              <span className="text-sm font-semibold text-primary">{precision}</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              value={precision}
              onChange={(e) => setPrecision(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mt-3"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0 (Whole Number)</span>
              <span>6 Decimals</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result !== null ? (
          <div className="mb-8 p-8 flex flex-col items-center justify-center bg-violet-50 text-violet-900 rounded-2xl border border-violet-100 shadow-sm relative overflow-hidden transition-all duration-300">
            <div className="uppercase tracking-widest text-violet-600 text-xs font-bold mb-2 z-10">Kilometers (km)</div>
            <div className="text-5xl md:text-6xl font-black z-10 break-all text-center px-4" style={{ fontFamily: "var(--font-heading)" }}>
              {formatValue(result, precision)} <span className="text-violet-700 font-bold ml-1">km</span>
            </div>
            {/* Background design */}
            <div className="absolute -right-8 -bottom-8 text-9xl text-violet-500 opacity-5 select-none font-bold">
               KM
            </div>
          </div>
        ) : (
          <div className="mb-8 p-8 text-center bg-gray-50 rounded-xl border border-gray-100 border-dashed">
            <p className="text-gray-500">Enter a valid number of meters above to view the conversion.</p>
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
            {copied ? "Copied" : "Copy Result"}
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
                  <div className="flex items-center gap-2 font-semibold text-gray-600 text-lg whitespace-nowrap">
                    {formatValue(entry.meterValue, entry.precision)} <span className="text-gray-400 text-sm">m</span>
                  </div>
                  <span className="text-gray-300">→</span>
                  <div className="flex items-center gap-2 font-bold text-violet-600 text-lg whitespace-nowrap bg-violet-50 px-3 py-1 rounded-lg border border-violet-100">
                    {formatValue(entry.kmValue, entry.precision)}
                    <span className="text-violet-800 text-xs ml-1 font-bold">km</span>
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
      <RelatedTools currentTool="meter-to-km-converter" tools={["centimeter-to-meter-converter", "unit-ratio-calculator", "time-duration-calculator"]} />
    </div>
  );
}

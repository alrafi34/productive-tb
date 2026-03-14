"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  ConversionMode, 
  ConversionHistoryEntry,
  convertValue, 
  formatValue,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function InchToCmConverterUI() {
  const [inputValue, setInputValue] = useState<string>("10");
  const [mode, setMode] = useState<ConversionMode>("inch-to-cm");
  const [history, setHistory] = useState<ConversionHistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  const valNum = parseFloat(inputValue);
  const isValid = !isNaN(valNum);
  const result = isValid ? convertValue(valNum, mode) : 0;

  const handleCopy = () => {
    if (!isValid) return;
    const fromUnit = mode === 'inch-to-cm' ? 'inches' : 'cm';
    const toUnit = mode === 'inch-to-cm' ? 'cm' : 'inches';
    const text = `${inputValue} ${fromUnit} = ${formatValue(result)} ${toUnit}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!isValid) return;
    
    const entry: ConversionHistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      inputValue: valNum,
      mode,
      result
    };
    
    saveToHistory(entry);
    setHistory(getHistory());
  }, [valNum, mode, result]);

  const handleClear = () => {
    setInputValue("");
  };

  const handleSwap = () => {
    setMode(prev => prev === 'inch-to-cm' ? 'cm-to-inch' : 'inch-to-cm');
    if (isValid) {
      setInputValue(formatValue(result));
    }
  };

  const handleDeleteHistory = (id: string) => {
    deleteHistoryEntry(id);
    setHistory(getHistory());
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isValid) {
        handleCopy();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isValid, handleCopy]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        
        {/* Input Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {mode === 'inch-to-cm' ? 'Inches' : 'Centimeters'}
              </label>
              <div className="relative group">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all text-xl font-semibold text-gray-800"
                  placeholder={mode === 'inch-to-cm' ? "Enter inches" : "Enter cm"}
                  autoFocus
                />
                <button 
                  onClick={handleSwap}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white shadow-sm border border-gray-100 rounded-xl hover:bg-gray-50 hover:scale-110 transition-all text-primary"
                  title="Swap Units"
                >
                  🔄
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-medium text-gray-500">Quick Adjustment</label>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                  Max: 500
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="0.1"
                value={isValid ? valNum : 0}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>

          <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-sm font-bold uppercase tracking-wider text-primary/60">Result</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                {isValid ? formatValue(result) : '0'}
              </span>
              <span className="text-2xl font-bold text-primary">
                {mode === 'inch-to-cm' ? 'cm' : 'in'}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium italic">
              {mode === 'inch-to-cm' ? 'Inches to Centimeters' : 'Centimeters to Inches'}
            </p>
            
            {/* Visual scale indicator */}
            <div className="mt-6 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-primary transition-all duration-500"
                 style={{ width: `${Math.min((valNum / 500) * 100, 100)}%` }}
               />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
          <button
            onClick={handleCopy}
            disabled={!isValid}
            className="flex-1 min-w-[140px] px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none translate-y-0 active:translate-y-0.5 hover:-translate-y-0.5"
          >
            <span>{copied ? '✅' : '📋'}</span>
            {copied ? 'Copied!' : 'Copy Result'}
          </button>
          
          <button
            onClick={handleSaveToHistory}
            disabled={!isValid}
            className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 translate-y-0 active:translate-y-0.5 hover:-translate-y-0.5 disabled:opacity-50"
          >
            💾 Save History
          </button>

          <button
            onClick={handleClear}
            className="px-6 py-3 bg-white border-2 border-gray-100 hover:border-red-200 hover:text-red-600 text-gray-600 font-bold rounded-xl transition-all"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* History Panel */}
      {isClient && history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="p-1.5 bg-gray-100 rounded-lg">🕒</span>
              Recent Conversions
            </h3>
            <button
              onClick={() => { clearHistory(); setHistory([]); }}
              className="text-sm font-bold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-3">
            {history.map((entry) => (
              <div key={entry.id} className="group flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter italic">
                      {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{entry.inputValue} {entry.mode === 'inch-to-cm' ? 'in' : 'cm'}</span>
                      <span className="text-gray-300">→</span>
                      <span className="font-black text-primary">{formatValue(entry.result)} {entry.mode === 'inch-to-cm' ? 'cm' : 'in'}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteHistory(entry.id)}
                  className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-gray-100"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToolSEOContent />
      <RelatedTools currentTool="inch-to-cm-converter" tools={["centimeter-to-meter-converter", "meter-to-km-converter", "temperature-conversion-scientific"]} />
    </div>
  );
}

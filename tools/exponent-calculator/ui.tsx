"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  ExponentHistoryEntry,
  calculatePower, 
  formatValue,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry,
  getExpansionSteps
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ExponentCalculatorUI() {
  const [baseInput, setBaseInput] = useState<string>("2");
  const [exponentInput, setExponentInput] = useState<string>("3");
  const [precision, setPrecision] = useState<number>(2);
  const [isScientific, setIsScientific] = useState<boolean>(false);
  const [showSteps, setShowSteps] = useState<boolean>(true);
  const [history, setHistory] = useState<ExponentHistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  const baseNum = parseFloat(baseInput);
  const exponentNum = parseFloat(exponentInput);
  const isValid = !isNaN(baseNum) && !isNaN(exponentNum);
  
  const result = useMemo(() => {
    if (!isValid) return 0;
    return calculatePower(baseNum, exponentNum);
  }, [baseNum, exponentNum, isValid]);

  const expansionSteps = useMemo(() => {
    if (!showSteps || !isValid) return "";
    return getExpansionSteps(baseNum, exponentNum);
  }, [baseNum, exponentNum, showSteps, isValid]);

  const handleCopy = () => {
    if (!isValid) return;
    const fromStr = `${baseInput}^${exponentInput}`;
    const toStr = formatValue(result, precision, isScientific);
    const text = `${fromStr} = ${toStr}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!isValid) return;
    
    const entry: ExponentHistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      base: baseNum,
      exponent: exponentNum,
      result,
      precision
    };
    
    saveToHistory(entry);
    setHistory(getHistory());
  }, [baseNum, exponentNum, result, precision, isValid]);

  const handleClear = () => {
    setBaseInput("");
    setExponentInput("");
  };

  const handleRandom = () => {
    setBaseInput(Math.floor(Math.random() * 20 + 2).toString());
    setExponentInput(Math.floor(Math.random() * 5 + 2).toString());
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isValid) {
        handleCopy();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isValid, handleCopy]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Base (x)</label>
                <input
                  type="number"
                  value={baseInput}
                  onChange={(e) => setBaseInput(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-xl font-bold text-gray-800"
                  placeholder="e.g. 2"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Exponent (y)</label>
                <input
                  type="number"
                  value={exponentInput}
                  onChange={(e) => setExponentInput(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white transition-all text-xl font-bold text-gray-800"
                  placeholder="e.g. 3"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-500">Exponent Slider</label>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                    {exponentNum || 0}
                  </span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.1"
                  value={isValid ? exponentNum : 0}
                  onChange={(e) => setExponentInput(e.target.value)}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={isScientific} 
                    onChange={(e) => setIsScientific(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Scientific Notation</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={showSteps} 
                    onChange={(e) => setShowSteps(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Show Steps</span>
                </label>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Decimal Precision</label>
                <div className="flex gap-2">
                  {[0, 2, 4, 6].map(p => (
                    <button 
                      key={p}
                      onClick={() => setPrecision(p)}
                      className={`flex-1 py-1 px-2 rounded-lg text-xs font-bold border transition-all ${precision === p ? 'bg-primary border-primary text-white shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full gap-4">
            <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-primary/20 flex flex-col items-center justify-center text-center space-y-2 flex-grow shadow-inner">
              <span className="text-xs font-bold uppercase tracking-wider text-primary/60">Power Result</span>
              {isValid ? (
                <>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                      {formatValue(result, precision, isScientific)}
                    </span>
                  </div>
                  {expansionSteps && (
                    <div className="mt-4 px-4 py-2 bg-white/60 rounded-xl border border-primary/10 text-xs font-medium text-gray-600 font-mono">
                      {expansionSteps} = {formatValue(result, precision, isScientific)}
                    </div>
                  )}
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-300 italic">Enter values...</span>
              )}
              <div className="absolute -right-6 -top-6 text-8xl text-primary opacity-5 select-none font-bold">xʸ</div>
            </div>
            
            {isValid && (
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between text-xs font-medium text-gray-500">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Calculation: <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200">{baseNum}^{exponentNum}</code>
                </span>
                {exponentNum === 0 && <span className="text-primary font-bold">Hint: x⁰ = 1</span>}
                {exponentNum === 0.5 && <span className="text-primary font-bold">Hint: x⁰·⁵ = √x</span>}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
          <button
            onClick={handleCopy}
            disabled={!isValid}
            className="flex-1 min-w-[140px] px-6 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:shadow-none translate-y-0 active:translate-y-0.5 hover:-translate-y-0.5"
          >
            <span>{copied ? '✅' : '📋'}</span>
            {copied ? 'Copied' : 'Copy Result'}
          </button>
          
          <button
            onClick={handleSaveToHistory}
            disabled={!isValid}
            className="px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 translate-y-0 active:translate-y-0.5 hover:-translate-y-0.5 disabled:opacity-50"
          >
            💾 Save
          </button>

          <button
            onClick={handleRandom}
            className="px-6 py-4 bg-white border-2 border-gray-100 hover:border-primary hover:text-primary text-gray-600 font-bold rounded-2xl transition-all"
          >
            🎲 Random
          </button>

          <button
            onClick={handleClear}
            className="px-6 py-4 bg-white border-2 border-gray-100 hover:border-red-200 hover:text-red-500 text-gray-600 font-bold rounded-2xl transition-all"
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
              Recent Powers
            </h3>
            <button
              onClick={() => { clearHistory(); setHistory([]); }}
              className="text-sm font-bold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              Clear History
            </button>
          </div>

          <div className="space-y-3">
            {history.map((entry) => (
              <div key={entry.id} className="group flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                      {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{entry.base}<sup>{entry.exponent}</sup></span>
                      <span className="text-gray-300">=</span>
                      <span className="font-black text-primary">{formatValue(entry.result, entry.precision, false)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { deleteHistoryEntry(entry.id); setHistory(getHistory()); }}
                  className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-white rounded-xl shadow-sm border border-gray-100"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToolSEOContent />
      <div className="mt-12">
        <RelatedTools currentTool="exponent-calculator" tools={["square-root-calculator", "scientific-calculator", "fraction-calculator"]} />
      </div>
    </div>
  );
}

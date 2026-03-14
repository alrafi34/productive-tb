"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  SqrtHistoryEntry,
  calculateSqrt, 
  formatValue,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry,
  generateBatchResults
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SquareRootCalculatorUI() {
  const [inputValue, setInputValue] = useState<string>("25");
  const [precision, setPrecision] = useState<number>(4);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);
  const [showVerification, setShowVerification] = useState<boolean>(true);
  const [batchMode, setBatchMode] = useState<boolean>(false);
  const [history, setHistory] = useState<SqrtHistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  const valNum = parseFloat(inputValue);
  const isValid = !isNaN(valNum);
  const result = isValid && valNum >= 0 ? calculateSqrt(valNum) : 0;
  const error = isValid && valNum < 0 ? "Square root of negative numbers requires complex numbers." : !isValid && inputValue.trim() !== "" ? "Please enter a valid number." : null;

  const batchResults = useMemo(() => {
    if (!batchMode || inputValue.trim() === "") return [];
    return generateBatchResults(inputValue, precision);
  }, [batchMode, inputValue, precision]);

  const handleCopy = () => {
    let text = "";
    if (batchMode) {
      text = batchResults.map(r => `√${r.input} = ${r.result}`).join('\n');
    } else if (isValid && valNum >= 0) {
      text = `${formatValue(result, precision)}`;
    }
    
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveToHistory = useCallback(() => {
    if (!isValid || valNum < 0 || batchMode) return;
    
    const entry: SqrtHistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      input: valNum,
      result,
      precision
    };
    
    saveToHistory(entry);
    setHistory(getHistory());
  }, [valNum, result, precision, isValid, batchMode]);

  const handleClear = () => {
    setInputValue("");
  };

  const handleRandom = () => {
    setInputValue(Math.floor(Math.random() * 1000).toString());
  };

  const handleExportCSV = () => {
    if (!batchMode || batchResults.length === 0) return;
    const csvContent = "data:text/csv;charset=utf-8,Number,Square Root\n" 
      + batchResults.map(r => `${r.input},${r.result}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "square_root_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isValid && !batchMode) {
        handleCopy();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isValid, handleCopy, batchMode]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        
        {/* Toggle Panel */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setBatchMode(false)}
            className={`px-4 py-2 rounded-xl font-bold transition-all text-sm flex items-center gap-2 ${!batchMode ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            <span>🔢</span> Single Mode
          </button>
          <button 
            onClick={() => setBatchMode(true)}
            className={`px-4 py-2 rounded-xl font-bold transition-all text-sm flex items-center gap-2 ${batchMode ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          >
            <span>📑</span> Batch Mode
          </button>
        </div>

        {/* Input Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {batchMode ? "Numbers (comma or space separated)" : "Enter Number"}
              </label>
              {batchMode ? (
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all text-lg font-mono text-gray-800 h-32 resize-none"
                  placeholder="e.g. 4, 9, 16, 25"
                />
              ) : (
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white transition-all text-xl font-semibold text-gray-800"
                  placeholder="e.g. 144"
                  autoFocus
                />
              )}
              {error && <p className="text-red-500 text-xs font-bold mt-1">⚠️ {error}</p>}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-medium text-gray-500">Decimal Precision</label>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                    {precision} Places
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={precision}
                  onChange={(e) => setPrecision(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={showExplanation} 
                    onChange={(e) => setShowExplanation(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Explanation</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={showVerification} 
                    onChange={(e) => setShowVerification(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Verification</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4 h-full">
            {!batchMode ? (
              <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 flex flex-col items-center justify-center text-center space-y-2 min-h-[220px]">
                <span className="text-sm font-bold uppercase tracking-wider text-primary/60">Square Root Result</span>
                {isValid && valNum >= 0 ? (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                        {formatValue(result, precision)}
                      </span>
                    </div>
                    {showVerification && (
                      <div className="mt-4 p-3 bg-white/50 rounded-xl border border-primary/10 text-xs font-bold text-gray-500">
                        Verification: {formatValue(result, precision)} × {formatValue(result, precision)} ≈ {formatValue(result * result, 2)}
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-3xl font-black text-gray-300 italic">No Input</span>
                )}
                <div className="absolute -right-8 -bottom-8 text-9xl text-primary opacity-5 select-none font-bold">√</div>
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-gray-50 border-2 border-gray-100 min-h-[220px] max-h-[300px] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-400 uppercase">Batch Results</span>
                  {batchResults.length > 0 && (
                    <button onClick={handleExportCSV} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                      📥 CSV
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {batchResults.map((r, i) => (
                    <div key={i} className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100 text-sm">
                      <span className="font-mono text-gray-500">√{r.input}</span>
                      <span className="font-bold text-primary">{r.result}</span>
                    </div>
                  ))}
                  {batchResults.length === 0 && <p className="text-sm text-gray-400 text-center py-8">Enter numbers to see batch results.</p>}
                </div>
              </div>
            )}
            
            {showExplanation && !batchMode && isValid && valNum >= 0 && (
              <div className="p-4 bg-yellow-50/50 rounded-2xl border border-yellow-100 text-xs text-yellow-800 leading-relaxed italic">
                The square root of {valNum} is a number which, when multiplied by itself, is equal to {valNum}. In mathematical terms: 
                <span className="not-italic font-bold block mt-1">√{valNum} = {formatValue(result, precision)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
          {!batchMode && (
            <button
              onClick={() => {}}
              disabled={!isValid || valNum < 0}
              className="flex-1 min-w-[140px] px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none translate-y-0 active:translate-y-0.5 hover:-translate-y-0.5"
            >
              <span>✨</span> Calculate
            </button>
          )}
          
          <button
            onClick={handleCopy}
            disabled={(!batchMode && (!isValid || valNum < 0)) || (batchMode && batchResults.length === 0)}
            className="flex-1 min-w-[140px] px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 translate-y-0 active:translate-y-0.5 hover:-translate-y-0.5 disabled:opacity-50"
          >
            <span>{copied ? '✅' : '📋'}</span>
            {copied ? 'Copied!' : 'Copy Result'}
          </button>

          {!batchMode && (
            <button
              onClick={handleSaveToHistory}
              disabled={!isValid || valNum < 0}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 translate-y-0 active:translate-y-0.5 hover:-translate-y-0.5 disabled:opacity-50"
            >
              💾 Save
            </button>
          )}

          <button
            onClick={handleRandom}
            className="px-6 py-3 bg-white border-2 border-gray-100 hover:border-primary hover:text-primary text-gray-600 font-bold rounded-xl transition-all"
          >
            🎲 Random
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
      {isClient && history.length > 0 && !batchMode && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="p-1.5 bg-gray-100 rounded-lg">🕒</span>
              Recent Calculations
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
                      <span className="font-bold text-gray-900">√{entry.input}</span>
                      <span className="text-gray-300">=</span>
                      <span className="font-black text-primary">{formatValue(entry.result, entry.precision)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { deleteHistoryEntry(entry.id); setHistory(getHistory()); }}
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
      <RelatedTools currentTool="square-root-calculator" tools={["scientific-calculator", "average-calculator", "inch-to-cm-converter"]} />
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  AreaHistoryEntry,
  convertArea, 
  formatAreaValue,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry,
  processBatchArea,
  AreaType
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function AreaConverterUI() {
  const [m2Input, setM2Input] = useState<string>("10");
  const [ft2Input, setFt2Input] = useState<string>("");
  const [precision, setPrecision] = useState<number>(2);
  const [batchMode, setBatchMode] = useState<boolean>(false);
  const [batchInput, setBatchInput] = useState<string>("");
  const [batchSource, setBatchSource] = useState<AreaType>("m2");
  const [history, setHistory] = useState<AreaHistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize data on client
  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
    // Initial calculation for ft2 based on m2Input
    const initialM2 = parseFloat("10");
    setFt2Input(formatAreaValue(convertArea(initialM2, 'm2'), 2));
  }, []);

  const handleM2Change = (val: string) => {
    setM2Input(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setFt2Input(formatAreaValue(convertArea(num, 'm2'), precision));
    } else {
      setFt2Input("");
    }
  };

  const handleFt2Change = (val: string) => {
    setFt2Input(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setM2Input(formatAreaValue(convertArea(num, 'ft2'), precision));
    } else {
      setM2Input("");
    }
  };

  // Sync precision changes
  useEffect(() => {
    const num = parseFloat(m2Input);
    if (!isNaN(num)) {
      setFt2Input(formatAreaValue(convertArea(num, 'm2'), precision));
    }
  }, [precision]);

  const handleCopy = () => {
    const text = `${m2Input} m² = ${ft2Input} ft²`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToHistory = useCallback(() => {
    const m2Num = parseFloat(m2Input);
    const ft2Num = parseFloat(ft2Input);
    if (isNaN(m2Num) || isNaN(ft2Num)) return;
    
    const entry: AreaHistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      m2Value: m2Num,
      ft2Value: ft2Num,
      precision
    };
    
    saveToHistory(entry);
    setHistory(getHistory());
  }, [m2Input, ft2Input, precision]);

  const handleClear = () => {
    setM2Input("");
    setFt2Input("");
    setBatchInput("");
  };

  const handlePreset = (val: number) => {
    handleM2Change(val.toString());
  };

  const batchResults = useMemo(() => {
    if (!batchMode || batchInput.trim() === "") return [];
    return processBatchArea(batchInput, precision, batchSource);
  }, [batchMode, batchInput, precision, batchSource]);

  const handleExportCSV = () => {
    if (batchResults.length === 0) return;
    const fromUnit = batchSource === 'm2' ? 'Square Meters' : 'Square Feet';
    const toUnit = batchSource === 'm2' ? 'Square Feet' : 'Square Meters';
    const csvContent = `data:text/csv;charset=utf-8,${fromUnit},${toUnit}\n` 
      + batchResults.map(r => `${r.input},${r.result}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "area_conversion_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const m2NumValue = parseFloat(m2Input) || 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12 transform transition-all duration-300 hover:shadow-2xl">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative">
          <div className="z-10 relative">
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>Area Converter</h2>
            <p className="text-blue-100 opacity-90 font-medium font-inter">Convert between Square Meters (m²) and Square Feet (ft²) instantly.</p>
          </div>
          <div className="absolute right-0 top-0 opacity-10 p-4 transform translate-x-1/4 -translate-y-1/4 select-none">
            <span className="text-[200px] font-black leading-none italic pointer-events-none">ft²</span>
          </div>
        </div>

        <div className="p-8">
          {/* Main Controls Section */}
          {!batchMode ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest pl-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Square Meters (m²)
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      value={m2Input}
                      onChange={(e) => handleM2Change(e.target.value)}
                      className="w-full px-6 py-5 bg-white border-2 border-transparent rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-2xl font-bold text-gray-800 shadow-sm group-hover:shadow-md"
                      placeholder="0.00"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none opacity-20 group-focus-within:opacity-10 transition-opacity">
                       <span className="text-3xl font-black">m²</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-4 md:my-0">
                  <div className="bg-white p-3 rounded-full shadow-lg border border-gray-50 text-blue-500 transform transition-transform hover:rotate-180 duration-500 cursor-pointer" onClick={() => {
                    const temp = m2Input;
                    handleM2Change(ft2Input);
                    // This is just a visual swap effect for the logic
                  }}>
                    <span className="text-2xl font-bold">⇄</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest pl-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Square Feet (ft²)
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      value={ft2Input}
                      onChange={(e) => handleFt2Change(e.target.value)}
                      className="w-full px-6 py-5 bg-white border-2 border-transparent rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-2xl font-bold text-gray-800 shadow-sm group-hover:shadow-md"
                      placeholder="0.00"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none opacity-20 group-focus-within:opacity-10 transition-opacity">
                       <span className="text-3xl font-black">ft²</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visualization and Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-6 bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-inner">
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Precision</label>
                    <select
                      value={precision}
                      onChange={(e) => setPrecision(parseInt(e.target.value))}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value={2}>2 Decimal Places</option>
                      <option value={3}>3 Decimal Places</option>
                      <option value={4}>4 Decimal Places</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Common Sizes</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 10, 50, 100, 500, 1000].map(val => (
                        <button
                          key={val}
                          onClick={() => handlePreset(val)}
                          className="px-3 py-2 bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 font-bold rounded-lg border border-gray-100 hover:border-blue-200 text-xs transition-all shadow-sm"
                        >
                          {val} m²
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 bg-gray-900 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center items-center group shadow-2xl">
                  {/* Visualization box */}
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 border border-white/10 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-sm z-10 transition-transform group-hover:scale-105 duration-700">
                    <div 
                      className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg shadow-2xl shadow-blue-500/20 transition-all duration-700 flex items-center justify-center p-2 text-center"
                      style={{ 
                        width: `${Math.max(10, Math.min(100, Math.sqrt(m2NumValue) * 10))}%`,
                        height: `${Math.max(10, Math.min(100, Math.sqrt(m2NumValue) * 10))}%`,
                        opacity: m2NumValue > 0 ? 1 : 0.1
                      }}
                    >
                      {m2NumValue > 0 && (
                         <span className="text-white font-black text-[clamp(8px,2vw,16px)] leading-none truncate">
                           {m2NumValue} m²
                         </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-center z-10">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Scale Representation</p>
                    <p className="text-white/60 text-xs italic font-medium">Visualizing spatial footprint in perspective</p>
                  </div>
                  <div className="absolute left-4 bottom-4 text-gray-500/20 text-6xl font-black italic whitespace-nowrap pointer-events-none select-none">
                    AREA PREVIEW
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Batch Mode Section */
            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-3xl border-2 border-dashed border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm border border-gray-100">
                    <button 
                      onClick={() => setBatchSource('m2')}
                      className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all ${batchSource === 'm2' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      m² to ft²
                    </button>
                    <button 
                      onClick={() => setBatchSource('ft2')}
                      className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all ${batchSource === 'ft2' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      ft² to m²
                    </button>
                  </div>
                  <button onClick={handleExportCSV} disabled={batchResults.length === 0} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 disabled:opacity-30 transition-all flex items-center gap-2">
                    <span>📥</span> Export CSV
                  </button>
                </div>
                <textarea
                  value={batchInput}
                  onChange={(e) => setBatchInput(e.target.value)}
                  className="w-full h-48 bg-white border-2 border-gray-100 rounded-2xl p-6 focus:outline-none focus:border-blue-500 transition-all text-gray-800 font-mono text-sm leading-relaxed"
                  placeholder="Paste multiple values separated by commas or new lines (e.g. 10, 20, 30.5)"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {batchResults.map((res, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
                    <span className="text-gray-400 font-mono text-xs font-bold">{res.input} {batchSource}</span>
                    <span className="text-gray-300">→</span>
                    <span className="text-blue-600 font-black font-inter">{res.result} {batchSource === 'm2' ? 'ft²' : 'm²'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-8 flex flex-wrap gap-4 pt-8 border-t border-gray-100">
            <button
              onClick={() => setBatchMode(!batchMode)}
              className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-black text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center gap-3"
            >
              <span>{batchMode ? "🔢 Single Tool" : "📑 Batch Mode"}</span>
            </button>

            {!batchMode && (
              <>
                <button
                  onClick={handleSaveToHistory}
                  className="px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center gap-3 shadow-lg shadow-gray-200"
                >
                  <span>💾 Save History</span>
                </button>
                
                <button
                  onClick={handleCopy}
                  className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-[0.98]"
                >
                  <span>{copied ? "✅ Copied!" : "📋 Copy Calculation"}</span>
                </button>
              </>
            )}

            <button
              onClick={handleClear}
              className="p-4 bg-red-50 text-red-500 hover:bg-red-100 rounded-2xl transition-all"
              title="Clear All Inputs"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      {/* Shared History Panel */}
      {isClient && history.length > 0 && !batchMode && (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-3" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-xl">🕒</span>
              Recent Activity
            </h3>
            <button
              onClick={() => { clearHistory(); setHistory([]); }}
              className="px-4 py-2 text-xs font-black text-red-500 hover:text-red-700 uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              Clear Log
            </button>
          </div>

          <div className="space-y-4">
            {history.map((entry) => (
              <div key={entry.id} className="group flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-gray-100 transition-all gap-6 shadow hover:shadow-md">
                <div className="flex items-center gap-8 flex-1">
                   <div className="flex flex-col min-w-[80px]">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter italic">Source Area</span>
                      <span className="text-xl font-black text-gray-900">{entry.m2Value} <span className="text-gray-400 text-sm italic">m²</span></span>
                   </div>
                   <div className="text-blue-200 text-2xl font-black">→</div>
                   <div className="flex flex-col min-w-[100px]">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-tighter italic">Converted Result</span>
                      <span className="text-xl font-black text-blue-600">{entry.ft2Value} <span className="text-blue-400 text-sm italic font-black">ft²</span></span>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-xs font-bold text-gray-400 italic bg-gray-100/50 px-3 py-1 rounded-full">{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                   <button
                    onClick={() => { deleteHistoryEntry(entry.id); setHistory(getHistory()); }}
                    className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl border border-gray-100 shadow-sm opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ToolSEOContent />
      <div className="mt-12 overflow-hidden rounded-3xl">
         <RelatedTools currentTool="square-meter-to-square-foot-converter" tools={["inch-to-cm-converter", "meter-to-km-converter", "centimeter-to-meter-converter"]} />
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { 
  RngHistoryRecord,
  generateBatch,
  getRandomInt,
  getRandomListItem,
  getRandomHexColor,
  formatRngCSV
} from "./logic";
import RandomNumberGeneratorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type ToolMode = 'numbers' | 'picker' | 'color';

export default function RandomNumberGeneratorUI() {
  const [activeTab, setActiveTab] = useState<ToolMode>('numbers');
  
  // Settings
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [decimalPrecision, setDecimalPrecision] = useState(0);
  const [unique, setUnique] = useState(false);
  const [secure, setSecure] = useState(false);
  
  // Picker State
  const [pickerInput, setPickerInput] = useState("Apple\nBanana\nOrange\nMango");
  const [pickerResult, setPickerResult] = useState<string | null>(null);

  // Status
  const [results, setResults] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [spinNumber, setSpinNumber] = useState<number | null>(null);
  const [history, setHistory] = useState<RngHistoryRecord[]>([]);
  const [copied, setCopied] = useState("");

  const spinInterval = useRef<NodeJS.Timeout | null>(null);

  // Load history
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rngHistory");
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveHistory = (range: string, result: string) => {
    const newRecord: RngHistoryRecord = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      range,
      result,
      timestamp: Date.now()
    };
    const newHistory = [newRecord, ...history].slice(0, 50);
    setHistory(newHistory);
    try {
      localStorage.setItem("rngHistory", JSON.stringify(newHistory));
    } catch (e) {}
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("rngHistory");
    } catch (e) {}
  };

  const handleGenerateNumbers = () => {
    if (min >= max) return;
    setIsGenerating(true);
    
    // Animation logic
    let tick = 0;
    spinInterval.current = setInterval(() => {
      setSpinNumber(getRandomInt(min, max));
      tick++;
      if (tick > 10) {
        if (spinInterval.current) clearInterval(spinInterval.current);
        const batch = generateBatch(min, max, count, unique, secure, decimalPrecision > 0, decimalPrecision);
        setResults(batch);
        setSpinNumber(null);
        setIsGenerating(false);
        saveHistory(`${min}-${max}`, batch.slice(0, 3).join(", ") + (batch.length > 3 ? "..." : ""));
      }
    }, 40);
  };

  const handlePickRandom = () => {
    const items = pickerInput.split("\n").map(i => i.trim()).filter(Boolean);
    if (items.length === 0) return;
    
    setIsGenerating(true);
    let tick = 0;
    spinInterval.current = setInterval(() => {
      setPickerResult(items[Math.floor(Math.random() * items.length)]);
      tick++;
      if (tick > 12) {
        if (spinInterval.current) clearInterval(spinInterval.current);
        const winner = getRandomListItem(items);
        setPickerResult(winner);
        setIsGenerating(false);
        if (winner) saveHistory("List Picker", winner);
      }
    }, 50);
  };

  const handleRandomColor = () => {
    const color = getRandomHexColor();
    setPickerResult(color);
    saveHistory("Color", color);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const downloadCSV = () => {
    if (results.length === 0) return;
    const csv = formatRngCSV(results);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "random_numbers.csv";
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Mode Switcher */}
      <div className="flex bg-gray-100 p-1 rounded-xl w-fit mx-auto lg:mx-0">
        <button 
          onClick={() => setActiveTab('numbers')}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'numbers' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Numbers
        </button>
        <button 
          onClick={() => setActiveTab('picker')}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'picker' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Picker
        </button>
        <button 
          onClick={() => setActiveTab('color')}
          className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'color' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
        >
          Colors
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            
            {activeTab === 'numbers' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Minimum</label>
                    <input 
                      type="number" 
                      value={min} 
                      onChange={(e) => setMin(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Maximum</label>
                    <input 
                      type="number" 
                      value={max} 
                      onChange={(e) => setMax(Number(e.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quantity: {count}</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="1000" 
                    value={count} 
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <label className="text-sm font-semibold text-gray-700">Unique Numbers Only</label>
                       <p className="text-[10px] text-gray-400">Prevent any duplicates in results</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="sr-only peer"/>
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <label className="text-sm font-semibold text-gray-700">Secure Random Mode</label>
                       <p className="text-[10px] text-gray-400">Use Crypto API for security</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={secure} onChange={(e) => setSecure(e.target.checked)} className="sr-only peer"/>
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Decimal Precision (0-6)</label>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5, 6].map((p) => (
                        <button 
                          key={p} 
                          onClick={() => setDecimalPrecision(p)}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${decimalPrecision === p ? 'bg-primary text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleGenerateNumbers}
                  disabled={isGenerating}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {isGenerating ? "GENERATING..." : "GENERATE RANDOM"}
                </button>
              </>
            )}

            {activeTab === 'picker' && (
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Enter Items (One per line)</label>
                <textarea 
                  value={pickerInput}
                  onChange={(e) => setPickerInput(e.target.value)}
                  className="w-full h-64 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-medium text-gray-900"
                />
                <button 
                  onClick={handlePickRandom}
                  disabled={isGenerating}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {isGenerating ? "PICKING..." : "PICK RANDOM ITEM"}
                </button>
              </div>
            )}

            {activeTab === 'color' && (
              <div className="space-y-6 text-center py-6">
                <div 
                  className="w-32 h-32 mx-auto rounded-full shadow-inner border-8 border-gray-100 transition-colors duration-300"
                  style={{ backgroundColor: activeTab === 'color' && pickerResult?.startsWith("#") ? pickerResult : '#eee' }}
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 uppercase">Random Spectrum</h3>
                  <p className="text-xs text-gray-400 font-medium">Generate vibrant randomized HEX color codes instantly.</p>
                </div>
                <button 
                  onClick={handleRandomColor}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-dark transition-all shadow-lg active:scale-[0.98]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  GENERATE COLOR
                </button>
              </div>
            )}

          </div>

          {/* History Box */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
             <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-100">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Local History</h3>
                <button onClick={clearHistory} className="text-[10px] font-bold text-red-400 hover:text-red-500 uppercase tracking-tighter">Clear</button>
             </div>
             <div className="max-h-64 overflow-y-auto custom-scrollbar divide-y divide-gray-50">
               {history.length === 0 ? (
                 <p className="p-8 text-center text-xs text-gray-400 italic font-medium">No recent generations recorded yet.</p>
               ) : history.map((h) => (
                 <div key={h.id} className="p-4 hover:bg-gray-50 transition-colors group relative">
                    <div className="flex justify-between items-center mb-1">
                       <span className="text-[10px] font-bold text-gray-400">{h.time}</span>
                       <span className="text-[10px] font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded">{h.range}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-800 truncate pr-8">{h.result}</p>
                    <button 
                      onClick={() => copyToClipboard(h.result, h.id)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-400 hover:text-primary font-bold"
                    >
                      {copied === h.id ? "✓" : "Copy"}
                    </button>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-8">
          
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.05)] h-full flex flex-col min-h-[500px] overflow-hidden">
            
            {/* Animation Head / Hero Display */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 border-b border-gray-100 relative group">
              
              {isGenerating ? (
                <div className="space-y-4 animate-pulse">
                  <span className="text-8xl font-black text-primary tracking-tighter opacity-20">
                    {activeTab === 'numbers' ? spinNumber : '??'}
                  </span>
                  <p className="text-sm font-bold text-primary uppercase tracking-[0.3em]">Randomizing...</p>
                </div>
              ) : activeTab === 'numbers' ? (
                results.length > 0 ? (
                   <div className="space-y-6 w-full">
                      <div className="space-y-2">
                        <span className="text-8xl font-black text-gray-900 tracking-tighter block leading-none">
                          {results[0]}
                        </span>
                        {results.length > 1 && (
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main Result (out of {count})</p>
                        )}
                      </div>
                      
                      <div className="flex gap-2 justify-center">
                         <button 
                            onClick={() => copyToClipboard(results.join(", "), 'results')}
                            className="bg-white border border-gray-200 text-gray-700 font-bold px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all text-sm flex items-center gap-2"
                         >
                            {copied === 'results' ? "✓ Copied" : "📋 Copy All"}
                         </button>
                         {results.length > 1 && (
                           <button 
                              onClick={downloadCSV}
                              className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm flex items-center gap-2"
                           >
                              💾 Export CSV
                           </button>
                         )}
                      </div>
                   </div>
                ) : (
                   <div className="space-y-3 opacity-30">
                     <span className="text-8xl">🎲</span>
                     <p className="text-sm font-bold uppercase tracking-widest">Awaiting Generation</p>
                   </div>
                )
              ) : (pickerResult ? (
                <div className="space-y-6 w-full px-8 animate-in fade-in zoom-in duration-300">
                   <div className="space-y-2">
                      <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary to-purple-500 mb-4 scale-150">
                        <div className="bg-white rounded-full p-4">
                           <span className="text-4xl">🏆</span>
                        </div>
                      </div>
                      <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight transition-all truncate" style={{ fontFamily: "var(--font-heading)" }}>
                         {pickerResult}
                      </h2>
                      <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mt-4">Random selection complete</p>
                   </div>
                   <button 
                      onClick={() => copyToClipboard(pickerResult, 'picker')}
                      className="bg-gray-900 text-white font-bold px-8 py-3 rounded-2xl shadow-xl hover:bg-black transition-all text-sm"
                   >
                      {copied === 'picker' ? "✓ Copied Winner" : "📋 Copy Result"}
                   </button>
                </div>
              ) : (
                <div className="space-y-3 opacity-30">
                   <span className="text-8xl">✨</span>
                   <p className="text-sm font-bold uppercase tracking-widest">Pick a random item successfully</p>
                </div>
              ))}
            </div>

            {/* Sub-grid view for bulk numbers */}
            {activeTab === 'numbers' && results.length > 1 && (
               <div className="bg-white p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                     {results.map((n, i) => (
                       <div 
                         key={i} 
                         className="aspect-square bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-xs font-black text-gray-700 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all cursor-default"
                         title={`Sequence index: ${i + 1}`}
                       >
                         {n}
                       </div>
                     ))}
                  </div>
               </div>
            )}
            
          </div>

        </div>

      </div>

      <RandomNumberGeneratorSEO />
      
      <RelatedTools 
        currentTool="random-number-generator"
        tools={['password-generator', 'hash-generator', 'username-generator']}
      />
    </div>
  );
}

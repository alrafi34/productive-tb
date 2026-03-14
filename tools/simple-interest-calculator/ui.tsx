"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  InterestHistoryEntry,
  calculateSimpleInterest, 
  formatCurrency,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry,
  TimeUnit
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function SimpleInterestCalculatorUI() {
  const [principal, setPrincipal] = useState<string>("1000");
  const [rate, setRate] = useState<string>("5");
  const [time, setTime] = useState<string>("3");
  const [unit, setUnit] = useState<TimeUnit>("years");
  const [precision, setPrecision] = useState<number>(2);
  const [history, setHistory] = useState<InterestHistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  const pNum = parseFloat(principal);
  const rNum = parseFloat(rate);
  const tNum = parseFloat(time);
  
  const isValid = !isNaN(pNum) && !isNaN(rNum) && !isNaN(tNum);
  
  const { interest, total } = useMemo(() => {
    if (!isValid) return { interest: 0, total: 0 };
    return calculateSimpleInterest(pNum, rNum, tNum, unit);
  }, [pNum, rNum, tNum, unit, isValid]);

  const handleCopy = () => {
    if (!isValid) return;
    const text = `Principal: ${principal}\nRate: ${rate}%\nTime: ${time} ${unit}\nInterest: ${formatCurrency(interest, precision)}\nTotal Amount: ${formatCurrency(total, precision)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!isValid) return;
    
    const entry: InterestHistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      principal: pNum,
      rate: rNum,
      time: tNum,
      unit,
      interest,
      total
    };
    
    saveToHistory(entry);
    setHistory(getHistory());
  }, [pNum, rNum, tNum, unit, interest, total, isValid]);

  const handleClear = () => {
    setPrincipal("");
    setRate("");
    setTime("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
        {/* Header Branding */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>Simple Interest</h2>
            <p className="text-emerald-100 opacity-90 font-medium">Quickly calculate interest and final amounts for loans or savings.</p>
          </div>
          <div className="absolute right-0 top-0 opacity-10 p-4 transform translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
            <span className="text-[180px] font-black leading-none italic">%</span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Input Side */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Principal Amount</label>
                  <div className="relative group">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-2xl font-bold text-gray-800 shadow-sm"
                      placeholder="e.g. 1000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Interest Rate (%)</label>
                    <div className="relative group">
                      <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-xl font-bold text-gray-800 shadow-sm"
                        placeholder="e.g. 5"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Time Period</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="flex-1 px-4 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-xl font-bold text-gray-800 shadow-sm"
                        placeholder="e.g. 3"
                      />
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value as TimeUnit)}
                        className="w-[100px] bg-emerald-50 border-none rounded-2xl px-2 text-xs font-black text-emerald-700 uppercase tracking-tighter focus:ring-2 focus:ring-emerald-500/20"
                      >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                        <option value="days">Days</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Output Precision</label>
                <div className="flex gap-2">
                  {[0, 2, 4].map(p => (
                    <button 
                      key={p}
                      onClick={() => setPrecision(p)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${precision === p ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-white border-gray-100 text-gray-500 hover:border-emerald-200'}`}
                    >
                      {p} Decimals
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result Side */}
            <div className="lg:col-span-5 h-full">
              <div className="bg-gray-50 p-8 rounded-[40px] border-2 border-dashed border-gray-200 h-full flex flex-col justify-center gap-8 text-center relative overflow-hidden group">
                 <div className="z-10 space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Interest Earned</span>
                    <h3 className="text-5xl font-black text-gray-900 leading-tight">
                      {isValid ? formatCurrency(interest, precision) : "0"}
                    </h3>
                 </div>

                 <div className="z-10 space-y-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 inline-block">Total Amount</span>
                    <h4 className="text-3xl font-bold text-emerald-600">
                      {isValid ? formatCurrency(total, precision) : "0"}
                    </h4>
                 </div>

                 <div className="absolute -bottom-10 -right-10 text-[120px] font-black text-gray-200/20 italic pointer-events-none group-hover:text-emerald-500/5 transition-colors duration-700">SI</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-wrap gap-4 pt-10 border-t border-gray-100">
            <button
              onClick={handleCopy}
              disabled={!isValid}
              className="flex-1 px-8 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-30 translate-y-0 hover:-translate-y-1"
            >
              <span>{copied ? "✅ Result Copied" : "📋 Copy Results"}</span>
            </button>

            <button
              onClick={handleSaveToHistory}
              disabled={!isValid}
              className="px-8 py-5 bg-gray-900 hover:bg-black text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center gap-3 shadow-xl shadow-gray-200 translate-y-0 hover:-translate-y-1 disabled:opacity-30"
            >
              <span>💾 Save Entry</span>
            </button>

            <button
              onClick={handleClear}
              className="p-5 bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-100 hover:border-red-100 rounded-2xl transition-all translate-y-0 hover:-translate-y-1 shadow-sm"
              title="Clear form"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      {/* History panel */}
      {isClient && history.length > 0 && (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-12 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-black text-gray-900 flex items-center gap-3" style={{ fontFamily: "var(--font-heading)" }}>
               <span className="w-10 h-10 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl">🕒</span>
               Recent History
             </h3>
             <button onClick={() => { clearHistory(); setHistory([]); }} className="text-xs font-black text-red-500 hover:underline uppercase tracking-widest">Clear Log</button>
          </div>

          <div className="space-y-4">
            {history.map((entry) => (
              <div key={entry.id} className="group flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50/50 hover:bg-emerald-50/30 rounded-3xl border border-transparent hover:border-emerald-100 transition-all gap-6 shadow-sm">
                <div className="flex items-center gap-8 flex-1">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter italic mb-1">Calculation</span>
                      <span className="text-sm font-bold text-gray-700">
                        ${formatCurrency(entry.principal, 0)} @ {entry.rate}% for {entry.time} {entry.unit}
                      </span>
                   </div>
                   <div className="text-emerald-200 hidden sm:block">→</div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter italic mb-1">Interest</span>
                      <span className="text-lg font-black text-emerald-600">${formatCurrency(entry.interest, 2)}</span>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-xs font-bold text-gray-400 italic bg-white px-3 py-1.5 rounded-full border border-gray-100">{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
        <RelatedTools currentTool="simple-interest-calculator" tools={["mortgage-calculator", "compound-interest-calculator-tool", "average-calculator"]} />
      </div>
    </div>
  );
}

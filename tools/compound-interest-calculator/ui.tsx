"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  CompoundingFrequency,
  HistoryEntry,
  calculateCompoundInterest, 
  formatCurrency,
  generateChartData,
  generateCSV,
  downloadCSV,
  getHistory,
  saveToHistory,
  clearHistory,
  deleteHistoryEntry
} from "./logic";
import ToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CompoundInterestCalculatorUI() {
  const [principal, setPrincipal] = useState<string>("10000");
  const [rate, setRate] = useState<string>("7");
  const [time, setTime] = useState<string>("10");
  const [frequency, setFrequency] = useState<CompoundingFrequency>("monthly");
  const [precision, setPrecision] = useState<number>(2);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    setIsClient(true);
    setHistory(getHistory());
  }, []);

  const pNum = parseFloat(principal);
  const rNum = parseFloat(rate);
  const tNum = parseFloat(time);
  
  const isValid = !isNaN(pNum) && !isNaN(rNum) && !isNaN(tNum) && pNum > 0 && rNum >= 0 && tNum > 0;
  
  const result = useMemo(() => {
    if (!isValid) return { futureValue: 0, interestEarned: 0, yearlyBreakdown: [] };
    return calculateCompoundInterest(pNum, rNum, tNum, frequency);
  }, [pNum, rNum, tNum, frequency, isValid]);

  const chartData = useMemo(() => {
    return generateChartData(result.yearlyBreakdown);
  }, [result.yearlyBreakdown]);

  const handleCopy = () => {
    if (!isValid) return;
    const text = `Principal: $${formatCurrency(pNum, precision)}\nRate: ${rNum}%\nTime: ${tNum} years\nCompounding: ${frequency}\nFuture Value: $${formatCurrency(result.futureValue, precision)}\nInterest Earned: $${formatCurrency(result.interestEarned, precision)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCSV = () => {
    if (!isValid) return;
    const csvContent = generateCSV(result.yearlyBreakdown, pNum, rNum, frequency);
    downloadCSV(csvContent);
  };

  const handleSaveToHistory = useCallback(() => {
    if (!isValid) return;
    
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      principal: pNum,
      rate: rNum,
      time: tNum,
      frequency,
      futureValue: result.futureValue,
      interestEarned: result.interestEarned
    };
    
    saveToHistory(entry);
    setHistory(getHistory());
  }, [pNum, rNum, tNum, frequency, result, isValid]);

  const handleClear = () => {
    setPrincipal("");
    setRate("");
    setTime("");
  };

  const maxValue = useMemo(() => {
    return Math.max(...chartData.map(d => d.total));
  }, [chartData]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>Compound Interest</h2>
            <p className="text-emerald-100 opacity-90 font-medium">Calculate future value and visualize exponential growth over time.</p>
          </div>
          <div className="absolute right-0 top-0 opacity-10 p-4 transform translate-x-1/4 -translate-y-1/4 select-none pointer-events-none">
            <span className="text-[180px] font-black leading-none italic">📈</span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* Input Side */}
            <div className="xl:col-span-5 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Principal Amount</label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">$</span>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="w-full pl-12 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-2xl font-bold text-gray-800 shadow-sm"
                    placeholder="e.g. 10000"
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
                      placeholder="e.g. 7"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Time (Years)</label>
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-xl font-bold text-gray-800 shadow-sm"
                    placeholder="e.g. 10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Compounding Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as CompoundingFrequency)}
                  className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-lg font-bold text-gray-800 shadow-sm"
                >
                  <option value="annual">Annual (1x per year)</option>
                  <option value="semi-annual">Semi-Annual (2x per year)</option>
                  <option value="quarterly">Quarterly (4x per year)</option>
                  <option value="monthly">Monthly (12x per year)</option>
                  <option value="daily">Daily (365x per year)</option>
                </select>
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
            <div className="xl:col-span-7">
              <div className="bg-gray-50 p-8 rounded-[40px] border-2 border-dashed border-gray-200 h-full flex flex-col justify-center gap-8 relative overflow-hidden group">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Future Value</span>
                    <h3 className="text-4xl font-black text-gray-900 leading-tight">
                      ${isValid ? formatCurrency(result.futureValue, precision) : "0"}
                    </h3>
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-black text-green-600 bg-green-100 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Interest Earned</span>
                    <h4 className="text-3xl font-bold text-green-600">
                      ${isValid ? formatCurrency(result.interestEarned, precision) : "0"}
                    </h4>
                  </div>
                </div>

                {/* Simple Chart */}
                {isValid && showChart && chartData.length > 0 && isClient && (
                  <div className="z-10 mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Growth Visualization</span>
                      <button
                        onClick={() => setShowChart(!showChart)}
                        className="text-xs font-bold text-gray-400 hover:text-gray-600"
                      >
                        Hide Chart
                      </button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {chartData.slice(0, 10).map((data, index) => {
                        const widthPercentage = Math.round((data.total / maxValue) * 100 * 100) / 100; // Round to 2 decimal places
                        return (
                          <div key={data.year} className="flex items-center gap-3">
                            <span className="text-xs font-bold text-gray-500 w-8">Y{data.year}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${widthPercentage}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-gray-700 w-20 text-right">
                              ${formatCurrency(data.total, 0)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="absolute -bottom-10 -right-10 text-[120px] font-black text-gray-200/20 italic pointer-events-none group-hover:text-emerald-500/5 transition-colors duration-700">CI</div>
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
              onClick={handleDownloadCSV}
              disabled={!isValid}
              className="px-8 py-5 bg-green-600 hover:bg-green-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center gap-3 shadow-xl shadow-green-500/20 translate-y-0 hover:-translate-y-1 disabled:opacity-30"
            >
              <span>💾 Download CSV</span>
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

      {/* Yearly Breakdown Table */}
      {isValid && result.yearlyBreakdown.length > 0 && (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-12">
          <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3" style={{ fontFamily: "var(--font-heading)" }}>
            <span className="w-10 h-10 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl">📊</span>
            Yearly Breakdown
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Year</th>
                  <th className="text-right py-3 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Principal</th>
                  <th className="text-right py-3 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Interest</th>
                  <th className="text-right py-3 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">Total</th>
                </tr>
              </thead>
              <tbody>
                {result.yearlyBreakdown.slice(0, 15).map((data) => (
                  <tr key={data.year} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-bold text-gray-700">{data.year}</td>
                    <td className="py-3 px-4 text-right font-bold text-gray-600">${formatCurrency(data.principal, precision)}</td>
                    <td className="py-3 px-4 text-right font-bold text-green-600">${formatCurrency(data.interest, precision)}</td>
                    <td className="py-3 px-4 text-right font-black text-emerald-600">${formatCurrency(data.total, precision)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {result.yearlyBreakdown.length > 15 && (
              <p className="text-center text-sm text-gray-500 mt-4 italic">
                Showing first 15 years. Download CSV for complete breakdown.
              </p>
            )}
          </div>
        </div>
      )}

      {/* History panel */}
      {isClient && history.length > 0 && (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-12">
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
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter italic mb-1">Investment</span>
                      <span className="text-sm font-bold text-gray-700">
                        ${formatCurrency(entry.principal, 0)} @ {entry.rate}% for {entry.time} years ({entry.frequency})
                      </span>
                   </div>
                   <div className="text-emerald-200 hidden sm:block">→</div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter italic mb-1">Future Value</span>
                      <span className="text-lg font-black text-emerald-600">${formatCurrency(entry.futureValue, 2)}</span>
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
        <RelatedTools currentTool="compound-interest-calculator" tools={["simple-interest-calculator", "mortgage-calculator", "loan-emi-calculator"]} />
      </div>
    </div>
  );
}
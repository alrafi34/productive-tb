"use client";

import { useState, useMemo } from "react";
import { 
  parseNumber, 
  calculatePercentageChange, 
  calculateOriginalValue, 
  simulateSteps, 
  calculateBatchChanges,
  StepChange
} from "./logic";
import PercentageChangeSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PercentageChangeCalculatorUI() {
  // Mode 1: Basic Change
  const [oldValue, setOldValue] = useState("80");
  const [newValue, setNewValue] = useState("100");
  
  // Mode 2: Reverse
  const [finalValue, setFinalValue] = useState("120");
  const [revPercent, setRevPercent] = useState("20");
  
  // Mode 3: Simulator
  const [baseValue, setBaseValue] = useState("100");
  const [steps, setSteps] = useState<StepChange[]>([
    { id: '1', type: 'increase', percent: 20 },
    { id: '2', type: 'decrease', percent: 10 }
  ]);
  
  // Mode 4: Batch
  const [batchInput, setBatchInput] = useState("80\n100\n120\n150");
  
  // Slider Simulation
  const [sliderBase, setSliderBase] = useState(100);
  const [sliderPercent, setSliderPercent] = useState(0);

  const basicResult = useMemo(() => {
    const oldN = parseNumber(oldValue);
    const newN = parseNumber(newValue);
    return calculatePercentageChange(oldN, newN);
  }, [oldValue, newValue]);

  const reverseResult = useMemo(() => {
    const f = parseNumber(finalValue);
    const p = parseNumber(revPercent);
    return calculateOriginalValue(f, p);
  }, [finalValue, revPercent]);

  const simResult = useMemo(() => {
    return simulateSteps(parseNumber(baseValue), steps);
  }, [baseValue, steps]);

  const batchResults = useMemo(() => {
    const nums = batchInput.split("\n").map(l => parseNumber(l.trim())).filter(n => !isNaN(n));
    return calculateBatchChanges(nums);
  }, [batchInput]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Top Section: Basic Change */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 space-y-8">
           <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Percentage Change</h2>
              <span className="text-[10px] bg-primary/5 text-primary font-bold px-2 py-1 rounded uppercase tracking-widest">Instant</span>
           </div>

           <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Original Value (Old)</label>
                 <input 
                   type="text" 
                   value={oldValue} 
                   onChange={e => setOldValue(e.target.value)}
                   className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">New Value</label>
                 <input 
                   type="text" 
                   value={newValue} 
                   onChange={e => setNewValue(e.target.value)}
                   className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                 />
              </div>
           </div>

           <div className="bg-gray-50 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-8 border border-gray-100">
              <div className="text-center sm:text-left">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Difference</span>
                 <p className={`text-3xl font-black ${basicResult.type === 'increase' ? 'text-green-600' : basicResult.type === 'decrease' ? 'text-red-600' : 'text-gray-400'}`}>
                   {basicResult.type === 'increase' ? '+' : ''}{basicResult.change.toLocaleString()}
                 </p>
              </div>
              
              <div className="h-px sm:h-12 w-12 sm:w-px bg-gray-200" />

              <div className="text-center sm:text-right">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Percent Change</span>
                 <div className="flex items-center gap-3">
                    <span className={`text-5xl font-black ${basicResult.type === 'increase' ? 'text-green-600' : basicResult.type === 'decrease' ? 'text-red-600' : 'text-gray-900'}`} style={{ fontFamily: "var(--font-heading)" }}>
                      {basicResult.type === 'increase' ? '↑' : basicResult.type === 'decrease' ? '↓' : ''} {Math.abs(basicResult.percent).toFixed(2)}%
                    </span>
                 </div>
              </div>
           </div>

           {/* Chart Visualization */}
           <div className="space-y-4 pt-4 border-t border-gray-50">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Visual Comparison</label>
              <div className="space-y-3">
                 <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-500 w-16">OLD</span>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-gray-400 transition-all duration-500" style={{ width: '100%' }} />
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-500 w-16">NEW</span>
                    <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                       <div 
                         className={`h-full transition-all duration-500 ${basicResult.type === 'increase' ? 'bg-green-500' : 'bg-red-500'}`} 
                         style={{ width: `${Math.min(200, (parseNumber(newValue) / parseNumber(oldValue)) * 100)}%` }} 
                       />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Side Panel: Reverse & Slider */}
        <div className="lg:col-span-5 space-y-6">
           {/* Reverse Card */}
           <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
              <h3 className="text-lg font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Reverse Calculation</h3>
              <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Final Value</label>
                       <input type="text" value={finalValue} onChange={e => setFinalValue(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold"/>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">% Change applied</label>
                       <input type="text" value={revPercent} onChange={e => setRevPercent(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold"/>
                    </div>
                 </div>
                 <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 text-center">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">Original was</span>
                    <p className="text-2xl font-black text-primary">{reverseResult.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                 </div>
              </div>
           </div>

           {/* Slider Simulation */}
           <div className="bg-gray-900 rounded-3xl p-8 text-white space-y-6 shadow-xl shadow-gray-200">
              <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>Percent Simulation</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Base Value</label>
                    <input 
                      type="number" value={sliderBase} onChange={e => setSliderBase(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-bold focus:outline-none focus:ring-1 focus:ring-primary/50"
                    />
                 </div>
                 
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-gray-500">CHANGE</span>
                       <span className={sliderPercent > 0 ? 'text-green-400' : sliderPercent < 0 ? 'text-red-400' : 'text-white'}>
                         {sliderPercent > 0 ? '+' : ''}{sliderPercent}%
                       </span>
                    </div>
                    <input 
                      type="range" min="-100" max="200" value={sliderPercent} onChange={e => setSliderPercent(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none accent-primary cursor-pointer"
                    />
                 </div>

                 <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Calculated Result</span>
                    <p className="text-4xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>
                      {(sliderBase * (1 + sliderPercent / 100)).toLocaleString()}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Section: Steps & Batch */}
      <div className="grid lg:grid-cols-2 gap-8">
         {/* Multi-Step Simulator */}
         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Multi-Step Simulator</h3>
               <button 
                 onClick={() => setSteps([...steps, { id: Date.now().toString(), type: 'increase', percent: 10 }])}
                 className="text-[10px] font-bold text-primary hover:underline"
               >
                 + ADD STEP
               </button>
            </div>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
               {steps.map((step, idx) => (
                 <div key={step.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-400 w-6">#{idx+1}</span>
                    <select 
                      value={step.type} 
                      onChange={e => setSteps(steps.map(s => s.id === step.id ? { ...s, type: e.target.value as any } : s))}
                      className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold"
                    >
                       <option value="increase">Increase</option>
                       <option value="decrease">Decrease</option>
                    </select>
                    <input 
                      type="number" value={step.percent} 
                      onChange={e => setSteps(steps.map(s => s.id === step.id ? { ...s, percent: Number(e.target.value) } : s))}
                      className="w-20 bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-center"
                    />
                    <span className="text-xs font-bold text-gray-400">%</span>
                    <button 
                      onClick={() => setSteps(steps.filter(s => s.id !== step.id))}
                      className="ml-auto text-gray-300 hover:text-red-400"
                    >
                      ✕
                    </button>
                 </div>
               ))}
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 text-white flex justify-between items-center">
               <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Final Result</span>
                  <p className="text-2xl font-black">{simResult.finalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
               </div>
               <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Net Change</span>
                  <p className={`text-xl font-black ${simResult.totalChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {simResult.totalChangePercent >= 0 ? '+' : ''}{simResult.totalChangePercent.toFixed(2)}%
                  </p>
               </div>
            </div>
         </div>

         {/* Batch Processor */}
         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
            <h3 className="text-xl font-black text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Batch Percentage Comparison</h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Entry List (One per line)</label>
                  <textarea 
                    value={batchInput}
                    onChange={e => setBatchInput(e.target.value)}
                    className="w-full h-48 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="100\n120\n110"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Results Table</label>
                  <div className="h-48 overflow-y-auto border border-gray-100 rounded-2xl text-[10px] font-bold custom-scrollbar">
                     <table className="w-full text-left">
                        <thead className="sticky top-0 bg-gray-50 text-gray-400 px-3 py-2 border-b border-gray-100 uppercase tracking-tighter">
                           <tr>
                              <th className="px-3 py-2">Transition</th>
                              <th className="px-3 py-2 text-right">Change</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                           {batchResults.map((res, i) => (
                             <tr key={i} className="hover:bg-gray-50/50">
                                <td className="px-3 py-2 text-gray-600">{res.from} → {res.to}</td>
                                <td className={`px-3 py-2 text-right font-black ${res.type === 'increase' ? 'text-green-600' : res.type === 'decrease' ? 'text-red-600' : 'text-gray-400'}`}>
                                  {res.percent > 0 ? '↑' : res.percent < 0 ? '↓' : ''} {Math.abs(res.percent).toFixed(2)}%
                                </td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
            
            <button 
              onClick={() => {
                const csv = "From,To,Change %\n" + batchResults.map(r => `${r.from},${r.to},${r.percent.toFixed(2)}%`).join("\n");
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'batch-percent-changes.csv';
                a.click();
              }}
              className="w-full py-3 bg-gray-50 text-gray-600 rounded-xl font-bold border border-gray-200 hover:bg-gray-100 transition-all text-xs"
            >
              📊 EXPORT BATCH RESULTS (CSV)
            </button>
         </div>
      </div>

      <PercentageChangeSEO />
      
      <RelatedTools 
        currentTool="percentage-increase-decrease"
        tools={['percentage-calculator', 'discount-calculator', 'loan-emi-calculator']}
      />
    </div>
  );
}

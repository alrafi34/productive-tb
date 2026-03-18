"use client";

import { useState, useEffect } from "react";
import { 
  CalculationMode, 
  BasicFormula, 
  MultiStep,
  calcPercentOfNumber,
  calcPercentIncrease,
  calcPercentDecrease,
  calcWhatPercentIs,
  calcReversePercent,
  calcMultiStep,
  formatResultNumber
} from "./logic";
import PercentageCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function PercentageCalculatorUI() {
  const [mode, setMode] = useState<CalculationMode>('basic');
  const [basicFormula, setBasicFormula] = useState<BasicFormula>('percentOf');

  // Basic Mode States
  const [xValue, setXValue] = useState<string>("25");
  const [yValue, setYValue] = useState<string>("200");
  const [basicResult, setBasicResult] = useState<number | null>(null);

  // Reverse Mode States
  const [revFinal, setRevFinal] = useState<string>("80");
  const [revPercent, setRevPercent] = useState<string>("20");
  const [revIsIncrease, setRevIsIncrease] = useState<boolean>(false);
  const [revResult, setRevResult] = useState<number | null>(null);

  // Multi-Step Mode States
  const [multiStart, setMultiStart] = useState<string>("100");
  const [multiSteps, setMultiSteps] = useState<MultiStep[]>([
    { id: '1', type: 'increase', percent: 20 },
    { id: '2', type: 'decrease', percent: 10 }
  ]);
  const [multiResult, setMultiResult] = useState<{finalValue: number, history: string[]} | null>(null);

  // Batch Mode States
  const [batchInput, setBatchInput] = useState<string>("100\n200\n300\n450");
  const [batchPercent, setBatchPercent] = useState<string>("15");
  const [batchType, setBatchType] = useState<'percentOf' | 'increase' | 'decrease'>('percentOf');
  const [batchResults, setBatchResults] = useState<{original: number, final: number}[]>([]);

  const [copied, setCopied] = useState("");

  // Live calculations
  useEffect(() => {
    switch (mode) {
      case 'basic': {
        const x = parseFloat(xValue);
        const y = parseFloat(yValue);
        if (isNaN(x) || isNaN(y)) {
          setBasicResult(null);
          break;
        }
        if (basicFormula === 'percentOf') setBasicResult(calcPercentOfNumber(x, y));
        else if (basicFormula === 'increase') setBasicResult(calcPercentIncrease(y, x)); // increase Y by X%
        else if (basicFormula === 'decrease') setBasicResult(calcPercentDecrease(y, x)); // decrease Y by X%
        else if (basicFormula === 'whatPercent') setBasicResult(calcWhatPercentIs(x, y));
        break;
      }
      case 'reverse': {
        const f = parseFloat(revFinal);
        const p = parseFloat(revPercent);
        if (isNaN(f) || isNaN(p) || (p >= 100 && !revIsIncrease)) {
          setRevResult(null);
          break;
        }
        setRevResult(calcReversePercent(f, p, revIsIncrease));
        break;
      }
      case 'multi': {
        const s = parseFloat(multiStart);
        if (isNaN(s)) {
          setMultiResult(null);
          break;
        }
        setMultiResult(calcMultiStep(s, multiSteps));
        break;
      }
      case 'batch': {
        const p = parseFloat(batchPercent);
        if (isNaN(p)) {
          setBatchResults([]);
          break;
        }
        const prices = batchInput.split('\n')
          .map(line => parseFloat(line.trim()))
          .filter(n => !isNaN(n));
          
        const results = prices.map(val => {
          let fin = 0;
          if (batchType === 'percentOf') fin = calcPercentOfNumber(p, val);
          else if (batchType === 'increase') fin = calcPercentIncrease(val, p);
          else if (batchType === 'decrease') fin = calcPercentDecrease(val, p);
          return { original: val, final: fin };
        });
        setBatchResults(results);
        break;
      }
    }
  }, [mode, basicFormula, xValue, yValue, revFinal, revPercent, revIsIncrease, multiStart, multiSteps, batchInput, batchPercent, batchType]);

  const addMultiStep = () => {
    if (multiSteps.length >= 10) return;
    setMultiSteps(prev => [...prev, { id: Date.now().toString(), type: 'increase', percent: 10 }]);
  };

  const removeMultiStep = (id: string) => {
    setMultiSteps(prev => prev.filter(s => s.id !== id));
  };

  const updateMultiStep = (id: string, field: 'type' | 'percent', val: any) => {
    setMultiSteps(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const exportCSV = () => {
    if (batchResults.length === 0) return;
    let csv = "Original Value,Final Value\n";
    batchResults.forEach(r => {
      csv += `${formatResultNumber(r.original)},${formatResultNumber(r.final)}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "percentage_calculations.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getFullCalculationText = () => {
    if (mode === 'basic' && basicResult !== null) {
      if (basicFormula === 'percentOf') return `${xValue}% of ${yValue} = ${formatResultNumber(basicResult)}`;
      if (basicFormula === 'increase') return `Increase ${yValue} by ${xValue}% = ${formatResultNumber(basicResult)}`;
      if (basicFormula === 'decrease') return `Decrease ${yValue} by ${xValue}% = ${formatResultNumber(basicResult)}`;
      if (basicFormula === 'whatPercent') return `${xValue} is ${formatResultNumber(basicResult)}% of ${yValue}`;
    }
    if (mode === 'reverse' && revResult !== null) {
      return `Final value: ${revFinal}\n${revIsIncrease ? 'Increase' : 'Decrease'}: ${revPercent}%\nOriginal value: ${formatResultNumber(revResult)}`;
    }
    if (mode === 'multi' && multiResult !== null) {
      return multiResult.history.join("\n") + `\n\nFinal Value: ${formatResultNumber(multiResult.finalValue)}`;
    }
    return "";
  };

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Mode Selector */}
        <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit">
          <button onClick={() => setMode('basic')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'basic' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Basic</button>
          <button onClick={() => setMode('reverse')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'reverse' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Reverse</button>
          <button onClick={() => setMode('multi')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'multi' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Multi-Step</button>
          <button onClick={() => setMode('batch')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'batch' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>Batch</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          
          {/* Controls Panel */}
          <div className="space-y-6">
            
            {/* BASIC MODE */}
            {mode === 'basic' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Calculation Type</label>
                  <select 
                    value={basicFormula}
                    onChange={(e) => setBasicFormula(e.target.value as BasicFormula)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="percentOf">What is X% of Y?</option>
                    <option value="increase">Increase Y by X%</option>
                    <option value="decrease">Decrease Y by X%</option>
                    <option value="whatPercent">X is what % of Y?</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      {basicFormula === 'whatPercent' ? 'X (Part)' : 'X (%)'}
                    </label>
                    <input
                      type="number"
                      value={xValue}
                      onChange={(e) => setXValue(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      Y (Total/Base)
                    </label>
                    <input
                      type="number"
                      value={yValue}
                      onChange={(e) => setYValue(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="0"
                    />
                  </div>
                </div>

                {basicFormula !== 'whatPercent' && (
                  <div>
                     <label className="block text-sm text-gray-500 mb-2">Drag to adjust X (%)</label>
                     <input 
                        type="range" 
                        min="0" 
                        max="200" 
                        value={parseFloat(xValue) || 0} 
                        onChange={e => setXValue(e.target.value)}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                     />
                  </div>
                )}
              </div>
            )}

            {/* REVERSE MODE */}
            {mode === 'reverse' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Final Output Value</label>
                  <input
                    type="number"
                    value={revFinal}
                    onChange={(e) => setRevFinal(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="0"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Was it an...</label>
                     <select 
                       value={revIsIncrease ? "increase" : "decrease"}
                       onChange={(e) => setRevIsIncrease(e.target.value === "increase")}
                       className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                     >
                       <option value="increase">Increase</option>
                       <option value="decrease">Decrease</option>
                     </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>By Percentage (%)</label>
                    <input
                      type="number"
                      value={revPercent}
                      onChange={(e) => setRevPercent(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MULTI-STEP MODE */}
            {mode === 'multi' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Starting Value</label>
                  <input
                    type="number"
                    value={multiStart}
                    onChange={(e) => setMultiStart(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                     <label className="block text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>Sequential Steps</label>
                     <button onClick={addMultiStep} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-2.5 py-1.5 rounded-lg transition-colors">
                        + Add Step
                     </button>
                  </div>
                  
                  {multiSteps.map((step, idx) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <select 
                        value={step.type}
                        onChange={e => updateMultiStep(step.id, 'type', e.target.value)}
                        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 shrink-0"
                      >
                        <option value="increase">+ Increase</option>
                        <option value="decrease">- Decrease</option>
                      </select>
                      <div className="relative flex-1">
                        <input 
                           type="number"
                           min="0"
                           value={step.percent.toString()}
                           onChange={e => updateMultiStep(step.id, 'percent', parseFloat(e.target.value) || 0)}
                           className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-8 py-2 text-base font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 font-medium">%</div>
                      </div>
                      {multiSteps.length > 1 && (
                         <button onClick={() => removeMultiStep(step.id)} className="text-gray-400 hover:text-red-500 p-2 shrink-0">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                         </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BATCH MODE */}
            {mode === 'batch' && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Action</label>
                    <select 
                       value={batchType}
                       onChange={(e) => setBatchType(e.target.value as any)}
                       className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                     >
                       <option value="percentOf">Percent Of (X%)</option>
                       <option value="increase">Increase by (X%)</option>
                       <option value="decrease">Decrease by (X%)</option>
                     </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Percentage (%)</label>
                    <input
                      type="number"
                      value={batchPercent}
                      onChange={(e) => setBatchPercent(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    List of Values (one per line)
                  </label>
                  <textarea
                    value={batchInput}
                    onChange={e => setBatchInput(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow h-40 resize-y"
                    placeholder="100&#10;50&#10;25.50"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Result Panel */}
          <div className="sticky top-6">
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-8 text-white relative overflow-hidden">
               
               {/* Visual Background Indicators */}
               {mode === 'basic' && basicFormula === 'increase' && basicResult !== null && (
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                 </div>
               )}
               {mode === 'basic' && basicFormula === 'decrease' && basicResult !== null && (
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
                 </div>
               )}

               {/* NORMAL BASIC RESULT */}
               {mode === 'basic' && (
                  <div className="space-y-6 relative z-10">
                     <div className="text-center pb-6 border-b border-white/20">
                        <p className="text-primary-100 font-medium mb-1" style={{ fontFamily: "var(--font-heading)" }}>Result</p>
                        <h2 className="text-5xl font-bold tracking-tight mb-2 break-words">
                           {basicResult !== null ? formatResultNumber(basicResult) : '0'}
                           {basicFormula === 'whatPercent' && basicResult !== null ? '%' : ''}
                        </h2>
                     </div>
                     
                     <div className="text-center text-primary-100 font-medium">
                        {basicFormula === 'percentOf' && `${xValue || 0}% of ${yValue || 0}`}
                        {basicFormula === 'increase' && `Increasing ${yValue || 0} by ${xValue || 0}%`}
                        {basicFormula === 'decrease' && `Decreasing ${yValue || 0} by ${xValue || 0}%`}
                        {basicFormula === 'whatPercent' && `${xValue || 0} is ${basicResult !== null ? formatResultNumber(basicResult) : '0'}% of ${yValue || 0}`}
                     </div>

                     {/* Visual Change Bar for Increase/Decrease */}
                     {(basicFormula === 'increase' || basicFormula === 'decrease') && basicResult !== null && parseFloat(yValue) > 0 && (
                        <div className="pt-2">
                           <div className="flex justify-between text-xs font-semibold text-primary-100 mb-1.5">
                              <span>Original: {formatResultNumber(parseFloat(yValue))}</span>
                              <span>Change: {basicFormula === 'increase' ? '+' : '-'}{xValue}%</span>
                           </div>
                           <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden flex">
                              {basicFormula === 'increase' ? (
                                <>
                                  <div className="bg-white h-full" style={{ width: `100%` }}></div>
                                  <div className="bg-green-400 h-full flex-shrink-0" style={{ width: `${Math.min(100, parseFloat(xValue))}%` }}></div>
                                </>
                              ) : (
                                <>
                                  <div className="bg-white h-full" style={{ width: `${Math.max(0, 100 - parseFloat(xValue))}%` }}></div>
                                  <div className="bg-red-400 h-full" style={{ width: `${Math.min(100, parseFloat(xValue))}%` }}></div>
                                </>
                              )}
                           </div>
                        </div>
                     )}

                     <div className="pt-4 flex flex-col gap-2">
                        <button 
                          onClick={() => basicResult !== null && copyToClipboard(basicFormula === 'whatPercent' ? `${formatResultNumber(basicResult)}%` : formatResultNumber(basicResult), "price")}
                          className="w-full bg-white text-primary font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          {copied === "price" ? "Copied!" : "📋 Copy Result"}
                        </button>
                        <button 
                          onClick={() => copyToClipboard(getFullCalculationText(), "full")}
                          className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          {copied === "full" ? "Copied Calculation" : "📋 Copy Full Output"}
                        </button>
                     </div>
                  </div>
               )}

               {/* REVERSE RESULT */}
               {mode === 'reverse' && (
                  <div className="space-y-6 text-center relative z-10">
                     <div className="pb-6 border-b border-white/20">
                        <p className="text-primary-100 font-medium mb-1" style={{ fontFamily: "var(--font-heading)" }}>Original Value</p>
                        <h2 className="text-5xl font-bold tracking-tight mb-2 break-words">
                           {revResult !== null ? formatResultNumber(revResult) : '0'}
                        </h2>
                     </div>
                     <p className="text-primary-100 text-sm leading-relaxed max-w-xs mx-auto">
                        If a value {revIsIncrease ? 'increased' : 'decreased'} by <strong className="text-white">{parseFloat(revPercent) || 0}%</strong> to become <strong className="text-white">{parseFloat(revFinal) || 0}</strong>, its original value was <strong className="text-white">{revResult !== null ? formatResultNumber(revResult) : '0'}</strong>.
                     </p>
                     <div className="pt-4">
                        <button 
                          onClick={() => revResult !== null && copyToClipboard(formatResultNumber(revResult), "reverse")}
                          className="w-full bg-white text-primary font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          {copied === "reverse" ? "Copied!" : "📋 Copy Original Value"}
                        </button>
                        <button 
                          onClick={() => copyToClipboard(getFullCalculationText(), "full")}
                          className="w-full mt-2 bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          {copied === "full" ? "Copied Calculation" : "📋 Copy Full Output"}
                        </button>
                     </div>
                  </div>
               )}

               {/* MULTI RESULT */}
               {mode === 'multi' && (
                  <div className="space-y-6 relative z-10">
                     <div className="text-center pb-6 border-b border-white/20">
                        <p className="text-primary-100 font-medium mb-1" style={{ fontFamily: "var(--font-heading)" }}>Final Value</p>
                        <h2 className="text-5xl font-bold tracking-tight mb-2 break-words">
                           {multiResult !== null ? formatResultNumber(multiResult.finalValue) : '0'}
                        </h2>
                     </div>
                     
                     <div className="bg-white/10 rounded-lg p-4 space-y-2 text-sm font-mono max-h-48 overflow-y-auto custom-scrollbar">
                        {multiResult ? multiResult.history.map((h, i) => (
                           <div key={i}>{h}</div>
                        )) : "No active steps."}
                     </div>

                     <div className="pt-2 flex flex-col gap-2">
                        <button 
                          onClick={() => multiResult !== null && copyToClipboard(formatResultNumber(multiResult.finalValue), "price")}
                          className="w-full bg-white text-primary font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          {copied === "price" ? "Copied!" : "📋 Copy Result"}
                        </button>
                        <button 
                          onClick={() => copyToClipboard(getFullCalculationText(), "full")}
                          className="w-full bg-primary-dark border border-white/20 text-white font-medium py-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          {copied === "full" ? "Copied Calculation" : "📋 Copy Full Output"}
                        </button>
                     </div>
                  </div>
               )}

               {/* BATCH RESULT */}
               {mode === 'batch' && (
                  <div className="space-y-4 relative z-10">
                     <div className="text-center pb-4 border-b border-white/20">
                       <h2 className="text-2xl font-bold mb-1">Batch Output</h2>
                       <p className="text-primary-100 text-sm">{batchResults.length} values calculated</p>
                     </div>
                     
                     <div className="bg-white/10 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center text-sm font-semibold text-primary-100 pb-2 border-b border-white/10">
                           <span>Original</span>
                           <span>=&gt;</span>
                           <span>Final</span>
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                           {batchResults.length === 0 ? (
                             <p className="text-sm text-primary-200 text-center py-4">No valid numbers entered.</p>
                           ) : batchResults.map((r, i) => (
                             <div key={i} className="flex justify-between items-center text-sm">
                               <span className="text-primary-100">{formatResultNumber(r.original)}</span>
                               <span className="text-white font-medium">{formatResultNumber(r.final)}</span>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="pt-2">
                        <button 
                          onClick={exportCSV}
                          disabled={batchResults.length === 0}
                          className="w-full bg-white disabled:bg-white/50 text-primary disabled:text-primary/50 font-semibold py-2.5 rounded-lg hover:bg-gray-50 disabled:hover:bg-white/50 transition-colors shadow-sm"
                        >
                          💾 Export to CSV
                        </button>
                     </div>
                  </div>
               )}

            </div>
          </div>
          
        </div>

      </div>
      
      <PercentageCalculatorSEO />
      
      <RelatedTools
        currentTool="percentage-calculator"
        tools={['percentage-increase-decrease', 'discount-calculator', 'tip-calculator']}
      />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { 
  DiscountStep, 
  CalculationResult, 
  calculateDiscount, 
  calculateOriginalPrice, 
  formatCurrency 
} from "./logic";
import DiscountCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Mode = 'normal' | 'reverse' | 'batch';

export default function DiscountCalculatorUI() {
  const [mode, setMode] = useState<Mode>('normal');
  
  // Normal/Reverse Mode State
  const [inputValue, setInputValue] = useState<string>("100");
  const [discounts, setDiscounts] = useState<DiscountStep[]>([
    { id: '1', type: 'percent', value: 20 }
  ]);
  const [tax, setTax] = useState<string>("0");

  // Batch Mode State
  const [batchInput, setBatchInput] = useState<string>("100\n250\n75.50\n300");

  // Results State
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [reverseResult, setReverseResult] = useState<number | null>(null);
  const [batchResults, setBatchResults] = useState<CalculationResult[]>([]);
  
  const [copied, setCopied] = useState("");

  const PRESETS = [10, 20, 25, 30, 40, 50, 75];

  // Perform Calculations
  useEffect(() => {
    const priceVal = parseFloat(inputValue);
    const taxVal = parseFloat(tax) || 0;
    
    if (mode === 'normal') {
      if (isNaN(priceVal) || priceVal < 0) {
        setResult(null);
        return;
      }
      setResult(calculateDiscount(priceVal, discounts, taxVal));
    } 
    else if (mode === 'reverse') {
      if (isNaN(priceVal) || priceVal < 0) {
        setReverseResult(null);
        return;
      }
      // For reverse, we only support a single percentage discount for simplicity
      const firstDiscount = discounts[0] || { value: 0 };
      const original = calculateOriginalPrice(priceVal, firstDiscount.value);
      setReverseResult(original);
    }
    else if (mode === 'batch') {
      const prices = batchInput.split('\n')
        .map(line => parseFloat(line.trim()))
        .filter(n => !isNaN(n) && n >= 0);
        
      const results = prices.map(p => calculateDiscount(p, discounts, taxVal));
      setBatchResults(results);
    }
  }, [inputValue, discounts, tax, mode, batchInput]);

  // Handlers
  const addDiscountStep = () => {
    if (discounts.length >= 5) return; // Limit to 5 steps
    setDiscounts(prev => [...prev, { id: Date.now().toString(), type: 'percent', value: 10 }]);
  };

  const removeDiscountStep = (id: string) => {
    setDiscounts(prev => prev.filter(d => d.id !== id));
  };

  const updateDiscount = (id: string, field: 'type' | 'value', val: any) => {
    setDiscounts(prev => prev.map(d => {
      if (d.id === id) {
        return { ...d, [field]: val };
      }
      return d;
    }));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const exportCSV = () => {
    if (batchResults.length === 0) return;
    
    let csv = "Original Price,Final Price,Discount Amount,Savings %\n";
    batchResults.forEach(r => {
      csv += `${r.originalPrice.toFixed(2)},${r.finalPrice.toFixed(2)},${r.discountAmount.toFixed(2)},${r.savingsPercentage.toFixed(2)}%\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "discount_calculations.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getFullCalculationText = () => {
    if (!result) return "";
    return `Original: ${formatCurrency(result.originalPrice)}\nFinal Price: ${formatCurrency(result.finalPrice)}\nYou Save: ${formatCurrency(result.discountAmount)} (${result.savingsPercentage.toFixed(1)}%)\n\nSteps:\n${result.calculationSteps.join("\n")}`;
  };

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Mode Selector */}
        <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-xl w-fit">
          <button
            onClick={() => setMode('normal')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'normal' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Discount Calculator
          </button>
          <button
            onClick={() => setMode('reverse')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'reverse' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Original Price Finder
          </button>
          <button
             onClick={() => setMode('batch')}
             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
               mode === 'batch' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'
             }`}
          >
             Batch Calculator
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          
          {/* Controls Panel */}
          <div className="space-y-6">
            
            {/* Input Price */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {mode === 'reverse' ? 'Sale Price ($)' : 'Original Price ($)'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 font-medium">
                    $
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-4 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Batch Input Textarea */}
              {mode === 'batch' && (
                <div className="pt-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    List of Prices (one per line)
                  </label>
                  <textarea
                    value={batchInput}
                    onChange={e => setBatchInput(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow h-32 resize-y"
                    placeholder="100&#10;50&#10;25.50"
                  />
                </div>
              )}
            </div>

            {/* Discounts Block */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center mb-2">
                 <h3 className="font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                    {mode === 'reverse' ? 'Discount Percentage' : 'Apply Discount(s)'}
                 </h3>
                 {mode !== 'reverse' && discounts.length < 5 && (
                    <button onClick={addDiscountStep} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-2.5 py-1.5 rounded-lg transition-colors">
                      + Add Stack
                    </button>
                 )}
              </div>

              {/* Limit reverse mode to 1 percent discount */}
              {discounts.map((discount, idx) => (
                <div key={discount.id} className="space-y-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    {mode !== 'reverse' && (
                       <select 
                         value={discount.type}
                         onChange={e => updateDiscount(discount.id, 'type', e.target.value)}
                         className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                       >
                         <option value="percent">% Off</option>
                         <option value="fixed">$ Off</option>
                       </select>
                    )}
                    <div className="relative flex-1">
                      <input 
                         type="number"
                         min="0"
                         max={discount.type === 'percent' ? "100" : undefined}
                         step={discount.type === 'percent' ? "1" : "0.01"}
                         value={discount.value.toString()}
                         onChange={e => {
                            let val = parseFloat(e.target.value) || 0;
                            if (discount.type === 'percent') {
                               val = Math.min(100, Math.max(0, val));
                            } else {
                               val = Math.max(0, val);
                            }
                            updateDiscount(discount.id, 'value', val);
                         }}
                         className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-8 py-2 text-base font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 font-medium">
                        {discount.type === 'percent' ? '%' : '$'}
                      </div>
                    </div>
                    {mode !== 'reverse' && discounts.length > 1 && (
                       <button onClick={() => removeDiscountStep(discount.id)} className="text-gray-400 hover:text-red-500 p-2">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                       </button>
                    )}
                  </div>
                  
                  {/* Slider Control (Only for Percentage) */}
                  {discount.type === 'percent' && (
                     <div className="pt-2 px-1">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={discount.value} 
                          onChange={e => updateDiscount(discount.id, 'value', parseInt(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                     </div>
                  )}

                  {/* Presets */}
                  {discount.type === 'percent' && (
                     <div className="flex flex-wrap gap-1.5 pt-1">
                       {PRESETS.map(p => (
                         <button
                           key={p}
                           onClick={() => updateDiscount(discount.id, 'value', p)}
                           className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${discount.value === p ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                         >
                           {p}%
                         </button>
                       ))}
                     </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tax Panel */}
            {mode !== 'reverse' && (
               <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                 <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                   Local Tax (%) – Optional
                 </label>
                 <div className="relative">
                   <input
                     type="number"
                     min="0"
                     max="100"
                     step="0.01"
                     value={tax}
                     onChange={(e) => setTax(e.target.value)}
                     className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-3 pr-8 py-2 text-base font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                     placeholder="0"
                   />
                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 font-medium">
                     %
                   </div>
                 </div>
               </div>
            )}
          </div>

          {/* Result Panel */}
          <div className="sticky top-6">
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-8 text-white">
               
               {mode === 'normal' && result && (
                  <div className="space-y-6">
                     <div className="text-center pb-6 border-b border-white/20">
                        <p className="text-primary-100 font-medium mb-1" style={{ fontFamily: "var(--font-heading)" }}>Final Price</p>
                        <h2 className="text-5xl font-bold tracking-tight mb-2">
                           {formatCurrency(result.finalPrice)}
                        </h2>
                        {result.taxAmount > 0 && (
                           <p className="text-sm text-primary-200">Includes {formatCurrency(result.taxAmount)} tax</p>
                        )}
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-lg p-4">
                           <p className="text-primary-100 text-xs font-semibold uppercase tracking-wider mb-1">Original</p>
                           <p className="text-lg font-medium">{formatCurrency(result.originalPrice)}</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                           <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">You Save</p>
                           <p className="text-lg font-medium text-white">{formatCurrency(result.discountAmount)}</p>
                        </div>
                     </div>

                     {/* Savings Visualizer Bar */}
                     {result.savingsPercentage > 0 && result.originalPrice > 0 && (
                        <div className="pt-2">
                           <div className="flex justify-between text-xs font-medium text-primary-100 mb-1.5">
                              <span>Saved {result.savingsPercentage.toFixed(1)}%</span>
                              <span>Paid {(100 - result.savingsPercentage).toFixed(1)}%</span>
                           </div>
                           <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden flex">
                              <div className="bg-white h-full" style={{ width: `${result.savingsPercentage}%` }}></div>
                           </div>
                        </div>
                     )}

                     {/* Export Tools */}
                     <div className="pt-4 flex flex-col gap-2">
                        <button 
                          onClick={() => copyToClipboard(result.finalPrice.toFixed(2), "price")}
                          className="w-full bg-white text-primary font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          {copied === "price" ? "Copied!" : "📋 Copy Price"}
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

               {mode === 'reverse' && (
                  <div className="space-y-6 text-center">
                     <div className="pb-6 border-b border-white/20">
                        <p className="text-primary-100 font-medium mb-1" style={{ fontFamily: "var(--font-heading)" }}>Original Price Before Sale</p>
                        <h2 className="text-5xl font-bold tracking-tight mb-2">
                           {reverseResult !== null ? formatCurrency(reverseResult) : '$0.00'}
                        </h2>
                     </div>
                     <p className="text-primary-100 text-sm leading-relaxed max-w-xs mx-auto">
                        If an item costs <strong className="text-white">${parseFloat(inputValue) || 0}</strong> today because it is <strong className="text-white">{discounts[0]?.value || 0}%</strong> off, it originally cost <strong className="text-white">{reverseResult !== null ? formatCurrency(reverseResult) : '$0.00'}</strong>.
                     </p>
                     <div className="pt-4">
                        <button 
                          onClick={() => reverseResult && copyToClipboard(reverseResult.toFixed(2), "reverse")}
                          className="w-full bg-white text-primary font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                        >
                          {copied === "reverse" ? "Copied!" : "📋 Copy Original Price"}
                        </button>
                     </div>
                  </div>
               )}

               {mode === 'batch' && (
                  <div className="space-y-4">
                     <div className="text-center pb-4 border-b border-white/20">
                       <h2 className="text-2xl font-bold mb-1">Batch Summary</h2>
                       <p className="text-primary-100 text-sm">{batchResults.length} prices calculated</p>
                     </div>
                     
                     <div className="bg-white/10 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center text-sm font-semibold text-primary-100 pb-2 border-b border-white/10">
                           <span>Original</span>
                           <span>=&gt;</span>
                           <span>Final</span>
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                           {batchResults.length === 0 ? (
                             <p className="text-sm text-primary-200 text-center py-4">No valid prices entered.</p>
                           ) : batchResults.map((r, i) => (
                             <div key={i} className="flex justify-between items-center text-sm">
                               <span className="text-primary-100">{formatCurrency(r.originalPrice)}</span>
                               <span className="text-white font-medium">{formatCurrency(r.finalPrice)}</span>
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
            
            {/* Extended Output Details (Normal Mode) */}
            {mode === 'normal' && result && result.calculationSteps.length > 1 && (
               <div className="mt-4 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                 <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>Calculation Breakdown</h4>
                 </div>
                 <div className="p-5 text-sm font-mono text-gray-600 space-y-2 bg-gray-50/50">
                    {result.calculationSteps.map((step, i) => (
                      <div key={i}>{step}</div>
                    ))}
                 </div>
               </div>
            )}
          </div>
          
        </div>

      </div>
      
      <DiscountCalculatorSEO />
      
      <RelatedTools
        currentTool="discount-calculator"
        tools={['password-generator', 'word-counter', 'lorem-ipsum-generator']} // Add any related finance/utility tools here if applicable
      />
    </>
  );
}

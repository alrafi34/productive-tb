"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  MAJOR_CURRENCIES, 
  MAJOR_LOCALES, 
  FormatOptions, 
  formatValue, 
  generateCodeSnippet 
} from "./logic";
import CurrencyFormatPreviewerSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function CurrencyFormatPreviewerUI() {
  const [value, setValue] = useState<number>(1234567.89);
  const [inputValue, setInputValue] = useState("1234567.89");
  
  // Options
  const [activeLocale, setActiveLocale] = useState("en-US");
  const [style, setStyle] = useState<'currency' | 'decimal'>('currency');
  const [currencyDisplay, setCurrencyDisplay] = useState<'symbol' | 'code' | 'name' | 'narrowSymbol'>('symbol');
  const [precision, setPrecision] = useState(2);
  const [useGrouping, setUseGrouping] = useState(true);
  const [currencySign, setCurrencySign] = useState<'standard' | 'accounting'>('standard');
  
  // Batch
  const [batchInput, setBatchInput] = useState("100\n5000\n1234567.89\n-45.5");
  
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const num = parseFloat(inputValue);
    if (!isNaN(num)) setValue(num);
  }, [inputValue]);

  const options: FormatOptions = useMemo(() => ({
    style,
    currencyDisplay,
    useGrouping,
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
    currencySign,
    currency: 'USD' // Default for shared options, will be overridden for comparison
  }), [style, currencyDisplay, useGrouping, precision, currencySign]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const batchResults = useMemo(() => {
    const lines = batchInput.split("\n").map(l => l.trim()).filter(Boolean);
    return lines.map(line => {
      const val = parseFloat(line);
      if (isNaN(val)) return { raw: line, formatted: 'Invalid Number' };
      return { 
        raw: line, 
        formatted: formatValue(val, activeLocale, { ...options, currency: 'USD' }) 
      };
    });
  }, [batchInput, activeLocale, options]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Top Controls Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Number to Format</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="1234567.89"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-2xl font-black text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ fontFamily: "var(--font-heading)" }}
                />
                <button 
                  onClick={() => setInputValue((Math.random() * 1000000).toFixed(2))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                  title="Randomize"
                >
                  🎲
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main Locale</label>
                  <select 
                    value={activeLocale}
                    onChange={(e) => setActiveLocale(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700"
                  >
                    {MAJOR_LOCALES.map(l => <option key={l.code} value={l.code}>{l.name} ({l.code})</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Custom Locale</label>
                  <input 
                    type="text" 
                    value={activeLocale}
                    onChange={(e) => setActiveLocale(e.target.value)}
                    placeholder="e.g. de-DE"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700"
                  />
               </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50">
               <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700">Display Style</label>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button onClick={() => setStyle('currency')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${style === 'currency' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Currency</button>
                    <button onClick={() => setStyle('decimal')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${style === 'decimal' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Number</button>
                  </div>
               </div>

               <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700">Currency Display</label>
                  <select 
                    value={currencyDisplay}
                    onChange={(e) => setCurrencyDisplay(e.target.value as any)}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-700"
                  >
                    <option value="symbol">Symbol ($)</option>
                    <option value="narrowSymbol">Narrow ($)</option>
                    <option value="code">Code (USD)</option>
                    <option value="name">Name (US dollars)</option>
                  </select>
               </div>

               <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700">Accounting Style</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={currencySign === 'accounting'} onChange={(e) => setCurrencySign(e.target.checked ? 'accounting' : 'standard')} className="sr-only peer"/>
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
               </div>

               <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-700">Max Decimals: {precision}</label>
                  </div>
                  <input 
                    type="range" min="0" max="6" value={precision}
                    onChange={(e) => setPrecision(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none accent-primary"
                  />
               </div>
            </div>

          </div>

          <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-lg space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Developer Snippet</h3>
            <pre className="bg-black/30 p-4 rounded-xl text-[10px] sm:text-xs font-mono text-primary-light overflow-x-auto border border-white/5">
              {generateCodeSnippet(activeLocale, { ...options, currency: 'USD' })}
            </pre>
            <button 
              onClick={() => copyToClipboard(generateCodeSnippet(activeLocale, { ...options, currency: 'USD' }), 'snippet')}
              className="w-full bg-white/10 hover:bg-white/20 py-2.5 rounded-xl text-xs font-bold transition-all border border-white/5"
            >
              {copied === 'snippet' ? "✓ Copied Snippet" : "📋 Copy Implementation"}
            </button>
          </div>
        </div>

        {/* Global Preview List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-full">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
               <h3 className="font-bold text-gray-900 uppercase tracking-tighter text-sm">Global Format Comparison</h3>
               <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded">Live Preview</span>
            </div>
            
            <div className="flex-1 overflow-auto custom-scrollbar">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white sticky top-0 text-[10px] uppercase font-bold text-gray-400 border-b border-gray-100 z-10 shadow-sm">
                   <tr>
                      <th className="px-6 py-4">Currency</th>
                      <th className="px-6 py-4">Formatted (Based on {activeLocale})</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {MAJOR_CURRENCIES.map((cur) => {
                     const formatted = formatValue(value, activeLocale, { ...options, currency: cur.code });
                     return (
                       <tr key={cur.code} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="flex flex-col">
                                <span className="font-bold text-gray-900">{cur.code}</span>
                                <span className="text-[10px] text-gray-400 font-medium">{cur.name}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className="text-lg font-black text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                                {formatted}
                             </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button 
                               onClick={() => copyToClipboard(formatted, cur.code)}
                               className="opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-200 p-2 rounded-lg text-xs font-bold text-gray-500 hover:text-primary hover:border-primary shadow-sm"
                             >
                                {copied === cur.code ? "✓" : "📋"}
                             </button>
                          </td>
                       </tr>
                     );
                   })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Batch Formatter Section */}
      <div className="grid md:grid-cols-12 gap-8 items-start">
         <div className="md:col-span-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 h-full">
            <div className="space-y-1">
               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Batch Number Processor</h3>
               <p className="text-[10px] text-gray-400 font-medium italic">Paste raw numbers to format them all at once</p>
            </div>
            <textarea 
              value={batchInput}
              onChange={(e) => setBatchInput(e.target.value)}
              className="w-full h-48 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-mono"
            />
         </div>

         <div className="md:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
               <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-[10px] font-bold uppercase text-gray-400 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-3">Raw Value</th>
                        <th className="px-6 py-3">Formatted Result</th>
                        <th className="px-6 py-3 text-right">Copy</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {batchResults.map((r, i) => (
                       <tr key={i} className="hover:bg-gray-50/50">
                          <td className="px-6 py-3 font-mono text-gray-500">{r.raw}</td>
                          <td className="px-6 py-3 font-bold text-gray-900">{r.formatted}</td>
                          <td className="px-6 py-3 text-right">
                             <button 
                               onClick={() => copyToClipboard(r.formatted, `batch-${i}`)}
                               className="text-xs font-bold text-primary hover:underline"
                             >
                                {copied === `batch-${i}` ? "Copied" : "Copy"}
                             </button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>

      <CurrencyFormatPreviewerSEO />
      
      <RelatedTools 
        currentTool="currency-format-previewer"
        tools={['decimal-hex-converter', 'random-number-generator', 'percentage-calculator']}
      />
    </div>
  );
}

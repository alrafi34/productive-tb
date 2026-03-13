"use client";

import { useState, useEffect } from "react";
import {
  parseRatioInput,
  simplifyRatio,
  generateEquivalentRatios,
  formatRatio,
  calculateRatioPercentages
} from "./logic";
import UnitRatioCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function UnitRatioCalculatorUI() {
  const [input, setInput] = useState<string>("100:50");
  const [result, setResult] = useState<{
    simplified: number[];
    gcd: number;
    original: number[];
  } | null>(null);
  const [equivalents, setEquivalents] = useState<number[][]>([]);
  const [percentages, setPercentages] = useState<number[]>([]);
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [copied, setCopied] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const numbers = parseRatioInput(input);
    if (numbers.length >= 2 && numbers.length <= 10) {
      const simplified = simplifyRatio(numbers);
      setResult(simplified);
      setEquivalents(generateEquivalentRatios(simplified.simplified, 5));
      setPercentages(calculateRatioPercentages(simplified.simplified));
    } else {
      setResult(null);
      setEquivalents([]);
      setPercentages([]);
    }
  }, [input]);

  useEffect(() => {
    const stored = localStorage.getItem('ratio-history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored).slice(0, 5));
      } catch (e) {
        setHistory([]);
      }
    }
  }, []);

  const saveToHistory = () => {
    if (!result) return;
    const entry = `${formatRatio(result.original)} → ${formatRatio(result.simplified)}`;
    const newHistory = [entry, ...history.filter(h => h !== entry)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('ratio-history', JSON.stringify(newHistory));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const generateRandom = () => {
    const count = Math.floor(Math.random() * 3) + 2;
    const nums = Array.from({ length: count }, () => Math.floor(Math.random() * 100) + 10);
    setInput(nums.join(':'));
  };

  const exportCSV = () => {
    if (!result) return;
    let csv = "Multiplier,Ratio\n";
    equivalents.forEach((eq, i) => {
      csv += `${i + 1},"${formatRatio(eq)}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "equivalent_ratios.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const maxValue = result ? Math.max(...result.simplified) : 1;

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="grid md:grid-cols-2 gap-6 items-start">
          
          {/* Input Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Enter Ratio
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="100:50 or 20,40,60"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Use ":" "," or spaces to separate values (2-10 numbers)
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={generateRandom}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  🎲 Random
                </button>
                <button
                  onClick={() => setInput("")}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  🗑️ Clear
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showSteps"
                  checked={showSteps}
                  onChange={(e) => setShowSteps(e.target.checked)}
                  className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/50"
                />
                <label htmlFor="showSteps" className="text-sm text-gray-700 font-medium">
                  Show simplification steps
                </label>
              </div>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Recent Calculations
                </h3>
                <div className="space-y-2">
                  {history.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(h.split(' → ')[0].replace(/ : /g, ':'))}
                      className="w-full text-left text-xs text-gray-600 hover:text-primary hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors font-mono"
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Result Panel */}
          <div className="sticky top-6 space-y-6">
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-8 text-white relative overflow-hidden">
              
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="text-center pb-6 border-b border-white/20">
                  <p className="text-primary-100 font-medium mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    Simplified Ratio
                  </p>
                  <h2 className="text-4xl font-bold tracking-tight mb-2 break-words">
                    {result ? formatRatio(result.simplified) : '—'}
                  </h2>
                  {result && result.gcd > 1 && (
                    <p className="text-primary-100 text-sm">
                      GCD: {result.gcd}
                    </p>
                  )}
                </div>

                {result && showSteps && (
                  <div className="bg-white/10 rounded-lg p-4 space-y-2 text-sm">
                    <div className="font-semibold">Steps:</div>
                    <div className="font-mono text-xs space-y-1">
                      <div>Original: {formatRatio(result.original)}</div>
                      <div>GCD: {result.gcd}</div>
                      <div>Divide each by {result.gcd}</div>
                      <div className="text-white font-semibold">Result: {formatRatio(result.simplified)}</div>
                    </div>
                  </div>
                )}

                {/* Visual Bars */}
                {result && result.simplified.length <= 5 && (
                  <div className="space-y-2">
                    <p className="text-primary-100 text-xs font-semibold mb-2">Visual Representation</p>
                    {result.simplified.map((val, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs font-mono w-8">{val}</span>
                        <div className="flex-1 h-6 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-white rounded-full transition-all"
                            style={{ width: `${(val / maxValue) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-primary-100">{percentages[i]?.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      if (result) {
                        copyToClipboard(formatRatio(result.simplified), "result");
                        saveToHistory();
                      }
                    }}
                    disabled={!result}
                    className="w-full bg-white disabled:bg-white/50 text-primary disabled:text-primary/50 font-semibold py-2.5 rounded-lg hover:bg-gray-50 disabled:hover:bg-white/50 transition-colors shadow-sm"
                  >
                    {copied === "result" ? "Copied!" : "📋 Copy Result"}
                  </button>
                </div>
              </div>
            </div>

            {/* Equivalent Ratios */}
            {result && equivalents.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
                    Equivalent Ratios
                  </h3>
                  <button
                    onClick={exportCSV}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-lg transition-colors"
                  >
                    💾 Export CSV
                  </button>
                </div>
                <div className="space-y-2">
                  {equivalents.map((eq, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-sm py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-500 font-medium">×{i + 1}</span>
                      <span className="font-mono text-gray-900">{formatRatio(eq)}</span>
                      <button
                        onClick={() => copyToClipboard(formatRatio(eq), `eq-${i}`)}
                        className="text-gray-400 hover:text-primary transition-colors"
                      >
                        {copied === `eq-${i}` ? "✓" : "📋"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <UnitRatioCalculatorSEO />
      
      <RelatedTools
        currentTool="unit-ratio-calculator"
        tools={['percentage-calculator', 'aspect-ratio-calculator', 'golden-ratio-calculator']}
      />
    </>
  );
}

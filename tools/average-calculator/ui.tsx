"use client";

import { useState, useEffect } from "react";
import { parseNumbers, calculateAverage, formatNumber, exportToCSV, downloadFile } from "./logic";
import AverageCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function AverageCalculatorUI() {
  const [input, setInput] = useState("10, 20, 30, 40");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [average, setAverage] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const parsed = parseNumbers(input);
    setNumbers(parsed);
    setAverage(calculateAverage(parsed));
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatNumber(average));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    if (numbers.length === 0) return;
    const csv = exportToCSV(numbers, average);
    downloadFile(csv, 'average_calculation.csv');
  };

  const handleClear = () => {
    setInput("");
    setNumbers([]);
    setAverage(0);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔢</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Average Calculator</h3>
              <p className="text-sm text-blue-800">
                Enter numbers separated by commas, spaces, or newlines to instantly calculate the arithmetic mean.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Enter Numbers
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="10, 20, 30, 40"
                className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-900 font-mono focus:outline-none focus:border-primary resize-none transition-colors"
                rows={10}
              />
              <div className="mt-3 text-xs text-gray-500">
                {numbers.length > 0 ? `${numbers.length} numbers detected` : 'Enter at least one number'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleClear}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                🗑️ Clear Input
              </button>
              <button
                onClick={handleExportCSV}
                disabled={numbers.length === 0}
                className="px-4 py-2.5 bg-green-100 hover:bg-green-200 disabled:bg-gray-100 text-green-700 disabled:text-gray-400 rounded-lg text-sm font-semibold transition-colors disabled:cursor-not-allowed"
              >
                💾 Export CSV
              </button>
            </div>
          </div>

          <div className="sticky top-6">
            <div className="bg-primary rounded-xl border border-primary-light shadow-lg shadow-primary/20 p-8 text-white">
              <div className="text-center space-y-6">
                <div className="pb-6 border-b border-white/20">
                  <p className="text-primary-100 font-medium mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    Average
                  </p>
                  <h2 className="text-5xl font-bold tracking-tight break-words">
                    {formatNumber(average)}
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-100">Count:</span>
                    <span className="font-semibold">{numbers.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-100">Sum:</span>
                    <span className="font-semibold">{formatNumber(numbers.reduce((a, b) => a + b, 0))}</span>
                  </div>
                  {numbers.length > 0 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-100">Min:</span>
                        <span className="font-semibold">{Math.min(...numbers)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary-100">Max:</span>
                        <span className="font-semibold">{Math.max(...numbers)}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-4 space-y-2">
                  <button
                    onClick={handleCopy}
                    disabled={numbers.length === 0}
                    className="w-full bg-white text-primary font-semibold py-2.5 rounded-lg hover:bg-gray-50 disabled:bg-white/50 disabled:text-primary/50 transition-colors shadow-sm disabled:cursor-not-allowed"
                  >
                    {copied ? "✓ Copied!" : "📋 Copy Result"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AverageCalculatorSEO />
      <RelatedTools
        currentTool="average-calculator"
        tools={['standard-deviation-calculator', 'percentage-calculator', 'discount-calculator']}
      />
    </>
  );
}

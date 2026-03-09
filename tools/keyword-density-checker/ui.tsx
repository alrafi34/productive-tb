"use client";

import { useState, useMemo } from "react";
import {
  countWords, countUniqueWords, calculateDensity,
  highlightOverusedWords, filterTargetKeywords, sortDensityData,
  exportToCSV, exportToJSON
} from "./logic";
import type { DensityData, AnalysisOptions } from "./types";
import KeywordDensityCheckerSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function KeywordDensityCheckerUI() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState<AnalysisOptions>({
    ignoreStopWords: true,
    caseSensitive: false,
    minWordLength: 2,
    targetKeywords: []
  });
  const [targetInput, setTargetInput] = useState("");
  const [sortBy, setSortBy] = useState<"count" | "density" | "word">("density");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showChart, setShowChart] = useState(true);
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => {
    if (!text.trim()) return { total: 0, data: [], overused: [] };
    
    const total = countWords(text);
    const counts = countUniqueWords(text, options);
    let data = calculateDensity(counts, total);
    
    if (options.targetKeywords?.length) {
      data = filterTargetKeywords(data, options.targetKeywords);
    }
    
    data = sortDensityData(data, sortBy, sortOrder);
    const overused = highlightOverusedWords(data, 5);
    
    return { total, data, overused };
  }, [text, options, sortBy, sortOrder]);

  const topWords = analysis.data.slice(0, 10);

  function handleSort(column: "count" | "density" | "word") {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  }

  function handleAddTarget() {
    if (!targetInput.trim()) return;
    const keywords = targetInput.split(",").map(k => k.trim()).filter(Boolean);
    setOptions(prev => ({
      ...prev,
      targetKeywords: [...(prev.targetKeywords || []), ...keywords]
    }));
    setTargetInput("");
  }

  function handleRemoveTarget(keyword: string) {
    setOptions(prev => ({
      ...prev,
      targetKeywords: prev.targetKeywords?.filter(k => k !== keyword) || []
    }));
  }

  function handleDownload(format: "csv" | "json") {
    const content = format === "csv" ? exportToCSV(analysis.data) : exportToJSON(analysis.data);
    const blob = new Blob([content], { type: format === "csv" ? "text/csv" : "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keyword-density.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCopy() {
    const content = analysis.data.map(d => 
      `${d.word}: ${d.count} (${d.density.toFixed(2)}%)`
    ).join("\n");
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
              Your Text
            </label>
            <span className="text-xs text-gray-400">{analysis.total} words</span>
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste or type your text here to analyze keyword density..."
            rows={8}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          />
        </div>

        {/* Options Panel */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Analysis Options
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.ignoreStopWords}
                onChange={e => setOptions(prev => ({ ...prev, ignoreStopWords: e.target.checked }))}
                className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm text-gray-600">Ignore stop words (the, is, and, etc.)</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.caseSensitive}
                onChange={e => setOptions(prev => ({ ...prev, caseSensitive: e.target.checked }))}
                className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm text-gray-600">Case-sensitive counting</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="text-xs text-gray-500 mb-2 block">
              Minimum word length: {options.minWordLength} letters
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={options.minWordLength}
              onChange={e => setOptions(prev => ({ ...prev, minWordLength: Number(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-2 block">
              Target Keywords (comma-separated)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={targetInput}
                onChange={e => setTargetInput(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleAddTarget()}
                placeholder="e.g., SEO, marketing, content"
                className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleAddTarget}
                className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            {options.targetKeywords && options.targetKeywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {options.targetKeywords.map(keyword => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 bg-violet-100 text-primary text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {keyword}
                    <button
                      onClick={() => handleRemoveTarget(keyword)}
                      className="hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {text && (
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setText("")}
              className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-600 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              🗑️ Clear
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {copied ? "✅ Copied!" : "📋 Copy Results"}
            </button>
            <button
              onClick={() => handleDownload("csv")}
              className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              📥 CSV
            </button>
            <button
              onClick={() => handleDownload("json")}
              className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              📥 JSON
            </button>
            <button
              onClick={() => setShowChart(!showChart)}
              className="flex items-center gap-2 border-2 border-gray-200 hover:border-primary text-gray-600 hover:text-primary text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {showChart ? "📊 Hide Chart" : "📊 Show Chart"}
            </button>
          </div>
        )}

        {/* Results */}
        {analysis.data.length > 0 && (
          <>
            {/* Chart */}
            {showChart && topWords.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Top 10 Keywords
                </h3>
                <div className="space-y-3">
                  {topWords.map((item, idx) => {
                    const maxDensity = topWords[0].density;
                    const width = (item.density / maxDensity) * 100;
                    const isOverused = analysis.overused.includes(item.word);
                    
                    return (
                      <div key={idx} className="group">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            {item.word}
                            {isOverused && (
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                                High
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.count} ({item.density.toFixed(2)}%)
                          </span>
                        </div>
                        <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isOverused ? "bg-red-400" : "bg-primary"
                            }`}
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
                  Keyword Density Analysis ({analysis.data.length} unique words)
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        #
                      </th>
                      <th
                        onClick={() => handleSort("word")}
                        className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-primary transition-colors"
                      >
                        Word {sortBy === "word" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        onClick={() => handleSort("count")}
                        className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-primary transition-colors"
                      >
                        Count {sortBy === "count" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        onClick={() => handleSort("density")}
                        className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-primary transition-colors"
                      >
                        Density {sortBy === "density" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {analysis.data.slice(0, 50).map((item, idx) => {
                      const isOverused = analysis.overused.includes(item.word);
                      return (
                        <tr
                          key={idx}
                          className={`hover:bg-gray-50 transition-colors ${
                            isOverused ? "bg-red-50" : ""
                          }`}
                        >
                          <td className="px-4 py-3 text-gray-400">{idx + 1}</td>
                          <td className="px-4 py-3 font-medium text-gray-800">
                            {item.word}
                            {isOverused && (
                              <span className="ml-2 text-xs text-red-500">⚠️</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-600">{item.count}</td>
                          <td className="px-4 py-3 text-right font-semibold text-primary">
                            {item.density.toFixed(2)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {analysis.data.length > 50 && (
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-xs text-gray-500">
                  Showing top 50 of {analysis.data.length} words. Download CSV/JSON for full results.
                </div>
              )}
            </div>
          </>
        )}

        {/* Empty State */}
        {!text && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to Analyze
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Paste your text above to see keyword density, word frequency, and optimize your content for SEO.
            </p>
          </div>
        )}
      </div>

      <KeywordDensityCheckerSEOContent />
      
      <RelatedTools
        tools={[
          {
            slug: "word-frequency-counter",
            name: "Word Frequency Counter",
            description: "Analyze text and count how often each word appears.",
            icon: "📊",
            category: "writing"
          },
          {
            slug: "word-counter",
            name: "Word Counter",
            description: "Count words, characters, and paragraphs.",
            icon: "📝",
            category: "writing"
          },
          {
            slug: "reading-time-calculator",
            name: "Reading Time Calculator",
            description: "Estimate reading time for any text content.",
            icon: "⏱️",
            category: "writing"
          }
        ]}
      />
    </>
  );
}

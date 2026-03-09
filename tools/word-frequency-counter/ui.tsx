"use client";

import { useState, useMemo } from "react";
import { analyzeText, exportToCSV, exportToJSON } from "./logic";
import type { AnalysisResult, FilterOptions } from "./types";
import WordFrequencyCounterSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function WordFrequencyCounterUI() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"frequency" | "alphabetical">("frequency");
  const [filters, setFilters] = useState<FilterOptions>({
    removeStopWords: false,
    caseSensitive: false,
    minWordLength: 1,
    ignoreNumbers: false,
  });

  const stats = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const chars = text.length;
    const lines = text.split("\n").length;
    return { words, chars, lines };
  }, [text]);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    const analysis = analyzeText(text, filters);
    setResult(analysis);
  };

  const filteredWords = useMemo(() => {
    if (!result) return [];
    let words = result.words;
    
    if (searchTerm) {
      words = words.filter(w => 
        w.word.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (sortBy === "alphabetical") {
      words = [...words].sort((a, b) => a.word.localeCompare(b.word));
    }
    
    return words;
  }, [result, searchTerm, sortBy]);

  const handleCopy = () => {
    if (!result) return;
    const content = filteredWords
      .map((w, i) => `${i + 1}. ${w.word}: ${w.count} (${w.percentage.toFixed(2)}%)`)
      .join("\n");
    navigator.clipboard.writeText(content);
  };

  const handleDownloadCSV = () => {
    if (!result) return;
    const csv = exportToCSV(filteredWords);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-frequency.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    if (!result) return;
    const json = exportToJSON(result);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-frequency.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        {/* Input Section */}
        <div className="relative mb-6">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter or paste your text here..."
            rows={10}
            className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          />
          {text && (
            <button
              onClick={() => setText("")}
              className="absolute top-3 right-3 text-xs text-gray-400 hover:text-red-500 transition-colors bg-white px-2 py-1 rounded-lg border border-gray-100"
            >
              Clear
            </button>
          )}
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Characters</div>
            <div className="text-lg font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
              {stats.chars}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Words</div>
            <div className="text-lg font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
              {stats.words}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Lines</div>
            <div className="text-lg font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
              {stats.lines}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Analysis Options
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.removeStopWords}
                onChange={e => setFilters({ ...filters, removeStopWords: e.target.checked })}
                className="rounded"
              />
              Remove stop words
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.caseSensitive}
                onChange={e => setFilters({ ...filters, caseSensitive: e.target.checked })}
                className="rounded"
              />
              Case sensitive
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.ignoreNumbers}
                onChange={e => setFilters({ ...filters, ignoreNumbers: e.target.checked })}
                className="rounded"
              />
              Ignore numbers
            </label>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <label>Min length:</label>
              <input
                type="number"
                min="1"
                max="20"
                value={filters.minWordLength}
                onChange={e => setFilters({ ...filters, minWordLength: parseInt(e.target.value) || 1 })}
                className="w-16 px-2 py-1 border border-gray-200 rounded text-center"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap mb-6">
          <button
            onClick={handleAnalyze}
            disabled={!text.trim()}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            📊 Analyze Text
          </button>
          <button
            onClick={() => { setText(""); setResult(null); }}
            disabled={!text && !result}
            className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            🗑️ Clear All
          </button>
        </div>

        {/* Results */}
        {result && (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="text-xs text-gray-400 mb-1">Total Words</div>
                <div className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                  {result.totalWords}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="text-xs text-gray-400 mb-1">Unique Words</div>
                <div className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                  {result.uniqueWords}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="text-xs text-gray-400 mb-1">Most Frequent</div>
                <div className="text-lg font-bold text-gray-800 truncate" style={{ fontFamily: "var(--font-heading)" }}>
                  {result.mostFrequentWord}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="text-xs text-gray-400 mb-1">Frequency</div>
                <div className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                  {result.highestFrequency}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy("frequency")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      sortBy === "frequency"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    By Frequency
                  </button>
                  <button
                    onClick={() => setSortBy("alphabetical")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      sortBy === "alphabetical"
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    A-Z
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search words..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-3 flex-wrap mb-4">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                📋 Copy Results
              </button>
              <button
                onClick={handleDownloadCSV}
                className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                📥 Download CSV
              </button>
              <button
                onClick={handleDownloadJSON}
                className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                📥 Download JSON
              </button>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600" style={{ fontFamily: "var(--font-heading)" }}>
                        Rank
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600" style={{ fontFamily: "var(--font-heading)" }}>
                        Word
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600" style={{ fontFamily: "var(--font-heading)" }}>
                        Count
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600" style={{ fontFamily: "var(--font-heading)" }}>
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredWords.slice(0, 100).map((word, index) => (
                      <tr key={word.word} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-800" style={{ fontFamily: "var(--font-body)" }}>
                          {word.word}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-800 font-semibold">
                          {word.count}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-primary font-semibold">
                          {word.percentage.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredWords.length > 100 && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 text-center">
                  Showing top 100 of {filteredWords.length} words
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      <WordFrequencyCounterSEOContent />
      
      <RelatedTools currentTool="word-frequency-counter" tools={["word-counter", "text-reverser", "paragraph-formatter"]} />
    </>
  );
}

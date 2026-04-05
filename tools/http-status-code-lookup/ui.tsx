"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  httpCodes,
  commonCodes,
  categories,
  searchCodes,
  getCodeByNumber,
  copyToClipboard,
  saveToRecent,
  getRecentCodes,
  clearRecentCodes,
  exportCodeInfo,
  HttpStatusCode,
  RecentCode
} from "./logic";
import HttpStatusCodeLookupSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function HttpStatusCodeLookupUI() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCode, setSelectedCode] = useState<HttpStatusCode | null>(null);
  const [recentCodes, setRecentCodes] = useState<RecentCode[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Load recent codes on mount
  useEffect(() => {
    setRecentCodes(getRecentCodes());
  }, []);

  // Search results with debouncing
  const searchResults = useMemo(() => {
    return searchCodes(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  // Handle code selection
  const handleCodeSelect = useCallback((code: HttpStatusCode) => {
    setSelectedCode(code);
    saveToRecent(code);
    setRecentCodes(getRecentCodes());
  }, []);

  // Handle quick code button click
  const handleQuickCode = useCallback((codeNumber: number) => {
    const code = getCodeByNumber(codeNumber);
    if (code) {
      handleCodeSelect(code);
      setSearchQuery(codeNumber.toString());
    }
  }, [handleCodeSelect]);

  // Copy functions
  const handleCopy = useCallback(async (text: string, type: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }
  }, []);

  const handleCopyCodeInfo = useCallback((code: HttpStatusCode) => {
    const info = `${code.code} ${code.name} - ${code.description}`;
    handleCopy(info, `info-${code.code}`);
  }, [handleCopy]);

  const handleCopyExample = useCallback((code: HttpStatusCode) => {
    handleCopy(code.example, `example-${code.code}`);
  }, [handleCopy]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSelectedCode(null);
  }, []);

  // Clear recent codes
  const handleClearRecent = useCallback(() => {
    clearRecentCodes();
    setRecentCodes([]);
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔍</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">HTTP Status Code Lookup</h3>
              <p className="text-sm text-blue-800">
                Instantly search and understand all HTTP status codes. Perfect for developers debugging APIs, 
                building web applications, or learning HTTP fundamentals.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Search Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Input */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Search HTTP Codes
              </h2>
              
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="404, redirect, server error..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-primary text-sm"
                    autoFocus
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === "All" ? "All Categories" : `${category} (${category.charAt(0)}xx)`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={clearSearch}
                    disabled={!searchQuery && selectedCategory === "All"}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    🗑️ Clear
                  </button>
                  <button
                    onClick={() => setShowRecent(!showRecent)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    {showRecent ? "Hide" : "Recent"}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Code Buttons */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Common Codes</h3>
              <div className="grid grid-cols-3 gap-2">
                {commonCodes.map(codeNumber => (
                  <button
                    key={codeNumber}
                    onClick={() => handleQuickCode(codeNumber)}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    {codeNumber}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Codes */}
            {showRecent && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">Recent Codes</h3>
                  {recentCodes.length > 0 && (
                    <button
                      onClick={handleClearRecent}
                      className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs font-semibold transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                {recentCodes.length === 0 ? (
                  <p className="text-center text-gray-500 py-4 text-sm">No recent codes</p>
                ) : (
                  <div className="space-y-2">
                    {recentCodes.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleCodeSelect(item.code)}
                        className="w-full p-2 text-left bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                      >
                        <div className="font-semibold text-gray-800">
                          {item.code.code} {item.code.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.code.category}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {selectedCode ? (
              /* Detailed Code View */
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                      {selectedCode.code} {selectedCode.name}
                    </h2>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mt-2">
                      {selectedCode.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCode(null)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    ← Back
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedCode.description}</p>
                  </div>

                  {/* Use Case */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Common Use Case</h3>
                    <p className="text-gray-700">{selectedCode.useCase}</p>
                  </div>

                  {/* Example */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Example</h3>
                    <pre className="p-4 bg-gray-50 rounded-lg text-sm font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap">
                      {selectedCode.example}
                    </pre>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleCopyCodeInfo(selectedCode)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        copied === `info-${selectedCode.code}`
                          ? "bg-green-500 text-white"
                          : "bg-primary hover:bg-primary-hover text-white"
                      }`}
                    >
                      {copied === `info-${selectedCode.code}` ? "✓ Copied Info" : "📋 Copy Info"}
                    </button>
                    <button
                      onClick={() => handleCopyExample(selectedCode)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        copied === `example-${selectedCode.code}`
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {copied === `example-${selectedCode.code}` ? "✓ Copied Example" : "📄 Copy Example"}
                    </button>
                    <button
                      onClick={() => exportCodeInfo(selectedCode)}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      💾 Export
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Search Results */
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                    {searchQuery ? `Search Results` : `All HTTP Status Codes`}
                  </h2>
                  <div className="text-sm text-gray-500">
                    {searchResults.length} codes
                  </div>
                </div>

                {searchResults.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No codes found</h3>
                    <p className="text-gray-500">
                      Try searching for a different code number or keyword
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {searchResults.map(code => (
                      <button
                        key={code.code}
                        onClick={() => handleCodeSelect(code)}
                        className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold text-gray-900">
                            {code.code}
                          </span>
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                            {code.category}
                          </span>
                        </div>
                        <div className="font-semibold text-gray-800 mb-1">
                          {code.name}
                        </div>
                        <div className="text-sm text-gray-600 line-clamp-2">
                          {code.description}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">💡 Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Search by code number (404), name (Not Found), or keywords (redirect, server error)</li>
            <li>• Use category filters to narrow down results by status code type</li>
            <li>• Click on any code to see detailed explanation, use cases, and examples</li>
            <li>• All data is stored locally - works offline once loaded</li>
          </ul>
        </div>
      </div>

      <HttpStatusCodeLookupSEOContent />
      <RelatedTools
        currentTool="http-status-code-lookup"
        tools={["user-agent-parser", "json-formatter", "regex-tester"]}
      />
    </>
  );
}
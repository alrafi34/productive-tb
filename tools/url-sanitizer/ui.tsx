"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  cleanURL,
  cleanMultipleURLs,
  parseURLsFromText,
  isValidURL,
  exportAsText,
  exportAsCSV,
  saveToHistory,
  getHistory,
  clearHistory,
  debounce,
  DEFAULT_TRACKING_PARAMS,
  type CleanedURL,
  type HistoryEntry
} from "./logic";
import URLSanitizerSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function URLSanitizerUI() {
  const [input, setInput] = useState("");
  const [batchMode, setBatchMode] = useState(false);
  const [customParams, setCustomParams] = useState("");
  const [results, setResults] = useState<CleanedURL[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showCustomParams, setShowCustomParams] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const customParamsSet = useMemo(() => {
    return new Set(
      customParams
        .split(',')
        .map(p => p.trim())
        .filter(p => p)
    );
  }, [customParams]);

  const debouncedClean = useCallback(
    debounce((inputText: string) => {
      if (!inputText.trim()) {
        setResults([]);
        return;
      }

      if (batchMode) {
        const urls = parseURLsFromText(inputText);
        const cleaned = cleanMultipleURLs(urls, customParamsSet);
        setResults(cleaned);
      } else {
        const cleaned = cleanURL(inputText.trim(), customParamsSet);
        setResults([cleaned]);
      }
    }, 300),
    [batchMode, customParamsSet]
  );

  useEffect(() => {
    debouncedClean(input);
  }, [input, debouncedClean]);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleCopyAll = async () => {
    const allCleaned = results.map(r => r.cleaned).join('\n');
    await handleCopy(allCleaned, 'all');
  };

  const handleSaveToHistory = (result: CleanedURL) => {
    if (result.paramCount > 0) {
      saveToHistory({
        original: result.original,
        cleaned: result.cleaned,
        removedParams: result.removedParams
      });
      setHistory(getHistory());
    }
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const handleLoadExample = () => {
    const example = batchMode 
      ? `https://example.com/product?id=123&utm_source=twitter&utm_medium=social&utm_campaign=spring
https://store.com/item?ref=homepage&fbclid=IwAR2abcd123&utm_content=banner
https://news.com/article?gclid=EAIaIQobChMI&utm_term=keyword&mc_cid=newsletter`
      : "https://example.com/product?id=123&utm_source=twitter&utm_medium=social&utm_campaign=spring&fbclid=IwAR2abcd123";
    setInput(example);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = e.dataTransfer.getData('text');
    if (text) {
      setInput(text);
    }
  };

  const totalRemoved = results.reduce((sum, r) => sum + r.paramCount, 0);

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Privacy Notice */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <h3 className="font-semibold text-green-900 mb-1">100% Private & Secure</h3>
              <p className="text-sm text-green-800">
                All URL cleaning happens locally in your browser. No URLs are sent to any server.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Processing Mode
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setBatchMode(false)}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                !batchMode
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-800">🔗 Single URL</div>
              <div className="text-xs text-gray-500 mt-1">Clean one URL at a time</div>
            </button>
            <button
              onClick={() => setBatchMode(true)}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                batchMode
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-800">📋 Batch Mode</div>
              <div className="text-xs text-gray-500 mt-1">Clean multiple URLs</div>
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              {batchMode ? 'URLs to Clean' : 'URL to Clean'}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleLoadExample}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                📋 Example
              </button>
              <button
                onClick={() => setInput("")}
                disabled={!input}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
              >
                🗑️ Clear
              </button>
            </div>
          </div>
          
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={batchMode 
                ? "Paste multiple URLs (one per line) or drag & drop text with URLs..."
                : "Paste a URL with tracking parameters..."
              }
              rows={batchMode ? 8 : 4}
              className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary/50 focus:border-primary focus:outline-none resize-none font-mono text-sm"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {input.length} chars
            </div>
          </div>
        </div>

        {/* Custom Parameters */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <button
            onClick={() => setShowCustomParams(!showCustomParams)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              ⚙️ Custom Parameters
            </h3>
            <span className="text-gray-400">{showCustomParams ? '▼' : '▶'}</span>
          </button>
          
          {showCustomParams && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional parameters to remove (comma-separated)
                </label>
                <input
                  type="text"
                  value={customParams}
                  onChange={(e) => setCustomParams(e.target.value)}
                  placeholder="ref, source, campaign, custom_param"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:outline-none"
                />
              </div>
              
              <div className="text-xs text-gray-500">
                <p className="mb-2">Default tracking parameters removed:</p>
                <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
                  <div className="flex flex-wrap gap-1">
                    {Array.from(DEFAULT_TRACKING_PARAMS).slice(0, 20).map(param => (
                      <span key={param} className="px-2 py-1 bg-gray-200 rounded text-xs">
                        {param}
                      </span>
                    ))}
                    <span className="px-2 py-1 bg-gray-300 rounded text-xs">
                      +{DEFAULT_TRACKING_PARAMS.size - 20} more
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                🧹 Cleaned URLs
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {totalRemoved} parameters removed
                </span>
                {results.length > 1 && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyAll}
                      className={`px-3 py-1 rounded-lg text-sm font-semibold transition-colors ${
                        copied === 'all'
                          ? 'bg-green-500 text-white'
                          : 'bg-primary hover:bg-primary-hover text-white'
                      }`}
                    >
                      {copied === 'all' ? '✓ Copied' : '📋 Copy All'}
                    </button>
                    <button
                      onClick={() => exportAsText(results)}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      📄 TXT
                    </button>
                    <button
                      onClick={() => exportAsCSV(results)}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      📊 CSV
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  {result.paramCount > 0 ? (
                    <>
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                            ORIGINAL
                          </span>
                          <span className="text-xs text-gray-500">
                            {result.removedParams.length} tracking parameters
                          </span>
                        </div>
                        <div className="font-mono text-sm text-gray-600 bg-red-50 p-2 rounded break-all">
                          {result.original}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                            CLEANED
                          </span>
                          <button
                            onClick={() => {
                              handleCopy(result.cleaned, `cleaned-${index}`);
                              handleSaveToHistory(result);
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                              copied === `cleaned-${index}`
                                ? 'bg-green-500 text-white'
                                : 'bg-primary hover:bg-primary-hover text-white'
                            }`}
                          >
                            {copied === `cleaned-${index}` ? '✓ Copied' : '📋 Copy'}
                          </button>
                        </div>
                        <div className="font-mono text-sm text-gray-800 bg-green-50 p-2 rounded break-all">
                          {result.cleaned}
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <span className="font-semibold">Removed parameters:</span>{' '}
                        {result.removedParams.join(', ')}
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          NO TRACKING FOUND
                        </span>
                        <button
                          onClick={() => handleCopy(result.cleaned, `clean-${index}`)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            copied === `clean-${index}`
                              ? 'bg-green-500 text-white'
                              : 'bg-primary hover:bg-primary-hover text-white'
                          }`}
                        >
                          {copied === `clean-${index}` ? '✓ Copied' : '📋 Copy'}
                        </button>
                      </div>
                      <div className="font-mono text-sm text-gray-800 bg-blue-50 p-2 rounded break-all">
                        {result.cleaned}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 text-lg font-semibold text-gray-800"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              📚 History ({history.length})
              <span className="text-gray-400">{showHistory ? '▼' : '▶'}</span>
            </button>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
              >
                🗑️ Clear History
              </button>
            )}
          </div>
          
          {showHistory && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No history yet</p>
              ) : (
                history.map((entry) => (
                  <div key={entry.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleCopy(entry.cleaned, `history-${entry.id}`)}
                        className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                          copied === `history-${entry.id}`
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {copied === `history-${entry.id}` ? '✓' : '📋'}
                      </button>
                    </div>
                    <div className="font-mono text-xs text-gray-800 bg-gray-50 p-2 rounded break-all">
                      {entry.cleaned}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Removed: {entry.removedParams.join(', ')}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <URLSanitizerSEO />
      <RelatedTools
        currentTool="url-sanitizer"
        tools={["url-encoder-decoder", "password-generator", "hash-generator"]}
      />
    </>
  );
}
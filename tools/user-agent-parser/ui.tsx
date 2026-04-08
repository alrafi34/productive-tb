"use client";

import { useState, useEffect, useCallback } from "react";
import {
  parseUserAgent,
  getCurrentUserAgent,
  saveToHistory,
  getHistory,
  clearHistory,
  exportAsJSON,
  exportHistoryAsJSON,
  exampleUserAgents,
  ParsedUserAgent,
  UAHistory
} from "./logic";
import UserAgentParserSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function UserAgentParserUI() {
  const [currentUA, setCurrentUA] = useState<ParsedUserAgent | null>(null);
  const [manualUA, setManualUA] = useState("");
  const [manualParsed, setManualParsed] = useState<ParsedUserAgent | null>(null);
  const [history, setHistory] = useState<UAHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Auto-detect current user agent on load
  useEffect(() => {
    const ua = getCurrentUserAgent();
    const parsed = parseUserAgent(ua);
    setCurrentUA(parsed);
    saveToHistory(parsed);
    setHistory(getHistory());
  }, []);

  // Parse manual input
  const handleManualParse = useCallback((ua: string) => {
    if (ua.trim()) {
      const parsed = parseUserAgent(ua);
      setManualParsed(parsed);
      saveToHistory(parsed);
      setHistory(getHistory());
    } else {
      setManualParsed(null);
    }
  }, []);

  // Copy to clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Load example UA
  const loadExample = (ua: string) => {
    setManualUA(ua);
    handleManualParse(ua);
  };

  // Clear manual input
  const clearManual = () => {
    setManualUA("");
    setManualParsed(null);
  };

  const ResultCard = ({ title, parsed, isCurrentBrowser = false }: { 
    title: string; 
    parsed: ParsedUserAgent; 
    isCurrentBrowser?: boolean;
  }) => (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-6 ${isCurrentBrowser ? 'ring-2 ring-primary/20' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
          {title}
        </h2>
        {isCurrentBrowser && (
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            Current Browser
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Browser</div>
          <div className="text-lg font-bold text-gray-900">{parsed.browser} {parsed.version}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Operating System</div>
          <div className="text-lg font-bold text-gray-900">{parsed.os} {parsed.osVersion}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Device Type</div>
          <div className="text-lg font-bold text-gray-900">{parsed.device}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Rendering Engine</div>
          <div className="text-lg font-bold text-gray-900">{parsed.engine}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Full User-Agent String</div>
        <div className="p-3 bg-gray-50 rounded-lg font-mono text-xs text-gray-800 break-all">
          {parsed.fullUA}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => copyToClipboard(JSON.stringify(parsed, null, 2), `json-${title}`)}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
        >
          {copied === `json-${title}` ? "✓ Copied JSON" : "📋 Copy JSON"}
        </button>
        <button
          onClick={() => copyToClipboard(parsed.fullUA, `ua-${title}`)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
        >
          {copied === `ua-${title}` ? "✓ Copied UA" : "📄 Copy UA String"}
        </button>
        <button
          onClick={() => exportAsJSON(parsed)}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          💾 Export JSON
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌐</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">User Agent Parser</h3>
              <p className="text-sm text-blue-800">
                Automatically detects your current browser information and allows testing of custom User-Agent strings. 
                Perfect for QA testing and browser compatibility debugging.
              </p>
            </div>
          </div>
        </div>

        {/* Current Browser Detection */}
        {currentUA && (
          <ResultCard 
            title="Your Current Browser" 
            parsed={currentUA} 
            isCurrentBrowser={true}
          />
        )}

        {/* Manual Testing */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Test Custom User-Agent String
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paste User-Agent String
            </label>
            <textarea
              value={manualUA}
              onChange={(e) => {
                setManualUA(e.target.value);
                handleManualParse(e.target.value);
              }}
              className="w-full h-24 px-4 py-3 rounded-xl border-2 border-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-primary"
              placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
            />
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              onClick={clearManual}
              disabled={!manualUA}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
            >
              🗑️ Clear
            </button>
            <button
              onClick={() => {
                const ua = getCurrentUserAgent();
                setManualUA(ua);
                handleManualParse(ua);
              }}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
            >
              🔄 Load Current UA
            </button>
          </div>

          {/* Example User Agents */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Test Examples</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {exampleUserAgents.map((example, index) => (
                <button
                  key={index}
                  onClick={() => loadExample(example.ua)}
                  className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                >
                  <div className="font-semibold text-gray-800">{example.name}</div>
                  <div className="text-xs text-gray-500 truncate">{example.ua}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Parse Result */}
          {manualParsed && (
            <ResultCard title="Parsed Result" parsed={manualParsed} />
          )}
        </div>

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              Parsing History (Last 10)
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {showHistory ? "Hide" : "Show"}
              </button>
              {history.length > 0 && (
                <>
                  <button
                    onClick={() => exportHistoryAsJSON(history)}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    💾 Export
                  </button>
                  <button
                    onClick={() => {
                      clearHistory();
                      setHistory([]);
                    }}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>

          {showHistory && (
            <div className="space-y-3">
              {history.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No parsing history yet</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => {
                      setManualUA(item.userAgent);
                      setManualParsed(item.parsed);
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-semibold text-gray-800">
                        {item.parsed.browser} {item.parsed.version} on {item.parsed.os}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 font-mono truncate">
                      {item.userAgent}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {item.parsed.device}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        {item.parsed.engine}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">💡 Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Use this tool to test how your website detects different browsers and devices</li>
            <li>• QA testers can verify browser compatibility across different User-Agent strings</li>
            <li>• All parsing happens locally in your browser - no data is sent to servers</li>
            <li>• Click on history items to quickly reload and test previous User-Agent strings</li>
          </ul>
        </div>
      </div>

      <UserAgentParserSEOContent />
      <RelatedTools
        currentTool="user-agent-parser"
        tools={["json-formatter", "base64-encoder-decoder", "regex-tester"]}
      />
    </>
  );
}
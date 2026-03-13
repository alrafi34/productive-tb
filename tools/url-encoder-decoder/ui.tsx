"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  encodeURL,
  decodeURL,
  autoDetectAndProcess,
  isLikelyEncoded,
  parseURL,
  extractQueryParams,
  formatBytes,
  ENCODING_TABLE,
  type EncodingResult,
  type HistoryEntry,
  type QueryParam,
} from "./logic";
import URLEncoderSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Mode = 'encode' | 'decode' | 'auto';
type Method = 'encodeURI' | 'encodeURIComponent';

export default function URLEncoderDecoderUI() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('auto');
  const [method, setMethod] = useState<Method>('encodeURIComponent');
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showURLBreakdown, setShowURLBreakdown] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Load state from localStorage
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('urlEncoderState');
    const savedHistory = localStorage.getItem('urlEncoderHistory');
    if (saved) {
      const parsed = JSON.parse(saved);
      setDarkMode(parsed.darkMode || false);
      setMode(parsed.mode || 'auto');
      setMethod(parsed.method || 'encodeURIComponent');
    }
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('urlEncoderState', JSON.stringify({ darkMode, mode, method }));
  }, [darkMode, mode, method, isMounted]);

  // Process input with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      let result: EncodingResult;

      if (mode === 'auto') {
        result = autoDetectAndProcess(input, method);
      } else if (mode === 'encode') {
        result = encodeURL(input, method);
      } else {
        result = decodeURL(input);
      }

      setOutput(result.result);
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input, mode, method]);

  const handleEncode = () => {
    const result = encodeURL(input, method);
    if (result.success) {
      setOutput(result.result);
      addToHistory(input, result.result, 'encode', method);
    }
  };

  const handleDecode = () => {
    const result = decodeURL(input);
    if (result.success) {
      setOutput(result.result);
      addToHistory(input, result.result, 'decode', method);
    }
  };

  const handleSwap = () => {
    setInput(output);
    setOutput(input);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleLoadExample = () => {
    setInput('https://example.com/search?q=hello world&filter=active');
  };

  const addToHistory = (inp: string, out: string, m: 'encode' | 'decode', method: Method) => {
    const entry: HistoryEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      input: inp,
      output: out,
      mode: m,
      method,
    };
    const updated = [entry, ...history].slice(0, 50);
    setHistory(updated);
    localStorage.setItem('urlEncoderHistory', JSON.stringify(updated));
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(label);
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleEncode();
        }
        if (e.shiftKey && e.key === 'D') {
          e.preventDefault();
          handleDecode();
        }
        if (e.key === 'l' || e.key === 'L') {
          e.preventDefault();
          handleClear();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, output]);

  const queryParams = useMemo(() => {
    try {
      const components = parseURL(input);
      return components.query ? extractQueryParams(components.query) : [];
    } catch {
      return [];
    }
  }, [input]);

  const urlComponents = useMemo(() => parseURL(input), [input]);

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "var(--font-heading)" }}>
              🔗 URL Encoder / Decoder
            </h1>
            <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Encode and decode URLs with special characters instantly
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-xl transition-all ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Panel */}
          <div className={`lg:col-span-8 rounded-3xl border shadow-lg p-8 sm:p-12 space-y-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            
            {/* Mode & Method Selectors */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Mode
                </label>
                <select
                  value={mode}
                  onChange={e => setMode(e.target.value as Mode)}
                  className={`w-full px-4 py-3 rounded-lg border font-bold text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                >
                  <option value="auto">Auto Detect</option>
                  <option value="encode">Encode</option>
                  <option value="decode">Decode</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Method
                </label>
                <select
                  value={method}
                  onChange={e => setMethod(e.target.value as Method)}
                  className={`w-full px-4 py-3 rounded-lg border font-bold text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                >
                  <option value="encodeURIComponent">encodeURIComponent</option>
                  <option value="encodeURI">encodeURI</option>
                </select>
              </div>
            </div>

            {/* Input Textarea */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Input
              </label>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Paste a URL or text to encode or decode..."
                className={`w-full h-40 px-4 py-3 rounded-lg border font-mono text-sm resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
              />
              <div className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {input.length} characters ({formatBytes(new Blob([input]).size)})
              </div>
            </div>

            {/* Output Textarea */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Output
              </label>
              <textarea
                value={output}
                readOnly
                className={`w-full h-40 px-4 py-3 rounded-lg border font-mono text-sm resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
              />
              <div className={`text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {output.length} characters ({formatBytes(new Blob([output]).size)})
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                onClick={handleEncode}
                className="px-4 py-3 rounded-lg font-bold text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all active:scale-95"
              >
                🔒 Encode
              </button>
              <button
                onClick={handleDecode}
                className="px-4 py-3 rounded-lg font-bold text-sm bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg transition-all active:scale-95"
              >
                🔓 Decode
              </button>
              <button
                onClick={handleSwap}
                className={`px-4 py-3 rounded-lg font-bold text-sm transition-all active:scale-95 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                ⇄ Swap
              </button>
              <button
                onClick={handleClear}
                className={`px-4 py-3 rounded-lg font-bold text-sm transition-all active:scale-95 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                🗑️ Clear
              </button>
              <button
                onClick={handleLoadExample}
                className={`px-4 py-3 rounded-lg font-bold text-sm transition-all active:scale-95 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                📋 Example
              </button>
              <button
                onClick={() => copyToClipboard(output, 'Output')}
                className={`px-4 py-3 rounded-lg font-bold text-sm transition-all active:scale-95 ${copyFeedback === 'Output' ? 'bg-green-500 text-white' : darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {copyFeedback === 'Output' ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>

            {/* Keyboard Shortcuts Info */}
            <div className={`p-4 rounded-lg text-xs font-bold uppercase tracking-widest ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
              <span className="block mb-2">⌨️ Shortcuts:</span>
              <span className={`text-gray-400`}>Ctrl+Enter = Encode • Ctrl+Shift+D = Decode • Ctrl+L = Clear</span>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Character Counter */}
            <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                📊 Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Input Length</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{input.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Output Length</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{output.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Difference</span>
                  <span className={`font-bold ${output.length > input.length ? 'text-orange-500' : 'text-green-500'}`}>
                    {output.length > input.length ? '+' : ''}{output.length - input.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Encoded</span>
                  <span className={`font-bold text-xs px-2 py-1 rounded ${isLikelyEncoded(input) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {isLikelyEncoded(input) ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Query Parameters */}
            {queryParams.length > 0 && (
              <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  🔍 Query Parameters
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {queryParams.map((param, idx) => (
                    <div key={idx} className={`p-2 rounded text-xs font-mono ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{param.key}</div>
                      <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{param.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Encoding Table Toggle */}
            <button
              onClick={() => setShowTable(!showTable)}
              className={`w-full px-4 py-3 rounded-lg font-bold text-sm transition-all ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {showTable ? '▼' : '▶'} Character Encoding Table
            </button>

            {showTable && (
              <div className={`rounded-2xl border p-4 max-h-96 overflow-y-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="space-y-2">
                  {ENCODING_TABLE.map((item, idx) => (
                    <div key={idx} className={`p-2 rounded text-xs font-mono flex justify-between ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item.char}</span>
                      <span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{item.encoded}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* URL Breakdown Toggle */}
            {input && (
              <>
                <button
                  onClick={() => setShowURLBreakdown(!showURLBreakdown)}
                  className={`w-full px-4 py-3 rounded-lg font-bold text-sm transition-all ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {showURLBreakdown ? '▼' : '▶'} URL Breakdown
                </button>

                {showURLBreakdown && (
                  <div className={`rounded-2xl border p-4 space-y-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    {urlComponents.protocol && (
                      <div className={`p-2 rounded text-xs ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className={`font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Protocol</div>
                        <div className={`font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>{urlComponents.protocol}</div>
                      </div>
                    )}
                    {urlComponents.domain && (
                      <div className={`p-2 rounded text-xs ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className={`font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Domain</div>
                        <div className={`font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>{urlComponents.domain}</div>
                      </div>
                    )}
                    {urlComponents.path && (
                      <div className={`p-2 rounded text-xs ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className={`font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Path</div>
                        <div className={`font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>{urlComponents.path}</div>
                      </div>
                    )}
                    {urlComponents.query && (
                      <div className={`p-2 rounded text-xs ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className={`font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Query</div>
                        <div className={`font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>{urlComponents.query}</div>
                      </div>
                    )}
                    {urlComponents.fragment && (
                      <div className={`p-2 rounded text-xs ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className={`font-bold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fragment</div>
                        <div className={`font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>{urlComponents.fragment}</div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* History Toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`w-full px-4 py-3 rounded-lg font-bold text-sm transition-all ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {showHistory ? '▼' : '▶'} History ({history.length})
            </button>

            {showHistory && (
              <div className={`rounded-2xl border p-4 max-h-96 overflow-y-auto space-y-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                {history.length === 0 ? (
                  <p className={`text-xs text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>No history yet</p>
                ) : (
                  history.map(entry => (
                    <div
                      key={entry.id}
                      onClick={() => setInput(entry.input)}
                      className={`p-3 rounded cursor-pointer transition-all text-xs ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                    >
                      <div className={`font-bold mb-1 ${entry.mode === 'encode' ? 'text-blue-500' : 'text-green-500'}`}>
                        {entry.mode === 'encode' ? '🔒' : '🔓'} {entry.mode}
                      </div>
                      <div className={`font-mono truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{entry.input}</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{entry.timestamp}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <URLEncoderSEO />
        <RelatedTools
          currentTool="url-encoder-decoder"
          tools={['base64-encoder-decoder', 'json-validator', 'regex-tester']}
        />
      </div>
    </div>
  );
}

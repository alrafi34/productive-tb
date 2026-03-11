"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  transformText,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportAsText,
  exportAsJSON,
  getModeDescription,
  getModeLabel
} from "./logic";
import { EncryptionMode, TransformationHistory } from "./types";
import TextEncryptDecryptSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function TextEncryptDecryptUI() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<EncryptionMode>('rot13');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<TransformationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  
  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);
  
  // Transform text with debouncing for large inputs
  const performTransform = useCallback((text: string, currentMode: EncryptionMode) => {
    const result = transformText(text, currentMode);
    setOutputText(result);
    
    // Save to history if both input and output are non-empty
    if (text && result && !result.startsWith('Error:')) {
      const historyItem: TransformationHistory = {
        id: crypto.randomUUID(),
        mode: currentMode,
        input: text.slice(0, 100), // Store first 100 chars
        output: result.slice(0, 100),
        timestamp: Date.now()
      };
      saveToHistory(historyItem);
      setHistory(getHistory());
    }
  }, []);
  
  // Debounced transform for large text
  const debouncedTransform = useCallback(
    debounce((text: string, currentMode: EncryptionMode) => {
      performTransform(text, currentMode);
    }, 300),
    []
  );
  
  // Handle input change
  const handleInputChange = (text: string) => {
    setInputText(text);
    
    // Use debouncing for large text (> 1000 chars)
    if (text.length > 1000) {
      debouncedTransform(text, mode);
    } else {
      performTransform(text, mode);
    }
  };
  
  // Handle mode change
  const handleModeChange = (newMode: EncryptionMode) => {
    setMode(newMode);
    if (inputText) {
      performTransform(inputText, newMode);
    }
  };
  
  // Copy to clipboard
  const copyToClipboard = () => {
    if (outputRef.current) {
      outputRef.current.select();
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  // Swap input and output
  const swapTexts = () => {
    setInputText(outputText);
    handleInputChange(outputText);
  };
  
  // Clear all
  const clearAll = () => {
    setInputText('');
    setOutputText('');
  };
  
  // Load from history
  const loadFromHistory = (item: TransformationHistory) => {
    setMode(item.mode);
    setInputText(item.input);
    performTransform(item.input, item.mode);
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter: Transform
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (inputText) {
          performTransform(inputText, mode);
        }
      }
      
      // Ctrl/Cmd + C: Copy output (when output is focused)
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement === outputRef.current) {
        copyToClipboard();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputText, mode, performTransform]);
  
  const basicModes: EncryptionMode[] = ['rot13', 'base64-encode', 'base64-decode'];
  const advancedModes: EncryptionMode[] = ['base64-url', 'base32', 'binary'];
  
  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Info Banner */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔐</span>
            <div>
              <h3 className="font-semibold text-purple-900 mb-1">Text Encrypt & Decrypt Tool</h3>
              <p className="text-sm text-purple-800">
                Transform text using ROT13, Base64, and more. All processing happens locally in your browser. 
                Perfect for simple text obfuscation and encoding.
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Encryption Mode
          </h2>
          
          {/* Basic Modes */}
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            {basicModes.map((m) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  mode === m
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-800 mb-1">{getModeLabel(m)}</div>
                <div className="text-xs text-gray-500">{getModeDescription(m)}</div>
              </button>
            ))}
          </div>
          
          {/* Advanced Modes Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-primary hover:text-primary-hover font-semibold mb-3"
          >
            {showAdvanced ? '▼' : '▶'} Advanced Modes
          </button>
          
          {showAdvanced && (
            <div className="grid sm:grid-cols-3 gap-3">
              {advancedModes.map((m) => (
                <button
                  key={m}
                  onClick={() => handleModeChange(m)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    mode === m
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-800 mb-1">{getModeLabel(m)}</div>
                  <div className="text-xs text-gray-500">{getModeDescription(m)}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dual Panel */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Input Panel */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Input Text
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={clearAll}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  title="Clear all"
                >
                  🗑️ Clear
                </button>
              </div>
            </div>
            
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full h-96 px-4 py-3 rounded-xl border-2 border-gray-200 font-mono text-sm resize-none focus:outline-none focus:border-primary"
              placeholder="Enter text to encrypt or decrypt..."
            />
            
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>{inputText.length.toLocaleString()} characters</span>
              <span>Ctrl+Enter to transform</span>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Output Text
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={swapTexts}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  title="Swap input and output"
                >
                  🔄 Swap
                </button>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? '✓ Copied' : '📋 Copy'}
                </button>
              </div>
            </div>
            
            <textarea
              ref={outputRef}
              value={outputText}
              readOnly
              className="w-full h-96 px-4 py-3 rounded-xl border-2 border-gray-200 font-mono text-sm resize-none bg-gray-50 focus:outline-none focus:border-primary"
              placeholder="Transformed text will appear here..."
            />
            
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>{outputText.length.toLocaleString()} characters</span>
              {outputText.startsWith('Error:') && (
                <span className="text-red-500 font-semibold">⚠️ Transformation error</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Export Options
          </h2>
          
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => exportAsText(outputText, `${mode}-output`)}
              disabled={!outputText}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📄 Export as TXT
            </button>
            
            <button
              onClick={() => exportAsJSON(history, 'encryption-history')}
              disabled={history.length === 0}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📋 Export History as JSON
            </button>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              Transformation History (Last 10)
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {showHistory ? 'Hide' : 'Show'}
              </button>
              {history.length > 0 && (
                <button
                  onClick={() => {
                    clearHistory();
                    setHistory([]);
                  }}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          
          {showHistory && (
            <div className="space-y-3">
              {history.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No transformation history yet</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => loadFromHistory(item)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-primary">
                        {getModeLabel(item.mode)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-gray-500 mb-1">Input:</div>
                        <code className="text-gray-800 break-all">
                          {item.input.length > 50 ? item.input.slice(0, 50) + '...' : item.input}
                        </code>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Output:</div>
                        <code className="text-gray-800 break-all">
                          {item.output.length > 50 ? item.output.slice(0, 50) + '...' : item.output}
                        </code>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Keyboard Shortcuts</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-600">
            <div><kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl+Enter</kbd> Transform text</div>
            <div><kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl+C</kbd> Copy output (when focused)</div>
          </div>
        </div>
      </div>

      <TextEncryptDecryptSEOContent />
      <RelatedTools
        currentTool="text-encrypt-decrypt"
        tools={["password-generator", "hash-generator", "base64-image-encoder"]}
      />
    </>
  );
}

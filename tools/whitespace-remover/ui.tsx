"use client";

import React, { useState, useRef, useEffect } from 'react';
import { CleaningOptions, CleaningResult, HistoryState } from './types';
import { cleanWhitespace, highlightExtraSpaces, copyToClipboard, downloadAsFile, readFileAsText, saveToLocalStorage, loadFromLocalStorage } from './logic';
import { whitespaceRemoverConfig } from './config';
import SEOContent from './seo-content';

export default function WhitespaceRemoverUI() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [result, setResult] = useState<CleaningResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  
  const [options, setOptions] = useState<CleaningOptions>({
    removeLeading: true,
    removeTrailing: true,
    removeMultiple: true,
    removeEmptyLines: false,
    removeAllSpaces: false,
    tabsToSpaces: false,
    spacesToTabs: false,
    tabSize: 4,
    autoCleanOnPaste: false
  });

  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved options
  useEffect(() => {
    const savedOptions = loadFromLocalStorage('whitespace-options');
    if (savedOptions) setOptions(savedOptions);
  }, []);

  // Save options
  useEffect(() => {
    saveToLocalStorage('whitespace-options', options);
  }, [options]);

  // Auto-clean on paste
  useEffect(() => {
    if (options.autoCleanOnPaste && inputText) {
      handleClean();
    }
  }, [inputText]);

  const handleClean = () => {
    if (!inputText) {
      setOutputText('');
      setResult(null);
      return;
    }

    const cleanResult = cleanWhitespace(inputText, options);
    setOutputText(cleanResult.cleanedText);
    setResult(cleanResult);

    // Add to history
    const newState: HistoryState = {
      input: inputText,
      output: cleanResult.cleanedText,
      options: { ...options },
      result: cleanResult
    };
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newState]);
    setHistoryIndex(prev => prev + 1);

    // Auto-save cleaned text
    saveToLocalStorage('whitespace-last-cleaned', cleanResult.cleanedText);
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(outputText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = (extension: 'txt' | 'md' | 'csv') => {
    if (!outputText) return;
    downloadAsFile(outputText, `cleaned-text-${Date.now()}`, extension);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setResult(null);
    setHistory([]);
    setHistoryIndex(-1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setInputText(prevState.input);
      setOutputText(prevState.output);
      setResult(prevState.result);
      setOptions(prevState.options);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setInputText(nextState.input);
      setOutputText(nextState.output);
      setResult(nextState.result);
      setOptions(nextState.options);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await readFileAsText(file);
      setInputText(text);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'text/plain' || file.name.match(/\.(txt|md|csv)$/))) {
      const text = await readFileAsText(file);
      setInputText(text);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (err) {
      console.error('Failed to read clipboard');
    }
  };

  const applyOutput = () => {
    if (outputText) {
      setInputText(outputText);
      setOutputText('');
      setResult(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        {/* Settings Panel */}
        <div className="mb-6 space-y-4">
          <h3 className="font-semibold text-gray-900 mb-4">Cleaning Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeLeading}
                onChange={(e) => setOptions({ ...options, removeLeading: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Remove Leading Spaces</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeTrailing}
                onChange={(e) => setOptions({ ...options, removeTrailing: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Remove Trailing Spaces</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeMultiple}
                onChange={(e) => setOptions({ ...options, removeMultiple: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Remove Multiple Spaces</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeEmptyLines}
                onChange={(e) => setOptions({ ...options, removeEmptyLines: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Remove Empty Lines</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeAllSpaces}
                onChange={(e) => setOptions({ ...options, removeAllSpaces: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Remove All Spaces</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.autoCleanOnPaste}
                onChange={(e) => setOptions({ ...options, autoCleanOnPaste: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Auto Clean on Paste</span>
            </label>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Tab Conversion</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.tabsToSpaces}
                  onChange={(e) => setOptions({ ...options, tabsToSpaces: e.target.checked, spacesToTabs: false })}
                  className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
                />
                <span className="text-sm text-gray-700">Tabs to Spaces</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.spacesToTabs}
                  onChange={(e) => setOptions({ ...options, spacesToTabs: e.target.checked, tabsToSpaces: false })}
                  className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
                />
                <span className="text-sm text-gray-700">Spaces to Tabs</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tab Size: {options.tabSize}
                </label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={options.tabSize}
                  onChange={(e) => setOptions({ ...options, tabSize: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#058554]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleClean}
              disabled={!inputText}
              className="px-6 py-2.5 bg-[#058554] text-white font-medium rounded-lg hover:bg-[#047045] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              🧽 Clean Whitespace
            </button>

            <button
              onClick={handleCopy}
              disabled={!outputText}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>

            <button
              onClick={() => handleDownload('txt')}
              disabled={!outputText}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              💾 Download TXT
            </button>

            <button
              onClick={() => handleDownload('md')}
              disabled={!outputText}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              💾 Download MD
            </button>

            <button
              onClick={() => handleDownload('csv')}
              disabled={!outputText}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              💾 Download CSV
            </button>

            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              ↶ Undo
            </button>

            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              ↷ Redo
            </button>

            <button
              onClick={handleClear}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              🗑️ Clear
            </button>

            <button
              onClick={() => setShowHighlight(!showHighlight)}
              disabled={!inputText}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              {showHighlight ? '👁️ Hide Highlight' : '🔍 Highlight Spaces'}
            </button>
          </div>

          {result && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-blue-600 font-medium text-sm">Spaces Removed</div>
                <div className="text-2xl font-bold text-blue-900">{result.spacesRemoved}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-green-600 font-medium text-sm">Lines Processed</div>
                <div className="text-2xl font-bold text-green-900">{result.linesProcessed}</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-red-600 font-medium text-sm">Empty Lines Removed</div>
                <div className="text-2xl font-bold text-red-900">{result.emptyLinesRemoved}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-purple-600 font-medium text-sm">Tabs Converted</div>
                <div className="text-2xl font-bold text-purple-900">{result.tabsConverted}</div>
              </div>
            </div>
          )}
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Input Text</h3>
              <div className="flex gap-2">
                <button
                  onClick={handlePaste}
                  className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  📋 Paste
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  📁 Upload
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
            
            {showHighlight && inputText ? (
              <div
                className="w-full h-96 p-4 border border-gray-300 rounded-xl overflow-auto bg-gray-50 font-mono text-sm whitespace-pre-wrap"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#cbd5e0 #f7fafc'
                }}
                dangerouslySetInnerHTML={{ __html: highlightExtraSpaces(inputText) }}
              />
            ) : (
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                placeholder="Paste or type your text here... (or drag & drop a file)"
                className="w-full h-96 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#cbd5e0 #f7fafc'
                }}
              />
            )}
            <div className="text-sm text-gray-600">
              Characters: {inputText.length} | Lines: {inputText.split('\n').length}
            </div>
          </div>

          {/* Output */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Cleaned Text</h3>
              {outputText && (
                <button
                  onClick={applyOutput}
                  className="text-sm px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors"
                >
                  ✓ Apply to Input
                </button>
              )}
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="Cleaned text will appear here..."
              className="w-full h-96 p-4 border border-gray-300 rounded-xl bg-gray-50 resize-none font-mono text-sm"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e0 #f7fafc'
              }}
            />
            {outputText && (
              <div className="text-sm text-gray-600">
                Characters: {outputText.length} | Lines: {outputText.split('\n').length}
              </div>
            )}
          </div>
        </div>
      </div>

      <SEOContent />
    </div>
  );
}

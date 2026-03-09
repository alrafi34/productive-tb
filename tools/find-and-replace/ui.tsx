"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FindReplaceOptions, FindReplaceResult, HistoryState, BatchReplaceItem } from './types';
import { findMatches, replaceText, batchReplace, copyToClipboard, downloadAsFile, readFileAsText, saveToLocalStorage, loadFromLocalStorage } from './logic';
import { findAndReplaceConfig } from './config';
import SEOContent from './seo-content';

export default function FindAndReplaceUI() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceWithText, setReplaceWithText] = useState('');
  const [result, setResult] = useState<FindReplaceResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState(true);
  const [showBatch, setShowBatch] = useState(false);
  
  const [options, setOptions] = useState<FindReplaceOptions>({
    matchCase: false,
    wholeWords: false,
    useRegex: false
  });

  const [batchItems, setBatchItems] = useState<BatchReplaceItem[]>([
    { id: '1', find: '', replace: '', enabled: true }
  ]);

  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save to localStorage
  useEffect(() => {
    saveToLocalStorage('find-replace-input', inputText);
  }, [inputText]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromLocalStorage('find-replace-input');
    if (saved) setInputText(saved);
  }, []);

  // Find matches in real-time
  useEffect(() => {
    if (findText && inputText) {
      const matches = findMatches(inputText, findText, options);
      setResult({
        text: inputText,
        matchesFound: matches.length,
        replacementsMade: 0,
        matches
      });
    } else {
      setResult(null);
    }
  }, [findText, inputText, options]);

  const handleReplace = (replaceAll: boolean = false) => {
    if (!findText || !inputText) return;

    const replaceResult = replaceText(inputText, findText, replaceWithText, options, replaceAll);
    
    if (previewMode) {
      setOutputText(replaceResult.text);
    } else {
      setInputText(replaceResult.text);
      setOutputText('');
    }
    
    setResult(replaceResult);

    // Add to history
    const newState: HistoryState = {
      text: inputText,
      findText,
      replaceText: replaceWithText,
      options: { ...options },
      result: replaceResult
    };
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newState]);
    setHistoryIndex(prev => prev + 1);
  };

  const handleBatchReplace = () => {
    if (!inputText) return;

    const replaceResult = batchReplace(inputText, batchItems, options);
    
    if (previewMode) {
      setOutputText(replaceResult.text);
    } else {
      setInputText(replaceResult.text);
      setOutputText('');
    }
    
    setResult(replaceResult);
  };

  const handleCopy = async () => {
    const textToCopy = previewMode ? outputText : inputText;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const textToDownload = previewMode && outputText ? outputText : inputText;
    const filename = `find-replace-${Date.now()}.txt`;
    downloadAsFile(textToDownload, filename);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setFindText('');
    setReplaceWithText('');
    setResult(null);
    setHistory([]);
    setHistoryIndex(-1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setInputText(prevState.text);
      setFindText(prevState.findText);
      setReplaceWithText(prevState.replaceText);
      setOptions(prevState.options);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setInputText(nextState.text);
      setFindText(nextState.findText);
      setReplaceWithText(nextState.replaceText);
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

  const addBatchItem = () => {
    setBatchItems([...batchItems, { id: Date.now().toString(), find: '', replace: '', enabled: true }]);
  };

  const removeBatchItem = (id: string) => {
    setBatchItems(batchItems.filter(item => item.id !== id));
  };

  const updateBatchItem = (id: string, field: 'find' | 'replace' | 'enabled', value: string | boolean) => {
    setBatchItems(batchItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const applyOutput = () => {
    if (outputText) {
      setInputText(outputText);
      setOutputText('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        {/* Find & Replace Panel */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Find & Replace</h3>
            <button
              onClick={() => setShowBatch(!showBatch)}
              className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {showBatch ? '📝 Single' : '📋 Batch'}
            </button>
          </div>

          {!showBatch ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Find</label>
                <input
                  type="text"
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  placeholder="Enter text to find..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Replace with</label>
                <input
                  type="text"
                  value={replaceWithText}
                  onChange={(e) => setReplaceWithText(e.target.value)}
                  placeholder="Enter replacement text..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {batchItems.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={(e) => updateBatchItem(item.id, 'enabled', e.target.checked)}
                    className="w-4 h-4 text-[#058554] rounded"
                  />
                  <input
                    type="text"
                    value={item.find}
                    onChange={(e) => updateBatchItem(item.id, 'find', e.target.value)}
                    placeholder="Find..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-sm"
                  />
                  <span className="text-gray-400">→</span>
                  <input
                    type="text"
                    value={item.replace}
                    onChange={(e) => updateBatchItem(item.id, 'replace', e.target.value)}
                    placeholder="Replace..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-sm"
                  />
                  {batchItems.length > 1 && (
                    <button
                      onClick={() => removeBatchItem(item.id)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addBatchItem}
                className="text-sm text-[#058554] hover:text-[#047045] font-medium"
              >
                + Add Another
              </button>
            </div>
          )}

          {/* Options */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.matchCase}
                onChange={(e) => setOptions({ ...options, matchCase: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Match Case</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.wholeWords}
                onChange={(e) => setOptions({ ...options, wholeWords: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Whole Words Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.useRegex}
                onChange={(e) => setOptions({ ...options, useRegex: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Use Regex</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={previewMode}
                onChange={(e) => setPreviewMode(e.target.checked)}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Preview Mode</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {!showBatch ? (
              <>
                <button
                  onClick={() => handleReplace(false)}
                  disabled={!findText || !inputText}
                  className="px-4 py-2 bg-[#058554] text-white font-medium rounded-lg hover:bg-[#047045] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Replace First
                </button>
                <button
                  onClick={() => handleReplace(true)}
                  disabled={!findText || !inputText}
                  className="px-4 py-2 bg-[#058554] text-white font-medium rounded-lg hover:bg-[#047045] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Replace All
                </button>
              </>
            ) : (
              <button
                onClick={handleBatchReplace}
                disabled={!inputText}
                className="px-4 py-2 bg-[#058554] text-white font-medium rounded-lg hover:bg-[#047045] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Batch Replace
              </button>
            )}

            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
            >
              ↶ Undo
            </button>

            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
            >
              ↷ Redo
            </button>
          </div>

          {/* Statistics */}
          {result && (
            <div className="flex gap-4 text-sm bg-blue-50 p-3 rounded-lg">
              <div>
                <span className="text-blue-600 font-medium">Matches Found:</span>
                <span className="ml-2 text-blue-900 font-bold">{result.matchesFound}</span>
              </div>
              <div>
                <span className="text-green-600 font-medium">Replacements Made:</span>
                <span className="ml-2 text-green-900 font-bold">{result.replacementsMade}</span>
              </div>
            </div>
          )}
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
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
            <div className="text-sm text-gray-600">
              Characters: {inputText.length} | Lines: {inputText.split('\n').length}
            </div>
          </div>

          {/* Output Section */}
          {previewMode && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Preview / Output</h3>
                <div className="flex gap-2">
                  {outputText && (
                    <button
                      onClick={applyOutput}
                      className="text-sm px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors"
                    >
                      ✓ Apply
                    </button>
                  )}
                  <button
                    onClick={handleCopy}
                    disabled={!outputText && !inputText}
                    className="text-sm px-3 py-1 bg-[#058554] text-white hover:bg-[#047045] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    {copied ? '✓ Copied' : '📋 Copy'}
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!outputText && !inputText}
                    className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    💾 Download
                  </button>
                </div>
              </div>
              <textarea
                value={outputText}
                readOnly
                placeholder="Replaced text will appear here..."
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
          )}
        </div>

        {/* Clear Button */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleClear}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            🗑️ Clear All
          </button>
        </div>
      </div>

      <SEOContent />
    </div>
  );
}

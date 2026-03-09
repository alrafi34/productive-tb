"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ProcessingOptions, ProcessingResult, HistoryState, TextTransform } from './types';
import { removeDuplicateLines, applyTextTransform, copyToClipboard, downloadAsFile, readFileAsText } from './logic';
import { removeDuplicateLinesConfig } from './config';
import SEOContent from './seo-content';

export default function RemoveDuplicateLinesUI() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [autoProcess, setAutoProcess] = useState(false);
  const [autoCopy, setAutoCopy] = useState(false);
  const [textTransform, setTextTransform] = useState<TextTransform>('none');
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const [options, setOptions] = useState<ProcessingOptions>({
    ignoreCase: false,
    trimWhitespace: true,
    removeEmpty: true,
    sortOrder: 'none',
    keepOnlyDuplicates: false
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoProcess && inputText) {
      processText();
    }
  }, [inputText, options, autoProcess]);

  const processText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      setResult(null);
      return;
    }

    let processedInput = inputText;
    if (textTransform !== 'none') {
      processedInput = applyTextTransform(processedInput, textTransform);
    }

    const processResult = removeDuplicateLines(processedInput, options);
    const output = processResult.cleanedLines.join('\n');
    
    setOutputText(output);
    setResult(processResult);

    // Add to history
    const newState: HistoryState = {
      input: inputText,
      output,
      options: { ...options }
    };
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newState]);
    setHistoryIndex(prev => prev + 1);

    if (autoCopy && output) {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(outputText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const filename = `cleaned-text-${Date.now()}.txt`;
    downloadAsFile(outputText, filename);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setResult(null);
    setHistory([]);
    setHistoryIndex(-1);
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
    if (file && (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.csv'))) {
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

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setInputText(prevState.input);
      setOutputText(prevState.output);
      setOptions(prevState.options);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setInputText(nextState.input);
      setOutputText(nextState.output);
      setOptions(nextState.options);
      setHistoryIndex(historyIndex + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
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
                  accept=".txt,.csv"
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
              placeholder="Paste or type your text here... (or drag & drop a .txt/.csv file)"
              className="w-full h-96 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e0 #f7fafc'
              }}
            />
            <div className="text-sm text-gray-600">
              Lines: {inputText.split('\n').length}
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Output Text</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!outputText}
                  className="text-sm px-3 py-1 bg-[#058554] text-white hover:bg-[#047045] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  {copied ? '✓ Copied' : '📋 Copy'}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!outputText}
                  className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  💾 Download
                </button>
              </div>
            </div>
            <textarea
              ref={outputRef}
              value={outputText}
              readOnly
              placeholder="Cleaned text will appear here..."
              className="w-full h-96 p-4 border border-gray-300 rounded-xl bg-gray-50 resize-none font-mono text-sm"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e0 #f7fafc'
              }}
            />
            {result && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-blue-600 font-medium">Total Lines</div>
                  <div className="text-2xl font-bold text-blue-900">{result.totalLines}</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="text-red-600 font-medium">Duplicates Removed</div>
                  <div className="text-2xl font-bold text-red-900">{result.duplicatesRemoved}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-green-600 font-medium">Remaining Lines</div>
                  <div className="text-2xl font-bold text-green-900">{result.remainingLines}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-gray-600 font-medium">Empty Removed</div>
                  <div className="text-2xl font-bold text-gray-900">{result.emptyLinesRemoved}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Processing Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.ignoreCase}
                onChange={(e) => setOptions({ ...options, ignoreCase: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Ignore Case</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.trimWhitespace}
                onChange={(e) => setOptions({ ...options, trimWhitespace: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Trim Whitespace</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeEmpty}
                onChange={(e) => setOptions({ ...options, removeEmpty: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Remove Empty Lines</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.keepOnlyDuplicates}
                onChange={(e) => setOptions({ ...options, keepOnlyDuplicates: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Keep Only Duplicates</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoProcess}
                onChange={(e) => setAutoProcess(e.target.checked)}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Auto Process</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoCopy}
                onChange={(e) => setAutoCopy(e.target.checked)}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Auto Copy Result</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
              <select
                value={options.sortOrder}
                onChange={(e) => setOptions({ ...options, sortOrder: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
              >
                <option value="none">No Sorting</option>
                <option value="asc">Sort A-Z</option>
                <option value="desc">Sort Z-A</option>
                <option value="random">Randomize</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Transform</label>
              <select
                value={textTransform}
                onChange={(e) => setTextTransform(e.target.value as TextTransform)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
              >
                <option value="none">None</option>
                <option value="uppercase">UPPERCASE</option>
                <option value="lowercase">lowercase</option>
                <option value="capitalize">Capitalize</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={processText}
            disabled={!inputText.trim()}
            className="px-6 py-2.5 bg-[#058554] text-white font-medium rounded-lg hover:bg-[#047045] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            🧹 Remove Duplicates
          </button>

          <button
            onClick={handleClear}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            🗑️ Clear All
          </button>

          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            ↶ Undo
          </button>

          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            ↷ Redo
          </button>
        </div>
      </div>

      <SEOContent />
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { BionicOptions, DisplayOptions, ConversionResult, HistoryState } from './types';
import { convertToBionicReading, copyToClipboard, downloadAsFile, readFileAsText, exportAsHtml, saveToLocalStorage, loadFromLocalStorage } from './logic';
import { bionicReadingConverterConfig } from './config';
import SEOContent from './seo-content';

export default function BionicReadingConverterUI() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [copied, setCopied] = useState<'html' | 'plain' | 'markdown' | null>(null);
  
  const [bionicOptions, setBionicOptions] = useState<BionicOptions>({
    boldPercentage: 50,
    ignoreSmallWords: true,
    smallWordLength: 3,
    autoCopyOnConvert: false,
    autoConvertOnPaste: false
  });

  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({
    fontSize: 16,
    lineHeight: 1.6,
    letterSpacing: 0,
    fontFamily: 'sans-serif'
  });

  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved options
  useEffect(() => {
    const savedBionicOptions = loadFromLocalStorage('bionic-options');
    const savedDisplayOptions = loadFromLocalStorage('display-options');
    if (savedBionicOptions) setBionicOptions(savedBionicOptions);
    if (savedDisplayOptions) setDisplayOptions(savedDisplayOptions);
  }, []);

  // Save options
  useEffect(() => {
    saveToLocalStorage('bionic-options', bionicOptions);
  }, [bionicOptions]);

  useEffect(() => {
    saveToLocalStorage('display-options', displayOptions);
  }, [displayOptions]);

  // Auto-convert on paste
  useEffect(() => {
    if (bionicOptions.autoConvertOnPaste && inputText) {
      handleConvert();
    }
  }, [inputText]);

  const handleConvert = () => {
    if (!inputText.trim()) {
      setResult(null);
      return;
    }

    const conversionResult = convertToBionicReading(inputText, bionicOptions);
    setResult(conversionResult);

    // Add to history
    const newState: HistoryState = {
      input: inputText,
      output: conversionResult,
      options: { ...bionicOptions }
    };
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newState]);
    setHistoryIndex(prev => prev + 1);

    // Auto-copy if enabled
    if (bionicOptions.autoCopyOnConvert) {
      handleCopy('html');
    }
  };

  const handleCopy = async (format: 'html' | 'plain' | 'markdown') => {
    if (!result) return;

    let content = '';
    let isHtml = false;

    switch (format) {
      case 'html':
        content = result.html;
        isHtml = true;
        break;
      case 'plain':
        content = result.plainText;
        break;
      case 'markdown':
        content = result.markdown;
        break;
    }

    const success = await copyToClipboard(content, isHtml);
    if (success) {
      setCopied(format);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleDownload = (format: 'html' | 'txt' | 'md') => {
    if (!result) return;

    if (format === 'html') {
      const html = exportAsHtml(
        result.html,
        displayOptions.fontSize,
        displayOptions.lineHeight,
        displayOptions.letterSpacing,
        displayOptions.fontFamily
      );
      downloadAsFile(html, `bionic-reading-${Date.now()}.html`, 'text/html');
    } else if (format === 'txt') {
      downloadAsFile(result.plainText, `bionic-reading-${Date.now()}.txt`, 'text/plain');
    } else {
      downloadAsFile(result.markdown, `bionic-reading-${Date.now()}.md`, 'text/markdown');
    }
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setHistory([]);
    setHistoryIndex(-1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setInputText(prevState.input);
      setResult(prevState.output);
      setBionicOptions(prevState.options);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setInputText(nextState.input);
      setResult(nextState.output);
      setBionicOptions(nextState.options);
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
    if (file && (file.type === 'text/plain' || file.name.match(/\.(txt|md)$/))) {
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

  const previewStyle: React.CSSProperties = {
    fontSize: `${displayOptions.fontSize}px`,
    lineHeight: displayOptions.lineHeight,
    letterSpacing: `${displayOptions.letterSpacing}px`,
    fontFamily: displayOptions.fontFamily,
    backgroundColor: '#ffffff',
    color: '#1a1a1a'
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        {/* Settings Panel */}
        <div className="mb-6 space-y-4">
          <h3 className="font-semibold text-gray-900 mb-4">Bionic Reading Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bold Percentage: {bionicOptions.boldPercentage}%
              </label>
              <input
                type="range"
                min="20"
                max="80"
                value={bionicOptions.boldPercentage}
                onChange={(e) => setBionicOptions({ ...bionicOptions, boldPercentage: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#058554]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Small Word Length: {bionicOptions.smallWordLength}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={bionicOptions.smallWordLength}
                onChange={(e) => setBionicOptions({ ...bionicOptions, smallWordLength: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#058554]"
                disabled={!bionicOptions.ignoreSmallWords}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bionicOptions.ignoreSmallWords}
                  onChange={(e) => setBionicOptions({ ...bionicOptions, ignoreSmallWords: e.target.checked })}
                  className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
                />
                <span className="text-sm text-gray-700">Ignore Small Words</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bionicOptions.autoConvertOnPaste}
                  onChange={(e) => setBionicOptions({ ...bionicOptions, autoConvertOnPaste: e.target.checked })}
                  className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
                />
                <span className="text-sm text-gray-700">Auto Convert on Paste</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bionicOptions.autoCopyOnConvert}
                  onChange={(e) => setBionicOptions({ ...bionicOptions, autoCopyOnConvert: e.target.checked })}
                  className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
                />
                <span className="text-sm text-gray-700">Auto Copy on Convert</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Display Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size: {displayOptions.fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={displayOptions.fontSize}
                  onChange={(e) => setDisplayOptions({ ...displayOptions, fontSize: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#058554]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Line Height: {displayOptions.lineHeight}
                </label>
                <input
                  type="range"
                  min="1.2"
                  max="2.5"
                  step="0.1"
                  value={displayOptions.lineHeight}
                  onChange={(e) => setDisplayOptions({ ...displayOptions, lineHeight: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#058554]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Letter Spacing: {displayOptions.letterSpacing}px
                </label>
                <input
                  type="range"
                  min="-1"
                  max="3"
                  step="0.5"
                  value={displayOptions.letterSpacing}
                  onChange={(e) => setDisplayOptions({ ...displayOptions, letterSpacing: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#058554]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                <select
                  value={displayOptions.fontFamily}
                  onChange={(e) => setDisplayOptions({ ...displayOptions, fontFamily: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-sm"
                >
                  <option value="sans-serif">Sans Serif</option>
                  <option value="serif">Serif</option>
                  <option value="monospace">Monospace</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleConvert}
              disabled={!inputText.trim()}
              className="px-6 py-2.5 bg-[#058554] text-white font-medium rounded-lg hover:bg-[#047045] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              ✨ Convert to Bionic Reading
            </button>

            <button
              onClick={() => handleCopy('html')}
              disabled={!result}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              {copied === 'html' ? '✓ Copied HTML' : '📋 Copy HTML'}
            </button>

            <button
              onClick={() => handleCopy('plain')}
              disabled={!result}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              {copied === 'plain' ? '✓ Copied Plain' : '📄 Copy Plain'}
            </button>

            <button
              onClick={() => handleCopy('markdown')}
              disabled={!result}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              {copied === 'markdown' ? '✓ Copied MD' : '📝 Copy Markdown'}
            </button>

            <button
              onClick={() => handleDownload('html')}
              disabled={!result}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              💾 Download HTML
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
          </div>

          {result && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-blue-600 font-medium text-sm">Total Words</div>
                <div className="text-2xl font-bold text-blue-900">{result.wordCount}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-green-600 font-medium text-sm">Bolded Words</div>
                <div className="text-2xl font-bold text-green-900">{result.boldedWords}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-purple-600 font-medium text-sm">Characters</div>
                <div className="text-2xl font-bold text-purple-900">{inputText.length}</div>
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
                  accept=".txt,.md"
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
              placeholder="Paste or type your text here to convert to Bionic Reading style..."
              className="w-full h-96 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none text-sm"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e0 #f7fafc'
              }}
            />
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Bionic Reading Preview</h3>
            <div
              className="w-full h-96 p-4 border border-gray-300 rounded-xl overflow-auto transition-colors"
              style={{
                ...previewStyle,
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e0 #f7fafc'
              }}
              dangerouslySetInnerHTML={{ __html: result?.html || '<span style="opacity: 0.5;">Converted text will appear here...</span>' }}
            />
          </div>
        </div>
      </div>

      <SEOContent />
    </div>
  );
}

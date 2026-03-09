"use client";

import React, { useState, useRef, useEffect } from 'react';
import { DiffOptions, DiffResult, ViewMode, ComparisonLevel } from './types';
import { compareTexts, renderDiffParts, copyToClipboard, downloadAsFile, readFileAsText, exportDiffAsHtml } from './logic';
import { textDiffCheckerConfig } from './config';
import SEOContent from './seo-content';

export default function TextDiffCheckerUI() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('side-by-side');
  const [copied, setCopied] = useState(false);
  const [autoCompare, setAutoCompare] = useState(false);
  
  const [options, setOptions] = useState<DiffOptions>({
    ignoreCase: false,
    ignoreWhitespace: false,
    comparisonLevel: 'line'
  });

  const fileInputARef = useRef<HTMLInputElement>(null);
  const fileInputBRef = useRef<HTMLInputElement>(null);
  const scrollARef = useRef<HTMLDivElement>(null);
  const scrollBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoCompare && textA && textB) {
      handleCompare();
    }
  }, [textA, textB, options, autoCompare]);

  const handleCompare = () => {
    if (!textA && !textB) {
      setDiffResult(null);
      return;
    }

    const result = compareTexts(textA, textB, options);
    setDiffResult(result);
  };

  const handleCopyDiff = async () => {
    if (!diffResult) return;
    
    const diffText = diffResult.inline.map(part => {
      if (part.type === 'added') return `+ ${part.value}`;
      if (part.type === 'removed') return `- ${part.value}`;
      return `  ${part.value}`;
    }).join('');

    const success = await copyToClipboard(diffText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadDiff = (format: 'txt' | 'html') => {
    if (!diffResult) return;

    if (format === 'txt') {
      const diffText = diffResult.inline.map(part => {
        if (part.type === 'added') return `+ ${part.value}`;
        if (part.type === 'removed') return `- ${part.value}`;
        return `  ${part.value}`;
      }).join('');
      downloadAsFile(diffText, `diff-${Date.now()}.txt`);
    } else {
      const html = exportDiffAsHtml(diffResult.inline, 'Text Diff Comparison');
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `diff-${Date.now()}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    setTextA('');
    setTextB('');
    setDiffResult(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, side: 'A' | 'B') => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await readFileAsText(file);
      if (side === 'A') setTextA(text);
      else setTextB(text);
    }
  };

  const handleDrop = async (e: React.DragEvent, side: 'A' | 'B') => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'text/plain' || file.name.match(/\.(txt|md|csv)$/))) {
      const text = await readFileAsText(file);
      if (side === 'A') setTextA(text);
      else setTextB(text);
    }
  };

  const handlePaste = async (side: 'A' | 'B') => {
    try {
      const text = await navigator.clipboard.readText();
      if (side === 'A') setTextA(text);
      else setTextB(text);
    } catch (err) {
      console.error('Failed to read clipboard');
    }
  };

  const handleScroll = (source: 'A' | 'B') => {
    if (!scrollARef.current || !scrollBRef.current) return;
    
    const sourceRef = source === 'A' ? scrollARef.current : scrollBRef.current;
    const targetRef = source === 'A' ? scrollBRef.current : scrollARef.current;
    
    const scrollPercentage = sourceRef.scrollTop / (sourceRef.scrollHeight - sourceRef.clientHeight);
    targetRef.scrollTop = scrollPercentage * (targetRef.scrollHeight - targetRef.clientHeight);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        {/* Settings Panel */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Comparison Settings</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'side-by-side' ? 'inline' : 'side-by-side')}
                className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {viewMode === 'side-by-side' ? '📄 Inline' : '⚖️ Side-by-Side'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comparison Level</label>
              <select
                value={options.comparisonLevel}
                onChange={(e) => setOptions({ ...options, comparisonLevel: e.target.value as ComparisonLevel })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-sm"
              >
                <option value="line">Line by Line</option>
                <option value="word">Word by Word</option>
                <option value="character">Character by Character</option>
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-7">
              <input
                type="checkbox"
                checked={options.ignoreCase}
                onChange={(e) => setOptions({ ...options, ignoreCase: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Ignore Case</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer pt-7">
              <input
                type="checkbox"
                checked={options.ignoreWhitespace}
                onChange={(e) => setOptions({ ...options, ignoreWhitespace: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Ignore Whitespace</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer pt-7">
              <input
                type="checkbox"
                checked={autoCompare}
                onChange={(e) => setAutoCompare(e.target.checked)}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Auto Compare</span>
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCompare}
              disabled={!textA && !textB}
              className="px-6 py-2.5 bg-[#058554] text-white font-medium rounded-lg hover:bg-[#047045] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              🔍 Compare
            </button>

            <button
              onClick={handleCopyDiff}
              disabled={!diffResult}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              {copied ? '✓ Copied' : '📋 Copy Diff'}
            </button>

            <button
              onClick={() => handleDownloadDiff('txt')}
              disabled={!diffResult}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              💾 Download TXT
            </button>

            <button
              onClick={() => handleDownloadDiff('html')}
              disabled={!diffResult}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              💾 Download HTML
            </button>

            <button
              onClick={handleClear}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              🗑️ Clear
            </button>
          </div>

          {/* Statistics */}
          {diffResult && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-gray-200">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-blue-600 font-medium text-sm">Similarity</div>
                <div className="text-2xl font-bold text-blue-900">{diffResult.statistics.similarityPercentage}%</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-600 font-medium text-sm">Differences</div>
                <div className="text-2xl font-bold text-gray-900">{diffResult.statistics.totalDifferences}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-green-600 font-medium text-sm">Added</div>
                <div className="text-2xl font-bold text-green-900">{diffResult.statistics.addedLines}</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-red-600 font-medium text-sm">Removed</div>
                <div className="text-2xl font-bold text-red-900">{diffResult.statistics.removedLines}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-purple-600 font-medium text-sm">Lines A / B</div>
                <div className="text-xl font-bold text-purple-900">{diffResult.statistics.totalLinesA} / {diffResult.statistics.totalLinesB}</div>
              </div>
            </div>
          )}
        </div>

        {/* Text Input/Output Areas */}
        {viewMode === 'side-by-side' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Text A */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Text A (Original)</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePaste('A')}
                    className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    📋 Paste
                  </button>
                  <button
                    onClick={() => fileInputARef.current?.click()}
                    className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    📁 Upload
                  </button>
                  <input
                    ref={fileInputARef}
                    type="file"
                    accept=".txt,.md,.csv"
                    onChange={(e) => handleFileUpload(e, 'A')}
                    className="hidden"
                  />
                </div>
              </div>
              
              {!diffResult ? (
                <textarea
                  value={textA}
                  onChange={(e) => setTextA(e.target.value)}
                  onDrop={(e) => handleDrop(e, 'A')}
                  onDragOver={(e) => e.preventDefault()}
                  placeholder="Paste or type original text here..."
                  className="w-full h-96 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#cbd5e0 #f7fafc'
                  }}
                />
              ) : (
                <div
                  ref={scrollARef}
                  onScroll={() => handleScroll('A')}
                  className="w-full h-96 p-4 border border-gray-300 rounded-xl overflow-auto bg-gray-50 font-mono text-sm"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#cbd5e0 #f7fafc'
                  }}
                  dangerouslySetInnerHTML={{ __html: renderDiffParts(diffResult.textA) }}
                />
              )}
              <div className="text-sm text-gray-600">
                Lines: {textA.split('\n').length} | Characters: {textA.length}
              </div>
            </div>

            {/* Text B */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Text B (Modified)</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePaste('B')}
                    className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    📋 Paste
                  </button>
                  <button
                    onClick={() => fileInputBRef.current?.click()}
                    className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    📁 Upload
                  </button>
                  <input
                    ref={fileInputBRef}
                    type="file"
                    accept=".txt,.md,.csv"
                    onChange={(e) => handleFileUpload(e, 'B')}
                    className="hidden"
                  />
                </div>
              </div>
              
              {!diffResult ? (
                <textarea
                  value={textB}
                  onChange={(e) => setTextB(e.target.value)}
                  onDrop={(e) => handleDrop(e, 'B')}
                  onDragOver={(e) => e.preventDefault()}
                  placeholder="Paste or type modified text here..."
                  className="w-full h-96 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#cbd5e0 #f7fafc'
                  }}
                />
              ) : (
                <div
                  ref={scrollBRef}
                  onScroll={() => handleScroll('B')}
                  className="w-full h-96 p-4 border border-gray-300 rounded-xl overflow-auto bg-gray-50 font-mono text-sm"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#cbd5e0 #f7fafc'
                  }}
                  dangerouslySetInnerHTML={{ __html: renderDiffParts(diffResult.textB) }}
                />
              )}
              <div className="text-sm text-gray-600">
                Lines: {textB.split('\n').length} | Characters: {textB.length}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Inline Diff View</h3>
            {diffResult ? (
              <div
                className="w-full min-h-96 p-4 border border-gray-300 rounded-xl overflow-auto bg-gray-50 font-mono text-sm"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#cbd5e0 #f7fafc'
                }}
                dangerouslySetInnerHTML={{ __html: renderDiffParts(diffResult.inline) }}
              />
            ) : (
              <div className="w-full min-h-96 p-4 border border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                Click "Compare" to see the inline diff view
              </div>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Legend:</h4>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-200 text-green-900 rounded">Added</span>
              <span className="text-gray-600">New content in Text B</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-200 text-red-900 line-through rounded">Removed</span>
              <span className="text-gray-600">Deleted from Text A</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-gray-200 text-gray-900 rounded">Unchanged</span>
              <span className="text-gray-600">Same in both texts</span>
            </div>
          </div>
        </div>
      </div>

      <SEOContent />
    </div>
  );
}

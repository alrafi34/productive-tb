'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { SlugOptions, SlugResult, ConversionMode } from './types';
import { convertSingle, convertBulk, copyToClipboard, downloadAsFile, downloadAsCSV, formatResultsAsText } from './logic';
import TextToSlugConverterSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function TextToSlugConverterUI() {
  const [mode, setMode] = useState<ConversionMode>('single');
  const [text, setText] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://example.com/blog/');
  const [realtimeConvert, setRealtimeConvert] = useState(true);
  const [result, setResult] = useState<SlugResult | null>(null);
  const [bulkResults, setBulkResults] = useState<SlugResult[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const [options, setOptions] = useState<SlugOptions>({
    removeStopWords: false,
    separator: '-',
    maxLength: 0,
    preserveNumbers: true,
    removeAccents: true,
    lowercase: true,
  });

  const handleConvert = useCallback(() => {
    if (mode === 'single' && text.trim()) {
      const res = convertSingle(text, options);
      setResult(res);
      if (res.slug && !history.includes(res.slug)) {
        setHistory(prev => [res.slug, ...prev].slice(0, 10));
      }
    } else if (mode === 'bulk' && bulkText.trim()) {
      const lines = bulkText.split('\n').filter(l => l.trim());
      const res = convertBulk(lines, options);
      setBulkResults(res);
    }
  }, [mode, text, bulkText, options, history]);

  useEffect(() => {
    if (realtimeConvert) {
      const timer = setTimeout(handleConvert, 300);
      return () => clearTimeout(timer);
    }
  }, [text, bulkText, options, realtimeConvert, handleConvert]);

  const handleClear = () => {
    setText('');
    setBulkText('');
    setResult(null);
    setBulkResults([]);
  };

  const handleCopy = async (slug: string) => {
    await copyToClipboard(slug);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleCopyAll = async () => {
    const allSlugs = formatResultsAsText(bulkResults);
    await copyToClipboard(allSlugs);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (mode === 'single' && result) {
      downloadAsFile(result.slug, 'slug.txt');
    } else if (mode === 'bulk' && bulkResults.length > 0) {
      downloadAsFile(formatResultsAsText(bulkResults), 'slugs.txt');
    }
  };

  const handleDownloadCSV = () => {
    if (bulkResults.length > 0) {
      downloadAsCSV(bulkResults, 'slugs.csv');
    }
  };

  const toggleOption = <K extends keyof SlugOptions>(key: K, value: SlugOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Mode Selection */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex gap-4">
            <button
              onClick={() => setMode('single')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                mode === 'single' ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Single Conversion
            </button>
            <button
              onClick={() => setMode('bulk')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                mode === 'bulk' ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bulk Conversion
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Input Text</h2>
          
          {mode === 'single' ? (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your title or text here..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none"
            />
          ) : (
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="Enter multiple titles (one per line)&#10;How to Learn JavaScript&#10;Best Coding Tools&#10;Top AI Websites"
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm"
            />
          )}
        </div>

        {/* Options Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeStopWords}
                onChange={(e) => toggleOption('removeStopWords', e.target.checked)}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Remove Stop Words</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.preserveNumbers}
                onChange={(e) => toggleOption('preserveNumbers', e.target.checked)}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Preserve Numbers</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeAccents}
                onChange={(e) => toggleOption('removeAccents', e.target.checked)}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Remove Accents</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={realtimeConvert}
                onChange={(e) => setRealtimeConvert(e.target.checked)}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Real-time Conversion</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Separator</label>
              <select
                value={options.separator}
                onChange={(e) => toggleOption('separator', e.target.value as '-' | '_' | '.')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
              >
                <option value="-">Hyphen (-)</option>
                <option value="_">Underscore (_)</option>
                <option value=".">Dot (.)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Length (0 = unlimited)</label>
              <input
                type="number"
                value={options.maxLength}
                onChange={(e) => toggleOption('maxLength', parseInt(e.target.value) || 0)}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleConvert}
            className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium"
          >
            Generate Slug
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Single Mode Result */}
        {mode === 'single' && result && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Slug</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-mono text-lg text-[#058554] break-all">{result.slug}</p>
                <p className="text-sm text-gray-500 mt-2">Length: {result.length} characters</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Base URL (optional)</label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://example.com/blog/"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 mb-1">URL Preview:</p>
                <p className="font-mono text-sm text-blue-600 break-all">{baseUrl}{result.slug}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleCopy(result.slug)}
                  className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium"
                >
                  {copySuccess ? 'Copied!' : 'Copy Slug'}
                </button>
                <button
                  onClick={() => handleCopy(baseUrl + result.slug)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Copy Full URL
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Download TXT
                </button>
              </div>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Slugs</h3>
                <div className="space-y-2">
                  {history.map((slug, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-mono text-sm text-gray-700">{slug}</span>
                      <button
                        onClick={() => handleCopy(slug)}
                        className="text-sm text-[#058554] hover:underline"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bulk Mode Results */}
        {mode === 'bulk' && bulkResults.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Generated Slugs ({bulkResults.length} items)
            </h3>
            <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
              {bulkResults.map((item, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">{item.original}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-sm text-[#058554]">{item.slug}</p>
                    <button
                      onClick={() => handleCopy(item.slug)}
                      className="text-sm text-[#058554] hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopyAll}
                className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium"
              >
                {copySuccess ? 'Copied!' : 'Copy All Slugs'}
              </button>
              <button
                onClick={handleDownloadTxt}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Download TXT
              </button>
              <button
                onClick={handleDownloadCSV}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Download CSV
              </button>
            </div>
          </div>
        )}
      </div>

      <TextToSlugConverterSEOContent />

      <RelatedTools tools={[
        { slug: 'sentence-case-converter', name: 'Sentence Case Converter', description: 'Convert text case formats', icon: '🔡', category: 'writing' },
        { slug: 'whitespace-remover', name: 'Whitespace Remover', description: 'Remove extra spaces from text', icon: '🧽', category: 'writing' },
        { slug: 'find-and-replace', name: 'Find and Replace', description: 'Search and replace text patterns', icon: '🔍', category: 'writing' }
      ]} />
    </>
  );
}

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PalindromeOptions, PalindromeResult, BulkPalindromeResult, CheckMode } from './types';
import {
  checkPalindrome,
  checkBulkPalindromes,
  generatePalindromes,
  copyToClipboard,
  downloadAsFile,
  formatResultAsText
} from './logic';
import PalindromeCheckerSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function PalindromeCheckerUI() {
  const [mode, setMode] = useState<CheckMode>('single');
  const [text, setText] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [realtimeCheck, setRealtimeCheck] = useState(false);
  const [result, setResult] = useState<PalindromeResult | null>(null);
  const [bulkResults, setBulkResults] = useState<BulkPalindromeResult[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const [options, setOptions] = useState<PalindromeOptions>({
    ignoreCase: true,
    ignoreSpaces: true,
    ignorePunctuation: true,
    ignoreNumbers: false
  });

  const handleCheck = useCallback(() => {
    if (mode === 'single' && text.trim()) {
      const res = checkPalindrome(text, options);
      setResult(res);
    } else if (mode === 'bulk' && bulkText.trim()) {
      const lines = bulkText.split('\n').filter(l => l.trim());
      const res = checkBulkPalindromes(lines, options);
      setBulkResults(res);
    }
  }, [mode, text, bulkText, options]);

  useEffect(() => {
    if (realtimeCheck) {
      const timer = setTimeout(handleCheck, 300);
      return () => clearTimeout(timer);
    }
  }, [text, bulkText, options, realtimeCheck, handleCheck]);

  const handleClear = () => {
    setText('');
    setBulkText('');
    setResult(null);
    setBulkResults([]);
  };

  const handleCopy = async () => {
    if (result) {
      await copyToClipboard(formatResultAsText(result));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadAsFile(formatResultAsText(result), 'palindrome-result.txt');
    }
  };

  const handleLoadExample = () => {
    const examples = generatePalindromes();
    const random = examples[Math.floor(Math.random() * examples.length)];
    setText(random);
  };

  const toggleOption = (key: keyof PalindromeOptions) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
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
                mode === 'single'
                  ? 'bg-[#058554] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Single Check
            </button>
            <button
              onClick={() => setMode('bulk')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                mode === 'bulk'
                  ? 'bg-[#058554] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bulk Check
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Input Text</h2>
          
          {mode === 'single' ? (
            <div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter a word, phrase, or sentence..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none"
              />
              <button
                onClick={handleLoadExample}
                className="mt-2 text-sm text-[#058554] hover:underline"
              >
                Load random example
              </button>
            </div>
          ) : (
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="Enter multiple words or phrases (one per line)&#10;racecar&#10;madam&#10;hello&#10;level"
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm"
            />
          )}
        </div>

        {/* Options Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.ignoreCase}
                onChange={() => toggleOption('ignoreCase')}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Ignore Case</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.ignoreSpaces}
                onChange={() => toggleOption('ignoreSpaces')}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Ignore Spaces</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.ignorePunctuation}
                onChange={() => toggleOption('ignorePunctuation')}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Ignore Punctuation</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.ignoreNumbers}
                onChange={() => toggleOption('ignoreNumbers')}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Ignore Numbers</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer md:col-span-2">
              <input
                type="checkbox"
                checked={realtimeCheck}
                onChange={(e) => setRealtimeCheck(e.target.checked)}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Real-time Checking</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCheck}
            className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium"
          >
            Check Palindrome
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
            {/* Main Result */}
            <div className={`rounded-xl border-2 p-6 ${
              result.isPalindrome
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">
                  {result.isPalindrome ? '✔' : '✖'}
                </span>
                <h3 className="text-2xl font-bold text-gray-800">
                  {result.isPalindrome
                    ? 'This IS a palindrome'
                    : 'This is NOT a palindrome'}
                </h3>
              </div>
              <p className="text-gray-600 mt-2">
                Similarity: <span className="font-semibold">{result.similarity}%</span>
              </p>
            </div>

            {/* Text Comparison */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Text Comparison</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Original</p>
                  <p className="font-mono text-sm break-all">{result.original}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Cleaned</p>
                  <p className="font-mono text-sm break-all">{result.cleaned}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Reversed</p>
                  <p className="font-mono text-sm break-all">{result.reversed}</p>
                </div>
              </div>
            </div>

            {/* Character Analysis */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Character Analysis</h3>
              <div className="mb-4">
                <p className="text-gray-600">
                  Total Characters: <span className="font-semibold">{result.characterCount}</span>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-3">Letter Frequency</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(result.letterFrequency)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([char, count]) => (
                      <div key={char} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span className="w-8 h-8 flex items-center justify-center bg-[#058554] text-white rounded font-mono font-bold">
                          {char}
                        </span>
                        <span className="text-gray-700 font-semibold">{count}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium"
              >
                {copySuccess ? 'Copied!' : 'Copy Result'}
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Download as TXT
              </button>
            </div>
          </div>
        )}

        {/* Bulk Mode Results */}
        {mode === 'bulk' && bulkResults.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Bulk Check Results ({bulkResults.length} items)
            </h3>
            <div className="space-y-2">
              {bulkResults.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    item.isPalindrome ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <span className="font-mono text-sm text-gray-800">{item.text}</span>
                  <span className="text-xl">{item.isPalindrome ? '✔' : '✖'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <PalindromeCheckerSEOContent />

      <RelatedTools tools={[
        { slug: 'anagram-finder', name: 'Anagram Finder', description: 'Check if words are anagrams', icon: '🔤', category: 'text' },
        { slug: 'text-reverser', name: 'Text Reverser', description: 'Reverse text, words, or letters', icon: '🔄', category: 'text' },
        { slug: 'word-counter', name: 'Word Counter', description: 'Count words and characters', icon: '📝', category: 'text' }
      ]} />
    </>
  );
}

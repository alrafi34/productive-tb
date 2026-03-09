'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnagramOptions, AnagramResult, BulkAnagramResult, CheckMode } from './types';
import {
  checkAnagram,
  checkBulkAnagrams,
  generateAnagrams,
  copyToClipboard,
  downloadAsFile,
  formatResultAsText
} from './logic';
import AnagramFinderSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function AnagramFinderUI() {
  const [mode, setMode] = useState<CheckMode>('single');
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [bulkCandidates, setBulkCandidates] = useState('');
  const [realtimeCheck, setRealtimeCheck] = useState(false);
  const [result, setResult] = useState<AnagramResult | null>(null);
  const [bulkResult, setBulkResult] = useState<BulkAnagramResult | null>(null);
  const [generatedAnagrams, setGeneratedAnagrams] = useState<string[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const [options, setOptions] = useState<AnagramOptions>({
    ignoreSpaces: true,
    ignorePunctuation: true,
    ignoreCase: true,
    ignoreSpecialChars: false
  });

  const handleCheck = useCallback(() => {
    if (mode === 'single') {
      if (textA.trim() && textB.trim()) {
        const res = checkAnagram(textA, textB, options);
        setResult(res);
      }
    } else {
      if (textA.trim() && bulkCandidates.trim()) {
        const candidates = bulkCandidates.split('\n').filter(c => c.trim());
        const res = checkBulkAnagrams(textA, candidates, options);
        setBulkResult(res);
      }
    }
  }, [mode, textA, textB, bulkCandidates, options]);

  useEffect(() => {
    if (realtimeCheck) {
      const timer = setTimeout(handleCheck, 300);
      return () => clearTimeout(timer);
    }
  }, [textA, textB, bulkCandidates, options, realtimeCheck, handleCheck]);

  const handleClear = () => {
    setTextA('');
    setTextB('');
    setBulkCandidates('');
    setResult(null);
    setBulkResult(null);
    setGeneratedAnagrams([]);
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
      downloadAsFile(formatResultAsText(result), 'anagram-result.txt');
    }
  };

  const handleGenerate = () => {
    if (textA.trim()) {
      const anagrams = generateAnagrams(textA, 20);
      setGeneratedAnagrams(anagrams);
    }
  };

  const toggleOption = (key: keyof AnagramOptions) => {
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
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'single' ? 'Text A' : 'Word/Phrase'}
            </label>
            <textarea
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              placeholder={mode === 'single' ? 'Enter first word or phrase...' : 'Enter word to check...'}
              className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none"
            />
          </div>

          {mode === 'single' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text B
              </label>
              <textarea
                value={textB}
                onChange={(e) => setTextB(e.target.value)}
                placeholder="Enter second word or phrase..."
                className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Candidate Words (one per line)
              </label>
              <textarea
                value={bulkCandidates}
                onChange={(e) => setBulkCandidates(e.target.value)}
                placeholder="silent&#10;enlist&#10;inlets&#10;banana"
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* Options Panel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              checked={options.ignoreCase}
              onChange={() => toggleOption('ignoreCase')}
              className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
            />
            <span className="text-gray-700">Ignore Case</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.ignoreSpecialChars}
              onChange={() => toggleOption('ignoreSpecialChars')}
              className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
            />
            <span className="text-gray-700">Ignore Special Characters</span>
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
          Check Anagram
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Clear All
        </button>
        {mode === 'single' && (
          <button
            onClick={handleGenerate}
            disabled={!textA.trim()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Anagrams
          </button>
        )}
      </div>

      {/* Single Mode Result */}
      {mode === 'single' && result && (
        <div className="space-y-6">
          {/* Main Result */}
          <div className={`rounded-xl border-2 p-6 ${
            result.isAnagram
              ? 'bg-green-50 border-green-500'
              : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">
                {result.isAnagram ? '✔' : '✖'}
              </span>
              <h3 className="text-2xl font-bold text-gray-800">
                {result.isAnagram
                  ? 'These words ARE anagrams'
                  : 'These words are NOT anagrams'}
              </h3>
            </div>
            <p className="text-gray-600 mt-2">
              Similarity: <span className="font-semibold">{result.similarityPercentage}%</span>
            </p>
          </div>

          {/* Cleaned & Sorted */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Processed Text</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Text A</p>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Original:</p>
                    <p className="font-mono text-sm">{result.textA}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Cleaned:</p>
                    <p className="font-mono text-sm">{result.cleanedA}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Sorted:</p>
                    <p className="font-mono text-sm break-all">{result.sortedA}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Text B</p>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Original:</p>
                    <p className="font-mono text-sm">{result.textB}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Cleaned:</p>
                    <p className="font-mono text-sm">{result.cleanedB}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Sorted:</p>
                    <p className="font-mono text-sm break-all">{result.sortedB}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Letter Frequency */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Letter Frequency Analysis</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-3">Text A Frequency</p>
                <div className="space-y-2">
                  {Object.entries(result.frequencyA).length > 0 ? (
                    Object.entries(result.frequencyA)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([char, count]) => (
                        <div key={char} className="flex items-center gap-3">
                          <span className="w-8 h-8 flex items-center justify-center bg-[#058554] text-white rounded font-mono font-bold">
                            {char}
                          </span>
                          <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                            <div
                              className="bg-[#058554] h-full flex items-center justify-end px-2"
                              style={{
                                width: `${Math.min((count / Math.max(...Object.values(result.frequencyA))) * 100, 100)}%`
                              }}
                            >
                              <span className="text-xs text-white font-semibold">{count}</span>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-gray-400 text-sm">No letters found</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-3">Text B Frequency</p>
                <div className="space-y-2">
                  {Object.entries(result.frequencyB).length > 0 ? (
                    Object.entries(result.frequencyB)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([char, count]) => (
                        <div key={char} className="flex items-center gap-3">
                          <span className="w-8 h-8 flex items-center justify-center bg-[#058554] text-white rounded font-mono font-bold">
                            {char}
                          </span>
                          <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                            <div
                              className="bg-[#058554] h-full flex items-center justify-end px-2"
                              style={{
                                width: `${Math.min((count / Math.max(...Object.values(result.frequencyB))) * 100, 100)}%`
                              }}
                            >
                              <span className="text-xs text-white font-semibold">{count}</span>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-gray-400 text-sm">No letters found</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Matching/Mismatched Letters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Letter Comparison</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-green-600 mb-3">
                  Matching Letters ({result.matchingLetters.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.matchingLetters.length > 0 ? (
                    result.matchingLetters.map((char, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-mono font-semibold"
                      >
                        {char}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No matching letters</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-red-600 mb-3">
                  Mismatched Letters ({result.mismatchedLetters.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.mismatchedLetters.length > 0 ? (
                    result.mismatchedLetters.map((char, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg font-mono font-semibold"
                      >
                        {char}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No mismatched letters</p>
                  )}
                </div>
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

      {/* Bulk Mode Result */}
      {mode === 'bulk' && bulkResult && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Bulk Check Results for: <span className="text-[#058554]">{bulkResult.word}</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">✔</span>
                  <p className="text-sm font-medium text-green-600">
                    Anagrams Found ({bulkResult.anagrams.length})
                  </p>
                </div>
                <div className="space-y-2">
                  {bulkResult.anagrams.length > 0 ? (
                    bulkResult.anagrams.map((word, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <p className="font-mono text-sm text-gray-800">{word}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No anagrams found</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">✖</span>
                  <p className="text-sm font-medium text-red-600">
                    Not Anagrams ({bulkResult.nonAnagrams.length})
                  </p>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {bulkResult.nonAnagrams.length > 0 ? (
                    bulkResult.nonAnagrams.map((word, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <p className="font-mono text-sm text-gray-800">{word}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">All are anagrams</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generated Anagrams */}
      {generatedAnagrams.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Generated Anagrams ({generatedAnagrams.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {generatedAnagrams.map((anagram, idx) => (
              <div
                key={idx}
                className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center"
              >
                <p className="font-mono text-sm text-gray-800">{anagram}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    
    <AnagramFinderSEOContent />
    
    <RelatedTools 
      currentTool="anagram-finder"
      tools={['word-frequency-counter', 'text-reverser', 'find-and-replace']} 
    />
    </>
  );
}

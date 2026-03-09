'use client';

import React, { useState, useEffect } from 'react';
import { PickerOptions, WinnerResult } from './types';
import { parseNames, removeDuplicates, shuffleArray, pickRandomWinners, copyToClipboard, downloadAsFile, downloadAsCSV, formatWinnersAsText, triggerConfetti } from './logic';
import RandomNamePickerSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function RandomNamePickerUI() {
  const [namesText, setNamesText] = useState('');
  const [namesList, setNamesList] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[]>([]);
  const [history, setHistory] = useState<WinnerResult[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedName, setAnimatedName] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [roundCounter, setRoundCounter] = useState(1);

  const [options, setOptions] = useState<PickerOptions>({
    numberOfWinners: 1,
    removeDuplicates: true,
    removeWinnerAfterPick: false,
    animationEnabled: true,
  });

  useEffect(() => {
    const names = parseNames(namesText);
    const processed = options.removeDuplicates ? removeDuplicates(names) : names;
    setNamesList(processed);
  }, [namesText, options.removeDuplicates]);

  const handlePickWinner = async () => {
    if (namesList.length === 0) return;

    setWinners([]);

    if (options.animationEnabled) {
      setIsAnimating(true);
      const animationDuration = 2000;
      const intervalTime = 100;
      const iterations = animationDuration / intervalTime;

      for (let i = 0; i < iterations; i++) {
        await new Promise(resolve => setTimeout(resolve, intervalTime));
        const randomName = namesList[Math.floor(Math.random() * namesList.length)];
        setAnimatedName(randomName);
      }

      setIsAnimating(false);
    }

    const selectedWinners = pickRandomWinners(namesList, options.numberOfWinners);
    setWinners(selectedWinners);

    const newHistory = selectedWinners.map(name => ({
      name,
      round: roundCounter,
      timestamp: new Date(),
    }));
    setHistory(prev => [...newHistory, ...prev]);
    setRoundCounter(prev => prev + 1);

    if (options.removeWinnerAfterPick) {
      const remainingNames = namesList.filter(name => !selectedWinners.includes(name));
      setNamesText(remainingNames.join('\n'));
    }

    if (typeof window !== 'undefined' && (window as any).confetti) {
      triggerConfetti();
    }
  };

  const handleShuffle = () => {
    const shuffled = shuffleArray(namesList);
    setNamesText(shuffled.join('\n'));
  };

  const handleClear = () => {
    setNamesText('');
    setWinners([]);
    setAnimatedName('');
  };

  const handleClearHistory = () => {
    setHistory([]);
    setRoundCounter(1);
  };

  const handleRemoveName = (index: number) => {
    const names = [...namesList];
    names.splice(index, 1);
    setNamesText(names.join('\n'));
  };

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownloadWinners = () => {
    if (winners.length > 0) {
      downloadAsFile(formatWinnersAsText(winners), 'winners.txt');
    }
  };

  const handleDownloadHistory = () => {
    if (history.length > 0) {
      downloadAsCSV(history, 'winner-history.csv');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (file.name.endsWith('.csv')) {
        const names = text.split(/[,\n]/).map(n => n.trim()).filter(n => n);
        setNamesText(names.join('\n'));
      } else {
        setNamesText(text);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Names List</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Total: <strong>{namesList.length}</strong></span>
              <label className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer text-sm">
                Import File
                <input type="file" accept=".txt,.csv" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>
          
          <textarea
            value={namesText}
            onChange={(e) => setNamesText(e.target.value)}
            placeholder="Enter names (one per line)&#10;John&#10;Emma&#10;Alex&#10;Sarah&#10;Daniel"
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm"
          />
        </div>

        {/* Names Display */}
        {namesList.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Participants ({namesList.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {namesList.map((name, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700">{idx + 1}. {name}</span>
                  <button
                    onClick={() => handleRemoveName(idx)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Options Panel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Winners</label>
              <input
                type="number"
                value={options.numberOfWinners}
                onChange={(e) => setOptions(prev => ({ ...prev, numberOfWinners: Math.max(1, parseInt(e.target.value) || 1) }))}
                min="1"
                max={namesList.length}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeDuplicates}
                onChange={(e) => setOptions(prev => ({ ...prev, removeDuplicates: e.target.checked }))}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Remove Duplicates</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeWinnerAfterPick}
                onChange={(e) => setOptions(prev => ({ ...prev, removeWinnerAfterPick: e.target.checked }))}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Remove Winner After Pick</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={options.animationEnabled}
                onChange={(e) => setOptions(prev => ({ ...prev, animationEnabled: e.target.checked }))}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Animation Enabled</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handlePickWinner}
            disabled={namesList.length === 0 || isAnimating}
            className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnimating ? 'Picking...' : '🎲 Pick Winner'}
          </button>
          <button
            onClick={handleShuffle}
            disabled={namesList.length === 0}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50"
          >
            🔀 Shuffle List
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Animation Display */}
        {isAnimating && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl border-2 border-purple-600 p-8 text-center animate-pulse">
            <p className="text-4xl font-bold text-white mb-2">🎰</p>
            <p className="text-3xl font-bold text-white">{animatedName}</p>
          </div>
        )}

        {/* Winners Display */}
        {winners.length > 0 && !isAnimating && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-500 p-8">
            <div className="text-center mb-6">
              <p className="text-5xl mb-4">🎉</p>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {winners.length === 1 ? 'Winner!' : 'Winners!'}
              </h3>
            </div>

            <div className="space-y-3">
              {winners.map((winner, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-[#058554]">
                      {winners.length > 1 && `${idx + 1}. `}{winner}
                    </span>
                    <button
                      onClick={() => handleCopy(winner)}
                      className="text-sm text-[#058554] hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => handleCopy(formatWinnersAsText(winners))}
                className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium"
              >
                {copySuccess ? 'Copied!' : 'Copy All Winners'}
              </button>
              <button
                onClick={handleDownloadWinners}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Download TXT
              </button>
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Winner History</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadHistory}
                  className="text-sm text-[#058554] hover:underline"
                >
                  Download CSV
                </button>
                <button
                  onClick={handleClearHistory}
                  className="text-sm text-red-500 hover:underline"
                >
                  Clear History
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-semibold text-gray-800">{item.name}</span>
                    <span className="text-xs text-gray-500 ml-2">Round {item.round}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {item.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <RandomNamePickerSEOContent />

      <RelatedTools tools={[
        { slug: 'word-frequency-counter', name: 'Word Frequency Counter', description: 'Analyze word frequency in text', icon: '📊', category: 'writing' },
        { slug: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', description: 'Clean up duplicate entries', icon: '🧹', category: 'writing' },
        { slug: 'list-alphabetizer', name: 'List Alphabetizer', description: 'Sort lists alphabetically', icon: '🔤', category: 'writing' }
      ]} />

      <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
    </>
  );
}

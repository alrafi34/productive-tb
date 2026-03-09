'use client';

import React, { useState, useEffect } from 'react';
import { LeetspeakOptions, PresetType } from './types';
import { textToLeetspeak, leetspeakToText, getPresetOptions, copyToClipboard, downloadAsFile } from './logic';
import LeetspeakConverterSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function LeetspeakConverterUI() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [preset, setPreset] = useState<PresetType>('custom');

  const [options, setOptions] = useState<LeetspeakOptions>({
    intensity: 'standard',
    randomMode: false,
    preserveSpaces: true,
    realtimeConvert: true,
  });

  useEffect(() => {
    if (options.realtimeConvert && inputText) {
      const timer = setTimeout(() => {
        handleConvert();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inputText, options, isReverse]);

  const handleConvert = () => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    if (isReverse) {
      const result = leetspeakToText(inputText);
      setOutputText(result);
    } else {
      const result = textToLeetspeak(inputText, options);
      setOutputText(result);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handleReset = () => {
    setOptions({
      intensity: 'standard',
      randomMode: false,
      preserveSpaces: true,
      realtimeConvert: true,
    });
    setPreset('custom');
  };

  const handlePreset = (presetType: PresetType) => {
    setPreset(presetType);
    if (presetType !== 'custom') {
      const presetOpts = getPresetOptions(presetType);
      setOptions(prev => ({ ...prev, ...presetOpts }));
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(outputText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownload = () => {
    downloadAsFile(outputText, 'leetspeak.txt');
  };

  const toggleOption = <K extends keyof LeetspeakOptions>(key: K, value: LeetspeakOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
    setPreset('custom');
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Mode Toggle */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex gap-4">
            <button
              onClick={() => setIsReverse(false)}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                !isReverse ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Text → 1337
            </button>
            <button
              onClick={() => setIsReverse(true)}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                isReverse ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              1337 → Text
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {isReverse ? 'Leetspeak Input' : 'Text Input'}
          </h2>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isReverse ? 'Enter 1337 speak...' : 'Enter your text here...'}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none"
          />
        </div>

        {/* Presets */}
        {!isReverse && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Presets</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => handlePreset('gamer')}
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  preset === 'gamer' ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🎮 Gamer
              </button>
              <button
                onClick={() => handlePreset('hacker')}
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  preset === 'hacker' ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💻 Hacker
              </button>
              <button
                onClick={() => handlePreset('meme')}
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  preset === 'meme' ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                😂 Meme
              </button>
              <button
                onClick={() => handlePreset('custom')}
                className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                  preset === 'custom' ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⚙️ Custom
              </button>
            </div>
          </div>
        )}

        {/* Options Panel */}
        {!isReverse && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Customization</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intensity: <strong>{options.intensity}</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  value={['light', 'standard', 'hardcore'].indexOf(options.intensity)}
                  onChange={(e) => {
                    const intensities: LeetspeakOptions['intensity'][] = ['light', 'standard', 'hardcore'];
                    toggleOption('intensity', intensities[parseInt(e.target.value)]);
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Light</span>
                  <span>Standard</span>
                  <span>Hardcore</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.randomMode}
                    onChange={(e) => toggleOption('randomMode', e.target.checked)}
                    className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
                  />
                  <span className="text-gray-700">Random Variations</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.preserveSpaces}
                    onChange={(e) => toggleOption('preserveSpaces', e.target.checked)}
                    className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
                  />
                  <span className="text-gray-700">Preserve Spaces</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.realtimeConvert}
                    onChange={(e) => toggleOption('realtimeConvert', e.target.checked)}
                    className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
                  />
                  <span className="text-gray-700">Real-time Conversion</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleConvert}
            disabled={!inputText}
            className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium disabled:opacity-50"
          >
            Convert
          </button>
          {!isReverse && (
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Reset Settings
            </button>
          )}
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Output Section */}
        {outputText && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {isReverse ? 'Converted Text' : '1337 Output'}
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 min-h-32">
              <p className="text-2xl font-mono break-all">{outputText}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium"
              >
                {copySuccess ? 'Copied!' : 'Copy Output'}
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Download TXT
              </button>
            </div>
          </div>
        )}

        {/* Conversion Reference */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Leetspeak Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm">
            {[
              ['A', '4'], ['B', '8'], ['C', '('], ['D', '|)'], ['E', '3'], ['F', '|='],
              ['G', '6'], ['H', '#'], ['I', '1'], ['J', '_|'], ['K', '|<'], ['L', '1'],
              ['M', '/\\/\\'], ['N', '|\\|'], ['O', '0'], ['P', '|>'], ['Q', '0_'], ['R', '|2'],
              ['S', '5'], ['T', '7'], ['U', '|_|'], ['V', '\\/'], ['W', '\\/\\/'], ['X', '><'],
              ['Y', '`/'], ['Z', '2']
            ].map(([letter, leet]) => (
              <div key={letter} className="p-2 bg-gray-50 rounded text-center">
                <span className="font-bold text-[#058554]">{letter}</span>
                <span className="text-gray-600"> → {leet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LeetspeakConverterSEOContent />

      <RelatedTools currentTool="leetspeak-converter" tools={["zalgo-text-generator", "text-reverser", "nato-phonetic-converter"]} />
    </>
  );
}

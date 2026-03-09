'use client';

import React, { useState, useEffect } from 'react';
import { ZalgoOptions, PresetType } from './types';
import { generateZalgo, removeZalgo, getPresetOptions, copyToClipboard, downloadAsFile } from './logic';
import ZalgoTextGeneratorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function ZalgoTextGeneratorUI() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [realtimeGenerate, setRealtimeGenerate] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [preset, setPreset] = useState<PresetType>('custom');

  const [options, setOptions] = useState<ZalgoOptions>({
    intensity: 'medium',
    addAbove: true,
    addBelow: true,
    addMiddle: true,
    maxCharsPerLetter: 5,
  });

  useEffect(() => {
    if (realtimeGenerate && inputText) {
      const timer = setTimeout(() => {
        const result = generateZalgo(inputText, options);
        setOutputText(result);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inputText, options, realtimeGenerate]);

  const handleGenerate = () => {
    const result = generateZalgo(inputText, options);
    setOutputText(result);
  };

  const handleRemoveZalgo = () => {
    const cleaned = removeZalgo(inputText);
    setOutputText(cleaned);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handleReset = () => {
    setOptions({
      intensity: 'medium',
      addAbove: true,
      addBelow: true,
      addMiddle: true,
      maxCharsPerLetter: 5,
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
    downloadAsFile(outputText, 'zalgo-text.txt');
  };

  const toggleOption = <K extends keyof ZalgoOptions>(key: K, value: ZalgoOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
    setPreset('custom');
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Input Text</h2>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none"
          />
        </div>

        {/* Presets */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Presets</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => handlePreset('mild')}
              className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                preset === 'mild' ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mild Glitch
            </button>
            <button
              onClick={() => handlePreset('broken')}
              className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                preset === 'broken' ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Broken Text
            </button>
            <button
              onClick={() => handlePreset('creepy')}
              className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                preset === 'creepy' ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Creepy Mode
            </button>
            <button
              onClick={() => handlePreset('custom')}
              className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                preset === 'custom' ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Custom
            </button>
          </div>
        </div>

        {/* Options Panel */}
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
                max="3"
                value={['low', 'medium', 'high', 'extreme'].indexOf(options.intensity)}
                onChange={(e) => {
                  const intensities: ZalgoOptions['intensity'][] = ['low', 'medium', 'high', 'extreme'];
                  toggleOption('intensity', intensities[parseInt(e.target.value)]);
                }}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
                <span>Extreme</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Characters Per Letter: <strong>{options.maxCharsPerLetter}</strong>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={options.maxCharsPerLetter}
                onChange={(e) => toggleOption('maxCharsPerLetter', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.addAbove}
                  onChange={(e) => toggleOption('addAbove', e.target.checked)}
                  className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
                />
                <span className="text-gray-700">Add Above</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.addBelow}
                  onChange={(e) => toggleOption('addBelow', e.target.checked)}
                  className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
                />
                <span className="text-gray-700">Add Below</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.addMiddle}
                  onChange={(e) => toggleOption('addMiddle', e.target.checked)}
                  className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
                />
                <span className="text-gray-700">Add Middle</span>
              </label>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={realtimeGenerate}
                onChange={(e) => setRealtimeGenerate(e.target.checked)}
                className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
              />
              <span className="text-gray-700">Real-time Generation</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleGenerate}
            disabled={!inputText}
            className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium disabled:opacity-50"
          >
            Generate Zalgo
          </button>
          <button
            onClick={handleRemoveZalgo}
            disabled={!inputText}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium disabled:opacity-50"
          >
            Remove Zalgo
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Reset Settings
          </button>
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Zalgo Text</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 min-h-32 break-all">
              <p className="text-2xl font-mono">{outputText}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium"
              >
                {copySuccess ? 'Copied!' : 'Copy Text'}
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

        {/* Preview Section */}
        {outputText && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Media Preview</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-500 mb-2">Twitter/X</p>
                <p className="text-sm break-all">{outputText}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-xs text-gray-500 mb-2">Discord</p>
                <p className="text-sm break-all">{outputText}</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <p className="text-xs text-gray-500 mb-2">Instagram Bio</p>
                <p className="text-sm break-all">{outputText}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ZalgoTextGeneratorSEOContent />

      <RelatedTools currentTool="zalgo-text-generator" tools={["word-counter", "text-reverser", "paragraph-formatter"]} />
    </>
  );
}

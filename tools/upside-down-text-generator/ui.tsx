"use client";

import { useState, useEffect } from "react";
import { Copy, Download, RotateCcw, Sparkles } from "lucide-react";
import { UpsideDownOptions, FlipMode, PresetType } from "./types";
import { textToUpsideDown, upsideDownToText, getPresetOptions, copyToClipboard, downloadAsFile, UPSIDE_DOWN_MAP } from "./logic";
import SEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function UpsideDownTextGeneratorUI() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<'text-to-upside' | 'upside-to-text'>('text-to-upside');
  const [flipMode, setFlipMode] = useState<FlipMode>('upside-down');
  const [options, setOptions] = useState<UpsideDownOptions>({
    reverseText: true,
    preserveSpaces: true,
    preservePunctuation: true,
    preserveLineBreaks: true,
    realtimeConvert: true,
  });
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (options.realtimeConvert && inputText) {
      const timer = setTimeout(() => {
        handleConvert();
      }, 300);
      return () => clearTimeout(timer);
    } else if (!inputText) {
      setOutputText("");
    }
  }, [inputText, options, flipMode, mode]);

  const handleConvert = () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    if (mode === 'text-to-upside') {
      const result = textToUpsideDown(inputText, options, flipMode);
      setOutputText(result);
    } else {
      const result = upsideDownToText(inputText);
      setOutputText(result);
    }
  };

  const handleCopy = async () => {
    if (outputText) {
      await copyToClipboard(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (outputText) {
      downloadAsFile(outputText);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const applyPreset = (preset: PresetType) => {
    const presetOptions = getPresetOptions(preset);
    setOptions({ ...options, ...presetOptions });
    setFlipMode(presetOptions.mode);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
          <button
            onClick={() => setMode('text-to-upside')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'text-to-upside'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Text → Upside-Down
          </button>
          <button
            onClick={() => setMode('upside-to-text')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'upside-to-text'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upside-Down → Text
          </button>
        </div>

        {/* Presets */}
        {mode === 'text-to-upside' && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset('classic')}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 inline mr-1" />
              Classic
            </button>
            <button
              onClick={() => applyPreset('mirrored')}
              className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 inline mr-1" />
              Mirrored
            </button>
            <button
              onClick={() => applyPreset('fully-flipped')}
              className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 inline mr-1" />
              Fully Flipped
            </button>
          </div>
        )}

        {/* Flip Mode Options */}
        {mode === 'text-to-upside' && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Flip Direction</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFlipMode('upside-down')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  flipMode === 'upside-down'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Upside-Down
              </button>
              <button
                onClick={() => setFlipMode('mirror')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  flipMode === 'mirror'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Mirror
              </button>
              <button
                onClick={() => setFlipMode('no-reverse')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  flipMode === 'no-reverse'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No Reverse
              </button>
            </div>
          </div>
        )}

        {/* Options */}
        {mode === 'text-to-upside' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.reverseText}
                onChange={(e) => setOptions({ ...options, reverseText: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Reverse Text</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.preserveSpaces}
                onChange={(e) => setOptions({ ...options, preserveSpaces: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Preserve Spaces</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.preservePunctuation}
                onChange={(e) => setOptions({ ...options, preservePunctuation: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Preserve Punctuation</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.preserveLineBreaks}
                onChange={(e) => setOptions({ ...options, preserveLineBreaks: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Preserve Line Breaks</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.realtimeConvert}
                onChange={(e) => setOptions({ ...options, realtimeConvert: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Real-time Convert</span>
            </label>
          </div>
        )}

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'text-to-upside' ? 'Input Text' : 'Upside-Down Text'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={mode === 'text-to-upside' ? 'Enter your text here...' : 'Enter upside-down text here...'}
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Convert Button */}
        {!options.realtimeConvert && (
          <button
            onClick={handleConvert}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Convert
          </button>
        )}

        {/* Output */}
        {outputText && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'text-to-upside' ? 'Upside-Down Text' : 'Normal Text'}
            </label>
            <div className="relative">
              <div className={`w-full min-h-40 p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-lg break-words whitespace-pre-wrap transition-all ${
                isAnimating ? 'animate-pulse' : ''
              }`}>
                {outputText}
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Character Reference Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Character Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto">
            {Object.entries(UPSIDE_DOWN_MAP).slice(0, 52).map(([normal, flipped]) => (
              <div key={normal} className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-lg font-mono">{normal}</div>
                <div className="text-gray-400 text-xs my-1">→</div>
                <div className="text-lg font-mono">{flipped}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SEOContent />
      <RelatedTools
        currentTool="upside-down-text-generator"
        tools={['text-reverser', 'zalgo-text-generator', 'leetspeak-converter']}
      />
    </>
  );
}

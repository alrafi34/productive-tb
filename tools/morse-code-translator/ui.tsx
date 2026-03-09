"use client";

import { useState, useEffect } from "react";
import { Copy, Download, RotateCcw, Volume2, Settings } from "lucide-react";
import { MorseOptions, MorseMode } from "./types";
import { textToMorse, morseToText, playMorseAudio, copyToClipboard, downloadAsFile, MORSE_CODE_MAP } from "./logic";
import SEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function MorseCodeTranslatorUI() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<MorseMode>('text-to-morse');
  const [showSettings, setShowSettings] = useState(false);
  const [options, setOptions] = useState<MorseOptions>({
    dotSymbol: '.',
    dashSymbol: '-',
    letterSpacing: ' ',
    wordSeparator: '   ',
    ignoreCase: true,
    realtimeConvert: true,
    playbackSpeed: 20, // WPM
  });
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (options.realtimeConvert && inputText) {
      const timer = setTimeout(() => {
        handleConvert();
      }, 300);
      return () => clearTimeout(timer);
    } else if (!inputText) {
      setOutputText("");
    }
  }, [inputText, options, mode]);

  const handleConvert = () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    if (mode === 'text-to-morse') {
      const result = textToMorse(inputText, options);
      setOutputText(result);
    } else {
      const result = morseToText(inputText, options);
      setOutputText(result);
    }
  };

  const handlePlayAudio = () => {
    if (!outputText || mode !== 'text-to-morse') return;
    
    setIsPlaying(true);
    try {
      playMorseAudio(outputText, options);
      // Estimate duration and reset playing state
      const estimatedDuration = outputText.length * 200; // rough estimate
      setTimeout(() => setIsPlaying(false), estimatedDuration);
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsPlaying(false);
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
      const filename = mode === 'text-to-morse' ? 'morse-code.txt' : 'decoded-text.txt';
      downloadAsFile(outputText, filename);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const handleSwapMode = () => {
    setMode(mode === 'text-to-morse' ? 'morse-to-text' : 'text-to-morse');
    setInputText(outputText);
    setOutputText("");
  };

  return (
    <>
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
          <button
            onClick={() => setMode('text-to-morse')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'text-to-morse'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Text → Morse
          </button>
          <button
            onClick={() => setMode('morse-to-text')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'morse-to-text'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Morse → Text
          </button>
        </div>

        {/* Settings Toggle */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          <Settings className="w-4 h-4" />
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-gray-900 mb-3">Customization Options</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dot Symbol</label>
                <select
                  value={options.dotSymbol}
                  onChange={(e) => setOptions({ ...options, dotSymbol: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value=".">. (dot)</option>
                  <option value="•">• (bullet)</option>
                  <option value="·">· (middle dot)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dash Symbol</label>
                <select
                  value={options.dashSymbol}
                  onChange={(e) => setOptions({ ...options, dashSymbol: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="-">- (hyphen)</option>
                  <option value="−">− (minus)</option>
                  <option value="—">— (em dash)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Letter Spacing</label>
                <select
                  value={options.letterSpacing}
                  onChange={(e) => setOptions({ ...options, letterSpacing: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value=" ">Single space</option>
                  <option value="  ">Double space</option>
                  <option value=" | ">Pipe separator</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Playback Speed (WPM)</label>
                <input
                  type="number"
                  value={options.playbackSpeed}
                  onChange={(e) => setOptions({ ...options, playbackSpeed: parseInt(e.target.value) || 20 })}
                  min="5"
                  max="40"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.ignoreCase}
                  onChange={(e) => setOptions({ ...options, ignoreCase: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Ignore Case</span>
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
          </div>
        )}

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'text-to-morse' ? 'Input Text' : 'Input Morse Code'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={mode === 'text-to-morse' ? 'Enter your text here...' : 'Enter Morse code here (e.g., .... . .-.. .-.. ---)...'}
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {!options.realtimeConvert && (
            <button
              onClick={handleConvert}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Convert
            </button>
          )}
          <button
            onClick={handleSwapMode}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Swap Mode
          </button>
        </div>

        {/* Output */}
        {outputText && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'text-to-morse' ? 'Morse Code Output' : 'Decoded Text'}
            </label>
            <div className="relative">
              <div className="w-full min-h-40 p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-lg break-words whitespace-pre-wrap">
                {outputText}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
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
                {mode === 'text-to-morse' && (
                  <button
                    onClick={handlePlayAudio}
                    disabled={isPlaying}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Volume2 className="w-4 h-4" />
                    {isPlaying ? 'Playing...' : 'Play Audio'}
                  </button>
                )}
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

        {/* Morse Code Reference Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Morse Code Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto">
            {Object.entries(MORSE_CODE_MAP).filter(([key]) => key !== ' ').map(([char, morse]) => (
              <div key={char} className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold">{char}</div>
                <div className="text-gray-400 text-xs my-1">→</div>
                <div className="text-sm font-mono">{morse}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SEOContent />
      <RelatedTools
        currentTool="morse-code-translator"
        tools={['nato-phonetic-converter', 'text-reverser', 'upside-down-text-generator']}
      />
    </>
  );
}

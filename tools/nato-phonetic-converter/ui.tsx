'use client';

import React, { useState, useEffect } from 'react';
import { NATOOptions, ViewMode } from './types';
import { textToNATO, textToNATOLetterByLetter, natoToText, speakNATO, copyToClipboard, downloadAsFile } from './logic';
import NATOPhoneticConverterSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function NATOPhoneticConverterUI() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [letterByLetterData, setLetterByLetterData] = useState<Array<{ char: string; nato: string }>>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('standard');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isReverse, setIsReverse] = useState(false);

  const [options, setOptions] = useState<NATOOptions>({
    convertNumbers: true,
    ignorePunctuation: false,
    letterByLetter: false,
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
      setLetterByLetterData([]);
      return;
    }

    if (isReverse) {
      const result = natoToText(inputText);
      setOutputText(result);
    } else {
      const result = textToNATO(inputText, options);
      setOutputText(result);
      
      if (viewMode === 'letter-by-letter') {
        const letterData = textToNATOLetterByLetter(inputText, options);
        setLetterByLetterData(letterData);
      }
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setLetterByLetterData([]);
  };

  const handleCopy = async () => {
    await copyToClipboard(outputText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownload = () => {
    downloadAsFile(outputText, 'nato-phonetic.txt');
  };

  const handleSpeak = () => {
    speakNATO(outputText);
  };

  const toggleOption = <K extends keyof NATOOptions>(key: K, value: NATOOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
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
              Text → NATO
            </button>
            <button
              onClick={() => setIsReverse(true)}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                isReverse ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              NATO → Text
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {isReverse ? 'NATO Phonetic Input' : 'Text Input'}
          </h2>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isReverse ? 'Enter NATO phonetic words (e.g., Alpha Bravo Charlie)...' : 'Enter your text here...'}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none"
          />
        </div>

        {/* Options Panel */}
        {!isReverse && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.convertNumbers}
                  onChange={(e) => toggleOption('convertNumbers', e.target.checked)}
                  className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
                />
                <span className="text-gray-700">Convert Numbers</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.ignorePunctuation}
                  onChange={(e) => toggleOption('ignorePunctuation', e.target.checked)}
                  className="w-5 h-5 text-[#058554] rounded focus:ring-2 focus:ring-[#058554]"
                />
                <span className="text-gray-700">Ignore Punctuation</span>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setViewMode('standard')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'standard' ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setViewMode('letter-by-letter')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'letter-by-letter' ? 'bg-[#058554] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Letter-by-Letter
                </button>
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
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Output Section - Standard View */}
        {outputText && viewMode === 'standard' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {isReverse ? 'Converted Text' : 'NATO Phonetic Output'}
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 min-h-32">
              <p className="text-lg font-mono break-words">{outputText}</p>
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
              {!isReverse && (
                <button
                  onClick={handleSpeak}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  🔊 Play Audio
                </button>
              )}
            </div>
          </div>
        )}

        {/* Output Section - Letter by Letter View */}
        {letterByLetterData.length > 0 && viewMode === 'letter-by-letter' && !isReverse && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Letter-by-Letter Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {letterByLetterData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl font-bold text-[#058554] w-10 text-center">{item.char}</span>
                  <span className="text-lg">→</span>
                  <span className="text-lg font-medium text-gray-700">{item.nato}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium"
              >
                {copySuccess ? 'Copied!' : 'Copy Output'}
              </button>
              <button
                onClick={handleSpeak}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                🔊 Play Audio
              </button>
            </div>
          </div>
        )}

        {/* NATO Reference Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">NATO Phonetic Alphabet Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm">
            {Object.entries({
              'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo', 'F': 'Foxtrot',
              'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett', 'K': 'Kilo', 'L': 'Lima',
              'M': 'Mike', 'N': 'November', 'O': 'Oscar', 'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo',
              'S': 'Sierra', 'T': 'Tango', 'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray',
              'Y': 'Yankee', 'Z': 'Zulu'
            }).map(([letter, word]) => (
              <div key={letter} className="p-2 bg-gray-50 rounded text-center">
                <span className="font-bold text-[#058554]">{letter}</span>
                <span className="text-gray-600"> - {word}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NATOPhoneticConverterSEOContent />

      <RelatedTools tools={[
        { slug: 'text-reverser', name: 'Text Reverser', description: 'Reverse text and words', icon: '🔄', category: 'writing' },
        { slug: 'sentence-case-converter', name: 'Case Converter', description: 'Convert text case formats', icon: '🔡', category: 'writing' },
        { slug: 'word-counter', name: 'Word Counter', description: 'Count words and characters', icon: '📝', category: 'writing' }
      ]} />
    </>
  );
}

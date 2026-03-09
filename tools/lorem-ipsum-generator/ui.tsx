"use client";

import { useState } from 'react';
import { GeneratorOptions, GenerationType } from './types';
import { generateText, downloadAsFile, copyToClipboard } from './logic';
import LoremIpsumGeneratorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function LoremIpsumGeneratorUI() {
  const [options, setOptions] = useState<GeneratorOptions>({
    type: 'paragraphs',
    count: 5,
    startWithLorem: true,
    includeHtml: false,
    randomMode: 'classic',
    customWords: []
  });
  const [result, setResult] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const handleGenerate = () => {
    const generated = generateText(options);
    setResult(options.includeHtml ? generated.html : generated.text);
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = (type: 'text' | 'html') => {
    const content = type === 'html' ? generateText({ ...options, includeHtml: true }).html : result;
    const extension = type === 'html' ? 'html' : 'txt';
    downloadAsFile(content, `lorem-ipsum.${extension}`, type);
  };

  const handleAddCustomWords = () => {
    if (!customInput.trim()) return;
    const words = customInput.split(',').map(w => w.trim()).filter(Boolean);
    setOptions(prev => ({ ...prev, customWords: [...prev.customWords, ...words] }));
    setCustomInput('');
  };

  const handleRemoveCustomWord = (word: string) => {
    setOptions(prev => ({ ...prev, customWords: prev.customWords.filter(w => w !== word) }));
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {/* Settings Panel */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generation Settings</h3>

          {/* Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Generate</label>
            <div className="flex gap-2">
              {(['paragraphs', 'sentences', 'words'] as GenerationType[]).map(type => (
                <button
                  key={type}
                  onClick={() => setOptions(prev => ({ ...prev, type }))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    options.type === type
                      ? 'bg-[#058554] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Count Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of {options.type}
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={options.count}
              onChange={(e) => setOptions(prev => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.startWithLorem}
                onChange={(e) => setOptions(prev => ({ ...prev, startWithLorem: e.target.checked }))}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Start with "Lorem ipsum"</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.includeHtml}
                onChange={(e) => setOptions(prev => ({ ...prev, includeHtml: e.target.checked }))}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Include HTML tags</span>
            </label>
          </div>

          {/* Randomization Mode */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Randomization Mode</label>
            <div className="flex gap-2">
              {(['classic', 'medium', 'full'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setOptions(prev => ({ ...prev, randomMode: mode }))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    options.randomMode === mode
                      ? 'bg-[#058554] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Dictionary */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Custom Dictionary</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomWords()}
                placeholder="Add custom words (comma-separated)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
              />
              <button
                onClick={handleAddCustomWords}
                className="px-4 py-2 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium"
              >
                Add
              </button>
            </div>
            {options.customWords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {options.customWords.map((word, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-green-100 text-[#058554] text-sm px-3 py-1 rounded-full"
                  >
                    {word}
                    <button
                      onClick={() => handleRemoveCustomWord(word)}
                      className="hover:text-red-500 transition-colors font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="w-full px-6 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-semibold text-lg"
          >
            🎲 Generate Text
          </button>
        </div>

        {/* Result Preview */}
        {result && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Generated Text</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-[#058554] text-white rounded-lg hover:bg-[#047045] transition-colors font-medium text-sm"
                >
                  {copied ? '✅ Copied!' : '📋 Copy'}
                </button>
                <button
                  onClick={() => handleDownload('text')}
                  className="px-4 py-2 border-2 border-[#058554] text-[#058554] rounded-lg hover:bg-[#058554] hover:text-white transition-colors font-medium text-sm"
                >
                  💾 TXT
                </button>
                {options.includeHtml && (
                  <button
                    onClick={() => handleDownload('html')}
                    className="px-4 py-2 border-2 border-[#058554] text-[#058554] rounded-lg hover:bg-[#058554] hover:text-white transition-colors font-medium text-sm"
                  >
                    💾 HTML
                  </button>
                )}
                <button
                  onClick={() => setResult('')}
                  className="px-4 py-2 border-2 border-red-300 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-medium text-sm"
                >
                  🗑️ Clear
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
                {result}
              </pre>
            </div>

            <div className="mt-4 flex gap-4 text-sm text-gray-600">
              <span>Words: {result.split(/\s+/).filter(Boolean).length}</span>
              <span>Characters: {result.length}</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Generate</h3>
            <p className="text-gray-600">
              Configure your settings above and click "Generate Text" to create placeholder content.
            </p>
          </div>
        )}
      </div>

      <LoremIpsumGeneratorSEOContent />
      
      <RelatedTools currentTool="lorem-ipsum-generator" tools={["word-counter", "text-reverser", "paragraph-formatter"]} />
    </>
  );
}

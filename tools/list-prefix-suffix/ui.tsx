"use client";

import { useState, useEffect } from "react";
import { Copy, Download, RotateCcw, Sparkles, Hash, Shuffle } from "lucide-react";
import { PrefixSuffixOptions, TemplateType } from "./types";
import { applyPrefixSuffix, applyRandomPrefixSuffix, getTemplateOptions, copyToClipboard, downloadAsFile } from "./logic";
import SEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ListPrefixSuffixUI() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [options, setOptions] = useState<PrefixSuffixOptions>({
    prefix: '',
    suffix: '',
    enableNumbering: false,
    numberStart: 1,
    numberSeparator: '.',
    removeEmptyLines: false,
    trimSpaces: false,
    realtimeConvert: true,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (options.realtimeConvert && inputText) {
      const timer = setTimeout(() => {
        handleConvert();
      }, 300);
      return () => clearTimeout(timer);
    } else if (!inputText) {
      setOutputText("");
    }
  }, [inputText, options]);

  const handleConvert = () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    if (!originalText) {
      setOriginalText(inputText);
    }

    const result = applyPrefixSuffix(inputText, options);
    setOutputText(result);
  };

  const handleRandomMode = () => {
    if (!inputText.trim()) return;

    if (!originalText) {
      setOriginalText(inputText);
    }

    const result = applyRandomPrefixSuffix(inputText, options);
    setOutputText(result);
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
    setOriginalText("");
  };

  const handleUndo = () => {
    if (originalText) {
      setInputText(originalText);
      setOutputText("");
      setOriginalText("");
    }
  };

  const applyTemplate = (template: TemplateType) => {
    const templateOptions = getTemplateOptions(template);
    setOptions({ ...options, ...templateOptions });
  };

  const lineCount = inputText ? inputText.split('\n').length : 0;
  const outputLineCount = outputText ? outputText.split('\n').length : 0;

  return (
    <>
      <div className="space-y-6">
        {/* Templates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Quick Templates</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyTemplate('markdown-bullet')}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 inline mr-1" />
              Markdown Bullet
            </button>
            <button
              onClick={() => applyTemplate('numbered-list')}
              className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
            >
              <Hash className="w-4 h-4 inline mr-1" />
              Numbered List
            </button>
            <button
              onClick={() => applyTemplate('checklist')}
              className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 inline mr-1" />
              Checklist
            </button>
            <button
              onClick={() => applyTemplate('quote')}
              className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 inline mr-1" />
              Quote
            </button>
            <button
              onClick={() => applyTemplate('code-comment')}
              className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 inline mr-1" />
              Code Comment
            </button>
            <button
              onClick={() => applyTemplate('csv')}
              className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 inline mr-1" />
              CSV
            </button>
          </div>
        </div>

        {/* Prefix/Suffix Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prefix</label>
            <input
              type="text"
              value={options.prefix}
              onChange={(e) => setOptions({ ...options, prefix: e.target.value })}
              placeholder="e.g., - or * or >"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Suffix</label>
            <input
              type="text"
              value={options.suffix}
              onChange={(e) => setOptions({ ...options, suffix: e.target.value })}
              placeholder="e.g., ; or . or :"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Numbering Options */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.enableNumbering}
              onChange={(e) => setOptions({ ...options, enableNumbering: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Enable Numbering</span>
          </label>

          {options.enableNumbering && (
            <div className="grid md:grid-cols-2 gap-3 ml-6">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Start Number</label>
                <input
                  type="number"
                  value={options.numberStart}
                  onChange={(e) => setOptions({ ...options, numberStart: parseInt(e.target.value) || 1 })}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Separator</label>
                <select
                  value={options.numberSeparator}
                  onChange={(e) => setOptions({ ...options, numberSeparator: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value=".">. (dot)</option>
                  <option value=")"> ) (parenthesis)</option>
                  <option value="-">- (dash)</option>
                  <option value=":">: (colon)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.removeEmptyLines}
              onChange={(e) => setOptions({ ...options, removeEmptyLines: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Remove Empty Lines</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.trimSpaces}
              onChange={(e) => setOptions({ ...options, trimSpaces: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Trim Spaces</span>
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

        {/* Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Input List</label>
            <span className="text-xs text-gray-500">{lineCount} lines</span>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your list items (one per line)..."
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono"
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
            onClick={handleRandomMode}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Shuffle className="w-4 h-4" />
            Random Emojis
          </button>
          {originalText && (
            <button
              onClick={handleUndo}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Undo
            </button>
          )}
        </div>

        {/* Output */}
        {outputText && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Formatted Output</label>
              <span className="text-xs text-gray-500">{outputLineCount} lines</span>
            </div>
            <div className="relative">
              <div className="w-full min-h-48 p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm break-words whitespace-pre-wrap">
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

        {/* Examples */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Examples</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Markdown Bullet List</h4>
              <div className="text-xs text-gray-600 space-y-1 font-mono">
                <div>Prefix: <span className="text-blue-600">- </span></div>
                <div className="mt-2 text-gray-500">Output:</div>
                <div>- Apple</div>
                <div>- Banana</div>
                <div>- Cherry</div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Numbered List</h4>
              <div className="text-xs text-gray-600 space-y-1 font-mono">
                <div>Numbering: <span className="text-blue-600">Enabled (1.)</span></div>
                <div className="mt-2 text-gray-500">Output:</div>
                <div>1. Apple</div>
                <div>2. Banana</div>
                <div>3. Cherry</div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Checklist</h4>
              <div className="text-xs text-gray-600 space-y-1 font-mono">
                <div>Prefix: <span className="text-blue-600">[ ] </span></div>
                <div className="mt-2 text-gray-500">Output:</div>
                <div>[ ] Apple</div>
                <div>[ ] Banana</div>
                <div>[ ] Cherry</div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">CSV Format</h4>
              <div className="text-xs text-gray-600 space-y-1 font-mono">
                <div>Suffix: <span className="text-blue-600">,</span></div>
                <div className="mt-2 text-gray-500">Output:</div>
                <div>Apple,</div>
                <div>Banana,</div>
                <div>Cherry,</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SEOContent />
      <RelatedTools
        currentTool="list-prefix-suffix"
        tools={['remove-duplicate-lines', 'find-and-replace', 'paragraph-formatter']}
      />
    </>
  );
}

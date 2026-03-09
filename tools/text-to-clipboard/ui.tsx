"use client";

import { useState, useRef } from 'react';
import { TextBlock, CopySettings } from './types';
import { copyToClipboard, addLineNumbers, formatAsMarkdown, formatAsHTML, generateId, selectText } from './logic';
import TextToClipboardSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function TextToClipboardUI() {
  const [textBlocks, setTextBlocks] = useState<TextBlock[]>([
    { id: generateId(), content: '', label: 'Text Block 1' }
  ]);
  const [settings, setSettings] = useState<CopySettings>({
    format: 'plain',
    autoSelect: true,
    showLineNumbers: false,
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  const handleCopy = async (id: string) => {
    const block = textBlocks.find(b => b.id === id);
    if (!block || !block.content.trim()) return;

    let textToCopy = block.content;

    if (settings.showLineNumbers) {
      textToCopy = addLineNumbers(textToCopy);
    }

    if (settings.format === 'markdown') {
      textToCopy = formatAsMarkdown(textToCopy);
    } else if (settings.format === 'html') {
      textToCopy = formatAsHTML(textToCopy);
    }

    const success = await copyToClipboard(textToCopy, settings.format);
    
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleCopyAll = async () => {
    const allText = textBlocks
      .filter(b => b.content.trim())
      .map(b => b.content)
      .join('\n\n');

    if (!allText) return;

    let textToCopy = allText;

    if (settings.showLineNumbers) {
      textToCopy = addLineNumbers(textToCopy);
    }

    if (settings.format === 'markdown') {
      textToCopy = formatAsMarkdown(textToCopy);
    } else if (settings.format === 'html') {
      textToCopy = formatAsHTML(textToCopy);
    }

    const success = await copyToClipboard(textToCopy, settings.format);
    
    if (success) {
      setCopiedId('all');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleAddBlock = () => {
    setTextBlocks([...textBlocks, {
      id: generateId(),
      content: '',
      label: `Text Block ${textBlocks.length + 1}`
    }]);
  };

  const handleRemoveBlock = (id: string) => {
    if (textBlocks.length === 1) return;
    setTextBlocks(textBlocks.filter(b => b.id !== id));
  };

  const handleUpdateContent = (id: string, content: string) => {
    setTextBlocks(textBlocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const handleUpdateLabel = (id: string, label: string) => {
    setTextBlocks(textBlocks.map(b => b.id === id ? { ...b, label } : b));
  };

  const handleFocus = (id: string) => {
    if (settings.autoSelect && textareaRefs.current[id]) {
      selectText(textareaRefs.current[id]!);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {/* Settings */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <div className="flex gap-2">
            {(['plain', 'html', 'markdown'] as const).map(format => (
              <button
                key={format}
                onClick={() => setSettings(prev => ({ ...prev, format }))}
                className={`px-4 py-2 rounded-lg transition-all font-medium text-sm capitalize ${
                  settings.format === format
                    ? 'bg-[#058554] text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#058554]'
                }`}
              >
                {format}
              </button>
            ))}
          </div>

          <div className="flex gap-3 items-center">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input
                type="checkbox"
                checked={settings.showLineNumbers}
                onChange={(e) => setSettings(prev => ({ ...prev, showLineNumbers: e.target.checked }))}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              Line Numbers
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input
                type="checkbox"
                checked={settings.autoSelect}
                onChange={(e) => setSettings(prev => ({ ...prev, autoSelect: e.target.checked }))}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              Auto-Select
            </label>
          </div>
        </div>

        {/* Text Blocks */}
        <div className="space-y-4 mb-6">
          {textBlocks.map((block, index) => (
            <div key={block.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="text"
                  value={block.label}
                  onChange={(e) => handleUpdateLabel(block.id, e.target.value)}
                  className="flex-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                />
                <button
                  onClick={() => handleCopy(block.id)}
                  disabled={!block.content.trim()}
                  className="px-4 py-1.5 bg-[#058554] hover:bg-[#047045] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium text-sm"
                >
                  {copiedId === block.id ? '✓ Copied' : '📋 Copy'}
                </button>
                {textBlocks.length > 1 && (
                  <button
                    onClick={() => handleRemoveBlock(block.id)}
                    className="px-3 py-1.5 bg-white border border-gray-200 hover:border-red-300 text-gray-700 hover:text-red-500 rounded-lg transition-all font-medium text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
              <textarea
                ref={(el) => { textareaRefs.current[block.id] = el; }}
                value={block.content}
                onChange={(e) => handleUpdateContent(block.id, e.target.value)}
                onFocus={() => handleFocus(block.id)}
                placeholder="Enter or paste your text here..."
                className="w-full h-32 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-y font-mono text-sm text-gray-800 leading-relaxed"
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleAddBlock}
            className="px-6 py-3 bg-white border border-gray-200 hover:border-[#058554] text-gray-700 rounded-lg transition-all font-medium"
          >
            ➕ Add Text Block
          </button>
          {textBlocks.length > 1 && (
            <button
              onClick={handleCopyAll}
              disabled={!textBlocks.some(b => b.content.trim())}
              className="px-6 py-3 bg-[#058554] hover:bg-[#047045] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
            >
              {copiedId === 'all' ? '✓ All Copied' : '📋 Copy All'}
            </button>
          )}
        </div>
      </div>

      <TextToClipboardSEOContent />
      
      <RelatedTools
        tools={[
          {
            slug: "word-counter",
            name: "Word Counter",
            description: "Count words, characters, and paragraphs in text.",
            icon: "📝",
            category: "writing"
          },
          {
            slug: "text-reverser",
            name: "Text Reverser",
            description: "Reverse letters or words in your text.",
            icon: "🔄",
            category: "writing"
          },
          {
            slug: "base64-encoder-decoder",
            name: "Base64 Encoder/Decoder",
            description: "Convert text to/from Base64 strings.",
            icon: "🔐",
            category: "developer"
          }
        ]}
      />
    </>
  );
}

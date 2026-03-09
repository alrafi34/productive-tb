"use client";

import { useState, useEffect, useCallback } from 'react';
import { PreviewSettings } from './types';
import { parseMarkdown, calculateStats, downloadFile, copyToClipboard, DEFAULT_MARKDOWN } from './logic';
import MarkdownPreviewerSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function MarkdownPreviewerUI() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [html, setHtml] = useState('');
  const [settings, setSettings] = useState<PreviewSettings>({
    layout: 'split',
    fontSize: 16,
  });
  const [copied, setCopied] = useState(false);

  const updatePreview = useCallback(() => {
    const parsed = parseMarkdown(markdown);
    setHtml(parsed);
  }, [markdown]);

  useEffect(() => {
    updatePreview();
  }, [updatePreview]);

  const handleCopy = async () => {
    try {
      await copyToClipboard(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownloadMd = () => {
    downloadFile(markdown, 'document.md', 'text/markdown');
  };

  const handleDownloadHtml = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Document</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #333; }
    h1, h2, h3, h4, h5, h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; }
    h1 { font-size: 2em; border-bottom: 1px solid #eee; padding-bottom: 8px; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #eee; padding-bottom: 8px; }
    code { background: #f6f8fa; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; font-size: 0.9em; }
    pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 4px solid #ddd; padding-left: 16px; color: #666; margin: 16px 0; }
    a { color: #0366d6; text-decoration: none; }
    a:hover { text-decoration: underline; }
    img { max-width: 100%; height: auto; }
    hr { border: none; border-top: 1px solid #eee; margin: 24px 0; }
    ul, ol { padding-left: 24px; }
    li { margin: 4px 0; }
    table { border-collapse: collapse; width: 100%; margin: 16px 0; }
    th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
    th { background: #f6f8fa; font-weight: 600; }
  </style>
</head>
<body>
${html}
</body>
</html>`;
    downloadFile(fullHtml, 'document.html', 'text/html');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMarkdown(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const stats = calculateStats(markdown);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setSettings(prev => ({ ...prev, layout: prev.layout === 'split' ? 'preview' : 'split' }))}
              className={`px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                settings.layout === 'split'
                  ? 'bg-[#058554] text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[#058554]'
              }`}
            >
              {settings.layout === 'split' ? 'Preview Only' : 'Markdown'}
            </button>
          </div>

          <div className="flex gap-2">
            <label className="px-4 py-2 bg-white border border-gray-200 hover:border-[#058554] text-gray-700 rounded-lg transition-all font-medium text-sm cursor-pointer">
              📁 Load
              <input type="file" accept=".md" onChange={handleFileUpload} className="hidden" />
            </label>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-[#058554] hover:bg-[#047045] text-white rounded-lg transition-colors font-medium text-sm"
            >
              {copied ? '✅ Copied' : '📋 Copy'}
            </button>
            <button
              onClick={handleDownloadMd}
              className="px-4 py-2 bg-white border border-gray-200 hover:border-[#058554] text-gray-700 rounded-lg transition-all font-medium text-sm"
            >
              💾 MD
            </button>
            <button
              onClick={handleDownloadHtml}
              className="px-4 py-2 bg-white border border-gray-200 hover:border-[#058554] text-gray-700 rounded-lg transition-all font-medium text-sm"
            >
              💾 HTML
            </button>
            <button
              onClick={() => setMarkdown(DEFAULT_MARKDOWN)}
              className="px-4 py-2 bg-white border border-gray-200 hover:border-red-300 text-gray-700 hover:text-red-500 rounded-lg transition-all font-medium text-sm"
            >
              🔄
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-6">
          <span>{stats.words} words</span>
          <span>·</span>
          <span>{stats.characters} chars</span>
          <span>·</span>
          <span>{stats.lines} lines</span>
          <span>·</span>
          <span>{stats.headings} headings</span>
          <span>·</span>
          <span>{stats.links} links</span>
          <span>·</span>
          <span>{stats.codeBlocks} code blocks</span>
        </div>

        {/* Editor and Preview */}
        <div className={`grid ${settings.layout === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
          {/* Editor */}
          {settings.layout === 'split' && (
            <div className="relative">
              <div className="absolute top-4 left-4 text-xs font-medium text-gray-400 uppercase tracking-wide">Markdown</div>
              <style jsx>{`
                textarea::-webkit-scrollbar {
                  width: 6px;
                }
                textarea::-webkit-scrollbar-track {
                  background: transparent;
                }
                textarea::-webkit-scrollbar-thumb {
                  background: #d1d5db;
                  border-radius: 3px;
                }
                textarea::-webkit-scrollbar-thumb:hover {
                  background: #9ca3af;
                }
              `}</style>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-[700px] px-4 pt-12 pb-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm text-gray-800 leading-relaxed"
                placeholder="Type your Markdown here..."
              />
            </div>
          )}

          {/* Preview */}
          <div className="relative">
            <div className="absolute top-4 left-4 text-xs font-medium text-gray-400 uppercase tracking-wide z-10">Preview</div>
            <style jsx>{`
              .preview-scroll::-webkit-scrollbar {
                width: 6px;
              }
              .preview-scroll::-webkit-scrollbar-track {
                background: transparent;
              }
              .preview-scroll::-webkit-scrollbar-thumb {
                background: #d1d5db;
                border-radius: 3px;
              }
              .preview-scroll::-webkit-scrollbar-thumb:hover {
                background: #9ca3af;
              }
            `}</style>
            <div
              className="preview-scroll w-full h-[700px] px-6 pt-12 pb-6 bg-white border border-gray-200 rounded-xl overflow-y-auto prose prose-slate max-w-none"
              style={{ fontSize: `${settings.fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>

      <MarkdownPreviewerSEOContent />
      
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
            slug: "text-diff-checker",
            name: "Text Diff Checker",
            description: "Compare two text blocks and highlight differences.",
            icon: "🔀",
            category: "writing"
          },
          {
            slug: "html-to-jsx-converter",
            name: "HTML to JSX Converter",
            description: "Convert HTML to React JSX format.",
            icon: "⚛️",
            category: "developer"
          }
        ]}
      />
    </>
  );
}

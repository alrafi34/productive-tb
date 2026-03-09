"use client";

import React, { useState, useRef, useEffect } from 'react';
import { TableData, ConversionOptions, ConversionResult, HeaderMode, ColumnAlignment, DelimiterType } from './types';
import { parseTableData, convertToMarkdown, copyToClipboard, downloadAsFile, readFileAsText } from './logic';
import { tableToMarkdownConfig } from './config';
import SEOContent from './seo-content';

export default function TableToMarkdownUI() {
  const [inputText, setInputText] = useState('');
  const [tableData, setTableData] = useState<TableData>({ headers: [], rows: [] });
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [options, setOptions] = useState<ConversionOptions>({
    headerMode: 'first-row',
    customHeaders: [],
    columnAlignments: [],
    prettyFormat: true,
    escapeSpecialChars: false,
    wrapInBackticks: false,
    delimiter: 'auto'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputText.trim()) {
      const parsed = parseTableData(inputText, options.delimiter);
      setTableData(parsed);
      
      if (parsed.headers.length > 0) {
        const alignments = new Array(parsed.headers.length).fill('left');
        setOptions(prev => ({ ...prev, columnAlignments: alignments }));
      }
    } else {
      setTableData({ headers: [], rows: [] });
      setResult(null);
    }
  }, [inputText, options.delimiter]);

  const handleConvert = () => {
    if (!tableData.headers.length) return;

    const conversionResult = convertToMarkdown(tableData, options);
    setResult(conversionResult);
  };

  const handleCopy = async () => {
    if (!result) return;
    const success = await copyToClipboard(result.markdown);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    downloadAsFile(result.markdown, `table-${Date.now()}.md`);
  };

  const handleClear = () => {
    setInputText('');
    setTableData({ headers: [], rows: [] });
    setResult(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const text = await readFileAsText(file);
      setInputText(text);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'text/plain' || file.name.match(/\.(txt|csv|tsv)$/))) {
      const text = await readFileAsText(file);
      setInputText(text);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (err) {
      console.error('Failed to read clipboard');
    }
  };

  const handleAlignmentChange = (columnIndex: number, alignment: ColumnAlignment) => {
    const newAlignments = [...options.columnAlignments];
    newAlignments[columnIndex] = alignment;
    setOptions({ ...options, columnAlignments: newAlignments });
  };

  const handleCustomHeaderChange = (index: number, value: string) => {
    const newHeaders = [...options.customHeaders];
    newHeaders[index] = value;
    setOptions({ ...options, customHeaders: newHeaders });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        {/* Settings Panel */}
        <div className="mb-6 space-y-4">
          <h3 className="font-semibold text-gray-900 mb-4">Conversion Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Header Mode</label>
              <select
                value={options.headerMode}
                onChange={(e) => setOptions({ ...options, headerMode: e.target.value as HeaderMode })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-sm"
              >
                <option value="first-row">First Row is Header</option>
                <option value="no-header">No Header (Auto-generate)</option>
                <option value="custom">Custom Headers</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delimiter</label>
              <select
                value={options.delimiter}
                onChange={(e) => setOptions({ ...options, delimiter: e.target.value as DelimiterType })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-sm"
              >
                <option value="auto">Auto Detect</option>
                <option value="tab">Tab</option>
                <option value="comma">Comma (CSV)</option>
                <option value="pipe">Pipe (|)</option>
                <option value="space">Multiple Spaces</option>
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-7">
              <input
                type="checkbox"
                checked={options.prettyFormat}
                onChange={(e) => setOptions({ ...options, prettyFormat: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Pretty Format</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.escapeSpecialChars}
                onChange={(e) => setOptions({ ...options, escapeSpecialChars: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Escape Special Chars</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.wrapInBackticks}
                onChange={(e) => setOptions({ ...options, wrapInBackticks: e.target.checked })}
                className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
              />
              <span className="text-sm text-gray-700">Wrap in Backticks</span>
            </label>
          </div>

          {/* Column Alignments */}
          {tableData.headers.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Column Alignments</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {tableData.headers.map((header, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-sm text-gray-700 truncate flex-1">{header || `Col ${i + 1}`}</span>
                    <select
                      value={options.columnAlignments[i] || 'left'}
                      onChange={(e) => handleAlignmentChange(i, e.target.value as ColumnAlignment)}
                      className="px-2 py-1 border border-gray-300 rounded text-xs"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Headers */}
          {options.headerMode === 'custom' && tableData.headers.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Custom Headers</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {tableData.headers.map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    value={options.customHeaders[i] || ''}
                    onChange={(e) => handleCustomHeaderChange(i, e.target.value)}
                    placeholder={`Header ${i + 1}`}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent text-sm"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleConvert}
              disabled={!tableData.headers.length}
              className="px-6 py-2.5 bg-[#058554] text-white font-medium rounded-lg hover:bg-[#047045] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              📊 Convert to Markdown
            </button>

            <button
              onClick={handleCopy}
              disabled={!result}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              {copied ? '✓ Copied' : '📋 Copy Markdown'}
            </button>

            <button
              onClick={handleDownload}
              disabled={!result}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              💾 Download .md
            </button>

            <button
              onClick={handleClear}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              🗑️ Clear
            </button>
          </div>

          {result && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-blue-600 font-medium text-sm">Rows</div>
                <div className="text-2xl font-bold text-blue-900">{result.rowCount}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-green-600 font-medium text-sm">Columns</div>
                <div className="text-2xl font-bold text-green-900">{result.columnCount}</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-purple-600 font-medium text-sm">Cells</div>
                <div className="text-2xl font-bold text-purple-900">{result.rowCount * result.columnCount}</div>
              </div>
            </div>
          )}
        </div>

        {/* Input and Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Table Input</h3>
              <div className="flex gap-2">
                <button
                  onClick={handlePaste}
                  className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  📋 Paste
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  📁 Upload
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.csv,.tsv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              placeholder="Paste table data from Excel, Google Sheets, CSV, or TSV...&#10;&#10;Example:&#10;Name    Age    City&#10;John    25     London&#10;Sara    30     Paris"
              className="w-full h-96 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e0 #f7fafc'
              }}
            />
            {tableData.headers.length > 0 && (
              <div className="text-sm text-gray-600">
                Detected: {tableData.headers.length} columns, {tableData.rows.length} rows
              </div>
            )}
          </div>

          {/* Output */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Markdown Output</h3>
            <textarea
              value={result?.markdown || ''}
              readOnly
              placeholder="Markdown table will appear here..."
              className="w-full h-96 p-4 border border-gray-300 rounded-xl bg-gray-50 resize-none font-mono text-sm"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e0 #f7fafc'
              }}
            />
          </div>
        </div>

        {/* Preview */}
        {result && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Table Preview</h3>
            <div 
              className="overflow-auto"
              dangerouslySetInnerHTML={{ __html: result.html }}
            />
          </div>
        )}
      </div>

      <SEOContent />
    </div>
  );
}

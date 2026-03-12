'use client';

import React, { useState, useRef } from 'react';
import {
  HashAlgorithm,
  SRIResult,
  BatchResult,
  generateAllHashes,
  fetchResource,
  detectResourceType,
  generateHTMLSnippet,
  readFileAsText,
  formatFileSize,
  parseBatchURLs,
  processBatchURLs,
  exportSnippets,
  downloadTextFile,
} from './logic';
import SRIGeneratorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

type TabType = 'single' | 'batch';

export default function SRIGeneratorUI() {
  const [activeTab, setActiveTab] = useState<TabType>('single');
  
  // Single mode state
  const [url, setUrl] = useState('');
  const [pastedContent, setPastedContent] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<HashAlgorithm>('SHA-384');
  const [results, setResults] = useState<SRIResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resourceType, setResourceType] = useState<'script' | 'style'>('script');
  const [inputMode, setInputMode] = useState<'url' | 'file' | 'paste'>('url');
  
  // Batch mode state
  const [batchUrls, setBatchUrls] = useState('');
  const [batchResults, setBatchResults] = useState<BatchResult[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle URL fetch
  const handleFetchURL = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const content = await fetchResource(url);
      const type = detectResourceType(url);
      setResourceType(type);
      
      const hashes = await generateAllHashes(content);
      setResults(hashes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resource. Check CORS or try paste mode.');
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const content = await readFileAsText(file);
      const type = file.name.endsWith('.css') ? 'style' : 'script';
      setResourceType(type);
      
      const hashes = await generateAllHashes(content);
      setResults(hashes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read file');
    } finally {
      setLoading(false);
    }
  };

  // Handle paste content
  const handlePasteContent = async () => {
    if (!pastedContent.trim()) {
      setError('Please paste some content');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const hashes = await generateAllHashes(pastedContent);
      setResults(hashes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate hashes');
    } finally {
      setLoading(false);
    }
  };

  // Handle batch processing
  const handleBatchProcess = async () => {
    const urls = parseBatchURLs(batchUrls);
    
    if (urls.length === 0) {
      setError('Please enter valid URLs (one per line)');
      return;
    }

    setBatchLoading(true);
    setError('');
    setBatchResults([]);
    setBatchProgress({ current: 0, total: urls.length });

    try {
      const results = await processBatchURLs(
        urls,
        selectedAlgorithm,
        (current, total) => setBatchProgress({ current, total })
      );
      setBatchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Batch processing failed');
    } finally {
      setBatchLoading(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Copy all snippets
  const copyAllSnippets = () => {
    if (activeTab === 'single' && results.length > 0 && url) {
      const selectedResult = results.find(r => r.algorithm === selectedAlgorithm);
      if (selectedResult) {
        const snippet = generateHTMLSnippet(url, selectedResult.integrity, resourceType);
        copyToClipboard(snippet);
      }
    } else if (activeTab === 'batch' && batchResults.length > 0) {
      const content = exportSnippets(batchResults, selectedAlgorithm);
      copyToClipboard(content);
    }
  };

  // Export snippets
  const handleExport = (format: 'txt' | 'html') => {
    const content = exportSnippets(batchResults, selectedAlgorithm);
    const filename = `sri-snippets.${format}`;
    downloadTextFile(content, filename);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {/* Security Notice */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-800 text-center">
            🔒 <strong>100% Secure:</strong> All hashing is performed locally in your browser using Web Crypto API. No data is sent to any server.
          </p>
        </div>

        {/* Tab Mode Selector */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveTab('single')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              activeTab === 'single'
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            🔐 Single Resource
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              activeTab === 'batch'
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            📋 Batch Processing
          </button>
        </div>

      {/* Algorithm Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          Hash Algorithm
        </label>
        <select
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value as HashAlgorithm)}
          className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-384">SHA-384 (Recommended)</option>
          <option value="SHA-512">SHA-512</option>
        </select>
        <p className="text-xs text-gray-600 mt-2">
          SHA-384 is recommended for most use cases as it provides a good balance between security and performance.
        </p>
      </div>

      {/* Single Resource Tab */}
      {activeTab === 'single' && (
        <div className="space-y-6">
          {/* Input Mode Selector */}
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setInputMode('url')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  inputMode === 'url'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                🌐 Fetch URL
              </button>
              <button
                onClick={() => setInputMode('file')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  inputMode === 'file'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                📁 Upload File
              </button>
              <button
                onClick={() => setInputMode('paste')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  inputMode === 'paste'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                📝 Paste Content
              </button>
            </div>

            {/* URL Input */}
            {inputMode === 'url' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Resource URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ fontFamily: 'var(--font-body)' }}
                    onKeyPress={(e) => e.key === 'Enter' && handleFetchURL()}
                  />
                  <button
                    onClick={handleFetchURL}
                    disabled={loading}
                    className="px-6 py-3 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors shadow-md"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {loading ? '⏳ Fetching...' : '🔍 Fetch & Hash'}
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Note: CORS must be enabled on the resource. If fetch fails, use paste mode.
                </p>
              </div>
            )}

            {/* File Upload */}
            {inputMode === 'file' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Upload File
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".js,.css,.mjs,.cjs"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-900 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover file:shadow-md file:transition-colors"
                />
                <p className="text-xs text-gray-600 mt-2">
                  Upload a local JavaScript or CSS file to generate its SRI hash.
                </p>
              </div>
            )}

            {/* Paste Content */}
            {inputMode === 'paste' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Paste Script/Stylesheet Content
                </label>
                <textarea
                  value={pastedContent}
                  onChange={(e) => setPastedContent(e.target.value)}
                  placeholder="Paste your script or stylesheet content here..."
                  rows={8}
                  className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y font-mono"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-600">
                    {pastedContent.length > 0 && `${formatFileSize(new TextEncoder().encode(pastedContent).length)}`}
                  </p>
                  <div className="flex gap-2 items-center">
                    <label className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-heading)' }}>
                      Type:
                      <select
                        value={resourceType}
                        onChange={(e) => setResourceType(e.target.value as 'script' | 'style')}
                        className="ml-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        <option value="script">Script</option>
                        <option value="style">Stylesheet</option>
                      </select>
                    </label>
                    <button
                      onClick={handlePasteContent}
                      disabled={loading}
                      className="px-6 py-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors shadow-md text-sm"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {loading ? '⏳ Hashing...' : '🔐 Generate Hash'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Results Display */}
          {results.length > 0 && (
            <div className="space-y-4">
              {/* All Hash Algorithms */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  📊 Generated Hashes (All Algorithms)
                </h3>
                <div className="space-y-4">
                  {results.map((result) => (
                    <div key={result.algorithm} className="bg-white border border-blue-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                            {result.algorithm}
                          </span>
                          {result.algorithm === selectedAlgorithm && (
                            <span className="px-2 py-1 bg-primary text-white text-xs rounded-lg font-semibold">
                              Selected
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => copyToClipboard(result.integrity)}
                          className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          📋 Copy Hash
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm break-all text-gray-800">
                        {result.integrity}
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        Base64 Length: {result.hash.length} characters
                        {result.size && ` • Resource Size: ${formatFileSize(result.size)}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HTML Snippet */}
              {(url || inputMode === 'file') && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                      📝 HTML Snippet ({selectedAlgorithm})
                    </h3>
                    <button
                      onClick={() => {
                        const result = results.find(r => r.algorithm === selectedAlgorithm);
                        if (result) {
                          const snippet = generateHTMLSnippet(url || 'YOUR_URL_HERE', result.integrity, resourceType);
                          copyToClipboard(snippet);
                        }
                      }}
                      className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-colors shadow-md"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      📋 Copy Snippet
                    </button>
                  </div>
                  <div className="bg-white rounded-xl p-4 font-mono text-sm overflow-x-auto border border-purple-100">
                    <pre className="text-gray-800">
                      {(() => {
                        const result = results.find(r => r.algorithm === selectedAlgorithm);
                        return result ? generateHTMLSnippet(url || 'YOUR_URL_HERE', result.integrity, resourceType) : '';
                      })()}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Batch Processing Tab */}
      {activeTab === 'batch' && (
        <div className="space-y-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Resource URLs (one per line)
            </label>
            <textarea
              value={batchUrls}
              onChange={(e) => setBatchUrls(e.target.value)}
              placeholder="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js&#10;https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css&#10;https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.js"
              rows={8}
              className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y font-mono"
              style={{ fontFamily: 'var(--font-body)' }}
            />
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                {parseBatchURLs(batchUrls).length} valid URLs detected
              </p>
              <button
                onClick={handleBatchProcess}
                disabled={batchLoading}
                className="px-6 py-3 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors shadow-md"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {batchLoading ? `⏳ Processing ${batchProgress.current}/${batchProgress.total}...` : '🚀 Process All'}
              </button>
            </div>
          </div>

          {/* Batch Results */}
          {batchResults.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                  📊 Batch Results ({batchResults.length})
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyAllSnippets}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-colors shadow-md"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    📋 Copy All Snippets
                  </button>
                  <button
                    onClick={() => handleExport('txt')}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    💾 Export TXT
                  </button>
                  <button
                    onClick={() => handleExport('html')}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-md"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    💾 Export HTML
                  </button>
                </div>
              </div>

              {batchResults.map((result, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          result.type === 'script'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`} style={{ fontFamily: 'var(--font-heading)' }}>
                          {result.type === 'script' ? '📜 Script' : '🎨 Stylesheet'}
                        </span>
                        {result.error && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                            ❌ Error
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 break-all" style={{ fontFamily: 'var(--font-body)' }}>{result.url}</p>
                    </div>
                    {!result.error && (
                      <button
                        onClick={() => {
                          const sriResult = result.results.find(r => r.algorithm === selectedAlgorithm);
                          if (sriResult) {
                            const snippet = generateHTMLSnippet(result.url, sriResult.integrity, result.type);
                            copyToClipboard(snippet);
                          }
                        }}
                        className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ml-4"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        📋 Copy Snippet
                      </button>
                    )}
                  </div>

                  {result.error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-800" style={{ fontFamily: 'var(--font-body)' }}>{result.error}</p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm overflow-x-auto border border-gray-200">
                      <pre className="text-gray-800">
                        {(() => {
                          const sriResult = result.results.find(r => r.algorithm === selectedAlgorithm);
                          return sriResult ? generateHTMLSnippet(result.url, sriResult.integrity, result.type) : '';
                        })()}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      </div>
      
      <SRIGeneratorSEOContent />
      
      <RelatedTools
        currentTool="sri-generator"
        tools={['file-hash-generator', 'text-encryptor-aes', 'password-generator']}
      />
    </>
  );
}

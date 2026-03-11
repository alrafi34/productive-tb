'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Upload, FileText, Shield, List, History, Download, X, CheckCircle, XCircle } from 'lucide-react';
import { HashAlgorithm, HashOptions, FileHashResult, BulkHashItem, VerificationResult } from './types';
import {
  processInput,
  generateHash,
  generateAllHashes,
  formatHashCase,
  getHashLength,
  hashFile,
  generateBulkHashes,
  verifyHash,
  exportAsText,
  exportAsJSON,
  downloadFile,
  saveToHistory,
  getHistory,
  clearHistory
} from './logic';
import HashGeneratorSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

type Tab = 'text' | 'file' | 'bulk' | 'verify';

export default function HashGeneratorUI() {
  const [activeTab, setActiveTab] = useState<Tab>('text');
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [options, setOptions] = useState<HashOptions>({
    algorithm: 'SHA-256',
    trimWhitespace: false,
    normalizeCase: 'none',
    outputCase: 'lowercase'
  });
  
  // Text hash results
  const [hash, setHash] = useState('');
  const [allHashes, setAllHashes] = useState({ md5: '', sha1: '', sha256: '' });
  const [showAllHashes, setShowAllHashes] = useState(false);
  
  // Copy states
  const [copied, setCopied] = useState<string | null>(null);
  
  // File hash
  const [fileResult, setFileResult] = useState<FileHashResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Bulk hash
  const [bulkInput, setBulkInput] = useState('');
  const [bulkResults, setBulkResults] = useState<BulkHashItem[]>([]);
  const [bulkAlgorithm, setBulkAlgorithm] = useState<HashAlgorithm>('SHA-256');
  
  // Verification
  const [verifyInput, setVerifyInput] = useState('');
  const [verifyHashValue, setVerifyHashValue] = useState('');
  const [verifyAlgorithm, setVerifyAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [verifyResult, setVerifyResult] = useState<VerificationResult | null>(null);
  
  // History
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Generate hash on input change
  useEffect(() => {
    const generateHashAsync = async () => {
      if (!input) {
        setHash('');
        setAllHashes({ md5: '', sha1: '', sha256: '' });
        return;
      }

      const processed = processInput(input, options);
      
      if (showAllHashes) {
        const hashes = await generateAllHashes(processed);
        setAllHashes({
          md5: formatHashCase(hashes.md5, options.outputCase),
          sha1: formatHashCase(hashes.sha1, options.outputCase),
          sha256: formatHashCase(hashes.sha256, options.outputCase)
        });
      } else {
        const result = await generateHash(processed, algorithm);
        const formatted = formatHashCase(result, options.outputCase);
        setHash(formatted);
        
        // Save to history
        if (typeof window !== 'undefined') {
          saveToHistory({
            algorithm,
            hash: formatted,
            length: getHashLength(algorithm),
            timestamp: Date.now()
          });
          setHistory(getHistory());
        }
      }
    };

    generateHashAsync();
  }, [input, algorithm, options, showAllHashes]);

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await hashFile(file);
      setFileResult({
        ...result,
        md5: formatHashCase(result.md5, options.outputCase),
        sha1: formatHashCase(result.sha1, options.outputCase),
        sha256: formatHashCase(result.sha256, options.outputCase)
      });
    } catch (error) {
      console.error('File hashing failed:', error);
    }
  };

  // Generate bulk hashes
  const handleBulkGenerate = async () => {
    const lines = bulkInput.split('\n').filter(line => line.trim());
    if (lines.length === 0) return;

    const results = await generateBulkHashes(lines, bulkAlgorithm);
    setBulkResults(results.map(r => ({
      ...r,
      hash: formatHashCase(r.hash, options.outputCase)
    })));
  };

  // Verify hash
  const handleVerify = async () => {
    if (!verifyInput || !verifyHashValue) return;

    const result = await verifyHash(verifyInput, verifyHashValue, verifyAlgorithm);
    setVerifyResult(result);
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Export bulk results
  const handleExport = (format: 'txt' | 'json') => {
    if (bulkResults.length === 0) return;

    const content = format === 'txt' ? exportAsText(bulkResults) : exportAsJSON(bulkResults);
    const filename = `bulk-hashes-${Date.now()}.${format}`;
    downloadFile(content, filename, format === 'txt' ? 'text/plain' : 'application/json');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Hash Generator
          </h1>
          <p className="text-slate-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Generate MD5, SHA-1, and SHA-256 hashes instantly
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { id: 'text' as Tab, label: 'Text Hash', icon: FileText },
            { id: 'file' as Tab, label: 'File Hash', icon: Upload },
            { id: 'bulk' as Tab, label: 'Bulk Hash', icon: List },
            { id: 'verify' as Tab, label: 'Verify Hash', icon: Shield }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#058554] text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Text Hash Tab */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            {/* Options */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#058554]" />
                Hash Options
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Algorithm */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Algorithm</label>
                  <select
                    value={algorithm}
                    onChange={(e) => {
                      const algo = e.target.value as HashAlgorithm;
                      setAlgorithm(algo);
                      setOptions({ ...options, algorithm: algo });
                    }}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                  >
                    <option value="MD5">MD5 (32 chars)</option>
                    <option value="SHA-1">SHA-1 (40 chars)</option>
                    <option value="SHA-256">SHA-256 (64 chars)</option>
                  </select>
                </div>

                {/* Output Case */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Output Case</label>
                  <select
                    value={options.outputCase}
                    onChange={(e) => setOptions({ ...options, outputCase: e.target.value as 'lowercase' | 'uppercase' })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                  >
                    <option value="lowercase">Lowercase</option>
                    <option value="uppercase">Uppercase</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.trimWhitespace}
                    onChange={(e) => setOptions({ ...options, trimWhitespace: e.target.checked })}
                    className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
                  />
                  <span className="text-sm text-slate-700">Trim Whitespace</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showAllHashes}
                    onChange={(e) => setShowAllHashes(e.target.checked)}
                    className="w-4 h-4 text-[#058554] rounded focus:ring-[#058554]"
                  />
                  <span className="text-sm text-slate-700">Show All Hashes</span>
                </label>
              </div>

              {/* Normalize Case */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Normalize Input</label>
                <div className="flex gap-2">
                  {['none', 'uppercase', 'lowercase'].map(norm => (
                    <button
                      key={norm}
                      onClick={() => setOptions({ ...options, normalizeCase: norm as any })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        options.normalizeCase === norm
                          ? 'bg-[#058554] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {norm === 'none' ? 'None' : norm === 'uppercase' ? 'UPPER' : 'lower'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-3">
              <label className="block text-sm font-medium text-slate-700">Input Text</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to hash..."
                className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm"
              />
            </div>

            {/* Output */}
            {showAllHashes ? (
              <div className="space-y-3">
                {[
                  { label: 'MD5', value: allHashes.md5, id: 'md5' },
                  { label: 'SHA-1', value: allHashes.sha1, id: 'sha1' },
                  { label: 'SHA-256', value: allHashes.sha256, id: 'sha256' }
                ].map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{item.label} ({item.value.length} chars)</span>
                      <button
                        onClick={() => copyToClipboard(item.value, item.id)}
                        disabled={!item.value}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                      >
                        {copied === item.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied === item.id ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg font-mono text-sm break-all text-slate-800">
                      {item.value || 'Hash will appear here...'}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => copyToClipboard(`MD5: ${allHashes.md5}\nSHA-1: ${allHashes.sha1}\nSHA-256: ${allHashes.sha256}`, 'all')}
                  disabled={!allHashes.md5}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  {copied === 'all' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied === 'all' ? 'All Copied!' : 'Copy All Hashes'}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {algorithm} Hash ({getHashLength(algorithm)} chars)
                  </span>
                  <button
                    onClick={() => copyToClipboard(hash, 'single')}
                    disabled={!hash}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                  >
                    {copied === 'single' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied === 'single' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg font-mono text-sm break-all text-slate-800">
                  {hash || 'Hash will appear here...'}
                </div>
              </div>
            )}

            {/* History */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-2 text-slate-700 hover:text-[#058554] transition-colors"
                >
                  <History className="w-5 h-5" />
                  <span className="font-medium">History ({history.length})</span>
                </button>
                {history.length > 0 && (
                  <button
                    onClick={() => {
                      clearHistory();
                      setHistory([]);
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              {showHistory && history.length > 0 && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg space-y-1">
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="font-medium">{item.algorithm}</span>
                        <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="font-mono text-xs break-all text-slate-800">{item.hash}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* File Hash Tab */}
        {activeTab === 'file' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#058554]" />
                Upload File to Hash
              </h3>

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-slate-300 rounded-lg hover:border-[#058554] hover:bg-slate-50 transition-all"
              >
                <Upload className="w-6 h-6 text-slate-400" />
                <span className="text-slate-600">Click to upload file</span>
              </button>

              {fileResult && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{fileResult.fileName}</p>
                      <p className="text-sm text-slate-600">{(fileResult.fileSize / 1024).toFixed(2)} KB</p>
                    </div>
                    <button
                      onClick={() => setFileResult(null)}
                      className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {[
                    { label: 'MD5', value: fileResult.md5, id: 'file-md5' },
                    { label: 'SHA-1', value: fileResult.sha1, id: 'file-sha1' },
                    { label: 'SHA-256', value: fileResult.sha256, id: 'file-sha256' }
                  ].map(item => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">{item.label}</span>
                        <button
                          onClick={() => copyToClipboard(item.value, item.id)}
                          className="flex items-center gap-1 px-2 py-1 text-sm bg-[#058554] text-white rounded hover:bg-[#047045] transition-all"
                        >
                          {copied === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copied === item.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <div className="p-2 bg-slate-50 rounded font-mono text-xs break-all text-slate-800">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bulk Hash Tab */}
        {activeTab === 'bulk' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <List className="w-5 h-5 text-[#058554]" />
                Bulk Hash Generator
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Algorithm</label>
                <select
                  value={bulkAlgorithm}
                  onChange={(e) => setBulkAlgorithm(e.target.value as HashAlgorithm)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                >
                  <option value="MD5">MD5</option>
                  <option value="SHA-1">SHA-1</option>
                  <option value="SHA-256">SHA-256</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Input (one per line)
                </label>
                <textarea
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder="Enter multiple lines to hash..."
                  className="w-full h-40 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm"
                />
              </div>

              <button
                onClick={handleBulkGenerate}
                disabled={!bulkInput.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                Generate Hashes
              </button>

              {bulkResults.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">
                      Results ({bulkResults.length})
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleExport('txt')}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        TXT
                      </button>
                      <button
                        onClick={() => handleExport('json')}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        JSON
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {bulkResults.map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg space-y-2">
                        <div className="text-sm text-slate-600 font-medium">Input: {item.input}</div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-mono text-xs break-all text-slate-800 flex-1">
                            {item.hash}
                          </div>
                          <button
                            onClick={() => copyToClipboard(item.hash, `bulk-${idx}`)}
                            className="flex-shrink-0 p-1.5 text-[#058554] hover:bg-[#058554] hover:text-white rounded transition-all"
                          >
                            {copied === `bulk-${idx}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Verify Hash Tab */}
        {activeTab === 'verify' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 space-y-4">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#058554]" />
                Hash Verification
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Algorithm</label>
                <select
                  value={verifyAlgorithm}
                  onChange={(e) => setVerifyAlgorithm(e.target.value as HashAlgorithm)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent"
                >
                  <option value="MD5">MD5</option>
                  <option value="SHA-1">SHA-1</option>
                  <option value="SHA-256">SHA-256</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Input Text</label>
                <textarea
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                  placeholder="Enter text to verify..."
                  className="w-full h-24 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent resize-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Expected Hash</label>
                <input
                  type="text"
                  value={verifyHashValue}
                  onChange={(e) => setVerifyHashValue(e.target.value)}
                  placeholder="Enter expected hash..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#058554] focus:border-transparent font-mono text-sm"
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={!verifyInput || !verifyHashValue}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                Verify Hash
              </button>

              {verifyResult && (
                <div className={`p-4 rounded-lg ${verifyResult.match ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {verifyResult.match ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="font-semibold text-green-800">Hash Match!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 text-red-600" />
                        <span className="font-semibold text-red-800">Hash Mismatch</span>
                      </>
                    )}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">Expected:</span>
                      <div className="font-mono text-xs break-all mt-1 text-slate-600">{verifyResult.expected}</div>
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Actual:</span>
                      <div className="font-mono text-xs break-all mt-1 text-slate-600">{verifyResult.actual}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <HashGeneratorSEOContent />
      <RelatedTools
        currentTool="hash-generator"
        tools={["password-generator", "text-encrypt-decrypt", "username-generator"]}
      />
    </div>
  );
}

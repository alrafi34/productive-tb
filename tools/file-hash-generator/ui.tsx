"use client";

import { useState, useRef, DragEvent } from "react";
import {
  hashFile,
  hashFileMultiple,
  compareHashes,
  extractFileInfo,
  formatFileSize,
  formatDate,
  formatHashForDisplay,
  generateJSONFingerprint,
  generateCSVFingerprint,
  generateTXTFingerprint,
  downloadFile,
  type HashAlgorithm,
  type FileInfo,
  type HashResult
} from "./logic";
import FileHashGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function FileHashGeneratorUI() {
  const [file, setFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<HashAlgorithm[]>(["SHA-256"]);
  const [hashes, setHashes] = useState<Partial<Record<HashAlgorithm, string>>>({});
  const [progress, setProgress] = useState<number>(0);
  const [isHashing, setIsHashing] = useState(false);
  const [status, setStatus] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState<string>("");
  
  // Comparison
  const [compareHash, setCompareHash] = useState("");
  const [comparisonResult, setComparisonResult] = useState<boolean | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const algorithms: HashAlgorithm[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

  function handleFileSelect(selectedFile: File) {
    setFile(selectedFile);
    setFileInfo(extractFileInfo(selectedFile));
    setHashes({});
    setProgress(0);
    setStatus("");
    setComparisonResult(null);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }

  function toggleAlgorithm(algorithm: HashAlgorithm) {
    setSelectedAlgorithms(prev => {
      if (prev.includes(algorithm)) {
        return prev.filter(a => a !== algorithm);
      } else {
        return [...prev, algorithm];
      }
    });
  }

  async function handleGenerateHash() {
    if (!file || selectedAlgorithms.length === 0) return;
    
    setIsHashing(true);
    setStatus("Processing file...");
    setProgress(0);
    setHashes({});
    
    try {
      const results: Partial<Record<HashAlgorithm, string>> = {};
      
      for (let i = 0; i < selectedAlgorithms.length; i++) {
        const algorithm = selectedAlgorithms[i];
        setStatus(`Hashing with ${algorithm}...`);
        
        const hash = await hashFile(file, algorithm, (prog) => {
          const overallProgress = ((i / selectedAlgorithms.length) + (prog / 100 / selectedAlgorithms.length)) * 100;
          setProgress(overallProgress);
        });
        
        results[algorithm] = hash;
        setHashes(prev => ({ ...prev, [algorithm]: hash }));
      }
      
      setProgress(100);
      setStatus("✅ Hashing complete");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("❌ Error generating hash");
      setTimeout(() => setStatus(""), 3000);
    }
    
    setIsHashing(false);
  }

  function handleCompare() {
    if (!compareHash || Object.keys(hashes).length === 0) return;
    
    const primaryHash = hashes[selectedAlgorithms[0]];
    if (primaryHash) {
      const match = compareHashes(primaryHash, compareHash);
      setComparisonResult(match);
    }
  }

  function handleCopy(text: string, type: string) {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  }

  function handleExport(format: 'txt' | 'json' | 'csv') {
    if (!file || !fileInfo || Object.keys(hashes).length === 0) return;
    
    const primaryAlgorithm = selectedAlgorithms[0];
    const primaryHash = hashes[primaryAlgorithm];
    
    if (!primaryHash) return;
    
    const result: HashResult = {
      algorithm: primaryAlgorithm,
      hash: primaryHash,
      file: fileInfo,
      timestamp: Date.now()
    };
    
    switch (format) {
      case 'txt':
        downloadFile(generateTXTFingerprint(result), `${file.name}.hash.txt`);
        break;
      case 'json':
        downloadFile(generateJSONFingerprint(result), `${file.name}.hash.json`, 'application/json');
        break;
      case 'csv':
        const allResults: HashResult[] = selectedAlgorithms
          .filter(alg => hashes[alg])
          .map(alg => ({
            algorithm: alg,
            hash: hashes[alg]!,
            file: fileInfo,
            timestamp: Date.now()
          }));
        downloadFile(generateCSVFingerprint(allResults), `${file.name}.hash.csv`, 'text/csv');
        break;
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Security Notice */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-800 text-center">
            🔒 <strong>100% Secure:</strong> Files are processed locally in your browser. No files are uploaded to any server.
          </p>
        </div>

        {/* File Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mb-6 border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-primary bg-blue-50"
              : "border-gray-300 hover:border-primary hover:bg-gray-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="text-5xl mb-4">📁</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            {isDragging ? "Drop file here" : "Click or drag file here"}
          </h3>
          <p className="text-sm text-gray-600">Any file type supported</p>
        </div>

        {/* File Info Panel */}
        {fileInfo && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              📄 File Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">File Name:</span>
                <p className="text-gray-800 break-all">{fileInfo.name}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">File Size:</span>
                <p className="text-gray-800">{formatFileSize(fileInfo.size)}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">File Type:</span>
                <p className="text-gray-800">{fileInfo.type}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Last Modified:</span>
                <p className="text-gray-800">{formatDate(fileInfo.lastModified)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Algorithm Selection */}
        {file && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Hash Algorithms
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {algorithms.map(algorithm => (
                <button
                  key={algorithm}
                  onClick={() => toggleAlgorithm(algorithm)}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    selectedAlgorithms.includes(algorithm)
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {algorithm}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Generate Button */}
        {file && (
          <div className="mb-6">
            <button
              onClick={handleGenerateHash}
              disabled={isHashing || selectedAlgorithms.length === 0}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-md"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {isHashing ? "⏳ Generating Hash..." : "🔑 Generate Hash"}
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {isHashing && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">{status}</span>
              <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Status Message */}
        {status && !isHashing && (
          <div className={`mb-6 text-center text-sm font-semibold ${
            status.includes("✅") ? "text-green-600" : status.includes("❌") ? "text-red-600" : "text-blue-600"
          }`}>
            {status}
          </div>
        )}

        {/* Hash Results */}
        {Object.keys(hashes).length > 0 && (
          <div className="mb-6 space-y-4">
            {selectedAlgorithms.map(algorithm => {
              const hash = hashes[algorithm];
              if (!hash) return null;
              
              return (
                <div key={algorithm} className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                      {algorithm}
                    </h3>
                    <button
                      onClick={() => handleCopy(hash, algorithm)}
                      className="text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {copied === algorithm ? "✅ Copied!" : "📋 Copy"}
                    </button>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-xs text-gray-800 break-all font-mono">
                    {formatHashForDisplay(hash)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Hash Comparison Tool */}
        {Object.keys(hashes).length > 0 && (
          <div className="mb-6 bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              🔍 Hash Comparison Tool
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Paste hash to compare
              </label>
              <textarea
                value={compareHash}
                onChange={e => setCompareHash(e.target.value)}
                placeholder="Paste hash here..."
                rows={3}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>
            <button
              onClick={handleCompare}
              disabled={!compareHash}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Compare Hashes
            </button>
            
            {comparisonResult !== null && (
              <div className={`mt-4 p-4 rounded-lg ${
                comparisonResult ? "bg-green-100 border border-green-300" : "bg-red-100 border border-red-300"
              }`}>
                <p className={`text-center font-semibold ${
                  comparisonResult ? "text-green-800" : "text-red-800"
                }`}>
                  {comparisonResult ? "✅ Hashes Match!" : "❌ Hashes Do Not Match"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Export Options */}
        {Object.keys(hashes).length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Export Fingerprint
            </label>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => handleExport('txt')}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                📄 Export TXT
              </button>
              <button
                onClick={() => handleExport('json')}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                📦 Export JSON
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                📊 Export CSV
              </button>
            </div>
          </div>
        )}

        {/* Reset Button */}
        {file && (
          <div className="flex gap-3">
            <button
              onClick={() => {
                setFile(null);
                setFileInfo(null);
                setHashes({});
                setProgress(0);
                setStatus("");
                setCompareHash("");
                setComparisonResult(null);
              }}
              className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              🗑️ Reset
            </button>
          </div>
        )}
      </div>
      
      <FileHashGeneratorSEOContent />
      
      <RelatedTools
        currentTool="file-hash-generator"
        tools={['text-encryptor-aes', 'hash-generator', 'password-generator']}
      />
    </>
  );
}

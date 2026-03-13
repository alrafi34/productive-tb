"use client";

import { useState, useCallback, useEffect } from "react";
import {
  decodeJWT,
  analyzeToken,
  saveToHistory,
  getHistory,
  clearHistory,
  EXAMPLE_TOKENS,
  type JWTDecoded,
  type TokenAnalysis,
} from "./logic";
import JWTDebuggerSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function JWTDebuggerUI() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<JWTDecoded | null>(null);
  const [analysis, setAnalysis] = useState<TokenAnalysis | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  useEffect(() => {
    if (token.trim()) {
      const result = decodeJWT(token);
      setDecoded(result);
      if (result.isValid) {
        setAnalysis(analyzeToken(result));
      }
    } else {
      setDecoded(null);
      setAnalysis(null);
    }
  }, [token]);

  const handleCopy = useCallback((text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const handleDecode = useCallback(() => {
    if (decoded?.isValid && token.trim()) {
      saveToHistory(token, decoded);
      setHistory(getHistory());
    }
  }, [decoded, token]);

  const handleLoadExample = useCallback((key: keyof typeof EXAMPLE_TOKENS) => {
    setToken(EXAMPLE_TOKENS[key]);
  }, []);

  const handleLoadFromHistory = useCallback((fullToken: string) => {
    setToken(fullToken);
    setShowHistory(false);
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = (event.target?.result as string).trim();
        setToken(content);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith(".txt") || file.name.endsWith(".jwt"))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = (event.target?.result as string).trim();
        setToken(content);
      };
      reader.readAsText(file);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">JWT Debugger</h1>
            <p className="text-sm text-gray-600">
              Decode and inspect JSON Web Tokens instantly. All processing happens locally in your browser.
            </p>
            <p className="text-xs text-green-600 mt-2">
              ✓ Tokens are decoded locally and never leave your browser
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-4">
              {/* Input Area */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="rounded-xl border-2 border-dashed border-gray-300 bg-white"
              >
                <textarea
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste your JWT token here or drag & drop a .jwt file..."
                  rows={8}
                  className="w-full p-4 rounded-xl border-0 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Controls */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3 items-center">
                  <label className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">
                    📁 Upload JWT
                    <input
                      type="file"
                      accept=".jwt,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="px-4 py-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
                    title="View history"
                  >
                    📜 History ({history.length})
                  </button>

                  <button
                    onClick={() => setToken("")}
                    disabled={!token}
                    className="px-4 py-2 rounded-lg transition-colors disabled:opacity-40 bg-red-100 hover:bg-red-200 text-red-700 text-sm"
                  >
                    🗑️ Clear
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleLoadExample("simple")}
                    className="px-3 py-2 rounded-lg transition-colors bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs"
                  >
                    📋 Simple Token
                  </button>
                  <button
                    onClick={() => handleLoadExample("withExpiration")}
                    className="px-3 py-2 rounded-lg transition-colors bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs"
                  >
                    📋 With Expiration
                  </button>
                  <button
                    onClick={() => handleLoadExample("oauth")}
                    className="px-3 py-2 rounded-lg transition-colors bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs"
                  >
                    📋 OAuth Token
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleDecode}
                disabled={!decoded?.isValid}
                className="w-full px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-blue-100 hover:bg-blue-200 text-blue-700"
              >
                🔓 Decode Token
              </button>
            </div>

            {/* Sidebar - Status & Analysis */}
            <div className="space-y-4">
              {/* Status */}
              {decoded && (
                <div
                  className={`rounded-xl p-4 border ${
                    decoded.isValid
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div
                    className={`font-semibold mb-2 ${
                      decoded.isValid ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {decoded.isValid ? "✓ Valid JWT" : "✗ Invalid JWT"}
                  </div>
                  {decoded.error && (
                    <p className="text-sm text-red-600">{decoded.error}</p>
                  )}
                </div>
              )}

              {/* Token Analysis */}
              {analysis && decoded?.isValid && (
                <div className="rounded-xl p-4 border bg-gray-50 border-gray-200">
                  <h3 className="font-semibold mb-3 text-gray-900">📊 Analysis</h3>
                  <div className="space-y-2 text-sm">
                    {analysis.expirationTime && (
                      <div>
                        <span className="text-gray-600">Expiration:</span>
                        <div className="font-mono text-xs mt-1 p-2 bg-white rounded border border-gray-200">
                          {analysis.expirationTime}
                        </div>
                        {analysis.isExpired && (
                          <p className="text-red-600 text-xs mt-1">⚠️ Token is expired</p>
                        )}
                      </div>
                    )}
                    {analysis.issuedAt && (
                      <div>
                        <span className="text-gray-600">Issued At:</span>
                        <div className="font-mono text-xs mt-1 p-2 bg-white rounded border border-gray-200">
                          {analysis.issuedAt}
                        </div>
                      </div>
                    )}
                    {analysis.issuer && (
                      <div>
                        <span className="text-gray-600">Issuer:</span>
                        <div className="font-mono text-xs mt-1 p-2 bg-white rounded border border-gray-200 break-all">
                          {analysis.issuer}
                        </div>
                      </div>
                    )}
                    {analysis.audience && (
                      <div>
                        <span className="text-gray-600">Audience:</span>
                        <div className="font-mono text-xs mt-1 p-2 bg-white rounded border border-gray-200 break-all">
                          {analysis.audience}
                        </div>
                      </div>
                    )}
                    {analysis.subject && (
                      <div>
                        <span className="text-gray-600">Subject:</span>
                        <div className="font-mono text-xs mt-1 p-2 bg-white rounded border border-gray-200 break-all">
                          {analysis.subject}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* History Panel */}
          {showHistory && history.length > 0 && (
            <div className="mt-6 rounded-xl p-4 border bg-gray-50 border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">📜 Recent Tokens</h3>
                <button
                  onClick={() => {
                    clearHistory();
                    setHistory([]);
                  }}
                  className="text-sm px-3 py-1 rounded transition-colors bg-red-100 hover:bg-red-200 text-red-700"
                >
                  Clear History
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLoadFromHistory(item.fullToken)}
                    className="w-full text-left p-2 rounded transition-colors text-sm font-mono bg-white hover:bg-gray-100 text-gray-700"
                  >
                    <div className="truncate">{item.token}...</div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Decoded Sections */}
          {decoded?.isValid && (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Header */}
              <div className="rounded-xl p-4 border bg-gray-50 border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900">Header</h3>
                  <button
                    onClick={() =>
                      handleCopy(JSON.stringify(decoded.header, null, 2), "header")
                    }
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      copied === "header"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {copied === "header" ? "✓ Copied" : "📋 Copy"}
                  </button>
                </div>
                <pre className="text-xs overflow-x-auto p-3 rounded bg-white border border-gray-200 text-gray-800 whitespace-pre-wrap break-words">
                  {JSON.stringify(decoded.header, null, 2)}
                </pre>
              </div>

              {/* Payload */}
              <div className="rounded-xl p-4 border bg-gray-50 border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900">Payload</h3>
                  <button
                    onClick={() =>
                      handleCopy(JSON.stringify(decoded.payload, null, 2), "payload")
                    }
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      copied === "payload"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {copied === "payload" ? "✓ Copied" : "📋 Copy"}
                  </button>
                </div>
                <pre className="text-xs overflow-x-auto p-3 rounded bg-white border border-gray-200 text-gray-800 whitespace-pre-wrap break-words">
                  {JSON.stringify(decoded.payload, null, 2)}
                </pre>
              </div>

              {/* Signature */}
              <div className="rounded-xl p-4 border bg-gray-50 border-gray-200 lg:col-span-2">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900">Signature</h3>
                  <button
                    onClick={() => handleCopy(decoded.signature, "signature")}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      copied === "signature"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {copied === "signature" ? "✓ Copied" : "📋 Copy"}
                  </button>
                </div>
                <pre className="text-xs overflow-x-auto p-3 rounded bg-white border border-gray-200 text-gray-800 break-all">
                  {decoded.signature}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      <JWTDebuggerSEOContent />

      <RelatedTools
        currentTool="jwt-debugger"
        tools={["json-validator", "base64-encoder-decoder", "hash-generator"]}
      />
    </>
  );
}

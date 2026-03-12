"use client";

import { useState, useEffect } from "react";
import {
  verifyPassword,
  generateHash,
  batchVerifyPasswords,
  extractHashMetadata,
  analyzeHashStrength,
  getVersionDescription,
  estimateHashTime,
  type HashMetadata,
  type VerificationResult
} from "./logic";
import BcryptHashVerifierSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type TabMode = "verify" | "generate" | "batch";

export default function BcryptHashVerifierUI() {
  const [tabMode, setTabMode] = useState<TabMode>("verify");
  
  // Verify mode
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Generate mode
  const [genPassword, setGenPassword] = useState("");
  const [genCost, setGenCost] = useState(10);
  const [generatedHash, setGeneratedHash] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Batch mode
  const [batchPasswords, setBatchPasswords] = useState("");
  const [batchHash, setBatchHash] = useState("");
  const [batchResults, setBatchResults] = useState<{ password: string; matches: boolean }[]>([]);
  const [isBatchVerifying, setIsBatchVerifying] = useState(false);
  
  const [copied, setCopied] = useState<string>("");

  // Auto-verify when both fields are filled
  useEffect(() => {
    if (tabMode === "verify" && password && hash && hash.length > 20) {
      handleVerify();
    }
  }, [password, hash, tabMode]);

  async function handleVerify() {
    if (!password || !hash) return;
    
    setIsVerifying(true);
    const result = await verifyPassword(password, hash);
    setVerificationResult(result);
    setIsVerifying(false);
  }

  async function handleGenerate() {
    if (!genPassword) return;
    
    setIsGenerating(true);
    try {
      const hash = await generateHash(genPassword, genCost);
      setGeneratedHash(hash);
    } catch (error) {
      setGeneratedHash("Error: " + (error as Error).message);
    }
    setIsGenerating(false);
  }

  async function handleBatchVerify() {
    if (!batchPasswords || !batchHash) return;
    
    setIsBatchVerifying(true);
    const passwords = batchPasswords.split('\n').filter(p => p.trim());
    const results = await batchVerifyPasswords(passwords, batchHash);
    setBatchResults(results);
    setIsBatchVerifying(false);
  }

  function handleCopy(text: string, type: string) {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  }

  const metadata = hash ? extractHashMetadata(hash) : null;
  const strength = metadata ? analyzeHashStrength(metadata.cost) : null;

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Security Notice */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-800 text-center">
            🔒 <strong>100% Secure:</strong> All password verification happens locally in your browser. No data is sent to any server.
          </p>
        </div>

        {/* Tab Mode Selector */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setTabMode("verify")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              tabMode === "verify"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ✅ Verify Hash
          </button>
          <button
            onClick={() => setTabMode("generate")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              tabMode === "generate"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            🔑 Generate Hash
          </button>
          <button
            onClick={() => setTabMode("batch")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              tabMode === "batch"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            📋 Batch Verify
          </button>
        </div>

        {/* Verify Mode */}
        {tabMode === "verify" && (
          <>
            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password to verify..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Hash Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Bcrypt Hash
              </label>
              <textarea
                value={hash}
                onChange={e => setHash(e.target.value)}
                placeholder="$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36E6BjL8E6n9qY0x1B9dZ3G"
                rows={3}
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            {/* Verification Status */}
            {isVerifying && (
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-6 py-3">
                  <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                  <span className="text-sm font-semibold text-blue-800">Verifying...</span>
                </div>
              </div>
            )}

            {/* Verification Result */}
            {verificationResult && !isVerifying && (
              <div className={`mb-6 rounded-xl border-2 p-6 ${
                verificationResult.error
                  ? "bg-red-50 border-red-300"
                  : verificationResult.matches
                  ? "bg-green-50 border-green-300"
                  : "bg-red-50 border-red-300"
              }`}>
                <div className="text-center">
                  <div className="text-5xl mb-3">
                    {verificationResult.error ? "⚠️" : verificationResult.matches ? "✅" : "❌"}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    verificationResult.error
                      ? "text-red-800"
                      : verificationResult.matches
                      ? "text-green-800"
                      : "text-red-800"
                  }`} style={{ fontFamily: "var(--font-heading)" }}>
                    {verificationResult.error
                      ? "Verification Error"
                      : verificationResult.matches
                      ? "Password Matches!"
                      : "Password Does Not Match"}
                  </h3>
                  {verificationResult.error && (
                    <p className="text-sm text-red-600">{verificationResult.error}</p>
                  )}
                </div>
              </div>
            )}

            {/* Hash Metadata Panel */}
            {metadata && metadata.isValid && (
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  📊 Hash Metadata
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Algorithm:</span>
                    <p className="text-gray-800">Bcrypt</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Version:</span>
                    <p className="text-gray-800">${metadata.version}$ ({getVersionDescription(metadata.version)})</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Cost Factor:</span>
                    <p className="text-gray-800">{metadata.cost} (2^{metadata.cost} iterations)</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Estimated Time:</span>
                    <p className="text-gray-800">{estimateHashTime(metadata.cost)}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-semibold text-gray-700">Salt:</span>
                    <p className="text-gray-800 break-all font-mono text-xs">{metadata.salt}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Hash Length:</span>
                    <p className="text-gray-800">{metadata.hashLength} characters</p>
                  </div>
                </div>

                {/* Hash Strength Indicator */}
                {strength && (
                  <div className="mt-4 pt-4 border-t border-blue-300">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Security Level:</span>
                      <span className={`font-bold ${strength.color}`}>{strength.level}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{strength.description}</p>
                  </div>
                )}
              </div>
            )}

            {/* Copy Button */}
            {verificationResult && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleCopy(
                    `Password: ${password}\nHash: ${hash}\nResult: ${verificationResult.matches ? "Match" : "No Match"}`,
                    "result"
                  )}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {copied === "result" ? "✅ Copied!" : "📋 Copy Result"}
                </button>
              </div>
            )}
          </>
        )}

        {/* Generate Mode */}
        {tabMode === "generate" && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Password to Hash
              </label>
              <input
                type="text"
                value={genPassword}
                onChange={e => setGenPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Cost Factor: {genCost}
              </label>
              <input
                type="range"
                min="4"
                max="14"
                value={genCost}
                onChange={e => setGenCost(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Fast (4)</span>
                <span>Balanced (10)</span>
                <span>Secure (14)</span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Estimated time: {estimateHashTime(genCost)}
              </p>
            </div>

            <div className="mb-6">
              <button
                onClick={handleGenerate}
                disabled={!genPassword || isGenerating}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-md"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {isGenerating ? "⏳ Generating..." : "🔑 Generate Hash"}
              </button>
            </div>

            {generatedHash && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Generated Hash
                </label>
                <div className="relative">
                  <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 shadow-sm break-all font-mono">
                    {generatedHash}
                  </div>
                  <button
                    onClick={() => handleCopy(generatedHash, "generated")}
                    className="absolute top-3 right-3 text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {copied === "generated" ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Batch Mode */}
        {tabMode === "batch" && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Passwords (one per line)
              </label>
              <textarea
                value={batchPasswords}
                onChange={e => setBatchPasswords(e.target.value)}
                placeholder="password1&#10;password2&#10;password3"
                rows={6}
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Bcrypt Hash
              </label>
              <textarea
                value={batchHash}
                onChange={e => setBatchHash(e.target.value)}
                placeholder="$2b$10$..."
                rows={3}
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            <div className="mb-6">
              <button
                onClick={handleBatchVerify}
                disabled={!batchPasswords || !batchHash || isBatchVerifying}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-md"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {isBatchVerifying ? "⏳ Verifying..." : "✅ Verify All"}
              </button>
            </div>

            {batchResults.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Results ({batchResults.filter(r => r.matches).length} / {batchResults.length} matches)
                </h3>
                {batchResults.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      result.matches
                        ? "bg-green-50 border-green-300"
                        : "bg-red-50 border-red-300"
                    }`}
                  >
                    <span className="text-sm text-gray-800 font-mono">{result.password}</span>
                    <span className={`text-lg ${result.matches ? "text-green-600" : "text-red-600"}`}>
                      {result.matches ? "✅" : "❌"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <BcryptHashVerifierSEOContent />
      
      <RelatedTools
        currentTool="bcrypt-hash-verifier"
        tools={['text-encryptor-aes', 'password-generator', 'hash-generator']}
      />
    </>
  );
}

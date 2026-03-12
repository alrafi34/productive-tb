"use client";

import { useState, useRef } from "react";
import {
  encryptText,
  decryptText,
  formatAsBase64,
  formatAsHex,
  parseBase64Format,
  parseHexFormat,
  calculatePasswordStrength,
  type EncryptionResult
} from "./logic";
import AESEncryptorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Mode = "encrypt" | "decrypt";
type OutputFormat = "base64" | "hex" | "json";

export default function AESEncryptorUI() {
  const [mode, setMode] = useState<Mode>("encrypt");
  const [inputText, setInputText] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [output, setOutput] = useState("");
  const [encryptionData, setEncryptionData] = useState<EncryptionResult | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("base64");
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const passwordStrength = password ? calculatePasswordStrength(password) : null;

  async function handleEncrypt() {
    if (!inputText || !password) return;
    
    setLoading(true);
    setStatus("Encrypting...");
    
    try {
      const result = await encryptText(inputText, password);
      setEncryptionData(result);
      
      let formatted = "";
      if (outputFormat === "base64") formatted = formatAsBase64(result);
      else if (outputFormat === "hex") formatted = formatAsHex(result);
      else formatted = JSON.stringify(result, null, 2);
      
      setOutput(formatted);
      setStatus("✅ Encrypted successfully");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("❌ Encryption failed");
      setTimeout(() => setStatus(""), 3000);
    }
    
    setLoading(false);
  }

  async function handleDecrypt() {
    if (!inputText || !password) return;
    
    setLoading(true);
    setStatus("Decrypting...");
    
    try {
      let data: EncryptionResult;
      
      if (inputText.startsWith("{")) {
        data = JSON.parse(inputText);
      } else if (inputText.includes(":")) {
        const parts = inputText.split(":");
        if (parts[0].length === 24) {
          data = parseBase64Format(inputText);
        } else {
          data = parseHexFormat(inputText);
        }
      } else {
        throw new Error("Invalid format");
      }
      
      const decrypted = await decryptText(data, password);
      setOutput(decrypted);
      setStatus("✅ Decrypted successfully");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("❌ Invalid password or corrupted data");
      setTimeout(() => setStatus(""), 3000);
    }
    
    setLoading(false);
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload(content: string, filename: string) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const text = await file.text();
    setInputText(text);
  }

  function switchMode(newMode: Mode) {
    setMode(newMode);
    setInputText("");
    setOutput("");
    setEncryptionData(null);
    setStatus("");
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Security Notice */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-800 text-center">
            🔒 <strong>100% Secure:</strong> All encryption happens locally in your browser. No data is sent to any server.
          </p>
        </div>

        {/* Mode Switch */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => switchMode("encrypt")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              mode === "encrypt"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            🔒 Encrypt
          </button>
          <button
            onClick={() => switchMode("decrypt")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              mode === "decrypt"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            🔓 Decrypt
          </button>
        </div>

        {/* Input Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
              {mode === "encrypt" ? "Text to Encrypt" : "Encrypted Text"}
            </label>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-primary hover:text-primary-hover font-semibold"
            >
              📁 Upload File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <div className="relative">
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={mode === "encrypt" ? "Enter text to encrypt..." : "Paste encrypted text here..."}
              rows={8}
              className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            />
            {inputText && (
              <button
                onClick={() => setInputText("")}
                className="absolute top-3 right-3 text-xs text-gray-400 hover:text-red-500 transition-colors bg-white px-2 py-1 rounded-lg border border-gray-100"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">{inputText.length} characters</p>
        </div>

        {/* Password Section */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter encryption password..."
              className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ fontFamily: "var(--font-body)" }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          
          {/* Password Strength */}
          {password && passwordStrength && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-600">Password Strength</span>
                <span className={`text-xs font-semibold ${
                  passwordStrength.label === "Weak" ? "text-red-500" :
                  passwordStrength.label === "Medium" ? "text-yellow-500" : "text-green-500"
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.score / 7) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Output Format (Encrypt mode only) */}
        {mode === "encrypt" && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Output Format
            </label>
            <div className="flex gap-3">
              {(["base64", "hex", "json"] as OutputFormat[]).map(format => (
                <button
                  key={format}
                  onClick={() => setOutputFormat(format)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    outputFormat === format
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mb-6">
          <button
            onClick={mode === "encrypt" ? handleEncrypt : handleDecrypt}
            disabled={!inputText || !password || loading}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-md"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {loading ? "⏳ Processing..." : mode === "encrypt" ? "🔒 Encrypt Text" : "🔓 Decrypt Text"}
          </button>
        </div>

        {/* Status */}
        {status && (
          <div className={`mb-6 text-center text-sm font-semibold ${
            status.includes("✅") ? "text-green-600" : status.includes("❌") ? "text-red-600" : "text-blue-600"
          }`}>
            {status}
          </div>
        )}

        {/* Output Section */}
        {output && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              {mode === "encrypt" ? "Encrypted Output" : "Decrypted Text"}
            </label>
            <div className="relative">
              <div
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[120px] leading-relaxed break-all"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {output}
              </div>
              <button
                onClick={() => handleCopy(output)}
                className="absolute top-3 right-3 text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {output && (
          <div className="flex gap-3 flex-wrap mb-6">
            <button
              onClick={() => handleCopy(output)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
            <button
              onClick={() => handleDownload(output, mode === "encrypt" ? "encrypted.txt" : "decrypted.txt")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              💾 Download
            </button>
            {mode === "encrypt" && encryptionData && (
              <button
                onClick={() => handleDownload(JSON.stringify(encryptionData, null, 2), "encryption-package.json")}
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                📦 Download JSON
              </button>
            )}
            <button
              onClick={() => { setInputText(""); setOutput(""); setPassword(""); setEncryptionData(null); }}
              className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              🗑️ Reset
            </button>
          </div>
        )}

        {/* Encryption Metadata */}
        {mode === "encrypt" && encryptionData && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              🔍 Encryption Metadata
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Algorithm:</span>
                <span className="ml-2 text-gray-600">{encryptionData.algorithm}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Iterations:</span>
                <span className="ml-2 text-gray-600">{encryptionData.iterations.toLocaleString()}</span>
              </div>
              <div className="md:col-span-2">
                <span className="font-semibold text-gray-700">Salt:</span>
                <span className="ml-2 text-gray-600 break-all">{encryptionData.salt}</span>
              </div>
              <div className="md:col-span-2">
                <span className="font-semibold text-gray-700">IV:</span>
                <span className="ml-2 text-gray-600 break-all">{encryptionData.iv}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Cipher Length:</span>
                <span className="ml-2 text-gray-600">{encryptionData.ciphertext.length} bytes</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <AESEncryptorSEOContent />
      
      <RelatedTools
        currentTool="text-encryptor-aes"
        tools={['password-generator', 'hash-generator', 'base64-encoder']}
      />
    </>
  );
}

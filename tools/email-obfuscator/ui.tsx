"use client";

import { useState } from "react";
import {
  isValidEmail,
  encodeToHtmlCharCodes,
  encodeToHex,
  encodeToJavaScript,
  encodeToMixed,
  generateMailtoLink,
  generateMailtoLinkHex,
  generateHtmlSnippet,
  decodeObfuscatedEmail,
  batchEncodeEmails,
  calculateSpamRisk
} from "./logic";
import EmailObfuscatorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type EncodingMode = "decimal" | "hex" | "javascript" | "mixed";
type TabMode = "single" | "batch" | "decode";

export default function EmailObfuscatorUI() {
  const [tabMode, setTabMode] = useState<TabMode>("single");
  const [email, setEmail] = useState("");
  const [batchEmails, setBatchEmails] = useState("");
  const [encodedEmail, setEncodedEmail] = useState("");
  const [encodingMode, setEncodingMode] = useState<EncodingMode>("decimal");
  const [mailtoLinkText, setMailtoLinkText] = useState("Email Me");
  const [copied, setCopied] = useState<string>("");
  
  // Decode mode
  const [encodedInput, setEncodedInput] = useState("");
  const [decodedEmail, setDecodedEmail] = useState("");

  const isValid = isValidEmail(email);
  const spamRisk = email ? calculateSpamRisk(email, false) : null;
  const encodedSpamRisk = encodedEmail ? calculateSpamRisk(encodedEmail, true) : null;

  function handleEncode() {
    if (!isValid) return;
    
    let result = "";
    switch (encodingMode) {
      case "decimal":
        result = encodeToHtmlCharCodes(email);
        break;
      case "hex":
        result = encodeToHex(email);
        break;
      case "javascript":
        result = encodeToJavaScript(email);
        break;
      case "mixed":
        result = encodeToMixed(email);
        break;
    }
    setEncodedEmail(result);
  }

  function handleDecode() {
    if (!encodedInput) return;
    try {
      const decoded = decodeObfuscatedEmail(encodedInput);
      setDecodedEmail(decoded);
    } catch (error) {
      setDecodedEmail("Error: Invalid encoded email");
    }
  }

  function handleCopy(text: string, type: string) {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  }

  const mailtoLink = email && isValid ? 
    (encodingMode === "hex" ? generateMailtoLinkHex(email, mailtoLinkText) : generateMailtoLink(email, mailtoLinkText)) 
    : "";
  
  const htmlSnippet = email && isValid ? 
    generateHtmlSnippet(email, encodingMode === "javascript" ? "decimal" : encodingMode as any) 
    : "";

  // Batch processing
  const batchResults = batchEmails ? 
    batchEncodeEmails(
      batchEmails.split('\n').filter(e => e.trim() && isValidEmail(e.trim())),
      encodingMode === "javascript" ? "decimal" : encodingMode as any
    ) : [];

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Tab Mode Selector */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setTabMode("single")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              tabMode === "single"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            📧 Single Email
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
            📋 Batch Encode
          </button>
          <button
            onClick={() => setTabMode("decode")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              tabMode === "decode"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            🔓 Decode
          </button>
        </div>

        {/* Single Email Mode */}
        {tabMode === "single" && (
          <>
            {/* Email Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="contact@example.com"
                className={`w-full rounded-xl border ${
                  email && !isValid ? "border-red-300" : "border-gray-200"
                } bg-white px-5 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
                style={{ fontFamily: "var(--font-body)" }}
              />
              {email && !isValid && (
                <p className="text-xs text-red-500 mt-2">Please enter a valid email address</p>
              )}
            </div>

            {/* Encoding Mode Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Encoding Method
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setEncodingMode("decimal")}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    encodingMode === "decimal"
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Decimal
                </button>
                <button
                  onClick={() => setEncodingMode("hex")}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    encodingMode === "hex"
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Hexadecimal
                </button>
                <button
                  onClick={() => setEncodingMode("javascript")}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    encodingMode === "javascript"
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  JavaScript
                </button>
                <button
                  onClick={() => setEncodingMode("mixed")}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    encodingMode === "mixed"
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Mixed
                </button>
              </div>
            </div>

            {/* Encode Button */}
            <div className="mb-6">
              <button
                onClick={handleEncode}
                disabled={!isValid}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-md"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                🔒 Encode Email
              </button>
            </div>

            {/* Spam Risk Indicator */}
            {spamRisk && (
              <div className="mb-6 grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Plain Text</span>
                    <span className={`text-sm font-bold ${spamRisk.color}`}>{spamRisk.level} Risk</span>
                  </div>
                  <p className="text-xs text-gray-600">{spamRisk.message}</p>
                </div>
                {encodedSpamRisk && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Obfuscated</span>
                      <span className={`text-sm font-bold ${encodedSpamRisk.color}`}>{encodedSpamRisk.level} Risk</span>
                    </div>
                    <p className="text-xs text-gray-600">{encodedSpamRisk.message}</p>
                  </div>
                )}
              </div>
            )}

            {/* Encoded Output */}
            {encodedEmail && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Encoded Email
                </label>
                <div className="relative">
                  <div
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[80px] leading-relaxed break-all"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {encodedEmail}
                  </div>
                  <button
                    onClick={() => handleCopy(encodedEmail, "encoded")}
                    className="absolute top-3 right-3 text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {copied === "encoded" ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
              </div>
            )}

            {/* Live Preview */}
            {encodedEmail && encodingMode !== "javascript" && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Live Preview (How it appears in HTML)
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: encodedEmail }} />
                </div>
              </div>
            )}

            {/* Mailto Link Generator */}
            {encodedEmail && encodingMode !== "javascript" && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Mailto Link Generator
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    value={mailtoLinkText}
                    onChange={e => setMailtoLinkText(e.target.value)}
                    placeholder="Link text"
                    className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>
                <div className="relative">
                  <div
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[60px] leading-relaxed break-all"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {mailtoLink}
                  </div>
                  <button
                    onClick={() => handleCopy(mailtoLink, "mailto")}
                    className="absolute top-3 right-3 text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {copied === "mailto" ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
                <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-xs text-gray-600 mb-2">Preview:</p>
                  <div dangerouslySetInnerHTML={{ __html: mailtoLink }} />
                </div>
              </div>
            )}

            {/* HTML Snippet */}
            {encodedEmail && encodingMode !== "javascript" && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  HTML Snippet
                </label>
                <div className="relative">
                  <div
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[60px] leading-relaxed break-all"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {htmlSnippet}
                  </div>
                  <button
                    onClick={() => handleCopy(htmlSnippet, "snippet")}
                    className="absolute top-3 right-3 text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {copied === "snippet" ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {encodedEmail && (
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => { setEmail(""); setEncodedEmail(""); }}
                  className="flex items-center gap-2 border-2 border-gray-200 hover:border-red-300 hover:text-red-500 text-gray-500 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  🗑️ Reset
                </button>
              </div>
            )}
          </>
        )}

        {/* Batch Mode */}
        {tabMode === "batch" && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Email Addresses (one per line)
              </label>
              <textarea
                value={batchEmails}
                onChange={e => setBatchEmails(e.target.value)}
                placeholder="support@example.com&#10;sales@example.com&#10;admin@example.com"
                rows={8}
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            {/* Encoding Mode Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Encoding Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setEncodingMode("decimal")}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    encodingMode === "decimal"
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Decimal
                </button>
                <button
                  onClick={() => setEncodingMode("hex")}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    encodingMode === "hex"
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Hexadecimal
                </button>
                <button
                  onClick={() => setEncodingMode("mixed")}
                  className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    encodingMode === "mixed"
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Mixed
                </button>
              </div>
            </div>

            {/* Batch Results */}
            {batchResults.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Encoded Results ({batchResults.length} emails)
                </label>
                <div className="space-y-4">
                  {batchResults.map((result, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-600">Original:</span>
                        <span className="text-xs text-gray-800">{result.email}</span>
                      </div>
                      <div className="relative">
                        <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 break-all pr-20">
                          {result.encoded}
                        </div>
                        <button
                          onClick={() => handleCopy(result.encoded, `batch-${index}`)}
                          className="absolute top-2 right-2 text-xs bg-primary hover:bg-primary-hover text-white px-2 py-1 rounded transition-colors font-semibold"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {copied === `batch-${index}` ? "✅" : "📋"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Decode Mode */}
        {tabMode === "decode" && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Encoded Email
              </label>
              <textarea
                value={encodedInput}
                onChange={e => setEncodedInput(e.target.value)}
                placeholder="&#99;&#111;&#110;&#116;&#97;&#99;&#116;&#64;&#101;&#120;&#97;&#109;&#112;&#108;&#101;&#46;&#99;&#111;&#109;"
                rows={6}
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            <div className="mb-6">
              <button
                onClick={handleDecode}
                disabled={!encodedInput}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-md"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                🔓 Decode Email
              </button>
            </div>

            {decodedEmail && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Decoded Email
                </label>
                <div className="relative">
                  <div
                    className="w-full rounded-xl border border-gray-200 bg-green-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[60px] leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {decodedEmail}
                  </div>
                  <button
                    onClick={() => handleCopy(decodedEmail, "decoded")}
                    className="absolute top-3 right-3 text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {copied === "decoded" ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <EmailObfuscatorSEOContent />
      
      <RelatedTools
        currentTool="email-obfuscator"
        tools={['text-encryptor-aes', 'password-generator', 'hash-generator']}
      />
    </>
  );
}

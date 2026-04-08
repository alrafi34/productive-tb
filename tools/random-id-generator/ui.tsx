"use client";

import { useState, useMemo, useEffect } from "react";
import {
  generateIDs,
  formatOutput,
  downloadFile,
  type IDType,
  type OutputFormat,
} from "./logic";
import RandomIDGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function RandomIDGeneratorUI() {
  const [idType, setIdType] = useState<IDType>("uuid-v4");
  const [quantity, setQuantity] = useState(10);
  const [format, setFormat] = useState<OutputFormat>("plain");
  const [nanoIdLength, setNanoIdLength] = useState(21);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ids = useMemo(() => {
    if (!mounted) return [];
    return generateIDs(idType, quantity, nanoIdLength);
  }, [idType, quantity, nanoIdLength, mounted]);

  const output = useMemo(() => {
    if (!mounted) return "";
    return formatOutput(ids, format);
  }, [ids, format, mounted]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = format === "json" ? "json" : "txt";
    downloadFile(output, `ids-${Date.now()}.${ext}`);
  };

  const getTypeDescription = (type: IDType): string => {
    switch (type) {
      case "uuid-v1":
        return "Time-based identifier";
      case "uuid-v4":
        return "Random identifier";
      case "cuid":
        return "Collision-resistant ID";
      case "nanoid":
        return "Short secure ID";
      default:
        return "";
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
            <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Input Controls */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ID Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ID Type
              </label>
              <select
                value={idType}
                onChange={(e) => setIdType(e.target.value as IDType)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white"
              >
                <option value="uuid-v4">UUID v4 (Random)</option>
                <option value="uuid-v1">UUID v1 (Time-based)</option>
                <option value="cuid">CUID</option>
                <option value="nanoid">NanoID</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {getTypeDescription(idType)}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity: {quantity}
              </label>
              <input
                type="range"
                min="1"
                max="10000"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>10,000</span>
              </div>
            </div>
          </div>

          {/* NanoID Length (conditional) */}
          {idType === "nanoid" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NanoID Length: {nanoIdLength}
              </label>
              <input
                type="range"
                min="10"
                max="64"
                value={nanoIdLength}
                onChange={(e) => setNanoIdLength(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-300"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>10</span>
                <span>64</span>
              </div>
            </div>
          )}

          {/* Output Format */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Output Format
            </label>
            <div className="flex gap-2 flex-wrap">
              {(["plain", "comma", "json", "sql"] as OutputFormat[]).map(
                (fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setFormat(fmt)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      format === fmt
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {fmt === "plain"
                      ? "Plain List"
                      : fmt === "comma"
                        ? "Comma"
                        : fmt === "json"
                          ? "JSON"
                          : "SQL"}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Output Area */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">
              Generated IDs ({ids.length})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  copied
                    ? "bg-green-100 text-green-700"
                    : "bg-primary text-white hover:bg-primary-hover"
                }`}
              >
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-800 text-white hover:bg-gray-900 transition-colors"
              >
                ⬇️ Download
              </button>
            </div>
          </div>

          {/* Output Display */}
          <div className="relative">
            <pre className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 text-sm font-mono text-gray-800 overflow-x-auto max-h-96 overflow-y-auto whitespace-pre-wrap break-words">
              {output}
            </pre>
          </div>

          {/* Quick Copy Individual IDs */}
          {quantity <= 20 && format === "plain" && (
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-600 font-semibold">Quick Copy:</p>
              <div className="flex flex-wrap gap-2">
                {ids.slice(0, 10).map((id, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigator.clipboard.writeText(id);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="px-3 py-1 rounded text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono transition-colors truncate max-w-xs"
                    title={id}
                  >
                    {id.substring(0, 12)}...
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">💡 Tip:</span> All IDs are generated
            locally in your browser. Nothing is sent to any server.
          </p>
        </div>
      </div>

      <RandomIDGeneratorSEOContent />
      <RelatedTools
        currentTool="random-id-generator"
        tools={["hash-generator", "password-generator", "qr-code-generator"]}
      />
    </>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import {
  convertXmlToJson,
  saveToHistory,
  getHistory,
  clearHistory
} from "./logic";
import XMLToJsonSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const EXAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<library>
  <book id="1">
    <title>JavaScript Guide</title>
    <author>Alice</author>
    <year>2023</year>
  </book>
  <book id="2">
    <title>Python Guide</title>
    <author>Bob</author>
    <year>2024</year>
  </book>
</library>`;

export default function XMLToJsonUI() {
  const [input, setInput] = useState("");
  const [includeAttributes, setIncludeAttributes] = useState(true);
  const [detectArrays, setDetectArrays] = useState(true);
  const [prettyPrint, setPrettyPrint] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const conversion = convertXmlToJson(input, {
    includeAttributes,
    detectArrays,
    prettyPrint
  });

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleCopy = useCallback(() => {
    if (conversion.success && conversion.output) {
      navigator.clipboard.writeText(conversion.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [conversion.success, conversion.output]);

  const handleDownload = useCallback(() => {
    if (conversion.success && conversion.output) {
      const element = document.createElement("a");
      element.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(conversion.output));
      element.setAttribute("download", "converted.json");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }, [conversion.success, conversion.output]);

  const handleConvert = useCallback(() => {
    if (conversion.success && input.trim()) {
      saveToHistory(input);
      setHistory(getHistory());
    }
  }, [conversion.success, input]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInput(content);
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
    if (file && (file.name.endsWith(".xml") || file.name.endsWith(".txt"))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInput(content);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleLoadFromHistory = useCallback((xml: string) => {
    setInput(xml);
    setShowHistory(false);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">
              XML to JSON Converter
            </h1>
            <p className="text-sm text-gray-600">
              Convert XML data into modern JSON format instantly with real-time preview
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
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Paste XML here or drag & drop a .xml file...`}
                  rows={12}
                  className="w-full p-4 rounded-xl border-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm bg-white text-gray-900 placeholder:text-gray-400"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              </div>

              {/* File Upload & Options */}
              <div className="flex flex-wrap gap-3 items-center">
                <label className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700">
                  📁 Upload XML
                  <input
                    type="file"
                    accept=".xml,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-4 py-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700"
                  title="View history"
                >
                  📜 History ({history.length})
                </button>

                <button
                  onClick={() => setInput("")}
                  disabled={!input}
                  className="px-4 py-2 rounded-lg transition-colors disabled:opacity-40 bg-red-100 hover:bg-red-200 text-red-700"
                >
                  🗑️ Clear
                </button>

                <button
                  onClick={() => setInput(EXAMPLE_XML)}
                  className="px-4 py-2 rounded-lg transition-colors bg-blue-100 hover:bg-blue-200 text-blue-700"
                >
                  📋 Example
                </button>
              </div>

              {/* Options */}
              <div className="rounded-xl p-4 border bg-white border-gray-200 space-y-3">
                <h3 className="font-semibold text-gray-900">Conversion Options</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeAttributes}
                      onChange={(e) => setIncludeAttributes(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">Include XML attributes (@key)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={detectArrays}
                      onChange={(e) => setDetectArrays(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">Detect arrays for repeated elements</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prettyPrint}
                      onChange={(e) => setPrettyPrint(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">Pretty-print JSON</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleConvert}
                  disabled={!input}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 ${
                    conversion.success
                      ? "bg-green-100 hover:bg-green-200 text-green-700"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                  }`}
                >
                  ✓ Convert
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!conversion.success}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 ${
                    copied
                      ? "bg-green-100 text-green-700"
                      : "bg-purple-100 hover:bg-purple-200 text-purple-700"
                  }`}
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!conversion.success}
                  className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-orange-100 hover:bg-orange-200 text-orange-700"
                >
                  ⬇️ Download
                </button>
              </div>
            </div>

            {/* Sidebar - Results */}
            <div className="space-y-4">
              {/* Conversion Status */}
              <div
                className={`rounded-xl p-4 border ${
                  conversion.success
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div
                  className={`font-semibold mb-2 ${
                    conversion.success
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {conversion.success ? "✓ Valid XML" : "✗ Invalid XML"}
                </div>
                {conversion.error && (
                  <div className="text-sm text-red-600 font-mono break-words">
                    {conversion.error}
                  </div>
                )}
              </div>

              {/* JSON Preview */}
              {conversion.success && conversion.output && (
                <div className="rounded-xl p-4 border bg-gray-50 border-gray-200">
                  <h3 className="font-semibold mb-3 text-gray-900">
                    📄 JSON Output
                  </h3>
                  <pre className="text-xs overflow-x-auto p-3 rounded bg-white border border-gray-200 text-gray-800 max-h-64 overflow-y-auto">
                    {conversion.output}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* History Panel */}
          {showHistory && history.length > 0 && (
            <div className="mt-6 rounded-xl p-4 border bg-gray-50 border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">
                  📜 Recent Conversions
                </h3>
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
                    onClick={() => handleLoadFromHistory(item.fullXml)}
                    className="w-full text-left p-2 rounded transition-colors text-sm font-mono bg-white hover:bg-gray-100 text-gray-700"
                  >
                    <div className="truncate">{item.xml}...</div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <XMLToJsonSEOContent />

      <RelatedTools
        currentTool="xml-to-json"
        tools={["json-validator", "find-and-replace", "markdown-previewer"]}
      />
    </>
  );
}

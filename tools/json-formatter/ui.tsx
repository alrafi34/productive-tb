"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  validateJSON,
  formatJSON,
  minifyJSON,
  analyzeJSON,
  buildTree,
  getErrorContext,
  downloadJSON,
  TreeNode,
  ValidationResult,
  Analysis
} from "./logic";
import JSONFormatterSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const EXAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "skills": ["JavaScript", "React", "TypeScript"],
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  }
}`;

function TreeViewer({ node, level = 0 }: { node: TreeNode; level?: number }) {
  const [expanded, setExpanded] = useState(node.expanded ?? true);
  const hasChildren = node.children && node.children.length > 0;

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      object: "text-blue-600 bg-blue-50",
      array: "text-purple-600 bg-purple-50",
      string: "text-green-600 bg-green-50",
      number: "text-orange-600 bg-orange-50",
      boolean: "text-red-600 bg-red-50",
      null: "text-gray-500 bg-gray-50"
    };
    return colors[type] || "text-gray-700 bg-gray-50";
  };

  const formatValue = (value: any, type: string) => {
    if (type === "null") return "null";
    if (type === "string") return `"${value}"`;
    if (type === "boolean") return value ? "true" : "false";
    if (type === "number") return String(value);
    if (type === "array") return `Array(${value?.length || 0})`;
    if (type === "object") return "Object";
    return String(value);
  };

  return (
    <div className="font-mono text-sm">
      <div className="flex items-center gap-3 py-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl px-3 transition-all duration-200 group">
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-6 h-6 flex items-center justify-center hover:bg-blue-200 rounded-lg text-blue-600 transition-all duration-200 group-hover:scale-110"
          >
            <span className={`transform transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}>
              ▶
            </span>
          </button>
        )}
        {!hasChildren && <span className="w-6" />}

        <span className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-md">{node.key}:</span>
        <span className={`px-2 py-1 rounded-md font-semibold ${getTypeColor(node.type)}`}>
          {formatValue(node.value, node.type)}
        </span>
      </div>

      {expanded && hasChildren && (
        <div className="ml-6 border-l-2 border-gradient-to-b from-blue-200 to-purple-200 pl-4 space-y-1">
          {node.children!.map((child, idx) => (
            <TreeViewer key={idx} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function JSONFormatterUI() {
  const [input, setInput] = useState("");
  const [indentSize, setIndentSize] = useState<2 | 4 | "tab">(2);
  const [viewMode, setViewMode] = useState<"formatted" | "tree" | "raw">("formatted");
  const [copied, setCopied] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const validation: ValidationResult = useMemo(() => validateJSON(input), [input]);
  const analysis: Analysis | null = useMemo(
    () => (input.trim() && validation.valid ? analyzeJSON(input) : null),
    [input, validation.valid]
  );
  const formatted = useMemo(
    () => (validation.valid ? formatJSON(input, indentSize) : null),
    [input, validation.valid, indentSize]
  );
  const minified = useMemo(
    () => (validation.valid ? minifyJSON(input) : null),
    [input, validation.valid]
  );
  const tree = useMemo(
    () => (validation.valid && input.trim() ? buildTree(JSON.parse(input)) : null),
    [input, validation.valid]
  );

  const handleCopy = useCallback((text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  }, []);

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
    if (file && (file.name.endsWith(".json") || file.name.endsWith(".txt"))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInput(content);
      };
      reader.readAsText(file);
    }
  }, []);

  const errorContext = validation.error ? getErrorContext(input, validation.position) : null;

  return (
    <>
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3 space-y-6">
            {/* Input Area */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📝 JSON Input
              </label>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="relative rounded-2xl border-2 border-dashed border-gray-200 bg-white shadow-lg hover:border-blue-400 hover:shadow-xl transition-all duration-300 group-hover:scale-[1.01]"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Paste JSON here or drag & drop a .json file...\n\nExample:\n${EXAMPLE_JSON}`}
                  rows={16}
                  className="w-full p-6 rounded-2xl border-0 resize-none focus:outline-none focus:ring-3 focus:ring-blue-200 font-mono text-sm bg-transparent text-gray-900 placeholder:text-gray-400 transition-all duration-200"
                  style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
                />
                <div className="absolute top-4 right-4 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                  {input.length} chars
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100">
              <label className="flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="text-lg">📁</span>
                <span className="font-semibold">Upload JSON</span>
                <input
                  type="file"
                  accept=".json,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Indent:</span>
                <select
                  value={indentSize}
                  onChange={(e) => setIndentSize(e.target.value as any)}
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm"
                >
                  <option value={2}>2 Spaces</option>
                  <option value={4}>4 Spaces</option>
                  <option value="tab">Tabs</option>
                </select>
              </div>

              <button
                onClick={() => setInput("")}
                disabled={!input}
                className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 disabled:opacity-40 bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 font-semibold hover:scale-105 shadow-sm hover:shadow-md"
              >
                <span className="text-lg">🗑️</span>
                Clear
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => {
                  if (formatted?.success) {
                    setInput(formatted.output!);
                  }
                }}
                disabled={!validation.valid}
                className="group px-6 py-4 rounded-2xl font-bold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg hover:shadow-xl transform"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl group-hover:animate-pulse">✨</span>
                  <span>Beautify</span>
                </div>
              </button>
              <button
                onClick={() => {
                  if (minified?.success) {
                    setInput(minified.output!);
                  }
                }}
                disabled={!validation.valid}
                className="group px-6 py-4 rounded-2xl font-bold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105 shadow-lg hover:shadow-xl transform"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl group-hover:animate-bounce">⚡</span>
                  <span>Minify</span>
                </div>
              </button>
              <button
                onClick={() => {
                  if (formatted?.success) {
                    handleCopy(formatted.output!, "formatted");
                  }
                }}
                disabled={!validation.valid}
                className={`group px-6 py-4 rounded-2xl font-bold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 shadow-lg hover:shadow-xl transform ${
                  copiedType === "formatted"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">{copiedType === "formatted" ? "✓" : "📋"}</span>
                  <span>{copiedType === "formatted" ? "Copied!" : "Copy"}</span>
                </div>
              </button>
              <button
                onClick={() => {
                  if (formatted?.success) {
                    downloadJSON(formatted.output!, "data.json");
                  }
                }}
                disabled={!validation.valid}
                className="group px-6 py-4 rounded-2xl font-bold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 hover:scale-105 shadow-lg hover:shadow-xl transform"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl group-hover:animate-bounce">⬇️</span>
                  <span>Download</span>
                </div>
              </button>
            </div>
          </div>

          {/* Sidebar - Status & Analysis */}
          <div className="space-y-6">
            {/* Validation Status */}
            <div className="group">
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <span className="text-lg">🔍</span>
                Validation Status
              </h3>
              <div
                className={`rounded-2xl p-6 border-2 shadow-lg transition-all duration-300 group-hover:scale-105 ${
                  validation.valid
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-green-100"
                    : "bg-gradient-to-br from-red-50 to-pink-50 border-red-200 shadow-red-100"
                }`}
              >
                <div
                  className={`font-bold mb-3 text-lg flex items-center gap-3 ${
                    validation.valid ? "text-green-700" : "text-red-700"
                  }`}
                >
                  <span className="text-2xl">{validation.valid ? "✓" : "✗"}</span>
                  {validation.valid ? "Valid JSON" : "Invalid JSON"}
                </div>
                {validation.error && (
                  <div className="text-sm text-red-600 space-y-2">
                    <div className="bg-red-100 p-3 rounded-xl border border-red-200">
                      <p className="font-mono break-words text-xs leading-relaxed">{validation.error}</p>
                    </div>
                    {errorContext && (
                      <div className="text-xs text-red-500 bg-red-50 p-2 rounded-lg">
                        <p className="font-semibold">📍 Line {errorContext.line}, Column {errorContext.column}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Analysis */}
            {analysis && (
              <div className="group">
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  Analysis
                </h3>
                <div className="rounded-2xl p-6 border-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg shadow-blue-100 transition-all duration-300 group-hover:scale-105">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100">
                      <div className="text-xs text-blue-600 font-semibold mb-1">SIZE</div>
                      <div className="font-mono text-lg font-bold text-blue-900">{analysis.size}</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100">
                      <div className="text-xs text-blue-600 font-semibold mb-1">LINES</div>
                      <div className="font-mono text-lg font-bold text-blue-900">{analysis.lineCount}</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100">
                      <div className="text-xs text-blue-600 font-semibold mb-1">DEPTH</div>
                      <div className="font-mono text-lg font-bold text-blue-900">{analysis.depth}</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-blue-100">
                      <div className="text-xs text-blue-600 font-semibold mb-1">KEYS</div>
                      <div className="font-mono text-lg font-bold text-blue-900">{analysis.keyCount}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Copy Minified */}
            {validation.valid && minified?.success && (
              <button
                onClick={() => handleCopy(minified.output!, "minified")}
                className={`w-full px-6 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl transform ${
                  copiedType === "minified"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300"
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl">{copiedType === "minified" ? "✓" : "📋"}</span>
                  <span>{copiedType === "minified" ? "Minified Copied!" : "Copy Minified"}</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* View Mode Tabs */}
        {validation.valid && (
          <div className="space-y-6">
            <div className="flex gap-3 p-2 bg-gray-100 rounded-2xl">
              {(["formatted", "tree", "raw"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`flex-1 px-6 py-4 font-bold transition-all duration-300 rounded-xl transform hover:scale-105 ${
                    viewMode === mode
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {mode === "formatted" && <><span className="text-xl">✨</span><span>Formatted</span></>}
                    {mode === "tree" && <><span className="text-xl">🌳</span><span>Tree View</span></>}
                    {mode === "raw" && <><span className="text-xl">📄</span><span>Raw</span></>}
                  </div>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white shadow-xl overflow-hidden">
              {viewMode === "formatted" && formatted?.success && (
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={() => handleCopy(formatted.output!, "formatted-view")}
                      className="px-3 py-2 bg-black/10 hover:bg-black/20 rounded-lg text-xs font-semibold transition-all duration-200 backdrop-blur-sm"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <pre className="p-6 overflow-x-auto text-sm font-mono text-gray-800 bg-gradient-to-br from-gray-50 to-blue-50 leading-relaxed">
                    {formatted.output}
                  </pre>
                </div>
              )}

              {viewMode === "tree" && tree && (
                <div className="p-6 overflow-x-auto max-h-96 bg-gradient-to-br from-green-50 to-blue-50">
                  <TreeViewer node={tree} />
                </div>
              )}

              {viewMode === "raw" && (
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={() => handleCopy(input, "raw-view")}
                      className="px-3 py-2 bg-black/10 hover:bg-black/20 rounded-lg text-xs font-semibold transition-all duration-200 backdrop-blur-sm"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <pre className="p-6 overflow-x-auto text-sm font-mono text-gray-800 bg-gradient-to-br from-yellow-50 to-orange-50 leading-relaxed">
                    {input}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <JSONFormatterSEOContent />

      <RelatedTools
        currentTool="json-formatter"
        tools={["json-validator", "json-to-csv", "xml-to-json"]}
      />
    </>
  );
}

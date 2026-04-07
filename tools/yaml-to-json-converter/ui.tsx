"use client";

import { useState, useCallback, useMemo } from "react";
import {
  validateYAML,
  convertYAMLToJSON,
  minifyJSON,
  downloadJSON,
  getErrorContext,
  type ValidationResult,
  type ConversionResult,
} from "./logic";
import YAMLToJSONSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const EXAMPLE_YAML = `name: John Doe
age: 30
email: john@example.com
skills:
  - JavaScript
  - React
  - TypeScript
address:
  street: 123 Main St
  city: New York
  country: USA`;

export default function YAMLToJSONUI() {
  const [input, setInput] = useState("");
  const [indentSize, setIndentSize] = useState<2 | 4 | "tab">(2);
  const [copied, setCopied] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const validation: ValidationResult = useMemo(() => validateYAML(input), [input]);
  const converted = useMemo(
    () => (validation.valid && input.trim() ? convertYAMLToJSON(input, indentSize) : null),
    [input, validation.valid, indentSize]
  );
  const minified = useMemo(
    () => (converted?.success && converted.output ? minifyJSON(converted.output) : null),
    [converted]
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
    if (file && (file.name.endsWith(".yaml") || file.name.endsWith(".yml") || file.name.endsWith(".txt"))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInput(content);
      };
      reader.readAsText(file);
    }
  }, []);

  const errorContext = validation.error ? getErrorContext(input, validation.position || 0) : null;

  return (
    <>
      <div className="space-y-6">
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
                placeholder={`Paste YAML here or drag & drop a file...\n\nExample:\n${EXAMPLE_YAML}`}
                rows={12}
                className="w-full p-4 rounded-xl border-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm bg-white text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* File Upload & Quick Actions */}
            <div className="flex flex-wrap gap-3 items-center">
              <label className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold">
                📁 Upload
                <input
                  type="file"
                  accept=".yaml,.yml,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => setInput("")}
                disabled={!input}
                className="px-4 py-2 rounded-lg transition-colors disabled:opacity-40 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-semibold"
              >
                🗑️ Clear
              </button>

              <button
                onClick={() => setInput(EXAMPLE_YAML)}
                className="px-4 py-2 rounded-lg transition-colors bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-semibold"
              >
                📋 Example
              </button>
            </div>

            {/* Options */}
            <div className="rounded-xl p-4 border bg-white border-gray-200 space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm">Options</h3>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700 font-semibold">Indentation:</label>
                <select
                  value={indentSize}
                  onChange={(e) => setIndentSize(e.target.value as any)}
                  className="px-3 py-1 rounded border border-gray-300 text-sm bg-white text-gray-700"
                >
                  <option value={2}>2 Spaces</option>
                  <option value={4}>4 Spaces</option>
                  <option value="tab">Tabs</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  if (converted?.success && converted.output) {
                    handleCopy(converted.output, "formatted");
                  }
                }}
                disabled={!validation.valid}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-purple-100 hover:bg-purple-200 text-purple-700 text-sm"
              >
                {copiedType === "formatted" ? "✓ Copied!" : "📋 Copy JSON"}
              </button>
              <button
                onClick={() => {
                  if (converted?.success && converted.output) {
                    downloadJSON(converted.output, "converted.json");
                  }
                }}
                disabled={!validation.valid}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-orange-100 hover:bg-orange-200 text-orange-700 text-sm"
              >
                ⬇️ Download
              </button>
              <button
                onClick={() => {
                  if (minified?.success && minified.output) {
                    handleCopy(minified.output, "minified");
                  }
                }}
                disabled={!validation.valid}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-40 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm"
              >
                {copiedType === "minified" ? "✓ Copied!" : "⚡ Minify"}
              </button>
            </div>
          </div>

          {/* Sidebar - Status & Output */}
          <div className="space-y-4">
            {/* Validation Status */}
            <div
              className={`rounded-xl p-4 border ${
                validation.valid
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div
                className={`font-semibold mb-2 text-sm ${
                  validation.valid ? "text-green-700" : "text-red-700"
                }`}
              >
                {validation.valid ? "✓ Valid YAML" : "✗ Invalid YAML"}
              </div>
              {validation.error && (
                <div className="text-xs text-red-600 font-mono break-words space-y-2">
                  <div className="bg-red-100 p-2 rounded border border-red-200">
                    {validation.error}
                  </div>
                  {errorContext && (
                    <div className="text-xs text-red-500">
                      📍 Line {errorContext.line}, Column {errorContext.column}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* JSON Output Preview */}
            {validation.valid && converted?.success && converted.output && (
              <div className="rounded-xl p-4 border bg-gray-50 border-gray-200">
                <h3 className="font-semibold mb-3 text-gray-900 text-sm">📄 JSON Output</h3>
                <pre className="text-xs overflow-x-auto p-3 rounded bg-white border border-gray-200 text-gray-800 max-h-64 overflow-y-auto whitespace-pre-wrap break-words font-mono">
                  {converted.output.slice(0, 500)}
                  {converted.output.length > 500 && "..."}
                </pre>
              </div>
            )}

            {/* Error Message */}
            {converted && !converted.success && (
              <div className="rounded-xl p-4 border bg-red-50 border-red-200">
                <div className="font-semibold text-red-700 mb-2 text-sm">Conversion Error</div>
                <div className="text-xs text-red-600 font-mono break-words">
                  {converted.error}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full Output */}
        {validation.valid && converted?.success && converted.output && (
          <div className="rounded-xl border bg-white border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 text-sm">✨ Formatted JSON</h3>
              <button
                onClick={() => handleCopy(converted.output!, "full-output")}
                className="text-xs px-3 py-1 rounded transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                📋 Copy
              </button>
            </div>
            <div className="overflow-x-auto">
              <pre className="p-4 text-sm font-mono text-gray-800 bg-gradient-to-br from-gray-50 to-blue-50 leading-relaxed">
                {converted.output}
              </pre>
            </div>
          </div>
        )}
      </div>

      <YAMLToJSONSEOContent />

      <RelatedTools
        currentTool="yaml-to-json-converter"
        tools={["json-formatter", "csv-to-json-converter", "xml-to-json"]}
      />
    </>
  );
}

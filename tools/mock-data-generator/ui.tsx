"use client";

import { useState, useMemo } from "react";
import {
  fieldTypes,
  generateMockData,
  exportAsJSON,
  exportAsCSV,
  exportAsTSV,
  copyToClipboard,
  formatAsTable,
  formatAsJSON,
  formatAsCSV,
  FieldType,
  MockDataRecord
} from "./logic";
import MockDataGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type OutputFormat = "table" | "json" | "csv";

export default function MockDataGeneratorUI() {
  const [selectedFields, setSelectedFields] = useState<FieldType[]>(["name", "email", "phone"]);
  const [recordCount, setRecordCount] = useState(50);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("table");
  const [generatedData, setGeneratedData] = useState<MockDataRecord[]>([]);
  const [copied, setCopied] = useState(false);

  const handleFieldToggle = (field: FieldType) => {
    setSelectedFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const handleGenerate = () => {
    if (selectedFields.length === 0) return;
    const data = generateMockData(selectedFields, recordCount);
    setGeneratedData(data);
  };

  const handleCopy = async () => {
    if (generatedData.length === 0) return;
    
    let text = "";
    switch (outputFormat) {
      case "table":
        text = formatAsTable(generatedData);
        break;
      case "json":
        text = formatAsJSON(generatedData);
        break;
      case "csv":
        text = formatAsCSV(generatedData);
        break;
    }
    
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedOutput = useMemo(() => {
    if (generatedData.length === 0) return "";
    
    switch (outputFormat) {
      case "table":
        return formatAsTable(generatedData);
      case "json":
        return formatAsJSON(generatedData);
      case "csv":
        return formatAsCSV(generatedData);
      default:
        return "";
    }
  }, [generatedData, outputFormat]);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <h3 className="font-semibold text-green-900 mb-1">100% Secure & Private</h3>
              <p className="text-sm text-green-800">
                All data is generated locally in your browser using JavaScript. Nothing is sent to any server.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Field Selection */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Select Fields
              </h2>
              <div className="space-y-2">
                {Object.entries(fieldTypes).map(([key, config]) => (
                  <label
                    key={key}
                    className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFields.includes(key as FieldType)}
                      onChange={() => handleFieldToggle(key as FieldType)}
                      className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-xl">{config.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{config.label}</span>
                  </label>
                ))}
              </div>
              
              {selectedFields.length === 0 && (
                <p className="text-red-600 text-sm mt-3">Please select at least one field.</p>
              )}
            </div>

            {/* Generation Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Records: {recordCount}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10000"
                    value={recordCount}
                    onChange={(e) => setRecordCount(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>10,000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Output Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["table", "json", "csv"] as const).map((format) => (
                      <button
                        key={format}
                        onClick={() => setOutputFormat(format)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          outputFormat === format
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={selectedFields.length === 0}
                  className="w-full px-4 py-3 bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white rounded-lg font-semibold transition-colors"
                >
                  🎲 Generate Data
                </button>
              </div>
            </div>

            {/* Export Options */}
            {generatedData.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  Export Options
                </h2>
                
                <div className="space-y-2">
                  <button
                    onClick={handleCopy}
                    className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {copied ? "✓ Copied!" : "📋 Copy to Clipboard"}
                  </button>
                  
                  <button
                    onClick={() => exportAsJSON(generatedData)}
                    className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-semibold transition-colors"
                  >
                    📄 Download JSON
                  </button>
                  
                  <button
                    onClick={() => exportAsCSV(generatedData)}
                    className="w-full px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-semibold transition-colors"
                  >
                    📊 Download CSV
                  </button>
                  
                  <button
                    onClick={() => exportAsTSV(generatedData)}
                    className="w-full px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-semibold transition-colors"
                  >
                    📋 Download TSV
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Generated Data
                </h2>
                {generatedData.length > 0 && (
                  <div className="text-sm text-gray-500">
                    {generatedData.length} records
                  </div>
                )}
              </div>

              {generatedData.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎭</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Generated Yet</h3>
                  <p className="text-gray-500">
                    Select fields and click "Generate Data" to create mock data
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1 bg-black/10 hover:bg-black/20 rounded-lg text-xs font-semibold transition-all duration-200 backdrop-blur-sm"
                    >
                      📋 Copy
                    </button>
                  </div>
                  
                  <pre className="p-4 bg-gray-50 rounded-lg overflow-x-auto text-sm font-mono max-h-96 overflow-y-auto">
                    {formattedOutput}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MockDataGeneratorSEOContent />
      <RelatedTools
        currentTool="mock-data-generator"
        tools={["json-formatter", "password-generator", "username-generator"]}
      />
    </>
  );
}
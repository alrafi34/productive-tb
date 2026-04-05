"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getDeviceMetrics,
  formatMetrics,
  exportAsJSON,
  exportAsBugReport,
  saveToHistory,
  getHistory,
  clearHistory,
  DeviceMetrics,
  MetricsHistory
} from "./logic";
import ScreenResolutionCheckerSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function ScreenResolutionCheckerUI() {
  const [metrics, setMetrics] = useState<DeviceMetrics | null>(null);
  const [history, setHistory] = useState<MetricsHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Initialize metrics on mount
  useEffect(() => {
    const updateMetrics = () => {
      const newMetrics = getDeviceMetrics();
      setMetrics(newMetrics);
      saveToHistory(newMetrics);
      setHistory(getHistory());
    };

    updateMetrics();
    setHistory(getHistory());

    // Listen for resize and orientation changes
    window.addEventListener("resize", updateMetrics);
    window.addEventListener("orientationchange", updateMetrics);

    return () => {
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("orientationchange", updateMetrics);
    };
  }, []);

  const copyToClipboard = useCallback((text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  const handleCopyJSON = useCallback(() => {
    if (metrics) {
      copyToClipboard(JSON.stringify(metrics, null, 2), "json");
    }
  }, [metrics, copyToClipboard]);

  const handleCopyBugReport = useCallback(() => {
    if (metrics) {
      const report = exportAsBugReport(metrics);
      copyToClipboard(report, "report");
    }
  }, [metrics, copyToClipboard]);

  const handleExportJSON = useCallback(() => {
    if (metrics) {
      exportAsJSON(metrics);
    }
  }, [metrics]);

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  if (!metrics) return null;

  const formatted = formatMetrics(metrics);
  const metricsArray = Object.entries(formatted);

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Main Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metricsArray.map(([key, value]) => (
            <div
              key={key}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
            >
              <div className="text-xs font-medium text-gray-500 mb-1">{key}</div>
              <div className="text-lg font-bold text-gray-900 font-mono break-all">{value}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap gap-2">
          <button
            onClick={handleCopyJSON}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              copied === "json"
                ? "bg-green-600 text-white"
                : "bg-gray-900 hover:bg-gray-800 text-white"
            }`}
          >
            {copied === "json" ? "✓ Copied JSON" : "📋 Copy JSON"}
          </button>

          <button
            onClick={handleCopyBugReport}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              copied === "report"
                ? "bg-green-600 text-white"
                : "bg-primary hover:bg-primary-hover text-white"
            }`}
          >
            {copied === "report" ? "✓ Copied Report" : "📄 Copy Bug Report"}
          </button>

          <button
            onClick={handleExportJSON}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            💾 Export JSON
          </button>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors ml-auto"
          >
            {showHistory ? "Hide" : "Show"} History
          </button>
        </div>

        {/* History Section */}
        {showHistory && (
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Metrics History (Last 20)</h3>
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-medium transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="text-center text-gray-500 py-6 text-sm">No history yet</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-gray-50 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-semibold text-gray-900">
                        {item.metrics.viewportWidth} × {item.metrics.viewportHeight}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Screen: {item.metrics.screenWidth} × {item.metrics.screenHeight} • DPR: {item.metrics.devicePixelRatio}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">💡 Metrics Explained</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div>
              <span className="font-medium">Screen Resolution:</span> Physical screen dimensions
            </div>
            <div>
              <span className="font-medium">Viewport Size:</span> Visible area inside browser window
            </div>
            <div>
              <span className="font-medium">Device Pixel Ratio:</span> Physical pixels per CSS pixel (1 = standard, 2+ = retina)
            </div>
            <div>
              <span className="font-medium">Orientation:</span> Portrait or landscape mode
            </div>
            <div>
              <span className="font-medium">Color Depth:</span> Number of bits per pixel (24-bit = 16.7M colors)
            </div>
          </div>
        </div>
      </div>

      <ScreenResolutionCheckerSEOContent />
      <RelatedTools
        currentTool="screen-resolution-checker"
        tools={["user-agent-parser", "responsive-breakpoint-tester", "css-flexbox-playground"]}
      />
    </>
  );
}

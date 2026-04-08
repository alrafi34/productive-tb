"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  generateQRCode,
  downloadQRCode,
  copyQRCodeToClipboard,
  detectInputType,
  generateWiFiString,
  parseWiFiString,
  validateInput,
  saveToHistory,
  getHistory,
  clearHistory,
  debounce,
  getPresetExample
} from "./logic";
import { QROptions, QRHistory, WiFiConfig } from "./types";
import QRCodeGeneratorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function QRCodeGeneratorUI() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [options, setOptions] = useState<QROptions>({
    text: "",
    size: 256,
    errorCorrectionLevel: "M",
    foregroundColor: "#000000",
    backgroundColor: "#ffffff"
  });
  
  const [inputType, setInputType] = useState<string>("text");
  const [validation, setValidation] = useState<{ valid: boolean; message?: string }>({ valid: true });
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<QRHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showWiFiBuilder, setShowWiFiBuilder] = useState(false);
  
  // WiFi configuration
  const [wifiConfig, setWifiConfig] = useState<WiFiConfig>({
    ssid: "",
    password: "",
    security: "WPA",
    hidden: false
  });
  
  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);
  
  // Debounced QR generation
  const debouncedGenerate = useCallback(
    debounce((opts: QROptions) => {
      if (canvasRef.current && opts.text.trim()) {
        generateQRCode(opts, canvasRef.current);
      }
    }, 150),
    []
  );
  
  // Generate QR code when options change
  useEffect(() => {
    const validation = validateInput(options.text);
    setValidation(validation);
    
    if (validation.valid) {
      setInputType(detectInputType(options.text));
      debouncedGenerate(options);
    }
  }, [options, debouncedGenerate]);
  
  // Handle text input change
  const handleTextChange = (text: string) => {
    setOptions(prev => ({ ...prev, text }));
  };
  
  // Handle preset selection
  const handlePresetSelect = (preset: string) => {
    const example = getPresetExample(preset);
    setOptions(prev => ({ ...prev, text: example }));
    
    if (preset === 'wifi') {
      setShowWiFiBuilder(true);
    } else {
      setShowWiFiBuilder(false);
    }
  };
  
  // Generate WiFi QR code
  const handleWiFiGenerate = () => {
    const wifiString = generateWiFiString(wifiConfig);
    setOptions(prev => ({ ...prev, text: wifiString }));
    setShowWiFiBuilder(false);
  };
  
  // Download QR code
  const handleDownload = () => {
    if (canvasRef.current && options.text.trim()) {
      const filename = `qr-code-${Date.now()}`;
      downloadQRCode(canvasRef.current, filename);
      
      // Save to history
      saveToHistory(options);
      setHistory(getHistory());
    }
  };
  
  // Copy to clipboard
  const handleCopy = async () => {
    if (canvasRef.current && options.text.trim()) {
      const success = await copyQRCodeToClipboard(canvasRef.current);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        
        // Save to history
        saveToHistory(options);
        setHistory(getHistory());
      }
    }
  };
  
  // Copy text to clipboard
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Load from history
  const loadFromHistory = (item: QRHistory) => {
    setOptions(item.options);
    setShowWiFiBuilder(false);
  };
  
  // Clear all history
  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        debouncedGenerate(options);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, debouncedGenerate]);
  
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
                All QR codes are generated locally in your browser. No data is sent to any server.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Quick Presets
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { id: 'url', label: '🌐 URL', desc: 'Website link' },
              { id: 'text', label: '📝 Text', desc: 'Plain text' },
              { id: 'email', label: '📧 Email', desc: 'Email address' },
              { id: 'phone', label: '📞 Phone', desc: 'Phone number' },
              { id: 'wifi', label: '📶 WiFi', desc: 'WiFi network' },
              { id: 'sms', label: '💬 SMS', desc: 'Text message' }
            ].map(({ id, label, desc }) => (
              <button
                key={id}
                onClick={() => handlePresetSelect(id)}
                className="p-3 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-center"
              >
                <div className="font-semibold text-sm text-gray-800">{label}</div>
                <div className="text-xs text-gray-500 mt-1">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Text Input */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Enter Content
                </h2>
                {inputType !== 'text' && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    <span>
                      {inputType === 'url' && '🌐'}
                      {inputType === 'email' && '📧'}
                      {inputType === 'phone' && '📞'}
                      {inputType === 'wifi' && '📶'}
                    </span>
                    {inputType.toUpperCase()} detected
                  </div>
                )}
              </div>
              
              <textarea
                value={options.text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Enter text, URL, or QR data..."
                className="w-full h-32 px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-primary resize-none"
              />
              
              {!validation.valid && validation.message && (
                <p className="text-red-600 text-sm mt-2">{validation.message}</p>
              )}
              
              <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                <span>{options.text.length} / 2000 characters</span>
                <span>Ctrl + Enter to generate</span>
              </div>
            </div>

            {/* WiFi Builder */}
            {showWiFiBuilder && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  WiFi QR Code Builder
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Network Name (SSID)
                    </label>
                    <input
                      type="text"
                      value={wifiConfig.ssid}
                      onChange={(e) => setWifiConfig(prev => ({ ...prev, ssid: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary"
                      placeholder="MyWiFi"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="text"
                      value={wifiConfig.password}
                      onChange={(e) => setWifiConfig(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary"
                      placeholder="password123"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Security Type
                    </label>
                    <select
                      value={wifiConfig.security}
                      onChange={(e) => setWifiConfig(prev => ({ ...prev, security: e.target.value as any }))}
                      className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">No Password</option>
                    </select>
                  </div>
                  
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={wifiConfig.hidden}
                      onChange={(e) => setWifiConfig(prev => ({ ...prev, hidden: e.target.checked }))}
                      className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">Hidden Network</span>
                  </label>
                  
                  <button
                    onClick={handleWiFiGenerate}
                    className="w-full px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors"
                  >
                    Generate WiFi QR Code
                  </button>
                </div>
              </div>
            )}

            {/* Customization Options */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Customization
              </h3>
              
              <div className="space-y-4">
                {/* Size */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Size: {options.size}px
                    </label>
                  </div>
                  <div className="flex gap-2">
                    {[128, 256, 512, 1024].map(size => (
                      <button
                        key={size}
                        onClick={() => setOptions(prev => ({ ...prev, size }))}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          options.size === size
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}px
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Error Correction */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Error Correction Level
                  </label>
                  <select
                    value={options.errorCorrectionLevel}
                    onChange={(e) => setOptions(prev => ({ ...prev, errorCorrectionLevel: e.target.value as any }))}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary"
                  >
                    <option value="L">Low (~7%)</option>
                    <option value="M">Medium (~15%)</option>
                    <option value="Q">Quartile (~25%)</option>
                    <option value="H">High (~30%)</option>
                  </select>
                </div>
                
                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foreground Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={options.foregroundColor}
                        onChange={(e) => setOptions(prev => ({ ...prev, foregroundColor: e.target.value }))}
                        className="w-12 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={options.foregroundColor}
                        onChange={(e) => setOptions(prev => ({ ...prev, foregroundColor: e.target.value }))}
                        className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary font-mono text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={options.backgroundColor}
                        onChange={(e) => setOptions(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="w-12 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={options.backgroundColor}
                        onChange={(e) => setOptions(prev => ({ ...prev, backgroundColor: e.target.value }))}
                        className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            {/* QR Code Preview */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  QR Code Preview
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    disabled={!options.text.trim() || !validation.valid}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    {copied ? '✓ Copied' : '📋 Copy'}
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!options.text.trim() || !validation.valid}
                    className="px-4 py-2 bg-primary hover:bg-primary-hover disabled:bg-gray-300 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    📥 Download PNG
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto border border-gray-200 rounded-lg"
                    style={{ 
                      width: Math.min(options.size, 300),
                      height: Math.min(options.size, 300)
                    }}
                  />
                </div>
              </div>
              
              {!options.text.trim() && (
                <p className="text-center text-gray-500 mt-4">
                  Enter text above to generate QR code
                </p>
              )}
            </div>

            {/* QR Code History */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                  Recent QR Codes
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    {showHistory ? 'Hide' : 'Show'}
                  </button>
                  {history.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
              
              {showHistory && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No QR codes generated yet</p>
                  ) : (
                    history.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-sm text-gray-800 truncate">
                            {item.text}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => loadFromHistory(item)}
                            className="px-2 py-1 bg-primary hover:bg-primary-hover text-white rounded text-xs font-semibold transition-colors"
                          >
                            Load
                          </button>
                          <button
                            onClick={() => copyText(item.text)}
                            className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-xs font-semibold transition-colors"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <QRCodeGeneratorSEOContent />
      <RelatedTools
        currentTool="qr-code-generator"
        tools={["base64-image-encoder", "url-encoder-decoder", "hash-generator"]}
      />
    </>
  );
}
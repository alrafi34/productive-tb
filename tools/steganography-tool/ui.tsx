"use client";

import { useState, useRef, DragEvent } from "react";
import {
  encodeMessage,
  decodeMessage,
  loadImageToCanvas,
  downloadCanvas,
  createDifferenceMap,
  getBinaryVisualization,
  formatFileSize,
  type ImageMetadata,
  type EncodingStrength
} from "./logic";
import SteganographyToolSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type Mode = "hide" | "extract";

export default function SteganographyToolUI() {
  const [mode, setMode] = useState<Mode>("hide");
  const [isDragging, setIsDragging] = useState(false);
  
  // Image state
  const [originalCanvas, setOriginalCanvas] = useState<HTMLCanvasElement | null>(null);
  const [encodedCanvas, setEncodedCanvas] = useState<HTMLCanvasElement | null>(null);
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  
  // Message state
  const [message, setMessage] = useState("");
  const [extractedMessage, setExtractedMessage] = useState("");
  const [password, setPassword] = useState("");
  const [usePassword, setUsePassword] = useState(false);
  const [strength, setStrength] = useState<EncodingStrength>("balanced");
  
  // UI state
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("");
  const [showDifference, setShowDifference] = useState(false);
  const [showBinary, setShowBinary] = useState(false);
  const [copied, setCopied] = useState<string>("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const encodedCanvasRef = useRef<HTMLCanvasElement>(null);

  const messageCapacity = metadata ? metadata.capacity : 0;
  const messageLength = message.length;
  const capacityPercentage = messageCapacity > 0 ? (messageLength / messageCapacity) * 100 : 0;

  async function handleFileSelect(file: File) {
    if (!file.type.startsWith('image/')) {
      setStatus("❌ Please select an image file");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

    setIsProcessing(true);
    setStatus("Loading image...");

    try {
      const { canvas, metadata: meta } = await loadImageToCanvas(file);
      setOriginalCanvas(canvas);
      setMetadata(meta);
      setEncodedCanvas(null);
      setExtractedMessage("");
      setStatus("✅ Image loaded successfully");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("❌ Failed to load image");
      setTimeout(() => setStatus(""), 3000);
    }

    setIsProcessing(false);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  async function handleEncode() {
    if (!originalCanvas || !message) {
      setStatus("❌ Please provide both image and message");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

    if (messageLength > messageCapacity) {
      setStatus("❌ Message too large for this image");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

    setIsProcessing(true);
    setStatus("Encoding message...");

    try {
      // Create a copy of the canvas
      const canvas = document.createElement('canvas');
      canvas.width = originalCanvas.width;
      canvas.height = originalCanvas.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(originalCanvas, 0, 0);
        
        const encoded = encodeMessage(
          canvas,
          message,
          usePassword ? password : undefined,
          strength
        );
        
        setEncodedCanvas(encoded);
        setStatus("✅ Message encoded successfully");
        setTimeout(() => setStatus(""), 3000);
      }
    } catch (error) {
      setStatus("❌ Encoding failed: " + (error as Error).message);
      setTimeout(() => setStatus(""), 3000);
    }

    setIsProcessing(false);
  }

  async function handleDecode() {
    if (!originalCanvas) {
      setStatus("❌ Please upload an encoded image");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

    setIsProcessing(true);
    setStatus("Extracting message...");

    try {
      const decoded = decodeMessage(
        originalCanvas,
        usePassword ? password : undefined,
        strength
      );
      
      setExtractedMessage(decoded);
      setStatus("✅ Message extracted successfully");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("❌ Extraction failed: " + (error as Error).message);
      setTimeout(() => setStatus(""), 3000);
    }

    setIsProcessing(false);
  }

  function handleDownload() {
    if (!encodedCanvas) return;
    downloadCanvas(encodedCanvas, 'encoded-image.png', 'png');
  }

  function handleCopy(text: string, type: string) {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  }

  function switchMode(newMode: Mode) {
    setMode(newMode);
    setOriginalCanvas(null);
    setEncodedCanvas(null);
    setMetadata(null);
    setMessage("");
    setExtractedMessage("");
    setStatus("");
  }

  // Render canvases
  if (originalCanvas && originalCanvasRef.current) {
    const ctx = originalCanvasRef.current.getContext('2d');
    if (ctx) {
      originalCanvasRef.current.width = originalCanvas.width;
      originalCanvasRef.current.height = originalCanvas.height;
      ctx.drawImage(originalCanvas, 0, 0);
    }
  }

  if (encodedCanvas && encodedCanvasRef.current) {
    const ctx = encodedCanvasRef.current.getContext('2d');
    if (ctx) {
      encodedCanvasRef.current.width = encodedCanvas.width;
      encodedCanvasRef.current.height = encodedCanvas.height;
      ctx.drawImage(encodedCanvas, 0, 0);
    }
  }

  const binaryVisualization = originalCanvas ? getBinaryVisualization(originalCanvas, 3) : [];

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {/* Security Notice */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-800 text-center">
            🔒 <strong>100% Secure:</strong> All image processing happens locally in your browser. Images and messages are never uploaded.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => switchMode("hide")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              mode === "hide"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            🔒 Hide Message
          </button>
          <button
            onClick={() => switchMode("extract")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              mode === "extract"
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            🔓 Extract Message
          </button>
        </div>

        {/* File Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mb-6 border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-primary bg-blue-50"
              : "bg-gray-50 border-gray-300 hover:border-primary hover:bg-gray-100"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="text-5xl mb-4">🖼️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            {isDragging ? "Drop image here" : mode === "hide" ? "Upload Image to Hide Message" : "Upload Encoded Image"}
          </h3>
          <p className="text-sm text-gray-600">PNG, JPG, WEBP supported (PNG recommended)</p>
        </div>

        {/* Image Metadata */}
        {metadata && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              📊 Image Information
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Resolution:</span>
                <p className="text-gray-800">{metadata.width} × {metadata.height}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">File Size:</span>
                <p className="text-gray-800">{formatFileSize(metadata.size)}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Message Capacity:</span>
                <p className="text-gray-800">{metadata.capacity.toLocaleString()} characters</p>
              </div>
            </div>
          </div>
        )}

        {/* Hide Message Mode */}
        {mode === "hide" && originalCanvas && (
          <>
            {/* Secret Message Input */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
                  Secret Message
                </label>
                <span className={`text-xs font-semibold ${
                  capacityPercentage > 100 ? "text-red-600" : capacityPercentage > 80 ? "text-yellow-600" : "text-gray-600"
                }`}>
                  {messageLength} / {messageCapacity} characters ({Math.round(capacityPercentage)}%)
                </span>
              </div>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Enter your secret message here..."
                rows={6}
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                style={{ fontFamily: "var(--font-body)" }}
              />
              {capacityPercentage > 100 && (
                <p className="text-xs text-red-600 mt-2">⚠️ Message exceeds image capacity</p>
              )}
            </div>

            {/* Password Protection */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  id="usePassword"
                  checked={usePassword}
                  onChange={e => setUsePassword(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="usePassword" className="text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
                  Password Protection (Optional)
                </label>
              </div>
              {usePassword && (
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              )}
            </div>

            {/* Encoding Strength */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Encoding Strength
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["low", "balanced", "high"] as EncodingStrength[]).map(level => (
                  <button
                    key={level}
                    onClick={() => setStrength(level)}
                    className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all capitalize ${
                      strength === level
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {strength === "low" && "Faster encoding, less distributed"}
                {strength === "balanced" && "Recommended balance of speed and distribution"}
                {strength === "high" && "More distributed across pixels, slower"}
              </p>
            </div>

            {/* Encode Button */}
            <div className="mb-6">
              <button
                onClick={handleEncode}
                disabled={!message || isProcessing || capacityPercentage > 100}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-md"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {isProcessing ? "⏳ Encoding..." : "🔒 Encode Message"}
              </button>
            </div>
          </>
        )}

        {/* Extract Message Mode */}
        {mode === "extract" && originalCanvas && (
          <>
            {/* Password Input */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  id="usePasswordExtract"
                  checked={usePassword}
                  onChange={e => setUsePassword(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="usePasswordExtract" className="text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
                  Image is Password Protected
                </label>
              </div>
              {usePassword && (
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontFamily: "var(--font-body)" }}
                />
              )}
            </div>

            {/* Encoding Strength */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Encoding Strength Used
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["low", "balanced", "high"] as EncodingStrength[]).map(level => (
                  <button
                    key={level}
                    onClick={() => setStrength(level)}
                    className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all capitalize ${
                      strength === level
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Extract Button */}
            <div className="mb-6">
              <button
                onClick={handleDecode}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-md"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {isProcessing ? "⏳ Extracting..." : "🔓 Extract Message"}
              </button>
            </div>

            {/* Extracted Message */}
            {extractedMessage && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>
                    Extracted Message
                  </label>
                  <button
                    onClick={() => handleCopy(extractedMessage, "extracted")}
                    className="text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg transition-colors font-semibold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {copied === "extracted" ? "✅ Copied!" : "📋 Copy"}
                  </button>
                </div>
                <div className="w-full rounded-xl border border-gray-200 bg-green-50 px-5 py-4 text-sm text-gray-800 shadow-sm min-h-[120px] whitespace-pre-wrap">
                  {extractedMessage}
                </div>
              </div>
            )}
          </>
        )}

        {/* Status Message */}
        {status && (
          <div className={`mb-6 text-center text-sm font-semibold ${
            status.includes("✅") ? "text-green-600" : status.includes("❌") ? "text-red-600" : "text-blue-600"
          }`}>
            {status}
          </div>
        )}

        {/* Image Preview */}
        {originalCanvas && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Image Preview
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Original Image</p>
                <canvas
                  ref={originalCanvasRef}
                  className="w-full border border-gray-200 rounded-lg"
                />
              </div>
              {encodedCanvas && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Encoded Image</p>
                  <canvas
                    ref={encodedCanvasRef}
                    className="w-full border border-gray-200 rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Download Button */}
        {encodedCanvas && (
          <div className="mb-6 flex gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              💾 Download Encoded Image
            </button>
          </div>
        )}

        {/* Binary Visualization */}
        {originalCanvas && binaryVisualization.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => setShowBinary(!showBinary)}
              className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {showBinary ? "▼" : "▶"} Binary Visualization (How it works)
            </button>
            {showBinary && (
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Sample Pixel Modifications</h3>
                <div className="space-y-3 font-mono text-xs">
                  {binaryVisualization.map((sample, index) => (
                    <div key={index} className="bg-white border border-purple-100 rounded-lg p-3">
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <span className="text-gray-600">Original:</span>
                          <p className="text-gray-900">{sample.pixel}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">LSB:</span>
                          <p className="text-primary font-bold">{sample.bit}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Modified:</span>
                          <p className="text-gray-900">{sample.modified}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Only the last bit (LSB) is modified, making changes invisible to the human eye.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <SteganographyToolSEOContent />
      
      <RelatedTools
        currentTool="steganography-tool"
        tools={['text-encryptor-aes', 'file-hash-generator', 'password-generator']}
      />
    </>
  );
}

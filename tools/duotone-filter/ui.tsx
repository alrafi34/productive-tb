"use client";

import { useState, useRef, useCallback } from "react";
import { DuotoneOptions, ProcessedImage } from "./types";
import { processImage, processBatch, DUOTONE_PRESETS } from "./logic";
import DuotoneFilterSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function DuotoneFilterUI() {
  const [darkColor, setDarkColor] = useState("#008080");
  const [lightColor, setLightColor] = useState("#FFA500");
  const [intensity, setIntensity] = useState(100);
  const [invert, setInvert] = useState(false);
  const [originalImages, setOriginalImages] = useState<string[]>([]);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setIsProcessing(true);
      const fileArray = Array.from(files);
      const originals = await Promise.all(
        fileArray.map(
          (file) =>
            new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.readAsDataURL(file);
            })
        )
      );

      setOriginalImages(originals);

      const options: DuotoneOptions = {
        darkColor,
        lightColor,
        intensity,
        invert,
      };

      try {
        const processed = await processBatch(fileArray, options);
        setProcessedImages(processed);
      } catch (error) {
        console.error("Error processing images:", error);
      } finally {
        setIsProcessing(false);
      }
    },
    [darkColor, lightColor, intensity, invert]
  );

  const reprocessImages = useCallback(async () => {
    if (originalImages.length === 0) return;

    setIsProcessing(true);
    const options: DuotoneOptions = {
      darkColor,
      lightColor,
      intensity,
      invert,
    };

    try {
      const files = await Promise.all(
        originalImages.map(async (url) => {
          const response = await fetch(url);
          const blob = await response.blob();
          return new File([blob], "image.png", { type: blob.type });
        })
      );
      const processed = await processBatch(files, options);
      setProcessedImages(processed);
    } catch (error) {
      console.error("Error reprocessing images:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [originalImages, darkColor, lightColor, intensity, invert]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const applyPreset = (preset: typeof DUOTONE_PRESETS[0]) => {
    setDarkColor(preset.darkColor);
    setLightColor(preset.lightColor);
  };

  const downloadImage = (image: ProcessedImage) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `duotone-${image.name}`;
    link.click();
  };

  const clearAll = () => {
    setOriginalImages([]);
    setProcessedImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
    <div className="space-y-8">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="text-6xl mb-4">🎨</div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Drag & Drop Images Here
          </p>
          <p className="text-sm text-gray-500 mb-4">or click to select files</p>
          <span className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Select Images
          </span>
        </label>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Color Presets</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {DUOTONE_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="p-3 border rounded-lg hover:border-blue-500 transition-colors text-center"
            >
              <div className="flex gap-1 mb-2 justify-center">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.darkColor }}
                />
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.lightColor }}
                />
              </div>
              <p className="text-xs font-medium">{preset.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Dark Color (Shadows)
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={darkColor}
                onChange={(e) => setDarkColor(e.target.value)}
                className="w-16 h-16 rounded border cursor-pointer"
              />
              <input
                type="text"
                value={darkColor}
                onChange={(e) => setDarkColor(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Light Color (Highlights)
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={lightColor}
                onChange={(e) => setLightColor(e.target.value)}
                className="w-16 h-16 rounded border cursor-pointer"
              />
              <input
                type="text"
                value={lightColor}
                onChange={(e) => setLightColor(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Intensity: {intensity}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="invert"
            checked={invert}
            onChange={(e) => setInvert(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="invert" className="text-sm font-medium">
            Invert Gradient
          </label>
        </div>

        {originalImages.length > 0 && (
          <button
            onClick={reprocessImages}
            disabled={isProcessing}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isProcessing ? "Processing..." : "Apply Changes"}
          </button>
        )}
      </div>

      {processedImages.length > 0 && (
        <div className="space-y-6">
          {processedImages.map((processed, index) => (
            <div key={index} className="bg-white rounded-xl border shadow-sm p-6">
              <div className="mb-4">
                <h3 className="font-semibold">{processed.name}</h3>
                <p className="text-sm text-gray-500">
                  {processed.width} × {processed.height}
                </p>
              </div>

              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={originalImages[index]}
                  alt="Original"
                  className="w-full"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  }}
                />
                <img
                  src={processed.url}
                  alt="Duotone"
                  className="absolute top-0 left-0 w-full"
                  style={{
                    clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                  }}
                />
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                  style={{ left: `${sliderPosition}%` }}
                  onMouseDown={(e) => {
                    const rect = e.currentTarget.parentElement!.getBoundingClientRect();
                    const handleMove = (e: MouseEvent) => {
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      setSliderPosition(Math.max(0, Math.min(100, x)));
                    };
                    const handleUp = () => {
                      document.removeEventListener("mousemove", handleMove);
                      document.removeEventListener("mouseup", handleUp);
                    };
                    document.addEventListener("mousemove", handleMove);
                    document.addEventListener("mouseup", handleUp);
                  }}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => downloadImage(processed)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={clearAll}
            className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear All
          </button>
        </div>
      )}
    </div>

    <DuotoneFilterSEOContent />

    <RelatedTools 
      currentTool="duotone-filter"
      tools={['image-to-grayscale', 'dithering-filter', 'image-compressor']} 
    />
    </>
  );
}

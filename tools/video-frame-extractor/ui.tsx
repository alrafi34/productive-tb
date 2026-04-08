"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  loadVideoFile,
  extractFrame,
  downloadFrame,
  copyFrameToClipboard,
  formatTime,
  formatFileSize,
  formatBitrate,
  getResolutionLabel,
  isValidVideoFile,
  checkVideoPerformance,
  seekToTime,
  cleanupFrames,
  getVideoStats,
  generateThumbnails,
  extractMultipleFrames,
  type VideoInfo,
  type ExtractedFrame,
  type ExtractionOptions,
} from "./logic";
import VideoFrameExtractorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function VideoFrameExtractorUI() {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [extractedFrames, setExtractedFrames] = useState<ExtractedFrame[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [performanceWarnings, setPerformanceWarnings] = useState<string[]>([]);
  const [thumbnails, setThumbnails] = useState<ExtractedFrame[]>([]);
  const [isGeneratingThumbnails, setIsGeneratingThumbnails] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [isBatchExtracting, setIsBatchExtracting] = useState(false);

  // Extraction options
  const [extractionOptions, setExtractionOptions] = useState<ExtractionOptions>({
    quality: 0.9,
    format: 'png',
    maintainAspectRatio: true,
    maxWidth: undefined,
    maxHeight: undefined,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video statistics
  const videoStats = useMemo(() => {
    if (!video || !videoInfo) return null;
    return getVideoStats(video, new File([], videoInfo.fileName));
  }, [video, videoInfo]);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!isValidVideoFile(file)) {
      setError("Please upload a valid video file (MP4, WebM, OGG, MOV, AVI, WMV, FLV, 3GP, MKV)");
      return;
    }

    // Check performance implications
    const perfCheck = checkVideoPerformance(file);
    setPerformanceWarnings(perfCheck.warnings);

    setError("");
    try {
      const { video: videoElement, info } = await loadVideoFile(file);
      setVideo(videoElement);
      setVideoInfo(info);
      setCurrentTime(0);
      setIsPlaying(false);
      setExtractedFrames([]);
      setThumbnails([]);

      // Auto-adjust quality for high-res videos
      if (perfCheck.isLikelyHighRes) {
        setExtractionOptions(prev => ({
          ...prev,
          quality: 0.8,
          format: 'jpeg' // JPEG is more efficient for high-res
        }));
      }

      if (videoRef.current) {
        videoRef.current.src = videoElement.src;
        videoRef.current.load();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load video");
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleTimelineClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !videoInfo) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * videoInfo.duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [videoInfo]);

  const handleFrameStep = useCallback((direction: 'forward' | 'backward') => {
    if (!videoRef.current) return;

    const step = 1 / 30; // Approximate frame step (30fps)
    const newTime = direction === 'forward' 
      ? Math.min(videoRef.current.currentTime + step, videoRef.current.duration)
      : Math.max(videoRef.current.currentTime - step, 0);
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, []);

  const handleExtractFrame = useCallback(async () => {
    if (!videoRef.current || !videoInfo) return;

    setIsExtracting(true);
    try {
      const frame = await extractFrame(videoRef.current, extractionOptions);
      setExtractedFrames(prev => [frame, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to extract frame");
    } finally {
      setIsExtracting(false);
    }
  }, [videoInfo, extractionOptions]);

  const handleBatchExtract = useCallback(async () => {
    if (!videoRef.current || !videoInfo) return;

    const count = 10;
    const interval = videoInfo.duration / (count + 1);
    const timestamps = Array.from({ length: count }, (_, i) => (i + 1) * interval);

    setIsBatchExtracting(true);
    setBatchProgress(0);

    try {
      const frames = await extractMultipleFrames(
        videoRef.current,
        timestamps,
        extractionOptions,
        (progress) => setBatchProgress(progress)
      );
      setExtractedFrames(prev => [...frames, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to extract frames");
    } finally {
      setIsBatchExtracting(false);
      setBatchProgress(0);
    }
  }, [videoInfo, extractionOptions]);

  const handleGenerateThumbnails = useCallback(async () => {
    if (!videoRef.current || !videoInfo) return;

    setIsGeneratingThumbnails(true);
    try {
      const thumbs = await generateThumbnails(videoRef.current, 10);
      setThumbnails(thumbs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate thumbnails");
    } finally {
      setIsGeneratingThumbnails(false);
    }
  }, [videoInfo]);

  const handleDownloadFrame = useCallback((frame: ExtractedFrame) => {
    downloadFrame(frame);
  }, []);

  const handleCopyFrame = useCallback(async (frame: ExtractedFrame) => {
    try {
      await copyFrameToClipboard(frame);
      setCopySuccess(frame.id);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      setError("Failed to copy frame to clipboard");
    }
  }, []);

  const handleRemoveFrame = useCallback((frameId: string) => {
    setExtractedFrames(prev => {
      const frameToRemove = prev.find(f => f.id === frameId);
      if (frameToRemove) {
        // Clean up blob URL
        if (frameToRemove.dataUrl.startsWith('blob:')) {
          URL.revokeObjectURL(frameToRemove.dataUrl);
        }
      }
      return prev.filter(f => f.id !== frameId);
    });
  }, []);

  const handleClearAll = useCallback(() => {
    cleanupFrames(extractedFrames);
    cleanupFrames(thumbnails);
    setExtractedFrames([]);
    setThumbnails([]);
  }, [extractedFrames, thumbnails]);

  // Update current time when video plays
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [video]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleFrameStep('backward');
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleFrameStep('forward');
          break;
        case 'Enter':
          e.preventDefault();
          handleExtractFrame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePlayPause, handleFrameStep, handleExtractFrame]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupFrames(extractedFrames);
      cleanupFrames(thumbnails);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Upload Area */}
      {!video && (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            isDragging ? 'border-primary bg-green-50' : 'border-gray-300 hover:border-primary'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-5xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Video File</h3>
          <p className="text-gray-600 mb-4">
            Drag and drop or click to select a video file
          </p>
          <p className="text-sm text-gray-500">Supports: MP4, WebM, OGG, MOV, AVI, WMV, FLV, 3GP, MKV</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {/* Performance Warnings */}
      {performanceWarnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Performance Notice</h4>
          {performanceWarnings.map((warning, index) => (
            <p key={index} className="text-yellow-700 text-sm">{warning}</p>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Video Player */}
      {video && videoInfo && (
        <div className="space-y-6">
          {/* Video Display */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{videoInfo.fileName}</h3>
              <div className="text-sm text-gray-500">
                {getResolutionLabel(videoInfo.width, videoInfo.height)} • {formatTime(videoInfo.duration)} • {formatFileSize(videoInfo.fileSize)}
              </div>
            </div>
            
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                className="w-full h-auto max-h-96 object-contain"
                onLoadedData={() => setCurrentTime(0)}
              />
              
              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayPause}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {isPlaying ? "⏸️" : "▶️"}
                  </button>
                  
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-white text-sm">{formatTime(currentTime)}</span>
                    <div
                      onClick={handleTimelineClick}
                      className="flex-1 h-2 bg-white/30 rounded-full cursor-pointer hover:bg-white/40 transition-colors"
                    >
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(currentTime / videoInfo.duration) * 100}%` }}
                      />
                    </div>
                    <span className="text-white text-sm">{formatTime(videoInfo.duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails Preview */}
          {thumbnails.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Video Thumbnails</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {thumbnails.map((thumb, index) => (
                  <div
                    key={thumb.id}
                    className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = thumb.timestamp;
                        setCurrentTime(thumb.timestamp);
                      }
                    }}
                  >
                    <img
                      src={thumb.dataUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-12 object-cover rounded border border-gray-200"
                    />
                    <div className="text-xs text-gray-500 text-center mt-1">
                      {formatTime(thumb.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Frame Controls */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Frame Controls</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleFrameStep('backward')}
                    className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    ⏮️ Previous
                  </button>
                  <button
                    onClick={() => handleFrameStep('forward')}
                    className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Next ⏭️
                  </button>
                </div>
                
                <button
                  onClick={handleExtractFrame}
                  disabled={isExtracting}
                  className="w-full px-4 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExtracting ? "⏳ Extracting..." : "📸 Extract Frame"}
                </button>

                <button
                  onClick={handleBatchExtract}
                  disabled={isBatchExtracting}
                  className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  {isBatchExtracting ? `⏳ ${Math.round(batchProgress * 100)}%` : "📋 Extract 10 Frames"}
                </button>

                <button
                  onClick={handleGenerateThumbnails}
                  disabled={isGeneratingThumbnails}
                  className="w-full px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  {isGeneratingThumbnails ? "⏳ Generating..." : "🖼️ Generate Thumbnails"}
                </button>
                
                <button
                  onClick={() => {
                    setVideo(null);
                    setVideoInfo(null);
                    handleClearAll();
                    setCurrentTime(0);
                    setIsPlaying(false);
                    setPerformanceWarnings([]);
                  }}
                  className="w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  🗑️ Clear Video
                </button>
              </div>
            </div>

            {/* Extraction Settings */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Extraction Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format
                  </label>
                  <select
                    value={extractionOptions.format}
                    onChange={(e) => setExtractionOptions(prev => ({ ...prev, format: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="png">PNG (Lossless)</option>
                    <option value="jpeg">JPEG (Smaller)</option>
                    <option value="webp">WebP (Modern)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quality: {Math.round(extractionOptions.quality * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={extractionOptions.quality}
                    onChange={(e) => setExtractionOptions(prev => ({ ...prev, quality: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Width (px)
                  </label>
                  <input
                    type="number"
                    placeholder="Original"
                    value={extractionOptions.maxWidth || ''}
                    onChange={(e) => setExtractionOptions(prev => ({ 
                      ...prev, 
                      maxWidth: e.target.value ? parseInt(e.target.value) : undefined 
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Height (px)
                  </label>
                  <input
                    type="number"
                    placeholder="Original"
                    value={extractionOptions.maxHeight || ''}
                    onChange={(e) => setExtractionOptions(prev => ({ 
                      ...prev, 
                      maxHeight: e.target.value ? parseInt(e.target.value) : undefined 
                    }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={extractionOptions.maintainAspectRatio}
                    onChange={(e) => setExtractionOptions(prev => ({ ...prev, maintainAspectRatio: e.target.checked }))}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-gray-700">Maintain Aspect Ratio</span>
                </label>
              </div>
            </div>

            {/* Video Stats */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Video Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Resolution</span>
                  <span className="font-medium">{getResolutionLabel(videoInfo.width, videoInfo.height)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{formatTime(videoInfo.duration)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">File Size</span>
                  <span className="font-medium">{formatFileSize(videoInfo.fileSize)}</span>
                </div>
                {videoStats && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bitrate</span>
                      <span className="font-medium">{formatBitrate(videoStats.bitrate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. Memory</span>
                      <span className="font-medium">{videoStats.estimatedMemoryUsage.toFixed(1)} MB</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Time</span>
                  <span className="font-medium">{formatTime(currentTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frames Extracted</span>
                  <span className="font-medium">{extractedFrames.length}</span>
                </div>
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Keyboard Shortcuts</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Play/Pause</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Space</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Previous Frame</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">←</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Frame</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">→</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Extract Frame</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd>
                </div>
              </div>
            </div>
          </div>

          {/* Extracted Frames */}
          {extractedFrames.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Extracted Frames ({extractedFrames.length})</h3>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {extractedFrames.map((frame) => (
                  <div key={frame.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={frame.dataUrl}
                      alt={`Frame at ${formatTime(frame.timestamp)}`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <div className="text-sm text-gray-600 mb-2">
                        {formatTime(frame.timestamp)} • {frame.width} × {frame.height} • {frame.format.toUpperCase()}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownloadFrame(frame)}
                          className="flex-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm font-semibold transition-colors"
                        >
                          📥 Download
                        </button>
                        <button
                          onClick={() => handleCopyFrame(frame)}
                          className="flex-1 px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded text-sm font-semibold transition-colors"
                        >
                          {copySuccess === frame.id ? "✓ Copied!" : "📋 Copy"}
                        </button>
                        <button
                          onClick={() => handleRemoveFrame(frame.id)}
                          className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm font-semibold transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <VideoFrameExtractorSEOContent />
      
      <RelatedTools
        currentTool="video-frame-extractor"
        tools={["audio-visualizer", "image-resizer", "image-compressor"]}
      />
    </div>
  );
}
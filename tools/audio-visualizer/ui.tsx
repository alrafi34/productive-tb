"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  initAudioContext,
  createAnalyser,
  loadAudioFile,
  startMicrophone,
  stopMicrophone,
  getFrequencyData,
  getWaveformData,
  resumeAudioContext,
  isAudioContextSupported,
  isMicrophoneSupported,
} from "./logic";
import AudioVisualizerSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

type VisualizationStyle = "bars" | "waveform" | "circular" | "radial";

function AudioVisualizerContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMicrophoneActive, setIsMicrophoneActive] = useState(false);
  const [visualizationStyle, setVisualizationStyle] = useState<VisualizationStyle>("bars");
  const [sensitivity, setSensitivity] = useState(1.0);
  const [fftSize, setFftSize] = useState(256);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isMicSupported, setIsMicSupported] = useState(false);

  useEffect(() => {
    setIsMicSupported(isMicrophoneSupported());
    setMounted(true);
  }, []);

  const drawBars = useCallback((ctx: CanvasRenderingContext2D, data: Uint8Array) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const barWidth = width / data.length;

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < data.length; i++) {
      const barHeight = (data[i] / 255) * height * sensitivity;
      const hue = (i / data.length) * 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
    }
  }, [sensitivity]);

  const drawWaveform = useCallback((ctx: CanvasRenderingContext2D, data: Uint8Array) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#058554";
    ctx.lineWidth = 2;
    ctx.beginPath();

    const sliceWidth = width / data.length;
    let x = 0;

    for (let i = 0; i < data.length; i++) {
      const v = (data[i] / 128.0) * sensitivity;
      const y = (v * height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();
  }, [sensitivity]);

  const drawCircular = useCallback((ctx: CanvasRenderingContext2D, data: Uint8Array) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < data.length; i++) {
      const angle = (i / data.length) * Math.PI * 2;
      const barLength = (data[i] / 255) * radius * sensitivity;

      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barLength);
      const y2 = centerY + Math.sin(angle) * (radius + barLength);

      const hue = (i / data.length) * 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }, [sensitivity]);

  const drawRadial = useCallback((ctx: CanvasRenderingContext2D, data: Uint8Array) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, width, height);

    const avgFreq = data.reduce((a, b) => a + b) / data.length;
    const pulseRadius = (avgFreq / 255) * 100 * sensitivity;

    ctx.fillStyle = `rgba(5, 133, 84, ${avgFreq / 255})`;
    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
    ctx.fill();

    for (let i = 0; i < data.length; i++) {
      const angle = (i / data.length) * Math.PI * 2;
      const barLength = (data[i] / 255) * 80 * sensitivity;

      const x = centerX + Math.cos(angle) * barLength;
      const y = centerY + Math.sin(angle) * barLength;

      const hue = (i / data.length) * 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [sensitivity]);

  const animate = useCallback(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    let data: Uint8Array;

    if (visualizationStyle === "waveform") {
      data = getWaveformData();
    } else {
      data = getFrequencyData();
    }

    if (visualizationStyle === "bars") {
      drawBars(ctx, data);
    } else if (visualizationStyle === "waveform") {
      drawWaveform(ctx, data);
    } else if (visualizationStyle === "circular") {
      drawCircular(ctx, data);
    } else if (visualizationStyle === "radial") {
      drawRadial(ctx, data);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [visualizationStyle, drawBars, drawWaveform, drawCircular, drawRadial]);

  useEffect(() => {
    if (isPlaying || isMicrophoneActive) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isMicrophoneActive, animate]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    try {
      resumeAudioContext();
      createAnalyser(fftSize);
      const audio = await loadAudioFile(file);
      audioRef.current = audio;
      setFileName(file.name);
      setDuration(audio.duration);
      setCurrentTime(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load audio");
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    resumeAudioContext();
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleMicrophoneToggle = async () => {
    if (isMicrophoneActive) {
      stopMicrophone();
      setIsMicrophoneActive(false);
      setIsPlaying(false);
      setFileName("");
    } else {
      setError("");
      try {
        resumeAudioContext();
        createAnalyser(fftSize);
        await startMicrophone();
        setIsMicrophoneActive(true);
        setIsPlaying(true);
        setFileName("Microphone Input");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to access microphone. Please check permissions.");
        setIsMicrophoneActive(false);
      }
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Canvas */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full h-auto rounded-lg bg-gray-50 border border-gray-200"
        />
      </div>

      {/* Timeline */}
      {fileName && !isMicrophoneActive && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">{fileName}</span>
            <span className="text-sm text-gray-500">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <div
            onClick={handleTimelineClick}
            className="w-full h-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"
          >
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Microphone Status */}
      {isMicrophoneActive && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-green-800 text-sm">🎤 Microphone is active and visualizing in real-time</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          {/* Audio Source */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Audio Source
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Audio File
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-gray-500 mt-1">MP3, WAV, OGG, M4A</p>
              </div>

              {mounted && isMicSupported && (
                <button
                  onClick={handleMicrophoneToggle}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isMicrophoneActive
                      ? "bg-red-100 hover:bg-red-200 text-red-700"
                      : "bg-primary hover:bg-primary-hover text-white"
                  }`}
                >
                  {isMicrophoneActive ? "🎤 Stop Microphone" : "🎤 Start Microphone"}
                </button>
              )}
              {mounted && !isMicSupported && (
                <div className="w-full px-4 py-2 rounded-lg text-sm text-gray-500 bg-gray-50 border border-gray-200">
                  🎤 Microphone not supported
                </div>
              )}
            </div>
          </div>

          {/* Playback Controls */}
          {fileName && !isMicrophoneActive && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Playback
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handlePlayPause}
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {isPlaying ? "⏸ Pause" : "▶ Play"}
                </button>
                <button
                  onClick={handleStop}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  ⏹ Stop
                </button>
              </div>
            </div>
          )}

          {/* Visualization Style */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Visualization
            </h2>
            <div className="space-y-2">
              {(["bars", "waveform", "circular", "radial"] as VisualizationStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => setVisualizationStyle(style)}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    visualizationStyle === style
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {style === "bars" && "📊 Frequency Bars"}
                  {style === "waveform" && "〰️ Waveform"}
                  {style === "circular" && "⭕ Circular"}
                  {style === "radial" && "🎯 Radial"}
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Settings
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Sensitivity</label>
                  <span className="text-sm text-gray-600">{sensitivity.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  value={sensitivity}
                  onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">FFT Resolution</label>
                <select
                  value={fftSize}
                  onChange={(e) => setFftSize(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {[64, 128, 256, 512, 1024, 2048].map((size) => (
                    <option key={size} value={size}>
                      {size} bins
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              How It Works
            </h2>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Upload Audio:</strong> Select an MP3, WAV, OGG, or M4A file to visualize its frequency spectrum in real-time.
              </p>
              <p>
                <strong>Microphone Input:</strong> Use your microphone to see live visualizations of your voice or ambient sound.
              </p>
              <p>
                <strong>Visualization Styles:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Frequency Bars:</strong> Classic vertical bars showing frequency amplitude</li>
                <li><strong>Waveform:</strong> Oscilloscope-style line showing audio wave</li>
                <li><strong>Circular:</strong> Radial bars arranged in a circle</li>
                <li><strong>Radial:</strong> Pulsing circle with frequency dots</li>
              </ul>
              <p>
                <strong>Sensitivity:</strong> Adjust how responsive the visualization is to audio levels.
              </p>
              <p>
                <strong>FFT Resolution:</strong> Higher values provide more frequency detail but use more processing power.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AudioVisualizerUI() {
  return (
    <>
      <AudioVisualizerContent />
      <AudioVisualizerSEOContent />
      <RelatedTools
        currentTool="audio-visualizer"
        tools={["webcam-photo-booth", "video-frame-extractor", "text-to-speech-preview"]}
      />
    </>
  );
}

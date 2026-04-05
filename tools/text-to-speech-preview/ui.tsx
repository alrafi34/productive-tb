"use client";

import { useState, useEffect, useRef } from 'react';
import {
  getAvailableVoices,
  filterVoicesByLanguage,
  speak,
  pause,
  resume,
  stop,
  isSpeaking,
  isPaused,
  saveSettings,
  loadSettings,
  downloadAsText,
  downloadAsMP3,
  VoiceOption,
  LANGUAGE_CODES
} from './logic';
import TextToSpeechSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function TextToSpeechPreviewUI() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption | null>(null);
  const [language, setLanguage] = useState('auto');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isSpeakingState, setIsSpeakingState] = useState(false);
  const [isPausedState, setIsPausedState] = useState(false);
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState('');

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize voices and settings
  useEffect(() => {
    if (typeof window === 'undefined') return;

    synthRef.current = window.speechSynthesis;
    
    const loadVoices = () => {
      const availableVoices = getAvailableVoices();
      setVoices(availableVoices);
      
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    loadVoices();
    
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = loadVoices;
    }

    // Load saved settings
    const saved = loadSettings();
    if (saved) {
      setRate(saved.rate || 1);
      setPitch(saved.pitch || 1);
      setVolume(saved.volume || 1);
      setLanguage(saved.language || 'auto');
    }

    // Setup speech event listeners
    const handleStart = () => setIsSpeakingState(true);
    const handleEnd = () => {
      setIsSpeakingState(false);
      setIsPausedState(false);
    };
    const handlePause = () => setIsPausedState(true);
    const handleResume = () => setIsPausedState(false);

    if (synthRef.current) {
      synthRef.current.addEventListener('start', handleStart);
      synthRef.current.addEventListener('end', handleEnd);
      synthRef.current.addEventListener('pause', handlePause);
      synthRef.current.addEventListener('resume', handleResume);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.removeEventListener('start', handleStart);
        synthRef.current.removeEventListener('end', handleEnd);
        synthRef.current.removeEventListener('pause', handlePause);
        synthRef.current.removeEventListener('resume', handleResume);
      }
    };
  }, []);

  // Update filtered voices when language changes
  useEffect(() => {
    if (voices.length === 0) return;
    
    const filtered = filterVoicesByLanguage(voices, language);
    if (filtered.length > 0) {
      setSelectedVoice(filtered[0]);
    }
  }, [language, voices]);

  // Save settings when they change
  useEffect(() => {
    saveSettings({ rate, pitch, volume, language });
  }, [rate, pitch, volume, language]);

  // Update character count
  useEffect(() => {
    setCharCount(text.length);
  }, [text]);

  const handlePlay = () => {
    if (!text.trim()) return;
    speak(text, selectedVoice, rate, pitch, volume);
  };

  const handlePause = () => {
    pause();
  };

  const handleResume = () => {
    resume();
  };

  const handleStop = () => {
    stop();
  };

  const handleClear = () => {
    setText('');
    stop();
  };

  const handleCopy = async () => {
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownloadMP3 = async () => {
    if (!text.trim()) return;
    
    setIsDownloading(true);
    setDownloadStatus('Preparing audio...');
    
    try {
      await downloadAsMP3(
        text,
        selectedVoice,
        rate,
        pitch,
        volume,
        (status) => setDownloadStatus(status)
      );
      setDownloadStatus('');
      setTimeout(() => setIsDownloading(false), 1000);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('Download failed. Please try again.');
      setIsDownloading(false);
    }
  };

  const filteredVoices = filterVoicesByLanguage(voices, language);

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* Privacy Notice */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <h3 className="font-semibold text-green-900 mb-1">100% Private & Secure</h3>
              <p className="text-sm text-green-800">
                All speech processing happens locally in your browser. No audio or text is sent to any server.
              </p>
            </div>
          </div>
        </div>

        {/* Text Input */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-gray-700">
              Enter Text to Convert
            </label>
            <span className="text-xs text-gray-500">
              {charCount} / 10,000 characters
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 10000))}
            placeholder="Type or paste text here to hear it spoken aloud..."
            className="w-full h-40 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-y text-gray-800 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={handleCopy}
              disabled={!text.trim()}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
            <button
              onClick={() => downloadAsText(text)}
              disabled={!text.trim()}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              📄 Download TXT
            </button>
            <button
              onClick={handleDownloadMP3}
              disabled={!text.trim() || isDownloading}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              {isDownloading ? '⏳ Recording...' : '🎵 Download MP3'}
            </button>
            <button
              onClick={handleClear}
              disabled={!text.trim()}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              🗑️ Clear
            </button>
          </div>
          {downloadStatus && (
            <div className="mt-2 text-xs text-gray-600">
              {downloadStatus}
            </div>
          )}
        </div>

        {/* Voice & Language Settings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Voice Settings
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                <option value="auto">Auto Detect</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ja">Japanese</option>
                <option value="zh">Chinese</option>
                <option value="ko">Korean</option>
                <option value="ru">Russian</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice
              </label>
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = filteredVoices.find(v => v.name === e.target.value);
                  if (voice) setSelectedVoice(voice);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                {filteredVoices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Speech Rate: {rate.toFixed(1)}x
                </label>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5x (Slow)</span>
                <span>2x (Fast)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Pitch: {pitch.toFixed(1)}
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Volume: {Math.round(volume * 100)}%
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isSpeakingState ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`} />
              <span className="text-sm font-medium text-gray-700">
                {isSpeakingState ? 'Playing' : isPausedState ? 'Paused' : 'Ready'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {!isSpeakingState && !isPausedState && (
              <button
                onClick={handlePlay}
                disabled={!text.trim()}
                className="px-4 py-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                ▶️ Play
              </button>
            )}

            {isSpeakingState && (
              <>
                <button
                  onClick={handlePause}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
                >
                  ⏸️ Pause
                </button>
                <button
                  onClick={handleStop}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  ⏹️ Stop
                </button>
              </>
            )}

            {isPausedState && (
              <>
                <button
                  onClick={handleResume}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors"
                >
                  ▶️ Resume
                </button>
                <button
                  onClick={handleStop}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                  ⏹️ Stop
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tips</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use slower rate (0.5–1.0) for clearer narration</li>
            <li>• Adjust pitch to match voice preference</li>
            <li>• Download MP3 to save audio locally</li>
            <li>• Available voices depend on your browser and OS</li>
            <li>• Works best with modern browsers (Chrome, Edge, Safari)</li>
          </ul>
        </div>
      </div>

      <TextToSpeechSEOContent />
      <RelatedTools currentTool="text-to-speech-preview" tools={["voice-to-text-notepad", "reading-time-calculator", "word-counter"]} />
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from 'react';
import {
  initializeSpeechRecognition,
  isSpeechRecognitionSupported,
  countWords,
  countCharacters,
  countCharactersNoSpaces,
  estimateReadingTime,
  downloadAsText,
  downloadAsMarkdown,
  copyToClipboard,
  saveCurrentNote,
  loadCurrentNote,
  saveSettings,
  loadSettings,
  saveNote,
  getSavedNotes,
  deleteSavedNote,
  clearAllSavedNotes,
  insertTimestamp,
  SUPPORTED_LANGUAGES,
  cleanupTranscript
} from './logic';
import { VoiceRecognitionState, NotepadSettings, SavedNote, SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from './types';
import VoiceToTextNotepadSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';

export default function VoiceToTextNotepadUI() {
  const [text, setText] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<NotepadSettings>({
    language: 'en-US',
    autoSave: true,
    autoScroll: true,
    showWordCount: true
  });
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef('');

  // Initialize on component mount
  useEffect(() => {
    const supported = isSpeechRecognitionSupported();
    setIsSupported(supported);
    
    if (supported) {
      recognitionRef.current = initializeSpeechRecognition();
      setupSpeechRecognition();
    }

    // Load saved data
    const savedText = loadCurrentNote();
    const savedSettings = loadSettings();
    const notes = getSavedNotes();
    
    setText(savedText);
    setSettings(savedSettings);
    setSavedNotes(notes);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Auto-save current note
  useEffect(() => {
    if (settings.autoSave && text) {
      const timeoutId = setTimeout(() => {
        saveCurrentNote(text);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [text, settings.autoSave]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (settings.autoScroll && textareaRef.current && isRecording) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [text, settings.autoScroll, isRecording]);

  const setupSpeechRecognition = () => {
    if (!recognitionRef.current) return;

    const recognition = recognitionRef.current;
    recognition.lang = settings.language;

    recognition.onstart = () => {
      setIsRecording(true);
      setError(null);
      finalTranscriptRef.current = text;
      startTimer();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = finalTranscriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscript += cleanupTranscript(transcript) + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      finalTranscriptRef.current = finalTranscript;
      setText(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setError(getErrorMessage(event.error));
      setIsRecording(false);
      stopTimer();
    };

    recognition.onend = () => {
      setIsRecording(false);
      setIsPaused(false);
      stopTimer();
    };
  };

  const getErrorMessage = (error: string): string => {
    switch (error) {
      case 'not-allowed':
        return 'Microphone access denied. Please allow microphone access and try again.';
      case 'no-speech':
        return 'No speech detected. Please try speaking again.';
      case 'audio-capture':
        return 'No microphone found. Please check your microphone connection.';
      case 'network':
        return 'Network error occurred. Please check your internet connection.';
      default:
        return `Speech recognition error: ${error}`;
    }
  };

  const startTimer = () => {
    setRecordingTime(0);
    intervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    if (!recognitionRef.current || !isSupported) return;
    
    setError(null);
    recognitionRef.current.lang = settings.language;
    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  const pauseRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (isPaused) {
      startRecording();
      setIsPaused(false);
    }
  };

  const clearText = () => {
    setText('');
    finalTranscriptRef.current = '';
    saveCurrentNote('');
  };

  const handleCopy = async () => {
    if (!text.trim()) return;
    
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveNote = () => {
    if (!text.trim()) return;
    
    const note = saveNote(text);
    setSavedNotes([note, ...savedNotes.slice(0, 9)]);
  };

  const handleDeleteNote = (id: string) => {
    deleteSavedNote(id);
    setSavedNotes(savedNotes.filter(note => note.id !== id));
  };

  const handleClearHistory = () => {
    clearAllSavedNotes();
    setSavedNotes([]);
  };

  const handleLoadNote = (content: string) => {
    setText(content);
    finalTranscriptRef.current = content;
  };

  const handleSettingsChange = (newSettings: Partial<NotepadSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveSettings(updated);
    
    // Update recognition language if changed
    if (newSettings.language && recognitionRef.current) {
      recognitionRef.current.lang = newSettings.language;
    }
  };

  const insertTimestampAtCursor = () => {
    const timestamp = insertTimestamp();
    const textarea = textareaRef.current;
    
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = text.substring(0, start) + timestamp + text.substring(end);
      setText(newText);
      
      // Set cursor position after timestamp
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + timestamp.length;
        textarea.focus();
      }, 0);
    } else {
      setText(text + timestamp);
    }
  };

  const stats = {
    words: countWords(text),
    characters: countCharacters(text),
    charactersNoSpaces: countCharactersNoSpaces(text),
    readingTime: estimateReadingTime(text)
  };

  if (!isSupported) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">🚫</div>
          <h2 className="text-xl font-semibold text-red-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Speech Recognition Not Supported
          </h2>
          <p className="text-red-700 mb-4">
            Your browser doesn't support the Web Speech API. Please use Chrome, Edge, or Safari for the best experience.
          </p>
          <div className="text-sm text-red-600">
            <strong>Supported browsers:</strong> Chrome (recommended), Edge, Safari (iOS 14.5+)
          </div>
        </div>
        <VoiceToTextNotepadSEOContent />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto">
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

        {/* Settings Panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Settings
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingsChange({ language: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) => handleSettingsChange({ autoSave: e.target.checked })}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Auto-save</span>
              </label>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoScroll}
                  onChange={(e) => handleSettingsChange({ autoScroll: e.target.checked })}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Auto-scroll</span>
              </label>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showWordCount}
                  onChange={(e) => handleSettingsChange({ showWordCount: e.target.checked })}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Show stats</span>
              </label>
            </div>
          </div>
        </div>

        {/* Recording Controls */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`} />
                <span className="text-sm font-medium text-gray-700">
                  {isRecording ? 'Recording' : isPaused ? 'Paused' : 'Ready'}
                </span>
              </div>
              
              {isRecording && (
                <div className="text-sm text-gray-500">
                  {formatTime(recordingTime)}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {!isRecording && !isPaused && (
                <button
                  onClick={startRecording}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  🎤 Start Recording
                </button>
              )}
              
              {isRecording && (
                <>
                  <button
                    onClick={pauseRecording}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
                  >
                    ⏸️ Pause
                  </button>
                  <button
                    onClick={stopRecording}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    ⏹️ Stop
                  </button>
                </>
              )}
              
              {isPaused && (
                <button
                  onClick={resumeRecording}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors"
                >
                  ▶️ Resume
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Text Editor */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              Your Notes
            </h2>
            <button
              onClick={insertTimestampAtCursor}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              🕒 Insert Time
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start speaking to create notes... or type here manually."
            className="w-full h-64 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-y text-gray-800 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          />

          {settings.showWordCount && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{stats.words}</div>
                <div className="text-xs text-gray-500">Words</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{stats.characters}</div>
                <div className="text-xs text-gray-500">Characters</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{stats.charactersNoSpaces}</div>
                <div className="text-xs text-gray-500">No Spaces</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{stats.readingTime} min</div>
                <div className="text-xs text-gray-500">Reading Time</div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              disabled={!text.trim()}
              className="px-4 py-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              {copied ? '✓ Copied' : '📋 Copy Notes'}
            </button>
            
            <button
              onClick={() => downloadAsText(text)}
              disabled={!text.trim()}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              📄 Download TXT
            </button>
            
            <button
              onClick={() => downloadAsMarkdown(text)}
              disabled={!text.trim()}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              📝 Download MD
            </button>
            
            <button
              onClick={handleSaveNote}
              disabled={!text.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              💾 Save Note
            </button>
            
            <button
              onClick={clearText}
              disabled={!text.trim()}
              className="px-4 py-2 bg-white border border-gray-200 hover:border-red-300 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 rounded-lg font-medium transition-colors"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Saved Notes History */}
        {savedNotes.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
                Saved Notes ({savedNotes.length})
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  {showHistory ? 'Hide' : 'Show'}
                </button>
                {savedNotes.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {showHistory && (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {savedNotes.map((note) => (
                  <div key={note.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-800 line-clamp-3 mb-2">
                          {note.content.substring(0, 150)}
                          {note.content.length > 150 && '...'}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{new Date(note.timestamp).toLocaleString()}</span>
                          <span>{note.wordCount} words</span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleLoadNote(note.content)}
                          className="px-2 py-1 bg-primary hover:bg-primary-hover text-white rounded text-xs font-medium transition-colors"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <VoiceToTextNotepadSEOContent />
      <RelatedTools currentTool="voice-to-text-notepad" tools={["word-counter", "text-to-clipboard", "reading-time-calculator"]} />
    </>
  );
}
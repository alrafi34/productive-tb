"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  LANGUAGES,
  applyCommands,
  commandsFor,
  copyText,
  countWords,
  defaultLanguage,
  downloadMarkdown,
  downloadText,
  downloadWord,
  errorMessage,
  formatDuration,
  getRecognitionCtor,
  insertChunk,
  isAndroid,
  knownBrokenBrowser,
  loadNote,
  loadSavedNotes,
  loadSettings,
  makeSavedNote,
  readingMinutes,
  storeNote,
  storeSavedNotes,
  storeSettings,
} from './logic';
import type { NotepadSettings, SavedNote, SpeechRecognition, SpeechRecognitionErrorEvent, SpeechRecognitionEvent } from './types';
import VoiceToTextNotepadSEOContent from './seo-content';
import RelatedTools from '@/components/RelatedTools';
import RelatedStrip from '@/components/RelatedStrip';

type Status = 'idle' | 'starting' | 'listening' | 'paused';
type Undo = { text: string; label: string } | null;

const btn = 'px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

const PUNCTUATION: [string, string, string][] = [
  ['.', '.', 'Period'], [',', ',', 'Comma'], ['?', '?', 'Question mark'], ['!', '!', 'Exclamation mark'],
  [':', ':', 'Colon'], [';', ';', 'Semicolon'], ['↵', '\n', 'New line'], ['¶', '\n\n', 'New paragraph'],
];

export default function VoiceToTextNotepadUI() {
  const [text, setText] = useState('');
  const [interim, setInterim] = useState('');
  /* null until checked in the browser, so the server never renders a
     "not supported" message */
  const [supported, setSupported] = useState<boolean | null>(null);
  const [brokenBrowser, setBrokenBrowser] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<NotepadSettings>({ language: 'en-US', autoSave: true, voiceCommands: true, autoCapitalize: true });
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [undo, setUndo] = useState<Undo>(null);
  const [loaded, setLoaded] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recRef = useRef<SpeechRecognition | null>(null);
  // Latest values for the recognition callbacks, which outlive renders
  const textRef = useRef('');
  const caretRef = useRef(0);
  const settingsRef = useRef(settings);
  const wantRef = useRef(false);
  const restartsRef = useRef<number[]>([]);

  useEffect(() => { settingsRef.current = settings; }, [settings]);

  const setNote = useCallback((next: string, caret = next.length) => {
    textRef.current = next;
    caretRef.current = caret;
    setText(next);
  }, []);

  // ---- Load on mount ----
  useEffect(() => {
    setSupported(!!getRecognitionCtor());
    setBrokenBrowser(knownBrokenBrowser());
    const s = loadSettings(defaultLanguage(navigator.languages?.length ? navigator.languages : [navigator.language]));
    setSettings(s);
    settingsRef.current = s;
    if (s.autoSave) setNote(loadNote());
    setSavedNotes(loadSavedNotes());
    setLoaded(true);
    return () => {
      wantRef.current = false;
      recRef.current?.abort();
    };
  }, [setNote]);

  // ---- Keep the current note on this device ----
  useEffect(() => {
    if (!loaded || !settings.autoSave) return;
    const id = setTimeout(() => storeNote(text), 500);
    return () => clearTimeout(id);
  }, [text, settings.autoSave, loaded]);

  // ---- Listening timer ----
  useEffect(() => {
    if (status !== 'listening') return;
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  const updateSettings = (patch: Partial<NotepadSettings>) => {
    const next = { ...settingsRef.current, ...patch };
    setSettings(next);
    settingsRef.current = next;
    storeSettings(next);
    if (patch.autoSave === false) storeNote('');
    if (patch.autoSave === true) storeNote(textRef.current);
    // A new language takes effect on a fresh session
    if (patch.language && wantRef.current) recRef.current?.abort();
  };

  /* Puts dictated or clicked text where the caret is */
  const insert = useCallback((raw: string) => {
    const s = settingsRef.current;
    const chunk = s.voiceCommands ? applyCommands(raw, s.language) : raw;
    const at = Math.min(caretRef.current, textRef.current.length);
    const { text: next, caret } = insertChunk(textRef.current, at, chunk, s.autoCapitalize);
    setNote(next, caret);
    const ta = textareaRef.current;
    if (ta && document.activeElement === ta) {
      requestAnimationFrame(() => ta.setSelectionRange(caret, caret));
    } else if (ta && caret >= next.length - 1) {
      requestAnimationFrame(() => { ta.scrollTop = ta.scrollHeight; });
    }
  }, [setNote]);

  const startSession = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;
    const rec = new Ctor();
    // Android Chrome repeats earlier words in continuous mode; short
    // sessions restarted on end avoid that
    rec.continuous = !isAndroid();
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.lang = settingsRef.current.language;

    rec.onstart = () => {
      if (recRef.current !== rec) return;
      setStatus('listening');
    };
    rec.onresult = (e: SpeechRecognitionEvent) => {
      if (recRef.current !== rec) return;
      let pending = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) insert(r[0].transcript);
        else pending += r[0].transcript;
      }
      setInterim(pending);
    };
    rec.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (recRef.current !== rec) return;
      const msg = errorMessage(e.error, knownBrokenBrowser());
      if (msg) {
        wantRef.current = false;
        setError(msg);
      }
    };
    rec.onend = () => {
      if (recRef.current !== rec) return;
      setInterim('');
      if (!wantRef.current) {
        recRef.current = null;
        setStatus(s => (s === 'paused' ? 'paused' : 'idle'));
        return;
      }
      // The browser ends sessions after silence or a time limit: carry on,
      // unless it keeps ending straight away
      const now = Date.now();
      restartsRef.current = [...restartsRef.current.filter(t => now - t < 10000), now];
      if (restartsRef.current.length > 6) {
        wantRef.current = false;
        recRef.current = null;
        setStatus('idle');
        setError('Dictation keeps stopping. Check your microphone and internet connection, then press Start again.');
        return;
      }
      setTimeout(() => { if (wantRef.current) startSession(); }, 150);
    };

    recRef.current = rec;
    try {
      rec.start();
    } catch {
      setError('Dictation could not start. Press Start again.');
      wantRef.current = false;
      recRef.current = null;
      setStatus('idle');
    }
  }, [insert]);

  const start = useCallback(() => {
    if (!getRecognitionCtor() || wantRef.current) return;
    setError(null);
    if (status !== 'paused') setElapsed(0);
    restartsRef.current = [];
    wantRef.current = true;
    setStatus('starting');
    startSession();
  }, [status, startSession]);

  const stopListening = useCallback((next: 'idle' | 'paused') => {
    wantRef.current = false;
    setStatus(next);
    // stop() (not abort) lets the last words arrive
    recRef.current?.stop();
  }, []);

  const listening = status === 'listening' || status === 'starting';

  // ---- Shortcut: Ctrl/⌘ + Shift + Space starts or stops ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.shiftKey && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (wantRef.current) stopListening('idle');
        else start();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [start, stopListening]);

  const trackCaret = () => {
    const ta = textareaRef.current;
    if (ta) caretRef.current = ta.selectionEnd;
  };

  const replaceNote = (next: string, label: string) => {
    if (textRef.current.trim()) setUndo({ text: textRef.current, label });
    setNote(next);
  };

  const clearNote = () => replaceNote('', 'Note cleared.');

  const restore = () => {
    if (!undo) return;
    setNote(undo.text);
    setUndo(null);
  };

  useEffect(() => {
    if (!undo) return;
    const id = setTimeout(() => setUndo(null), 15000);
    return () => clearTimeout(id);
  }, [undo]);

  const handleCopy = async () => {
    if (await copyText(text.trim())) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const saveToList = () => {
    if (!text.trim()) return;
    const list = [makeSavedNote(text.trim()), ...savedNotes].slice(0, 20);
    setSavedNotes(list);
    storeSavedNotes(list);
    setShowSaved(true);
  };

  const deleteSaved = (id: string) => {
    const list = savedNotes.filter(n => n.id !== id);
    setSavedNotes(list);
    storeSavedNotes(list);
  };

  const words = countWords(text);
  const hasText = text.trim().length > 0;
  const commandList = commandsFor(settings.language);
  const canDictate = supported === true;

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6">
        {supported === false && (
          <div role="alert" className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
            <strong>This browser has no speech recognition.</strong> Open this page in Chrome, Edge or Safari to dictate. You can still type, save and download notes here.
          </div>
        )}
        {supported && brokenBrowser && (
          <div role="status" className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
            {brokenBrowser} usually blocks speech recognition. If dictation does not start, open this page in Chrome, Edge or Safari.
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            {listening ? (
              <>
                <button onClick={() => stopListening('idle')} className={`${btn} bg-red-500 hover:bg-red-600 text-white px-5 py-3`}>
                  ⏹ Stop
                </button>
                <button onClick={() => stopListening('paused')} className={`${btn} bg-gray-100 hover:bg-gray-200 text-gray-800 py-3`}>
                  ⏸ Pause
                </button>
              </>
            ) : (
              <button onClick={start} disabled={!canDictate} className={`${btn} bg-primary hover:bg-primary-hover text-white px-5 py-3`}>
                🎤 {status === 'paused' ? 'Resume' : 'Start dictation'}
              </button>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-700" aria-live="polite">
              <span className={`w-3 h-3 rounded-full ${status === 'listening' ? 'bg-red-500 animate-pulse' : status === 'paused' ? 'bg-amber-400' : 'bg-gray-300'}`} />
              {status === 'listening' ? 'Listening' : status === 'starting' ? 'Starting…' : status === 'paused' ? 'Paused' : 'Ready'}
              {(listening || status === 'paused') && <span className="text-gray-500 font-mono">{formatDuration(elapsed)}</span>}
            </div>
            <label className="ml-auto flex items-center gap-2 text-sm text-gray-700">
              <span className="sr-only sm:not-sr-only">Language</span>
              <select
                value={settings.language}
                onChange={e => updateSettings({ language: e.target.value })}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary max-w-[14rem]"
                aria-label="Dictation language"
              >
                {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
            </label>
          </div>
          {error && (
            <div role="alert" className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex justify-between gap-3">
              <span>{error}</span>
              <button onClick={() => setError(null)} aria-label="Dismiss" className="font-bold shrink-0">✕</button>
            </div>
          )}
          <p className="mt-3 text-xs text-gray-500">
            Shortcut: Ctrl + Shift + Space (⌘ + Shift + Space on Mac) starts and stops dictation. Words go where the cursor is.
          </p>
        </div>

        {/* Editor */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-1.5 mb-3" aria-label="Insert punctuation">
            {PUNCTUATION.map(([label, value, name]) => (
              <button
                key={name}
                title={name}
                aria-label={name}
                onMouseDown={e => e.preventDefault()}
                onClick={() => insert(value)}
                className="min-w-9 h-9 px-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold"
              >
                {label}
              </button>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={e => { textRef.current = e.target.value; setText(e.target.value); caretRef.current = e.target.selectionEnd; }}
            onSelect={trackCaret}
            onKeyUp={trackCaret}
            onClick={trackCaret}
            placeholder={canDictate ? 'Press Start dictation and speak, or type here.' : 'Type your notes here.'}
            className="w-full h-72 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-y text-gray-800 leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
            aria-label="Your notes"
          />
          <div className="min-h-6 mt-2 text-sm text-gray-400 italic" aria-live="polite">
            {interim && <>Hearing: {interim}</>}
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">{words}</strong> words • <strong className="text-gray-900">{text.length}</strong> characters
              {words > 0 && <> • about {readingMinutes(text)} min to read</>}
            </p>
            <div className="flex flex-wrap gap-2">
              <button onClick={handleCopy} disabled={!hasText} className={`${btn} bg-primary hover:bg-primary-hover text-white`}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
              <button onClick={() => downloadWord(text.trim())} disabled={!hasText} className={`${btn} bg-gray-800 hover:bg-gray-900 text-white`}>Word</button>
              <button onClick={() => downloadText(text.trim())} disabled={!hasText} className={`${btn} bg-gray-800 hover:bg-gray-900 text-white`}>TXT</button>
              <button onClick={() => downloadMarkdown(text.trim())} disabled={!hasText} className={`${btn} bg-gray-800 hover:bg-gray-900 text-white`}>Markdown</button>
              <button onClick={saveToList} disabled={!hasText} className={`${btn} bg-blue-50 hover:bg-blue-100 text-blue-700`}>Save note</button>
              <button onClick={clearNote} disabled={!hasText} className={`${btn} bg-white border border-gray-200 hover:border-red-300 hover:text-red-600 text-gray-700`}>Clear</button>
            </div>
          </div>
          {undo && (
            <div role="status" className="mt-3 flex items-center justify-between gap-3 bg-gray-900 text-white text-sm rounded-lg px-4 py-2">
              <span>{undo.label}</span>
              <button onClick={restore} className="font-semibold underline">Undo</button>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Options</h2>
          <div className="grid sm:grid-cols-3 gap-3 text-sm text-gray-700">
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={settings.voiceCommands} onChange={e => updateSettings({ voiceCommands: e.target.checked })} className="mt-0.5 w-4 h-4" />
              <span>Voice commands for punctuation</span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={settings.autoCapitalize} onChange={e => updateSettings({ autoCapitalize: e.target.checked })} className="mt-0.5 w-4 h-4" />
              <span>Capitalize new sentences</span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={settings.autoSave} onChange={e => updateSettings({ autoSave: e.target.checked })} className="mt-0.5 w-4 h-4" />
              <span>Keep my note on this device</span>
            </label>
          </div>
          {settings.voiceCommands && (
            <div className="mt-4 text-sm text-gray-600">
              {commandList.length ? (
                <>
                  <p className="mb-2">Say these words to insert punctuation:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {commandList.map(([phrase, value]) => (
                      <span key={phrase} className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs">
                        “{phrase}” → <code className="font-semibold">{value === '\n' ? 'new line' : value === '\n\n' ? 'new paragraph' : value.trim()}</code>
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p>Voice commands are available in English, Spanish, French and German. For this language, use the punctuation buttons above the note.</p>
              )}
            </div>
          )}
        </div>

        {/* Saved notes */}
        {savedNotes.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'var(--font-heading)' }}>Saved notes ({savedNotes.length})</h2>
              <button onClick={() => setShowSaved(v => !v)} className={`${btn} px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700`}>
                {showSaved ? 'Hide' : 'Show'}
              </button>
            </div>
            {showSaved && (
              <ul className="space-y-2 max-h-96 overflow-y-auto">
                {savedNotes.map(note => (
                  <li key={note.id} className="border border-gray-200 rounded-lg p-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-gray-800 line-clamp-2 whitespace-pre-line">{note.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(note.timestamp).toLocaleString()} • {note.wordCount} words</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => replaceNote(note.content, 'Saved note opened.')} className={`${btn} px-2 py-1 bg-primary hover:bg-primary-hover text-white text-xs`}>Open</button>
                      <button onClick={() => deleteSaved(note.id)} className={`${btn} px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-xs`}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-xs text-gray-500">Saved notes stay on this device. Up to 20 are kept.</p>
          </div>
        )}
      </div>

      <RelatedStrip />
      <VoiceToTextNotepadSEOContent />
      <RelatedTools />
    </>
  );
}

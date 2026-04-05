import { VoiceRecognitionState, NotepadSettings, SavedNote, SpeechRecognition } from './types';

// Speech Recognition Setup
export function initializeSpeechRecognition(): SpeechRecognition | null {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    return null;
  }

  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognitionAPI();
  
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  
  return recognition;
}

export function isSpeechRecognitionSupported(): boolean {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

// Text Processing
export function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
}

export function countCharacters(text: string): number {
  return text.length;
}

export function countCharactersNoSpaces(text: string): number {
  return text.replace(/\s/g, '').length;
}

export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = countWords(text);
  return Math.ceil(wordCount / wordsPerMinute);
}

// File Operations
export function downloadAsText(content: string, filename: string = 'voice-notes.txt'): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadAsMarkdown(content: string, filename: string = 'voice-notes.md'): void {
  const markdownContent = `# Voice Notes\n\n${content}`;
  const blob = new Blob([markdownContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Clipboard Operations
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    } catch (fallbackError) {
      console.error('Failed to copy text:', fallbackError);
      return false;
    }
  }
}

// Local Storage Operations
const STORAGE_KEYS = {
  CURRENT_NOTE: 'voice-notepad-current',
  SETTINGS: 'voice-notepad-settings',
  SAVED_NOTES: 'voice-notepad-saved'
};

export function saveCurrentNote(content: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_NOTE, content);
  } catch (error) {
    console.error('Failed to save current note:', error);
  }
}

export function loadCurrentNote(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_NOTE) || '';
  } catch (error) {
    console.error('Failed to load current note:', error);
    return '';
  }
}

export function saveSettings(settings: NotepadSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

export function loadSettings(): NotepadSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  
  return {
    language: 'en-US',
    autoSave: true,
    autoScroll: true,
    showWordCount: true
  };
}

export function saveNote(content: string): SavedNote {
  const note: SavedNote = {
    id: generateId(),
    content,
    timestamp: Date.now(),
    wordCount: countWords(content)
  };

  try {
    const savedNotes = getSavedNotes();
    const updatedNotes = [note, ...savedNotes.slice(0, 9)]; // Keep only last 10 notes
    localStorage.setItem(STORAGE_KEYS.SAVED_NOTES, JSON.stringify(updatedNotes));
  } catch (error) {
    console.error('Failed to save note:', error);
  }

  return note;
}

export function getSavedNotes(): SavedNote[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_NOTES);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load saved notes:', error);
    return [];
  }
}

export function deleteSavedNote(id: string): void {
  try {
    const savedNotes = getSavedNotes();
    const updatedNotes = savedNotes.filter(note => note.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_NOTES, JSON.stringify(updatedNotes));
  } catch (error) {
    console.error('Failed to delete note:', error);
  }
}

export function clearAllSavedNotes(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.SAVED_NOTES);
  } catch (error) {
    console.error('Failed to clear saved notes:', error);
  }
}

// Utility Functions
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export function insertTimestamp(): string {
  const now = new Date();
  return `[${now.toLocaleTimeString()}] `;
}

// Language Options
export const SUPPORTED_LANGUAGES = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'hi-IN', name: 'Hindi' },
  { code: 'bn-IN', name: 'Bengali' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'ru-RU', name: 'Russian' },
  { code: 'ar-SA', name: 'Arabic' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'nl-NL', name: 'Dutch' }
];

// Text Processing Utilities
export function addLineBreaksOnPause(text: string): string {
  // Add line breaks after sentences that end with periods, exclamation marks, or question marks
  return text.replace(/([.!?])\s+/g, '$1\n\n');
}

export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function cleanupTranscript(text: string): string {
  // Remove extra spaces and clean up the transcript
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .split('. ')
    .map(sentence => capitalizeFirstLetter(sentence.trim()))
    .join('. ');
}
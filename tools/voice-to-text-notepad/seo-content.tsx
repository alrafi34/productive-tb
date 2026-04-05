import React from 'react';

export default function VoiceToTextNotepadSEOContent() {
  return (
    <div className="mt-16 prose prose-gray max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          About Voice-to-Text Notepad
        </h2>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Transform your spoken words into written text instantly with our free Voice-to-Text Notepad. 
            This powerful browser-based tool uses the Web Speech API to provide real-time speech recognition, 
            allowing you to dictate notes, ideas, and documents without typing a single word.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                🎤 Key Features
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Real-time speech transcription</li>
                <li>• Support for 15+ languages</li>
                <li>• Auto-save to browser storage</li>
                <li>• Download as TXT or Markdown</li>
                <li>• Word and character counting</li>
                <li>• Copy to clipboard functionality</li>
                <li>• Microphone status indicator</li>
                <li>• Pause and resume recording</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                🔒 Privacy & Security
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• 100% browser-based processing</li>
                <li>• No data sent to external servers</li>
                <li>• Local storage only</li>
                <li>• No registration required</li>
                <li>• Works offline after loading</li>
                <li>• Secure microphone access</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use Voice-to-Text Notepad
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Click the "Start Recording" button to begin voice recognition</li>
            <li>Allow microphone access when prompted by your browser</li>
            <li>Speak clearly and naturally - your words will appear in real-time</li>
            <li>Use the pause button to temporarily stop recording</li>
            <li>Edit the transcribed text manually if needed</li>
            <li>Copy your notes or download them as TXT/Markdown files</li>
            <li>Your notes are automatically saved to your browser's local storage</li>
          </ol>

          <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Perfect For
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Students:</strong> Take lecture notes, dictate essays, and capture study ideas quickly
            </div>
            <div>
              <strong>Writers:</strong> Capture inspiration, draft articles, and overcome writer's block
            </div>
            <div>
              <strong>Professionals:</strong> Create meeting notes, dictate emails, and document ideas
            </div>
            <div>
              <strong>Journalists:</strong> Record interviews, transcribe thoughts, and draft articles
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Browser Compatibility
          </h3>
          <p className="text-sm">
            This tool works best in modern browsers that support the Web Speech API, including:
            Chrome (desktop and mobile), Edge, Safari (iOS 14.5+), and Firefox (with experimental features enabled).
            For the best experience, use Chrome or Edge on desktop devices.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Speak clearly and at a moderate pace for best accuracy</li>
              <li>• Use punctuation commands like "period", "comma", "question mark"</li>
              <li>• Pause briefly between sentences for better formatting</li>
              <li>• Choose the correct language setting for your speech</li>
              <li>• Use a quiet environment to minimize background noise</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function TextToSpeechSEOContent() {
  return (
    <div className="mt-12 max-w-4xl mx-auto prose prose-sm">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What is Text-to-Speech Preview?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The Text-to-Speech Preview tool converts written text into spoken audio directly in your browser using the Web Speech API. 
          It allows you to hear how text sounds with different voices, languages, pitch levels, and speaking speeds—all without sending 
          any data to external servers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Key Features
        </h2>
        <ul className="text-gray-700 space-y-2">
          <li>✓ <strong>Multiple Voices:</strong> Choose from system-available voices</li>
          <li>✓ <strong>Language Support:</strong> Auto-detect or select specific languages</li>
          <li>✓ <strong>Pitch Control:</strong> Adjust voice pitch from low to high</li>
          <li>✓ <strong>Speed Control:</strong> Set speech rate from 0.5x to 2x</li>
          <li>✓ <strong>Volume Control:</strong> Adjust playback volume</li>
          <li>✓ <strong>Playback Controls:</strong> Play, pause, resume, and stop</li>
          <li>✓ <strong>100% Private:</strong> All processing happens locally in your browser</li>
          <li>✓ <strong>No API Cost:</strong> Uses native browser speech synthesis</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Use Cases
        </h2>
        <ul className="text-gray-700 space-y-2">
          <li>🎯 <strong>Accessibility Testing:</strong> Verify how screen readers will present content</li>
          <li>🎯 <strong>Content Creation:</strong> Preview narration for videos and podcasts</li>
          <li>🎯 <strong>Language Learning:</strong> Hear correct pronunciation of words and phrases</li>
          <li>🎯 <strong>Audiobook Production:</strong> Test voice quality before professional recording</li>
          <li>🎯 <strong>UI/UX Testing:</strong> Validate voice-based interface interactions</li>
          <li>🎯 <strong>Educational Materials:</strong> Create audio versions of learning content</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use
        </h2>
        <ol className="text-gray-700 space-y-3">
          <li><strong>1. Enter Text:</strong> Paste or type the text you want to convert to speech (up to 10,000 characters)</li>
          <li><strong>2. Select Language:</strong> Choose a language or use Auto Detect to match your text</li>
          <li><strong>3. Pick a Voice:</strong> Select from available system voices</li>
          <li><strong>4. Adjust Settings:</strong> Fine-tune speech rate, pitch, and volume to your preference</li>
          <li><strong>5. Play:</strong> Click the Play button to hear the text spoken aloud</li>
          <li><strong>6. Control Playback:</strong> Use Pause, Resume, or Stop buttons as needed</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Browser Compatibility
        </h2>
        <p className="text-gray-700 mb-3">
          The Web Speech API is supported in most modern browsers:
        </p>
        <ul className="text-gray-700 space-y-1">
          <li>✓ Chrome/Chromium (recommended)</li>
          <li>✓ Microsoft Edge</li>
          <li>✓ Safari (iOS 14.5+)</li>
          <li>✓ Opera</li>
          <li>⚠ Firefox (limited support)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Tips for Best Results
        </h2>
        <ul className="text-gray-700 space-y-2">
          <li>💡 Use slower speech rates (0.5–1.0x) for clearer, more professional narration</li>
          <li>💡 Adjust pitch to match your preferred voice tone</li>
          <li>💡 Test different voices to find the best fit for your content</li>
          <li>💡 Available voices vary by operating system and browser</li>
          <li>💡 Ensure your system volume is adequate for playback</li>
          <li>💡 Use headphones for better audio quality during testing</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Privacy & Security
        </h2>
        <p className="text-gray-700 leading-relaxed">
          All text-to-speech processing happens entirely in your browser using your device's native speech synthesis engine. 
          No text, audio, or personal data is sent to any server. Your content remains completely private and secure.
        </p>
      </section>
    </div>
  );
}

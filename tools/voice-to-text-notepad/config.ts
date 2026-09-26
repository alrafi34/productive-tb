export const toolConfig = {
  slug: "voice-to-text-notepad",
  name: "Voice-to-Text Notepad",
  description: "Click a button and speak — transcribe voice to text using the browser's Web Speech API. Download notes.",
  category: "productivity",
  icon: "🎤",
  free: true,
  backend: false,
  seo: {
    faq: [
      { q: "Which browsers support voice typing?", a: "Chrome, Edge and Safari support speech recognition. Firefox does not yet, so use one of the others." },
      { q: "Is my speech sent anywhere?", a: "Recognition is provided by your browser's speech service. In Chrome, audio is processed by Google's servers to produce the text; the notes themselves stay in your browser." },
      { q: "Which languages can I dictate in?", a: "Choose the language before you start; the browser supports many languages and regional accents, such as English (US or UK), Spanish, French and German." },
      { q: "Can I edit the text while dictating?", a: "Yes. The notepad is editable, so you can fix words, add punctuation and keep dictating." },
      { q: "How do I save my notes?", a: "Copy the text or download it as a file. Notes are not uploaded or stored on a server." },
    ],
    title: "Voice to Text Notepad – Dictate Notes Online Free",
    description: "Dictate notes with your microphone and see the text appear as you speak. Edit, copy or download the transcript. Free, no sign-up.",
    keywords: [
      "voice to text",
      "speech to text online",
      "dictation tool",
      "voice typing notepad",
      "free speech recognition tool",
      "voice notes",
      "speech recognition",
      "dictate notes",
      "voice transcription",
      "speech to text converter",
      "online dictation",
      "voice recorder",
      "speech notes",
      "voice memo",
      "transcription tool"
    ],
    openGraph: {
      title: "Free Voice-to-Text Notepad - Dictate Notes Online",
      description: "Convert speech to text instantly using your browser's built-in speech recognition. Dictate notes, edit them live, and download transcriptions for free.",
      type: "website",
      url: "/voice-to-text-notepad"
    }
  },
  features: [
    "Real-time speech transcription",
    "Multiple language support",
    "Live microphone recording indicator",
    "Auto-save notes to localStorage",
    "Download notes as TXT or Markdown",
    "Copy notes to clipboard",
    "Word and character counter",
    "No backend or API required"
  ]
};
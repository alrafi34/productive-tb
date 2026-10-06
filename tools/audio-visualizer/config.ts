export const toolConfig = {
  name: "Audio Visualizer",
  slug: "audio-visualizer",
  description: "Upload an audio file or use your microphone to see a real-time frequency bar chart visualization.",
  category: "multimedia",
  icon: "🎵",
  seo: {
    title: "Audio Visualizer – Real-Time Sound Frequency Visualizer",
    description: "Upload an audio file or use your microphone to see real-time frequency bars react to music and voice, directly in your browser.",
    keywords: "audio visualizer, sound visualizer, frequency spectrum analyzer, music visualizer online, web audio visualizer, real-time audio visualization, frequency bars",
    openGraph: {
      title: "Audio Visualizer – Real-Time Sound Frequency Visualizer",
      description: "Upload an audio file or use your microphone to see real-time frequency bars react to music and voice, directly in your browser.",
    },
    faq: [
      { q: "How does the audio visualizer work?", a: "It uses the browser's Web Audio API: an analyser node splits the sound into frequency bands many times a second (a fast Fourier transform), and the canvas draws those levels as bars, a waveform or circular patterns." },
      { q: "Can I use my microphone?", a: "Yes. Choose the microphone input and allow access when the browser asks. The sound is not recorded or stored." },
      { q: "Which audio files work?", a: "Any format your browser can play, which in current browsers includes MP3, WAV, OGG and AAC/M4A. We do not collect or store your files." },
      { q: "What does the FFT size setting change?", a: "It sets how many samples each analysis uses. A larger FFT size gives more, narrower frequency bars and finer detail but reacts slightly more slowly; a smaller one gives fewer, wider bars that react faster." },
      { q: "Why is nothing moving?", a: "Check that audio is actually playing and the volume is up, that the browser has microphone permission if you use the mic, and that the tab is not muted. Some browsers only start audio after you click play on the page." },
    ],
  },
};

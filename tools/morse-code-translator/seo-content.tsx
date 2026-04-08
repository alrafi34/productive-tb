const faqItems = [
  {
    question: "What is a Morse code translator?",
    answer:
      "A Morse code translator converts normal text into Morse code signals and can also decode Morse code back into readable text.",
  },
  {
    question: "Can this tool translate both directions?",
    answer:
      "Yes. You can switch between Text to Morse and Morse to Text modes instantly.",
  },
  {
    question: "Does the translator support numbers and punctuation?",
    answer:
      "Yes. It supports letters, numbers, spaces, and common punctuation symbols defined in the built-in Morse map.",
  },
  {
    question: "Can I customize dot and dash symbols?",
    answer:
      "Yes. You can choose different dot and dash characters to match your visual preference or platform format requirements.",
  },
  {
    question: "Can I adjust spacing rules?",
    answer:
      "Yes. You can control letter spacing and word separation for readable output or specific transmission formats.",
  },
  {
    question: "Does this tool include Morse audio playback?",
    answer:
      "Yes. In text-to-morse mode, you can play the output as audio beeps and set playback speed in words per minute.",
  },
  {
    question: "What is real-time conversion?",
    answer:
      "When enabled, the output updates automatically while you type so you can refine text without extra clicks.",
  },
  {
    question: "Why is this better than basic Morse converters?",
    answer:
      "It combines two-way translation, custom symbol settings, spacing control, audio playback, downloadable output, and reference table in one workflow.",
  },
  {
    question: "Can I copy or download translated output?",
    answer:
      "Yes. You can copy translated text to clipboard or download results as TXT files.",
  },
  {
    question: "Is my message private when using this tool?",
    answer:
      "Yes. Translation runs in your browser and your message is not sent to external servers.",
  },
];

const howToSteps = [
  "Choose Text to Morse or Morse to Text mode.",
  "Enter your source text or Morse sequence in the input area.",
  "Adjust settings for symbols, spacing, case handling, and playback speed if needed.",
  "Convert instantly or use real-time mode for live output updates.",
  "Copy, download, or play Morse audio and verify with the reference table.",
];

const strengths = [
  {
    title: "Two-way translation in one interface",
    text: "Switch directions quickly without leaving the page or using separate tools.",
  },
  {
    title: "Flexible formatting controls",
    text: "Customize dot/dash characters and spacing logic for readable or system-specific output.",
  },
  {
    title: "Audio-assisted Morse learning",
    text: "Play generated Morse code and adjust speed to support practice, training, and comprehension.",
  },
  {
    title: "Workflow-ready output actions",
    text: "Copy results, download files, and validate symbols with the built-in Morse reference chart.",
  },
];

const optionGuide = [
  {
    option: "Dot Symbol",
    use: "Select preferred dot style for display or communication formatting.",
  },
  {
    option: "Dash Symbol",
    use: "Choose dash style to match your target environment or visual standard.",
  },
  {
    option: "Letter Spacing",
    use: "Control gaps between Morse letters for clarity and parsing reliability.",
  },
  {
    option: "Word Separator",
    use: "Define how words are separated in Morse output for better readability.",
  },
  {
    option: "Playback Speed (WPM)",
    use: "Set Morse audio speed for beginner practice or faster listening drills.",
  },
  {
    option: "Real-time Convert",
    use: "Update output automatically while typing to speed up translation iterations.",
  },
];

const useCases = [
  {
    title: "Morse code learning",
    detail: "Practice encoding and decoding while comparing text and Morse side by side.",
  },
  {
    title: "Amateur radio preparation",
    detail: "Draft and validate Morse-style transmissions for CW communication workflows.",
  },
  {
    title: "Classroom demonstrations",
    detail: "Teach communication history and signal encoding with interactive translation.",
  },
  {
    title: "Puzzle and game design",
    detail: "Create Morse-based clues for escape rooms, ciphers, and scavenger hunts.",
  },
  {
    title: "Accessibility experiments",
    detail: "Explore alternate symbolic communication styles for non-verbal signaling contexts.",
  },
  {
    title: "Maritime and aviation study",
    detail: "Understand Morse references used in legacy and emergency communication training.",
  },
];

const mistakesToAvoid = [
  "Using inconsistent letter and word spacing that breaks decoding accuracy.",
  "Changing symbols without matching the same settings during reverse translation.",
  "Assuming all custom separators are universally accepted in external tools.",
  "Decoding Morse text without checking for extra spaces or malformed groups.",
  "Skipping playback speed adjustments when practicing listening-based Morse recognition.",
];

export default function SEOContent() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use the Morse code translator",
    description:
      "Choose translation direction, configure Morse settings, translate text, and copy, download, or play audio output.",
    step: howToSteps.map((step) => ({
      "@type": "HowToStep",
      text: step,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="max-w-4xl mx-auto mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Morse Code Translator for Fast Two-Way Conversion, Better Learning, and Reliable Signal Formatting
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Morse Code Translator</strong> converts plain text to Morse and decodes Morse back to text with customizable formatting.
            It is built for learners, radio enthusiasts, educators, and anyone using dot-dash communication patterns.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of using separate encoders and decoders, you can handle both directions, tune settings, and verify output from one interface.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic Morse Converters
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {strengths.map((point) => (
              <div key={point.title} className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
                <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {point.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {point.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-5" style={{ fontFamily: "var(--font-body)" }}>
            Basic translators often provide plain conversion only. This tool adds custom formatting, audio, and verification support.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use Morse Code Translator
          </h2>
          <ol className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {howToSteps.map((step, index) => (
              <li key={step} className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Option Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {optionGuide.map((item) => (
              <div key={item.option} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.option}</p>
                <p className="mt-1">{item.use}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Practical Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {useCases.map((item) => (
              <div key={item.title} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Common Morse Translation Mistakes to Avoid
          </h2>
          <ul className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {mistakesToAvoid.map((mistake) => (
              <li key={mistake} className="flex items-start gap-3">
                <span className="mt-1 text-red-500">-</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Translate Morse More Reliably with Two-Way Conversion, Audio Playback, and Configurable Formatting
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With customizable symbols, speed control, reference support, and export-ready output, this translator helps you work faster
            and avoid decoding mistakes across learning and communication tasks.
          </p>
        </section>
      </div>
    </>
  );
}

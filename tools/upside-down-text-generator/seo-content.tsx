const faqItems = [
  {
    question: "What is an upside-down text generator?",
    answer:
      "An upside-down text generator converts regular text into flipped Unicode characters to create visually inverted output for creative messaging.",
  },
  {
    question: "Can I convert upside-down text back to normal?",
    answer:
      "Yes. This tool supports reverse conversion using Upside-Down to Text mode.",
  },
  {
    question: "What flip modes are available?",
    answer:
      "You can use upside-down mode, mirror mode, or no-reverse mode depending on the effect you want.",
  },
  {
    question: "What do presets do?",
    answer:
      "Presets apply grouped settings quickly, such as Classic, Mirrored, or Fully Flipped styles.",
  },
  {
    question: "Can I preserve spaces and punctuation?",
    answer:
      "Yes. You can keep or alter spaces, punctuation, and line breaks using dedicated options.",
  },
  {
    question: "Does this tool work with multi-line text?",
    answer:
      "Yes. Multi-line input is supported, and line-break preservation can be toggled.",
  },
  {
    question: "Why is this better than simple text flippers?",
    answer:
      "It includes multi-mode transformation, presets, conversion back to normal text, realtime updates, and a Unicode character reference in one place.",
  },
  {
    question: "Can I copy and download the converted text?",
    answer:
      "Yes. You can copy output instantly and download it as a text file.",
  },
  {
    question: "Will upside-down text work on social platforms?",
    answer:
      "In most modern apps and platforms, Unicode flipped text displays correctly, though rendering can vary slightly by font.",
  },
  {
    question: "Is my text private when using this tool?",
    answer:
      "Yes. Processing runs in your browser and text is not sent to external servers.",
  },
];

const howToSteps = [
  "Select Text to Upside-Down or Upside-Down to Text mode.",
  "Enter your source text in the input area.",
  "Choose a flip direction or apply a style preset.",
  "Adjust options for spaces, punctuation, line breaks, and realtime conversion.",
  "Copy or download the final result after previewing output.",
];

const strengths = [
  {
    title: "Two-way conversion workflow",
    text: "Generate flipped text and decode it back to readable text without switching tools.",
  },
  {
    title: "Multiple transformation modes",
    text: "Use upside-down, mirror, and no-reverse variants for different visual outcomes.",
  },
  {
    title: "Preset-driven speed",
    text: "Apply common styling profiles instantly to avoid repetitive manual option changes.",
  },
  {
    title: "Unicode reference built in",
    text: "Verify character mapping directly from the on-page chart for reliable formatting decisions.",
  },
];

const optionGuide = [
  {
    option: "Flip Direction",
    use: "Choose upside-down, mirror, or no-reverse style depending on visual intent.",
  },
  {
    option: "Reverse Text",
    use: "Control whether transformed characters should also reverse text order.",
  },
  {
    option: "Preserve Spaces",
    use: "Keep original spacing to maintain sentence readability and layout.",
  },
  {
    option: "Preserve Punctuation",
    use: "Retain punctuation behavior during flipping for cleaner message structure.",
  },
  {
    option: "Preserve Line Breaks",
    use: "Keep multi-line formatting intact for captions, bios, or creative text blocks.",
  },
  {
    option: "Real-time Convert",
    use: "Update output live while typing for faster experimentation.",
  },
];

const useCases = [
  {
    title: "Social media captions",
    detail: "Create attention-grabbing upside-down text for posts, comments, and profile bios.",
  },
  {
    title: "Chat and community messages",
    detail: "Style messages uniquely for Discord, Telegram, WhatsApp, and forum threads.",
  },
  {
    title: "Meme and humor content",
    detail: "Add playful visual twists to punchlines, jokes, and meme captions.",
  },
  {
    title: "Creative username styling",
    detail: "Generate distinctive display names or tag variants using flipped characters.",
  },
  {
    title: "Typography experiments",
    detail: "Test mirrored and inverted text effects for artistic or branded text compositions.",
  },
  {
    title: "Unicode education",
    detail: "Demonstrate character mapping and text transformation concepts in classrooms.",
  },
];

const mistakesToAvoid = [
  "Assuming every platform renders all Unicode flipped characters identically.",
  "Disabling punctuation and spacing preservation when readability matters.",
  "Using no-reverse mode when full upside-down effect requires reversing order.",
  "Applying mirror mode when vertical inversion is the intended output style.",
  "Publishing long flipped text without checking legibility on mobile screens.",
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
    name: "How to use the upside-down text generator",
    description:
      "Choose conversion mode, set flip options, generate upside-down Unicode text, and copy or download output.",
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
            Upside-Down Text Generator for Creative Unicode Styling, Fast Conversion, and Better Social Content
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Upside-Down Text Generator</strong> transforms normal text into flipped Unicode output for social posts, chats, and creative typography.
            It supports quick experimentation with multiple flip styles and conversion rules.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of basic one-click flipping, you get mode control, presets, reverse conversion, and readability-focused options in one workflow.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic Text Flippers
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
            Basic tools only flip characters. This one gives full style control, presets, reverse decoding, and reference visibility.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use Upside-Down Text Generator
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
            Common Upside-Down Text Mistakes to Avoid
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
            Create Better Flipped Text with Mode Control, Presets, and Unicode-Safe Output
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With configurable flip behavior, reverse decoding, and easy export, this tool helps you produce cleaner upside-down text
            for social content, creative experiments, and communication styles that stand out.
          </p>
        </section>
      </div>
    </>
  );
}

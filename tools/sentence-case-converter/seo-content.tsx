const faqItems = [
  {
    question: "What is a sentence case converter?",
    answer:
      "A sentence case converter changes text capitalization formats, such as uppercase, lowercase, title case, and sentence case, in seconds.",
  },
  {
    question: "Why is this tool better than basic case changers?",
    answer:
      "It offers fast multi-format conversion, clear workflow steps, instant copy-ready output, and browser-based privacy in one simple interface.",
  },
  {
    question: "What is the difference between title case and sentence case?",
    answer:
      "Title case capitalizes each major word, while sentence case usually capitalizes only the first letter of each sentence and proper nouns.",
  },
  {
    question: "When should I use uppercase conversion?",
    answer:
      "Uppercase can be useful for headings, labels, visual emphasis, and style consistency in certain publishing contexts.",
  },
  {
    question: "When should I use lowercase conversion?",
    answer:
      "Lowercase is useful when fixing accidentally capitalized text or matching a minimal content style.",
  },
  {
    question: "Can this help with social media and marketing copy?",
    answer:
      "Yes. It helps quickly adapt captions, headlines, and ad text for platform-specific style and tone.",
  },
  {
    question: "Is this useful for editing academic or professional documents?",
    answer:
      "Yes. It helps standardize capitalization across essays, reports, presentations, and internal documentation.",
  },
  {
    question: "Can I copy converted text quickly?",
    answer:
      "Yes. You can convert and copy text in one workflow for fast reuse in other tools and platforms.",
  },
  {
    question: "Is this case converter free?",
    answer: "Yes. It is free to use without registration.",
  },
  {
    question: "Is my text private?",
    answer:
      "Yes. Text processing happens in your browser, so your content is not uploaded to remote servers.",
  },
];

const howToSteps = [
  "Paste or type your text in the editor.",
  "Select a conversion format: uppercase, lowercase, title case, or sentence case.",
  "Review the converted result instantly.",
  "Copy the output and paste it into your document or platform.",
  "Repeat with another case format if you need alternate versions.",
];

const strengths = [
  {
    title: "Fast multi-case conversion",
    text: "Switch between multiple capitalization styles in one place without manual editing.",
  },
  {
    title: "Useful for real writing workflows",
    text: "Great for content editing, heading cleanup, and standardizing tone across documents.",
  },
  {
    title: "Copy-ready results",
    text: "Instant output makes it easy to move from drafting to publishing with less friction.",
  },
  {
    title: "Privacy-first behavior",
    text: "Browser-side processing helps keep sensitive text local while you edit.",
  },
];

const formatGuide = [
  {
    format: "UPPERCASE",
    use: "Best for labels, high-emphasis headings, and visual UI elements.",
  },
  {
    format: "lowercase",
    use: "Useful for stylistic consistency and fixing accidental caps lock text.",
  },
  {
    format: "Title Case",
    use: "Ideal for headings, article titles, and presentation section labels.",
  },
  {
    format: "Sentence case",
    use: "Preferred for paragraph text, emails, and long-form readability.",
  },
];

const useCases = [
  {
    title: "Blog and article editing",
    detail: "Standardize heading and paragraph capitalization before publishing.",
  },
  {
    title: "Academic writing cleanup",
    detail: "Fix inconsistent case formatting across essays and assignment sections.",
  },
  {
    title: "Marketing copy preparation",
    detail: "Create alternate headline styles quickly for ads and campaign tests.",
  },
  {
    title: "Social media post formatting",
    detail: "Adapt captions and profile text to match channel-specific voice.",
  },
  {
    title: "Team documentation",
    detail: "Keep internal docs and SOPs visually consistent with shared style rules.",
  },
  {
    title: "UI content production",
    detail: "Prepare button labels, tooltips, and section titles in the correct case style.",
  },
];

const mistakesToAvoid = [
  "Using all-uppercase body text, which can hurt readability.",
  "Applying title case to long paragraphs where sentence case is clearer.",
  "Mixing inconsistent capitalization across headings and sections.",
  "Skipping proper-noun checks after automated conversion.",
  "Forgetting to match platform style rules before publishing.",
];

export default function SentenceCaseConverterSEOContent() {
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
    name: "How to use the Sentence Case Converter",
    description:
      "Paste text, choose a case format, review the result, and copy converted output for documents or publishing workflows.",
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

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Sentence Case Converter for Faster Text Cleanup and Consistent Writing Style
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Sentence Case Converter</strong> helps you transform text capitalization instantly.
            It is built for writers, students, marketers, and editors who need quick formatting without manual retyping.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Convert content between uppercase, lowercase, title case, and sentence case to match platform rules,
            editorial style guides, and publishing requirements.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic Alternatives
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
            Many converters only switch one mode. This tool supports practical multi-format editing in a single workflow.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Sentence Case Converter
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
            Case Format Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {formatGuide.map((item) => (
              <div key={item.format} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.format}</p>
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
            Mistakes to Avoid in Case Conversion
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
            Format Text Faster and Keep Writing Consistent Across Platforms
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With instant conversion and clean output, this tool helps teams edit faster and publish text
            in the right case format for every channel.
          </p>
        </section>
      </div>
    </>
  );
}

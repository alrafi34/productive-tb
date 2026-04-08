const faqItems = [
  {
    question: "What is a Lorem Ipsum generator?",
    answer:
      "A Lorem Ipsum generator creates placeholder text for mockups, wireframes, templates, and layout testing before final copy is ready.",
  },
  {
    question: "Why is this generator better than basic Lorem Ipsum tools?",
    answer:
      "It supports paragraphs, sentences, and words, includes HTML output, offers randomization modes, and lets you copy or download results quickly.",
  },
  {
    question: "Can I generate paragraphs, sentences, and words?",
    answer:
      "Yes. You can choose output type and set the amount you want to generate.",
  },
  {
    question: "What does 'Start with Lorem ipsum' do?",
    answer:
      "It forces the generated output to begin with the familiar Lorem ipsum opening for traditional placeholder text formatting.",
  },
  {
    question: "Can I generate HTML-ready placeholder text?",
    answer:
      "Yes. Enable the HTML option to generate output wrapped for web content usage, then copy or download the HTML version.",
  },
  {
    question: "What are classic, medium, and full randomization modes?",
    answer:
      "Classic uses traditional lorem vocabulary, medium mixes lorem and additional words, and full focuses on broader random vocabulary.",
  },
  {
    question: "Can I add custom words?",
    answer:
      "Yes. Add custom dictionary terms and they are mixed into output when using medium or full randomization modes.",
  },
  {
    question: "Can I download generated text?",
    answer:
      "Yes. You can copy output instantly and download as TXT. When HTML mode is enabled, HTML download is also available.",
  },
  {
    question: "Is this lorem ipsum tool free?",
    answer: "Yes. It is free to use without signup.",
  },
  {
    question: "Is my content private?",
    answer:
      "Yes. Generation runs in your browser, so text is not uploaded to external servers.",
  },
];

const howToSteps = [
  "Choose output type: paragraphs, sentences, or words.",
  "Set how many units you want to generate.",
  "Configure options like start with Lorem ipsum, HTML output, and randomization mode.",
  "Optionally add custom dictionary words for medium or full mode.",
  "Generate text, then copy or download it as needed.",
];

const strengths = [
  {
    title: "Flexible output control",
    text: "Generate exactly what you need for layout testing with paragraph, sentence, or word-level output.",
  },
  {
    title: "Web-ready formatting options",
    text: "Switch to HTML output for quick insertion into web templates and content management workflows.",
  },
  {
    title: "Advanced randomization behavior",
    text: "Use classic, medium, or full randomness to match traditional lorem style or broader content testing.",
  },
  {
    title: "Fast production workflow",
    text: "Generate, copy, and download placeholder text in seconds without extra tools.",
  },
];

const modeGuide = [
  {
    mode: "Classic",
    use: "Best for traditional lorem ipsum text using familiar placeholder vocabulary.",
  },
  {
    mode: "Medium",
    use: "Blends classic lorem and additional words for more varied placeholder content.",
  },
  {
    mode: "Full",
    use: "Uses broader random vocabulary for stress-testing layouts with diverse word patterns.",
  },
];

const useCases = [
  {
    title: "UI and UX mockups",
    detail: "Fill cards, sections, and component layouts before real copy is finalized.",
  },
  {
    title: "Website and CMS templates",
    detail: "Insert realistic placeholder blocks while building pages and content structures.",
  },
  {
    title: "Typography and spacing tests",
    detail: "Evaluate heading and body rhythm with variable text lengths.",
  },
  {
    title: "Email and landing page drafts",
    detail: "Prototype communication layouts quickly before marketing copy is approved.",
  },
  {
    title: "Design presentations",
    detail: "Show layout quality without distracting stakeholders with unfinished real text.",
  },
  {
    title: "Component QA and stress testing",
    detail: "Test rendering behavior with short and long generated placeholder content.",
  },
];

const mistakesToAvoid = [
  "Using identical text length everywhere and missing responsive layout edge cases.",
  "Skipping HTML mode when testing web components that require structured markup.",
  "Ignoring randomization modes when broader text variation is needed for QA.",
  "Forgetting to review the first-line style when a specific lorem opening is required.",
  "Not saving generated output when iterating across multiple design versions.",
];

export default function LoremIpsumGeneratorSEOContent() {
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
    name: "How to use the Lorem Ipsum Generator",
    description:
      "Select output type and count, configure generation options, create placeholder text, then copy or download the result.",
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
            Lorem Ipsum Generator for Faster Mockups, Better Layout Testing, and Cleaner Design Workflows
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Lorem Ipsum Generator</strong> helps designers, developers, and content teams create
            placeholder text quickly. You can generate paragraphs, sentences, or words based on your project needs.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of copying random filler text from multiple sources, you can control output format, variation,
            and export options in one reliable tool.
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
            Many generators only output plain static text. This tool adds format control, variation modes, and export flexibility.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Lorem Ipsum Generator
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
            Randomization Mode Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {modeGuide.map((item) => (
              <div key={item.mode} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.mode}</p>
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
            Common Placeholder Text Mistakes to Avoid
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
            Generate Better Placeholder Content Faster and Build More Reliable Layouts
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With configurable output, optional HTML formatting, and flexible randomization, this tool helps teams
            move from empty layouts to production-ready prototypes quickly.
          </p>
        </section>
      </div>
    </>
  );
}

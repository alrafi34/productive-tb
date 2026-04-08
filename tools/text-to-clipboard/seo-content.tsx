const faqItems = [
  {
    question: "What is a text to clipboard tool?",
    answer:
      "A text to clipboard tool helps you copy prepared text in one click without manually selecting each block every time.",
  },
  {
    question: "Why is this tool better than basic copy tools?",
    answer:
      "It supports multiple text blocks, copy-all mode, plain or formatted output, optional line numbers, and fast clipboard actions in one workflow.",
  },
  {
    question: "Which output formats are supported?",
    answer:
      "You can copy text as plain text, markdown code block format, or HTML code wrapper format depending on your use case.",
  },
  {
    question: "Can I copy multiple text blocks at once?",
    answer:
      "Yes. Use the copy-all action to combine non-empty blocks and copy them in one operation.",
  },
  {
    question: "What does line number mode do?",
    answer:
      "Line number mode prefixes each line so copied snippets are easier to review in documentation and code discussions.",
  },
  {
    question: "What is auto-select used for?",
    answer:
      "Auto-select highlights text when a block gains focus, which speeds up editing and copy workflows.",
  },
  {
    question: "Is this helpful for writers and content teams?",
    answer:
      "Yes. It is useful for copying snippets, templates, short responses, and content blocks into editors or CMS tools.",
  },
  {
    question: "Can developers use this for docs and code sharing?",
    answer:
      "Yes. Markdown and HTML copy formats are useful for documentation, issue reports, and technical communication.",
  },
  {
    question: "Is the text to clipboard tool free?",
    answer:
      "Yes. It is free to use without sign-up.",
  },
  {
    question: "Is my text private?",
    answer:
      "Yes. Text handling is browser-based and does not require uploading content to external servers.",
  },
];

const howToSteps = [
  "Add your text in one or more text blocks.",
  "Choose output format: plain, html, or markdown.",
  "Enable line numbers if needed.",
  "Copy one block or use copy all for batch output.",
  "Paste the copied result into your app, editor, or document.",
];

const strengths = [
  {
    title: "One-click copy workflow",
    text: "Copy prepared text instantly from individual blocks without repetitive manual selection.",
  },
  {
    title: "Multi-block management",
    text: "Organize snippets by label, edit them quickly, and copy one or all blocks as needed.",
  },
  {
    title: "Format-ready output",
    text: "Switch between plain text, markdown, and HTML wrappers for faster publishing and sharing.",
  },
  {
    title: "Privacy-first behavior",
    text: "All operations run in the browser for fast response and local content handling.",
  },
];

const formatGuide = [
  {
    format: "Plain Text",
    use: "Best for everyday copy-paste into chat apps, documents, forms, and notes.",
  },
  {
    format: "Markdown",
    use: "Wraps content in code-block syntax for README files, docs, and issue comments.",
  },
  {
    format: "HTML",
    use: "Copies escaped code content in pre and code tags for technical publishing contexts.",
  },
];

const useCases = [
  {
    title: "Content writing workflows",
    detail: "Store reusable lines, CTAs, and short copy variants for quick publishing.",
  },
  {
    title: "Documentation and support replies",
    detail: "Prepare repetitive responses and copy them accurately with one click.",
  },
  {
    title: "Developer handoff snippets",
    detail: "Copy code examples in markdown or HTML-friendly format for collaboration.",
  },
  {
    title: "Social media draft management",
    detail: "Keep multiple caption versions and copy the final variant quickly.",
  },
  {
    title: "Template and note organization",
    detail: "Group text blocks by label for faster retrieval and reliable copy operations.",
  },
  {
    title: "Batch output preparation",
    detail: "Merge multiple non-empty blocks and copy everything at once.",
  },
];

const mistakesToAvoid = [
  "Copying in the wrong format for your destination platform.",
  "Forgetting to disable line numbers when plain output is required.",
  "Leaving outdated snippets in labeled blocks without review.",
  "Batch copying before checking block order and spacing.",
  "Skipping a quick paste test before sending important text.",
];

export default function TextToClipboardSEOContent() {
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
    name: "How to use the Text to Clipboard tool",
    description:
      "Add text blocks, pick output format, copy one block or all blocks, and paste where needed.",
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
            Text to Clipboard Tool for Faster Copy Workflows and Cleaner Content Handoffs
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Text to Clipboard</strong> tool helps you copy prepared text with one click.
            It works well for writers, marketers, support teams, and developers who copy text repeatedly across tools.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of selecting text manually every time, you can manage labeled text blocks, apply output formatting,
            and copy exactly what you need in seconds.
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
            Basic copy buttons often handle one field only. This tool supports multi-block, formatted, and batch copy use cases.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Text to Clipboard Tool
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
            Copy Format Guide
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
            Common Clipboard Workflow Mistakes to Avoid
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
            Copy Text Faster with More Control and Less Repetition
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With block-based organization, format-aware output, and batch copy actions, this tool helps teams
            move text between platforms more efficiently and with fewer formatting mistakes.
          </p>
        </section>
      </div>
    </>
  );
}

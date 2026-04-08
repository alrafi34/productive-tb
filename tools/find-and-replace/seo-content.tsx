const faqItems = [
  {
    question: "What is a find and replace tool?",
    answer:
      "A find and replace tool searches text for matching words or patterns and replaces them with new content automatically.",
  },
  {
    question: "Why is this tool better than basic alternatives?",
    answer:
      "It supports single and batch replacements, regex mode, case and whole-word controls, preview mode, undo/redo, and file upload in one workflow.",
  },
  {
    question: "Can I replace only the first match?",
    answer:
      "Yes. You can use Replace First to change only the first detected occurrence.",
  },
  {
    question: "Can I replace all matches at once?",
    answer:
      "Yes. Replace All updates every matching occurrence in one action.",
  },
  {
    question: "Does this support regex search and replace?",
    answer:
      "Yes. Enable regex mode to search with pattern-based expressions.",
  },
  {
    question: "What does whole words only do?",
    answer:
      "It limits matches to complete words so partial word fragments are not replaced unintentionally.",
  },
  {
    question: "Can I run multiple replacements in one pass?",
    answer:
      "Yes. Batch mode allows multiple enabled find-replace rules to be applied sequentially.",
  },
  {
    question: "Can I upload files for editing?",
    answer:
      "Yes. You can upload or drag and drop .txt, .md, and .csv files.",
  },
  {
    question: "Is this find and replace tool free?",
    answer: "Yes. It is free to use with no sign-up required.",
  },
  {
    question: "Is my text private?",
    answer:
      "Yes. Processing runs in your browser, so your text is not uploaded to external servers.",
  },
];

const howToSteps = [
  "Paste text or load a file into the input area.",
  "Enter find and replace values, or switch to batch mode for multiple rules.",
  "Choose options such as match case, whole words, regex, and preview mode.",
  "Run Replace First, Replace All, or Batch Replace based on your goal.",
  "Review stats, then copy, download, or apply preview output to continue editing.",
];

const strengths = [
  {
    title: "Single and batch replacement workflows",
    text: "Handle quick one-term edits or run multiple replacement rules in sequence.",
  },
  {
    title: "Advanced matching options",
    text: "Use case matching, whole-word matching, and regex pattern support for precise edits.",
  },
  {
    title: "Safer editing with preview and history",
    text: "Preview output before applying and use undo or redo for controlled revisions.",
  },
  {
    title: "Input and export flexibility",
    text: "Paste, upload, drag-drop, copy output, and download final text quickly.",
  },
];

const optionGuide = [
  {
    option: "Match Case",
    use: "Finds only case-exact terms when capitalization differences matter.",
  },
  {
    option: "Whole Words Only",
    use: "Prevents accidental replacements inside larger words.",
  },
  {
    option: "Use Regex",
    use: "Enables pattern matching for advanced search and transformation tasks.",
  },
  {
    option: "Preview Mode",
    use: "Shows replacement output separately before committing changes to input text.",
  },
  {
    option: "Batch Mode",
    use: "Runs multiple enabled find-replace rules in order for bulk text updates.",
  },
  {
    option: "Undo/Redo",
    use: "Step backward or forward through change history during editing sessions.",
  },
];

const useCases = [
  {
    title: "Content editing and proofreading",
    detail: "Fix repeated terminology and normalize wording across long articles.",
  },
  {
    title: "Code and config updates",
    detail: "Rename identifiers, paths, or values in text-based snippets quickly.",
  },
  {
    title: "SEO copy optimization",
    detail: "Replace keyword variants and update phrases across draft content.",
  },
  {
    title: "Documentation maintenance",
    detail: "Standardize product names and technical references across docs.",
  },
  {
    title: "CSV/text data cleanup",
    detail: "Apply structured replacements to exported plain-text datasets.",
  },
  {
    title: "Template personalization",
    detail: "Swap placeholders and repeated tokens in reusable text templates.",
  },
];

const mistakesToAvoid = [
  "Running Replace All without checking match scope first.",
  "Using regex mode with an untested pattern on critical text.",
  "Ignoring whole-word mode when partial matches are risky.",
  "Applying output without previewing high-volume replacements.",
  "Skipping history checks before downloading final content.",
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
    name: "How to use Find and Replace",
    description:
      "Load text, configure matching options, run replacements, and copy or download updated output.",
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
            Find and Replace Tool for Faster Text Editing and More Accurate Bulk Updates
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Find and Replace</strong> tool helps you edit large text blocks quickly and consistently.
            It is useful for writers, editors, marketers, developers, and data teams handling repeated changes.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of manual edits line by line, you can apply targeted replacements with safer controls and clearer output review.
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
            Basic replacers often support only simple exact matches. This tool adds precision, batching, and review flow.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use Find and Replace
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
            Common Replace Workflow Mistakes to Avoid
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
            Replace Text Faster and Improve Consistency Across Large Drafts and Datasets
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With advanced matching options, batch controls, and safe preview flow, this tool helps teams perform
            reliable text updates with less manual effort.
          </p>
        </section>
      </div>
    </>
  );
}

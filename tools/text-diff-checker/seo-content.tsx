const faqItems = [
  {
    question: "What is a text diff checker?",
    answer:
      "A text diff checker compares two text versions and highlights what was added, removed, or unchanged.",
  },
  {
    question: "Why is this tool better than basic text comparison tools?",
    answer:
      "It offers line, word, and character-level comparison, side-by-side and inline views, filtering options, stats, and export actions in one workflow.",
  },
  {
    question: "Can I compare text line by line, word by word, and character by character?",
    answer:
      "Yes. You can choose the comparison level that best matches your review task.",
  },
  {
    question: "What does ignore case do?",
    answer:
      "Ignore case compares text without treating uppercase and lowercase letters as different.",
  },
  {
    question: "What does ignore whitespace do?",
    answer:
      "It normalizes spacing differences so you can focus on content changes instead of formatting noise.",
  },
  {
    question: "Can I switch between side-by-side and inline diff views?",
    answer:
      "Yes. You can toggle between side-by-side and inline modes based on how you want to review changes.",
  },
  {
    question: "Can I upload files for comparison?",
    answer:
      "Yes. You can upload or drag-and-drop supported text files such as .txt, .md, and .csv.",
  },
  {
    question: "Can I export diff results?",
    answer:
      "Yes. You can copy the diff output and download results in TXT or HTML formats.",
  },
  {
    question: "Is this text diff checker free?",
    answer: "Yes. It is free to use without registration.",
  },
  {
    question: "Is my text private?",
    answer:
      "Yes. Comparison runs in your browser and does not require sending text to external servers.",
  },
];

const howToSteps = [
  "Paste or load original text into Text A and modified text into Text B.",
  "Select comparison level: line, word, or character.",
  "Choose optional filters such as ignore case and ignore whitespace.",
  "Run Compare or enable auto compare for instant updates.",
  "Review highlighted results, then copy or download diff output.",
];

const strengths = [
  {
    title: "Multi-level comparison precision",
    text: "Switch between line, word, and character diffs for broad reviews or exact change detection.",
  },
  {
    title: "Flexible review modes",
    text: "Use side-by-side or inline views to inspect differences in the format that suits your workflow.",
  },
  {
    title: "Actionable change statistics",
    text: "Track similarity percentage, added segments, removed segments, and total differences quickly.",
  },
  {
    title: "Export-ready output",
    text: "Copy diff text instantly or download TXT/HTML reports for documentation and sharing.",
  },
];

const optionGuide = [
  {
    option: "Comparison Level",
    use: "Select line, word, or character comparison based on required review granularity.",
  },
  {
    option: "Ignore Case",
    use: "Treat case-only differences as equivalent to reduce false-positive changes.",
  },
  {
    option: "Ignore Whitespace",
    use: "Reduce layout-only noise when comparing content revisions.",
  },
  {
    option: "Auto Compare",
    use: "Automatically update diff output while editing both text blocks.",
  },
  {
    option: "View Mode Toggle",
    use: "Switch between side-by-side and inline comparison styles.",
  },
  {
    option: "Export Controls",
    use: "Copy to clipboard or download results as TXT or HTML for reporting.",
  },
];

const useCases = [
  {
    title: "Code and config review",
    detail: "Compare source snippets or config revisions to verify exact modifications.",
  },
  {
    title: "Document revision tracking",
    detail: "Inspect edits between policy drafts, contracts, and internal documents.",
  },
  {
    title: "Content editing QA",
    detail: "Validate wording updates and detect unintended removals during editing.",
  },
  {
    title: "Markdown and article updates",
    detail: "Compare old and new content versions before publishing.",
  },
  {
    title: "CSV/text export checks",
    detail: "Review text-based data outputs to detect insertions and deletions.",
  },
  {
    title: "Release note verification",
    detail: "Confirm that final release text reflects intended updates only.",
  },
];

const mistakesToAvoid = [
  "Comparing at the wrong level and missing important low-level edits.",
  "Forgetting ignore-whitespace when formatting changes dominate output.",
  "Reading only similarity percentage without reviewing highlighted changes.",
  "Skipping side-by-side mode when context alignment matters.",
  "Exporting results before applying the right filter options.",
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
    name: "How to use Text Diff Checker",
    description:
      "Load two text versions, choose comparison settings, review highlighted differences, and export results.",
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
            Text Diff Checker for Accurate Change Detection and Faster Version Reviews
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Text Diff Checker</strong> helps you compare two text versions and detect exact differences.
            It is useful for developers, writers, editors, and analysts reviewing updates across files and drafts.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of scanning long content manually, you can highlight changes instantly and review similarity metrics with clear views.
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
            Many diff utilities expose raw output only. This one combines visual clarity, filters, and export support.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use Text Diff Checker
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
            Common Diff Review Mistakes to Avoid
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
            Compare Versions Faster and Make Better Edit Decisions with Clear Diff Context
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With multi-level comparison, visual diff modes, and export-ready reporting, this tool helps teams review
            changes confidently and reduce manual comparison errors.
          </p>
        </section>
      </div>
    </>
  );
}

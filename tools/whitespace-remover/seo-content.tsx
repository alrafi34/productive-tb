const faqItems = [
  {
    question: "What is a whitespace remover tool?",
    answer:
      "A whitespace remover cleans text by removing unwanted spaces, tabs, or empty lines based on selected rules.",
  },
  {
    question: "Why is this whitespace remover better than basic alternatives?",
    answer:
      "It supports selective whitespace cleanup, tab conversion, highlight mode, file input, undo/redo history, and multi-format export in one workflow.",
  },
  {
    question: "Can I remove leading and trailing spaces only?",
    answer:
      "Yes. You can control leading-space and trailing-space cleanup independently.",
  },
  {
    question: "What does remove multiple spaces do?",
    answer:
      "It collapses repeated spaces into single spaces while preserving normal word separation.",
  },
  {
    question: "What happens when remove all spaces is enabled?",
    answer:
      "It strips all whitespace groups in text segments, which is useful for compact formatting tasks.",
  },
  {
    question: "Can I remove empty lines?",
    answer:
      "Yes. Enable remove-empty-lines to delete blank rows after processing.",
  },
  {
    question: "Can I convert tabs to spaces or spaces to tabs?",
    answer:
      "Yes. Tab conversion supports both directions and lets you choose tab size.",
  },
  {
    question: "Can I upload files for cleanup?",
    answer:
      "Yes. You can upload or drag-and-drop text files such as .txt, .md, and .csv.",
  },
  {
    question: "Is this whitespace remover free?",
    answer: "Yes. It is free to use with no account required.",
  },
  {
    question: "Is my text private?",
    answer:
      "Yes. Cleaning runs in your browser, so your text is not sent to external servers.",
  },
];

const howToSteps = [
  "Paste text or upload a supported file.",
  "Choose cleanup rules such as leading/trailing, multiple spaces, empty lines, or full space removal.",
  "Configure tab conversion options when needed.",
  "Run Clean Whitespace and review the output and statistics.",
  "Copy or download cleaned text in TXT, MD, or CSV format.",
];

const strengths = [
  {
    title: "Granular cleanup controls",
    text: "Choose exact whitespace operations instead of one rigid cleanup mode.",
  },
  {
    title: "Tab and spacing conversion support",
    text: "Convert tabs and spaces with adjustable tab size for code and data workflows.",
  },
  {
    title: "Practical editing workflow",
    text: "Use paste/upload, highlight mode, undo/redo history, and apply-output flow in one interface.",
  },
  {
    title: "Export-ready results",
    text: "Copy instantly or download cleaned output in text formats that match your next step.",
  },
];

const optionGuide = [
  {
    option: "Remove Leading Spaces",
    use: "Strips indentation-like whitespace at line starts when not needed.",
  },
  {
    option: "Remove Trailing Spaces",
    use: "Removes line-ending whitespace that can cause formatting issues.",
  },
  {
    option: "Remove Multiple Spaces",
    use: "Collapses repeated spaces to improve consistency and readability.",
  },
  {
    option: "Remove Empty Lines",
    use: "Deletes blank rows to make list and text blocks compact.",
  },
  {
    option: "Tab Conversion",
    use: "Converts tabs-to-spaces or spaces-to-tabs with configurable tab size.",
  },
  {
    option: "Highlight Spaces",
    use: "Visually flags extra whitespace patterns before cleanup decisions.",
  },
];

const useCases = [
  {
    title: "Document cleanup",
    detail: "Normalize pasted drafts from PDFs, docs, and email threads.",
  },
  {
    title: "Code and snippet formatting",
    detail: "Remove trailing spaces and standardize indentation behavior.",
  },
  {
    title: "CSV and text export preparation",
    detail: "Clean spacing noise before importing data into other tools.",
  },
  {
    title: "Content publishing workflows",
    detail: "Standardize spacing in articles, descriptions, and landing-page copy.",
  },
  {
    title: "List normalization",
    detail: "Clean itemized lists for dedupe, sorting, and downstream processing.",
  },
  {
    title: "Template maintenance",
    detail: "Fix whitespace inconsistencies in reusable text blocks and prompts.",
  },
];

const mistakesToAvoid = [
  "Enabling remove-all-spaces when natural spacing should be preserved.",
  "Skipping trailing-space cleanup before code or CSV handoff.",
  "Ignoring tab settings when mixed indentation exists.",
  "Downloading results without reviewing highlight feedback first.",
  "Applying cleanup once without verifying output against source requirements.",
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
    name: "How to use White Space Remover",
    description:
      "Load text, select whitespace rules, clean instantly, and copy or download output.",
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
            White Space Remover for Cleaner Text, Better Formatting, and More Reliable Data Prep
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>White Space Remover</strong> helps you clean unwanted spacing issues in text quickly.
            It is useful for writers, developers, analysts, and content teams handling copied or exported text.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of manual cleanup, you can apply targeted whitespace rules and produce consistent output in one pass.
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
            Basic cleaners often apply one generic rule. This tool gives precise controls for real-world text cleanup.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use White Space Remover
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
            Common Whitespace Cleanup Mistakes to Avoid
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
            Clean Text Spacing Faster and Improve Consistency Across Writing and Data Workflows
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With selective whitespace rules, conversion options, and export-ready output, this tool helps teams reduce
            manual cleanup time and prevent formatting-related errors.
          </p>
        </section>
      </div>
    </>
  );
}

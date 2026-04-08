const faqItems = [
  {
    question: "What is a paragraph formatter tool?",
    answer:
      "A paragraph formatter cleans messy text by fixing spacing, line breaks, and paragraph structure so content is easier to read and publish.",
  },
  {
    question: "Why is this paragraph formatter better than basic alternatives?",
    answer:
      "It combines multiple cleanup actions, fast browser-side processing, and copy-ready output in one workflow instead of forcing you to use separate tools.",
  },
  {
    question: "Can this fix text copied from PDF files?",
    answer:
      "Yes. It helps repair broken lines, extra spaces, and irregular paragraph breaks that commonly appear when copying from PDFs.",
  },
  {
    question: "What does auto format do?",
    answer:
      "Auto format applies several cleanup actions together, such as reducing extra spaces, normalizing line breaks, and removing blank lines.",
  },
  {
    question: "Can I remove only extra spaces without changing paragraphs?",
    answer:
      "Yes. You can run individual actions like space cleanup or line-break fixes so you keep control over final formatting.",
  },
  {
    question: "Who should use a paragraph formatting tool?",
    answer:
      "Writers, students, editors, marketers, and support teams can use it to quickly clean text before publishing or sharing.",
  },
  {
    question: "Is this paragraph formatter free?",
    answer:
      "Yes. It is free to use with no signup requirement for standard text formatting tasks.",
  },
  {
    question: "Is my text private when I use this tool?",
    answer:
      "Yes. Formatting runs in the browser, so your text does not need to be uploaded to external servers.",
  },
  {
    question: "Can I copy or export formatted text?",
    answer:
      "Yes. You can copy the cleaned text directly and use it in documents, CMS editors, or other writing tools.",
  },
  {
    question: "Does this help SEO writing workflows?",
    answer:
      "Yes. Cleaner paragraph structure improves readability, editorial consistency, and content quality before indexing and publication.",
  },
];

const howToSteps = [
  "Paste your raw text into the editor.",
  "Choose a specific action such as remove extra spaces, fix line breaks, or trim empty lines.",
  "Use auto format when you want complete cleanup in one click.",
  "Review the cleaned output and verify paragraph flow.",
  "Copy formatted text and paste it into your blog, CMS, or document.",
];

const strengths = [
  {
    title: "Complete paragraph cleanup in one place",
    text: "Clean spacing, line wraps, and paragraph structure without switching between multiple tools.",
  },
  {
    title: "Faster than manual editing",
    text: "Reduce repetitive text cleanup work and prepare publish-ready copy in seconds.",
  },
  {
    title: "Practical controls for real workflows",
    text: "Apply individual fixes when needed or run full auto formatting for large text blocks.",
  },
  {
    title: "Privacy-first browser processing",
    text: "Keep draft content local while formatting, including sensitive internal or client text.",
  },
];

const formattingGuide = [
  {
    action: "Remove Extra Spaces",
    use: "Converts repeated spaces to clean single-space text while preserving words and punctuation.",
  },
  {
    action: "Fix Line Breaks",
    use: "Joins broken lines from copied text and helps restore natural sentence flow.",
  },
  {
    action: "Trim Empty Lines",
    use: "Removes unnecessary blank lines to keep documents compact and consistent.",
  },
  {
    action: "Format Paragraphs",
    use: "Normalizes spacing between paragraphs for better readability in long-form content.",
  },
  {
    action: "Auto Format",
    use: "Runs key cleanup actions together for quick, one-step paragraph normalization.",
  },
];

const useCases = [
  {
    title: "Blog content cleanup",
    detail: "Prepare imported draft text before publishing articles or landing pages.",
  },
  {
    title: "Academic writing edits",
    detail: "Normalize paragraph structure in assignments, essays, and research notes.",
  },
  {
    title: "Marketing workflow preparation",
    detail: "Clean campaign copy before handing off to design, SEO, or publishing teams.",
  },
  {
    title: "Documentation maintenance",
    detail: "Keep internal SOPs and help center content visually consistent across pages.",
  },
  {
    title: "Client deliverables",
    detail: "Remove formatting noise from copied drafts before sharing with stakeholders.",
  },
  {
    title: "PDF-to-text repair",
    detail: "Fix common copy-paste issues from PDFs, scanned documents, and export files.",
  },
];

const mistakesToAvoid = [
  "Publishing copied text without fixing broken line wraps from source documents.",
  "Leaving uneven spacing that makes content look unedited and harder to read.",
  "Using only one cleanup step when the text needs full paragraph normalization.",
  "Ignoring paragraph flow after cleanup, especially in long-form articles.",
  "Forgetting final proofread checks for names, headings, and punctuation.",
];

export default function ParagraphFormatterSEOContent() {
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
    name: "How to use the Paragraph Formatter",
    description:
      "Paste text, apply formatting actions to fix spacing and line breaks, then copy clean paragraphs for publishing.",
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
            Paragraph Formatter for Cleaner Text, Better Readability, and Faster Publishing
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Paragraph Formatter</strong> helps you clean messy text before publishing.
            It is designed for writers, students, editors, and marketers who need readable, consistent paragraphs.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of manually fixing spacing and broken lines, you can format text in seconds and move directly
            into editing, optimization, or final publishing.
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
            Many basic tools only remove spaces. This formatter supports broader paragraph cleanup needed for real content workflows.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Paragraph Formatter
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
            Formatting Action Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {formattingGuide.map((item) => (
              <div key={item.action} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.action}</p>
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
            Common Paragraph Formatting Mistakes to Avoid
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
            Clean Paragraphs Faster and Publish More Consistent Content
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With better spacing, cleaner paragraph flow, and copy-ready output, this tool helps teams move from raw text
            to polished content with less manual effort.
          </p>
        </section>
      </div>
    </>
  );
}

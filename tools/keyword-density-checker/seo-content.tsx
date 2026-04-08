const faqItems = [
  {
    question: "What is a keyword density checker?",
    answer:
      "A keyword density checker measures how frequently words appear in your text and shows each word as a percentage of total word count.",
  },
  {
    question: "Why is this tool better than basic keyword counters?",
    answer:
      "It includes stop-word filtering, case-sensitive analysis, minimum word length controls, target keyword tracking, and export options in one workflow.",
  },
  {
    question: "How does keyword density help SEO content?",
    answer:
      "It helps you review term repetition so content stays topically clear without sounding repetitive or over-optimized.",
  },
  {
    question: "What is considered high keyword density?",
    answer:
      "There is no universal perfect percentage, but repeated terms can reduce readability. This tool flags high-density words at 5% so you can review them.",
  },
  {
    question: "Can I track only specific target keywords?",
    answer:
      "Yes. Add target keywords and the tool filters results so you can focus only on important terms.",
  },
  {
    question: "Does this tool ignore stop words?",
    answer:
      "Yes. You can enable stop-word filtering to remove common words and focus on meaningful keywords.",
  },
  {
    question: "Can I analyze case-sensitive usage?",
    answer:
      "Yes. Case-sensitive mode lets you distinguish terms like 'SEO' and 'seo' if your analysis requires that level of detail.",
  },
  {
    question: "Can I export keyword density results?",
    answer:
      "Yes. You can export analysis data in CSV or JSON formats for reporting and workflow integration.",
  },
  {
    question: "Is this keyword density checker free?",
    answer:
      "Yes. The tool is free to use without registration.",
  },
  {
    question: "Is text analysis private?",
    answer:
      "Yes. Analysis runs in your browser, so your text is not sent to external servers.",
  },
];

const howToSteps = [
  "Paste your article, blog post, or draft text into the editor.",
  "Choose options like ignore stop words, case sensitivity, and minimum word length.",
  "Add target keywords if you want to monitor specific SEO terms.",
  "Review the table and chart for counts, percentages, and high-density words.",
  "Adjust your content, then export results as CSV or JSON if needed.",
];

const strengths = [
  {
    title: "More than a basic word counter",
    text: "Analyze keyword percentages, not just raw counts, so your optimization decisions are more accurate.",
  },
  {
    title: "Actionable SEO controls",
    text: "Tune stop words, case sensitivity, and minimum word length to match different content strategies.",
  },
  {
    title: "Fast workflow for writers and SEO teams",
    text: "Get instant feedback, sort results quickly, and export reports for audits or client handoff.",
  },
  {
    title: "Privacy-first behavior",
    text: "All analysis stays in the browser so you can review sensitive drafts safely.",
  },
];

const metricsGuide = [
  {
    metric: "Word count",
    use: "Shows total text size and provides the baseline for keyword percentage calculations.",
  },
  {
    metric: "Keyword count",
    use: "Displays how many times each term appears in the content.",
  },
  {
    metric: "Keyword density percentage",
    use: "Helps evaluate repetition and topical focus in SEO content.",
  },
  {
    metric: "Overused word highlighting",
    use: "Flags terms with high density so you can improve natural language flow.",
  },
  {
    metric: "Top keyword chart",
    use: "Visualizes dominant terms for fast pattern recognition and quick editing decisions.",
  },
];

const useCases = [
  {
    title: "SEO blog optimization",
    detail: "Balance topical keywords while keeping writing natural and readable.",
  },
  {
    title: "Landing page copy review",
    detail: "Check term repetition before publishing conversion-focused pages.",
  },
  {
    title: "Content audit reporting",
    detail: "Export keyword data to CSV or JSON for internal review and client delivery.",
  },
  {
    title: "Competitor-style writing checks",
    detail: "Compare keyword spread across drafts to align tone and topic coverage.",
  },
  {
    title: "Editorial QA",
    detail: "Catch repetitive wording and improve variation before final approval.",
  },
  {
    title: "Agency workflow support",
    detail: "Track target keywords across multiple drafts with consistent analysis settings.",
  },
];

const mistakesToAvoid = [
  "Repeating the same target keyword too often and hurting readability.",
  "Optimizing only for density while ignoring user intent and content quality.",
  "Skipping stop-word filtering when reviewing topical keywords.",
  "Ignoring case sensitivity when brand or acronym precision matters.",
  "Publishing without rechecking keyword distribution after final edits.",
];

export default function KeywordDensityCheckerSEOContent() {
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
    name: "How to use the Keyword Density Checker",
    description:
      "Paste text, customize analysis options, review keyword percentages, and export results for SEO content workflows.",
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
            Keyword Density Checker for Smarter SEO Writing and Cleaner Optimization Decisions
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Keyword Density Checker</strong> helps writers and SEO teams analyze keyword usage in seconds.
            You can review frequency, density percentage, and overused terms before publishing.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            It is built for content workflows where search visibility matters, but readability and natural language quality
            still come first.
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
            Many tools only show raw counts. This one adds filters, tracking controls, and export-ready data for real SEO workflows.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Keyword Density Checker
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
            Keyword Metrics Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {metricsGuide.map((item) => (
              <div key={item.metric} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.metric}</p>
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
            Common Keyword Density Mistakes to Avoid
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
            Optimize Keyword Usage Faster Without Compromising Readability
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With accurate percentages, practical filters, and export-ready insights, this tool helps you publish
            better-optimized content while keeping writing natural and user-focused.
          </p>
        </section>
      </div>
    </>
  );
}

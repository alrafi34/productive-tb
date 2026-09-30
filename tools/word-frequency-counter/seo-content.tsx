import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const strengths = [
  {
    title: "Comprehensive frequency analysis",
    text: "Get counts, percentages, total words, unique words, and top term insights in one report.",
  },
  {
    title: "Practical filtering controls",
    text: "Fine-tune output with stop-word removal, number filtering, case sensitivity, and minimum length rules.",
  },
  {
    title: "Useful for real content workflows",
    text: "Sort, search, copy, and export results for audits, editing, and collaborative reporting.",
  },
  {
    title: "Privacy-first browser processing",
    text: "Your text stays local while you analyze writing and keyword usage patterns.",
  },
];

const metricGuide = [
  {
    metric: "Total words",
    use: "Shows the overall text size before deeper frequency analysis.",
  },
  {
    metric: "Unique words",
    use: "Indicates vocabulary diversity and repetition intensity.",
  },
  {
    metric: "Most frequent word",
    use: "Highlights the dominant term used in the current text.",
  },
  {
    metric: "Word count by term",
    use: "Reports how many times each token appears.",
  },
  {
    metric: "Percentage by term",
    use: "Shows each word share relative to analyzed words.",
  },
];

const useCases = [
  {
    title: "SEO content review",
    detail: "Check keyword repetition and balance topical terms across pages or articles.",
  },
  {
    title: "Editorial quality control",
    detail: "Identify overused words and improve vocabulary variety before publishing.",
  },
  {
    title: "Academic writing support",
    detail: "Analyze essays and reports to inspect language patterns and repeated phrasing.",
  },
  {
    title: "Research text analysis",
    detail: "Review term distribution in qualitative notes and textual datasets.",
  },
  {
    title: "Marketing copy refinement",
    detail: "Evaluate messaging consistency and remove excessive repeated terms.",
  },
  {
    title: "Team reporting workflows",
    detail: "Export CSV or JSON output for dashboards, spreadsheets, or client reports.",
  },
];

const mistakesToAvoid = [
  "Optimizing only by frequency without considering context and readability.",
  "Ignoring stop-word filtering when analyzing keyword relevance.",
  "Forgetting case sensitivity when brand or acronym casing matters.",
  "Overlooking minimum word length settings for noisy short-term outputs.",
  "Exporting data before applying final filters and sort options.",
];

export default function WordFrequencyCounterSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  return (
    <>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Word Frequency Counter for Better Writing Analysis and Clearer Keyword Insights
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Word Frequency Counter</strong> helps you analyze how words are distributed in your text.
            It is built for writers, students, editors, researchers, and SEO teams who need structured word-usage data.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of checking text manually, you can generate ranked frequency results, apply filters, and export
            findings for reporting or optimization work.
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
            Many tools only count words. This one gives filterable, sortable, and exportable frequency intelligence.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Word Frequency Counter
          </h2>
          <ol className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {howToSteps.map(({ text: step }, index) => (
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
            Metric Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {metricGuide.map((item) => (
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
            Common Frequency Analysis Mistakes to Avoid
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

        <ToolFaq items={faq} />

        <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Analyze Word Usage Faster and Improve Content Quality with Better Data
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With configurable filters, percentage-based insights, and export-ready outputs, this tool helps you make
            clearer writing and SEO decisions without manual counting work.
          </p>
        </section>
      </div>
    </>
  );
}

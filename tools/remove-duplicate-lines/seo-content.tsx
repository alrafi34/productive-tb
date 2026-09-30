import ToolFaq from "@/components/ToolFaq";
import { removeDuplicateLinesConfig } from "./config";

const strengths = [
  {
    title: "Flexible duplicate handling",
    text: "Switch between unique-output mode and duplicate-only mode depending on your data cleanup goal.",
  },
  {
    title: "Practical preprocessing controls",
    text: "Trim whitespace, normalize letter case, and remove empty lines before matching for cleaner dedupe logic.",
  },
  {
    title: "Workflow-friendly actions",
    text: "Paste, upload, drag-drop, auto process, auto copy, and export output without switching tools.",
  },
  {
    title: "Clear result metrics",
    text: "Track total lines, duplicates removed, remaining lines, and removed empty lines in one view.",
  },
];

const optionGuide = [
  {
    option: "Ignore Case",
    use: "Matches lines case-insensitively so casing differences do not create false uniques.",
  },
  {
    option: "Trim Whitespace",
    use: "Removes leading and trailing spaces before matching to avoid spacing-based duplicates.",
  },
  {
    option: "Remove Empty Lines",
    use: "Filters out blank rows to keep output focused on meaningful entries.",
  },
  {
    option: "Keep Only Duplicates",
    use: "Extracts repeated lines only for auditing and quality checks.",
  },
  {
    option: "Sort Order",
    use: "Keeps original order, sorts ascending/descending, or randomizes output.",
  },
  {
    option: "Text Transform",
    use: "Applies uppercase, lowercase, or capitalize formatting before dedupe.",
  },
];

const useCases = [
  {
    title: "Email and contact list cleanup",
    detail: "Remove repeated entries before campaign imports and CRM updates.",
  },
  {
    title: "Keyword and URL list deduplication",
    detail: "Clean research lists for SEO workflows and reporting tasks.",
  },
  {
    title: "CSV line normalization",
    detail: "Filter duplicate rows from single-column exports and text extracts.",
  },
  {
    title: "Log and error list review",
    detail: "Keep distinct entries for clearer debugging and issue triage.",
  },
  {
    title: "Content and prompt list maintenance",
    detail: "Merge repeated text lines in writing, automation, and QA documents.",
  },
  {
    title: "Data quality checks",
    detail: "Use duplicate-only mode to identify repeated items in source datasets.",
  },
];

const mistakesToAvoid = [
  "Running dedupe without choosing correct case-sensitivity behavior.",
  "Skipping whitespace trimming when input has inconsistent spacing.",
  "Using sorted output when original sequence order must be preserved.",
  "Forgetting duplicate-only mode when auditing repeated records.",
  "Copying output before validating final option settings.",
];

export default function SEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = removeDuplicateLinesConfig.seo;

  return (
    <>

      <div className="max-w-4xl mx-auto mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Remove Duplicate Lines Tool for Faster List Cleanup and Cleaner Text Data
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Remove Duplicate Lines</strong> tool helps you clean repeated line-based text quickly.
            It is useful for writers, marketers, analysts, and developers managing lists, logs, and text exports.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of manually scanning long lists, you can deduplicate, sort, and format entries with clear controls
            and instant results.
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
            Many dedupe tools only remove exact matches. This one provides deeper control for real-world noisy data.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use Remove Duplicate Lines
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
            Common Deduplication Mistakes to Avoid
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
            Clean Repeated Lines Faster and Keep Text Datasets More Reliable
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With precise matching options, instant feedback, and export-ready output, this tool helps teams reduce
            manual cleanup effort and improve line-based data quality.
          </p>
        </section>
      </div>
    </>
  );
}

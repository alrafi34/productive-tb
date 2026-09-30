import ToolFaq from "@/components/ToolFaq";
import { whitespaceRemoverConfig } from "./config";

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
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = whitespaceRemoverConfig.seo;

  return (
    <>

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

        <ToolFaq items={faq} />

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

import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

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
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  return (
    <>

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

        <ToolFaq items={faq} />

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

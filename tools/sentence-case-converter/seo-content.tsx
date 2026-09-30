import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const strengths = [
  {
    title: "Fast multi-case conversion",
    text: "Switch between multiple capitalization styles in one place without manual editing.",
  },
  {
    title: "Useful for real writing workflows",
    text: "Great for content editing, heading cleanup, and standardizing tone across documents.",
  },
  {
    title: "Copy-ready results",
    text: "Instant output makes it easy to move from drafting to publishing with less friction.",
  },
  {
    title: "Privacy-first behavior",
    text: "Browser-side processing helps keep sensitive text local while you edit.",
  },
];

const formatGuide = [
  {
    format: "UPPERCASE",
    use: "Best for labels, high-emphasis headings, and visual UI elements.",
  },
  {
    format: "lowercase",
    use: "Useful for stylistic consistency and fixing accidental caps lock text.",
  },
  {
    format: "Title Case",
    use: "Ideal for headings, article titles, and presentation section labels.",
  },
  {
    format: "Sentence case",
    use: "Preferred for paragraph text, emails, and long-form readability.",
  },
];

const useCases = [
  {
    title: "Blog and article editing",
    detail: "Standardize heading and paragraph capitalization before publishing.",
  },
  {
    title: "Academic writing cleanup",
    detail: "Fix inconsistent case formatting across essays and assignment sections.",
  },
  {
    title: "Marketing copy preparation",
    detail: "Create alternate headline styles quickly for ads and campaign tests.",
  },
  {
    title: "Social media post formatting",
    detail: "Adapt captions and profile text to match channel-specific voice.",
  },
  {
    title: "Team documentation",
    detail: "Keep internal docs and SOPs visually consistent with shared style rules.",
  },
  {
    title: "UI content production",
    detail: "Prepare button labels, tooltips, and section titles in the correct case style.",
  },
];

const mistakesToAvoid = [
  "Using all-uppercase body text, which can hurt readability.",
  "Applying title case to long paragraphs where sentence case is clearer.",
  "Mixing inconsistent capitalization across headings and sections.",
  "Skipping proper-noun checks after automated conversion.",
  "Forgetting to match platform style rules before publishing.",
];

export default function SentenceCaseConverterSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  return (
    <>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Sentence Case Converter for Faster Text Cleanup and Consistent Writing Style
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Sentence Case Converter</strong> helps you transform text capitalization instantly.
            It is built for writers, students, marketers, and editors who need quick formatting without manual retyping.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Convert content between uppercase, lowercase, title case, and sentence case to match platform rules,
            editorial style guides, and publishing requirements.
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
            Many converters only switch one mode. This tool supports practical multi-format editing in a single workflow.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Sentence Case Converter
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
            Case Format Guide
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
            Mistakes to Avoid in Case Conversion
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
            Format Text Faster and Keep Writing Consistent Across Platforms
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With instant conversion and clean output, this tool helps teams edit faster and publish text
            in the right case format for every channel.
          </p>
        </section>
      </div>
    </>
  );
}

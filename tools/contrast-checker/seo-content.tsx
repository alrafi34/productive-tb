import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const strengths = [
  {
    title: "Standards-focused validation",
    text: "Check color pairs against practical AA and AAA thresholds without manual calculations.",
  },
  {
    title: "Live decision support",
    text: "See pass or fail feedback instantly while iterating on color choices.",
  },
  {
    title: "Design-to-code alignment",
    text: "Use the same validated color pairs across design mocks and frontend implementation.",
  },
  {
    title: "Faster accessibility reviews",
    text: "Reduce rework by catching contrast issues before handoff and release.",
  },
];

const wcagLevels = [
  {
    level: "WCAG AA for normal text",
    value: "4.5:1 or higher",
    note: "Common baseline for accessible body text on most websites and apps.",
  },
  {
    level: "WCAG AA for large text",
    value: "3:1 or higher",
    note: "Applies to larger text sizes and bold type meeting WCAG size definitions.",
  },
  {
    level: "WCAG AAA for normal text",
    value: "7:1 or higher",
    note: "Higher readability target for stronger accessibility coverage.",
  },
  {
    level: "WCAG AAA for large text",
    value: "4.5:1 or higher",
    note: "Enhanced requirement for larger text in strict accessibility targets.",
  },
];

const useCases = [
  {
    title: "Design system token validation",
    detail: "Verify text, surface, and state tokens meet contrast standards before publishing a component library.",
  },
  {
    title: "Button and link state testing",
    detail: "Check default, hover, active, and focus combinations to prevent inaccessible interaction states.",
  },
  {
    title: "Marketing page accessibility checks",
    detail: "Validate headline, body copy, and CTA colors against diverse backgrounds and hero images.",
  },
  {
    title: "SaaS dashboard refinement",
    detail: "Improve readability in data-heavy interfaces where low-contrast labels are easy to miss.",
  },
  {
    title: "Compliance preparation",
    detail: "Generate evidence that color combinations were reviewed against recognized WCAG thresholds.",
  },
  {
    title: "Cross-team review workflow",
    detail: "Align designers, developers, and QA around measurable contrast outcomes.",
  },
];

const mistakesToAvoid = [
  "Testing only default states and forgetting hover, focus, and active states.",
  "Relying on visual preference instead of measured contrast ratios.",
  "Using low-contrast gray text for body copy across large content areas.",
  "Assuming brand colors are always suitable for text and interactive elements.",
  "Skipping checks for text overlays on gradients, photos, and mixed backgrounds.",
];

export default function ContrastCheckerSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  return (
    <>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            WCAG Contrast Checker for Readable and Accessible Color Systems
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Contrast Checker</strong> helps you test text and background color pairs against WCAG accessibility
            thresholds. It is built for designers and developers who need practical contrast validation before shipping UI changes.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of guessing whether colors are readable, you get instant ratio feedback, pass or fail status, and clearer direction
            for improving accessibility across interfaces.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Contrast Checker Is Better Than Basic Alternatives
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
            Many checkers only output a number. This tool is built for actionable accessibility decisions during real product work.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the WCAG Contrast Checker
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
            WCAG Contrast Targets at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {wcagLevels.map((item) => (
              <div key={item.level} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.level}</p>
                <p className="mt-1 font-medium text-gray-700">{item.value}</p>
                <p className="mt-1">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Practical Accessibility Use Cases
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
            Mistakes to Avoid During Contrast Testing
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
            Build More Accessible Interfaces with Measurable Color Contrast
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With live ratio feedback, WCAG targets, and quick iteration support, this tool helps teams improve readability
            and ship accessibility-compliant color combinations with less rework.
          </p>
        </section>
      </div>
    </>
  );
}

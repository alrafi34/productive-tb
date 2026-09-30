import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const strengths = [
  {
    title: "Preset-to-production workflow",
    text: "Move from quick preset experimentation to implementation-ready code without rebuilding styles manually.",
  },
  {
    title: "Live visual feedback",
    text: "See effect changes instantly while adjusting blur, opacity, border, and shadow controls.",
  },
  {
    title: "Better handoff quality",
    text: "Provide clean, copy-ready output for frontend developers and reduce style mismatch during implementation.",
  },
  {
    title: "Practical control depth",
    text: "Fine controls make it easier to balance aesthetics, legibility, and performance for real products.",
  },
];

const useCases = [
  {
    title: "Hero section overlays",
    detail: "Add frosted cards above gradients or images to improve readability while keeping background context.",
  },
  {
    title: "Modern dashboard panels",
    detail: "Create semi-transparent widgets for stats, charts, and controls with consistent visual hierarchy.",
  },
  {
    title: "Modal and drawer surfaces",
    detail: "Apply glass effect to dialogs and side panels for depth and separation from page content.",
  },
  {
    title: "Navigation bars",
    detail: "Use transparent nav containers that preserve focus while showing subtle background motion.",
  },
  {
    title: "Landing page callouts",
    detail: "Highlight CTAs and key messages with polished glass cards that feel premium and modern.",
  },
  {
    title: "Component system prototyping",
    detail: "Test standardized blur, border, and shadow tokens before adding them to a design system.",
  },
];

const mistakesToAvoid = [
  "Using high blur values without checking text readability.",
  "Applying glass effects over flat backgrounds where blur has no visual context.",
  "Combining heavy shadows and borders that make cards look muddy.",
  "Using too many glass surfaces on one screen and hurting hierarchy.",
  "Ignoring performance on lower-end devices when stacking multiple blur layers.",
];

export default function GlassmorphismSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  return (
    <>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            CSS Glassmorphism Generator for Modern Frosted UI Components
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>CSS Glassmorphism Generator</strong> helps you build frosted-glass effects with less trial and error.
            You can tune blur, transparency, border, radius, and shadow in real time, then copy implementation-ready code.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            It is built for designers and developers who want polished visuals with practical control and faster design-to-code handoff.
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
            Many generators stop at visual demos. This one focuses on implementation quality and reusable output.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the CSS Glassmorphism Generator
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
            Mistakes to Avoid with Glassmorphism
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
            Build Better Frosted Interfaces with Cleaner CSS Output
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With live controls, presets, and copy-ready output, this tool helps teams ship polished glassmorphism styles
            faster while keeping design and implementation aligned.
          </p>
        </section>
      </div>
    </>
  );
}

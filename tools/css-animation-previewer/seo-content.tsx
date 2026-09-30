import ToolFaq from "@/components/ToolFaq";
import { cssAnimationPreviewerConfig } from "./config";

const strengths = [
  {
    title: "Motion-first workflow",
    text: "Preview animation behavior visually before writing or tweaking raw CSS values.",
  },
  {
    title: "Custom curve precision",
    text: "Edit cubic-bezier values with immediate playback to reach brand-consistent motion style.",
  },
  {
    title: "Faster implementation handoff",
    text: "Copy-ready CSS removes guesswork between design intent and frontend execution.",
  },
  {
    title: "Practical for real interfaces",
    text: "Designed for micro-interactions, component transitions, and UX motion systems.",
  },
];

const timingGuide = [
  {
    name: "linear",
    use: "Best for constant speed motion such as loaders, continuous loops, and progress visuals.",
  },
  {
    name: "ease",
    use: "General-purpose default for natural movement where no special behavior is needed.",
  },
  {
    name: "ease-in",
    use: "Works well for incoming or accelerating actions that should start gently.",
  },
  {
    name: "ease-out",
    use: "Ideal for exits and settling animations where movement should feel smooth at the end.",
  },
  {
    name: "ease-in-out",
    use: "Balanced option for transitions that should start and end softly.",
  },
  {
    name: "cubic-bezier",
    use: "Use for tailored motion language, expressive brand moments, or advanced interaction patterns.",
  },
];

const useCases = [
  {
    title: "Button and card interactions",
    detail: "Tune hover and click feedback for smoother, more responsive UI behavior.",
  },
  {
    title: "Modal and drawer transitions",
    detail: "Create controlled entrance and exit animations that feel intentional, not abrupt.",
  },
  {
    title: "Navigation and tab movement",
    detail: "Define consistent timing for menus, tabs, and panel switching.",
  },
  {
    title: "Onboarding and walkthroughs",
    detail: "Use clear motion rhythm to guide users through multi-step product tours.",
  },
  {
    title: "Design system motion tokens",
    detail: "Standardize reusable easing and duration presets across component libraries.",
  },
  {
    title: "Data and dashboard animations",
    detail: "Apply purposeful easing to chart updates, counters, and state changes.",
  },
];

const mistakesToAvoid = [
  "Using the same easing for every interaction regardless of context.",
  "Choosing very long durations that make the interface feel sluggish.",
  "Overusing aggressive bounce curves in professional workflows.",
  "Ignoring reduced-motion preferences for accessibility-sensitive users.",
  "Skipping tests on lower-powered mobile devices.",
];

export default function CSSAnimationPreviewerSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = cssAnimationPreviewerConfig.seo;

  return (
    <>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            CSS Animation Previewer for Smoother Motion and Cleaner Frontend Handoff
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>CSS Animation Previewer</strong> helps you design motion with timing precision before implementation.
            It is built for designers and developers who need predictable, high-quality animation behavior across products.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of testing blind values in code, you can preview easing behavior instantly, adjust curves visually,
            and export animation settings that are ready for production.
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
            Many easing demos show a curve only. This tool focuses on real animation behavior and implementation quality.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the CSS Animation Previewer
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
            Timing Function Guide for UI Motion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {timingGuide.map((item) => (
              <div key={item.name} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.name}</p>
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
            Mistakes to Avoid in CSS Animation Timing
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
            Create Better Motion Systems with Consistent Easing and Timing
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With live curve testing, realistic playback, and copy-ready CSS output, this tool helps teams ship smoother
            interactions and maintain a consistent motion language across products.
          </p>
        </section>
      </div>
    </>
  );
}

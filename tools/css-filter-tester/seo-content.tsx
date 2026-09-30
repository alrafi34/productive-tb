import ToolFaq from "@/components/ToolFaq";
import { cssFilterTesterConfig } from "./config";

const strengths = [
  {
    title: "Preview-first workflow",
    text: "Design and debug effects visually before writing CSS manually, which saves time and reduces guesswork.",
  },
  {
    title: "Practical control depth",
    text: "Fine-grained slider controls help you reach subtle, production-quality effects instead of extreme demo presets.",
  },
  {
    title: "Implementation-ready output",
    text: "Copy-ready CSS helps designers and developers stay aligned during handoff.",
  },
  {
    title: "Faster iteration",
    text: "Presets plus manual refinement allow quick exploration and precise final tuning.",
  },
];

const filterNotes = [
  {
    name: "grayscale and sepia",
    note: "Useful for muted themes, vintage effects, and low-distraction visual states.",
  },
  {
    name: "blur",
    note: "Good for soft-focus backgrounds and depth cues, but use carefully for performance.",
  },
  {
    name: "brightness and contrast",
    note: "Essential for balancing readability and visual punch in hero images and banners.",
  },
  {
    name: "saturate and hue-rotate",
    note: "Helpful for brand-tone experiments and rapid color style exploration.",
  },
  {
    name: "invert",
    note: "Useful for dark-mode adaptation and icon treatment in specific UI contexts.",
  },
];

const useCases = [
  {
    title: "Marketing image styling",
    detail: "Quickly generate polished visual treatments for landing pages and campaign creatives.",
  },
  {
    title: "Interactive UI states",
    detail: "Create hover, focus, and pressed effects on cards, thumbnails, and buttons.",
  },
  {
    title: "Dark mode adaptation",
    detail: "Adjust brightness, contrast, and invert settings to better fit dark interfaces.",
  },
  {
    title: "Design system components",
    detail: "Standardize effect tokens for reusable media and illustration components.",
  },
  {
    title: "Content moderation visuals",
    detail: "Apply controlled blur to sensitive previews while keeping layout context visible.",
  },
  {
    title: "Prototype acceleration",
    detail: "Test look-and-feel options rapidly before final image edits or asset exports.",
  },
];

const mistakesToAvoid = [
  "Using high blur on large images without testing performance on real devices.",
  "Stacking too many filters and losing image clarity.",
  "Ignoring filter order, which can drastically change final output.",
  "Applying strong effects where readability is a priority.",
  "Skipping preview checks for mobile and low-resolution screens.",
];

export default function CSSFilterTesterSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = cssFilterTesterConfig.seo;

  return (
    <>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            CSS Filter Tester for Fast Visual Effects and Cleaner Implementation
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>CSS Filter Tester</strong> helps you experiment with filter effects visually and export clean CSS instantly.
            It is useful for designers and frontend developers who want faster iteration than manual filter tuning.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of adjusting values in code without context, you can preview results in real time, refine values with precision,
            and copy implementation-ready output with less trial and error.
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
            Many filter tools are demo-only. This one is tuned for practical production workflow and reliable code handoff.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the CSS Filter Tester
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
            Key CSS Filter Functions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {filterNotes.map((item) => (
              <div key={item.name} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="mt-1">{item.note}</p>
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
            Mistakes to Avoid with CSS Filters
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
            Build Better Visual Effects with Less Filter Guesswork
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With live preview, flexible controls, and copy-ready CSS output, this tool helps teams ship polished image effects
            faster and keep visual implementation consistent across projects.
          </p>
        </section>
      </div>
    </>
  );
}

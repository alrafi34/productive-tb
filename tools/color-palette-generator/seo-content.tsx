import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const strengths = [
  {
    title: "Color-theory driven generation",
    text: "Instead of random-only output, this tool supports harmony-based algorithms for practical and balanced palette creation.",
  },
  {
    title: "Workflow-friendly locking system",
    text: "You can preserve selected colors while exploring new combinations, which is useful when working around brand constraints.",
  },
  {
    title: "Built-in accessibility signal",
    text: "Contrast checks reduce guesswork and help teams build visually strong yet readable interfaces.",
  },
  {
    title: "Export-ready outputs",
    text: "Multiple export formats remove manual conversion work and speed up handoff from design to development.",
  },
];

const examples = [
  {
    title: "Brand expansion",
    input: "Start from primary brand color",
    output: "Generate analogous or monochromatic variants for consistent UI states.",
  },
  {
    title: "Landing page hero",
    input: "Use complementary mode",
    output: "Create high-contrast accent and CTA color combinations.",
  },
  {
    title: "Dashboard theme setup",
    input: "Generate triadic palette",
    output: "Assign distinct but balanced colors to charts and status elements.",
  },
  {
    title: "Accessibility tuning",
    input: "Compare first two swatches",
    output: "Validate contrast ratio against WCAG targets before implementation.",
  },
  {
    title: "Developer handoff",
    input: "Export CSS variables",
    output: "Paste directly into stylesheets with minimal cleanup.",
  },
  {
    title: "Tailwind workflow",
    input: "Export Tailwind-like block",
    output: "Use generated tokens in config for faster theme setup.",
  },
];

const mistakesToAvoid = [
  "Using visually attractive palettes without checking text contrast.",
  "Changing every color at once without locking key brand colors.",
  "Ignoring neutral shades needed for backgrounds and surfaces.",
  "Using random mode only for production systems without refinement.",
  "Skipping export format standardization across teams.",
];

export default function ColorPaletteGeneratorSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  return (
    <>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Color Palette Generator for Fast, Consistent Design Systems
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Color Palette Generator</strong> helps you build balanced palettes using proven color harmony logic.
            It is designed for designers and developers who need practical palettes for UI, branding, dashboards, and product design.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of manually guessing color relationships, this page gives you generation modes, lock control, contrast feedback,
            gradient preview, and export-ready outputs in one workflow. That combination improves both speed and consistency.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Palette Generator Is Better Than Basic Alternatives
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
            Many tools stop at random swatches. This one is built for repeatable professional palette workflows.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Color Palette Generator
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
            Practical Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {examples.map((example) => (
              <div key={example.title} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{example.title}</p>
                <p className="mt-1">{example.input}</p>
                <p className="mt-1 font-medium text-gray-700">{example.output}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Mistakes to Avoid in Palette Design
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
            Build Better Color Systems Faster
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With harmony algorithms, lock controls, contrast guidance, and export formats, this generator helps teams move
            from experimentation to implementation with less friction and better consistency.
          </p>
        </section>
      </div>
    </>
  );
}

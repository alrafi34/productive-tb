const faqItems = [
  {
    question: "What is a color palette generator?",
    answer:
      "A color palette generator creates sets of colors that work well together using color harmony principles such as analogous, complementary, triadic, monochromatic, and tetradic schemes.",
  },
  {
    question: "Why use a color palette generator instead of picking colors manually?",
    answer:
      "It helps you avoid inconsistent combinations by generating balanced color relationships quickly, which is useful for UI design, branding, and frontend development.",
  },
  {
    question: "Which palette modes are supported in this tool?",
    answer:
      "This generator supports analogous, complementary, triadic, monochromatic, tetradic, and random palette modes.",
  },
  {
    question: "Can I lock specific colors while regenerating a palette?",
    answer:
      "Yes. You can lock individual swatches so fixed brand colors stay in place while other colors are regenerated.",
  },
  {
    question: "Does this tool include accessibility checks?",
    answer:
      "Yes. It includes contrast ratio checks and shows WCAG pass/fail guidance to support readable and accessible interfaces.",
  },
  {
    question: "Can I export palettes for development workflows?",
    answer:
      "Yes. You can export palette values as CSS variables, SCSS, JSON, and Tailwind-style formats for direct project usage.",
  },
  {
    question: "Is gradient generation included?",
    answer:
      "Yes. The tool provides gradient previews and copy-ready CSS gradient output from your generated palette.",
  },
  {
    question: "Is this color palette generator free to use?",
    answer:
      "Yes. The tool is free and works directly in your browser with no sign-up required.",
  },
  {
    question: "Does this tool store my design data on a server?",
    answer:
      "No. Palette generation and color operations run client-side in your browser.",
  },
  {
    question: "Who benefits most from this palette generator?",
    answer:
      "UI/UX designers, frontend developers, brand designers, students, and content creators can use it for quick and consistent color systems.",
  },
];

const howToSteps = [
  "Set a base color with HEX input or the color picker.",
  "Choose a palette type based on your design goal.",
  "Generate a 5-color palette instantly.",
  "Lock colors you want to keep and regenerate others.",
  "Check contrast ratio for accessibility confidence.",
  "Copy or export palette values for your design or code workflow.",
];

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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use the color palette generator",
    description:
      "Generate accessible and export-ready color palettes using multiple harmony algorithms and locking controls.",
    step: howToSteps.map((step) => ({
      "@type": "HowToStep",
      text: step,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

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
            {howToSteps.map((step, index) => (
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

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

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

const faqItems = [
  {
    question: "What is a HEX to RGB converter?",
    answer:
      "A HEX to RGB converter transforms hexadecimal color codes like #FF5733 into RGB values such as rgb(255, 87, 51) for CSS, design tools, and development workflows.",
  },
  {
    question: "Can I also convert RGB to HEX?",
    answer:
      "Yes. This tool supports reverse conversion from RGB sliders back to HEX, so you can move between design and code formats quickly.",
  },
  {
    question: "Does this converter support RGBA and HSL formats?",
    answer:
      "Yes. You can view RGB, RGBA, HSL, and HSLA outputs, including alpha transparency controls for CSS usage.",
  },
  {
    question: "Why use this tool instead of a basic color converter?",
    answer:
      "This page combines conversion, color picker, sliders, palette generation, and gradient output in one interface, reducing tool switching during design work.",
  },
  {
    question: "Can I copy converted color codes instantly?",
    answer:
      "Yes. Each format includes one-click copy actions to speed up workflow for CSS, Tailwind, design systems, and UI implementation.",
  },
  {
    question: "Do I need to include the # symbol in HEX input?",
    answer:
      "You can enter HEX with or without #. The tool normalizes valid input and displays standard format output.",
  },
  {
    question: "Is shorthand HEX like #FFF supported?",
    answer:
      "Yes. Shorthand HEX values are supported and expanded internally for accurate conversion.",
  },
  {
    question: "Can this help build color palettes for UI design?",
    answer:
      "Yes. The palette generator creates lighter, darker, and complementary variants to help build practical color systems quickly.",
  },
  {
    question: "Is this HEX to RGB converter free?",
    answer:
      "Yes. The tool is fully free and runs directly in your browser with no account required.",
  },
  {
    question: "Does this tool send my color data to a server?",
    answer:
      "No. Conversions run in-browser for fast and private usage.",
  },
];

const howToSteps = [
  "Enter a HEX code or choose a color with the picker.",
  "Adjust R, G, B sliders if you want manual tuning.",
  "Set alpha to preview RGBA and HSLA transparency.",
  "Copy HEX, RGB, RGBA, HSL, or HSLA with one click.",
  "Use generated palette swatches for design exploration.",
  "Copy the gradient CSS snippet for immediate use in stylesheets.",
];

const strengths = [
  {
    title: "Multi-format output in one place",
    text: "You get HEX, RGB, RGBA, HSL, and HSLA together, which is more practical than single-format converters.",
  },
  {
    title: "Design workflow ready",
    text: "Palette and gradient helpers support real UI/UX and frontend workflows, not just one-off code conversion.",
  },
  {
    title: "Fast copy actions",
    text: "Built-in copy buttons reduce repetitive manual formatting and speed up implementation.",
  },
  {
    title: "Visual + numeric control",
    text: "Color picker plus sliders gives both intuitive selection and precise numerical tuning.",
  },
];

const examples = [
  {
    title: "Brand color conversion",
    input: "#1D4ED8",
    output: "Convert to RGB/RGBA and HSL for design tokens and CSS variables.",
  },
  {
    title: "Transparency for overlays",
    input: "RGBA with alpha 0.35",
    output: "Build readable hero overlays and modal backgrounds quickly.",
  },
  {
    title: "Palette extension",
    input: "Generate lighter and darker shades",
    output: "Create button states, borders, and hover variants from one base color.",
  },
  {
    title: "Gradient setup",
    input: "Base color + complementary",
    output: "Copy a production-ready linear-gradient declaration.",
  },
  {
    title: "RGB to HEX migration",
    input: "Set RGB sliders from existing project values",
    output: "Get standardized HEX codes for design system consistency.",
  },
  {
    title: "Quick QA checks",
    input: "Compare multiple output formats side by side",
    output: "Validate color format consistency across CSS and design files.",
  },
];

const mistakesToAvoid = [
  "Using 3-digit and 6-digit HEX interchangeably without validation.",
  "Forgetting alpha when replicating transparent UI layers.",
  "Copying RGB values where HEX format is required by tooling.",
  "Ignoring HSL when hue/saturation tuning would be faster.",
  "Skipping palette consistency for hover/active UI states.",
];

export default function HexToRgbSEOContent() {
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
    name: "How to use the HEX to RGB converter",
    description:
      "Convert HEX color values to RGB, RGBA, HSL, and HSLA with palette and gradient support.",
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
            HEX to RGB Converter Online for Designers and Developers
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>HEX to RGB Converter</strong> helps you convert color codes instantly between HEX, RGB,
            RGBA, HSL, and HSLA formats. It is designed for practical frontend and design-system workflows where quick
            format conversion and copy-friendly output are essential.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Users searching for terms like "hex to rgb converter", "color code converter", and "hex to rgba" typically
            need fast conversion plus real design context. This page combines conversion, palette generation, gradient output,
            usage examples, and FAQ depth to improve usability and indexing quality.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This HEX to RGB Converter Is Better Than Basic Alternatives
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
            Many tools only convert one value at a time. This one is built for complete color workflow speed.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the HEX to RGB Converter
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
            Real Workflow Examples
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
            Mistakes to Avoid in Color Conversion
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
            Use This Tool for Faster, Cleaner Color Workflows
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            This converter is built for practical implementation: quick color conversion, palette generation, gradient export,
            and instant copy actions. It provides stronger workflow value than single-output converters and supports real-world
            UI design and frontend development needs.
          </p>
        </section>
      </div>
    </>
  );
}

const faqItems = [
  {
    question: "What is an HSL color slider?",
    answer:
      "An HSL color slider lets you control hue, saturation, and lightness interactively to build and refine colors, then copy the result in HSL, HEX, or RGB format.",
  },
  {
    question: "Why is this HSL color slider better than basic color pickers?",
    answer:
      "It combines visual HSL control, live format conversion, palette generation, preview context, and one-click copy in one workflow.",
  },
  {
    question: "What does hue mean in HSL?",
    answer:
      "Hue represents the base color angle on the color wheel, typically from 0 to 360 degrees, where different angles map to different color families.",
  },
  {
    question: "What does saturation control?",
    answer:
      "Saturation controls color intensity. Lower values look muted or gray, while higher values produce more vivid color output.",
  },
  {
    question: "What does lightness control?",
    answer:
      "Lightness controls perceived brightness. Lower values move toward black, higher values move toward white, and mid-range values retain the clearest hue identity.",
  },
  {
    question: "Can I convert HSL to HEX and RGB instantly?",
    answer:
      "Yes. The tool updates HEX and RGB outputs in real time as you move HSL sliders or enter numeric values.",
  },
  {
    question: "Can I generate color harmonies with this tool?",
    answer:
      "Yes. You can build and compare palette relationships such as analogous, complementary, triadic, and monochromatic sets.",
  },
  {
    question: "Is this useful for design systems and CSS variables?",
    answer:
      "Yes. It is practical for defining consistent tokens, theme colors, and reusable CSS variables across components.",
  },
  {
    question: "Is this HSL color slider free to use?",
    answer: "Yes. The tool is free and available without registration.",
  },
  {
    question: "Does this tool process color data on a server?",
    answer:
      "No. Color calculations and conversion happen client-side in the browser for speed and privacy.",
  },
];

const howToSteps = [
  "Move hue, saturation, and lightness sliders to find a base color.",
  "Fine tune values using numeric inputs for exact control.",
  "Review live converted outputs in HSL, HEX, and RGB.",
  "Generate related palettes for consistent color systems.",
  "Copy your selected format and apply it in CSS or design files.",
];

const strengths = [
  {
    title: "Human-friendly color control",
    text: "HSL is easier to reason about than raw RGB values when adjusting tone, intensity, and brightness.",
  },
  {
    title: "Fast design-to-code handoff",
    text: "Get immediate HSL, HEX, and RGB outputs to reduce back-and-forth between design and development.",
  },
  {
    title: "Palette-aware workflow",
    text: "Generate harmony-based sets quickly and keep visual consistency across pages and components.",
  },
  {
    title: "Implementation-ready output",
    text: "Copy-ready values help teams ship themes, tokens, and UI states with fewer color mismatches.",
  },
];

const paletteMethods = [
  {
    name: "Analogous palettes",
    detail: "Great for smooth, harmonious interfaces with subtle color shifts around one base hue.",
  },
  {
    name: "Complementary palettes",
    detail: "Useful when you need stronger visual contrast for calls to action and emphasis.",
  },
  {
    name: "Triadic palettes",
    detail: "Balanced multi-color systems that keep contrast without becoming visually chaotic.",
  },
  {
    name: "Monochromatic palettes",
    detail: "Reliable for minimal, brand-consistent themes using controlled saturation and lightness variation.",
  },
];

const formatComparisons = [
  {
    format: "HSL",
    benefit:
      "Best for intuitive adjustments because hue, intensity, and brightness are separated into independent controls.",
  },
  {
    format: "HEX",
    benefit:
      "Compact and widely used in design systems, variables, and documentation where short notation is preferred.",
  },
  {
    format: "RGB",
    benefit:
      "Useful for programmatic rendering and direct channel-level control in many frontend and graphics workflows.",
  },
];

const uiColorGuidelines = [
  {
    role: "Primary action color",
    range: "Saturation 60-90%, Lightness 40-55%",
    note: "Balances visibility and readability for key buttons and links.",
  },
  {
    role: "Surface and background tones",
    range: "Saturation 10-35%, Lightness 92-99%",
    note: "Creates clean layout separation without aggressive color noise.",
  },
  {
    role: "Muted text and helper content",
    range: "Saturation 10-25%, Lightness 35-55%",
    note: "Supports hierarchy while preserving legibility over light surfaces.",
  },
  {
    role: "Status accents and highlights",
    range: "Saturation 55-95%, Lightness 45-65%",
    note: "Keeps callouts noticeable while avoiding oversaturated visual fatigue.",
  },
];

const useCases = [
  {
    title: "Brand palette planning",
    detail: "Build a base brand color and generate supporting shades and accents for marketing and product UI.",
  },
  {
    title: "Theme systems",
    detail: "Create coherent light and dark theme variants by adjusting lightness and saturation systematically.",
  },
  {
    title: "Component libraries",
    detail: "Define reliable color tokens for buttons, alerts, surfaces, and text styles.",
  },
  {
    title: "Landing page polish",
    detail: "Tune hero gradients, highlights, and supporting sections for better visual hierarchy.",
  },
  {
    title: "Accessibility preparation",
    detail: "Draft color candidates and validate contrast combinations before production release.",
  },
  {
    title: "Team collaboration",
    detail: "Share exact color values in multiple formats to keep design and engineering synchronized.",
  },
];

const mistakesToAvoid = [
  "Using high saturation everywhere and reducing readability in long-form UI sections.",
  "Adjusting hue without re-checking lightness and contrast for text elements.",
  "Relying on one format only when teammates need HEX, RGB, and HSL outputs.",
  "Skipping palette relationship checks and ending up with inconsistent accents.",
  "Choosing colors on one device without testing appearance across other screens.",
];

export default function HSLColorSliderSEOContent() {
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
    name: "How to use the HSL Color Slider",
    description:
      "Adjust hue, saturation, and lightness values, generate matching palettes, and copy HSL, HEX, or RGB output for implementation.",
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
            HSL Color Slider for Smarter Color Selection and Consistent UI Systems
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>HSL Color Slider</strong> helps you build colors with clearer control over hue, saturation, and
            lightness. It is designed for designers and developers who want intuitive color decisions with immediate multi-format output.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of guessing with raw values, you can refine colors visually, generate palette relationships, and copy ready-to-use
            formats for CSS, design systems, and product documentation.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This HSL Slider Is Better Than Basic Alternatives
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
            Many pickers only return one format. This tool supports practical cross-format and palette workflows for real projects.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the HSL Color Slider
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
            Palette Methods You Can Build Quickly
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {paletteMethods.map((item) => (
              <div key={item.name} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            HSL vs HEX vs RGB in Real Workflows
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {formatComparisons.map((item) => (
              <div key={item.format} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.format}</p>
                <p className="mt-1">{item.benefit}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Recommended HSL Ranges for UI Color Roles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {uiColorGuidelines.map((item) => (
              <div key={item.role} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.role}</p>
                <p className="mt-1 font-medium text-gray-700">{item.range}</p>
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
            Mistakes to Avoid While Picking HSL Colors
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
            Choose Better Colors Faster with an HSL-First Workflow
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With live controls, format conversion, and palette support, this tool helps teams create cohesive color systems
            and reduce rework during design and frontend implementation.
          </p>
        </section>
      </div>
    </>
  );
}

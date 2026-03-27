const faqItems = [
  {
    question: "What is a color palette contrast grid?",
    answer:
      "A color palette contrast grid is a tool that checks every text and background combination in a palette and shows WCAG contrast ratios with pass or fail status.",
  },
  {
    question: "Why is this contrast grid better than basic contrast checkers?",
    answer:
      "It evaluates entire palettes at once, not just single color pairs, so teams can validate full design systems faster.",
  },
  {
    question: "What WCAG levels are included?",
    answer:
      "The grid evaluates combinations against common AA and AAA thresholds for normal and large text contexts.",
  },
  {
    question: "Can I test both normal text and large text?",
    answer:
      "Yes. You can review contrast suitability for both standard body text and larger text use cases.",
  },
  {
    question: "Why do some color pairs pass large text but fail normal text?",
    answer:
      "Large text has lower minimum contrast requirements, so some combinations become acceptable only at larger sizes.",
  },
  {
    question: "Is this useful for design systems and token libraries?",
    answer:
      "Yes. It helps validate token combinations before shipping components and prevents accessibility regressions.",
  },
  {
    question: "Can I export palette values after testing?",
    answer:
      "Yes. You can export tested palette data for CSS variables, SCSS, JSON, or related implementation workflows.",
  },
  {
    question: "Does this tool help with accessibility-first workflows?",
    answer:
      "Yes. It supports design, development, and QA teams by making contrast decisions measurable and repeatable.",
  },
  {
    question: "Is this tool free to use?",
    answer: "Yes. The Color Palette Contrast Grid is free without account registration.",
  },
  {
    question: "Does the tool send palette data to servers?",
    answer:
      "No. Contrast checks are handled client-side in the browser for speed and privacy.",
  },
];

const howToSteps = [
  "Add your palette colors manually or start from a preset.",
  "Generate the contrast grid to evaluate all text and background pairs.",
  "Filter by pass levels to focus on usable combinations.",
  "Inspect specific pairs for ratio details and compliance context.",
  "Export validated palette outputs for design and development use.",
];

const strengths = [
  {
    title: "Palette-wide validation",
    text: "Test all combinations at once instead of repeating manual one-by-one checks.",
  },
  {
    title: "Accessibility-focused workflow",
    text: "Quickly identify which combinations meet practical WCAG thresholds for real interface text.",
  },
  {
    title: "Design-to-code alignment",
    text: "Move directly from tested palette decisions to implementation-ready exports.",
  },
  {
    title: "Faster QA and review",
    text: "Reduce regression risk by validating contrast early across full color systems.",
  },
];

const complianceGuide = [
  {
    label: "AA for normal text",
    value: "4.5:1 or higher",
    note: "Common baseline for readable body text and standard UI labels.",
  },
  {
    label: "AA for large text",
    value: "3:1 or higher",
    note: "Applies when text meets large-size criteria and remains clearly legible.",
  },
  {
    label: "AAA for normal text",
    value: "7:1 or higher",
    note: "Higher readability target for stricter accessibility requirements.",
  },
  {
    label: "AAA for large text",
    value: "4.5:1 or higher",
    note: "Enhanced large-text threshold for accessibility-focused products.",
  },
];

const useCases = [
  {
    title: "Design token audits",
    detail: "Validate semantic color tokens before publishing component library updates.",
  },
  {
    title: "Brand palette evaluation",
    detail: "Check brand color combinations for readability across marketing and product UI.",
  },
  {
    title: "Theme system testing",
    detail: "Compare light and dark theme palettes to avoid inaccessible text states.",
  },
  {
    title: "Button and state validation",
    detail: "Confirm hover, active, focus, and disabled states remain readable.",
  },
  {
    title: "Accessibility QA workflows",
    detail: "Provide measurable contrast evidence during release review and handoff.",
  },
  {
    title: "Cross-team collaboration",
    detail: "Give designers, developers, and QA shared pass or fail visibility for color choices.",
  },
];

const mistakesToAvoid = [
  "Checking only primary text colors and skipping secondary or helper text states.",
  "Evaluating colors in isolation without testing full palette combinations.",
  "Assuming visual preference equals accessibility compliance.",
  "Ignoring large-text vs normal-text threshold differences.",
  "Skipping contrast checks after palette updates or theme changes.",
];

export default function ColorPaletteContrastGridSEOContent() {
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
    name: "How to use the Color Palette Contrast Grid",
    description:
      "Build a palette, test all text-background combinations, filter accessible pairs, and export validated color values.",
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
            Color Palette Contrast Grid for Accessibility-Ready Design Systems
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Color Palette Contrast Grid</strong> helps you evaluate full color systems quickly.
            Instead of checking a single pair at a time, you can validate all text and background combinations in one view.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            It is built for designers, frontend developers, and accessibility reviewers who need reliable contrast decisions
            before releasing themes, components, and brand palettes.
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
            Many contrast checkers test one pair only. This tool is optimized for complete palette-level decisions.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Color Palette Contrast Grid
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
            WCAG Contrast Targets at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {complianceGuide.map((item) => (
              <div key={item.label} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.label}</p>
                <p className="mt-1 font-medium text-gray-700">{item.value}</p>
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
            Mistakes to Avoid in Palette Contrast Testing
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
            Build More Accessible Color Systems with Full-Palette Contrast Visibility
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With grid-level analysis, WCAG guidance, and export-ready outputs, this tool helps teams make faster,
            evidence-based color decisions and reduce accessibility regressions.
          </p>
        </section>
      </div>
    </>
  );
}

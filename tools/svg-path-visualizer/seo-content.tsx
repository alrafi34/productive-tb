const faqItems = [
  {
    question: "What is an SVG path visualizer?",
    answer:
      "An SVG path visualizer is a tool that renders path data from the SVG d attribute so you can inspect shapes, debug syntax, and copy valid output quickly.",
  },
  {
    question: "Why is this tool better than basic SVG path viewers?",
    answer:
      "This tool combines live rendering, viewBox controls, stroke and fill tuning, grid-guided inspection, and copy-ready output in one workflow.",
  },
  {
    question: "Which SVG path commands are supported?",
    answer:
      "You can inspect all common commands including M, L, H, V, C, S, Q, T, A, and Z in both uppercase absolute and lowercase relative forms.",
  },
  {
    question: "Can I paste path data directly from design tools?",
    answer:
      "Yes. You can paste raw d attribute values from exported SVG files and review the path instantly.",
  },
  {
    question: "Why is my path not visible in preview?",
    answer:
      "Your path may be outside the current viewBox, missing an initial move command, or using invalid syntax. Adjust the viewBox and verify command format.",
  },
  {
    question: "Can I use this tool for debugging icon issues?",
    answer:
      "Yes. It is useful for checking malformed paths, broken command sequences, and scaling issues in icon and illustration assets.",
  },
  {
    question: "Does the tool help with design-to-code handoff?",
    answer:
      "Yes. It helps teams validate path output visually before implementation, reducing back-and-forth between design and development.",
  },
  {
    question: "Is this SVG path visualizer free to use?",
    answer:
      "Yes. It is free and available without account registration.",
  },
  {
    question: "Do I need to install software to use it?",
    answer:
      "No installation is needed. It runs directly in the browser.",
  },
  {
    question: "Does this tool process path data on the server?",
    answer:
      "No. Path parsing and preview are handled client-side for speed and privacy.",
  },
];

const howToSteps = [
  "Paste your SVG d attribute path data into the editor.",
  "Inspect the rendered shape in live preview.",
  "Adjust stroke, fill, and viewBox values for clarity.",
  "Use grid visibility to debug coordinate placement and scaling.",
  "Copy the cleaned SVG output for your project.",
];

const strengths = [
  {
    title: "Debug-first workflow",
    text: "Built to help you detect path syntax and coordinate issues quickly, not just display shapes.",
  },
  {
    title: "Faster implementation handoff",
    text: "Preview plus copy-ready output reduces path errors during frontend integration.",
  },
  {
    title: "Control depth in one place",
    text: "Adjust rendering context, styling, and viewBox without switching tools.",
  },
  {
    title: "Practical for real assets",
    text: "Useful for icons, logos, illustrations, and exported vectors from design tools.",
  },
];

const commandGroups = [
  {
    name: "Move and line commands",
    detail: "M, L, H, V, and Z define structure, edges, and path closure for most geometric shapes.",
  },
  {
    name: "Curve commands",
    detail: "C, S, Q, and T define smooth cubic and quadratic curves for rounded and organic forms.",
  },
  {
    name: "Arc command",
    detail: "A builds elliptical arcs for circular segments, rounded corners, and complex curved transitions.",
  },
  {
    name: "Absolute vs relative syntax",
    detail: "Uppercase commands use global coordinates, while lowercase commands move relative to the current point.",
  },
];

const useCases = [
  {
    title: "Icon debugging",
    detail: "Fix broken or offset path data after exporting icons from Figma, Illustrator, or SVG libraries.",
  },
  {
    title: "Path optimization checks",
    detail: "Verify simplified paths still render correctly after cleanup and compression.",
  },
  {
    title: "Animation prep",
    detail: "Validate path structure before using stroke animations or path morphing workflows.",
  },
  {
    title: "ViewBox troubleshooting",
    detail: "Resolve clipping and scaling issues before embedding assets in responsive components.",
  },
  {
    title: "Design system maintenance",
    detail: "Review and standardize SVG path consistency across icon sets and UI assets.",
  },
  {
    title: "Learning SVG syntax",
    detail: "Understand command behavior visually while editing path values step by step.",
  },
];

const mistakesToAvoid = [
  "Forgetting an initial M command at the start of a path.",
  "Mixing relative and absolute commands without tracking position changes.",
  "Ignoring viewBox mismatch when paths appear clipped or misplaced.",
  "Adding unnecessary decimal precision that inflates file size.",
  "Applying stroke or fill values that hide shape details during debugging.",
];

export default function SVGPathVisualizerSEOContent() {
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
    name: "How to use the SVG Path Visualizer",
    description:
      "Paste SVG path data, preview shapes live, adjust viewBox and styling, and copy valid SVG output for implementation.",
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
            SVG Path Visualizer for Faster Debugging and Cleaner SVG Output
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>SVG Path Visualizer</strong> helps you inspect and debug path data with live rendering and immediate feedback.
            Paste the d attribute, review the shape, adjust viewBox and style controls, and copy clean output for production.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            It is designed for frontend developers, UI engineers, and designers who need reliable SVG path validation before deployment.
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
            Many viewers only render a static preview. This tool focuses on practical debugging and implementation readiness.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the SVG Path Visualizer
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
            SVG Path Command Groups You Can Validate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {commandGroups.map((item) => (
              <div key={item.name} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="mt-1">{item.detail}</p>
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
            Mistakes to Avoid When Debugging SVG Paths
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
            Ship SVG Assets with Fewer Path Errors and Faster Reviews
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With live rendering, viewBox tuning, and clean copy output, this tool helps teams validate SVG paths quickly
            and keep implementation quality consistent across projects.
          </p>
        </section>
      </div>
    </>
  );
}

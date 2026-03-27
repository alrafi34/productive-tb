const faqItems = [
  {
    question: "What is a CSS gradient generator?",
    answer:
      "A CSS gradient generator is a tool that creates linear and radial gradients visually and outputs copy-ready CSS code for websites, apps, and UI components.",
  },
  {
    question: "What gradient types are supported by this tool?",
    answer:
      "This generator supports both linear and radial gradients with adjustable settings for direction, shape, and color stops.",
  },
  {
    question: "Can I use multiple color stops?",
    answer:
      "Yes. You can add, remove, and reposition multiple color stops to build simple or complex gradients.",
  },
  {
    question: "How is this better than basic gradient tools?",
    answer:
      "This tool combines live preview, angle and shape controls, stop management, reverse/random actions, presets, and instant CSS copy in one workflow.",
  },
  {
    question: "Can I generate gradients for production CSS?",
    answer:
      "Yes. The generated output is valid CSS and can be copied directly into stylesheets or component styles.",
  },
  {
    question: "What is the difference between linear and radial gradients?",
    answer:
      "Linear gradients transition colors along a direction line, while radial gradients transition colors outward from a center point in circle or ellipse form.",
  },
  {
    question: "Can I reverse a gradient quickly?",
    answer:
      "Yes. Use the reverse option to invert the stop order without manually editing each stop.",
  },
  {
    question: "Are gradient presets included?",
    answer:
      "Yes. Presets are available for quick starting points, and you can customize them further.",
  },
  {
    question: "Is this CSS gradient generator free?",
    answer:
      "Yes. It is free to use and runs directly in your browser.",
  },
  {
    question: "Is my gradient data uploaded anywhere?",
    answer:
      "No. Gradient generation is handled client-side in-browser.",
  },
];

const howToSteps = [
  "Choose gradient type: linear or radial.",
  "Set angle for linear gradients or shape for radial gradients.",
  "Add and edit color stops with position controls.",
  "Use reverse, random, or presets to explore options quickly.",
  "Review the live gradient preview in real time.",
  "Copy the generated CSS and paste into your project.",
];

const strengths = [
  {
    title: "Live visual workflow",
    text: "Every control updates the preview instantly, helping designers and developers iterate faster.",
  },
  {
    title: "Flexible stop control",
    text: "Fine-grained stop editing supports both subtle backgrounds and complex multi-color gradients.",
  },
  {
    title: "Rapid exploration tools",
    text: "Reverse, random, and presets reduce trial-and-error time when searching for strong compositions.",
  },
  {
    title: "Direct CSS output",
    text: "You can copy production-ready CSS without manual reformatting.",
  },
];

const examples = [
  {
    title: "Hero section background",
    input: "Linear gradient with 2-3 warm stops",
    output: "Create a smooth, branded hero background with fast iteration.",
  },
  {
    title: "CTA button styling",
    input: "Compact linear gradient with high contrast",
    output: "Generate button backgrounds that feel polished without heavy assets.",
  },
  {
    title: "Card highlight effect",
    input: "Soft radial gradient",
    output: "Add visual depth for cards, modals, and dashboard panels.",
  },
  {
    title: "Theme experimentation",
    input: "Use random + reverse controls",
    output: "Explore unexpected combinations, then refine into final brand direction.",
  },
  {
    title: "Preset acceleration",
    input: "Start from preset",
    output: "Reduce setup time and customize only what matters.",
  },
  {
    title: "Code handoff",
    input: "Copy generated CSS",
    output: "Drop directly into stylesheet, component module, or inline style blocks.",
  },
];

const mistakesToAvoid = [
  "Using too many saturated stops without visual hierarchy.",
  "Ignoring stop positions, causing abrupt and unnatural transitions.",
  "Choosing radial shapes that conflict with layout intent.",
  "Skipping cross-context checks (hero vs card vs button usage).",
  "Copying gradients without checking readability of foreground text.",
];

export default function CSSGradientGeneratorSEOContent() {
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
    name: "How to use the CSS gradient generator",
    description:
      "Create linear and radial gradients with editable stops, presets, live preview, and copy-ready CSS output.",
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
            CSS Gradient Generator for Visual Design and Frontend Work
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>CSS Gradient Generator</strong> helps you create linear and radial gradients with live preview,
            precise color-stop controls, and instant CSS output. It is designed for designers and developers who need
            visually strong backgrounds without slow manual code tuning.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of switching between multiple tools, this page combines type selection, stop editing, presets, reverse/random
            actions, and copy-ready code in one workflow. That makes gradient creation faster, cleaner, and more consistent.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This CSS Gradient Generator Is Better Than Basic Alternatives
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
            Many tools only output a simple gradient string. This one is optimized for real design iteration and production use.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the CSS Gradient Generator
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
            Practical Gradient Examples
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
            Mistakes to Avoid in Gradient Design
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
            Build Better Gradient Backgrounds in Less Time
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With stop-level controls, live preview, presets, and direct CSS output, this generator helps teams move from concept
            to implementation quickly while keeping gradients visually intentional and code-ready.
          </p>
        </section>
      </div>
    </>
  );
}

const faqItems = [
  {
    question: "What is a neumorphism generator?",
    answer:
      "A neumorphism generator is a tool that helps you create soft UI styles using dual shadows, rounded corners, and subtle color contrast, then export ready-to-use CSS.",
  },
  {
    question: "Why is this neumorphism generator better than basic box-shadow tools?",
    answer:
      "It combines raised and pressed states, light direction control, live preview, preset acceleration, and copy-ready code in one workflow.",
  },
  {
    question: "What is the difference between raised and pressed neumorphism?",
    answer:
      "Raised mode makes components appear above the surface, while pressed mode uses inset shadows to make elements look recessed into the surface.",
  },
  {
    question: "Can I use this for buttons, cards, and form controls?",
    answer:
      "Yes. It is useful for interactive controls, cards, toggles, and surface containers where soft depth improves hierarchy.",
  },
  {
    question: "Does this tool support dark and light interfaces?",
    answer:
      "Yes. You can adapt background and shadow values for both light and dark UI themes.",
  },
  {
    question: "How do I keep neumorphism accessible?",
    answer:
      "Use adequate text contrast, reserve subtle effects for non-critical decoration, and verify interaction states for readability and clarity.",
  },
  {
    question: "Can I copy production-ready CSS from this tool?",
    answer:
      "Yes. The generated shadow and style output can be copied directly into your project styles.",
  },
  {
    question: "What background colors work best for neumorphism?",
    answer:
      "Soft, neutral mid-tone backgrounds work best because they allow highlight and shadow pairs to remain visible without harsh contrast.",
  },
  {
    question: "Is this free to use?",
    answer: "Yes. The neumorphism generator is free and does not require registration.",
  },
  {
    question: "Does this tool process design data on a server?",
    answer:
      "No. Style generation and previews are handled client-side in your browser.",
  },
];

const howToSteps = [
  "Start with a preset or default soft UI card style.",
  "Set background color and choose raised or pressed mode.",
  "Adjust shadow distance, blur, and direction for depth.",
  "Tune border radius and contrast for a balanced soft effect.",
  "Copy the generated CSS and apply it to your components.",
];

const strengths = [
  {
    title: "Soft UI workflow in one place",
    text: "Build neumorphic surfaces, controls, and states without manually trialing long box-shadow values.",
  },
  {
    title: "State-aware design",
    text: "Switch between raised and pressed effects quickly to design believable interaction feedback.",
  },
  {
    title: "Faster design-to-code handoff",
    text: "Preview and copy ready CSS so implementation matches design intent with fewer adjustments.",
  },
  {
    title: "Practical controls",
    text: "Fine shadow and light direction controls help teams keep consistent depth language across components.",
  },
];

const modeGuide = [
  {
    mode: "Raised surfaces",
    usage: "Best for primary cards, buttons, and callout components that should appear elevated.",
  },
  {
    mode: "Pressed surfaces",
    usage: "Useful for toggled states, input wells, and recessed sections that should look embedded.",
  },
  {
    mode: "Low-depth variants",
    usage: "Good for dense dashboards where heavy shadows can create clutter and reduce readability.",
  },
  {
    mode: "High-depth accents",
    usage: "Use selectively for focus elements to draw attention without overwhelming the layout.",
  },
];

const useCases = [
  {
    title: "Control panels and dashboards",
    detail: "Create cohesive soft-depth controls for settings, sliders, and status widgets.",
  },
  {
    title: "Mobile-style interaction surfaces",
    detail: "Prototype tactile button and card systems with consistent light direction.",
  },
  {
    title: "Media and playback UI",
    detail: "Apply neumorphic controls to play, pause, volume, and timeline components.",
  },
  {
    title: "Design system token setup",
    detail: "Define reusable shadow and radius values for consistent soft UI implementation.",
  },
  {
    title: "Onboarding and settings screens",
    detail: "Use subtle depth cues to organize sections without heavy visual noise.",
  },
  {
    title: "Concept and pitch prototypes",
    detail: "Generate modern soft UI looks quickly for demos and stakeholder presentations.",
  },
];

const mistakesToAvoid = [
  "Using very high contrast shadows that break the soft neumorphic look.",
  "Applying neumorphism to every component and reducing visual hierarchy.",
  "Ignoring text contrast while focusing only on decorative depth.",
  "Mixing inconsistent light directions across the same screen.",
  "Choosing backgrounds too bright or too dark for subtle shadow separation.",
];

export default function NeumorphismSEOContent() {
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
    name: "How to use the Neumorphism Generator",
    description:
      "Create raised or pressed soft UI effects by tuning shadow direction, blur, and background values, then copy production-ready CSS.",
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
            Neumorphism Generator for Soft UI Components and Clean CSS Handoff
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Neumorphism Generator</strong> helps you build soft, depth-based UI elements quickly.
            It is designed for designers and frontend developers who want tactile modern surfaces without manual shadow guesswork.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            You can tune shadow balance, direction, blur, and shape in real time, then copy implementation-ready CSS
            for buttons, cards, forms, and dashboard controls.
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
            Many shadow tools generate generic effects only. This workflow is optimized for real soft UI system design.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Neumorphism Generator
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
            Raised vs Pressed Mode Guidance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {modeGuide.map((item) => (
              <div key={item.mode} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.mode}</p>
                <p className="mt-1">{item.usage}</p>
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
            Mistakes to Avoid with Neumorphism
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
            Build Cohesive Soft UI Systems with Less Trial and Error
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With real-time preview, state-aware controls, and clean CSS output, this tool helps teams ship polished
            neumorphic interfaces faster while keeping implementation consistent.
          </p>
        </section>
      </div>
    </>
  );
}

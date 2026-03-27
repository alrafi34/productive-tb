const faqItems = [
  {
    question: "What is a CSS animation previewer?",
    answer:
      "A CSS animation previewer is a tool that lets you test animation timing functions and easing curves visually, then copy production-ready CSS values.",
  },
  {
    question: "Why is this animation previewer better than basic easing tools?",
    answer:
      "It combines live animation playback, cubic-bezier editing, preset curves, duration controls, and copy-ready output in one workflow.",
  },
  {
    question: "What are CSS timing functions?",
    answer:
      "Timing functions control how animation speed changes over time, such as linear, ease-in, ease-out, and custom cubic-bezier curves.",
  },
  {
    question: "When should I use linear timing?",
    answer:
      "Use linear when motion should remain constant, such as progress indicators, rotations, and continuous background effects.",
  },
  {
    question: "When should I use ease-in or ease-out?",
    answer:
      "Ease-in is useful for elements accelerating into motion, while ease-out works well for elements settling naturally into place.",
  },
  {
    question: "What does cubic-bezier do?",
    answer:
      "Cubic-bezier lets you define custom acceleration and deceleration curves with four control values for precise motion behavior.",
  },
  {
    question: "Can I use this tool for UI micro-interactions?",
    answer:
      "Yes. It is ideal for hover states, modal transitions, button feedback, and onboarding animations.",
  },
  {
    question: "Can I copy generated CSS directly into my project?",
    answer:
      "Yes. You can copy animation timing and related CSS settings directly for immediate implementation.",
  },
  {
    question: "Is this tool free?",
    answer: "Yes. The CSS animation previewer is free to use without account registration.",
  },
  {
    question: "Does this tool process animation data on a server?",
    answer:
      "No. Animation preview and curve calculations are handled client-side for speed and privacy.",
  },
];

const howToSteps = [
  "Choose a base timing function or select cubic-bezier mode.",
  "Adjust duration, delay, and iteration settings for realistic playback.",
  "Fine tune curve values until motion feels smooth and intentional.",
  "Test the result with different animation types and distances.",
  "Copy the generated CSS and use it in your project styles.",
];

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
    name: "How to use the CSS Animation Previewer",
    description:
      "Preview timing functions and cubic-bezier curves live, refine motion behavior, and copy implementation-ready CSS animation settings.",
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

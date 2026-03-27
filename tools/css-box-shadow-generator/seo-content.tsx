const faqItems = [
  {
    question: "What is a CSS box shadow generator?",
    answer:
      "A CSS box shadow generator is a tool that lets you visually create box-shadow styles and copy the generated CSS code for websites and applications.",
  },
  {
    question: "What can I control in this box shadow generator?",
    answer:
      "You can control horizontal offset, vertical offset, blur radius, spread radius, color, opacity, inset mode, and multiple shadow layers.",
  },
  {
    question: "Can I create multiple shadow layers?",
    answer:
      "Yes. You can add multiple layers and combine them into one CSS declaration for richer depth effects.",
  },
  {
    question: "What is inset shadow and when should I use it?",
    answer:
      "Inset shadows render inside the element and are useful for pressed, recessed, or neumorphic style effects.",
  },
  {
    question: "How is this better than basic box shadow tools?",
    answer:
      "This tool combines live preview, multi-layer control, presets, inset support, background preview, and instant copy output in one workflow.",
  },
  {
    question: "Can I use presets and customize them?",
    answer:
      "Yes. You can apply presets such as soft, material, deep, floating, and neumorphism, then refine each parameter.",
  },
  {
    question: "Is the generated CSS production-ready?",
    answer:
      "Yes. The output uses standard box-shadow syntax that works in modern browsers and can be pasted directly into stylesheets.",
  },
  {
    question: "Can I preview shadows on different backgrounds?",
    answer:
      "Yes. You can change background color in the preview area to test visibility and realism before implementation.",
  },
  {
    question: "Is this CSS box shadow generator free?",
    answer:
      "Yes. It is free and does not require account registration.",
  },
  {
    question: "Does this tool send my style data to a server?",
    answer:
      "No. Shadow generation is handled client-side in your browser.",
  },
];

const howToSteps = [
  "Adjust X and Y offsets to position the shadow.",
  "Set blur and spread values for softness and size.",
  "Choose shadow color and opacity.",
  "Enable inset mode when you need internal depth effects.",
  "Add extra layers for richer visual hierarchy.",
  "Copy the generated CSS and paste into your project.",
];

const strengths = [
  {
    title: "Layered shadow workflow",
    text: "Unlike simple tools, this generator supports multiple layers so you can build realistic and modern depth systems.",
  },
  {
    title: "Immediate visual feedback",
    text: "Live preview updates as you adjust values, helping you iterate quickly without guesswork.",
  },
  {
    title: "Preset-to-custom flow",
    text: "Start from a proven preset, then refine details to match your design language.",
  },
  {
    title: "Implementation-ready output",
    text: "Copy-ready CSS minimizes manual editing and speeds up handoff from design to development.",
  },
];

const examples = [
  {
    title: "Card elevation system",
    input: "Use subtle multi-layer shadows",
    output: "Create consistent depth levels for cards, modals, and popovers.",
  },
  {
    title: "Button emphasis",
    input: "Short blur with controlled spread",
    output: "Make CTA buttons feel clickable without heavy borders.",
  },
  {
    title: "Neumorphism prototype",
    input: "Inset plus outer soft shadows",
    output: "Build soft UI experiments with adjustable contrast and depth.",
  },
  {
    title: "Dark surface checks",
    input: "Change preview background",
    output: "Validate shadow readability across light and dark surfaces.",
  },
  {
    title: "Preset acceleration",
    input: "Apply material or floating preset",
    output: "Reduce setup time and fine tune values for production.",
  },
  {
    title: "Developer handoff",
    input: "Copy final box-shadow declaration",
    output: "Paste directly into CSS, SCSS, or component style blocks.",
  },
];

const mistakesToAvoid = [
  "Using very large blur values without checking UI clarity.",
  "Applying strong shadows to all components equally.",
  "Skipping background checks that affect perceived shadow strength.",
  "Combining many layers without visual purpose.",
  "Ignoring inset mode when internal depth is needed.",
];

export default function CSSBoxShadowGeneratorSEOContent() {
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
    name: "How to use the CSS box shadow generator",
    description:
      "Create single or multi-layer box shadows with live preview and copy-ready CSS output.",
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
            CSS Box Shadow Generator for UI Depth and Clean Implementation
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>CSS Box Shadow Generator</strong> helps you design shadows visually, then copy valid CSS code instantly.
            It is built for designers and developers who want better depth control without manually trialing box-shadow values.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of editing values blindly, this page gives real-time preview, multi-layer editing, inset support, presets,
            and implementation-ready output in one place. That improves both speed and consistency.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Box Shadow Generator Is Better Than Basic Alternatives
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
            Many tools output a single basic shadow. This one supports layered, practical, production-ready shadow design.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the CSS Box Shadow Generator
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
            Practical Shadow Examples
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
            Mistakes to Avoid in Box Shadow Design
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
            Build Cleaner Shadow Systems with Less Trial and Error
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With layered controls, presets, and live output, this tool helps teams ship polished shadows faster while keeping
            CSS concise and reusable.
          </p>
        </section>
      </div>
    </>
  );
}

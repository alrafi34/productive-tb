const faqItems = [
  {
    question: "What is a Zalgo text generator?",
    answer:
      "A Zalgo text generator transforms normal text into glitch-style text by adding Unicode combining marks above, below, and through letters.",
  },
  {
    question: "How is this tool better than basic Zalgo generators?",
    answer:
      "It combines presets, detailed controls, real-time generation, Zalgo removal, social preview blocks, and copy/download actions in one workflow.",
  },
  {
    question: "What is the difference between mild, broken, and creepy presets?",
    answer:
      "Mild applies a subtle effect, broken emphasizes top and bottom distortion, and creepy uses aggressive marks across all directions for maximum corruption.",
  },
  {
    question: "What does intensity change in this tool?",
    answer:
      "Intensity controls how heavily letters are decorated. Higher intensity increases visual distortion and text chaos.",
  },
  {
    question: "What does max characters per letter do?",
    answer:
      "It sets an upper limit for combining marks added to each letter, helping you balance readability and effect strength.",
  },
  {
    question: "Can I generate Zalgo in real time while typing?",
    answer:
      "Yes. Enable real-time generation to update output automatically as input or options change.",
  },
  {
    question: "Can I convert glitch text back to normal text?",
    answer:
      "Yes. Use Remove Zalgo to strip combining marks and recover clean, readable text.",
  },
  {
    question: "Will Zalgo text work on all platforms?",
    answer:
      "Most modern platforms render Unicode combining marks, but heavy distortion may display differently depending on app, font, and moderation rules.",
  },
  {
    question: "Can I copy or download generated text?",
    answer:
      "Yes. You can copy output to clipboard instantly or download it as a TXT file.",
  },
  {
    question: "Is this Zalgo text generator private?",
    answer:
      "Yes. Processing happens in your browser, so your source text is not sent to external servers for conversion.",
  },
];

const howToSteps = [
  "Enter your source text in the input box.",
  "Choose a quick preset (Mild, Broken, Creepy) or switch to Custom mode.",
  "Adjust intensity, max characters per letter, and direction toggles (above, below, middle).",
  "Click Generate Zalgo or keep real-time generation enabled for instant updates.",
  "Copy or download the result, and use Remove Zalgo when you need clean plain text.",
];

const strengths = [
  {
    title: "Precision control beyond one-click generators",
    text: "Tune intensity, per-letter mark limits, and mark directions for exactly the effect you need.",
  },
  {
    title: "Fast preset-to-custom workflow",
    text: "Start from mild, broken, or creepy presets, then refine settings without losing editing speed.",
  },
  {
    title: "Two-way utility in one tool",
    text: "Generate corrupted text and also remove Zalgo marks to restore readability.",
  },
  {
    title: "Publish-ready output support",
    text: "Preview output for social contexts and export with quick copy or TXT download actions.",
  },
];

const optionGuide = [
  {
    option: "Preset Selector",
    use: "Use mild, broken, or creepy for fast style baselines before fine-tuning.",
  },
  {
    option: "Intensity",
    use: "Set overall distortion strength from low to extreme depending on readability goals.",
  },
  {
    option: "Max Characters Per Letter",
    use: "Cap decoration density so output stays visually controlled on different platforms.",
  },
  {
    option: "Add Above",
    use: "Adds upper combining marks for floating and noisy glitch effects.",
  },
  {
    option: "Add Below",
    use: "Adds lower combining marks for unstable baseline distortion.",
  },
  {
    option: "Add Middle",
    use: "Adds crossing marks through characters for harsher corruption styling.",
  },
  {
    option: "Real-time Generation",
    use: "Automatically refreshes output as you type and adjust controls.",
  },
  {
    option: "Remove Zalgo",
    use: "Strips combining marks to recover plain Unicode text quickly.",
  },
];

const useCases = [
  {
    title: "Social post hooks",
    detail: "Create attention-grabbing text snippets for comments, captions, and callouts.",
  },
  {
    title: "Gaming usernames and status text",
    detail: "Generate stylized names for profile bios, lobby labels, and chat themes.",
  },
  {
    title: "Horror and glitch-themed content",
    detail: "Produce creepy text styles for posters, story intros, and event announcements.",
  },
  {
    title: "Meme and community content",
    detail: "Add dramatic distortion for comedic or exaggerated internet-style text moments.",
  },
  {
    title: "Design experimentation",
    detail: "Prototype expressive typography effects for creative concepts and visuals.",
  },
  {
    title: "Moderation and cleanup workflows",
    detail: "Use Remove Zalgo to normalize text before analysis, indexing, or readability checks.",
  },
];

const mistakesToAvoid = [
  "Using extreme intensity for long paragraphs when readability is required.",
  "Applying very high per-letter mark counts that may break rendering in some apps.",
  "Forgetting to test output where it will be posted, since font engines vary by platform.",
  "Assuming all moderation systems allow heavy combining-mark text.",
  "Skipping Remove Zalgo when you need clean text for search, storage, or editing.",
];

export default function ZalgoTextGeneratorSEOContent() {
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
    name: "How to use the Zalgo text generator",
    description:
      "Enter text, choose a preset or custom settings, generate glitch output, and copy, download, or clean text.",
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

      <div className="max-w-4xl mx-auto mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Zalgo Text Generator for Controlled Glitch Effects, Cleaner Output, and Better Publishing Workflow
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Zalgo Text Generator</strong> helps you transform plain text into glitch-style Unicode text with adjustable distortion.
            It is useful for creators, meme pages, gaming communities, and anyone producing stylized internet text.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of relying on basic one-click generators, you can control distortion direction, intensity, and character density while keeping a clean way to reverse the effect.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic Zalgo Generators
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
            Many simple alternatives only output random corruption. This tool adds predictable controls and cleanup support for real workflows.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Zalgo Text Generator
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
            Option Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {optionGuide.map((item) => (
              <div key={item.option} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.option}</p>
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
            Common Mistakes to Avoid with Zalgo Text
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
            Create Better Glitch Text with Adjustable Control and Reversible Output
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With presets, deep customization, real-time feedback, and one-click cleanup, this generator helps you publish stylized Unicode text faster and with better consistency than basic glitch tools.
          </p>
        </section>
      </div>
    </>
  );
}

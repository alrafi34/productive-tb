const faqItems = [
  {
    question: "What is a bionic reading converter?",
    answer:
      "A bionic reading converter bolds the beginning portion of words to create visual anchors that can improve reading flow.",
  },
  {
    question: "Why is this tool better than basic bionic text tools?",
    answer:
      "It offers adjustable bold percentage, small-word handling, display controls, file upload, copy formats, and export options in one workflow.",
  },
  {
    question: "Can I control how much of each word is bold?",
    answer:
      "Yes. You can adjust bold percentage so the emphasized word portion matches your reading preference.",
  },
  {
    question: "What does ignore small words do?",
    answer:
      "It skips bolding for short and common words so emphasis stays focused on content-heavy vocabulary.",
  },
  {
    question: "Can I auto convert text when pasting?",
    answer:
      "Yes. Enable auto-convert-on-paste to run conversion automatically when new text is inserted.",
  },
  {
    question: "Can I copy output in multiple formats?",
    answer:
      "Yes. You can copy HTML, plain text, or Markdown output depending on where you plan to use it.",
  },
  {
    question: "Can I download converted results?",
    answer:
      "Yes. Download options include HTML, TXT, and Markdown formats.",
  },
  {
    question: "Can I customize the preview style?",
    answer:
      "Yes. You can adjust font size, line height, letter spacing, and font family in the preview panel.",
  },
  {
    question: "Is this bionic reading converter free?",
    answer: "Yes. It is free to use without account registration.",
  },
  {
    question: "Is my text private?",
    answer:
      "Yes. Conversion is browser-based, so your text is not uploaded to external servers.",
  },
];

const howToSteps = [
  "Paste text or upload a .txt/.md file.",
  "Set bold percentage and small-word behavior.",
  "Tune display options for preview readability.",
  "Convert text and review word and bolding stats.",
  "Copy or download output in the format you need.",
];

const strengths = [
  {
    title: "Adjustable emphasis control",
    text: "Fine-tune how much of each word is bolded to match your reading comfort level.",
  },
  {
    title: "Smart small-word handling",
    text: "Skip short/common words to reduce visual noise and preserve focus on key terms.",
  },
  {
    title: "Flexible output formats",
    text: "Use HTML, plain text, or Markdown output for docs, editors, and publishing workflows.",
  },
  {
    title: "Readable preview customization",
    text: "Configure typography settings in real time to match your preferred reading style.",
  },
];

const optionGuide = [
  {
    option: "Bold Percentage",
    use: "Controls the size of the bold segment at each word start.",
  },
  {
    option: "Ignore Small Words",
    use: "Skips emphasis for short/common words to keep visual hierarchy cleaner.",
  },
  {
    option: "Small Word Length",
    use: "Sets the character-length threshold used by small-word filtering.",
  },
  {
    option: "Auto Convert on Paste",
    use: "Converts newly pasted text automatically for faster workflows.",
  },
  {
    option: "Auto Copy on Convert",
    use: "Copies converted output immediately after conversion.",
  },
  {
    option: "Display Controls",
    use: "Adjusts font size, line height, letter spacing, and font family for preview.",
  },
];

const useCases = [
  {
    title: "Long article reading",
    detail: "Convert long-form text into emphasized format for quicker visual scanning.",
  },
  {
    title: "Study and revision notes",
    detail: "Apply bionic style to summaries and notes for clearer review sessions.",
  },
  {
    title: "Documentation consumption",
    detail: "Improve readability of technical docs and process-heavy instructions.",
  },
  {
    title: "Learning content preparation",
    detail: "Format educational text for more structured reading experiences.",
  },
  {
    title: "Accessibility-oriented experiments",
    detail: "Test emphasis settings for readers who prefer stronger visual anchors.",
  },
  {
    title: "Cross-platform text reuse",
    detail: "Export HTML, TXT, or Markdown for websites, editors, and note tools.",
  },
];

const mistakesToAvoid = [
  "Using a very high bold percentage that reduces natural reading rhythm.",
  "Ignoring small-word filters when output feels visually overloaded.",
  "Copying the wrong output format for the destination platform.",
  "Skipping preview typography tuning before export.",
  "Applying settings once without testing across different text lengths.",
];

export default function SEOContent() {
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
    name: "How to use Bionic Reading Converter",
    description:
      "Load text, configure emphasis options, convert instantly, and export in HTML, TXT, or Markdown.",
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
            Bionic Reading Converter for Faster Visual Scanning and More Controlled Text Emphasis
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Bionic Reading Converter</strong> transforms standard text into an emphasis-based reading format.
            It helps readers, students, writers, and professionals test alternative reading flows with adjustable controls.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of manual bold formatting word by word, you can generate consistent emphasis automatically and export
            results for different platforms.
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
            Basic tools often offer static conversion only. This one adds better control, output flexibility, and readability tuning.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use Bionic Reading Converter
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
            Common Bionic Conversion Mistakes to Avoid
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
            Convert Reading Format Faster and Improve Text Scanning Consistency Across Documents
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With adjustable emphasis, preview controls, and flexible export formats, this tool helps teams and
            individual readers apply bionic-style formatting in a reliable way.
          </p>
        </section>
      </div>
    </>
  );
}

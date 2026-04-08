const faqItems = [
  {
    question: "What is a text reverser tool?",
    answer:
      "A text reverser transforms text by changing the order of letters, words, sentences, or paragraphs based on the selected mode.",
  },
  {
    question: "Why is this text reverser better than basic reverse text tools?",
    answer:
      "It supports five reversal modes, live word and character counts, quick copy, and text download in a single clean workflow.",
  },
  {
    question: "What reverse modes are available?",
    answer:
      "You can reverse letters, reverse word order, reverse each word, reverse sentence order, and reverse paragraph order.",
  },
  {
    question: "Can I reverse text and keep the result for later use?",
    answer:
      "Yes. You can copy reversed output directly or download it as a text file for later use.",
  },
  {
    question: "Is this useful for puzzle and game content?",
    answer:
      "Yes. It is commonly used to generate hidden clues, reverse-word puzzles, and playful challenge content.",
  },
  {
    question: "Can I use this for social media and creative writing?",
    answer:
      "Yes. Reversed text can help create attention-grabbing captions, stylized content, and creative writing experiments.",
  },
  {
    question: "Does this text reverser work for long text blocks?",
    answer:
      "Yes. You can process short notes or longer paragraphs quickly in the same interface.",
  },
  {
    question: "Is the text reverser free?",
    answer:
      "Yes. It is free to use without account registration.",
  },
  {
    question: "Is my text private while reversing?",
    answer:
      "Yes. Processing happens in your browser, so your text is not uploaded to external servers.",
  },
  {
    question: "Can this tool help with text manipulation testing?",
    answer:
      "Yes. Developers and QA teams can use it to test string handling behavior and formatting edge cases.",
  },
];

const howToSteps = [
  "Paste or type your text into the input area.",
  "Choose one reverse mode based on your goal.",
  "Click the reverse button to generate output instantly.",
  "Review output using the live word and character counts.",
  "Copy or download the reversed text for reuse.",
];

const strengths = [
  {
    title: "Five reverse modes in one tool",
    text: "Switch between letter, word, each-word, sentence, and paragraph reversal without opening multiple tools.",
  },
  {
    title: "Built for real workflows",
    text: "Useful for creators, students, puzzle makers, and developers handling different text formats.",
  },
  {
    title: "Fast copy and download output",
    text: "Get your transformed text quickly and export it when needed.",
  },
  {
    title: "Privacy-first browser processing",
    text: "Your text stays local while you test and transform it.",
  },
];

const modeGuide = [
  {
    mode: "Reverse Letters",
    use: "Flips all characters in the full text from end to start.",
  },
  {
    mode: "Reverse Words",
    use: "Keeps letters intact but reverses the order of words.",
  },
  {
    mode: "Reverse Each Word",
    use: "Reverses letters inside each word while preserving overall word order.",
  },
  {
    mode: "Reverse Sentences",
    use: "Reorders sentences from last to first for paragraph-level restructuring.",
  },
  {
    mode: "Reverse Paragraphs",
    use: "Reverses multi-paragraph block order while keeping paragraph content.",
  },
];

const useCases = [
  {
    title: "Puzzle and riddle creation",
    detail: "Generate reversed clues for word games and classroom challenges.",
  },
  {
    title: "Creative social media content",
    detail: "Produce stylized reversed text for engaging posts and captions.",
  },
  {
    title: "Text transformation experiments",
    detail: "Try different reversal styles quickly for writing and editing concepts.",
  },
  {
    title: "Developer and QA testing",
    detail: "Create transformed sample strings to test parsing and display logic.",
  },
  {
    title: "Learning string operations",
    detail: "Use clear reverse modes to understand how text manipulation works.",
  },
  {
    title: "Formatting variation",
    detail: "Generate alternate text views for exercises, demos, and prototypes.",
  },
];

const mistakesToAvoid = [
  "Using the wrong reverse mode for your target output format.",
  "Ignoring sentence punctuation when checking sentence-order results.",
  "Assuming reversed output preserves original readability for published body text.",
  "Skipping final proofread checks before sharing transformed content.",
  "Not saving output after large transformations.",
];

export default function TextReverserSEOContent() {
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
    name: "How to use the Text Reverser",
    description:
      "Paste text, choose a reverse mode, generate transformed output, and copy or download the result.",
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
            Text Reverser for Fast Character, Word, Sentence, and Paragraph Transformation
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Text Reverser</strong> helps you transform text in multiple ways from one interface.
            It supports practical workflows for writers, creators, puzzle makers, students, and developers.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of manually editing text order, you can apply accurate reversal modes instantly and copy or
            download output in seconds.
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
            Many simple tools only reverse characters. This one provides multiple transformation modes for broader use cases.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Text Reverser
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
            Reverse Mode Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {modeGuide.map((item) => (
              <div key={item.mode} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.mode}</p>
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
            Common Text Reversal Mistakes to Avoid
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
            Reverse Text Faster with Better Control and Clear Output
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With multiple reversal modes, instant transformation, and export-ready results, this tool helps you move
            from raw text to usable transformed output in one efficient workflow.
          </p>
        </section>
      </div>
    </>
  );
}

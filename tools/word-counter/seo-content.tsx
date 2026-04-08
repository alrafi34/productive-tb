const faqItems = [
  {
    question: "What is a word counter tool?",
    answer:
      "A word counter tool analyzes text and reports key writing metrics such as total words, characters, sentences, paragraphs, and estimated reading time.",
  },
  {
    question: "Why is this word counter better than basic alternatives?",
    answer:
      "It combines real-time updates, multiple text metrics, clear readability context, and privacy-first browser processing in one workflow.",
  },
  {
    question: "Who should use a word counter?",
    answer:
      "Writers, students, bloggers, marketers, editors, and social media managers can all use it to meet word limits and improve content planning.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "Reading time is estimated using average reading speed assumptions and updates automatically as your word count changes.",
  },
  {
    question: "Does this tool count characters with and without spaces?",
    answer:
      "Yes. It provides both character counts so you can match platform-specific requirements.",
  },
  {
    question: "Can I use this for essays and academic assignments?",
    answer:
      "Yes. It is useful for essays, reports, abstracts, and assignment submissions where strict word targets matter.",
  },
  {
    question: "Is this tool useful for SEO content writing?",
    answer:
      "Yes. It helps writers control article length, section balance, and publishing targets for search-focused content workflows.",
  },
  {
    question: "Does this word counter support mobile devices?",
    answer:
      "Yes. The tool works on desktop and mobile browsers for quick checks while writing or editing.",
  },
  {
    question: "Is the word counter free?",
    answer: "Yes. It is free and does not require account registration.",
  },
  {
    question: "Is my text private when I use this tool?",
    answer:
      "Yes. Text analysis runs in your browser, so your content is not uploaded to external servers.",
  },
];

const howToSteps = [
  "Paste or type your text into the editor.",
  "Review live word, character, sentence, and paragraph counts.",
  "Check estimated reading time for audience planning.",
  "Adjust your text to match required limits or publishing goals.",
  "Copy final content after meeting your target metrics.",
];

const strengths = [
  {
    title: "Real-time feedback",
    text: "See all major text metrics update instantly while writing or editing.",
  },
  {
    title: "Practical publishing metrics",
    text: "Track words, characters, structure, and reading time in one place for faster workflow decisions.",
  },
  {
    title: "Useful across writing tasks",
    text: "Works well for essays, blog posts, ad copy, social captions, and content briefs.",
  },
  {
    title: "Privacy-first analysis",
    text: "Runs locally in your browser so you can check sensitive drafts with confidence.",
  },
];

const metricGuide = [
  {
    metric: "Word count",
    use: "Core metric for essays, blogs, and content briefs with target length requirements.",
  },
  {
    metric: "Character count (with spaces)",
    use: "Useful for platform limits that count all visible and spacing characters.",
  },
  {
    metric: "Character count (without spaces)",
    use: "Helpful when a platform or system excludes whitespace in limits.",
  },
  {
    metric: "Sentence and paragraph count",
    use: "Supports readability checks and structure review for long-form writing.",
  },
  {
    metric: "Reading time",
    use: "Estimates audience effort for articles, newsletters, and landing pages.",
  },
];

const useCases = [
  {
    title: "Academic writing",
    detail: "Keep essays and reports within strict institutional word-count limits.",
  },
  {
    title: "Blog and SEO drafts",
    detail: "Match target article length while balancing readability and section density.",
  },
  {
    title: "Social media content",
    detail: "Prepare captions and short-form copy that fit platform character constraints.",
  },
  {
    title: "Email campaigns",
    detail: "Control message length and readability for stronger engagement rates.",
  },
  {
    title: "Product copywriting",
    detail: "Tune description length for landing pages, app stores, and e-commerce listings.",
  },
  {
    title: "Editing and QA",
    detail: "Quickly verify structural and length consistency before publication.",
  },
];

const mistakesToAvoid = [
  "Focusing only on total word count while ignoring sentence and paragraph structure.",
  "Overfilling content to hit a target length without improving clarity.",
  "Ignoring character limits for platform-specific publishing channels.",
  "Publishing without checking reading time for your audience context.",
  "Assuming all platforms count characters the same way.",
];

export default function WordCounterSEOContent() {
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
    name: "How to use the Word Counter tool",
    description:
      "Paste your text, check words and characters in real time, review reading time, and refine content to match publishing limits.",
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
            Word Counter for Accurate Writing Metrics and Better Content Planning
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Word Counter</strong> helps you measure text length and structure instantly.
            It supports writers, students, marketers, and editors who need reliable counts before publishing.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of checking multiple tools, you can track words, characters, sentences, paragraphs, and reading time
            in one clear workflow.
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
            Many counters only report words. This one gives the broader metrics needed for real publishing workflows.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Word Counter Tool
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
            Metric Guide for Better Writing Decisions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {metricGuide.map((item) => (
              <div key={item.metric} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.metric}</p>
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
            Mistakes to Avoid with Word Count Targets
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
            Write Smarter with Live Text Metrics and Clear Length Control
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With instant counts, structure visibility, and reading-time context, this tool helps teams publish
            clearer content that meets platform and assignment requirements.
          </p>
        </section>
      </div>
    </>
  );
}

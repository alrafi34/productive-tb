const faqItems = [
  {
    question: "What is a reading time calculator?",
    answer:
      "A reading time calculator estimates how long a reader needs to finish a piece of text based on word count and reading speed.",
  },
  {
    question: "Why is this tool better than basic reading time estimators?",
    answer:
      "It combines multiple speed profiles, custom WPM, speaking-time estimates, text analytics, copy-ready results, and badge output in one workflow.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "Reading time is calculated by dividing total words by words-per-minute speed, then converting that value into minutes.",
  },
  {
    question: "Can I estimate reading time for different reader types?",
    answer:
      "Yes. The tool includes slow, average, fast, and speed-reader profiles with separate results.",
  },
  {
    question: "Can I use my own words-per-minute value?",
    answer:
      "Yes. You can enable custom reading speed and adjust WPM to match your target audience.",
  },
  {
    question: "Does this tool estimate speaking time too?",
    answer:
      "Yes. It includes speaking-time estimation based on average speech pace.",
  },
  {
    question: "What text stats are included besides reading time?",
    answer:
      "It reports words, characters, characters without spaces, sentences, paragraphs, and a length-based difficulty category.",
  },
  {
    question: "Can I copy results or a reading-time badge?",
    answer:
      "Yes. You can copy full summary results or copy a compact badge string such as minutes-read output.",
  },
  {
    question: "Does the tool save my input text?",
    answer:
      "It can keep input in local browser storage for convenience, so your draft remains available in your own browser context.",
  },
  {
    question: "Is my content private while using this tool?",
    answer:
      "Yes. Calculations run in the browser and do not require sending your text to external processing services.",
  },
];

const howToSteps = [
  "Paste or type your article, post, or script text into the editor.",
  "Review instant reading-time estimates across default speed profiles.",
  "Enable custom WPM if you want audience-specific timing.",
  "Check supporting stats like words, sentences, paragraphs, and speaking time.",
  "Copy full results or copy a minutes-read badge for publishing.",
];

const strengths = [
  {
    title: "Multi-speed reading estimates",
    text: "Compare timing for slow, average, fast, and speed readers without rerunning calculations.",
  },
  {
    title: "Custom WPM personalization",
    text: "Tune output to your audience by setting your own reading-speed assumption.",
  },
  {
    title: "Reading plus speaking insights",
    text: "Measure both read duration and spoken duration from the same input content.",
  },
  {
    title: "Publisher-ready output actions",
    text: "Copy complete metrics or generate compact read-time badges for article headers and cards.",
  },
];

const optionGuide = [
  {
    option: "Default Speed Profiles",
    use: "Compare estimates for 150, 200, 250, and 300 WPM reading behavior.",
  },
  {
    option: "Custom WPM",
    use: "Adjust reading speed manually to reflect your actual audience or channel.",
  },
  {
    option: "Reading Difficulty",
    use: "Use length-based labeling to gauge whether content is short, medium, or long-form.",
  },
  {
    option: "Speaking Time",
    use: "Estimate narration duration for video scripts, podcasts, and presentations.",
  },
  {
    option: "Copy Results",
    use: "Copy all core stats and timing values in one action.",
  },
  {
    option: "Copy Badge",
    use: "Generate concise minutes-read strings for blog metadata and UI tags.",
  },
  {
    option: "Auto Save",
    use: "Preserve your current text locally in the browser for continuity between sessions.",
  },
  {
    option: "Dark/Light Display",
    use: "Switch visual mode for a comfortable editing and review experience.",
  },
];

const useCases = [
  {
    title: "Blog and article publishing",
    detail: "Add accurate minutes-read labels to improve reader expectations and click confidence.",
  },
  {
    title: "Content strategy planning",
    detail: "Balance article depth and completion time for better engagement goals.",
  },
  {
    title: "Newsletter drafting",
    detail: "Estimate consumption time before sending long-form email editions.",
  },
  {
    title: "Video and podcast scripting",
    detail: "Use speaking-time estimates to plan narration length and segment timing.",
  },
  {
    title: "Documentation UX",
    detail: "Label guide sections by time commitment to help users navigate large docs.",
  },
  {
    title: "Editorial QA",
    detail: "Validate that drafts match target duration ranges for your publication format.",
  },
];

const mistakesToAvoid = [
  "Using only one reading speed when your audience varies significantly.",
  "Skipping custom WPM for niche audiences with higher or lower reading pace.",
  "Judging content effort only by word count without speaking-time context.",
  "Ignoring sentence and paragraph structure that can affect practical readability.",
  "Publishing read-time labels without re-checking after final edits.",
];

export default function ReadingTimeCalculatorSEOContent() {
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
    name: "How to use the reading time calculator",
    description:
      "Paste your text, review reading and speaking estimates, customize WPM, and copy results for publishing.",
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
            Reading Time Calculator for Accurate Duration Estimates, Better Content Planning, and Faster Publishing
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Reading Time Calculator</strong> helps you estimate how long readers need to finish blog posts, articles, guides, and scripts.
            It is built for writers, editors, publishers, and marketers who need practical timing signals for content decisions.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of relying on single-speed estimates, you can compare multiple reader profiles, apply custom WPM, and generate ready-to-use result summaries.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic Reading Time Tools
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
            Basic estimators often output only one number. This tool adds analysis depth and practical publishing actions.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Reading Time Calculator
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
            Common Mistakes to Avoid
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
            Estimate Read Duration More Reliably with Multi-Speed Analysis and Publish-Ready Output
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With flexible speed modeling, detailed content stats, and quick badge export, this tool helps teams publish more accurate reading-time signals than basic one-number calculators.
          </p>
        </section>
      </div>
    </>
  );
}

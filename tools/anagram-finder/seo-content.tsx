const faqItems = [
  {
    question: "What is an anagram finder?",
    answer:
      "An anagram finder checks whether two words or phrases contain the same letters in a different order.",
  },
  {
    question: "Can this tool compare full phrases, not just single words?",
    answer:
      "Yes. You can compare multi-word phrases, and options like ignore spaces and punctuation help evaluate phrase-level anagrams.",
  },
  {
    question: "What is the difference between single and bulk mode?",
    answer:
      "Single mode compares two inputs in detail. Bulk mode checks one source word against a list of candidates and groups matches and non-matches.",
  },
  {
    question: "How does real-time checking work?",
    answer:
      "When enabled, the tool re-runs analysis automatically while you type, so you get quick feedback without manually clicking the check button.",
  },
  {
    question: "What does similarity percentage mean in this tool?",
    answer:
      "Similarity estimates how much character overlap exists between inputs, even if they are not perfect anagrams.",
  },
  {
    question: "Does this tool show letter-by-letter analysis?",
    answer:
      "Yes. It shows cleaned text, sorted text, letter frequencies, matching letters, and mismatched letters for transparent validation.",
  },
  {
    question: "Can I generate anagrams automatically?",
    answer:
      "Yes. The generator creates multiple permutations from your input and returns a capped list for exploration.",
  },
  {
    question: "Why is this tool better than basic anagram checkers?",
    answer:
      "It combines single and bulk checking, rule customization, detailed frequency analysis, similarity scoring, and generation in one interface.",
  },
  {
    question: "Can I copy or download results?",
    answer:
      "Yes. In single-check mode, you can copy the full analysis output or download it as a text file.",
  },
  {
    question: "Is this anagram finder private to use?",
    answer:
      "Yes. Processing happens in your browser, so your text is not sent to external servers.",
  },
];

const howToSteps = [
  "Choose Single Check or Bulk Check mode.",
  "Enter your text input and optional candidate list for bulk mode.",
  "Set matching rules like ignore spaces, punctuation, case, or special characters.",
  "Run the check or enable real-time checking for instant updates.",
  "Review analysis output, then copy or download single-mode results.",
];

const strengths = [
  {
    title: "Dual workflow: single and bulk checks",
    text: "Validate one pair deeply or scan many candidates quickly in a single tool.",
  },
  {
    title: "Advanced matching controls",
    text: "Fine-tune comparisons by toggling spaces, punctuation, casing, and special-character handling.",
  },
  {
    title: "Transparent diagnostic output",
    text: "See sorted strings, character frequencies, and matched vs mismatched letters instead of only yes/no.",
  },
  {
    title: "Built-in generation and export",
    text: "Generate anagram permutations and keep documented results with copy and TXT download support.",
  },
];

const optionGuide = [
  {
    option: "Ignore Spaces",
    use: "Treat multi-word phrases as continuous text for phrase-level anagram checking.",
  },
  {
    option: "Ignore Punctuation",
    use: "Remove punctuation marks before comparison so punctuation differences do not block matches.",
  },
  {
    option: "Ignore Case",
    use: "Normalize uppercase and lowercase characters before letter matching.",
  },
  {
    option: "Ignore Special Characters",
    use: "Strip non-alphanumeric symbols to focus checks on core characters.",
  },
  {
    option: "Real-time Checking",
    use: "Automatically analyze input changes with a short delay while typing.",
  },
  {
    option: "Generate Anagrams",
    use: "Produce multiple permutations for brainstorming and puzzle exploration.",
  },
];

const useCases = [
  {
    title: "Word game solving",
    detail: "Validate candidate words quickly for anagram games, quiz rounds, and challenge apps.",
  },
  {
    title: "Classroom language learning",
    detail: "Teach letter patterns, rearrangement logic, and vocabulary structure through direct analysis.",
  },
  {
    title: "Puzzle and escape-room design",
    detail: "Test clue words and hidden message patterns with accurate letter matching.",
  },
  {
    title: "Creative writing and naming",
    detail: "Explore alternate letter arrangements for titles, character names, and thematic concepts.",
  },
  {
    title: "Bulk candidate filtering",
    detail: "Check one source against long candidate lists and isolate valid matches in seconds.",
  },
  {
    title: "Linguistic research workflows",
    detail: "Use frequency and mismatch output to inspect structural text differences systematically.",
  },
];

const mistakesToAvoid = [
  "Forgetting to enable ignore-spaces when comparing multi-word phrases.",
  "Comparing text with punctuation differences while ignore-punctuation is disabled.",
  "Assuming generated permutations are always dictionary-valid words.",
  "Using bulk mode without trimming candidate lines, which adds noisy input.",
  "Judging only by similarity percentage instead of checking true sorted-character equality.",
];

export default function AnagramFinderSEOContent() {
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
    name: "How to use the anagram finder",
    description:
      "Enter words or phrases, configure matching rules, run single or bulk checks, and review detailed letter analysis.",
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
            Anagram Finder for Fast Checks, Better Accuracy, and Clear Letter Analysis
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Anagram Finder</strong> helps you verify whether two words or phrases are true anagrams using configurable matching rules.
            It supports quick validation for puzzles, writing, education, and data-driven text analysis.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of manual letter counting, you get instant sorted-character comparison, frequency breakdowns, and optional bulk candidate checks.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic Anagram Checkers
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
            Basic tools usually return only a yes/no answer. This tool provides controllable logic plus diagnostic depth.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Anagram Finder
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
            Common Anagram Checking Mistakes to Avoid
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
            Check Anagrams More Reliably with Rule Control, Bulk Screening, and Detailed Diagnostics
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With configurable comparison logic, frequency insights, and export-ready results, this tool helps you verify
            anagram relationships faster and with far more confidence than basic yes/no checkers.
          </p>
        </section>
      </div>
    </>
  );
}

const faqItems = [
  {
    question: "What is a palindrome checker?",
    answer:
      "A palindrome checker tests whether a word, phrase, or sentence reads the same forward and backward after applying selected cleanup rules.",
  },
  {
    question: "Can this tool check full sentences and phrases?",
    answer:
      "Yes. It supports phrase-level checks and can ignore spaces, punctuation, and case to evaluate natural-language palindromes accurately.",
  },
  {
    question: "What is the difference between single and bulk mode?",
    answer:
      "Single mode provides detailed analysis for one input. Bulk mode checks multiple lines at once and marks each line as palindrome or not.",
  },
  {
    question: "How does real-time checking work?",
    answer:
      "When real-time mode is enabled, the checker automatically updates results while you type so you do not need to click check repeatedly.",
  },
  {
    question: "What does the similarity score mean?",
    answer:
      "Similarity shows how closely the cleaned text matches its reversed form, even when the input is not a perfect palindrome.",
  },
  {
    question: "Does this tool show cleaned and reversed text?",
    answer:
      "Yes. The result panel shows original, cleaned, and reversed text so you can validate why a match passed or failed.",
  },
  {
    question: "Can I check numbers as part of palindrome logic?",
    answer:
      "Yes. You can keep numbers or enable ignore-numbers depending on whether numeric characters should affect the result.",
  },
  {
    question: "Why is this checker better than simple palindrome tools?",
    answer:
      "It combines rule-based normalization, bulk workflows, similarity scoring, character frequency insights, and export options in one interface.",
  },
  {
    question: "Can I copy or download results?",
    answer:
      "Yes. In single mode, you can copy a detailed report or download it as a TXT file for documentation and sharing.",
  },
  {
    question: "Is my text private when using this tool?",
    answer:
      "Yes. Processing is done in your browser, so your input is not sent to external servers.",
  },
];

const howToSteps = [
  "Choose Single Check for one input or Bulk Check for multiple lines.",
  "Enter your word, phrase, sentence, or line list.",
  "Set options such as ignore case, spaces, punctuation, or numbers.",
  "Run the checker or enable real-time mode for live updates.",
  "Review the analysis and copy or download the result when needed.",
];

const strengths = [
  {
    title: "Single and bulk verification",
    text: "Analyze one item deeply or process many lines quickly in one workflow.",
  },
  {
    title: "Flexible normalization controls",
    text: "Tune how text is cleaned before comparison for more accurate real-world checking.",
  },
  {
    title: "Transparent diagnostics",
    text: "View original, cleaned, reversed text, similarity, and character frequency instead of only yes/no.",
  },
  {
    title: "Practical export workflow",
    text: "Copy detailed outputs or download TXT reports for notes, classes, and puzzle workflows.",
  },
];

const optionGuide = [
  {
    option: "Ignore Case",
    use: "Compare letters regardless of uppercase or lowercase differences.",
  },
  {
    option: "Ignore Spaces",
    use: "Treat multi-word phrases as continuous text for phrase-level palindrome checks.",
  },
  {
    option: "Ignore Punctuation",
    use: "Remove punctuation marks that should not affect palindrome matching.",
  },
  {
    option: "Ignore Numbers",
    use: "Exclude digits from the check when numeric characters are not relevant.",
  },
  {
    option: "Real-time Checking",
    use: "Continuously evaluate input with a short delay while typing.",
  },
  {
    option: "Random Example",
    use: "Load a sample palindrome quickly for testing and demonstration.",
  },
];

const useCases = [
  {
    title: "Word puzzle solving",
    detail: "Validate candidate answers for palindrome-focused games and challenges.",
  },
  {
    title: "Language and classroom activities",
    detail: "Teach string symmetry and pattern recognition using sentence-level checks.",
  },
  {
    title: "Creative writing support",
    detail: "Test palindromic titles, names, and lines during drafting and editing.",
  },
  {
    title: "Bulk list auditing",
    detail: "Scan many words or phrases at once to separate valid palindromes from non-matches.",
  },
  {
    title: "Coding and algorithm practice",
    detail: "Validate expected outputs while learning text-processing and reverse-logic tasks.",
  },
  {
    title: "Brain-training exercises",
    detail: "Use similarity and frequency insights to understand near-palindrome patterns.",
  },
];

const mistakesToAvoid = [
  "Checking phrase palindromes without enabling ignore-spaces.",
  "Forgetting ignore-punctuation for inputs that include commas or apostrophes.",
  "Assuming high similarity means a true palindrome without exact cleaned/reversed equality.",
  "Using ignore-numbers when numeric symmetry should be part of the requirement.",
  "Running bulk checks with untrimmed noisy lines that add invalid test items.",
];

export default function PalindromeCheckerSEOContent() {
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
    name: "How to use the palindrome checker",
    description:
      "Enter text, configure filtering rules, run single or bulk checks, and review palindrome analysis output.",
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
            Palindrome Checker for Accurate Sentence Validation, Bulk Scanning, and Clear Text Diagnostics
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Palindrome Checker</strong> helps you confirm whether words, phrases, or full sentences read the same in reverse.
            It is useful for puzzle solving, teaching, writing, and algorithm practice where precise text symmetry matters.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of guessing manually, you can run configurable checks, inspect cleaned and reversed outputs, and verify results with confidence.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic Palindrome Checkers
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
            Many basic checkers only return a binary result. This tool adds explainability, rule control, and bulk productivity.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Palindrome Checker
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
            Common Palindrome-Checking Mistakes to Avoid
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
            Validate Palindromes Faster with Configurable Rules, Bulk Input Support, and Detailed Output
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With smarter normalization options, instant feedback, and clear diagnostic panels, this checker helps you
            confirm palindrome patterns more reliably than minimal one-line tools.
          </p>
        </section>
      </div>
    </>
  );
}

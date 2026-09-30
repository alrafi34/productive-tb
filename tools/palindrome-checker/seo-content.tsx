import ToolFaq from "@/components/ToolFaq";
import { palindromeCheckerConfig } from "./config";

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
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = palindromeCheckerConfig.seo;

  return (
    <>

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
            {howToSteps.map(({ text: step }, index) => (
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

        <ToolFaq items={faq} />

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

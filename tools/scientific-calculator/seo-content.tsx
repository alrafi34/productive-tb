const faqItems = [
  {
    question: "What is a scientific calculator used for?",
    answer:
      "A scientific calculator handles advanced operations such as trigonometry, logarithms, powers, roots, and expression evaluation beyond basic arithmetic.",
  },
  {
    question: "Does this calculator support degrees and radians?",
    answer:
      "Yes. You can switch between DEG and RAD modes for trigonometric and inverse-trigonometric calculations.",
  },
  {
    question: "Which scientific functions are included?",
    answer:
      "The calculator includes sin, cos, tan, asin, acos, atan, log, ln, square root, powers, constants like pi and e, and factorial.",
  },
  {
    question: "Can I calculate nested expressions with parentheses?",
    answer:
      "Yes. You can build expressions using parentheses and operators, then evaluate the complete formula in one step.",
  },
  {
    question: "How is this better than very basic online calculators?",
    answer:
      "This tool combines scientific functions, angle mode control, memory operations, keyboard shortcuts, local history, and export in one workflow.",
  },
  {
    question: "Does it keep calculation history?",
    answer:
      "Yes. The calculator stores history in your browser so you can review and reuse previous expressions quickly.",
  },
  {
    question: "Can I use keyboard shortcuts?",
    answer:
      "Yes. Numeric keys, arithmetic operators, Enter, Escape, Backspace, and parentheses are supported for faster input.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. Calculations run client-side in your browser and history is stored locally on your device.",
  },
  {
    question: "Can I export my history?",
    answer:
      "Yes. You can export your calculation history as JSON for backup, review, or workflow reuse.",
  },
  {
    question: "Is this suitable for students and engineers?",
    answer:
      "Yes. It is useful for students, engineers, developers, and professionals who need quick scientific math operations without installing extra software.",
  },
];

const howToSteps = [
  "Select the angle mode (DEG or RAD).",
  "Enter numbers, operators, and scientific functions.",
  "Use parentheses for grouped expressions when needed.",
  "Press equals to evaluate the full expression.",
  "Use memory and history features for repeated calculations.",
  "Copy result or export history for documentation.",
];

const strengths = [
  {
    title: "Complete scientific workflow",
    text: "Unlike basic calculators with only arithmetic, this tool includes trigonometric, logarithmic, exponential, and factorial functions in one interface.",
  },
  {
    title: "Fast keyboard-friendly input",
    text: "Keyboard shortcuts plus clickable keys support both quick ad-hoc calculations and longer expression entry.",
  },
  {
    title: "Practical memory and history",
    text: "Memory operations and reusable history reduce repeated typing and help with multi-step technical calculations.",
  },
  {
    title: "Private browser-side processing",
    text: "No account required and no server-side processing for standard use cases, improving privacy and speed.",
  },
];

const examples = [
  {
    title: "Trigonometry example",
    expression: "sin(30) + cos(60)",
    note: "In DEG mode, this evaluates to 1.",
  },
  {
    title: "Logarithm example",
    expression: "log(1000)",
    note: "Returns 3 for base-10 logarithm.",
  },
  {
    title: "Exponential example",
    expression: "2^8",
    note: "Returns 256 for power calculations.",
  },
  {
    title: "Mixed expression example",
    expression: "sqrt(49) + 10^2",
    note: "Combines root and exponent operations in one calculation.",
  },
  {
    title: "Inverse trig example",
    expression: "asin(0.5)",
    note: "Returns angle value in DEG or RAD based on selected mode.",
  },
  {
    title: "Factorial example",
    expression: "5!",
    note: "Computes factorial for integer values.",
  },
];

const mistakesToAvoid = [
  "Using DEG mode when your formula expects RAD (or vice versa).",
  "Skipping parentheses in multi-step expressions.",
  "Applying factorial to non-integer or negative values.",
  "Ignoring domain limits for inverse trigonometric functions.",
  "Rounding too early in chained technical calculations.",
];

const useCases = [
  "Student homework checks for algebra, trigonometry, and calculus prep.",
  "Engineering and physics quick calculations during problem solving.",
  "Developer math validation while testing formulas or algorithms.",
  "Business and analytics work needing logarithms, powers, and reusable steps.",
];

export default function ScientificCalculatorSEO() {
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
    name: "How to use the scientific calculator",
    description:
      "Evaluate scientific expressions using trigonometric, logarithmic, exponential, and memory features.",
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
            Scientific Calculator Online for Advanced Math Expressions
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Scientific Calculator</strong> is designed for users who need more than basic arithmetic.
            It supports trigonometric functions, logarithms, exponentials, roots, factorial, constants, and expression-based evaluation.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            For users searching terms like "online scientific calculator", "trigonometry calculator", or "log calculator",
            this page provides both practical interaction and deeper explanatory content to improve usability and indexing quality.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Scientific Calculator Is Better Than Basic Alternatives
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
            Many tools stop at +, -, ×, ÷. This one is built for scientific workflows and repeat usage.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Scientific Calculator
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
            Example Scientific Calculations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {examples.map((example) => (
              <div key={example.title} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{example.title}</p>
                <p className="mt-1 font-mono text-gray-700">{example.expression}</p>
                <p className="mt-1">{example.note}</p>
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
            Who Should Use This Tool
          </h2>
          <ul className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {useCases.map((useCase) => (
              <li key={useCase} className="flex items-start gap-3">
                <span className="mt-1 text-primary">+</span>
                <span>{useCase}</span>
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
            Use This Scientific Calculator for Faster Technical Work
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With advanced functions, angle mode switching, memory controls, history reuse, and browser-side speed,
            this calculator is built to be a practical daily tool rather than a one-off basic calculator.
          </p>
          <p className="text-xs text-gray-500 mt-4" style={{ fontFamily: "var(--font-body)" }}>
            Results are computational estimates and should be validated when used in high-stakes academic or engineering contexts.
          </p>
        </section>
      </div>
    </>
  );
}

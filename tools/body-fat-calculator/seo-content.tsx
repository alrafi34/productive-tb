const faqItems = [
  {
    question: "What does a body fat calculator measure?",
    answer:
      "A body fat calculator estimates the percentage of your total body weight that comes from fat mass. It gives a better composition signal than weight alone.",
  },
  {
    question: "Which methods are available in this body fat calculator?",
    answer:
      "This tool supports both the US Navy method (measurement-based) and a BMI-based body fat estimate, so you can compare two common approaches in one place.",
  },
  {
    question: "Why can US Navy and BMI body fat results differ?",
    answer:
      "The methods rely on different inputs and assumptions. Navy focuses on circumference measurements, while BMI-based estimates use height, weight, age, and sex.",
  },
  {
    question: "Is the US Navy method more useful than BMI-only checks?",
    answer:
      "For many users, yes. Navy can capture body-shape differences through waist/neck/hip measurements, which BMI alone does not directly include.",
  },
  {
    question: "Can I use metric and imperial units?",
    answer:
      "Yes. You can switch between metric and imperial units instantly, and this calculator converts values without requiring manual conversion.",
  },
  {
    question: "Is this tool suitable for men and women?",
    answer:
      "Yes. The formulas include gender-specific handling and thresholds, and the interface adapts required inputs accordingly.",
  },
  {
    question: "How accurate is an online body fat calculator compared with DEXA?",
    answer:
      "Online calculators provide practical estimates, not clinical-grade precision. DEXA and lab assessments are generally more accurate for medical use.",
  },
  {
    question: "Can I save and track results over time?",
    answer:
      "Yes. You can save entries in local browser history and compare progress across dates and methods.",
  },
  {
    question: "Does this body fat calculator store my personal data on a server?",
    answer:
      "No. Calculations and saved history are handled in your browser for local use.",
  },
  {
    question: "Can this calculator replace medical advice?",
    answer:
      "No. It is a planning and educational tool. For diagnosis or treatment decisions, consult a qualified healthcare professional.",
  },
];

const howToSteps = [
  "Select your unit system (metric or imperial).",
  "Choose gender and method (US Navy or BMI).",
  "Enter required measurements (waist/neck/hip/height for Navy, or weight/height/age for BMI).",
  "Review your estimated body fat percentage and category.",
  "Copy the result or full summary when needed.",
  "Save entries in history to track body composition trends.",
];

const strengths = [
  {
    title: "Two estimation methods on one page",
    text: "Unlike basic calculators that provide one model only, this tool lets you compare US Navy and BMI body fat estimates in the same workflow.",
  },
  {
    title: "Stronger interpretation context",
    text: "The result includes a category and visual scale so users can understand the percentage, not just copy a number.",
  },
  {
    title: "Practical global unit support",
    text: "Metric and imperial modes are both supported with smooth conversion, reducing user friction and input mistakes.",
  },
  {
    title: "Progress tracking without sign-up",
    text: "Save local history entries in-browser for quick comparison during fitness and nutrition planning.",
  },
];

const methodNotes = [
  {
    name: "US Navy Method",
    detail:
      "Uses circumference measurements (waist, neck, and hip for women) plus height. Useful when scale weight alone does not reflect body-shape changes.",
  },
  {
    name: "BMI-Based Body Fat Estimate",
    detail:
      "Uses BMI with age and sex adjustment factors. Fast to calculate and useful as a broad estimate when measurement tape inputs are not available.",
  },
];

const examples = [
  {
    title: "Example 1: Male, Navy method",
    input: "Waist 86 cm, Neck 39 cm, Height 178 cm",
    output: "Tool calculates body fat percentage and category instantly.",
  },
  {
    title: "Example 2: Female, Navy method",
    input: "Waist 79 cm, Neck 33 cm, Hip 98 cm, Height 165 cm",
    output: "Calculator applies female-specific Navy formula inputs.",
  },
  {
    title: "Example 3: BMI method quick check",
    input: "Weight 70 kg, Height 175 cm, Age 30",
    output: "Returns BMI-based body fat estimate with category guidance.",
  },
  {
    title: "Example 4: Progress tracking",
    input: "Run monthly calculations and save to history",
    output: "Compare trend changes without manually writing logs.",
  },
];

const mistakesToAvoid = [
  "Using inconsistent measurement points for waist/neck/hip each time.",
  "Comparing results across methods without noting which method was used.",
  "Treating one estimate as exact clinical body composition.",
  "Ignoring long-term trends and focusing on one isolated reading.",
  "Skipping professional advice when health risk decisions are involved.",
];

export default function BodyFatCalculatorSEO() {
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
    name: "How to use the body fat calculator",
    description:
      "Estimate body fat percentage using US Navy and BMI methods with metric or imperial inputs.",
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
            Body Fat Calculator Online with US Navy and BMI Methods
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Body Fat Calculator</strong> helps you estimate body fat percentage using two practical models:
            the US Navy method and a BMI-based estimate. Instead of showing only one raw value, the tool provides a category,
            interpretation context, and quick copy/share workflow.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            If your goal is better fitness tracking, weight-management planning, or clearer body composition awareness, this page
            is built for depth. It combines formulas, examples, FAQs, and structured guidance to improve usability and indexing value.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Body Fat Calculator Is Better Than Basic Alternatives
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
            Many calculators return one percentage with no context. This page is designed for clearer interpretation and repeat use.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Body Fat Calculator
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Method Reference: US Navy vs BMI-Based Estimate
          </h2>
          <div className="space-y-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {methodNotes.map((method) => (
              <div key={method.name} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <h3 className="font-medium text-gray-900 mb-1">{method.name}</h3>
                <p>{method.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Worked Examples
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
            Mistakes to Avoid When Reading Body Fat Results
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
            Use This Tool for Smarter Body Composition Tracking
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            This body fat calculator is built to be practical, fast, and interpretation-friendly. With dual methods,
            clear categories, and local history tracking, it offers more actionable value than many single-output tools.
          </p>
          <p className="text-xs text-gray-500 mt-4" style={{ fontFamily: "var(--font-body)" }}>
            This tool is educational and not a substitute for personalized medical diagnosis.
          </p>
        </section>
      </div>
    </>
  );
}

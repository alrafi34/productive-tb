const faqItems = [
  {
    question: "What does an ideal weight calculator do?",
    answer:
      "An ideal weight calculator estimates a healthy target weight based on height and gender using established formulas. It helps you compare multiple methods quickly.",
  },
  {
    question: "Which formulas are used in this ideal weight calculator?",
    answer:
      "This calculator uses Devine, Robinson, Miller, and Broca methods so you can compare different clinically used and practical estimation approaches in one place.",
  },
  {
    question: "Why are formula results slightly different from each other?",
    answer:
      "Each formula is built from different assumptions and datasets. Slight variation is expected and useful for understanding a realistic target range instead of one fixed number.",
  },
  {
    question: "Can I use imperial units like feet and pounds?",
    answer:
      "Yes. The tool supports metric and imperial unit systems and converts values instantly without requiring manual conversion.",
  },
  {
    question: "Is this ideal weight calculator better than basic online tools?",
    answer:
      "This page combines four formulas, metric/imperial conversion, formula comparison, optional current-weight status feedback, and copy-ready output in one workflow.",
  },
  {
    question: "Does this calculator provide medical diagnosis?",
    answer:
      "No. It provides educational and planning estimates. For diagnosis or treatment decisions, consult a licensed healthcare professional.",
  },
  {
    question: "Can athletes or muscular people rely only on ideal weight formulas?",
    answer:
      "Not always. High muscle mass, body composition, and sport-specific factors can make formula-only interpretation less reliable. Use these estimates with broader health context.",
  },
  {
    question: "What is Broca range in this calculator?",
    answer:
      "Broca gives a central estimate from height and this tool shows a practical ±10% range to represent a flexible healthy window rather than a single strict value.",
  },
  {
    question: "Can I compare my current weight to the calculated healthy range?",
    answer:
      "Yes. If you enter current weight, the calculator labels whether you are below, within, or above the healthy range based on Broca range boundaries.",
  },
  {
    question: "Is my data stored online?",
    answer:
      "No. Calculations run in your browser and no personal health data is sent to external servers by this tool.",
  },
];

const howToSteps = [
  "Choose your preferred unit system: metric or imperial.",
  "Enter your height in cm or ft/in.",
  "Select your gender.",
  "Optionally enter your current weight.",
  "Select a formula (Devine, Robinson, Miller, or Broca).",
  "Review ideal weight values and formula comparison cards.",
  "Copy the selected result or full breakdown for tracking.",
];

const strengths = [
  {
    title: "Multi-formula comparison in one page",
    text: "Instead of returning one opaque number, this tool gives side-by-side values from four well-known formulas so users can make better-informed decisions.",
  },
  {
    title: "Practical unit flexibility",
    text: "Switch between metric and imperial seamlessly while preserving values, useful for users across different countries and healthcare contexts.",
  },
  {
    title: "Actionable status feedback",
    text: "Optional current-weight comparison shows whether you are below, within, or above healthy range, making outputs easier to interpret quickly.",
  },
  {
    title: "Copy-ready reporting",
    text: "Generate quick result text or full formula breakdown text for sharing with coaches, clinicians, or personal tracking notes.",
  },
];

const examples = [
  {
    title: "Example 1: 170 cm male",
    input: "Height = 170 cm, Gender = male",
    output: "Calculator returns values for Devine, Robinson, Miller, and Broca range immediately.",
  },
  {
    title: "Example 2: 5'7\" female",
    input: "Height = 5 ft 7 in, Gender = female",
    output: "Imperial mode shows formula outputs in pounds with no manual conversion.",
  },
  {
    title: "Example 3: Current weight comparison",
    input: "Add current weight to profile",
    output: "Tool flags below/within/above healthy range and gives difference amount.",
  },
  {
    title: "Example 4: Formula sensitivity check",
    input: "Same height and gender, switch formula",
    output: "Observe how Devine, Robinson, and Miller vary slightly by model design.",
  },
  {
    title: "Example 5: Height goal planning",
    input: "Use quick height presets",
    output: "Explore expected ideal weight changes with different target heights.",
  },
  {
    title: "Example 6: Consultation prep",
    input: "Copy full breakdown",
    output: "Share a structured summary during nutrition or medical follow-up.",
  },
];

const mistakesToAvoid = [
  "Treating formula outputs as strict medical limits instead of estimates.",
  "Ignoring body composition and muscle mass differences.",
  "Using only one formula when multiple estimates are available.",
  "Comparing values across mixed units without conversion.",
  "Skipping professional guidance when clinical context is needed.",
];

export default function IdealWeightCalculatorSEO() {
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
    name: "How to use the ideal weight calculator",
    description:
      "Estimate ideal weight using Devine, Robinson, Miller, and Broca formulas with metric or imperial inputs.",
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
            Ideal Weight Calculator Online for Healthy Weight Estimation by Height
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Ideal Weight Calculator</strong> estimates healthy target weight using multiple recognized methods,
            including Devine, Robinson, Miller, and Broca. Instead of a single black-box output, you get a formula-wise view
            that supports better interpretation.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Users searching for "ideal weight for height", "healthy weight calculator", and "ideal body weight formula"
            often need both quick numbers and context. This page combines interactive calculation, formula guidance,
            examples, and FAQs to improve both user experience and indexing depth.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Ideal Weight Calculator Is Better Than Many Basic Alternatives
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
            Many tools provide only one formula output. This one is designed for deeper comparison and better decision support.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Ideal Weight Calculator
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
            Formula Reference (Devine, Robinson, Miller, Broca)
          </h2>
          <div className="space-y-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-1">Devine Formula</h3>
              <p>Common in medical contexts for ideal body weight approximation.</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-1">Robinson Formula</h3>
              <p>Often yields slightly lower values than Devine for conservative estimation.</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-1">Miller Formula</h3>
              <p>Provides a middle-ground estimate useful for cross-checking targets.</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-1">Broca Method</h3>
              <p>Simple height-based estimate shown with a practical range window.</p>
            </div>
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
            Mistakes to Avoid When Interpreting Ideal Weight
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
            Use This Tool for Better Weight Goal Planning
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            If you want an indexing-friendly and practical <strong>ideal weight calculator</strong>, this page is built
            for clarity and depth. It combines proven formulas, unit flexibility, comparison outputs, and interpretation guidance
            to support safer, more informed health planning.
          </p>
          <p className="text-xs text-gray-500 mt-4" style={{ fontFamily: "var(--font-body)" }}>
            This tool is educational and not a substitute for personalized medical assessment.
          </p>
        </section>
      </div>
    </>
  );
}

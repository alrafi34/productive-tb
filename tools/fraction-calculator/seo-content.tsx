const faqItems = [
  {
    question: "How do I add fractions with different denominators?",
    answer:
      "The calculator finds a common denominator, adjusts each numerator, adds the values, and then simplifies the final fraction automatically.",
  },
  {
    question: "Can this tool simplify fractions to lowest terms?",
    answer:
      "Yes. Every result is reduced using a greatest common divisor method, so you get a clean simplified answer by default.",
  },
  {
    question: "Does it convert improper fractions to mixed numbers?",
    answer:
      "Yes. When the result is improper, the tool also shows a mixed number view so the output is easier to read and use in classwork or real-world tasks.",
  },
  {
    question: "Can I see decimal values from fraction results?",
    answer:
      "Yes. The result panel can display a decimal form alongside the fraction and mixed number, useful for conversion and quick comparison.",
  },
  {
    question: "Does this fraction calculator show step-by-step math?",
    answer:
      "Yes. Enable the steps option to see each operation line, including intermediate expressions and simplification.",
  },
  {
    question: "Why is this better than many basic fraction calculators?",
    answer:
      "Many tools only return one final number. This calculator combines simplified fraction, mixed number, decimal output, optional step view, history, and quick examples in one page.",
  },
  {
    question: "Is the calculator free and private?",
    answer:
      "Yes. It is free to use and calculations run in your browser, so your numbers stay on your device while you work.",
  },
];

const howToSteps = [
  "Enter numerator and denominator for Fraction A.",
  "Enter numerator and denominator for Fraction B.",
  "Choose add, subtract, multiply, or divide.",
  "Review simplified fraction, mixed number, and decimal output.",
  "Turn on steps, copy result text, or reuse values from history.",
];

const comparisonPoints = [
  {
    title: "More than one output format",
    text: "Get simplified fraction, mixed number, and decimal together instead of switching between separate tools.",
  },
  {
    title: "Step visibility for learning",
    text: "Optional step-by-step breakdown helps students, parents, and teachers verify every operation.",
  },
  {
    title: "Built-in workflow tools",
    text: "Use random examples, quick presets, copy buttons, and local history to move faster through practice sets.",
  },
  {
    title: "Browser-based and private",
    text: "No login, no installation, and no server-side math required for standard use.",
  },
];

export default function FractionCalculatorSEO() {
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
    name: "How to use a fraction calculator online",
    description:
      "Calculate fraction addition, subtraction, multiplication, and division with simplification, mixed numbers, and decimal conversion.",
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

      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Online Fraction Calculator with Steps, Simplification, and Decimal Conversion
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          This free Fraction Calculator helps you add fractions, subtract fractions, multiply fractions, and divide fractions
          in seconds. It is built for users who need more than a single output line. Along with the main answer, you can view
          the simplified fraction, mixed number conversion, and decimal equivalent in one place.
        </p>
        <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          Whether you are solving homework, checking worksheets, scaling recipe quantities, or handling measurement math,
          this tool gives fast and accurate fraction results directly in the browser. It is designed for everyday use,
          with clear inputs, instant updates, and practical output formats.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why This Fraction Calculator Stands Out from Typical Tools
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {comparisonPoints.map((point) => (
            <div key={point.title} className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
              <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {point.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Fraction Calculator
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

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Fraction Formula Reference and Examples
        </h2>
        <div className="space-y-5 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <p><strong>Addition:</strong> (a/b) + (c/d) = (ad + bc) / bd</p>
          <p><strong>Subtraction:</strong> (a/b) - (c/d) = (ad - bc) / bd</p>
          <p><strong>Multiplication:</strong> (a/b) x (c/d) = ac / bd</p>
          <p><strong>Division:</strong> (a/b) / (c/d) = (a/b) x (d/c)</p>
          <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
            <p><strong>Example 1:</strong> 1/2 + 3/4 = 5/4 = 1 1/4 = 1.25</p>
            <p><strong>Example 2:</strong> 7/8 - 1/4 = 5/8 = 0.625</p>
            <p><strong>Example 3:</strong> 2/3 x 5/6 = 10/18 = 5/9</p>
            <p><strong>Example 4:</strong> 3/4 / 2/5 = 15/8 = 1 7/8 = 1.875</p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Education and homework
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Students can check answers and review each operation with detailed steps. Teachers can generate quick examples
              for class practice and worksheet validation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Cooking, baking, and scaling recipes
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Adjust ingredient quantities with fraction multiplication and division when increasing or reducing serving sizes.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Measurements and planning
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Use fractional values in construction, crafts, and daily measurement tasks where precise part values matter.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Fast checks for professional workflows
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Compare fraction and decimal outputs quickly, copy final answers, and reuse recent history during repeated calculations.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map((item) => (
            <div key={item.question}>
              <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {item.question}
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

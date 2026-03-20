const faqItems = [
  {
    question: "What does this compound interest calculator calculate?",
    answer:
      "It calculates future value, total interest earned, and an annual growth breakdown using principal, annual rate, time, and compounding frequency.",
  },
  {
    question: "What formula is used for compound interest?",
    answer:
      "The calculator uses FV = P * (1 + r/n)^(n*t), where P is principal, r is annual rate (decimal), n is compounding periods per year, and t is years.",
  },
  {
    question: "What compounding frequencies are supported?",
    answer:
      "Annual, semi-annual, quarterly, monthly, and daily compounding are supported.",
  },
  {
    question: "Why is this better than many basic compound interest tools?",
    answer:
      "Many tools only return one final number. This tool combines future value, interest earned, yearly checkpoints, growth chart preview, CSV export, copy summary, and local history in one place.",
  },
  {
    question: "Can I use this for savings and investment planning?",
    answer:
      "Yes. It is useful for forecasting growth scenarios for savings, recurring investment comparisons, and long-term financial planning assumptions.",
  },
  {
    question: "Is this calculator free and private?",
    answer:
      "Yes. It is free to use and runs directly in your browser for standard calculations.",
  },
];

const howToSteps = [
  "Enter principal amount.",
  "Enter annual interest rate in percent.",
  "Enter time in years.",
  "Choose compounding frequency.",
  "Review future value and total interest earned instantly.",
  "Use chart/table, copy summary, export CSV, or save history as needed.",
];

const comparisonPoints = [
  {
    title: "Beyond one-line output",
    text: "Get both future value and total interest with additional yearly breakdown context.",
  },
  {
    title: "Scenario-driven workflow",
    text: "Switch compounding frequency and input values quickly to compare growth outcomes.",
  },
  {
    title: "Built-in export and copy",
    text: "Download annual data as CSV and copy a clean summary for reports or notes.",
  },
  {
    title: "Practical visibility",
    text: "Use growth preview bars and yearly checkpoints to understand long-term compounding behavior.",
  },
];

export default function ToolSEOContent() {
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
    name: "How to use the compound interest calculator",
    description:
      "Calculate future value and interest earned from principal, annual rate, years, and compounding frequency.",
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
            Compound Interest Calculator Online for Future Value, Growth Forecasting, and Financial Planning
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Compound Interest Calculator</strong> helps you estimate how money grows when interest is reinvested over time.
            Enter principal, annual rate, years, and compounding frequency to calculate future value and total interest earned in seconds.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Users commonly search terms like compound interest calculator, future value calculator, savings growth calculator,
            and investment growth calculator. This page combines those intents into one practical tool for fast scenario testing.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Compound Interest Tool Is Better Than Typical Calculators
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {comparisonPoints.map((point) => (
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
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Compound Interest Calculator
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
            Compound Interest Formula Reference
          </h2>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`FV = P * (1 + r/n)^(n*t)
Interest Earned = FV - P

P = Principal amount
r = Annual interest rate (decimal)
n = Compounding periods per year
t = Time in years
FV = Future value`}
          </pre>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Compounding Frequency Impact
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-100 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 border-b border-gray-100 text-gray-900">Frequency</th>
                  <th className="text-left p-3 border-b border-gray-100 text-gray-900">Compounds per Year</th>
                  <th className="text-left p-3 border-b border-gray-100 text-gray-900">Typical Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-3">Annual</td>
                  <td className="p-3">1</td>
                  <td className="p-3">Basic long-term projections</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-3">Semi-Annual</td>
                  <td className="p-3">2</td>
                  <td className="p-3">Some bonds and fixed return products</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-3">Quarterly</td>
                  <td className="p-3">4</td>
                  <td className="p-3">Common institutional reporting cadence</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-3">Monthly</td>
                  <td className="p-3">12</td>
                  <td className="p-3">Savings and deposit-style growth checks</td>
                </tr>
                <tr>
                  <td className="p-3">Daily</td>
                  <td className="p-3">365</td>
                  <td className="p-3">High-frequency accrual simulation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Worked Compound Interest Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p><strong>Example 1:</strong> P = 10,000, R = 6%, t = 10 years, monthly compounding</p>
              <p className="mt-1">Future value is higher than annual compounding because interest is reinvested more frequently.</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p><strong>Example 2:</strong> P = 5,000, R = 8%, t = 20 years, annual compounding</p>
              <p className="mt-1">Longer time horizon significantly amplifies growth due to compounding effect.</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p><strong>Example 3:</strong> Compare monthly vs quarterly at same rate</p>
              <p className="mt-1">Higher compounding frequency generally results in slightly higher future value.</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p><strong>Example 4:</strong> Increase years while keeping rate fixed</p>
              <p className="mt-1">Time has a strong effect on total returns in compound growth models.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Common Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Savings account projection</h3>
              <p className="text-sm leading-relaxed">Estimate future account value based on expected annual return and compounding interval.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Investment planning</h3>
              <p className="text-sm leading-relaxed">Compare return assumptions before allocating funds across different risk levels.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Education and exam prep</h3>
              <p className="text-sm leading-relaxed">Validate finance formulas and understand compounding behavior with quick checks.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Scenario benchmarking</h3>
              <p className="text-sm leading-relaxed">Evaluate best-case and conservative outcomes by changing rate, years, and frequency.</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-5" style={{ fontFamily: "var(--font-body)" }}>
            Note: This calculator provides planning estimates. Real outcomes can differ due to taxes, fees, contribution patterns, and product rules.
          </p>
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
      </div>
    </>
  );
}

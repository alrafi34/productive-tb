const faqItems = [
  {
    question: "How do I calculate percentage increase between two numbers?",
    answer:
      "Use ((new - old) / |old|) x 100. If the result is positive, it is an increase. If it is negative, it is a decrease.",
  },
  {
    question: "Is this different from a basic percent calculator?",
    answer:
      "Yes. This tool focuses on change analysis and adds reverse calculation, multi-step compounding simulation, batch comparisons, and CSV export in one page.",
  },
  {
    question: "Can I find the original value from a final value and percentage change?",
    answer:
      "Yes. Reverse mode estimates the original value from a final value and a percent change using original = final / (1 + percent/100).",
  },
  {
    question: "Why is a 20% increase then 10% decrease not a net 10% increase?",
    answer:
      "Because percentage changes are applied sequentially to different bases. For example, 100 to 120 to 108 gives a net +8%, not +10%.",
  },
  {
    question: "Can I calculate many percentage changes at once?",
    answer:
      "Yes. Batch mode reads one value per line, compares each row to the next row, and returns percent change for every transition. You can export the output to CSV.",
  },
  {
    question: "Is my data private when I use this calculator?",
    answer:
      "Yes. Calculations run in your browser, so your values stay local during use.",
  },
  {
    question: "What happens if the old value is zero?",
    answer:
      "Percent change from zero is not defined in standard math. This tool avoids invalid division and reports a neutral result in that case.",
  },
];

const howToSteps = [
  "Enter the old value and new value to get instant percent change.",
  "Use Reverse mode when you know final value and percent change and need the original value.",
  "Add multiple increase/decrease steps in sequence to model compounding.",
  "Paste a list into Batch mode to calculate many transitions at once.",
  "Export batch output to CSV when you need spreadsheet-ready results.",
];

export default function PercentageChangeSEO() {
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
    name: "How to use the percentage increase/decrease calculator",
    description:
      "Calculate percent change, reverse original value, compounded multi-step changes, and batch percentage transitions with CSV export.",
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
          Percentage Increase/Decrease Calculator for Accurate Percent Change
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          This free percentage increase and decrease calculator helps you measure how much a value changed from an original number
          to a new number. It works as a percent change calculator, percent growth calculator, and percentage drop calculator in
          one place, making it useful for prices, revenue, salaries, traffic, conversion rates, and everyday number analysis.
        </p>
        <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          Instead of only showing one percentage result, this page gives you practical context: absolute difference, increase/decrease
          direction, reverse lookup for original value, multi-step simulation for compounded changes, and batch transitions that can
          be exported to CSV for reports.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why This Tool Is Better Than Basic Percentage Change Calculators
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              More than one formula
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Many tools only output a single percentage. Here, you can compare values, reverse-calculate an original amount,
              simulate multiple changes, and process lists in batch mode.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Built for compounding
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Sequential changes are shown correctly step by step, so you do not confuse additive percentages with compounded results.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Designed for real workflows
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Batch comparison handles one value per line and outputs transition percentages, which is useful for analytics logs,
              pricing sheets, or month-to-month business tracking.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Local and fast
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Calculations update instantly in the browser while you type, and you can export CSV without sending data to a backend.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use This Percentage Increase and Decrease Calculator
        </h2>
        <ol className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
            <span><strong>Compare two values.</strong> Enter old and new numbers to instantly see difference and percent change.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
            <span><strong>Recover the original.</strong> In reverse mode, enter final value and percent change to estimate starting value.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
            <span><strong>Simulate compounding.</strong> Add multiple increase/decrease steps to model real sequences like pricing updates.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">4</span>
            <span><strong>Run batch analysis.</strong> Paste one number per line, review every transition, and export CSV when needed.</span>
          </li>
        </ol>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Formula Reference and Calculation Logic
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <p><strong>Percent change formula:</strong> ((new value - old value) / |old value|) x 100</p>
          <p><strong>Absolute change:</strong> new value - old value</p>
          <p><strong>Reverse original value:</strong> original = final / (1 + percent/100)</p>
          <p><strong>Compounded sequence:</strong> apply each step to the current value, not to the initial value.</p>
          <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
            <p><strong>Example:</strong> Value moves from 100 to 120 and then decreases by 10%.</p>
            <p>100 -&gt; 120 -&gt; 108, so net change is +8%, not +10%.</p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
          <div className="rounded-lg border border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Pricing and eCommerce
            </h3>
            <p className="leading-relaxed">
              Measure price increases, discount depth, or historical price recovery from sale values.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Finance and investing
            </h3>
            <p className="leading-relaxed">
              Track gain/loss percentages, compare periods, and evaluate multi-step performance changes.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Business reporting
            </h3>
            <p className="leading-relaxed">
              Analyze month-over-month KPI shifts such as revenue, churn, leads, or conversion rates.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Education and exam prep
            </h3>
            <p className="leading-relaxed">
              Verify manual math quickly and understand why percent change direction matters.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Mistakes This Calculator Helps You Avoid
        </h2>
        <ul className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <li className="flex items-start">
            <span className="text-primary mr-2">●</span>
            <span>Mixing up absolute change with percentage change.</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">●</span>
            <span>Using the wrong base value when calculating change.</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">●</span>
            <span>Assuming percentage changes add linearly in multi-step scenarios.</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">●</span>
            <span>Forgetting to account for direction (increase vs decrease).</span>
          </li>
        </ul>
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

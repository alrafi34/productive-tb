const faqItems = [
  {
    question: "How do I calculate X% of Y?",
    answer:
      "Use the formula (X / 100) x Y. In Basic mode, select 'What is X% of Y?' and enter both numbers to get the result instantly.",
  },
  {
    question: "How is this different from a basic percentage calculator?",
    answer:
      "Most tools only solve one formula. This page combines four workflows: basic percentage math, reverse percentage lookup, multi-step compounded changes, and batch processing with CSV export.",
  },
  {
    question: "Can I find the original number from a final number and percent change?",
    answer:
      "Yes. Reverse mode calculates the starting value before an increase or decrease. This is useful for sale-price recovery, tax-inclusive totals, and KPI backtracking.",
  },
  {
    question: "Does this tool support compounded percentage changes?",
    answer:
      "Yes. Multi-Step mode applies each increase or decrease in sequence and shows step-by-step history so you can see compounding clearly.",
  },
  {
    question: "Can I run bulk percentage calculations?",
    answer:
      "Yes. Batch mode accepts one value per line, applies one percentage action to all values, and lets you export results as CSV.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. Calculations run in your browser, so values stay local to your device while you use the tool.",
  },
];

const howToSteps = [
  "Choose a mode: Basic, Reverse, Multi-Step, or Batch.",
  "Enter values and percentage inputs.",
  "Review live results that update while you type.",
  "Copy the result or export batch output to CSV.",
];

export default function PercentageCalculatorSEO() {
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
    name: "How to use the percentage calculator",
    description:
      "Calculate percentages, reverse percentages, compounded multi-step changes, and batch percentage output with CSV export.",
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
          Percentage Calculator for Fast, Practical Math
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          This free online percentage calculator helps you solve common percentage problems in one place: percent of a number,
          increase or decrease, reverse percentage, and chained percentage changes. It is built for both quick daily tasks
          and more detailed analytical work.
        </p>
        <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          Use it for price changes, salary adjustments, conversion rates, markups, and classroom math checks. Results update
          instantly while you type, and you can copy full output or export batch calculations when working with lists.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why This Percentage Calculator Is Different
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Four modes in one interface
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Basic, Reverse, Multi-Step, and Batch modes remove the need to jump between separate calculators.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Compounding-aware calculations
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Multi-Step mode applies changes sequentially and shows history, so compounded percentage effects are explicit.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Built for single values and bulk lists
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Batch mode handles many lines at once and exports CSV, making it useful for spreadsheets and reporting workflows.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Private by default
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Percentage calculations run directly in the browser, so your numeric inputs are not sent to a backend service.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Calculator
        </h2>
        <ol className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
            <span><strong>Select mode.</strong> Pick Basic, Reverse, Multi-Step, or Batch depending on the math problem.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
            <span><strong>Enter values.</strong> Use decimal or whole numbers for percentages, base values, and final values.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
            <span><strong>Read instant output.</strong> Results refresh immediately, including visual indicators for increases and decreases.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">4</span>
            <span><strong>Export or copy.</strong> Copy result text or export batch calculations to CSV for spreadsheet use.</span>
          </li>
        </ol>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Formula Reference and Examples
        </h2>
        <div className="space-y-5 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <p><strong>Percent of number:</strong> result = (percent / 100) x value</p>
          <p><strong>Increase by percent:</strong> new value = value x (1 + percent / 100)</p>
          <p><strong>Decrease by percent:</strong> new value = value x (1 - percent / 100)</p>
          <p><strong>What percent is X of Y:</strong> percent = (X / Y) x 100</p>
          <p><strong>Reverse percent:</strong> original = final / (1 +/- percent / 100)</p>
          <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
            <p><strong>Example:</strong> 20% increase followed by 10% decrease is not a net +10%.</p>
            <p>100 -&gt; 120 -&gt; 108, so the final net change is +8%.</p>
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

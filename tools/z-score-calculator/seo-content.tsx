export default function ZScoreCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Z-Score Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>Z-score calculator</strong> is a free browser-based tool that computes the <strong>standard score</strong> of a value relative to a mean and standard deviation. A Z-score tells you exactly how many standard deviations a value is above or below the average — a fundamental measure used throughout statistics, quality control, finance, and standardized testing.
          </p>
          <p>
            This calculator supports both directions: enter a value, mean, and standard deviation to get its Z-score, or enter a target Z-score along with a mean and standard deviation to reverse-calculate the corresponding value. Every result comes with a plain-language interpretation and an interpretation guide so you always know what the number means.
          </p>
          <p>
            This tool is built for <strong>students, researchers, analysts, scientists, teachers, finance professionals, quality control engineers, and healthcare researchers</strong>. It works entirely in your browser — no data is ever sent to a server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Z-Score Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            In <strong>Calculate Z-Score</strong> mode, enter an observed value (X), a mean (μ), and a standard deviation (σ). The calculator subtracts the mean from the value and divides by the standard deviation to produce the Z-score. In <strong>Reverse Calculate Value</strong> mode, enter a target Z-score along with a mean and standard deviation, and the calculator solves for the corresponding value.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Z = (X − μ) ÷ σ</p>
              <p>X = μ + (Z × σ)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Two Calculation Modes", "Switch instantly between calculating a Z-score from a value, or a value from a target Z-score — no page reload needed."],
              ["Plain-Language Interpretation", "Every result includes a sentence explaining whether the value is below average, average, or above average, and by how much."],
              ["Interpretation Guide", "A built-in reference table classifies any Z-score from Extremely Low to Extremely High, with the current result's row highlighted."],
              ["Validation", "Standard deviation must be greater than zero — the calculator blocks invalid input and explains why."],
            ].map(([factor, desc]) => (
              <li key={factor} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{factor}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Z-Score Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Mode", "Select Calculate Z-Score to find a standard score from a value, or Reverse Calculate Value to solve for a value from a target Z-score."],
                ["Enter Your Numbers", "Type the observed value (or target Z-score), the mean, and the standard deviation — or click one of the example presets to try it instantly."],
                ["Adjust Decimal Precision", "Choose how many decimal places to display, from 0 to 5."],
                ["Review the Result", "See the large Z-score or calculated value, its interpretation badge, and a plain-language explanation, updating instantly as you type."],
                ["Check the Steps", "Review the full calculation breakdown showing exactly how the formula was applied."],
                ["Copy, Export, or Share", "Copy the result, download it as CSV, TXT, or JSON, print it, or copy a shareable URL with your inputs encoded."],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Key Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Forward calculation: Z-score from value, mean, and standard deviation",
                "Reverse calculation: value from Z-score, mean, and standard deviation",
                "Plain-language interpretation of every result",
                "Built-in interpretation guide from Extremely Low to Extremely High",
                "Full calculation steps shown for transparency",
                "Instant calculation with a 150ms debounce as you type",
                "Adjustable decimal precision (0–5 places)",
                "Quick example presets for common scenarios",
                "Shareable calculation URL using query parameters",
                "Export report as CSV, TXT, or JSON, plus a printable layout",
                "Calculation history — save and reload up to 20 past results",
                "Validation that blocks a zero or negative standard deviation",
                "All processing runs locally — no data leaves your browser",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span><span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Standardized Test Scoring",
              scenario: "A student scores 85 on a test with a mean of 70 and a standard deviation of 10. The Z-score of 1.50 shows the score is 1.5 standard deviations above average — a strong result relative to peers.",
            },
            {
              title: "Identifying an Underperforming Result",
              scenario: "An analyst checks a metric of 45 against a historical mean of 60 and standard deviation of 5, finding a Z-score of -3.00 — flagging it as an extreme outlier worth investigating.",
            },
            {
              title: "Quality Control Tolerance Check",
              scenario: "A QA engineer checks whether a measurement of 100, with a process mean of 100 and standard deviation of 20, falls within tolerance — the Z-score of 0 confirms it's exactly on target.",
            },
            {
              title: "Reverse-Solving for a Confidence Bound",
              scenario: "A researcher needs the value corresponding to a Z-score of 1.96 (the 95% confidence threshold) given a mean of 100 and standard deviation of 15, and instantly gets the upper bound using Reverse Calculate mode.",
            },
            {
              title: "Comparing Values Across Different Scales",
              scenario: "A healthcare researcher standardizes two different lab measurements with different means and standard deviations into Z-scores, making them directly comparable on the same scale.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Understanding Z-Scores ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Understanding Z-Scores
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed mb-6">
          <p>
            A <strong>Z-score</strong> (also called a standard score) expresses how far a value is from the mean of its dataset, measured in standard deviations. A Z-score of 0 means the value is exactly average. A positive Z-score means the value is above the mean; a negative Z-score means it's below the mean.
          </p>
          <p>
            Z-scores are useful because they let you compare values from different distributions on a common scale, quickly identify outliers, and calculate probabilities using the standard normal distribution.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Z-Score Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Z < -3", "Extremely Low"],
                ["-3 to -2", "Very Low"],
                ["-2 to -1", "Below Average"],
                ["-1 to 1", "Average"],
                ["1 to 2", "Above Average"],
                ["2 to 3", "Very High"],
                ["> 3", "Extremely High"],
              ].map(([range, label]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{range}</td>
                  <td className="py-2.5 px-4 font-semibold text-primary">{label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a Z-score?",
              a: "A Z-score measures how many standard deviations a value is from the mean of its dataset. It's calculated as Z = (X − μ) ÷ σ, where X is the observed value, μ is the mean, and σ is the standard deviation.",
            },
            {
              q: "Why is the Z-score useful?",
              a: "Z-scores let you compare values from different distributions on a common scale, identify outliers, and calculate probabilities using the standard normal distribution — widely used in statistics, finance, quality control, and standardized testing.",
            },
            {
              q: "When should I use a Z-score?",
              a: "Use a Z-score whenever you need to know how unusual or typical a value is relative to a known mean and standard deviation, or when comparing values measured on different scales.",
            },
            {
              q: "How do I interpret a positive or negative Z-score?",
              a: "A positive Z-score means the value is above the mean; a negative Z-score means it's below the mean. A Z-score of 0 means the value equals the mean exactly. The magnitude tells you how many standard deviations away it is.",
            },
            {
              q: "What happens if I enter a standard deviation of zero?",
              a: "The calculator blocks the calculation and shows an error, since dividing by zero is undefined. Standard deviation must always be greater than zero.",
            },
            {
              q: "How does Reverse Calculate Value work?",
              a: "Enter a target Z-score, a mean, and a standard deviation, and the calculator solves the Z-score formula for X using X = μ + (Z × σ) — useful for finding confidence interval bounds or threshold values.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your numbers are never transmitted to any server or stored in any database. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 6 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Students & Teachers", desc: "Understand and teach standard scores in intro statistics courses." },
            { icon: "📊", title: "Data Analysts & Researchers", desc: "Standardize values from different distributions for direct comparison." },
            { icon: "🔬", title: "Scientists", desc: "Identify outliers and unusual measurements in experimental data." },
            { icon: "💰", title: "Finance Professionals", desc: "Assess how far a return or metric deviates from its historical average." },
            { icon: "✅", title: "Quality Control Engineers", desc: "Determine whether a measurement falls within acceptable process tolerance." },
            { icon: "🏥", title: "Healthcare Researchers", desc: "Standardize lab results and clinical measurements across different scales." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

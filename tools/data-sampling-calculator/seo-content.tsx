export default function DataSamplingCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Data Sampling Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>data sampling calculator</strong> is a free browser-based statistical tool that determines the <strong>required sample size</strong> for surveys, research studies, experiments, polls, market research, and A/B testing. It uses internationally accepted statistical formulas based on confidence level, margin of error, population size, and expected proportion.
          </p>
          <p>
            Choosing an incorrect sample size can make survey results unreliable — too small, and your margin of error balloons; too large, and you waste time and budget. This calculator eliminates manual formula work and instantly shows you a statistically valid sample size, with a full step-by-step breakdown.
          </p>
          <p>
            Built for <strong>researchers, students, data analysts, statisticians, market researchers, product managers, UX researchers, business analysts, and quality assurance teams</strong>, the calculator runs entirely in your browser with instant results and no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Data Sampling Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator applies Cochran's sample size formula, with an optional finite population correction.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>n₀ = (Z² × p × q) ÷ e²</p>
              <p>n = n₀ ÷ (1 + ((n₀ − 1) ÷ N))  [finite population only]</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Z-Score", "Derived from your confidence level: 1.645 for 90%, 1.96 for 95%, and 2.576 for 99% — higher confidence requires a larger sample."],
              ["Margin of Error (e)", "How much sampling error you're willing to accept, entered as a percentage between 0.1% and 20%."],
              ["Expected Proportion (p, q)", "Your best estimate of the population split — 50% is the most conservative default when you have no prior data."],
              ["Finite Population Correction", "Reduces the required sample size when the population is small relative to the calculated sample, since a larger sampling fraction yields more precision."],
              ["Rounding", "The result is always rounded up to the next whole number, since a fractional respondent isn't possible."],
            ].map(([factor, desc]) => (
              <li key={factor} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                <span><strong>{factor}:</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step + Key Features ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Data Sampling Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Population Size", "Type your population size, or check Infinite Population if it's unknown or very large."],
                ["Choose a Confidence Level", "Select 90%, 95%, or 99% confidence, mapped to the corresponding Z-score."],
                ["Set Margin of Error", "Enter your acceptable margin of error as a percentage, from 0.1% to 20%."],
                ["Set Expected Proportion", "Use the slider or number field — 50% is the safest default without prior data."],
                ["Review and Export", "Check the required sample size and formula breakdown, then copy, download, or share your result."],
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
                "Live calculation with a 150ms debounced update",
                "Infinite population mode for unknown or very large populations",
                "Step-by-step calculation breakdown with the full formula",
                "Confidence level comparison table (90% / 95% / 99%)",
                "Margin of error sensitivity chart",
                "Synchronized slider and number field for expected proportion",
                "Sample presets for common research scenarios",
                "Copy result, full report, and shareable link independently",
                "Download CSV, JSON, and print-friendly report",
                "Shareable calculation URL using query parameters",
                "Calculation history — save and reload past results",
                "Auto-saves your last session and restores it on return",
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
            { title: "Customer Satisfaction Survey", scenario: "A UX researcher calculates that a survey of a 10,000-user base needs 370 respondents for 95% confidence at a 5% margin of error." },
            { title: "National Opinion Poll", scenario: "A market researcher uses Infinite Population mode to determine that 385 respondents give 95% confidence at a 5% margin for general public opinion." },
            { title: "Quality Assurance Sampling", scenario: "A QA team calculates how many units to inspect from a 50,000-unit production run to maintain 99% confidence in defect rate estimates." },
            { title: "A/B Test Planning", scenario: "A product manager estimates the sample size needed to detect a change in a 20% baseline conversion rate with a tight 2% margin of error." },
            { title: "Academic Research Study", scenario: "A student calculates the required sample size for a thesis survey and includes the formula breakdown in their methodology section." },
            { title: "Government Census Sampling", scenario: "A government analyst determines a statistically valid sample size for a household survey across a known regional population." },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Common Mistakes ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Use 50% expected proportion when you have no prior data — it's the most conservative estimate and won't undersize your sample.",
                "Add a buffer to your calculated sample size (commonly 10–20%) to account for incomplete responses or data quality issues.",
                "Use finite population correction whenever your sample would represent more than about 5% of the total population — it can meaningfully reduce the required sample.",
                "Check the confidence level comparison table before deciding — going from 95% to 99% confidence increases the sample size substantially.",
                "Use the margin of error sensitivity chart to find the point of diminishing returns before committing to a very tight margin.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Common Mistakes to Avoid</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Don't use a very optimistic expected proportion without evidence — an incorrect assumption here can undersize your sample.",
                "Don't forget that a smaller margin of error requires a dramatically larger sample — the relationship isn't linear.",
                "Don't apply finite population correction to a genuinely unknown or very large population — use Infinite Population mode instead.",
                "Don't confuse sample size for surveys with sample size for comparing two groups (like A/B tests) — comparing proportions requires a different calculation.",
                "Don't skip validating your final response count against the calculated target — a low response rate can leave your actual margin of error wider than planned.",
              ].map((mistake, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Sample Size Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Population</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Confidence</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Margin of Error</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Sample Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["10,000", "95%", "5%", "370"],
                ["500,000", "99%", "3%", "1,842"],
                ["Infinite", "95%", "5%", "385"],
                ["1,000", "95%", "5%", "278"],
                ["100,000", "90%", "5%", "270"],
              ].map(([pop, conf, margin, n]) => (
                <tr key={pop + conf} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700 text-xs">{pop}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{conf}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-600 text-xs">{margin}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-3">Calculated at 50% expected proportion, the most conservative default.</p>
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
              q: "What is a data sampling calculator?",
              a: "A data sampling calculator is a free browser-based tool that calculates the required sample size for surveys, research, experiments, polls, and A/B testing using standard statistical formulas based on confidence level, margin of error, population size, and expected proportion.",
            },
            {
              q: "How is sample size calculated?",
              a: "The calculator uses Cochran's formula: n₀ = (Z² × p × q) ÷ e². For a finite population, this is corrected: n = n₀ ÷ (1 + ((n₀ − 1) ÷ N)).",
            },
            {
              q: "What Z-scores are used for each confidence level?",
              a: "90% confidence uses 1.645, 95% confidence uses 1.96, and 99% confidence uses 2.576.",
            },
            {
              q: "What does Infinite Population mean?",
              a: "Infinite Population is used when the population is unknown or very large. It skips the finite population correction and uses n₀ directly.",
            },
            {
              q: "What is Expected Proportion and why does 50% matter?",
              a: "Expected Proportion is your best estimate of the population split. 50% is most conservative because p × q is maximized there, producing the largest required sample size.",
            },
            {
              q: "What is finite population correction?",
              a: "It reduces required sample size when your population is small relative to the initial calculated sample, since sampling a larger fraction of a small population yields more precision.",
            },
            {
              q: "How does margin of error affect sample size?",
              a: "A smaller margin of error requires a much larger sample — roughly proportional to 1 ÷ e², so halving the margin roughly quadruples the sample size.",
            },
            {
              q: "Can I share my calculation with someone else?",
              a: "Yes. Click Share URL to copy a link that encodes your population, confidence level, margin of error, and expected proportion as query parameters.",
            },
            {
              q: "Does this calculator handle A/B testing sample sizes?",
              a: "Yes, for the basic sample size needed to estimate a single proportion. Comparing two variants' conversion rates specifically requires a dedicated two-proportion test calculator.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
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
            { icon: "🔬", title: "Researchers & Statisticians", desc: "Determine statistically valid sample sizes for academic and applied research." },
            { icon: "📋", title: "Market Researchers", desc: "Plan surveys and polls with a defensible confidence level and margin of error." },
            { icon: "🎨", title: "UX Researchers", desc: "Size usability studies and satisfaction surveys appropriately." },
            { icon: "📈", title: "Product Managers", desc: "Estimate the data needed to validate feature and pricing decisions." },
            { icon: "✅", title: "Quality Assurance Teams", desc: "Determine inspection sample sizes for production quality checks." },
            { icon: "🎓", title: "Students & Educators", desc: "Learn and teach the statistics behind sample size determination." },
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

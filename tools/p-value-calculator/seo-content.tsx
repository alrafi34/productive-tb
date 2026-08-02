export default function PValueCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a P-Value Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>p-value calculator</strong> is a free browser-based tool that computes statistical significance directly from a test statistic. It answers the question every hypothesis test comes down to: <em>how likely is it that I&apos;d see a result this extreme if there were actually no real effect?</em>
          </p>
          <p>
            Rather than looking up critical values in a printed distribution table and interpolating by hand, this calculator computes the exact cumulative probability mathematically for seven common tests — Z-Test, One Sample T-Test, Two Sample T-Test, Paired T-Test, Chi-Square Test, Correlation Test, and F-Test — and immediately tells you whether to reject or fail to reject the null hypothesis at your chosen significance level.
          </p>
          <p>
            This tool is built for <strong>students, researchers, data scientists, statisticians, business analysts, medical researchers, economists, engineers, social science researchers, and quality assurance professionals</strong>. It supports one-tailed and two-tailed tests, custom significance levels, adjustable decimal precision, and CSV/TXT/JSON export — running entirely in your browser with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the P-Value Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator converts your test statistic into a cumulative probability using the distribution that matches your selected test, then adjusts for a left-tailed, right-tailed, or two-tailed hypothesis to produce the final p-value.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Z-Test (two-tailed): p = 2 × (1 − Φ(|z|))</p>
              <p>T-Test (two-tailed): p = 2 × (1 − T<sub>df</sub>(|t|))</p>
              <p>Chi-Square Test: p = 1 − χ²<sub>df</sub>(x) (right-tailed)</p>
              <p>Correlation: t = r√(n − 2) ÷ √(1 − r²), df = n − 2</p>
              <p>F-Test: p = 1 − F<sub>d1,d2</sub>(x) (right-tailed)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Distribution Match", "Z-tests use the standard normal distribution, T-tests and correlation tests use the Student's t distribution, Chi-Square uses the chi-square distribution, and F-tests use the F distribution — each computed exactly, not approximated from a table."],
              ["Tail Adjustment", "Two-tailed tests double the one-directional probability to account for extremes in either direction; left- and right-tailed tests use the probability in a single direction only."],
              ["Decision Rule", "If the p-value is less than or equal to your significance level (α), the calculator reports Reject Null Hypothesis. Otherwise, it reports Fail to Reject Null Hypothesis."],
              ["Auto-Adjusting Fields", "Degrees of freedom fields appear only for tests that need them, and the tail selector is hidden for Chi-Square and F-tests, which are inherently right-tailed."],
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
          How to Use the P-Value Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Select a Statistical Test", "Choose the test that matches your analysis — Z-Test, a T-Test variant, Chi-Square, Correlation, or F-Test."],
                ["Choose a Tail Type", "Pick Left-Tailed, Right-Tailed, or Two-Tailed for tests where direction matters — this field is hidden and fixed for Chi-Square and F-tests."],
                ["Enter Your Test Statistic", "Type your calculated statistic and degrees of freedom, or enter a correlation coefficient and sample size for a correlation test."],
                ["Set Your Significance Level", "Click 0.10, 0.05, or 0.01, or enter a custom alpha value between 0 and 1."],
                ["Read the Live Result", "The p-value, significance badge, and plain-language interpretation update instantly as you type."],
                ["Copy, Export, or Share", "Copy the full report, download it as CSV, TXT, or JSON, print it, or copy a shareable URL that encodes all your inputs."],
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
                "Seven statistical tests: Z-Test, three T-Test variants, Chi-Square, Correlation, and F-Test",
                "Exact cumulative distribution calculations, not rounded table lookups",
                "Instant calculation with a 150ms debounce as you type",
                "Left-tailed, right-tailed, and two-tailed hypothesis support",
                "Automatic significance decision with plain-language interpretation",
                "Three alpha presets (0.10, 0.05, 0.01) plus custom significance levels",
                "Adjustable decimal precision from 2 to 6 places, with scientific notation for very small p-values",
                "Shareable calculation URL using query parameters",
                "Export report as CSV, TXT, or JSON, plus a printable layout",
                "Calculation history — save and reload up to 20 past results",
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
              title: "A/B Test Significance Check",
              scenario: "A product analyst calculates a Z statistic of 2.31 comparing two landing page conversion rates. Using Z-Test, Two-Tailed, at α = 0.05, the calculator returns p = 0.0209 — since 0.0209 ≤ 0.05, the result is statistically significant and the team ships the winning variant.",
            },
            {
              title: "Small-Sample Research Study",
              scenario: "A psychology researcher runs a one-sample t-test on 29 participants (t = 1.12, df = 28). Using One Sample T-Test, Two-Tailed, the calculator returns p = 0.272 — above α = 0.05, so the researcher fails to reject the null hypothesis and reports no significant effect.",
            },
            {
              title: "Manufacturing Defect Rate Analysis",
              scenario: "A quality engineer runs a chi-square goodness-of-fit test comparing observed vs. expected defect counts across 6 categories (χ² = 11.45, df = 5). Chi-Square Test returns p = 0.043 — below 0.05, indicating the defect distribution differs significantly from what was expected.",
            },
            {
              title: "Correlating Study Hours and Exam Scores",
              scenario: "An education researcher measures a correlation of r = 0.45 between study hours and exam scores across 30 students. Correlation Test, Two-Tailed, converts this to t ≈ 2.63 with df = 28, returning p ≈ 0.014 — a statistically significant positive relationship at α = 0.05.",
            },
            {
              title: "Comparing Variance Between Two Machines",
              scenario: "An engineer runs an F-test comparing variance from two production lines (F = 3.2, d1 = 4, d2 = 20). F-Test returns p ≈ 0.034, below α = 0.05, indicating the two machines produce significantly different amounts of variability.",
            },
            {
              title: "Clinical Trial Treatment Comparison",
              scenario: "A medical researcher runs a paired t-test on before/after blood pressure readings from 19 patients (t = 2.18, df = 18). Paired T-Test, Two-Tailed, returns p ≈ 0.042 — significant at α = 0.05, supporting the treatment's effect.",
            },
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
                "Decide your tail type and significance level before you see the result, not after — choosing them retroactively to get a \"significant\" answer invalidates the test.",
                "Default to a two-tailed test unless you have a specific, pre-registered directional hypothesis — it's the more conservative and widely accepted standard.",
                "Report the exact p-value, not just \"p < 0.05\" — a p-value of 0.049 and 0.0001 both clear that bar but represent very different strengths of evidence.",
                "For the three T-test variants, remember the difference lies entirely in how you computed your t statistic and degrees of freedom from raw data — once you have those two numbers, the p-value calculation is identical.",
                "Use scientific notation display for very small p-values (enabled automatically at high precision) rather than rounding to 0.0000, which loses information about how extreme the result is.",
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
                "Don't interpret a small p-value as proof of a large or important effect — statistical significance measures how unlikely the result is under the null hypothesis, not how big or practically meaningful the effect is.",
                "Don't confuse \"fail to reject the null hypothesis\" with \"proving the null hypothesis is true\" — absence of significant evidence isn't evidence of absence.",
                "Don't switch from a two-tailed to a one-tailed test after seeing your data just to get a smaller p-value — this inflates your false-positive rate.",
                "Don't apply a chi-square or F-test tail selection manually — both are inherently right-tailed since their statistics are always non-negative, which is why the calculator hides that option for these tests.",
                "Don't run many tests and only report the significant ones — this multiple-comparisons problem dramatically increases your chance of a false positive; correct for it (e.g., Bonferroni) when running several tests at once.",
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

      {/* ── 6. Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Test Type Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Test</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Distribution</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Required Inputs</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tail Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Z-Test", "Standard Normal", "z statistic", "Left / Right / Two"],
                ["One Sample T-Test", "Student's t", "t statistic, df", "Left / Right / Two"],
                ["Two Sample T-Test", "Student's t", "t statistic, df", "Left / Right / Two"],
                ["Paired T-Test", "Student's t", "t statistic, df", "Left / Right / Two"],
                ["Chi-Square Test", "Chi-Square", "χ² statistic, df", "Right only"],
                ["Correlation Test", "Student's t", "r, sample size (n)", "Left / Right / Two"],
                ["F-Test", "F Distribution", "F statistic, df₁, df₂", "Right only"],
              ].map(([test, dist, inputs, tail]) => (
                <tr key={test} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{test}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{dist}</td>
                  <td className="py-2.5 px-4 text-gray-700">{inputs}</td>
                  <td className="py-2.5 px-4 text-gray-700">{tail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a p-value calculator?",
              a: "A p-value calculator is a free browser-based tool that computes the probability of observing a test statistic as extreme as yours under the null hypothesis, for tests including Z-tests, T-tests, Chi-Square, F-tests, and correlation tests, and reports whether the result is statistically significant.",
            },
            {
              q: "How is a p-value calculated?",
              a: "The test statistic is converted into a cumulative probability using the matching distribution — normal, Student's t, chi-square, or F — and that probability is adjusted for a left-tailed, right-tailed, or two-tailed hypothesis to produce the final p-value.",
            },
            {
              q: "What is a good p-value?",
              a: "There's no fixed \"good\" value — it's compared against your chosen significance level (α), commonly 0.05. A p-value at or below α is statistically significant; above α means there isn't enough evidence to reject the null hypothesis.",
            },
            {
              q: "What is the difference between one-tailed and two-tailed tests?",
              a: "A two-tailed test checks for a difference in either direction and is the standard, more conservative default. A one-tailed test checks only one specific direction, producing a smaller p-value for the same statistic, but the direction must be decided before seeing the data.",
            },
            {
              q: "How do I calculate a p-value from a t statistic using this tool?",
              a: "Select the T-test variant matching your study design, enter your t statistic and degrees of freedom, choose a tail type, and the p-value updates instantly using the Student's t distribution.",
            },
            {
              q: "Why don't Chi-Square and F-tests have a tail selector?",
              a: "Chi-square and F statistics are based on squared values or variance ratios and can never be negative, so unusual results only occur in the right (upper) tail of their distributions — the calculator automatically fixes these tests to right-tailed.",
            },
            {
              q: "How does the correlation test convert r into a p-value?",
              a: "It transforms your correlation coefficient r and sample size n into a t statistic using t = r√(n − 2) ÷ √(1 − r²), with n − 2 degrees of freedom, then applies the standard t-distribution p-value calculation.",
            },
            {
              q: "What does statistically significant actually mean?",
              a: "It means the p-value is at or below your chosen significance level, so the observed result would be unlikely to occur by chance alone if the null hypothesis were true. It does not measure the size or practical importance of the effect, only how unlikely it is under the null.",
            },
            {
              q: "Can I use a custom alpha value instead of 0.05?",
              a: "Yes. Select the custom option and enter any value between 0 and 1. Researchers commonly use 0.10 for exploratory work, 0.05 as the general standard, and 0.01 when false positives carry a high cost.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your test statistics and inputs are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>Who Uses This Calculator?</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach hypothesis testing with exact, formula-transparent p-value calculations." },
            { icon: "🔬", title: "Researchers & Scientists", desc: "Check statistical significance of experimental results across multiple test types in one place." },
            { icon: "📊", title: "Data Scientists & Analysts", desc: "Validate A/B tests and model comparisons without opening a full statistics package." },
            { icon: "🏥", title: "Medical Researchers", desc: "Evaluate treatment effects from paired and independent clinical trial data." },
            { icon: "💰", title: "Economists & Business Analysts", desc: "Test whether observed differences in metrics are statistically meaningful or just noise." },
            { icon: "✅", title: "Quality Assurance Professionals", desc: "Run chi-square and F-tests to confirm process or defect rate differences are significant." },
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

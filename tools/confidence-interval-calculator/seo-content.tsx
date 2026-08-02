export default function ConfidenceIntervalCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Confidence Interval Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>confidence interval calculator</strong> is a free browser-based tool that estimates the range within which a true population parameter — typically a mean or proportion — is likely to fall, at a chosen confidence level. It answers the core question every researcher and analyst faces: <em>given this sample, how much can I trust the estimate, and how wide is the range of plausible values?</em>
          </p>
          <p>
            Calculating a confidence interval by hand means picking the right critical value from a Z or t table, computing standard error correctly, and applying the right formula for your situation — a mean with known variance, a mean with unknown variance, or a proportion. This calculator handles all three automatically, plus margin of error and required sample size, and computes exact Z and t critical values mathematically rather than rounding from a lookup table.
          </p>
          <p>
            This tool is built for <strong>students, researchers, data scientists, business analysts, market researchers, quality control engineers, healthcare professionals, statisticians, financial analysts, and social science researchers</strong>. It supports six confidence level presets plus custom levels, adjustable decimal precision, shareable calculation URLs, and CSV/TXT/JSON export — and runs entirely in your browser with no signup and no server involved.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Confidence Interval Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator determines a critical value based on your chosen confidence level, computes the standard error from your sample data, multiplies the two to get the margin of error, and applies it above and below your sample mean or proportion.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Mean (known σ): CI = x̄ ± Z × (σ ÷ √n)</p>
              <p>Mean (unknown σ): CI = x̄ ± t × (s ÷ √n), df = n − 1</p>
              <p>Proportion: CI = p ± Z × √(p(1 − p) ÷ n)</p>
              <p>Margin of Error: MOE = Critical Value × Standard Error</p>
              <p>Sample Size (proportion): n = (Z² × p(1 − p)) ÷ E²</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Z vs. t Critical Value", "The calculator uses the standard normal (Z) distribution when population standard deviation is known or you're working with a proportion, and the Student's t distribution — computed for the exact degrees of freedom — when only the sample standard deviation is available."],
              ["Exact Critical Values", "Rather than rounding to the nearest table entry, both Z and t critical values are computed mathematically using an inverse normal (probit) function and a numerically inverted Student's t CDF, so custom confidence levels like 92.5% work exactly."],
              ["Standard Error", "Standard error measures how much your sample statistic would vary across repeated samples — it shrinks as sample size grows, which is why larger samples produce narrower confidence intervals."],
              ["Auto-Adjusting Fields", "The input panel shows only the fields relevant to your selected calculation type, hiding sample mean and standard deviation fields when calculating a proportion, and vice versa."],
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
          How to Use the Confidence Interval Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Calculation Type", "Select Mean (Known σ) if you know the true population standard deviation, Mean (Unknown σ) if you only have the sample standard deviation, Proportion for percentages, or Margin of Error / Sample Size for standalone calculations."],
                ["Enter Your Sample Data", "Type your sample mean or proportion, standard deviation, and sample size. Only the fields relevant to your selected mode are shown."],
                ["Pick a Confidence Level", "Click one of the six preset buttons (80–99%) or enter a custom confidence level between 0 and 100 for a precisely computed critical value."],
                ["Adjust Decimal Precision", "Choose how many decimal places to display, from 2 to 5, to match the precision your work requires."],
                ["Review the Live Result", "The confidence interval bounds, margin of error, critical value, and standard error update instantly as you type, with the full substituted formula shown below."],
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
                "Five calculation modes: mean (known σ), mean (unknown σ), proportion, margin of error, and sample size",
                "Exact Z and t critical values, not rounded lookup-table approximations",
                "Instant calculation with a 150ms debounce as you type",
                "Six confidence level presets (80–99%) plus custom levels",
                "Adjustable decimal precision from 2 to 5 places",
                "Full formula breakdown with substituted values",
                "Shareable calculation URL using query parameters",
                "Export report as CSV, TXT, or JSON, plus a printable layout",
                "Calculation history — save and reload up to 20 past results",
                "Clear inline validation for invalid proportions, sample sizes, and confidence levels",
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
              title: "Estimating Average Customer Spend",
              scenario: "A market researcher surveys 64 customers and finds a sample mean spend of $75 with a sample standard deviation of $12. Using Mean (Unknown σ) at 95% confidence, the calculator returns a 72.06 to 77.94 interval — the researcher reports average spend as $75 ± $2.94.",
            },
            {
              title: "Election Poll Margin of Error",
              scenario: "A pollster surveys 500 voters and finds 62% support a candidate. Using Proportion mode at 99% confidence, the calculator returns a 0.564 to 0.676 interval, letting the pollster report the result as 62% ± 5.6 points with 99% confidence.",
            },
            {
              title: "Manufacturing Quality Control",
              scenario: "A QA engineer knows a machine's true process standard deviation is 15 units from historical calibration data. With a sample mean of 100 from 100 parts, Mean (Known σ) mode at 90% confidence returns 97.53 to 102.47, confirming the batch is within tolerance.",
            },
            {
              title: "Clinical Trial Sample Size Planning",
              scenario: "A healthcare researcher needs to estimate a proportion within a 5% margin of error at 95% confidence, without knowing the true rate in advance. Using Sample Size mode with a conservative p = 0.5 estimate, the calculator returns a required sample size of 385 participants.",
            },
            {
              title: "A/B Test Confidence Reporting",
              scenario: "A business analyst runs a landing page test with 500 visitors and a 62% conversion rate, and needs the margin of error alone to include in a slide. Margin of Error mode with the proportion basis returns ±5.6 percentage points at 99% confidence without needing to recompute the full interval.",
            },
            {
              title: "Academic Research Reporting",
              scenario: "A social science researcher collects survey data from 100 respondents with a known population standard deviation of 15 from prior studies, and reports the 90% confidence interval of 97.53 to 102.47 alongside the sample mean of 100 in a published paper.",
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
                "Default to Mean (Unknown σ) unless you have a genuinely known population standard deviation from historical or theoretical data — in practice, the sample standard deviation is almost always what you actually have.",
                "Use the Sample Size mode before collecting data, not after, so your study is designed to hit your target margin of error instead of discovering it's too wide after the fact.",
                "When estimating proportion sample size and you have no prior estimate of p, leave it at 0.5 — this is the most conservative choice and guarantees your actual margin of error will be at or below your target.",
                "Report both the interval and the sample size together — a narrow interval from a tiny sample can be misleading, since it doesn't reflect real-world sampling variability as well as a wider interval from a large sample.",
                "Increase decimal precision to 4 or 5 places for scientific or engineering work where small differences in bounds matter, and keep 2 places for general business reporting.",
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
                "Don't use the Z distribution when you only have the sample standard deviation — this understates uncertainty, especially with small samples, since the t distribution has heavier tails to compensate.",
                "Don't interpret a 95% confidence interval as \"95% probability the true mean is in this range\" — it means that if you repeated the sampling process many times, 95% of the resulting intervals would contain the true parameter.",
                "Don't forget that proportion confidence intervals using the normal approximation become unreliable when np or n(1 − p) is smaller than about 5–10 — consider a larger sample in that case.",
                "Don't confuse margin of error with standard error — margin of error is the critical value multiplied by standard error, and it's always larger than standard error alone.",
                "Don't assume a narrower confidence interval always means a better estimate — it can also mean a smaller sample size with insufficient statistical power, not necessarily more precision.",
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
          Z Critical Value Reference Table
        </h2>
        <p className="text-sm text-gray-500 mb-4">Standard two-tailed Z critical values used for known-variance and proportion confidence intervals.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Confidence Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Z Critical Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["80%", "1.282"],
                ["85%", "1.440"],
                ["90%", "1.645"],
                ["95%", "1.960"],
                ["98%", "2.326"],
                ["99%", "2.576"],
              ].map(([level, z]) => (
                <tr key={level} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{level}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-700">{z}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">* These are common rounded values. The calculator computes the exact critical value for any confidence level, including custom ones, using an inverse normal distribution function.</p>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a confidence interval calculator?",
              a: "A confidence interval calculator is a free browser-based tool that estimates the range within which a population parameter, such as a mean or proportion, is likely to fall at a chosen confidence level, using your sample mean or proportion, standard deviation, and sample size.",
            },
            {
              q: "How is a confidence interval calculated?",
              a: "For a mean with known population standard deviation, the formula is x̄ ± Z × (σ ÷ √n). With unknown standard deviation, it's x̄ ± t × (s ÷ √n) using the Student's t distribution. For a proportion, it's p ± Z × √(p(1 − p) ÷ n).",
            },
            {
              q: "What is a good confidence level to use?",
              a: "95% is the most common standard across research, business, and quality control. 90% produces a narrower interval with slightly less certainty, while 99% produces a wider, more conservative interval — the right choice depends on your tolerance for risk.",
            },
            {
              q: "What is the difference between using Z and t critical values?",
              a: "Use Z when the population standard deviation is known. Use t, based on the Student's t distribution with n − 1 degrees of freedom, when only the sample standard deviation is available — it produces a wider, more honest interval that accounts for extra estimation uncertainty.",
            },
            {
              q: "How do I calculate margin of error using this tool?",
              a: "Switch to Margin of Error mode and choose whether your standard deviation is a known population value, a sample estimate, or you're working with a proportion. The calculator returns the margin of error alone without requiring a center value.",
            },
            {
              q: "How does the sample size calculator work?",
              a: "Enter your target margin of error and confidence level, plus either an estimated standard deviation (for a mean) or an estimated proportion (for a percentage). The calculator solves the margin of error formula for n and rounds up to the nearest whole number.",
            },
            {
              q: "Why does increasing sample size narrow the confidence interval?",
              a: "Standard error is proportional to 1 ÷ √n, so as sample size grows, standard error — and therefore margin of error — shrinks. Quadrupling your sample size halves your margin of error, all else being equal.",
            },
            {
              q: "Can I use a custom confidence level instead of the presets?",
              a: "Yes. Select the custom option and enter any value between 0 and 100. The calculator computes the exact Z or t critical value mathematically for that level rather than approximating from a fixed table.",
            },
            {
              q: "What if my proportion confidence interval goes below 0% or above 100%?",
              a: "This can happen with the normal approximation when the sample proportion is near 0 or 1, or the sample size is small. Treat the bound as 0 or 1 in that case, and use a larger sample when np and n(1 − p) are both below about 5–10.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your sample data is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "🎓", title: "Students & Teachers", desc: "Learn and teach confidence interval theory with exact, formula-transparent calculations." },
            { icon: "🔬", title: "Researchers & Scientists", desc: "Report reliable interval estimates for experimental and survey data in publications." },
            { icon: "📊", title: "Data Analysts", desc: "Quickly quantify uncertainty around sample statistics without opening a stats package." },
            { icon: "🗳️", title: "Market & Social Researchers", desc: "Calculate margin of error for survey and poll results before publishing findings." },
            { icon: "🏭", title: "Quality Control Engineers", desc: "Confirm process measurements fall within statistically expected tolerance bands." },
            { icon: "🏥", title: "Healthcare Professionals", desc: "Plan clinical study sample sizes and report confidence bounds around measured outcomes." },
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

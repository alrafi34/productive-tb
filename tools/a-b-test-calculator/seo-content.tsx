export default function ABTestCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an A/B Test Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>A/B test calculator</strong> is a free browser-based statistical tool that determines whether the difference in conversion rate between two variants — Variant A and Variant B — is <strong>statistically significant</strong> or just random noise. It answers the question every marketer and product team asks after running a split test: <em>is this result real, or could it have happened by chance?</em>
          </p>
          <p>
            The calculator uses a <strong>two-proportion z-test</strong>, the standard statistical method for comparing conversion rates between two independent groups. Enter the visitor and conversion counts for each variant, and it instantly computes conversion rates, lift, a Z-score, a p-value, a confidence interval, and a clear significant/not-significant verdict — complete with a plain-language decision summary.
          </p>
          <p>
            This tool is built for <strong>marketers, product managers, UX researchers, SaaS companies, advertisers, developers, eCommerce businesses, startups, and data analysts</strong> who need fast, reliable A/B testing insights without complex statistical software. It runs entirely in your browser — no data is ever sent to a server.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the A/B Test Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            The calculator compares the conversion rates of Variant A and Variant B using a pooled standard error and a Z-score, then converts that Z-score into a p-value using the standard normal distribution. If the p-value falls below your significance threshold (1 minus your chosen confidence level), the result is declared statistically significant.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Conversion Rate</span> = Conversions ÷ Visitors</p>
              <p><span className="font-semibold">Pooled Rate (p)</span> = (ConvA + ConvB) ÷ (VisitorsA + VisitorsB)</p>
              <p><span className="font-semibold">Standard Error</span> = √(p × (1 − p) × (1/VisitorsA + 1/VisitorsB))</p>
              <p><span className="font-semibold">Z-score</span> = (CRb − CRa) ÷ Standard Error</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Conversion Rate", "The percentage of visitors who converted in each variant, calculated independently for A and B."],
              ["Lift", "The relative percentage change in conversion rate of B versus A — positive means B outperforms A."],
              ["Z-score & P-value", "The Z-score measures how many standard errors apart the two rates are; the p-value is the probability of seeing a difference this large purely by chance."],
              ["Confidence Interval", "A range around the observed difference in conversion rates, showing the plausible true difference at your chosen confidence level."],
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
          How to Use the A/B Test Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Enter Variant A Data", "Type the total visitors and conversions for your control variant (Variant A)."],
                ["Enter Variant B Data", "Type the total visitors and conversions for your challenger variant (Variant B)."],
                ["Choose a Confidence Level", "Select 90%, 95%, or 99% — 95% is the standard used by most A/B testing tools."],
                ["Select a Test Type", "Use Two-tailed to detect a difference in either direction, or One-tailed if you only care whether B beats A specifically."],
                ["Read the Live Results", "Conversion rates, lift, Z-score, p-value, and the significance verdict update instantly as you type."],
                ["Review the Decision Summary", "A plain-language summary tells you whether to trust the result or keep collecting data."],
                ["Export or Share", "Copy the report, download it as CSV, TXT, or JSON, print it, or share a URL with your inputs encoded."],
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
                "Two-proportion z-test with pooled standard error",
                "90%, 95%, and 99% confidence levels",
                "Two-tailed and one-tailed test support",
                "Conversion rate, absolute difference, and relative lift",
                "Z-score, p-value, and confidence interval of the difference",
                "Color-coded significance badge and winner detection",
                "Interactive conversion rate comparison bar chart",
                "Swap Variants and Load Example one-click actions",
                "Adjustable decimal precision (2–5 places)",
                "Instant calculation with a 150ms debounce as you type",
                "Shareable calculation URL using query parameters",
                "Export report as CSV, TXT, or JSON, plus a printable layout",
                "Calculation history — save and reload up to 20 past tests",
                "Validation that blocks conversions exceeding total visitors",
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
              title: "Landing Page Redesign",
              scenario: "A growth marketer tests a redesigned landing page (Variant B: 510 conversions from 10,200 visitors) against the original (Variant A: 420 conversions from 10,000 visitors). At 95% confidence, the calculator confirms the 5.00% rate is significantly higher than 4.20%, giving the team confidence to ship the redesign.",
            },
            {
              title: "Inconclusive Email Subject Line Test",
              scenario: "A lifecycle marketer compares two subject lines across roughly 3,500 recipients each, seeing open rates of 6.00% versus 6.20%. The calculator returns a p-value well above 0.05, showing the difference isn't statistically significant — the team decides to keep testing rather than declare a winner.",
            },
            {
              title: "Checkout Button Color Test",
              scenario: "An eCommerce team runs a large-scale test across 50,000 and 51,000 visitors on two checkout button colors, seeing 2,300 versus 2,520 completed purchases. The large sample size lets the calculator detect a smaller lift as statistically significant, informing a permanent design change.",
            },
            {
              title: "Pricing Page CTA Test",
              scenario: "A SaaS product manager tests two call-to-action wordings on a pricing page with a one-tailed test, since the team only cares whether the new wording increases signups, not whether it decreases them.",
            },
            {
              title: "Ad Creative Comparison",
              scenario: "A performance marketer compares click-to-conversion rates across two ad creatives using a 99% confidence level before committing additional ad spend, wanting a higher bar of certainty given the budget at stake.",
            },
            {
              title: "Mobile App Onboarding Flow",
              scenario: "A product team tests a shortened onboarding flow against the original, using the confidence interval of the difference to understand not just whether the new flow is better, but by roughly how much.",
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
                "Decide your sample size and test duration in advance using a sample size calculator — checking results repeatedly and stopping as soon as you see significance inflates your false positive rate.",
                "Use a one-tailed test only when you truly don't care about detecting a decrease — most product and marketing tests should stay two-tailed.",
                "A p-value just under your threshold with a small sample is fragile — favor tests with larger sample sizes for decisions with real business impact.",
                "Look at the confidence interval, not just the significance verdict — a significant but tiny lift may not be worth the engineering cost to ship.",
                "Run tests for at least one full business cycle (often one to two weeks) to avoid day-of-week or novelty effects skewing your conversion rates.",
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
                "Don't stop a test the moment it first shows significance — peeking at results repeatedly without correction dramatically increases false positives.",
                "Don't declare a winner from a tiny sample size — a 60% versus 40% conversion rate means little with only 10 visitors per variant.",
                "Don't ignore a wide confidence interval — it signals the true effect size is uncertain even if the p-value crosses your threshold.",
                "Don't compare conversion rates measured over different time periods or traffic sources — that introduces confounding variables the z-test can't account for.",
                "Don't confuse statistical significance with practical significance — a significant 0.1% lift may not be worth implementing.",
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
          Significance Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">P-value</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">At 95% Confidence</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["p < 0.01", "Significant", "Very strong evidence of a real difference"],
                ["p < 0.05", "Significant", "Standard threshold — reasonably strong evidence"],
                ["0.05 ≤ p < 0.10", "Not significant", "Weak or borderline evidence — consider more data"],
                ["p ≥ 0.10", "Not significant", "No meaningful evidence of a difference"],
              ].map(([p, sig, interp]) => (
                <tr key={p} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-700">{p}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{sig}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{interp}</td>
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
              q: "What is an A/B test calculator?",
              a: "An A/B test calculator is a free browser-based tool that determines whether the difference in conversion rate between two variants is statistically significant. It uses a two-proportion z-test to compute conversion rates, lift, a Z-score, a p-value, and a confidence interval from your visitor and conversion counts.",
            },
            {
              q: "How is statistical significance calculated in an A/B test?",
              a: "The calculator computes a pooled conversion rate across both variants, derives a standard error from that pooled rate, and divides the observed difference in conversion rates by the standard error to get a Z-score. That Z-score is converted to a p-value, and if the p-value is below your significance threshold, the result is statistically significant.",
            },
            {
              q: "What is a good p-value for an A/B test?",
              a: "The most common threshold is p < 0.05, corresponding to 95% confidence, meaning there's less than a 5% chance the observed difference happened purely by chance. Some teams use a stricter p < 0.01 threshold for high-stakes decisions.",
            },
            {
              q: "What is the difference between a one-tailed and two-tailed test?",
              a: "A two-tailed test checks whether Variant B is either better or worse than Variant A, and is the standard, more conservative choice. A one-tailed test only checks whether B is better (or only worse) than A in one specific direction, which requires less evidence to reach significance for that direction.",
            },
            {
              q: "What does 'lift' mean in A/B testing?",
              a: "Lift is the relative percentage change in conversion rate between the two variants, calculated as (CRb − CRa) ÷ CRa × 100. A lift of +19% means Variant B's conversion rate is 19% higher than Variant A's, relatively speaking.",
            },
            {
              q: "Why did my test show 'not statistically significant'?",
              a: "This usually means either the true difference between variants is small or nonexistent, or your sample size is too small to detect the difference reliably. Use a sample size calculator before running your next test to determine how many visitors you need.",
            },
            {
              q: "Can I use this calculator for more than website conversion rates?",
              a: "Yes. The two-proportion z-test works for any comparison of two binary outcome rates between independent groups — email open rates, app install rates, sign-up rates, or click-through rates all qualify.",
            },
            {
              q: "What does the confidence interval of the difference tell me?",
              a: "It shows the range of values the true difference in conversion rates is likely to fall within, at your chosen confidence level. If the interval does not include zero, that supports a statistically significant difference between variants.",
            },
            {
              q: "How large does my sample size need to be for reliable results?",
              a: "It depends on your baseline conversion rate and the minimum lift you want to detect — smaller expected effects require larger samples. Use a dedicated sample size calculator before launching your test to plan an appropriate visitor count per variant.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your visitor and conversion numbers are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "📈", title: "Marketers & Growth Teams", desc: "Validate landing page, ad creative, and email subject line tests before scaling them." },
            { icon: "🛒", title: "eCommerce Businesses", desc: "Test checkout flows, product pages, and pricing changes with statistical confidence." },
            { icon: "🖥️", title: "Product Managers & UX Researchers", desc: "Confirm whether a new feature or flow actually improves conversion or engagement." },
            { icon: "💻", title: "Developers & Engineers", desc: "Verify experiment results before removing feature flags or shipping permanent changes." },
            { icon: "📊", title: "Data Analysts", desc: "Double-check experimentation platform results or analyze tests run outside a dedicated tool." },
            { icon: "🚀", title: "Startups & Advertisers", desc: "Make fast, evidence-based decisions on ad copy, creative, and conversion funnel changes." },
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

export default function PageSpeedScoreCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Page Speed Score Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>page speed score calculator</strong> is a free browser-based tool that estimates a website&apos;s overall performance score from manually entered Core Web Vitals — Largest Contentful Paint (LCP), Interaction to Next Paint (INP), Cumulative Layout Shift (CLS), First Contentful Paint (FCP), Total Blocking Time (TBT), and Speed Index. Instead of crawling a live URL, it applies a weighted formula inspired by Google Lighthouse&apos;s scoring methodology to numbers you already have from Lighthouse, Chrome DevTools, PageSpeed Insights, WebPageTest, or GTmetrix.
          </p>
          <p>
            This is deliberately <em>not</em> a PageSpeed Insights API clone — there is no backend, no crawling, and no API key required. Everything runs instantly inside your browser, which makes it useful when you already have raw metrics from a report and want a quick score estimate, a second opinion, or a way to explore how changing one metric would shift the overall result.
          </p>
          <p>
            Built for <strong>web developers, front-end engineers, SEO specialists, performance engineers, digital marketers, website owners, and students learning Core Web Vitals</strong>, this tool provides an instant weighted score, a letter grade, a per-metric breakdown, and tailored optimization recommendations — all processed locally with no data ever leaving your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Page Speed Score Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Enter your six Core Web Vitals measurements. Each metric is scored 0-100 against Google&apos;s published good/poor thresholds, then combined using Lighthouse-inspired weights to produce a single estimated score.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Metric Weights &amp; Thresholds</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>LCP 30% — good ≤ 2.5s, poor &gt; 4.0s</p>
              <p>INP 25% — good ≤ 200ms, poor &gt; 500ms</p>
              <p>TBT 20% — good ≤ 200ms, poor &gt; 600ms</p>
              <p>CLS 15% — good ≤ 0.1, poor &gt; 0.25</p>
              <p>FCP 5% — good ≤ 1.8s, poor &gt; 3.0s</p>
              <p>Speed Index 5% — good ≤ 3.4s, poor &gt; 5.8s</p>
            </div>
          </div>
          <p>
            Final Score = (LCP score × 0.30) + (INP score × 0.25) + (TBT score × 0.20) + (CLS score × 0.15) + (FCP score × 0.05) + (Speed Index score × 0.05), rounded and clamped between 0 and 100.
          </p>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Page Speed Score Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Gather Your Core Web Vitals", "Measure LCP, INP, CLS, FCP, TBT, and Speed Index using Lighthouse, Chrome DevTools, PageSpeed Insights, WebPageTest, or GTmetrix."],
                ["Enter Each Metric", "Type each measured value into its field — seconds for LCP/FCP/Speed Index, milliseconds for INP/TBT, and a unitless decimal for CLS."],
                ["Read the Live Score", "The estimated performance score, letter grade, and status update instantly on an animated circular gauge as you type."],
                ["Review the Metric Breakdown", "Check the per-metric breakdown to see which Core Web Vitals are pulling your score down and by how much."],
                ["Apply the Recommendations", "Follow the tailored optimization tips generated for any metric outside Google's recommended thresholds, then export or print the report."],
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
                "6 Core Web Vitals metrics with Lighthouse-inspired weighting",
                "Real-time calculation with a 150ms debounced update",
                "Animated circular score gauge with color-coded status",
                "4-tier performance rating (Excellent, Good, Needs Improvement, Poor)",
                "Letter grade summary (A, B, C, F)",
                "Per-metric score breakdown with progress bars",
                "Automatic, metric-specific optimization recommendations",
                "3 example presets plus a random test-data generator",
                "Shareable calculation URL using query parameters",
                "Export report as CSV, JSON, or TXT",
                "Print-ready report and full-text copy",
                "Calculation history — save and reload past results",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcut — Esc to reset",
                "Inline validation with clear, friendly error messages",
                "No signup required — 100% free to use",
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
              title: "Interpreting a Lighthouse Report Offline",
              scenario: "A developer runs Lighthouse locally, gets LCP 2.1s, CLS 0.02, INP 140ms, FCP 1.2s, TBT 80ms, and SI 2.8s, and pastes them into the calculator to get an instant 96/100 Excellent score with a clear breakdown of which metric contributed most.",
            },
            {
              title: "Prioritizing Optimization Work",
              scenario: "A front-end engineer with LCP 3.8s, INP 320ms, and TBT 420ms sees a 68/100 Needs Improvement score and uses the weighted breakdown to confirm LCP and TBT deserve the most attention before smaller fixes.",
            },
            {
              title: "Explaining Performance to a Non-Technical Stakeholder",
              scenario: "An SEO specialist exports a print-ready PDF report showing the score, grade, and plain-language recommendations to share with a client who doesn't read raw Core Web Vitals numbers.",
            },
            {
              title: "Comparing Before-and-After Metrics",
              scenario: "A performance engineer saves a baseline calculation to history, ships a set of optimizations, re-measures, and reloads the saved entry to compare the old and new scores side by side.",
            },
            {
              title: "Teaching Core Web Vitals in a Classroom",
              scenario: "A student learning web performance uses the random example generator to explore how changing individual metrics like CLS or INP shifts the final weighted score and grade.",
            },
            {
              title: "Quick Sanity Check Without Running a Full Audit",
              scenario: "A marketer with metrics already pulled from a GTmetrix report gets a fast score estimate without waiting for a fresh PageSpeed Insights crawl or dealing with API rate limits.",
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
                "Prioritize LCP, INP, and TBT first — they carry 75% of the total weight, so improving them moves the overall score the most.",
                "Measure on a throttled mobile profile when possible, since Core Web Vitals thresholds are calibrated for real-world mid-tier mobile conditions, not a fast desktop connection.",
                "Re-measure after every meaningful deploy and save each result to history so you can track whether optimizations are actually working over time.",
                "Treat CLS fixes as cheap wins — reserving space for images and ads is often a one-line CSS change that can meaningfully improve the score.",
                "Use the random example generator to build intuition for how the weighted formula responds to different metric combinations before auditing a real site.",
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
                "Don't treat this estimate as identical to Google PageSpeed Insights — it uses a simplified linear model, not Lighthouse's proprietary log-normal scoring curve.",
                "Don't mix lab data (Lighthouse) with field data (Chrome UX Report) in the same calculation — they measure different conditions and shouldn't be blended.",
                "Don't optimize FCP or Speed Index at the expense of LCP or INP — they carry far less weight and won't move the overall score much on their own.",
                "Don't ignore a single poor metric just because the overall score looks fine — a very low CLS or INP score can still be a real usability problem worth fixing.",
                "Don't forget mobile and desktop scores differ significantly — always label which device profile your entered metrics came from.",
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
          Core Web Vitals Threshold Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Metric</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Weight</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Good</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Poor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Largest Contentful Paint (LCP)", "30%", "≤ 2.5s", "> 4.0s"],
                ["Interaction to Next Paint (INP)", "25%", "≤ 200ms", "> 500ms"],
                ["Total Blocking Time (TBT)", "20%", "≤ 200ms", "> 600ms"],
                ["Cumulative Layout Shift (CLS)", "15%", "≤ 0.1", "> 0.25"],
                ["First Contentful Paint (FCP)", "5%", "≤ 1.8s", "> 3.0s"],
                ["Speed Index (SI)", "5%", "≤ 3.4s", "> 5.8s"],
              ].map(([metric, weight, good, poor]) => (
                <tr key={metric} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{metric}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{weight}</td>
                  <td className="py-2.5 px-4 font-mono text-green-700">{good}</td>
                  <td className="py-2.5 px-4 font-mono text-red-600">{poor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Thresholds are based on Google&apos;s publicly documented Core Web Vitals guidance. Actual PageSpeed Insights scoring uses a proprietary log-normal distribution that this calculator approximates linearly.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a Page Speed Score Calculator?",
              a: "A Page Speed Score Calculator is a free browser-based tool that estimates a website's overall performance score from manually entered Core Web Vitals — LCP, INP, CLS, FCP, TBT, and Speed Index — using a weighted formula inspired by Google Lighthouse's scoring methodology.",
            },
            {
              q: "How is the performance score calculated?",
              a: "Each metric is scored 0-100 based on how it compares to Google's recommended good/poor thresholds, then combined using weighted percentages: LCP 30%, INP 25%, TBT 20%, CLS 15%, FCP 5%, and Speed Index 5%.",
            },
            {
              q: "What is a good performance score?",
              a: "A score of 90-100 is rated Excellent, 70-89 is Good, 50-69 is Needs Improvement, and below 50 is Poor.",
            },
            {
              q: "Why doesn't this match Google PageSpeed Insights exactly?",
              a: "This calculator uses a simplified linear approximation of Lighthouse's scoring curve since it has no access to Lighthouse's proprietary log-normal distribution data. It's designed to give a close, directionally accurate estimate, not an exact replica.",
            },
            {
              q: "What is LCP (Largest Contentful Paint)?",
              a: "LCP measures how long it takes for the largest visible element on the page to finish rendering. 2.5 seconds or less is good; above 4 seconds is poor.",
            },
            {
              q: "What is INP (Interaction to Next Paint)?",
              a: "INP measures how responsive a page is to user interactions like clicks and taps. 200ms or less is good; above 500ms is poor.",
            },
            {
              q: "What is CLS (Cumulative Layout Shift)?",
              a: "CLS measures how much visible content unexpectedly shifts during page load. A score of 0.1 or less is good; above 0.25 is poor.",
            },
            {
              q: "Where do I get my LCP, INP, CLS, and other metric values?",
              a: "You can measure these in Chrome DevTools, Google PageSpeed Insights, WebPageTest, or GTmetrix — all free tools that report each Core Web Vital.",
            },
            {
              q: "Does a good score guarantee good SEO rankings?",
              a: "No. Page speed is one of many ranking factors Google considers. A strong score improves user experience but content quality, relevance, and backlinks remain far more influential.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. The metric values you enter are never transmitted to any server, stored in any database, or accessible to anyone other than you.",
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
            { icon: "💻", title: "Web Developers", desc: "Quickly estimate the score impact of a metric improvement before shipping a performance fix." },
            { icon: "🎯", title: "Performance Engineers", desc: "Break down exactly which Core Web Vital is dragging the overall score down and by how much." },
            { icon: "📈", title: "SEO Specialists", desc: "Explain Core Web Vitals scores to clients in plain language with exportable, print-ready reports." },
            { icon: "📣", title: "Digital Marketers", desc: "Get a fast performance snapshot without waiting on a live PageSpeed Insights crawl." },
            { icon: "🏢", title: "Website Owners", desc: "Understand whether a site's load times are likely helping or hurting search visibility." },
            { icon: "🎓", title: "Students & Educators", desc: "Learn how Core Web Vitals combine into a single score using a transparent, weighted formula." },
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

export default function EmailOpenRateCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is an Email Open Rate Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            An <strong>email open rate calculator</strong> is a free browser-based tool that measures what percentage of your delivered emails were opened by recipients. It answers a fundamental email marketing question: <em>how many of the people I emailed actually saw my subject line and opened the message?</em>
          </p>
          <p>
            Open rate is one of the first metrics marketers check after sending a campaign, since it reflects the combined strength of your subject line, sender reputation, send timing, and list quality — before a recipient ever clicks through to your content. This calculator divides unique opens by delivered emails, rates the result against standard industry benchmarks from Poor to Outstanding, and visualizes performance with a gauge and progress bar.
          </p>
          <p>
            This tool is built for <strong>email marketers, digital marketing agencies, SaaS companies, ecommerce businesses, newsletter creators, marketing students, small business owners, and content creators</strong> who need a fast, accurate read on campaign performance. It supports adjustable decimal precision, calculation history, scenario comparison, and export as CSV, JSON, or a print-ready report — entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Email Open Rate Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Enter the number of emails successfully delivered and the number of unique recipients who opened the email. The calculator divides opens by delivered emails, multiplies by 100, and instantly returns your open rate percentage along with a performance rating.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Open Rate (%) = (Unique Opens ÷ Delivered Emails) × 100</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Delivered Emails", "The number of emails that successfully reached a recipient's inbox — excluding hard bounces — used as the denominator of the formula."],
              ["Unique Opens", "The number of distinct recipients who opened the email at least once, not the total open count including repeat opens."],
              ["Performance Rating", "Every result is compared against standard email marketing benchmarks, from Poor through Outstanding, so you know immediately how a campaign performed."],
              ["Decimal Precision", "Adjust from 0 to 4 decimal places depending on how precise you need the reported percentage to be."],
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
          How to Use the Email Open Rate Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Try an Example (Optional)", "Click Example Campaign 1, 2, or 3 to instantly load realistic sample figures."],
                ["Enter Delivered Emails", "Type the number of emails successfully delivered for the campaign."],
                ["Enter Unique Opens", "Type the number of unique recipients who opened the email. Results update instantly with a 150ms debounce."],
                ["Adjust Decimal Precision", "Choose how many decimal places to display, from 0 to 4."],
                ["Review Your Open Rate and Rating", "Check the gauge, progress bar, and performance rating (Poor through Outstanding) against standard benchmarks."],
                ["Compare, Export, or Share", "Use Compare as A/B to evaluate two campaigns side by side, export as CSV or JSON, print a formatted report, or copy a shareable URL."],
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
                "Instant open rate calculation with a 150ms debounce",
                "Interactive circular gauge with color-coded performance rating",
                "6-tier industry benchmark comparison (Poor to Outstanding)",
                "Adjustable decimal precision (0–4 places)",
                "Compare-as-A/B campaign comparison mode",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON with full breakdown",
                "Print-ready formatted report",
                "Copy full report to clipboard in one click",
                "Calculation history — save and reload up to 20 past campaigns",
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
              title: "Newsletter Performance Check",
              scenario: "A newsletter creator sends a campaign to 1,000 delivered subscribers and sees 420 unique opens. The calculator returns a 42% open rate, landing in the Excellent tier — confirming the subject line and send time worked well for this audience.",
            },
            {
              title: "Large List Benchmark Review",
              scenario: "An ecommerce brand delivers a promotional email to 5,000 subscribers and gets 850 unique opens. The calculator returns a 17% open rate, placing the campaign in the Average tier and prompting a review of subject line testing before the next send.",
            },
            {
              title: "Small List Segment Test",
              scenario: "An agency tests a re-engagement email on a small segment of 250 delivered contacts, generating 60 unique opens — a 24% open rate in the Good tier, validating the segment before rolling the campaign out to the full list.",
            },
            {
              title: "A/B Subject Line Comparison",
              scenario: "A marketer uses Compare as A/B to test two subject lines: Campaign A delivers 1,000 emails with 320 opens (32%), while Campaign B delivers 1,000 emails with 410 opens (41%) — a clear signal to standardize on Campaign B's subject line style going forward.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Best Practices ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Pro Tips</h3>
            <ul className="space-y-3 text-gray-600 leading-relaxed">
              {[
                "Track open rate over time for the same list rather than comparing a single campaign against an industry average — your own historical baseline is usually more meaningful.",
                "Clean your list regularly by removing hard bounces and long-term non-openers — a bloated, unengaged list drags down open rate even when your content is strong.",
                "Test subject lines with A/B splits on a small portion of your list before sending to the full audience.",
                "Remember that privacy features like Apple Mail Privacy Protection can inflate open rates by triggering automatic opens, so treat open rate as a directional signal rather than a perfectly precise number on lists with heavy Apple Mail usage.",
                "Pair open rate with click rate — a high open rate with a low click rate often points to a subject line that overpromises relative to the email content.",
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
                "Don't compare open rate across wildly different list sizes without context — smaller, more engaged lists often post higher open rates than large, mixed-quality lists.",
                "Don't treat open rate as a perfect engagement measure on its own — privacy-protecting email clients can pre-fetch and mark messages as opened without a human ever reading them.",
                "Don't ignore delivered emails versus emails sent — bounced emails should be excluded from the denominator, or your open rate will appear artificially lower than it really is.",
                "Don't send at the same time to your entire list without testing — send-time optimization can meaningfully shift open rate for the same content and subject line.",
                "Don't chase open rate alone at the expense of click rate and conversions — a high open rate with poor downstream performance still isn't a successful campaign.",
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

      {/* ── Benchmark Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Email Open Rate Benchmark Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Open Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">What It Means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Below 10%", "Poor", "Well below industry averages — review list quality and subject lines."],
                ["10% – 15%", "Below Average", "Below typical benchmarks; small improvements can help."],
                ["15% – 20%", "Average", "In line with typical industry benchmarks."],
                ["20% – 30%", "Good", "Performing above the typical industry average."],
                ["30% – 50%", "Excellent", "Significantly above industry averages."],
                ["Above 50%", "Outstanding", "Rare, highly engaged and well-targeted list performance."],
              ].map(([range, rating, meaning]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{range}</td>
                  <td className="py-2.5 px-4 text-gray-700">{rating}</td>
                  <td className="py-2.5 px-4 text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Benchmarks vary by industry, list size, and email type — use them as general guidelines rather than strict targets.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is email open rate?",
              a: "Email open rate is the percentage of delivered emails that were opened by unique recipients, calculated as (Unique Opens ÷ Delivered Emails) × 100.",
            },
            {
              q: "How do I calculate email open rate?",
              a: "Divide the number of unique opens by the number of delivered emails, then multiply by 100. For example, 420 unique opens out of 1,000 delivered emails gives a 42% open rate.",
            },
            {
              q: "What is a good email open rate?",
              a: "A 15–20% open rate is generally considered average across industries, while 20–30% is good and above 30% is excellent. Actual benchmarks vary significantly by industry, list size, and email type.",
            },
            {
              q: "What's the difference between delivered emails and emails sent?",
              a: "Emails sent includes every message your system attempted to deliver, while delivered emails excludes hard bounces that never reached an inbox. Open rate should always be calculated against delivered emails, not sent emails, for an accurate percentage.",
            },
            {
              q: "Why might my open rate seem artificially high?",
              a: "Privacy-protecting email clients, such as Apple Mail Privacy Protection, can automatically pre-fetch and mark messages as opened without a recipient actually reading them, which can inflate reported open rates on lists with heavy usage of those clients.",
            },
            {
              q: "Can unique opens exceed delivered emails?",
              a: "No. Unique opens counts each recipient once, so it can never exceed the number of delivered emails. If your data shows this, double-check whether you're using total opens (including repeat opens) instead of unique opens.",
            },
            {
              q: "How does open rate relate to click rate?",
              a: "Open rate measures how many recipients opened your email, while click rate measures how many clicked a link inside it. A high open rate with a low click rate often signals a subject line that doesn't match the email's actual content.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your campaign figures are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 7 ? "border-b border-gray-100 pb-6" : ""}>
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
            { icon: "📧", title: "Email Marketers", desc: "Measure campaign performance immediately after send and benchmark it against industry standards." },
            { icon: "🏢", title: "Digital Marketing Agencies", desc: "Report open rate performance to clients with clear, benchmark-backed ratings for every campaign." },
            { icon: "🛒", title: "Ecommerce Businesses", desc: "Track how promotional and transactional emails perform to optimize send timing and subject lines." },
            { icon: "📰", title: "Newsletter Creators", desc: "Understand subscriber engagement trends across issues to keep content and cadence on track." },
            { icon: "🏪", title: "Small Business Owners", desc: "Get a quick, accurate read on campaign performance without needing a full analytics platform." },
            { icon: "🎓", title: "Marketing Students", desc: "Learn how open rate is calculated and how it fits into the broader email marketing funnel." },
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

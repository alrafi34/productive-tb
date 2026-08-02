export default function UserGrowthRateCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a User Growth Rate Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>user growth rate calculator</strong> is a free browser-based tool that measures how quickly a user base has grown (or shrunk) between two points in time. It answers a core analytics question: <em>what percentage did my user base change by, and is that pace of growth healthy?</em>
          </p>
          <p>
            Growth rate is one of the first metrics investors, founders, and growth teams look at when evaluating a product's trajectory, since a single percentage instantly communicates momentum. This calculator divides the net change in users by the starting user count, rates the result against standard growth benchmarks from Declining to Excellent, converts the rate to an annualized equivalent based on your selected time period, and projects future user counts on an interactive chart.
          </p>
          <p>
            This tool is built for <strong>SaaS founders, startup teams, product managers, marketing teams, growth analysts, mobile app developers, investors, and students learning analytics</strong>. It supports adjustable decimal precision, calculation history, scenario comparison, and export as CSV, JSON, or a print-ready report — entirely in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the User Growth Rate Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Enter your starting and ending user counts, and the calculator divides the difference by the starting count to return your growth rate as a percentage. Select the time period your numbers represent to see the equivalent annualized growth rate, and use the projection chart to see where your user base is headed if the current rate continues.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formula</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Growth Rate (%) = ((Ending Users − Starting Users) ÷ Starting Users) × 100</p>
              <p>Annualized Growth Rate = (1 + Growth Rate)^Periods Per Year − 1</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Net Growth", "The raw change in users (Ending − Starting), shown alongside the percentage so you can see both the relative and absolute scale of the change."],
              ["Time Period", "Choose Daily, Weekly, Monthly, Quarterly, Yearly, or Custom to match the period your two user counts were measured over — this determines how the rate is annualized."],
              ["Annualized Growth Rate", "Compounds your period-over-period rate across a full year, which can look dramatically different from the raw rate — a modest-looking monthly rate can compound into a very large annual figure."],
              ["Growth Status", "Every result is compared against standard growth benchmarks, from Declining through Excellent Growth, so you know immediately how your trajectory looks."],
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
          How to Use the User Growth Rate Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Try an Example (Optional)", "Click SaaS Startup, Scaling SaaS, or Declining App to instantly load realistic sample figures."],
                ["Enter Starting and Ending Users", "Type your starting and ending user counts for the period you're measuring. Results update instantly with a 150ms debounce."],
                ["Select Your Time Period", "Choose Daily, Weekly, Monthly, Quarterly, Yearly, or Custom to match your data."],
                ["Adjust Optional Settings", "Expand Optional Settings to change decimal precision or the number of periods projected on the growth chart."],
                ["Review Your Growth Rate and Status", "Check the gauge, net growth, and growth status rating (Declining through Excellent Growth) against standard benchmarks."],
                ["Review the Growth Meter and Projection", "See the horizontal growth meter and the projection chart showing where your user base is headed at the current rate."],
                ["Compare, Export, or Share", "Use Compare as A/B to evaluate two growth scenarios side by side, export as CSV or JSON, print a formatted report, or copy a shareable URL."],
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
                "Instant growth rate calculation with a 150ms debounce",
                "Interactive bidirectional gauge with color-coded growth status",
                "6-tier growth benchmark (Declining to Excellent Growth)",
                "Automatic annualized growth rate conversion by time period",
                "Horizontal growth meter with a 0% baseline marker",
                "Interactive user growth projection chart",
                "Adjustable decimal precision (0–4 places)",
                "Compare-as-A/B scenario comparison mode",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON with full breakdown",
                "Print-ready formatted report",
                "Copy full report to clipboard in one click",
                "Calculation history — save and reload up to 20 past results",
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
              title: "Early-Stage SaaS Monthly Check-In",
              scenario: "A SaaS founder starts the month with 1,000 users and ends with 1,250. The calculator returns a 25% growth rate — Strong Growth — and an eye-catching annualized rate of over 1,300% if that monthly pace were sustained for a full year, a useful (if aggressive) figure for investor conversations.",
            },
            {
              title: "Scaling SaaS at the Same Percentage",
              scenario: "A larger SaaS company grows from 50,000 to 62,500 users in a month — the same 25% growth rate as a much smaller startup, but representing 12,500 net new users instead of 250. The calculator's Net Growth output highlights this absolute-scale difference alongside the matching percentage.",
            },
            {
              title: "Diagnosing a Declining App",
              scenario: "A mobile app drops from 8,000 to 7,200 monthly active users, a -10% growth rate landing in the Declining tier. The negative Net Growth of -800 users prompts the team to investigate retention and churn before increasing acquisition spend.",
            },
            {
              title: "Comparing Growth Across Two Channels",
              scenario: "A marketing team uses Compare as A/B to evaluate two acquisition channels: Channel A grew users from 2,000 to 2,300 (15%), while Channel B grew from 2,000 to 2,600 (30%) — clear evidence to shift budget toward Channel B's approach.",
            },
            {
              title: "Understanding Compounding Monthly Growth",
              scenario: "A growth analyst sees a modest 5% monthly growth rate and initially assumes it's unremarkable. Switching the time period to Monthly reveals an annualized growth rate of nearly 80% — reframing a seemingly slow month-over-month number as a meaningful annual trajectory.",
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
                "Always report growth rate alongside net growth — a 25% growth rate means very different things for a startup with 1,000 users versus an established product with 1 million users.",
                "Be cautious annualizing a single strong period — a 25% monthly growth rate compounding to over 1,300% annually is mathematically correct but rarely sustainable for a full year in practice.",
                "Track growth rate over multiple consecutive periods rather than judging performance from a single snapshot — one exceptional or poor period can be noise rather than a trend.",
                "Pair growth rate with churn or retention data — strong user growth alongside high churn can mask an underlying retention problem that acquisition alone won't fix.",
                "Use a consistent time period when comparing growth rates across teams, channels, or time — comparing a weekly rate to a monthly rate without converting first will produce misleading comparisons.",
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
                "Don't confuse growth rate with net growth — a small company can post a much higher percentage growth rate than a large one while adding far fewer absolute users.",
                "Don't project a short-term growth rate indefinitely into the future — the compounding projection chart assumes a constant rate, which rarely holds true over long timeframes as markets saturate.",
                "Don't ignore negative growth rates when reporting only positive highlights — a declining period is important context for understanding overall trajectory.",
                "Don't compare growth rates measured over different time periods without converting to a common basis first, such as annualizing both.",
                "Don't treat 0% growth as identical to slightly negative growth when communicating results — flagging \"no change\" distinctly from \"declining\" gives a clearer signal to stakeholders.",
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
          Growth Rate Benchmark Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Growth Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">What It Means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Below 0%", "Declining", "User base is shrinking — retention should become the immediate priority."],
                ["0%", "No Change", "No net change detected in the user base over this period."],
                ["0% – 5%", "Slow Growth", "Growing, but at a modest pace relative to typical benchmarks."],
                ["5% – 20%", "Healthy Growth", "A solid, sustainable pace of user acquisition."],
                ["20% – 50%", "Strong Growth", "Well above average — a strong signal of product-market pull."],
                ["Above 50%", "Excellent Growth", "Exceptional user acquisition, often seen during breakout periods."],
              ].map(([range, status, meaning]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{range}</td>
                  <td className="py-2.5 px-4 text-gray-700">{status}</td>
                  <td className="py-2.5 px-4 text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Benchmarks are general guidelines and vary by industry, company stage, and product category.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is user growth rate?",
              a: "User growth rate is the percentage change in your user base between two points in time, calculated as ((Ending Users − Starting Users) ÷ Starting Users) × 100.",
            },
            {
              q: "How do I calculate user growth rate?",
              a: "Subtract your starting users from your ending users, divide by starting users, then multiply by 100. For example, growing from 1,000 to 1,250 users gives a growth rate of ((1,250 − 1,000) ÷ 1,000) × 100 = 25%.",
            },
            {
              q: "What is a good user growth rate?",
              a: "A 5–20% growth rate per period is generally considered healthy, while 20–50% is strong and above 50% is excellent. What counts as \"good\" varies significantly by company stage, industry, and the time period being measured.",
            },
            {
              q: "How is annualized growth rate calculated?",
              a: "Annualized Growth Rate = (1 + Growth Rate)^Periods Per Year − 1, where Periods Per Year depends on your selected time period (12 for monthly, 52 for weekly, 365 for daily, 4 for quarterly). This compounds a period-over-period rate to show its equivalent over a full year.",
            },
            {
              q: "Why is my annualized growth rate so much higher than my monthly rate?",
              a: "Compounding causes even modest period-over-period rates to grow dramatically over a full year. A 5% monthly growth rate compounds to nearly 80% annually, not simply 60% (5% × 12), because each period's growth builds on the previous period's larger total.",
            },
            {
              q: "What's the difference between growth rate and net growth?",
              a: "Growth rate is a relative percentage, while net growth is the absolute change in users (Ending − Starting). Two companies can have the same growth rate percentage while adding vastly different numbers of actual users, depending on their starting size.",
            },
            {
              q: "Can growth rate be negative?",
              a: "Yes. A negative growth rate means the user base shrank over the period — ending users were lower than starting users. This calculator flags negative results as \"Declining\" status.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your user counts and growth data are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
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
            { icon: "🚀", title: "SaaS Founders & Startup Teams", desc: "Track user growth as a core health metric and communicate momentum clearly to teams and investors." },
            { icon: "📊", title: "Product Managers & Growth Analysts", desc: "Measure the impact of product changes and campaigns on user acquisition over time." },
            { icon: "📣", title: "Marketing Teams", desc: "Compare growth rates across channels and campaigns to guide budget allocation decisions." },
            { icon: "📱", title: "Mobile App Developers", desc: "Track install and active user growth across releases and marketing pushes." },
            { icon: "💰", title: "Investors", desc: "Evaluate a company's growth trajectory and sanity-check annualized projections during due diligence." },
            { icon: "🎓", title: "Students Learning Analytics", desc: "Learn how growth rate, net change, and annualization formulas fit together in real business contexts." },
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

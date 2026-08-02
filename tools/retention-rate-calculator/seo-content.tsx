export default function RetentionRateCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Retention Rate Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>retention rate calculator</strong> is a free browser-based tool that instantly measures the percentage of customers, employees, users, subscribers, or members who remained over a chosen period, using the industry-standard retention formula. It answers a question every SaaS founder, HR leader, and community manager needs a straight number for: <em>of the people we started with, how many did we actually keep?</em>
          </p>
          <p>
            Retention is one of the most important — and most frequently miscalculated — metrics in business. A common mistake is dividing the ending count directly by the starting count, which inflates the result by counting brand-new acquisitions as if they were retained members of the original group. This calculator applies the correct formula automatically: it first isolates retained users by subtracting new acquisitions from the ending count, then divides by the starting count.
          </p>
          <p>
            This tool is built for <strong>SaaS companies, startup founders, product managers, marketing teams, HR departments, community managers, mobile app developers, business analysts, students, and researchers</strong> who need an instant, accurate retention figure without building a spreadsheet. It supports five metric types (customers, employees, users, subscribers, members), six period options with compounded annual projection, and exports results as CSV, JSON, a print-ready report, or a native share sheet — all processed locally in your browser.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Retention Rate Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Enter how many people (or employees, or subscribers) you started the period with, how many you ended with, and how many were newly acquired during that same period. The calculator isolates true retention and derives every related metric instantly.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Retained = Ending − New</p>
              <p>Retention Rate (%) = (Retained ÷ Starting) × 100</p>
              <p>Churn Rate (%) = 100 − Retention Rate</p>
              <p>Compounded Annual Retention = Retention Rate ^ (Periods per Year)</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Retained Count", "How many people from your original starting cohort were still present at the end of the period — the true measure of what you kept."],
              ["Retention Rate", "Retained count expressed as a percentage of your starting count, the headline metric used in board reports and dashboards."],
              ["Churn Rate", "The inverse of retention — the percentage of your starting cohort that was lost during the period."],
              ["Compounded Annual Retention", "What a short-period retention rate (daily, weekly, monthly, or quarterly) would compound to over a full year if it held steady, illustrating the long-term impact of small retention gaps."],
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
          How to Use the Retention Rate Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose What You're Measuring", "Select Customers, Employees, Users, Subscribers, or Members, and choose the period that matches your reporting cycle."],
                ["Enter Starting, Ending, and New Counts", "Type the count at the start of the period, the count at the end, and how many new entries were acquired during that same window."],
                ["Read the Live Retention Rate", "The retention rate, retained count, lost count, churn rate, and performance rating update instantly on an animated circular gauge."],
                ["Review the Formula Breakdown", "Check exactly how your numbers produced the result, plus a compounded annual projection for periods shorter than a year."],
                ["Export, Share, or Save", "Copy the result or full report, download as CSV or JSON, print a report, share via your device's native share sheet, or save to local history."],
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
                "5 metric types — customers, employees, users, subscribers, members",
                "6 period options with automatic compounded annual projection",
                "Real-time calculation with a 150ms debounced update",
                "Animated circular retention gauge with color-coded status",
                "5-tier performance rating (Excellent to Needs Improvement)",
                "Automatic retained vs. lost count breakdown",
                "Formula and calculation breakdown shown for every result",
                "3 quick example presets across different metric types",
                "Native Web Share API sharing with clipboard fallback",
                "Shareable calculation URL using query parameters",
                "Export report as CSV or JSON with timestamp",
                "Print-ready PDF report and full-text copy",
                "Calculation history — save and reload past results",
                "Auto-saves your last session and restores it on return",
                "Keyboard shortcuts — Enter to jump to results, Esc to reset",
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
              title: "Monthly SaaS Customer Retention Reporting",
              scenario: "A SaaS founder starts the month with 500 customers, ends with 450, and acquired 50 new ones. The calculator returns 400 retained, a 80% retention rate rated Very Good, and a compounded annual projection of roughly 9.2% if that monthly rate held steady — a stark reminder of why even 80% monthly retention is concerning for a subscription business.",
            },
            {
              title: "Annual Employee Retention for HR Reporting",
              scenario: "An HR manager selects Employees and Yearly period, entering 120 starting employees, 118 at year-end, and 8 new hires. The calculator returns a 91.67% retention rate rated Excellent, giving HR a clean, board-ready figure for the annual people report.",
            },
            {
              title: "Community Membership Health Check",
              scenario: "A community manager tracks 2,000 starting members, 1,850 at period end, and 150 new signups, receiving an 85% retention rate rated Very Good — confirming the community's engagement strategy is working before investing further in growth campaigns.",
            },
            {
              title: "Comparing Retention Across Multiple Cohorts",
              scenario: "A product manager runs three monthly cohorts through the calculator — 92%, 78%, and 65% retention respectively — and uses the automatic performance ratings (Excellent, Good, Average) to quickly identify which cohort's onboarding experience needs the most urgent attention.",
            },
            {
              title: "Estimating Long-Term Impact of a Weekly Retention Rate",
              scenario: "A mobile app developer measures 88% weekly user retention and uses the compounded annual projection to see this translates to under 1% of the original cohort remaining after a full year — a wake-up call that reframes weekly retention improvements as urgent rather than optional.",
            },
            {
              title: "Sharing Results with a Remote Team",
              scenario: "A marketing analyst calculates subscriber retention on a mobile device and taps Share Result, which opens their phone's native share sheet to send the calculation link directly to a Slack channel or email without manually copying numbers.",
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
                "Always exclude new acquisitions from your retention calculation — mixing them in inflates the number and hides a genuine retention problem behind strong new growth.",
                "Use the compounded annual projection whenever you're evaluating a short-period retention rate — a monthly rate that looks fine in isolation can compound to a dramatically weaker annual figure.",
                "Match your period selection to your natural business cycle — SaaS products typically report monthly, while HR teams typically report annually, since that matches how decisions actually get made.",
                "Track the same cohort consistently over time rather than recalculating against a shifting starting base each period, so retention trends are genuinely comparable month over month.",
                "Pair retention rate with churn rate in the same report — stakeholders often find the loss framing (churn) more immediately actionable than the retention framing, even though they're mathematically equivalent.",
                "Save every calculation to history when tracking retention across multiple product lines or customer segments, so you can quickly reload and compare past figures instead of retyping them.",
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
                "Don't calculate retention as simply Ending ÷ Starting — this ignores new acquisitions entirely and produces a misleadingly high number for any growing business.",
                "Don't compare retention rates measured over different period lengths without converting them — a 90% monthly rate and a 90% annual rate represent vastly different underlying performance.",
                "Don't treat a single retention snapshot as the full picture — retention often varies significantly by acquisition channel, price tier, or signup cohort, and averaging masks those differences.",
                "Don't ignore a retention rate above 100% as a rounding quirk — it almost always signals a data entry or cohort-definition error that should be investigated before reporting the number externally.",
                "Don't forget that industry benchmarks vary enormously — comparing a B2B enterprise SaaS product's annual retention against a consumer mobile app's weekly retention will produce meaningless conclusions.",
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

      {/* ── Benchmark Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Retention Benchmark Reference Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Metric Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical Period</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Strong Benchmark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["SaaS Customer Retention", "Monthly", "≥ 95%"],
                ["Consumer Subscription Retention", "Monthly", "85% – 92%"],
                ["Mobile App User Retention", "Weekly (Day 30)", "20% – 40%"],
                ["Employee Retention", "Yearly", "85% – 90%"],
                ["Community / Membership Retention", "Monthly or Quarterly", "80% – 90%"],
              ].map(([type, period, benchmark]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary text-xs">{type}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{period}</td>
                  <td className="py-2.5 px-4 font-mono text-green-700">{benchmark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">* Benchmarks are illustrative reference points compiled from commonly cited industry ranges. Actual competitive benchmarks vary by industry, price point, and product maturity.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a retention rate calculator?",
              a: "A retention rate calculator is a free browser-based tool that measures the percentage of customers, employees, users, subscribers, or members who remain over a given period, using the industry-standard formula: Retention Rate (%) = ((Ending − New) ÷ Starting) × 100.",
            },
            {
              q: "How is retention rate calculated?",
              a: "Retention rate is calculated by first finding retained users (Ending count minus New count acquired during the period), then dividing by the Starting count and multiplying by 100. For example, starting with 500 customers, ending with 450, and acquiring 50 new ones gives 400 retained, and (400 ÷ 500) × 100 = 80% retention.",
            },
            {
              q: "What is a good retention rate?",
              a: "A retention rate of 90% or above is rated Excellent, 80-89% is Very Good, 70-79% is Good, 60-69% is Average, and below 60% is rated Needs Improvement. What counts as competitive varies significantly by industry and period length.",
            },
            {
              q: "What is the difference between retention rate and churn rate?",
              a: "Retention rate measures the percentage of your starting cohort that remained by the end of the period. Churn rate measures the percentage that did not — the two always add up to 100%. An 80% retention rate is equivalent to a 20% churn rate for the same period.",
            },
            {
              q: "Why does the formula subtract new users before dividing?",
              a: "Subtracting new users isolates how many people from your original starting cohort actually stuck around, rather than mixing in new acquisitions that weren't part of the group being measured. Without this, strong new-customer acquisition could mask a serious retention problem.",
            },
            {
              q: "What does the compounded annual retention figure mean?",
              a: "For Monthly, Weekly, Quarterly, or Daily retention rates, the calculator projects what that rate would compound to over a full year if it stayed constant, using Rate raised to the power of periods per year. A 90% monthly retention rate compounds to roughly 28% after 12 months.",
            },
            {
              q: "Can retention rate exceed 100%?",
              a: "In a correctly measured cohort, retention rate should not exceed 100%. If it does, the calculator shows a warning — this usually means New Users were undercounted, or the Ending count includes people who weren't part of the original Starting cohort.",
            },
            {
              q: "How is employee retention different from customer retention?",
              a: "The underlying formula is identical, but employee retention is typically measured over a full year using headcount at the start and end of the year plus new hires, while customer or subscriber retention is often measured monthly or quarterly due to faster-moving subscription cycles.",
            },
            {
              q: "How do I calculate retention for a custom time period?",
              a: "Select Custom from the Period dropdown to use the exact same formula without a specific period label attached — useful for irregular reporting windows like a 45-day trial period or a fiscal quarter that doesn't align with a calendar quarter.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your starting, ending, and new user counts are never transmitted to any server, stored in any database, or accessible to anyone other than you. Calculation history is stored only in your browser's local storage.",
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
            { icon: "💻", title: "SaaS Companies & Startups", desc: "Track monthly customer retention as a core health metric and forecast the long-term impact using compounded annual projections." },
            { icon: "👥", title: "HR Departments", desc: "Calculate annual employee retention rates for board reporting and benchmark against industry turnover standards." },
            { icon: "📈", title: "Product Managers", desc: "Compare retention across cohorts, features, or onboarding flows to prioritize which experience needs the most improvement." },
            { icon: "🌐", title: "Community & Membership Managers", desc: "Measure how well a community or membership program keeps its existing base engaged period over period." },
            { icon: "📱", title: "Mobile App Developers", desc: "Track weekly or monthly user retention and understand how small rate differences compound dramatically over a year." },
            { icon: "🎓", title: "Students & Researchers", desc: "Learn the correct retention formula and practice applying it to different metric types and reporting periods." },
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

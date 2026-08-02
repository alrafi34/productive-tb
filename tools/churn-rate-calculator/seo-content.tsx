export default function ChurnRateCalculatorSEO() {
  return (
    <>
      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Churn Rate Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>churn rate calculator</strong> is a free browser-based tool that measures how many customers — or how much revenue — a business loses over a given period. It answers the question every subscription-based business needs to track: <em>what percentage of my customers or revenue am I losing, and is that number healthy or a warning sign?</em>
          </p>
          <p>
            Churn is one of the most important metrics for SaaS companies, subscription services, and any business built on recurring revenue, because even a small monthly churn rate compounds into a large annual customer loss. This calculator supports five calculation modes — Customer Churn Rate, Revenue Churn Rate, Monthly Churn, Quarterly Churn, and Annual Churn — and automatically converts between monthly, quarterly, and annual equivalents so you can compare churn on the same basis regardless of how your data is reported.
          </p>
          <p>
            This tool is built for <strong>SaaS companies, startup founders, marketing teams, customer success teams, sales teams, business analysts, investors, agencies, students, and business consultants</strong> who need to measure customer retention and identify customer loss. It includes retention benchmarking, a customer lifetime value (LTV) estimate, LTV:CAC ratio, scenario comparison, and export as CSV, JSON, or a print-ready report — entirely in your browser, with no signup required.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How the Churn Rate Calculator Works
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Choose the calculation mode that matches your data, enter your starting customers (or revenue) and how many you lost, and the calculator instantly returns your churn rate, retention rate, and a performance rating against industry benchmarks. Monthly, quarterly, and annual modes also show the equivalent rate on the other timeframe, so a monthly churn figure can be compared directly against an annual target.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-2">
            <p className="text-sm font-medium text-gray-500">Core Formulas</p>
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p>Customer Churn Rate (%) = (Lost Customers ÷ Starting Customers) × 100</p>
              <p>Retention Rate (%) = 100 − Churn Rate</p>
              <p>Revenue Churn (%) = (Lost Revenue ÷ Starting Revenue) × 100</p>
              <p>Net Revenue Churn (%) = ((Lost Revenue − Expansion Revenue) ÷ Starting Revenue) × 100</p>
              <p>Annualized Churn = 1 − (1 − Monthly Churn)¹²</p>
              <p>Customer Lifetime (months) = 1 ÷ Monthly Churn Rate</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            {[
              ["Customer Churn Rate mode", "Use this when you know your starting and lost customer counts for any period and just need the raw churn percentage."],
              ["Revenue Churn Rate mode", "Use this when you track Monthly Recurring Revenue (MRR) and want to measure churn in dollars rather than headcount — including Net Revenue Churn, which credits back expansion revenue from upsells."],
              ["Monthly / Quarterly / Annual Churn modes", "Use these when your churn is measured over a specific, known period — each mode automatically shows the equivalent annualized or monthly rate for easy comparison."],
              ["Health Score & Performance Rating", "Every result is scored against standard SaaS retention benchmarks (Excellent, Healthy, Average, High, Critical) so you know immediately whether your churn is a strength or a risk."],
              ["LTV & LTV:CAC Ratio", "When you provide ARPU and CAC, the calculator estimates customer lifetime value from your churn rate and compares it to acquisition cost — a core SaaS unit-economics check."],
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
          How to Use the Churn Rate Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {[
                ["Choose a Calculation Mode", "Select Customer Churn Rate, Revenue Churn Rate, Monthly Churn, Quarterly Churn, or Annual Churn depending on how your data is measured."],
                ["Try an Example (Optional)", "Click a preset like SaaS Startup or Revenue Churn (MRR) to instantly load realistic sample figures."],
                ["Enter Starting and Lost Figures", "Type your starting customers or revenue and how many were lost during the period. Results update instantly with a 150ms debounce."],
                ["Add Optional Inputs", "Expand Optional Inputs to add new customers acquired, expansion revenue, ARPU, CAC, or an average customer lifetime override."],
                ["Review Your Churn Rate and Rating", "Check the churn gauge, retention rate, health score, and performance rating (Excellent through Critical) against standard benchmarks."],
                ["Check the Visualizations", "Review the retained-vs-lost pie chart and the 12-month decay projection to see how current churn compounds over time."],
                ["Compare, Export, or Share", "Use Compare as A/B to evaluate two churn scenarios side by side, export as CSV or JSON, print a formatted report, or copy a shareable URL."],
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
                "5 calculation modes: Customer, Revenue, Monthly, Quarterly, Annual Churn",
                "Net Revenue Churn with expansion revenue credit",
                "Automatic monthly ↔ quarterly ↔ annual rate conversion",
                "Interactive churn gauge with color-coded performance rating",
                "Retained vs lost pie chart and 12-month decay projection chart",
                "Health score and benchmark comparison (Excellent to Critical)",
                "Customer Lifetime Value (LTV) and LTV:CAC ratio estimation",
                "16 supported currencies for revenue-based modes",
                "Real-time results with 150ms debounced updates",
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
              title: "SaaS Startup Monthly Retention Check",
              scenario: "A SaaS founder starts the month with 1,000 customers and loses 80. Using Customer Churn Rate mode, the calculator returns an 8% churn rate — landing in the Average tier — prompting the team to review onboarding before the next growth push.",
            },
            {
              title: "Subscription Box Warning Sign",
              scenario: "A subscription box company starts with 250 customers and loses 50 in a single period. The calculator returns a 20% churn rate, placing the business in the Critical tier and triggering an immediate review of product-market fit and customer support quality.",
            },
            {
              title: "Enterprise SaaS Quarterly Review",
              scenario: "An enterprise SaaS team starts a quarter with 5,000 customers and loses 650. The calculator returns a 13% churn rate — just above the High threshold and into Critical — signaling that retention, not acquisition, should be the top investment priority for the coming quarter.",
            },
            {
              title: "Revenue Churn With Expansion Credit",
              scenario: "A SaaS company starts the month at $100,000 MRR, loses $8,000 to cancellations, but gains $2,000 in expansion revenue from upsells. Revenue Churn mode shows 8% gross revenue churn, while Net Revenue Churn (crediting the expansion revenue) drops to 6% — a more accurate picture of the business's true revenue trajectory.",
            },
            {
              title: "Converting Monthly Churn to an Annual Figure",
              scenario: "A team reports 4% monthly churn to its board. Using Monthly Churn mode, the calculator shows the annualized equivalent is 38.7% — dramatically higher than the raw monthly number — reframing the urgency of a retention initiative for leadership.",
            },
            {
              title: "Estimating LTV and LTV:CAC Ratio",
              scenario: "A team with $80 ARPU and 4% monthly churn enters a $400 CAC in Optional Inputs. The calculator estimates a 25-month customer lifetime, a $2,000 LTV, and a 5:1 LTV:CAC ratio — a healthy ratio that supports increasing acquisition spend.",
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
                "Always compare churn on the same timeframe — a 4% monthly churn rate and a 10% annual churn rate look similar at a glance but represent very different retention health once annualized.",
                "Track Net Revenue Churn alongside gross Revenue Churn — a business with strong expansion revenue from upsells can have negative net churn even while losing customers, which is a very healthy sign for SaaS businesses.",
                "Segment churn by cohort, plan tier, or acquisition channel whenever possible — a blended churn rate can hide a serious problem in one segment that's masked by strong retention in another.",
                "Use the LTV:CAC ratio as a sanity check before scaling acquisition spend — a ratio below 3:1 usually means unit economics need improvement before growth spend increases.",
                "Recalculate churn every period rather than relying on a single snapshot — a trend across several months tells you far more than any single period's number.",
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
                "Don't compare a monthly churn rate directly to an annual benchmark without converting it first — 4% monthly churn compounds to nearly 39% annual churn, not 48%.",
                "Don't ignore revenue churn in favor of customer churn alone — losing a few large accounts can hurt revenue far more than losing many small ones, even with a low customer churn percentage.",
                "Don't treat a single good or bad month as a trend — short-term churn can be noisy, especially for smaller customer bases where a handful of cancellations swings the percentage significantly.",
                "Don't calculate customer lifetime value using an annual churn rate in a monthly LTV formula — mixing timeframes will produce a wildly inflated or deflated lifetime estimate.",
                "Don't ignore expansion revenue when reporting revenue churn to stakeholders — reporting only gross churn without net churn can make a healthy business look worse than it is.",
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

      {/* ── Formula / Benchmark Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Churn Rate Benchmark Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Churn Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">What It Means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["0–3%", "Excellent", "Outstanding retention — well below industry average."],
                ["3–5%", "Healthy", "Strong retention with minor room for improvement."],
                ["5–8%", "Average", "In line with typical benchmarks; monitor closely."],
                ["8–12%", "High", "Elevated churn — review retention strategy soon."],
                ["12%+", "Critical", "Retention should become the top business priority."],
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
        <p className="text-xs text-gray-400 mt-4">* Benchmarks are general guidelines for subscription businesses and may vary by industry, price point, and customer segment.</p>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is churn rate and why does it matter?",
              a: "Churn rate is the percentage of customers (or revenue) a business loses over a given period. It matters because it directly offsets new customer acquisition — a business growing quickly but churning heavily can end up with flat or declining net growth despite strong sales.",
            },
            {
              q: "How do I calculate customer churn rate?",
              a: "Divide the number of customers lost during a period by the number of customers you started the period with, then multiply by 100: Churn Rate = (Lost Customers ÷ Starting Customers) × 100. For example, losing 80 of 1,000 starting customers gives an 8% churn rate.",
            },
            {
              q: "What is the difference between customer churn and revenue churn?",
              a: "Customer churn measures the percentage of customers lost, treating every customer equally. Revenue churn measures the percentage of recurring revenue lost, which better reflects the business impact when larger accounts churn at different rates than smaller ones.",
            },
            {
              q: "What is Net Revenue Churn?",
              a: "Net Revenue Churn subtracts expansion revenue (from upsells or upgrades among existing customers) from lost revenue before dividing by starting revenue: ((Lost Revenue − Expansion Revenue) ÷ Starting Revenue) × 100. A business can even have negative net revenue churn if expansion revenue exceeds losses.",
            },
            {
              q: "How do I convert monthly churn to annual churn?",
              a: "You can't simply multiply by 12 — compounding matters. Annualized Churn = 1 − (1 − Monthly Churn)¹². For example, 4% monthly churn compounds to approximately 38.7% annual churn, not 48%.",
            },
            {
              q: "What is a good churn rate for a SaaS company?",
              a: "A monthly churn rate under 3–5% is generally considered healthy for small-to-mid-market SaaS, while enterprise SaaS with longer contracts often targets under 1% monthly. This calculator's benchmark table applies these general thresholds to rate your result from Excellent to Critical.",
            },
            {
              q: "How is Customer Lifetime Value (LTV) related to churn?",
              a: "Average customer lifetime in months is approximately the inverse of your monthly churn rate (1 ÷ Monthly Churn Rate). Multiplying that lifetime by your Average Revenue Per User (ARPU) gives an estimated LTV — a lower churn rate directly increases how much a customer is worth over their relationship with your business.",
            },
            {
              q: "What is a healthy LTV:CAC ratio?",
              a: "A ratio of 3:1 or higher is a commonly cited healthy benchmark, meaning a customer generates at least three times what it costs to acquire them. Ratios below 3:1 often signal that churn is too high, acquisition cost is too high, or both.",
            },
            {
              q: "Can this calculator handle quarterly or annual churn reporting?",
              a: "Yes. Quarterly Churn mode and Annual Churn mode use the same core formula but automatically show the annualized or monthly-equivalent rate, so you can compare churn reported on different timeframes on a consistent basis.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All calculations run entirely in your browser using JavaScript. Your customer counts, revenue figures, and business data are never transmitted to any server, stored in any database, or accessible to anyone other than you. The calculation history feature saves results only to your browser's local storage, which you can clear at any time.",
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
            { icon: "🚀", title: "SaaS Companies & Startup Founders", desc: "Track monthly and annual churn as a core growth metric, and know exactly when retention needs to become the top priority." },
            { icon: "📣", title: "Marketing & Customer Success Teams", desc: "Measure the impact of onboarding, engagement, and support initiatives on customer retention over time." },
            { icon: "💼", title: "Sales Teams & Business Analysts", desc: "Understand how churn offsets new bookings and model realistic net growth for forecasting and reporting." },
            { icon: "💰", title: "Investors", desc: "Evaluate a company's retention health and unit economics — including LTV:CAC ratio — as part of due diligence." },
            { icon: "🏢", title: "Agencies & Consultants", desc: "Benchmark a client's churn against industry standards and present clear, formula-backed retention recommendations." },
            { icon: "🎓", title: "Students & Business Consultants", desc: "Learn how customer churn, revenue churn, and lifetime value formulas relate to real subscription business economics." },
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

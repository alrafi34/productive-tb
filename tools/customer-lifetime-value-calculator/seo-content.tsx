export default function CLVCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2
          className="text-2xl font-semibold text-gray-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          How to Use the CLV Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3
              className="text-lg font-medium text-gray-800 mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                [
                  "Choose a Calculation Method",
                  "Select Basic, Margin-Adjusted, Subscription, or SaaS depending on your business model.",
                ],
                [
                  "Enter Your Numbers",
                  "Fill in the relevant fields — Average Order Value, Purchase Frequency, Lifespan, or ARPU and Churn Rate.",
                ],
                [
                  "Add Optional Inputs",
                  "Enter Gross Margin and Customer Acquisition Cost (CAC) for a more complete financial picture.",
                ],
                [
                  "Read the Results",
                  "CLV updates in real time. Review the breakdown, formula used, and business interpretation.",
                ],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                    {i + 1}
                  </span>
                  <span>
                    <strong>{title}:</strong> {desc}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3
              className="text-lg font-medium text-gray-800 mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Four CLV formulas — Basic, Margin-Adjusted, Subscription, SaaS",
                "Real-time calculation as you type",
                "Performance assessment badge",
                "Net CLV after deducting CAC",
                "CAC payback period in months",
                "Annual and monthly value breakdowns",
                "Multiple currency support (12 currencies)",
                "Copy result or full report to clipboard",
                "Export TXT and CSV reports",
                "Shareable URL with pre-filled values",
                "Calculation history saved locally",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2
          className="text-2xl font-semibold text-gray-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          CLV Formulas &amp; Examples
        </h2>
        <div className="space-y-5">
          {[
            {
              name: "Basic CLV",
              formula: "CLV = Average Order Value × Purchase Frequency × Customer Lifespan",
              example: "$80 × 10 × 4 years = $3,200",
              when: "Best for ecommerce and retail businesses with consistent purchase patterns.",
            },
            {
              name: "Margin-Adjusted CLV",
              formula: "CLV = AOV × Frequency × Lifespan × Gross Margin",
              example: "$80 × 10 × 4 × 75% = $2,400",
              when: "Use when you want to reflect the actual profit contribution, not just gross revenue.",
            },
            {
              name: "Subscription CLV",
              formula: "CLV = Monthly Revenue × Lifetime (months) × Gross Margin",
              example: "$50/mo × 36 months × 80% = $1,440",
              when: "Ideal for subscription boxes, SaaS with fixed pricing, or membership services.",
            },
            {
              name: "SaaS / Predictive CLV",
              formula: "CLV = (ARPU × Gross Margin) ÷ Monthly Churn Rate",
              example: "($ 80 × 80%) ÷ 4% = $1,600",
              when: "Most accurate for SaaS and subscription businesses with measurable churn rates.",
            },
          ].map(({ name, formula, example, when }) => (
            <div
              key={name}
              className="bg-gray-50 border border-gray-100 rounded-lg p-5"
            >
              <h3
                className="font-semibold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {name}
              </h3>
              <p className="font-mono text-sm text-gray-800 bg-white border border-gray-200 rounded px-3 py-2 mb-2">
                {formula}
              </p>
              <p className="text-sm text-primary font-semibold font-mono mb-1">
                Example: {example}
              </p>
              <p className="text-xs text-gray-500">{when}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2
          className="text-2xl font-semibold text-gray-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          CLV Benchmarks by Industry
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Industry</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical CLV Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Key Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["SaaS (B2B)",       "$3,000 – $25,000+", "Low churn + high ARPU"],
                ["SaaS (B2C)",       "$200 – $1,500",     "High volume, lower ARPU"],
                ["Ecommerce (General)", "$150 – $500",    "Repeat purchase frequency"],
                ["Fashion / Apparel","$100 – $400",       "Seasonal repeat purchases"],
                ["Subscription Box", "$200 – $800",       "Monthly retention rate"],
                ["Financial Services","$1,000 – $5,000",  "Long relationships, high value"],
                ["Healthcare",       "$1,500 – $8,000",   "Long-term patient relationships"],
                ["Restaurants / QSR","$500 – $2,000",     "Visit frequency over years"],
              ].map(([industry, range, driver]) => (
                <tr key={industry} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{industry}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{range}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Benchmarks are approximate. Actual CLV varies by pricing model, retention strategy, and market conditions.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2
          className="text-2xl font-semibold text-gray-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is Customer Lifetime Value (CLV)?",
              a: "CLV is the total revenue a business can expect from a single customer account throughout their entire relationship. It helps businesses decide how much to spend acquiring customers and how much to invest in retention. A high CLV means each customer is very profitable over time.",
            },
            {
              q: "What is the difference between CLV and LTV?",
              a: "CLV (Customer Lifetime Value) and LTV (Lifetime Value) are used interchangeably in most contexts. Both refer to the total predicted revenue from a customer over the duration of their relationship with a business. Some companies distinguish them by using CLV for existing customers and LTV for projected future customers, but the underlying formula is the same.",
            },
            {
              q: "What is the ideal CLV:CAC ratio?",
              a: "A CLV:CAC ratio of 3:1 or higher is generally considered healthy. This means for every dollar spent acquiring a customer, you earn three dollars in lifetime value. A ratio below 1:1 means you are losing money on every customer. SaaS companies often target 3:1 to 5:1 as an acceptable range.",
            },
            {
              q: "How does churn rate affect CLV in SaaS?",
              a: "Churn rate is the single most powerful lever in SaaS CLV. Because the SaaS formula divides by churn rate, even small reductions have a dramatic effect. Reducing churn from 5% to 4% does not just improve CLV by 1% — it increases it by 25%. This is why SaaS companies invest heavily in customer success.",
            },
            {
              q: "What is gross margin-adjusted CLV?",
              a: "Gross margin-adjusted CLV multiplies revenue-based CLV by your gross margin percentage to reveal the actual profit contribution of a customer, not just revenue. For example, if CLV is $4,000 but gross margin is 60%, the adjusted CLV is $2,400 — the real value after subtracting the cost of goods or service delivery.",
            },
            {
              q: "How can I increase CLV?",
              a: "The main levers are: increasing Average Order Value (through upsells and bundles), increasing purchase frequency (through email, loyalty programs, and re-engagement), extending customer lifespan (through better onboarding, support, and retention programs), and improving gross margin (through pricing optimization and cost reduction).",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3
                className="font-semibold text-gray-800 mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {q}
              </h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2
          className="text-2xl font-semibold text-gray-900 mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🚀", title: "SaaS Founders",       desc: "Model customer economics at different price points and churn rates to understand unit economics before scaling." },
            { icon: "🛍️", title: "Ecommerce Stores",    desc: "Calculate CLV per product category or acquisition channel to inform ad spend and loyalty program investment." },
            { icon: "📊", title: "Business Analysts",   desc: "Build financial models and customer segmentation reports using accurate lifetime value calculations." },
            { icon: "🏢", title: "Marketing Agencies",  desc: "Demonstrate client ROI by showing how CLV compares to CPA, justifying larger acquisition budgets." },
            { icon: "💼", title: "Sales Managers",       desc: "Prioritize high-CLV customer segments and build retention strategies around the most valuable accounts." },
            { icon: "🎓", title: "Marketing Students",  desc: "Learn marketing analytics fundamentals by practicing CLV calculations with real-world business examples." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                {title}
              </h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

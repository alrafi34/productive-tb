export default function RevenueGrowthCalculatorSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Revenue Growth Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Enter Previous Revenue", "Type the revenue from the earlier period — last month, last quarter, or last year."],
                ["Enter Current Revenue", "Type the revenue from the current or most recent period you want to compare."],
                ["Select Currency", "Choose your preferred currency for display. No conversion is applied."],
                ["Read the Results", "Growth rate, difference, status, and business interpretation update instantly as you type."],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                    {i + 1}
                  </span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Real-time growth calculation as you type",
                "Positive / negative color-coded result",
                "Performance badge with contextual interpretation",
                "Swap values to reverse the comparison",
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Revenue Growth Formula &amp; Examples
        </h2>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 mb-6">
          <p className="text-sm font-medium text-gray-500 mb-1">Formula</p>
          <p className="font-mono text-lg text-gray-900 font-semibold">
            Growth Rate (%) = ((Current Revenue − Previous Revenue) ÷ Previous Revenue) × 100
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Previous Revenue</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Current Revenue</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Growth Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$10,000",  "$12,500",  "+25.00%",  "Strong Growth"],
                ["$50,000",  "$75,000",  "+50.00%",  "Excellent Growth"],
                ["€8,500",   "€7,650",   "−10.00%",  "Revenue Decline"],
                ["£100,000", "£102,000", "+2.00%",   "Slow Growth"],
                ["$200,000", "$240,000", "+20.00%",  "Strong Growth"],
                ["$30,000",  "$30,000",  "0.00%",    "No Change"],
              ].map(([prev, curr, rate, status]) => (
                <tr key={prev + curr} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono">{prev}</td>
                  <td className="py-2.5 px-4 font-mono">{curr}</td>
                  <td className={`py-2.5 px-4 font-semibold font-mono ${rate.startsWith("+") ? "text-green-600" : rate.startsWith("−") ? "text-red-500" : "text-gray-600"}`}>{rate}</td>
                  <td className="py-2.5 px-4">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Revenue Growth Benchmarks by Business Type
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Business Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Strong Growth</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Average Growth</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Early-Stage Startup",    "100%+/yr",   "50–100%/yr",  "High growth expected; investors look for 3× ARR"],
                ["SaaS (Growth Stage)",    "40–80%/yr",  "20–40%/yr",   "Rule of 40: growth% + profit% ≥ 40 is healthy"],
                ["Ecommerce",             "20–40%/yr",  "10–20%/yr",   "Seasonality and CAC significantly affect trajectory"],
                ["SMB / Retail",          "10–20%/yr",  "5–10%/yr",    "Steady, sustainable growth is the primary goal"],
                ["Enterprise / Fortune 500", "5–15%/yr","2–5%/yr",     "Large base makes double-digit growth exceptional"],
                ["Agency / Services",     "20–40%/yr",  "10–20%/yr",   "Referral, upsell, and retainer mix drives this"],
              ].map(([type, strong, avg, note]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{type}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{strong}</td>
                  <td className="py-2.5 px-4 font-mono">{avg}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Benchmarks are approximate. Growth rates vary by industry, market conditions, and business maturity.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is revenue growth rate?",
              a: "Revenue growth rate is the percentage change in a company's revenue between two periods — typically month-over-month, quarter-over-quarter, or year-over-year. It is one of the most important KPIs for measuring business performance, attracting investors, and benchmarking against competitors.",
            },
            {
              q: "How is revenue growth calculated?",
              a: "Revenue growth is calculated using the formula: ((Current Revenue − Previous Revenue) ÷ Previous Revenue) × 100. For example, if previous revenue was $10,000 and current revenue is $12,500, growth = ((12,500 − 10,000) ÷ 10,000) × 100 = 25%.",
            },
            {
              q: "What is a good revenue growth rate?",
              a: "A good revenue growth rate depends on your business stage and industry. Early-stage startups often target 10–20% monthly growth. SaaS companies use the 'Rule of 40' — growth rate plus profit margin should exceed 40%. For established SMBs, 10–20% annual growth is generally considered healthy.",
            },
            {
              q: "What is the difference between revenue growth and profit growth?",
              a: "Revenue growth measures the increase in total sales or income before expenses. Profit growth measures the increase in what remains after all costs are deducted. A business can have strong revenue growth but declining profit growth if costs are rising faster. Both metrics are important but serve different purposes.",
            },
            {
              q: "Why is tracking revenue growth important?",
              a: "Revenue growth tracking helps businesses identify trends, validate strategies, allocate resources effectively, and make data-driven decisions. Investors, banks, and acquirers use growth rates to assess valuation and risk. Consistent tracking also helps identify seasonality patterns and the impact of marketing campaigns.",
            },
            {
              q: "What causes revenue to decline?",
              a: "Revenue decline can result from increased competition, customer churn, pricing changes, product issues, reduced marketing spend, economic downturns, or seasonal factors. Identifying the root cause quickly is critical — compare revenue by channel, product, or customer segment to pinpoint the source.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "📊", title: "Financial Analysts",  desc: "Track period-over-period revenue performance, prepare board reports, and benchmark against industry growth rates." },
            { icon: "🚀", title: "Startup Founders",    desc: "Monitor monthly and annual ARR growth to meet investor milestones and validate product-market fit." },
            { icon: "🏢", title: "Marketing Teams",     desc: "Measure the revenue impact of campaigns and channels by comparing revenue before and after key initiatives." },
            { icon: "💼", title: "Sales Managers",      desc: "Compare quarterly or annual sales figures to set realistic targets and evaluate team performance." },
            { icon: "📈", title: "Investors",           desc: "Quickly evaluate portfolio company growth rates to make informed decisions about follow-on investments." },
            { icon: "🎓", title: "Students",            desc: "Practice financial analysis and business performance calculations using real-world examples and formulas." },
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

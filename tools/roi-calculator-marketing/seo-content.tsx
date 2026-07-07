export default function ROICalculatorMarketingSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the ROI Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Quick Start Guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Enter Investment", "Type the total amount you spent on the campaign, ad, or project — including ad spend, tools, and labour costs."],
                ["Enter Revenue", "Type the total revenue or return generated directly from that investment."],
                ["Select Currency", "Choose your preferred currency from the dropdown for formatted output."],
                ["View ROI Instantly", "Your ROI, profit, and performance badge update in real time as you type."],
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
                "Real-time ROI calculation as you type",
                "Profit/Loss/Break-Even status indicator",
                "Color-coded performance badge",
                "Contextual interpretation of your result",
                "Multiple currency support (USD, EUR, GBP, and more)",
                "Copy result or full report to clipboard",
                "Download as TXT or CSV",
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
          ROI Formula & Examples
        </h2>
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 mb-6">
          <p className="text-sm font-medium text-gray-500 mb-1">Formula</p>
          <p className="font-mono text-lg text-gray-900 font-semibold">ROI (%) = ((Revenue − Investment) ÷ Investment) × 100</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Investment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Revenue</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Profit</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ROI</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$1,000", "$1,500", "$500", "+50%", "Profitable"],
                ["$10,000", "$8,000", "-$2,000", "-20%", "Loss"],
                ["$5,000", "$12,500", "$7,500", "+150%", "Excellent"],
                ["$2,000", "$2,000", "$0", "0%", "Break-Even"],
                ["$500", "$2,500", "$2,000", "+400%", "Exceptional"],
                ["$20,000", "$26,000", "$6,000", "+30%", "Good"],
              ].map(([inv, rev, profit, roi, status]) => (
                <tr key={inv + rev} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono">{inv}</td>
                  <td className="py-2.5 px-4 font-mono">{rev}</td>
                  <td className={`py-2.5 px-4 font-mono font-semibold ${profit.startsWith("-") ? "text-red-600" : profit === "$0" ? "text-gray-500" : "text-green-600"}`}>{profit}</td>
                  <td className={`py-2.5 px-4 font-mono font-semibold text-primary`}>{roi}</td>
                  <td className="py-2.5 px-4">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Marketing ROI Benchmarks by Channel
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Channel</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Typical ROI</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Email Marketing", "3,600%+", "Widely cited as highest ROI channel (~$36 return per $1 spent)"],
                ["SEO (Organic Search)", "200–400%", "Long-term compounding returns; high upfront investment"],
                ["Google Ads (PPC)", "100–200%", "Average 2:1 return; highly dependent on industry and targeting"],
                ["Social Media Ads", "50–200%", "Varies significantly by platform, audience, and creative quality"],
                ["Content Marketing", "300–600%", "Lower short-term ROI but compounds strongly over time"],
                ["Affiliate Marketing", "400–800%", "Very high ROI when managed well with quality affiliates"],
                ["Influencer Marketing", "100–600%", "Depends heavily on influencer niche, audience quality, and brand fit"],
              ].map(([channel, roi, note]) => (
                <tr key={channel} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{channel}</td>
                  <td className="py-2.5 px-4 font-mono text-primary font-semibold">{roi}</td>
                  <td className="py-2.5 px-4 text-gray-500 text-xs">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Benchmarks are approximate industry averages. Actual ROI varies by industry, execution quality, audience, and market conditions.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is ROI in marketing?",
              a: "Marketing ROI (Return on Investment) is the percentage of profit earned relative to the amount spent on a marketing campaign or activity. It tells you how much revenue you generated for every dollar invested. A positive ROI means the campaign was profitable; a negative ROI means it cost more than it returned.",
            },
            {
              q: "How is marketing ROI calculated?",
              a: "Marketing ROI is calculated using the formula: ROI (%) = ((Revenue − Investment) ÷ Investment) × 100. For example, if you spent $1,000 on a campaign and generated $1,500 in revenue, your profit is $500 and your ROI is (500 ÷ 1,000) × 100 = 50%.",
            },
            {
              q: "What is a good ROI for marketing?",
              a: "A common benchmark is that an ROI of 5:1 (500%) is considered strong, and 10:1 (1000%) is exceptional for most marketing channels. However, what's \"good\" depends on the channel, industry, and business model. An ROI of 20–50% may be excellent for some long-cycle B2B businesses, while ecommerce campaigns may target 200%+.",
            },
            {
              q: "What is the difference between ROI and ROAS?",
              a: "ROI (Return on Investment) measures profit relative to total investment cost, including all expenses. ROAS (Return on Ad Spend) measures revenue relative to ad spend only, without deducting other costs like production or labour. ROAS is often higher than ROI because it excludes overhead. ROI gives a more complete picture of profitability.",
            },
            {
              q: "Can ROI be negative?",
              a: "Yes. A negative ROI means the campaign spent more money than it generated in return, resulting in a net loss. For example, a $10,000 investment that only generates $8,000 in revenue has an ROI of -20%. Negative ROI is common in early-stage campaigns or during brand awareness phases where returns are deferred.",
            },
            {
              q: "What does break-even ROI mean?",
              a: "A break-even ROI of 0% means the revenue generated exactly equals the investment. No profit was made, but no loss was incurred. Break-even analysis is useful for understanding the minimum performance needed before a campaign becomes profitable.",
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
          Who Uses This ROI Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "📢", title: "Digital Marketers", desc: "Evaluate campaign performance across Google Ads, Meta, and other channels to justify budget allocation and prove ROI to stakeholders." },
            { icon: "🛍️", title: "Ecommerce Businesses", desc: "Measure return on ad spend for product promotions, influencer partnerships, and seasonal campaigns to optimize marketing budgets." },
            { icon: "🚀", title: "Startup Founders", desc: "Assess the financial efficiency of early marketing experiments and decide which growth channels to double down on." },
            { icon: "🏢", title: "Marketing Agencies", desc: "Generate clear ROI reports for clients to demonstrate campaign value, justify retainers, and support renewal conversations." },
            { icon: "📊", title: "Financial Analysts", desc: "Incorporate marketing ROI into broader business performance models and investment justification documents." },
            { icon: "🎓", title: "Marketing Students", desc: "Practice ROI calculations using real-world marketing scenarios to build fundamental analytical skills." },
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

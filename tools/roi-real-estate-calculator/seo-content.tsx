import React from "react";

export default function RoiRealEstateCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Real Estate ROI Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Real Estate ROI Calculator</strong> measures the total return on a property investment, combining rental cash flow and property appreciation into a single profitability metric. Unlike a simple rental yield calculator, it accounts for the full cost of acquisition — including down payment, closing costs, and renovation — and projects returns over a chosen investment horizon.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>cash-on-cash ROI</strong> measures annual cash flow as a percentage of your actual cash invested (down payment + closing costs + renovation). This is the most relevant metric for leveraged investments because it shows the return on your out-of-pocket capital, not the total property value.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The year-by-year projection table shows how property value, equity, cumulative cash flow, and total ROI evolve over your investment duration — giving you a complete picture of long-term wealth building through real estate.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the ROI Real Estate Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the purchase price, down payment, closing costs, and renovation",
                "Add mortgage rate and term for cash flow analysis",
                "Enter monthly rent and any other income",
                "Add monthly expenses: tax, insurance, maintenance, management, HOA",
                "Set vacancy rate and annual appreciation rate",
                "Choose your investment duration (1–30 years)",
                "View ROI, cash flow, projections, and investment rating",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Cash-on-cash ROI, gross yield, and net yield",
                "Monthly and annual cash flow calculation",
                "Property appreciation and future value projection",
                "Year-by-year equity and ROI table",
                "Break-even month estimation",
                "Investment rating: Excellent to Poor",
                "Full expense breakdown with mortgage integration",
              ].map((tip, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          ROI Calculation Formulas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Metric</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Total Investment",  "Down + Closing + Renovation",                    "$40k + $5k + $15k = $60k"],
                ["Monthly Cash Flow", "Income − Expenses − Mortgage",                   "$2,000 − $600 − $950 = +$450"],
                ["Cash-on-Cash ROI",  "(Annual CF ÷ Total Investment) × 100",           "($5,400 ÷ $60,000) × 100 = 9%"],
                ["Future Value",      "Price × (1 + Appreciation)^Years",               "$200k × 1.03^10 = $268,783"],
                ["Total ROI",         "(CF × Years + Appreciation) ÷ Investment × 100", "($54k + $68k) ÷ $60k = 203%"],
              ].map(([metric, formula, ex]) => (
                <tr key={metric} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-primary">{metric}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{formula}</td>
                  <td className="py-3 px-4 font-mono text-xs">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example ROI Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Property</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Investment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Monthly CF</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">CoC ROI</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$200k / $2k rent",  "$60k",  "+$450/mo",  "9.0%",  "Strong"],
                ["$350k / $3.2k rent","$95k",  "+$520/mo",  "6.6%",  "Average"],
                ["$500k / $4k rent",  "$120k", "+$380/mo",  "3.8%",  "Below Average"],
                ["$150k / $1.8k rent","$45k",  "+$680/mo",  "18.1%", "Excellent"],
              ].map(([prop, inv, cf, roi, rating]) => (
                <tr key={prop} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-medium">{prop}</td>
                  <td className="py-3 px-4 font-mono">{inv}</td>
                  <td className={`py-3 px-4 font-mono font-semibold ${cf.startsWith("+") ? "text-green-600" : "text-red-500"}`}>{cf}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{roi}</td>
                  <td className="py-3 px-4">{rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Based on 6.5% mortgage rate, 30-year term, 5% vacancy, 3% appreciation. Approximate values.</p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Real Estate Investors", desc: "Evaluate whether a property generates sufficient ROI before making a purchase decision." },
            { icon: "🌾", title: "Land Buyers",           desc: "Analyze rental income potential and long-term appreciation for land investments." },
            { icon: "🏘️", title: "Rental Property Owners",desc: "Assess current portfolio performance and identify underperforming properties." },
            { icon: "🔨", title: "House Flippers",        desc: "Calculate renovation ROI and compare flip vs hold strategies." },
            { icon: "📊", title: "Financial Analysts",    desc: "Model real estate investment scenarios for clients and portfolio analysis." },
            { icon: "🎓", title: "First-Time Investors",  desc: "Understand real estate ROI metrics before making a first investment property purchase." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-semibold text-blue-900 mb-2">{title}</h3>
              <p className="text-sm text-blue-800">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a good real estate ROI?",
              a: "A cash-on-cash ROI of 8–12% is generally considered strong for residential rental properties. Above 12% is excellent. Below 5% may indicate the property is overpriced relative to rental income, though appreciation potential may compensate in high-growth markets.",
            },
            {
              q: "What is the difference between cash-on-cash ROI and total ROI?",
              a: "Cash-on-cash ROI measures annual rental cash flow as a percentage of your invested capital (down payment + costs). Total ROI includes both cumulative cash flow and property appreciation over the investment period. Total ROI is more relevant for long-term hold strategies.",
            },
            {
              q: "Should I include mortgage payments in ROI calculations?",
              a: "Yes — mortgage payments are included in the monthly cash flow calculation. Cash-on-cash ROI is calculated after mortgage payments, giving you the true return on your out-of-pocket investment. This is why leveraged investments can show higher cash-on-cash ROI than all-cash purchases.",
            },
            {
              q: "How does appreciation affect ROI?",
              a: "Property appreciation adds to total return but is not guaranteed. A 3% annual appreciation rate on a $200,000 property adds $6,000 in value in year one, growing to $68,783 over 10 years. The total ROI calculation combines cash flow and appreciation to show the complete investment picture.",
            },
            {
              q: "What is break-even in real estate?",
              a: "Break-even is the number of months of positive cash flow needed to recover your total investment (down payment + closing costs + renovation). For example, if you invested $60,000 and generate $450/month in cash flow, break-even is approximately 133 months (11 years).",
            },
            {
              q: "How accurate are the projections?",
              a: "Projections are based on constant appreciation rate and cash flow assumptions. Real-world results vary due to market conditions, rent changes, unexpected repairs, and interest rate fluctuations. Use projections as planning estimates, not guarantees.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 5 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

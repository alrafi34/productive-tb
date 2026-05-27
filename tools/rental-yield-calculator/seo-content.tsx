import React from "react";

export default function RentalYieldCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Rental Yield Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Rental Yield Calculator</strong> measures the annual return on a rental property as a percentage of its purchase price. It is one of the most important metrics for property investors, helping them compare investment opportunities and assess whether a property generates sufficient income relative to its cost.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator computes both <strong>gross rental yield</strong> (based on rent alone) and <strong>net rental yield</strong> (after deducting property tax, insurance, maintenance, management fees, and HOA costs). It also applies a vacancy rate adjustment to account for periods when the property is unoccupied.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Optional mortgage inputs enable monthly cash flow analysis — showing whether the property generates positive or negative cash flow after all expenses and debt service. The cash-on-cash return metric shows the annual return relative to your actual cash invested (down payment).
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Rental Yield Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the property purchase price",
                "Enter the expected monthly rental income",
                "Adjust the vacancy rate slider (default 5%)",
                "Click Show on Annual Expenses to add costs",
                "Optionally enter mortgage details for cash flow analysis",
                "View gross yield, net yield, and monthly cash flow",
                "Check the rating badge and expense breakdown",
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
                "Gross and net rental yield calculation",
                "Vacancy rate adjustment slider (0–20%)",
                "Full expense breakdown with visual bars",
                "Monthly cash flow and annual profit",
                "Cash-on-cash return based on down payment",
                "Investment rating: Excellent to Poor",
                "Mortgage integration for complete analysis",
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
          Rental Yield Formulas
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
                ["Gross Yield",        "(Annual Rent ÷ Price) × 100",                    "($21,600 ÷ $200,000) × 100 = 10.8%"],
                ["Net Yield",          "((Annual Rent − Expenses) ÷ Price) × 100",       "($21,600 − $6,000) ÷ $300,000 = 5.2%"],
                ["Vacancy-Adj. Rent",  "Annual Rent × (1 − Vacancy Rate)",               "$24,000 × 0.95 = $22,800"],
                ["Monthly Cash Flow",  "Monthly Rent − Monthly Expenses − Mortgage",     "$1,800 − $500 − $760 = +$540"],
                ["Cash-on-Cash ROI",   "(Annual Cash Flow ÷ Down Payment) × 100",        "($6,480 ÷ $50,000) × 100 = 13%"],
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
          Rental Yield Benchmarks
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Net Yield</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["9%+",    "Excellent",     "Outstanding return — verify expenses and vacancy assumptions"],
                ["7–9%",   "Strong",        "Above-average return — good investment candidate"],
                ["5–7%",   "Average",       "Typical for most residential markets"],
                ["3–5%",   "Below Average", "Low return — consider appreciation potential"],
                ["< 3%",   "Poor",          "Negative or minimal cash flow — high risk"],
              ].map(([yield_, rating, interp]) => (
                <tr key={yield_} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{yield_}</td>
                  <td className="py-3 px-4 font-medium">{rating}</td>
                  <td className="py-3 px-4 text-gray-600">{interp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Property Investors",  desc: "Compare rental yields across multiple properties to identify the best investment." },
            { icon: "🏘️", title: "Landlords",           desc: "Assess whether current rent covers expenses and generates positive cash flow." },
            { icon: "💼", title: "Real Estate Buyers",  desc: "Evaluate rental income potential before purchasing an investment property." },
            { icon: "📊", title: "Financial Planners",  desc: "Model rental property returns for clients building passive income portfolios." },
            { icon: "🏦", title: "Mortgage Researchers",desc: "Analyze whether rental income covers mortgage payments and operating costs." },
            { icon: "🎓", title: "First-Time Investors",desc: "Understand rental yield metrics before making a first investment property purchase." },
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
              q: "What is a good rental yield?",
              a: "A good rental yield depends on the market and investment strategy. Generally, a net yield of 5–7% is considered average for residential properties. Yields above 7% are strong, and above 9% are excellent — though very high yields may indicate higher risk, lower-quality areas, or underestimated expenses.",
            },
            {
              q: "What is the difference between gross and net rental yield?",
              a: "Gross rental yield is calculated using rent alone, without deducting any expenses. Net rental yield subtracts all annual operating costs (property tax, insurance, maintenance, management fees, HOA) before dividing by the property price. Net yield is a more accurate measure of actual investment return.",
            },
            {
              q: "What is cash-on-cash return?",
              a: "Cash-on-cash return measures the annual cash flow as a percentage of the actual cash invested (your down payment). For example, if you put $50,000 down and generate $6,000 in annual cash flow, your cash-on-cash return is 12%. This metric is more relevant than yield for leveraged investments.",
            },
            {
              q: "How does vacancy rate affect rental yield?",
              a: "A 5% vacancy rate means the property is unoccupied for about 18 days per year. This reduces effective annual rent by 5%. For a property generating $24,000/year, a 5% vacancy reduces income to $22,800. Higher vacancy rates significantly reduce net yield and cash flow.",
            },
            {
              q: "Should I include mortgage payments in the yield calculation?",
              a: "Mortgage payments are a financing cost, not an operating expense. Rental yield is typically calculated before mortgage payments to allow comparison between properties regardless of financing. However, monthly cash flow (which includes mortgage) shows whether the property is self-funding.",
            },
            {
              q: "What expenses should I include in net yield?",
              a: "Include all recurring annual costs: property tax, homeowner's insurance, maintenance and repairs (typically 1–2% of property value per year), property management fees (typically 8–12% of rent), and HOA fees if applicable. Do not include mortgage principal or interest in the expense calculation for yield purposes.",
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

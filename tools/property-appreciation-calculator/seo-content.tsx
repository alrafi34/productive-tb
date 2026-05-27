import React from "react";

export default function PropertyAppreciationCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Property Appreciation Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Property Appreciation Calculator</strong> estimates how much a land or real estate
            asset may be worth in the future based on compound growth. By entering your property's current
            value, an annual appreciation rate, and the number of years you plan to hold it, you get an
            instant projection of future value, total gain, and growth percentage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator uses the standard compound growth formula — the same math behind compound
            interest — applied to real estate. You can also factor in additional annual investments,
            choose between yearly, quarterly, or monthly compounding, and compare results against
            inflation to see the real purchasing power of your future property value.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All calculations run entirely in your browser. No data is sent to any server, and your
            calculation history is stored only in your browser's local storage.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use This Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter your property's current purchase price",
                "Set the annual appreciation rate using the slider or input",
                "Choose the investment duration in years",
                "Optionally add a yearly investment amount for upgrades",
                "Optionally enter an inflation rate for real value comparison",
                "Select compound frequency and currency",
                "View future value, total gain, and year-by-year breakdown instantly",
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
                "Real-time calculation as you type or slide",
                "Compound frequency: yearly, quarterly, monthly",
                "Inflation-adjusted value comparison",
                "Year-by-year appreciation breakdown table",
                "Interactive growth chart visualization",
                "CSV export for full data analysis",
                "Copy results to clipboard",
                "Shareable URL with saved inputs",
                "Calculation history saved locally",
                "Multi-currency support (USD, EUR, GBP, INR, CAD, AUD)",
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
          The Appreciation Formula
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Base Formula</h3>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm space-y-2">
              <div>FV = P × (1 + r/n)^(n × t)</div>
              <div className="text-gray-500 text-xs mt-2 space-y-1 font-sans">
                <div>P = Initial Property Value</div>
                <div>r = Annual Appreciation Rate (decimal)</div>
                <div>n = Compounding Periods per Year</div>
                <div>t = Investment Duration (years)</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Example Calculation</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-semibold text-blue-900 mb-1">$100,000 @ 5% for 10 years</div>
                <div className="font-mono">100,000 × (1.05)^10 = <strong>$162,889</strong></div>
                <div className="text-blue-700 mt-1">Total Gain: +$62,889 (+62.89%)</div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-semibold text-green-900 mb-1">$250,000 @ 4% for 20 years</div>
                <div className="font-mono">250,000 × (1.04)^20 = <strong>$547,778</strong></div>
                <div className="text-green-700 mt-1">Total Gain: +$297,778 (+119.11%)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Property Value</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Years</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Future Value</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["$100,000", "5%", "10", "$162,889", "+$62,889"],
                ["$50,000",  "8%", "15", "$158,608", "+$108,608"],
                ["$250,000", "4%", "20", "$547,778", "+$297,778"],
                ["$500,000", "6%", "25", "$2,145,674", "+$1,645,674"],
                ["$75,000",  "7%", "30", "$571,091", "+$496,091"],
                ["$200,000", "3%", "15", "$311,552", "+$111,552"],
              ].map(([val, rate, yrs, fv, gain]) => (
                <tr key={val + rate} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono">{val}</td>
                  <td className="py-3 px-4 font-mono">{rate}</td>
                  <td className="py-3 px-4 font-mono">{yrs} yrs</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{fv}</td>
                  <td className="py-3 px-4 font-mono text-green-600">{gain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Typical Appreciation Rates by Property Type
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { type: "Urban Land",           range: "6% – 10%", color: "blue",   icon: "🏙️" },
            { type: "Residential Property", range: "3% – 6%",  color: "green",  icon: "🏠" },
            { type: "Commercial Property",  range: "4% – 8%",  color: "purple", icon: "🏢" },
            { type: "Agricultural Land",    range: "2% – 5%",  color: "orange", icon: "🌾" },
            { type: "Suburban Property",    range: "3% – 7%",  color: "teal",   icon: "🏡" },
            { type: "Industrial Land",      range: "4% – 9%",  color: "gray",   icon: "🏭" },
          ].map(({ type, range, color, icon }) => (
            <div key={type} className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4`}>
              <div className="text-2xl mb-2">{icon}</div>
              <div className={`font-semibold text-${color}-900 text-sm mb-1`}>{type}</div>
              <div className={`text-${color}-700 font-mono text-sm font-bold`}>{range} / year</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          * These are general historical averages. Actual appreciation varies by location, market conditions, and economic factors.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Homeowners",          color: "blue",   desc: "Estimate how much your home may be worth in 5, 10, or 20 years." },
            { icon: "💼", title: "Real Estate Investors",color: "green",  desc: "Project long-term returns and compare investment scenarios." },
            { icon: "🌾", title: "Land Investors",       color: "orange", desc: "Forecast land value growth for agricultural or development plots." },
            { icon: "📊", title: "Financial Planners",   color: "purple", desc: "Include property appreciation in long-term wealth planning." },
            { icon: "🏗️", title: "Developers",           color: "red",    desc: "Evaluate land acquisition value against future development returns." },
            { icon: "🏦", title: "Mortgage Advisors",    color: "gray",   desc: "Show clients how property equity grows over the loan term." },
          ].map(({ icon, title, color, desc }) => (
            <div key={title} className={`bg-${color}-50 border border-${color}-200 rounded-lg p-6`}>
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className={`font-semibold text-${color}-900 mb-2`}>{title}</h3>
              <p className={`text-sm text-${color}-800`}>{desc}</p>
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
              q: "How is future property value calculated?",
              a: "The calculator uses the compound growth formula: FV = P × (1 + r/n)^(n×t), where P is the initial value, r is the annual appreciation rate, n is the compounding frequency, and t is the number of years.",
            },
            {
              q: "What is the difference between yearly, quarterly, and monthly compounding?",
              a: "Compounding frequency determines how often appreciation is applied. Monthly compounding produces slightly higher results than yearly because gains compound more frequently throughout the year.",
            },
            {
              q: "What does the inflation-adjusted value mean?",
              a: "The inflation-adjusted value shows what your future property value is worth in today's purchasing power. It accounts for the fact that money loses value over time due to inflation.",
            },
            {
              q: "What is the additional annual investment field for?",
              a: "This optional field lets you model yearly investments in property improvements or upgrades. These are added to the compounding calculation, increasing the projected future value.",
            },
            {
              q: "What is CAGR (Annualized Return)?",
              a: "CAGR stands for Compound Annual Growth Rate. It represents the steady annual rate at which your property would need to grow to reach the future value from the initial value over the given period.",
            },
            {
              q: "Is my data saved anywhere?",
              a: "No. All calculations run entirely in your browser. History is saved only in your browser's localStorage and is never sent to any server.",
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

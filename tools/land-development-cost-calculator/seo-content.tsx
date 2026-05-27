import React from "react";

export default function LandDevelopmentCostCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Land Development Cost Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Land Development Cost Calculator</strong> estimates the total cost of preparing raw land for residential, commercial, industrial, or agricultural use. It aggregates all major expense categories — land purchase, road construction, utilities, permits, labor, and materials — into a single project budget with contingency and tax adjustments.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Land development involves significant upfront investment before any construction begins. Without a clear cost estimate, developers and investors often underestimate the true cost of site preparation, leading to budget overruns and project delays.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator provides instant, real-time estimates as you enter costs. It also calculates cost per area unit, giving you the key metrics needed to assess project feasibility before committing to a development.
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
                "Enter the land area and select the unit (sq ft, sq m, acres, or hectares)",
                "Enter the land purchase cost if applicable",
                "Fill in infrastructure costs: road, site prep, drainage, water, electricity, sewer",
                "Add professional costs: permits, engineering, labor, and materials",
                "Use the sliders to set contingency (default 10%) and tax rate (default 5%)",
                "Add any custom cost rows for project-specific expenses",
                "View the instant total cost, base cost, and cost per area unit",
                "Use presets for Residential, Commercial, Agricultural, or Industrial scenarios",
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
                "Real-time calculation as you type",
                "11 standard cost categories + unlimited custom rows",
                "Contingency and tax percentage sliders",
                "Cost per area unit calculation",
                "Visual cost breakdown with percentage bars",
                "4 quick presets for common project types",
                "Scenario comparison — save and compare multiple estimates",
                "Auto-save inputs to localStorage",
                "Multi-currency support (USD, EUR, GBP, AUD, CAD)",
                "Export to TXT and copy to clipboard",
                "Calculation history with one-click reload",
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
          Typical Land Development Cost Ranges (US)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Cost Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Typical Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Road Construction",    "$5,000 – $100,000+",  "Grading, paving, curbs, signage"],
                ["Site Preparation",     "$2,000 – $30,000+",   "Clearing, grading, leveling"],
                ["Drainage System",      "$2,000 – $25,000+",   "Stormwater, culverts, retention"],
                ["Water Connection",     "$1,500 – $15,000+",   "Water line from main to site"],
                ["Electricity",          "$2,000 – $20,000+",   "Power line, transformer, meter"],
                ["Sewer System",         "$3,000 – $30,000+",   "Sewer line or septic system"],
                ["Permits & Legal",      "$500 – $10,000+",     "Varies by municipality"],
                ["Survey & Engineering", "$1,000 – $8,000+",    "Boundary survey, design, consulting"],
                ["Labor",                "$5,000 – $50,000+",   "Construction and installation labor"],
                ["Materials",            "$5,000 – $100,000+",  "Aggregate, pipe, concrete, etc."],
              ].map(([cat, range, notes]) => (
                <tr key={cat} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{cat}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{range}</td>
                  <td className="py-3 px-4 text-gray-600">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Ranges are approximate US averages. Actual costs vary significantly by location, project size, and site conditions.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Development Cost Estimates
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Scenario</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Land Area</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Base Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total (10% cont. + 5% tax)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Small Residential Lot", "10,000 sq ft", "$166,000", "$191,900"],
                ["Commercial Site",       "2 acres",      "$435,000", "$503,250"],
                ["Agricultural Land",     "5 acres",      "$92,500",  "$106,375"],
                ["Industrial Plot",       "1 hectare",    "$435,000", "$503,250"],
              ].map(([scenario, area, base, total]) => (
                <tr key={scenario} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{scenario}</td>
                  <td className="py-3 px-4 text-gray-600">{area}</td>
                  <td className="py-3 px-4 font-mono text-gray-700">{base}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Based on preset values. Use the calculator above for your specific project inputs.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Real Estate Developers",  desc: "Build detailed project budgets and assess feasibility before committing to land acquisition." },
            { icon: "💼", title: "Land Investors",          desc: "Quickly estimate development costs to determine if a land purchase will be profitable." },
            { icon: "📐", title: "Civil Engineers",         desc: "Estimate infrastructure costs for road, drainage, and utility installation planning." },
            { icon: "🏗️", title: "Construction Planners",  desc: "Plan and track all development expenses from site preparation through final infrastructure." },
            { icon: "🏛️", title: "Municipal Planners",     desc: "Estimate public land development costs for infrastructure and community projects." },
            { icon: "🌾", title: "Agricultural Developers", desc: "Calculate the cost of preparing farmland with irrigation, drainage, and access roads." },
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
              q: "What is the average cost to develop land in the US?",
              a: "Land development costs vary widely depending on location, project type, and site conditions. A basic residential lot development can cost $50,000–$200,000+, while commercial or industrial sites can exceed $500,000. The biggest variables are road construction, utility connections, and permit fees.",
            },
            {
              q: "Why should I include a contingency percentage?",
              a: "Contingency covers unexpected costs that arise during development — unforeseen soil conditions, permit delays, material price increases, or design changes. A 10% contingency is standard for most projects. Complex or large-scale developments may warrant 15–20%.",
            },
            {
              q: "How is cost per area unit calculated?",
              a: "Cost per area unit is the total development cost divided by the land area. For example, if the total cost is $172,500 and the land is 10,000 sq ft, the cost per sq ft is $17.25. This metric helps compare development costs across different project sizes.",
            },
            {
              q: "What is the difference between base cost and total cost?",
              a: "Base cost is the sum of all direct development expenses (land, infrastructure, labor, materials). Total cost adds contingency (for unexpected expenses) and tax on top of the base cost. The formula is: Total = Base + (Base × Contingency%) + (Base × Tax%).",
            },
            {
              q: "Can I save and compare multiple scenarios?",
              a: "Yes. After calculating a result, enter a scenario name and click Save to store it. You can save up to 10 scenarios and compare them side by side. Click Load to restore any saved scenario's inputs.",
            },
            {
              q: "Is this calculator accurate for my specific project?",
              a: "This calculator provides a preliminary budget estimate based on your inputs. Actual costs depend on your specific location, local permit fees, contractor rates, and site conditions. Always obtain professional quotes before committing to a project budget.",
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

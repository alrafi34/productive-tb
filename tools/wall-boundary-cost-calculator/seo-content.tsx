import React from "react";

export default function WallBoundaryCostCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Wall Boundary Cost Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Wall Boundary Cost Calculator</strong> is a construction planning tool that helps estimate the total cost of building a boundary wall around your property. It calculates material costs, labor expenses, and additional costs like gates, plaster, and finishing work to provide an accurate budget estimate for your wall construction project.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator works by multiplying the wall area (perimeter × height) by your material and labor costs per square foot, then adding any extra expenses. It supports both feet and meter measurements and multiple currencies, making it suitable for projects worldwide.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All calculations happen instantly in your browser with complete privacy. The tool includes preset templates for residential, commercial, and farm boundaries, plus features like cost breakdown, calculation history, and export options.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Wall Boundary Cost Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter your boundary length and wall height",
                "Select your measurement unit (feet or meters)",
                "Choose wall thickness (4, 5, 9, or 12 inches)",
                "Input material cost per square foot",
                "Enter labor cost per square foot",
                "Add optional costs (plaster, gate, miscellaneous)",
                "View instant cost breakdown and total estimate",
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
                "Real-time cost calculation as you type",
                "Support for feet and meter measurements",
                "Multiple currency options (USD, EUR, GBP, etc.)",
                "Wall thickness selection (4-12 inches)",
                "Detailed cost breakdown display",
                "Quick preset templates for common projects",
                "Save and export calculation history",
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
          Cost Calculation Formula
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Component</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Example (200ft × 6ft wall)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Wall Area", "Length × Height", "200 × 6 = 1,200 sq ft"],
                ["Material Cost", "Area × Material Rate", "1,200 × $12 = $14,400"],
                ["Labor Cost", "Area × Labor Rate", "1,200 × $4 = $4,800"],
                ["Total Base Cost", "Material + Labor", "$14,400 + $4,800 = $19,200"],
                ["Final Total", "Base + Plaster + Gate + Misc", "$19,200 + $1,000 + $2,500 + $500 = $23,200"],
              ].map(([component, formula, example]) => (
                <tr key={component} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{component}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{formula}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Wall Thickness Guide
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "4 Inch (Light)",
              desc: "Suitable for low-height decorative walls, garden boundaries, or temporary partitions. Not recommended for structural or security purposes.",
            },
            {
              title: "5 Inch",
              desc: "Good for medium-height residential boundaries up to 6 feet. Provides decent strength while being cost-effective.",
            },
            {
              title: "9 Inch (Standard)",
              desc: "Most common choice for residential boundary walls. Offers excellent strength, durability, and weather resistance for heights up to 8 feet.",
            },
            {
              title: "12 Inch (Heavy)",
              desc: "Heavy-duty construction for commercial properties, high walls, or areas requiring maximum security and structural integrity.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Cost Estimates
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Project Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Dimensions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Material + Labor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Total Estimate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Small Residential", "150ft × 5ft", "$12 + $4/sq ft", "$12,000 - $15,000"],
                ["Standard Home", "200ft × 6ft", "$12 + $4/sq ft", "$19,200 - $25,000"],
                ["Large Property", "300ft × 7ft", "$15 + $6/sq ft", "$44,100 - $55,000"],
                ["Commercial Boundary", "500ft × 8ft", "$15 + $6/sq ft", "$84,000 - $100,000"],
                ["Farm Perimeter", "800ft × 5ft", "$8 + $3/sq ft", "$44,000 - $55,000"],
              ].map(([project, dims, rate, total]) => (
                <tr key={project} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{project}</td>
                  <td className="py-3 px-4 font-mono">{dims}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{rate}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{total}</td>
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
            { icon: "🏠", title: "Homeowners", desc: "Plan boundary wall budgets for residential properties and get accurate cost estimates." },
            { icon: "👷", title: "Contractors", desc: "Generate quick quotes for clients and estimate material and labor requirements." },
            { icon: "🏗️", title: "Developers", desc: "Budget boundary wall costs for residential and commercial development projects." },
            { icon: "🌾", title: "Farmers", desc: "Estimate costs for farm boundary walls and livestock enclosure construction." },
            { icon: "🏢", title: "Property Managers", desc: "Plan maintenance budgets and estimate wall repair or replacement costs." },
            { icon: "📐", title: "Engineers", desc: "Perform preliminary cost analysis for boundary wall construction projects." },
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
          Cost Factors to Consider
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "Material Costs",
              desc: "Include bricks, cement, sand, steel reinforcement, and mortar. Prices vary by region and quality grade.",
            },
            {
              title: "Labor Expenses",
              desc: "Skilled mason wages, helper costs, and supervision charges. Rates depend on local market conditions.",
            },
            {
              title: "Foundation Work",
              desc: "Excavation, foundation concrete, and reinforcement. Deeper foundations needed for taller walls.",
            },
            {
              title: "Finishing Costs",
              desc: "Plastering, painting, waterproofing, and decorative elements. Optional but recommended for durability.",
            },
            {
              title: "Gate Installation",
              desc: "Entry gates, hardware, locks, and installation. Costs vary significantly based on size and material.",
            },
            {
              title: "Permits & Approvals",
              desc: "Building permits, municipal approvals, and inspection fees. Check local requirements before starting.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-700">{desc}</p>
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
              q: "How accurate are the cost estimates?",
              a: "The calculator provides estimates based on your input costs. Actual costs may vary due to local material prices, labor rates, site conditions, and project complexity. Always get quotes from local contractors for final budgeting.",
            },
            {
              q: "What's included in material costs per square foot?",
              a: "Material costs typically include bricks, cement, sand, and mortar. Steel reinforcement, foundation materials, and finishing supplies may be additional. Adjust your rate based on local material prices.",
            },
            {
              q: "How do I estimate labor costs?",
              a: "Labor costs vary by region and skill level. Contact local masons for current rates. Include costs for skilled masons, helpers, and any supervision or project management fees.",
            },
            {
              q: "Should I add a buffer to the estimate?",
              a: "Yes, it's recommended to add 10-20% buffer for unexpected costs, material waste, design changes, or price fluctuations. The calculator helps you plan, but real projects often have additional expenses.",
            },
            {
              q: "What about foundation costs?",
              a: "Foundation costs depend on soil conditions, wall height, and local requirements. For walls over 4 feet, factor in excavation and concrete foundation costs separately from the wall calculation.",
            },
            {
              q: "Can I use this for retaining walls?",
              a: "This calculator is designed for boundary walls. Retaining walls require structural engineering, drainage systems, and specialized construction techniques with different cost structures.",
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
import React from "react";

export default function ExcavationCostCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is an Excavation Cost Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            An <strong>Excavation Cost Calculator</strong> estimates the total cost of digging or excavating a site based on the volume of soil to be removed, the soil type, and associated costs like labor, equipment, and transportation. Accurate cost estimation before breaking ground helps contractors bid correctly, homeowners budget realistically, and project managers avoid cost overruns.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator computes excavation volume from length, width, and depth, then applies a soil type multiplier to account for harder or softer ground conditions. Hard rock excavation can cost up to 1.8× more than loose soil due to the additional equipment and time required.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Optional fields for labor, equipment, and transport costs provide a complete project budget estimate. Results are shown in cubic yards, cubic meters, or cubic feet, with support for USD, EUR, GBP, BDT, and INR currencies.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Excavation Cost Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select your input unit (feet or meters)",
                "Choose the excavation type for your project",
                "Enter length, width, and depth of the excavation",
                "Enter the excavation rate (cost per cubic yard/meter)",
                "Select the soil type to apply the correct multiplier",
                "Optionally add labor, equipment, and transport costs",
                "View the instant cost breakdown and total estimate",
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
                "6 excavation types: foundation, basement, trench, pond, leveling, custom",
                "6 soil types with automatic cost multipliers",
                "Optional labor, equipment, and transport costs",
                "Multi-currency support (USD, EUR, GBP, BDT, INR)",
                "Volume output in yd³, m³, or ft³",
                "Step-by-step cost breakdown",
                "4 quick presets for common projects",
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
          Soil Type Multipliers
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Soil Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Multiplier</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Loose Soil",  "×1.00", "Easy to dig, standard baseline cost"],
                ["Sand",        "×1.10", "Slightly harder, risk of collapse"],
                ["Clay Soil",   "×1.15", "Sticky, heavy, harder to remove"],
                ["Gravel",      "×1.20", "Requires more equipment effort"],
                ["Mixed Soil",  "×1.25", "Variable conditions, unpredictable"],
                ["Hard Rock",   "×1.80", "Requires blasting or heavy machinery"],
              ].map(([soil, mult, reason]) => (
                <tr key={soil} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{soil}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{mult}</td>
                  <td className="py-3 px-4 text-gray-600">{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Project</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Dimensions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Volume</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Est. Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Foundation (loose)",  "50×30×5 ft",   "278 yd³",  "$1,667 base"],
                ["Basement (clay)",     "40×25×8 ft",   "296 yd³",  "$2,720 adj."],
                ["Trench (sand)",       "100×2×4 ft",   "30 yd³",   "$198 adj."],
                ["Pond (gravel)",       "60×40×6 ft",   "533 yd³",  "$4,533 adj."],
                ["Rock excavation",     "20×15×4 ft",   "44 yd³",   "$1,584 adj."],
              ].map(([project, dims, vol, cost]) => (
                <tr key={project} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{project}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{dims}</td>
                  <td className="py-3 px-4 font-mono">{vol}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Based on $6/yd³ base rate. Actual costs vary by region and contractor.</p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "👷", title: "Contractors",      desc: "Generate accurate excavation cost estimates for project bids and client quotes." },
            { icon: "🏗️", title: "Civil Engineers",  desc: "Calculate earthwork costs for site preparation, foundations, and drainage." },
            { icon: "🏠", title: "Homeowners",       desc: "Budget basement, pool, or foundation excavation before hiring contractors." },
            { icon: "💼", title: "Developers",       desc: "Estimate land preparation costs for residential and commercial projects." },
            { icon: "📐", title: "Surveyors",        desc: "Provide preliminary cost estimates for land development feasibility studies." },
            { icon: "🏦", title: "Lenders & Banks",  desc: "Verify construction cost estimates for loan approval and project financing." },
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
              q: "What is a typical excavation rate per cubic yard?",
              a: "In the US, typical excavation rates range from $5–$15 per cubic yard for loose soil, $8–$20 for clay, and $20–$50+ for hard rock. Rates vary significantly by region, project size, and contractor. Always get multiple quotes for large projects.",
            },
            {
              q: "Why does soil type affect excavation cost?",
              a: "Different soil types require different equipment, time, and effort. Loose soil can be excavated quickly with a standard backhoe. Clay is sticky and heavy, slowing the process. Hard rock requires specialized equipment like hydraulic breakers or blasting, dramatically increasing cost.",
            },
            {
              q: "How do I convert cubic feet to cubic yards?",
              a: "Divide cubic feet by 27. For example, 7,500 cubic feet ÷ 27 = 277.78 cubic yards. The calculator handles this conversion automatically when you select cubic yards as the output unit.",
            },
            {
              q: "Should I include labor separately from the excavation rate?",
              a: "It depends on how your contractor quotes. Some contractors include labor in their per-cubic-yard rate. Others quote labor separately by day. If your excavation rate already includes labor, leave the labor fields blank to avoid double-counting.",
            },
            {
              q: "What is a typical residential foundation depth?",
              a: "Residential foundations typically range from 4–8 feet deep depending on frost line depth, soil conditions, and local building codes. In cold climates, foundations must extend below the frost line, which can be 3–6 feet deep.",
            },
            {
              q: "How accurate is this estimate?",
              a: "This calculator provides a preliminary budget estimate based on your inputs. Actual costs depend on site access, equipment availability, local labor rates, and unforeseen conditions. Always get professional quotes before committing to a project budget.",
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

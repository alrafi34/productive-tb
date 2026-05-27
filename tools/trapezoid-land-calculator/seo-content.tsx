import React from "react";

export default function TrapezoidLandCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Trapezoid Land Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Trapezoid Land Calculator</strong> is a land measurement tool that calculates the area of trapezoidal plots of land. A trapezoid (also called a trapezium) is a four-sided shape with exactly one pair of parallel sides — the top base and the bottom base. Many real-world land parcels, road frontages, and field sections have this shape.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The formula is straightforward: <strong>Area = ((a + b) ÷ 2) × h</strong>, where a is the top parallel side, b is the bottom parallel side, and h is the perpendicular height between them. This is equivalent to multiplying the average of the two parallel sides by the height.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator supports feet, meters, yards, and inches as input units, and instantly converts the result to square feet, square meters, acres, hectares, and square yards. Sliders let you adjust dimensions visually, and a live SVG diagram updates as you type.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Trapezoid Land Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select your input unit (feet, meters, yards, or inches)",
                "Enter the top base length (shorter parallel side)",
                "Enter the bottom base length (longer parallel side)",
                "Enter the perpendicular height between the two bases",
                "Select your preferred output unit",
                "View the instant area result and all unit conversions",
                "Use sliders to fine-tune dimensions visually",
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
                "Interactive slider controls for each dimension",
                "Live SVG trapezoid diagram with labeled sides",
                "5 output units: ft², m², acres, ha, yd²",
                "Step-by-step calculation breakdown",
                "Quick presets for common plot sizes",
                "Save history and export to TXT",
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
          Trapezoid Area Formula Explained
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Step</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Operation</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Example (a=20, b=40, h=15)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["1", "Sum the two parallel bases",    "20 + 40 = 60"],
                ["2", "Divide by 2 (average)",         "60 ÷ 2 = 30"],
                ["3", "Multiply by height",            "30 × 15 = 450"],
                ["4", "Result",                        "Area = 450 ft²"],
              ].map(([step, op, ex]) => (
                <tr key={step} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-primary">{step}</td>
                  <td className="py-3 px-4 font-medium">{op}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Plot</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">a – b – h</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Area (ft²)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Acres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Small Lot",       "20–40–15 ft",    "450",      "0.0103"],
                ["Medium Plot",     "120–150–80 ft",  "10,800",   "0.248"],
                ["Large Field",     "200–300–150 ft", "37,500",   "0.861"],
                ["Metric Plot",     "25–30–12 m",     "3,552",    "0.0816"],
                ["Road Frontage",   "50–80–40 ft",    "2,600",    "0.0597"],
              ].map(([plot, dims, sqft, acres]) => (
                <tr key={plot} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{plot}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{dims}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{sqft}</td>
                  <td className="py-3 px-4 font-mono">{acres}</td>
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
            { icon: "📐", title: "Land Surveyors",    desc: "Quickly compute trapezoidal section areas from field measurements." },
            { icon: "🌾", title: "Farmers",           desc: "Measure trapezoidal field sections for crop planning and irrigation." },
            { icon: "👷", title: "Civil Engineers",   desc: "Calculate road cross-sections, embankments, and trapezoidal channels." },
            { icon: "🏠", title: "Property Buyers",   desc: "Verify the area of wedge-shaped or road-frontage plots before purchase." },
            { icon: "🏗️", title: "Architects",        desc: "Calculate floor plan areas for trapezoidal rooms and building sections." },
            { icon: "🎓", title: "Students",          desc: "Learn and verify trapezoid area calculations with step-by-step breakdowns." },
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
              q: "What is the difference between a trapezoid and a trapezium?",
              a: "In the US, a trapezoid has exactly one pair of parallel sides. In the UK and most other countries, the same shape is called a trapezium. This calculator uses the US definition — one pair of parallel sides (the top base and bottom base).",
            },
            {
              q: "What is the perpendicular height?",
              a: "The perpendicular height is the straight-line distance between the two parallel sides, measured at a right angle (90°) to both bases. It is not the length of the slanted sides — it is the vertical distance between the top and bottom bases.",
            },
            {
              q: "Can the top base be longer than the bottom base?",
              a: "Yes. The formula works regardless of which parallel side is longer. The calculator accepts any positive values for both bases and the height.",
            },
            {
              q: "How do I measure the height of a trapezoidal land plot?",
              a: "In field surveying, measure the perpendicular distance between the two parallel boundary lines. This can be done with a tape measure by finding the shortest distance between the two parallel sides, or calculated from GPS coordinates.",
            },
            {
              q: "What if my land has two parallel sides but they are not horizontal?",
              a: "The formula still applies. The height is always the perpendicular distance between the two parallel sides, regardless of their orientation. As long as you measure the perpendicular distance correctly, the formula gives the correct area.",
            },
            {
              q: "How accurate are the unit conversions?",
              a: "The conversions use standard international factors: 1 acre = 43,560 sq ft, 1 hectare = 107,639 sq ft, 1 sq meter = 10.7639 sq ft. All calculations use full floating-point precision.",
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

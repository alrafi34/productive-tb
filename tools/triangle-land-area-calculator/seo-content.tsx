import React from "react";

export default function TriangleLandAreaCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Triangle Land Area Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Triangle Land Area Calculator</strong> is a specialized land measurement tool that calculates the area of triangular plots of land. Many real-world land parcels are triangular or contain triangular sections — corner lots, wedge-shaped fields, and irregular plots often require triangle area calculations for accurate land measurement, pricing, and planning.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports three methods: the simple <strong>Base × Height</strong> formula when you know the base and perpendicular height, <strong>Heron&apos;s Formula</strong> when you know all three side lengths, and the <strong>Coordinate Method</strong> when you have GPS or survey coordinates for the three vertices.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Results are instantly converted to square feet, square meters, acres, hectares, square yards, and more. A step-by-step breakdown shows exactly how the area was calculated, making it useful for both professionals and students.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Triangle Land Area Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select your calculation method (Base×Height, Three Sides, or Coordinates)",
                "Choose your input unit (feet, meters, yards, inches, or cm)",
                "Enter the required measurements for your chosen method",
                "Select your preferred primary output unit",
                "View the instant area result and all unit conversions",
                "Click Show on the breakdown to see step-by-step math",
                "Copy, save, or export the result as needed",
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
                "Three calculation methods in one tool",
                "Real-time calculation as you type",
                "Step-by-step math breakdown",
                "7 output units including acres and hectares",
                "Input units: ft, m, yd, in, cm",
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
          Triangle Area Formulas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Base × Height", "Area = (Base × Height) ÷ 2", "Base=50ft, H=30ft → 750 ft²"],
                ["Heron's Formula", "s=(a+b+c)/2, Area=√(s(s-a)(s-b)(s-c))", "10-12-14 ft → 58.79 ft²"],
                ["Coordinates", "Area = ½|x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)|", "(0,0)(10,0)(5,8) → 40 ft²"],
              ].map(([method, formula, example]) => (
                <tr key={method} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{method}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{formula}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold text-xs">{example}</td>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Inputs</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Area (ft²)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Acres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Small Corner Lot",   "Base=50ft, H=30ft",       "750",      "0.0172"],
                ["Medium Plot",        "Base=120ft, H=85ft",      "5,100",    "0.117"],
                ["Large Field",        "Base=300ft, H=200ft",     "30,000",   "0.689"],
                ["Heron 10-12-14 ft",  "a=10, b=12, c=14 ft",    "58.79",    "0.00135"],
                ["Heron 30-40-50 ft",  "a=30, b=40, c=50 ft",    "600",      "0.0138"],
              ].map(([plot, inputs, sqft, acres]) => (
                <tr key={plot} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{plot}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{inputs}</td>
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
            { icon: "🏠", title: "Land Owners",      desc: "Calculate the area of corner lots, wedge-shaped plots, and irregular triangular parcels." },
            { icon: "📐", title: "Surveyors",         desc: "Quickly compute triangular section areas from field measurements or GPS coordinates." },
            { icon: "🌾", title: "Farmers",           desc: "Measure triangular field sections for crop planning, irrigation, and yield estimation." },
            { icon: "👷", title: "Engineers",         desc: "Calculate triangular land areas for site planning, grading, and construction layouts." },
            { icon: "💼", title: "Real Estate",       desc: "Verify triangular plot sizes for accurate property valuation and listing." },
            { icon: "🎓", title: "Students",          desc: "Learn and verify triangle area formulas with step-by-step calculation breakdowns." },
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
              q: "When should I use Base × Height vs Heron's Formula?",
              a: "Use Base × Height when you know the base length and the perpendicular height (the vertical distance from the base to the opposite vertex). Use Heron's Formula when you only know the three side lengths but not the height — this is common in field surveying where sides are measured directly.",
            },
            {
              q: "What is the triangle inequality?",
              a: "For a valid triangle, the sum of any two sides must be greater than the third side: a+b > c, b+c > a, and a+c > b. If this condition is not met, the three sides cannot form a triangle and the calculator will show a validation error.",
            },
            {
              q: "How do I find the height of a triangle for land measurement?",
              a: "In field surveying, the height is the perpendicular distance from the base line to the opposite corner. You can measure this directly with a tape measure by finding the point on the base line that forms a right angle to the opposite vertex.",
            },
            {
              q: "Can I use GPS coordinates with this calculator?",
              a: "Yes. Switch to Coordinates mode and enter the decimal degree coordinates for each vertex. Set the scale appropriately — for GPS coordinates in degrees, the raw area will be in square degrees, so you'll need to apply a conversion factor for your latitude.",
            },
            {
              q: "What is a 30-40-50 right triangle?",
              a: "A 30-40-50 triangle is a right triangle (a scaled version of the 3-4-5 Pythagorean triple). Its area is (30 × 40) ÷ 2 = 600 sq ft. You can verify this with either the Base×Height method (base=40, height=30) or Heron's Formula.",
            },
            {
              q: "How accurate are the results?",
              a: "The calculator uses full JavaScript floating-point precision (15+ significant digits) for all calculations. Results are displayed with smart formatting that shows appropriate decimal places based on the magnitude of the value.",
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

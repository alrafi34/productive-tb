import React from "react";

export default function RainwaterRunoffCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Rainwater Runoff Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Rainwater Runoff Calculator</strong> is a stormwater engineering tool that estimates
            how much rainfall becomes surface runoff rather than infiltrating into the ground. It uses the
            <strong> Rational Runoff Formula</strong> — multiplying rainfall depth, catchment area, and a
            surface-specific runoff coefficient — to deliver instant volume estimates in liters, cubic meters,
            and gallons.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The core principle is simple: 1 mm of rainfall over 1 m² of surface produces exactly 1 liter of
            potential runoff. The runoff coefficient (C) then scales this by how much of that water actually
            flows off the surface versus soaking in. Impervious surfaces like concrete and roofs have
            coefficients near 0.90–0.95, while grass and sandy soils are as low as 0.20–0.30.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All calculations run entirely in your browser with no data sent to any server. The tool supports
            three rainfall units, four area units, eight preset surface types, and a custom coefficient mode
            for specialized surfaces.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Runoff Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the rainfall amount and select the unit (mm, cm, or inches)",
                "Enter the land area and select the unit (m², ft², acres, or hectares)",
                "Choose the surface type from the dropdown — the coefficient is set automatically",
                "For custom surfaces, select 'Custom Coefficient' and enter a value between 0 and 1",
                "View the instant runoff estimate in liters, m³, gallons, and barrels",
                "Check the harvest potential rating and recommendations",
                "Copy, save, or export the result as a TXT report",
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
                "8 preset surface types with standard coefficients",
                "Custom runoff coefficient mode",
                "3 rainfall units: mm, cm, inches",
                "4 area units: m², ft², acres, hectares",
                "Output in liters, m³, gallons, and barrels",
                "Rainwater harvest potential rating",
                "Engineering recommendations",
                "Calculation history with LocalStorage",
                "Export results as TXT report",
                "Copy to clipboard",
                "Mobile-friendly for field use",
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
          Runoff Formula & Example Calculations
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Core Formula</h3>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm space-y-2">
              <div>Runoff (L) = Rainfall (mm) × Area (m²) × C</div>
              <div className="text-gray-500 text-xs mt-2 font-sans space-y-1">
                <div>Rainfall = depth of rain in millimeters</div>
                <div>Area = catchment area in square meters</div>
                <div>C = runoff coefficient (0.0 – 1.0)</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
              1 mm of rain on 1 m² = 1 liter of water
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Example Calculations</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-semibold text-blue-900 mb-1">Concrete · 50 mm · 100 m²</div>
                <div className="font-mono text-xs space-y-0.5 text-blue-800">
                  <div>50 mm × 100 m² × 0.90 = 4,500 liters</div>
                  <div>= 4.5 m³ ≈ 24 barrels</div>
                </div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-semibold text-green-900 mb-1">Grass · 30 mm · 500 m²</div>
                <div className="font-mono text-xs space-y-0.5 text-green-800">
                  <div>30 mm × 500 m² × 0.30 = 4,500 liters</div>
                  <div>= 4.5 m³ ≈ 24 barrels</div>
                </div>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="font-semibold text-purple-900 mb-1">Roof · 100 mm · 200 m²</div>
                <div className="font-mono text-xs space-y-0.5 text-purple-800">
                  <div>100 mm × 200 m² × 0.95 = 19,000 liters</div>
                  <div>= 19 m³ ≈ 100 barrels</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Runoff Coefficients by Surface Type
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Surface Type</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">Coefficient (C)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Runoff Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Typical Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Roof Surface",         "0.95", "Very High", "Residential & commercial rooftops"],
                ["Concrete / Pavement",  "0.90", "Very High", "Driveways, sidewalks, plazas"],
                ["Asphalt",              "0.85", "High",      "Roads, parking lots, highways"],
                ["Clay Soil",            "0.70", "High",      "Heavy clay agricultural land"],
                ["Gravel",               "0.60", "Moderate",  "Gravel paths, driveways, parking"],
                ["Bare Soil",            "0.50", "Moderate",  "Construction sites, exposed earth"],
                ["Grass / Lawn",         "0.30", "Low",       "Lawns, parks, sports fields"],
                ["Sandy Soil",           "0.20", "Very Low",  "Sandy agricultural land, beaches"],
              ].map(([surface, c, level, use]) => (
                <tr key={surface} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{surface}</td>
                  <td className="py-3 px-4 text-center font-mono text-primary font-semibold">{c}</td>
                  <td className="py-3 px-4 text-gray-600">{level}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{use}</td>
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
            { icon: "🏗️", title: "Civil Engineers",          color: "blue",   desc: "Size drainage systems and stormwater infrastructure for development projects." },
            { icon: "🌿", title: "Environmental Engineers",  color: "green",  desc: "Assess runoff impacts on watersheds, wetlands, and water quality." },
            { icon: "👨‍🌾", title: "Farmers & Agronomists",   color: "yellow", desc: "Plan field drainage and estimate water availability for irrigation." },
            { icon: "🏙️", title: "Urban Planners",           color: "purple", desc: "Design permeable surfaces and green infrastructure to manage stormwater." },
            { icon: "🌱", title: "Landscape Designers",      color: "teal",   desc: "Calculate runoff from gardens, lawns, and hardscaped areas." },
            { icon: "🎓", title: "Students & Researchers",   color: "gray",   desc: "Learn hydrology concepts and verify runoff calculations for coursework." },
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
              q: "How is rainwater runoff calculated?",
              a: "Runoff volume is calculated using the formula: Runoff (liters) = Rainfall (mm) × Area (m²) × Runoff Coefficient. The runoff coefficient (C) represents the fraction of rainfall that becomes surface runoff. For example, 50 mm of rain on 100 m² of concrete (C = 0.90) produces 50 × 100 × 0.90 = 4,500 liters.",
            },
            {
              q: "What is a runoff coefficient?",
              a: "The runoff coefficient (C) is a dimensionless number between 0 and 1 that represents the proportion of rainfall that becomes runoff. A coefficient of 0.90 means 90% of rainfall runs off the surface. Impervious surfaces like roofs and concrete have high coefficients, while permeable surfaces like grass and sandy soil have low coefficients.",
            },
            {
              q: "Why does surface type matter for runoff?",
              a: "Different surfaces have very different infiltration rates. Concrete and asphalt are nearly impervious, so most rainfall becomes runoff. Grass and soil absorb significant amounts of water, reducing runoff. Choosing the right surface type ensures accurate estimates for drainage design and water management.",
            },
            {
              q: "What is the difference between runoff and infiltration?",
              a: "Runoff is the portion of rainfall that flows over the surface into drains, streams, or collection systems. Infiltration is the portion that soaks into the ground and recharges groundwater. The runoff coefficient determines the split: C = 0.90 means 90% runoff and 10% infiltration.",
            },
            {
              q: "Can I use this for rainwater harvesting calculations?",
              a: "Yes. The calculator shows the total runoff volume available for collection. For harvesting, use a roof surface (C = 0.95) as your catchment area. Multiply the result by a first-flush factor (typically 0.85–0.90) to account for initial contamination. The harvest potential rating gives a quick guide to collection feasibility.",
            },
            {
              q: "What units does the calculator support?",
              a: "Rainfall can be entered in millimeters (mm), centimeters (cm), or inches (in). Land area can be entered in square meters (m²), square feet (ft²), acres, or hectares. Results are shown in liters, cubic meters (m³), US gallons, and standard barrels (~190 liters each).",
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

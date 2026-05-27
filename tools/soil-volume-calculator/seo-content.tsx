import React from "react";

export default function SoilVolumeCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Soil Volume Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Soil Volume Calculator</strong> is a construction and earthwork planning tool that estimates the volume of soil to be excavated, removed, or filled for a given project area. Accurate volume estimation is critical for budgeting material costs, scheduling equipment, and avoiding over-ordering or under-ordering fill dirt.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports five excavation shapes — rectangular, circular, trench, triangular, and custom area — covering the most common real-world scenarios in construction, landscaping, civil engineering, and agriculture. Results are instantly converted between cubic meters, cubic feet, and cubic yards.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Optional soil density input enables weight estimation in kilograms and metric tons. An optional cost-per-unit field provides a quick project cost estimate. All calculations run entirely in your browser with no data sent to any server.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Soil Volume Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select Excavation or Fill mode",
                "Choose your input unit (feet, meters, or yards)",
                "Select the excavation shape that matches your project",
                "Enter the required dimensions for that shape",
                "Optionally enter soil density for weight estimation",
                "Optionally enter cost per unit for budget estimation",
                "View instant volume results in all three units",
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
                "5 excavation shapes: rectangular, circular, trench, triangular, custom",
                "Excavation and fill mode toggle",
                "Real-time calculation as you type",
                "Cubic meters, feet, and yards output",
                "Optional weight estimation (kg and metric tons)",
                "Optional cost estimation per unit",
                "Step-by-step calculation breakdown",
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
          Volume Formulas by Shape
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Shape</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Rectangular", "V = L × W × D",           "10×5×2 ft = 100 ft³"],
                ["Circular",    "V = π × r² × D",          "Ø8×1.5 ft ≈ 75.4 ft³"],
                ["Trench",      "V = L × W × D",           "20×0.6×1.2 ft = 14.4 ft³"],
                ["Triangular",  "V = 0.5 × B × H × D",    "6×4×2 ft = 24 ft³"],
                ["Custom Area", "V = Area × D",            "50 ft² × 2 ft = 100 ft³"],
              ].map(([shape, formula, example]) => (
                <tr key={shape} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{shape}</td>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Project</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Dimensions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Volume (m³)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Volume (ft³)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Foundation pit",    "10×5×2 m",          "100",    "3,531"],
                ["Swimming pool",     "Ø8×1.5 m",          "75.4",   "2,663"],
                ["Utility trench",    "20×0.6×1.2 m",      "14.4",   "508"],
                ["Triangular berm",   "6×4×2 m",           "24",     "847"],
                ["Backfill area",     "50 m² × 0.3 m",     "15",     "530"],
              ].map(([project, dims, m3, ft3]) => (
                <tr key={project} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{project}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{dims}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{m3}</td>
                  <td className="py-3 px-4 font-mono">{ft3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Typical Soil Density Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Soil Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Density (kg/m³)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Loose dry sand",    "1,440–1,600", "Easy to excavate"],
                ["Compacted sand",    "1,600–1,900", "Requires more effort"],
                ["Loam / topsoil",    "1,200–1,400", "Common garden soil"],
                ["Clay (dry)",        "1,600–1,800", "Hard when dry"],
                ["Clay (wet)",        "1,800–2,000", "Heavy, sticky"],
                ["Gravel",            "1,600–2,000", "Drainage fill"],
                ["Rock (broken)",     "1,500–1,800", "Blasted material"],
              ].map(([type, density, notes]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{type}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold">{density}</td>
                  <td className="py-3 px-4 text-gray-600">{notes}</td>
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
            { icon: "👷", title: "Contractors",       desc: "Estimate excavation volumes for accurate project bidding and material ordering." },
            { icon: "🏗️", title: "Civil Engineers",   desc: "Calculate earthwork volumes for site grading, foundations, and drainage." },
            { icon: "🌿", title: "Landscapers",       desc: "Estimate fill dirt and topsoil needed for garden beds, berms, and grading." },
            { icon: "🏠", title: "Homeowners",        desc: "Plan basement excavations, pool installations, and yard leveling projects." },
            { icon: "🌾", title: "Farmers",           desc: "Calculate irrigation channel and pond excavation volumes." },
            { icon: "📐", title: "Site Managers",     desc: "Track earthwork progress and verify contractor volume estimates on-site." },
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
              q: "What is the difference between excavation and fill volume?",
              a: "Excavation volume is the amount of soil removed from a site. Fill volume is the amount of soil needed to raise or level an area. The same formula applies to both — the mode toggle simply labels the result appropriately for your project type.",
            },
            {
              q: "How do I convert cubic meters to cubic yards?",
              a: "1 cubic meter = 1.30795 cubic yards. The calculator handles this conversion automatically. For example, 100 m³ = 130.8 yd³.",
            },
            {
              q: "What soil density should I use?",
              a: "Typical values range from 1,400 kg/m³ for loose topsoil to 1,800 kg/m³ for compacted clay. Use 1,600 kg/m³ as a general default for mixed soil. Check with your geotechnical report for site-specific values.",
            },
            {
              q: "How do I calculate volume for an irregular shape?",
              a: "Use the Custom Area mode. First calculate the cross-sectional area of your irregular shape using another tool (such as the Polygon Area Calculator), then enter that area value along with the depth to get the volume.",
            },
            {
              q: "Does the calculator account for soil swell or compaction?",
              a: "No — the calculator gives the in-situ (bank) volume. Excavated soil typically swells 10–30% when loose, and fill soil compacts 10–20% when placed. Apply a swell or compaction factor to the result for accurate truck load or fill material estimates.",
            },
            {
              q: "How accurate is the circular excavation formula?",
              a: "The formula V = π × r² × depth gives the exact volume of a perfect cylinder. For tapered or conical excavations, the actual volume will be less. Use the triangular or custom area mode for tapered shapes.",
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

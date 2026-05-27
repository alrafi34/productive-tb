import React from "react";

export default function EarthFillingCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is an Earth Filling Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            An <strong>Earth Filling Calculator</strong> estimates the volume of fill material needed to raise, level, or fill a land area for construction, landscaping, road building, pond filling, or foundation preparation. Accurate fill estimation prevents costly over-ordering or project delays from under-ordering material.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports five fill shapes — rectangle, square, triangle, circular, and custom area — and applies a compaction factor to account for soil settling after placement. Results are shown in cubic feet, cubic meters, and cubic yards, with optional truckload estimation and project cost calculation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The compaction factor is critical: loose soil placed as fill typically settles 10–30% after compaction, meaning you need to order more material than the raw volume suggests. This calculator automatically adjusts for that with three compaction presets.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Earth Filling Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select your input unit (feet, meters, or yards)",
                "Choose the fill area shape that matches your project",
                "Enter the required dimensions for that shape",
                "Select the compaction factor for your soil conditions",
                "Choose the soil type for default truck capacity",
                "Optionally enter truck capacity and cost per unit",
                "View instant volume, truckload, and cost estimates",
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
                "5 fill shapes: rectangle, square, triangle, circular, custom",
                "3 compaction factors: loose, moderate, heavy",
                "Truckload estimation by soil type",
                "Optional project cost calculation",
                "Real-time calculation as you type",
                "Step-by-step calculation breakdown",
                "4 construction presets (road, foundation, pond, circular)",
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
          Fill Volume Formulas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Shape</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Raw Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">With Compaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Rectangle", "L × W × D",        "L × W × D × CF"],
                ["Square",    "S² × D",            "S² × D × CF"],
                ["Triangle",  "0.5 × B × H × D",  "0.5 × B × H × D × CF"],
                ["Circular",  "π × r² × D",        "π × r² × D × CF"],
                ["Custom",    "Area × D",          "Area × D × CF"],
              ].map(([shape, raw, comp]) => (
                <tr key={shape} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{shape}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{raw}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold text-xs">{comp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">CF = Compaction Factor (1.10 loose / 1.20 moderate / 1.30 heavy)</p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Estimates
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Project</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Dimensions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Adjusted Volume</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Trucks (8 m³)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Road base",       "50×30×2 ft, heavy CF",   "3,600 ft³ / 102 m³",  "13"],
                ["Foundation pad",  "100×40×1.5 ft, mod CF",  "7,200 ft³ / 204 m³",  "26"],
                ["Pond fill",       "20×15×3 ft, loose CF",   "990 ft³ / 28 m³",     "4"],
                ["Circular area",   "Ø30×2 ft, mod CF",       "1,696 ft³ / 48 m³",   "6"],
                ["Land leveling",   "2000 ft² × 1 ft, mod",   "2,400 ft³ / 68 m³",   "9"],
              ].map(([project, dims, vol, trucks]) => (
                <tr key={project} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{project}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{dims}</td>
                  <td className="py-3 px-4 font-mono text-primary font-semibold text-xs">{vol}</td>
                  <td className="py-3 px-4 font-mono">{trucks}</td>
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
            { icon: "👷", title: "Contractors",      desc: "Estimate fill material quantities for accurate project bidding and scheduling." },
            { icon: "🏗️", title: "Civil Engineers",  desc: "Calculate earthwork fill volumes for roads, embankments, and site grading." },
            { icon: "🌿", title: "Landscapers",      desc: "Estimate topsoil and fill needed for garden beds, berms, and yard leveling." },
            { icon: "🏠", title: "Homeowners",       desc: "Plan fill requirements for yard grading, raised beds, and drainage projects." },
            { icon: "🌾", title: "Farmers",          desc: "Calculate fill for irrigation channels, pond construction, and land leveling." },
            { icon: "📐", title: "Site Managers",    desc: "Verify fill material orders and track earthwork progress on construction sites." },
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
              q: "What is a compaction factor and why does it matter?",
              a: "When loose soil is placed as fill, it contains air voids that compress when compacted or loaded. A compaction factor of 1.20 means you need to order 20% more material than the raw volume to achieve the desired final volume after settling. Always apply a compaction factor to avoid running short of fill material.",
            },
            {
              q: "How many cubic yards fit in a standard dump truck?",
              a: "A standard dump truck carries 10–14 cubic yards (7.6–10.7 m³) of soil depending on the truck size and soil type. The calculator uses soil-type defaults (7–9 m³) and allows you to enter a custom truck capacity for your specific equipment.",
            },
            {
              q: "What is the difference between bank, loose, and compacted volume?",
              a: "Bank volume is the in-situ (undisturbed) soil volume. Loose volume is the volume after excavation (typically 10–30% more due to swell). Compacted volume is the final volume after placement and compaction (typically 10–20% less than loose). This calculator estimates the loose volume needed to achieve the desired compacted fill volume.",
            },
            {
              q: "How do I calculate fill for an irregular area?",
              a: "Use the Custom Area mode. Calculate the area of your irregular shape using the Polygon Area Calculator, then enter that area value along with the fill depth to get the volume estimate.",
            },
            {
              q: "What compaction factor should I use for road base?",
              a: "Road base typically requires heavy compaction (×1.30) because the material must be densely packed to support traffic loads. Foundation pads use moderate compaction (×1.20), while garden beds and landscaping use loose compaction (×1.10).",
            },
            {
              q: "How accurate is the truckload estimate?",
              a: "The truckload estimate uses default capacities by soil type (7–9 m³) and rounds up to the nearest whole truck. Actual truck capacity varies by vehicle — enter your specific truck capacity in the optional field for a more accurate estimate.",
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

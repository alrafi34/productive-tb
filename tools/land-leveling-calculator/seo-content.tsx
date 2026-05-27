import React from "react";

export default function LandLevelingCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Land Leveling Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Land Leveling Calculator</strong> estimates the volume of soil that must be removed (cut) or added (fill) to bring uneven ground to a uniform target elevation. Accurate earthwork estimation is essential for construction site preparation, agricultural land grading, road development, and landscaping projects.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports two methods: the <strong>Simple Average Elevation Method</strong> for quick estimates using overall land dimensions and average elevations, and the <strong>Grid-Based Method</strong> for precise calculations using survey elevation data across a grid of measurement points.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Results include total fill volume, total cut volume, net earthwork balance, and optional compaction-adjusted volumes — all in cubic feet, cubic meters, or cubic yards.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Land Leveling Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Simple Method</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select Feet or Meters as your input unit",
                "Enter the land length and width",
                "Enter the current average ground elevation",
                "Enter the desired target elevation",
                "Optionally set a compaction factor (default 1.0)",
                "View instant fill or cut volume results",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Grid Method</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Switch to Grid mode",
                "Enter elevation readings row by row, comma-separated",
                "Set the cell size (spacing between survey points)",
                "Enter the target elevation",
                "View the cut/fill heatmap and volume breakdown",
                "Export results as CSV for further analysis",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Calculation Formulas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Formula</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Simple – Area",    "Length × Width",                          "Land area in unit²"],
                ["Simple – Volume",  "Area × |Target − Current Elevation|",     "Fill or cut volume"],
                ["Simple – Fill",    "Volume when Target > Current",            "Fill required"],
                ["Simple – Cut",     "Volume when Target < Current",            "Cut required"],
                ["Grid – Cell Vol",  "Cell Area × |Target − Cell Elevation|",   "Per-cell volume"],
                ["Grid – Total",     "Σ Fill Cell Volumes / Σ Cut Cell Volumes","Total fill & cut"],
                ["Compaction Adj.",  "Volume × Compaction Factor",              "Adjusted volume"],
              ].map(([method, formula, result]) => (
                <tr key={method} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{method}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{formula}</td>
                  <td className="py-3 px-4 text-gray-700 text-xs">{result}</td>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Inputs</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Building pad",     "100×80 ft, current 2 ft, target 5 ft",   "Fill: 24,000 ft³"],
                ["Farm leveling",    "50×30 m, current 8 m, target 6 m",       "Cut: 3,000 m³"],
                ["Road grading",     "200×20 ft, current 3 ft, target 4 ft",   "Fill: 4,000 ft³"],
                ["Landscape grade",  "Grid 3×3, cell 5 ft, target 2.7",        "Mixed cut & fill"],
                ["Site prep",        "150×100 ft, current 5 ft, target 5 ft",  "No leveling required"],
              ].map(([project, inputs, result]) => (
                <tr key={project} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{project}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 text-xs">{inputs}</td>
                  <td className="py-3 px-4 font-semibold text-primary text-xs">{result}</td>
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
            { icon: "👷", title: "Civil Engineers",    desc: "Calculate earthwork volumes for site grading, road construction, and drainage design." },
            { icon: "🏗️", title: "Contractors",        desc: "Estimate cut and fill quantities for accurate project bidding and material ordering." },
            { icon: "🌾", title: "Farmers",            desc: "Level agricultural land for uniform irrigation, drainage, and crop yield improvement." },
            { icon: "🏠", title: "Property Owners",    desc: "Plan yard grading, foundation preparation, and drainage correction projects." },
            { icon: "📐", title: "Surveyors",          desc: "Convert survey elevation data into actionable earthwork volume estimates." },
            { icon: "🌿", title: "Landscapers",        desc: "Estimate soil movement for terracing, berms, and landscape grading projects." },
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
              q: "What is the difference between cut and fill in land leveling?",
              a: "Cut refers to soil that must be removed (excavated) from areas that are above the target elevation. Fill refers to soil that must be added to areas that are below the target elevation. Balancing cut and fill minimizes the need to import or export material, reducing project cost.",
            },
            {
              q: "When should I use the Simple method vs. the Grid method?",
              a: "Use the Simple method for quick estimates when you have a single average elevation for the entire site. Use the Grid method when you have survey data with multiple elevation readings across the site — this gives a much more accurate estimate for uneven terrain.",
            },
            {
              q: "What is a compaction factor and when should I apply it?",
              a: "A compaction factor accounts for the fact that loose fill material settles after placement. A factor of 1.2 means you need to order 20% more material than the calculated volume to achieve the desired final elevation. Apply it when ordering fill material for construction or agricultural projects.",
            },
            {
              q: "How do I enter grid elevation data?",
              a: "Enter elevation values row by row, with values in each row separated by commas. Each row represents a line of survey points. All rows must have the same number of values. For example: '2.1, 2.3, 2.5' on the first line, '2.2, 2.4, 2.8' on the second line.",
            },
            {
              q: "What does the heatmap show?",
              a: "The heatmap visualizes each grid cell colored by whether it needs fill (blue) or cut (orange). Darker colors indicate larger elevation differences. This helps identify which areas of the site require the most earthwork.",
            },
            {
              q: "How accurate is this calculator?",
              a: "The Simple method provides a reasonable estimate for relatively flat sites with a known average elevation. The Grid method is more accurate for uneven terrain. For large or complex projects, always verify results with a licensed surveyor or civil engineer.",
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

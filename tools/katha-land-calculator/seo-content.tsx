import React from "react";

export default function KathaLandCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      {/* What is Section */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Katha Land Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Katha Land Calculator</strong> is a specialized tool for converting land area measurements
            between Katha and other units such as Decimal, Bigha, Acre, Square Feet, Square Meter, and Hectare.
            Katha is a traditional land measurement unit widely used across South Asia, particularly in
            Bangladesh, West Bengal, Bihar, and Nepal.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Because the value of 1 Katha varies by region — for example, 1 Katha equals 720 sq ft in Bangladesh
            and West Bengal, 1,361.25 sq ft in Bihar, and 3,645 sq ft in Nepal — this calculator lets you
            select your regional standard for accurate results.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you are buying land, preparing legal documents, or studying land measurement systems,
            this tool provides instant, accurate conversions across all major units and regional standards.
          </p>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Katha Land Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the land area value in the input field",
                "Select the unit you are converting from (e.g. Decimal, Katha, Acre)",
                "Choose your regional standard (Bangladesh, West Bengal, Bihar, or Nepal)",
                "View instant conversions across all units simultaneously",
                "Copy, save, or export your results",
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Tips</h3>
            <ul className="space-y-2 text-gray-700">
              {[
                "Results update automatically as you type",
                "Use preset buttons for common values",
                "Switch regions instantly to compare standards",
                "Save calculations to history for reference",
                "Export results as a text file",
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

      {/* Regional Standards */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Regional Katha Standards
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Region</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">1 Katha (sq ft)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">1 Bigha (sq ft)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Katha per Bigha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">Bangladesh</td>
                <td className="py-3 px-4 font-mono">720</td>
                <td className="py-3 px-4 font-mono">14,400</td>
                <td className="py-3 px-4 font-mono">20</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">West Bengal</td>
                <td className="py-3 px-4 font-mono">720</td>
                <td className="py-3 px-4 font-mono">14,400</td>
                <td className="py-3 px-4 font-mono">20</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">Bihar</td>
                <td className="py-3 px-4 font-mono">1,361.25</td>
                <td className="py-3 px-4 font-mono">27,225</td>
                <td className="py-3 px-4 font-mono">20</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">Nepal</td>
                <td className="py-3 px-4 font-mono">3,645</td>
                <td className="py-3 px-4 font-mono">72,900</td>
                <td className="py-3 px-4 font-mono">20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Note: 1 Decimal = 435.6 sq ft and 1 Acre = 43,560 sq ft are consistent across all regions.
        </p>
      </section>

      {/* Common Conversions */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Katha Conversions (Bangladesh Standard)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Katha</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Decimal</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Sq Feet</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Acre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                [1, 1.653, 720, 0.01653],
                [5, 8.264, 3600, 0.08264],
                [10, 16.529, 7200, 0.16529],
                [20, 33.058, 14400, 0.33058],
                [60, 99.174, 43200, 0.99174],
              ].map(([k, d, sf, ac]) => (
                <tr key={k} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-semibold">{k}</td>
                  <td className="py-3 px-4 font-mono">{d}</td>
                  <td className="py-3 px-4 font-mono">{Number(sf).toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono">{ac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🌾", title: "Farmers", color: "green", desc: "Calculate crop field sizes and plan agricultural land use across different regional measurement systems." },
            { icon: "🏠", title: "Real Estate", color: "blue", desc: "Convert property sizes for listings, valuations, and client communications across South Asian markets." },
            { icon: "📐", title: "Surveyors", color: "purple", desc: "Prepare accurate land survey documents with precise measurements in all required units." },
            { icon: "🏗️", title: "Developers", color: "orange", desc: "Plan construction projects and calculate land requirements using local measurement standards." },
            { icon: "🎓", title: "Students", color: "red", desc: "Learn and practice land measurement conversions for academic and professional purposes." },
            { icon: "⚖️", title: "Legal Work", color: "gray", desc: "Prepare accurate land documentation and legal papers with verified measurement conversions." },
          ].map(({ icon, title, color, desc }) => (
            <div key={title} className={`bg-${color}-50 border border-${color}-200 rounded-lg p-6`}>
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className={`font-semibold text-${color}-900 mb-2`}>{title}</h3>
              <p className={`text-sm text-${color}-800`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "How many square feet is 1 Katha in Bangladesh?",
              a: "In Bangladesh, 1 Katha equals 720 square feet. This is the same standard used in West Bengal, India.",
            },
            {
              q: "How many Decimal is 1 Katha?",
              a: "In Bangladesh standard, 1 Katha = 720 sq ft and 1 Decimal = 435.6 sq ft, so 1 Katha ≈ 1.653 Decimal.",
            },
            {
              q: "How many Katha in 1 Bigha?",
              a: "In Bangladesh and West Bengal, 1 Bigha = 20 Katha. In Bihar, 1 Bigha = 20 Katha (but each Katha is larger). In Nepal, 1 Bigha = 20 Katha as well.",
            },
            {
              q: "Why does 1 Katha differ by region?",
              a: "Katha is a traditional unit that evolved independently in different regions before standardization. Each region adopted its own value based on historical land administration practices.",
            },
            {
              q: "How many Katha in 1 Acre (Bangladesh)?",
              a: "1 Acre = 43,560 sq ft. In Bangladesh, 1 Katha = 720 sq ft, so 1 Acre ≈ 60.5 Katha.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 4 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-700">{a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

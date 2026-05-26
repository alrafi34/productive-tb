import React from "react";

export default function BighaLandCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      {/* What is Section */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Bigha Land Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Bigha Land Calculator</strong> is a specialized tool for converting land area measurements
            between Bigha and other units such as Katha, Decimal, Acre, Square Feet, Square Meter, and Hectare.
            Bigha is a traditional land measurement unit widely used across South Asia, particularly in
            Bangladesh, West Bengal, Assam, Nepal, and other Indian states.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Because the value of 1 Bigha varies by region — for example, 1 Bigha equals 14,400 sq ft in
            Bangladesh, West Bengal, and Assam, but 72,900 sq ft in Nepal — this calculator lets you select
            your regional standard for accurate results.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The tool also supports a <strong>Custom mode</strong> where you can define your own Bigha value
            in square feet, making it flexible for any regional variation not covered by the presets.
          </p>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Bigha Land Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the land area value in the input field",
                "Select the unit you are converting from (e.g. Decimal, Katha, Acre)",
                "Choose your regional standard (Bangladesh, West Bengal, Assam, Nepal, or Custom)",
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
                "Use preset buttons for common Bigha values",
                "Switch regions instantly to compare standards",
                "Use Custom mode for non-standard Bigha sizes",
                "Save calculations to history for reference",
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

      {/* Regional Standards Table */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Regional Bigha Standards
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Region</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">1 Bigha (sq ft)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">1 Katha (sq ft)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Katha per Bigha</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Bigha per Acre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Bangladesh",  "14,400", "720",   "20", "3.025"],
                ["West Bengal", "14,400", "720",   "20", "3.025"],
                ["Assam",       "14,400", "720",   "20", "3.025"],
                ["Nepal",       "72,900", "3,645", "20", "0.597"],
              ].map(([region, bigha, katha, kpb, bpa]) => (
                <tr key={region} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{region}</td>
                  <td className="py-3 px-4 font-mono">{bigha}</td>
                  <td className="py-3 px-4 font-mono">{katha}</td>
                  <td className="py-3 px-4 font-mono">{kpb}</td>
                  <td className="py-3 px-4 font-mono">{bpa}</td>
                </tr>
              ))}
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
          Common Bigha Conversions (Bangladesh Standard)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Bigha</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Katha</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Decimal</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Sq Feet</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Acre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                [0.5,  10,  16.53,  7200,   0.165],
                [1,    20,  33.06,  14400,  0.330],
                [2,    40,  66.12,  28800,  0.661],
                [5,    100, 165.29, 72000,  1.653],
                [10,   200, 330.58, 144000, 3.306],
                [20,   400, 661.16, 288000, 6.612],
              ].map(([b, k, d, sf, ac]) => (
                <tr key={b} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-semibold">{b}</td>
                  <td className="py-3 px-4 font-mono">{k}</td>
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
            { icon: "🌾", bg: "green",  title: "Farmers",       desc: "Calculate crop field sizes and plan agricultural land use across different regional measurement systems." },
            { icon: "🏠", bg: "blue",   title: "Real Estate",   desc: "Convert property sizes for listings, valuations, and client communications across South Asian markets." },
            { icon: "📐", bg: "purple", title: "Surveyors",     desc: "Prepare accurate land survey documents with precise measurements in all required units." },
            { icon: "🏗️", bg: "orange", title: "Developers",    desc: "Plan construction projects and calculate land requirements using local measurement standards." },
            { icon: "🎓", bg: "red",    title: "Students",      desc: "Learn and practice land measurement conversions for academic and professional purposes." },
            { icon: "⚖️", bg: "gray",   title: "Legal Work",    desc: "Prepare accurate land documentation and legal papers with verified measurement conversions." },
          ].map(({ icon, bg, title, desc }) => (
            <div key={title} className={`bg-${bg}-50 border border-${bg}-200 rounded-lg p-6`}>
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className={`font-semibold text-${bg}-900 mb-2`}>{title}</h3>
              <p className={`text-sm text-${bg}-800`}>{desc}</p>
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
              q: "How many square feet is 1 Bigha in Bangladesh?",
              a: "In Bangladesh, 1 Bigha equals 14,400 square feet. This is the same standard used in West Bengal and Assam.",
            },
            {
              q: "How many Katha is 1 Bigha?",
              a: "In Bangladesh, West Bengal, and Assam, 1 Bigha = 20 Katha. In Nepal, 1 Bigha = 20 Katha as well, but each Katha is larger (3,645 sq ft).",
            },
            {
              q: "How many Bigha in 1 Acre (Bangladesh)?",
              a: "1 Acre = 43,560 sq ft. In Bangladesh, 1 Bigha = 14,400 sq ft, so 1 Acre ≈ 3.025 Bigha.",
            },
            {
              q: "How many Decimal is 1 Bigha?",
              a: "In Bangladesh standard, 1 Bigha = 14,400 sq ft and 1 Decimal = 435.6 sq ft, so 1 Bigha ≈ 33.06 Decimal.",
            },
            {
              q: "Why does 1 Bigha differ by region?",
              a: "Bigha is a traditional unit that evolved independently in different regions before standardization. Each region adopted its own value based on historical land administration practices.",
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

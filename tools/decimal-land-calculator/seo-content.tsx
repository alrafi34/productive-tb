import React from "react";

export default function DecimalLandCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      {/* What is Section */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Decimal Land Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Decimal Land Calculator</strong> is a specialized tool for converting land area measurements
            between Decimal and other units such as Acre, Katha, Bigha, Square Feet, Square Meter, Hectare,
            Shotok, and Cent. Decimal is a widely used land measurement unit across South Asia, particularly
            in Bangladesh, West Bengal, and other parts of India.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            One Decimal equals 435.6 square feet, and 100 Decimal equals 1 Acre. This consistent relationship
            makes Decimal a practical base unit for land calculations. The calculator supports regional presets
            for Bangladesh, West Bengal, Bihar, Nepal, and Global Standard to ensure accurate conversions
            based on local measurement systems.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you are buying or selling land, preparing legal documents, or working in real estate,
            agriculture, or construction, this tool provides instant, accurate conversions across all major
            land measurement units.
          </p>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Decimal Land Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter the land area value in the input field",
                "Select the unit you are converting from (e.g. Decimal, Acre, Katha)",
                "Choose your regional standard (Bangladesh, West Bengal, Bihar, Nepal, or Global)",
                "View instant conversions across all 9 units simultaneously",
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

      {/* Conversion Reference */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Decimal Conversion Reference (Bangladesh Standard)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Decimal</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Acre</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Sq Feet</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Sq Meter</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Katha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                [1, 0.01, 435.6, 40.47, 0.605],
                [5, 0.05, 2178, 202.34, 3.025],
                [10, 0.1, 4356, 404.69, 6.05],
                [20, 0.2, 8712, 809.37, 12.1],
                [100, 1, 43560, 4046.86, 60.5],
              ].map(([d, ac, sf, sm, k]) => (
                <tr key={d} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono font-semibold">{d}</td>
                  <td className="py-3 px-4 font-mono">{ac}</td>
                  <td className="py-3 px-4 font-mono">{Number(sf).toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono">{sm}</td>
                  <td className="py-3 px-4 font-mono">{k}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Regional Standards */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Regional Land Measurement Standards
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Region</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">1 Decimal (sq ft)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">1 Katha (sq ft)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">1 Bigha (sq ft)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">Bangladesh</td>
                <td className="py-3 px-4 font-mono">435.6</td>
                <td className="py-3 px-4 font-mono">720</td>
                <td className="py-3 px-4 font-mono">14,400</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">West Bengal</td>
                <td className="py-3 px-4 font-mono">435.6</td>
                <td className="py-3 px-4 font-mono">720</td>
                <td className="py-3 px-4 font-mono">14,400</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">Bihar</td>
                <td className="py-3 px-4 font-mono">435.6</td>
                <td className="py-3 px-4 font-mono">1,361.25</td>
                <td className="py-3 px-4 font-mono">27,225</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">Nepal</td>
                <td className="py-3 px-4 font-mono">435.6</td>
                <td className="py-3 px-4 font-mono">3,645</td>
                <td className="py-3 px-4 font-mono">72,900</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Note: 1 Decimal = 435.6 sq ft and 1 Acre = 100 Decimal = 43,560 sq ft are consistent across all regions.
        </p>
      </section>

      {/* Use Cases */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Real Estate", color: "blue", desc: "Convert property sizes for listings, valuations, and client communications across South Asian markets." },
            { icon: "🌾", title: "Farmers", color: "green", desc: "Calculate crop field sizes and plan agricultural land use across different regional measurement systems." },
            { icon: "📐", title: "Surveyors", color: "purple", desc: "Prepare accurate land survey documents with precise measurements in all required units." },
            { icon: "🏗️", title: "Developers", color: "orange", desc: "Plan construction projects and calculate land requirements using local measurement standards." },
            { icon: "⚖️", title: "Legal Work", color: "red", desc: "Prepare accurate land documentation and legal papers with verified measurement conversions." },
            { icon: "🎓", title: "Students", color: "gray", desc: "Learn and practice land measurement conversions for academic and professional purposes." },
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
              q: "How many square feet is 1 Decimal?",
              a: "1 Decimal equals 435.6 square feet. This is consistent across all regions — Bangladesh, West Bengal, Bihar, Nepal, and globally.",
            },
            {
              q: "How many Decimal in 1 Acre?",
              a: "1 Acre = 100 Decimal. Since 1 Acre = 43,560 sq ft and 1 Decimal = 435.6 sq ft, dividing gives exactly 100 Decimal per Acre.",
            },
            {
              q: "How many Decimal in 1 Katha (Bangladesh)?",
              a: "In Bangladesh, 1 Katha = 720 sq ft and 1 Decimal = 435.6 sq ft, so 1 Katha ≈ 1.653 Decimal.",
            },
            {
              q: "What is the difference between Decimal and Shotok?",
              a: "Shotok and Decimal are essentially the same unit in Bangladesh — both equal 435.6 square feet. The term 'Shotok' is the Bengali word for 'Decimal'.",
            },
            {
              q: "How many Decimal in 1 Bigha (Bangladesh)?",
              a: "In Bangladesh, 1 Bigha = 14,400 sq ft and 1 Decimal = 435.6 sq ft, so 1 Bigha ≈ 33.06 Decimal.",
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

import React from "react";

export default function FertilizerRequirementCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Fertilizer Requirement Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Fertilizer Requirement Calculator</strong> is an agricultural tool that helps farmers,
            gardeners, and agricultural consultants estimate the exact amount of fertilizer needed for crops
            based on land size, crop type, and nutrient requirements. It calculates how much Urea, DAP, NPK,
            or other fertilizers you need to achieve optimal crop nutrition.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator uses scientific formulas to determine fertilizer quantities based on Nitrogen (N),
            Phosphorus (P), and Potassium (K) requirements. Simply enter your land area, select your crop,
            choose your fertilizer type, and get instant calculations with application recommendations.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All calculations happen instantly in your browser with no data sent to any server. The tool
            supports multiple area units, currencies, and provides detailed recommendations for optimal
            fertilizer application timing and methods.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Fertilizer Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter your land area (e.g., 2 acres, 5 hectares)",
                "Select the area unit (acre, hectare, sq ft, sq m)",
                "Choose your crop type from the dropdown",
                "Select your fertilizer type (Urea, DAP, NPK, etc.)",
                "Review auto-filled nutrient requirements",
                "Adjust fertilizer composition if using custom blend",
                "View instant fertilizer quantity and cost estimates",
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
                "Real-time fertilizer calculation",
                "Pre-loaded crop nutrient requirements",
                "Multiple fertilizer types (Urea, DAP, MOP, NPK)",
                "Area unit conversion (acre, hectare, sq ft, sq m)",
                "Cost estimation with price input",
                "Application timing recommendations",
                "Calculation history and export",
                "Multi-currency support",
                "Mobile-friendly interface",
                "Offline browser calculations",
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
          Fertilizer Calculation Formula
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Formula</h3>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm space-y-2">
              <div>Fertilizer Required = Nutrient Requirement ÷ Nutrient %</div>
              <div className="text-gray-500 text-xs mt-2 space-y-1 font-sans">
                <div>Required Fertilizer (kg) = Required Nutrient ÷ (Nutrient % / 100)</div>
                <div>Total = Fertilizer per Acre × Land Area</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Example Calculation</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-semibold text-blue-900 mb-1">Rice: 2 acres, 60 kg N/acre, Urea (46% N)</div>
                <div className="font-mono">60 ÷ 0.46 = 130.43 kg/acre</div>
                <div className="font-mono">130.43 × 2 = <strong>260.87 kg Urea</strong></div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-semibold text-green-900 mb-1">Wheat: 5 acres, 25 kg P/acre, DAP (46% P)</div>
                <div className="font-mono">25 ÷ 0.46 = 54.35 kg/acre</div>
                <div className="font-mono">54.35 × 5 = <strong>271.74 kg DAP</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Fertilizer Types & Compositions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Fertilizer Type</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">Nitrogen (N)</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">Phosphorus (P)</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">Potassium (K)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Urea", "46%", "0%", "0%", "Nitrogen boost, leafy growth"],
                ["DAP (Diammonium Phosphate)", "18%", "46%", "0%", "Root development, flowering"],
                ["MOP (Muriate of Potash)", "0%", "0%", "60%", "Fruit quality, disease resistance"],
                ["NPK 10-10-10", "10%", "10%", "10%", "Balanced nutrition, general use"],
                ["NPK 20-20-20", "20%", "20%", "20%", "High nutrition crops, vegetables"],
                ["Organic Compost", "2%", "1%", "1%", "Soil health, sustainable farming"],
              ].map(([type, n, p, k, use]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{type}</td>
                  <td className="py-3 px-4 text-center font-mono text-primary">{n}</td>
                  <td className="py-3 px-4 text-center font-mono text-orange-600">{p}</td>
                  <td className="py-3 px-4 text-center font-mono text-green-600">{k}</td>
                  <td className="py-3 px-4 text-gray-600">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Crop Nutrient Requirements (per Acre)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Crop</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">Nitrogen (kg)</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">Phosphorus (kg)</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">Potassium (kg)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Growth Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Rice", "60", "25", "30", "Tillering, Panicle initiation"],
                ["Wheat", "80", "30", "40", "Crown root, Boot stage"],
                ["Corn/Maize", "120", "40", "60", "V6-V8, Tasseling"],
                ["Tomato", "100", "50", "80", "Flowering, Fruit development"],
                ["Potato", "90", "35", "120", "Tuber initiation, Bulking"],
                ["Mixed Vegetables", "70", "30", "50", "Vegetative, Reproductive"],
              ].map(([crop, n, p, k, stage]) => (
                <tr key={crop} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{crop}</td>
                  <td className="py-3 px-4 text-center font-mono text-primary">{n}</td>
                  <td className="py-3 px-4 text-center font-mono text-orange-600">{p}</td>
                  <td className="py-3 px-4 text-center font-mono text-green-600">{k}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{stage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          * These are general recommendations. Actual requirements may vary based on soil test results, climate, and variety.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "👨‍🌾", title: "Farmers",              color: "green",  desc: "Calculate exact fertilizer quantities for field crops and maximize yield." },
            { icon: "🌱", title: "Home Gardeners",       color: "blue",   desc: "Determine fertilizer needs for vegetable gardens and flower beds." },
            { icon: "🎓", title: "Agricultural Students", color: "purple", desc: "Learn fertilizer calculations and crop nutrition principles." },
            { icon: "🔬", title: "Agronomists",          color: "orange", desc: "Provide scientific fertilizer recommendations to farmers." },
            { icon: "🏢", title: "Agricultural Consultants", color: "red", desc: "Advise clients on optimal fertilizer programs and costs." },
            { icon: "📊", title: "Crop Researchers",     color: "gray",   desc: "Calculate fertilizer inputs for field trials and experiments." },
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
              q: "How is fertilizer requirement calculated?",
              a: "Fertilizer requirement is calculated using the formula: Required Fertilizer (kg) = Nutrient Requirement (kg) ÷ (Nutrient Percentage in Fertilizer / 100). The total is then multiplied by your land area.",
            },
            {
              q: "What does NPK mean in fertilizers?",
              a: "NPK stands for Nitrogen (N), Phosphorus (P), and Potassium (K) – the three primary nutrients plants need. The numbers like 10-10-10 represent the percentage of each nutrient in the fertilizer.",
            },
            {
              q: "When should I apply fertilizer to my crops?",
              a: "Timing varies by crop. Generally, apply nitrogen in split doses during active growth, phosphorus at planting for root development, and potassium throughout the growing season. The calculator provides specific timing recommendations for each crop.",
            },
            {
              q: "Can I use this calculator for organic farming?",
              a: "Yes! The calculator includes organic compost as an option and you can input custom organic fertilizer compositions. Organic fertilizers typically have lower nutrient percentages, so you'll need larger quantities.",
            },
            {
              q: "How accurate are the crop nutrient requirements?",
              a: "The preset values are based on general agricultural recommendations. For best results, conduct a soil test to determine your specific soil's nutrient levels and adjust accordingly.",
            },
            {
              q: "What if I'm using multiple fertilizer types?",
              a: "Calculate each fertilizer separately based on the specific nutrient it provides. For example, use Urea for nitrogen needs and DAP for phosphorus needs, then combine the application schedules.",
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
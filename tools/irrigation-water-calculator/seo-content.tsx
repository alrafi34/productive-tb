import React from "react";

export default function IrrigationWaterCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is an Irrigation Water Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            An <strong>Irrigation Water Calculator</strong> is an agricultural planning tool that helps farmers,
            landowners, and irrigation engineers estimate the daily water requirement for crops based on land
            size, crop type, soil conditions, climate, and irrigation method. It uses evapotranspiration-based
            formulas to deliver accurate water estimates instantly.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The calculator applies the standard FAO Penman-Monteith approach simplified for field use:
            multiplying the reference evapotranspiration (ET₀) by the crop coefficient (Kc), soil adjustment
            factor, and growth stage factor, then dividing by irrigation efficiency to get the gross water
            requirement per unit area.
          </p>
          <p className="text-gray-700 leading-relaxed">
            All calculations run entirely in your browser with no data sent to any server. The tool supports
            five area units, ten crop types, four soil types, four climate zones, four irrigation methods,
            and four growth stages — covering most real-world irrigation planning scenarios.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Irrigation Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Enter your land area and select the unit (acre, hectare, sq m, sq ft, decimal)",
                "Choose your crop type from the dropdown",
                "Select soil type — affects water retention",
                "Pick the climate zone for your region",
                "Choose your irrigation method",
                "Select the current crop growth stage",
                "Optionally enter recent rainfall to reduce the estimate",
                "View instant daily, weekly, and monthly water requirements",
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
                "Real-time irrigation calculation",
                "10 crop types with preset coefficients",
                "4 soil types with retention factors",
                "4 climate zones with ET values",
                "4 irrigation methods with efficiency rates",
                "Growth stage adjustment",
                "Rainfall reduction support",
                "Daily, weekly, and monthly estimates",
                "Calculation history with LocalStorage",
                "Export results as TXT",
                "Mobile-friendly for field use",
                "100% offline browser calculations",
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
          Irrigation Water Calculation Formula
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Core Formula</h3>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm space-y-2">
              <div>Water Depth = (ET₀ × Kc × Soil × Stage) ÷ Efficiency</div>
              <div className="text-gray-500 text-xs mt-2 font-sans space-y-1">
                <div>ET₀ = Reference Evapotranspiration (mm/day)</div>
                <div>Kc = Crop Coefficient</div>
                <div>Soil = Soil Adjustment Factor</div>
                <div>Stage = Growth Stage Factor</div>
                <div>Efficiency = Irrigation Method Efficiency</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
              Volume (liters) = Water Depth (mm) × Area (m²)
              <br />
              <span className="text-blue-600">1 mm over 1 m² = 1 liter</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Example Calculation</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-semibold text-blue-900 mb-1">Rice · 2 Acres · Hot · Clay · Drip</div>
                <div className="font-mono text-xs space-y-0.5">
                  <div>ET₀ = 6 mm/day (Hot)</div>
                  <div>Kc = 1.20 (Rice)</div>
                  <div>Soil = 0.90 (Clay)</div>
                  <div>Efficiency = 0.90 (Drip)</div>
                  <div>Depth = (6 × 1.20 × 0.90) ÷ 0.90 = 7.2 mm/day</div>
                  <div>Area = 2 acres = 8,094 m²</div>
                  <div className="font-bold text-blue-900">Volume = 7.2 × 8,094 ≈ 58,277 L/day</div>
                </div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-semibold text-green-900 mb-1">Wheat · 1 Hectare · Moderate · Sandy</div>
                <div className="font-mono text-xs space-y-0.5">
                  <div>ET₀ = 4 mm/day · Kc = 1.10 · Soil = 1.20</div>
                  <div>Depth = (4 × 1.10 × 1.20) ÷ 0.90 = 5.87 mm/day</div>
                  <div className="font-bold text-green-900">Volume = 5.87 × 10,000 ≈ 58,667 L/day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Reference ET Values by Climate
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Climate Zone</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-800">ET₀ (mm/day)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Typical Regions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Avg. Temperature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Cold", "2", "Northern Europe, Canada, high altitude", "< 10°C"],
                ["Moderate", "4", "Central US, Central Europe, temperate zones", "10–25°C"],
                ["Hot", "6", "Southern US, Mediterranean, subtropical", "25–35°C"],
                ["Very Hot", "8", "Middle East, tropical, arid regions", "> 35°C"],
              ].map(([zone, et, regions, temp]) => (
                <tr key={zone} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{zone}</td>
                  <td className="py-3 px-4 text-center font-mono text-primary font-semibold">{et}</td>
                  <td className="py-3 px-4 text-gray-600">{regions}</td>
                  <td className="py-3 px-4 text-gray-600">{temp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Crop Coefficients (Kc) & Irrigation Efficiency
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Crop Coefficients</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Crop</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700">Kc</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Water Need</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Sugarcane", "1.25", "Very High"],
                    ["Rice", "1.20", "Very High"],
                    ["Banana", "1.20", "Very High"],
                    ["Cotton", "1.15", "High"],
                    ["Wheat", "1.10", "High"],
                    ["Potato", "1.05", "Medium-High"],
                    ["Corn", "0.95", "Medium"],
                    ["Tomato", "1.00", "Medium"],
                    ["Vegetables", "0.90", "Medium"],
                    ["Custom", "1.00", "Variable"],
                  ].map(([crop, kc, need]) => (
                    <tr key={crop} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium">{crop}</td>
                      <td className="py-2 px-3 text-center font-mono text-primary">{kc}</td>
                      <td className="py-2 px-3 text-gray-600 text-xs">{need}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Irrigation Method Efficiency</h3>
            <div className="space-y-3">
              {[
                { method: "Drip Irrigation", eff: 90, color: "green", desc: "Water delivered directly to roots. Minimal evaporation." },
                { method: "Sprinkler", eff: 75, color: "blue", desc: "Overhead spray. Some evaporation loss." },
                { method: "Surface Irrigation", eff: 60, color: "yellow", desc: "Water flows across field. Moderate losses." },
                { method: "Flood Irrigation", eff: 50, color: "red", desc: "Field flooded. Highest water loss." },
              ].map(({ method, eff, color, desc }) => (
                <div key={method} className={`p-3 bg-${color}-50 border border-${color}-200 rounded-lg`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold text-${color}-900 text-sm`}>{method}</span>
                    <span className={`font-bold text-${color}-700`}>{eff}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                    <div className={`bg-${color}-500 h-1.5 rounded-full`} style={{ width: `${eff}%` }} />
                  </div>
                  <p className={`text-xs text-${color}-700`}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "👨‍🌾", title: "Farmers",                  color: "green",  desc: "Plan daily irrigation schedules and reduce water waste on farm fields." },
            { icon: "🌾", title: "Agricultural Engineers",    color: "blue",   desc: "Design irrigation systems with accurate water demand estimates." },
            { icon: "🏡", title: "Landowners",                color: "purple", desc: "Estimate water costs and infrastructure needs for agricultural land." },
            { icon: "📐", title: "Irrigation Planners",       color: "orange", desc: "Size pumps, pipes, and reservoirs based on calculated water demand." },
            { icon: "🎓", title: "Agriculture Students",      color: "red",    desc: "Learn evapotranspiration concepts and irrigation planning principles." },
            { icon: "🔬", title: "Researchers",               color: "gray",   desc: "Calculate water inputs for field trials and crop experiments." },
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
              q: "How is irrigation water requirement calculated?",
              a: "The calculator uses the formula: Water Depth (mm/day) = (ET₀ × Kc × Soil Factor × Growth Stage Factor) ÷ Irrigation Efficiency. The volume in liters is then calculated by multiplying the depth by the land area in square meters (1 mm over 1 m² = 1 liter).",
            },
            {
              q: "What is evapotranspiration (ET)?",
              a: "Evapotranspiration is the combined water loss from soil evaporation and plant transpiration. The reference ET (ET₀) represents the water demand of a standard grass reference crop under given climate conditions. It ranges from 2 mm/day in cold climates to 8 mm/day in very hot, arid regions.",
            },
            {
              q: "What is a crop coefficient (Kc)?",
              a: "The crop coefficient (Kc) adjusts the reference ET for a specific crop's water use characteristics. High-water crops like rice and sugarcane have Kc values above 1.20, while drought-tolerant crops like vegetables have lower values around 0.90.",
            },
            {
              q: "How does soil type affect irrigation?",
              a: "Soil type affects water retention and drainage. Sandy soils drain quickly (factor 1.20, requiring more frequent irrigation), clay soils retain water longer (factor 0.90), loam is balanced (factor 1.00), and silty soils fall in between (factor 1.05).",
            },
            {
              q: "Why does irrigation method matter?",
              a: "Different methods deliver water with different efficiency. Drip irrigation is 90% efficient (water goes directly to roots), sprinkler is 75%, surface irrigation is 60%, and flood irrigation is only 50%. Less efficient methods require more gross water to deliver the same net amount to crops.",
            },
            {
              q: "How does rainfall reduce irrigation needs?",
              a: "Rainfall directly offsets the irrigation requirement. Enter the daily rainfall amount in mm, and the calculator subtracts it from the gross water depth needed. If rainfall exceeds the requirement, no irrigation is needed that day.",
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

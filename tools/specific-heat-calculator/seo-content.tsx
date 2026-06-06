import React from "react";

export default function SpecificHeatCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is Specific Heat?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Specific heat capacity</strong> is the amount of heat energy required to raise the temperature
            of 1 kilogram of a substance by 1 degree Celsius (or 1 Kelvin). It is a fundamental thermodynamic
            property that varies by material and determines how much energy a substance can store or release.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Water has one of the highest specific heat values (4,186 J/kg°C), which is why it is widely used
            as a coolant in engines and industrial processes. Metals like copper (385 J/kg°C) and aluminum
            (900 J/kg°C) have much lower values, meaning they heat up and cool down faster.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator uses the formula <strong>Q = m × c × ΔT</strong> and can solve for any of the
            four variables — heat energy, mass, specific heat capacity, or temperature change — given the
            other three.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Specific Heat Formula Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Primary Formula</h3>
              <div className="font-mono text-lg text-center bg-white border border-gray-200 rounded-lg p-4 mb-3">
                Q = m × c × ΔT
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>Q</strong> = Heat energy (Joules)</li>
                <li><strong>m</strong> = Mass (kilograms)</li>
                <li><strong>c</strong> = Specific heat capacity (J/kg°C)</li>
                <li><strong>ΔT</strong> = Temperature change (°C)</li>
              </ul>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Rearranged Forms</h3>
              <div className="space-y-2 text-sm font-mono">
                <div className="bg-white border border-gray-200 rounded p-2">m = Q / (c × ΔT)</div>
                <div className="bg-white border border-gray-200 rounded p-2">c = Q / (m × ΔT)</div>
                <div className="bg-white border border-gray-200 rounded p-2">ΔT = Q / (m × c)</div>
                <div className="bg-white border border-gray-200 rounded p-2">ΔT = T₂ − T₁</div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> A positive ΔT means the substance is being heated; a negative ΔT
            means it is being cooled. The formula works the same way in both cases.
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use This Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select the variable you want to calculate (Q, m, c, or ΔT)",
                "Choose a material preset or enter a custom specific heat value",
                "Enter the known values with their units",
                "Select the appropriate unit for each input",
                "Results update instantly as you type",
                "Use Copy Result or Export TXT to save your work",
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
                "Solve for Q, m, c, or ΔT in one tool",
                "10 material presets (Water, Aluminum, Copper, etc.)",
                "Mass units: kg, g, lb",
                "Heat units: J/kg°C, kJ/kg°C, cal/g°C",
                "Temperature units: °C, °F, K",
                "Multi-unit output: J, kJ, kcal, BTU",
                "Step-by-step calculation breakdown",
                "Calculation history with localStorage",
                "Export results as a TXT file",
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
          Common Specific Heat Values
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Material</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">c (J/kg°C)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">c (cal/g°C)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Water",    "4,186", "1.000", "Liquid"],
                ["Ice",      "2,090", "0.500", "Solid"],
                ["Air",      "1,005", "0.240", "Gas"],
                ["Aluminum", "900",   "0.215", "Metal"],
                ["Glass",    "840",   "0.201", "Non-metal"],
                ["Iron",     "450",   "0.107", "Metal"],
                ["Steel",    "490",   "0.117", "Metal"],
                ["Copper",   "385",   "0.092", "Metal"],
                ["Silver",   "235",   "0.056", "Metal"],
                ["Gold",     "129",   "0.031", "Metal"],
              ].map(([mat, j, cal, cat]) => (
                <tr key={mat} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">{mat}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{j}</td>
                  <td className="py-3 px-4 font-mono text-gray-600">{cal}</td>
                  <td className="py-3 px-4 text-gray-500">{cat}</td>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Scenario</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Inputs</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Heating water",       "m=2 kg, c=4186 J/kg°C, T₁=20°C, T₂=80°C",  "Q = 502,320 J"],
                ["Heating aluminum",    "m=5 kg, c=900 J/kg°C, T₁=25°C, T₂=100°C",  "Q = 337,500 J"],
                ["Cooling copper",      "m=0.5 kg, c=385 J/kg°C, T₁=90°C, T₂=10°C", "Q = −15,400 J"],
                ["Find mass of water",  "Q=418,600 J, c=4186 J/kg°C, ΔT=50°C",       "m = 2 kg"],
                ["Find specific heat",  "Q=9,000 J, m=2 kg, ΔT=10°C",                "c = 450 J/kg°C (Iron)"],
                ["Find temp change",    "Q=100,000 J, m=5 kg, c=4186 J/kg°C",         "ΔT ≈ 4.78°C"],
              ].map(([scenario, inputs, result]) => (
                <tr key={scenario} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">{scenario}</td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-600">{inputs}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Applications
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "🏭", title: "HVAC Engineering",      desc: "Calculate heating and cooling loads for buildings by determining how much energy is needed to change air or water temperature." },
            { icon: "🔬", title: "Laboratory Science",    desc: "Calorimetry experiments use specific heat to measure heat released or absorbed during chemical reactions." },
            { icon: "🚗", title: "Automotive Cooling",    desc: "Engine coolant systems rely on water's high specific heat to absorb and dissipate engine heat efficiently." },
            { icon: "🍳", title: "Food Processing",       desc: "Industrial food heating and pasteurization processes require precise heat energy calculations." },
            { icon: "⚡", title: "Electrical Engineering", desc: "Thermal management of electronics uses specific heat to predict component temperature rise under load." },
            { icon: "🎓", title: "Physics Education",     desc: "Specific heat is a core concept in thermodynamics, taught in high school and university physics courses." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="text-2xl mb-3">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
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
              q: "What is the difference between specific heat and heat capacity?",
              a: "Specific heat is an intensive property — it is the heat per unit mass per degree. Heat capacity is an extensive property — it is the total heat for a given object (Heat Capacity = m × c). This calculator uses specific heat capacity.",
            },
            {
              q: "Why does water have such a high specific heat?",
              a: "Water molecules form hydrogen bonds that require significant energy to break. This means water can absorb a large amount of heat before its temperature rises, making it an excellent coolant and thermal buffer in nature and engineering.",
            },
            {
              q: "What units does this calculator support?",
              a: "Mass: kg, g, lb. Specific heat: J/kg°C, kJ/kg°C, cal/g°C. Temperature: °C, °F, K. All inputs are automatically converted to SI units (kg, J/kg°C, °C) before calculation.",
            },
            {
              q: "Can I calculate cooling as well as heating?",
              a: "Yes. If the final temperature is lower than the initial temperature, ΔT will be negative, and Q will be negative — indicating heat is being removed from the substance rather than added.",
            },
            {
              q: "What is the SI unit for specific heat capacity?",
              a: "The SI unit is J/kg·K (joules per kilogram per Kelvin), which is numerically identical to J/kg°C since a change of 1 K equals a change of 1°C.",
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

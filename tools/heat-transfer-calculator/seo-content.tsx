import React from "react";

export default function HeatTransferCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is a Heat Transfer Calculator?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            A <strong>Heat Transfer Calculator</strong> is an engineering tool that computes the rate of thermal
            energy transfer between systems or surfaces. Heat transfer occurs through three fundamental mechanisms:
            conduction, convection, and radiation — each governed by a distinct physical law.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This calculator supports all three modes. For <strong>conduction</strong>, it applies Fourier&apos;s Law
            (Q = kAΔT/L). For <strong>convection</strong>, it uses Newton&apos;s Law of Cooling (Q = hAΔT). For
            <strong> radiation</strong>, it applies the Stefan-Boltzmann Law (Q = εσA(T₁⁴ − T₂⁴)).
          </p>
          <p className="text-gray-700 leading-relaxed">
            Results are displayed in Watts (W), kilowatts (kW), BTU/hr, and kcal/hr simultaneously, supporting
            both SI and imperial unit systems for global engineering use.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Heat Transfer Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select the transfer mode: Conduction, Convection, or Radiation",
                "Enter the required inputs for the selected mode",
                "Choose your preferred unit system (SI or Imperial)",
                "For conduction, use material presets to auto-fill conductivity",
                "View the heat transfer rate instantly in all units",
                "Save results to history or export as a TXT report",
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
                "Three heat transfer modes in one tool",
                "Material presets for conduction (Copper, Aluminum, Steel, etc.)",
                "Scenario presets for convection (Natural Air, Forced Air, Water)",
                "Emissivity slider for radiation inputs",
                "Automatic temperature unit conversion to Kelvin",
                "Multi-unit output: W, kW, BTU/hr, kcal/hr",
                "Calculation history with localStorage persistence",
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
          Heat Transfer Formulas Explained
        </h2>
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">🔥 Conduction</h3>
              <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                Q = (k × A × ΔT) / L
              </div>
              <p className="text-sm text-gray-600">
                Heat flows through a solid material. Higher conductivity (k) and larger area increase heat flow;
                greater thickness reduces it.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">💨 Convection</h3>
              <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                Q = h × A × ΔT
              </div>
              <p className="text-sm text-gray-600">
                Heat transfers between a surface and a moving fluid. The coefficient h depends on fluid type
                and flow conditions.
              </p>
            </div>
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">☀️ Radiation</h3>
              <div className="font-mono text-base text-center bg-white border border-gray-200 rounded-lg p-3 mb-3">
                Q = εσA(T₁⁴ − T₂⁴)
              </div>
              <p className="text-sm text-gray-600">
                Heat transfers via electromagnetic waves. Requires absolute temperatures in Kelvin.
                σ = 5.67×10⁻⁸ W/m²·K⁴.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <strong>Key insight:</strong> Radiation heat transfer scales with the fourth power of temperature,
            making it dominant at very high temperatures (e.g., furnaces, stars) while conduction and convection
            dominate at lower temperatures.
          </div>
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
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Mode</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Inputs</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Conduction", "k=205 W/m·K, A=2 m², ΔT=40°C, L=0.1 m", "164,000 W"],
                ["Conduction", "k=50 W/m·K (Steel), A=1 m², ΔT=100°C, L=0.05 m", "100,000 W"],
                ["Convection", "h=25 W/m²·K, A=5 m², ΔT=20°C", "2,500 W"],
                ["Convection", "h=500 W/m²·K (Water), A=0.5 m², ΔT=15°C", "3,750 W"],
                ["Radiation",  "ε=0.9, A=3 m², T₁=400 K, T₂=300 K", "≈2,237 W"],
                ["Radiation",  "ε=1.0, A=1 m², T₁=1000 K, T₂=300 K", "≈55,960 W"],
              ].map(([mode, inputs, result]) => (
                <tr key={mode + inputs} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">{mode}</td>
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
          Thermal Conductivity Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Material</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">k (W/m·K)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Copper",      "401",   "Metal"],
                ["Aluminum",    "205",   "Metal"],
                ["Steel",       "50",    "Metal"],
                ["Glass",       "1.05",  "Non-metal"],
                ["Concrete",    "1.7",   "Building material"],
                ["Wood",        "0.15",  "Building material"],
                ["Fiberglass",  "0.04",  "Insulation"],
                ["Air",         "0.026", "Gas"],
              ].map(([mat, k, cat]) => (
                <tr key={mat} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">{mat}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{k}</td>
                  <td className="py-3 px-4 text-gray-500">{cat}</td>
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
            { icon: "🏠", title: "Building Insulation",   color: "blue",   desc: "Calculate heat loss through walls, roofs, and windows to optimize insulation thickness and energy efficiency." },
            { icon: "❄️", title: "HVAC Systems",          color: "green",  desc: "Size heating and cooling equipment by calculating convective heat transfer between air and surfaces." },
            { icon: "💻", title: "Electronics Cooling",   color: "purple", desc: "Design heatsinks and cooling systems for CPUs, power electronics, and LED lighting." },
            { icon: "🏭", title: "Industrial Furnaces",   color: "orange", desc: "Radiation dominates at high temperatures. Calculate heat output from furnace walls and heating elements." },
            { icon: "🔬", title: "Material Science",      color: "red",    desc: "Compare thermal conductivity of materials to select the best option for heat exchangers or insulation." },
            { icon: "🎓", title: "Engineering Education", color: "gray",   desc: "Verify textbook problems and explore how changing parameters affects heat transfer rates." },
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
              q: "What is heat transfer?",
              a: "Heat transfer is the movement of thermal energy from a hotter region to a cooler one. It occurs through three mechanisms: conduction (through solids), convection (through fluids), and radiation (through electromagnetic waves).",
            },
            {
              q: "What is the Stefan-Boltzmann constant?",
              a: "The Stefan-Boltzmann constant (σ) equals 5.67×10⁻⁸ W/m²·K⁴. It appears in the radiation formula and relates the heat radiated by a blackbody to the fourth power of its absolute temperature.",
            },
            {
              q: "Why must radiation temperatures be in Kelvin?",
              a: "The Stefan-Boltzmann Law uses absolute temperatures raised to the fourth power. Celsius and Fahrenheit scales have arbitrary zero points, so they cannot be used directly. The calculator automatically converts °C and °F to Kelvin.",
            },
            {
              q: "What is emissivity?",
              a: "Emissivity (ε) is a dimensionless value between 0 and 1 that describes how efficiently a surface emits thermal radiation compared to a perfect blackbody (ε = 1). Polished metals have low emissivity (~0.05), while painted surfaces and most non-metals have high emissivity (~0.9).",
            },
            {
              q: "What is the difference between conduction and convection?",
              a: "Conduction transfers heat through direct molecular contact within a solid material. Convection transfers heat between a solid surface and a moving fluid (liquid or gas). Convection is generally faster than conduction in fluids because fluid motion carries heat away.",
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

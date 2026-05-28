import React from "react";

export default function FlowRateCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is Flow Rate?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Flow rate</strong> is the quantity of fluid (liquid or gas) that passes through a given cross-section per unit of time. It is one of the most fundamental parameters in fluid mechanics and is used across mechanical, civil, chemical, and HVAC engineering.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Volumetric flow rate (Q)</strong> measures the volume of fluid per unit time (e.g., m³/s, L/min, GPM). <strong>Mass flow rate (ṁ)</strong> measures the mass of fluid per unit time (e.g., kg/s, lb/min) and is calculated by multiplying volumetric flow rate by fluid density.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This calculator supports four engineering methods: Volume/Time (Q = V/t), Pipe Diameter + Velocity (Q = πd²v/4), Area + Velocity (Q = Av), and Mass Flow Rate (ṁ = ρQ). All inputs are automatically converted to SI units before calculation.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Flow Rate Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step-by-Step Guide</h3>
            <ol className="space-y-3 text-gray-700">
              {[
                "Select a calculation mode from the top selector",
                "Enter the required values for your chosen mode",
                "Select the appropriate units for each input",
                "Results update instantly as you type",
                "View the full conversion table below the result",
                "Copy, save, or export your calculation",
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
                "4 engineering calculation modes",
                "Real-time calculation as you type",
                "9 volumetric flow unit conversions",
                "7 mass flow unit conversions",
                "Fluid density presets (Water, Air, Oil, etc.)",
                "Step-by-step calculation breakdown",
                "Calculation history with localStorage",
                "Export results as TXT file",
                "Keyboard shortcut: Esc to reset",
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
          Flow Rate Formulas
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Volume & Time",
              formula: "Q = V / t",
              desc: "Divide the total volume of fluid by the time taken. Useful when you know how much fluid passed through a system over a measured period.",
              color: "blue",
            },
            {
              title: "Pipe Diameter & Velocity",
              formula: "Q = (π × d²/4) × v",
              desc: "Calculate the pipe cross-sectional area from diameter, then multiply by fluid velocity. The most common method for pipe flow analysis.",
              color: "green",
            },
            {
              title: "Area & Velocity",
              formula: "Q = A × v",
              desc: "Multiply the known cross-sectional area by fluid velocity. Used for non-circular ducts, channels, or when area is already known.",
              color: "purple",
            },
            {
              title: "Mass Flow Rate",
              formula: "ṁ = ρ × Q",
              desc: "Multiply fluid density by volumetric flow rate to get mass flow. Essential for chemical processes, combustion, and HVAC load calculations.",
              color: "orange",
            },
          ].map(({ title, formula, desc, color }) => (
            <div key={title} className={`p-5 bg-${color}-50 border border-${color}-200 rounded-lg`}>
              <div className={`font-semibold text-${color}-800 mb-2`}>{title}</div>
              <div className={`font-mono text-lg font-bold text-${color}-900 mb-3`}>{formula}</div>
              <p className={`text-sm text-${color}-700`}>{desc}</p>
            </div>
          ))}
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
                ["Volume & Time",          "500 L, 10 min",                "50 L/min = 0.000833 m³/s"],
                ["Pipe Diameter & Velocity","d = 0.1 m, v = 2 m/s",        "Q = 0.01571 m³/s = 942.5 L/min"],
                ["Area & Velocity",        "A = 0.05 m², v = 3 m/s",       "Q = 0.15 m³/s = 9,000 L/min"],
                ["Mass Flow Rate",         "Q = 0.5 m³/s, ρ = 1000 kg/m³","ṁ = 500 kg/s"],
                ["Pipe Diameter & Velocity","d = 4 in, v = 6 ft/s",        "Q ≈ 0.0488 m³/s = 2,929 L/min"],
                ["Volume & Time",          "100 gal, 5 min",               "20 gal/min = 1.262 L/s"],
              ].map(([mode, inputs, result]) => (
                <tr key={mode + inputs} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">{mode}</td>
                  <td className="py-3 px-4 font-mono text-sm">{inputs}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-primary">{result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Fluid Densities
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Fluid</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Density (kg/m³)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Temperature</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Common Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Water",       "998",   "20°C", "Plumbing, HVAC, hydraulics"],
                ["Seawater",    "1025",  "20°C", "Marine, offshore engineering"],
                ["Air",         "1.204", "20°C", "HVAC, ventilation, pneumatics"],
                ["Engine Oil",  "876",   "40°C", "Lubrication systems"],
                ["Gasoline",    "720",   "15°C", "Fuel systems"],
                ["Mercury",     "13,546","20°C", "Instrumentation"],
                ["Glycerin",    "1261",  "20°C", "Chemical processing"],
              ].map(([fluid, density, temp, use]) => (
                <tr key={fluid} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{fluid}</td>
                  <td className="py-3 px-4 font-mono">{density}</td>
                  <td className="py-3 px-4 text-gray-500">{temp}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{use}</td>
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
            { icon: "🔧", title: "Pipe System Design",    color: "blue",   desc: "Size pipes and pumps for water supply, oil, gas, and industrial fluid systems." },
            { icon: "🌬️", title: "HVAC & Ventilation",   color: "green",  desc: "Calculate air flow rates for duct sizing, fan selection, and ventilation design." },
            { icon: "⚗️", title: "Chemical Processing",  color: "purple", desc: "Control reactant flow rates in reactors, heat exchangers, and distillation columns." },
            { icon: "🚿", title: "Plumbing",              color: "orange", desc: "Determine water flow for fixtures, irrigation systems, and building supply lines." },
            { icon: "🏭", title: "Industrial Systems",    color: "red",    desc: "Monitor and control fluid flow in manufacturing, cooling, and process equipment." },
            { icon: "🎓", title: "Engineering Education", color: "gray",   desc: "Core concept in fluid mechanics courses for mechanical, civil, and chemical engineers." },
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
              q: "What is the difference between volumetric and mass flow rate?",
              a: "Volumetric flow rate (Q) measures the volume of fluid per unit time (m³/s, L/min). Mass flow rate (ṁ) measures the mass per unit time (kg/s). They are related by ṁ = ρ × Q, where ρ is fluid density. Mass flow rate is preferred in thermodynamics and chemical engineering because it is conserved regardless of temperature and pressure changes.",
            },
            {
              q: "What is the formula for flow rate in a pipe?",
              a: "For a circular pipe: Q = (π × d²/4) × v, where d is the internal pipe diameter and v is the average fluid velocity. This comes from Q = A × v, where A = π × d²/4 is the cross-sectional area of the pipe.",
            },
            {
              q: "How do I convert L/min to m³/s?",
              a: "Divide by 60,000. For example, 50 L/min ÷ 60,000 = 0.000833 m³/s. Alternatively, 1 L/min = 1.667 × 10⁻⁵ m³/s. This calculator handles all unit conversions automatically.",
            },
            {
              q: "What is GPM (gallons per minute)?",
              a: "GPM stands for US gallons per minute, a common flow rate unit in American plumbing and HVAC. 1 GPM = 0.0000630902 m³/s = 3.785 L/min. This calculator supports GPM as both an input and output unit.",
            },
            {
              q: "What is CFM in flow rate?",
              a: "CFM stands for Cubic Feet per Minute, widely used in HVAC and ventilation engineering in the US. 1 CFM = 0.000471947 m³/s = 28.317 L/min. It is equivalent to ft³/min.",
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

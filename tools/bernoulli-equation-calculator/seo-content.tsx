import React from "react";

export default function BernoulliEquationCalculatorSEO() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          What is the Bernoulli Equation?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            The <strong>Bernoulli Equation</strong> is a fundamental principle in fluid mechanics that
            describes the conservation of energy in a flowing fluid. It states that the total mechanical
            energy — the sum of pressure energy, kinetic energy, and potential energy — remains constant
            along a streamline for an ideal, incompressible fluid.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The equation is expressed as: <strong>P + ½ρV² + ρgh = constant</strong>, or in its
            two-point form: <strong>P₁ + ½ρV₁² + ρgh₁ = P₂ + ½ρV₂² + ρgh₂</strong>. This allows
            engineers to relate pressure, velocity, and elevation at any two points in a flow system.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Named after Swiss mathematician Daniel Bernoulli who published it in 1738, this equation
            underpins the design of aircraft wings, venturi meters, carburetors, nozzles, and countless
            other engineering systems where fluid flow is involved.
          </p>
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
                "Select the variable you want to solve for (P₁, P₂, V₁, V₂, h₁, or h₂)",
                "The selected field will be disabled — it will be calculated automatically",
                "Enter all other known values with appropriate units",
                "Select a fluid preset or enter a custom density",
                "Results update instantly as you type",
                "View the step-by-step solution and energy breakdown",
                "Copy, save, or export the result",
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
                "Solve for any of 6 variables (P₁, P₂, V₁, V₂, h₁, h₂)",
                "Real-time calculation as you type",
                "Multi-unit support — Pa, kPa, bar, psi, m/s, ft/s",
                "Automatic SI unit conversion",
                "Step-by-step formula substitution",
                "Energy terms breakdown table",
                "Fluid presets: Water, Air, Oil, Gasoline, Seawater",
                "Calculation history with localStorage",
                "Export results as TXT file",
                "Swap inputs between Point 1 and Point 2",
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
          Example Calculations
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Scenario</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Known Values</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Pipe constriction (water)", "P₁=200 kPa, V₁=2 m/s, h₁=0, V₂=5 m/s, h₂=3 m, ρ=1000", "P₂ ≈ 170.9 kPa"],
                ["Venturi meter", "P₁=150 kPa, P₂=120 kPa, V₁=1 m/s, h₁=h₂=0, ρ=1000", "V₂ ≈ 7.76 m/s"],
                ["Elevation change", "P₁=P₂=101325 Pa, V₁=V₂=3 m/s, h₁=0, ρ=1000", "h₂ = 0 m"],
                ["Nozzle exit velocity", "P₁=300 kPa, P₂=101.3 kPa, V₁=0.5 m/s, h₁=h₂=0, ρ=1000", "V₂ ≈ 19.9 m/s"],
                ["Height difference", "P₁=200 kPa, P₂=180 kPa, V₁=2 m/s, V₂=2 m/s, h₁=0, ρ=1000", "h₂ ≈ 2.04 m"],
              ].map(([scenario, known, result]) => (
                <tr key={scenario} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{scenario}</td>
                  <td className="py-3 px-4 text-xs text-gray-600 font-mono">{known}</td>
                  <td className="py-3 px-4 font-semibold text-primary">{result}</td>
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
                ["Water",    "1000",   "20°C", "Plumbing, hydraulics"],
                ["Seawater", "1025",   "20°C", "Marine engineering"],
                ["Air",      "1.225",  "15°C", "HVAC, aerodynamics"],
                ["Oil (SAE 30)", "876","40°C", "Lubrication systems"],
                ["Gasoline", "720",    "20°C", "Fuel systems"],
                ["Mercury",  "13,546", "20°C", "Manometers"],
              ].map(([fluid, density, temp, use]) => (
                <tr key={fluid} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{fluid}</td>
                  <td className="py-3 px-4 font-mono">{density}</td>
                  <td className="py-3 px-4 text-gray-500">{temp}</td>
                  <td className="py-3 px-4 text-gray-600">{use}</td>
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
            { icon: "✈️", title: "Aerodynamics",       color: "blue",   desc: "Aircraft wing lift is generated by pressure differences explained by Bernoulli's principle." },
            { icon: "🔧", title: "Pipe Flow Systems",  color: "green",  desc: "Engineers use Bernoulli to size pipes, predict pressure changes, and design water supply networks." },
            { icon: "🌡️", title: "Venturi Meters",     color: "purple", desc: "Flow measurement devices use the pressure-velocity relationship to calculate volumetric flow rate." },
            { icon: "🚿", title: "Nozzle Design",      color: "orange", desc: "Nozzle exit velocities and pressures are calculated directly from the Bernoulli equation." },
            { icon: "🏗️", title: "HVAC Systems",       color: "red",    desc: "Duct pressure analysis and fan sizing rely on Bernoulli to ensure proper airflow distribution." },
            { icon: "⛽", title: "Carburetors",        color: "gray",   desc: "Fuel-air mixing in carburetors uses the Venturi effect, a direct application of Bernoulli's principle." },
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
              q: "What is the Bernoulli equation formula?",
              a: "P₁ + ½ρV₁² + ρgh₁ = P₂ + ½ρV₂² + ρgh₂, where P is pressure (Pa), ρ is fluid density (kg/m³), V is velocity (m/s), g is gravity (m/s²), and h is elevation (m).",
            },
            {
              q: "What are the assumptions of the Bernoulli equation?",
              a: "The equation assumes steady, incompressible, inviscid (frictionless) flow along a single streamline. It does not account for viscous losses, turbulence, or compressibility effects.",
            },
            {
              q: "Why does pressure decrease when velocity increases?",
              a: "Because total energy is conserved. When a fluid speeds up (higher kinetic energy), its pressure energy must decrease to maintain the constant total. This is the core of the Bernoulli principle.",
            },
            {
              q: "Can I use this for compressible fluids like air at high speeds?",
              a: "The standard Bernoulli equation applies to incompressible flow (Mach < 0.3). For high-speed air or gas flows, a compressible form of the energy equation should be used instead.",
            },
            {
              q: "What units does this calculator use?",
              a: "All inputs are converted to SI units (Pa, m/s, m, kg/m³) for calculation. Results are then converted back to your selected output unit. You can mix units freely.",
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
